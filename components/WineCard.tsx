"use client";

import { useCallback, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { WINE_STYLES } from "@/lib/wineStyles";
import { mergeBlendProfiles } from "@/lib/blendUtils";
import type { WtRating, WtSessionWine } from "@/lib/types";
import ColorSwatchPicker from "./ColorSwatchPicker";
import AromaCheckboxGrid from "./AromaCheckboxGrid";
import TasteSection, { type TasteValues } from "./TasteSection";
import StarRating from "./StarRating";
import WineGlassSVG from "./WineGlassSVG";

interface WineCardProps {
  wine: WtSessionWine;
  sessionId: string;
  userId: string;
  initialRating: WtRating | null;
  onRated?: (wineId: string, rated: boolean) => void;
}

function resolveOptions(wine: WtSessionWine) {
  if (wine.custom_options) {
    const d = wine.wine_style === "blend"
      ? mergeBlendProfiles((wine.blend_composition ?? []).filter((c) => c.varietal))
      : (wine.varietal ? WINE_STYLES[wine.varietal] : null) ?? Object.values(WINE_STYLES)[0];
    return {
      colors: wine.custom_options.colors ?? d.colors,
      clarity: wine.custom_options.clarity ?? d.clarity,
      aromas: {
        fruity_label: wine.custom_options.aromas?.fruity_label ?? d.aromas.fruity_label,
        non_fruity_label: wine.custom_options.aromas?.non_fruity_label ?? d.aromas.non_fruity_label,
        fruity: wine.custom_options.aromas?.fruity ?? d.aromas.fruity,
        non_fruity: wine.custom_options.aromas?.non_fruity ?? d.aromas.non_fruity,
      },
      taste: { ...d.taste, ...wine.custom_options.taste },
      glassShape: d.glassShape,
    };
  }
  if (wine.wine_style === "blend") {
    return mergeBlendProfiles((wine.blend_composition ?? []).filter((c) => c.varietal));
  }
  const profile = wine.varietal ? WINE_STYLES[wine.varietal] : null;
  return profile ?? Object.values(WINE_STYLES)[0];
}

export default function WineCard({ wine, sessionId, userId, initialRating, onRated }: WineCardProps) {
  const options = resolveOptions(wine);

  const [lookColor, setLookColor] = useState(initialRating?.look_color_hex ?? null);
  const [lookColorLabel, setLookColorLabel] = useState(initialRating?.look_color ?? null);
  const [lookClarity, setLookClarity] = useState(initialRating?.look_clarity ?? null);
  const [lookClarityOther, setLookClarityOther] = useState(initialRating?.look_clarity_other ?? "");
  const [aromasFruity, setAromasFruity] = useState<string[]>(initialRating?.aromas_fruity ?? []);
  const [aromasNonFruity, setAromasNonFruity] = useState<string[]>(initialRating?.aromas_non_fruity ?? []);
  const [aromasFruityOther, setAromasFruityOther] = useState(initialRating?.aromas_fruity_other ?? "");
  const [aromasNonFruityOther, setAromasNonFruityOther] = useState(initialRating?.aromas_nonfruity_other ?? "");
  const [noseNotes, setNoseNotes] = useState(initialRating?.nose_notes ?? "");
  const [taste, setTaste] = useState<TasteValues>({
    sweet: initialRating?.sweet ?? null,
    sweet_other: initialRating?.sweet_other ?? "",
    tannin: initialRating?.tannin ?? null,
    tannin_other: initialRating?.tannin_other ?? "",
    acidity: initialRating?.acidity ?? null,
    acidity_other: initialRating?.acidity_other ?? "",
    body: initialRating?.body ?? null,
    body_other: initialRating?.body_other ?? "",
    finish: initialRating?.finish ?? null,
    finish_other: initialRating?.finish_other ?? "",
    bubbles: initialRating?.bubbles ?? null,
    bubbles_other: initialRating?.bubbles_other ?? "",
  });
  const [stars, setStars] = useState<number | null>(initialRating?.stars ?? null);
  const [verdictWord, setVerdictWord] = useState(initialRating?.verdict_word ?? "");
  const [foodPairing, setFoodPairing] = useState(initialRating?.food_pairing ?? "");
  const [saving, setSaving] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef({
    lookColor, lookColorLabel, lookClarity, lookClarityOther,
    aromasFruity, aromasNonFruity, aromasFruityOther, aromasNonFruityOther,
    noseNotes, taste, stars, verdictWord, foodPairing,
  });

  const save = useCallback(async (overrides: Partial<typeof stateRef.current> = {}) => {
    const s = { ...stateRef.current, ...overrides };
    setSaving(true);
    const supabase = createClient();
    await supabase.from("wt_ratings").upsert({
      session_id: sessionId,
      wine_id: wine.id,
      user_id: userId,
      look_color: s.lookColorLabel,
      look_color_hex: s.lookColor,
      look_clarity: s.lookClarity === "OTHER" ? null : s.lookClarity,
      look_clarity_other: s.lookClarity === "OTHER" ? s.lookClarityOther : null,
      aromas_fruity: s.aromasFruity,
      aromas_non_fruity: s.aromasNonFruity,
      aromas_fruity_other: s.aromasFruityOther || null,
      aromas_nonfruity_other: s.aromasNonFruityOther || null,
      nose_notes: s.noseNotes || null,
      sweet: s.taste.sweet === "OTHER" ? null : s.taste.sweet,
      sweet_other: s.taste.sweet === "OTHER" ? s.taste.sweet_other || null : null,
      tannin: s.taste.tannin === "OTHER" ? null : s.taste.tannin,
      tannin_other: s.taste.tannin === "OTHER" ? s.taste.tannin_other || null : null,
      acidity: s.taste.acidity === "OTHER" ? null : s.taste.acidity,
      acidity_other: s.taste.acidity === "OTHER" ? s.taste.acidity_other || null : null,
      body: s.taste.body === "OTHER" ? null : s.taste.body,
      body_other: s.taste.body === "OTHER" ? s.taste.body_other || null : null,
      finish: s.taste.finish === "OTHER" ? null : s.taste.finish,
      finish_other: s.taste.finish === "OTHER" ? s.taste.finish_other || null : null,
      bubbles: s.taste.bubbles === "OTHER" ? null : s.taste.bubbles,
      bubbles_other: s.taste.bubbles === "OTHER" ? s.taste.bubbles_other || null : null,
      stars: s.stars,
      verdict_word: s.verdictWord || null,
      food_pairing: s.foodPairing || null,
    }, { onConflict: "session_id,wine_id,user_id" });
    setSaving(false);
    onRated?.(wine.id, !!s.stars);
  }, [sessionId, wine.id, userId, onRated]);

  function scheduleAutoSave(overrides: Partial<typeof stateRef.current> = {}) {
    Object.assign(stateRef.current, overrides);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(overrides), 800);
  }

  function handleLookColor(hex: string | null, label: string | null) {
    setLookColor(hex); setLookColorLabel(label);
    scheduleAutoSave({ lookColor: hex, lookColorLabel: label });
  }
  function handleClarity(v: string | null) {
    setLookClarity(v);
    scheduleAutoSave({ lookClarity: v });
  }
  function handleTaste(v: TasteValues) {
    setTaste(v);
    scheduleAutoSave({ taste: v });
  }
  function handleStars(v: number | null) {
    setStars(v);
    stateRef.current.stars = v;
    save({ stars: v });
  }

  const labelSubtitle = wine.wine_style === "blend" && wine.blend_composition?.length
    ? wine.blend_composition.map((c) => `${c.varietal} ${c.pct}%`).join(" / ")
    : wine.varietal ?? wine.wine_style;

  return (
    <div
      id={`wine-${wine.id}`}
      className="card-wine rounded overflow-hidden"
      style={{ scrollMarginTop: "56px" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start justify-between"
        style={{ borderBottom: "1px solid rgba(74,14,19,0.15)", background: "rgba(74,14,19,0.04)" }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 500, color: "var(--color-oxblood)", letterSpacing: "0.01em" }}>
            {wine.position < 10 ? `0${wine.position}` : wine.position} · {wine.wine_name}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(26,14,10,0.5)", marginTop: "2px" }}>
            {labelSubtitle}{wine.region ? ` · ${wine.region}` : ""}{wine.country ? `, ${wine.country}` : ""}
          </div>
        </div>
        <WineGlassSVG
          shape={options.glassShape}
          liquidColor={lookColor ?? "#8B1E2D"}
          size={40}
        />
      </div>

      <div className="p-5 space-y-6">
        {/* Look */}
        <div>
          <div className="rule-deco mb-3">
            <span className="section-label">Appearance</span>
          </div>
          <div className="mb-3">
            <p className="section-label mb-2" style={{ fontSize: "0.6rem", opacity: 0.6 }}>Color</p>
            <ColorSwatchPicker
              swatches={options.colors}
              selected={lookColor}
              onChange={handleLookColor}
            />
          </div>
          <div>
            <p className="section-label mb-2" style={{ fontSize: "0.6rem", opacity: 0.6 }}>Clarity</p>
            <div className="flex flex-wrap gap-1.5">
              {options.clarity.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleClarity(lookClarity === c ? null : c)}
                  className={`pill${lookClarity === c ? " selected" : ""}`}
                >
                  {c}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleClarity(lookClarity === "OTHER" ? null : "OTHER")}
                className={`pill${lookClarity === "OTHER" ? " selected" : ""}`}
                style={{ fontStyle: "italic", opacity: 0.75 }}
              >
                Other…
              </button>
            </div>
            {lookClarity === "OTHER" && (
              <input
                type="text"
                value={lookClarityOther}
                onChange={(e) => {
                  setLookClarityOther(e.target.value);
                  scheduleAutoSave({ lookClarityOther: e.target.value });
                }}
                placeholder="Describe appearance…"
                className="input-wine mt-2"
                style={{ fontSize: "0.82rem", padding: "0.3rem 0.6rem" }}
              />
            )}
          </div>
        </div>

        {/* Smell */}
        <div>
          <div className="rule-deco mb-3">
            <span className="section-label">Nose</span>
          </div>
          <AromaCheckboxGrid
            fruityLabel={options.aromas.fruity_label}
            nonFruityLabel={options.aromas.non_fruity_label}
            fruityOptions={options.aromas.fruity}
            nonFruityOptions={options.aromas.non_fruity}
            selectedFruity={aromasFruity}
            selectedNonFruity={aromasNonFruity}
            fruityOther={aromasFruityOther}
            nonFruityOther={aromasNonFruityOther}
            onFruityChange={(v) => { setAromasFruity(v); scheduleAutoSave({ aromasFruity: v }); }}
            onNonFruityChange={(v) => { setAromasNonFruity(v); scheduleAutoSave({ aromasNonFruity: v }); }}
            onFruityOtherChange={(v) => { setAromasFruityOther(v); scheduleAutoSave({ aromasFruityOther: v }); }}
            onNonFruityOtherChange={(v) => { setAromasNonFruityOther(v); scheduleAutoSave({ aromasNonFruityOther: v }); }}
          />
          <textarea
            value={noseNotes}
            onChange={(e) => { setNoseNotes(e.target.value); scheduleAutoSave({ noseNotes: e.target.value }); }}
            placeholder="Nose notes… (optional)"
            className="input-wine mt-3"
            rows={2}
            style={{ resize: "vertical", fontSize: "0.85rem" }}
          />
        </div>

        {/* Taste */}
        <div>
          <div className="rule-deco mb-3">
            <span className="section-label">Palate</span>
          </div>
          <TasteSection
            options={options.taste}
            values={taste}
            onChange={handleTaste}
          />
        </div>

        {/* Verdict */}
        <div>
          <div className="rule-deco mb-3">
            <span className="section-label">Verdict</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="section-label mb-2" style={{ fontSize: "0.6rem", opacity: 0.6 }}>Rating</p>
              <StarRating value={stars} onChange={handleStars} size="lg" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="section-label block mb-1" style={{ fontSize: "0.6rem", opacity: 0.6 }}>
                  One Word
                </label>
                <input
                  type="text"
                  value={verdictWord}
                  onChange={(e) => { setVerdictWord(e.target.value); scheduleAutoSave({ verdictWord: e.target.value }); }}
                  placeholder="Elegant, Bold, Funky…"
                  className="input-wine"
                />
              </div>
              <div>
                <label className="section-label block mb-1" style={{ fontSize: "0.6rem", opacity: 0.6 }}>
                  Pairs With
                </label>
                <input
                  type="text"
                  value={foodPairing}
                  onChange={(e) => { setFoodPairing(e.target.value); scheduleAutoSave({ foodPairing: e.target.value }); }}
                  placeholder="Grilled salmon, Cheese…"
                  className="input-wine"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saving indicator */}
      {saving && (
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "12px",
            fontSize: "0.7rem",
            color: "var(--color-champagne)",
            opacity: 0.5,
            fontFamily: "var(--font-body)",
          }}
        >
          saving…
        </div>
      )}
    </div>
  );
}
