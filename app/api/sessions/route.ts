import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { WINE_STYLES } from "@/lib/wineStyles";
import { mergeBlendProfiles } from "@/lib/blendUtils";
import type { WineRowData } from "@/components/WineRowInput";

function getWineStyle(varietal: string): string {
  if (varietal === "BLEND") return "blend";
  const profile = WINE_STYLES[varietal];
  if (!profile) return "red_medium";
  const cat = profile.category.toLowerCase().replace(/\s+/g, "_").replace("é", "e");
  if (cat === "white") return "white_oaked";
  if (cat === "red") return "red_medium";
  if (cat === "sparkling") return "sparkling";
  if (cat === "rosé" || cat === "rose") return "rose";
  if (cat === "dessert") return "dessert";
  if (cat === "orange") return "orange";
  return "red_medium";
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { name, tasting_date, wines } = body as {
    name: string;
    tasting_date: string | null;
    wines: WineRowData[];
  };

  if (!name?.trim()) {
    return NextResponse.json({ error: "Session name is required" }, { status: 400 });
  }
  if (!wines?.length) {
    return NextResponse.json({ error: "At least one wine is required" }, { status: 400 });
  }

  // Create session
  const { data: session, error: sessionErr } = await supabase
    .from("wt_sessions")
    .insert({ name: name.trim(), tasting_date: tasting_date ?? null, created_by: user.id })
    .select("id, invite_code")
    .single();

  if (sessionErr || !session) {
    return NextResponse.json({ error: sessionErr?.message ?? "Failed to create session" }, { status: 500 });
  }

  // Insert wines
  const wineRows = wines.map((w, i) => ({
    session_id: session.id,
    position: i + 1,
    wine_name: w.wine_name.trim(),
    wine_style: getWineStyle(w.varietal) as string,
    varietal: w.varietal === "BLEND" ? null : w.varietal,
    blend_composition: w.varietal === "BLEND" ? w.blend_composition : null,
    region: w.region?.trim() || null,
    country: w.country?.trim() || null,
    custom_options: w.custom_options ?? null,
    created_by: user.id,
  }));

  const { error: wineErr } = await supabase.from("wt_session_wines").insert(wineRows);

  if (wineErr) {
    // Roll back: delete the session
    await supabase.from("wt_sessions").delete().eq("id", session.id);
    return NextResponse.json({ error: wineErr.message }, { status: 500 });
  }

  return NextResponse.json({ invite_code: session.invite_code });
}
