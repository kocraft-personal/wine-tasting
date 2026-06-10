"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { WtSession, WtSessionWine, WtRating, WtProfile } from "@/lib/types";
import WineCard from "@/components/WineCard";
import ProgressBar from "@/components/ProgressBar";
import WelcomePage from "@/components/WelcomePage";

export default function TastingPage() {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<WtSession | null>(null);
  const [wines, setWines] = useState<WtSessionWine[]>([]);
  const [myRatings, setMyRatings] = useState<Map<string, WtRating>>(new Map());
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<WtProfile | null>(null);
  const [ratedWines, setRatedWines] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace(`/?next=/s/${inviteCode}`);
        return;
      }
      setUserId(user.id);

      const { data: prof } = await supabase
        .from("wt_profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (!prof) {
        router.replace(`/?next=/s/${inviteCode}`);
        return;
      }
      setProfile(prof);

      const { data: sess, error: sessErr } = await supabase
        .from("wt_sessions")
        .select("*")
        .eq("invite_code", inviteCode)
        .single();
      if (sessErr || !sess) {
        setError("Session not found.");
        setLoading(false);
        return;
      }
      setSession(sess);
      setShowWelcome(sessionStorage.getItem(`wt-welcome-seen-${inviteCode}`) !== "1");

      const { data: wineData } = await supabase
        .from("wt_session_wines")
        .select("*")
        .eq("session_id", sess.id)
        .order("position");
      setWines(wineData ?? []);

      const { data: ratingData } = await supabase
        .from("wt_ratings")
        .select("*")
        .eq("session_id", sess.id)
        .eq("user_id", user.id);

      const ratingMap = new Map<string, WtRating>();
      const ratedSet = new Set<string>();
      for (const r of ratingData ?? []) {
        ratingMap.set(r.wine_id, r);
        if (r.stars) ratedSet.add(r.wine_id);
      }
      setMyRatings(ratingMap);
      setRatedWines(ratedSet);
      setLoading(false);
    }
    load();
  }, [inviteCode]);

  const handleRated = useCallback((wineId: string, rated: boolean) => {
    setRatedWines((prev) => {
      const next = new Set(prev);
      if (rated) next.add(wineId); else next.delete(wineId);
      return next;
    });
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function startTasting() {
    sessionStorage.setItem(`wt-welcome-seen-${inviteCode}`, "1");
    setShowWelcome(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-wine flex items-center justify-center">
        <p style={{ color: "var(--color-champagne)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.2rem", opacity: 0.6 }}>
          Decanting…
        </p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-dark-wine flex items-center justify-center">
        <p style={{ color: "var(--color-rose)", fontFamily: "var(--font-body)" }}>{error || "Session not found."}</p>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <WelcomePage
        session={session}
        wines={wines}
        profile={profile}
        copied={copied}
        onCopy={copyLink}
        onStart={startTasting}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-wine">
      {/* Progress bar */}
      <ProgressBar rated={ratedWines.size} total={wines.length} />

      {/* Header */}
      <div className="px-4 py-6 text-center" style={{ borderBottom: "1px solid rgba(212,184,106,0.1)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontStyle: "italic", color: "var(--color-champagne)", letterSpacing: "0.02em" }}>
          {session.name}
        </h1>
        {session.tasting_date && (
          <p style={{ fontSize: "0.75rem", color: "rgba(245,235,214,0.4)", marginTop: "4px" }}>
            {new Date(session.tasting_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        )}
        <div className="rule-deco my-3">
          <span style={{ fontSize: "0.6rem", color: "var(--color-champagne)" }}>◆</span>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span style={{ fontSize: "0.8rem", color: "rgba(245,235,214,0.5)", fontFamily: "var(--font-body)" }}>
            Tasting as <strong style={{ color: "var(--color-champagne-soft)" }}>{profile?.first_name} {profile?.last_name}</strong>
          </span>
          <button onClick={copyLink} className="btn-secondary" style={{ padding: "0.3rem 0.8rem", fontSize: "0.75rem" }}>
            {copied ? "Copied!" : "Share Link"}
          </button>
          <a href={`/s/${inviteCode}/results`} className="btn-ghost" style={{ fontSize: "0.75rem" }}>
            See Results →
          </a>
        </div>
      </div>

      {/* Wine quick-nav */}
      {wines.length > 1 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto" style={{ borderBottom: "1px solid rgba(212,184,106,0.08)" }}>
          {wines.map((w) => (
            <a
              key={w.id}
              href={`#wine-${w.id}`}
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "100px",
                fontSize: "0.75rem",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                background: ratedWines.has(w.id) ? "rgba(212,184,106,0.15)" : "rgba(255,255,255,0.04)",
                color: ratedWines.has(w.id) ? "var(--color-champagne)" : "rgba(245,235,214,0.4)",
                border: "1px solid",
                borderColor: ratedWines.has(w.id) ? "rgba(212,184,106,0.3)" : "transparent",
                textDecoration: "none",
              }}
            >
              {w.position < 10 ? `0${w.position}` : w.position}
            </a>
          ))}
        </div>
      )}

      {/* Wine cards */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {wines.map((wine) => (
          <div key={wine.id} style={{ position: "relative" }}>
            <WineCard
              wine={wine}
              sessionId={session.id}
              userId={userId!}
              initialRating={myRatings.get(wine.id) ?? null}
              onRated={handleRated}
            />
          </div>
        ))}

        {/* Footer CTA */}
        <div className="text-center py-6">
          <div className="rule-deco mb-4">
            <span style={{ color: "var(--color-champagne)", fontSize: "0.6rem" }}>◆</span>
          </div>
          <a href={`/s/${inviteCode}/results`} className="btn-primary" style={{ display: "inline-block" }}>
            View Results
          </a>
        </div>
      </div>
    </div>
  );
}
