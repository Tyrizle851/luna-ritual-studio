import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { translatePaletteToVisual } from './colorTheory.ts';

const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //     LUNA SIGNATURE STYLES (7)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //      EXPLORATORY STYLES (6)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { headline, theme, mood, palette } = await req.json();

    console.log('Preview generation request:', { headline, theme, mood, palette });

    if (!lovableApiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const themeAesthetic = THEME_AESTHETICS[theme] || THEME_AESTHETICS['peace'];
    const moodStyle = getMoodVisualStyle(mood || 'soft-watercolor');

    // Translate palette hex codes into rich visual direction
    const colorGuidance = palette && palette.length > 0
      ? translatePaletteToVisual(palette, theme, mood || 'soft-watercolor')
      : `No custom palette - use ${theme} theme colors with ${mood || 'soft-watercolor'} mood aesthetic`;

    // High-quality prompt optimized for Instagram-worthy aesthetic
    // Dynamically built based on mood + theme + color theory
    const prompt = `Create a premium affirmation design for Instagram and digital frames:

━━━ TEXT (MOST IMPORTANT) ━━━
"${headline}"

Requirements:
• Text must be PERFECTLY readable - no artistic distortion of letters
• Classic editorial font (serif for signature styles, can be modern sans for exploratory)
• Large, well-kerned letters with generous line height
• Text color: Choose based on background (high contrast for readability)
• Aligned according to mood composition style
• Text occupies 25-35% of vertical space (ample breathing room)

━━━ AESTHETIC & MOOD ━━━
Theme Energy: ${themeAesthetic}

━━━ VISUAL STYLE (${moodStyle.category === 'signature' ? 'LUNA SIGNATURE' : 'EXPLORATORY'}) ━━━

TECHNIQUE:
${moodStyle.technique}

COMPOSITION:
${moodStyle.composition}

VISUAL ELEMENTS:
${moodStyle.elements}

CRITICAL AVOIDANCES:
${moodStyle.avoidances}

${colorGuidance}

━━━ LAYOUT ━━━
• Portrait 4:5 ratio (512×640px) - perfect for Instagram
• Visual weight balanced according to mood composition
• Generous negative space (60-70% for signature, can be less for exploratory)
• No borders or frames unless specified in mood style

━━━ QUALITY BENCHMARK ━━━
This should look like:
• A $30-50 art print from an independent artist on Etsy
• Professional editorial design for a wellness magazine
• Something worth saving to a "Design Inspiration" Pinterest board
• Ready to frame and display in a modern home

━━━ CRITICAL REQUIREMENTS ━━━
✓ Text must be 100% readable (no distortion, blur, or overlap)
✓ Follow mood style EXACTLY - don't mix styles
✓ Follow color strategy PRECISELY - use specified coverage and roles
✓ Premium quality suitable for selling as digital download
✓ Instagram-worthy aesthetic

Output: 512×640px, 4:5 portrait, Instagram-optimized quality`;


    console.log('Calling Lovable Gemini API...');

    // Use Lovable's gateway for Gemini image generation
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable Gemini API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Image generation failed', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    // Extract image URL from Lovable's response format
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error('No image data in response:', data);
      return new Response(
        JSON.stringify({ error: 'No image generated', details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the image and convert to base64 (chunked to avoid stack overflow)
    console.log('Fetching generated image...');
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const uint8Array = new Uint8Array(imageBuffer);
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    const base64 = btoa(binary);

    console.log('Preview image generated successfully');
    return new Response(
      JSON.stringify({
        imageB64: base64,  // Return JUST base64 without prefix
        message: 'Preview generated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-preview-image function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
