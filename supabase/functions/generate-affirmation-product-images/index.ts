import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AffirmationImageRequest {
  affirmationId: string;
  affirmationText: string;
  category: string;
  description: string;
  tags?: string[];
  forceRegenerate?: boolean;
}

interface AffirmationData extends AffirmationImageRequest {
  title: string;
}

// Theme-based design configurations inspired by affirmation builder
const THEME_PALETTES: Record<string, { colors: string; style: string; accents: string }> = {
  "Self-Love": {
    colors: "Soft blush pink, warm cream, dusty rose, champagne gold",
    style: "Gentle, nurturing, warm embrace aesthetic",
    accents: "Delicate hearts, soft florals, organic curves"
  },
  "Abundance": {
    colors: "Rich terracotta, warm gold, deep cream, copper accents",
    style: "Luxurious, prosperous, warm and inviting",
    accents: "Flowing elements, organic abundance symbols, golden details"
  },
  "Rest": {
    colors: "Soft sage green, warm ivory, pale lavender, muted clay",
    style: "Calming, peaceful, sanctuary-like",
    accents: "Gentle clouds, soft waves, peaceful botanical elements"
  },
  "Joy": {
    colors: "Warm peach, soft coral, sunny cream, gentle gold",
    style: "Uplifting, bright but not harsh, joyful warmth",
    accents: "Sunbursts, dancing botanicals, playful organic shapes"
  },
  "Strength": {
    colors: "Deep forest green, warm charcoal, cream, bronze accents",
    style: "Grounded, powerful yet refined, earthy strength",
    accents: "Strong geometric elements, bold botanicals, anchoring shapes"
  }
};

// Generate the digital artwork prompt (base design)
function generateDigitalPrompt(affirmation: AffirmationData): string {
  const theme = THEME_PALETTES[affirmation.category] || THEME_PALETTES["Self-Love"];
  
  return `
Create a high-quality, printable affirmation poster design.

CRITICAL DESIGN REQUIREMENTS:
- The affirmation text "${affirmation.title}" must be the central focus
- Portrait orientation (18:24 aspect ratio for posters)
- ALL text MUST be completely contained with generous margins (at least 15% from edges)
- NO text or design elements should touch, approach, or extend beyond any edge
- Clean, readable typography - mix of 2-3 complementary fonts
- Premium minimal aesthetic with intentional white space
- Color palette: ${theme.colors}
- Design style: ${theme.style}
- Decorative accents: ${theme.accents}
- The design should feel like high-end wall art, not a social media graphic
- Ensure excellent contrast and readability

SPECIFIC REQUIREMENTS FOR DIGITAL ARTWORK:
- This is the RAW ARTWORK ONLY - no frame, no canvas, no mockup
- Pure design on a clean background (white, cream, or soft neutral)
- The artwork itself with no physical product representation
- Print-ready quality at 300 DPI
- Perfect for customers to print at home or at a print shop
- Portrait orientation (2:3 or 3:4 aspect ratio)
`;
}

