"use client";

import { WINE_STYLE_KEYS, WINE_STYLES } from "@/lib/wineStyles";
import type { BlendComponent } from "@/lib/types";
import SearchableSelect from "./SearchableSelect";

interface BlendComposerProps {
  components: BlendComponent[];
  onChange: (components: BlendComponent[]) => void;
}

export default function BlendComposer({ components, onChange }: BlendComposerProps) {
  const total = components.reduce((sum, c) => sum + (c.pct || 0), 0);

  function addRow() {
    onChange([...components, { varietal: "", pct: 0 }]);
  }

  function removeRow(i: number) {
    onChange(components.filter((_, idx) => idx !== i));
  }

  function updateRow(i: number, field: keyof BlendComponent, value: string | number) {
    const updated = components.map((c, idx) =>
      idx === i ? { ...c, [field]: value } : c
    );
    onChange(updated);
  }

  return (
    <div className="mt-3 space-y-2">
      <p className="section-label" style={{ color: "var(--color-champagne)", opacity: 0.7 }}>
        Blend Composition
      </p>

      {components.map((comp, i) => (
        <div key={i} className="flex gap-2 items-center">
          <SearchableSelect
            value={comp.varietal}
            onChange={(v) => updateRow(i, "varietal", v)}
            options={WINE_STYLE_KEYS}
            placeholder="Search varietal…"
            getLabel={(k) => WINE_STYLES[k]?.label ?? k}
            style={{ flex: 1 }}
          />

          <div className="flex items-center gap-1" style={{ minWidth: "80px" }}>
            <input
              type="number"
              min={1}
              max={100}
              value={comp.pct || ""}
              onChange={(e) => updateRow(i, "pct", Number(e.target.value))}
              placeholder="0"
              className="input-wine"
              style={{ padding: "0.35rem 0.5rem", fontSize: "0.82rem", width: "60px" }}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-champagne)", opacity: 0.6 }}>%</span>
          </div>

          {components.length > 1 && (
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="btn-ghost"
              style={{ padding: "0.25rem 0.5rem", fontSize: "1rem", color: "rgba(245,235,214,0.4)" }}
            >
              ×
            </button>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addRow}
          className="btn-ghost"
          style={{ padding: "0.25rem 0", fontSize: "0.8rem", color: "var(--color-champagne)" }}
        >
          + Add Varietal
        </button>
        <span
          style={{
            fontSize: "0.75rem",
            color: total === 100 ? "var(--color-champagne)" : "var(--color-rose)",
          }}
        >
          Total: {total}%{total === 100 ? " ✓" : ""}
        </span>
      </div>
    </div>
  );
}
