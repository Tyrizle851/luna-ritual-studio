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
// PREMIUM DIGITAL ARTWORK PROMPT
// ============================================================================

function generateDigitalPrompt(affirmation: AffirmationData): string {
  const theme = THEME_REGISTRY[affirmation.category] || THEME_REGISTRY["Self-Love"];
  const aestheticVariations = buildAestheticVariations();
  
  // Select random layout from theme defaults
  const layout = theme.defaultLayouts[Math.floor(Math.random() * theme.defaultLayouts.length)];
  
  // Typography guidance based on theme
  const typographyGuide = theme.typography.headline === "serif" 
    ? "elegant serif typeface (like Canela, Freight Display, Tiempos) paired with refined script or serif supporting text"
    : theme.typography.headline === "display"
    ? "distinctive display typeface with character paired with clean sans-serif supporting text"
    : "refined sans-serif (like Founders Grotesk, Basis Grotesque, Söhne) with geometric precision";

  return `
You are an award-winning editorial art director creating a premium wall art print for a luxury wellness brand. This design should feel like it costs $200+ in a curated boutique.

THE AFFIRMATION: "${affirmation.title}"

VISUAL REFERENCE POINTS (study and channel these aesthetics):
${theme.brandAnchors.map(b => `- ${b}`).join('\n')}
- Apple's meditation wallpapers: serene, modern, breathable negative space
- High-end Japanese stationery: refined restraint, beautiful emptiness
- Kinfolk magazine layouts: curated simplicity, natural materials feel

EMOTIONAL DIRECTION:
- ${theme.emotionalTone}
- Energy level: ${theme.energyLevel}
- Layout archetype: ${layout}

COLOR WORLD:
${theme.palette.description}
Palette: ${theme.palette.hex.join(', ')}
- Colors should feel like they've been mixed by hand, not picked from a digital color picker
- Add warmth and depth to avoid flat digital colors
- Consider very soft, almost invisible noise or texture overlay

TYPOGRAPHY REQUIREMENTS (CRITICAL FOR PREMIUM FEEL):
- The affirmation text is the hero - give it visual weight and generous breathing room
- Use ${typographyGuide}
- NO MORE than 2 typefaces total
- Generous letter-spacing (tracking) - this is what separates premium from amateur
- Line heights that feel meditative, never cramped
- Consider hierarchy: perhaps a smaller decorative element or flourish above/below the main text
- Text color should contrast beautifully with background while remaining refined

COMPOSITION RULES:
- Portrait orientation (3:4 aspect ratio suitable for 18x24 print)
- Minimum 20% margins on all sides - the text should feel like it's floating in space
- Asymmetrical balance is more premium than dead center
- Let negative space do the heavy lifting - less is more
- If using decorative elements, they should feel hand-drawn or organic, NEVER clipart

SURFACE & TEXTURE:
- Background should have subtle material quality: handmade paper, soft linen texture, subtle grain
- Avoid flat digital colors - add warmth, depth, natural imperfection
- Consider very soft, almost invisible noise overlay

AESTHETIC VARIATIONS FOR THIS PIECE:
${aestheticVariations}

BASELINE AESTHETIC (ALWAYS APPLY):
Premium minimal natural aesthetic, modern editorial calm, clean negative space, organic texture subtle, light film softness, botanical shadow whisper, no harsh gradients, no clutter, no graphic filters, no obvious patterns, quiet luxury feel.

ABSOLUTELY AVOID (CRITICAL - these destroy premium feel):
${theme.avoid.map(a => `- ${a}`).join('\n')}
- Anything that looks like a Canva template or Pinterest quote graphic
- Generic script fonts that look like free downloads
- Watercolor blob backgrounds (extremely overdone)
- Sparkle effects, glitter, or obvious shine
- Harsh drop shadows or beveled effects
- Centered text in a box layout
- Any elements that feel mass-produced or template-like
- Text touching or near edges
- Cluttered compositions
- Instagram-filter effects

FINAL PRINT SPECIFICATIONS:
- Pure artwork only - NO frame, NO canvas texture, NO mockup elements
- Clean edges suitable for any framing option
- Printable at 18x24 inches at high resolution
- Portrait orientation (3:4 ratio)
- This should look like it belongs in a curated boutique, not a big box store
- The kind of piece an interior designer would specify for a client

Create something museum-quality that would make someone pause and feel something.
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
      "A person with elegant hands gently adjusting the canvas on a minimalist gallery wall, soft cashmere sweater visible, the canvas clearly visible as 18x24 medium-large statement piece",
      "Someone in a cozy knit sweater admiring the canvas in their bright, airy Scandinavian-style living room, canvas shown at realistic 18x24 scale relative to furniture",
      "A woman's silhouette hanging the canvas in a sunlit bedroom with linen bedding, canvas proportioned correctly as portrait 3:4 ratio",
    ],
    unframed: [
      "Elegant hands holding the unrolled 18x24 poster (the poster extends well beyond hand width), revealing the design against a clean marble surface",
      "Someone in a minimalist space positioning the 18x24 poster against a textured plaster wall, poster shown at correct scale",
      "A person carefully unrolling the poster on a clean oak table in natural light, poster dimensions clearly 18 inches wide by 24 inches tall",
    ],
    framed: [
      "Someone in a cashmere sweater adjusting the framed 18x24 piece on a gallery wall, frame sized appropriately for the print",
      "A person admiring the framed artwork from their reading nook with afternoon light, frame proportions clearly 3:4 portrait ratio",
      "Elegant hands placing the framed 18x24 poster on a minimalist floating shelf display, frame scaled correctly",
    ]
  };

  const styledScenarios = {
    canvas: [
      "on a clean white gallery wall with soft natural lighting and subtle shadow, minimal styling",
      "in a bright, airy Scandinavian-style living room with linen sofa and trailing plant",
      "in a serene bedroom with warm morning light streaming through sheer linen curtains",
    ],
    unframed: [
      "laid flat on a clean Carrara marble surface with soft window light shadows",
      "slightly curled at edges, leaning against a textured cream plaster wall",
      "placed on a light oak desk with a single stem vase and minimal styling",
    ],
    framed: [
      "hung on a warm-toned wall in a cozy reading corner with afternoon light",
      "displayed on a minimalist floating oak shelf with a small ceramic vase",
      "in a sunlit hallway with clean architectural details and warm wood floors",
    ]
  };

  const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const photographyStyle = `
PHOTOGRAPHY STYLE (CRITICAL):
- Editorial interior photography, shot on medium format camera
- Soft diffused natural light, golden hour warmth preferred
- Curated, aspirational but achievable home setting
- The vibe of Architectural Digest meets Kinfolk magazine
- No harsh flash, no artificial lighting look
- Depth of field that draws focus to the artwork
`;

  return {
    canvas: (includeHuman() ? `
Take THIS EXACT affirmation artwork shown in the image and place it on a stretched canvas print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Scene: ${randomFrom(humanScenarios.canvas)}
${dimensionalGuidance}
${photographyStyle}
CANVAS SPECIFICATIONS:
- Premium gallery-wrapped canvas with visible edge wrap
- Canvas dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- The canvas should appear as a medium-large statement piece on the wall
- Show the texture of quality canvas material
- The text on the canvas must be fully visible and not cut off
- Warm, inviting, aspirational home atmosphere
` : `
Take THIS EXACT affirmation artwork shown in the image and place it on a stretched canvas print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Show the canvas displayed ${randomFrom(styledScenarios.canvas)}
${dimensionalGuidance}
${photographyStyle}
CANVAS SPECIFICATIONS:
- Premium gallery-wrapped canvas with visible edge wrap texture
- Canvas dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- The canvas should appear as a medium-large statement piece
- The text on the canvas must be fully visible and readable
- Interior design photography style - editorial quality
`),

    unframed: (includeHuman() ? `
Take THIS EXACT affirmation artwork shown in the image and show it as an unframed 18x24 poster print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Scene: ${randomFrom(humanScenarios.unframed)}
${dimensionalGuidance}
${photographyStyle}
POSTER SPECIFICATIONS:
- Premium matte archival paper finish
- Poster dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- The poster should appear approximately movie-poster sized when held
- Natural slight curl at edges is authentic
- Show the quality weight of museum-grade paper stock
- The text must be fully visible and not cut off at any edge
` : `
Take THIS EXACT affirmation artwork shown in the image and show it as an unframed 18x24 poster print.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

Show the poster ${randomFrom(styledScenarios.unframed)}
${dimensionalGuidance}
${photographyStyle}
POSTER SPECIFICATIONS:
- Premium matte archival paper finish
- Poster dimensions: EXACTLY 18 inches wide x 24 inches tall (3:4 portrait ratio)
- The poster should appear as a medium-large print
- Subtle paper curl is acceptable for authenticity
- The text must be completely visible and readable
- Premium paper quality should be evident in the image
`),

    framed: (includeHuman() ? `
Take THIS EXACT affirmation artwork shown in the image and show it in an 18x24 Red Oak wood frame.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

FRAME: Red Oak wood frame (warm honey-brown color, approximately #D4A489 or similar warm oak tone)
- Simple, elegant profile - not ornate
- Natural wood grain visible
- Premium quality appearance like a custom frame shop

Scene: ${randomFrom(humanScenarios.framed)}
${dimensionalGuidance}
${photographyStyle}
FRAME SPECIFICATIONS:
- Frame holds an 18x24 inch print (the print inside is 18" wide x 24" tall, 3:4 portrait ratio)
- The overall framed piece will be slightly larger due to frame width and optional mat
- Warm, inviting natural lighting
- Frame casts subtle, soft shadows
- The text on the poster must be fully visible within the frame
- Cozy, aspirational home atmosphere
` : `
Take THIS EXACT affirmation artwork shown in the image and show it in an 18x24 Red Oak wood frame.

CRITICAL: You MUST use the EXACT design from the input image - same text, same colors, same layout, same typography. Do NOT create a new design or alter the artwork in any way.

FRAME: Red Oak wood frame (warm honey-brown color, approximately #D4A489 or similar warm oak tone)
- Simple, elegant profile - not ornate
- Natural wood grain visible
- Premium quality like a custom frame shop

Show the framed poster ${randomFrom(styledScenarios.framed)}
${dimensionalGuidance}
${photographyStyle}
FRAME SPECIFICATIONS:
- Frame holds an 18x24 inch print (the print inside is 18" wide x 24" tall, 3:4 portrait ratio)
- The overall framed piece will be slightly larger due to frame width
- Soft, warm natural lighting
- Frame casts gentle, realistic shadows
- The text must be completely visible and not cut off
- Premium home decor aesthetic - interior design photography quality
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