// Generate mockup prompts that reference the input image
function generateMockupPrompts(affirmation: AffirmationData) {
  // Whether to include human interaction (50% chance)
  const includeHuman = () => Math.random() < 0.5;
  
  const humanScenarios = {
    canvas: [
      "A person with elegant hands gently adjusting the canvas on a minimalist gallery wall",
      "Someone in a cozy sweater admiring the canvas in their bright, airy living room",
      "A woman's silhouette hanging the canvas in a sunlit bedroom",
    ],
    unframed: [
      "Elegant hands holding the unrolled poster, revealing the design",
      "Someone in a minimalist space positioning the poster against a textured wall",
      "A person carefully unrolling the poster on a clean wooden surface",
    ],
    framed: [
      "Someone in a cozy knit sweater adjusting the framed piece on the wall",
      "A person admiring the framed artwork from their reading nook",
      "Elegant hands placing the framed poster on a minimalist shelf display",
    ]
  };

  const styledScenarios = {
    canvas: [
      "on a clean white gallery wall with soft natural lighting and subtle shadow",
      "in a bright, airy Scandinavian-style living room with plants",
      "in a cozy bedroom with warm morning light streaming through sheer curtains",
    ],
    unframed: [
      "laid flat on a clean marble surface with soft shadows",
      "slightly curled at edges, leaning against a textured cream wall",
      "placed on a wooden desk with minimal styling elements nearby",
    ],
    framed: [
      "hung on a warm-toned wall in a cozy reading corner",
      "displayed on a minimalist floating shelf with a small plant",
      "in a sunlit hallway with clean architectural details",
    ]
  };

  const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return {
    canvas: includeHuman() ? `
Take THIS EXACT affirmation artwork shown in the image and place it on a stretched canvas print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Show the canvas in this scene: ${randomFrom(humanScenarios.canvas)}

PHOTO REQUIREMENTS:
- The artwork on the canvas must be IDENTICAL to the input image
- Warm, natural lighting with soft shadows
- The canvas should have visible edge wrap texture
- Canvas dimensions appear as 18x24 inches
- Lifestyle photography style - warm, inviting, aspirational
- The text on the canvas must be fully visible and not cut off
- Show the premium quality of the stretched canvas material
` : `
Take THIS EXACT affirmation artwork shown in the image and place it on a stretched canvas print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Show the canvas displayed ${randomFrom(styledScenarios.canvas)}

PHOTO REQUIREMENTS:
- The artwork on the canvas must be IDENTICAL to the input image
- Soft, natural lighting with gentle shadows
- Canvas has visible edge wrap and texture
- Canvas dimensions appear as 18x24 inches
- Interior design photography style
- The text on the canvas must be fully visible and readable
- Premium, aspirational home decor aesthetic
`,

    unframed: includeHuman() ? `
Take THIS EXACT affirmation artwork shown in the image and show it as an unframed 18x24 poster print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Show the poster in this scene: ${randomFrom(humanScenarios.unframed)}

PHOTO REQUIREMENTS:
- The poster artwork must be IDENTICAL to the input image
- Soft natural lighting
- The poster has a subtle matte paper finish
- Poster dimensions are 18x24 inches
- The paper may have a very slight natural curl at edges
- Lifestyle photography style - warm and inviting
- The text must be fully visible and not cut off at any edge
- Show the quality of the paper stock
` : `
Take THIS EXACT affirmation artwork shown in the image and show it as an unframed 18x24 poster print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Show the poster ${randomFrom(styledScenarios.unframed)}

PHOTO REQUIREMENTS:
- The poster artwork must be IDENTICAL to the input image
- Clean, soft natural lighting
- Poster has a quality matte paper finish
- Poster dimensions are 18x24 inches
- Subtle paper curl is acceptable for authenticity
- Clean product photography style
- The text must be completely visible and readable
- Premium paper quality should be evident
`,

    framed: includeHuman() ? `
Take THIS EXACT affirmation artwork shown in the image and show it in an 18x24 Red Oak wood frame.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

FRAME: Red Oak wood frame (warm honey-brown color, approximately #D4A489 or similar warm oak tone)
- Simple, elegant profile
- Natural wood grain visible
- Premium quality appearance

Show the framed piece in this scene: ${randomFrom(humanScenarios.framed)}

PHOTO REQUIREMENTS:
- The artwork in the frame must be IDENTICAL to the input image
- Warm, inviting natural lighting
- The frame should cast subtle, soft shadows
- Frame dimensions hold an 18x24 print
- The text on the poster must be fully visible within the frame
- Interior lifestyle photography style
- Cozy, aspirational home atmosphere
` : `
Take THIS EXACT affirmation artwork shown in the image and show it in an 18x24 Red Oak wood frame.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

FRAME: Red Oak wood frame (warm honey-brown color, approximately #D4A489 or similar warm oak tone)
- Simple, elegant profile
- Natural wood grain visible
- Premium quality appearance

Show the framed poster ${randomFrom(styledScenarios.framed)}

PHOTO REQUIREMENTS:
- The artwork in the frame must be IDENTICAL to the input image
- Soft, warm natural lighting
- Frame casts gentle, realistic shadows
- Frame holds an 18x24 print
- The text must be completely visible and not cut off
- Interior design photography style
- Premium home decor aesthetic
`
  };
}

// Generate image without input reference (for digital artwork)
async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
      console.error("Image generation failed:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image URL in response:", JSON.stringify(data));
      return null;
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

