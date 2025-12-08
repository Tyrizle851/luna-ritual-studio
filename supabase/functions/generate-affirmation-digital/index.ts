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

    // Build the prompt for premium minimal brand aesthetic
    const prompt = buildPrompt(title, category, supportingPhrases);
    console.log("Prompt:", prompt);

    // Call Gemini 3 Pro Image via Lovable AI Gateway
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

    // Extract the image from the response
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

// Theme-specific elements that MATCH the affirmation meaning
function getThemeContext(category: string): { accent: string; palette: string; mood: string } {
  const themes: Record<string, { accent: string; palette: string; mood: string }> = {
    rest: {
      accent: "a single soft crescent moon OR a gentle cloud wisp OR a delicate feather",
      palette: "warm cream, soft lavender, muted blush",
      mood: "sleepy, quiet, nurturing stillness"
    },
    peace: {
      accent: "a minimal olive branch OR single lotus silhouette OR gentle ripple",
      palette: "sage green, warm cream, soft white",
      mood: "serene, still water, deep tranquility"
    },
    growth: {
      accent: "a tiny seedling OR unfurling fern frond OR gentle sunrise glow",
      palette: "dusty sage, warm terracotta, soft cream",
      mood: "patient hope, gentle becoming"
    },
    "self-love": {
      accent: "a simple soft heart OR gentle embrace silhouette",
      palette: "dusty rose, warm cream, soft mauve",
      mood: "tender acceptance, warm self-regard"
    },
    calm: {
      accent: "a breath symbol OR still water circle OR minimal horizon line",
      palette: "soft blue-grey, warm cream, pale sage",
      mood: "centered, grounded, quiet inner strength"
    },
    abundance: {
      accent: "an open palm OR soft golden ray",
      palette: "warm honey, soft cream, dusty gold",
      mood: "grateful, receptive, gentle fullness"
    },
    trust: {
      accent: "a simple compass OR gentle guiding star",
      palette: "warm taupe, soft cream, dusty blue",
      mood: "secure, anchored, faithful"
    },
    joy: {
      accent: "a single ray of light OR soft sparkle OR gentle bloom",
      palette: "warm peach, soft cream, gentle coral",
      mood: "light, uplifted, quiet happiness"
    }
  };

  return themes[category.toLowerCase()] || {
    accent: "a single botanical sprig OR gentle curved line",
    palette: "warm cream, soft beige, muted sage",
    mood: "calm, intentional, quietly beautiful"
  };
}

function buildPrompt(title: string, category: string, supportingPhrases: string[]): string {
  // Only 3-4 supporting phrases, whisper-quiet
  const phraseCount = 3 + Math.floor(Math.random() * 2);
  const shuffledPhrases = supportingPhrases.sort(() => Math.random() - 0.5).slice(0, Math.min(phraseCount, supportingPhrases.length));
  const phrasesText = shuffledPhrases.join('", "');
  
  // Get contextually-appropriate theme elements
  const theme = getThemeContext(category);
  const typography = getRandomTypography();
  const layout = getRandomLayout();
  const background = getRandomBackground();
  
  return `Create a premium minimal typography print for a modern wellness brand.

MAIN AFFIRMATION: "${title}"
WHISPER PHRASES (barely visible, very small, at edges): "${phrasesText}"

BRAND DIRECTION - "QUIET LUXURY WELLNESS":
Reference aesthetic: Kinfolk magazine, Cereal magazine, Aesop packaging, Apple meditation wallpapers
This is NOT vintage. NOT letterpress. NOT cottage-core. NOT folk-art. NOT Victorian.
This is: modern, clean, editorial, airy, premium, minimal, calm.

CRITICAL DESIGN RULES:
1. 60-70% NEGATIVE SPACE - generous breathing room is the priority
2. Main affirmation in ${typography} - elegant, refined, the singular hero
3. Supporting phrases are WHISPERS - tiny, faded, almost invisible at far edges
4. Only ONE minimal accent element (optional): ${theme.accent}
5. Emotional mood: ${theme.mood}

VISUAL STYLE:
- Background: ${background}
- Color palette: ${theme.palette}
- Layout: ${layout}
- Typography: clean, modern serif - think premium editorial

AVOID COMPLETELY:
- Dense compositions (this should feel AIRY and SPACIOUS)
- Heavy decorations, flourishes, ornaments
- Vintage/rustic/folk/apothecary aesthetics
- Woodland creatures, mushrooms, busy botanicals
- Hand-inked or letterpress textures
- Motivational poster energy
- Multiple decorative elements (ONE accent max, or none)
- Filled canvas - we want SPACE

THE DESIGN SHOULD FEEL LIKE:
A gallery art print you'd see in a high-end spa or boutique hotel.
Calm. Quiet. Premium. Modern. Intentional.

TECHNICAL:
- Edge-to-edge design, no paper edges visible
- 4:5 aspect ratio
- Ultra high resolution`;
}

function getRandomTypography(): string {
  const options = [
    "refined modern serif (like Canela or GT Sectra)",
    "elegant thin serif (like Didot Light or Philosophy)",
    "sophisticated transitional serif (like Miller or Austin)",
    "clean editorial serif with subtle warmth",
    "contemporary luxury serif with balanced weight",
    "graceful serif with gentle curves",
    "premium editorial typeface with quiet presence",
    "minimal modern serif - refined and understated"
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomLayout(): string {
  const options = [
    "centered with main text at optical center, whisper phrases floating at far corners",
    "asymmetric - main text offset left with generous right margin",
    "vertical breathing - text in lower third with expansive space above",
    "minimal grid with maximum negative space",
    "elegant center alignment with whisper accents at top and bottom edges",
    "main text slightly above center, supporting text barely visible below",
    "clean left alignment with 40% right margin",
    "floating composition - text appears suspended in calm space"
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomBackground(): string {
  const options = [
    "warm cream (#FAF6F1) with subtle paper grain",
    "soft linen (#F8F5F0) barely textured",
    "gentle beige (#F6F3ED) smooth and quiet",
    "warm white (#FAFAF8) with whisper of warmth",
    "soft blush undertone (#F9F6F4) very subtle",
    "pale sage-cream (#F5F7F3) barely perceptible",
    "natural cotton (#FAF9F6) soft matte finish",
    "warm pearl (#F8F7F4) gallery-quality surface"
  ];
  return options[Math.floor(Math.random() * options.length)];
}
