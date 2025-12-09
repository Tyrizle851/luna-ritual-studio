import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================
// PRINT PRODUCTION KNOWLEDGE (Critical for quality output)
// ============================================================
// - FULL BLEED: Ink/texture must go edge-to-edge (no paper sitting on background)
// - NO MOCKUP BACKDROP: The AI must act like a scanner, not a photographer
// - DECKLE EDGE TRAP: Cannot have visible torn edges AND full bleed simultaneously
// - MATTE PAPER: Best for fake texture illusion - no glare conflicts with shadows
// - THE GOLD PROBLEM: Digital gold prints as mustard on matte - use contrast/lighting for shine
// - ASPECT RATIO: 4:5 portrait for 18x24 prints
// - TEXT SIZE: 40-50% canvas width with 20% margin buffer from edges
// - COLORS: Warm earth tones + cool dusty blues work well on matte paper

// 15 prompts for AI generation (other 9 use user-provided images)
// User-provided images: aff-002, aff-003, aff-004, aff-005, aff-007, aff-009, aff-012, aff-017, aff-024
const AFFIRMATION_PROMPTS: Record<string, string> = {
  "aff-001": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with warm cream handmade paper texture. NO background surface, NO borders, NO margins, NO mockup backdrop, NO visible paper edges.

TEXT EXACT AND LARGE: "I am worthy of rest"
Text occupies 40-50% of canvas width, centered with generous 20% margin buffer from all edges. Elegant flowing script in deep warm brown (#3D2B1F). Text positioned center-left with flowing diagonal movement.

DESIGN ELEMENTS: Soft indigo and sage watercolor wash at edges. Delicate fern frond silhouettes frame the composition. Gentle flowing waves in muted cream and warm grey. Handmade paper texture visible throughout.

AESTHETIC: Premium gallery-quality art print worth $1,000. Matte finish optimized - warm earth tones that look velvety, not plastic. NO metallic gold (use warm amber with shadow/highlight contrast for any shine effect). Kinfolk magazine editorial calm.`,

  "aff-006": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft dusty blue-grey gradient. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "My calm is my power"
Text occupies 40-50% of canvas width, centered with generous 20% margin buffer. Steady modern serif in deep charcoal (#2C2C2C), perfectly centered and balanced. Clean, grounded typography.

DESIGN ELEMENTS: Soft blue-grey watercolor wash fading to warm cream center. Gentle flowing wave ribbons in muted tones. Soft botanical shadows frame edges. Elements flow around text without disruption.

AESTHETIC: Premium matte gallery print. Strength in stillness mood. Cool dusty blue palette with warm cream accents. Modern editorial minimalism.`,

  "aff-008": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with warm nude to soft mauve watercolor texture. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "Today, I honor myself"
Text occupies 40-50% of canvas width, positioned lower center, grounded. Nurturing serif typography in deep terracotta (#8B4513) with gentle weight.

DESIGN ELEMENTS: Organic flowing waves and delicate botanicals curve protectively around text. Warm organic shapes embrace the composition. Soft watercolor texture with visible paper grain.

AESTHETIC: Self-loving energy. Premium matte quality. Warm blush and mauve tones. The design feels like a gentle embrace.`,

  "aff-010": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft buttercream yellow watercolor. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "Joy is my natural state"
Text occupies 40-50% of canvas width, center placement radiating outward energy. Cheerful serif in warm amber (#B8860B) with dancing baseline.

DESIGN ELEMENTS: Warm golden watercolor washes. Soft sun rays emanating outward from behind text. Delicate wildflower silhouettes scattered naturally. Joyful, uplifting scattered composition.

AESTHETIC: Celebrating natural happiness. Premium matte - warm amber that looks rich, not plastic. Uplifting energy radiating from center.`,

  "aff-011": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft blush pink fading to warm cream. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I am safe in my body"
Text occupies 40-50% of canvas width, center placement, grounded. Rounded serif typography in dusty rose (#BC8F8F), nurturing and protective.

DESIGN ELEMENTS: Protective flowing curves and soft organic shapes. Grounding botanical elements at base. Elements create sense of safety and being held. Comforting wash texture throughout.

AESTHETIC: Embodied security mood. Premium matte quality. Soft blush and cream palette. The design feels like a protective embrace.`,

  "aff-013": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft cloudy cream to pale blue-grey watercolor. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I am worthy of my dreams"
Text occupies 40-50% of canvas width, center placement among soft cloud forms. Dreamy serif typography in soft indigo (#4B5D78), aspirational.

DESIGN ELEMENTS: Soft ethereal clouds and distant star suggestions. Gentle flowing elements float around text. Pale blue gradient fading to cream. Ethereal floating composition.

AESTHETIC: Dream permission aesthetic. Premium gallery quality. Cool dusty blue with warm cream balance. The design feels light and aspirational.`,

  "aff-014": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft sage green linen texture. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I choose peace over perfection"
Text occupies 40-50% of canvas width, off-center organic placement. Slightly imperfect hand-drawn serif feeling in deep forest green (#2F4F4F).

DESIGN ELEMENTS: Organic dots and gentle wave patterns. Botanical suggestions scattered naturally. Deliberately imperfect, embracing organic flow. Subtle linen texture visible.

AESTHETIC: Acceptance and letting go mood. Premium matte quality. Sage green palette with natural imperfection. Wabi-sabi inspired editorial calm.`,

  "aff-015": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft gradient from warm amber to gentle sage. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I celebrate my progress"
Text occupies 40-50% of canvas width, center placement with sense of motion. Evolving serif typography in rich amber (#CD853F) showing elegant transformation.

DESIGN ELEMENTS: Butterfly silhouette suggestions and blooming forms. Growth spirals and transformation elements. Evolution visible in flowing organic shapes. Warm to cool gradient transition.

AESTHETIC: Celebrating growth. Premium matte quality. Warm amber and sage palette. The design shows transformation in progress.`,

  "aff-016": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with deep indigo fading to soft violet at edges. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "My intuition guides me"
Text occupies 40-50% of canvas width, center placement emanating outward. Mystical serif typography in soft cream (#F5F5DC) with ethereal presence.

DESIGN ELEMENTS: Constellation dot suggestions and inner glow from center. Cosmic subtle elements. Radial composition with energy radiating from center. Deep indigo with violet edge glow.

AESTHETIC: Cosmic connection aesthetic. Inner knowing mood. Premium matte - deep indigo that looks velvety. Light text on dark for dramatic contrast.`,

  "aff-018": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with warm parchment cream with subtle texture. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I give myself permission to feel"
Text occupies 40-50% of canvas width, classic centered layout. Literary serif typography in warm sepia (#5D4E37) like an elegant book title.

DESIGN ELEMENTS: Subtle page-like organic elements. Gentle botanical accents at corners. Permission and emotional openness mood. Warm parchment texture visible.

AESTHETIC: Gentle and inviting. Premium gallery quality. Warm cream and sepia tones. The design feels like opening a treasured book.`,

  "aff-019": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with rich honey gold gradient to warm amber. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I am creating the life I desire"
Text occupies 40-50% of canvas width, center-left placement, grounded. Sophisticated serif in deep brown (#4A3728), confident.

DESIGN ELEMENTS: Warm light rays streaming from upper area. Organic flowing shapes converging toward center. Rich amber tones with contrast for shine effect (not metallic gold). Creative power energy.

AESTHETIC: Manifestation energy. Premium matte - honey gold using shadow/highlight for depth, not metallic sheen. Warm and abundant.`,

  "aff-020": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft gradient shifting warm amber to cool sage. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "Today is full of possibility"
Text occupies 40-50% of canvas width, center placement with sense of motion. Flowing transitional serif typography in warm brown (#6B4423).

DESIGN ELEMENTS: Flowing leaves in graceful transition. Dynamic flow showing graceful movement. Warm to cool gradient transition. Possibility and openness mood.

AESTHETIC: Premium matte quality. Amber to sage transition. The design shows movement from present to future possibilities.`,

  "aff-021": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with cool grey-blue watercolor texture. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I am allowed to change my mind"
Text occupies 40-50% of canvas width, right side placement with structured stack. Clear modern serif in deep slate (#4A5568), structured but soft.

DESIGN ELEMENTS: Clean flowing lines and subtle doorway suggestion. Strong but soft structure. Cool grey-blue palette with clean lines. Permission and flexibility mood.

AESTHETIC: Gallery quality. Cool dusty blue palette. The design feels structured yet flexible - permission to pivot.`,

  "aff-022": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with soft sepia tones fading to warm neutral. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "My rest is productive"
Text occupies 40-50% of canvas width, lower portion placement, grounded. Timeless serif in warm brown (#5D4E37) with restful weight.

DESIGN ELEMENTS: Soft botanical shadows grounding the composition. Peaceful elements. Restful composition that values rest. Sepia and warm neutral tones.

AESTHETIC: Peaceful productivity mood. Premium matte quality. Warm sepia palette. The design feels restful yet purposeful.`,

  "aff-023": `DIGITAL ART SOURCE FILE - FULL BLEED TEXTURE. 4:5 portrait aspect ratio.
The entire canvas is filled edge-to-edge with deep rose to soft blush gradient, petal-like quality. NO background surface, NO borders, NO margins, NO mockup backdrop.

TEXT EXACT AND LARGE: "I attract what I embody"
Text occupies 40-50% of canvas width, heart-centered placement radiating outward. Romantic serif in deep rose (#8B3A5D) with loving curves.

DESIGN ELEMENTS: Soft petal suggestions and warm organic glow. Self-love and magnetic presence. Rose gradient with natural petal quality. Radiating from center.

AESTHETIC: Premium gallery aesthetic. Deep rose to blush palette. The design embodies self-love and attraction energy.`
};

// Convert base64 to Uint8Array for upload
function base64ToUint8Array(base64: string): Uint8Array {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { affirmationId, title } = await req.json();
    
    console.log(`Generating digital design for: ${title} (${affirmationId})`);

    // Check if this affirmation has a user-provided image
    const userProvidedIds = ["aff-002", "aff-003", "aff-004", "aff-005", "aff-007", "aff-009", "aff-012", "aff-017", "aff-024"];
    if (userProvidedIds.includes(affirmationId)) {
      console.log(`Skipping ${affirmationId} - uses user-provided image`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `${affirmationId} uses a user-provided image and should not be regenerated.`,
          skipped: true
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get prompt for this affirmation
    const prompt = AFFIRMATION_PROMPTS[affirmationId];
    
    if (!prompt) {
      console.error(`No prompt found for affirmation ID: ${affirmationId}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `No prompt configuration found for: ${affirmationId}` 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Using prompt for: ${title}`);

    // Get API key
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Call Gemini 3 Pro Image Preview via Lovable AI Gateway
    console.log("Calling AI Gateway...");
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

    // Handle rate limiting and payment errors
    if (response.status === 429) {
      console.error("Rate limit exceeded");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Rate limit exceeded. Please try again later." 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (response.status === 402) {
      console.error("Payment required");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Payment required. Please add credits to continue." 
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI Gateway error: ${response.status} - ${errorText}`);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received response from AI Gateway");

    // Extract the generated image
    const imageDataUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageDataUrl) {
      console.error("No image in response");
      throw new Error("No image generated in response");
    }

    console.log(`Image generated, uploading to storage...`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Convert base64 to bytes and upload to storage
    const imageBytes = base64ToUint8Array(imageDataUrl);
    const fileName = `affirmations/digital/${affirmationId}-${Date.now()}.png`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageBytes, {
        contentType: "image/png",
        upsert: true
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;
    console.log(`Image uploaded successfully: ${imageUrl}`);

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl,
        affirmationId,
        title
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating affirmation digital:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
