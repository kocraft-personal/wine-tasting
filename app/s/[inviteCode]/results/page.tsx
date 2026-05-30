"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { WtSession, WtSessionWine, WtRating, WtProfile, WtSuperlative } from "@/lib/types";
import ScoreboardTable from "@/components/ScoreboardTable";
import RatingsSummaryCard from "@/components/RatingsSummaryCard";
import SuperlativesPicker from "@/components/SuperlativesPicker";

type SupWithProfile = WtSuperlative & { profile: { first_name: string; last_name: string } };

export default function ResultsPage() {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<WtSession | null>(null);
  const [wines, setWines] = useState<WtSessionWine[]>([]);
  const [ratings, setRatings] = useState<WtRating[]>([]);
  const [profiles, setProfiles] = useState<WtProfile[]>([]);
  const [superlatives, setSuperlatives] = useState<SupWithProfile[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace(`/?next=/s/${inviteCode}/results`); return; }
      setUserId(user.id);

      const { data: sess } = await supabase
        .from("wt_sessions")
        .select("*")
        .eq("invite_code", inviteCode)
        .single();
      if (!sess) { setError("Session not found."); setLoading(false); return; }
      setSession(sess);

      const [wineData, ratingData, supData] = await Promise.all([
        supabase.from("wt_session_wines").select("*").eq("session_id", sess.id).order("position"),
        supabase.from("wt_ratings").select("*").eq("session_id", sess.id),
        supabase.from("wt_superlatives").select("*, profile:wt_profiles(first_name, last_name)").eq("session_id", sess.id),
      ]);

      setWines(wineData.data ?? []);
      setRatings(ratingData.data ?? []);

      // Get unique rater IDs from ratings
      const raterIds = [...new Set((ratingData.data ?? []).map((r) => r.user_id))];
      if (raterIds.length > 0) {
        const { data: profileData } = await supabase
          .from("wt_profiles")
          .select("*")
          .in("id", raterIds);
        setProfiles(profileData ?? []);
      }

      setSuperlatives(supData.data as SupWithProfile[] ?? []);
      setLoading(false);
    }
    load();
  }, [inviteCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-wine flex items-center justify-center">
        <p style={{ color: "var(--color-champagne)", fontFamily: "var(--font-display)", fontStyle: "italic", opacity: 0.6 }}>Loading results…</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-dark-wine flex items-center justify-center">
        <p style={{ color: "var(--color-rose)" }}>{error}</p>
      </div>
    );
  }

  // Compute stats
  const unanimousWinner = wines.find((w) => {
    const wRatings = ratings.filter((r) => r.wine_id === w.id && r.stars !== null);
    return wRatings.length >= 2 && wRatings.every((r) => (r.stars ?? 0) >= 4);
  });

  return (
    <div className="min-h-screen bg-dark-wine">
      {/* Header */}
      <div className="px-4 py-8 text-center" style={{ borderBottom: "1px solid rgba(212,184,106,0.1)" }}>
        <a href={`/s/${inviteCode}`} className="btn-ghost mb-3 inline-block" style={{ fontSize: "0.75rem", opacity: 0.5 }}>
          ← Back to Tasting
        </a>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontStyle: "italic", color: "var(--color-champagne)", letterSpacing: "0.02em" }}>
          {session.name}
        </h1>
        <div className="rule-deco my-3">
          <span style={{ fontSize: "0.6rem", color: "var(--color-champagne)" }}>Results</span>
        </div>
        {unanimousWinner && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-champagne-soft)" }}>
            🏆 Unanimous winner: <strong>{unanimousWinner.wine_name}</strong>
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Summary cards */}
        {wines.length > 0 && (
          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-champagne)", opacity: 0.7, marginBottom: "12px" }}>
              WINE SUMMARIES
            </h2>
            <div className="space-y-3">
              {wines.map((w) => (
                <RatingsSummaryCard
                  key={w.id}
                  wine={w}
                  ratings={ratings.filter((r) => r.wine_id === w.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Scoreboard table */}
        {profiles.length > 0 && (
          <section className="card-wine p-4" style={{ borderRadius: "2px" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-oxblood)", marginBottom: "12px" }}>
              SCOREBOARD
            </h2>
            <ScoreboardTable wines={wines} profiles={profiles} ratings={ratings} />
          </section>
        )}

        {/* Superlatives */}
        <section className="card-wine p-4" style={{ borderRadius: "2px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-oxblood)", marginBottom: "12px" }}>
            SUPERLATIVES
          </h2>
          <SuperlativesPicker
            sessionId={session.id}
            userId={userId}
            wines={wines}
            allSuperlatives={superlatives}
          />
        </section>

        {/* Footer links */}
        <div className="text-center space-y-2">
          <a href="/wines" className="btn-ghost block" style={{ fontSize: "0.8rem" }}>
            Browse All Wines →
          </a>
          <a href="/dashboard" className="btn-ghost block" style={{ fontSize: "0.8rem", opacity: 0.5 }}>
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
