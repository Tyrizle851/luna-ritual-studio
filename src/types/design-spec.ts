// Shared design specification contract between frontend and edge function
// SIMPLIFIED MODEL v2: Theme=colors+wording, Mood=accents, Layout=structure

export const SPEC_VERSION = 2;

export type ThemeSlug =
  | "confidence" | "peace" | "focus" | "gratitude" | "abundance"
  | "healing" | "strength" | "joy" | "balance" | "courage"
  | "clarity" | "renewal" | "freedom" | "passion" | "wisdom";

export type MoodSlug =
  | "minimalist" | "bohemian" | "coastal" | "earthy"
  | "vibrant" | "pastel" | "monochrome" | "geometric" | "organic" | "celestial"
  | "modern-serif" | "sunset" | "forest";

export type LayoutArchetype =
  | "centered-serenity"        // Headline centered, balanced margins, soft breathing space
  | "vertical-flow"            // Text cascades downward in a gentle vertical rhythm
  | "floating-cluster"         // Affirmations grouped in a soft cluster near center
  | "asymmetric-balance"       // Intentionally off-center, modern editorial balance
  | "arc-flow"                 // Text follows a subtle curved line — uplifting arc
  | "golden-spiral"            // Spiral flow anchored by a focal point — meditative
  | "botanical-frame"          // Text surrounded by delicate foliage accents
  | "minimal-horizon"          // Headline top third, space below feels open like sky
  | "radiant-center-burst"     // Words radiate from a quiet center, halo effect
  | "soft-anchor-left"         // Text anchored left, breathing room to right
  | "soft-anchor-right"        // Opposite direction version — elegant asymmetry
  | "gentle-column"            // Headlines + statements aligned like poetry lines
  | "pebble-scatter"           // Text arranged as soft clusters like river stones
  | "circle-harmony"           // Circular composition, wholeness feeling
  | "prayer-stack"             // Vertical mantra stacking — spiritual form
  | "ribbon-drift"             // Text moves like a soft ribbon — organic motion
  | "editorial-grid-luxe"      // Clean magazine/grid system refinement
  | "calm-waterfall"           // Words fall downward like flowing water
  | "sacred-geometry"          // Subtle geometric cues (flower of life, triangle, etc.)
  | "breath-space-minimal";    // Very little text — stillness dominates canvas

export type EnergyLevel = "soft" | "supportive" | "direct" | "intense";

export type AccentType = "minimal" | "organic" | "botanical" | "geometric" | "textured" | "playful" | "arrows" | "celestial";

export type TypographyStyle = "serif" | "sans" | "display" | "script";

export interface PaletteToken {
  name: string;
  description: string;
  hex: string[];
  contrast: "low" | "medium" | "high";
}

export interface TypoSet {
  headline: TypographyStyle;
  support: TypographyStyle;
}

export interface DesignSpec {
  theme: ThemeSlug;
  mood: MoodSlug;
  energyLevel: EnergyLevel;
  layoutArchetype: LayoutArchetype;
  paletteToken: PaletteToken;
  accentSet: AccentType[];
  typography: TypoSet;

  mainAffirmation: string;
  supportingPhrases: string[];

  // Variant knobs for controlled randomness (NO styleSeed)
  styleVariant?: number;      // 0-3: sub-layout within archetype
  accentVariant?: number;     // 0-2: which accents to show
  paletteVariant?: number;    // 0-2: color trio selection
  copyVariant?: number;       // 0-3: phrase template set
  textureVariant?: number;    // 0-1: paper/ink texture

  seed?: number | string;
  specVersion: number;

  constraints: {
    ratio: "4:5";
    dpi: 300;
    ban: string[];
  };
}

// Theme Registry - Emotional tone + colors + wording
export interface ThemeDefinition {
  emotionalTone: string;
  defaultLayouts: LayoutArchetype[];
  typography: TypoSet;
  energyLevel: EnergyLevel;
  palette: PaletteToken;  // Theme now owns colors!
  headlineLexicon: string[];
  phraseTemplates: string[][];
}

