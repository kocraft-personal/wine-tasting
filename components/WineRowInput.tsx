"use client";

import { WINE_STYLE_KEYS, WINE_STYLES } from "@/lib/wineStyles";
import { mergeBlendProfiles } from "@/lib/blendUtils";
import type { BlendComponent, CustomOptions } from "@/lib/types";
import BlendComposer from "./BlendComposer";
import TastingNoteOverride from "./TastingNoteOverride";
import SearchableSelect from "./SearchableSelect";

export interface WineRowData {
  wine_name: string;
  varietal: string;  // "" means blend
  blend_composition: BlendComponent[];
  region: string;
  country: string;
  custom_options: CustomOptions | null;
}

interface WineRowInputProps {
  index: number;
  data: WineRowData;
  onChange: (data: WineRowData) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const COUNTRIES = [
  "Argentina", "Australia", "Austria", "Canada", "Chile", "France",
  "Germany", "Greece", "Hungary", "Italy", "New Zealand", "Portugal",
  "South Africa", "Spain", "United States", "Other",
];

export default function WineRowInput({ index, data, onChange, onRemove, canRemove }: WineRowInputProps) {
  const isBlend = data.varietal === "BLEND";
  const profile = isBlend
    ? mergeBlendProfiles(data.blend_composition.map((c) => c.varietal).filter(Boolean))
    : (data.varietal ? WINE_STYLES[data.varietal] : null);

  function patch(partial: Partial<WineRowData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div
      className="p-4 space-y-3"
      style={{
        background: "rgba(245,235,214,0.03)",
        border: "1px solid rgba(212,184,106,0.15)",
        borderRadius: "2px",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            color: "var(--color-champagne)",
            opacity: 0.7,
            fontStyle: "italic",
          }}
        >
          Wine {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="btn-ghost"
            style={{ padding: "0.2rem 0.4rem", fontSize: "0.75rem", color: "rgba(201,123,123,0.7)" }}
          >
            Remove
          </button>
        )}
      </div>

      {/* Wine name */}
      <div>
        <label className="section-label block mb-1" style={{ color: "var(--color-champagne)", opacity: 0.6 }}>
          Wine Name
        </label>
        <input
          type="text"
          value={data.wine_name}
          onChange={(e) => patch({ wine_name: e.target.value })}
          placeholder="e.g., Stag's Leap Cask 23"
          className="input-wine"
        />
      </div>

      {/* Varietal / Type */}
      <div>
        <label className="section-label block mb-1" style={{ color: "var(--color-champagne)", opacity: 0.6 }}>
          Varietal / Type
        </label>
        <SearchableSelect
          value={data.varietal}
          onChange={(v) => patch({
            varietal: v,
            blend_composition: v === "BLEND" ? [{ varietal: "", pct: 50 }, { varietal: "", pct: 50 }] : [],
            custom_options: null,
          })}
          options={WINE_STYLE_KEYS}
          placeholder="Search varietal…"
          leadingOptions={[{ value: "BLEND", label: "— Blend (multi-varietal) —" }]}
          getLabel={(k) => WINE_STYLES[k]?.label ?? k}
        />
      </div>

      {/* Blend composer */}
      {isBlend && (
        <BlendComposer
          components={data.blend_composition}
          onChange={(components) => patch({ blend_composition: components })}
        />
      )}

      {/* Location (optional) */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="section-label block mb-1" style={{ color: "var(--color-champagne)", opacity: 0.6 }}>
            Region (optional)
          </label>
          <input
            type="text"
            value={data.region}
            onChange={(e) => patch({ region: e.target.value })}
            placeholder="Napa Valley"
            className="input-wine"
          />
        </div>
        <div style={{ minWidth: "140px" }}>
          <label className="section-label block mb-1" style={{ color: "var(--color-champagne)", opacity: 0.6 }}>
            Country (optional)
          </label>
          <SearchableSelect
            value={data.country}
            onChange={(v) => patch({ country: v })}
            options={COUNTRIES}
            placeholder="Country…"
          />
        </div>
      </div>

      {/* Tasting note overrides */}
      {profile && (
        <TastingNoteOverride
          defaults={profile}
          value={data.custom_options}
          onChange={(custom_options) => patch({ custom_options })}
        />
      )}
    </div>
  );
}
