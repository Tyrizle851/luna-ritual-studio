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

// ============================================================================
// THEME VISUAL ELEMENTS - Vivid, specific visual descriptions per theme
// ============================================================================

interface ThemeVisuals {
  colors: string;
  botanicals: string;
  texture: string;
  mood: string;
}

const THEME_VISUALS: Record<string, ThemeVisuals> = {
  "Self-Love": {
    colors: "soft blush pink, warm terracotta, creamy ivory, dusty rose",
    botanicals: "delicate heart-shaped leaves, soft peony petals, gentle eucalyptus sprigs",
    texture: "handmade cotton paper with visible fibers, soft pressed edges",
    mood: "tender embrace, morning light through sheer curtains, gentle self-compassion"
  },
  "Abundance": {
    colors: "warm honey gold, rich terracotta, olive green, antique brass",
    botanicals: "flowing wheat stalks, olive branches, scattered seeds, harvest grain",
    texture: "aged parchment with golden flecks, Mediterranean warmth",
    mood: "prosperous overflow, sunlit abundance, generous warmth"
  },
  "Rest": {
    colors: "soft lavender grey, muted sage, warm cream, gentle fog",
    botanicals: "soft fern fronds, lavender sprigs, peaceful eucalyptus",
    texture: "smooth linen weave, cloud-soft paper, gentle grain",
    mood: "sanctuary stillness, evening calm, restorative quiet"
  },
  "Joy": {
    colors: "warm peach, soft coral, honey yellow, cream with golden warmth",
    botanicals: "dancing wildflowers, cheerful daisy petals, sun-kissed blooms",
    texture: "textured watercolor paper, joyful brushstroke edges",
    mood: "sunlit delight, golden hour warmth, playful radiance"
  },
  "Strength": {
    colors: "deep charcoal, warm bronze, forest green, grounded earth",
    botanicals: "strong oak leaves, sturdy branches, architectural ferns",
    texture: "substantial cotton rag, confident brushstrokes, solid foundation",
    mood: "quiet power, mountain stillness, unshakeable presence"
  },
  "Peace": {
    colors: "soft sky blue, gentle sage, warm white, whisper grey",
    botanicals: "peaceful olive branches, gentle moon shapes, soft clouds",
    texture: "smooth as still water, quiet linen, gentle paper grain",
    mood: "tranquil waters, morning meditation, centered calm"
  },
  "Gratitude": {
    colors: "warm amber, harvest gold, soft terracotta, grateful cream",
    botanicals: "autumn leaves, dried wheat, thankful florals, harvest elements",
    texture: "warm handmade paper, golden hour glow, artisan quality",
    mood: "heartfelt appreciation, golden warmth, abundant thanks"
  },
  "Healing": {
    colors: "soft peach, gentle sage green, warm cream, nurturing clay",
    botanicals: "healing herbs, soft chamomile, restorative lavender",
    texture: "gentle watercolor washes, soft edges, nurturing warmth",
    mood: "tender recovery, gentle restoration, compassionate care"
  },
  "Growth": {
    colors: "fresh sage green, new leaf green, warm earth, hopeful cream",
    botanicals: "unfurling fern fronds, new seedlings, growing vines, fresh leaves",
    texture: "organic paper with natural inclusions, living texture",
    mood: "spring awakening, patient growth, natural unfolding"
  }
};

// ============================================================================
// PREMIUM DIGITAL ARTWORK PROMPT - Vivid scene descriptions
// ============================================================================

function generateDigitalPrompt(affirmation: AffirmationData): string {
  const theme = THEME_VISUALS[affirmation.category] || THEME_VISUALS["Self-Love"];

  return `Create a hand-crafted affirmation art print with the text "${affirmation.title}" as the centerpiece.

This should look like a $200 print from an independent artist's studio in Copenhagen.

VISUAL STYLE:
- Warm ${theme.colors} color palette
- Background of ${theme.texture}
- Delicate hand-drawn ${theme.botanicals} arranged organically around the text
- Soft organic ink strokes with gentle artisanal imperfections
- The feeling of ${theme.mood}

TYPOGRAPHY:
- The affirmation text in elegant serif typography (like Canela or Freight)
- Words arranged asymmetrically - some larger, some smaller, like a thoughtful typography collage
- Text flows naturally across the page, not rigidly centered
- Generous letter-spacing and breathing room
- The text is the emotional focal point

COMPOSITION:
- Hand-drawn botanical accents placed organically around the text
- Generous negative space (at least 20% margins on all sides)
- Warm natural lighting feel, like morning sun through linen curtains
- Everything should feel intentional, calm, human

OUTPUT: Portrait orientation, 3:4 ratio, pure artwork only (no frame, no canvas, no mockup). Print-ready quality.`;
}

// ============================================================================
// SIMPLE MOCKUP PROMPTS - Vivid lifestyle scenes
// ============================================================================

