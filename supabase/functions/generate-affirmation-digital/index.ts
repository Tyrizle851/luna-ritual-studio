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

// Theme-specific elements - multiple accents per category for 2-3 element selection
function getThemeContext(category: string): { accents: string[]; palette: string; mood: string } {
  const themes: Record<string, { accents: string[]; palette: string; mood: string }> = {
    rest: {
      accents: ["soft crescent moon", "gentle cloud wisps", "evening stars", "delicate feather", "cozy blanket texture", "sleep whisper marks"],
      palette: "warm cream, soft lavender, muted blush",
      mood: "sleepy, quiet, nurturing stillness"
    },
    peace: {
      accents: ["minimal olive branch", "lotus flower silhouette", "still water ripples", "dove silhouette", "zen stones", "gentle wave line"],
      palette: "sage green, warm cream, soft white",
      mood: "serene, still water, deep tranquility"
    },
    growth: {
      accents: ["tiny seedling", "unfurling fern frond", "winding path", "distant mountain silhouette", "compass rose", "sunrise rays", "gentle root system"],
      palette: "dusty sage, warm terracotta, soft cream",
      mood: "patient hope, gentle becoming"
    },
    "self-love": {
      accents: ["soft heart outline", "embracing arms silhouette", "blooming flower", "full moon (completeness)", "gentle crown", "mirror reflection"],
      palette: "dusty rose, warm cream, soft mauve",
      mood: "tender acceptance, warm self-regard"
    },
    calm: {
      accents: ["breath symbol", "wind swirl", "horizontal horizon line", "soft clouds", "still water circles", "gentle breeze marks"],
      palette: "soft blue-grey, warm cream, pale sage",
      mood: "centered, grounded, quiet inner strength"
    },
    abundance: {
      accents: ["open palm", "soft golden rays", "overflowing vessel", "fruit silhouette", "scattered seeds", "harvest moon"],
      palette: "warm honey, soft cream, dusty gold",
      mood: "grateful, receptive, gentle fullness"
    },
    trust: {
      accents: ["simple compass", "guiding star", "anchor silhouette", "steady flame", "tree with deep roots", "lighthouse beam"],
      palette: "warm taupe, soft cream, dusty blue",
      mood: "secure, anchored, faithful"
    },
    joy: {
      accents: ["ray of light", "soft sparkles", "gentle bloom", "dancing leaves", "butterfly silhouette", "sun ray burst"],
      palette: "warm peach, soft cream, gentle coral",
      mood: "light, uplifted, quiet happiness"
    }
  };

  return themes[category.toLowerCase()] || {
    accents: ["botanical sprig", "gentle curved line", "soft dot pattern", "minimal leaf"],
    palette: "warm cream, soft beige, muted sage",
    mood: "calm, intentional, quietly beautiful"
  };
}

function buildPrompt(title: string, category: string, supportingPhrases: string[]): string {
  // 8-10 supporting phrases for richer context
  const phraseCount = 8 + Math.floor(Math.random() * 3);
  const shuffledPhrases = supportingPhrases.sort(() => Math.random() - 0.5).slice(0, Math.min(phraseCount, supportingPhrases.length));
  const phrasesText = shuffledPhrases.join('", "');
  
  // Get contextually-appropriate theme elements
  const theme = getThemeContext(category);
  const typography = getRandomTypography();
  const layout = getRandomLayout();
  const background = getRandomBackground();
  
  // Select 2-3 random accents from the theme
  const shuffledAccents = theme.accents.sort(() => Math.random() - 0.5);
  const accentCount = 2 + Math.floor(Math.random() * 2); // 2 or 3
  const selectedAccents = shuffledAccents.slice(0, accentCount).join(", ");
  
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
4. Include 2-3 complementary accent elements that reinforce the affirmation's meaning: ${selectedAccents}
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
    "centered with main text at optical center, supporting phrases floating around",
    "asymmetric - main text offset left with accents balancing right",
    "vertical flow - text and elements creating gentle downward rhythm",
    "balanced grid with intentional element placement",
    "elegant center alignment with supporting phrases at top and bottom",
    "main text above center, supporting elements creating visual interest below",
    "dynamic composition with text and accents in conversation",
    "floating composition - elements suspended in harmonious balance"
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
