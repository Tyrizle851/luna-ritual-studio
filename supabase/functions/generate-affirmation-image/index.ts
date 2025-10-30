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

// Mood accent fragments - mood only influences decorative elements
function getMoodFragment(mood: string): string {
  const fragments: Record<string, string> = {
    minimalist: "ACCENT STYLE: Thin lines and simple dots. Minimal decorative elements. Clean and restrained.",
    "modern-serif": "ACCENT STYLE: Clean lines and geometric shapes. Refined and elegant decorative touches.",
    bohemian: "ACCENT STYLE: Organic shapes and flowing curves. Natural, hand-drawn quality elements.",
    coastal: "ACCENT STYLE: Wave patterns and light rays. Airy, flowing decorative elements.",
    earthy: "ACCENT STYLE: Natural textures and botanical elements. Grounded, organic decorative touches.",
    vibrant: "ACCENT STYLE: Bold shapes and dynamic angles. Strong, energetic decorative elements.",
    pastel: "ACCENT STYLE: Soft dots and gentle curves. Delicate, subtle decorative touches.",
    monochrome: "ACCENT STYLE: Stark lines and high contrast shapes. Precise geometric decorative elements.",
    sunset: "ACCENT STYLE: Radiating lines and gradient transitions. Warm, glowing decorative elements.",
    forest: "ACCENT STYLE: Leaf motifs and branch patterns. Natural, woodland decorative touches."
  };
  return fragments[mood] || "Clean decorative accents.";
}

// Layout archetype fragments - MANDATORY layouts that must be enforced
function getLayoutFragment(layout: string): string {
  const fragments: Record<string, string> = {
    "centered-stack": `REQUIRED LAYOUT: Centered headline at top with supporting phrases in clean vertical stack below.
Strong vertical rhythm with consistent spacing. Main text centered with clear hierarchy.
Example: Title centered at top, phrases stacked vertically below with equal spacing.`,
    
    "flowing-curves": `REQUIRED LAYOUT: Text flows in organic curved paths (not straight lines). 
Supporting phrases arranged in gentle curves or wave patterns, creating natural movement.
Example: Title arced at top, phrases flowing in S-curve or circular flow.`,
    
    "angular-grid": `REQUIRED LAYOUT: Structured grid with phrases in aligned boxes or sections.
Clean geometric organization with rectangular divisions and aligned text blocks.
Example: Title in top grid cell, phrases distributed in organized grid cells below.`,
    
    "circular-orbit": `REQUIRED LAYOUT: Circular or radial arrangement with central focal point.
Supporting phrases orbit around center in arc formations, creating orbital pattern.
Example: Title in center circle, phrases arranged in ring around it.`,
    
    "diagonal-dynamic": `REQUIRED LAYOUT: Dynamic angular composition with directional energy.
Text elements placed at varied angles creating forward momentum and movement.
Example: Title at angle, phrases positioned diagonally with dynamic energy.`,
    
    "asymmetric-balance": `REQUIRED LAYOUT: Asymmetric placement with intentional visual balance.
Elements positioned off-center but creating harmonious composition through size and spacing.
Example: Large title offset to one side, phrases balanced on opposite side.`,
    
    "layered-depth": `REQUIRED LAYOUT: Overlapping text layers creating visual depth.
Multiple text elements at different scales and opacities creating dimensional effect.
Example: Main title bold in front, supporting text layered behind at varying sizes.`,
    
    "minimal-focus": `REQUIRED LAYOUT: Maximum whitespace with single dominant focal point.
Generous negative space surrounding minimal text elements for zen aesthetic.
Example: Title isolated in center with vast whitespace, one or two subtle supporting phrases.`
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
