import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const THEME_CONTEXT: Record<string, string> = {
  'calm-morning': 'Evoke peaceful sunrise energy, gentle awakening, soft optimism. Include phrases about fresh starts, mindful beginnings, peaceful energy.',
  'focus': 'Sharp, clear, purposeful energy. Phrases about clarity, determination, goal-achievement, mental strength.',
  'gratitude': 'Warm, abundant, heart-centered energy. Phrases about thankfulness, appreciation, abundance, love.',
  'confidence': 'Bold, empowered, strong energy. Phrases about self-belief, courage, strength, capability.',
  'peace': 'Serene, calming, meditative energy. Phrases about tranquility, balance, inner calm, letting go.',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { headline, supportingLines, theme, mood, layout, palette, accentElements } = await req.json();
    
    // Build elegant aesthetic variations
    const aestheticVariations = buildAestheticVariations();
    
    console.log('Preview generation request:', { headline, theme, mood, layout });

    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 35% chance of gradient
    const useGradient = Math.random() < 0.35;
    const themeContext = THEME_CONTEXT[theme] || THEME_CONTEXT['peace'];

    const gradientInstructions = useGradient 
      ? `

GRADIENT TEXT EFFECT (CRITICAL):
- Apply a smooth, elegant gradient to the MAIN HEADLINE text only
- The gradient should flow across ALL WORDS in the headline consistently
- Use 2-3 harmonious colors from the chosen palette
- Gradient direction: typically left-to-right or top-to-bottom
- Keep gradient subtle and sophisticated (avoid harsh transitions)
- Ensure text remains highly readable
- Supporting phrases should remain solid color (no gradient)
`
      : `

TEXT COLOR:
- Use solid colors for all text
- No gradients on text
`;

    // Build detailed prompt matching the final generation style
    const previewPrompt = `Create a high-quality, printable motivational affirmation design with the following specifications:

THEME & CONCEPT:
- Primary theme: ${theme}
- Mood/Style: ${mood}
- Layout style: ${layout}

DESIGN REQUIREMENTS:
- Layout: Vertical composition (portrait orientation, suitable for 8x10" or similar)
- Typography: Mix 3-4 complementary fonts (serif, sans-serif, script/handwritten styles)
- Font hierarchy: Vary sizes dramatically - largest phrase should be 3-4x larger than smallest
- Text arrangement: ${layout}
- White space: Generous breathing room, not overcrowded

COLOR PALETTE:
Primary colors to use: ${palette.join(', ')}
- Background: Use the FIRST color from the palette (${palette[0]}) as the main background - this is the calmest, lightest tone
- Text and accents: Use the remaining colors for typography and decorative elements
- Ensure excellent readability with high contrast between background and text

DECORATIVE ELEMENTS:
Include 3-5 delicate accent elements: ${accentElements}
- Elements should enhance, not overwhelm
- Style: Hand-drawn, organic feel (avoid overly perfect/digital look)

AFFIRMATION CONTENT:
Main Headline: "${headline}"
Supporting phrases (include 3-4 of these):
${supportingLines.slice(0, 4).map((line: string) => `- ${line}`).join('\n')}
${gradientInstructions}
ARTISTIC STYLE:
- Overall aesthetic: Modern farmhouse meets minimalist inspiration
- Texture: Subtle, slight paper texture or organic imperfection
- Line quality: Hand-drawn appearance, slight irregularity
- Balance: Asymmetrical but visually balanced
- Professional yet approachable, commercial-quality

TECHNICAL SPECIFICATIONS:
- Resolution: High quality
- Format: Print-ready quality
- Background: Clean (white/cream) or subtle texture
- Contrast: Ensure excellent readability

THEME CONTEXT:
${themeContext}

AESTHETIC VARIATIONS:
${aestheticVariations}

Base aesthetic (CRITICAL - always apply):
Premium minimal natural aesthetic, modern editorial calm, clean negative space, no harsh gradients, no clutter, no graphic filters, no obvious patterns, quiet luxury.

Focus on creating a balanced, elegant design that feels authentic and ready to print.`;

    console.log('Calling OpenAI API for preview...');
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
        quality: 'medium', // Better quality while still being faster than high
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
      console.error('No image data in response:', data);
      return new Response(
        JSON.stringify({ error: 'No image generated', details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

// Build elegant aesthetic variations
function buildAestheticVariations(): string {
  const variations: string[] = [];
  
  // Material Texture System (40% chance)
  if (Math.random() < 0.40) {
    const textures = [
      "handmade paper texture, subtle grain, barely visible, premium tactile",
      "soft cotton weave texture, premium tactile feel, minimal grain",
      "matte vellum surface, smooth minimal texture, elegant base",
      "clay micro-texture, organic feel, very subtle surface",
      "watercolor paper texture, gentle tooth, natural artisan quality"
    ];
    const selected = textures[Math.floor(Math.random() * textures.length)];
    variations.push(`Material texture: ${selected}`);
  }
  
  // Atmospheric Depth (30% chance)
  if (Math.random() < 0.30) {
    const atmospheric = [
      "soft natural light vignette, gentle edge softness, barely perceptible",
      "light bloom spill, subtle halo behind headline text, ambient glow 2-5% opacity",
      "ambient glow behind main elements, VERY light, natural lens softness",
      "faint tonal horizon band like morning sky, soft atmospheric depth"
    ];
    const selected = atmospheric[Math.floor(Math.random() * atmospheric.length)];
    variations.push(`Atmospheric effect: ${selected}`);
  }
  
  // Botanical/Organic Shadow Layer (20% chance)
  if (Math.random() < 0.20) {
    const shadows = [
      "faint fern shadow, 4-6% opacity, organic whisper, barely visible",
      "olive branch shadow suggestion, subtle 5-8% opacity, natural hint",
      "palm frond shadow blur, delicate 4-7% opacity, tropical calm",
      "tall grass shadow blur, soft 5-8% opacity, natural serenity"
    ];
    const selected = shadows[Math.floor(Math.random() * shadows.length)];
    variations.push(`Organic shadow: ${selected} (NOT actual botanical elements, only their shadows)`);
  }
  
  // Hand-touch Micro Accents (10% chance)
  if (Math.random() < 0.10) {
    const accents = [
      "1-2 tiny delicate pencil speckles near text edge, barely visible artisan touch",
      "faint hand-drawn mark near headline corner, minimal organic accent",
      "tiny soft sun sparkle, very subtle, one small elegant detail",
      "one minimal brush swoop in far background corner, whisper detail"
    ];
    const selected = accents[Math.floor(Math.random() * accents.length)];
    variations.push(`Micro accent: ${selected} (extremely delicate, if too visible remove)`);
  }
  
  // If no variations selected, return empty (clean base aesthetic)
  if (variations.length === 0) {
    return "Clean base aesthetic with no additional variations.";
  }
  
  return variations.join('\n');
}
