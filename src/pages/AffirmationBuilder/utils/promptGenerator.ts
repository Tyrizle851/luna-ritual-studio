/**
 * Generates random prompts for affirmation images and derives color palettes from prompts
 */

// Affirmation headlines by theme
const HEADLINES: Record<string, string[]> = {
  confidence: ["I AM ENOUGH", "BOLD AND BRAVE", "FEARLESS FORWARD", "UNSTOPPABLE FORCE", "I RISE"],
  peace: ["INNER STILLNESS", "CALM WITHIN", "SERENITY NOW", "PEACE FLOWS THROUGH ME", "QUIET STRENGTH"],
  focus: ["CLARITY OF PURPOSE", "SINGLE MINDED", "LASER FOCUSED", "INTENTIONAL LIVING", "PRESENT MOMENT"],
  gratitude: ["GRATEFUL HEART", "ABUNDANCE FLOWS", "BLESSED BEYOND MEASURE", "THANKFUL TODAY", "JOY IN ALL THINGS"],
  abundance: ["PROSPERITY MINDSET", "WEALTH FLOWS TO ME", "I AM ABUNDANT", "UNLIMITED POTENTIAL", "OPEN TO RECEIVE"],
  healing: ["HEALING LIGHT", "RENEWAL BEGINS", "RESTORATION", "GENTLE RECOVERY", "WHOLE AND WELL"],
  strength: ["UNBREAKABLE SPIRIT", "INNER POWER", "RESILIENT SOUL", "MIGHTY AND STRONG", "I ENDURE"],
  joy: ["RADIANT JOY", "HAPPINESS BLOOMS", "LIGHT HEARTED", "PURE DELIGHT", "JOYFUL LIVING"],
  balance: ["HARMONIOUS LIFE", "CENTERED AND CALM", "PERFECT BALANCE", "EQUILIBRIUM", "ALIGNED"],
  courage: ["BRAVE HEART", "COURAGE RISES", "FEARLESS SOUL", "BOLD STEPS", "I AM COURAGEOUS"],
  clarity: ["CRYSTAL CLEAR", "VISION UNVEILED", "PURE INSIGHT", "MIND AWAKENS", "SHARP FOCUS"],
  renewal: ["FRESH START", "NEW BEGINNINGS", "REBIRTH", "SPRING AWAKENS", "TRANSFORMED"],
  freedom: ["LIBERATED SPIRIT", "WILD AND FREE", "UNBOUND SOUL", "FREEDOM CALLS", "I AM FREE"],
  passion: ["FIRE WITHIN", "BURNING BRIGHT", "PASSIONATE HEART", "ALIVE WITH PURPOSE", "IGNITED"],
  wisdom: ["ANCIENT WISDOM", "INNER KNOWING", "SAGE HEART", "DEEP UNDERSTANDING", "WISE SOUL"],
};