function generateMockupPrompts(affirmation: AffirmationData) {
  
  return {
    canvas: `Show the EXACT artwork from the input image printed on a gallery-wrapped canvas (18x24 inches, portrait orientation) in an elegant, warm home setting.

The scene: A bright Scandinavian living room with soft afternoon sunlight streaming through sheer linen curtains. The canvas hangs on a warm-toned wall above a styled credenza with handmade ceramics, a small potted trailing plant, and a stack of design books. A cozy linen throw is draped nearby.

Photography style: Kinfolk magazine editorial, warm natural light, shallow depth of field, film grain warmth. The scene should feel luxurious, cozy, and aspirational - like a professional interior design photoshoot.

CRITICAL: Use the EXACT artwork from the input image. Do not change the design, text, or colors. The canvas should show the complete artwork with nothing cut off.`,

    unframed: `Show the EXACT artwork from the input image as an unframed poster print (18x24 inches, portrait orientation) in a warm, styled setting.

The scene: Elegant hands holding the unrolled poster against a beautiful marble surface. Nearby: a ceramic vase with dried eucalyptus, a warm cup of tea, soft morning light creating gentle shadows. The poster has a natural slight curl at the edges - authentic and artisanal.

Photography style: Editorial product photography with emotional warmth. Soft natural lighting, film grain, shallow depth of field. This should feel like a lifestyle catalog from Anthropologie or a Kinfolk spread.

CRITICAL: Use the EXACT artwork from the input image. Do not change the design, text, or colors. The poster must be fully visible.`,

    framed: `Show the EXACT artwork from the input image in a Red Oak wood frame (warm honey-brown, #D4A489) holding an 18x24 inch print (portrait orientation).

The scene: A cozy reading corner with a worn leather armchair, a stack of beautiful books, warm wood floors, and late afternoon golden light streaming in. The framed artwork hangs on a textured cream plaster wall, casting a soft shadow. A trailing pothos plant is visible nearby.

Photography style: Architectural Digest or Apartment Therapy quality. Warm, inviting, editorial. Soft diffused light, visible textures (leather, wood, linen), film grain warmth. This should feel like someone's dream home.

CRITICAL: Use the EXACT artwork from the input image. The frame should be simple and elegant with visible wood grain. Do not change the artwork design, text, or colors.`
  };
}

// ============================================================================
// IMAGE GENERATION FUNCTIONS
// ============================================================================

async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    console.log("Generating digital artwork with Gemini 3 Pro Image...");
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

    console.log("Digital artwork generated successfully");
    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

async function generateMockupImage(prompt: string, inputImageBase64: string, apiKey: string): Promise<string | null> {
  try {
    console.log("Generating mockup with image reference...");
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

    console.log("Mockup generated successfully");
    return imageUrl;
  } catch (error) {
    console.error("Error generating mockup image:", error);
    return null;
  }
}

// ============================================================================
// STORAGE FUNCTIONS
// ============================================================================

async function uploadToStorage(
  supabase: any,
  base64Data: string,
  affirmationId: string,
  variationType: string
): Promise<string | null> {
  try {
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

// ============================================================================
// MAIN SERVER HANDLER
// ============================================================================

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
    
    const affirmationData: AffirmationData = {
      ...body,
      title: body.affirmationText
    };

    console.log(`=== PREMIUM IMAGE GENERATION ===`);
    console.log(`Affirmation: ${affirmationData.affirmationId} - "${affirmationData.title}"`);
    console.log(`Category: ${affirmationData.category}`);

    // Check if images already exist
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", affirmationData.affirmationId)
      .eq("product_category", "affirmations");

    if (existingImages && existingImages.length >= 4 && !body.forceRegenerate) {
      console.log("Images already exist (use forceRegenerate to override)");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Images already exist",
          images: existingImages 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Delete existing images before regenerating
    if (existingImages && existingImages.length > 0) {
      console.log(`Deleting ${existingImages.length} existing images for regeneration`);
      await supabase
        .from("product_images")
        .delete()
        .eq("product_id", affirmationData.affirmationId)
        .eq("product_category", "affirmations");
    }

    const generatedImages: { variation: string; url: string }[] = [];

    // STEP 1: Generate premium digital artwork
    console.log("STEP 1: Generating premium digital artwork...");
    const digitalPrompt = generateDigitalPrompt(affirmationData);
    const digitalImageBase64 = await generateImage(digitalPrompt, LOVABLE_API_KEY);
    
    if (!digitalImageBase64) {
      console.error("Failed to generate digital artwork");
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
      console.log("✓ Digital artwork stored successfully");
    }

    // STEP 2: Generate mockup variations
    console.log("STEP 2: Generating mockup variations...");
    const mockupPrompts = generateMockupPrompts(affirmationData);
    const mockupVariations = ["canvas", "unframed", "framed"] as const;

    for (const variation of mockupVariations) {
      console.log(`Generating ${variation} mockup...`);
      
      const mockupImageBase64 = await generateMockupImage(
        mockupPrompts[variation], 
        digitalImageBase64, 
        LOVABLE_API_KEY
      );
      
      if (!mockupImageBase64) {
        console.error(`Failed to generate ${variation} mockup`);
        continue;
      }

      const publicUrl = await uploadToStorage(supabase, mockupImageBase64, affirmationData.affirmationId, variation);
      
      if (!publicUrl) {
        console.error(`Failed to upload ${variation} mockup`);
        continue;
      }

      const { error: insertError } = await supabase
        .from("product_images")
        .insert({
          product_id: affirmationData.affirmationId,
          product_category: "affirmations",
          variation_type: variation,
          image_url: publicUrl,
        });

      if (insertError) {
        console.error(`Failed to store ${variation} in database:`, insertError);
        continue;
      }

      generatedImages.push({ variation, url: publicUrl });
      console.log(`✓ ${variation} mockup stored successfully`);
    }

    console.log(`=== GENERATION COMPLETE ===`);
    console.log(`Generated ${generatedImages.length} images for ${affirmationData.affirmationId}`);

    return new Response(
      JSON.stringify({
        success: true,
        affirmationId: affirmationData.affirmationId,
        images: generatedImages,
        message: `Generated ${generatedImages.length} premium images`
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-affirmation-product-images:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
