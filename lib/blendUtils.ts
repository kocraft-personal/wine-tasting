import { WINE_STYLES, type WineStyleProfile } from "./wineStyles";
import type { BlendComponent } from "./types";

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

function weightedPick<T>(
  lists: { items: T[]; pct: number }[],
  total: number,
  maxItems = 5
): T[] {
  const sorted = [...lists].sort((a, b) => b.pct - a.pct);
  const result: T[] = [];
  const seen = new Set<string>();

  // Dominant grape(s): take proportionally more items
  for (const { items, pct } of sorted) {
    const share = pct / 100;
    const count = total <= 1 ? maxItems : Math.max(1, Math.round(share * maxItems));
    for (const item of items) {
      if (result.length >= maxItems) break;
      const key = String(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
      if (result.length >= count && sorted.length > 1) break;
    }
  }

  // Fill remaining slots from dominant grape if under maxItems
  if (result.length < maxItems && sorted.length > 0) {
    for (const item of sorted[0].items) {
      if (result.length >= maxItems) break;
      const key = String(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  }

  return result;
}

export function mergeBlendProfiles(
  components: (BlendComponent | string)[]
): WineStyleProfile {
  // Normalize to BlendComponent[]
  const normalized: BlendComponent[] = components.map((c) =>
    typeof c === "string" ? { varietal: c, pct: 100 / components.length } : c
  );

  const withProfiles = normalized
    .map((c) => ({ ...c, profile: WINE_STYLES[c.varietal] }))
    .filter((c) => c.profile);

  if (withProfiles.length === 0) {
    return WINE_STYLES["Cabernet Sauvignon"] ?? Object.values(WINE_STYLES)[0];
  }

  if (withProfiles.length === 1) return withProfiles[0].profile;

  // Sort by percentage descending (dominant first)
  const sorted = [...withProfiles].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0));
  const base = sorted[0].profile;
  const total = withProfiles.length;

  // Colors: dominant grape's 4 colors, swap in 1 step from secondary if >25%
  const secondary = sorted.find((c, i) => i > 0 && c.pct >= 25);
  const dominantColors = base.colors.slice(0, 4);
  let colors = dominantColors;
  if (secondary && secondary.profile.colors.length >= 2) {
    colors = [
      ...dominantColors.slice(0, 3),
      secondary.profile.colors[secondary.profile.colors.length - 1],
    ];
    colors = dedupe(colors.map((c) => c.label)).map(
      (label) => colors.find((c) => c.label === label)!
    );
  }

  const clarity = dedupe(sorted.flatMap((c) => c.profile.clarity));

  // Fruit & non-fruit: weighted selection capped at 8
  const fruityLists = sorted.map((c) => ({ items: c.profile.aromas.fruity, pct: c.pct ?? 0 }));
  const nonFruityLists = sorted.map((c) => ({ items: c.profile.aromas.non_fruity, pct: c.pct ?? 0 }));
  const fruity = weightedPick(fruityLists, total, 8);
  const non_fruity = weightedPick(nonFruityLists, total, 8);

  // Taste: weighted union (all options represented, ordered by dominance)
  const sweetsOrdered = dedupe(sorted.flatMap((c) => c.profile.taste.sweet));
  const acidOrdered = dedupe(sorted.flatMap((c) => c.profile.taste.acidity));
  const bodyOrdered = dedupe(sorted.flatMap((c) => c.profile.taste.body));
  const finishOrdered = dedupe(sorted.flatMap((c) => c.profile.taste.finish));

  const allTannins = sorted.flatMap((c) => c.profile.taste.tannin ?? []);
  const allBubbles = sorted.flatMap((c) => c.profile.taste.bubbles ?? []);

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
      sweet: sweetsOrdered,
      acidity: acidOrdered,
      body: bodyOrdered,
      finish: finishOrdered,
      ...(allTannins.length > 0 ? { tannin: dedupe(allTannins) } : {}),
      ...(allBubbles.length > 0 ? { bubbles: dedupe(allBubbles) } : {}),
    },
  };
}
