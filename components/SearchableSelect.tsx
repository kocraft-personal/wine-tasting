"use client";

import { useEffect, useRef, useState } from "react";

interface LeadingOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  leadingOptions?: LeadingOption[];
  getLabel?: (value: string) => string;
}

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className = "",
  style,
  leadingOptions = [],
  getLabel,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const filteredLeading = leadingOptions.filter(
    (o) => !query || o.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredOptions = options.filter(
    (o) => !query || o.toLowerCase().includes(query.toLowerCase())
  );
  const allFiltered: string[] = [
    ...filteredLeading.map((o) => o.value),
    ...filteredOptions,
  ];

  function openDropdown() {
    setOpen(true);
    setHighlighted(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function select(val: string) {
    onChange(val);
    setOpen(false);
    setQuery("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") { setOpen(false); setQuery(""); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, allFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && allFiltered[highlighted]) {
      e.preventDefault();
      select(allFiltered[highlighted]);
    }
  }

  const displayLabel = value
    ? (leadingOptions.find((o) => o.value === value)?.label ?? (getLabel ? getLabel(value) : value))
    : "";

  return (
    <div ref={containerRef} style={{ position: "relative", ...style }} className={className}>
      {open ? (
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setHighlighted(0); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input-wine"
          style={{ width: "100%" }}
        />
      ) : (
        <button
          type="button"
          onClick={openDropdown}
          className="input-wine"
          style={{
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
            color: displayLabel ? "var(--color-ink)" : "rgba(26,14,10,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{displayLabel || placeholder}</span>
          <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>▾</span>
        </button>
      )}

      {open && (
        <div
          ref={listRef}
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            right: 0,
            zIndex: 100,
            maxHeight: "220px",
            overflowY: "auto",
            background: "var(--color-paper)",
            border: "1px solid rgba(212,184,106,0.35)",
            borderRadius: "2px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.45)",
          }}
        >
          {filteredLeading.map((o, i) => (
            <div
              key={o.value}
              onMouseDown={() => select(o.value)}
              onMouseEnter={() => setHighlighted(i)}
              style={{
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
                fontSize: "0.82rem",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.05em",
                color: "var(--color-oxblood)",
                fontWeight: 600,
                background: highlighted === i ? "rgba(74,14,19,0.1)" : "transparent",
                borderBottom: "1px solid rgba(74,14,19,0.12)",
              }}
            >
              {o.label}
            </div>
          ))}

          {filteredOptions.map((o, i) => {
            const idx = filteredLeading.length + i;
            return (
              <div
                key={o}
                onMouseDown={() => select(o)}
                onMouseEnter={() => setHighlighted(idx)}
                style={{
                  padding: "0.4rem 0.75rem",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-ink)",
                  background:
                    highlighted === idx
                      ? "rgba(74,14,19,0.08)"
                      : o === value
                      ? "rgba(212,184,106,0.15)"
                      : "transparent",
                }}
              >
                {getLabel ? getLabel(o) : o}
              </div>
            );
          })}

          {allFiltered.length === 0 && (
            <div
              style={{
                padding: "0.5rem 0.75rem",
                fontSize: "0.8rem",
                color: "rgba(26,14,10,0.4)",
                fontStyle: "italic",
              }}
            >
              No matches
            </div>
          )}
        </div>
      )}
    </div>
  );
}
