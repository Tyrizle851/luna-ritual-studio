// Edge function for generating final affirmation images using Lovable's Gemini gateway
import { translatePaletteToVisual } from './colorTheory.ts';

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

const THEME_AESTHETICS: Record<string, string> = {
  'confidence': 'Bold warm earth tones, strong flowing lines, grounded energy',
  'peace': 'Soft blues and creams, gentle watercolor washes, serene flowing elements',
  'focus': 'Cool grays and whites, clean lines, minimal organic accents',
  'gratitude': 'Warm golden beiges, soft botanical shadows, abundant flowing curves',
  'abundance': 'Rich earth tones, flowing gold accents, organic prosperity symbols',
  'healing': 'Soft greens and creams, gentle nature elements, soothing watercolor',
  'strength': 'Deep earthy tones, bold organic lines, grounded powerful flow',
  'joy': 'Warm sunny tones, playful flowing elements, light organic touches',
  'balance': 'Neutral earth tones, symmetrical flow, harmonious organic shapes',
  'courage': 'Bold warm tones, dynamic flowing lines, empowering organic elements',
  'clarity': 'Clean whites and soft grays, minimal flowing lines, clear space',
  'renewal': 'Fresh greens and creams, spring-like watercolor, new growth elements',
  'freedom': 'Airy blues and whites, expansive flowing lines, liberated organic flow',
  'passion': 'Warm reds and earth tones, dynamic flowing curves, energetic elements',
  'wisdom': 'Deep earth tones, elegant flowing lines, timeless organic sophistication'
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//    LUNA RITUALS MOOD SYSTEM (7 Signature + 6 Exploratory)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface MoodStyle {
  category: 'signature' | 'exploratory';
  technique: string;
  composition: string;
  elements: string;
  avoidances: string;
}

