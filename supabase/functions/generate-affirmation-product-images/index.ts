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
  inputImageBase64?: string; // User's curated digital artwork as base64
}

interface AffirmationData extends AffirmationImageRequest {
  title: string;
}

// ============================================================================
// MOCKUP PROMPTS - Vivid lifestyle scenes with human connection
// ============================================================================

function generateMockupPrompts(affirmation: AffirmationData) {
  
  return {
    canvas: `Show the EXACT artwork from the input image printed on a gallery-wrapped canvas (18x24 inches, portrait orientation) with a hyperrealistic beautiful woman gently interacting with it.

The scene: A warm Scandinavian living room bathed in soft afternoon light. A beautiful woman in a cozy cream sweater is gently adjusting the canvas on the wall with delicate hands, or standing back with her hand resting softly on the wall beside it, admiring her new art. The space includes a beautiful credenza with ceramics, a trailing plant, and design books. The moment feels intimate and contemplative.

NO TOOLS of any kind - no hammers, no levels, no hardware visible. Just soft, graceful interaction.

CRITICAL PRINT ACCURACY: The canvas shows the artwork as a FLAT MATTE PRINT on canvas material. Any painterly or watercolor textures from the original are PRINTED - they do not pop out, do not have raised 3D texture, do not catch light as real paint would. The surface is smooth matte canvas. This accurately represents what the customer will receive.

Photography style: Kinfolk magazine editorial, hyperrealistic, warm natural light, shallow depth of field.

CRITICAL: Use the EXACT artwork from the input image. Do not change the design, text, or colors. The canvas should show the complete artwork with nothing cut off.`,

    unframed: `Show the EXACT artwork from the input image as an 18x24 unframed poster in a stunning editorial flat-lay arrangement.

The scene: A luxurious styled flat-lay on a warm cream linen surface. The poster is laid out beautifully alongside curated lifestyle objects — dried eucalyptus sprigs, a handmade ceramic mug with tea, a stack of Kinfolk magazines, a small brass candle holder, scattered dried flowers, a beautiful leather journal. Soft diffused natural light from a window creates gentle shadows.

CRITICAL PRINT ACCURACY: The poster is printed on MATTE paper. The artwork appears as a FLAT PRINT - no raised texture, no 3D paint effects, no glossy reflections. The watercolor and painterly textures from the original artwork are PRINTED onto the paper, appearing smooth and matte. This is what the customer will actually receive.

Photography style: Kinfolk/Anthropologie catalog editorial. Warm tones, impeccable styling, like a magazine cover shoot. The poster is the hero but surrounded by a lifestyle story.

CRITICAL: Use the EXACT artwork from the input image. Do not change the design, text, or colors. The poster must be fully visible and readable.`,

    framed: `Show the EXACT artwork from the input image in a simple Red Oak wood frame (warm honey-brown #D4A489) with an 18x24 inch MATTE print, being hung on a wall by a beautiful woman.

CRITICAL FRAME: Simple Red Oak frame only — NO white mat, NO border. Artwork edge-to-edge inside frame.

The scene: A hyperrealistic beautiful woman in cozy neutral clothing (cream sweater, soft linen) gently hanging the framed artwork on a warm-toned wall. She holds the frame with both hands, positioning it carefully, or steps back with one hand raised gracefully to check alignment. Beautiful warm afternoon light streaming through nearby windows. The room has warm wood floors, a linen sofa, a trailing pothos plant. The moment captures the quiet joy of creating a beautiful home.

NO TOOLS - no hammers, no nails visible, no levels. Just soft, graceful human interaction with the frame.

CRITICAL PRINT ACCURACY: The framed print is on MATTE paper with NO GLARE. Any watercolor, painterly, or textured elements in the original artwork appear as FLAT PRINTED texture - smooth, matte, no raised surfaces, no 3D paint effects popping out. The print accurately represents what the customer will receive: a beautiful matte print where artistic textures are printed, not physical.

Photography style: Architectural Digest meets lifestyle editorial. Hyperrealistic, warm, emotionally resonant. Premium product positioning.

CRITICAL: Use the EXACT artwork from the input image. Do NOT add any white mat or border inside the frame. The artwork must touch the frame edges directly.`
  };
}

// ============================================================================
// IMAGE GENERATION FUNCTIONS
// ============================================================================

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

    console.log(`=== MOCKUP IMAGE GENERATION ===`);
    console.log(`Affirmation: ${affirmationData.affirmationId} - "${affirmationData.title}"`);
    console.log(`Category: ${affirmationData.category}`);
    console.log(`Has input image: ${!!body.inputImageBase64}`);

    // Check if mockup images already exist (canvas, unframed, framed)
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", affirmationData.affirmationId)
      .eq("product_category", "affirmations")
      .in("variation_type", ["canvas", "unframed", "framed"]);

    if (existingImages && existingImages.length >= 3 && !body.forceRegenerate) {
      console.log("Mockup images already exist (use forceRegenerate to override)");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Mockup images already exist",
          images: existingImages 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Require inputImageBase64 - we use the user's curated digital artwork
    if (!body.inputImageBase64) {
      throw new Error("inputImageBase64 is required - provide the curated digital artwork");
    }

    // Delete existing mockup images before regenerating
    if (existingImages && existingImages.length > 0) {
      console.log(`Deleting ${existingImages.length} existing mockup images for regeneration`);
      await supabase
        .from("product_images")
        .delete()
        .eq("product_id", affirmationData.affirmationId)
        .eq("product_category", "affirmations")
        .in("variation_type", ["canvas", "unframed", "framed"]);
    }

    const generatedImages: { variation: string; url: string }[] = [];
    const inputImage = body.inputImageBase64;

    // Generate mockup variations using the curated digital artwork
    console.log("Generating mockup variations from curated artwork...");
    const mockupPrompts = generateMockupPrompts(affirmationData);
    const mockupVariations = ["canvas", "unframed", "framed"] as const;

    for (const variation of mockupVariations) {
      console.log(`Generating ${variation} mockup...`);
      
      const mockupImageBase64 = await generateMockupImage(
        mockupPrompts[variation], 
        inputImage, 
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
    console.log(`Generated ${generatedImages.length} mockups for ${affirmationData.affirmationId}`);

    return new Response(
      JSON.stringify({
        success: true,
        affirmationId: affirmationData.affirmationId,
        images: generatedImages,
        message: `Generated ${generatedImages.length} mockup images`
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
