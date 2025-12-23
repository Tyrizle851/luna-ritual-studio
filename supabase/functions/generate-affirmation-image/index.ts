// Edge function for generating final affirmation images using Lovable's Gemini gateway
// Now accepts prompt directly from frontend

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateRequest {
  prompt: string;
  headline?: string;
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

    const { prompt, headline } = body;

    if (!prompt) {
      console.error('Missing prompt in request');
      return new Response(
        JSON.stringify({ error: 'Missing prompt in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating final affirmation image with prompt length:', prompt.length);

    // Enhance the prompt with print-quality requirements including full-bleed
    const enhancedPrompt = `${prompt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         CRITICAL DESIGN REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FULL BLEED DESIGN (MANDATORY):
• The artwork MUST extend edge-to-edge, filling the ENTIRE canvas
• NO white borders, NO margins, NO empty space around any edges
• Background elements, colors, textures, and design elements MUST reach all four edges
• The design should look like it was intentionally cropped from a larger piece

PRINT QUALITY STANDARDS:
• Resolution: 300 DPI (print-ready)
• Dimensions: 2400×3000 pixels exact (8×10" format)
• Aspect Ratio: Exactly 4:5 portrait
• Text rendering: Crisp, anti-aliased, professional-grade
• File quality: No compression artifacts or pixelation
• Text must be RAZOR SHARP and perfectly readable

Quality Benchmark - Should Match:
• A professionally commissioned fine art piece worth $50,000+
• Editorial design from world-class publications (Kinfolk, Cereal, Apartamento)
• Museum-quality art prints sold in prestigious galleries
• Something a renowned interior designer would specify for a luxury client
• Work that would be featured in Architectural Digest or Elle Decor

Final Check: Would this be gallery-worthy, museum-quality, and valued as fine art?`;

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
            content: enhancedPrompt
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
    
    // Chunked base64 conversion to avoid stack overflow
    const uint8Array = new Uint8Array(imageBuffer);
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    const base64 = btoa(binary);

    console.log('Successfully generated final image');

    return new Response(
      JSON.stringify({
        imageB64: base64,
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
