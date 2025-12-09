import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AffirmationRequest {
  affirmationId: string;
  title: string;
  category: string;
  supportingPhrases: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { affirmationId, title, category, supportingPhrases } = await req.json() as AffirmationRequest;
    
    console.log(`Generating image for affirmation: ${title} (${category})`);

    const prompt = buildPrompt(title, category, supportingPhrases);
    console.log("Prompt:", prompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Gemini response received");

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data));
      throw new Error("No image generated");
    }

    return new Response(JSON.stringify({ 
      success: true,
      affirmationId,
      imageBase64: imageUrl 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating affirmation image:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Theme-specific visual elements for each category
function getThemeContext(category: string): { accents: string[], palette: string, mood: string } {
  const themes: Record<string, { accents: string[], palette: string, mood: string }> = {
    'rest': {
      accents: ['soft crescent moon', 'gentle cloud wisps', 'sleep whisper marks'],
      palette: 'warm cream, soft lavender, muted blush, charcoal text',
      mood: 'sleepy, quiet, nurturing stillness'
    },
    'peace': {
      accents: ['olive branch', 'still water ripples', 'dove silhouette'],
      palette: 'sage green, warm cream, soft white, deep charcoal',
      mood: 'serene, still water, deep tranquility'
    },
    'growth': {
      accents: ['winding path', 'unfurling fern', 'distant mountains', 'tiny seedling'],
      palette: 'dusty sage, warm terracotta, soft cream, forest green',
      mood: 'patient hope, gentle becoming, journey forward'
    },
    'self-love': {
      accents: ['full moon', 'blooming flower', 'soft heart outline', 'gentle crown'],
      palette: 'dusty rose, warm cream, soft mauve, rose gold accents',
      mood: 'tender acceptance, warm self-regard, completeness'
    },
    'calm': {
      accents: ['breath symbol', 'horizontal horizon line', 'still water circles', 'soft clouds'],
      palette: 'soft blue-grey, warm cream, pale sage, charcoal',
      mood: 'centered, grounded, quiet inner strength'
    }
  };

  return themes[category] || themes['peace'];
}

function buildPrompt(title: string, category: string, supportingPhrases: string[]): string {
  const theme = getThemeContext(category);
  const phrasesText = supportingPhrases?.slice(0, 8).join('", "') || '';
  const randomAccent = theme.accents[Math.floor(Math.random() * theme.accents.length)];
  
  // Random typography for variety
  const typography = getRandomTypography();
  const background = getRandomBackground();

  return `Create a $1,000 gallery-quality affirmation art print.

THE ARTWORK IS THE ENTIRE IMAGE. There is NO frame, NO paper edges, NO background surface, NO shadows beneath paper. The design itself IS the complete canvas, filling every pixel edge-to-edge.

AFFIRMATION TEXT: "${title}"
${phrasesText ? `SUPPORTING PHRASES (scattered small around design): "${phrasesText}"` : ''}

VISUAL SCENE:
A premium fine art print with ${typography}. The main affirmation "${title}" is the hero element, rendered in elegant artistic typography. Delicate ${randomAccent} illustrations are thoughtfully integrated around the text. The composition uses ${background} as the base with ${theme.palette} color harmony. The mood evokes ${theme.mood}.

COMPOSITION:
- 50% generous negative space, 50% visual content (text + decorative elements)
- Main text is the focal point with hand-crafted artistic character
- 2-3 sophisticated botanical line drawings or organic abstract shapes complement the text
- Supporting phrases (if any) are small but readable, placed with intention

AESTHETIC REFERENCE:
Kinfolk magazine editorial, Aesop store posters, Apple meditation wallpapers, The Poster Club prints. Modern editorial calm, NOT vintage, NOT letterpress, NOT cottage-core, NOT folk-art.

CRITICAL - EDGE-TO-EDGE REQUIREMENT:
The artwork MUST fill the ENTIRE canvas with absolutely NO:
- Picture frames or frame edges
- Paper edges or torn paper effects
- Visible margins or borders
- Background surfaces the paper sits on
- Shadows beneath the design

4:5 aspect ratio. Museum-quality, $1,000+ gallery art.`;
}

function getRandomTypography(): string {
  const options = [
    'elegant thin serif typography (like Didot or Philosophy)',
    'refined modern serif with artistic flair',
    'sophisticated transitional serif with warmth',
    'clean editorial serif with subtle hand-crafted character',
    'contemporary luxury serif, perfectly balanced'
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomBackground(): string {
  const options = [
    'soft warm linen (#F8F5F0)',
    'warm pearl cream (#F8F7F4)',
    'pale sage-cream (#F5F7F3)',
    'soft blush undertone (#F9F6F4)',
    'natural warm cream (#FAF8F5)'
  ];
  return options[Math.floor(Math.random() * options.length)];
}
