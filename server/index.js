import express from "express";

// Note: Node 18+ has global fetch

const app = express();
app.use(express.json({ limit: "1mb" }));

// In-memory stores (dev-only)
const previews = new Map();
const generations = new Map();

// Allowed values and synonym maps (light guardrails)
const allowedThemes = ["calm-morning", "focus", "gratitude", "confidence", "peace", "custom"];
const allowedMoods = ["minimalist", "bohemian", "modern-serif", "coastal", "earthy"];

const themeSynonyms = new Map([
  ["calm morning", "calm-morning"],
  ["sunrise calm", "calm-morning"],
  ["morning calm", "calm-morning"],
  ["focus", "focus"],
  ["gratitude", "gratitude"],
  ["confidence", "confidence"],
  ["peace", "peace"],
]);

const moodSynonyms = new Map([
  ["minimal", "minimalist"],
  ["boho", "bohemian"],
  ["modern", "modern-serif"],
  ["coast", "coastal"],
  ["botanical", "earthy"],
]);

const THEME_MODIFIERS = {
  calm_morning: {
    additional_context:
      "Evoke peaceful sunrise energy, gentle awakening, soft optimism. Include phrases about fresh starts, mindful beginnings, peaceful energy.",
    color_preference: "Warm neutrals with soft peachy undertones",
    elements: "Delicate sun rays, minimal botanical sprigs, soft flowing lines",
  },
  focus: {
    additional_context:
      "Sharp, clear, purposeful energy. Phrases about clarity, determination, goal-achievement, mental strength.",
    color_preference: "High contrast - deep charcoal with crisp white, or navy with gold accents",
    elements: "Arrows pointing forward, geometric shapes, mountain silhouettes",
  },
  gratitude: {
    additional_context:
      "Warm, abundant, heart-centered energy. Phrases about thankfulness, appreciation, abundance, love.",
    color_preference: "Warm terracotta, sage green, golden yellow",
    elements: "Botanical flourishes, heart motifs, organic flowing vines",
  },
  confidence: {
    additional_context:
      "Bold, empowered, strong energy. Phrases about self-belief, courage, strength, capability.",
    color_preference: "Rich jewel tones or bold black with metallic gold accents",
    elements: "Bold arrows, lightning bolts, stars, strong geometric elements",
  },
  peace: {
    additional_context:
      "Serene, calming, meditative energy. Phrases about tranquility, balance, inner calm, letting go.",
    color_preference: "Coastal palette - soft blues, seafoam, sandy neutrals",
    elements: "Waves, circles, zen stones, minimal nature elements",
  },
};

function normalizeText(input) {
  if (!input) return "";
  let value = String(input);
  // Remove URLs/emails, trim, collapse whitespace, strip common injection phrases
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

function mapTheme(themeRaw) {
  const t = (themeRaw || "").toString().toLowerCase().trim();
  if (allowedThemes.includes(t)) return t;
  if (themeSynonyms.has(t)) return themeSynonyms.get(t);
  // Fuzzy contains
  if (t.includes("calm")) return "calm-morning";
  if (t.includes("focus")) return "focus";
  if (t.includes("gratitud")) return "gratitude";
  if (t.includes("confiden")) return "confidence";
  if (t.includes("peace")) return "peace";
  return "peace"; // safe default
}

function mapMood(moodRaw) {
  const m = (moodRaw || "").toString().toLowerCase().trim();
  if (allowedMoods.includes(m)) return m;
  if (moodSynonyms.has(m)) return moodSynonyms.get(m);
  if (m.includes("boho")) return "bohemian";
  if (m.includes("modern")) return "modern-serif";
  if (m.includes("coast")) return "coastal";
  if (m.includes("earth") || m.includes("botan")) return "earthy";
  return "minimalist";
}

function buildBasePrompt(themeSlug, mood, userInput, useGradient = false) {
  const themeKey = themeSlug === "calm-morning" ? "calm_morning" : themeSlug;
  const modifier = THEME_MODIFIERS[themeKey] || {};
  
  const gradientInstructions = useGradient 
    ? `

GRADIENT TEXT EFFECT (CRITICAL):
- Apply a smooth, elegant gradient to the MAIN HEADLINE text only
- The gradient should flow across ALL WORDS in the headline consistently
- Use 2-3 harmonious colors from the chosen palette
- Gradient direction: typically left-to-right or top-to-bottom
- Keep gradient subtle and sophisticated (avoid harsh transitions)
- Ensure text remains highly readable
- Example: If headline is "I choose joy today", the entire phrase flows through the gradient
- Supporting phrases should remain solid color (no gradient)
`
    : `

TEXT COLOR:
- Use solid colors for all text
- No gradients on text
`;

  return `Create a high-quality, printable motivational affirmation design with the following specifications:

THEME & CONCEPT:
- Primary theme: ${themeSlug}
- Mood/Style: ${mood}
- User keywords: ${userInput}

DESIGN REQUIREMENTS:
- Layout: Vertical composition (portrait orientation, suitable for 8x10" or similar)
- Typography: Mix 3-5 complementary fonts (serif, sans-serif, script/handwritten styles)
- Font hierarchy: Vary sizes dramatically - largest phrase should be 3-4x larger than smallest
- Text arrangement: Organic, non-grid layout with phrases at varying angles (0-15 degrees)
- White space: Generous breathing room, not overcrowded

COLOR PALETTE (choose ONE direction based on theme):
- Earthy: Terracotta, sage green, cream, burnt sienna, warm taupe
- Floral: Dusty rose, mauve, soft peach, muted lavender, cream
- Coastal: Seafoam, sandy beige, driftwood gray, soft aqua, white
- Minimalist: Black/charcoal on pure white, or sepia tones
- Botanical: Deep forest green, olive, moss, natural beige, off-white
- Sunset: Coral, amber, blush pink, golden yellow, cream

DECORATIVE ELEMENTS:
- Include 4-8 delicate accent elements strategically placed:
  * Hand-drawn arrows (simple, organic lines)
  * Minimal botanical elements (single leaves, small sprigs, delicate florals)
  * Geometric dividers (thin lines, dots, simple shapes)
  * Organic shapes (watercolor-style circles, abstract marks)
- Elements should enhance, not overwhelm
- Style: Hand-drawn, organic feel (avoid overly perfect/digital look)

AFFIRMATION CONTENT:
Generate 8-12 short, powerful affirmations related to the theme.
${gradientInstructions}
ARTISTIC STYLE:
- Overall aesthetic: Modern farmhouse meets minimalist inspiration
- Texture: Subtle, slight paper texture or organic imperfection
- Line quality: Hand-drawn appearance, slight irregularity
- Balance: Asymmetrical but visually balanced
- Professional yet approachable, commercial-quality

TECHNICAL SPECIFICATIONS:
- Resolution: 300 DPI minimum
- Format: Print-ready quality
- Background: Clean (white/cream) or subtle texture
- Contrast: Ensure excellent readability

UNIQUENESS FACTORS (apply 2-3):
- Varied text baseline (wavy, curved, or stepped)
- Clustered phrase groupings with connecting elements
- Negative space as a design element
- Asymmetric weight distribution
- Unexpected font pairings
- Strategic use of bold vs. delicate elements

THEME CONTEXT:
${modifier.additional_context || ""}
`;
}

async function moderateText(text) {
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
    // If moderation fails, allow by default (light guardrail)
    return { allowed: true };
  }
}