// Generate mockup image using the digital artwork as input reference
async function generateMockupImage(prompt: string, inputImageBase64: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                image_url: {
                  url: inputImageBase64
                }
              }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mockup image generation failed:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image URL in mockup response:", JSON.stringify(data));
      return null;
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating mockup image:", error);
    return null;
  }
}

async function uploadToStorage(
  supabase: any,
  base64Data: string,
  affirmationId: string,
  variationType: string
): Promise<string | null> {
  try {
    // Extract base64 content
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0));
    
    const fileName = `affirmations/${affirmationId}/${variationType}-${Date.now()}.png`;
    
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    return urlData?.publicUrl || null;
  } catch (error) {
    console.error("Error uploading to storage:", error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body: AffirmationImageRequest = await req.json();
    
    // Map affirmationText to title for internal use
    const affirmationData: AffirmationData = {
      ...body,
      title: body.affirmationText
    };

    console.log(`Generating images for affirmation: ${affirmationData.affirmationId} - "${affirmationData.title}"`);

    // Check if images already exist
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", affirmationData.affirmationId)
      .eq("product_category", "affirmations");

    // Skip if images exist and not forcing regeneration
    if (existingImages && existingImages.length >= 4 && !body.forceRegenerate) {
      console.log("Images already exist for this affirmation (use forceRegenerate to override)");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Images already exist",
          images: existingImages 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Delete any existing images before regenerating
    if (existingImages && existingImages.length > 0) {
      console.log(`Deleting ${existingImages.length} existing images for regeneration`);
      await supabase
        .from("product_images")
        .delete()
        .eq("product_id", affirmationData.affirmationId)
        .eq("product_category", "affirmations");
    }

    const generatedImages: { variation: string; url: string }[] = [];

    // STEP 1: Generate the digital artwork FIRST
    console.log(`Generating digital artwork for ${affirmationData.affirmationId}...`);
    const digitalPrompt = generateDigitalPrompt(affirmationData);
    const digitalImageBase64 = await generateImage(digitalPrompt, LOVABLE_API_KEY);
    
    if (!digitalImageBase64) {
      console.error("Failed to generate digital artwork - cannot proceed with mockups");
      throw new Error("Failed to generate base digital artwork");
    }

    // Upload digital image
    const digitalPublicUrl = await uploadToStorage(supabase, digitalImageBase64, affirmationData.affirmationId, "digital");
    
    if (digitalPublicUrl) {
      await supabase.from("product_images").insert({
        product_id: affirmationData.affirmationId,
        product_category: "affirmations",
        variation_type: "digital",
        image_url: digitalPublicUrl,
      });
      generatedImages.push({ variation: "digital", url: digitalPublicUrl });
      console.log("Successfully generated and stored digital artwork");
    }

    // STEP 2: Generate mockup variations using the digital artwork as input
    const mockupPrompts = generateMockupPrompts(affirmationData);
    const mockupVariations = ["canvas", "unframed", "framed"] as const;

    for (const variation of mockupVariations) {
      console.log(`Generating ${variation} mockup for ${affirmationData.affirmationId}...`);
      
      // Use the digital artwork as input for image-to-image generation
      const mockupImageBase64 = await generateMockupImage(
        mockupPrompts[variation], 
        digitalImageBase64, 
        LOVABLE_API_KEY
      );
      
      if (!mockupImageBase64) {
        console.error(`Failed to generate ${variation} mockup`);
        continue;
      }

      // Upload to storage
      const publicUrl = await uploadToStorage(supabase, mockupImageBase64, affirmationData.affirmationId, variation);
      
      if (!publicUrl) {
        console.error(`Failed to upload ${variation} mockup`);
        continue;
      }

      // Store in database
      const { error: insertError } = await supabase
        .from("product_images")
        .insert({
          product_id: affirmationData.affirmationId,
          product_category: "affirmations",
          variation_type: variation,
          image_url: publicUrl,
        });

      if (insertError) {
        console.error(`Failed to insert ${variation} mockup record:`, insertError);
        continue;
      }

      generatedImages.push({ variation, url: publicUrl });
      console.log(`Successfully generated and stored ${variation} mockup`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        affirmationId: affirmationData.affirmationId,
        title: affirmationData.title,
        imagesGenerated: generatedImages.length,
        images: generatedImages
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-affirmation-product-images:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
