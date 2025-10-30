// Edge function for generating affirmation images using Lovable AI

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// DesignSpec type (shared with frontend)
interface DesignSpec {
  theme: string;
  mood: string;
  energyLevel: string;
  layoutArchetype: string;
  paletteToken: {
    name: string;
    description: string;
    hex: string[];
    contrast: string;
  };
  accentSet: string[];
  typography: {
    headline: string;
    support: string;
  };
  mainAffirmation: string;
  supportingPhrases: string[];
  styleVariant?: number;
  accentVariant?: number;
  paletteVariant?: number;
  copyVariant?: number;
  textureVariant?: number;
  seed?: number | string;
  specVersion: number;
  constraints: {
    ratio: string;
    dpi: number;
    ban: string[];
  };
}

interface GenerateRequest {
  designSpec: DesignSpec;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: GenerateRequest = await req.json();
    const { designSpec } = body;

    console.log('Generating affirmation image with designSpec:', JSON.stringify(designSpec, null, 2));

    // Build the master prompt using the complete design spec
    const prompt = buildMasterPrompt(designSpec);
    
    console.log('Calling Lovable AI with prompt length:', prompt.length);

    // Call Lovable AI's image generation API (Nano banana model)
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      
      // Handle rate limiting and payment errors
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Image generation failed', 
          detail: `AI Gateway returned ${aiResponse.status}`,
          message: errorText 
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const imageUrl = aiData?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error('No image data in AI response');
      return new Response(
        JSON.stringify({ error: 'No image returned from AI' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract base64 data from data URL (format: data:image/png;base64,...)
    const base64Match = imageUrl.match(/^data:image\/\w+;base64,(.+)$/);
    const imageB64 = base64Match ? base64Match[1] : imageUrl;

    console.log('Successfully generated image, size:', imageB64.length);

    return new Response(
      JSON.stringify({ 
        imageB64,
        generationId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        detail: error instanceof Error ? error.message : String(error) 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Master prompt builder - comprehensive and detailed
function buildMasterPrompt(spec: DesignSpec): string {
  const themeFragment = getThemeFragment(spec.theme);
  const moodFragment = getMoodFragment(spec.mood);
  const layoutFragment = getLayoutFragment(spec.layoutArchetype);
  const accentFragment = getAccentFragment(spec.accentSet);
  const colorGuidance = getColorGuidance(spec.paletteToken);
  const typographyGuidance = getTypographyGuidance(spec.typography, spec.energyLevel);

  return `You are an expert designer creating a PREMIUM PRINT-READY affirmation poster for professional production.
This will be physically printed and framed - quality and precision are paramount.

═══════════════════════════════════════════════════════════════════
🎨 COLOR PALETTE - STRICT ENFORCEMENT
═══════════════════════════════════════════════════════════════════
${colorGuidance}

ONLY use these exact hex colors: ${spec.paletteToken.hex.join(" | ")}
NO other colors permitted. NO gradients between non-palette colors.
Palette contrast level: ${spec.paletteToken.contrast}

═══════════════════════════════════════════════════════════════════
📐 LAYOUT ARCHITECTURE - MANDATORY STRUCTURE
═══════════════════════════════════════════════════════════════════
LAYOUT SYSTEM: ${spec.layoutArchetype}
${layoutFragment}

THIS IS THE CORE COMPOSITION STRUCTURE - NOT NEGOTIABLE.
Every text element must follow this architectural pattern.

═══════════════════════════════════════════════════════════════════
✨ REQUIRED DECORATIVE ACCENTS
═══════════════════════════════════════════════════════════════════
${accentFragment}

These accent elements are MANDATORY design features, not optional decorations.
They must be integrated thoughtfully into the composition.

═══════════════════════════════════════════════════════════════════
🔤 TYPOGRAPHY SPECIFICATION
═══════════════════════════════════════════════════════════════════
${typographyGuidance}

MAIN AFFIRMATION TEXT (hero text): "${spec.mainAffirmation}"
- This is the PRIMARY focal point - must dominate the composition
- Size: 3-5× larger than supporting text
- Weight: Bold and commanding
- Treatment: ${spec.energyLevel === "direct" ? "Uppercase and powerful" : "Balanced and flowing"}
- Letter spacing: ${spec.energyLevel === "direct" ? "Wide (0.05-0.1em)" : "Normal to slightly loose"}

SUPPORTING PHRASES (secondary text):
${spec.supportingPhrases.map((phrase, i) => `  ${i + 1}. "${phrase}"`).join("\n")}
- Size hierarchy: Each phrase can vary slightly in size for visual interest
- Weight: Medium to regular (lighter than hero text)
- Spacing: Clear breathing room between each phrase
- ALL phrases must be included in the final design

═══════════════════════════════════════════════════════════════════
🎭 THEME & MOOD DIRECTION
═══════════════════════════════════════════════════════════════════
THEME: ${spec.theme.toUpperCase()}
${themeFragment}

MOOD: ${spec.mood.toUpperCase()}
${moodFragment}

The theme dictates the EMOTIONAL TONE and MESSAGE.
The mood dictates the VISUAL STYLE and DECORATIVE APPROACH.

═══════════════════════════════════════════════════════════════════
⚙️ TECHNICAL PRODUCTION REQUIREMENTS
═══════════════════════════════════════════════════════════════════
- Aspect ratio: ${spec.constraints.ratio} (EXACT - no deviation)
- Resolution: ${spec.constraints.dpi} DPI minimum (print-quality)
- Color mode: RGB for digital, but ensure CMYK-safe colors
- Edge treatment: FULL BLEED - extend all backgrounds to canvas edges
- NO white borders, NO margins around the design
- Text must be crystal clear and legible at arm's length when printed
- Ensure sufficient contrast between text and background (WCAG AA minimum)

BANNED ELEMENTS (absolutely forbidden):
${spec.constraints.ban.map(b => `❌ ${b.replace(/_/g, " ").toUpperCase()}`).join("\n")}

═══════════════════════════════════════════════════════════════════
📏 COMPOSITION GUIDELINES
═══════════════════════════════════════════════════════════════════
1. VISUAL HIERARCHY: Main affirmation should be immediately visible and dominant
2. WHITE SPACE: Use generous negative space - don't crowd elements
3. BALANCE: Create visual equilibrium even in asymmetric layouts
4. FLOW: Guide the eye naturally from main affirmation to supporting phrases
5. DEPTH: Use subtle scale, opacity, or layering for dimensional interest
6. HARMONY: All elements should feel cohesive and intentional
7. READABILITY: Text must be effortless to read - no overly decorative fonts

═══════════════════════════════════════════════════════════════════
🎯 FINAL CHECKLIST
═══════════════════════════════════════════════════════════════════
Before finalizing, verify:
✓ Main affirmation "${spec.mainAffirmation}" is dominant and correctly spelled
✓ All ${spec.supportingPhrases.length} supporting phrases are included
✓ Layout follows ${spec.layoutArchetype} structure precisely
✓ Only palette colors ${spec.paletteToken.hex.join(", ")} are used
✓ Required accents (${spec.accentSet.join(", ")}) are present and tasteful
✓ Typography style matches ${spec.typography.headline}/${spec.typography.support} specification
✓ ${spec.constraints.ratio} aspect ratio is exact
✓ Full bleed design with no borders
✓ Print-ready quality at ${spec.constraints.dpi} DPI
✓ Theme emotion (${spec.theme}) is conveyed effectively
✓ Mood aesthetic (${spec.mood}) is visually clear

Deliver a single, complete, professional-quality poster image that exceeds boutique print standards.`;
}

// Theme tone fragments - detailed emotional and conceptual guidance
function getThemeFragment(theme: string): string {
  const fragments: Record<string, string> = {
    confidence: `💪 CONFIDENCE THEME
EMOTIONAL CORE: Assertive self-assurance, unshakeable self-belief, personal power.
VISUAL LANGUAGE: Bold, strong, commanding. No softness or hesitation.
COLOR TREATMENT: Strong, saturated colors. High contrast. Confident color choices.
COMPOSITIONAL ENERGY: Forward-facing, direct eye contact with viewer, stable and grounded.
FORBIDDEN: Soft edges, pastel tones, gentle curves, questioning language.
MESSAGING TONE: "I am" statements, declarative, powerful, no qualifiers.`,

    peace: `🕊️ PEACE THEME
EMOTIONAL CORE: Deep calm, inner tranquility, gentle restoration, serene stillness.
VISUAL LANGUAGE: Soft, flowing, tranquil. Whisper, not shout.
COLOR TREATMENT: Muted, soft tones. Low contrast. Harmonious color relationships.
COMPOSITIONAL ENERGY: Horizontal orientations, balanced symmetry, still waters.
FORBIDDEN: Sharp angles, aggressive contrast, loud colors, busy compositions.
MESSAGING TONE: Gentle affirmations, restorative language, breath-like rhythm.`,

    focus: `🎯 FOCUS THEME
EMOTIONAL CORE: Laser clarity, intentional direction, disciplined attention, purposeful action.
VISUAL LANGUAGE: Clean, sharp, precise. Minimal distraction.
COLOR TREATMENT: Limited palette (2-3 colors max). Clear differentiation.
COMPOSITIONAL ENERGY: Single focal point, clear hierarchy, directional cues.
FORBIDDEN: Clutter, multiple competing elements, soft focus, ambiguity.
MESSAGING TONE: Direct imperatives, clear objectives, present-tense action.`,

    gratitude: `🙏 GRATITUDE THEME
EMOTIONAL CORE: Heartfelt appreciation, abundant awareness, joyful recognition, warm thankfulness.
VISUAL LANGUAGE: Warm, welcoming, celebratory. Open arms energy.
COLOR TREATMENT: Warm palette (golds, warm neutrals, sunset tones). Inviting warmth.
COMPOSITIONAL ENERGY: Open, expansive, generous spacing. Embracing layout.
FORBIDDEN: Cold tones, tight spacing, scarcity mindset, minimal aesthetic.
MESSAGING TONE: "Thank you" statements, recognition of abundance, celebratory language.`,

    abundance: `💰 ABUNDANCE THEME
EMOTIONAL CORE: Overflowing prosperity, generous plenty, endless possibility, wealth mindset.
VISUAL LANGUAGE: Rich, lush, full. More is more.
COLOR TREATMENT: Rich, saturated colors. Metallics welcome. Luxurious palette.
COMPOSITIONAL ENERGY: Full canvas, generous elements, layered richness.
FORBIDDEN: Minimalism, sparse layouts, restricted palettes, scarcity.
MESSAGING TONE: Affirmations of plenty, overflow language, receptive to receiving.`,

    healing: `🌿 HEALING THEME
EMOTIONAL CORE: Gentle restoration, patient recovery, nurturing growth, compassionate care.
VISUAL LANGUAGE: Soft, organic, restorative. Medicine for the soul.
COLOR TREATMENT: Natural healing tones (sage, cream, soft blues). Balm-like quality.
COMPOSITIONAL ENERGY: Organic growth patterns, protected spaces, nest-like comfort.
FORBIDDEN: Harsh transitions, aggressive elements, cold clinical feeling.
MESSAGING TONE: Patient, nurturing language. "It's okay" energy. Progressive healing.`,

    strength: `🏔️ STRENGTH THEME
EMOTIONAL CORE: Unshakeable resilience, enduring power, solid foundation, unwavering stability.
VISUAL LANGUAGE: Solid, grounded, immovable. Mountain energy.
COLOR TREATMENT: Deep, substantial colors. Earth tones, stone colors, solid foundations.
COMPOSITIONAL ENERGY: Stable, rooted, heavy base. Weight and substance.
FORBIDDEN: Delicate elements, floating compositions, light ephemeral quality.
MESSAGING TONE: Declarations of resilience, endurance language, foundation statements.`,

    joy: `☀️ JOY THEME
EMOTIONAL CORE: Pure delight, radiant happiness, bright celebration, lighthearted bliss.
VISUAL LANGUAGE: Bright, effervescent, playful. Sunshine and laughter.
COLOR TREATMENT: Bright, clear colors. High value colors. Light-filled palette.
COMPOSITIONAL ENERGY: Upward movement, dancing elements, playful arrangement.
FORBIDDEN: Heavy dark colors, downward energy, serious compositions.
MESSAGING TONE: Celebration, delight, present-moment happiness, play.`,

    balance: `⚖️ BALANCE THEME
EMOTIONAL CORE: Centered equilibrium, harmonious stability, peaceful alignment, middle way.
VISUAL LANGUAGE: Symmetrical OR asymmetrically balanced. Yin-yang harmony.
COLOR TREATMENT: Balanced warm/cool mix. Equal visual weight distribution.
COMPOSITIONAL ENERGY: Centered focal point, equal left/right weight, stable horizon.
FORBIDDEN: Extreme imbalance, one-sided compositions, chaotic arrangement.
MESSAGING TONE: Both/and statements, middle path language, harmonious integration.`,

    courage: `🦁 COURAGE THEME
EMOTIONAL CORE: Brave action despite fear, bold steps forward, fearless heart, daring spirit.
VISUAL LANGUAGE: Bold, forward-moving, brave. Leap of faith energy.
COLOR TREATMENT: Confident, bold colors. Fire colors (reds, oranges) or brave blues.
COMPOSITIONAL ENERGY: Forward diagonal movement, boundary-pushing, risk-taking layout.
FORBIDDEN: Timid placements, safe conservative layouts, muted presence.
MESSAGING TONE: Action verbs, brave declarations, fear-acknowledging courage.`,

    clarity: `💎 CLARITY THEME
EMOTIONAL CORE: Crystal-clear vision, sharp understanding, fog lifted, truth revealed.
VISUAL LANGUAGE: Transparent, precise, sharp-edged. Cut-glass clarity.
COLOR TREATMENT: Clear, pure colors. High differentiation. Diamond-like quality.
COMPOSITIONAL ENERGY: Clean lines, sharp edges, obvious hierarchy, no ambiguity.
FORBIDDEN: Blur, soft focus, muddy colors, confusing hierarchy.
MESSAGING TONE: Truth statements, clear seeing, revelation language, "I see clearly".`,

    renewal: `🌱 RENEWAL THEME
EMOTIONAL CORE: Fresh beginning, spring awakening, new life emerging, clean slate.
VISUAL LANGUAGE: Fresh, new, emerging. Seedling and dawn energy.
COLOR TREATMENT: Fresh greens, clean whites, morning colors. New growth palette.
COMPOSITIONAL ENERGY: Upward growth, emerging from below, sunrise orientation.
FORBIDDEN: Autumn tones, ending energy, heavy weighted elements, darkness.
MESSAGING TONE: Beginning language, fresh start affirmations, emergence statements.`,

    freedom: `🦅 FREEDOM THEME
EMOTIONAL CORE: Liberated spirit, released constraints, soaring possibility, unchained self.
VISUAL LANGUAGE: Open, expansive, unbound. Wings spread, no barriers.
COLOR TREATMENT: Sky colors, open palette. Expansive color relationships.
COMPOSITIONAL ENERGY: Breaking boundaries, edge-to-edge, no containment, flight paths.
FORBIDDEN: Borders, boxes, contained spaces, restricted areas, caging elements.
MESSAGING TONE: Liberation language, release statements, "I choose" declarations.`,

    passion: `🔥 PASSION THEME
EMOTIONAL CORE: Burning intensity, full-hearted commitment, alive with purpose, fiery devotion.
VISUAL LANGUAGE: Intense, dramatic, alive. Fire and heat.
COLOR TREATMENT: Hot colors (reds, oranges, magentas). Intense saturation.
COMPOSITIONAL ENERGY: Dynamic angles, intense focal points, heat-like radiation.
FORBIDDEN: Cool tones, calm energy, understated presence, muted expression.
MESSAGING TONE: Intensity, full commitment, burning desire, devoted action.`,

    wisdom: `🦉 WISDOM THEME
EMOTIONAL CORE: Deep knowing, quiet certainty, ancient truth, inner guidance.
VISUAL LANGUAGE: Timeless, knowing, ancient. Old soul energy.
COLOR TREATMENT: Deep, rich colors. Jewel tones. Timeless palette.
COMPOSITIONAL ENERGY: Centered, grounded, wise placement. Patient composition.
FORBIDDEN: Trendy styles, youthful energy, superficial treatment, hasty composition.
MESSAGING TONE: Deep knowing statements, trust affirmations, inner wisdom language.`
  };
  return fragments[theme] || "Empowering and inspirational tone with emotional depth.";
}

// Mood accent fragments - detailed visual style guidance  
function getMoodFragment(mood: string): string {
  const fragments: Record<string, string> = {
    minimalist: `🎨 MINIMALIST MOOD (Less is More)
DECORATIVE APPROACH: Extremely restrained. 1-3 subtle accent elements maximum.
ACCENT TYPES: Single thin lines (0.5-1pt), small geometric dots, minimal dashes.
PLACEMENT: Strategic, intentional, never decorative for decoration's sake.
COLOR USE: Often monochrome or single accent color.
REFERENCE: Bauhaus, Swiss design, Japanese minimalism, MUJI aesthetic.
FORBIDDEN: Multiple decorative elements, ornate details, busy patterns.`,

    "modern-serif": `🎨 MODERN SERIF MOOD (Refined Contemporary)
DECORATIVE APPROACH: Clean with intentional elegance. Refined geometric touches.
ACCENT TYPES: Thin serif-inspired lines, subtle brackets, geometric frames, hairline rules.
PLACEMENT: Aligned to type, supporting text hierarchy, architectural precision.
COLOR USE: Often limited palette with one accent color for sophistication.
REFERENCE: Modern editorial, Vogue, high-end branding, architectural renders.
FORBIDDEN: Hand-drawn elements, organic curves, casual placement.`,

    bohemian: `🎨 BOHEMIAN MOOD (Free Spirit)
DECORATIVE APPROACH: Organic, natural, flowing. Hand-crafted feeling.
ACCENT TYPES: Flowing curves, botanical elements (leaves, vines), sun/moon, feathers.
PLACEMENT: Asymmetric, natural, imperfect. Nothing too rigid.
COLOR USE: Earthy palette, natural tones, warm neutrals.
REFERENCE: 1970s design, desert aesthetic, festival posters, macramé patterns.
FORBIDDEN: Rigid grids, perfect symmetry, corporate precision, neon colors.`,

    coastal: `🎨 COASTAL MOOD (Beach & Breeze)
DECORATIVE APPROACH: Light, airy, flowing. Ocean-inspired ease.
ACCENT TYPES: Wave patterns, horizons, light rays, soft gradients, gentle curves.
PLACEMENT: Horizontal emphasis, flowing edges, drift-like arrangement.
COLOR USE: Blues, sandy neutrals, whites, seafoam greens. Light and airy.
REFERENCE: Beachhouse aesthetic, nautical without anchors, Mediterranean villa.
FORBIDDEN: Heavy elements, dark colors, rigid structures, landlocked feeling.`,

    earthy: `🎨 EARTHY MOOD (Grounded Nature)
DECORATIVE APPROACH: Natural, organic, textured. Forest and soil energy.
ACCENT TYPES: Botanical illustrations (leaves, branches, seeds), stone textures, wood grain.
PLACEMENT: Organic growth patterns, natural asymmetry, rooted from bottom.
COLOR USE: Forest greens, browns, terracotta, natural clay tones.
REFERENCE: Botanical gardens, natural history museums, apothecary labels, herbal guides.
FORBIDDEN: Synthetic colors, geometric precision, metropolitan aesthetic.`,

    vibrant: `🎨 VIBRANT MOOD (Bold Energy)
DECORATIVE APPROACH: Strong, confident, colorful. Maximum visual impact.
ACCENT TYPES: Bold geometric shapes (circles, triangles, squares), strong lines, color blocks.
PLACEMENT: Dynamic, asymmetric, attention-grabbing. High contrast placement.
COLOR USE: Saturated colors, complementary pairs, high chroma. Brave color choices.
REFERENCE: Pop art, 1960s posters, modern brand design, festival graphics.
FORBIDDEN: Muted tones, subtle touches, whisper aesthetics, timid placements.`,

    pastel: `🎨 PASTEL MOOD (Soft Sweet)
DECORATIVE APPROACH: Gentle, soft, dreamy. Whisper-light touch.
ACCENT TYPES: Soft dots, gentle curves, cloud-like shapes, delicate lines.
PLACEMENT: Soft, organic, floating. Light touch, never heavy-handed.
COLOR USE: Desaturated pastels (pink, mint, lavender, peach). Dreamy low-chroma.
REFERENCE: Kawaii culture, cottagecore, baby nurseries, French macarons.
FORBIDDEN: High contrast, bold statements, dark colors, aggressive shapes.`,

    monochrome: `🎨 MONOCHROME MOOD (Black & White)
DECORATIVE APPROACH: High contrast, graphic, stark. Pure form.
ACCENT TYPES: Strong geometric shapes, precise lines, halftone dots, solid blocks.
PLACEMENT: Graphic, bold, clear. Strong positive/negative space relationship.
COLOR USE: Single color + black/white, or pure black and white only.
REFERENCE: Newspaper design, linocut prints, high-contrast photography, brutalist design.
FORBIDDEN: Gradients (except halftone), multiple colors, soft edges.`,

    geometric: `🎨 GEOMETRIC MOOD (Precise Shapes)
DECORATIVE APPROACH: Mathematical, precise, structured. Sacred geometry.
ACCENT TYPES: Perfect circles, triangles, hexagons, lines at precise angles (30°, 45°, 60°).
PLACEMENT: Aligned to grid, mathematical relationships, golden ratio awareness.
COLOR USE: Often limited, color used to define shapes and relationships.
REFERENCE: Bauhaus, constructivism, sacred geometry, technical drawings.
FORBIDDEN: Organic shapes, hand-drawn quality, imperfect angles, natural forms.`,

    organic: `🎨 ORGANIC MOOD (Natural Forms)
DECORATIVE APPROACH: Flowing, natural, imperfect. Hand-of-nature feeling.
ACCENT TYPES: Irregular curves, natural shapes (pebbles, clouds, cells), flowing lines.
PLACEMENT: Natural asymmetry, growth-like distribution, biomimicry.
COLOR USE: Natural color relationships found in nature, never artificial.
REFERENCE: Art Nouveau, biomorphic design, natural forms, cell biology illustrations.
FORBIDDEN: Geometric precision, straight lines, rigid grids, synthetic feeling.`,

    celestial: `🎨 CELESTIAL MOOD (Cosmic Wonder)
DECORATIVE APPROACH: Mystical, cosmic, ethereal. Universe energy.
ACCENT TYPES: Stars, moons, planets, constellations, cosmic rays, aurora effects.
PLACEMENT: Scattered like stars, orbital patterns, galaxy-spiral arrangements.
COLOR USE: Deep space colors (deep blues, purples, blacks) with luminous accents.
REFERENCE: Astronomy charts, mystical tarot, planetarium shows, space photography.
FORBIDDEN: Earthly elements, grounded energy, heavy weight, mundane references.`,

    sunset: `🎨 SUNSET MOOD (Golden Hour)
DECORATIVE APPROACH: Warm, glowing, transitional. Magic hour energy.
ACCENT TYPES: Radiating lines, gradient halos, light ray effects, horizon lines.
PLACEMENT: Radial from top or side, warm glow emanating, sky-to-earth gradient.
COLOR USE: Warm palette (oranges, pinks, golds, warm purples). Glowing quality.
REFERENCE: Golden hour photography, vintage sunset posters, California aesthetic.
FORBIDDEN: Cool tones, harsh contrasts, midday light, stark whites.`,

    forest: `🎨 FOREST MOOD (Woodland Magic)
DECORATIVE APPROACH: Natural, layered, mysterious. Deep woods feeling.
ACCENT TYPES: Leaves, branches, ferns, moss, tree bark texture, dappled light.
PLACEMENT: Organic layering, depth through overlapping, growth from edges.
COLOR USE: Deep greens, brown tones, dappled light, mushroom colors, bark tones.
REFERENCE: Botanical illustrations, forest trail guides, fairy tale woods, nature journals.
FORBIDDEN: Desert elements, ocean references, urban aesthetic, open sky feeling.`
  };
  return fragments[mood] || "Clean, tasteful decorative accents that enhance without overwhelming.";
}

// Layout archetype fragments - MANDATORY layouts with detailed instructions
function getLayoutFragment(layout: string): string {
  const fragments: Record<string, string> = {
    "scattered-organic": `🎯 SCATTERED ORGANIC LAYOUT (Natural Placement)
STRUCTURE: Phrases distributed organically across canvas like fallen leaves or natural scatter.
MAIN AFFIRMATION: Positioned in visual center of mass (not mathematical center).
SUPPORTING PHRASES: Each phrase at slightly different angles (3-15°), varying positions.
SPACING: Irregular but balanced - no two elements too close or perfectly aligned.
VISUAL RHYTHM: Creates natural, effortless flow. No rigid structure.
REFERENCE: Think botanical specimens naturally arranged, or handwritten notes scattered on a desk.`,

    "angular-grid": `🎯 ANGULAR GRID LAYOUT (Structured Geometry)
STRUCTURE: Organized grid system with rectangular divisions and aligned text blocks.
MAIN AFFIRMATION: Occupies prominent grid section (top third or central square).
SUPPORTING PHRASES: Each in defined grid cells, aligned to invisible grid lines.
SPACING: Equal margins between grid sections. Clean, geometric breathing room.
VISUAL RHYTHM: Structured, modern, architectural. Swiss design influence.
REFERENCE: Think magazine editorial layouts, architectural blueprints, modernist posters.`,

    "arch-composition": `🎯 ARCH COMPOSITION LAYOUT (Curved Elegance)
STRUCTURE: Text arranged in gentle arcing curves, creating rainbow or bridge shapes.
MAIN AFFIRMATION: Centered at peak of arch OR base of arch structure.
SUPPORTING PHRASES: Follow arc path above or below main text in graduated curve.
SPACING: Equal arc segments, consistent distance from central radius point.
VISUAL RHYTHM: Graceful, ceremonial, classical architecture feeling.
REFERENCE: Think Art Nouveau posters, church archways, rainbow formations.`,

    "circular-orbit": `🎯 CIRCULAR ORBIT LAYOUT (Radial Energy)
STRUCTURE: Circular or radial arrangement with central focal point and orbiting elements.
MAIN AFFIRMATION: At center of composition OR at 12 o'clock position.
SUPPORTING PHRASES: Orbit around center in arc formations at equal or varied radii.
SPACING: Consistent orbital distance, phrases follow circular paths.
VISUAL RHYTHM: Dynamic, cosmic, mandala-like. Energy radiates from center.
REFERENCE: Think solar systems, mandalas, circular seals, compass roses.`,

    "vertical-cascade": `🎯 VERTICAL CASCADE LAYOUT (Waterfall Flow)
STRUCTURE: Elements stacked vertically with graduated sizes flowing downward.
MAIN AFFIRMATION: At top, largest, commanding attention first.
SUPPORTING PHRASES: Descend vertically below, each slightly smaller, creating cascade.
SPACING: Generous line spacing (1.5-2× text height), breathing room between phrases.
VISUAL RHYTHM: Hierarchical, flowing downward like water or light beams.
REFERENCE: Think waterfall flow, light rays, traditional title cards, book spines.`,

    "horizontal-sweep": `🎯 HORIZONTAL SWEEP LAYOUT (Lateral Movement)
STRUCTURE: Elements arranged horizontally across canvas with left-to-right energy.
MAIN AFFIRMATION: Left-aligned or spanning horizontally across composition.
SUPPORTING PHRASES: Flow horizontally in sequence, may be stacked in horizontal bands.
SPACING: Wide horizontal spacing, phrases span canvas width.
VISUAL RHYTHM: Cinematic, panoramic, reading flow. Wide-screen energy.
REFERENCE: Think film credits, horizon lines, panoramic landscapes, scroll banners.`,

    "asymmetric-balance": `🎯 ASYMMETRIC BALANCE LAYOUT (Dynamic Equilibrium)
STRUCTURE: Off-center placement with intentional visual balance through size and spacing.
MAIN AFFIRMATION: Positioned off-center (typically upper left or right third).
SUPPORTING PHRASES: Balanced on opposite side or distributed to create equilibrium.
SPACING: Irregular but harmonious - heavier elements offset by lighter ones.
VISUAL RHYTHM: Modern, dynamic, unexpected yet stable.
REFERENCE: Think Japanese wabi-sabi aesthetics, modern art compositions, fashion editorial.`,

    "diagonal-dynamic": `🎯 DIAGONAL DYNAMIC LAYOUT (Forward Motion)
STRUCTURE: Elements arranged along diagonal axis creating directional energy.
MAIN AFFIRMATION: Positioned on or near main diagonal line (top-left to bottom-right).
SUPPORTING PHRASES: Follow diagonal trajectory or counter-diagonal for tension.
SPACING: Elements progress along 30-45° angle, creating movement.
VISUAL RHYTHM: Energetic, modern, action-oriented. Strong directional pull.
REFERENCE: Think racing stripes, ascending/descending stairs, action movie posters.`,

    "layered-depth": `🎯 LAYERED DEPTH LAYOUT (Z-Axis Dimension)
STRUCTURE: Overlapping text layers at different scales and opacities creating depth.
MAIN AFFIRMATION: Front layer, bold, solid opacity (100%).
SUPPORTING PHRASES: Background layers at 30-60% opacity, larger or smaller scales.
SPACING: Layers overlap intentionally, creating foreground/background relationship.
VISUAL RHYTHM: Dimensional, sophisticated, editorial magazine aesthetic.
REFERENCE: Think collage art, photographic depth of field, screen-printed posters.`,

    "floating-cluster": `🎯 FLOATING CLUSTER LAYOUT (Grouped Weightlessness)
STRUCTURE: Elements grouped in intentional clusters with vast negative space around.
MAIN AFFIRMATION: Anchors primary cluster, typically center or upper third.
SUPPORTING PHRASES: Grouped near main text but with breathing room, slight separation.
SPACING: Generous whitespace (60-70% of canvas), clustered elements occupy 30-40%.
VISUAL RHYTHM: Zen, minimalist, contemplative. Silence speaks loudly.
REFERENCE: Think Japanese minimalism, luxury brand aesthetics, meditation apps.`,

    "botanical-branch": `🎯 BOTANICAL BRANCH LAYOUT (Natural Hierarchy)
STRUCTURE: Text arranged along organic branch-like paths mimicking plant growth.
MAIN AFFIRMATION: Positioned at "trunk" or primary branch origin point.
SUPPORTING PHRASES: Extend along branch paths, each on smaller "branches" or "stems".
SPACING: Organic intervals following natural growth patterns, not mechanical.
VISUAL RHYTHM: Natural, growing, botanical. Follows nature's asymmetry.
REFERENCE: Think botanical illustrations, tree diagrams, vine growth patterns.`,

    "corner-emphasis": `🎯 CORNER EMPHASIS LAYOUT (Edge Activation)
STRUCTURE: Main content positioned in one corner with elements radiating outward.
MAIN AFFIRMATION: Anchored in chosen corner (typically top-left or bottom-right).
SUPPORTING PHRASES: Radiate diagonally toward opposite corner or along edges.
SPACING: Densest in corner, progressively more sparse toward opposite area.
VISUAL RHYTHM: Unexpected, bold, contemporary. Activates negative space.
REFERENCE: Think magazine cover design, album artwork, protest posters.`,

    "wave-pattern": `🎯 WAVE PATTERN LAYOUT (Rhythmic Undulation)
STRUCTURE: Text follows sine-wave or undulating curved paths across canvas.
MAIN AFFIRMATION: Positioned at wave crest or center of largest wave.
SUPPORTING PHRASES: Follow wave paths above/below, creating rhythmic flow.
SPACING: Phrases follow natural wave intervals (wavelength), organic spacing.
VISUAL RHYTHM: Musical, flowing, oceanic. Gentle continuous motion.
REFERENCE: Think sound waves, ocean waves, Art Nouveau curves, music staff notation.`,

    "starburst-radial": `🎯 STARBURST RADIAL LAYOUT (Explosive Energy)
STRUCTURE: Elements radiate outward from central point like sunburst or explosion.
MAIN AFFIRMATION: At dead center OR forms the central "burst" shape itself.
SUPPORTING PHRASES: Radiate outward along straight rays at varied angles.
SPACING: Equal angular distribution (e.g., 30° or 45° intervals) or organic spray.
VISUAL RHYTHM: Energetic, celebratory, explosive. Energy emanates outward.
REFERENCE: Think sunburst mirrors, fireworks, vintage circus posters, spiritual mandalas.`,

    "stepping-stones": `🎯 STEPPING STONES LAYOUT (Progressive Path)
STRUCTURE: Elements create visual path across canvas like stones across water.
MAIN AFFIRMATION: First "stone" in visual path, largest and most prominent.
SUPPORTING PHRASES: Subsequent "stones" progressing across space, varied sizes.
SPACING: Irregular intervals like natural stepping stones, not evenly spaced.
VISUAL RHYTHM: Journey-like, progressive, guiding eye through composition.
REFERENCE: Think garden stepping stones, breadcrumb trails, constellation patterns.`,

    "golden-spiral": `🎯 GOLDEN SPIRAL LAYOUT (Fibonacci Flow)
STRUCTURE: Elements arranged along golden ratio spiral path from center outward.
MAIN AFFIRMATION: At spiral origin OR largest point in golden rectangle.
SUPPORTING PHRASES: Progress along spiral curve, decreasing or increasing in size.
SPACING: Follows mathematical golden ratio proportions (1:1.618).
VISUAL RHYTHM: Naturally harmonious, mathematically perfect, classical beauty.
REFERENCE: Think nautilus shells, galaxy spirals, Renaissance compositions.`,

    "border-frame": `🎯 BORDER FRAME LAYOUT (Contained Elegance)
STRUCTURE: Text arranged around canvas edges creating frame effect, center remains open.
MAIN AFFIRMATION: Top center within border frame OR in open central space.
SUPPORTING PHRASES: Distributed along borders (top, sides, bottom) or corners.
SPACING: Consistent inset from canvas edges (10-15% margin), balanced distribution.
VISUAL RHYTHM: Formal, framed, certificate-like. Contained and purposeful.
REFERENCE: Think formal certificates, book title pages, vintage labels, stamps.`
  };
  
  return fragments[layout] || `Clear hierarchical layout with main affirmation as dominant focal point.
Supporting phrases arranged with visual balance and clear readability.`;
}

// Accent fragments - REQUIRED visual elements
function getAccentFragment(accents: string[]): string {
  const accentDescriptions: Record<string, string> = {
    "minimal": "subtle single-line decorative elements, small geometric markers (dots, dashes)",
    "organic": "natural flowing shapes, soft curves, gentle wave patterns",
    "botanical": "MUST include leaves, branches, flowers, or plant-inspired decorative elements",
    "textured": "visible paper texture, subtle grain, layered transparency effects",
    "gradient-heavy": "bold color gradients, smooth color transitions between palette colors",
    "playful": "irregular dots, hand-drawn quality marks, asymmetric decorative touches",
    "celestial": "stars, moons, cosmic elements, ethereal glowing effects"
  };
  
  const requiredElements = accents.map(a => accentDescriptions[a] || a).join(", ");
  return `REQUIRED ACCENTS: ${requiredElements}
YOU MUST INCLUDE these visual elements in the design - they are not suggestions.`;
}

// Color guidance with detailed instructions
function getColorGuidance(paletteToken: DesignSpec['paletteToken']): string {
  const colorCount = paletteToken.hex.length;
  const [primary, secondary, tertiary] = paletteToken.hex;
  
  let guidance = `PALETTE: "${paletteToken.name}" - ${paletteToken.description}
AVAILABLE COLORS: ${paletteToken.hex.map((hex, i) => `Color ${i + 1}: ${hex}`).join(" | ")}

COLOR USAGE INSTRUCTIONS:
`;

  if (colorCount >= 3) {
    guidance += `- PRIMARY (${primary}): Use for main affirmation text OR dominant background
- SECONDARY (${secondary}): Use for supporting text OR accent backgrounds
- TERTIARY (${tertiary}): Use for decorative accents OR subtle elements
`;
  } else if (colorCount === 2) {
    guidance += `- PRIMARY (${primary}): Use for main affirmation and key elements
- SECONDARY (${secondary}): Use for supporting text and accents
`;
  }

  guidance += `
CONTRAST STRATEGY (${paletteToken.contrast} contrast):`;
  
  if (paletteToken.contrast === "high") {
    guidance += `
- Ensure stark contrast between text and background
- Dark text on light background OR light text on dark background
- Avoid mid-tone combinations
- Borders and dividers should be clearly visible`;
  } else if (paletteToken.contrast === "medium") {
    guidance += `
- Balance readability with aesthetic softness
- Ensure text is clearly legible but not harsh
- May use subtle tonal variations
- Test that all text meets minimum contrast ratios`;
  } else {
    guidance += `
- Soft, subtle contrasts within the same tonal family
- Ensure text is still readable through size and weight
- May layer transparencies carefully
- Compensate low contrast with larger text sizes`;
  }

  return guidance;
}

// Typography guidance with detailed specifications
function getTypographyGuidance(typography: DesignSpec['typography'], energyLevel: string): string {
  const headlineStyles: Record<string, string> = {
    display: "Large, bold display font with strong presence. Think editorial magazine headlines. High impact.",
    serif: "Classic serif typeface with timeless elegance. Traditional book-like quality. Sophisticated.",
    sans: "Clean sans-serif with modern clarity. Contemporary and straightforward. Professional.",
    script: "Flowing handwritten or calligraphic style. Personal and intimate. Elegant curves.",
    slab: "Bold slab-serif with strong geometric presence. Confident and grounded. Substantial weight."
  };

  const supportStyles: Record<string, string> = {
    sans: "Clean, highly legible sans-serif. Easy to read at smaller sizes. Modern and clear.",
    serif: "Traditional serif for refined readability. Classic book-text quality. Timeless.",
    mono: "Monospaced typewriter-style font. Technical precision. Consistent character width.",
    script: "Handwritten style for personal touch. Intimate and warm. Flowing letters."
  };

  const energyGuidance: Record<string, string> = {
    direct: `ENERGY: DIRECT & POWERFUL
- Uppercase main affirmation for maximum impact
- Wide letter spacing (0.05-0.1em) for presence
- Bold, confident weights
- Sharp, commanding presentation
- No softness or curves in letterforms`,
    
    gentle: `ENERGY: GENTLE & FLOWING  
- Mixed case for approachable warmth
- Normal letter spacing for natural flow
- Medium weights for softness
- Rounded, friendly letterforms
- Emphasis on comfort and ease`,
    
    balanced: `ENERGY: BALANCED & HARMONIOUS
- Title case or selective uppercase
- Slightly loose letter spacing (0.02-0.05em)
- Medium to semi-bold weights
- Mix of straight and curved letterforms
- Professional yet accessible`
  };

  return `HEADLINE FONT STYLE: ${typography.headline}
${headlineStyles[typography.headline] || "Professional, impactful typeface"}

SUPPORTING TEXT FONT STYLE: ${typography.support}
${supportStyles[typography.support] || "Clear, readable typeface"}

${energyGuidance[energyLevel] || energyGuidance.balanced}

HIERARCHY REQUIREMENTS:
1. Main affirmation: 48-96pt equivalent (largest element)
2. Supporting phrases: 14-24pt equivalent (significantly smaller)
3. Size ratio: Minimum 3:1, ideal 4:1 or 5:1
4. Weight contrast: Headlines heavier than supporting text
5. Line height: 1.2-1.4 for headlines, 1.4-1.6 for supporting text

SPACING & ALIGNMENT:
- Letter spacing adjusted per energy level (see above)
- Line spacing generous enough to prevent crowding
- Alignment follows layout archetype (centered, left, asymmetric, etc.)
- Optical alignment: adjust for visual balance, not just mathematical centering`;
}
