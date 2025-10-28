export const allowedThemes = ["calm-morning", "focus", "gratitude", "confidence", "peace", "custom"] as const;
export const allowedMoods = ["minimalist", "bohemian", "modern-serif", "coastal", "earthy"] as const;

const themeSynonyms = new Map<string, string>([
  ["calm morning", "calm-morning"],
  ["sunrise calm", "calm-morning"],
  ["morning calm", "calm-morning"],
  ["focus", "focus"],
  ["gratitude", "gratitude"],
  ["confidence", "confidence"],
  ["peace", "peace"],
]);

const moodSynonyms = new Map<string, string>([
  ["minimal", "minimalist"],
  ["boho", "bohemian"],
  ["modern", "modern-serif"],
  ["coast", "coastal"],
  ["botanical", "earthy"],
]);

export function normalizeText(input: unknown): string {
  if (!input) return "";
  let value = String(input);
  value = value.replace(/https?:\/\/\S+/gi, " ");
  value = value.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, " ");
  value = value.replace(/ignore (previous|prior) instructions/gi, " ");
  value = value.replace(/system\s*:/gi, " ");
  value = value.replace(/assistant\s*:/gi, " ");
  value = value.replace(/user\s*:/gi, " ");
  value = value.replace(/\s+/g, " ").trim();
  if (value.length > 300) value = value.slice(0, 300);
  return value;
}

export function mapTheme(themeRaw: unknown): string {
  const t = (themeRaw || "").toString().toLowerCase().trim();
  if (allowedThemes.includes(t as any)) return t;
  if (themeSynonyms.has(t)) return themeSynonyms.get(t)!;
  if (t.includes("calm")) return "calm-morning";
  if (t.includes("focus")) return "focus";
  if (t.includes("gratitud")) return "gratitude";
  if (t.includes("confiden")) return "confidence";
  if (t.includes("peace")) return "peace";
  return "peace";
}

export function mapMood(moodRaw: unknown): string {
  const m = (moodRaw || "").toString().toLowerCase().trim();
  if (allowedMoods.includes(m as any)) return m;
  if (moodSynonyms.has(m)) return moodSynonyms.get(m)!;
  if (m.includes("boho")) return "bohemian";
  if (m.includes("modern")) return "modern-serif";
  if (m.includes("coast")) return "coastal";
  if (m.includes("earth") || m.includes("botan")) return "earthy";
  return "minimalist";
}

const THEME_MODIFIERS: Record<string, any> = {
  calm_morning: {
    additional_context:
      "Evoke peaceful sunrise energy, gentle awakening, soft optimism. Include phrases about fresh starts, mindful beginnings, peaceful energy.",
  },
  focus: {
    additional_context:
      "Sharp, clear, purposeful energy. Phrases about clarity, determination, goal-achievement, mental strength.",
  },
  gratitude: {
    additional_context:
      "Warm, abundant, heart-centered energy. Phrases about thankfulness, appreciation, abundance, love.",
  },
  confidence: {
    additional_context:
      "Bold, empowered, strong energy. Phrases about self-belief, courage, strength, capability.",
  },
  peace: {
    additional_context:
      "Serene, calming, meditative energy. Phrases about tranquility, balance, inner calm, letting go.",
  },
};

export function buildBasePrompt(themeSlug: string, mood: string, userInput: string): string {
  const themeKey = themeSlug === "calm-morning" ? "calm_morning" : themeSlug;
  const modifier = THEME_MODIFIERS[themeKey] || {};
  return `Create a high-quality, printable motivational affirmation design with the following specifications:\n\nTHEME & CONCEPT:\n- Primary theme: ${themeSlug}\n- Mood/Style: ${mood}\n- User keywords: ${userInput}\n\nDESIGN REQUIREMENTS:\n- Layout: Vertical composition (portrait orientation, suitable for 8x10\" or similar)\n- Typography: Mix 3-5 complementary fonts (serif, sans-serif, script/handwritten styles)\n- Font hierarchy: Vary sizes dramatically - largest phrase should be 3-4x larger than smallest\n- Text arrangement: Organic, non-grid layout with phrases at varying angles (0-15 degrees)\n- White space: Generous breathing room, not overcrowded\n\nCOLOR PALETTE (choose ONE direction based on theme):\n- Earthy: Terracotta, sage green, cream, burnt sienna, warm taupe\n- Floral: Dusty rose, mauve, soft peach, muted lavender, cream\n- Coastal: Seafoam, sandy beige, driftwood gray, soft aqua, white\n- Minimalist: Black/charcoal on pure white, or sepia tones\n- Botanical: Deep forest green, olive, moss, natural beige, off-white\n- Sunset: Coral, amber, blush pink, golden yellow, cream\n\nDECORATIVE ELEMENTS:\n- Include 4-8 delicate accent elements strategically placed\n- Elements should enhance, not overwhelm\n- Style: Hand-drawn, organic feel (avoid overly perfect/digital look)\n\nAFFIRMATION CONTENT:\nGenerate 8-12 short, powerful affirmations related to the theme.\n\nARTISTIC STYLE:\n- Overall aesthetic: Modern farmhouse meets minimalist inspiration\n- Texture: Subtle, slight paper texture or organic imperfection\n- Line quality: Hand-drawn appearance, slight irregularity\n- Balance: Asymmetrical but visually balanced\n- Professional yet approachable, commercial-quality\n\nTECHNICAL SPECIFICATIONS:\n- Resolution: 300 DPI minimum\n- Format: Print-ready quality\n- Background: Clean (white/cream) or subtle texture\n- Contrast: Ensure excellent readability\n- No gradients or complex effects that compromise printability\n\nUNIQUENESS FACTORS (apply 2-3):\n- Varied text baseline (wavy, curved, or stepped)\n- Clustered phrase groupings with connecting elements\n- Negative space as a design element\n- Asymmetric weight distribution\n- Unexpected font pairings\n- Strategic use of bold vs. delicate elements\n\nTHEME CONTEXT:\n${modifier.additional_context || ""}\n`;
}