const MOOD_VISUAL_STYLES: Record<string, MoodStyle> = {
  "soft-watercolor": {
    category: 'signature',
    technique: "Abstract watercolor washes in cream/beige/gold, soft blended edges, ethereal quality",
    composition: "Gentle flowing arrangement, generous white space, text in optical center",
    elements: "Soft watercolor clouds, abstract organic shapes, muted earth tone washes (15-25% coverage)",
    avoidances: "NO hard edges, NO geometric shapes, NO cool colors, NO dark backgrounds"
  },
  "flowing-waves": {
    category: 'signature',
    technique: "Undulating organic layers in warm earth tones, modern yet organic",
    composition: "Horizontal or vertical wave flow, text integrated with waves, dynamic movement",
    elements: "Flowing wave patterns (taupe/cream/gold), layered transparency, graphic but organic",
    avoidances: "NO rigid structure, NO geometric precision, NO cool water blues (keep warm tones)"
  },
  "radiant-burst": {
    category: 'signature',
    technique: "Sun rays emanating from center, gold watercolor splashes, energetic but warm",
    composition: "Radial composition, text at center, rays extending outward, uplifting energy",
    elements: "Golden sun burst, watercolor rays, scattered gold dots/splashes, celebratory feel",
    avoidances: "NO harsh lines, NO perfect symmetry, keep organic quality in rays"
  },
  "layered-serenity": {
    category: 'signature',
    technique: "Flowing sand dune or fabric layers, soft transitions between layers, peaceful grounded",
    composition: "Horizontal layering, heavier elements at bottom, text floats above layers",
    elements: "Organic flowing layers (sand dunes, fabric, mist), soft gradients between layers",
    avoidances: "NO sharp edges between layers, NO geometric layering, keep organic flow"
  },
  "botanical-whisper": {
    category: 'signature',
    technique: "Delicate botanical silhouettes with warm earth tones, subtle plant accents",
    composition: "Text centered, delicate botanicals frame corners or sides, airy spacious",
    elements: "Thin botanical line drawings (eucalyptus, pampas, ferns), soft watercolor shadows",
    avoidances: "NO heavy botanicals, NO realistic flowers, keep silhouettes delicate"
  },
  "golden-glow": {
    category: 'signature',
    technique: "Metallic gold shimmer effect, warm premium luxury, sophisticated elegance",
    composition: "Minimal composition, text is hero, subtle gold accents at edges or behind text",
    elements: "Gold foil effect (metallic shimmer), soft gold haze/glow, premium luxury feel",
    avoidances: "NO excessive gold (keep at 10-15%), NO gaudy sparkles, maintain sophistication"
  },
  "celestial-light": {
    category: 'signature',
    technique: "Moon, stars, but LIGHT backgrounds with warm cream/gold, ethereal but airy",
    composition: "Celestial elements subtle and small (moon at 10% opacity), text is primary",
    elements: "Crescent moon silhouette, small star scatter (5-7 stars), soft gold glow around elements",
    avoidances: "NO dark backgrounds (keep light cream), NO heavy celestial, keep ethereal and soft"
  },
  "zen-minimal": {
    category: 'exploratory',
    technique: "True minimalism, single thin line accent, 95% negative space, zen simplicity",
    composition: "Vast white space, text is sole focus, ONE minimal accent (line or dot)",
    elements: "Single thin line (1-2px) in warm brown or subtle gray, or small geometric dot",
    avoidances: "NO multiple elements, NO botanicals, NO watercolor washes - pure minimalism"
  },
  "cool-serenity": {
    category: 'exploratory',
    technique: "Soft blues and cool grays, calm coastal feeling, airy and spacious",
    composition: "Horizontal flow suggesting horizon, text in upper third, open sky below",
    elements: "Soft blue/gray watercolor washes, abstract gentle shapes, cool color palette",
    avoidances: "NO warm earth tones here, embrace cool blues/grays for contrast to signature styles"
  },
  "geometric-structure": {
    category: 'exploratory',
    technique: "Clean grid system, thin geometric lines, modern editorial, structured",
    composition: "3×3 or 4×5 invisible grid, text aligned to grid nodes, mathematical precision",
    elements: "Thin geometric accent lines (1-2px), grid overlay at 5% opacity, angular shapes",
    avoidances: "NO organic shapes, NO watercolor, NO curves - embrace geometry"
  },
  "bold-modern": {
    category: 'exploratory',
    technique: "High contrast bold typography, dramatic, powerful, editorial punch",
    composition: "Large commanding text (40% of vertical space), minimal accents, strong hierarchy",
    elements: "Bold modern sans-serif or thick serif, high contrast colors, graphic impact",
    avoidances: "NO soft elements, NO excessive decoration - bold simplicity"
  },
  "vibrant-energy": {
    category: 'exploratory',
    technique: "Saturated colors, playful geometric accents, energetic composition, modern pop",
    composition: "Asymmetric dynamic layout, colorful focal points, energetic visual weight",
    elements: "Bold color blocks, playful dots/dashes, gradient fills, vibrant palette",
    avoidances: "NO muted tones here, embrace saturation and energy"
  },
  "mystical-deep": {
    category: 'exploratory',
    technique: "Deep backgrounds (midnight blue, deep purple), ethereal glow effects, mystical",
    composition: "Dark atmospheric background, text glows softly, constellation patterns",
    elements: "Deep gradients (navy to purple), constellation lines, crescent moon, star scatter, text glow",
    avoidances: "NO light backgrounds here, embrace darkness and mystery"
  }
};

