// Shared design specification contract between frontend and edge function
// Ensures preview exactly matches generated image

export const SPEC_VERSION = 1;

export type ThemeSlug =
  | "confidence" | "peace" | "focus" | "gratitude" | "abundance"
  | "healing" | "strength" | "joy" | "balance" | "courage"
  | "clarity" | "renewal" | "freedom" | "passion" | "wisdom";

export type MoodSlug =
  | "minimalist" | "bohemian" | "modern-serif" | "coastal" | "earthy"
  | "vibrant" | "pastel" | "monochrome" | "sunset" | "forest";

export type LayoutArchetype =
  | "clean-serif"      // centered headline, rules/underlines, grid rhythm
  | "botanical"        // curved text flow, leaf/organic accents
  | "grit-directional" // angled fragments, arrows/compass, dynamic
  | "halo-orbital";    // circular/radial clusters

export type EnergyLevel = "soft" | "supportive" | "direct" | "intense";

export type AccentType = "minimal" | "organic" | "botanical" | "textured" | "gradient-heavy" | "playful";

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

  // Variant knobs for controlled randomness
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

// Theme Registry - Emotional tone + defaults
export interface ThemeDefinition {
  emotion: string;
  headlineLexicon: string[];
  defaultLayouts: LayoutArchetype[];
  typography: TypoSet;
  energyLevel: EnergyLevel;
  phraseTemplates: string[][];
}

