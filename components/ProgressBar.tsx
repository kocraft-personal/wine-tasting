interface ProgressBarProps {
  rated: number;
  total: number;
}

export default function ProgressBar({ rated, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((rated / total) * 100);

  return (
    <div
      className="sticky top-0 z-10 px-4 py-2.5"
      style={{ background: "rgba(26,10,14,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(212,184,106,0.15)" }}
    >
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <div className="progress-bar flex-1">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", letterSpacing: "0.1em", color: "var(--color-champagne)", opacity: 0.7, whiteSpace: "nowrap" }}>
          {rated} / {total} rated
        </span>
      </div>
    </div>
  );
}