function makePreviewSpec(theme, mood, userText) {
  // 35% chance of using gradient on headline
  const useGradient = Math.random() < 0.35;
  
  // Simple curated outputs per theme for instant preview
  const base = {
    palette: "Warm Cream / Sage / Terracotta",
    layoutStyle: "Organic flowing arrangement with curved phrases",
    accentStyle: "Botanical line art with soft circular accents",
    useGradient,
  };
  const byTheme = {
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
  const moodPalettes = {
    minimalist: "Black / White / Single Accent Color",
    bohemian: "Terracotta / Mustard / Sage / Warm Cream",
    "modern-serif": "Charcoal / Blush / Ivory / Gold",
    coastal: "Soft Blue / Sandy Beige / Sea Foam / White",
    earthy: "Forest Green / Clay / Cream / Rust",
  };
  const spec = { ...base, ...(byTheme[theme] || byTheme["peace"]) };
  spec.palette = moodPalettes[mood] || spec.palette;
  spec.useGradient = useGradient;
  return spec;
}

app.post("/api/affirmation/preview", async (req, res) => {
  try {
    const { theme, mood, text, styleSeed } = req.body || {};
    const mappedTheme = mapTheme(theme);
    const mappedMood = mapMood(mood);
    const normalizedText = normalizeText(text);

    const moderation = await moderateText(normalizedText);
    if (!moderation.allowed) {
      return res.status(400).json({ error: "Input not allowed by policy.", code: "moderation_blocked" });
    }

    const previewId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const designSpec = makePreviewSpec(mappedTheme, mappedMood, normalizedText);
    const useGradient = designSpec.useGradient || false;
    const prompt = buildBasePrompt(mappedTheme, mappedMood, normalizedText, useGradient);

    previews.set(previewId, { theme: mappedTheme, mood: mappedMood, text: normalizedText, styleSeed: styleSeed || null, prompt, designSpec, useGradient });

    return res.json({ previewId, themeMapped: mappedTheme, moodMapped: mappedMood, designSpec });
  } catch (e) {
    return res.status(500).json({ error: "Preview failed" });
  }
});

app.post("/api/affirmation/generate", async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

    const { previewId, theme, mood, text, styleSeed } = req.body || {};
    let mappedTheme, mappedMood, normalizedText, prompt;

    if (previewId && previews.has(previewId)) {
      const p = previews.get(previewId);
      mappedTheme = p.theme;
      mappedMood = p.mood;
      normalizedText = p.text;
      prompt = p.prompt;
    } else {
      mappedTheme = mapTheme(theme);
      mappedMood = mapMood(mood);
      normalizedText = normalizeText(text);
      const moderation = await moderateText(normalizedText);
      if (!moderation.allowed) {
        return res.status(400).json({ error: "Input not allowed by policy.", code: "moderation_blocked" });
      }
      const useGradient = Math.random() < 0.35; // 35% chance
      prompt = buildBasePrompt(mappedTheme, mappedMood, normalizedText, useGradient);
    }

    // Harden prompt: reinforce brand constraints
    const hardened = `${prompt}\n\nConstraints: Hand-drawn organic aesthetics, brand palettes only, print-safe, high legibility, no neon, no gore/sexual content.`;

    // Call image generation (OpenAI Images)
    const body = {
      model: "gpt-image-1",
      prompt: hardened,
      size: "1024x1024",
      // Note: OpenAI Images is square-only; crop downstream for 4:5 if needed.
    };

    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(502).json({ error: "Image provider error", detail: errText });
    }

    const data = await r.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return res.status(502).json({ error: "No image returned" });

    const generationId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    generations.set(generationId, { theme: mappedTheme, mood: mappedMood, text: normalizedText, imageB64: b64 });

    return res.json({ generationId, imageB64: b64 });
  } catch (e) {
    return res.status(500).json({ error: "Generation failed" });
  }
});

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Affirmation API listening on http://localhost:${PORT}`);
});


