interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
}

/**
 * Generates preview affirmation data based on theme, mood, and layout
 * Contains comprehensive theme definitions with headlines, phrases, and color palettes
 * @param theme - The selected theme (confidence, peace, focus, etc.)
 * @param mood - The selected mood (minimalist, bohemian, coastal, etc.)
 * @param layoutStyle - Optional layout style override
 * @param overrideTheme - Optional theme override for randomization
 * @param overrideMood - Optional mood override for randomization
 * @param overrideLayout - Optional layout override for randomization
 * @returns Generated affirmation data with headline, supporting lines, palette, and styling
 */
export function generatePreviewData(
  theme: string,
  mood: string,
  layoutStyle: string,
  overrideTheme?: string,
  overrideMood?: string,
  overrideLayout?: string
): GeneratedData {
  // Expanded theme definitions with 20 headlines and 20 phrases each
  const themeData: Record<string, {
    headlines: string[];
    phrases: string[];
    colors: string[];
  }> = {
    confidence: {
      headlines: ["FEARLESS FORWARD", "POWER RECLAIMED", "BOLD TRUTH", "UNSTOPPABLE FORCE", "OWN YOUR THRONE", "SPEAK YOUR WORTH", "COMMAND RESPECT", "RISE UNAPOLOGETIC", "CLAIM YOUR SPACE", "LOUD AND PROUD", "NO PERMISSION NEEDED", "FIERCE ENERGY", "TRUST YOURSELF", "WALK TALL", "YOUR MOMENT NOW", "UNSHAKEN CORE", "STAND FIRM", "WORTHY ALWAYS", "CONFIDENT STRIDE", "SELF ASSURED"],
      phrases: ["I trust my decisions", "I claim my power", "I rise boldly", "My voice matters", "I lead with courage", "Doubt has no place here", "I own my choices", "My presence commands attention", "I believe in myself fully", "Confidence flows through me", "I speak with authority", "My worth is undeniable", "I take up space proudly", "Fear does not control me", "I am my own validation", "My strength is evident", "I walk with purpose", "Self-doubt fades away", "I trust my instincts", "My power is innate"],
      colors: ["#1a1a1a", "#d4af37", "#ffffff"]
    },
    peace: {
      headlines: ["QUIET WITHIN", "STILLNESS SPEAKS", "CALM WATERS", "SERENE SOUL", "GENTLE SURRENDER", "TRANQUIL HEART", "SOFT BREATHING", "PEACEFUL PRESENCE", "REST DEEPLY", "SILENT STRENGTH", "EASE AND FLOW", "INNER SANCTUARY", "WHISPER SOFT", "SOOTHING RHYTHM", "SACRED PAUSE", "GENTLE WAVES", "QUIET POWER", "STILL MOMENTS", "PEACEFUL MIND", "TRANQUILITY FOUND"],
      phrases: ["I breathe deeply", "Calm fills my soul", "I release tension", "Peace is my nature", "Stillness guides me", "I am enough", "Serenity surrounds me", "My mind is quiet", "I rest in this moment", "Tranquility flows through me", "I let go softly", "Peace anchors me", "I choose calm", "My spirit is still", "Gentle ease fills me", "I am at peace", "Quietness heals me", "I surrender to rest", "Calm is my refuge", "Peace lives in me"],
      colors: ["#e8d5c4", "#9ab8b8", "#f5f5f5"]
    },
    focus: {
      headlines: ["CLEAR PATH", "ONE DIRECTION", "LASER SHARP", "SINGULAR VISION", "EYES FORWARD", "INTENTIONAL MOVES", "PURPOSE DRIVEN", "MIND FOCUSED", "TARGET LOCKED", "CLARITY WINS", "DISTRACTION FREE", "PRESENT POWER", "UNDIVIDED ATTENTION", "DIRECT LINE", "SHARP MIND", "CONCENTRATED FORCE", "PINPOINT PRECISION", "CENTERED ENERGY", "DIALED IN", "CRYSTAL FOCUS"],
      phrases: ["One step forward", "My mind is sharp", "I see clearly", "Purpose drives me", "Distractions fade", "I stay present", "Focus flows naturally", "I direct my energy", "My vision is clear", "I concentrate fully", "Clarity guides me", "I tune out noise", "My attention is mine", "I work with intention", "Goals come into view", "I eliminate distractions", "My mind stays centered", "I prioritize what matters", "Focus is my strength", "I see the path ahead"],
      colors: ["#2c3e50", "#3498db", "#ecf0f1"]
    },
    gratitude: {
      headlines: ["THANKFUL HEART", "BLESSED LIFE", "GRATEFUL SOUL", "JOY OVERFLOWS", "APPRECIATIVE EYES", "COUNTING GIFTS", "ABUNDANCE SEEN", "GRACE RECEIVED", "THANKFUL TODAY", "HEART FULL", "RECOGNIZE BEAUTY", "BLESSINGS MULTIPLY", "GRATEFUL BREATH", "HONOR THIS LIFE", "THANK THE MOMENT", "APPRECIATE ALL", "DAILY GRATITUDE", "GIFTS EVERYWHERE", "OPEN HEART", "THANKFUL SPIRIT"],
      phrases: ["I honor this moment", "Joy surrounds me", "Blessings flow", "I appreciate fully", "Grace is mine", "Life is generous", "Gratitude fills me", "I see abundance", "Thank you for today", "My heart overflows", "I recognize gifts", "Beauty is everywhere", "I am deeply grateful", "Thankfulness grounds me", "I count my blessings", "Appreciation opens me", "I honor what I have", "Grateful for small things", "Life blesses me daily", "My heart says thank you"],
      colors: ["#f4e4d7", "#d4a574", "#8b6f47"]
    },
    abundance: {
      headlines: ["OVERFLOW MINDSET", "PLENTY FLOWS", "WEALTH MAGNET", "PROSPERITY LIFE", "RECEIVE FREELY", "ABUNDANT NOW", "MORE THAN ENOUGH", "RICHES ARRIVE", "OPEN TO WEALTH", "SUCCESS NATURAL", "FORTUNE FAVORS", "MULTIPLY BLESSINGS", "LIMITLESS SUPPLY", "PROSPERITY WITHIN", "ATTRACT ABUNDANCE", "WEALTH FLOWS IN", "ENDLESS RESOURCES", "RICH IN ALL WAYS", "ABUNDANCE SURROUNDS", "OVERFLOWING GIFTS"],
      phrases: ["Wealth finds me", "I receive fully", "Prosperity flows", "I am worthy", "Plenty surrounds me", "Success is natural", "Abundance is mine", "I attract wealth", "Money flows easily", "I am financially free", "Resources come to me", "I live in prosperity", "Opportunities multiply", "I welcome abundance", "My cup overflows", "Wealth is my birthright", "I deserve prosperity", "Success follows me", "I am a money magnet", "Abundance flows naturally"],
      colors: ["#2d5016", "#ffd700", "#f8f4e6"]
    },
    healing: {
      headlines: ["GENTLE GROWTH", "MENDING SLOWLY", "RESTORE SOFTLY", "HEALING JOURNEY", "PATIENT RETURN", "TENDER RECOVERY", "WHOLENESS RETURNS", "FORGIVE MYSELF", "RELEASE PAIN", "GENTLE GRACE", "HEALING TOUCH", "SOFT TRANSFORMATION", "RENEWED BODY", "PEACEFUL HEALING", "TIME RESTORES", "COMPASSIONATE CARE", "HEAL WITH LOVE", "RECOVERY PATH", "NURTURE MYSELF", "GENTLE REPAIR"],
      phrases: ["I am mending", "Softness heals me", "I forgive myself", "Rest restores me", "I release pain", "Wholeness returns", "Healing takes time", "I am patient with myself", "My body knows healing", "Gentle care restores me", "I nurture my wounds", "Recovery is happening", "I allow healing space", "Compassion heals me", "I am becoming whole", "Pain releases slowly", "I trust the process", "Healing flows through me", "I am gentle with myself", "Restoration is here"],
      colors: ["#faf3e0", "#b5d3d1", "#e8b4a0"]
    },
    strength: {
      headlines: ["UNBREAKABLE CORE", "ROOTED DEEP", "SOLID GROUND", "ENDURE ANYTHING", "RESILIENT SPIRIT", "IRON WILL", "MOUNTAIN STANCE", "POWER WITHIN", "UNWAVERING STAND", "BUILT TO LAST", "STRONG FOUNDATION", "MIGHTY FORCE", "STURDY ROOTS", "UNSHAKEN RESOLVE", "DURABLE SOUL", "GROUNDED POWER", "INNER FORTRESS", "TOUGH AS STONE", "STRONG ALWAYS", "STEADFAST HEART"],
      phrases: ["I endure anything", "My roots run deep", "I stand tall", "Resilience is mine", "I overcome all", "Power lives in me", "I am unbreakable", "Strength flows through me", "I weather any storm", "My foundation is solid", "I cannot be moved", "Inner power sustains me", "I rise after every fall", "Durability defines me", "I am built strong", "Challenges strengthen me", "I stand firm always", "My spirit is mighty", "I am tougher than I know", "Strength is my nature"],
      colors: ["#4a4a4a", "#c9a961", "#1c1c1c"]
    },
    joy: {
      headlines: ["RADIANT LIGHT", "PURE DELIGHT", "CELEBRATE NOW", "HAPPINESS BLOOMS", "BRIGHT SPIRIT", "JOYFUL HEART", "LIGHT WITHIN", "DANCING SOUL", "SPARKLE LIFE", "LAUGH FREELY", "SUNSHINE ENERGY", "PLAYFUL DAYS", "HAPPY ALWAYS", "BLISS FOUND", "CHEERFUL BEING", "SMILE WIDE", "JOYOUS LIVING", "BRIGHT MOMENTS", "HAPPY HEART", "PURE JOY"],
      phrases: ["Laughter fills me", "I choose happiness", "Delight is mine", "My spirit soars", "I celebrate today", "Joy is my truth", "Happiness flows freely", "I radiate light", "My heart dances", "Pure joy fills me", "I sparkle with life", "Laughter heals me", "I find joy everywhere", "Happiness is my choice", "My spirit is bright", "I celebrate small wins", "Joy bubbles within me", "I am full of delight", "Happiness surrounds me", "I live joyfully"],
      colors: ["#fff5e1", "#ffb347", "#ff6b9d"]
    },
    balance: {
      headlines: ["CENTERED BEING", "HARMONY FOUND", "EQUAL WEIGHT", "MIDDLE PATH", "ALIGNED LIFE", "EQUILIBRIUM NOW", "STEADY HEART", "BALANCED SOUL", "EVEN GROUND", "PEACEFUL BALANCE", "SYMMETRY WITHIN", "CENTERED ENERGY", "GROUNDED HARMONY", "CALM EQUILIBRIUM", "BALANCED LIVING", "FIND THE CENTER", "STABLE CORE", "HARMONY FLOWS", "EVEN KEEL", "BALANCED MIND"],
      phrases: ["Harmony guides me", "I find equilibrium", "All is aligned", "I flow with ease", "Balance is natural", "I am grounded", "I honor both sides", "My life has rhythm", "I stay centered", "Balance comes easily", "I walk the middle path", "Harmony fills me", "I maintain equilibrium", "My energy is balanced", "I find my center", "Stability grounds me", "I balance work and rest", "My life flows evenly", "I am in alignment", "Balance sustains me"],
      colors: ["#d5c4a1", "#8fbc8f", "#f0ead6"]
    },
    courage: {
      headlines: ["BRAVE SOUL", "FEARLESS LEAP", "BOLD MOVES", "DARING HEART", "COURAGE RISES", "FACE FORWARD", "BRAVE ACTION", "FEAR NO MORE", "BOLD SPIRIT", "DARING STEPS", "COURAGEOUS NOW", "BRAVE ENOUGH", "HEART OF LION", "FEARLESS ME", "BRAVE ALWAYS", "BOLD CHOICES", "DARE GREATLY", "COURAGEOUS SOUL", "BRAVE LIVING", "FEARLESS PATH"],
      phrases: ["Fear bows to me", "I leap anyway", "My heart is bold", "I face everything", "Bravery is mine", "I am unstoppable", "Courage flows through me", "I dare to try", "Fear does not rule me", "I take brave steps", "My courage grows daily", "I act despite fear", "Bravery lives in me", "I face the unknown", "Courage is my power", "I choose brave", "Fear releases me", "I step forward boldly", "My courage is strong", "I dare to be me"],
      colors: ["#8b0000", "#ffa500", "#2f4f4f"]
    },
    clarity: {
      headlines: ["CRYSTAL VISION", "CLEAR SIGHT", "TRUTH REVEALED", "SEE CLEARLY", "WISDOM SHINES", "INSIGHT FLOWS", "TRANSPARENT TRUTH", "CLEAR MIND", "VISION SHARP", "TRUTH SPEAKS", "CLARITY WINS", "UNDERSTANDING DEEP", "CLEAR PATH", "SEE TRUTH", "LUCID THOUGHTS", "PURE VISION", "CLEAR KNOWING", "TRUTH FOUND", "BRIGHT CLARITY", "CRYSTAL CLEAR"],
      phrases: ["Truth reveals itself", "I see clearly now", "Wisdom is mine", "Insight flows", "My path is lit", "Understanding deepens", "Clarity comes easily", "I know the truth", "My vision is sharp", "Answers appear", "I see what matters", "Truth guides me", "Clarity is my gift", "I understand deeply", "My mind is clear", "I see through confusion", "Truth illuminates me", "Clarity brings peace", "I know my direction", "Wisdom flows freely"],
      colors: ["#e0f7fa", "#00acc1", "#006064"]
    },
    renewal: {
      headlines: ["FRESH START", "NEW BEGINNING", "REBORN TODAY", "CLEAN SLATE", "START AGAIN", "REBIRTH NOW", "NEW LIFE", "BEGIN FRESH", "RENEWED SPIRIT", "FRESH CHAPTER", "NEW DAWN", "TRANSFORMATION HERE", "REBIRTH ENERGY", "START OVER", "NEW VERSION", "FRESH PERSPECTIVE", "RENEWED ME", "SECOND CHANCE", "BEGIN ANEW", "FRESH AWAKENING"],
      phrases: ["I begin again", "New life blooms", "Change embraces me", "I shed the old", "Rebirth is here", "I am reborn", "Fresh starts are mine", "I embrace new beginnings", "Change renews me", "I start with clean slate", "New chapters unfold", "I welcome transformation", "Renewal flows through me", "I am brand new", "Fresh energy fills me", "I release the past", "New possibilities open", "I begin again today", "Rebirth is natural", "I start fresh now"],
      colors: ["#a8d5a3", "#77c593", "#4a7c59"]
    },
    freedom: {
      headlines: ["UNCHAINED SPIRIT", "BREAK FREE", "WILD AND FREE", "LIBERATED SOUL", "NO LIMITS", "FLY HIGH", "BOUNDLESS ME", "FREE SPIRIT", "RELEASE CHAINS", "UNTETHERED LIFE", "FREEDOM CALLS", "WINGS SPREAD", "LIBERATE NOW", "FREE TO BE", "UNLIMITED SELF", "BREAK BOUNDARIES", "FREE ALWAYS", "WILD HEART", "LIBERTY MINE", "UNCHAINED LIVING"],
      phrases: ["I release all limits", "Boundless I fly", "Liberty is mine", "I am untethered", "Wings unfold", "I choose my way", "Freedom flows through me", "I break all chains", "My spirit is wild", "I live without limits", "Freedom is my birthright", "I soar freely", "Constraints release me", "I am limitless", "My wings are strong", "I choose my path", "Freedom empowers me", "I fly where I wish", "No cage holds me", "Liberation is mine"],
      colors: ["#87ceeb", "#ffffff", "#4682b4"]
    },
    passion: {
      headlines: ["FIRE WITHIN", "BURN BRIGHT", "FIERCE DESIRE", "ALIVE NOW", "IGNITE SOUL", "HOT PURSUIT", "BLAZING HEART", "INTENSE LIFE", "PASSIONATE SOUL", "FLAMES RISE", "BURNING PASSION", "FIRED UP", "HEART ABLAZE", "WILD DESIRE", "FIERCE ENERGY", "BURNING BRIGHT", "PASSION FLOWS", "INTENSE LOVE", "FIERY SPIRIT", "PASSIONATE LIVING"],
      phrases: ["I burn brightly", "Desire fuels me", "My heart blazes", "Intensity is mine", "I am alive", "Flames guide me", "Passion drives me forward", "I feel deeply", "My fire never dies", "Intensity fills me", "I live passionately", "Desire moves me", "My heart burns hot", "Passion is my fuel", "I feel everything fully", "Fire lives in me", "My spirit is fierce", "I pursue with passion", "Intensity empowers me", "I burn with purpose"],
      colors: ["#ff4500", "#dc143c", "#8b0000"]
    },
    wisdom: {
      headlines: ["ANCIENT KNOWING", "DEEP WISDOM", "TRUST THE JOURNEY", "SAGE INSIGHTS", "WISE SOUL", "LEARNED TRUTH", "TIMELESS KNOWING", "EXPERIENCE SPEAKS", "WISDOM FLOWS", "ELDER KNOWLEDGE", "DEEP UNDERSTANDING", "WISE CHOICES", "TRUST KNOWING", "SEASONED SPIRIT", "WISDOM EARNED", "LEARNED WELL", "INNER SAGE", "WISE HEART", "KNOWLEDGE DEEP", "WISDOM MINE"],
      phrases: ["I trust my knowing", "Deep truth guides me", "Age enriches me", "I honor my journey", "Experience speaks", "I am wise", "Wisdom flows through me", "I learn from everything", "My insights are valuable", "Experience teaches me", "I trust life lessons", "Wisdom grows daily", "I know what I know", "My journey taught me well", "I am wiser today", "Life reveals truth", "I honor my path", "Wisdom is mine", "I trust my experience", "Deep knowing guides me"],
      colors: ["#8b7355", "#daa520", "#f5deb3"]
    }
  };

  // Mood only influences accents now - expanded nature-focused elements
  const moodAccents: Record<string, string[]> = {
    minimalist: ["delicate branch", "single leaf", "minimal botanical line", "subtle vine", "simple stem", "soft petal"],
    bohemian: ["wildflower cluster", "flowing vines", "organic botanical shapes", "layered leaves", "dried flowers", "pampas grass", "botanical wreaths"],
    "modern-serif": ["eucalyptus branch", "olive leaf", "minimalist botanical line", "simple leaf silhouette", "clean branch", "elegant frond"],
    coastal: ["sea grass", "dune grass", "coastal botanicals", "beach grass clusters", "sand dollar accents", "driftwood element", "wave-like fronds"],
    earthy: ["monstera leaf", "fern frond", "pressed botanical", "terracotta pot silhouette", "dried palm", "natural seed pods", "earth-tone leaves", "organic branch"],
    vibrant: ["tropical palm", "bold monstera", "colorful botanical", "dynamic leaf patterns", "bright flower burst", "vivid frond", "energetic plant forms"],
    pastel: ["soft eucalyptus", "gentle flower", "whisper leaves", "delicate botanical wisp", "tender petal", "light botanical spray", "dreamy floral"],
    monochrome: ["bold botanical silhouette", "graphic leaf", "stark branch", "high-contrast botanical", "dramatic frond shadow", "silhouette fern", "black botanical"],
    sunset: ["golden wheat", "amber grass", "warm botanical", "sun-kissed leaves", "golden palm", "harvest botanical", "warm-tone fronds"],
    forest: ["oak leaf", "pine branch", "woodland fern", "moss clusters", "forest floor botanical", "acorn accents", "tree branch", "woodland flora", "natural wood elements"]
  };

  // Layout only influences structure/placement now - 20 unique layouts
  const layoutDescriptions: Record<string, string> = {
    "centered-serenity": "Headline centered, balanced margins, soft breathing space",
    "vertical-flow": "Text cascades downward in a gentle vertical rhythm",
    "floating-cluster": "Affirmations grouped in a soft cluster near center",
    "asymmetric-balance": "Intentionally off-center, modern editorial balance",
    "arc-flow": "Text follows a subtle curved line — uplifting arc",
    "golden-spiral": "Spiral flow anchored by a focal point — meditative",
    "botanical-frame": "Text surrounded by delicate foliage accents",
    "minimal-horizon": "Headline top third, space below feels open like sky",
    "radiant-center-burst": "Words radiate from a quiet center, halo effect",
    "soft-anchor-left": "Text anchored left, breathing room to right",
    "soft-anchor-right": "Opposite direction version — elegant asymmetry",
    "gentle-column": "Headlines + statements aligned like poetry lines",
    "pebble-scatter": "Text arranged as soft clusters like river stones",
    "circle-harmony": "Circular composition, wholeness feeling",
    "prayer-stack": "Vertical mantra stacking — spiritual form",
    "ribbon-drift": "Text moves like a soft ribbon — organic motion",
    "editorial-grid-luxe": "Clean magazine/grid system refinement",
    "calm-waterfall": "Words fall downward like flowing water",
    "sacred-geometry": "Subtle geometric cues (flower of life, triangle, etc.)",
    "breath-space-minimal": "Very little text — stillness dominates canvas"
  };

  const selectedTheme = themeData[overrideTheme || theme] || themeData.confidence;
  const selectedMoodAccents = moodAccents[overrideMood || mood] || moodAccents.minimalist;

  // Auto-select layout if not chosen - favor organic and dynamic layouts
  let finalLayout = overrideLayout || layoutStyle;
  if (!finalLayout) {
    const layoutMap: Record<string, string> = {
      minimalist: "breath-space-minimal",
      bohemian: "botanical-frame",
      "modern-serif": "editorial-grid-luxe",
      coastal: "soft-anchor-left",
      earthy: "pebble-scatter",
      vibrant: "radiant-center-burst",
      pastel: "floating-cluster",
      monochrome: "gentle-column",
      sunset: "arc-flow",
      forest: "botanical-frame"
    };
    finalLayout = layoutMap[overrideMood || mood] || "asymmetric-balance";
  }

  const layoutDescription = layoutDescriptions[finalLayout] || layoutDescriptions["centered-serenity"];

  // Theme controls colors - use theme colors with slightly transparent backgrounds
  const themeColors = selectedTheme.colors;
  const finalPalette = themeColors;

  // Mood controls accents only
  const finalAccents = selectedMoodAccents;

  // Randomly select 1 headline from 20 and 6 phrases from 20
  const randomHeadline = selectedTheme.headlines[Math.floor(Math.random() * selectedTheme.headlines.length)];
  const shuffledPhrases = [...selectedTheme.phrases].sort(() => Math.random() - 0.5);
  const selectedPhrases = shuffledPhrases.slice(0, 6);

  return {
    headline: randomHeadline,
    supportingLines: selectedPhrases,
    palette: finalPalette,
    paletteNames: finalPalette.map(c => c),
    layoutStyle: layoutDescription,
    accentElements: finalAccents.join(", ")
  };
}
