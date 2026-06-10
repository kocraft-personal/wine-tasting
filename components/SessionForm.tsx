"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WineRowInput, { type WineRowData } from "./WineRowInput";
import type { WelcomeSettings } from "@/lib/types";

const WELCOME_GUIDE_HTML = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 18px;
    background: #2A0A0E;
    color: #1A0E0A;
    font-family: Georgia, serif;
  }
  .page {
    position: relative;
    min-height: 520px;
    padding: 28px;
    overflow: hidden;
    background:
      radial-gradient(ellipse at top right, rgba(212,184,106,.2), transparent 55%),
      #F5EBD6;
    border: 1px solid rgba(212,184,106,.55);
  }
  .page:before {
    content: "";
    position: absolute;
    inset: 14px;
    border: 1px solid rgba(74,14,19,.24);
  }
  .header { position: relative; text-align: center; }
  .eyebrow {
    font-family: Arial, sans-serif;
    font-size: 10px;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: #6E1423;
  }
  h1 {
    margin: 14px 0 8px;
    color: #4A0E13;
    font-size: 54px;
    font-style: italic;
    font-weight: 500;
    line-height: .9;
  }
  .subtitle {
    color: #3A2418;
    font-size: 18px;
    font-style: italic;
  }
  .date {
    margin-top: 10px;
    font-family: Arial, sans-serif;
    font-size: 10px;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: #6E1423;
  }
  .glasses {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    margin: 28px 0 18px;
    text-align: center;
  }
  .glass {
    height: 52px;
    border: 1px solid rgba(74,14,19,.45);
    border-radius: 50% 50% 8px 8px;
    background: linear-gradient(to top, #8B1E2D 45%, transparent 46%);
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .panel {
    min-height: 122px;
    border: 1.5px solid #4A0E13;
    padding: 16px;
    background: rgba(245,235,214,.55);
  }
  .panel h2 {
    margin: 0 0 8px;
    color: #4A0E13;
    font-size: 24px;
    font-style: italic;
  }
  .note {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(74,14,19,.22);
    color: #6E1423;
    font-style: italic;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    color: #6E1423;
    font-family: Arial, sans-serif;
    font-size: 10px;
    letter-spacing: .2em;
    text-transform: uppercase;
  }
  .tag {
    position: absolute;
    z-index: 2;
    max-width: 150px;
    padding: 6px 8px;
    background: #4A0E13;
    color: #F5EBD6;
    border: 1px solid #D4B86A;
    font-family: Arial, sans-serif;
    font-size: 10px;
    line-height: 1.3;
    letter-spacing: .04em;
    text-transform: uppercase;
    box-shadow: 0 8px 18px rgba(0,0,0,.22);
  }
  .tag:after {
    content: "";
    position: absolute;
    width: 42px;
    height: 1px;
    background: #4A0E13;
  }
  .t-eyebrow { top: 16px; left: 18px; }
  .t-eyebrow:after { top: 28px; left: 116px; transform: rotate(12deg); }
  .t-title { top: 86px; right: 20px; }
  .t-title:after { top: 18px; right: 120px; transform: rotate(-14deg); }
  .t-subtitle { top: 160px; left: 22px; }
  .t-subtitle:after { top: 14px; left: 126px; transform: rotate(-10deg); }
  .t-note { bottom: 112px; left: 24px; }
  .t-note:after { top: 22px; left: 122px; transform: rotate(18deg); }
  .t-signoff { bottom: 24px; right: 24px; }
  .t-signoff:after { top: 12px; right: 124px; transform: rotate(-8deg); }
</style>
</head>
<body>
  <section class="page">
    <div class="tag t-eyebrow">Welcome Eyebrow</div>
    <div class="tag t-title">Tasting Name</div>
    <div class="tag t-subtitle">Welcome Subtitle</div>
    <div class="tag t-note">Host Note</div>
    <div class="tag t-signoff">Signoff</div>

    <header class="header">
      <div class="eyebrow">VOLUME 01 / A PRIVATE TASTING PROGRAMME / EST. TONIGHT</div>
      <h1>Date Night<br />Wine Tasting</h1>
      <div class="subtitle">A candlelit survey of the pours on tonight's table.</div>
      <div class="date">June 10, 2026</div>
    </header>
    <div class="glasses">
      <div class="glass"></div><div class="glass"></div><div class="glass"></div>
      <div class="glass"></div><div class="glass"></div><div class="glass"></div>
    </div>
    <div class="grid">
      <div class="panel">
        <h2>How to Play</h2>
        <div>Pour, look, smell, sip, score.</div>
        <div class="note">Pour about two fingers, start light, move toward bold, and save the labels until the blind round.</div>
      </div>
      <div class="panel">
        <h2>Tonight's Lineup</h2>
        <div>01 Chardonnay</div>
        <div>02 Pinot Noir</div>
        <div>03 Cabernet Sauvignon</div>
      </div>
    </div>
    <footer class="footer">
      <span>In good taste</span>
      <span>Start tasting</span>
    </footer>
  </section>
</body>
</html>
`;

function emptyWine(): WineRowData {
  return {
    wine_name: "",
    varietal: "",
    blend_composition: [],
    region: "",
    country: "",
    custom_options: null,
  };
}

export default function SessionForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [welcomeSettings, setWelcomeSettings] = useState<WelcomeSettings>({
    eyebrow: "",
    subtitle: "",
    note: "",
    signoff: "",
  });
  const [wines, setWines] = useState<WineRowData[]>([emptyWine()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false);
  const router = useRouter();

  function updateWine(i: number, data: WineRowData) {
    setWines((prev) => prev.map((w, idx) => (idx === i ? data : w)));
  }

  function addWine() {
    setWines((prev) => [...prev, emptyWine()]);
  }

  function removeWine(i: number) {
    setWines((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateWelcomeSetting(key: keyof WelcomeSettings, value: string) {
    setWelcomeSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Please name your tasting session."); return; }
    if (wines.some((w) => !w.wine_name.trim())) {
      setError("Please give each wine a name.");
      return;
    }
    if (wines.some((w) => !w.varietal)) {
      setError("Please select a varietal or type for each wine.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), tasting_date: date || null, welcome_settings: welcomeSettings, wines }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create session");
      router.push(`/s/${data.invite_code}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Session details */}
      <div
        className="p-6 space-y-4"
        style={{
          background: "rgba(245,235,214,0.04)",
          border: "1px solid rgba(212,184,106,0.2)",
          borderRadius: "2px",
        }}
      >
        <div>
          <label className="section-label block mb-1.5" style={{ color: "var(--color-champagne)" }}>
            Tasting Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Kyle's Birthday Tasting"
            className="input-wine"
            required
          />
        </div>

        <div>
          <label className="section-label block mb-1.5" style={{ color: "var(--color-champagne)" }}>
            Date (optional)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-wine"
            style={{ colorScheme: "light" }}
          />
        </div>
      </div>

      {/* Welcome page */}
      <div
        className="p-6 space-y-4"
        style={{
          background: "rgba(245,235,214,0.04)",
          border: "1px solid rgba(212,184,106,0.2)",
          borderRadius: "2px",
        }}
      >
        <div className="welcome-form-header">
          <div>
            <h2>Welcome Page</h2>
            <p>These optional fields personalize the cover screen guests see before rating wines.</p>
          </div>
          <button
            type="button"
            className="welcome-guide-toggle"
            onClick={() => setShowWelcomeGuide((prev) => !prev)}
            aria-expanded={showWelcomeGuide}
            aria-controls="welcome-page-guide"
          >
            {showWelcomeGuide ? "Hide Example" : "View Example"}
          </button>
        </div>

        {showWelcomeGuide && (
          <div id="welcome-page-guide" className="welcome-guide">
            <div className="welcome-guide-copy">
              <strong>Annotated welcome page</strong>
              <span>The preview points to each editable field. The wine glasses and lineup are filled from the wines you add below.</span>
            </div>
            <iframe
              title="Annotated welcome page example"
              className="welcome-guide-frame"
              srcDoc={WELCOME_GUIDE_HTML}
            />
          </div>
        )}

        <div>
          <label className="section-label block mb-1.5" style={{ color: "var(--color-champagne)" }}>
            Welcome Eyebrow (optional)
          </label>
          <p className="field-hint">
            Appears as the small all-caps line above the big tasting name. Best for edition, vibe, or host context.
          </p>
          <input
            type="text"
            value={welcomeSettings.eyebrow ?? ""}
            onChange={(e) => updateWelcomeSetting("eyebrow", e.target.value)}
            placeholder="VOLUME 01 / A PRIVATE TASTING PROGRAMME / EST. TONIGHT"
            className="input-wine"
            maxLength={90}
          />
        </div>

        <div>
          <label className="section-label block mb-1.5" style={{ color: "var(--color-champagne)" }}>
            Welcome Subtitle (optional)
          </label>
          <p className="field-hint">
            Appears directly below the tasting name in italic display type. Use one short sentence.
          </p>
          <input
            type="text"
            value={welcomeSettings.subtitle ?? ""}
            onChange={(e) => updateWelcomeSetting("subtitle", e.target.value)}
            placeholder="A candlelit survey of the pours on tonight's table."
            className="input-wine"
            maxLength={120}
          />
        </div>

        <div>
          <label className="section-label block mb-1.5" style={{ color: "var(--color-champagne)" }}>
            Host Note (optional)
          </label>
          <p className="field-hint">
            Appears at the bottom of the How to Play box. Good for house rules, blind tasting reminders, or pacing notes.
          </p>
          <textarea
            value={welcomeSettings.note ?? ""}
            onChange={(e) => updateWelcomeSetting("note", e.target.value)}
            placeholder="Pour about two fingers, start light, move toward bold, and save the labels until the blind round."
            className="input-wine"
            rows={3}
            maxLength={220}
          />
        </div>

        <div>
          <label className="section-label block mb-1.5" style={{ color: "var(--color-champagne)" }}>
            Signoff (optional)
          </label>
          <p className="field-hint">
            Appears in the footer before the guest name. Keep it short, like a programme credit.
          </p>
          <input
            type="text"
            value={welcomeSettings.signoff ?? ""}
            onChange={(e) => updateWelcomeSetting("signoff", e.target.value)}
            placeholder="In good taste"
            className="input-wine"
            maxLength={60}
          />
        </div>
      </div>

      {/* Wines */}
      <div>
        <div className="rule-deco mb-4">
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-champagne)" }}>
            THE LINEUP
          </span>
        </div>

        <div className="space-y-3">
          {wines.map((wine, i) => (
            <WineRowInput
              key={i}
              index={i}
              data={wine}
              onChange={(data) => updateWine(i, data)}
              onRemove={() => removeWine(i)}
              canRemove={wines.length > 1}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addWine}
          className="btn-secondary mt-3 w-full"
        >
          + Add Another Wine
        </button>
      </div>

      {error && (
        <p style={{ color: "var(--color-rose)", fontSize: "0.85rem", textAlign: "center" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
        style={{ fontSize: "0.9rem", padding: "0.8rem", opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Creating…" : "Start the Tasting Night"}
      </button>
    </form>
  );
}
