import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Complete design variable sets for all 24 affirmations
// Aesthetic: Soft watercolor washes, delicate botanicals (ferns, leaves, branches),
// flowing organic waves, elegant script/serif typography, warm muted tones
const AFFIRMATION_DESIGNS: Record<string, {
  title: string;
  background: string;
  textColor: string;
  typography: string;
  textPosition: string;
  visualElements: string;
  layout: string;
  mood: string;
}> = {
  "aff-001": {
    title: "I am worthy of rest",
    background: "Soft cream to ivory wash with subtle warm grey watercolor clouds at edges, handmade paper texture",
    textColor: "Warm taupe-brown (#8B7355)",
    typography: "Elegant flowing script, like calligraphy with graceful flourishes",
    textPosition: "Center-left, flowing diagonally with natural rhythm",
    visualElements: "Delicate fern fronds in muted sage, soft flowing ribbon-like waves, tiny botanical sprigs",
    layout: "Organic diagonal flow with botanicals framing edges",
    mood: "Peaceful surrender, soft and dreamy"
  },
  "aff-002": {
    title: "I am worthy of peace",
    background: "Ethereal blue-grey watercolor wash with soft cream center, like moonlit mist clearing",
    textColor: "Warm golden-brown (#9A7B4F) with subtle shimmer",
    typography: "Romantic flowing script, elegant italic calligraphy with swashes",
    textPosition: "Center-left, stacked vertically with graceful line breaks",
    visualElements: "Glowing soft moon/sun orb behind text, delicate fern silhouettes, flowing leaf branches, subtle botanical shadows",
    layout: "Luminous center with watercolor edges darkening at corners, botanicals frame the glow",
    mood: "Tranquil, worthy of stillness, moonlit calm"
  },
  "aff-003": {
    title: "Growth is a journey, not a destination",
    background: "Warm cream parchment with soft watercolor earth tones at edges, torn paper texture",
    textColor: "Rich golden-brown (#A67C52) like aged leather",
    typography: "Bold elegant serif with slight curve, commanding yet warm",
    textPosition: "Upper portion, left-aligned with generous leading",
    visualElements: "Zen stepping stones winding through still water, botanical silhouettes framing (ferns, leaves), soft ripples",
    layout: "Text at top, illustrated path/stones below leading into distance",
    mood: "Patient growth, journey metaphor made visual"
  },
  "aff-004": {
    title: "I trust my journey",
    background: "Soft warm cream with subtle blush undertones, handmade paper texture with visible fibers",
    textColor: "Deep warm brown (#6B5344) with golden undertone",
    typography: "Flowing italic script, romantic calligraphy with elegant flourishes",
    textPosition: "Center, slightly elevated, flowing horizontally",
    visualElements: "Winding abstract path/ribbon, delicate fern fronds, small wildflowers, soft flowing waves",
    layout: "Soft flowing elements create movement around centered text",
    mood: "Quiet confidence, gentle forward motion"
  },
  "aff-005": {
    title: "I am always enough",
    background: "Minimal warm cream (#F5F0E8) with subtle arch shape, soft sandy dune at bottom horizon",
    textColor: "Rich near-black (#1A1A1A) for maximum contrast",
    typography: "Modern editorial serif, bold and confident, stacked vertically",
    textPosition: "Dead center with perfect balance",
    visualElements: "Single thin arch outline above text, minimal horizon line, vast negative space",
    layout: "Ultra-minimal, text is the art, breath-giving whitespace",
    mood: "Absolute self-acceptance, quiet power, modern zen"
  },
  "aff-006": {
    title: "My calm is my power",
    background: "Soft blue-grey watercolor wash fading to warm cream center",
    textColor: "Deep charcoal (#2D2D2D)",
    typography: "Steady modern serif, clean and grounded",
    textPosition: "Center, perfectly balanced",
    visualElements: "Gentle flowing waves/ribbons in muted tones, soft botanical shadows",
    layout: "Symmetric calm, elements flow around text without disruption",
    mood: "Intentional peace, strength in stillness"
  },
  "aff-007": {
    title: "I receive what I desire",
    background: "Soft blush pink watercolor fading to warm cream",
    textColor: "Deep rose-brown (#7A5C58)",
    typography: "Elegant serif with open, receptive letterforms",
    textPosition: "Lower third, grounded yet reaching",
    visualElements: "Soft flowing ribbon waves, delicate botanical sprigs, gentle abstract shapes",
    layout: "Elements flow downward toward text as if arriving",
    mood: "Openness, worthiness to receive"
  },
  "aff-008": {
    title: "Today, I honor myself",
    background: "Warm nude to soft mauve watercolor, organic texture",
    textColor: "Deep burgundy-brown (#5A3A3A)",
    typography: "Nurturing serif, gentle weight, self-caring presence",
    textPosition: "Lower center, grounded",
    visualElements: "Soft flowing waves, delicate botanicals, warm organic shapes",
    layout: "Embracing composition, elements curve protectively",
    mood: "Self-priority, gentle self-love"
  },
  "aff-009": {
    title: "I release what no longer serves",
    background: "Airy light cream with soft grey-beige flowing waves, like morning mist",
    textColor: "Warm taupe (#9A8B7A) soft and releasing",
    typography: "Light elegant serif, airy letter-spacing, graceful and floating",
    textPosition: "Center-left, text floats peacefully",
    visualElements: "Delicate flowing organic waves/ribbons, soft fern fronds, whisper-light botanicals",
    layout: "Diagonal flowing movement, elements drift and release",
    mood: "Letting go, liberation, lightness"
  },
  "aff-010": {
    title: "Joy is my natural state",
    background: "Soft buttercream yellow with warm golden watercolor washes",
    textColor: "Warm brown (#5C4033)",
    typography: "Cheerful serif with dancing baseline",
    textPosition: "Center, radiating outward",
    visualElements: "Soft sun rays, delicate wildflowers, gentle flowing elements",
    layout: "Joyful scattered composition, elements celebrating",
    mood: "Natural happiness, simple joy"
  },
  "aff-011": {
    title: "I am safe in my body",
    background: "Soft blush pink fading to warm cream, comforting wash",
    textColor: "Warm terracotta (#C17C60)",
    typography: "Rounded serif, nurturing and protective",
    textPosition: "Center, grounded",
    visualElements: "Protective flowing curves, soft organic shapes, grounding botanicals",
    layout: "Embracing composition, elements create safety",
    mood: "Security, embodiment, being held"
  },
  "aff-012": {
    title: "My voice matters",
    background: "Warm taupe-grey (#C5B8A8) with layered flowing waves in cream, gold, and muted colors",
    textColor: "Deep near-black (#1E1E1E) for bold impact",
    typography: "Bold modern serif, confident and powerful, strong presence",
    textPosition: "Center-left, bold statement positioning",
    visualElements: "Layered flowing wave ribbons with fine line details, organic curves suggesting sound/movement",
    layout: "Bold geometric-organic hybrid, waves create dynamic backdrop",
    mood: "Empowerment, being heard, confident expression"
  },
  "aff-013": {
    title: "I am worthy of my dreams",
    background: "Soft cloudy cream to pale blue-grey watercolor",
    textColor: "Deep navy-grey (#3A4A5A)",
    typography: "Dreamy serif, floating and aspirational",
    textPosition: "Center, among soft cloud forms",
    visualElements: "Soft watercolor clouds, distant stars, gentle flowing elements",
    layout: "Ethereal floating composition",
    mood: "Dream permission, aspiration"
  },
  "aff-014": {
    title: "I choose peace over perfection",
    background: "Soft sage green with subtle linen texture",
    textColor: "Charcoal grey (#2C2C2C)",
    typography: "Slightly imperfect hand-drawn serif feeling",
    textPosition: "Off-center, organic placement",
    visualElements: "Organic dots, gentle wave patterns, botanical suggestions",
    layout: "Deliberately imperfect, embracing organic flow",
    mood: "Acceptance, letting go of perfect"
  },
  "aff-015": {
    title: "I celebrate my progress",
    background: "Soft gradient from warm amber to gentle sage",
    textColor: "Rich plum-brown (#5B3256)",
    typography: "Evolving serif, elegant transformation",
    textPosition: "Center, in motion",
    visualElements: "Butterfly suggestions, blooming forms, growth spirals",
    layout: "Transformation narrative, evolution visible",
    mood: "Becoming, celebrating growth"
  },
  "aff-016": {
    title: "My intuition guides me",
    background: "Deep indigo fading to soft violet at edges",
    textColor: "Soft silver-white (#E8E4E0)",
    typography: "Mystical serif with ethereal presence",
    textPosition: "Center, emanating",
    visualElements: "Constellation dots, inner glow, cosmic subtle elements",
    layout: "Radial composition, energy from center",
    mood: "Inner knowing, cosmic connection"
  },
  "aff-017": {
    title: "I am open to miracles",
    background: "Dawn sky gradient—soft pink to blue to warm gold",
    textColor: "Deep teal (#2A5B5E)",
    typography: "Optimistic serif, forward-leaning",
    textPosition: "Upper area, looking to horizon",
    visualElements: "Sunrise rays, seeds in flight, new growth",
    layout: "Expansive horizon, openness ahead",
    mood: "Anticipation, new beginnings"
  },
  "aff-018": {
    title: "I give myself permission to feel",
    background: "Warm parchment cream with subtle texture",
    textColor: "Rich ink brown (#2D2416)",
    typography: "Literary serif, book-title elegance",
    textPosition: "Centered, classic layout",
    visualElements: "Subtle page suggestions, gentle organic elements",
    layout: "Classic centered hierarchy",
    mood: "Permission, emotional openness"
  },
  "aff-019": {
    title: "I am creating the life I desire",
    background: "Rich honey gold gradient to warm amber",
    textColor: "Deep burgundy brown (#4A2C2A)",
    typography: "Sophisticated serif, confident",
    textPosition: "Center-left, grounded",
    visualElements: "Warm light rays, organic flowing shapes",
    layout: "Elements converge toward center",
    mood: "Creative power, manifestation"
  },
  "aff-020": {
    title: "Today is full of possibility",
    background: "Soft gradient shifting warm amber to cool sage",
    textColor: "Deep bronze (#5D4E37)",
    typography: "Flowing transitional serif",
    textPosition: "Center, in motion",
    visualElements: "Flowing leaves, gentle transition elements",
    layout: "Dynamic flow, graceful movement",
    mood: "Possibility, openness"
  },
  "aff-021": {
    title: "I am allowed to change my mind",
    background: "Cool grey-blue with soft watercolor texture",
    textColor: "Warm charcoal (#333333)",
    typography: "Clear modern serif, structured",
    textPosition: "Right side, structured stack",
    visualElements: "Clean flowing lines, subtle doorway suggestion",
    layout: "Strong but soft structure",
    mood: "Permission, flexibility"
  },
  "aff-022": {
    title: "My rest is productive",
    background: "Soft sepia tones fading to warm neutral",
    textColor: "Aged warm brown (#6B5344)",
    typography: "Timeless serif, restful weight",
    textPosition: "Lower portion, grounded",
    visualElements: "Soft botanical shadows, peaceful elements",
    layout: "Restful composition, gentle grounding",
    mood: "Rest as value, peaceful productivity"
  },
  "aff-023": {
    title: "I attract what I embody",
    background: "Deep rose to soft blush gradient, petal-like",
    textColor: "Deep wine (#5C1A33)",
    typography: "Romantic serif, loving curves",
    textPosition: "Center, heart-centered",
    visualElements: "Soft petal suggestions, warm organic glow",
    layout: "Heart-centered, radiating outward",
    mood: "Self-love, magnetic presence"
  },
  "aff-024": {
    title: "I am both the storm and the calm",
    background: "Soft gradient warm gold to cream with subtle movement",
    textColor: "Rich bronze (#6B4423)",
    typography: "Balanced serif, dual nature",
    textPosition: "Center, in balance",
    visualElements: "Flowing waves suggesting both energy and stillness",
    layout: "Balanced duality, yin-yang flow",
    mood: "Embracing complexity, wholeness"
  }
};

