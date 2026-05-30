"use client";

interface ColorSwatch {
  label: string;
  hex: string;
}

interface ColorSwatchPickerProps {
  swatches: ColorSwatch[];
  selected: string | null;  // selected hex
  onChange: (hex: string | null, label: string | null) => void;
}

export default function ColorSwatchPicker({ swatches, selected, onChange }: ColorSwatchPickerProps) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      {swatches.map((s) => {
        const isSelected = selected === s.hex;
        return (
          <button
            key={s.hex}
            type="button"
            title={s.label}
            onClick={() => onChange(isSelected ? null : s.hex, isSelected ? null : s.label)}
            className={`swatch${isSelected ? " selected" : ""}`}
            style={{ backgroundColor: s.hex }}
            aria-label={s.label}
            aria-pressed={isSelected}
          />
        );
      })}
      {selected && (
        <span style={{ fontSize: "0.75rem", color: "rgba(26,14,10,0.5)", alignSelf: "center" }}>
          {swatches.find((s) => s.hex === selected)?.label}
        </span>
      )}
    </div>
  );
}
