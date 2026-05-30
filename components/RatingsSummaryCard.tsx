import type { WtRating, WtSessionWine } from "@/lib/types";

interface RatingsSummaryCardProps {
  wine: WtSessionWine;
  ratings: WtRating[];
}

function topAromas(ratings: WtRating[], n = 3): string[] {
  const freq = new Map<string, number>();
  for (const r of ratings) {
    for (const a of [...r.aromas_fruity, ...r.aromas_non_fruity]) {
      freq.set(a, (freq.get(a) ?? 0) + 1);
    }
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([a]) => a);
}

function avgStars(ratings: WtRating[]): number | null {
  const valid = ratings.map((r) => r.stars).filter((s): s is number => s !== null);
  if (!valid.length) return null;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

function stdDev(ratings: WtRating[]): number {
  const valid = ratings.map((r) => r.stars).filter((s): s is number => s !== null);
  if (valid.length < 2) return 0;
  const mean = valid.reduce((a, b) => a + b, 0) / valid.length;
  return Math.sqrt(valid.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / valid.length);
}

export default function RatingsSummaryCard({ wine, ratings }: RatingsSummaryCardProps) {
  const avg = avgStars(ratings);
  const aromas = topAromas(ratings);
  const deviation = stdDev(ratings);

  const labelSubtitle = wine.wine_style === "blend" && wine.blend_composition?.length
    ? wine.blend_composition.map((c) => `${c.varietal} ${c.pct}%`).join(" / ")
    : wine.varietal ?? wine.wine_style;

  return (
    <div
      className="card-wine p-4"
      style={{ borderRadius: "2px" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-oxblood)", fontWeight: 500 }}>
            {wine.position < 10 ? `0${wine.position}` : wine.position} · {wine.wine_name}
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(26,14,10,0.45)", marginTop: "2px" }}>
            {labelSubtitle}{wine.region ? ` · ${wine.region}` : ""}{wine.country ? `, ${wine.country}` : ""}
          </div>
        </div>

        {/* Avg stars */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          {avg !== null ? (
            <>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-oxblood)", lineHeight: 1 }}>
                {avg.toFixed(1)}
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(26,14,10,0.4)" }}>
                {ratings.filter((r) => r.stars !== null).length} ratings
              </div>
            </>
          ) : (
            <span style={{ color: "rgba(26,14,10,0.3)", fontSize: "0.8rem" }}>No ratings</span>
          )}
        </div>
      </div>

      {/* Individual stars */}
      {ratings.filter((r) => r.stars).length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {ratings.filter((r) => r.stars).map((r) => (
            <span key={r.id} style={{ fontSize: "0.75rem", color: "var(--color-champagne)", opacity: 0.8 }}>
              {"★".repeat(r.stars!)}
            </span>
          ))}
        </div>
      )}

      {/* Top aromas */}
      {aromas.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {aromas.map((a) => (
            <span key={a} className="pill" style={{ fontSize: "0.72rem", padding: "0.1rem 0.5rem" }}>
              {a}
            </span>
          ))}
        </div>
      )}

      {/* Disagreement badge */}
      {deviation > 1.2 && (
        <div style={{ marginTop: "6px", fontSize: "0.72rem", color: "var(--color-rose)", fontStyle: "italic" }}>
          ⚡ Big disagreement on this one
        </div>
      )}
    </div>
  );
}
