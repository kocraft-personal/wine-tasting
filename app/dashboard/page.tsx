"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { WtSession, WtProfile } from "@/lib/types";

interface SessionSummary {
  session: WtSession;
  wineCount: number;
  myRatingCount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<WtProfile | null>(null);
  const [hosted, setHosted] = useState<SessionSummary[]>([]);
  const [joined, setJoined] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/"); return; }

      const { data: prof } = await supabase.from("wt_profiles").select("*").eq("id", user.id).single();
      if (!prof) { router.replace("/"); return; }
      setProfile(prof);

      // Sessions I created
      const { data: mySessionsRaw } = await supabase
        .from("wt_sessions")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      // Sessions I rated in (but didn't create)
      const { data: myRatings } = await supabase
        .from("wt_ratings")
        .select("session_id")
        .eq("user_id", user.id);

      const ratedSessionIds = [...new Set((myRatings ?? []).map((r) => r.session_id))];
      const mySessionIds = new Set((mySessionsRaw ?? []).map((s) => s.id));
      const joinedIds = ratedSessionIds.filter((id) => !mySessionIds.has(id));

      const { data: joinedSessionsRaw } = joinedIds.length
        ? await supabase.from("wt_sessions").select("*").in("id", joinedIds).order("created_at", { ascending: false })
        : { data: [] };

      async function buildSummaries(sessions: WtSession[]): Promise<SessionSummary[]> {
        return Promise.all(
          sessions.map(async (s) => {
            const [{ count: wineCount }, { count: myRatingCount }] = await Promise.all([
              supabase.from("wt_session_wines").select("id", { count: "exact", head: true }).eq("session_id", s.id),
              supabase.from("wt_ratings").select("id", { count: "exact", head: true }).eq("session_id", s.id).eq("user_id", user!.id),
            ]);
            return { session: s, wineCount: wineCount ?? 0, myRatingCount: myRatingCount ?? 0 };
          })
        );
      }

      const [hostedSummaries, joinedSummaries] = await Promise.all([
        buildSummaries(mySessionsRaw ?? []),
        buildSummaries(joinedSessionsRaw ?? []),
      ]);

      setHosted(hostedSummaries);
      setJoined(joinedSummaries);
      setLoading(false);
    }
    load();
  }, []);

  async function copyLink(code: string) {
    await navigator.clipboard.writeText(`${window.location.origin}/s/${code}`);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  function SessionCard({ summary, showCopy }: { summary: SessionSummary; showCopy?: boolean }) {
    const { session, wineCount, myRatingCount } = summary;
    const date = session.tasting_date
      ? new Date(session.tasting_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : null;

    return (
      <div
        className="card-wine p-4 cursor-pointer hover:shadow-md transition-shadow"
        style={{ borderRadius: "2px" }}
        onClick={() => router.push(`/s/${session.invite_code}`)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-oxblood)", fontWeight: 500 }}>
              {session.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(26,14,10,0.4)", marginTop: "2px" }}>
              {date ? `${date} · ` : ""}{wineCount} wine{wineCount !== 1 ? "s" : ""}
              {wineCount > 0 && ` · ${myRatingCount}/${wineCount} rated by me`}
            </div>
          </div>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {showCopy && (
              <button
                onClick={() => copyLink(session.invite_code)}
                className="btn-secondary"
                style={{ padding: "0.25rem 0.6rem", fontSize: "0.72rem" }}
              >
                {copied === session.invite_code ? "Copied!" : "Share"}
              </button>
            )}
            <a
              href={`/s/${session.invite_code}/results`}
              className="btn-ghost"
              style={{ padding: "0.25rem 0.5rem", fontSize: "0.72rem" }}
            >
              Results
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-wine flex items-center justify-center">
        <p style={{ color: "var(--color-champagne)", fontFamily: "var(--font-display)", fontStyle: "italic", opacity: 0.6 }}>Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-wine px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontStyle: "italic", color: "var(--color-champagne)" }}>
            Wine Tasting
          </div>
          <div className="rule-deco my-2">
            <span style={{ fontSize: "0.6rem", color: "var(--color-champagne)" }}>◆</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(245,235,214,0.5)" }}>
            Welcome, {profile?.first_name}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-8">
          <a href="/new" className="btn-primary flex-1 text-center">
            Start a Tasting Night
          </a>
          <a href="/wines" className="btn-secondary flex-1 text-center">
            Browse The Cellar
          </a>
        </div>

        {/* Hosted sessions */}
        {hosted.length > 0 && (
          <section className="mb-8">
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--color-champagne)", opacity: 0.6, marginBottom: "10px" }}>
              MY TASTING NIGHTS
            </h2>
            <div className="space-y-2">
              {hosted.map((s) => <SessionCard key={s.session.id} summary={s} showCopy />)}
            </div>
          </section>
        )}

        {/* Joined sessions */}
        {joined.length > 0 && (
          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--color-champagne)", opacity: 0.6, marginBottom: "10px" }}>
              TASTINGS I&apos;VE JOINED
            </h2>
            <div className="space-y-2">
              {joined.map((s) => <SessionCard key={s.session.id} summary={s} />)}
            </div>
          </section>
        )}

        {hosted.length === 0 && joined.length === 0 && (
          <div className="text-center py-12">
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontStyle: "italic", color: "rgba(245,235,214,0.3)" }}>
              No tastings yet — start one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
