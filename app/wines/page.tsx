"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { WINE_STYLE_KEYS } from "@/lib/wineStyles";
import type { WtSessionWine, WtRating, WtProfile } from "@/lib/types";
import StarRating from "@/components/StarRating";

interface WineWithRatings {
  wine: WtSessionWine & { session_name?: string; session_date?: string };
  ratings: (WtRating & { taster: WtProfile })[];
  avgStars: number | null;
  topAromas: string[];
}

function computeTopAromas(ratings: WtRating[], n = 3): string[] {
  const freq = new Map<string, number>();
  for (const r of ratings) {
    for (const a of [...r.aromas_fruity, ...r.aromas_non_fruity]) {
      freq.set(a, (freq.get(a) ?? 0) + 1);
    }
  }
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([a]) => a);
}

function computeAvg(ratings: WtRating[]): number | null {
  const valid = ratings.map((r) => r.stars).filter((s): s is number => s !== null);
  return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null;
}

export default function WineBrowsePage() {
  const [winesData, setWinesData] = useState<WineWithRatings[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  // Filters
  const [filterVarietal, setFilterVarietal] = useState<string[]>([]);
  const [filterMinRating, setFilterMinRating] = useState<number | null>(null);
  const [filterTaster, setFilterTaster] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "count" | "recent">("rating");

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const [{ data: wines }, { data: ratings }, { data: sessions }] = await Promise.all([
        supabase.from("wt_session_wines").select("*"),
        supabase.from("wt_ratings").select("*"),
        supabase.from("wt_sessions").select("id, name, tasting_date"),
      ]);

      const raterIds = [...new Set((ratings ?? []).map((r) => r.user_id))];
      const { data: profiles } = raterIds.length
        ? await supabase.from("wt_profiles").select("*").in("id", raterIds)
        : { data: [] };

      const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
      const sessionMap = new Map((sessions ?? []).map((s) => [s.id, s]));

      const grouped = new Map<string, WineWithRatings>();

      for (const wine of wines ?? []) {
        const wineRatings = (ratings ?? [])
          .filter((r) => r.wine_id === wine.id)
          .map((r) => ({ ...r, taster: profileMap.get(r.user_id)! }))
          .filter((r) => r.taster);

        const sess = sessionMap.get(wine.session_id);
        grouped.set(wine.id, {
          wine: { ...wine, session_name: sess?.name, session_date: sess?.tasting_date },
          ratings: wineRatings,
          avgStars: computeAvg(wineRatings),
          topAromas: computeTopAromas(wineRatings),
        });
      }

      setWinesData([...grouped.values()]);
      setLoading(false);
    }
    load();
  }, []);

  const allTasters = useMemo(() => {
    const names = new Set<string>();
    for (const { ratings } of winesData) {
      for (const r of ratings) {
        if (r.taster) names.add(`${r.taster.first_name} ${r.taster.last_name}`);
      }
    }
    return [...names].sort();
  }, [winesData]);

  const filtered = useMemo(() => {
    let result = [...winesData];

    if (filterVarietal.length > 0) {
      result = result.filter((w) =>
        filterVarietal.includes(w.wine.varietal ?? w.wine.wine_style)
      );
    }

    if (filterMinRating !== null) {
      result = result.filter((w) => w.avgStars !== null && w.avgStars >= filterMinRating);
    }

    if (filterTaster) {
      result = result.filter((w) =>
        w.ratings.some((r) => `${r.taster?.first_name} ${r.taster?.last_name}` === filterTaster)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "rating") return (b.avgStars ?? 0) - (a.avgStars ?? 0);
      if (sortBy === "count") return b.ratings.length - a.ratings.length;
      // recent: by session date
      return (b.wine.session_date ?? "").localeCompare(a.wine.session_date ?? "");
    });

    return result;
  }, [winesData, filterVarietal, filterMinRating, filterTaster, sortBy]);

  const selectedWine = selected ? winesData.find((w) => w.wine.id === selected) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-wine flex items-center justify-center">
        <p style={{ color: "var(--color-champagne)", fontFamily: "var(--font-display)", fontStyle: "italic", opacity: 0.6 }}>Loading cellar…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-wine">
      {/* Header */}
      <div className="px-4 py-6 text-center" style={{ borderBottom: "1px solid rgba(212,184,106,0.1)" }}>
        <a href="/dashboard" className="btn-ghost mb-2 inline-block" style={{ fontSize: "0.75rem", opacity: 0.4 }}>← Dashboard</a>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontStyle: "italic", color: "var(--color-champagne)" }}>
          The Cellar
        </h1>
        <p style={{ fontSize: "0.8rem", color: "rgba(245,235,214,0.4)", marginTop: "4px" }}>
          All wines rated across every tasting night
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar filters */}
        <aside style={{ minWidth: "180px", maxWidth: "180px" }} className="space-y-5">
          <div>
            <p className="section-label mb-2" style={{ color: "var(--color-champagne)", opacity: 0.6 }}>Sort</p>
            {(["rating", "count", "recent"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSortBy(s)}
                className={`pill block w-full text-left mb-1${sortBy === s ? " selected" : ""}`}
                style={{ fontSize: "0.78rem" }}
              >
                {s === "rating" ? "Highest rated" : s === "count" ? "Most rated" : "Most recent"}
              </button>
            ))}
          </div>

          <div>
            <p className="section-label mb-2" style={{ color: "var(--color-champagne)", opacity: 0.6 }}>Min Rating</p>
            <div className="flex flex-col gap-1">
              {[null, 3, 4, 5].map((n) => (
                <button
                  key={String(n)}
                  type="button"
                  onClick={() => setFilterMinRating(filterMinRating === n ? null : n)}
                  className={`pill block text-left${filterMinRating === n ? " selected" : ""}`}
                  style={{ fontSize: "0.78rem" }}
                >
                  {n === null ? "Any" : `${n}+ ★`}
                </button>
              ))}
            </div>
          </div>

          {allTasters.length > 0 && (
            <div>
              <p className="section-label mb-2" style={{ color: "var(--color-champagne)", opacity: 0.6 }}>Taster</p>
              <button
                type="button"
                onClick={() => setFilterTaster("")}
                className={`pill block text-left mb-1${filterTaster === "" ? " selected" : ""}`}
                style={{ fontSize: "0.78rem" }}
              >
                Anyone
              </button>
              {allTasters.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilterTaster(filterTaster === t ? "" : t)}
                  className={`pill block text-left mb-1${filterTaster === t ? " selected" : ""}`}
                  style={{ fontSize: "0.78rem" }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => { setFilterVarietal([]); setFilterMinRating(null); setFilterTaster(""); }}
            className="btn-ghost"
            style={{ padding: "0.25rem 0", fontSize: "0.75rem", color: "rgba(245,235,214,0.3)" }}
          >
            Clear filters
          </button>
        </aside>

        {/* Wine list */}
        <div className="flex-1 space-y-3">
          {filtered.length === 0 && (
            <p style={{ color: "rgba(245,235,214,0.4)", fontStyle: "italic", textAlign: "center", paddingTop: "2rem" }}>
              No wines match these filters.
            </p>
          )}
          {filtered.map(({ wine, ratings, avgStars, topAromas }) => (
            <div
              key={wine.id}
              className="card-wine p-4 cursor-pointer transition-shadow hover:shadow-md"
              style={{ borderRadius: "2px" }}
              onClick={() => setSelected(selected === wine.id ? null : wine.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "var(--color-oxblood)", fontWeight: 500 }}>
                    {wine.wine_name}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "rgba(26,14,10,0.45)", marginTop: "2px" }}>
                    {wine.varietal ?? wine.wine_style}
                    {wine.region ? ` · ${wine.region}` : ""}
                    {wine.country ? `, ${wine.country}` : ""}
                    {wine.session_name ? ` · ${wine.session_name}` : ""}
                  </div>
                  {topAromas.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {topAromas.map((a) => (
                        <span key={a} className="pill" style={{ fontSize: "0.7rem", padding: "0.05rem 0.4rem" }}>{a}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  {avgStars !== null ? (
                    <>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-oxblood)", lineHeight: 1 }}>
                        {avgStars.toFixed(1)}
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "rgba(26,14,10,0.4)" }}>
                        {ratings.filter((r) => r.stars).length} ratings
                      </div>
                    </>
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "rgba(26,14,10,0.3)" }}>Unrated</span>
                  )}
                </div>
              </div>

              {/* Expanded detail */}
              {selected === wine.id && ratings.length > 0 && (
                <div style={{ marginTop: "12px", borderTop: "1px solid rgba(74,14,19,0.15)", paddingTop: "12px" }}>
                  <div className="space-y-2">
                    {ratings.filter((r) => r.stars).map((r) => (
                      <div key={r.id} className="flex items-start gap-3">
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-ink)", minWidth: "100px" }}>
                          {r.taster.first_name} {r.taster.last_name[0]}.
                        </span>
                        <span style={{ color: "var(--color-champagne)", fontSize: "0.8rem" }}>
                          {"★".repeat(r.stars!)}
                        </span>
                        {r.verdict_word && (
                          <span style={{ fontSize: "0.75rem", color: "rgba(26,14,10,0.5)", fontStyle: "italic" }}>
                            "{r.verdict_word}"
                          </span>
                        )}
                        {r.food_pairing && (
                          <span style={{ fontSize: "0.72rem", color: "rgba(26,14,10,0.4)" }}>
                            🍽 {r.food_pairing}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
