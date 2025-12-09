import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 24 unique prompts inspired by the reference images
// Each design is completely unique - no two are the same
const AFFIRMATION_PROMPTS: Record<string, string> = {
  "aff-001": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am worthy of rest"

DESIGN STYLE: Soft flowing waves in muted cream and warm grey watercolor. Delicate fern fronds frame the edges. Typography is elegant script with flowing flourishes. The text flows diagonally from center-left. Background has handmade paper texture with subtle warm tones.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Just the artwork filling the entire canvas. Premium gallery quality like a $1,000 art print. Matte finish aesthetic.`,

  "aff-002": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am worthy of peace"

DESIGN STYLE: Ethereal blue-grey watercolor wash with luminous cream center. A soft glowing orb (like moonlight) sits behind the text. Delicate botanical silhouettes (leaves, branches) frame the glow. Typography is romantic flowing script with elegant swashes. Stacked vertically center-left.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Just the artwork filling the entire canvas. Premium matte gallery quality.`,

  "aff-003": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "Growth is a journey, not a destination"

DESIGN STYLE: Warm cream parchment background with soft earthy watercolor tones at edges. Zen stepping stones winding through still water illustrated below text. Fern and leaf silhouettes frame the composition. Bold elegant serif typography, left-aligned in upper portion. Soft ripples in the water.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Just the artwork filling the entire canvas. Like a $1,000 gallery print.`,

  "aff-004": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I trust my journey"

DESIGN STYLE: Soft warm cream with blush undertones, handmade paper texture with visible fibers. A winding abstract path/ribbon flows through the composition. Delicate fern fronds and small wildflowers scattered. Flowing italic script typography with romantic flourishes. Text centered and flowing horizontally.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Just the artwork filling entire canvas. Premium matte quality.`,

  "aff-005": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am always enough"

DESIGN STYLE: Ultra-minimal. Warm cream (#F5F0E8) background with a single thin arch outline above the text. Soft sandy dune at bottom horizon. Modern editorial serif, bold and confident, stacked vertically. Dead center placement with vast negative space. The text IS the art.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Modern zen aesthetic. Gallery quality.`,

  "aff-006": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "My calm is my power"

DESIGN STYLE: Soft blue-grey watercolor wash fading to warm cream center. Gentle flowing waves/ribbons in muted tones. Soft botanical shadows frame edges. Steady modern serif typography, clean and grounded. Perfectly centered and balanced. Elements flow around text without disruption.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Premium matte finish. Strength in stillness mood.`,

  "aff-007": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I receive what I desire"

DESIGN STYLE: Soft blush pink watercolor fading to warm cream. Flowing ribbon waves and delicate botanical sprigs flow downward toward text. Elegant serif with open letterforms. Text positioned in lower third, grounded yet reaching upward. Elements arriving like blessings.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Premium gallery aesthetic.`,

  "aff-008": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "Today, I honor myself"

DESIGN STYLE: Warm nude to soft mauve watercolor with organic texture. Flowing waves and delicate botanicals curve protectively around text. Nurturing serif typography with gentle weight. Lower center placement, grounded. Warm organic shapes embrace the composition.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Self-loving energy. Premium quality.`,

  "aff-009": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I release what no longer serves"

DESIGN STYLE: Airy light cream with soft grey-beige flowing waves like morning mist. Delicate organic wave ribbons create diagonal movement. Whisper-light fern fronds and botanicals float freely. Light elegant serif with airy letter-spacing. Text center-left, floating peacefully. Liberation mood.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Premium matte gallery print.`,

  "aff-010": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "Joy is my natural state"

DESIGN STYLE: Soft buttercream yellow with warm golden watercolor washes. Soft sun rays emanate outward. Delicate wildflowers scattered. Cheerful serif with dancing baseline. Center placement, radiating outward energy. Joyful scattered composition celebrating natural happiness.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Uplifting premium quality.`,

  "aff-011": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am safe in my body"

DESIGN STYLE: Soft blush pink fading to warm cream, comforting wash. Protective flowing curves and soft organic shapes. Grounding botanical elements. Rounded serif typography, nurturing and protective. Center placement, grounded. Elements create sense of safety and being held.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Embodied security mood.`,

  "aff-012": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "My voice matters"

DESIGN STYLE: Warm taupe-grey (#C5B8A8) background with layered flowing waves in cream, gold, and muted colors. Bold modern serif, powerful presence. Center-left bold statement positioning. Wave ribbons with fine line details suggest sound/movement. Geometric-organic hybrid.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Empowered expression. Premium gallery.`,

  "aff-013": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am worthy of my dreams"

DESIGN STYLE: Soft cloudy cream to pale blue-grey watercolor. Soft ethereal clouds and distant stars. Gentle flowing elements float around text. Dreamy serif typography, aspirational. Center placement among soft cloud forms. Ethereal floating composition.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Dream permission aesthetic.`,

  "aff-014": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I choose peace over perfection"

DESIGN STYLE: Soft sage green with subtle linen texture. Organic dots and gentle wave patterns. Botanical suggestions scattered naturally. Slightly imperfect hand-drawn serif feeling. Off-center organic placement. Deliberately imperfect, embracing organic flow.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Acceptance and letting go mood.`,

  "aff-015": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I celebrate my progress"

DESIGN STYLE: Soft gradient from warm amber to gentle sage. Butterfly suggestions and blooming forms. Growth spirals and transformation elements. Evolving serif typography showing elegant transformation. Center placement with sense of motion. Evolution visible.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Celebrating growth. Premium quality.`,

  "aff-016": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "My intuition guides me"

DESIGN STYLE: Deep indigo fading to soft violet at edges. Constellation dots and inner glow. Cosmic subtle elements. Mystical serif with ethereal presence. Center placement, emanating outward. Radial composition with energy from center. Inner knowing mood.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Cosmic connection aesthetic.`,

  "aff-017": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am open to miracles"

DESIGN STYLE: Dawn sky gradient—soft pink to blue to warm gold. Sunrise rays and seeds in flight. New growth emerging. Optimistic serif typography, forward-leaning. Upper area placement looking to horizon. Expansive openness ahead.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. New beginnings energy.`,

  "aff-018": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I give myself permission to feel"

DESIGN STYLE: Warm parchment cream with subtle texture. Subtle page suggestions and gentle organic elements. Literary serif like elegant book title. Classic centered layout. Permission and emotional openness mood. Gentle and inviting.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Gallery quality.`,

  "aff-019": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am creating the life I desire"

DESIGN STYLE: Rich honey gold gradient to warm amber. Warm light rays streaming. Organic flowing shapes converging toward center. Sophisticated serif, confident. Center-left placement, grounded. Creative power and manifestation energy.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Premium gallery aesthetic.`,

  "aff-020": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "Today is full of possibility"

DESIGN STYLE: Soft gradient shifting warm amber to cool sage. Flowing leaves in graceful transition. Flowing transitional serif typography. Center placement with sense of motion. Dynamic flow showing graceful movement. Possibility and openness.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Premium matte quality.`,

  "aff-021": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am allowed to change my mind"

DESIGN STYLE: Cool grey-blue with soft watercolor texture. Clean flowing lines and subtle doorway suggestion. Clear modern serif, structured but soft. Right side placement with structured stack. Strong but soft structure. Permission and flexibility.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Gallery quality.`,

  "aff-022": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "My rest is productive"

DESIGN STYLE: Soft sepia tones fading to warm neutral. Soft botanical shadows. Peaceful elements grounding the composition. Timeless serif with restful weight. Lower portion placement, grounded. Restful composition valuing rest.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Peaceful productivity mood.`,

  "aff-023": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I attract what I embody"

DESIGN STYLE: Deep rose to soft blush gradient, petal-like quality. Soft petal suggestions and warm organic glow. Romantic serif with loving curves. Heart-centered placement radiating outward. Self-love and magnetic presence.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Premium gallery aesthetic.`,

  "aff-024": `Create a full-canvas premium affirmation art print. TEXT MUST BE LARGE AND EXACT: "I am both the storm and the calm"

DESIGN STYLE: Soft gradient warm gold to cream with subtle movement. Flowing waves suggesting both energy and stillness. Balanced serif showing dual nature. Center placement in perfect balance. Yin-yang flow embracing complexity. Wholeness.

CRITICAL: Edge-to-edge design. NO paper edges, NO frames, NO borders. Premium matte gallery quality.`
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
