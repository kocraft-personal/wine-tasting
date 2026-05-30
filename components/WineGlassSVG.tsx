interface WineGlassSVGProps {
  liquidColor?: string;
  shape?: "white" | "burgundy" | "bordeaux" | "tulip" | "flute";
  fillLevel?: number; // 0–1
  size?: number;
}

export default function WineGlassSVG({
  liquidColor = "#8B1E2D",
  shape = "bordeaux",
  fillLevel = 0.4,
  size = 48,
}: WineGlassSVGProps) {
  // Simple SVG wine glass — shape varies by type
  const isFlute = shape === "flute";
  const isBurgundy = shape === "burgundy";

  const bowlWidth = isFlute ? 14 : isBurgundy ? 28 : 24;
  const bowlHeight = isFlute ? 36 : isBurgundy ? 26 : 28;
  const bowlX = (40 - bowlWidth) / 2;
  const bowlY = 4;

  const liquidHeight = bowlHeight * fillLevel;
  const liquidY = bowlY + bowlHeight - liquidHeight;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Liquid fill */}
      <clipPath id={`bowl-clip-${shape}`}>
        <rect x={bowlX} y={bowlY} width={bowlWidth} height={bowlHeight} rx={isBurgundy ? 14 : isFlute ? 7 : 12} />
      </clipPath>
      <rect
        x={bowlX}
        y={liquidY}
        width={bowlWidth}
        height={liquidHeight}
        fill={liquidColor}
        opacity={0.75}
        clipPath={`url(#bowl-clip-${shape})`}
      />

      {/* Bowl outline */}
      <rect
        x={bowlX}
        y={bowlY}
        width={bowlWidth}
        height={bowlHeight}
        rx={isBurgundy ? 14 : isFlute ? 7 : 12}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity={0.5}
      />

      {/* Stem */}
      <line
        x1={20} y1={bowlY + bowlHeight}
        x2={20} y2={48}
        stroke="currentColor" strokeWidth="1.5" opacity={0.5}
      />

      {/* Base */}
      <line x1={13} y1={48} x2={27} y2={48} stroke="currentColor" strokeWidth="1.5" opacity={0.5} />
    </svg>
  );
}
