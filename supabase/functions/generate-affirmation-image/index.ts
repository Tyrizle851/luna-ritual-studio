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
  preview?: {
    headline: string;
    supportingLines: string[];
    paletteNames: string[];
    layoutStyle: string;
    accentElements: string;
  };
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
    const { theme, mood, text, styleSeed, preview } = body;

    console.log('Generating affirmation image:', { theme, mood, textLength: text?.length || 0, styleSeed });

    // Build the prompt for image generation
    let prompt = buildAffirmationPrompt(theme, mood, text || '', styleSeed);
    
    // Enhance prompt with preview data if provided
    if (preview) {
      prompt += `\n\nDESIGN SPECIFICATION:\n`;
      prompt += `Headline: "${preview.headline}"\n`;
      prompt += `Supporting lines: ${preview.supportingLines.join(', ')}\n`;
      prompt += `Color palette (use these exact colors): ${preview.paletteNames.join(', ')}\n`;
      prompt += `Layout: ${preview.layoutStyle}\n`;
      prompt += `Accent elements (MUST include these visible elements): ${preview.accentElements}\n`;
      prompt += `\n\nCRITICAL REQUIREMENTS:\n`;
      prompt += `- The generated image MUST visually incorporate ALL specified accent elements\n`;
      prompt += `- If arrows are mentioned, include visible arrows in the design\n`;
      prompt += `- If leaves are mentioned, include clear botanical leaf elements\n`;
      prompt += `- If geometric shapes are mentioned, include those shapes prominently\n`;
      prompt += `- Use the EXACT color palette provided - these colors must be visible in the design\n`;
      prompt += `- Match the layout description precisely\n`;
      prompt += `- All text must be readable and match the specified headline and supporting lines`;
    }
    
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

CRITICAL CANVAS REQUIREMENTS:
- EXACT ASPECT RATIO: 4:5 portrait orientation (e.g., 2000x2500 pixels, 8x10 inches)
- NO BORDERS OR MARGINS: Content must fill the entire canvas edge-to-edge
- NO WHITE SPACE AROUND EDGES: The background/design extends to all four edges
- The poster itself IS the canvas - not a poster floating on a background
- Every pixel from edge to edge is part of the designed poster

DESIGN REQUIREMENTS:
- Layout: Vertical composition perfectly filling 4:5 aspect ratio canvas
- Typography: Mix 3-5 complementary fonts (serif, sans-serif, script/handwritten)
- Font hierarchy: Vary sizes dramatically - largest 3-4x larger than smallest
- Text arrangement: Organic, non-grid layout with phrases at gentle angles (0-15 degrees)
- Internal white space: Generous breathing room within the design, professional spacing
- Background: Solid color or subtle texture that extends edge-to-edge (white/cream/themed color)

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
- Subtle paper texture or organic imperfection (part of the background, not outside it)
- Hand-drawn appearance with slight irregularity
- Asymmetrical but visually balanced
- Professional yet approachable, suitable for wall art

TECHNICAL:
- High-quality print-ready appearance at 4:5 aspect ratio
- Excellent readability and contrast
- Background fills entire canvas (no transparent areas, no surrounding borders)
- No complex gradients, print-safe colors
- No neon, no inappropriate content
- The final image should be ready to download and print without any cropping needed

Create a beautiful, handcrafted-looking poster design that occupies the FULL canvas from edge to edge - perfect for immediate printing or digital display without any additional processing.`;
}
