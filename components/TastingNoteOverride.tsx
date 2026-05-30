"use client";

import { useState } from "react";
import type { CustomOptions } from "@/lib/types";
import type { WineStyleProfile } from "@/lib/wineStyles";

interface TastingNoteOverrideProps {
  defaults: WineStyleProfile;
  value: CustomOptions | null;
  onChange: (custom: CustomOptions | null) => void;
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontSize: "0.58rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--color-champagne)",
  opacity: 0.55,
  display: "block",
  marginBottom: "6px",
};

const TAG_STYLE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  padding: "0.18rem 0.55rem",
  border: "1px solid rgba(212,184,106,0.3)",
  borderRadius: "100px",
  fontSize: "0.72rem",
  fontFamily: "var(--font-body)",
  color: "var(--color-champagne)",
  background: "rgba(212,184,106,0.06)",
};

function TagEditor({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  function addTag() {
    const v = input.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput("");
  }

  return (
    <div>
      <span style={LABEL_STYLE}>{label}</span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
        {tags.map((t, i) => (
          <span key={i} style={TAG_STYLE}>
            {t}
            <button
              type="button"
              onClick={() => onChange(tags.filter((_, idx) => idx !== i))}
              style={{
                background: "none",
                border: "none",
                color: "rgba(212,184,106,0.5)",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
                fontSize: "0.85rem",
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder="Add option…"
          style={{
            flex: 1,
            background: "rgba(245,235,214,0.05)",
            border: "none",
            borderBottom: "1px solid rgba(212,184,106,0.3)",
            padding: "0.3rem 0.25rem",
            fontSize: "0.78rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-champagne)",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={addTag}
          style={{
            background: "none",
            border: "none",
            padding: "0.25rem 0.1rem",
            fontSize: "0.72rem",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.1em",
            color: "var(--color-champagne)",
            opacity: 0.5,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default function TastingNoteOverride({
  defaults,
  value,
  onChange,
}: TastingNoteOverrideProps) {
  const [open, setOpen] = useState(false);

  const current: CustomOptions = value ?? {
    colors: defaults.colors,
    clarity: defaults.clarity,
    aromas: {
      fruity_label: defaults.aromas.fruity_label,
      non_fruity_label: defaults.aromas.non_fruity_label,
      fruity: [...defaults.aromas.fruity],
      non_fruity: [...defaults.aromas.non_fruity],
    },
    taste: { ...defaults.taste },
  };

  function patch(partial: Partial<CustomOptions>) {
    onChange({ ...current, ...partial });
  }

  const divider = (
    <div style={{ borderTop: "1px solid rgba(212,184,106,0.1)", margin: "12px 0" }} />
  );

  return (
    <div style={{ marginTop: "8px" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "var(--font-heading)",
          fontSize: "0.62rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-champagne)",
          opacity: 0.45,
        }}
      >
        {open ? "▾" : "▸"} Customize Tasting Notes
      </button>

      {open && (
        <div
          style={{
            marginTop: "10px",
            padding: "14px 16px",
            border: "1px solid rgba(212,184,106,0.15)",
            borderRadius: "2px",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <TagEditor
            label="Colors"
            tags={current.colors?.map((c) => c.label) ?? []}
            onChange={(labels) =>
              patch({
                colors: labels.map((l) => {
                  const existing = defaults.colors.find((c) => c.label === l);
                  return existing ?? { label: l, hex: "#888888" };
                }),
              })
            }
          />
          {divider}
          <TagEditor
            label="Clarity"
            tags={current.clarity ?? []}
            onChange={(tags) => patch({ clarity: tags })}
          />
          {divider}
          <TagEditor
            label={`Aromas — ${current.aromas?.fruity_label ?? "Fruity"}`}
            tags={current.aromas?.fruity ?? []}
            onChange={(tags) => patch({ aromas: { ...current.aromas, fruity: tags } })}
          />
          {divider}
          <TagEditor
            label={`Aromas — ${current.aromas?.non_fruity_label ?? "Other"}`}
            tags={current.aromas?.non_fruity ?? []}
            onChange={(tags) => patch({ aromas: { ...current.aromas, non_fruity: tags } })}
          />
          {divider}
          <TagEditor
            label="Sweetness"
            tags={current.taste?.sweet ?? []}
            onChange={(tags) => patch({ taste: { ...current.taste, sweet: tags } })}
          />
          {divider}
          <TagEditor
            label="Acidity"
            tags={current.taste?.acidity ?? []}
            onChange={(tags) => patch({ taste: { ...current.taste, acidity: tags } })}
          />
          {divider}
          <TagEditor
            label="Body"
            tags={current.taste?.body ?? []}
            onChange={(tags) => patch({ taste: { ...current.taste, body: tags } })}
          />
          {divider}
          <TagEditor
            label="Finish"
            tags={current.taste?.finish ?? []}
            onChange={(tags) => patch({ taste: { ...current.taste, finish: tags } })}
          />
          {(current.taste?.tannin ?? defaults.taste.tannin) && (
            <>
              {divider}
              <TagEditor
                label="Tannin"
                tags={current.taste?.tannin ?? defaults.taste.tannin ?? []}
                onChange={(tags) => patch({ taste: { ...current.taste, tannin: tags } })}
              />
            </>
          )}
          {(current.taste?.bubbles ?? defaults.taste.bubbles) && (
            <>
              {divider}
              <TagEditor
                label="Bubbles"
                tags={current.taste?.bubbles ?? defaults.taste.bubbles ?? []}
                onChange={(tags) => patch({ taste: { ...current.taste, bubbles: tags } })}
              />
            </>
          )}

          <div style={{ borderTop: "1px solid rgba(212,184,106,0.1)", marginTop: "14px", paddingTop: "10px" }}>
            <button
              type="button"
              onClick={() => onChange(null)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "var(--font-heading)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(201,123,123,0.6)",
              }}
            >
              Reset to defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
