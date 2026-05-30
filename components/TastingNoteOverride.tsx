"use client";

import { useState } from "react";
import type { CustomOptions } from "@/lib/types";
import type { WineStyleProfile } from "@/lib/wineStyles";

interface TastingNoteOverrideProps {
  defaults: WineStyleProfile;
  value: CustomOptions | null;
  onChange: (custom: CustomOptions | null) => void;
}

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
    if (v && !tags.includes(v)) {
      onChange([...tags, v]);
    }
    setInput("");
  }

  function removeTag(i: number) {
    onChange(tags.filter((_, idx) => idx !== i));
  }

  return (
    <div className="mb-3">
      <p className="section-label mb-1" style={{ opacity: 0.6, fontSize: "0.6rem" }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-1 mb-1.5">
        {tags.map((t, i) => (
          <span
            key={i}
            className="pill selected"
            style={{ fontSize: "0.72rem", padding: "0.15rem 0.5rem", gap: "0.3rem", cursor: "default" }}
          >
            {t}
            <button
              type="button"
              onClick={() => removeTag(i)}
              style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", lineHeight: 1, padding: 0 }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder="Add option…"
          className="input-wine"
          style={{ padding: "0.25rem 0.5rem", fontSize: "0.78rem", flex: 1 }}
        />
        <button
          type="button"
          onClick={addTag}
          className="btn-secondary"
          style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
        >
          Add
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

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="btn-ghost"
        style={{ padding: "0.25rem 0", fontSize: "0.8rem", color: "var(--color-champagne)", opacity: 0.7 }}
      >
        {open ? "▾" : "▸"} Customize Tasting Notes
      </button>

      {open && (
        <div
          className="mt-3 p-4 space-y-1"
          style={{
            background: "rgba(245,235,214,0.04)",
            border: "1px solid rgba(212,184,106,0.15)",
            borderRadius: "2px",
          }}
        >
          <TagEditor
            label="Appearance Colors"
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
          <TagEditor
            label="Clarity Options"
            tags={current.clarity ?? []}
            onChange={(tags) => patch({ clarity: tags })}
          />
          <TagEditor
            label={`Aromas — ${current.aromas?.fruity_label ?? "Fruity"}`}
            tags={current.aromas?.fruity ?? []}
            onChange={(tags) =>
              patch({ aromas: { ...current.aromas, fruity: tags } })
            }
          />
          <TagEditor
            label={`Aromas — ${current.aromas?.non_fruity_label ?? "Other"}`}
            tags={current.aromas?.non_fruity ?? []}
            onChange={(tags) =>
              patch({ aromas: { ...current.aromas, non_fruity: tags } })
            }
          />
          <TagEditor
            label="Sweetness"
            tags={current.taste?.sweet ?? []}
            onChange={(tags) =>
              patch({ taste: { ...current.taste, sweet: tags } })
            }
          />
          <TagEditor
            label="Acidity"
            tags={current.taste?.acidity ?? []}
            onChange={(tags) =>
              patch({ taste: { ...current.taste, acidity: tags } })
            }
          />
          <TagEditor
            label="Body"
            tags={current.taste?.body ?? []}
            onChange={(tags) =>
              patch({ taste: { ...current.taste, body: tags } })
            }
          />
          <TagEditor
            label="Finish"
            tags={current.taste?.finish ?? []}
            onChange={(tags) =>
              patch({ taste: { ...current.taste, finish: tags } })
            }
          />
          {(current.taste?.tannin ?? defaults.taste.tannin) && (
            <TagEditor
              label="Tannin"
              tags={current.taste?.tannin ?? defaults.taste.tannin ?? []}
              onChange={(tags) =>
                patch({ taste: { ...current.taste, tannin: tags } })
              }
            />
          )}
          {(current.taste?.bubbles ?? defaults.taste.bubbles) && (
            <TagEditor
              label="Bubbles"
              tags={current.taste?.bubbles ?? defaults.taste.bubbles ?? []}
              onChange={(tags) =>
                patch({ taste: { ...current.taste, bubbles: tags } })
              }
            />
          )}

          <button
            type="button"
            onClick={() => onChange(null)}
            className="btn-ghost"
            style={{ padding: "0.25rem 0", fontSize: "0.75rem", color: "var(--color-rose)", opacity: 0.7 }}
          >
            Reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}
