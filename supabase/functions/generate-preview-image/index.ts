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

    // High-quality prompt optimized for Instagram-worthy watercolor aesthetic
    const prompt = `Create a premium watercolor affirmation design for Instagram and digital frames:

━━━ TEXT (MOST IMPORTANT) ━━━
"${headline}"

Requirements:
• Text must be PERFECTLY readable - no artistic distortion of letters
• Classic editorial serif font (like Cormorant, Playfair, or Crimson)
• Large, well-kerned letters with generous line height
• Text color: Deep charcoal (#2D2D2D) or warm brown (#3A2817)
• Center-aligned with optical balance
• Text occupies 25-35% of vertical space (ample breathing room)

━━━ AESTHETIC & MOOD ━━━
${themeAesthetic}

Style References:
• High-end Instagram aesthetic (Pinterest-worthy quality)
• Artisan stationery from boutique paper goods shops
• Anthropologie or Rifle Paper Co. design language
• Organic, feminine, editorial sophistication

━━━ WATERCOLOR TECHNIQUE ━━━
• Authentic wet-on-wet watercolor bleeding and blending
• Soft color transitions with natural pigment pooling
• Delicate layering with transparency (NOT opaque blocks)
• Hand-painted imperfections: irregular edges, subtle blooms
• Texture should look like real cotton paper (NOT digital smooth)

━━━ COMPOSITION & LAYOUT ━━━
• Portrait 4:5 ratio (512×640px) - perfect for Instagram
• Golden ratio composition with text in upper two-thirds
• Generous white/cream negative space (60-70% of design)
• Visual weight balanced: heavier elements at bottom
• No borders, frames, or hard edges - organic flow only

━━━ COLOR PALETTE ━━━
Primary: Soft creams, warm whites, natural beiges (#FAF7F2, #F5EFE7)
Accents: Muted earth tones - dusty rose, sage green, soft terracotta, warm taupe
Avoid: Pure white, saturated colors, neon, black backgrounds
Technique: Use 2-3 colors max, with one dominant and others as subtle accents

━━━ VISUAL ELEMENTS (Subtle & Minimal) ━━━
Choose ONE of these approaches:
1. Abstract watercolor washes (asymmetric, flowing shapes)
2. Delicate botanical silhouettes (stems, leaves, minimal florals)
3. Organic flowing lines (calligraphic brushstrokes)

Keep elements:
• Small and understated (occupy <20% of total space)
• Behind or around text (never overlapping letters)
• Monochromatic or analogous colors only
• Soft edges with natural watercolor bleeding

━━━ AVOID (Critical) ━━━
✗ Clipart, stock photo elements, or digital illustrations
✗ Hard edges, perfect circles, or geometric precision
✗ Overlay textures, filters, or Photoshop effects
✗ Multiple fonts or decorative script that reduces readability
✗ Busy backgrounds that compete with text
✗ Artificial gradients or digital color transitions
✗ Any text smaller than highly readable size

━━━ QUALITY BENCHMARK ━━━
This should look like:
• A $30 art print from an independent artist on Etsy
• Professional editorial design for a wellness magazine
• Something worth saving to a "Design Inspiration" Pinterest board
• Ready to frame and display in a modern, minimalist home

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
