// PLACEHOLDER — will be replaced with user-supplied industry-standard varietal profiles.
// Current entries are reasonable defaults; swap them out when the real profiles arrive.

export type GlassShape = "white" | "burgundy" | "bordeaux" | "tulip" | "flute";

export type ColorSwatch = { label: string; hex: string };

export type WineStyleProfile = {
  label: string;
  category: "White" | "Red" | "Rosé" | "Sparkling" | "Dessert" | "Orange";
  glassShape: GlassShape;
  colors: ColorSwatch[];
  clarity: string[];
  aromas: {
    fruity_label: string;
    non_fruity_label: string;
    fruity: string[];
    non_fruity: string[];
  };
  taste: {
    sweet: string[];
    acidity: string[];
    body: string[];
    finish: string[];
    tannin?: string[];
    bubbles?: string[];
    sweetness_intensity?: string[];
  };
};

export const WINE_STYLES: Record<string, WineStyleProfile> = {
  // ─── Sparkling ────────────────────────────────────────────────────────────
  Champagne: {
    label: "Champagne",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Pale Straw", hex: "#F4ECC8" },
      { label: "Light Gold", hex: "#E5D08C" },
      { label: "Deep Gold", hex: "#C8A23E" },
      { label: "Blush", hex: "#F2D5D8" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Creamy Mousse"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Bread & Floral",
      fruity: ["Green Apple", "Lemon Zest", "Peach", "Pear", "Strawberry"],
      non_fruity: ["Brioche", "Toast", "Cream", "Honey", "Almond", "Floral"],
    },
    taste: {
      sweet: ["Brut Nature", "Extra Brut", "Brut", "Extra Dry", "Demi-Sec"],
      acidity: ["Soft", "Crisp", "Racy"],
      body: ["Light", "Medium", "Full"],
      finish: ["Short", "Medium", "Long & Toasty"],
      bubbles: ["Fine & Persistent", "Lively", "Coarse", "Creamy"],
    },
  },
  Prosecco: {
    label: "Prosecco",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Pale Straw", hex: "#F4ECC8" },
      { label: "Light Gold", hex: "#E2CF88" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Lively Bubbles"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Other",
      fruity: ["Green Apple", "Pear", "Peach", "Melon", "Lemon"],
      non_fruity: ["White Flower", "Almond", "Cream", "Honey"],
    },
    taste: {
      sweet: ["Brut", "Extra Dry", "Dry", "Demi-Sec"],
      acidity: ["Soft", "Crisp", "Fresh"],
      body: ["Light", "Medium"],
      finish: ["Short", "Medium", "Clean & Fruity"],
      bubbles: ["Fine & Persistent", "Lively", "Frothy"],
    },
  },

  // ─── White ────────────────────────────────────────────────────────────────
  Chardonnay: {
    label: "Chardonnay",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Straw", hex: "#F0E5B5" },
      { label: "Lemon Gold", hex: "#E5CE8E" },
      { label: "Golden", hex: "#D4B86A" },
      { label: "Deep Amber", hex: "#9C6A2E" },
    ],
    clarity: ["Crystal", "Slightly Hazy", "Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Cream",
      fruity: ["Green Apple", "Lemon", "Pineapple", "Peach", "Melon"],
      non_fruity: [
        "Vanilla",
        "Buttered Toast",
        "Oak / Cedar",
        "Cream",
        "Honey",
        "Hazelnut",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Low", "Medium", "Lively"],
      body: ["Light", "Medium", "Full & Creamy", "Opulent"],
      finish: ["Short", "Medium", "Long & Buttery"],
    },
  },
  "Sauvignon Blanc": {
    label: "Sauvignon Blanc",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Straw", hex: "#F0E5B5" },
      { label: "Light Gold", hex: "#E5D08C" },
      { label: "Green Tinged", hex: "#C7CE8E" },
    ],
    clarity: ["Crystal", "Slightly Hazy", "Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Herbaceous & Mineral",
      fruity: ["Grapefruit", "Lime", "Lemon", "Passion Fruit", "Gooseberry"],
      non_fruity: [
        "Fresh Cut Grass",
        "Bell Pepper",
        "Flint / Mineral",
        "Saline",
        "White Flower",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Low", "Medium", "High", "Piercing"],
      body: ["Light & Zippy", "Medium", "Full"],
      finish: ["Short", "Medium", "Long & Zesty"],
    },
  },
  Riesling: {
    label: "Riesling",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F4ECC8" },
      { label: "Pale Lemon", hex: "#EBDE8E" },
      { label: "Light Gold", hex: "#D5B864" },
      { label: "Deep Honey", hex: "#B0833A" },
    ],
    clarity: ["Crystal", "Pristine", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Mineral",
      fruity: ["Lime", "Lemon", "Apricot", "Peach", "Nectarine"],
      non_fruity: [
        "Jasmine",
        "Honey",
        "Beeswax",
        "Petrol / Kerosene",
        "Slate / Mineral",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet", "Dessert"],
      acidity: ["Low", "Medium", "High", "Razor-Sharp"],
      body: ["Light", "Medium", "Full"],
      finish: ["Short", "Medium", "Long & Floral"],
    },
  },
  "Pinot Grigio": {
    label: "Pinot Grigio / Pinot Gris",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Straw", hex: "#F0E5B5" },
      { label: "Light Gold", hex: "#E2D090" },
      { label: "Copper Blush", hex: "#E8B87A" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Spice",
      fruity: ["Lemon", "Lime", "Pear", "Apple", "Peach"],
      non_fruity: ["White Flower", "Almond", "Spice", "Honeysuckle"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Low", "Medium", "Lively"],
      body: ["Light", "Medium", "Full & Rich"],
      finish: ["Short", "Clean & Crisp", "Medium", "Long & Spicy"],
    },
  },
  Viognier: {
    label: "Viognier",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Straw", hex: "#F2E8C0" },
      { label: "Light Gold", hex: "#E0CC82" },
      { label: "Deep Gold", hex: "#C8A63C" },
    ],
    clarity: ["Crystal", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits & Floral",
      non_fruity_label: "Spice & Cream",
      fruity: ["Peach", "Apricot", "Mango", "Honeysuckle", "Orange Blossom"],
      non_fruity: ["Ginger", "Cream", "Vanilla", "Jasmine", "Spice"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Low", "Medium", "Moderate"],
      body: ["Medium", "Full", "Rich & Luscious"],
      finish: ["Medium", "Long & Perfumed", "Long & Floral"],
    },
  },
  Gewürztraminer: {
    label: "Gewürztraminer",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Copper", hex: "#E8C88A" },
      { label: "Light Gold", hex: "#D8B060" },
      { label: "Deep Gold", hex: "#C09040" },
    ],
    clarity: ["Crystal", "Bright"],
    aromas: {
      fruity_label: "Fruits & Floral",
      non_fruity_label: "Exotic & Spice",
      fruity: ["Lychee", "Rose Petal", "Peach", "Apricot", "Grapefruit"],
      non_fruity: ["Ginger", "Cinnamon", "Clove", "Jasmine", "Turkish Delight"],
    },
    taste: {
      sweet: ["Bone Dry", "Off-Dry", "Sweet"],
      acidity: ["Low", "Medium"],
      body: ["Medium", "Full", "Rich"],
      finish: ["Medium", "Long & Perfumed", "Long & Spicy"],
    },
  },
  "White Burgundy": {
    label: "White Burgundy (Chardonnay)",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Straw", hex: "#F0E5B5" },
      { label: "Lemon Gold", hex: "#E0C880" },
      { label: "Golden", hex: "#C8A040" },
    ],
    clarity: ["Crystal", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Mineral & Earth",
      fruity: ["Lemon", "Green Apple", "Peach", "Pear"],
      non_fruity: [
        "Chalk / Mineral",
        "Flint",
        "Wet Stone",
        "Cream",
        "Light Oak",
        "Honey",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      acidity: ["Medium", "High", "Lively"],
      body: ["Medium", "Full & Textured"],
      finish: ["Medium", "Long & Mineral", "Long & Creamy"],
    },
  },

  // ─── Rosé ─────────────────────────────────────────────────────────────────
  "Provençal Rosé": {
    label: "Provençal Rosé",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Barely Pink", hex: "#F2D5D8" },
      { label: "Pale Salmon", hex: "#EAB8BA" },
      { label: "Salmon", hex: "#E89B96" },
    ],
    clarity: ["Crystal Clear", "Bright"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Herbal",
      fruity: ["Strawberry", "Watermelon", "Peach", "Raspberry", "Lemon"],
      non_fruity: [
        "Rose Petal",
        "Lavender",
        "Fresh Herbs",
        "Cream",
        "Mineral",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      acidity: ["Medium", "Fresh & High"],
      body: ["Light", "Light-Medium"],
      finish: ["Short", "Clean & Crisp", "Medium"],
    },
  },
  Rosé: {
    label: "Rosé (General)",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Barely Pink", hex: "#F2D5D8" },
      { label: "Salmon", hex: "#E89B96" },
      { label: "Coral", hex: "#D86B6A" },
      { label: "Deep Rose", hex: "#A8474C" },
    ],
    clarity: ["Crystal Clear", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Other",
      fruity: ["Strawberry", "Watermelon", "Raspberry", "Peach", "Cherry"],
      non_fruity: [
        "Rose Petals",
        "Hibiscus",
        "Cotton Candy",
        "Cream",
        "Citrus Zest",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet"],
      acidity: ["Low", "Medium", "Fresh & High"],
      body: ["Light", "Medium", "Full"],
      finish: ["Short", "Medium", "Long & Crisp"],
    },
  },

  // ─── Red ──────────────────────────────────────────────────────────────────
  "Pinot Noir": {
    label: "Pinot Noir",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Pale Ruby", hex: "#C45366" },
      { label: "Light Garnet", hex: "#8B1E2D" },
      { label: "Deep Crimson", hex: "#4F0E1A" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Earth & Spice",
      fruity: ["Cherry", "Strawberry", "Cranberry", "Raspberry", "Plum"],
      non_fruity: [
        "Mushroom",
        "Forest Floor",
        "Dried Violets",
        "Vanilla",
        "Smoke",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Silky", "Soft", "Medium", "Grippy"],
      acidity: ["Low", "Medium", "Bright & High"],
      body: ["Light & Elegant", "Medium", "Full"],
      finish: ["Short", "Medium", "Long & Smooth"],
    },
  },
  Gamay: {
    label: "Gamay (Beaujolais)",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Pale Ruby", hex: "#C45366" },
      { label: "Vivid Crimson", hex: "#A52A3F" },
      { label: "Purple-Red", hex: "#7A1830" },
    ],
    clarity: ["Translucent", "Bright", "Semi-Translucent"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Earth",
      fruity: [
        "Strawberry",
        "Raspberry",
        "Cherry",
        "Blueberry",
        "Banana (carbonic)",
      ],
      non_fruity: ["Violet", "Fresh Herbs", "Earth", "Candy", "Light Smoke"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Barely There", "Silky", "Light"],
      acidity: ["Medium", "Bright", "High"],
      body: ["Light", "Light-Medium"],
      finish: ["Short", "Juicy & Medium", "Long & Fruity"],
    },
  },
  Merlot: {
    label: "Merlot",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby Red", hex: "#9A2235" },
      { label: "Deep Garnet", hex: "#6E1423" },
      { label: "Dark Plum", hex: "#4A0E1F" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Spice",
      fruity: ["Plum", "Black Cherry", "Raspberry", "Fig", "Blueberry"],
      non_fruity: ["Chocolate", "Vanilla", "Cedar", "Tobacco", "Earth"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Smooth", "Velvety", "Medium", "Bold"],
      acidity: ["Low", "Medium", "Moderate"],
      body: ["Medium", "Full", "Lush"],
      finish: ["Short", "Medium", "Long & Plummy"],
    },
  },
  Grenache: {
    label: "Grenache / Garnacha",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Pale Garnet", hex: "#C04060" },
      { label: "Ruby", hex: "#A02840" },
      { label: "Deep Garnet", hex: "#6A1825" },
    ],
    clarity: ["Translucent", "Semi-Translucent"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Earth",
      fruity: [
        "Raspberry",
        "Strawberry",
        "Cherry",
        "Red Plum",
        "Dried Herbs",
      ],
      non_fruity: [
        "White Pepper",
        "Leather",
        "Tobacco",
        "Dried Flowers",
        "Garrigue",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Smooth", "Medium", "Grippy"],
      acidity: ["Low", "Medium", "Fresh"],
      body: ["Medium", "Full", "Warm"],
      finish: ["Short", "Medium", "Long & Spicy"],
    },
  },
  Sangiovese: {
    label: "Sangiovese / Chianti / Brunello",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Bright Ruby", hex: "#A52A3F" },
      { label: "Garnet", hex: "#7A1F32" },
      { label: "Deep Garnet", hex: "#4A0E20" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Earth & Herb",
      fruity: [
        "Tart Cherry",
        "Sour Cherry",
        "Tomato",
        "Dried Plum",
        "Fig",
      ],
      non_fruity: [
        "Dried Herbs",
        "Leather",
        "Earth",
        "Smoke",
        "Iron / Blood",
        "Tobacco",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Medium", "Firm", "Bold & Rustic", "Chewy"],
      acidity: ["Medium", "High", "Vibrant"],
      body: ["Medium", "Full", "Structured"],
      finish: ["Medium", "Long & Earthy", "Long & Tart"],
    },
  },
  Tempranillo: {
    label: "Tempranillo / Rioja",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby Red", hex: "#9A2235" },
      { label: "Garnet", hex: "#6E1423" },
      { label: "Brick Red", hex: "#8C3A2A" },
    ],
    clarity: ["Translucent", "Semi-Opaque", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Earth",
      fruity: [
        "Strawberry",
        "Dried Cherry",
        "Plum",
        "Blackberry",
        "Fig",
      ],
      non_fruity: [
        "Leather",
        "Tobacco",
        "Coconut (from oak)",
        "Vanilla",
        "Dried Herbs",
        "Earth",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Smooth", "Medium", "Firm", "Bold"],
      acidity: ["Medium", "Bright"],
      body: ["Medium", "Full", "Rich"],
      finish: ["Medium", "Long & Spicy", "Long & Oaky"],
    },
  },
  "Cabernet Sauvignon": {
    label: "Cabernet Sauvignon",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Red", hex: "#6E1423" },
      { label: "Inky Purple", hex: "#3A0A1E" },
      { label: "Black-Red", hex: "#1A0A14" },
    ],
    clarity: ["Semi-Translucent", "Opaque", "Deep & Dark"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Earth",
      fruity: ["Blackberry", "Black Cherry", "Plum", "Currant", "Blueberry"],
      non_fruity: [
        "Cedar",
        "Tobacco",
        "Dark Chocolate",
        "Bell Pepper",
        "Graphite",
        "Leather",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Soft", "Medium", "Bold & Chewy", "Teeth-Staining"],
      acidity: ["Low", "Medium", "High"],
      body: ["Medium", "Full", "Powerful"],
      finish: ["Short", "Medium", "Long & Warming"],
    },
  },
  Syrah: {
    label: "Syrah / Shiraz",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Purple", hex: "#5A0E28" },
      { label: "Inky Dark", hex: "#3A0818" },
      { label: "Black-Purple", hex: "#1C0610" },
    ],
    clarity: ["Opaque", "Dense & Dark"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Smoke & Spice",
      fruity: ["Blackberry", "Blueberry", "Black Plum", "Cassis"],
      non_fruity: [
        "Black Pepper",
        "Smoked Meat",
        "Olive",
        "Dark Chocolate",
        "Violet",
        "Leather",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Medium", "Bold", "Chewy", "Velvety"],
      acidity: ["Low", "Medium", "Bright"],
      body: ["Full", "Powerful", "Dense"],
      finish: ["Medium", "Long & Peppery", "Long & Smoky"],
    },
  },
  "Cabernet Franc": {
    label: "Cabernet Franc",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Bright Ruby", hex: "#A82A40" },
      { label: "Garnet", hex: "#741822" },
      { label: "Deep Crimson", hex: "#4C0E18" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Herb & Earth",
      fruity: ["Raspberry", "Blackcurrant", "Cherry", "Plum"],
      non_fruity: [
        "Bell Pepper",
        "Pencil Shavings",
        "Violet",
        "Tobacco",
        "Dried Herbs",
        "Graphite",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Silky", "Medium", "Firm"],
      acidity: ["Medium", "High"],
      body: ["Medium", "Full"],
      finish: ["Medium", "Long & Herbal", "Long & Mineral"],
    },
  },
  Malbec: {
    label: "Malbec",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Purple", hex: "#6A1030" },
      { label: "Inky Violet", hex: "#3C0820" },
      { label: "Black-Purple", hex: "#200810" },
    ],
    clarity: ["Opaque", "Dense & Inky"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Oak",
      fruity: ["Blackberry", "Plum", "Black Cherry", "Blueberry", "Prune"],
      non_fruity: [
        "Dark Chocolate",
        "Vanilla",
        "Coffee",
        "Leather",
        "Tobacco",
        "Violet",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Smooth", "Velvety", "Medium", "Bold"],
      acidity: ["Low", "Medium", "Fresh"],
      body: ["Full", "Rich", "Dense"],
      finish: ["Medium", "Long & Smooth", "Long & Chocolatey"],
    },
  },
  Zinfandel: {
    label: "Zinfandel / Primitivo",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby Red", hex: "#9C2030" },
      { label: "Deep Garnet", hex: "#6C1020" },
      { label: "Inky Dark", hex: "#400A14" },
    ],
    clarity: ["Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Jam",
      fruity: [
        "Blackberry Jam",
        "Raspberry",
        "Blueberry",
        "Plum",
        "Dried Cherry",
      ],
      non_fruity: [
        "Black Pepper",
        "Cinnamon",
        "Vanilla",
        "Tobacco",
        "Smoked Meat",
      ],
    },
    taste: {
      sweet: ["Dry", "Off-Dry", "Jammy"],
      tannin: ["Smooth", "Medium", "Bold"],
      acidity: ["Low", "Medium", "Moderate"],
      body: ["Full", "Rich & Warm"],
      finish: ["Medium", "Long & Spicy", "Long & Jammy"],
    },
  },
  Nebbiolo: {
    label: "Nebbiolo / Barolo / Barbaresco",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Pale Garnet", hex: "#C04860" },
      { label: "Garnet-Orange", hex: "#9A3040" },
      { label: "Brick Red", hex: "#7A2830" },
    ],
    clarity: ["Translucent", "Semi-Translucent"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Tar & Rose",
      fruity: ["Cherry", "Dried Rose", "Raspberry", "Prune", "Pomegranate"],
      non_fruity: [
        "Tar",
        "Tobacco",
        "Leather",
        "Licorice",
        "Dried Herbs",
        "Iron",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Bold & Grippy", "Chewy", "Powerful", "Mouth-Coating"],
      acidity: ["High", "Vibrant", "Razor-Sharp"],
      body: ["Full", "Structured"],
      finish: ["Long & Austere", "Long & Complex", "Endless"],
    },
  },

  // ─── Dessert ─────────────────────────────────────────────────────────────
  "Sauternes / Barsac": {
    label: "Sauternes / Barsac",
    category: "Dessert",
    glassShape: "white",
    colors: [
      { label: "Pale Gold", hex: "#F0D88A" },
      { label: "Amber", hex: "#C89040" },
      { label: "Deep Amber", hex: "#9C6A2E" },
    ],
    clarity: ["Crystal", "Golden Haze"],
    aromas: {
      fruity_label: "Fruit & Nectar",
      non_fruity_label: "Honey & Spice",
      fruity: ["Apricot", "Peach", "Mango", "Dried Fig", "Orange Marmalade"],
      non_fruity: ["Honey", "Beeswax", "Saffron", "Caramel", "Ginger"],
    },
    taste: {
      sweet: ["Off-Dry", "Medium Sweet", "Sweet", "Very Sweet", "Luscious"],
      sweetness_intensity: [
        "Delicate",
        "Moderate",
        "Rich",
        "Intense",
        "Syrupy",
      ],
      acidity: ["Low", "Balancing", "High — keeps it lively"],
      body: ["Medium", "Full & Viscous"],
      finish: ["Long & Honeyed", "Long & Complex", "Endless"],
    },
  },
  "Port / Fortified": {
    label: "Port / Fortified Red",
    category: "Dessert",
    glassShape: "white",
    colors: [
      { label: "Deep Ruby", hex: "#6E1423" },
      { label: "Tawny", hex: "#8C4A20" },
      { label: "Deep Tawny", hex: "#6A3010" },
    ],
    clarity: ["Opaque", "Rich & Dark"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Nut & Caramel",
      fruity: ["Dried Cherry", "Blackberry", "Prune", "Fig", "Raisin"],
      non_fruity: ["Walnut", "Toffee", "Caramel", "Cinnamon", "Coffee"],
    },
    taste: {
      sweet: ["Medium Sweet", "Sweet", "Very Sweet"],
      sweetness_intensity: ["Moderate", "Rich", "Intense"],
      acidity: ["Low", "Balancing"],
      body: ["Full & Warming", "Rich & Viscous"],
      finish: ["Long & Warming", "Long & Sweet", "Endless"],
      tannin: ["Smooth", "Medium"],
    },
  },

  // ─── Orange ──────────────────────────────────────────────────────────────
  "Orange Wine": {
    label: "Orange Wine",
    category: "Orange",
    glassShape: "white",
    colors: [
      { label: "Pale Amber", hex: "#E8B87A" },
      { label: "Golden Amber", hex: "#C8883A" },
      { label: "Deep Copper", hex: "#A0602A" },
      { label: "Burnt Sienna", hex: "#7A4020" },
    ],
    clarity: ["Hazy", "Murky", "Cloudy"],
    aromas: {
      fruity_label: "Fruits & Dried",
      non_fruity_label: "Savory & Funky",
      fruity: [
        "Dried Apricot",
        "Orange Peel",
        "Quince",
        "Dried Mango",
        "Nectarine",
      ],
      non_fruity: [
        "Walnuts",
        "Beeswax",
        "Chamomile",
        "Oxidative / Nutty",
        "Sourdough",
        "Barnyard",
      ],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Barely There", "Grippy", "Bold & Tannic"],
      acidity: ["Low", "Medium", "Vibrant"],
      body: ["Light", "Medium", "Full & Textured"],
      finish: ["Short", "Medium", "Long & Complex"],
    },
  },
};

export const WINE_STYLE_KEYS = Object.keys(WINE_STYLES);

export const WINE_CATEGORIES = [
  "Sparkling",
  "White",
  "Rosé",
  "Red",
  "Dessert",
  "Orange",
] as const;
