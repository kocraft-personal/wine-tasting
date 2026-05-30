import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NamePrompt from "@/components/NamePrompt";

interface Props {
  searchParams: Promise<{ next?: string }>;
}

export default async function LandingPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("wt_profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (profile) {
      redirect(params.next ?? "/dashboard");
    }
  }

  return <NamePrompt next={params.next ?? "/dashboard"} />;
}
