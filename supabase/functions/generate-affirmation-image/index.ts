// Edge function for generating final affirmation images using OpenAI

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
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: GenerateRequest = await req.json();
    const { designSpec } = body;

    console.log('Generating final affirmation image with designSpec:', JSON.stringify(designSpec, null, 2));

    // Build a focused, effective prompt similar to preview but for final quality
    const prompt = buildFinalPrompt(designSpec);
    
    console.log('Calling OpenAI API for final generation...');

    // Call OpenAI's image generation API directly with high quality
    const aiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: prompt,
        size: '1024x1024',
        quality: 'high', // High quality for final image
        output_format: 'png',
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('OpenAI API error:', aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Image generation failed', details: errorText }),
        { status: aiResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const imageB64 = aiData?.data?.[0]?.b64_json;

    if (!imageB64) {
      console.error('No image data in OpenAI response');
      return new Response(
        JSON.stringify({ error: 'No image generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

// Focused, effective prompt builder - based on what works in preview
function buildFinalPrompt(spec: DesignSpec): string {
  // 35% chance of gradient (matching preview logic)
  const useGradient = Math.random() < 0.35;
  
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

  const THEME_CONTEXT: Record<string, string> = {
    'calm-morning': 'Evoke peaceful sunrise energy, gentle awakening, soft optimism. Include phrases about fresh starts, mindful beginnings, peaceful energy.',
    'focus': 'Sharp, clear, purposeful energy. Phrases about clarity, determination, goal-achievement, mental strength.',
    'gratitude': 'Warm, abundant, heart-centered energy. Phrases about thankfulness, appreciation, abundance, love.',
    'confidence': 'Bold, empowered, strong energy. Phrases about self-belief, courage, strength, capability.',
    'peace': 'Serene, calming, meditative energy. Phrases about tranquility, balance, inner calm, letting go.',
    'strength': 'Unshakeable resilience, enduring power. Phrases about resilience, endurance, foundation, stability.',
    'joy': 'Pure delight, radiant happiness. Phrases about celebration, delight, happiness, play.',
    'balance': 'Centered equilibrium, harmonious stability. Phrases about harmony, alignment, middle way.',
    'courage': 'Brave action despite fear. Phrases about bravery, bold steps, fearless heart.',
    'clarity': 'Crystal-clear vision, sharp understanding. Phrases about clear vision, truth, understanding.',
    'abundance': 'Overflowing prosperity, generous plenty. Phrases about prosperity, wealth, endless possibility.',
    'healing': 'Gentle restoration, patient recovery. Phrases about restoration, nurturing, growth, care.',
  };

  const themeContext = THEME_CONTEXT[spec.theme] || THEME_CONTEXT['peace'];

  return `Create a high-quality, printable motivational affirmation design with the following specifications:

THEME & CONCEPT:
- Primary theme: ${spec.theme}
- Mood/Style: ${spec.mood}
- Layout style: ${spec.layoutArchetype}

DESIGN REQUIREMENTS:
- Layout: Vertical composition (portrait orientation, suitable for 8x10" or similar)
- Typography: Mix 3-4 complementary fonts (serif, sans-serif, script/handwritten styles)
- Font hierarchy: Vary sizes dramatically - largest phrase should be 3-4x larger than smallest
- Text arrangement: ${spec.layoutArchetype}
- White space: VERY generous breathing room - more space between objects and words
- Object placement: Ensure decorative elements have ample spacing and don't crowd text

COLOR PALETTE:
Primary colors to use: ${spec.paletteToken.hex.join(', ')}
- Use these exact colors for text and accents
- Background: Clean cream/white or subtle texture
- Ensure excellent readability with high contrast

DECORATIVE ELEMENTS:
Include 4-6 delicate accent elements: ${spec.accentSet.join(', ')}
- Elements should enhance, not overwhelm
- Style: Hand-drawn, organic feel (avoid overly perfect/digital look)
- SPACING: Give these elements generous space - don't cluster them

AFFIRMATION CONTENT:
Main Headline: "${spec.mainAffirmation}"
Supporting phrases (include ALL of these):
${spec.supportingPhrases.map((line: string) => `- ${line}`).join('\n')}
${gradientInstructions}
ARTISTIC STYLE:
- Overall aesthetic: Modern farmhouse meets minimalist inspiration
- Texture: Subtle, slight paper texture or organic imperfection
- Line quality: Hand-drawn appearance, slight irregularity
- Balance: Asymmetrical but visually balanced
- Professional yet approachable, commercial-quality
- SPACING: Prioritize generous spacing between all elements

TECHNICAL SPECIFICATIONS:
- Resolution: High quality, print-ready
- Format: Print-ready quality
- Background: Clean (white/cream) or subtle texture
- Contrast: Ensure excellent readability
- Word spacing: Generous letter-spacing and word-spacing throughout
- Element spacing: Keep decorative elements well-separated from text and each other

THEME CONTEXT:
${themeContext}

Focus on creating a balanced, elegant design with GENEROUS SPACING that feels authentic and ready to print.`;
}
