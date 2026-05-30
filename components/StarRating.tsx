"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number | null;
  onChange: (stars: number | null) => void;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ value, onChange, size = "md" }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  const sizes = { sm: "1rem", md: "1.5rem", lg: "2rem" };
  const fontSize = sizes[size];

  const display = hover ?? value ?? 0;

  return (
    <div
      className="flex gap-0.5"
      onMouseLeave={() => setHover(null)}
      role="group"
      aria-label="Star rating"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n !== 1 ? "s" : ""}`}
          aria-pressed={value === n}
          onClick={() => onChange(value === n ? null : n)}
          onMouseEnter={() => setHover(n)}
          className={`star${display >= n ? " filled" : ""}`}
          style={{ fontSize, background: "none", border: "none", padding: "0 1px" }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
