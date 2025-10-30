import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { headline, supportingLines, theme, mood, layout, palette } = await req.json();
    
    console.log('Preview generation request:', { headline, theme, mood, layout });

    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build a simplified, faster prompt for preview
    const previewPrompt = `Create a simple affirmation design preview:

MAIN HEADLINE: "${headline}"
Supporting phrases: ${supportingLines.slice(0, 3).join(', ')}

QUICK STYLE SPECS:
- Theme: ${theme}
- Mood: ${mood} 
- Layout: ${layout}
- Colors: Use ${palette.join(', ')}

DESIGN REQUIREMENTS:
- Simple, clean layout
- Main headline prominent and centered or following layout style
- Include 2-3 supporting phrases
- Minimal decorative elements
- Clean typography
- Soft background (cream/white)
- Print-ready aesthetic

Keep it simple and elegant. Focus on the text and layout rather than complex decorations.`;

    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: previewPrompt,
        size: '1024x1024',
        quality: 'low', // Fast preview generation
        output_format: 'png',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Image generation failed', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const imageB64 = data?.data?.[0]?.b64_json;

    if (!imageB64) {
      console.error('No image data in response');
      return new Response(
        JSON.stringify({ error: 'No image generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Preview image generated successfully');
    return new Response(
      JSON.stringify({ 
        imageB64: `data:image/png;base64,${imageB64}`,
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
