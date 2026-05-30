"use client";

import { useState } from "react";

interface TasteRowProps {
  label: string;
  options: string[];
  selected: string | null;
  other: string;
  onSelect: (val: string | null) => void;
  onOtherChange: (val: string) => void;
}

function TasteRow({ label, options, selected, other, onSelect, onOtherChange }: TasteRowProps) {
  const otherSelected = selected === "OTHER";

  function pick(opt: string) {
    if (opt === "OTHER") {
      onSelect(otherSelected ? null : "OTHER");
    } else {
      onSelect(selected === opt ? null : opt);
    }
  }

  return (
    <div className="mb-3">
      <p className="section-label mb-1.5" style={{ opacity: 0.7, color: "var(--color-oxblood)" }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => pick(opt)}
            className={`pill${selected === opt ? " selected" : ""}`}
          >
            {opt}
          </button>
        ))}
        <button
          type="button"
          onClick={() => pick("OTHER")}
          className={`pill${otherSelected ? " selected" : ""}`}
          style={{ fontStyle: "italic", opacity: 0.75 }}
        >
          Other…
        </button>
      </div>
      {otherSelected && (
        <input
          type="text"
          value={other}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder={`Describe the ${label.toLowerCase()}…`}
          className="input-wine mt-2"
          style={{ fontSize: "0.82rem", padding: "0.3rem 0.6rem" }}
          autoFocus
        />
      )}
    </div>
  );
}

export interface TasteValues {
  sweet: string | null;
  sweet_other: string;
  tannin: string | null;
  tannin_other: string;
  acidity: string | null;
  acidity_other: string;
  body: string | null;
  body_other: string;
  finish: string | null;
  finish_other: string;
  bubbles: string | null;
  bubbles_other: string;
}

interface TasteSectionProps {
  options: {
    sweet: string[];
    tannin?: string[];
    acidity: string[];
    body: string[];
    finish: string[];
    bubbles?: string[];
    sweetness_intensity?: string[];
  };
  values: TasteValues;
  onChange: (values: TasteValues) => void;
}

export default function TasteSection({ options, values, onChange }: TasteSectionProps) {
  function patch(partial: Partial<TasteValues>) {
    onChange({ ...values, ...partial });
  }

  return (
    <div>
      <TasteRow
        label="Sweetness"
        options={options.sweet}
        selected={values.sweet}
        other={values.sweet_other}
        onSelect={(v) => patch({ sweet: v })}
        onOtherChange={(v) => patch({ sweet_other: v })}
      />
      {options.tannin && (
        <TasteRow
          label="Tannin"
          options={options.tannin}
          selected={values.tannin}
          other={values.tannin_other}
          onSelect={(v) => patch({ tannin: v })}
          onOtherChange={(v) => patch({ tannin_other: v })}
        />
      )}
      <TasteRow
        label="Acidity"
        options={options.acidity}
        selected={values.acidity}
        other={values.acidity_other}
        onSelect={(v) => patch({ acidity: v })}
        onOtherChange={(v) => patch({ acidity_other: v })}
      />
      <TasteRow
        label="Body"
        options={options.body}
        selected={values.body}
        other={values.body_other}
        onSelect={(v) => patch({ body: v })}
        onOtherChange={(v) => patch({ body_other: v })}
      />
      <TasteRow
        label="Finish"
        options={options.finish}
        selected={values.finish}
        other={values.finish_other}
        onSelect={(v) => patch({ finish: v })}
        onOtherChange={(v) => patch({ finish_other: v })}
      />
      {options.bubbles && (
        <TasteRow
          label="Bubbles"
          options={options.bubbles}
          selected={values.bubbles}
          other={values.bubbles_other}
          onSelect={(v) => patch({ bubbles: v })}
          onOtherChange={(v) => patch({ bubbles_other: v })}
        />
      )}
    </div>
  );
}
