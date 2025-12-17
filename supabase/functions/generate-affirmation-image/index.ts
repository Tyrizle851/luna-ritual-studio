// Edge function for generating final affirmation images using Lovable's Gemini gateway

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

  // Use palette colors
  const colorPalette = spec.paletteToken.hex.join(', ');

  return `Create a PRINT-QUALITY watercolor affirmation design for professional 8×10" printing:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TEXT (CRITICAL PRIORITY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"${spec.mainAffirmation}"

TYPOGRAPHY REQUIREMENTS:
• Font: ${spec.typography.headline} (or similar high-end editorial serif)
• Reference fonts: Cormorant Garamond, Playfair Display, Freight Display
• Size: Large enough to read from 3 feet away when printed 8×10"
• Text color: ${spec.paletteToken.hex[0]} or deep warm brown (#3A2817)
• Letter-spacing: Slightly loose for elegance (+0.02em to +0.05em)
• Line height: 1.4-1.6 for multi-word phrases
• Alignment: Optically centered (accounting for visual weight, not just mathematical center)
• Text must be RAZOR SHARP and PERFECTLY READABLE - this is non-negotiable
• NO artistic distortion, warping, or perspective effects on letters
• Text occupies 25-40% of vertical space with generous margins

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        AESTHETIC & BRAND MOOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Theme Energy: ${themeAesthetic}
Layout Style: ${spec.layoutArchetype}

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
• Text positioned in upper or middle third (rule of thirds)
• 60-75% negative space (breathing room is ESSENTIAL)
• Visual weight: Heavier decorative elements at bottom
• Asymmetric balance for organic feel (not rigidly centered)
• No borders, frames, or confining rectangles - let design breathe
• Elements flow naturally, guiding eye to text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          COLOR PALETTE (EXACT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User-Selected Colors: ${colorPalette}
Accent Elements: ${spec.accentSet.slice(0, 2).join(', ')}

Application Guidelines:
• Background: Soft cream/warm white (#FAF7F2 to #F5EFE7) - 70% of design
• Primary watercolor: Use 1-2 colors from palette as main washes
• Accent touches: Subtle hints of complementary tones
• Text color: Ensure 7:1 contrast ratio with background (WCAG AAA)
• Saturation: Keep muted and sophisticated (60-75% desaturated from pure hues)
• Color harmony: Analogous or monochromatic schemes only
• NO pure white, pure black, or highly saturated colors

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VISUAL ELEMENTS (Minimal & Refined)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Select ONE primary approach (don't mix):

Option A - Abstract Watercolor Washes:
• Organic, asymmetric shapes flowing from one corner
• Transparent layers creating subtle depth
• Occupy 15-25% of composition (background element only)

Option B - Botanical Elements:
• Delicate stem or leaf silhouettes (minimalist line drawings)
• Subtle watercolor shadows behind botanical forms
• Monochromatic or single accent color
• Small scale, positioned to frame text without touching it

Option C - Flowing Gestural Lines:
• Calligraphic brushstrokes suggesting movement
• Thin, elegant lines in muted accent color
• Abstract and non-literal (no recognizable shapes)

All elements must:
• Stay BEHIND or BESIDE text (never overlapping letters)
• Be understated - text is the hero
• Have soft, watercolor-quality edges (no vector crispness)
• Complement theme without being literal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        STRICT AVOIDANCE LIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DO NOT INCLUDE:
✗ Clipart, icons, or stock imagery
✗ Perfect geometric shapes (circles, triangles, grids)
✗ Digital effects (drop shadows, glows, bevels, filters)
✗ Multiple fonts or decorative scripts
✗ Small text, subheadings, or additional copy
✗ Busy patterns that compete with main text
✗ Artificial gradients or Photoshop-style color transitions
✗ Photo-realistic elements or 3D rendering
✗ Borders, corner flourishes, or ornamental frames
✗ Text on curved paths or with perspective distortion
✗ Oversized design elements that dwarf the text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         PRINT QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Technical Output:
• Resolution: 300 DPI (print-ready)
• Dimensions: 2400×3000 pixels exact
• Color space: RGB (will be converted to CMYK for print)
• Text rendering: Crisp, anti-aliased, professional-grade
• File quality: No compression artifacts or pixelation
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
