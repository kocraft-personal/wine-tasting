export type WineStyleKey =
  | "sparkling"
  | "white_crisp"
  | "white_aromatic"
  | "white_oaked"
  | "rose"
  | "red_light"
  | "red_medium"
  | "red_bold"
  | "dessert"
  | "orange"
  | "blend";

export interface WtProfile {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export interface WtSession {
  id: string;
  name: string;
  tasting_date: string | null;
  created_by: string;
  invite_code: string;
  is_active: boolean;
  welcome_settings: WelcomeSettings | null;
  created_at: string;
}

export interface WelcomeSettings {
  eyebrow?: string;
  subtitle?: string;
  note?: string;
  signoff?: string;
}

export interface BlendComponent {
  varietal: string;
  pct: number;
}

export interface CustomOptions {
  colors?: Array<{ label: string; hex: string }>;
  clarity?: string[];
  aromas?: {
    fruity_label?: string;
    non_fruity_label?: string;
    fruity?: string[];
    non_fruity?: string[];
  };
  taste?: {
    sweet?: string[];
    tannin?: string[];
    acidity?: string[];
    body?: string[];
    finish?: string[];
    bubbles?: string[];
    sweetness_intensity?: string[];
  };
}

export interface WtSessionWine {
  id: string;
  session_id: string;
  position: number;
  wine_name: string;
  wine_style: WineStyleKey;
  varietal: string | null;
  blend_composition: BlendComponent[] | null;
  region: string | null;
  country: string | null;
  custom_options: CustomOptions | null;
  created_by: string;
  created_at: string;
}

export interface WtRating {
  id: string;
  session_id: string;
  wine_id: string;
  user_id: string;
  look_color: string | null;
  look_color_hex: string | null;
  look_clarity: string | null;
  look_clarity_other: string | null;
  aromas_fruity: string[];
  aromas_non_fruity: string[];
  aromas_fruity_other: string | null;
  aromas_nonfruity_other: string | null;
  nose_notes: string | null;
  sweet: string | null;
  sweet_other: string | null;
  tannin: string | null;
  tannin_other: string | null;
  acidity: string | null;
  acidity_other: string | null;
  body: string | null;
  body_other: string | null;
  finish: string | null;
  finish_other: string | null;
  bubbles: string | null;
  bubbles_other: string | null;
  stars: number | null;
  verdict_word: string | null;
  food_pairing: string | null;
  created_at: string;
  updated_at: string;
}

export interface WtSuperlative {
  id: string;
  session_id: string;
  user_id: string;
  category: string;
  wine_id: string;
  created_at: string;
}

export interface WtRatingWithProfile extends WtRating {
  profile: WtProfile;
}

export interface WtSessionWithWines extends WtSession {
  wines: WtSessionWine[];
}

export const SUPERLATIVE_CATEGORIES = [
  { key: "overall_favorite", label: "Overall Favorite", emoji: "🏆" },
  { key: "most_surprising", label: "Most Surprising", emoji: "😮" },
  { key: "buying_a_bottle", label: "Buying a Bottle", emoji: "🛒" },
  { key: "never_again", label: "Never Again", emoji: "🙅" },
  { key: "best_with_food", label: "Best with Food", emoji: "🍽️" },
  { key: "most_unique", label: "Most Unique", emoji: "🦄" },
] as const;
