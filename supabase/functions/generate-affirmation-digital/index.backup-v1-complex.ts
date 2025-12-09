// BACKUP: Complex prompt system with all aesthetic rules (v1)
// Date: 2025-12-09
// Restore this if needed

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { affirmationId, title, category, supportingPhrases } = await req.json();
    
    console.log(`Generating image for affirmation: ${title} (${category})`);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = buildPrompt(title, category, supportingPhrases);
    console.log(`Prompt: ${prompt}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
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
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response received');
    
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('No image generated in response');
    }

    return new Response(JSON.stringify({ 
      success: true,
      affirmationId,
      imageUrl 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating affirmation image:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Theme context with multiple accent options per category
function getThemeContext(category: string): { accents: string[], palette: string, mood: string } {
  const themes: Record<string, { accents: string[], palette: string, mood: string }> = {
    'rest': {
      accents: ['soft crescent moon', 'sleep whisper marks', 'gentle cloud wisps'],
      palette: 'warm cream, soft lavender, muted blush',
      mood: 'sleepy, quiet, nurturing stillness'
    },
    'peace': {
      accents: ['dove silhouette', 'still water ripples'],
      palette: 'sage green, warm cream, soft white',
      mood: 'serene, still water, deep tranquility'
    },
    'growth': {
      accents: ['gentle root system', 'tiny seedling'],
      palette: 'dusty sage, warm terracotta, soft cream',
      mood: 'patient hope, gentle becoming'
    },
    'self-love': {
      accents: ['full moon (completeness)', 'blooming flower', 'embracing arms silhouette'],
      palette: 'dusty rose, warm cream, soft mauve',
      mood: 'tender acceptance, warm self-regard'
    },
    'calm': {
      accents: ['breath symbol', 'horizontal horizon line'],
      palette: 'soft blue-grey, warm cream, pale sage',
      mood: 'centered, grounded, quiet inner strength'
    }
  };

  return themes[category] || themes['peace'];
}

function buildPrompt(title: string, category: string, supportingPhrases: string[]): string {
  const theme = getThemeContext(category);
  const phrasesText = supportingPhrases.slice(0, 10).join('", "');
  const accentsText = theme.accents.join(', ');
  
  // Random selections for variety
  const typography = getRandomTypography();
  const layout = getRandomLayout();
  const background = getRandomBackground();

  return `Create a premium typography print for a modern wellness brand.

MAIN AFFIRMATION: "${title}"
SUPPORTING PHRASES (small, scattered thoughtfully around design): "${phrasesText}"

BRAND DIRECTION - "QUIET LUXURY WELLNESS":
Reference aesthetic: Kinfolk magazine, Cereal magazine, Aesop packaging, Apple meditation wallpapers
This is NOT vintage. NOT letterpress. NOT cottage-core. NOT folk-art. NOT Victorian.
This is: modern, clean, editorial, premium, calm, layered with meaning.

CRITICAL DESIGN RULES:
1. 50% NEGATIVE SPACE, 50% VISUAL CONTENT (text and decorative elements) - balanced composition
2. Main affirmation in ${typography} - elegant, refined, the focal hero
3. Supporting phrases scattered thoughtfully - small but readable, placed with intention
4. Include 2-3 complementary accent elements that reinforce the affirmation's meaning: ${accentsText}
5. Emotional mood: ${theme.mood}

VISUAL STYLE:
- Background: ${background}
- Color palette: ${theme.palette}
- Layout: ${layout}
- Typography: clean, modern serif - think premium editorial
- Decorative accents should feel integrated, not decorative for decoration's sake

AVOID COMPLETELY:
- Heavy decorations, flourishes, ornaments
- Vintage/rustic/folk/apothecary aesthetics
- Woodland creatures, mushrooms, busy random botanicals
- Hand-inked or letterpress textures
- Motivational poster energy
- Paper edges, borders, margins visible

THE DESIGN SHOULD FEEL LIKE:
A gallery art print with intentional layers of meaning.
Balanced. Intentional. Premium. Modern. Layered with meaning.

TECHNICAL:
- The design must fill the ENTIRE image canvas edge-to-edge - no visible paper edges, no borders, no margins
- 4:5 aspect ratio
- Ultra high resolution
`;
}

function getRandomTypography(): string {
  const options = [
    'elegant thin serif (like Didot Light or Philosophy)',
    'refined modern serif with medium weight (like Freight Display)',
    'sophisticated transitional serif (like Miller or Austin)',
    'clean editorial serif with subtle warmth',
    'contemporary luxury serif with balanced weight'
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomLayout(): string {
  const options = [
    'centered with main text at optical center, supporting phrases floating around',
    'elegant center alignment with supporting phrases at top and bottom',
    'main text above center, supporting elements creating visual interest below',
    'vertical flow - text and elements creating gentle downward rhythm',
    'dynamic composition with text and accents in conversation'
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomBackground(): string {
  const options = [
    'soft linen (#F8F5F0) barely textured',
    'warm pearl (#F8F7F4) gallery-quality surface',
    'pale sage-cream (#F5F7F3) barely perceptible',
    'soft blush undertone (#F9F6F4) very subtle',
    'natural cream (#FAF8F5) with whisper of warmth'
  ];
  return options[Math.floor(Math.random() * options.length)];
}
