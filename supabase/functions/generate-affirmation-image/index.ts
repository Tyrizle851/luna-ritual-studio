// Edge function for generating affirmation images using OpenAI

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateRequest {
  theme: string;
  mood: string;
  text: string;
  styleSeed?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: GenerateRequest = await req.json();
    const { theme, mood, text, styleSeed } = body;

    console.log('Generating affirmation image:', { theme, mood, textLength: text?.length || 0, styleSeed });

    // Build the prompt for image generation
    const prompt = buildAffirmationPrompt(theme, mood, text || '', styleSeed);
    
    console.log('Calling OpenAI with prompt length:', prompt.length);

    // Call OpenAI's image generation API
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: prompt,
        size: '1024x1024',
        n: 1,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error:', openaiResponse.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Image generation failed', 
          detail: `OpenAI returned ${openaiResponse.status}`,
          message: errorText 
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openaiData = await openaiResponse.json();
    const imageB64 = openaiData?.data?.[0]?.b64_json;

    if (!imageB64) {
      console.error('No image data in OpenAI response');
      return new Response(
        JSON.stringify({ error: 'No image returned from API' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

function buildAffirmationPrompt(theme: string, mood: string, userText: string, styleSeed?: string): string {
  const themeDescriptions: Record<string, string> = {
    'calm-morning': 'Peaceful sunrise energy, gentle awakening, soft optimism, fresh starts',
    'focus': 'Sharp, clear, purposeful energy, clarity, determination, mental strength',
    'gratitude': 'Warm, abundant, heart-centered energy, thankfulness, appreciation, love',
    'confidence': 'Bold, empowered, strong energy, self-belief, courage, capability',
    'peace': 'Serene, calming, meditative energy, tranquility, balance, inner calm',
    'custom': 'Personalized affirmation based on user intent',
  };

  const moodStyles: Record<string, string> = {
    'minimalist': 'Black and white with single accent color, clean, modern',
    'bohemian': 'Terracotta, mustard, sage, warm cream, organic textures',
    'modern-serif': 'Charcoal, blush, ivory, gold accents, elegant typography',
    'coastal': 'Soft blue, sandy beige, sea foam, white, airy and fresh',
    'earthy': 'Forest green, clay, cream, rust, botanical elements',
  };

  const themeDesc = themeDescriptions[theme] || themeDescriptions['peace'];
  const moodStyle = moodStyles[mood] || moodStyles['minimalist'];

  return `Create a high-quality, printable motivational affirmation poster with these specifications:

THEME & ENERGY: ${themeDesc}
VISUAL STYLE: ${moodStyle}
USER INTENT: ${userText || 'General positive affirmation'}
${styleSeed ? `STYLE SEED: ${styleSeed} (use for consistent artistic direction)` : ''}

DESIGN REQUIREMENTS:
- Layout: Vertical composition (portrait orientation, 8x10" suitable)
- Typography: Mix 3-5 complementary fonts (serif, sans-serif, script/handwritten)
- Font hierarchy: Vary sizes dramatically - largest 3-4x larger than smallest
- Text arrangement: Organic, non-grid layout with phrases at gentle angles (0-15 degrees)
- White space: Generous breathing room, professional spacing

CONTENT:
- 1 main affirmation (2-4 words, bold, uppercase, powerful)
- 8-12 supporting short affirmations about ${themeDesc}
- Mix of self-belief, grounding, calm assertions, forward motion

DECORATIVE ELEMENTS:
- 4-8 delicate accent elements: botanical line art, geometric shapes, or organic flourishes
- Hand-drawn, organic feel (not overly digital/perfect)
- Elements enhance but don't overwhelm

ARTISTIC STYLE:
- Modern farmhouse meets minimalist aesthetic
- Subtle paper texture or organic imperfection
- Hand-drawn appearance with slight irregularity
- Asymmetrical but visually balanced
- Professional yet approachable

TECHNICAL:
- 300 DPI print-ready quality
- Excellent readability and contrast
- Clean background (white/cream) or subtle texture
- No complex gradients, print-safe colors
- No neon, no inappropriate content

Create a design that feels handcrafted, intentional, and premium - suitable for wall art or digital download.`;
}