// Build the complete prompt with quality override
function buildPrompt(design: typeof AFFIRMATION_DESIGNS[string]): string {
  return `Create a $1,000 gallery-quality art print design for the affirmation: "${design.title}"

DESIGN DIRECTION:
- Background: ${design.background}
- Text Color: ${design.textColor}
- Typography: ${design.typography}
- Text Position: ${design.textPosition}
- Visual Elements: ${design.visualElements}
- Layout: ${design.layout}
- Mood: ${design.mood}

BRAND REQUIREMENTS:
- Warm, feminine, editorial aesthetic (Kinfolk/Aesop/The Poster Club energy)
- Premium matte finish quality—no glossy or digital artifacts
- Edge-to-edge design filling the entire canvas—no visible paper edges, borders, or backgrounds
- 4:5 aspect ratio optimized for 18x24 inch printing
- The affirmation text must be clearly legible and beautifully integrated
- Subtle organic textures welcome (linen, cotton paper, handmade feel)
- No watercolor blobs, no Canva templates, no clip-art, no stock imagery

QUALITY OVERRIDE CLAUSE:
If ANY of the design directions above would compromise the $1,000 gallery-quality standard, you have FULL PERMISSION to change, modify, or completely reimagine those aspects. The specifications are creative direction, not rigid constraints. Gallery quality is the non-negotiable standard—everything else is flexible. Trust your artistic judgment to deliver a piece worthy of a premium art gallery.

Generate the complete artwork now.`;
}

// Convert base64 to Uint8Array for upload
function base64ToUint8Array(base64: string): Uint8Array {
  // Remove data URL prefix if present
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
    const { affirmationId, title, category } = await req.json();
    
    console.log(`Generating digital design for: ${title} (${affirmationId})`);

    // Get design variables for this affirmation
    const design = AFFIRMATION_DESIGNS[affirmationId];
    
    if (!design) {
      console.error(`No design found for affirmation ID: ${affirmationId}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `No design configuration found for: ${affirmationId}` 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build the complete prompt
    const prompt = buildPrompt(design);
    console.log(`Built prompt for: ${design.title}`);

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
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    const publicUrl = publicUrlData.publicUrl;
    console.log(`Successfully uploaded to: ${publicUrl}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl: publicUrl,
        affirmationId,
        title: design.title
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error generating affirmation:", message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
