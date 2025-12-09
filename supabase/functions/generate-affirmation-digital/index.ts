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

    // Build the simplified prompt
    const prompt = buildPrompt(title, category);
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

function buildPrompt(title: string, category: string): string {
  return `Create a premium fine art affirmation print.

SUBJECT: An elegant typographic art piece featuring the text "${title}"

COMPOSITION: 
- The affirmation text is the hero element, designed with artistic typography that has subtle hand-crafted character
- Delicate botanical line drawings and organic abstract shapes are thoughtfully integrated around the text
- Generous white space (50-60% of canvas) creates breathing room
- Balanced, intentional placement that feels gallery-curated

STYLE: 
- Fine art print aesthetic, the kind sold in high-end design shops for $1,000+
- Warm muted palette: soft cream, linen white, sage green, dusty rose, warm terracotta, charcoal
- Typography that feels refined and artistic — elegant serifs or modern display fonts, NOT basic sans-serif
- Subtle organic textures (paper grain, soft gradients, gentle shadows)
- Illustrations are sophisticated line art or abstract organic forms, NOT cartoon-style or clip-art

THEME: ${category} — incorporate visual motifs that evoke this feeling through the illustration elements

TECHNICAL: 
- Design fills entire canvas edge-to-edge, no borders or margins visible
- 4:5 aspect ratio
- This is museum-quality art, not a social media graphic`;
}
