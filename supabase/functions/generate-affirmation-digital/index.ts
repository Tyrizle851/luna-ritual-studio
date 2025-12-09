import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Complete design variable sets for all 24 affirmations - keyed by actual IDs (aff-001, etc.)
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
  // aff-001: I am worthy of rest
  "aff-001": {
    title: "I am worthy of rest",
    background: "Deep midnight blue gradient fading to soft charcoal, like the quiet hour before dawn",
    textColor: "Warm ivory (#FAF8F5) with subtle cream undertones",
    typography: "Elegant thin serif, generous letter-spacing, lowercase except first letter",
    textPosition: "Lower third, left-aligned with breathing room from edges",
    visualElements: "Single crescent moon, delicate constellation dots, whisper of clouds",
    layout: "Asymmetric balance with moon as counterweight to text",
    mood: "Peaceful surrender, permission to pause"
  },

  // aff-002: I am worthy of peace
  "aff-002": {
    title: "I am worthy of peace",
    background: "Soft lavender fading to misty grey-blue",
    textColor: "Deep plum (#4A3B4D)",
    typography: "Serene serif, light weight, whisper-quiet presence",
    textPosition: "Upper portion, floating peacefully",
    visualElements: "Still water reflection, single lotus, gentle ripples",
    layout: "Reflective symmetry, water-like calm",
    mood: "Tranquility, deserving stillness"
  },

  // aff-003: Growth is a journey, not a destination
  "aff-003": {
    title: "Growth is a journey, not a destination",
    background: "Forest green gradient to soft moss",
    textColor: "Warm cream (#F8F4E8)",
    typography: "Organic serif, natural flow, varied baseline",
    textPosition: "Across middle, following gentle curve",
    visualElements: "Winding forest path, unfurling fern fronds, distant horizon",
    layout: "Horizontal journey flow, left to right progression",
    mood: "Patient growth, embracing the process"
  },

  // aff-004: I trust my journey
  "aff-004": {
    title: "I trust my journey",
    background: "Warm terracotta fading to dusty rose, like desert sunset",
    textColor: "Deep espresso brown (#3D2B1F)",
    typography: "Modern serif with slight italic lean, medium weight",
    textPosition: "Center-right, vertical orientation reading downward",
    visualElements: "Winding abstract path, distant mountains silhouette, single guiding star",
    layout: "Path leads eye from corner toward text",
    mood: "Quiet confidence, forward momentum"
  },

  // aff-005: I am always enough
  "aff-005": {
    title: "I am always enough",
    background: "Creamy off-white (#F5F0E8) with subtle paper grain texture",
    textColor: "Soft black (#1A1A1A)",
    typography: "Bold modern serif, statement weight, tight tracking",
    textPosition: "Dead center, commanding presence",
    visualElements: "Minimalist—single thin circle embracing text, nothing more",
    layout: "Centered symmetry, maximum negative space",
    mood: "Absolute self-acceptance, quiet power"
  },

  // aff-006: My calm is my power
  "aff-006": {
    title: "My calm is my power",
    background: "Soft blue-grey, like still lake at dawn",
    textColor: "Deep charcoal (#2D2D2D)",
    typography: "Steady serif, unwavering weight, anchored presence",
    textPosition: "Center, perfectly still",
    visualElements: "Still water surface, single ripple, zen stones, breath symbol",
    layout: "Perfect stillness, centered calm",
    mood: "Intentional peace, chosen serenity"
  },

  // aff-007: I receive what I desire
  "aff-007": {
    title: "I receive what I desire",
    background: "Soft coral pink to warm peach gradient",
    textColor: "Deep rose (#8B4557)",
    typography: "Graceful serif, open letter forms, receptive curves",
    textPosition: "Lower third, arms-open positioning",
    visualElements: "Open palms, flowing abundance, gentle rain of blessings",
    layout: "Receiving gesture, elements flowing downward toward text",
    mood: "Openness, worthiness to receive"
  },

  // aff-008: Today, I honor myself
  "aff-008": {
    title: "Today, I honor myself",
    background: "Warm nude to soft mauve gradient",
    textColor: "Deep burgundy (#722F37)",
    typography: "Nurturing serif, self-caring weight, gentle authority",
    textPosition: "Lower center, grounded self-care",
    visualElements: "Self-embrace gesture, nourishing elements, heart center glow",
    layout: "Inward-focused, self-honoring composition",
    mood: "Self-priority, healthy boundaries"
  },

  // aff-009: I release what no longer serves
  "aff-009": {
    title: "I release what no longer serves",
    background: "Gradient from soft grey to warm white, like morning fog lifting",
    textColor: "Deep slate (#4A4A4A)",
    typography: "Light weight serif, airy letter-spacing, graceful ascenders",
    textPosition: "Upper portion, text appears to float upward",
    visualElements: "Feathers drifting, abstract smoke wisps, open hands releasing",
    layout: "Upward movement, elements dispersing toward top",
    mood: "Letting go, liberation, lightness"
  },

  // aff-010: Joy is my natural state
  "aff-010": {
    title: "Joy is my natural state",
    background: "Soft buttercream yellow with warm golden undertones",
    textColor: "Warm brown (#5C4033)",
    typography: "Cheerful serif, dancing baseline, lighthearted weight",
    textPosition: "Scattered across canvas, playful placement",
    visualElements: "Tiny flowers, coffee cup steam, sun rays, small treasures",
    layout: "Scattered moments, delightful discovery",
    mood: "Everyday magic, present-moment joy"
  },

  // aff-011: I am safe in my body
  "aff-011": {
    title: "I am safe in my body",
    background: "Soft blush pink fading to warm cream",
    textColor: "Warm terracotta (#C17C60)",
    typography: "Rounded serif, nurturing weight, generous curves",
    textPosition: "Lower center, grounded and rooted",
    visualElements: "Abstract body silhouette, protective circle, grounding roots",
    layout: "Embracing composition, elements curve around text",
    mood: "Security, embodiment, groundedness"
  },

  // aff-012: My voice matters
  "aff-012": {
    title: "My voice matters",
    background: "Bold warm coral to soft terracotta",
    textColor: "Deep cocoa (#3E2C23)",
    typography: "Confident serif, medium-bold, clear articulation",
    textPosition: "Center-left, projecting outward",
    visualElements: "Sound waves radiating, megaphone suggestion, resonance circles",
    layout: "Outward projection, voice rippling out",
    mood: "Empowerment, being heard"
  },

  // aff-013: I am worthy of my dreams
  "aff-013": {
    title: "I am worthy of my dreams",
    background: "Soft cloudy gradient—white to pale blue to soft grey",
    textColor: "Deep navy (#1E3A5F)",
    typography: "Dreamy serif, floating weight, aspirational presence",
    textPosition: "Center, among the clouds",
    visualElements: "Soft clouds, distant stars, sleeping moon, dream bubbles",
    layout: "Floating composition, dreamlike atmosphere",
    mood: "Validation, aspiration, dream permission"
  },

  // aff-014: I choose peace over perfection
  "aff-014": {
    title: "I choose peace over perfection",
    background: "Soft sage green with subtle linen texture overlay",
    textColor: "Charcoal grey (#2C2C2C)",
    typography: "Hand-drawn serif feeling, slightly imperfect baseline",
    textPosition: "Upper left quadrant, diagonal flow",
    visualElements: "Abstract heart outline, gentle wave patterns, organic dots",
    layout: "Scattered organic elements create visual rhythm",
    mood: "Emotional openness, vulnerability as strength"
  },

  // aff-015: I celebrate my progress
  "aff-015": {
    title: "I celebrate my progress",
    background: "Gradient from cocoon brown to butterfly wing iridescence",
    textColor: "Rich plum (#5B3256)",
    typography: "Transformational serif, evolving presence, emerging boldness",
    textPosition: "Center, in transformation",
    visualElements: "Chrysalis to butterfly, blooming flower stages, evolution spiral",
    layout: "Transformation narrative, before to after flow",
    mood: "Becoming, evolution, self-actualization"
  },

  // aff-016: My intuition guides me
  "aff-016": {
    title: "My intuition guides me",
    background: "Deep indigo to soft violet gradient, cosmic depth",
    textColor: "Soft silver-white (#E8E4E0)",
    typography: "Mystical serif, slight glow effect, ethereal weight",
    textPosition: "Center, emanating outward",
    visualElements: "Third eye suggestion, constellation map, inner light glow",
    layout: "Radial composition, energy emanating from center",
    mood: "Inner knowing, cosmic connection"
  },

  // aff-017: I am open to miracles
  "aff-017": {
    title: "I am open to miracles",
    background: "Dawn sky gradient—soft pink to light blue to warm gold",
    textColor: "Deep teal (#2A5B5E)",
    typography: "Forward-leaning serif, optimistic angle, bright presence",
    textPosition: "Upper right, looking toward horizon",
    visualElements: "Open door, sunrise rays, seeds taking flight, new sprouts",
    layout: "Expansive horizon, openness ahead",
    mood: "Anticipation, openness, new beginnings"
  },

  // aff-018: I give myself permission to feel
  "aff-018": {
    title: "I give myself permission to feel",
    background: "Warm parchment cream with subtle aged texture",
    textColor: "Rich ink brown (#2D2416)",
    typography: "Literary serif, book-title elegance, balanced weight",
    textPosition: "Center, like a book title page",
    visualElements: "Quill suggestion, ink drops, page corner curl, subtle chapter marks",
    layout: "Classic book layout, centered hierarchy",
    mood: "Authorship, creative power, narrative control"
  },

  // aff-019: I am creating the life I desire
  "aff-019": {
    title: "I am creating the life I desire",
    background: "Rich honey gold gradient to warm amber",
    textColor: "Deep burgundy brown (#4A2C2A)",
    typography: "Sophisticated serif, medium-bold, classic proportions",
    textPosition: "Center-left, grounded placement",
    visualElements: "Magnetic abstract shapes, golden ratio spiral, warm light rays",
    layout: "Elements flowing toward center, convergence",
    mood: "Magnetic confidence, worthiness"
  },

  // aff-020: Today is full of possibility
  "aff-020": {
    title: "Today is full of possibility",
    background: "Gradient shifting through seasons—warm amber to cool sage",
    textColor: "Deep bronze (#5D4E37)",
    typography: "Transitional serif, flowing curves, elegant movement",
    textPosition: "Center-right, in motion",
    visualElements: "Butterfly transformation, flowing leaves, metamorphosis symbols",
    layout: "Dynamic flow, elements in graceful transition",
    mood: "Graceful adaptation, flowing with life"
  },

  // aff-021: I am allowed to change my mind
  "aff-021": {
    title: "I am allowed to change my mind",
    background: "Cool grey-blue with architectural texture",
    textColor: "Warm charcoal (#333333)",
    typography: "Strong serif, defined edges, clear structure",
    textPosition: "Right side, vertical stack, structured",
    visualElements: "Clean geometric lines, subtle doorway frame, protective threshold",
    layout: "Strong vertical lines creating visual boundaries",
    mood: "Self-respect, clarity, protection"
  },

  // aff-022: My rest is productive
  "aff-022": {
    title: "My rest is productive",
    background: "Soft sepia tones fading to warm neutral",
    textColor: "Aged brown (#6B5344)",
    typography: "Timeless serif, dignified weight, classic grace",
    textPosition: "Lower portion, grounded in acceptance",
    visualElements: "Faded photographs suggestion, healing light, closed book",
    layout: "Retrospective composition, looking back with peace",
    mood: "Acceptance, healing, closure"
  },

  // aff-023: I attract what I embody
  "aff-023": {
    title: "I attract what I embody",
    background: "Deep rose to soft blush gradient, like rose petals",
    textColor: "Deep wine (#5C1A33)",
    typography: "Romantic serif, loving weight, heartfelt curves",
    textPosition: "Center, heart-centered placement",
    visualElements: "Rose petals, gentle heart shapes, warm embrace, soft glow",
    layout: "Heart-centered composition, love radiating outward",
    mood: "Self-love, deserving love, heart opening"
  },

  // aff-024: I am both the storm and the calm
  "aff-024": {
    title: "I am both the storm and the calm",
    background: "Soft gradient suggesting clock face—warm gold to soft cream",
    textColor: "Rich bronze (#6B4423)",
    typography: "Timeless serif, patient weight, enduring presence",
    textPosition: "Center, in perfect time",
    visualElements: "Clock hands, celestial cycles, seasonal wheel, hourglass",
    layout: "Circular time composition, cyclical flow",
    mood: "Divine timing, patience, trust"
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
          error: `No design configuration found for: ${affirmationId}. Available IDs: ${Object.keys(AFFIRMATION_DESIGNS).join(", ")}` 
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
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data, null, 2));
      throw new Error("No image generated in response");
    }

    console.log(`Successfully generated image for: ${design.title}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl,
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
