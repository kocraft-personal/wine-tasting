"use client";

import { useState } from "react";

interface AromaCheckboxGridProps {
  fruityLabel: string;
  nonFruityLabel: string;
  fruityOptions: string[];
  nonFruityOptions: string[];
  selectedFruity: string[];
  selectedNonFruity: string[];
  fruityOther: string;
  nonFruityOther: string;
  onFruityChange: (selected: string[]) => void;
  onNonFruityChange: (selected: string[]) => void;
  onFruityOtherChange: (val: string) => void;
  onNonFruityOtherChange: (val: string) => void;
}

function AromaColumn({
  label,
  options,
  selected,
  other,
  onChange,
  onOtherChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  other: string;
  onChange: (selected: string[]) => void;
  onOtherChange: (val: string) => void;
}) {
  const [otherChecked, setOtherChecked] = useState(!!other);

  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  }

  function toggleOther(checked: boolean) {
    setOtherChecked(checked);
    if (!checked) onOtherChange("");
  }

  return (
    <div>
      <p className="section-label mb-2" style={{ fontSize: "0.6rem", opacity: 0.7, color: "var(--color-oxblood)" }}>
        {label}
      </p>
      <div className="space-y-0.5">
        {options.map((opt) => (
          <label key={opt} className="aroma-item">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}

        {/* Other */}
        <label className="aroma-item" style={{ marginTop: "0.25rem" }}>
          <input
            type="checkbox"
            checked={otherChecked}
            onChange={(e) => toggleOther(e.target.checked)}
          />
          <span style={{ fontStyle: "italic", opacity: 0.7 }}>Other…</span>
        </label>
        {otherChecked && (
          <input
            type="text"
            value={other}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Describe the aroma…"
            className="input-wine mt-1"
            style={{ fontSize: "0.78rem", padding: "0.25rem 0.5rem" }}
            autoFocus
          />
        )}
      </div>
    </div>
  );
}

export default function AromaCheckboxGrid({
  fruityLabel,
  nonFruityLabel,
  fruityOptions,
  nonFruityOptions,
  selectedFruity,
  selectedNonFruity,
  fruityOther,
  nonFruityOther,
  onFruityChange,
  onNonFruityChange,
  onFruityOtherChange,
  onNonFruityOtherChange,
}: AromaCheckboxGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <AromaColumn
        label={fruityLabel}
        options={fruityOptions}
        selected={selectedFruity}
        other={fruityOther}
        onChange={onFruityChange}
        onOtherChange={onFruityOtherChange}
      />
      <AromaColumn
        label={nonFruityLabel}
        options={nonFruityOptions}
        selected={selectedNonFruity}
        other={nonFruityOther}
        onChange={onNonFruityChange}
        onOtherChange={onNonFruityOtherChange}
      />
    </div>
  );
}
