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
    label: "Champagne / Traditional Method",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Water-Pale", hex: "#F6F0D0" },
      { label: "Pale Straw", hex: "#EFE5AD" },
      { label: "Lemon Gold", hex: "#E0CC73" },
      { label: "Light Gold", hex: "#C7AB55" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Lively Bubbles", "Creamy Mousse"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Bread & Floral",
      fruity: ["Lemon", "Green Apple", "Pear", "Peach", "Apricot"],
      non_fruity: ["Bread Dough", "Biscuit", "Almond", "Chalk", "Cream"],
    },
    taste: {
      sweet: ["Brut Nature", "Extra Brut", "Brut", "Extra Dry", "Demi-Sec"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long", "Long & Toasty"],
      bubbles: ["Fine & Persistent", "Lively", "Creamy", "Coarse"],
    },
  },

  Prosecco: {
    label: "Prosecco",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Water-Pale", hex: "#F7F1CE" },
      { label: "Pale Straw", hex: "#EFE4A8" },
      { label: "Pale Lemon", hex: "#E6D77E" },
      { label: "Light Gold", hex: "#CFB45E" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Lively Bubbles", "Frothy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Other",
      fruity: ["Green Apple", "Pear", "Peach", "Melon", "Lemon"],
      non_fruity: ["White Flowers", "Honeydew", "Almond", "Cream Soda", "Fresh Herbs"],
    },
    taste: {
      sweet: ["Brut Nature", "Brut", "Extra Dry", "Dry", "Demi-Sec"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium-Minus", "Medium"],
      finish: ["Short", "Medium", "Long & Fruity"],
      bubbles: ["Fine & Persistent", "Lively", "Frothy"],
    },
  },

  Cava: {
    label: "Cava",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Water-Pale", hex: "#F5EFC8" },
      { label: "Pale Straw", hex: "#EDE1A2" },
      { label: "Lemon Gold", hex: "#DDC86F" },
      { label: "Light Gold", hex: "#C6AA55" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Lively Bubbles"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Bread & Nut",
      fruity: ["Lemon", "Green Apple", "Pear", "Quince", "Peach"],
      non_fruity: ["Almond", "Toast", "Fennel", "Chalk", "Brioche"],
    },
    taste: {
      sweet: ["Brut Nature", "Extra Brut", "Brut", "Extra Dry", "Demi-Sec"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Medium", "Long", "Long & Nutty"],
      bubbles: ["Fine & Persistent", "Lively", "Creamy"],
    },
  },

  Cremant: {
    label: "Crémant",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Water-Pale", hex: "#F6F0CC" },
      { label: "Pale Lemon", hex: "#EDE19C" },
      { label: "Lemon Gold", hex: "#DDC66C" },
      { label: "Gold", hex: "#C6A552" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Lively Bubbles"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Cream & Nut",
      fruity: ["Lemon", "Apple", "Pear", "Peach", "Red Apple"],
      non_fruity: ["Biscuit", "Chalk", "Almond", "Cream", "White Flowers"],
    },
    taste: {
      sweet: ["Brut Nature", "Extra Brut", "Brut", "Extra Dry", "Demi-Sec"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Medium", "Long", "Long & Creamy"],
      bubbles: ["Fine & Persistent", "Lively", "Creamy"],
    },
  },

  Franciacorta: {
    label: "Franciacorta",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Pale Straw", hex: "#F0E4AA" },
      { label: "Lemon Gold", hex: "#E0C875" },
      { label: "Light Gold", hex: "#C9AB54" },
      { label: "Gold", hex: "#AE8138" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Creamy Mousse"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Bread & Cream",
      fruity: ["Lemon", "Golden Apple", "Pear", "Peach", "Apricot"],
      non_fruity: ["Brioche", "Hazelnut", "Cream", "Honey", "Chalk"],
    },
    taste: {
      sweet: ["Brut Nature", "Extra Brut", "Brut", "Extra Dry", "Demi-Sec"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Toasty"],
      bubbles: ["Fine & Persistent", "Creamy", "Lively"],
    },
  },

  "Moscato d'Asti": {
    label: "Moscato d'Asti / Sweet Sparkling Muscat",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Water-Pale", hex: "#F8F2CA" },
      { label: "Pale Straw", hex: "#F1E3A5" },
      { label: "Lemon Gold", hex: "#E4CA70" },
      { label: "Gold", hex: "#CFA04C" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Lightly Frothy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Sweet",
      fruity: ["Grape", "Peach", "Apricot", "Mandarin", "Orange"],
      non_fruity: ["Orange Blossom", "Rose", "Honey", "Mint", "Perfume"],
    },
    taste: {
      sweet: ["Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Low", "Medium", "Medium-Plus"],
      body: ["Light", "Medium-Minus", "Medium"],
      finish: ["Short", "Medium", "Long & Floral"],
      bubbles: ["Gentle", "Frothy", "Lively"],
    },
  },

  Lambrusco: {
    label: "Lambrusco",
    category: "Sparkling",
    glassShape: "tulip",
    colors: [
      { label: "Ruby Foam", hex: "#B7354A" },
      { label: "Deep Ruby", hex: "#812037" },
      { label: "Purple Ruby", hex: "#5A1530" },
      { label: "Dark Lambrusco", hex: "#35101F" },
    ],
    clarity: ["Ruby & Foamy", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Earthy & Savory",
      fruity: ["Cherry", "Strawberry", "Raspberry", "Blackberry", "Plum"],
      non_fruity: ["Violet", "Earth", "Balsamic", "Pepper", "Bitter Almond"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long & Tart"],
      tannin: ["Low", "Medium-Minus", "Medium"],
      bubbles: ["Fine", "Lively", "Foamy"],
    },
  },

  "Sparkling Rose": {
    label: "Sparkling Rosé / Traditional Method Rosé",
    category: "Sparkling",
    glassShape: "flute",
    colors: [
      { label: "Barely Pink", hex: "#F4DADF" },
      { label: "Pale Salmon", hex: "#E9A5A0" },
      { label: "Coral", hex: "#D96A6B" },
      { label: "Deep Rose", hex: "#A9464C" },
    ],
    clarity: ["Crystal Clear", "Fine Bubbles", "Lively Bubbles"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Bread",
      fruity: ["Strawberry", "Raspberry", "Cherry", "Cranberry", "Blood Orange"],
      non_fruity: ["Biscuit", "Rose Petal", "Chalk", "Cream", "Citrus Zest"],
    },
    taste: {
      sweet: ["Brut Nature", "Extra Brut", "Brut", "Extra Dry", "Demi-Sec"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long", "Long & Creamy"],
      tannin: ["None", "Light", "Light Grip"],
      bubbles: ["Fine & Persistent", "Lively", "Creamy"],
    },
  },

  "Sparkling Shiraz": {
    label: "Sparkling Shiraz",
    category: "Sparkling",
    glassShape: "tulip",
    colors: [
      { label: "Deep Ruby Foam", hex: "#7D1A2F" },
      { label: "Purple Ruby", hex: "#531128" },
      { label: "Inky Purple", hex: "#2D0A1A" },
      { label: "Black Ruby", hex: "#16060E" },
    ],
    clarity: ["Opaque & Foamy", "Deep & Dark", "Semi-Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Smoke & Spice",
      fruity: ["Blackberry", "Black Cherry", "Plum", "Raspberry", "Blueberry"],
      non_fruity: ["Black Pepper", "Chocolate", "Smoke", "Licorice", "Eucalyptus"],
    },
    taste: {
      sweet: ["Dry", "Off-Dry", "Sweet"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium-Plus", "Full", "Powerful"],
      finish: ["Medium", "Long", "Long & Spiced"],
      tannin: ["Medium", "Medium-Plus", "High"],
      bubbles: ["Fine", "Lively", "Foamy"],
    },
  },

  // ─── White ────────────────────────────────────────────────────────────────

  Chardonnay: {
    label: "Chardonnay",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Straw", hex: "#F1E7B7" },
      { label: "Lemon Gold", hex: "#E7D38D" },
      { label: "Light Gold", hex: "#D3B35F" },
      { label: "Deep Honey", hex: "#A97932" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Cream",
      fruity: ["Green Apple", "Lemon", "Pear", "Peach", "Pineapple"],
      non_fruity: ["Vanilla", "Butter", "Toast", "Cream", "Hazelnut"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Short", "Medium", "Long", "Long & Creamy"],
    },
  },

  "Sauvignon Blanc": {
    label: "Sauvignon Blanc",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F3EFCB" },
      { label: "Pale Lemon", hex: "#E9E08F" },
      { label: "Green-Gold", hex: "#D7D889" },
      { label: "Light Gold", hex: "#D2BB67" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Herbaceous & Mineral",
      fruity: ["Lime", "Grapefruit", "Green Apple", "Passion Fruit", "Gooseberry"],
      non_fruity: ["Fresh Grass", "Bell Pepper", "Jalapeño", "Wet Stone", "Elderflower"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium-Minus", "Medium"],
      finish: ["Short", "Medium", "Long", "Long & Zesty"],
    },
  },

  Riesling: {
    label: "Riesling",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F5EEC8" },
      { label: "Pale Lemon", hex: "#EBDE8E" },
      { label: "Light Gold", hex: "#D5B864" },
      { label: "Deep Honey", hex: "#B0833A" },
    ],
    clarity: ["Crystal", "Pristine", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Mineral",
      fruity: ["Lime", "Green Apple", "Pear", "Apricot", "Peach"],
      non_fruity: ["Petrol", "Honey", "Jasmine", "Ginger", "Slate"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium-Minus", "Medium", "Full"],
      finish: ["Medium", "Long", "Long & Floral", "Long & Mineral"],
    },
  },

  "Pinot Gris": {
    label: "Pinot Gris / Pinot Grigio",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F5EECF" },
      { label: "Pale Straw", hex: "#EFE4AA" },
      { label: "Lemon", hex: "#E5D97F" },
      { label: "Light Gold", hex: "#CDB65F" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Mineral",
      fruity: ["Lemon", "Green Apple", "Pear", "White Peach", "Melon"],
      non_fruity: ["Almond", "Wet Stone", "White Flowers", "Ginger", "Lees"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long"],
    },
  },

  "Chenin Blanc": {
    label: "Chenin Blanc",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Straw", hex: "#F0E6B3" },
      { label: "Lemon Gold", hex: "#E4D377" },
      { label: "Gold", hex: "#CEAB4A" },
      { label: "Deep Gold", hex: "#A8782D" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Honey & Mineral",
      fruity: ["Apple", "Pear", "Quince", "Lemon", "Apricot"],
      non_fruity: ["Honey", "Beeswax", "Chamomile", "Wool", "Wet Stone"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Honeyed"],
    },
  },

  Gewurztraminer: {
    label: "Gewürztraminer",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Gold", hex: "#EAD991" },
      { label: "Gold", hex: "#D8B95E" },
      { label: "Deep Gold", hex: "#BF8E3C" },
      { label: "Amber Gold", hex: "#9D6A2E" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits & Floral",
      non_fruity_label: "Exotic & Spice",
      fruity: ["Lychee", "Peach", "Apricot", "Mandarin", "Tropical Fruit"],
      non_fruity: ["Rose Petal", "Ginger", "Turkish Delight", "Honey", "Baking Spice"],
    },
    taste: {
      sweet: ["Dry", "Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Low", "Medium-Minus", "Medium"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Spiced"],
    },
  },

  Viognier: {
    label: "Viognier",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Lemon", hex: "#E9D982" },
      { label: "Light Gold", hex: "#D8BC66" },
      { label: "Gold", hex: "#C99C42" },
      { label: "Deep Gold", hex: "#A16B2E" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits & Floral",
      non_fruity_label: "Spice & Cream",
      fruity: ["Apricot", "Peach", "Tangerine", "Mango", "Pear"],
      non_fruity: ["Honeysuckle", "Ginger", "Cream", "Almond", "Perfume"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Low", "Medium-Minus", "Medium"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Floral"],
    },
  },

  Semillon: {
    label: "Sémillon",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Lemon", hex: "#EEE3A2" },
      { label: "Lemon Gold", hex: "#DFCC76" },
      { label: "Gold", hex: "#CBA64C" },
      { label: "Deep Honey", hex: "#9F6D2F" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Wax & Toast",
      fruity: ["Lemon", "Apple", "Pear", "Fig", "Apricot"],
      non_fruity: ["Lanolin", "Beeswax", "Toast", "Honey", "Hay"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Waxy"],
    },
  },

  Albarino: {
    label: "Albariño",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F3EDC4" },
      { label: "Pale Lemon", hex: "#E9DC83" },
      { label: "Lemon Gold", hex: "#DCC666" },
      { label: "Light Gold", hex: "#BFA84F" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Saline & Floral",
      fruity: ["Lime", "Lemon", "Green Apple", "Peach", "Nectarine"],
      non_fruity: ["Sea Spray", "Wet Stone", "White Flowers", "Almond", "Herbs"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium-Minus", "Medium"],
      finish: ["Medium", "Long", "Long & Saline"],
    },
  },

  "Gruner Veltliner": {
    label: "Grüner Veltliner",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F2ECC5" },
      { label: "Pale Lemon", hex: "#E5DC91" },
      { label: "Green-Gold", hex: "#CDD276" },
      { label: "Light Gold", hex: "#C3AD58" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Pepper & Mineral",
      fruity: ["Lime", "Lemon", "Green Apple", "Pear", "Grapefruit"],
      non_fruity: ["White Pepper", "Lentil", "Radish", "Wet Stone", "Herbs"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Medium", "Long", "Long & Peppery"],
    },
  },

  Muscat: {
    label: "Muscat / Moscato",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F6F0C9" },
      { label: "Pale Straw", hex: "#EEE3A4" },
      { label: "Lemon Gold", hex: "#E2CD73" },
      { label: "Gold", hex: "#CFA24F" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Sweet",
      fruity: ["Grape", "Orange", "Peach", "Apricot", "Mandarin"],
      non_fruity: ["Orange Blossom", "Rose", "Honey", "Mint", "Perfume"],
    },
    taste: {
      sweet: ["Dry", "Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Low", "Medium", "Medium-Plus"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long & Floral"],
    },
  },

  Vermentino: {
    label: "Vermentino",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F3EFC8" },
      { label: "Pale Lemon", hex: "#E8DD8C" },
      { label: "Lemon Gold", hex: "#D7C66A" },
      { label: "Light Gold", hex: "#C2A950" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Herbal & Saline",
      fruity: ["Lemon", "Lime", "Green Apple", "Pear", "Grapefruit"],
      non_fruity: ["Sea Salt", "Almond", "Thyme", "Bitter Herbs", "Wet Stone"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Medium", "Long", "Long & Bitter-Almond"],
    },
  },

  Torrontes: {
    label: "Torrontés",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Pale Lemon", hex: "#EFE4A3" },
      { label: "Lemon Gold", hex: "#E2CD75" },
      { label: "Light Gold", hex: "#D0AE52" },
      { label: "Gold", hex: "#B98436" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits & Floral",
      non_fruity_label: "Floral & Spice",
      fruity: ["Peach", "Apricot", "Lemon", "Orange", "Melon"],
      non_fruity: ["Jasmine", "Rose", "Geranium", "Ginger", "White Pepper"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long & Floral"],
    },
  },

  "White Blend": {
    label: "White Blend",
    category: "White",
    glassShape: "white",
    colors: [
      { label: "Water-Pale", hex: "#F5EFCB" },
      { label: "Pale Lemon", hex: "#EDE29A" },
      { label: "Lemon Gold", hex: "#DDC86D" },
      { label: "Light Gold", hex: "#C2A253" },
    ],
    clarity: ["Crystal", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Mineral",
      fruity: ["Lemon", "Apple", "Pear", "Peach", "Tropical Fruit"],
      non_fruity: ["White Flowers", "Honey", "Wet Stone", "Herbs", "Almond"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus", "Full"],
      finish: ["Short", "Medium", "Long"],
    },
  },

  // ─── Rosé ─────────────────────────────────────────────────────────────────

  "Provence Rose": {
    label: "Provence-Style Rosé",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Water-Pink", hex: "#F6DDE0" },
      { label: "Pale Peach", hex: "#F2C7BC" },
      { label: "Light Salmon", hex: "#ECA69E" },
      { label: "Coral Pink", hex: "#D97878" },
    ],
    clarity: ["Crystal Clear", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Herbal",
      fruity: ["Strawberry", "White Peach", "Watermelon", "Raspberry", "Red Currant"],
      non_fruity: ["Rose Petal", "Citrus Zest", "Sea Salt", "Lavender", "Cream"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium-Minus", "Medium"],
      finish: ["Short", "Medium", "Long & Fresh"],
      tannin: ["None", "Light", "Light Grip"],
    },
  },

  "Grenache Rose": {
    label: "Grenache Rosé",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Barely Pink", hex: "#F3D6D8" },
      { label: "Salmon", hex: "#EAA09A" },
      { label: "Coral", hex: "#D86B6A" },
      { label: "Deep Rose", hex: "#A8474C" },
    ],
    clarity: ["Crystal Clear", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Spice",
      fruity: ["Strawberry", "Raspberry", "Watermelon", "Cherry", "Peach"],
      non_fruity: ["Rose Petal", "Citrus Zest", "White Pepper", "Herbs", "Cream"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long"],
      tannin: ["None", "Light", "Light Grip"],
    },
  },

  "Pinot Noir Rose": {
    label: "Pinot Noir Rosé",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Barely Pink", hex: "#F4D8DE" },
      { label: "Pale Salmon", hex: "#EEAEB0" },
      { label: "Light Coral", hex: "#D9797E" },
      { label: "Ruby Pink", hex: "#B94C5A" },
    ],
    clarity: ["Crystal Clear", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Mineral",
      fruity: ["Strawberry", "Cherry", "Raspberry", "Cranberry", "Blood Orange"],
      non_fruity: ["Rose Petal", "Wet Stone", "Orange Peel", "Green Tea", "Spice"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long & Bright"],
      tannin: ["None", "Light", "Light Grip"],
    },
  },

  "Syrah Rose": {
    label: "Syrah Rosé",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Salmon", hex: "#E99A94" },
      { label: "Coral", hex: "#D86B6A" },
      { label: "Deep Rose", hex: "#B94A56" },
      { label: "Ruby Rose", hex: "#8F2F43" },
    ],
    clarity: ["Crystal Clear", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Smoke",
      fruity: ["Raspberry", "Strawberry", "Red Plum", "Cherry", "Watermelon"],
      non_fruity: ["White Pepper", "Violet", "Smoke", "Dried Herbs", "Orange Peel"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Spiced"],
      tannin: ["Light", "Medium-Minus", "Medium"],
    },
  },

  "Mourvedre Rose": {
    label: "Mourvèdre Rosé / Bandol-Style",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Pale Salmon", hex: "#ECA89A" },
      { label: "Copper Rose", hex: "#D98772" },
      { label: "Deep Salmon", hex: "#C8685E" },
      { label: "Rust Rose", hex: "#9A4A3C" },
    ],
    clarity: ["Crystal Clear", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Savory & Herbal",
      fruity: ["Strawberry", "Red Currant", "Peach", "Blood Orange", "Melon"],
      non_fruity: ["Dried Herbs", "Sea Salt", "Leather", "White Pepper", "Tea"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Savory"],
      tannin: ["Light", "Medium-Minus", "Medium"],
    },
  },

  "Sangiovese Rose": {
    label: "Sangiovese Rosé / Rosato",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Pale Coral", hex: "#E8A09B" },
      { label: "Watermelon", hex: "#DD7B78" },
      { label: "Cherry Rose", hex: "#C9545F" },
      { label: "Deep Rosato", hex: "#963644" },
    ],
    clarity: ["Crystal Clear", "Bright", "Slightly Hazy"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Herbal & Earthy",
      fruity: ["Sour Cherry", "Strawberry", "Raspberry", "Blood Orange", "Red Plum"],
      non_fruity: ["Tomato Leaf", "Dried Herbs", "Rose Petal", "Orange Peel", "Earth"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Medium", "Long", "Long & Tart"],
      tannin: ["None", "Light", "Medium-Minus"],
    },
  },

  "White Zinfandel": {
    label: "White Zinfandel / Sweet Rosé",
    category: "Rosé",
    glassShape: "tulip",
    colors: [
      { label: "Cotton Candy", hex: "#F2C4CF" },
      { label: "Pink Lemonade", hex: "#EFA8B8" },
      { label: "Strawberry Pink", hex: "#DE7287" },
      { label: "Deep Candy Rose", hex: "#B94962" },
    ],
    clarity: ["Crystal Clear", "Bright"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Sweet & Floral",
      fruity: ["Strawberry", "Raspberry", "Watermelon", "Peach", "Candied Cherry"],
      non_fruity: ["Cotton Candy", "Cream Soda", "Rose", "Honey", "Citrus Zest"],
    },
    taste: {
      sweet: ["Off-Dry", "Sweet", "Very Sweet"],
      acidity: ["Low", "Medium", "Medium-Plus"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Short", "Medium", "Long & Candied"],
      tannin: ["None", "Light"],
    },
  },

  // ─── Red ──────────────────────────────────────────────────────────────────

  "Pinot Noir": {
    label: "Pinot Noir",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Pale Ruby", hex: "#C75A64" },
      { label: "Light Ruby", hex: "#A6384A" },
      { label: "Garnet", hex: "#842134" },
      { label: "Deep Garnet", hex: "#551322" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Earth & Spice",
      fruity: ["Cherry", "Strawberry", "Raspberry", "Cranberry", "Plum"],
      non_fruity: ["Mushroom", "Forest Floor", "Clove", "Smoke", "Cola"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Low", "Medium-Minus", "Medium"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium", "Medium-Plus"],
      finish: ["Medium", "Long", "Long & Silky"],
    },
  },

  Gamay: {
    label: "Gamay (Beaujolais)",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Bright Ruby", hex: "#C14455" },
      { label: "Ruby", hex: "#A52A3F" },
      { label: "Purple Ruby", hex: "#7B1D3A" },
      { label: "Deep Ruby", hex: "#551428" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Bright"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Earth",
      fruity: ["Red Cherry", "Raspberry", "Strawberry", "Cranberry", "Banana"],
      non_fruity: ["Violet", "Bubblegum", "Granite", "White Pepper", "Earth"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Low", "Medium-Minus", "Medium"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Light", "Medium-Minus", "Medium"],
      finish: ["Short", "Medium", "Long & Juicy"],
    },
  },

  Grenache: {
    label: "Grenache / Garnacha",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Pale Ruby", hex: "#BC4A54" },
      { label: "Ruby", hex: "#9E293B" },
      { label: "Garnet", hex: "#742033" },
      { label: "Brick Garnet", hex: "#5E1D27" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Earth",
      fruity: ["Strawberry", "Raspberry", "Cherry", "Red Plum", "Fig"],
      non_fruity: ["White Pepper", "Dried Herbs", "Leather", "Licorice", "Orange Peel"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Low", "Medium", "Medium-Plus"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Spiced"],
    },
  },

  Merlot: {
    label: "Merlot",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby", hex: "#A22538" },
      { label: "Deep Ruby", hex: "#74172B" },
      { label: "Purple Ruby", hex: "#551437" },
      { label: "Inky Garnet", hex: "#35101F" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Spice",
      fruity: ["Plum", "Black Cherry", "Blackberry", "Blueberry", "Fig"],
      non_fruity: ["Chocolate", "Vanilla", "Cedar", "Tobacco", "Bay Leaf"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium-Minus", "Medium", "Medium-Plus", "Velvety"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Plush"],
    },
  },

  "Cabernet Sauvignon": {
    label: "Cabernet Sauvignon",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Ruby", hex: "#6E1423" },
      { label: "Purple", hex: "#4B0D25" },
      { label: "Inky Purple", hex: "#2A071A" },
      { label: "Black Core", hex: "#17070E" },
    ],
    clarity: ["Semi-Translucent", "Semi-Opaque", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Earth",
      fruity: ["Blackcurrant", "Blackberry", "Black Cherry", "Plum", "Blueberry"],
      non_fruity: ["Cedar", "Tobacco", "Graphite", "Mint", "Bell Pepper"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Chewy"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium-Plus", "Full", "Powerful"],
      finish: ["Medium", "Long", "Long & Warming", "Very Long"],
    },
  },

  "Cabernet Franc": {
    label: "Cabernet Franc",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby", hex: "#9F2637" },
      { label: "Deep Ruby", hex: "#73182A" },
      { label: "Garnet", hex: "#581525" },
      { label: "Purple Garnet", hex: "#3C0E20" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Herb & Earth",
      fruity: ["Raspberry", "Red Cherry", "Plum", "Blackcurrant", "Strawberry"],
      non_fruity: ["Bell Pepper", "Violet", "Graphite", "Tobacco", "Dried Herbs"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium-Minus", "Medium", "Medium-Plus", "Firm"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Herbal"],
    },
  },

  Syrah: {
    label: "Syrah / Shiraz",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Purple", hex: "#4B0E2A" },
      { label: "Inky Purple", hex: "#2C081C" },
      { label: "Black Ruby", hex: "#1B0711" },
      { label: "Opaque Black", hex: "#0F0509" },
    ],
    clarity: ["Semi-Opaque", "Opaque", "Dense & Dark"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Smoke & Spice",
      fruity: ["Blackberry", "Blueberry", "Black Plum", "Black Cherry", "Boysenberry"],
      non_fruity: ["Black Pepper", "Olive", "Smoke", "Bacon", "Violet"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Grippy"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium-Plus", "Full", "Powerful"],
      finish: ["Medium", "Long", "Long & Peppery", "Very Long"],
    },
  },

  Zinfandel: {
    label: "Zinfandel / Primitivo",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby", hex: "#A5223C" },
      { label: "Deep Ruby", hex: "#761532" },
      { label: "Purple Ruby", hex: "#53102B" },
      { label: "Jammy Purple", hex: "#351021" },
    ],
    clarity: ["Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Jam",
      fruity: ["Raspberry Jam", "Blackberry", "Black Cherry", "Plum", "Raisin"],
      non_fruity: ["Black Pepper", "Licorice", "Vanilla", "Smoke", "Sweet Spice"],
    },
    taste: {
      sweet: ["Dry", "Off-Dry", "Sweet"],
      tannin: ["Medium-Minus", "Medium", "Medium-Plus"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium-Plus", "Full", "Big"],
      finish: ["Medium", "Long", "Long & Jammy"],
    },
  },

  Malbec: {
    label: "Malbec",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Purple", hex: "#551331" },
      { label: "Inky Violet", hex: "#351024" },
      { label: "Black Purple", hex: "#210815" },
      { label: "Opaque Core", hex: "#110509" },
    ],
    clarity: ["Semi-Opaque", "Opaque", "Dense & Inky"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Oak",
      fruity: ["Blackberry", "Black Plum", "Blueberry", "Black Cherry", "Fig"],
      non_fruity: ["Cocoa", "Violet", "Leather", "Tobacco", "Smoke"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Plush"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium-Plus", "Full", "Powerful"],
      finish: ["Medium", "Long", "Long & Velvety"],
    },
  },

  Sangiovese: {
    label: "Sangiovese",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Bright Ruby", hex: "#B53542" },
      { label: "Ruby", hex: "#922131" },
      { label: "Garnet", hex: "#6E1D2A" },
      { label: "Brick Garnet", hex: "#5B241E" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Earth & Herb",
      fruity: ["Sour Cherry", "Red Cherry", "Strawberry", "Red Plum", "Fig"],
      non_fruity: ["Tomato Leaf", "Leather", "Dried Herbs", "Tobacco", "Clay"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Firm"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Savory"],
    },
  },

  Nebbiolo: {
    label: "Nebbiolo / Barolo / Barbaresco",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Pale Garnet", hex: "#A94A4E" },
      { label: "Garnet", hex: "#82323A" },
      { label: "Brick", hex: "#6E2D25" },
      { label: "Tawny Garnet", hex: "#57311F" },
    ],
    clarity: ["Translucent", "Semi-Translucent"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Tar & Rose",
      fruity: ["Sour Cherry", "Cranberry", "Raspberry", "Red Plum", "Dried Cherry"],
      non_fruity: ["Rose", "Tar", "Licorice", "Leather", "Truffle"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Medium-Plus", "High", "Very High", "Firm"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Long", "Long & Floral", "Very Long", "Very Long & Tannic"],
    },
  },

  Tempranillo: {
    label: "Tempranillo / Rioja",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby", hex: "#9B2433" },
      { label: "Garnet", hex: "#711B2A" },
      { label: "Brick Ruby", hex: "#64211F" },
      { label: "Deep Garnet", hex: "#3F1119" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Oak & Earth",
      fruity: ["Cherry", "Strawberry", "Plum", "Blackberry", "Fig"],
      non_fruity: ["Leather", "Tobacco", "Vanilla", "Dill", "Cedar"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Polished"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Savory"],
    },
  },

  Mourvedre: {
    label: "Mourvèdre / Monastrell",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Ruby", hex: "#74192A" },
      { label: "Purple Garnet", hex: "#4B1126" },
      { label: "Inky Ruby", hex: "#2B0B18" },
      { label: "Black Core", hex: "#16060D" },
    ],
    clarity: ["Semi-Opaque", "Opaque", "Dense & Dark"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Savory & Smoke",
      fruity: ["Blackberry", "Black Plum", "Blueberry", "Black Cherry", "Fig"],
      non_fruity: ["Leather", "Game", "Black Pepper", "Dried Herbs", "Smoke"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Rugged"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium-Plus", "Full", "Powerful"],
      finish: ["Medium", "Long", "Long & Rustic"],
    },
  },

  Carignan: {
    label: "Carignan",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Bright Ruby", hex: "#A52A3F" },
      { label: "Garnet", hex: "#7A1F32" },
      { label: "Deep Crimson", hex: "#4A0E1F" },
      { label: "Inky Garnet", hex: "#290812" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Savory",
      fruity: ["Tart Cherry", "Raspberry", "Cranberry", "Blackberry", "Plum"],
      non_fruity: ["Black Pepper", "Dried Herbs", "Leather", "Smoke", "Cured Meat"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Rustic"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Peppery"],
    },
  },

  "Petite Sirah": {
    label: "Petite Sirah / Durif",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Inky Purple", hex: "#351028" },
      { label: "Black Purple", hex: "#220916" },
      { label: "Opaque Violet", hex: "#14050D" },
      { label: "Blue-Black", hex: "#0D0509" },
    ],
    clarity: ["Opaque", "Dense & Dark"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Dark & Spice",
      fruity: ["Blackberry", "Blueberry", "Black Plum", "Black Cherry", "Boysenberry"],
      non_fruity: ["Dark Chocolate", "Black Pepper", "Violet", "Smoke", "Licorice"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium-Plus", "High", "Very High", "Chewy"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Full", "Powerful", "Massive"],
      finish: ["Long", "Very Long", "Very Long & Inky"],
    },
  },

  Barbera: {
    label: "Barbera",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Ruby", hex: "#B1293A" },
      { label: "Deep Ruby", hex: "#851C2D" },
      { label: "Purple Ruby", hex: "#5B1430" },
      { label: "Garnet", hex: "#45121F" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Earth",
      fruity: ["Red Cherry", "Black Cherry", "Raspberry", "Plum", "Blackberry"],
      non_fruity: ["Violet", "Licorice", "Earth", "Baking Spice", "Almond"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Low", "Medium-Minus", "Medium"],
      acidity: ["Medium-Plus", "High", "Very High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Tart"],
    },
  },

  Dolcetto: {
    label: "Dolcetto",
    category: "Red",
    glassShape: "burgundy",
    colors: [
      { label: "Ruby", hex: "#A8243A" },
      { label: "Purple Ruby", hex: "#751936" },
      { label: "Deep Purple", hex: "#50102B" },
      { label: "Dark Garnet", hex: "#35101F" },
    ],
    clarity: ["Translucent", "Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Bitter & Earthy",
      fruity: ["Black Cherry", "Plum", "Blackberry", "Blueberry", "Raspberry"],
      non_fruity: ["Licorice", "Almond", "Violet", "Earth", "Black Pepper"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry"],
      tannin: ["Medium", "Medium-Plus", "High"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Short", "Medium", "Long & Bitter-Almond"],
    },
  },

  Carmenere: {
    label: "Carménère",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Ruby", hex: "#7A172B" },
      { label: "Purple Ruby", hex: "#521126" },
      { label: "Inky Garnet", hex: "#310B18" },
      { label: "Black Core", hex: "#18060D" },
    ],
    clarity: ["Semi-Translucent", "Semi-Opaque", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Herbal & Spice",
      fruity: ["Black Plum", "Blackberry", "Black Cherry", "Raspberry", "Blueberry"],
      non_fruity: ["Bell Pepper", "Paprika", "Tobacco", "Cocoa", "Green Peppercorn"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High", "Smooth"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Herbal"],
    },
  },

  Pinotage: {
    label: "Pinotage",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Ruby", hex: "#98223A" },
      { label: "Deep Ruby", hex: "#66172E" },
      { label: "Purple Garnet", hex: "#431224" },
      { label: "Dark Core", hex: "#220A14" },
    ],
    clarity: ["Semi-Translucent", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Smoke & Earthy",
      fruity: ["Blackberry", "Plum", "Black Cherry", "Raspberry", "Fig"],
      non_fruity: ["Smoke", "Coffee", "Rubber", "Earth", "Banana"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Medium", "Medium-Plus", "High"],
      acidity: ["Medium-Minus", "Medium", "Medium-Plus"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Smoky"],
    },
  },

  "Touriga Nacional": {
    label: "Touriga Nacional",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Deep Purple", hex: "#4A102B" },
      { label: "Inky Violet", hex: "#2B0A1C" },
      { label: "Black Ruby", hex: "#19070F" },
      { label: "Opaque Core", hex: "#0E0408" },
    ],
    clarity: ["Opaque", "Dense & Dark"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Floral & Earthy",
      fruity: ["Blackberry", "Blueberry", "Black Plum", "Black Cherry", "Cassis"],
      non_fruity: ["Violet", "Bergamot", "Cocoa", "Licorice", "Wet Stone"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet", "Very Sweet"],
      tannin: ["Medium-Plus", "High", "Very High", "Firm"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium-Plus", "Full", "Powerful"],
      finish: ["Long", "Very Long", "Long & Floral"],
    },
  },

  "Red Blend": {
    label: "Red Blend",
    category: "Red",
    glassShape: "bordeaux",
    colors: [
      { label: "Bright Ruby", hex: "#A52A3F" },
      { label: "Medium Garnet", hex: "#6E1423" },
      { label: "Deep Purple", hex: "#3D0E2A" },
      { label: "Inky Dark", hex: "#1A0810" },
    ],
    clarity: ["Semi-Translucent", "Semi-Opaque", "Opaque"],
    aromas: {
      fruity_label: "Fruits",
      non_fruity_label: "Spice & Earth",
      fruity: ["Mixed Berries", "Cherry", "Plum", "Fig", "Raisin"],
      non_fruity: ["Black Pepper", "Clove", "Mocha", "Leather", "Licorice"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry", "Sweet"],
      tannin: ["Smooth", "Medium", "Bold"],
      acidity: ["Low", "Medium", "High"],
      body: ["Medium", "Full", "Full & Lush"],
      finish: ["Short", "Medium", "Long", "Long & Complex"],
    },
  },

  // ─── Dessert ─────────────────────────────────────────────────────────────

  Sauternes: {
    label: "Sauternes / Barsac",
    category: "Dessert",
    glassShape: "white",
    colors: [
      { label: "Pale Gold", hex: "#F0D88A" },
      { label: "Amber", hex: "#C89040" },
      { label: "Deep Amber", hex: "#9C6A2E" },
      { label: "Rich Amber", hex: "#7A4E1C" },
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
      sweetness_intensity: ["Delicate", "Moderate", "Rich", "Intense", "Syrupy"],
      acidity: ["Low", "Balancing", "High — keeps it lively"],
      body: ["Medium", "Full & Viscous"],
      finish: ["Long & Honeyed", "Long & Complex", "Endless"],
    },
  },

  Port: {
    label: "Port / Fortified Red",
    category: "Dessert",
    glassShape: "white",
    colors: [
      { label: "Deep Ruby", hex: "#6E1423" },
      { label: "Tawny", hex: "#8C4A20" },
      { label: "Deep Tawny", hex: "#6A3010" },
      { label: "Dark Amber", hex: "#4A2010" },
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

  "Skin-Contact Pinot Gris": {
    label: "Skin-Contact Pinot Gris / Orange Wine",
    category: "Orange",
    glassShape: "white",
    colors: [
      { label: "Copper Pink", hex: "#D99A82" },
      { label: "Onion Skin", hex: "#C9826E" },
      { label: "Amber Rose", hex: "#B76B4E" },
      { label: "Burnished Orange", hex: "#965238" },
    ],
    clarity: ["Hazy", "Murky", "Cloudy"],
    aromas: {
      fruity_label: "Fruits & Dried",
      non_fruity_label: "Savory & Tannic",
      fruity: ["Apricot", "Orange Peel", "Peach", "Pear", "Dried Apple"],
      non_fruity: ["Tea", "Almond Skin", "Honey", "Ginger", "Dried Flowers"],
    },
    taste: {
      sweet: ["Bone Dry", "Dry", "Off-Dry"],
      tannin: ["Light", "Medium", "Grippy"],
      acidity: ["Medium", "Medium-Plus", "High"],
      body: ["Medium", "Medium-Plus", "Full"],
      finish: ["Medium", "Long", "Long & Tannic"],
    },
  },

  "Orange Wine": {
    label: "Orange Wine (General)",
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
      fruity: ["Dried Apricot", "Orange Peel", "Quince", "Dried Mango", "Nectarine"],
      non_fruity: ["Walnuts", "Beeswax", "Chamomile", "Oxidative / Nutty", "Sourdough"],
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
