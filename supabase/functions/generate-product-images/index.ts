import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProductImageRequest {
  productId: string;
  productCategory: string;
  productName: string;
  productDescription: string;
  originalImageUrl: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, productCategory, productName, productDescription, originalImageUrl } = 
      await req.json() as ProductImageRequest;

    console.log(`Generating images for product: ${productId} (${productName})`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase environment variables not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if images already exist for this product
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .eq("product_category", productCategory);

    if (existingImages && existingImages.length > 0) {
      console.log(`Images already exist for ${productId}, returning existing`);
      return new Response(JSON.stringify({ 
        success: true, 
        images: existingImages,
        message: "Images already generated"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Define image variation prompts
    const variations = [
      {
        type: "lifestyle",
        prompt: `Create a premium lifestyle photograph of ${productName}. Show the item in an elegant, warm setting with soft natural lighting. The scene should feel luxurious and aspirational - think high-end editorial photography. Maintain the product's exact appearance and quality. Warm tones, cozy atmosphere, magazine-quality composition.`
      },
      {
        type: "detail",
        prompt: `Create a beautiful close-up detail shot of ${productName}. Focus on the luxurious texture, quality craftsmanship, and fine details. Show the material's sheen and quality. Soft, diffused lighting. Clean, minimal background. Premium product photography style.`
      },
      {
        type: "styled",
        prompt: `Create an aspirational styled shot of ${productName}. Show the item artfully arranged with complementary items in a curated flat-lay or vignette style. Think lifestyle magazine editorial. Warm, inviting colors. Premium aesthetic with natural textures like linen, wood, or fresh flowers nearby.`
      }
    ];

    const generatedImages: Array<{ variation_type: string; image_url: string }> = [];

    // First, store the original image reference
    const { error: originalError } = await supabase
      .from("product_images")
      .insert({
        product_id: productId,
        product_category: productCategory,
        variation_type: "original",
        image_url: originalImageUrl
      });

    if (originalError) {
      console.error("Error storing original image:", originalError);
    } else {
      generatedImages.push({ variation_type: "original", image_url: originalImageUrl });
    }

    // Generate each variation
    for (const variation of variations) {
      try {
        console.log(`Generating ${variation.type} variation for ${productId}...`);

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
                content: variation.prompt
              }
            ],
            modalities: ["image", "text"]
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`AI API error for ${variation.type}:`, response.status, errorText);
          continue;
        }

        const data = await response.json();
        const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (!imageData) {
          console.error(`No image generated for ${variation.type}`);
          continue;
        }

        // Extract base64 data from data URL
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

        // Upload to Supabase storage
        const fileName = `${productCategory}/${productId}/${variation.type}-${Date.now()}.png`;
        
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageBuffer, {
            contentType: "image/png",
            upsert: true
          });

        if (uploadError) {
          console.error(`Upload error for ${variation.type}:`, uploadError);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;

        // Store in database
        const { error: dbError } = await supabase
          .from("product_images")
          .insert({
            product_id: productId,
            product_category: productCategory,
            variation_type: variation.type,
            image_url: publicUrl
          });

        if (dbError) {
          console.error(`Database error for ${variation.type}:`, dbError);
          continue;
        }

        generatedImages.push({ variation_type: variation.type, image_url: publicUrl });
        console.log(`Successfully generated ${variation.type} for ${productId}`);

      } catch (error) {
        console.error(`Error generating ${variation.type}:`, error);
        continue;
      }
    }

    console.log(`Completed generation for ${productId}. Generated ${generatedImages.length} images.`);

    return new Response(JSON.stringify({ 
      success: true, 
      images: generatedImages,
      message: `Generated ${generatedImages.length} images`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-product-images:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
