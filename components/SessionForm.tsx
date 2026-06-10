"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WineRowInput, { type WineRowData } from "./WineRowInput";
import type { WelcomeSettings } from "@/lib/types";

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
        <div>
          <label className="section-label block mb-1.5" style={{ color: "var(--color-champagne)" }}>
            Welcome Eyebrow (optional)
          </label>
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
