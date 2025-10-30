import { 
  DesignSpec, 
  THEME_REGISTRY, 
  MOOD_REGISTRY, 
  SPEC_VERSION,
  ThemeSlug,
  MoodSlug,
  LayoutArchetype 
} from '@/types/design-spec';

// Simple hash function for deterministic seed generation
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export interface BuildSpecOptions {
  theme: ThemeSlug;
  mood: MoodSlug;
  layoutOverride?: LayoutArchetype;
  keywords?: string;
  seed?: number | string;
  styleVariant?: number;
  accentVariant?: number;
  paletteVariant?: number;
  copyVariant?: number;
  textureVariant?: number;
  customPaletteHex?: string[];
  customHeadline?: string;
  customSupportingPhrases?: string[];
}

export function buildDesignSpec(options: BuildSpecOptions): DesignSpec {
  const {
    theme,
    mood,
    layoutOverride,
    keywords = '',
    seed,
    styleVariant = 0,
    accentVariant = 0,
    paletteVariant = 0,
    copyVariant = 0,
    textureVariant = 0,
    customPaletteHex,
    customHeadline,
    customSupportingPhrases
  } = options;

  const themeData = THEME_REGISTRY[theme];
  const moodData = MOOD_REGISTRY[mood];

  // Determine layout: user override, or theme default that's allowed by mood
  let layoutArchetype: LayoutArchetype;
  if (layoutOverride) {
    layoutArchetype = layoutOverride;
  } else {
    const compatibleLayout = themeData.defaultLayouts.find(l => 
      moodData.allowedLayouts.includes(l)
    );
    layoutArchetype = compatibleLayout || themeData.defaultLayouts[0];
  }

  // Generate or use provided seed
  const finalSeed = seed ?? hashString(
    `${theme}|${mood}|${layoutArchetype}|${themeData.palette.name}|${copyVariant}|${styleVariant}|${accentVariant}|${textureVariant}|${keywords}|v${SPEC_VERSION}`
  );

  // Use custom text if provided, otherwise select from registry
  let mainAffirmation: string;
  let supportingPhrases: string[];
  
  if (customHeadline && customSupportingPhrases) {
    mainAffirmation = customHeadline;
    supportingPhrases = customSupportingPhrases;
  } else {
    // Select main affirmation from lexicon
    const headlineIndex = Math.abs(hashString(String(finalSeed) + 'headline')) % themeData.headlineLexicon.length;
    mainAffirmation = themeData.headlineLexicon[headlineIndex];

    // Select supporting phrases from template
    const templateIndex = copyVariant % themeData.phraseTemplates.length;
    supportingPhrases = [...themeData.phraseTemplates[templateIndex]];

    // Optionally weave in keywords if provided
    if (keywords.trim()) {
      const keywordLine = `${keywords.trim().charAt(0).toUpperCase() + keywords.trim().slice(1)}`;
      supportingPhrases = supportingPhrases.slice(0, 5).concat([keywordLine]);
    }
  }

  // Use custom palette if provided, otherwise use theme's palette
  const paletteToken = customPaletteHex ? {
    name: "custom_palette",
    description: "Custom user-selected colors",
    hex: customPaletteHex,
    contrast: themeData.palette.contrast
  } : themeData.palette;

  return {
    theme,
    mood,
    energyLevel: themeData.energyLevel,
    layoutArchetype,
    paletteToken,
    accentSet: moodData.accents,
    typography: themeData.typography,
    mainAffirmation,
    supportingPhrases,
    styleVariant,
    accentVariant,
    paletteVariant,
    copyVariant,
    textureVariant,
    seed: finalSeed,
    specVersion: SPEC_VERSION,
    constraints: {
      ratio: "4:5",
      dpi: 300,
      ban: ["neon", "low_legibility", "overcrowded_layout"]
    }
  };
}
