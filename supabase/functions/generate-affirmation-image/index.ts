// Edge function for generating affirmation images using Lovable AI

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
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.error('LOVABLE_API_KEY not configured');
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

  return `Generate a high-quality, printable motivational affirmation poster design with these specifications:

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
- 1 main affirmation (2-4 words, bold, uppercase, powerful) about ${themeDesc}
- 8-12 supporting short affirmations mixing self-belief, grounding, calm assertions, forward motion
- All text should be clearly readable and well-composed

DECORATIVE ELEMENTS:
- 4-8 delicate accent elements: botanical line art, geometric shapes, or organic flourishes
- Hand-drawn, organic feel (not overly digital/perfect)
- Elements enhance but don't overwhelm the text

ARTISTIC STYLE:
- Modern farmhouse meets minimalist aesthetic
- Subtle paper texture or organic imperfection
- Hand-drawn appearance with slight irregularity
- Asymmetrical but visually balanced
- Professional yet approachable, suitable for wall art

TECHNICAL:
- High-quality print-ready appearance
- Excellent readability and contrast
- Clean background (white/cream) or subtle texture
- No complex gradients, print-safe colors
- No neon, no inappropriate content

Create a beautiful, handcrafted-looking design that feels intentional and premium - perfect for printing or digital display.`;
}