export function makePreviewSpec(theme: string, mood: string, userText: string) {
  const byTheme: Record<string, any> = {
    "calm-morning": {
      mainAffirmation: "SOFT WITHIN",
      supportingPhrases: [
        "I rise with intention",
        "Morning light guides me",
        "Peace starts here",
        "Gentle beginnings matter",
        "I breathe in clarity",
        "Today I choose calm",
        "Stillness is my strength",
        "I trust this moment",
      ],
      palette: "Soft Peach / Warm Cream / Pale Gold",
      layoutStyle: "Cascading diagonal with sunrise-inspired flow",
      accentStyle: "Delicate sun rays and morning botanical sprigs",
    },
    focus: {
      mainAffirmation: "CLEAR MIND",
      supportingPhrases: [
        "One thing at a time",
        "Distraction fades, clarity remains",
        "I am fully present",
        "My attention is powerful",
        "Focus creates momentum",
        "I choose depth over speed",
        "Intentional energy flows",
        "This task matters",
      ],
      palette: "Charcoal / Sage / Crisp White",
      layoutStyle: "Geometric grid with bold typography hierarchy",
      accentStyle: "Minimal lines and directional arrows",
    },
    gratitude: {
      mainAffirmation: "I AM GRATEFUL",
      supportingPhrases: [
        "Small joys fill my heart",
        "Abundance surrounds me",
        "I notice beauty daily",
        "Thank you for this moment",
        "Appreciation flows freely",
        "I celebrate what is",
        "Grateful for growth",
        "Joy lives in the present",
      ],
      palette: "Warm Terracotta / Gold / Cream",
      layoutStyle: "Circular arrangement with heart-centered focal point",
      accentStyle: "Hand-drawn hearts and organic floral elements",
    },
    confidence: {
      mainAffirmation: "I AM CAPABLE",
      supportingPhrases: [
        "My voice matters",
        "I trust my decisions",
        "Doubt does not define me",
        "I stand in my power",
        "Courage lives within",
        "I am enough, always",
        "My light shines bright",
        "I believe in myself",
      ],
      palette: "Deep Navy / Copper / Ivory",
      layoutStyle: "Bold vertical stack with powerful typography",
      accentStyle: "Geometric frames and confident underlines",
    },
    peace: {
      mainAffirmation: "INNER CALM",
      supportingPhrases: [
        "I release what I cannot control",
        "Peace flows through me",
        "Stillness is my refuge",
        "I choose serenity",
        "My breath anchors me",
        "Gentle is powerful",
        "I am safe here",
        "Quiet heals",
      ],
      palette: "Soft Blue / Pale Sage / Warm Gray",
      layoutStyle: "Organic waves with gentle curved text flow",
      accentStyle: "Watercolor texture with flowing botanical lines",
    },
    custom: {
      mainAffirmation: (userText || "Your Intention").split(" ").slice(0, 3).join(" ").toUpperCase() || "YOUR INTENTION",
      supportingPhrases: [
        "I honor my unique path",
        "My vision is valid",
        "I create what I need",
        "This is my story",
        "I trust my direction",
        "My way is the right way",
        "I design my life",
        "Authenticity guides me",
      ],
      palette: "Custom palette based on mood",
      layoutStyle: "Personalized arrangement reflecting your energy",
      accentStyle: "Mixed elements tailored to your keywords",
    },
  };
  const moodPalettes: Record<string, string> = {
    minimalist: "Black / White / Single Accent Color",
    bohemian: "Terracotta / Mustard / Sage / Warm Cream",
    "modern-serif": "Charcoal / Blush / Ivory / Gold",
    coastal: "Soft Blue / Sandy Beige / Sea Foam / White",
    earthy: "Forest Green / Clay / Cream / Rust",
  };
  const base = {
    palette: "Warm Cream / Sage / Terracotta",
    layoutStyle: "Organic flowing arrangement with curved phrases",
    accentStyle: "Botanical line art with soft circular accents",
  };
  const spec = { ...base, ...(byTheme[theme] || byTheme["peace"]) };
  (spec as any).palette = moodPalettes[mood] || (spec as any).palette;
  return spec;
}

export async function moderateText(text: string): Promise<{ allowed: boolean }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { allowed: true };
  try {
    const resp = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "omni-moderation-latest", input: text || "" }),
    });
    const data = await resp.json();
    const flagged = data?.results?.[0]?.flagged === true;
    return { allowed: !flagged };
  } catch {
    return { allowed: true };
  }
}


