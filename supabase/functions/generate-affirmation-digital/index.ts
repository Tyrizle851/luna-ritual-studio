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
  const phrasesText = supportingPhrases.join('", "');
  
  // Get category-specific styling
  const categoryStyles = getCategoryStyle(category);
  
  return `Create a premium typography poster design for a motivational affirmation print.

MAIN AFFIRMATION: "${title}"

SUPPORTING PHRASES to include around the main text: "${phrasesText}"

DESIGN REQUIREMENTS:
- Edge-to-edge design filling the entire canvas (no borders, no paper edges visible)
- Warm cream/ivory background
- Main affirmation prominently centered with mixed typography (combine bold serif, elegant script, condensed sans-serif)
- 8-12 supporting phrases arranged artistically around the main text in varied fonts and sizes
- Include delicate decorative elements: ${categoryStyles.elements}
- Color palette: ${categoryStyles.colors}
- Typography should feel hand-curated like a vintage letterpress poster
- Include subtle decorative elements (small geometric shapes, dots, lines between phrases)
- Professional print-ready quality
- 4:5 aspect ratio
- Ultra high resolution

STYLE REFERENCE: Premium minimal art print, like Rifle Paper Co or Anthropologie wall art, editorial typography poster, warm bohemian aesthetic`;
}

function getCategoryStyle(category: string): { colors: string; elements: string } {
  const styles: Record<string, { colors: string; elements: string }> = {
    "self-love": {
      colors: "dusty rose, terracotta, navy, cream",
      elements: "roses, peonies, hearts, diamond shapes"
    },
    "peace": {
      colors: "sage green, muted navy, warm cream, soft gold",
      elements: "olive branches, sun rays, laurel wreaths, gentle leaves"
    },
    "growth": {
      colors: "terracotta, sage, warm cream, burnt orange",
      elements: "mountains, winding paths, ferns, seedlings, clouds"
    },
    "calm": {
      colors: "deep teal, sage green, cream, soft navy",
      elements: "ocean waves, moon phases, olive branches, water ripples"
    },
    "rest": {
      colors: "sage green, navy, warm cream, muted gold",
      elements: "olive branches, feathers, small leaves, gentle dots"
    },
    "abundance": {
      colors: "gold, terracotta, cream, forest green",
      elements: "florals, sunbursts, botanical sprigs, stars"
    },
    "confidence": {
      colors: "navy, gold, cream, terracotta",
      elements: "stars, geometric shapes, bold lines, laurel wreaths"
    }
  };

  return styles[category] || styles["peace"];
}
