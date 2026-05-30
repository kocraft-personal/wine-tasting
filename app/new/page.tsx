import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SessionForm from "@/components/SessionForm";

export default async function NewSessionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/?next=/new");

  const { data: profile } = await supabase
    .from("wt_profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/?next=/new");

  return (
    <div className="min-h-screen bg-dark-wine py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <a
            href="/dashboard"
            className="btn-ghost mb-4 inline-block"
            style={{ fontSize: "0.75rem", opacity: 0.5 }}
          >
            ← Dashboard
          </a>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              fontStyle: "italic",
              color: "var(--color-champagne)",
              letterSpacing: "0.02em",
            }}
          >
            Start a Tasting Night
          </h1>
          <div className="rule-deco my-3">
            <span style={{ color: "var(--color-champagne)", fontSize: "0.6rem" }}>◆</span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "rgba(245,235,214,0.5)",
            }}
          >
            Hosting as {profile.first_name} {profile.last_name}
          </p>
        </div>

        <SessionForm />
      </div>
    </div>
  );
}