export const THEME_REGISTRY: Record<ThemeSlug, ThemeDefinition> = {
  confidence: {
    emotion: "assertive",
    headlineLexicon: ["I AM CAPABLE", "I AM UNSTOPPABLE", "IN MY POWER", "I TRUST MYSELF", "MY VOICE MATTERS"],
    defaultLayouts: ["clean-serif", "grit-directional"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "direct",
    phraseTemplates: [
      ["My voice matters", "I trust my decisions", "Doubt does not define me", "Courage lives within", "I stand in my power", "I am enough, always"],
      ["I choose confidence", "My strength is real", "I believe in me", "Fear does not lead", "I am worthy", "My path is clear"],
      ["Bold and grounded", "I rise with certainty", "Self-doubt fades", "I own my story", "Confident in becoming", "I lead with heart"],
      ["Inner strength guides me", "I trust my voice", "Capable and clear", "My power is mine", "I am the one", "Steady and strong"]
    ]
  },
  peace: {
    emotion: "calm",
    headlineLexicon: ["INNER CALM", "SOFT WITHIN", "QUIET IS POWER", "I AM AT PEACE", "STILLNESS FLOWS"],
    defaultLayouts: ["botanical"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    phraseTemplates: [
      ["I breathe in calm", "Stillness holds me", "Peace is my nature", "Gentle and whole", "I rest in quiet", "Softness is strength"],
      ["Calm surrounds me", "I release tension", "Peace flows through", "I am centered", "Quiet heals me", "I choose stillness"],
      ["In this moment, peace", "I soften", "Ease finds me", "I am held", "Tranquil and safe", "Peace is here"],
      ["I rest deeply", "Calm is mine", "I let go gently", "Peace lives within", "I am at ease", "Stillness guides"]
    ]
  },
  focus: {
    emotion: "disciplined",
    headlineLexicon: ["CLEAR MIND", "LOCKED IN", "ONE TASK", "I AM FOCUSED", "PRESENT NOW"],
    defaultLayouts: ["clean-serif"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "direct",
    phraseTemplates: [
      ["One thing at a time", "Clarity guides me", "I am present", "Distractions fade", "My mind is sharp", "I complete with care"],
      ["Focused and clear", "I see what matters", "Present in this moment", "My attention is mine", "I choose depth", "One step forward"],
      ["Clear vision ahead", "I work with purpose", "My mind is steady", "I eliminate noise", "Concentration flows", "I am here now"],
      ["Laser focus on now", "I finish what I start", "My energy is directed", "I prioritize wisely", "Deep work mode", "Clarity is power"]
    ]
  },
  gratitude: {
    emotion: "warm",
    headlineLexicon: ["I AM GRATEFUL", "JOY IS HERE", "BLESSED BY THIS", "THANKFUL HEART", "ABUNDANCE SURROUNDS"],
    defaultLayouts: ["halo-orbital"],
    typography: { headline: "display", support: "serif" },
    energyLevel: "supportive",
    phraseTemplates: [
      ["I see the good", "Grateful for today", "Joy lives here", "I appreciate this moment", "Thankful for growth", "Blessings surround me"],
      ["I notice beauty", "Gratitude fills me", "I am blessed", "Joy is abundant", "I honor what I have", "Grateful heart, full life"],
      ["Today I am thankful", "Small joys matter", "I celebrate this", "Gratitude opens doors", "I appreciate the journey", "Blessed beyond measure"],
      ["I give thanks", "Joy in simple things", "My heart is full", "I see abundance", "Grateful for me", "Life is generous"]
    ]
  },
  abundance: {
    emotion: "rich",
    headlineLexicon: ["OPEN TO MORE", "ABUNDANCE FLOWS", "I RECEIVE", "PROSPERITY IS MINE", "LIMITLESS LIFE"],
    defaultLayouts: ["halo-orbital"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "supportive",
    phraseTemplates: [
      ["I am open to receiving", "Abundance is my nature", "More flows to me", "I welcome prosperity", "There is enough", "I attract good things"],
      ["I receive with ease", "Wealth finds me", "I am a magnet for abundance", "Prosperity surrounds", "I deserve plenty", "Overflow is natural"],
      ["I open to overflow", "Riches in all forms", "I say yes to more", "Abundance is everywhere", "I trust the flow", "I am worthy of wealth"],
      ["Money loves me", "I attract opportunities", "My cup overflows", "I live in plenty", "I receive freely", "Abundance is infinite"]
    ]
  },
  healing: {
    emotion: "restorative",
    headlineLexicon: ["GENTLE HEALING", "I MEND", "RESTORATION FLOWS", "I AM HEALING", "SOFTLY WHOLE"],
    defaultLayouts: ["botanical"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    phraseTemplates: [
      ["I heal gently", "Time restores me", "I am mending", "Softness heals", "I allow recovery", "Peace aids healing"],
      ["I give myself time", "Healing is happening", "I am becoming whole", "Tender with myself", "I rest to heal", "My body knows healing"],
      ["I trust the process", "Healing flows through", "I am patient", "I nurture myself", "Recovery is mine", "I am gentle with me"],
      ["I heal at my pace", "Restoration is natural", "I honor my healing", "I am rebuilding", "Softly, I mend", "I am healing now"]
    ]
  },
  strength: {
    emotion: "solid",
    headlineLexicon: ["UNSHAKEABLE", "BUILT STRONG", "I AM RESILIENT", "SOLID GROUND", "INNER FORTRESS"],
    defaultLayouts: ["grit-directional"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "intense",
    phraseTemplates: [
      ["I am unbreakable", "My foundation is solid", "I withstand storms", "Strong and steady", "I endure", "My core is steel"],
      ["I rise from challenges", "Strength is my nature", "I am resilient", "I stand firm", "I do not crumble", "Built to last"],
      ["I am fortified", "My spirit is strong", "I overcome", "I am durable", "Power within", "I hold my ground"],
      ["I am my anchor", "Strength from within", "I persist", "Unshaken by trials", "I am solid", "Resilience is mine"]
    ]
  },
  joy: {
    emotion: "bright",
    headlineLexicon: ["JOY RISING", "LIGHT WITHIN", "I CHOOSE JOY", "RADIANT LIFE", "HAPPINESS FLOWS"],
    defaultLayouts: ["halo-orbital"],
    typography: { headline: "display", support: "sans" },
    energyLevel: "supportive",
    phraseTemplates: [
      ["Joy is my choice", "I radiate light", "Happiness is here", "I feel delight", "Joy flows freely", "I celebrate life"],
      ["I find joy daily", "Brightness surrounds me", "I laugh often", "Joy is abundant", "I am full of light", "Happiness is natural"],
      ["I choose to smile", "Joy lives in me", "I sparkle", "Light fills my heart", "I am joyful", "Radiance is mine"],
      ["I embrace joy", "Happiness finds me", "I shine brightly", "Joy is easy", "I feel alive", "My heart is light"]
    ]
  },
  balance: {
    emotion: "steady",
    headlineLexicon: ["IN BALANCE", "CENTER HELD", "I AM ALIGNED", "HARMONY WITHIN", "STEADY GROUND"],
    defaultLayouts: ["clean-serif"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "supportive",
    phraseTemplates: [
      ["I find my center", "Balance is natural", "I am aligned", "Harmony flows", "I adjust with ease", "Steady and whole"],
      ["I hold my balance", "Centered in chaos", "I am grounded", "Equilibrium is mine", "I stay steady", "Balance guides me"],
      ["I live in harmony", "My life is balanced", "I prioritize well", "Centered and calm", "I adjust as needed", "Balance is strength"],
      ["I maintain equilibrium", "Harmony within", "I am centered", "Balance flows through", "I stay grounded", "My center is strong"]
    ]
  },
  courage: {
    emotion: "brave",
    headlineLexicon: ["BRAVE HEART", "I MOVE ANYWAY", "COURAGE LIVES", "I FACE FEAR", "BOLD STEPS"],
    defaultLayouts: ["grit-directional"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "direct",
    phraseTemplates: [
      ["I act despite fear", "Courage is my choice", "I move forward", "Brave and bold", "I face what comes", "Fear does not stop me"],
      ["I am courageous", "I take the leap", "Bravery lives in me", "I do it scared", "I choose courage", "Bold in action"],
      ["I step into fear", "Courage guides me", "I am brave enough", "I face the unknown", "Fear makes me stronger", "I move with courage"],
      ["I am fearless", "Bravery flows through", "I act boldly", "Courage is mine", "I rise brave", "I do hard things"]
    ]
  },
  clarity: {
    emotion: "clear",
    headlineLexicon: ["CRYSTAL CLEAR", "SEE TRUE", "I KNOW", "VISION IS MINE", "CLEAR SIGHT"],
    defaultLayouts: ["clean-serif"],
    typography: { headline: "serif", support: "sans" },
    energyLevel: "direct",
    phraseTemplates: [
      ["I see clearly", "My vision is sharp", "Clarity comes easily", "I know my path", "I trust my sight", "Clear and certain"],
      ["I understand now", "Clarity guides me", "I see what matters", "My mind is clear", "I know the truth", "Vision is mine"],
      ["I see through fog", "Clarity is my gift", "I discern well", "I trust my knowing", "Clear-headed always", "I see beyond"],
      ["I perceive truth", "Clarity flows", "I understand deeply", "My vision is true", "I see the way", "Clarity is power"]
    ]
  },
  renewal: {
    emotion: "fresh",
    headlineLexicon: ["BEGIN AGAIN", "NEW LIGHT", "I RENEW", "FRESH START", "REBIRTH NOW"],
    defaultLayouts: ["botanical"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    phraseTemplates: [
      ["I start fresh", "New beginnings are mine", "I renew myself", "Today is new", "I release the old", "Fresh energy flows"],
      ["I begin again", "Renewal is natural", "I shed what was", "New life emerges", "I am reborn", "Fresh start today"],
      ["I embrace new beginnings", "Renewal flows through", "I start over", "I am made new", "Fresh perspective", "I bloom again"],
      ["I let go and renew", "New chapter now", "I refresh my spirit", "Rebirth is mine", "I am renewed", "Fresh and free"]
    ]
  },
  freedom: {
    emotion: "open",
    headlineLexicon: ["I AM FREE", "WIDE OPEN", "UNBOUND LIFE", "LIBERATION", "FREE TO BE"],
    defaultLayouts: ["grit-directional"],
    typography: { headline: "display", support: "sans" },
    energyLevel: "direct",
    phraseTemplates: [
      ["I am liberated", "Freedom is mine", "I break free", "Unbound and wild", "I choose freedom", "I am limitless"],
      ["I release constraints", "Freedom flows", "I am unchained", "Open and free", "I live freely", "Liberation is here"],
      ["I am unrestricted", "Freedom is my right", "I break the chains", "I live untethered", "Wide open life", "I am free now"],
      ["I claim my freedom", "Unbound spirit", "I am sovereign", "Freedom guides me", "I am liberated", "I fly free"]
    ]
  },
  passion: {
    emotion: "fiery",
    headlineLexicon: ["BURN BRIGHT", "FULL FLAME", "I AM FIRE", "PASSION LIVES", "IGNITED HEART"],
    defaultLayouts: ["grit-directional"],
    typography: { headline: "display", support: "serif" },
    energyLevel: "intense",
    phraseTemplates: [
      ["I burn with purpose", "Passion fuels me", "I am on fire", "My heart blazes", "I live fully", "Flame within"],
      ["I ignite my dreams", "Passion drives me", "I am fully alive", "Fire in my soul", "I burn brightly", "Passion is power"],
      ["I live with fire", "My passion is fierce", "I am ablaze", "I burn for this", "Ignited and alive", "Passion flows"],
      ["I am passionate", "Fire guides me", "I burn with love", "My flame is strong", "I live intensely", "Passion is mine"]
    ]
  },
  wisdom: {
    emotion: "knowing",
    headlineLexicon: ["INNER WISDOM", "I KNOW", "WISE HEART", "TRUTH WITHIN", "I TRUST MY KNOWING"],
    defaultLayouts: ["clean-serif"],
    typography: { headline: "serif", support: "serif" },
    energyLevel: "supportive",
    phraseTemplates: [
      ["I trust my wisdom", "Inner knowing guides", "I am wise", "My insight is deep", "I listen within", "Wisdom is mine"],
      ["I know what I need", "My wisdom is true", "I trust my intuition", "Wise and aware", "I see clearly", "Inner truth guides"],
      ["I am discerning", "Wisdom flows through", "I know deeply", "My knowing is strong", "I trust myself", "Wise in all ways"],
      ["I listen to wisdom", "My inner voice is clear", "I know my truth", "Wisdom lives in me", "I am guided", "I trust my knowing"]
    ]
  }
};

// Mood Registry - Palette + accents + compatible layouts
export interface MoodDefinition {
  palette: PaletteToken;
  accents: AccentType[];
  allowedLayouts: LayoutArchetype[];
  weight: number; // 0-1 for weighted sampling
}

export const MOOD_REGISTRY: Record<MoodSlug, MoodDefinition> = {
  minimalist: {
    palette: {
      name: "ink_on_cream_high_contrast",
      description: "black on warm cream",
      hex: ["#111111", "#F6F2EC"],
      contrast: "high"
    },
    accents: ["minimal", "organic"],
    allowedLayouts: ["clean-serif"],
    weight: 0.45
  },
  "modern-serif": {
    palette: {
      name: "charcoal_blush_ivory",
      description: "charcoal, soft blush, ivory",
      hex: ["#2E2E2E", "#EBD6D0", "#FAF8F6"],
      contrast: "medium"
    },
    accents: ["minimal", "organic", "textured"],
    allowedLayouts: ["clean-serif"],
    weight: 0.35
  },
  bohemian: {
    palette: {
      name: "terracotta_sage_cream",
      description: "terracotta, sage, cream",
      hex: ["#B5654D", "##7B8F6D", "#F3EEE6"],
      contrast: "low"
    },
    accents: ["botanical", "organic", "textured"],
    allowedLayouts: ["botanical", "halo-orbital"],
    weight: 0.30
  },
  coastal: {
    palette: {
      name: "seafoam_sand_driftwood",
      description: "seafoam, sand, driftwood",
      hex: ["#BFDAD0", "#E6D8C4", "#9A9A93"],
      contrast: "low"
    },
    accents: ["organic", "botanical", "minimal"],
    allowedLayouts: ["clean-serif", "botanical"],
    weight: 0.25
  },
  earthy: {
    palette: {
      name: "forest_clay_cream",
      description: "forest green, clay, cream",
      hex: ["#2D5A4A", "#B6896B", "#F3EEE6"],
      contrast: "medium"
    },
    accents: ["organic", "botanical", "textured"],
    allowedLayouts: ["botanical", "halo-orbital"],
    weight: 0.30
  },
  vibrant: {
    palette: {
      name: "ink_plus_accent",
      description: "black with bright accents",
      hex: ["#121212", "#0EA5E9", "#EF4444", "#F59E0B"],
      contrast: "high"
    },
    accents: ["organic", "botanical", "gradient-heavy"],
    allowedLayouts: ["grit-directional", "clean-serif"],
    weight: 0.15
  },
  pastel: {
    palette: {
      name: "soft_peach_lavender_mint",
      description: "soft peach, lavender, mint",
      hex: ["#F7E2DA", "#E6DDF7", "#D7F2EA"],
      contrast: "low"
    },
    accents: ["organic", "minimal", "botanical"],
    allowedLayouts: ["halo-orbital", "botanical"],
    weight: 0.25
  },
  monochrome: {
    palette: {
      name: "ink_on_cream_mono",
      description: "black, cream, gray",
      hex: ["#111111", "#F6F2EC", "#777777"],
      contrast: "high"
    },
    accents: ["minimal", "organic", "textured"],
    allowedLayouts: ["clean-serif"],
    weight: 0.40
  },
  sunset: {
    palette: {
      name: "coral_amber_blush",
      description: "coral, amber, blush",
      hex: ["#F28C6B", "#FFC36A", "#F6B1B1"],
      contrast: "medium"
    },
    accents: ["organic", "gradient-heavy", "botanical"],
    allowedLayouts: ["halo-orbital", "botanical"],
    weight: 0.20
  },
  forest: {
    palette: {
      name: "deep_green_olive_moss",
      description: "deep green, olive, moss, cream",
      hex: ["#1F3D32", "#4B5E3C", "#7C8F5A", "#EDE9DF"],
      contrast: "medium"
    },
    accents: ["botanical", "organic", "textured"],
    allowedLayouts: ["botanical", "clean-serif"],
    weight: 0.30
  }
};

// Layout archetype descriptions for prompt generation
export const LAYOUT_DESCRIPTIONS: Record<LayoutArchetype, string> = {
  "clean-serif": "Centered headline with horizontal rules or underlines, clear grid rhythm, generous margins. Typography-forward with minimal decoration. Strong vertical alignment.",
  "botanical": "Curved, organic text flow with leaf and floral accents. Soft edges, nature-inspired ornaments. Text may wrap gently or follow natural curves.",
  "grit-directional": "Dynamic composition with angled text fragments, arrows, or compass motifs. Directional energy, bold hierarchy, assertive placement.",
  "halo-orbital": "Circular or radial text arrangement with dot clusters or radiating lines. Central focal point with orbital supporting elements."
};
