// Color theory translator - converts hex codes to visual direction
// Apple philosophy: Complex engineering, simple experience

interface ColorAnalysis {
  hex: string;
  name: string;
  role: 'primary-text' | 'background' | 'accent' | 'secondary';
  luminance: number;
  temperature: 'warm' | 'cool' | 'neutral';
  saturation: 'high' | 'medium' | 'low';
  coverage: string;
  usage: string;
  mood: string;
}

// Luminance calculation (WCAG standard)
function calculateLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

// Temperature analysis
function getTemperature(hex: string): 'warm' | 'cool' | 'neutral' {
  const [r, g, b] = hexToRgb(hex);

  // Reds, oranges, yellows = warm
  if (r > g + 20 && r > b + 20) return 'warm';

  // Blues, greens = cool
  if (b > r + 20 || (g > r + 10 && b > r)) return 'cool';

  // Grays, browns, neutrals
  return 'neutral';
}

// Saturation analysis
function getSaturation(hex: string): 'high' | 'medium' | 'low' {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta < 30) return 'low';    // Near gray
  if (delta < 100) return 'medium'; // Muted color
  return 'high';                    // Saturated color
}

// Human-readable color name
function getColorName(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const luminance = calculateLuminance(hex);

  // Dark colors
  if (luminance < 0.15) {
    if (r < 30 && g < 30 && b < 30) return 'deep charcoal';
    if (r > g && r > b) return 'deep burgundy';
    if (g > r && g > b) return 'deep forest green';
    if (b > r && b > g) return 'midnight blue';
    return 'dark earth tone';
  }

  // Light colors
  if (luminance > 0.85) {
    if (r > 250 && g > 250 && b > 250) return 'pure white';
    if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10) return 'soft cream';
    return 'light neutral';
  }

  // Mid-tone colors
  if (r > g + 30 && r > b + 30) {
    if (r > 200 && g > 150) return 'warm terracotta';
    if (r > 180) return 'coral';
    return 'warm rust';
  }

  if (g > r + 20 && g > b) return 'sage green';
  if (b > r + 30) return 'soft blue';

  // Golds and browns
  if (r > 180 && g > 140 && b < 80) return 'metallic gold';
  if (r > g && g > b && r < 160) return 'warm brown';

  return 'neutral tone';
}

// Determine role in composition
function determineRole(
  hex: string,
  index: number,
  allColors: string[],
  theme: string
): ColorAnalysis['role'] {
  const luminance = calculateLuminance(hex);

  // Darkest = usually text
  const darkest = allColors.reduce((min, color) => {
    const l = calculateLuminance(color);
    return l < calculateLuminance(min) ? color : min;
  });

  if (hex === darkest && luminance < 0.3) return 'primary-text';

  // Lightest = usually background
  const lightest = allColors.reduce((max, color) => {
    const l = calculateLuminance(color);
    return l > calculateLuminance(max) ? color : max;
  });

  if (hex === lightest && luminance > 0.7) return 'background';

  // Mid-tones = accents
  const saturation = getSaturation(hex);
  if (saturation === 'high' || saturation === 'medium') return 'accent';

  return 'secondary';
}

// Usage guidance based on role
function getUsageGuidance(analysis: ColorAnalysis, theme: string): string {
  switch (analysis.role) {
    case 'primary-text':
      return `Use for main headline text. Ensure 7:1 contrast ratio with background (WCAG AAA). Bold, commanding, highly readable.`;

    case 'background':
      return `Use as primary background (70-80% of canvas). Creates foundation for all other elements. Should be subtle and not compete with text.`;

    case 'accent':
      if (analysis.name.includes('gold') || analysis.name.includes('metallic')) {
        return `LUXURY ACCENT - Use SPARINGLY (10-15% maximum). Thin lines (1-2px), small dots, edge highlights only. Should whisper luxury, not shout. Think Chanel elegance.`;
      }
      return `Accent color for visual interest. Use at 15-25% coverage. Can be watercolor washes, botanical silhouettes, or geometric accents depending on mood.`;

    case 'secondary':
      return `Supporting color for depth and nuance. Use at 5-10% coverage. Adds sophistication without overwhelming. Subtle shadows, secondary accents.`;

    default:
      return `Supporting element in composition.`;
  }
}

// Get coverage percentage
function getCoveragePercent(analysis: ColorAnalysis): string {
  switch (analysis.role) {
    case 'primary-text': return '5-10% (text only)';
    case 'background': return '70-80% (foundation)';
    case 'accent': return analysis.name.includes('gold') ? '10-15% (luxury touch)' : '15-25% (visual interest)';
    case 'secondary': return '5-10% (subtle depth)';
    default: return '10-20%';
  }
}

