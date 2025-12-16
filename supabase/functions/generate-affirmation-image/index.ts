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
        model: 'google/gemini-2.0-flash-exp',
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
    const imageB64 = `data:image/png;base64,${base64}`;

    console.log('Successfully generated final image');

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

// Build watercolor-focused prompt for high quality output
function buildWatercolorPrompt(spec: DesignSpec): string {
  const themeAesthetic = THEME_AESTHETICS[spec.theme] || THEME_AESTHETICS['peace'];

  // Use palette colors
  const colorPalette = spec.paletteToken.hex.join(', ');

  return `Create an elegant watercolor affirmation design with premium gallery-quality:

AFFIRMATION TEXT (primary focus):
"${spec.mainAffirmation}"

AESTHETIC STYLE:
- Watercolor painting aesthetic with soft, organic washes
- Hand-painted feel with flowing, natural elements
- ${themeAesthetic}
- Sophisticated and gallery-worthy quality
- Modern minimalist meets organic artistry

COMPOSITION:
- Portrait orientation (suitable for 8x10" or 11x14" print)
- Centered text with generous breathing room
- Elegant serif typography, well-spaced and highly readable
- Single affirmation text only (focus on main message)
- Layout style: ${spec.layoutArchetype}

VISUAL ELEMENTS:
- Soft watercolor background washes in theme colors
- Organic flowing lines that add graceful movement
- Subtle botanical shadows or abstract organic shapes
- Hand-drawn quality with natural imperfections
- Accent elements: ${spec.accentSet.slice(0, 3).join(', ')}

COLOR PALETTE:
Use these colors: ${colorPalette}
- Soft, muted earth tones (creams, beiges, soft browns)
- Watercolor transparency and layering effects
- High contrast between text and background for readability
- Natural, organic color harmonies

ARTISTIC QUALITY:
- Professional, print-ready quality at 300 DPI
- Clean, uncluttered composition with emphasis on negative space
- Timeless and sophisticated aesthetic
- No harsh digital effects or gradients
- No overcrowding - prioritize breathing room
- Gallery-quality finish

TYPOGRAPHY:
- Font style: ${spec.typography.headline}
- Large, elegant, well-spaced letters
- Professional serif or elegant sans-serif
- High readability and sophistication

TECHNICAL SPECIFICATIONS:
- High resolution, print-ready
- Portrait orientation (3:4 aspect ratio)
- Professional quality typography
- Gallery-quality finish
- Suitable for framing and professional printing

Create a design that feels handcrafted, peaceful, and professionally refined - like something you'd find in a high-end boutique or art gallery.`;
}