// Visual styles
const VISUAL_STYLES = [
  {
    name: "Watercolor Botanical",
    description: "Soft watercolor washes with delicate botanical elements, organic flowing edges, hand-painted texture on cotton paper",
    keywords: ["watercolor", "botanical", "soft", "organic", "flowing"],
    colors: ["#F5F1E8", "#D4B896", "#8B7355"], // warm cream, dusty gold, warm brown
  },
  {
    name: "Minimalist Editorial",
    description: "Clean cream background, elegant serif typography, subtle geometric accents, editorial sophistication",
    keywords: ["minimalist", "editorial", "clean", "geometric", "sophisticated"],
    colors: ["#FAFAF8", "#2D2D2D", "#C9B8A8"], // pure cream, charcoal, warm taupe
  },
  {
    name: "Cosmic Mystical",
    description: "Deep indigo and violet gradients, constellation patterns, ethereal glow, celestial imagery",
    keywords: ["cosmic", "mystical", "celestial", "ethereal", "stars"],
    colors: ["#1A1A2E", "#E8D5B7", "#4A4063"], // deep indigo, soft gold, dusty violet
  },
  {
    name: "Earth & Nature",
    description: "Forest greens and terracotta, winding paths, natural textures, grounded organic elements",
    keywords: ["earth", "nature", "forest", "grounded", "organic"],
    colors: ["#F4EDE4", "#5C6B54", "#C4A77D"], // warm linen, sage green, warm ochre
  },
  {
    name: "Soft Gradient",
    description: "Blush pinks and lavender, smooth color transitions, dreamy atmosphere, gentle warmth",
    keywords: ["gradient", "soft", "blush", "dreamy", "gentle"],
    colors: ["#FDF6F4", "#E8C4C4", "#D4B8C4"], // soft white, dusty rose, mauve
  },
  {
    name: "Modern Typography",
    description: "Bold text-focused design, paper textures, minimal decoration, architectural precision",
    keywords: ["typography", "modern", "bold", "minimal", "architectural"],
    colors: ["#F8F5F0", "#1C1C1C", "#B8A99A"], // warm white, near black, warm gray
  },
  {
    name: "Warm Golden Hour",
    description: "Honey gold and amber gradients, sun-kissed warmth, radiant glow, luminous atmosphere",
    keywords: ["golden", "warm", "amber", "radiant", "luminous"],
    colors: ["#FFF8E7", "#D4A574", "#8B6914"], // warm cream, warm gold, amber
  },
  {
    name: "Serene Blue",
    description: "Cool blues and seafoam, still water reflections, peaceful zen elements, calm atmosphere",
    keywords: ["serene", "blue", "calm", "zen", "peaceful"],
    colors: ["#F5F9FA", "#7BA3A8", "#445A5E"], // cool white, seafoam, deep teal
  },
  {
    name: "Abstract Expressionist",
    description: "Bold brushstrokes, dynamic color splashes, artistic freedom, gallery-worthy abstraction",
    keywords: ["abstract", "expressionist", "bold", "artistic", "dynamic"],
    colors: ["#FAF7F2", "#A67C52", "#5A4A3A"], // cream, burnt sienna, deep brown
  },
  {
    name: "Vintage Paper",
    description: "Aged paper texture, sepia tones, antique typography, nostalgic warmth, timeless elegance",
    keywords: ["vintage", "antique", "sepia", "nostalgic", "timeless"],
    colors: ["#F5ECD7", "#8B7355", "#463A2A"], // aged cream, warm brown, dark brown
  },
];

// Compositional elements
const COMPOSITIONS = [
  "centered with generous negative space",
  "asymmetric balance with visual weight on the lower third",
  "golden ratio composition with text in upper two-thirds",
  "minimalist horizontal flow with elegant spacing",
  "organic curved framing around the text",
  "editorial grid with intentional white space",
  "flowing vertical arrangement with breathing room",
  "radial composition emanating from center text",
];

// Typography styles
const TYPOGRAPHY = [
  "elegant high-contrast serif (Didot, Bodoni style)",
  "warm humanist serif (Cormorant, Freight style)",
  "refined transitional serif (Baskerville, Caslon style)",
  "bold modern serif (Playfair Display style)",
  "geometric sans-serif for modern edge (Futura, Avant Garde style)",
  "calligraphic script with editorial restraint",
];

// Decorative elements
const ELEMENTS = [
  "delicate botanical silhouettes (eucalyptus, olive branches)",
  "abstract watercolor washes with soft bleeding edges",
  "subtle geometric line accents",
  "flowing calligraphic brushstrokes",
  "organic pebble or stone shapes",
  "minimal line art florals",
  "soft shadow overlays",
  "fine grain paper texture",
  "gentle gradient backdrop",
  "constellation or dot pattern",
];

/**
 * Generate a random prompt for affirmation image generation
 */
