// Complete design variable sets for all 24 affirmations
// Used by generate-affirmation-digital edge function

export interface AffirmationDesign {
  id: string;
  title: string;
  background: string;
  textColor: string;
  typography: string;
  textPosition: string;
  visualElements: string;
  layout: string;
  mood: string;
}

export const AFFIRMATION_DESIGNS: Record<string, AffirmationDesign> = {
  // 1. I am worthy of rest
  "worthy-of-rest": {
    id: "worthy-of-rest",
    title: "I am worthy of rest",
    background: "Deep midnight blue gradient fading to soft charcoal, like the quiet hour before dawn",
    textColor: "Warm ivory (#FAF8F5) with subtle cream undertones",
    typography: "Elegant thin serif, generous letter-spacing, lowercase except first letter",
    textPosition: "Lower third, left-aligned with breathing room from edges",
    visualElements: "Single crescent moon, delicate constellation dots, whisper of clouds",
    layout: "Asymmetric balance with moon as counterweight to text",
    mood: "Peaceful surrender, permission to pause"
  },

  // 2. I trust my path
  "trust-my-path": {
    id: "trust-my-path",
    title: "I trust my path",
    background: "Warm terracotta fading to dusty rose, like desert sunset",
    textColor: "Deep espresso brown (#3D2B1F)",
    typography: "Modern serif with slight italic lean, medium weight",
    textPosition: "Center-right, vertical orientation reading downward",
    visualElements: "Winding abstract path, distant mountains silhouette, single guiding star",
    layout: "Path leads eye from corner toward text",
    mood: "Quiet confidence, forward momentum"
  },

  // 3. I choose to feel
  "choose-to-feel": {
    id: "choose-to-feel",
    title: "I choose to feel",
    background: "Soft sage green with subtle linen texture overlay",
    textColor: "Charcoal grey (#2C2C2C)",
    typography: "Hand-drawn serif feeling, slightly imperfect baseline",
    textPosition: "Upper left quadrant, diagonal flow",
    visualElements: "Abstract heart outline, gentle wave patterns, organic dots",
    layout: "Scattered organic elements create visual rhythm",
    mood: "Emotional openness, vulnerability as strength"
  },

  // 4. I am always enough
  "always-enough": {
    id: "always-enough",
    title: "I am always enough",
    background: "Creamy off-white (#F5F0E8) with subtle paper grain texture",
    textColor: "Soft black (#1A1A1A)",
    typography: "Bold modern serif, statement weight, tight tracking",
    textPosition: "Dead center, commanding presence",
    visualElements: "Minimalist—single thin circle embracing text, nothing more",
    layout: "Centered symmetry, maximum negative space",
    mood: "Absolute self-acceptance, quiet power"
  },

  // 5. I release what no longer serves me
  "release-what-no-longer-serves": {
    id: "release-what-no-longer-serves",
    title: "I release what no longer serves me",
    background: "Gradient from soft grey to warm white, like morning fog lifting",
    textColor: "Deep slate (#4A4A4A)",
    typography: "Light weight serif, airy letter-spacing, graceful ascenders",
    textPosition: "Upper portion, text appears to float upward",
    visualElements: "Feathers drifting, abstract smoke wisps, open hands releasing",
    layout: "Upward movement, elements dispersing toward top",
    mood: "Letting go, liberation, lightness"
  },

  // 6. I attract what I deserve
  "attract-what-i-deserve": {
    id: "attract-what-i-deserve",
    title: "I attract what I deserve",
    background: "Rich honey gold gradient to warm amber",
    textColor: "Deep burgundy brown (#4A2C2A)",
    typography: "Sophisticated serif, medium-bold, classic proportions",
    textPosition: "Center-left, grounded placement",
    visualElements: "Magnetic abstract shapes, golden ratio spiral, warm light rays",
    layout: "Elements flowing toward center, convergence",
    mood: "Magnetic confidence, worthiness"
  },

  // 7. I am safe in my body
  "safe-in-my-body": {
    id: "safe-in-my-body",
    title: "I am safe in my body",
    background: "Soft blush pink fading to warm cream",
    textColor: "Warm terracotta (#C17C60)",
    typography: "Rounded serif, nurturing weight, generous curves",
    textPosition: "Lower center, grounded and rooted",
    visualElements: "Abstract body silhouette, protective circle, grounding roots",
    layout: "Embracing composition, elements curve around text",
    mood: "Security, embodiment, groundedness"
  },

  // 8. I honor my boundaries
  "honor-my-boundaries": {
    id: "honor-my-boundaries",
    title: "I honor my boundaries",
    background: "Cool grey-blue with architectural texture",
    textColor: "Warm charcoal (#333333)",
    typography: "Strong serif, defined edges, clear structure",
    textPosition: "Right side, vertical stack, structured",
    visualElements: "Clean geometric lines, subtle doorway frame, protective threshold",
    layout: "Strong vertical lines creating visual boundaries",
    mood: "Self-respect, clarity, protection"
  },

  // 9. I am creating my story
  "creating-my-story": {
    id: "creating-my-story",
    title: "I am creating my story",
    background: "Warm parchment cream with subtle aged texture",
    textColor: "Rich ink brown (#2D2416)",
    typography: "Literary serif, book-title elegance, balanced weight",
    textPosition: "Center, like a book title page",
    visualElements: "Quill suggestion, ink drops, page corner curl, subtle chapter marks",
    layout: "Classic book layout, centered hierarchy",
    mood: "Authorship, creative power, narrative control"
  },

  // 10. Growth is a journey, not a destination
  "growth-is-journey": {
    id: "growth-is-journey",
    title: "Growth is a journey, not a destination",
    background: "Forest green gradient to soft moss",
    textColor: "Warm cream (#F8F4E8)",
    typography: "Organic serif, natural flow, varied baseline",
    textPosition: "Across middle, following gentle curve",
    visualElements: "Winding forest path, unfurling fern fronds, distant horizon",
    layout: "Horizontal journey flow, left to right progression",
    mood: "Patient growth, embracing the process"
  },

  // 11. I am worthy of peace
  "worthy-of-peace": {
    id: "worthy-of-peace",
    title: "I am worthy of peace",
    background: "Soft lavender fading to misty grey-blue",
    textColor: "Deep plum (#4A3B4D)",
    typography: "Serene serif, light weight, whisper-quiet presence",
    textPosition: "Upper portion, floating peacefully",
    visualElements: "Still water reflection, single lotus, gentle ripples",
    layout: "Reflective symmetry, water-like calm",
    mood: "Tranquility, deserving stillness"
  },

  // 12. I trust my intuition
  "trust-my-intuition": {
    id: "trust-my-intuition",
    title: "I trust my intuition",
    background: "Deep indigo to soft violet gradient, cosmic depth",
    textColor: "Soft silver-white (#E8E4E0)",
    typography: "Mystical serif, slight glow effect, ethereal weight",
    textPosition: "Center, emanating outward",
    visualElements: "Third eye suggestion, constellation map, inner light glow",
    layout: "Radial composition, energy emanating from center",
    mood: "Inner knowing, cosmic connection"
  },

  // 13. I allow myself to receive
  "allow-myself-to-receive": {
    id: "allow-myself-to-receive",
    title: "I allow myself to receive",
    background: "Soft coral pink to warm peach gradient",
    textColor: "Deep rose (#8B4557)",
    typography: "Graceful serif, open letter forms, receptive curves",
    textPosition: "Lower third, arms-open positioning",
    visualElements: "Open palms, flowing abundance, gentle rain of blessings",
    layout: "Receiving gesture, elements flowing downward toward text",
    mood: "Openness, worthiness to receive"
  },

  // 14. I embrace change with grace
  "embrace-change": {
    id: "embrace-change",
    title: "I embrace change with grace",
    background: "Gradient shifting through seasons—warm amber to cool sage",
    textColor: "Deep bronze (#5D4E37)",
    typography: "Transitional serif, flowing curves, elegant movement",
    textPosition: "Center-right, in motion",
    visualElements: "Butterfly transformation, flowing leaves, metamorphosis symbols",
    layout: "Dynamic flow, elements in graceful transition",
    mood: "Graceful adaptation, flowing with life"
  },

  // 15. My voice matters
  "voice-matters": {
    id: "voice-matters",
    title: "My voice matters",
    background: "Bold warm coral to soft terracotta",
    textColor: "Deep cocoa (#3E2C23)",
    typography: "Confident serif, medium-bold, clear articulation",
    textPosition: "Center-left, projecting outward",
    visualElements: "Sound waves radiating, megaphone suggestion, resonance circles",
    layout: "Outward projection, voice rippling out",
    mood: "Empowerment, being heard"
  },

  // 16. I find joy in small moments
  "joy-in-small-moments": {
    id: "joy-in-small-moments",
    title: "I find joy in small moments",
    background: "Soft buttercream yellow with warm golden undertones",
    textColor: "Warm brown (#5C4033)",
    typography: "Cheerful serif, dancing baseline, lighthearted weight",
    textPosition: "Scattered across canvas, playful placement",
    visualElements: "Tiny flowers, coffee cup steam, sun rays, small treasures",
    layout: "Scattered moments, delightful discovery",
    mood: "Everyday magic, present-moment joy"
  },

  // 17. I am at peace with my past
  "peace-with-past": {
    id: "peace-with-past",
    title: "I am at peace with my past",
    background: "Soft sepia tones fading to warm neutral",
    textColor: "Aged brown (#6B5344)",
    typography: "Timeless serif, dignified weight, classic grace",
    textPosition: "Lower portion, grounded in acceptance",
    visualElements: "Faded photographs suggestion, healing light, closed book",
    layout: "Retrospective composition, looking back with peace",
    mood: "Acceptance, healing, closure"
  },

  // 18. I am open to new possibilities
  "open-to-possibilities": {
    id: "open-to-possibilities",
    title: "I am open to new possibilities",
    background: "Dawn sky gradient—soft pink to light blue to warm gold",
    textColor: "Deep teal (#2A5B5E)",
    typography: "Forward-leaning serif, optimistic angle, bright presence",
    textPosition: "Upper right, looking toward horizon",
    visualElements: "Open door, sunrise rays, seeds taking flight, new sprouts",
    layout: "Expansive horizon, openness ahead",
    mood: "Anticipation, openness, new beginnings"
  },

  // 19. My dreams are valid
  "dreams-are-valid": {
    id: "dreams-are-valid",
    title: "My dreams are valid",
    background: "Soft cloudy gradient—white to pale blue to soft grey",
    textColor: "Deep navy (#1E3A5F)",
    typography: "Dreamy serif, floating weight, aspirational presence",
    textPosition: "Center, among the clouds",
    visualElements: "Soft clouds, distant stars, sleeping moon, dream bubbles",
    layout: "Floating composition, dreamlike atmosphere",
    mood: "Validation, aspiration, dream permission"
  },

  // 20. I am becoming who I'm meant to be
  "becoming-who-meant-to-be": {
    id: "becoming-who-meant-to-be",
    title: "I am becoming who I'm meant to be",
    background: "Gradient from cocoon brown to butterfly wing iridescence",
    textColor: "Rich plum (#5B3256)",
    typography: "Transformational serif, evolving presence, emerging boldness",
    textPosition: "Center, in transformation",
    visualElements: "Chrysalis to butterfly, blooming flower stages, evolution spiral",
    layout: "Transformation narrative, before to after flow",
    mood: "Becoming, evolution, self-actualization"
  },

  // 21. I choose calm over chaos
  "calm-over-chaos": {
    id: "calm-over-chaos",
    title: "I choose calm over chaos",
    background: "Soft blue-grey, like still lake at dawn",
    textColor: "Deep charcoal (#2D2D2D)",
    typography: "Steady serif, unwavering weight, anchored presence",
    textPosition: "Center, perfectly still",
    visualElements: "Still water surface, single ripple, zen stones, breath symbol",
    layout: "Perfect stillness, centered calm",
    mood: "Intentional peace, chosen serenity"
  },

  // 22. I honor my needs
  "honor-my-needs": {
    id: "honor-my-needs",
    title: "I honor my needs",
    background: "Warm nude to soft mauve gradient",
    textColor: "Deep burgundy (#722F37)",
    typography: "Nurturing serif, self-caring weight, gentle authority",
    textPosition: "Lower center, grounded self-care",
    visualElements: "Self-embrace gesture, nourishing elements, heart center glow",
    layout: "Inward-focused, self-honoring composition",
    mood: "Self-priority, healthy boundaries"
  },

  // 23. I trust the timing of my life
  "trust-timing": {
    id: "trust-timing",
    title: "I trust the timing of my life",
    background: "Soft gradient suggesting clock face—warm gold to soft cream",
    textColor: "Rich bronze (#6B4423)",
    typography: "Timeless serif, patient weight, enduring presence",
    textPosition: "Center, in perfect time",
    visualElements: "Clock hands, celestial cycles, seasonal wheel, hourglass",
    layout: "Circular time composition, cyclical flow",
    mood: "Divine timing, patience, trust"
  },

  // 24. I am worthy of love
  "worthy-of-love": {
    id: "worthy-of-love",
    title: "I am worthy of love",
    background: "Deep rose to soft blush gradient, like rose petals",
    textColor: "Deep wine (#5C1A33)",
    typography: "Romantic serif, loving weight, heartfelt curves",
    textPosition: "Center, heart-centered placement",
    visualElements: "Rose petals, gentle heart shapes, warm embrace, soft glow",
    layout: "Heart-centered composition, love radiating outward",
    mood: "Self-love, deserving love, heart opening"
  }
};

// Helper to get design by affirmation ID
export function getAffirmationDesign(id: string): AffirmationDesign | undefined {
  return AFFIRMATION_DESIGNS[id];
}

// Get all design IDs
export function getAllDesignIds(): string[] {
  return Object.keys(AFFIRMATION_DESIGNS);
}
