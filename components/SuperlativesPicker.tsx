"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SUPERLATIVE_CATEGORIES } from "@/lib/types";
import type { WtSessionWine, WtSuperlative } from "@/lib/types";

interface SuperlativesPickerProps {
  sessionId: string;
  userId: string | null;
  wines: WtSessionWine[];
  allSuperlatives: (WtSuperlative & { profile: { first_name: string; last_name: string } })[];
}

export default function SuperlativesPicker({ sessionId, userId, wines, allSuperlatives }: SuperlativesPickerProps) {
  const myPicks = new Map(
    allSuperlatives.filter((s) => s.user_id === userId).map((s) => [s.category, s.wine_id])
  );
  const [picks, setPicks] = useState<Map<string, string>>(myPicks);
  const [saving, setSaving] = useState<string | null>(null);

  async function pick(category: string, wineId: string) {
    if (!userId) return;
    const current = picks.get(category);
    const next = current === wineId ? undefined : wineId;

    setPicks((prev) => {
      const m = new Map(prev);
      if (next) m.set(category, next); else m.delete(category);
      return m;
    });

    setSaving(category);
    const supabase = createClient();
    if (next) {
      await supabase.from("wt_superlatives").upsert(
        { session_id: sessionId, user_id: userId, category, wine_id: next },
        { onConflict: "session_id,user_id,category" }
      );
    } else {
      await supabase.from("wt_superlatives")
        .delete()
        .eq("session_id", sessionId)
        .eq("user_id", userId)
        .eq("category", category);
    }
    setSaving(null);
  }

  return (
    <div className="space-y-6">
      {SUPERLATIVE_CATEGORIES.map(({ key, label, emoji }) => {
        const categoryPicks = allSuperlatives.filter((s) => s.category === key);
        const myPick = picks.get(key);

        return (
          <div key={key}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--color-oxblood)", marginBottom: "8px" }}>
              {emoji} {label.toUpperCase()}
              {saving === key && <span style={{ opacity: 0.4, marginLeft: "6px", fontSize: "0.6rem" }}>saving…</span>}
            </p>

            {/* My pick */}
            {userId && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {wines.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => pick(key, w.id)}
                    className={`pill${myPick === w.id ? " selected" : ""}`}
                    style={{ fontSize: "0.78rem" }}
                  >
                    {w.position < 10 ? `0${w.position}` : w.position}. {w.wine_name}
                  </button>
                ))}
              </div>
            )}

            {/* Others' picks */}
            {categoryPicks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categoryPicks.filter((s) => s.user_id !== userId).map((s) => {
                  const wine = wines.find((w) => w.id === s.wine_id);
                  return wine ? (
                    <span
                      key={s.id}
                      style={{ fontSize: "0.72rem", color: "rgba(26,14,10,0.55)", fontStyle: "italic", fontFamily: "var(--font-body)" }}
                    >
                      {s.profile.first_name} → {wine.wine_name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
