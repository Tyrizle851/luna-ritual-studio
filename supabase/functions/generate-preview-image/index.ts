import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { headline, theme } = await req.json();

    console.log('Preview generation request:', { headline, theme });

    if (!lovableApiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const themeAesthetic = THEME_AESTHETICS[theme] || THEME_AESTHETICS['peace'];

    // Simplified, high-quality prompt focused on watercolor aesthetic
    const prompt = `Create an elegant watercolor affirmation design with these specifications:

AFFIRMATION TEXT (primary focus):
"${headline}"

AESTHETIC STYLE:
- Watercolor painting aesthetic with soft, organic washes
- Hand-painted feel with flowing, natural elements
- ${themeAesthetic}
- Sophisticated and gallery-worthy quality

COMPOSITION:
- Portrait orientation (suitable for 8x10" or 11x14" print)
- Centered text with generous breathing room
- Elegant serif typography, well-spaced and readable
- Single affirmation text only (no additional phrases)

VISUAL ELEMENTS:
- Soft watercolor background washes in theme colors
- Organic flowing lines that add graceful movement
- Subtle botanical shadows or abstract organic shapes
- Hand-drawn quality with natural imperfections

COLOR PALETTE:
- Soft, muted earth tones (creams, beiges, soft browns)
- Watercolor transparency and layering effects
- High contrast between text and background for readability
- Natural, organic color harmonies

ARTISTIC QUALITY:
- Professional, print-ready quality
- Modern minimalist meets organic artistry
- Clean, uncluttered composition
- Timeless and sophisticated aesthetic
- No harsh digital effects or gradients
- No overcrowding - emphasize negative space

TECHNICAL:
- High resolution, print-ready
- Portrait orientation
- Professional typography
- Gallery-quality finish

Create a design that feels handcrafted, peaceful, and professionally refined.`;

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

    // Fetch the image and convert to base64
    console.log('Fetching generated image...');
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
    const imageB64 = `data:image/png;base64,${base64}`;

    console.log('Preview image generated successfully');
    return new Response(
      JSON.stringify({
        imageB64,
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