function getMoodVisualStyle(mood: string): MoodStyle {
  return MOOD_VISUAL_STYLES[mood] || MOOD_VISUAL_STYLES['soft-watercolor'];
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
        JSON.stringify({ error: 'Lovable API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Read request body with better error handling
    let body: GenerateRequest;
    try {
      const textBody = await req.text();
      if (!textBody) {
        throw new Error('Empty request body');
      }
      body = JSON.parse(textBody);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid request body', detail: parseError instanceof Error ? parseError.message : String(parseError) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { designSpec } = body;

    if (!designSpec) {
      console.error('Missing designSpec in request');
      return new Response(
        JSON.stringify({ error: 'Missing designSpec in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating final affirmation image with designSpec:', JSON.stringify(designSpec, null, 2));

    // Build watercolor-focused prompt
    const prompt = buildWatercolorPrompt(designSpec);

    console.log('Calling Lovable Gemini API for final generation...');

    // Call Lovable's Gemini gateway
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-pro-image-preview',
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
      console.error('Lovable Gemini API error:', aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Image generation failed', details: errorText }),
        { status: aiResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error('No image data in Lovable response');
      return new Response(
        JSON.stringify({ error: 'No image generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the image and convert to base64
    console.log('Fetching generated image...');
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));

    console.log('Successfully generated final image');

    return new Response(
      JSON.stringify({
        imageB64: base64,  // Return JUST base64 without prefix
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

// Build watercolor-focused prompt for high quality output
function buildWatercolorPrompt(spec: DesignSpec): string {
  const themeAesthetic = THEME_AESTHETICS[spec.theme] || THEME_AESTHETICS['peace'];
  const moodStyle = getMoodVisualStyle(spec.mood);

  // Translate palette hex codes into rich visual direction
  const colorGuidance = translatePaletteToVisual(
    spec.paletteToken.hex,
    spec.theme,
    spec.mood
  );

  return `Create a PRINT-QUALITY affirmation design for professional 8×10" printing:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TEXT (CRITICAL PRIORITY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"${spec.mainAffirmation}"

TYPOGRAPHY REQUIREMENTS:
• Font: ${spec.typography.headline} (or similar high-end editorial font)
• Reference fonts: Cormorant Garamond, Playfair Display, Freight Display
• Size: Large enough to read from 3 feet away when printed 8×10"
• Text color: Choose based on color strategy below for optimal contrast
• Letter-spacing: Slightly loose for elegance (+0.02em to +0.05em)
• Line height: 1.4-1.6 for multi-word phrases
• Alignment: According to mood composition style below
• Text must be RAZOR SHARP and PERFECTLY READABLE - this is non-negotiable
• NO artistic distortion, warping, or perspective effects on letters
• Text occupies 25-40% of vertical space with generous margins

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        AESTHETIC & BRAND MOOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Theme Energy: ${themeAesthetic}
Layout Style: ${spec.layoutArchetype}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VISUAL STYLE (${moodStyle.category === 'signature' ? 'LUNA SIGNATURE' : 'EXPLORATORY'})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNIQUE:
${moodStyle.technique}

COMPOSITION:
${moodStyle.composition}

VISUAL ELEMENTS:
${moodStyle.elements}

CRITICAL AVOIDANCES:
${moodStyle.avoidances}

${colorGuidance}

Brand References (Luna Rituals Aesthetic):
• Anthropologie home décor section - organic, feminine, curated
• Rifle Paper Co. - editorial watercolor with restraint
• Modern wellness studios - serene, upscale, Instagram-worthy
• Artisan paper goods shops - handcrafted quality, attention to detail
• High-end yoga studios - peaceful, sophisticated, intentional

Quality Bar: This should look like a $45-65 art print from a boutique gallery

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       WATERCOLOR PAINTING TECHNIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Render as if hand-painted by a professional watercolor artist on 300gsm cotton paper:

• Wet-on-wet technique: soft bleeding, natural pigment diffusion
• Layered washes: transparent overlays creating depth (NOT flat color fills)
• Organic edges: irregular, feathered boundaries (no hard vector lines)
• Natural imperfections: granulation, blooms, subtle color pooling
• Paper texture: visible tooth of cold-press watercolor paper
• Pigment behavior: authentic watercolor physics (settles in paper grain)
• Brush quality: visible subtle brushstrokes, NOT digital airbrush smoothness

IMPORTANT: Should look indistinguishable from a scanned original watercolor painting

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      COMPOSITION & SPATIAL LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dimensions: 2400×3000 pixels (8×10" at 300 DPI)
Aspect Ratio: Exactly 4:5 portrait
Print Safe Area: Keep all important elements 0.25" from edges

Layout Principles:
• Golden ratio composition (1.618:1 spatial division)
• Text positioned according to mood composition style
• 60-75% negative space (breathing room is ESSENTIAL)
• Visual weight: Heavier decorative elements at bottom
• Asymmetric balance for organic feel (not rigidly centered)
• No borders, frames, or confining rectangles - let design breathe
• Elements flow naturally, guiding eye to text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         PRINT QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Technical Output:
• Resolution: 300 DPI (print-ready)
• Dimensions: 2400×3000 pixels exact
• Color space: RGB (will be converted to CMYK for print)
• Text rendering: Crisp, anti-aliased, professional-grade
• File quality: No compression artifacts or pixelation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         CRITICAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Text must be 100% readable (no distortion, blur, or overlap)
✓ Follow mood style EXACTLY - don't mix styles
✓ Follow color strategy PRECISELY - use specified coverage and roles
✓ Premium quality suitable for selling as digital download ($45-65 value)
✓ Should look like a $45-65 art print from a boutique gallery
• Sharpness: Text edges must be clean when printed actual size

Quality Benchmark - Should Match:
• A professionally printed art piece from Minted or Artifact Uprising
• Editorial design from Kinfolk or Cereal magazine
• Boutique wedding stationery ($8-12 per card quality level)
• Museum gift shop art prints ($40-60 price point)
• Something a professional interior designer would specify for a client

Final Check: Would this look professionally printed and worth framing in a $3000+ home?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Output: 2400×3000px, 4:5 portrait, 300 DPI print-ready, gallery-quality watercolor design`;
}
