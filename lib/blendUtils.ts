import { WINE_STYLES, type WineStyleProfile } from "./wineStyles";

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

export function mergeBlendProfiles(varietals: string[]): WineStyleProfile {
  const profiles = varietals
    .map((v) => WINE_STYLES[v])
    .filter(Boolean);

  if (profiles.length === 0) {
    return WINE_STYLES["Cabernet Sauvignon"] ?? Object.values(WINE_STYLES)[0];
  }

  if (profiles.length === 1) return profiles[0];

  const base = profiles[0];

  // Colors: union of all, keep order (first varietal's colors first)
  const colors = dedupe(
    profiles.flatMap((p) => p.colors.map((c) => c.label))
  )
    .map((label) => {
      for (const p of profiles) {
        const match = p.colors.find((c) => c.label === label);
        if (match) return match;
      }
      return { label, hex: "#888" };
    });

  const clarity = dedupe(profiles.flatMap((p) => p.clarity));

  const fruity = dedupe(profiles.flatMap((p) => p.aromas.fruity));
  const non_fruity = dedupe(profiles.flatMap((p) => p.aromas.non_fruity));

  const allTannins = profiles.flatMap((p) => p.taste.tannin ?? []);
  const allBubbles = profiles.flatMap((p) => p.taste.bubbles ?? []);

  return {
    label: "Blend",
    category: base.category,
    glassShape: base.glassShape,
    colors,
    clarity,
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Earth, Oak & Other",
      fruity,
      non_fruity,
    },
    taste: {
      sweet: dedupe(profiles.flatMap((p) => p.taste.sweet)),
      acidity: dedupe(profiles.flatMap((p) => p.taste.acidity)),
      body: dedupe(profiles.flatMap((p) => p.taste.body)),
      finish: dedupe(profiles.flatMap((p) => p.taste.finish)),
      ...(allTannins.length > 0 ? { tannin: dedupe(allTannins) } : {}),
      ...(allBubbles.length > 0 ? { bubbles: dedupe(allBubbles) } : {}),
    },
  };
}
