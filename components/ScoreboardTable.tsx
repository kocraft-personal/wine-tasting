import type { WtProfile, WtRating, WtSessionWine } from "@/lib/types";

interface ScoreboardTableProps {
  wines: WtSessionWine[];
  profiles: WtProfile[];
  ratings: WtRating[];
}

function stars(n: number | null) {
  if (!n) return <span style={{ color: "rgba(26,14,10,0.2)", fontSize: "0.8rem" }}>—</span>;
  return (
    <span style={{ color: "var(--color-champagne)", fontSize: "0.85rem" }}>
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}

function avg(nums: (number | null)[]): string {
  const valid = nums.filter((n): n is number => n !== null);
  if (!valid.length) return "—";
  return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
}

export default function ScoreboardTable({ wines, profiles, ratings }: ScoreboardTableProps) {
  const ratingMap = new Map<string, WtRating>();
  for (const r of ratings) ratingMap.set(`${r.user_id}:${r.wine_id}`, r);

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(74,14,19,0.2)" }}>
            <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontFamily: "var(--font-heading)", letterSpacing: "0.1em", fontSize: "0.65rem", color: "rgba(26,14,10,0.5)", width: "140px" }}>
              TASTER
            </th>
            {wines.map((w) => (
              <th key={w.id} style={{ textAlign: "center", padding: "0.5rem 0.75rem", fontFamily: "var(--font-heading)", fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--color-oxblood)" }}>
                <div>{w.position < 10 ? `0${w.position}` : w.position}</div>
                <div style={{ fontWeight: 400, fontSize: "0.6rem", opacity: 0.7, maxWidth: "80px", margin: "0 auto", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.wine_name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid rgba(74,14,19,0.08)" }}>
              <td style={{ padding: "0.5rem 0.75rem", fontFamily: "var(--font-body)", color: "var(--color-ink)", whiteSpace: "nowrap" }}>
                {p.first_name} {p.last_name[0]}.
              </td>
              {wines.map((w) => {
                const r = ratingMap.get(`${p.id}:${w.id}`);
                return (
                  <td key={w.id} style={{ textAlign: "center", padding: "0.5rem 0.75rem" }}>
                    <div>{stars(r?.stars ?? null)}</div>
                    {r?.verdict_word && (
                      <div style={{ fontSize: "0.7rem", color: "rgba(26,14,10,0.45)", fontStyle: "italic" }}>
                        {r.verdict_word}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Average row */}
          <tr style={{ borderTop: "2px solid rgba(74,14,19,0.15)", background: "rgba(74,14,19,0.03)" }}>
            <td style={{ padding: "0.5rem 0.75rem", fontFamily: "var(--font-heading)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(26,14,10,0.5)" }}>
              AVG
            </td>
            {wines.map((w) => {
              const wineRatings = profiles.map((p) => ratingMap.get(`${p.id}:${w.id}`)?.stars ?? null);
              return (
                <td key={w.id} style={{ textAlign: "center", padding: "0.5rem 0.75rem", fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--color-oxblood)" }}>
                  {avg(wineRatings)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