// Mood description from color
function getColorMood(analysis: ColorAnalysis, theme: string): string {
  const { temperature, saturation, luminance, name } = analysis;

  if (name.includes('gold') || name.includes('metallic')) {
    return 'Luxury, sophistication, premium quality, editorial elegance';
  }

  if (temperature === 'warm' && luminance > 0.7) {
    return 'Inviting, comforting, peaceful, soft warmth';
  }

  if (temperature === 'warm' && luminance < 0.3) {
    return 'Grounded, earthy, stable, natural strength';
  }

  if (temperature === 'cool' && luminance > 0.7) {
    return 'Calm, serene, tranquil, airy freshness';
  }

  if (temperature === 'cool' && saturation === 'high') {
    return 'Vibrant, energetic, bold, confident clarity';
  }

  if (saturation === 'low') {
    return 'Sophisticated, muted elegance, subtle refinement';
  }

  return 'Balanced, harmonious, versatile';
}

// Main translation function
export function translatePaletteToVisual(
  palette: string[],
  theme: string,
  mood: string
): string {
  if (!palette || palette.length === 0) {
    return 'No custom palette - use mood and theme defaults';
  }

  // Analyze each color
  const analyses: ColorAnalysis[] = palette.map((hex, index) => ({
    hex,
    name: getColorName(hex),
    role: determineRole(hex, index, palette, theme),
    luminance: calculateLuminance(hex),
    temperature: getTemperature(hex),
    saturation: getSaturation(hex),
    coverage: '',
    usage: '',
    mood: ''
  }));

  // Fill in dependent fields
  analyses.forEach(analysis => {
    analysis.coverage = getCoveragePercent(analysis);
    analysis.usage = getUsageGuidance(analysis, theme);
    analysis.mood = getColorMood(analysis, theme);
  });

  // Calculate contrast ratio
  const textColor = analyses.find(a => a.role === 'primary-text');
  const bgColor = analyses.find(a => a.role === 'background');

  let contrastInfo = '';
  if (textColor && bgColor) {
    const contrast = (Math.max(textColor.luminance, bgColor.luminance) + 0.05) /
                    (Math.min(textColor.luminance, bgColor.luminance) + 0.05);
    const meetsAAA = contrast >= 7 ? '✅ WCAG AAA' : '⚠️ May need adjustment';
    contrastInfo = `\nContrast Ratio: ${contrast.toFixed(2)}:1 ${meetsAAA}`;
  }

  // Build prompt section
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    COLOR STRATEGY (Theme: ${theme}, Mood: ${mood})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${contrastInfo}

${analyses.map((analysis, i) => `
COLOR ${i + 1}: ${analysis.name.toUpperCase()} (${analysis.hex})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Role: ${analysis.role.replace('-', ' ').toUpperCase()}
Temperature: ${analysis.temperature} | Saturation: ${analysis.saturation}
Coverage: ${analysis.coverage}

Usage Direction:
${analysis.usage}

Emotional Impact:
${analysis.mood}
`).join('\n')}

COLOR INTERACTION RULES:
• ${getContrastRule(analyses)}
• ${getTemperatureHarmony(analyses)}
• ${getHierarchyRule(analyses)}
• Never use colors at equal intensity - create clear hierarchy
• Background supports, text commands, accents delight
`;
}

// Helper functions for interaction rules
function getContrastRule(analyses: ColorAnalysis[]): string {
  const hasHighContrast = analyses.some(a => a.luminance < 0.2) &&
                          analyses.some(a => a.luminance > 0.8);

  if (hasHighContrast) {
    return 'HIGH CONTRAST palette - use bold juxtaposition for dramatic impact and clarity';
  }

  const hasLowContrast = analyses.every(a => a.luminance > 0.6 && a.luminance < 0.9);
  if (hasLowContrast) {
    return 'LOW CONTRAST palette - rely on subtle tonal shifts for sophisticated elegance';
  }

  return 'MEDIUM CONTRAST - balance bold elements with soft transitions';
}

function getTemperatureHarmony(analyses: ColorAnalysis[]): string {
  const temps = analyses.map(a => a.temperature);
  const allWarm = temps.every(t => t === 'warm');
  const allCool = temps.every(t => t === 'cool');
  const mixed = !allWarm && !allCool;

  if (allWarm) {
    return 'WARM HARMONY - create inviting, comforting, cozy atmosphere';
  }
  if (allCool) {
    return 'COOL HARMONY - create calm, serene, spacious feeling';
  }
  return 'MIXED TEMPERATURE - use warm as focal point, cool as supporting or vice versa';
}

function getHierarchyRule(analyses: ColorAnalysis[]): string {
  const textColor = analyses.find(a => a.role === 'primary-text');
  const accentColor = analyses.find(a => a.role === 'accent');

  if (!textColor) return 'Establish clear visual hierarchy with darkest as text';
  if (!accentColor) return 'Text dominates, background supports, use accents sparingly';

  if (accentColor.name.includes('gold') || accentColor.saturation === 'high') {
    return `${accentColor.name} is HIGH IMPACT - use minimally (10-15%) to avoid overwhelming text`;
  }

  return 'Text first (most important), accents second (visual interest), background third (foundation)';
}