export const THEME_REGISTRY: Record<ThemeSlug, ThemeDefinition> = {
  confidence: {
    emotionalTone: "empowered, bold, self-assured, fearless",
    defaultLayouts: ["editorial-grid-luxe", "asymmetric-balance", "gentle-column"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "direct",
    palette: {
      name: "bold_confidence",
      description: "Strong contrasts with gold accents",
      hex: ["#1a1a1a", "#d4af37", "#ffffff", "#2c2c2c"],
      contrast: "high"
    },
    headlineLexicon: [
      "FEARLESS FORWARD", "BOLD WITHIN", "I RISE", "CLAIM YOUR POWER",
      "UNSTOPPABLE", "VOICE MATTERS", "OWN IT", "SPEAK UP",
      "STAND TALL", "TRUST YOURSELF", "NO LIMITS", "I AM CAPABLE",
      "FIERCE GRACE", "CONFIDENT SOUL", "MY PATH", "LEAD BOLDLY",
      "SELF ASSURED", "I BELIEVE", "STRONG ROOTS", "POWERFUL YOU",
      "STEP FORWARD", "EMBRACE COURAGE", "I AM ENOUGH", "WORTHY NOW",
      "MY TRUTH", "CLEAR VISION", "BOLD MOVES", "I DECIDE",
      "INNER STRENGTH", "RISE UP", "NO FEAR", "I CHOOSE ME",
      "BRAVE HEART", "OWN YOUR STORY", "I STAND", "POWER WITHIN",
      "CONFIDENT STRIDE", "MY VOICE", "I TRUST", "LIMITLESS",
      "BOLD LIFE", "I CREATE", "FEARLESS ME", "STRENGTH FLOWS",
      "I LEAD", "MY LIGHT", "COURAGE RISES", "I AM READY"
    ],
    phraseTemplates: [
      ["I trust my decisions", "I claim my power", "I rise boldly", "My voice matters"],
      ["Confidence is my nature", "I step forward fearlessly", "Self-doubt fades", "I own my worth"],
      ["I am capable", "My strength is real", "I believe in myself", "I stand tall"],
      ["Fear bows to me", "I speak my truth", "My path is clear", "I am unstoppable"],
      ["I lead with courage", "Doubt has no home here", "I am powerful", "My light shines"],
      ["I trust myself fully", "I make bold choices", "My voice is strong", "I rise with purpose"],
      ["My confidence grows daily", "I own every room", "Boldness is my birthright", "I shine bright"],
      ["Self-belief fuels me", "I take up space", "My presence matters", "I am worthy"],
      ["I speak without fear", "My power is undeniable", "I trust my gut", "Success is mine"],
      ["I walk with purpose", "My energy is magnetic", "I claim my dreams", "I am fierce"],
      ["Courage lives in me", "I face anything", "My strength is deep", "I rise always"],
      ["I am my own hero", "My voice shakes rooms", "I choose bravery", "Power flows through me"],
      ["I trust my journey", "My worth is inherent", "I lead my life", "Confidence is natural"],
      ["I stand in my truth", "My light cannot dim", "I am unstoppable force", "Bold is my way"],
      ["I own my value", "My path is mine", "I rise with grace", "Strength defines me"]
    ]
  },
  
  peace: {
    emotionalTone: "calm, serene, tranquil, centered",
    defaultLayouts: ["arc-flow", "floating-cluster", "circle-harmony"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    palette: {
      name: "peaceful_neutrals",
      description: "Soft blues, warm grays, cream",
      hex: ["#e8d5c4", "#9ab8b8", "#f5f5f5", "#6a7b7b"],
      contrast: "low"
    },
    headlineLexicon: [
      "INNER CALM", "SOFT WITHIN", "QUIET POWER", "I AM AT PEACE",
      "STILLNESS FLOWS", "GENTLE STRENGTH", "CALM WATERS", "SERENE SOUL",
      "QUIET WITHIN", "PEACEFUL HEART", "REST & RELEASE", "TRANQUIL MIND",
      "I BREATHE EASY", "SOFTLY GROUNDED", "EASE & GRACE", "STILL WATERS",
      "CALM EMBRACE", "SACRED PAUSE", "GENTLE BEING", "PEACE LIVES HERE",
      "SOFT LIGHT", "TRANQUIL SPACE", "I REST", "CALM CENTER",
      "PEACEFUL NOW", "GENTLE FLOW", "QUIET JOY", "SERENE MOMENT",
      "STILL HEART", "CALM SOUL", "PEACE WITHIN", "SOFT PRESENCE",
      "TRANQUIL LIFE", "GENTLE WAVES", "PEACEFUL BEING", "CALM CLARITY",
      "STILL MIND", "SOFT STRENGTH", "PEACE FLOWS", "QUIET GRACE",
      "GENTLE LIGHT", "CALM ENERGY", "SERENE SPIRIT", "PEACEFUL PATH",
      "SOFT WISDOM", "TRANQUIL SOUL", "CALM BREATH", "PEACE RISES"
    ],
    phraseTemplates: [
      ["I breathe in calm", "Stillness holds me", "Peace is my nature", "Gentle and whole"],
      ["Calm surrounds me", "I release tension", "Peace flows through", "I am centered"],
      ["In this moment, peace", "I soften", "Ease finds me", "I am held"],
      ["I rest deeply", "Calm is mine", "I let go gently", "Peace lives within"],
      ["Tranquility fills me", "I am at ease", "Stillness guides", "Peaceful heart"],
      ["I embrace quiet", "Calm restores me", "Peace is here now", "I am safe"],
      ["Gentle with myself", "I find my center", "Peace anchors me", "Calm within"],
      ["I release worry", "Stillness heals", "Peace surrounds", "I am whole"],
      ["Quiet strength rises", "I breathe peace", "Calm clarity", "I rest easy"],
      ["Serenity flows", "I am grounded", "Peace guides me", "Gentle presence"],
      ["I soften into peace", "Calm is natural", "Stillness speaks", "I am at peace"],
      ["Tranquil moments", "I rest in calm", "Peace is my home", "Gentle being"],
      ["I find peace within", "Calm energy flows", "Stillness nurtures", "I am serene"],
      ["Peace is my power", "I breathe easy", "Calm surrounds", "I am tranquil"],
      ["Gentle and calm", "I release all", "Peace lives here", "Stillness holds"]
    ]
  },

  focus: {
    emotionalTone: "disciplined, sharp, intentional, present",
    defaultLayouts: ["editorial-grid-luxe", "vertical-flow", "soft-anchor-left"],
    typography: { headline: "sans", support: "sans" },
    energyLevel: "direct",
    palette: {
      name: "focused_clarity",
      description: "Charcoal, cool blue, crisp white",
      hex: ["#2c3e50", "#3498db", "#ecf0f1", "#1a2530"],
      contrast: "high"
    },
    headlineLexicon: [
      "CLEAR MIND", "LOCKED IN", "ONE TASK", "I AM FOCUSED",
      "PRESENT NOW", "DEEP WORK", "LASER SHARP", "UNDISTRACTED",
      "ZERO NOISE", "FLOW STATE", "PURE ATTENTION", "MIND LIKE WATER",
      "SINGLE POINT", "I CONCENTRATE", "CLARITY WINS", "DISCIPLINED MIND",
      "ZONE ACTIVE", "SHARP & STEADY", "FULL PRESENCE", "INTENTIONAL FOCUS",
      "CLEAR PURPOSE", "ONE THING", "FOCUS NOW", "SHARP VISION",
      "PRESENT MIND", "CLEAR PATH", "DEEP FOCUS", "I CONCENTRATE",
      "LASER FOCUS", "MIND SHARP", "ZERO DRIFT", "PURE CLARITY",
      "FOCUSED ENERGY", "ONE DIRECTION", "CLEAR TARGET", "STEADY MIND",
      "INTENTIONAL", "PRECISE AIM", "FOCUS FLOWS", "CLEAR SIGHT",
      "SHARP INTENT", "ONE PURPOSE", "CLARITY FIRST", "FOCUSED LIFE",
      "DIRECT PATH", "CLEAR WORK", "PURE FOCUS", "STEADY GAZE"
    ],
    phraseTemplates: [
      ["One thing at a time", "Clarity guides me", "I am present", "Distractions fade"],
      ["Focused and clear", "I see what matters", "Present in this moment", "My attention is mine"],
      ["Clear vision ahead", "I work with purpose", "My mind is steady", "I eliminate noise"],
      ["Laser focus on now", "I finish what I start", "My energy is directed", "I prioritize wisely"],
      ["Sharp and present", "I concentrate fully", "Clear objectives", "I stay on track"],
      ["One step forward", "I commit fully", "My mind is clear", "Focus is power"],
      ["I block distractions", "Clear and steady", "I work with intention", "My attention is strong"],
      ["Present moment focus", "I see clearly", "One task only", "I stay centered"],
      ["Clarity comes easily", "I focus deeply", "My mind is sharp", "I complete with care"],
      ["Intentional energy", "I stay present", "Clear direction", "Focus flows naturally"],
      ["I choose depth", "One priority", "Clear and calm", "I concentrate well"],
      ["My mind is still", "I focus forward", "Clear purpose drives", "I am present here"],
      ["Sharp attention", "I work mindfully", "Clear path ahead", "Focus is mine"],
      ["I direct my energy", "One thing matters", "Clear and strong", "I stay locked in"],
      ["Present and focused", "I see my goal", "Clear work flows", "My mind is ready"]
    ]
  },

  gratitude: {
    emotionalTone: "warm, appreciative, abundant, heartfelt",
    defaultLayouts: ["circle-harmony", "arc-flow", "floating-cluster"],
    typography: { headline: "display", support: "serif" },
    energyLevel: "supportive",
    palette: {
      name: "grateful_warmth",
      description: "Terracotta, warm gold, cream",
      hex: ["#f4e4d7", "#d4a574", "#8b6f47", "#faf3e0"],
      contrast: "medium"
    },
    headlineLexicon: [
      "I AM GRATEFUL", "JOY IS HERE", "BLESSED BY THIS", "THANKFUL HEART",
      "ABUNDANCE SURROUNDS", "GRATEFUL ALWAYS", "COUNTING BLESSINGS", "THANK YOU LIFE",
      "APPRECIATION FLOWS", "FULL HEART", "BLESSED BEYOND", "GRATITUDE RISING",
      "I SEE THE GOOD", "THANKFUL TODAY", "JOY IN EVERYTHING", "GRATEFUL FOR NOW",
      "BLESSINGS ABOUND", "THANKFUL SOUL", "APPRECIATION LIVES", "GRATITUDE IS GRACE",
      "GRATEFUL MOMENTS", "JOY SURROUNDS", "THANK YOU", "BLESSED LIFE",
      "GRATEFUL BEING", "APPRECIATION FLOWS", "THANKFUL ALWAYS", "JOY RISES",
      "GRATEFUL HEART FULL", "BLESSED NOW", "THANKFUL SPIRIT", "GRATITUDE BLOOMS",
      "JOY LIVES", "GRATEFUL TODAY", "APPRECIATION WINS", "BLESSED ALWAYS",
      "THANKFUL FOR ALL", "GRATEFUL SOUL", "JOY ABOUNDS", "APPRECIATION GROWS",
      "GRATEFUL PATH", "THANKFUL MIND", "JOY FLOWS", "BLESSED JOURNEY",
      "GRATITUDE SHINES", "THANKFUL LIFE", "JOY IS MINE", "GRATEFUL GRACE"
    ],
    phraseTemplates: [
      ["I see the good", "Grateful for today", "Joy lives here", "I appreciate this moment"],
      ["I notice beauty", "Gratitude fills me", "I am blessed", "Joy is abundant"],
      ["Today I am thankful", "Small joys matter", "I celebrate this", "Gratitude opens doors"],
      ["I give thanks", "Joy in simple things", "My heart is full", "I see abundance"],
      ["Grateful for growth", "I appreciate deeply", "Joy surrounds me", "I count my blessings"],
      ["I honor what I have", "Thankful for now", "Joy flows freely", "Gratitude is mine"],
      ["I appreciate the journey", "Blessed beyond measure", "Joy is here", "I see blessings"],
      ["Gratitude guides me", "I celebrate life", "Joy fills my heart", "I am thankful"],
      ["I notice the good", "Appreciation flows", "Joy is natural", "I am grateful always"],
      ["Thankful for this day", "I see the beauty", "Joy is abundant", "Gratitude opens me"],
      ["I appreciate everything", "Blessed in this moment", "Joy lives within", "I am thankful now"],
      ["Gratitude is my way", "I see abundance", "Joy surrounds", "I give thanks daily"],
      ["I appreciate fully", "Thankful heart", "Joy flows through", "Gratitude fills me"],
      ["I honor my blessings", "Grateful for all", "Joy is mine", "I appreciate life"],
      ["Thankful spirit", "I see goodness", "Joy is here now", "Gratitude rises"]
    ]
  },

  abundance: {
    emotionalTone: "prosperous, open, flowing, rich",
    defaultLayouts: ["circle-harmony", "floating-cluster", "arc-flow"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "supportive",
    palette: {
      name: "abundant_richness",
      description: "Deep green, gold, warm cream",
      hex: ["#2d5016", "#ffd700", "#f8f4e6", "#4a7029"],
      contrast: "medium"
    },
    headlineLexicon: [
      "OPEN TO MORE", "ABUNDANCE FLOWS", "I RECEIVE", "PROSPERITY IS MINE",
      "LIMITLESS LIFE", "OVERFLOW MINDSET", "WEALTH FINDS ME", "RICHNESS SURROUNDS",
      "I ATTRACT MORE", "PLENTY FOR ALL", "PROSPERITY FLOWS", "LIMITLESS ABUNDANCE",
      "INFINITE SUPPLY", "I AM A MAGNET", "OVERFLOW IS MINE", "WEALTH CONSCIOUSNESS",
      "ABUNDANCE EVERYWHERE", "RECEIVING MODE", "PROSPERITY MINDSET", "RICH IN ALL WAYS",
      "ABUNDANT LIFE", "PROSPERITY RISES", "WEALTH FLOWS", "I RECEIVE ALL",
      "OVERFLOW STATE", "ABUNDANCE IS MINE", "PROSPERITY NOW", "WEALTH NATURAL",
      "ABUNDANT SOUL", "I ATTRACT WEALTH", "PROSPERITY MINDSET", "OVERFLOW LIFE",
      "WEALTH MAGNET", "ABUNDANT ENERGY", "PROSPERITY FLOWS", "I RECEIVE FREELY",
      "OVERFLOW ALWAYS", "ABUNDANCE NATURAL", "WEALTH IS MINE", "PROSPERITY ABOUNDS",
      "ABUNDANT HEART", "I WELCOME MORE", "PROSPERITY LIFE", "OVERFLOW ENERGY",
      "WEALTH FLOWS TO ME", "ABUNDANT BEING", "PROSPERITY SOUL", "I AM RICH"
    ],
    phraseTemplates: [
      ["I am open to receiving", "Abundance is my nature", "More flows to me", "I welcome prosperity"],
      ["I receive with ease", "Wealth finds me", "I am a magnet for abundance", "Prosperity surrounds"],
      ["I open to overflow", "Riches in all forms", "I say yes to more", "Abundance is everywhere"],
      ["Money loves me", "I attract opportunities", "My cup overflows", "I live in plenty"],
      ["Abundance is natural", "I receive freely", "Wealth flows to me", "Prosperity is mine"],
      ["I welcome abundance", "More comes easily", "I attract wealth", "Prosperity flows"],
      ["I am open to more", "Abundance surrounds", "I receive all good", "Wealth is natural"],
      ["Prosperity finds me", "I welcome overflow", "Abundance is mine", "I attract riches"],
      ["I receive abundance", "Wealth comes easily", "Prosperity flows freely", "I am abundant"],
      ["More is available", "I open to wealth", "Abundance flows", "I attract prosperity"],
      ["I welcome riches", "Abundance is here", "I receive prosperity", "Wealth flows naturally"],
      ["I am a magnet", "Overflow is mine", "Abundance rises", "I receive freely"],
      ["Prosperity is natural", "I attract abundance", "Wealth surrounds", "I welcome more"],
      ["I open to riches", "Abundance flows to me", "I receive wealth", "Prosperity is here"],
      ["More comes to me", "I attract overflow", "Abundance natural", "I welcome all good"]
    ]
  },

  healing: {
    emotionalTone: "restorative, gentle, nurturing, tender",
    defaultLayouts: ["arc-flow", "pebble-scatter", "circle-harmony"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    palette: {
      name: "healing_softness",
      description: "Soft peach, muted green, warm cream",
      hex: ["#faf3e0", "#b5d3d1", "#e8b4a0", "#d4c5b0"],
      contrast: "low"
    },
    headlineLexicon: [
      "GENTLE HEALING", "I MEND", "RESTORATION FLOWS", "I AM HEALING",
      "SOFTLY WHOLE", "TENDER RECOVERY", "GENTLE GROWTH", "HEALING WATERS",
      "I AM MENDING", "RESTORATION BEGINS", "WHOLENESS RETURNS", "PATIENT HEALING",
      "I ALLOW TIME", "HEALING JOURNEY", "TENDER WITH SELF", "RESTORE & RENEW",
      "HEALING HEART", "I TRUST PROCESS", "SOFTLY HEALING", "BECOMING WHOLE",
      "GENTLE MENDING", "HEAL IN TIME", "I RECOVER", "SOFT RESTORATION",
      "HEALING NOW", "TENDER CARE", "I AM WHOLE", "GENTLE RECOVERY",
      "HEALING FLOWS", "I MEND SOFTLY", "RESTORATION TIME", "HEALING PATH",
      "TENDER HEALING", "I AM MENDING", "GENTLE WHOLENESS", "HEALING SOUL",
      "SOFT RECOVERY", "I HEAL NOW", "GENTLE RESTORATION", "HEALING BEING",
      "MENDING HEART", "I AM HEALING", "SOFT WHOLENESS", "HEALING JOURNEY",
      "TENDER PROCESS", "I RESTORE", "GENTLE HEALING", "WHOLENESS NOW"
    ],
    phraseTemplates: [
      ["I heal gently", "Time restores me", "I am mending", "Softness heals"],
      ["I give myself time", "Healing is happening", "I am becoming whole", "Tender with myself"],
      ["I trust the process", "Healing flows through", "I am patient", "I nurture myself"],
      ["I heal at my pace", "Restoration is natural", "I honor my healing", "I am rebuilding"],
      ["Softly I mend", "I allow healing", "I am gentle", "Recovery is mine"],
      ["I trust my healing", "I am patient", "Wholeness returns", "I heal now"],
      ["I nurture myself", "Healing flows", "I am tender", "I restore gently"],
      ["I give myself grace", "Healing happens", "I am mending", "Softness helps"],
      ["I trust time", "I am healing", "Gentle with me", "Restoration flows"],
      ["I allow recovery", "Healing is mine", "I am patient", "I mend softly"],
      ["I honor healing", "I am gentle", "Wholeness comes", "I trust process"],
      ["I heal naturally", "I am tender", "Recovery flows", "I am mending"],
      ["I give time", "Healing is here", "I am soft", "I restore myself"],
      ["I trust healing", "I am patient", "Gentle recovery", "I am whole"],
      ["I allow time", "Healing flows through", "I am mending", "Softness heals me"]
    ]
  },

  strength: {
    emotionalTone: "solid, resilient, enduring, powerful",
    defaultLayouts: ["editorial-grid-luxe", "asymmetric-balance", "gentle-column"],
    typography: { headline: "sans", support: "sans" },
    energyLevel: "intense",
    palette: {
      name: "solid_strength",
      description: "Charcoal, bronze, deep black",
      hex: ["#4a4a4a", "#c9a961", "#1c1c1c", "#2a2a2a"],
      contrast: "high"
    },
    headlineLexicon: [
      "UNSHAKEABLE", "BUILT STRONG", "I AM RESILIENT", "SOLID GROUND",
      "INNER FORTRESS", "IRON WILL", "ROCK SOLID", "WARRIOR SPIRIT",
      "UNWAVERING", "STEEL CORE", "ENDURING POWER", "I STAND FIRM",
      "RESILIENT SOUL", "FOUNDATION STRONG", "UNBREAKABLE", "FORTIFIED HEART",
      "SOLID AS STONE", "STRENGTH WITHIN", "I DO NOT BEND", "MIGHTY & STEADY",
      "STRONG CORE", "I ENDURE", "SOLID POWER", "RESILIENT BEING",
      "IRON STRENGTH", "I STAND", "UNBREAKABLE WILL", "SOLID SOUL",
      "STRONG FOUNDATION", "I AM MIGHTY", "RESILIENT HEART", "STEEL SPIRIT",
      "UNWAVERING STRENGTH", "I AM SOLID", "ENDURING SOUL", "ROCK FIRM",
      "STRONG ALWAYS", "I DO NOT BREAK", "RESILIENT POWER", "SOLID BEING",
      "INNER STRENGTH", "I AM STEEL", "UNSHAKEABLE SOUL", "STRONG SPIRIT",
      "RESILIENT LIFE", "I STAND STRONG", "SOLID HEART", "ENDURING POWER"
    ],
    phraseTemplates: [
      ["I am unbreakable", "My foundation is solid", "I withstand storms", "Strong and steady"],
      ["I rise from challenges", "Strength is my nature", "I am resilient", "I stand firm"],
      ["I am fortified", "My spirit is strong", "I overcome", "I am durable"],
      ["I am my anchor", "Strength from within", "I persist", "Unshaken by trials"],
      ["I am solid", "My core is steel", "I endure", "Strength flows"],
      ["I stand tall", "My power is deep", "I am resilient", "I do not break"],
      ["I am strong", "My foundation holds", "I withstand all", "Power within me"],
      ["I rise always", "Strength defines me", "I am mighty", "I stand firm"],
      ["I am unshaken", "My strength grows", "I endure all", "I am resilient"],
      ["I hold strong", "My power is real", "I overcome", "I stand steady"],
      ["I am steel", "My core is solid", "I persist always", "Strength is mine"],
      ["I rise strong", "My spirit endures", "I am fortified", "I do not yield"],
      ["I am resilient", "My foundation is rock", "I stand always", "Strength flows through"],
      ["I am solid ground", "My power holds", "I withstand", "I am unbreakable"],
      ["I endure all", "My strength is deep", "I am steady", "I rise with power"]
    ]
  },

  joy: {
    emotionalTone: "bright, playful, radiant, delightful",
    defaultLayouts: ["circle-harmony", "floating-cluster", "asymmetric-balance"],
    typography: { headline: "display", support: "sans" },
    energyLevel: "supportive",
    palette: {
      name: "joyful_brightness",
      description: "Soft yellow, peach, warm white",
      hex: ["#fff5e1", "#ffb347", "#ff6b9d", "#ffe4b5"],
      contrast: "medium"
    },
    headlineLexicon: [
      "JOY RISING", "LIGHT WITHIN", "I CHOOSE JOY", "RADIANT LIFE",
      "HAPPINESS FLOWS", "PURE DELIGHT", "JOY IS HERE", "SPARKLE & SHINE",
      "BRIGHT HEART", "JOY EVERYDAY", "RADIANT JOY", "HAPPINESS BLOOMS",
      "LIGHT HEARTED", "JOY UNLIMITED", "I AM JOYFUL", "GLEAMING LIFE",
      "JOY OVERFLOWS", "BRIGHT SOUL", "HAPPINESS IS MINE", "LUMINOUS JOY",
      "JOY LIVES", "BRIGHT BEING", "I SPARKLE", "JOY FLOWS",
      "HAPPY HEART", "I SHINE", "JOY IS MINE", "BRIGHT LIFE",
      "JOY RISES", "I AM LIGHT", "HAPPY SOUL", "JOY BLOOMS",
      "BRIGHT SPIRIT", "I RADIATE", "JOY ALWAYS", "HAPPY BEING",
      "JOY SHINES", "I AM JOYFUL", "BRIGHT JOY", "HAPPY LIFE",
      "JOY FLOWS FREELY", "I AM BRIGHT", "HAPPY SPIRIT", "JOY IS LIFE",
      "BRIGHT HEART", "I CHOOSE HAPPY", "JOY SURROUNDS", "BRIGHT SOUL"
    ],
    phraseTemplates: [
      ["Joy is my choice", "I radiate light", "Happiness is here", "I feel delight"],
      ["I find joy daily", "Brightness surrounds me", "I laugh often", "Joy is abundant"],
      ["I choose to smile", "Joy lives in me", "I sparkle", "Light fills my heart"],
      ["I embrace joy", "Happiness finds me", "I shine brightly", "Joy is easy"],
      ["Joy flows freely", "I am happy", "Delight is mine", "I choose joy"],
      ["I radiate happiness", "Joy is natural", "I am bright", "Delight surrounds"],
      ["I feel joy", "Happiness flows", "I am light", "Joy is mine"],
      ["I choose delight", "Joy fills me", "I shine", "Happiness is here"],
      ["I am joyful", "Brightness within", "I laugh freely", "Joy surrounds"],
      ["I radiate joy", "Happiness blooms", "I am happy", "Delight flows"],
      ["I feel bright", "Joy is easy", "I am light", "Happiness is mine"],
      ["I choose joy always", "Delight is here", "I am radiant", "Joy flows"],
      ["I am happy now", "Joy is natural", "I shine bright", "Happiness flows"],
      ["I feel delight", "Joy surrounds me", "I am joyful", "Brightness is mine"],
      ["I choose happiness", "Joy is here", "I radiate", "Delight flows freely"]
    ]
  },

  balance: {
    emotionalTone: "steady, harmonious, centered, grounded",
    defaultLayouts: ["asymmetric-balance", "arc-flow", "soft-anchor-left"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "supportive",
    palette: {
      name: "balanced_harmony",
      description: "Warm taupe, sage, soft white",
      hex: ["#d5c4a1", "#8fbc8f", "#f0ead6", "#a89078"],
      contrast: "low"
    },
    headlineLexicon: [
      "IN BALANCE", "CENTER HELD", "I AM ALIGNED", "HARMONY WITHIN",
      "STEADY GROUND", "EQUILIBRIUM", "CENTERED LIFE", "BALANCED BEING",
      "HARMONY FLOWS", "EVEN KEEL", "ALIGNED & WHOLE", "STEADY HEART",
      "FINDING CENTER", "BALANCED ENERGY", "I AM GROUNDED", "HARMONY WITHIN",
      "CENTERED ALWAYS", "BALANCE IS MINE", "STABLE SOUL", "EQUILIBRIUM FOUND",
      "BALANCED LIFE", "CENTER STRONG", "I AM STEADY", "HARMONY LIVES",
      "BALANCE FLOWS", "I AM ALIGNED", "STEADY SOUL", "CENTER HELD",
      "BALANCED HEART", "I AM GROUNDED", "HARMONY IS MINE", "STEADY BEING",
      "BALANCE WITHIN", "I FIND CENTER", "STEADY LIFE", "HARMONY FLOWS",
      "BALANCED SOUL", "I AM STEADY", "CENTER FOUND", "HARMONY HELD",
      "BALANCE ALWAYS", "I AM ALIGNED", "STEADY HEART", "HARMONY BEING",
      "CENTERED SOUL", "I AM BALANCED", "STEADY GROUND", "HARMONY IS MINE"
    ],
    phraseTemplates: [
      ["I find my center", "Balance is natural", "I am aligned", "Harmony flows"],
      ["I hold my balance", "Centered in chaos", "I am grounded", "Equilibrium is mine"],
      ["I live in harmony", "My life is balanced", "I prioritize well", "Centered and calm"],
      ["I maintain equilibrium", "Harmony within", "I am centered", "Balance flows through"],
      ["I stay steady", "Balance guides me", "I am aligned", "Harmony is natural"],
      ["I find balance", "I am centered", "Steady and whole", "Harmony surrounds"],
      ["I am grounded", "Balance is mine", "I stay steady", "Harmony flows"],
      ["I hold center", "Balance flows", "I am aligned", "Steady and calm"],
      ["I am balanced", "Harmony guides", "I stay centered", "Balance is natural"],
      ["I find equilibrium", "I am steady", "Harmony is mine", "Balance surrounds"],
      ["I am grounded always", "Balance holds", "I am centered", "Harmony flows"],
      ["I stay balanced", "I am aligned", "Steady heart", "Harmony is here"],
      ["I find harmony", "Balance is mine", "I am grounded", "Steady and strong"],
      ["I am centered", "Balance guides", "I stay steady", "Harmony surrounds"],
      ["I hold balance", "I am aligned", "Steady soul", "Harmony flows through"]
    ]
  },

  courage: {
    emotionalTone: "brave, bold, daring, fearless",
    defaultLayouts: ["asymmetric-balance", "editorial-grid-luxe", "radiant-center-burst"],
    typography: { headline: "sans", support: "sans" },
    energyLevel: "direct",
    palette: {
      name: "courageous_fire",
      description: "Deep red, orange, charcoal",
      hex: ["#8b0000", "#ffa500", "#2f4f4f", "#4a0000"],
      contrast: "high"
    },
    headlineLexicon: [
      "BRAVE HEART", "I MOVE ANYWAY", "COURAGE LIVES", "I FACE FEAR",
      "BOLD STEPS", "FEARLESS ACTION", "I DO IT SCARED", "BRAVE ENOUGH",
      "COURAGE FIRST", "BOLD & BRAVE", "I TAKE THE LEAP", "FEAR FORWARD",
      "COURAGEOUS SOUL", "I ACT BOLDLY", "BRAVE ALWAYS", "COURAGE FLOWS",
      "FEARLESS BEING", "I MOVE FORWARD", "BOLD HEART", "COURAGE IS MINE",
      "BRAVE NOW", "I FACE IT", "COURAGE RISES", "BOLD MOVES",
      "BRAVE SPIRIT", "I ACT ANYWAY", "COURAGE WITHIN", "FEARLESS ME",
      "BOLD COURAGE", "I MOVE BRAVE", "COURAGE ALWAYS", "BRAVE BEING",
      "I FACE ALL", "COURAGE FLOWS", "BRAVE SOUL", "BOLD ACTION",
      "COURAGE HELD", "I AM BRAVE", "FEARLESS HEART", "BOLD SPIRIT",
      "COURAGE IS HERE", "I MOVE BOLDLY", "BRAVE LIFE", "FEARLESS SOUL",
      "COURAGE MINE", "I ACT BRAVE", "BOLD BEING", "FEARLESS ALWAYS"
    ],
    phraseTemplates: [
      ["I act despite fear", "Courage is my choice", "I move forward", "Brave and bold"],
      ["I am courageous", "I take the leap", "Bravery lives in me", "I do it scared"],
      ["I step into fear", "Courage guides me", "I am brave enough", "I face the unknown"],
      ["I am fearless", "Bravery flows through", "I act boldly", "Courage is mine"],
      ["I choose courage", "I move anyway", "Bold in action", "I face all"],
      ["I am brave", "Courage flows", "I act fearlessly", "Bold and strong"],
      ["I take bold steps", "Courage is mine", "I face fear", "Brave always"],
      ["I move with courage", "I am bold", "Fearless in action", "Courage guides"],
      ["I choose bravery", "I act despite", "Courage within", "I am brave now"],
      ["I face everything", "Courage is natural", "I move boldly", "Brave soul"],
      ["I am courageous always", "Bold actions", "I face fear", "Courage flows"],
      ["I take the leap", "I am brave", "Courage is mine", "Bold and fearless"],
      ["I act with courage", "I am bold", "Fearless moves", "Courage is here"],
      ["I choose brave", "I face all", "Courage guides me", "Bold spirit"],
      ["I am fearless now", "Courage flows through", "I act boldly", "Brave and strong"]
    ]
  },

  clarity: {
    emotionalTone: "clear, lucid, sharp, insightful",
    defaultLayouts: ["floating-cluster", "editorial-grid-luxe", "vertical-flow"],
    typography: { headline: "sans", support: "sans" },
    energyLevel: "direct",
    palette: {
      name: "crystal_clarity",
      description: "Icy blue, crisp white, silver",
      hex: ["#e0f7fa", "#00acc1", "#006064", "#b2ebf2"],
      contrast: "high"
    },
    headlineLexicon: [
      "CRYSTAL CLEAR", "SEE TRUE", "I KNOW", "VISION IS MINE",
      "CLEAR SIGHT", "CRYSTAL VISION", "CLEAR KNOWING", "I SEE CLEARLY",
      "TRANSPARENT TRUTH", "LUCID MIND", "SHARP VISION", "CLARITY COMES",
      "I UNDERSTAND", "CLEAR AS DAY", "VISION UNLOCKED", "CLARITY FLOWS",
      "I SEE THROUGH", "CLEAR INSIGHT", "TRUTH REVEALED", "PERFECT CLARITY",
      "CLEAR MIND", "I SEE ALL", "VISION CLEAR", "CLARITY HERE",
      "LUCID VISION", "I UNDERSTAND", "CLEAR TRUTH", "VISION FLOWS",
      "CLARITY IS MINE", "I SEE NOW", "CLEAR SIGHT", "LUCID CLARITY",
      "VISION SHARP", "I KNOW TRUE", "CLEAR MIND", "CLARITY RISES",
      "I SEE CLEAR", "VISION MINE", "CLEAR KNOWING", "LUCID SIGHT",
      "CLARITY ALWAYS", "I UNDERSTAND", "CLEAR VISION", "TRUTH CLEAR",
      "PERFECT SIGHT", "I SEE TRUTH", "CLEAR KNOWING", "VISION IS CLEAR"
    ],
    phraseTemplates: [
      ["I see clearly", "My vision is sharp", "Clarity comes easily", "I know my path"],
      ["I understand now", "Clarity guides me", "I see what matters", "My mind is clear"],
      ["I see through fog", "Clarity is my gift", "I discern well", "I trust my knowing"],
      ["I perceive truth", "Clarity flows", "I understand deeply", "My vision is true"],
      ["I see beyond", "Clarity is here", "I know truth", "Vision is mine"],
      ["I understand clearly", "My sight is sharp", "Clarity flows freely", "I see all"],
      ["I discern well", "Clarity guides", "I know deeply", "Vision is clear"],
      ["I see truth now", "Clarity is natural", "I understand", "My vision sharp"],
      ["I perceive clearly", "Clarity flows through", "I see what is", "Vision clear"],
      ["I know my truth", "Clarity is mine", "I see clearly", "Understanding flows"],
      ["I see through all", "Clarity guides me", "I know now", "Vision is sharp"],
      ["I understand truth", "Clarity flows", "I see all", "My vision clear"],
      ["I discern truth", "Clarity is here", "I know deeply", "Vision flows"],
      ["I see clearly now", "Clarity guides", "I understand all", "Vision is mine"],
      ["I know what is", "Clarity flows freely", "I see truth", "Vision sharp and clear"]
    ]
  },

  renewal: {
    emotionalTone: "fresh, new, revitalized, reborn",
    defaultLayouts: ["arc-flow", "circle-harmony", "floating-cluster"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    palette: {
      name: "fresh_renewal",
      description: "Spring green, soft mint, cream",
      hex: ["#a8d5a3", "#77c593", "#4a7c59", "#e8f5e9"],
      contrast: "medium"
    },
    headlineLexicon: [
      "BEGIN AGAIN", "NEW LIGHT", "I RENEW", "FRESH START",
      "REBIRTH NOW", "FRESH BEGINNING", "I START OVER", "NEW CHAPTER",
      "RENEWAL FLOWS", "REBORN TODAY", "FRESH ENERGY", "I AM RENEWED",
      "NEW DAY RISING", "REFRESH & RENEW", "START FRESH", "REBIRTH BEGINS",
      "I BEGIN NEW", "RENEWAL IS MINE", "FRESH PERSPECTIVE", "NEW LIFE NOW",
      "FRESH AGAIN", "I RENEW", "NEW START", "REBIRTH HERE",
      "RENEWAL COMES", "I BEGIN FRESH", "NEW ENERGY", "FRESH LIFE",
      "I AM REBORN", "NEW BEGINNING", "RENEWAL FLOWS", "FRESH SOUL",
      "I START NEW", "REBIRTH IS MINE", "FRESH PERSPECTIVE", "NEW SPIRIT",
      "RENEWAL NOW", "I BEGIN AGAIN", "FRESH HEART", "NEW LIFE",
      "I RENEW NOW", "REBIRTH FLOWS", "FRESH BEING", "NEW CHAPTER BEGINS",
      "RENEWAL IS HERE", "I AM NEW", "FRESH START NOW", "REBIRTH MINE"
    ],
    phraseTemplates: [
      ["I start fresh", "New beginnings are mine", "I renew myself", "Today is new"],
      ["I begin again", "Renewal is natural", "I shed what was", "New life emerges"],
      ["I embrace new beginnings", "Renewal flows through", "I start over", "I am made new"],
      ["I let go and renew", "New chapter now", "I refresh my spirit", "Rebirth is mine"],
      ["I release the old", "Fresh energy flows", "I am renewed", "New life here"],
      ["I start anew", "Renewal comes", "I begin fresh", "New perspective"],
      ["I am reborn", "Fresh start now", "I renew daily", "New energy flows"],
      ["I begin again", "Renewal is mine", "I am fresh", "New life blooms"],
      ["I shed the past", "Fresh energy rises", "I am renewed", "New beginning"],
      ["I start fresh daily", "Renewal flows", "I am new", "Fresh perspective comes"],
      ["I let go", "Renewal is here", "I begin anew", "Fresh life flows"],
      ["I am renewed now", "New start is mine", "I refresh", "Rebirth comes"],
      ["I embrace renewal", "Fresh beginning", "I am new", "New life is here"],
      ["I start over", "Renewal flows through", "I am fresh", "New energy mine"],
      ["I am reborn daily", "Fresh start flows", "I renew", "New life emerges"]
    ]
  },

  freedom: {
    emotionalTone: "liberated, open, unbound, wild",
    defaultLayouts: ["asymmetric-balance", "ribbon-drift", "floating-cluster"],
    typography: { headline: "display", support: "sans" },
    energyLevel: "direct",
    palette: {
      name: "free_spirit",
      description: "Sky blue, white, airy gray",
      hex: ["#87ceeb", "#ffffff", "#4682b4", "#e0f2f7"],
      contrast: "medium"
    },
    headlineLexicon: [
      "I AM FREE", "WIDE OPEN", "UNBOUND LIFE", "LIBERATION",
      "FREE TO BE", "UNCHAINED SPIRIT", "LIMITLESS LIFE", "I FLY FREE",
      "LIBERATED SOUL", "FREEDOM FLOWS", "BREAKING FREE", "WILD & FREE",
      "I AM LIBERATED", "FREEDOM IS MINE", "UNTETHERED", "FREE AT LAST",
      "OPEN SKIES", "LIBERTY LIVES", "I CHOOSE FREEDOM", "BOUNDLESS BEING",
      "FREE SPIRIT", "I AM UNBOUND", "LIBERATION NOW", "WILD SOUL",
      "FREE LIFE", "I FLY", "UNBOUND BEING", "FREEDOM HERE",
      "LIBERATED LIFE", "I AM FREE NOW", "WILD HEART", "FREEDOM FLOWS",
      "UNBOUND SOUL", "I CHOOSE FREE", "LIBERATION MINE", "FREE FOREVER",
      "OPEN LIFE", "I AM LIBERATED", "WILD SPIRIT", "FREEDOM IS HERE",
      "UNBOUND ALWAYS", "I FLY FREE", "LIBERATION FLOWS", "FREE BEING",
      "WILD & UNBOUND", "I AM FREE", "LIBERATION IS MINE", "FREEDOM SOUL"
    ],
    phraseTemplates: [
      ["I am liberated", "Freedom is mine", "I break free", "Unbound and wild"],
      ["I release constraints", "Freedom flows", "I am unchained", "Open and free"],
      ["I am unrestricted", "Freedom is my right", "I break the chains", "I live untethered"],
      ["I claim my freedom", "Unbound spirit", "I am sovereign", "Freedom guides me"],
      ["I am free", "Liberation flows", "I choose freedom", "Wild and unbound"],
      ["I break all chains", "Freedom is mine", "I am liberated", "Open life"],
      ["I fly free", "Liberation comes", "I am unbound", "Freedom flows"],
      ["I choose liberation", "I am free now", "Wild spirit", "Freedom here"],
      ["I release all", "Freedom is mine", "I am liberated", "Unbound soul"],
      ["I am free always", "Liberation flows", "I choose wild", "Freedom guides"],
      ["I break free now", "I am liberated", "Wild and free", "Freedom is mine"],
      ["I am unbound", "Liberation is here", "I fly free", "Freedom flows"],
      ["I choose freedom", "I am liberated", "Wild heart", "Freedom mine"],
      ["I release limits", "Freedom flows", "I am free", "Unbound being"],
      ["I am liberated now", "Freedom is mine", "I fly wild", "Liberation flows"]
    ]
  },

  passion: {
    emotionalTone: "fiery, intense, alive, burning",
    defaultLayouts: ["asymmetric-balance", "editorial-grid-luxe", "floating-cluster"],
    typography: { headline: "display", support: "serif" },
    energyLevel: "intense",
    palette: {
      name: "passionate_fire",
      description: "Deep red, orange, charcoal",
      hex: ["#ff4500", "#dc143c", "#8b0000", "#2a0000"],
      contrast: "high"
    },
    headlineLexicon: [
      "BURN BRIGHT", "FULL FLAME", "I AM FIRE", "PASSION LIVES",
      "IGNITED HEART", "BLAZING SPIRIT", "FIRE WITHIN", "I AM ABLAZE",
      "PASSION FLOWS", "FIERCE & ALIVE", "BURNING PURPOSE", "FLAME ON",
      "PASSIONATE SOUL", "I IGNITE", "FULL FIRE", "FIERCE PASSION",
      "BURNING BRIGHT", "FIRE & SOUL", "PASSION UNLEASHED", "IGNITED LIFE",
      "BLAZING HEART", "I AM FIRE", "PASSION BURNS", "FIERCE FLAME",
      "FIRE SOUL", "I BURN", "PASSION HERE", "IGNITED BEING",
      "BLAZING LIFE", "I AM AFLAME", "FIERCE FIRE", "PASSION FLOWS",
      "BURNING SOUL", "I IGNITE NOW", "FIRE WITHIN", "PASSION IS MINE",
      "BLAZING PASSION", "I AM BURNING", "FIERCE HEART", "FIRE FLOWS",
      "PASSION ALWAYS", "I BURN BRIGHT", "FIRE BEING", "IGNITED SOUL",
      "FIERCE PASSION", "I AM FIRE", "BURNING HEART", "PASSION UNLEASHED"
    ],
    phraseTemplates: [
      ["I burn with purpose", "Passion fuels me", "I am on fire", "My heart blazes"],
      ["I ignite my dreams", "Passion drives me", "I am fully alive", "Fire in my soul"],
      ["I live with fire", "My passion is fierce", "I am ablaze", "I burn for this"],
      ["I am passionate", "Fire guides me", "I burn with love", "My flame is strong"],
      ["Passion flows", "I am on fire", "Fierce and alive", "I burn bright"],
      ["I ignite within", "Passion is mine", "I am blazing", "Fire flows through"],
      ["I burn for life", "Passion guides", "I am fire", "Fierce flame"],
      ["I am passionate now", "Fire within me", "I burn always", "Passion flows"],
      ["I ignite my soul", "Passion is here", "I am ablaze", "Fire is mine"],
      ["I burn with passion", "Fierce and alive", "I am fire", "Passion guides"],
      ["I am ignited", "Fire flows through", "I burn bright", "Passion is mine"],
      ["I live passionately", "Fire is here", "I burn for this", "Fierce soul"],
      ["I am fire now", "Passion flows", "I burn always", "Fierce and bright"],
      ["I ignite daily", "Fire is mine", "I am passionate", "Burning bright"],
      ["I am ablaze always", "Passion guides me", "I burn with fire", "Fierce passion flows"]
    ]
  },

  wisdom: {
    emotionalTone: "knowing, insightful, sage, deep",
    defaultLayouts: ["floating-cluster", "golden-spiral", "arc-flow"],
    typography: { headline: "serif", support: "serif" },
    energyLevel: "supportive",
    palette: {
      name: "wise_earth",
      description: "Brown, gold, cream",
      hex: ["#8b7355", "#daa520", "#f5deb3", "#5c4836"],
      contrast: "medium"
    },
    headlineLexicon: [
      "INNER WISDOM", "I KNOW", "WISE HEART", "TRUTH WITHIN",
      "I TRUST MY KNOWING", "DEEP KNOWING", "WISE SOUL", "INTUITION SPEAKS",
      "I TRUST WITHIN", "WISDOM FLOWS", "INNER TRUTH", "WISE & AWARE",
      "I LISTEN DEEP", "KNOWING HEART", "WISDOM GUIDES", "ANCIENT KNOWING",
      "WISE BEING", "TRUTH IS CLEAR", "I KNOW MY PATH", "WISDOM LIVES",
      "DEEP WISDOM", "I TRUST KNOWING", "WISE SPIRIT", "INNER KNOWING",
      "WISDOM HERE", "I LISTEN", "WISE LIFE", "TRUTH FLOWS",
      "KNOWING SOUL", "I AM WISE", "DEEP TRUTH", "WISDOM IS MINE",
      "INNER SAGE", "I KNOW TRUE", "WISE HEART", "TRUTH WITHIN",
      "WISDOM ALWAYS", "I TRUST", "WISE KNOWING", "DEEP INSIGHT",
      "INNER WISDOM", "I KNOW PATH", "WISE SOUL", "TRUTH GUIDES",
      "WISDOM FLOWS", "I AM KNOWING", "WISE BEING", "TRUTH IS MINE"
    ],
    phraseTemplates: [
      ["I trust my wisdom", "Inner knowing guides", "I am wise", "My insight is deep"],
      ["I know what I need", "My wisdom is true", "I trust my intuition", "Wise and aware"],
      ["I am discerning", "Wisdom flows through", "I know deeply", "My knowing is strong"],
      ["I listen to wisdom", "My inner voice is clear", "I know my truth", "Wisdom lives in me"],
      ["I trust knowing", "Wisdom guides me", "I am wise", "Deep insight flows"],
      ["I know my path", "Wisdom is mine", "I trust within", "Inner truth guides"],
      ["I am wise now", "Knowing flows", "I trust deeply", "Wisdom is here"],
      ["I listen within", "Wisdom speaks", "I know true", "Inner knowing"],
      ["I trust my truth", "Wisdom is mine", "I am knowing", "Deep wisdom flows"],
      ["I know deeply", "Wisdom guides", "I trust within", "Inner truth"],
      ["I am wise always", "Knowing is mine", "I trust knowing", "Wisdom flows"],
      ["I listen to truth", "Wisdom is here", "I know my way", "Inner wisdom"],
      ["I trust deeply", "Wisdom flows through", "I am wise", "Knowing guides"],
      ["I know my truth", "Wisdom is mine", "I trust within", "Deep knowing"],
      ["I am knowing", "Wisdom guides me", "I trust truth", "Inner wisdom flows"]
    ]
  }
};

// Mood Registry - Accents only! (Colors moved to themes)
export interface MoodDefinition {
  accents: AccentType[];
  allowedLayouts: LayoutArchetype[];
  weight: number; // 0-1 for weighted sampling
}

export const MOOD_REGISTRY: Record<MoodSlug, MoodDefinition> = {
  minimalist: {
    accents: ["minimal"],
    allowedLayouts: ["floating-cluster", "vertical-flow"],
    weight: 0.45
  },
  bohemian: {
    accents: ["organic", "botanical", "textured"],
    allowedLayouts: ["arc-flow", "circle-harmony", "asymmetric-balance"],
    weight: 0.30
  },
  coastal: {
    accents: ["organic", "minimal"],
    allowedLayouts: ["arc-flow", "ribbon-drift"],
    weight: 0.25
  },
  earthy: {
    accents: ["organic", "botanical", "textured"],
    allowedLayouts: ["arc-flow", "circle-harmony"],
    weight: 0.30
  },
  vibrant: {
    accents: ["playful", "geometric"],
    allowedLayouts: ["asymmetric-balance", "editorial-grid-luxe", "floating-cluster"],
    weight: 0.15
  },
  pastel: {
    accents: ["organic", "minimal", "botanical"],
    allowedLayouts: ["circle-harmony", "arc-flow"],
    weight: 0.25
  },
  monochrome: {
    accents: ["minimal", "geometric"],
    allowedLayouts: ["editorial-grid-luxe", "soft-anchor-left", "gentle-column"],
    weight: 0.40
  },
  geometric: {
    accents: ["geometric"],
    allowedLayouts: ["editorial-grid-luxe", "asymmetric-balance", "floating-cluster"],
    weight: 0.20
  },
  organic: {
    accents: ["organic", "botanical"],
    allowedLayouts: ["arc-flow", "asymmetric-balance"],
    weight: 0.30
  },
  celestial: {
    accents: ["celestial", "minimal"],
    allowedLayouts: ["circle-harmony", "floating-cluster"],
    weight: 0.20
  },
  "modern-serif": {
    accents: ["minimal", "botanical"],
    allowedLayouts: ["editorial-grid-luxe", "vertical-flow", "floating-cluster"],
    weight: 0.35
  },
  sunset: {
    accents: ["organic", "botanical"],
    allowedLayouts: ["arc-flow", "soft-anchor-left", "ribbon-drift"],
    weight: 0.25
  },
  forest: {
    accents: ["botanical", "organic", "textured"],
    allowedLayouts: ["botanical-frame", "pebble-scatter", "floating-cluster"],
    weight: 0.30
  }
};

// Layout archetype descriptions for prompt generation
export const LAYOUT_DESCRIPTIONS: Record<LayoutArchetype, string> = {
  "centered-serenity": "Headline centered, balanced margins, soft breathing space",
  "vertical-flow": "Text cascades downward in a gentle vertical rhythm",
  "floating-cluster": "Affirmations grouped in a soft cluster near center",
  "asymmetric-balance": "Intentionally off-center, modern editorial balance",
  "arc-flow": "Text follows a subtle curved line — uplifting arc",
  "golden-spiral": "Spiral flow anchored by a focal point — meditative",
  "botanical-frame": "Text surrounded by delicate foliage accents",
  "minimal-horizon": "Headline top third, space below feels open like sky",
  "radiant-center-burst": "Words radiate from a quiet center, halo effect",
  "soft-anchor-left": "Text anchored left, breathing room to right",
  "soft-anchor-right": "Opposite direction version — elegant asymmetry",
  "gentle-column": "Headlines + statements aligned like poetry lines",
  "pebble-scatter": "Text arranged as soft clusters like river stones",
  "circle-harmony": "Circular composition, wholeness feeling",
  "prayer-stack": "Vertical mantra stacking — spiritual form",
  "ribbon-drift": "Text moves like a soft ribbon — organic motion",
  "editorial-grid-luxe": "Clean magazine/grid system refinement",
  "calm-waterfall": "Words fall downward like flowing water",
  "sacred-geometry": "Subtle geometric cues (flower of life, triangle, etc.)",
  "breath-space-minimal": "Very little text — stillness dominates canvas"
};
