"use client";

import type { WtProfile, WtSession, WtSessionWine, WelcomeSettings, WineStyleKey } from "@/lib/types";
import WineGlassSVG from "./WineGlassSVG";

interface WelcomePageProps {
  session: WtSession;
  wines: WtSessionWine[];
  profile: WtProfile | null;
  copied: boolean;
  onCopy: () => void;
  onStart: () => void;
}

const DEFAULT_WELCOME: Required<WelcomeSettings> = {
  eyebrow: "VOLUME 01 / A PRIVATE TASTING PROGRAMME / EST. TONIGHT",
  subtitle: "A candlelit survey of the pours on tonight's table.",
  note: "Pour about two fingers, start light, move toward bold, and save the labels until the blind round.",
  signoff: "In good taste",
};

const STYLE_VISUALS: Record<WineStyleKey, { shape: "white" | "burgundy" | "bordeaux" | "tulip" | "flute"; color: string }> = {
  sparkling: { shape: "flute", color: "#E8DD8C" },
  white_crisp: { shape: "white", color: "#DDD590" },
  white_aromatic: { shape: "white", color: "#E8DD8C" },
  white_oaked: { shape: "white", color: "#E5CE8E" },
  rose: { shape: "tulip", color: "#E29CA5" },
  red_light: { shape: "burgundy", color: "#963244" },
  red_medium: { shape: "burgundy", color: "#7A1F32" },
  red_bold: { shape: "bordeaux", color: "#4A0E13" },
  dessert: { shape: "white", color: "#B0833A" },
  orange: { shape: "white", color: "#C87935" },
  blend: { shape: "burgundy", color: "#56152D" },
};

function compact(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function formatDate(value: string | null) {
  if (!value) return "Tonight";
  return new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function WelcomePage({ session, wines, profile, copied, onCopy, onStart }: WelcomePageProps) {
  const settings = session.welcome_settings ?? {};
  const eyebrow = compact(settings.eyebrow, DEFAULT_WELCOME.eyebrow);
  const subtitle = compact(settings.subtitle, DEFAULT_WELCOME.subtitle);
  const note = compact(settings.note, DEFAULT_WELCOME.note);
  const signoff = compact(settings.signoff, DEFAULT_WELCOME.signoff);
  const tasterName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen bg-dark-wine px-4 py-6 sm:py-10">
      <main className="welcome-program max-w-5xl mx-auto">
        <span className="welcome-corner tl" />
        <span className="welcome-corner tr" />
        <span className="welcome-corner bl" />
        <span className="welcome-corner br" />

        <header className="welcome-header">
          <div className="welcome-eyebrow">{eyebrow}</div>
          <h1>{session.name}</h1>
          <p className="welcome-subtitle">{subtitle}</p>
          <p className="welcome-date">{formatDate(session.tasting_date)}</p>
        </header>

        <section className="welcome-glasses" aria-label="Tonight's wine lineup">
          {wines.map((wine) => {
            const visual = STYLE_VISUALS[wine.wine_style] ?? STYLE_VISUALS.red_medium;
            return (
              <div key={wine.id} className="welcome-glass">
                <WineGlassSVG shape={visual.shape} liquidColor={visual.color} size={72} fillLevel={0.58} />
                <span>{String(wine.position).padStart(2, "0")}</span>
                <strong>{wine.varietal || wine.wine_name}</strong>
              </div>
            );
          })}
        </section>

        <div className="rule-deco welcome-rule">
          <span />
        </div>

        <section className="welcome-grid">
          <div className="welcome-panel">
            <h2>How to Play</h2>
            <ol>
              <li><strong>Pour</strong> a small taste and keep water close.</li>
              <li><strong>Look</strong> at color, clarity, and weight in the glass.</li>
              <li><strong>Smell</strong> once, swirl, then smell again.</li>
              <li><strong>Sip</strong> for sweetness, acid, body, tannin, and finish.</li>
              <li><strong>Score</strong> the wine before the table starts lobbying.</li>
            </ol>
            <p>{note}</p>
          </div>

          <div className="welcome-panel welcome-lineup">
            <div className="welcome-panel-head">
              <h2>Tonight&apos;s Lineup</h2>
              <span>{wines.length} pour{wines.length === 1 ? "" : "s"}</span>
            </div>
            <ul>
              {wines.map((wine) => (
                <li key={wine.id}>
                  <span>{String(wine.position).padStart(2, "0")}</span>
                  <div>
                    <strong>{wine.wine_name}</strong>
                    <small>{[wine.varietal, wine.region, wine.country].filter(Boolean).join(" / ") || "Mystery pour"}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="welcome-footer">
          <div>
            <span>{signoff}</span>
            {tasterName && <small>Tasting as {tasterName}</small>}
          </div>
          <div className="welcome-actions">
            <button type="button" onClick={onCopy} className="btn-secondary">
              {copied ? "Copied!" : "Share Link"}
            </button>
            <button type="button" onClick={onStart} className="btn-primary">
              Start Tasting
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