export function generateRandomPrompt(): { prompt: string; colors: string[]; headline: string } {
  // Pick random theme and headline
  const themes = Object.keys(HEADLINES);
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const headlines = HEADLINES[randomTheme];
  const headline = headlines[Math.floor(Math.random() * headlines.length)];

  // Pick random visual style
  const style = VISUAL_STYLES[Math.floor(Math.random() * VISUAL_STYLES.length)];

  // Pick random composition
  const composition = COMPOSITIONS[Math.floor(Math.random() * COMPOSITIONS.length)];

  // Pick random typography
  const typography = TYPOGRAPHY[Math.floor(Math.random() * TYPOGRAPHY.length)];

  // Pick 1-2 random elements
  const shuffledElements = [...ELEMENTS].sort(() => Math.random() - 0.5);
  const selectedElements = shuffledElements.slice(0, Math.floor(Math.random() * 2) + 1);

  // Build the prompt
  const prompt = `Create a premium art print featuring the headline "${headline}"

STYLE: ${style.name}
${style.description}

TYPOGRAPHY:
• ${typography}
• Text must be PERFECTLY readable - no artistic distortion
• Large, well-kerned letters with generous line height
• Text occupies 25-40% of vertical space

COMPOSITION:
• ${composition}
• 60-75% negative space for breathing room
• Portrait 4:5 ratio, print-ready quality

COLOR PALETTE:
Primary: ${style.colors[0]}
Secondary: ${style.colors[1]}
Accent: ${style.colors[2]}

VISUAL ELEMENTS:
${selectedElements.map(e => `• ${e}`).join('\n')}

QUALITY: Gallery-worthy, $40-60 art print quality
Should look like professional design from Rifle Paper Co or Kinfolk magazine`;

  return {
    prompt,
    colors: style.colors,
    headline,
  };
}

/**
 * Derive a color palette from prompt keywords using color theory
 */
export function deriveColorsFromPrompt(prompt: string): string[] {
  const lowerPrompt = prompt.toLowerCase();

  // Check for style matches
  for (const style of VISUAL_STYLES) {
    for (const keyword of style.keywords) {
      if (lowerPrompt.includes(keyword)) {
        return style.colors;
      }
    }
  }

  // Check for mood keywords
  if (lowerPrompt.includes('warm') || lowerPrompt.includes('golden') || lowerPrompt.includes('amber')) {
    return ["#FFF8E7", "#D4A574", "#8B6914"];
  }
  if (lowerPrompt.includes('cool') || lowerPrompt.includes('blue') || lowerPrompt.includes('serene')) {
    return ["#F5F9FA", "#7BA3A8", "#445A5E"];
  }
  if (lowerPrompt.includes('earth') || lowerPrompt.includes('nature') || lowerPrompt.includes('forest')) {
    return ["#F4EDE4", "#5C6B54", "#C4A77D"];
  }
  if (lowerPrompt.includes('pink') || lowerPrompt.includes('blush') || lowerPrompt.includes('rose')) {
    return ["#FDF6F4", "#E8C4C4", "#D4B8C4"];
  }
  if (lowerPrompt.includes('cosmic') || lowerPrompt.includes('mystical') || lowerPrompt.includes('celestial')) {
    return ["#1A1A2E", "#E8D5B7", "#4A4063"];
  }
  if (lowerPrompt.includes('vintage') || lowerPrompt.includes('antique') || lowerPrompt.includes('sepia')) {
    return ["#F5ECD7", "#8B7355", "#463A2A"];
  }
  if (lowerPrompt.includes('bold') || lowerPrompt.includes('modern') || lowerPrompt.includes('minimal')) {
    return ["#FAFAF8", "#2D2D2D", "#C9B8A8"];
  }

  // Default: warm neutral palette
  return ["#F5F1E8", "#D4B896", "#8B7355"];
}

/**
 * Extract headline from prompt
 */
export function extractHeadlineFromPrompt(prompt: string): string | null {
  // Look for text in quotes after "headline"
  const headlineMatch = prompt.match(/headline\s*["']([^"']+)["']/i);
  if (headlineMatch) {
    return headlineMatch[1];
  }
  
  // Look for any quoted text
  const quotedMatch = prompt.match(/["']([A-Z][A-Z\s]+)["']/);
  if (quotedMatch) {
    return quotedMatch[1];
  }

  return null;
}
