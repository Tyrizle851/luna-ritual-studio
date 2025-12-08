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
// PREMIUM THEME REGISTRY - Ported from Affirmation Builder design-spec.ts
// ============================================================================

interface ThemePalette {
  name: string;
  description: string;
  hex: string[];
  contrast: "low" | "medium" | "high";
}

interface ThemeDefinition {
  emotionalTone: string;
  defaultLayouts: string[];
  typography: { headline: string; support: string };
  energyLevel: "soft" | "supportive" | "direct" | "intense";
  palette: ThemePalette;
  brandAnchors: string[];
  avoid: string[];
}

const THEME_REGISTRY: Record<string, ThemeDefinition> = {
  "Self-Love": {
    emotionalTone: "nurturing, tender, self-compassionate, gentle embrace",
    defaultLayouts: ["arc-flow", "pebble-scatter", "circle-harmony"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    palette: {
      name: "healing_softness",
      description: "Faded terracotta with sun-bleached cream, dusty rose undertones, antique brass accents, warm linen whites",
      hex: ["#faf3e0", "#b5d3d1", "#e8b4a0", "#d4c5b0"],
      contrast: "low"
    },
    brandAnchors: ["European apothecary packaging", "Japanese wabi-sabi aesthetics", "Aesop product design"],
    avoid: ["obvious hearts", "pink clichés", "self-help visual tropes", "gradient meshes"]
  },
  "Abundance": {
    emotionalTone: "prosperous, open, flowing, rich, magnetic",
    defaultLayouts: ["circle-harmony", "floating-cluster", "arc-flow"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "supportive",
    palette: {
      name: "abundant_richness",
      description: "Aged copper and terracotta, Mediterranean warmth, olive and clay tones, antique gold whispers",
      hex: ["#2d5016", "#ffd700", "#f8f4e6", "#4a7029"],
      contrast: "medium"
    },
    brandAnchors: ["Rituals cosmetics", "Le Labo packaging", "Kinfolk magazine spreads"],
    avoid: ["money symbols", "obvious gold coins", "cheesy abundance imagery", "neon accents"]
  },
  "Rest": {
    emotionalTone: "calm, serene, tranquil, sanctuary-like, meditative",
    defaultLayouts: ["arc-flow", "floating-cluster", "circle-harmony", "breath-space-minimal"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    palette: {
      name: "peaceful_sanctuary",
      description: "Scandinavian spa aesthetic, fog and stone, muted sage, cool lavender whispers, morning mist",
      hex: ["#e8d5c4", "#9ab8b8", "#f5f5f5", "#6a7b7b"],
      contrast: "low"
    },
    brandAnchors: ["Apple meditation wallpapers", "Scandinavian spa interiors", "Muji aesthetic"],
    avoid: ["obvious clouds", "sleeping imagery", "zzz symbols", "blue clichés"]
  },
  "Joy": {
    emotionalTone: "bright, playful, radiant, warm delight, uplifting",
    defaultLayouts: ["circle-harmony", "floating-cluster", "radiant-center-burst"],
    typography: { headline: "display", support: "sans" },
    energyLevel: "supportive",
    palette: {
      name: "joyful_warmth",
      description: "Warm sunlight through linen, peach and honey tones, botanical illustration warmth, golden hour glow",
      hex: ["#fff5e1", "#ffb347", "#ff6b9d", "#ffe4b5"],
      contrast: "medium"
    },
    brandAnchors: ["Rifle Paper Co botanical art", "Anthropologie visual language", "sun-dappled editorial photography"],
    avoid: ["smiley faces", "rainbow clichés", "childish patterns", "harsh saturated colors"]
  },
  "Strength": {
    emotionalTone: "grounded, resilient, enduring, powerful yet refined",
    defaultLayouts: ["editorial-grid-luxe", "asymmetric-balance", "gentle-column"],
    typography: { headline: "sans", support: "sans" },
    energyLevel: "intense",
    palette: {
      name: "solid_strength",
      description: "Japanese temple garden aesthetic, grounded earth tones, architectural precision, bronze and stone",
      hex: ["#4a4a4a", "#c9a961", "#1c1c1c", "#2a2a2a"],
      contrast: "high"
    },
    brandAnchors: ["Aesop packaging", "Japanese architecture", "Tom Ford minimalism"],
    avoid: ["obvious muscles", "power fist imagery", "aggressive symbolism", "harsh contrast"]
  },
  "Peace": {
    emotionalTone: "calm, serene, tranquil, centered, still waters",
    defaultLayouts: ["arc-flow", "floating-cluster", "circle-harmony"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    palette: {
      name: "peaceful_neutrals",
      description: "Soft blues like early morning sky, warm grays, cream undertones, whisper of sage",
      hex: ["#e8d5c4", "#9ab8b8", "#f5f5f5", "#6a7b7b"],
      contrast: "low"
    },
    brandAnchors: ["Headspace app design", "calm.com aesthetic", "Nordic design principles"],
    avoid: ["obvious doves", "peace signs", "meditation clipart", "generic zen imagery"]
  },
  "Gratitude": {
    emotionalTone: "warm, appreciative, abundant, heartfelt, golden",
    defaultLayouts: ["circle-harmony", "arc-flow", "floating-cluster"],
    typography: { headline: "display", support: "serif" },
    energyLevel: "supportive",
    palette: {
      name: "grateful_warmth",
      description: "Terracotta sunset, warm gold light, cream and amber, harvest tones",
      hex: ["#f4e4d7", "#d4a574", "#8b6f47", "#faf3e0"],
      contrast: "medium"
    },
    brandAnchors: ["Kinfolk autumn editorials", "artisan ceramics photography", "golden hour aesthetics"],
    avoid: ["thank you cards clichés", "obvious hearts", "cheesy blessing imagery", "clipart elements"]
  },
  "Healing": {
    emotionalTone: "restorative, gentle, nurturing, tender recovery",
    defaultLayouts: ["arc-flow", "pebble-scatter", "circle-harmony"],
    typography: { headline: "serif", support: "script" },
    energyLevel: "soft",
    palette: {
      name: "healing_softness",
      description: "Soft peach and rose undertones, muted sage, warm cream, gentle clay",
      hex: ["#faf3e0", "#b5d3d1", "#e8b4a0", "#d4c5b0"],
      contrast: "low"
    },
    brandAnchors: ["spa and wellness branding", "Rituals packaging", "apothecary aesthetics"],
    avoid: ["bandage imagery", "medical symbols", "obvious healing hands", "new age clichés"]
  }
};

// ============================================================================
// GLOBAL AESTHETIC RULESET - ChatGPT's premium brand standards
// ============================================================================

const GLOBAL_AESTHETIC_RULESET = `
BRAND AESTHETIC STANDARDS (ALWAYS APPLY):
1. All outputs must align with a premium, editorial, quiet-luxury brand standard.
2. Lighting should always be warm, soft, and natural—never flat or digital.
3. Colors must stay within a muted, earthy palette: sand, cream, clay, eucalyptus, warm linen.
4. Artwork backgrounds must always include subtle texture (paper, linen, grain). Never smooth digital gradients.
5. Typography must always look like high-end magazine or boutique packaging.
6. Composition must use generous negative space and off-center layouts.
7. The brand feeling must remain emotionally warm, human, calm, and design-first.
8. No clutter, no sparkles, no bold gradients, no bright pastels, no template look.
9. Everything should look like it belongs inside a $600 interior design photoshoot.
10. Always prioritize emotional warmth, texture, natural lighting, and editorial sophistication.
`;

// ============================================================================
// AESTHETIC VARIATION SYSTEM - Controlled randomness for premium feel
// ============================================================================

function buildAestheticVariations(): string {
  const variations: string[] = [];
  
  // Material Texture System (40% chance)
  if (Math.random() < 0.40) {
    const textures = [
      "handmade paper texture, subtle grain, barely visible, premium tactile feel like letterpress stationery",
      "soft cotton rag paper, artisanal quality, gentle tooth, museum-grade feel",
      "matte vellum surface, smooth minimal texture, elegant archival base",
      "clay-coated matte finish, organic warmth, very subtle surface grain",
      "watercolor cold-press texture, gentle tooth, natural artist-quality feel"
    ];
    const selected = textures[Math.floor(Math.random() * textures.length)];
    variations.push(`Material texture: ${selected}`);
  }
  
  // Atmospheric Depth (30% chance)
  if (Math.random() < 0.30) {
    const atmospheric = [
      "soft natural light vignette, gentle edge softness, barely perceptible like gallery lighting",
      "light bloom spill, subtle halo behind headline text, ambient glow 2-5% opacity only",
      "film grain softness, analog warmth, very subtle like Portra 400 film",
      "faint tonal horizon band like morning sky, soft atmospheric depth gradient"
    ];
    const selected = atmospheric[Math.floor(Math.random() * atmospheric.length)];
    variations.push(`Atmospheric effect: ${selected}`);
  }
  
  // Botanical/Organic Shadow Layer (20% chance)
  if (Math.random() < 0.20) {
    const shadows = [
      "faint fern shadow, 4-6% opacity, organic whisper, barely visible natural light play",
      "olive branch shadow suggestion, subtle 5-8% opacity, Mediterranean hint",
      "eucalyptus shadow blur, delicate 4-7% opacity, spa-like calm",
      "tall grass shadow blur, soft 5-8% opacity, prairie serenity"
    ];
    const selected = shadows[Math.floor(Math.random() * shadows.length)];
    variations.push(`Organic shadow: ${selected} (NOT actual botanical elements, only their shadows)`);
  }
  
  // Hand-touch Micro Accents (10% chance)
  if (Math.random() < 0.10) {
    const accents = [
      "1-2 tiny delicate pencil speckles near text edge, barely visible artisan touch",
      "faint hand-drawn mark near headline corner, minimal organic accent like a calligrapher's flourish",
      "one minimal ink splatter whisper, very subtle, organic studio accident",
      "one minimal brush swoop in far background corner, whisper detail only"
    ];
    const selected = accents[Math.floor(Math.random() * accents.length)];
    variations.push(`Micro accent: ${selected} (extremely delicate, if too visible remove)`);
  }
  
  if (variations.length === 0) {
    return "Clean base aesthetic with no additional variations - pure minimal elegance.";
  }
  
  return variations.join('\n');
}

// ============================================================================
// PREMIUM DIGITAL ARTWORK PROMPT - ChatGPT's Premium Template
// ============================================================================

function generateDigitalPrompt(affirmation: AffirmationData): string {
  const theme = THEME_REGISTRY[affirmation.category] || THEME_REGISTRY["Self-Love"];
  const aestheticVariations = buildAestheticVariations();

  return `
Create a premium affirmation wall-art print that looks like a $200+ boutique gallery piece.

THE AFFIRMATION: "${affirmation.title}"

${GLOBAL_AESTHETIC_RULESET}

REQUIRED AESTHETIC:
- Warm, editorial, quiet-luxury styling
- ${theme.palette.description}
- Real paper or linen texture with subtle grain (not smooth digital gradients)
- Light film softness to avoid a harsh digital look
- Asymmetrical, magazine-style composition (no perfect centering)
- Generous negative space around the text (minimum 20% margins)
- Organic, handmade imperfections: tiny grain, soft analog noise, natural paper feel

TYPOGRAPHY RULES:
- Hero typeface: elegant serif (like Canela, Freight, Tiempos) or refined display
- Support type (optional): minimal, clean, non-decorative
- Max 2 fonts total
- Increased letter-spacing + tall line height for a luxury feel
- The affirmation text is the emotional focal point, not decorative elements
- Absolutely avoid generic script fonts, Canva fonts, and centered box layouts

MOOD & EMOTION:
- ${theme.emotionalTone}
- Serene, warm, contemplative, interior-designer quality
- Soft directional lighting like a morning room
- Zero clutter, zero bright colors, zero bold contrasts
- This should evoke the feeling of a calm, styled home

AESTHETIC VARIATIONS:
${aestheticVariations}

ABSOLUTELY AVOID (these destroy the premium feel):
${theme.avoid.map(a => `- ${a}`).join('\n')}
- Watercolor blobs or gradient meshes
- Clipart, fake botanicals, decorative flourishes
- Harsh shadows or perfect symmetry
- Flat beige backgrounds without visible texture
- Pinterest-quote aesthetic or Canva template look
- Text that feels cramped or touches edges
- Anything that looks mass-produced

FRAMING & OUTPUT:
- Pure artwork only (NO frame, NO canvas texture, NO mockup)
- Portrait orientation, 3:4 ratio (suitable for 18x24 print)
- Clean edges, print-ready quality
- This should look like it belongs in a curated boutique, not a big box store

Create something that makes someone pause, feel something, and want it on their wall.
`;
}

// ============================================================================
// PREMIUM MOCKUP PROMPTS
// ============================================================================

function generateMockupPrompts(affirmation: AffirmationData) {
  const includeHuman = () => Math.random() < 0.5;
  
  // CRITICAL: Dimensional accuracy for 18x24 inch prints
  const dimensionalGuidance = `
CRITICAL DIMENSIONAL ACCURACY (18x24 inches / 45.7 x 61 cm):
- The artwork MUST appear as a PORTRAIT orientation rectangle with 3:4 aspect ratio
- 18 inches wide x 24 inches tall - this is approximately 1.5 feet x 2 feet
- For scale reference: the artwork should appear roughly the size of a standard movie poster
- When shown on a wall, it should appear as a medium-large statement piece (not small, not oversized)
- If hands are holding it, the artwork should extend well beyond the hand span
- The proportions must be accurate - taller than wide, not square, not landscape
- DO NOT generate a square image or landscape orientation
`;

  const humanScenarios = {
    canvas: [
      "Someone in a cozy cashmere sweater gently adjusting the canvas, warm afternoon light streaming through sheer linen curtains, styled coffee table with ceramics in foreground, canvas as 18x24 statement piece",
      "A woman with elegant hands arranging the canvas in her bright Scandinavian living room, linen sofa visible, trailing pothos plant nearby, soft golden hour light, canvas at realistic 18x24 scale",
      "Someone in a chunky knit cardigan stepping back to admire the canvas in their serene bedroom, unmade linen bedding, warm wood floors, morning light filtering through curtains",
    ],
    unframed: [
      "Elegant hands holding the unrolled 18x24 poster (extending well beyond hand width), against a styled marble surface with a small ceramic vase and dried eucalyptus, warm natural light",
      "Someone in minimalist linen clothing positioning the poster against a textured cream plaster wall, a cozy throw blanket draped nearby, late afternoon sunlight casting gentle shadows",
      "A person carefully unrolling the poster on a worn oak farmhouse table, a steaming cup of tea nearby, soft window light with plant shadows, poster clearly 18x24 inches",
    ],
    framed: [
      "Someone in a cashmere sweater adjusting the framed piece on a gallery wall, styled with a small bench and throw pillow below, warm afternoon light casting soft shadows, frame at 18x24 scale",
      "A person admiring the framed artwork from their cozy reading nook, worn leather armchair visible, stack of books nearby, golden hour light through sheer curtains, frame proportions 3:4 portrait",
      "Elegant hands placing the framed poster on a floating oak shelf, next to a handmade ceramic vase with dried lavender, warm natural light, styled with intention",
    ]
  };

  const styledScenarios = {
    canvas: [
      "on a warm-toned wall in a bright, airy living room with linen sofa, trailing plants, a cozy throw blanket, and soft afternoon sunlight streaming through sheer curtains",
      "in a serene Scandinavian bedroom with unmade linen bedding, warm wood floors, a small reading chair, and morning light filtering through soft curtains",
      "above a styled credenza with handmade ceramics, a small potted plant, and books, in a room with warm natural light and visible wood textures",
    ],
    unframed: [
      "laid on a styled marble surface with a ceramic vase of dried eucalyptus, soft window light creating gentle shadows, warm and inviting atmosphere",
      "slightly curled at edges, leaning against a textured plaster wall in a sunlit corner, with a cozy throw blanket and potted plant nearby",
      "placed on a worn oak table with a cup of tea, a small candle, and soft morning light filtering through linen curtains",
    ],
    framed: [
      "hung in a cozy reading corner with a worn leather armchair, a stack of design books, warm wood floors, and late afternoon golden light",
      "displayed on a floating oak shelf with handmade ceramics, dried botanicals, and soft natural light creating a gallery-like atmosphere",
      "in a sunlit hallway with warm terracotta or wood floors, architectural details visible, soft shadows from nearby plants",
    ]
  };

  const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const photographyStyle = `
REQUIRED MOOD (CRITICAL - this is what makes it premium):
- Soft, warm sunlight (late afternoon or morning warmth)
- Subtle film grain for analog warmth
- Real interior textures: linen, wood, ceramics, matte surfaces
- Quiet luxury aesthetic (Kinfolk, Cereal Magazine, Aesop store energy)
- Natural shadows from plants or window blinds, very soft and diffused
- No bright white overexposure, no sterile minimalism
- Include foreground elements (plants, ceramics, fabric) with soft blur
- Shallow depth of field that draws focus to the artwork
- This should look like a professional home-interior photoshoot with emotional warmth, NOT a product render

${GLOBAL_AESTHETIC_RULESET}

WHAT THE MODEL MUST NOT DO:
- No fake 3D-rendered furniture
- No digital "studio backdrop"
- No blank beige wall with no shadows or context
- No centered floating frame with no environment
- No Canva-style room mockups or template look
- No harsh contrast or HDR lighting
- No sterile, empty, lifeless spaces
`;

  return {
    canvas: (includeHuman() ? `
Create a lifestyle interior mockup showcasing the printed affirmation artwork on a stretched canvas print in a realistic, editorial home setting.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

SCENE: ${randomFrom(humanScenarios.canvas)}

${dimensionalGuidance}

${photographyStyle}

CANVAS SPECIFICATIONS:
- Premium gallery-wrapped canvas with visible edge wrap texture
- Canvas dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- Show the texture of quality canvas material
- The text on the canvas must be fully visible and not cut off

STYLE GOAL: This should look like a professional home-interior photoshoot from Kinfolk or Cereal Magazine with emotional warmth, not a product render.
` : `
Create a lifestyle interior mockup showcasing the printed affirmation artwork on a stretched canvas print in a realistic, editorial home setting.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

SCENE: The canvas displayed ${randomFrom(styledScenarios.canvas)}

${dimensionalGuidance}

${photographyStyle}

CANVAS SPECIFICATIONS:
- Premium gallery-wrapped canvas with visible edge wrap texture
- Canvas dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- The text on the canvas must be fully visible and readable

STYLE GOAL: Editorial catalog photography, not a mockup. Should feel like Anthropologie Home or Kinfolk styling.
`),

    unframed: (includeHuman() ? `
Create a lifestyle interior mockup showcasing the affirmation artwork as an unframed 18x24 poster print in a realistic, editorial home setting.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

SCENE: ${randomFrom(humanScenarios.unframed)}

${dimensionalGuidance}

${photographyStyle}

POSTER SPECIFICATIONS:
- Premium matte archival paper finish
- Poster dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- Natural slight curl at edges is authentic and adds realism
- Show the quality weight of museum-grade paper stock
- The text must be fully visible and not cut off at any edge

STYLE GOAL: This should look like editorial product photography with warm, natural lighting and styled surfaces, not a flat mockup.
` : `
Create a lifestyle interior mockup showcasing the affirmation artwork as an unframed 18x24 poster print in a realistic, editorial home setting.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

SCENE: The poster ${randomFrom(styledScenarios.unframed)}

${dimensionalGuidance}

${photographyStyle}

POSTER SPECIFICATIONS:
- Premium matte archival paper finish
- Poster dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- Subtle paper curl is acceptable for authenticity
- The text must be completely visible and readable

STYLE GOAL: Editorial product photography with atmospheric warmth and styled context, like a high-end interior design catalog.
`),

    framed: (includeHuman() ? `
Create a lifestyle interior mockup showcasing the affirmation artwork in an 18x24 Red Oak wood frame in a realistic, editorial home setting.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

FRAME: Red Oak wood frame (warm honey-brown color, approximately #D4A489 or similar warm oak tone)
- Simple, elegant profile - not ornate
- Natural wood grain visible
- Premium quality appearance like a custom frame shop

SCENE: ${randomFrom(humanScenarios.framed)}

${dimensionalGuidance}

${photographyStyle}

FRAME SPECIFICATIONS:
- Frame holds an 18x24 inch print (3:4 portrait ratio)
- The overall framed piece will be slightly larger due to frame width and optional mat
- Frame casts subtle, soft shadows on the wall
- The text on the poster must be fully visible within the frame

STYLE GOAL: This should look like a professional interior design photoshoot with warm, emotional atmosphere, not a template frame mockup.
` : `
Create a lifestyle interior mockup showcasing the affirmation artwork in an 18x24 Red Oak wood frame in a realistic, editorial home setting.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

FRAME: Red Oak wood frame (warm honey-brown color, approximately #D4A489 or similar warm oak tone)
- Simple, elegant profile - not ornate
- Natural wood grain visible
- Premium quality like a custom frame shop

SCENE: The framed poster ${randomFrom(styledScenarios.framed)}

${dimensionalGuidance}

${photographyStyle}

FRAME SPECIFICATIONS:
- Frame holds an 18x24 inch print (3:4 portrait ratio)
- Frame casts gentle, realistic shadows
- The text must be completely visible and not cut off

STYLE GOAL: Editorial interior catalog photography - the framed artwork should feel like it belongs in Apartment Therapy or Architectural Digest, not a Canva mockup.
`)
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
