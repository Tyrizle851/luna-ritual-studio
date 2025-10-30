// Edge function for generating affirmation images using Lovable AI

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// DesignSpec type (shared with frontend)
interface DesignSpec {
  theme: string;
  mood: string;
  energyLevel: string;
  layoutArchetype: string;
  paletteToken: {
    name: string;
    description: string;
    hex: string[];
    contrast: string;
  };
  accentSet: string[];
  typography: {
    headline: string;
    support: string;
  };
  mainAffirmation: string;
  supportingPhrases: string[];
  styleVariant?: number;
  accentVariant?: number;
  paletteVariant?: number;
  copyVariant?: number;
  textureVariant?: number;
  seed?: number | string;
  specVersion: number;
  constraints: {
    ratio: string;
    dpi: number;
    ban: string[];
  };
}

interface GenerateRequest {
  designSpec: DesignSpec;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: GenerateRequest = await req.json();
    const { designSpec } = body;

    console.log('Generating affirmation image with designSpec:', JSON.stringify(designSpec, null, 2));

    // Build the master prompt using the complete design spec
    const prompt = buildMasterPrompt(designSpec);
    
    console.log('Calling Lovable AI with prompt length:', prompt.length);

    // Call Lovable AI's image generation API (Nano banana model)
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      
      // Handle rate limiting and payment errors
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Image generation failed', 
          detail: `AI Gateway returned ${aiResponse.status}`,
          message: errorText 
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const imageUrl = aiData?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error('No image data in AI response');
      return new Response(
        JSON.stringify({ error: 'No image returned from AI' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract base64 data from data URL (format: data:image/png;base64,...)
    const base64Match = imageUrl.match(/^data:image\/\w+;base64,(.+)$/);
    const imageB64 = base64Match ? base64Match[1] : imageUrl;

    console.log('Successfully generated image, size:', imageB64.length);

    return new Response(
      JSON.stringify({ 
        imageB64,
        generationId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        detail: error instanceof Error ? error.message : String(error) 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Master prompt builder - leads with spec, no conflicts
function buildMasterPrompt(spec: DesignSpec): string {
  const themeFragment = getThemeFragment(spec.theme);
  const moodFragment = getMoodFragment(spec.mood);
  const layoutFragment = getLayoutFragment(spec.layoutArchetype);
  const accentFragment = getAccentFragment(spec.accentSet);

  return `You are generating a PRINT-READY affirmation poster. Follow ALL requirements exactly.

### CRITICAL LAYOUT REQUIREMENT (NON-NEGOTIABLE)
LAYOUT_ARCHETYPE: ${spec.layoutArchetype}
${layoutFragment}
THIS LAYOUT IS MANDATORY - DO NOT DEFAULT TO SIMPLE CENTERED TEXT.

### CRITICAL ACCENT REQUIREMENT (MUST INCLUDE)
${accentFragment}
THESE VISUAL ELEMENTS ARE REQUIRED - NOT OPTIONAL.

### DESIGN SPEC (authoritative; do not deviate)
THEME: ${spec.theme} | MOOD: ${spec.mood} | ENERGY: ${spec.energyLevel}
PALETTE_TOKEN: ${spec.paletteToken.name}
PALETTE_HEX_ALLOWED: ${spec.paletteToken.hex.join(", ")} // Use ONLY these colors.
TYPOGRAPHY: headline=${spec.typography.headline}, support=${spec.typography.support}
MAIN_AFFIRMATION (exact text & casing): "${spec.mainAffirmation}"
SUPPORTING_LINES (use all; keep one thought per line):
${spec.supportingPhrases.map(line => `- ${line}`).join("\n")}

### THEME TONE GUIDANCE
${themeFragment}

### MOOD VISUAL GUIDANCE
${moodFragment}

### TECHNICAL CONSTRAINTS
- Aspect ratio: ${spec.constraints.ratio}. Resolution: ${spec.constraints.dpi} DPI. High legibility. Print-safe.
- Banned: ${spec.constraints.ban.join(", ")}.
- Maintain generous white space.
- Keep MAIN_AFFIRMATION large and dominant (3-4× smallest text).
- NO BORDERS OR MARGINS: Content must fill entire canvas edge-to-edge.
- Background extends to all edges (no white space around poster).
- Return a single finished poster image honoring ALL constraints above.`;
}

// Theme tone fragments
function getThemeFragment(theme: string): string {
  const fragments: Record<string, string> = {
    confidence: "Assertive, forward, strong. No soft/soothing phrasing. Direct empowerment.",
    peace: "Calm, gentle, restorative. Soft edges, tranquil energy. Soothing and safe.",
    focus: "Disciplined, clear, centered. Sharp clarity, minimal distraction. Purposeful.",
    gratitude: "Warm, appreciative, abundant. Celebratory energy, joyful tone.",
    abundance: "Rich, flowing, prosperous. Open and expansive. Welcoming overflow.",
    healing: "Restorative, gentle, nurturing. Patient energy. Soft recovery tone.",
    strength: "Solid, resilient, enduring. Unshakeable foundation. Powerful stability.",
    joy: "Bright, radiant, uplifting. Light-filled and celebratory. Pure delight.",
    balance: "Steady, harmonious, aligned. Centered equilibrium. Calm stability.",
    courage: "Brave, bold, fearless. Forward momentum despite fear. Daring action.",
    clarity: "Clear, sharp, discerning. Cutting through fog. Truth-seeing.",
    renewal: "Fresh, beginning, emerging. New life energy. Clean slate.",
    freedom: "Open, liberated, unbound. Expansive and wild. Unrestricted.",
    passion: "Fiery, intense, burning. Full-hearted commitment. Alive with purpose.",
    wisdom: "Knowing, discerning, insightful. Deep trust. Inner guidance."
  };
  return fragments[theme] || "Empowering and inspirational tone.";
}

// Mood visual fragments
function getMoodFragment(mood: string): string {
  const fragments: Record<string, string> = {
    minimalist: "Black on warm cream. High contrast. Clean lines, ample negative space. Typography-focused.",
    "modern-serif": "Charcoal, blush, ivory. Medium contrast. Elegant serifs, refined spacing.",
    bohemian: "Terracotta, sage, cream. Low contrast. Organic textures, botanical elements.",
    coastal: "Seafoam, sand, driftwood. Soft blues and sandy neutrals. Airy spacing, sunray or simple geometric accents.",
    earthy: "Forest green, clay, cream. Medium contrast. Grounded natural textures, botanical motifs.",
    vibrant: "Black with bright blue, red, orange accents. High contrast. Bold geometric or directional elements.",
    pastel: "Soft peach, lavender, mint. Low contrast. Halo dots, delicate botanical accents.",
    monochrome: "Black, cream, gray. High contrast. Geometric precision, minimalist aesthetic.",
    sunset: "Coral, amber, blush. Medium contrast. Warm radiating energy, sunray or botanical accents.",
    forest: "Deep green, olive, moss, cream. Medium contrast. Rich botanical elements, natural depth."
  };
  return fragments[mood] || "Clean and modern aesthetic.";
}

// Layout archetype fragments - MANDATORY layouts that must be enforced
function getLayoutFragment(layout: string): string {
  const fragments: Record<string, string> = {
    "clean-serif": `REQUIRED LAYOUT: Centered headline at top with horizontal rules/underlines beneath it. 
Supporting phrases arranged in strict vertical grid below, aligned left or center. 
Strong vertical rhythm with consistent spacing between lines.
Example: Title centered, thin horizontal line below title, then 6 phrases in neat vertical stack.`,
    
    "botanical": `REQUIRED LAYOUT: Text flows in organic curved paths (not straight lines). 
MUST include decorative botanical elements: leaves, branches, or floral motifs in corners or along edges.
Supporting phrases should curve gently or be arranged in an oval/circular flow pattern.
Example: Title arced at top, phrases flowing in gentle S-curve, botanical illustrations framing the composition.`,
    
    "grit-directional": `REQUIRED LAYOUT: Dynamic angular composition with directional energy.
MUST include: arrows, diagonal lines, or compass-point indicators showing movement.
Text elements placed at varied angles (not all horizontal), creating forward momentum.
Example: Title at slight angle, phrases positioned diagonally with arrow graphics pointing toward goals/future.`,
    
    "halo-orbital": `REQUIRED LAYOUT: Circular or radial arrangement with central focal point.
MUST include: dot clusters, radiating lines, or circular rings around the main affirmation.
Supporting phrases orbit around the center in arc formations, not straight vertical lines.
Example: Title in center circle, phrases arranged in ring around it, dotted accents creating halo effect.`
  };
  return fragments[layout] || "Clear hierarchy with the main affirmation as the dominant element.";
}

// Accent fragments - REQUIRED visual elements
function getAccentFragment(accents: string[]): string {
  const accentDescriptions: Record<string, string> = {
    "minimal": "subtle single-line decorative elements, small geometric markers (dots, dashes)",
    "organic": "natural flowing shapes, soft curves, gentle wave patterns",
    "botanical": "MUST include leaves, branches, flowers, or plant-inspired decorative elements",
    "textured": "visible paper texture, subtle grain, layered transparency effects",
    "gradient-heavy": "bold color gradients, smooth color transitions between palette colors",
    "playful": "irregular dots, hand-drawn quality marks, asymmetric decorative touches"
  };
  
  const requiredElements = accents.map(a => accentDescriptions[a] || a).join(", ");
  return `REQUIRED ACCENTS: ${requiredElements}
YOU MUST INCLUDE these visual elements in the design - they are not suggestions.`;
}
