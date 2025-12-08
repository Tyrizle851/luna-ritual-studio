import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    
    console.log(`Generating image for affirmation: ${title}`);

    // Build the prompt for rich typography poster style
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

function buildPrompt(title: string, category: string, supportingPhrases: string[]): string {
  // Use 8-10 phrases for rich but balanced design
  const phraseCount = 8 + Math.floor(Math.random() * 3);
  const shuffledPhrases = supportingPhrases.sort(() => Math.random() - 0.5).slice(0, Math.min(phraseCount, supportingPhrases.length));
  const phrasesText = shuffledPhrases.join('", "');
  
  // Get randomized styling
  const background = getRandomBackground();
  const palette = getRandomPalette();
  const typography = getRandomTypography();
  const layout = getRandomLayout();
  const elements = getRandomElements();
  const density = getRandomDensity();
  
  return `Create a rich, layered typography poster for an affirmation print that feels like a curated art print.

MAIN AFFIRMATION: "${title}"
SUPPORTING PHRASES to weave throughout the design: "${phrasesText}"

DESIGN APPROACH:
- ${density}
- Main affirmation is the clear hero, but surrounded by thoughtfully placed supporting text
- Every phrase should be visible and readable at different sizes
- Fill the canvas with intention - no large empty gaps
- Mix of ${typography}

VISUAL STYLE:
- Background: ${background}
- Color palette: ${palette}
- Layout: ${layout}
- Decorative elements throughout: ${elements}

MUST INCLUDE:
- Multiple font sizes creating visual hierarchy
- Decorative flourishes, botanical elements, and small icons scattered throughout
- Text at various angles and orientations for visual interest
- The design should feel collected and curated, like a vintage letterpress poster

TECHNICAL:
- Edge-to-edge design filling entire canvas
- 4:5 aspect ratio
- Premium quality like Rifle Paper Co or Anthropologie wall art
- Ultra high resolution`;
}

function getRandomBackground(): string {
  const backgrounds = [
    "warm cream/ivory (#FAF6F1)",
    "soft blush pink (#F9F1EE)",
    "pale sage green (#F2F5F0)",
    "light warm taupe (#F5F2ED)",
    "soft pearl white (#FAFAFA)",
    "muted sand (#F6F3EB)",
    "whisper gray (#F4F4F2)",
    "antique linen (#FAF8F3)",
    "soft clay (#F8F4EF)",
    "dusty rose undertone (#F7F2F0)"
  ];
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function getRandomPalette(): string {
  const palettes = [
    "deep navy, terracotta, cream",
    "forest green, warm gold, ivory",
    "dusty rose, charcoal, soft white",
    "burnt sienna, sage, cream",
    "indigo, coral, warm white",
    "olive, rust, sand",
    "burgundy, gold, pearl",
    "teal, copper, ivory",
    "plum, sage green, cream",
    "slate blue, terracotta, linen",
    "chocolate brown, dusty pink, cream",
    "emerald, gold, soft white",
    "muted coral, navy, sand",
    "warm gray, blush, cream",
    "ochre, deep teal, ivory"
  ];
  return palettes[Math.floor(Math.random() * palettes.length)];
}

function getRandomTypography(): string {
  const styles = [
    "elegant serif headlines with delicate sans-serif accents",
    "bold condensed sans-serif with flowing script details",
    "classic roman capitals with italic flourishes",
    "modern geometric sans with hand-lettered touches",
    "vintage slab serif with refined thin weights",
    "art deco inspired with ornamental capitals",
    "editorial serif mix with condensed secondary text",
    "organic hand-drawn lettering with clean sans support",
    "refined transitional serif with modern spacing",
    "bold display type with whisper-thin accent text"
  ];
  return styles[Math.floor(Math.random() * styles.length)];
}

function getRandomLayout(): string {
  const layouts = [
    "centered symmetrical with radiating phrases",
    "asymmetric balance with left-weighted main text",
    "circular arrangement with centered focal point",
    "diagonal flow from top-left to bottom-right",
    "stacked horizontal bands of varying weight",
    "organic scattered placement with clear hierarchy",
    "right-aligned main with floating accents left",
    "vertical emphasis with cascading phrases",
    "diamond-shaped composition",
    "wave-like curved text arrangement"
  ];
  return layouts[Math.floor(Math.random() * layouts.length)];
}

function getRandomElements(): string {
  const elementSets = [
    "roses, peonies, olive branches, ferns, small birds, butterflies",
    "sun and moon motifs, stars, celestial orbs, cosmic swirls",
    "laurel wreaths, botanical sprigs, wildflowers, seed pods",
    "geometric diamonds, circles, triangles, decorative borders",
    "hearts, arrows, ribbons, banners, ornamental frames",
    "feathers, leaves, vines, delicate florals, nature icons",
    "mountains, clouds, waves, trees, natural landscapes",
    "abstract watercolor washes, brush strokes, ink splatters",
    "vintage ornaments, filigree, decorative corners, flourishes",
    "mushrooms, crystals, moths, woodland creatures, organic shapes"
  ];
  return elementSets[Math.floor(Math.random() * elementSets.length)];
}

function getRandomDensity(): string {
  const densities = [
    "Rich and layered - fill 70-80% of the canvas with text and decorative elements",
    "Balanced abundance - main affirmation with 8-10 supporting phrases woven throughout",
    "Lush and detailed - every corner has purpose with botanical accents and text",
    "Collected and curated - like a vintage poster with many typographic elements",
    "Thoughtfully dense - supporting phrases orbit the main text in varied sizes"
  ];
  return densities[Math.floor(Math.random() * densities.length)];
}
