import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, Heart, Edit2, Check, X, Download, Share2, Palette, History, ChevronDown, Wand2, Shield, Award, Zap } from "lucide-react";
import morningRitualImg from "@/assets/affirmation-peace.jpg";
import powerHourImg from "@/assets/affirmation-progress.jpg";
import gratitudeGardenImg from "@/assets/affirmation-joy.jpg";
import focusFlowImg from "@/assets/affirmation-trust.jpg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { buildDesignSpec } from "@/lib/designSpecBuilder";
import type { ThemeSlug, MoodSlug, LayoutArchetype } from "@/types/design-spec";

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
}

interface FavoriteConfig {
  id: string;
  theme: string;
  mood: string;
  layoutStyle: string;
  userKeywords: string;
  seed: string;
  generatedData: GeneratedData;
  timestamp: number;
}

interface StaffPreset {
  name: string;
  description: string;
  theme: string;
  mood: string;
  layoutStyle: string;
  keywords: string;
  previewImage: string;
}

interface HistoryItem {
  id: string;
  imageB64: string;
  generatedData: GeneratedData;
  timestamp: number;
}

const AffirmationBuilder = () => {
  const [theme, setTheme] = useState("confidence");
  const [mood, setMood] = useState("minimalist");
  const [layoutStyle, setLayoutStyle] = useState("");
  const [userKeywords, setUserKeywords] = useState("");
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedData>({
    headline: "FEARLESS FORWARD",
    supportingLines: [
      "I trust my decisions",
      "I claim my power",
      "I rise boldly",
      "My voice matters"
    ],
    palette: ["#1a1a1a", "#d4af37", "#ffffff"],
    paletteNames: ["#1a1a1a", "#d4af37", "#ffffff"],
    layoutStyle: "Centered headline with elegant underline bar",
    accentElements: "thin horizontal bars, serif typography"
  });
  const [generatedImageB64, setGeneratedImageB64] = useState<string | null>(null);
  const [previewImagesB64, setPreviewImagesB64] = useState<string[]>([]);
  const [finalImagesB64, setFinalImagesB64] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'preview' | 'final'>('preview');
  const [expandedImage, setExpandedImage] = useState<{ url: string; type: 'preview' | 'final' } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState("");
  const [editedLines, setEditedLines] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<FavoriteConfig[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [customPalette, setCustomPalette] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPresets, setShowPresets] = useState(true);

  // Staff Picks Presets
  const staffPresets: StaffPreset[] = [
    {
      name: "Morning Ritual",
      description: "Peaceful sunrise",
      theme: "peace",
      mood: "coastal",
      layoutStyle: "circular-orbit",
      keywords: "light, fresh, calm",
      previewImage: morningRitualImg
    },
    {
      name: "Power Hour",
      description: "Bold confidence",
      theme: "confidence",
      mood: "monochrome",
      layoutStyle: "angular-grid",
      keywords: "strong, fearless",
      previewImage: powerHourImg
    },
    {
      name: "Gratitude Garden",
      description: "Warm botanicals",
      theme: "gratitude",
      mood: "bohemian",
      layoutStyle: "flowing-curves",
      keywords: "flowers, warmth, joy",
      previewImage: gratitudeGardenImg
    },
    {
      name: "Focus Flow",
      description: "Clear sharp vision",
      theme: "focus",
      mood: "minimalist",
      layoutStyle: "minimal-focus",
      keywords: "clarity, precision",
      previewImage: focusFlowImg
    }
  ];

  // Load favorites and history from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('affirmation-favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }

    const storedHistory = localStorage.getItem('affirmation-history');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  const generatePreviewData = (overrideTheme?: string, overrideMood?: string, overrideLayout?: string): GeneratedData => {
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
  };

  const handleGenerate = async () => {
    setLoading(true);
    setPreviewImagesB64([]);
    
    try {
      // Use existing preview data from state (set by Randomize button)
      // Only generate new if none exists
      const preview = generatedData || generatePreviewData();
      if (!generatedData) {
        // Apply custom palette if set and we're generating new data
        if (customPalette.length > 0) {
          preview.palette = customPalette;
          preview.paletteNames = customPalette;
        }
        setGeneratedData(preview);
      }
      
      // Generate 4 preview images in parallel
      toast.info("Generating 4 preview variations...");
      
      const requests = Array(4).fill(null).map(() =>
        supabase.functions.invoke('generate-preview-image', {
          body: {
            headline: preview.headline,
            supportingLines: preview.supportingLines,
            theme,
            mood,
            layout: preview.layoutStyle,
            palette: preview.palette,
            accentElements: preview.accentElements
          }
        })
      );
      
      const results = await Promise.all(requests);
      const successfulImages = results
        .filter(result => !result.error && result.data?.imageB64)
        .map(result => `data:image/png;base64,${result.data.imageB64}`);
      
      if (successfulImages.length > 0) {
        setPreviewImagesB64(successfulImages);
        toast.success(`${successfulImages.length} preview${successfulImages.length > 1 ? 's' : ''} generated!`);
      } else {
        toast.error("Failed to generate preview images");
      }
    } catch (error) {
      console.error('Preview error:', error);
      toast.error("Failed to generate previews");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateUnique = async () => {
    setLoading(true);
    setFinalImagesB64([]);
    try {
      // Ensure we have current preview data
      if (!generatedData) {
        await handleGenerate();
      }
      
      // Map layout style to archetype (supports both old and new names)
      const layoutMap: Record<string, LayoutArchetype> = {
        // Old names for backward compatibility - map to closest new equivalents
        "vintage": "arc-flow",
        "clean-serif": "floating-cluster",
        "botanical": "botanical-frame",
        "grid": "editorial-grid-luxe",
        "halo": "circle-harmony",
        "organic": "arc-flow",
        "geometric": "editorial-grid-luxe",
        "celestial": "radiant-center-burst",
        "minimal-zen": "floating-cluster",
        "grit": "asymmetric-balance",
        "scattered-organic": "pebble-scatter",
        "flowing-curves": "arc-flow",
        "angular-grid": "editorial-grid-luxe",
        "circular-orbit": "circle-harmony",
        "diagonal-dynamic": "asymmetric-balance",
        "layered-depth": "floating-cluster",
        "vertical-cascade": "vertical-flow",
        "horizontal-sweep": "soft-anchor-left",
        "corner-radial": "radiant-center-burst",
        "spiral-flow": "golden-spiral",
        "stepped-rhythm": "gentle-column",
        "arch-composition": "arc-flow",
        "split-panel": "soft-anchor-left",
        "wave-pattern": "ribbon-drift",
        "botanical-branch": "botanical-frame",
        "minimal-focus": "minimal-horizon",
        "centered-stack": "centered-serenity",
        // New 20 layout names (passthrough)
        "centered-serenity": "centered-serenity",
        "vertical-flow": "vertical-flow",
        "floating-cluster": "floating-cluster",
        "asymmetric-balance": "asymmetric-balance",
        "arc-flow": "arc-flow",
        "golden-spiral": "golden-spiral",
        "botanical-frame": "botanical-frame",
        "minimal-horizon": "minimal-horizon",
        "radiant-center-burst": "radiant-center-burst",
        "soft-anchor-left": "soft-anchor-left",
        "soft-anchor-right": "soft-anchor-right",
        "gentle-column": "gentle-column",
        "pebble-scatter": "pebble-scatter",
        "circle-harmony": "circle-harmony",
        "prayer-stack": "prayer-stack",
        "ribbon-drift": "ribbon-drift",
        "editorial-grid-luxe": "editorial-grid-luxe",
        "calm-waterfall": "calm-waterfall",
        "sacred-geometry": "sacred-geometry",
        "breath-space-minimal": "breath-space-minimal"
      };
      
      const layoutArchetype = layoutMap[layoutStyle?.toLowerCase()] || layoutMap[layoutStyle] || "asymmetric-balance";
      
      // Get active palette (custom or generated)
      const activePalette = customPalette.length > 0 ? customPalette : generatedData.palette;
      
      // Build proper DesignSpec using the new system with current preview data
      const designSpec = buildDesignSpec({
        theme: theme as ThemeSlug,
        mood: mood as MoodSlug,
        layoutOverride: layoutArchetype,
        keywords: userKeywords,
        seed: seed ? parseInt(seed) : undefined,
        customPaletteHex: activePalette,
        customHeadline: generatedData.headline,
        customSupportingPhrases: generatedData.supportingLines
      });
      
      // Generate 4 final images in parallel
      toast.info("Generating 4 high-quality final images...");
      
      const requests = Array(4).fill(null).map(() =>
        supabase.functions.invoke('generate-affirmation-image', {
          body: { designSpec }
        })
      );
      
      const results = await Promise.all(requests);
      
      // Check for errors
      const hasErrors = results.some(result => {
        if (result.error) {
          console.error('Edge function error:', result.error);
          const errorMessage = result.error.message || JSON.stringify(result.error);
          if (errorMessage.includes('402') || errorMessage.includes('credits depleted') || errorMessage.includes('payment')) {
            toast.error('AI credits depleted. Please add credits to your Lovable workspace to continue.');
            return true;
          } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
            toast.error('Rate limit exceeded. Please wait a moment and try again.');
            return true;
          }
          return true;
        }
        if (result.data?.error) {
          console.error('API error:', result.data.error);
          if (result.data.error.includes('credits depleted') || result.data.error.includes('payment')) {
            toast.error('AI credits depleted. Please add credits to your Lovable workspace to continue.');
            return true;
          } else if (result.data.error.includes('rate limit')) {
            toast.error('Rate limit exceeded. Please wait a moment and try again.');
            return true;
          }
          return true;
        }
        return false;
      });
      
      if (hasErrors) {
        return;
      }
      
      const successfulImages = results
        .filter(result => result.data?.imageB64)
        .map(result => `data:image/png;base64,${result.data.imageB64}`);
      
      if (successfulImages.length > 0) {
        setFinalImagesB64(successfulImages);
        setViewMode('final'); // Switch to final view
        
        // Save first final image to history with quota management
        const newHistoryItem: HistoryItem = {
          id: `history-${Date.now()}`,
          imageB64: successfulImages[0],
          generatedData,
          timestamp: Date.now()
        };
        
        // Try to save with progressively smaller history sizes
        let savedSuccessfully = false;
        let maxHistorySize = 5;
        
        while (!savedSuccessfully && maxHistorySize > 0) {
          try {
            const updatedHistory = [newHistoryItem, ...history].slice(0, maxHistorySize);
            localStorage.setItem('affirmation-history', JSON.stringify(updatedHistory));
            setHistory(updatedHistory);
            savedSuccessfully = true;
          } catch (e) {
            if (e instanceof Error && e.name === 'QuotaExceededError') {
              console.warn(`LocalStorage quota exceeded with ${maxHistorySize} items, reducing...`);
              maxHistorySize--;
              if (maxHistorySize === 0) {
                console.warn('Unable to save to localStorage, keeping in memory only');
                setHistory([newHistoryItem]);
                toast('History saved in memory only (storage full)', { duration: 3000 });
              }
            } else {
              throw e;
            }
          }
        }
        
        toast.success(`${successfulImages.length} final image${successfulImages.length > 1 ? 's' : ''} generated successfully!`);
      } else {
        console.error('No image data in responses');
        toast.error('No images were returned. Please try again.');
      }
    } catch (e) {
      console.error('Image generation error:', e);
      toast.error(e instanceof Error ? e.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomize = () => {
    const themes = ["confidence", "peace", "focus", "gratitude", "abundance", "healing", "strength", "joy", "balance", "courage", "clarity", "renewal", "freedom", "passion", "wisdom"];
    const moods = ["minimalist", "bohemian", "modern-serif", "coastal", "earthy", "vibrant", "pastel", "monochrome", "sunset", "forest"];
    const allLayouts = ["centered-serenity", "vertical-flow", "floating-cluster", "asymmetric-balance", "arc-flow", "golden-spiral", "botanical-frame", "minimal-horizon", "radiant-center-burst", "soft-anchor-left", "soft-anchor-right", "gentle-column", "pebble-scatter", "circle-harmony", "prayer-stack", "ribbon-drift", "editorial-grid-luxe", "calm-waterfall", "sacred-geometry", "breath-space-minimal"];
    
    const newTheme = themes[Math.floor(Math.random() * themes.length)];
    const newMood = moods[Math.floor(Math.random() * moods.length)];
    const newLayout = allLayouts[Math.floor(Math.random() * allLayouts.length)];
    
    setTheme(newTheme);
    setMood(newMood);
    setLayoutStyle(newLayout);
    setPreviewImagesB64([]);
    setFinalImagesB64([]);
    setGeneratedImageB64(null);
    
    // Generate new preview data immediately with the new selections
    const newData = generatePreviewData(newTheme, newMood, newLayout);
    setGeneratedData(newData);
    
    toast.success('Randomized! Preview updated.');
  };

  const startEditing = () => {
    setEditedHeadline(generatedData.headline);
    setEditedLines([...generatedData.supportingLines]);
    setIsEditing(true);
  };

  const saveEdits = () => {
    setGeneratedData({
      ...generatedData,
      headline: editedHeadline,
      supportingLines: editedLines
    });
    setIsEditing(false);
    toast.success('Changes saved!');
  };

  const cancelEdits = () => {
    setIsEditing(false);
    setEditedHeadline("");
    setEditedLines([]);
  };

  const toggleFavorite = () => {
    const currentConfig: FavoriteConfig = {
      id: `${theme}-${mood}-${Date.now()}`,
      theme,
      mood,
      layoutStyle,
      userKeywords,
      seed,
      generatedData,
      timestamp: Date.now()
    };

    let updatedFavorites: FavoriteConfig[];
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(f => 
        !(f.theme === theme && f.mood === mood && f.layoutStyle === layoutStyle)
      );
      setIsFavorite(false);
      toast.success('Removed from favorites');
    } else {
      // Add to favorites (max 10)
      updatedFavorites = [currentConfig, ...favorites].slice(0, 10);
      setIsFavorite(true);
      toast.success('Added to favorites!');
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('affirmation-favorites', JSON.stringify(updatedFavorites));
  };

  const downloadImage = (imageUrl: string, format: string, type: 'preview' | 'final') => {
    const link = document.createElement('a');
    link.href = imageUrl;
    
    const sizeMap: Record<string, string> = {
      'original': 'original',
      'instagram-square': '1080x1080',
      'instagram-story': '1080x1920',
      'print-8x10': '8x10',
      'print-11x14': '11x14'
    };

    link.download = `affirmation-${type}-${sizeMap[format]}-${Date.now()}.png`;
    link.click();
    toast.success(`Downloaded ${type} ${sizeMap[format]} format!`);
  };

  const updatePaletteColor = (index: number, color: string) => {
    const newPalette = [...(customPalette.length > 0 ? customPalette : generatedData.palette)];
    newPalette[index] = color;
    setCustomPalette(newPalette);
    setGeneratedData({
      ...generatedData,
      palette: newPalette,
      paletteNames: newPalette
    });
  };

  const resetPalette = () => {
    setCustomPalette([]);
    handleGenerate();
    toast.success('Palette reset to default');
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(`${generatedData.headline}\n\n${generatedData.supportingLines.slice(0, 3).join(' • ')}\n\nCreated with Minimaluxe Affirmation Builder`);
    const url = encodeURIComponent(window.location.href);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
      copy: ''
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${generatedData.headline}\n\n${generatedData.supportingLines.slice(0, 3).join('\n')}\n\nCreated with Minimaluxe Affirmation Builder - ${window.location.href}`);
      toast.success('Caption copied to clipboard!');
    } else {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <>
      <Helmet>
        <title>Affirmation Studio | LunaRituals</title>
        <meta name="description" content="Create custom affirmation posters with AI-powered design. Professional-quality printable art designed to inspire your intentional living journey." />
      </Helmet>

      <div className="min-h-screen bg-background py-8 md:py-16">
        <div className="container-custom max-w-screen-xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-clay animate-pulse" />
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-clay">Affirmation Studio</h1>
              <Badge className="bg-clay text-white text-xs px-2 py-1">NEW</Badge>
              <Sparkles className="h-6 w-6 text-clay animate-pulse" />
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              Create meaningful affirmation art that reflects your unique journey
            </p>

            {/* Consolidated Trust Banner */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-full bg-muted/30">
                <Shield className="h-4 w-4 text-clay" />
                <span>Professional Quality</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-full bg-muted/30">
                <Zap className="h-4 w-4 text-clay" />
                <span>Instant Generation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-full bg-muted/30">
                <Award className="h-4 w-4 text-clay" />
                <span>Print-Ready</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-full bg-muted/30">
                <Wand2 className="h-4 w-4 text-clay" />
                <span>Personalized</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-full bg-muted/30">
                <Sparkles className="h-4 w-4 text-clay" />
                <span>Brand-Aligned</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-full bg-muted/30">
                <Download className="h-4 w-4 text-clay" />
                <span>AI-Powered</span>
              </div>
            </div>

            <Dialog open={showGallery} onOpenChange={setShowGallery}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <History className="h-4 w-4" />
                  View Gallery
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Your Gallery</DialogTitle>
                  <DialogDescription>Previously generated affirmations</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {history.length === 0 ? (
                    <p className="col-span-full text-center text-muted-foreground py-8">No history yet. Generate your first affirmation!</p>
                  ) : (
                    history.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
                        setGeneratedImageB64(item.imageB64);
                        setGeneratedData(item.generatedData);
                        setShowGallery(false);
                        toast.success('Loaded from gallery');
                      }}>
                        <img src={item.imageB64} alt="History" className="w-full h-auto" />
                        <div className="p-2 bg-muted/50">
                          <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Staff Picks Section - Collapsible on Mobile */}
          <Collapsible open={showPresets} onOpenChange={setShowPresets} className="mb-8">
            <Card className="bg-gradient-to-br from-card to-muted/20">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Staff Picks</CardTitle>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${showPresets ? 'rotate-180' : ''}`} />
                  </div>
                  <CardDescription>Curated designs ready to download</CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {staffPresets.map((preset) => (
                      <div
                        key={preset.name}
                        className="flex flex-col border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary transition-all group"
                        onClick={async () => {
                          try {
                            // Fetch the image as a blob
                            const response = await fetch(preset.previewImage);
                            const blob = await response.blob();
                            
                            // Create object URL and download
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `${preset.name.toLowerCase().replace(/\s+/g, '-')}-affirmation.jpg`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            
                            // Clean up object URL
                            URL.revokeObjectURL(url);
                            
                            toast.success(`Downloaded "${preset.name}"!`);
                          } catch (error) {
                            console.error('Download error:', error);
                            toast.error('Failed to download. Please try again.');
                          }
                        }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img 
                            src={preset.previewImage} 
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Download className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <div className="p-2 bg-card">
                          <p className="font-semibold text-xs leading-tight mb-0.5">{preset.name}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">{preset.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Mobile: Tabs, Desktop: Two Columns */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="lg:hidden">
            <TabsList className="grid w-full grid-cols-2 mb-4 sticky top-0 z-10 bg-background">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            {/* Mobile Create Tab */}
            <TabsContent value="create">
              <Card className="bg-card">
              <CardHeader>
                <CardTitle>Your Inputs</CardTitle>
                <CardDescription>Choose your affirmation style</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Theme Selection */}
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confidence">Confidence</SelectItem>
                      <SelectItem value="peace">Peace</SelectItem>
                      <SelectItem value="focus">Focus</SelectItem>
                      <SelectItem value="gratitude">Gratitude</SelectItem>
                      <SelectItem value="abundance">Abundance</SelectItem>
                      <SelectItem value="healing">Healing</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="joy">Joy</SelectItem>
                      <SelectItem value="balance">Balance</SelectItem>
                      <SelectItem value="courage">Courage</SelectItem>
                      <SelectItem value="clarity">Clarity</SelectItem>
                      <SelectItem value="renewal">Renewal</SelectItem>
                      <SelectItem value="freedom">Freedom</SelectItem>
                      <SelectItem value="passion">Passion</SelectItem>
                      <SelectItem value="wisdom">Wisdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mood Selection */}
                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger id="mood">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="bohemian">Bohemian</SelectItem>
                      <SelectItem value="modern-serif">Modern Serif</SelectItem>
                      <SelectItem value="coastal">Coastal</SelectItem>
                      <SelectItem value="earthy">Earthy</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="sunset">Sunset</SelectItem>
                      <SelectItem value="forest">Forest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Advanced Options - Collapsible */}
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <span>Advanced Options</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-2">
                    {/* Layout Style Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="layout">Layout Style</Label>
                      <Select value={layoutStyle || "auto"} onValueChange={(val) => setLayoutStyle(val === "auto" ? "" : val)}>
                        <SelectTrigger id="layout">
                          <SelectValue placeholder="Auto" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] bg-background z-50">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="centered-serenity">Centered Serenity</SelectItem>
                          <SelectItem value="vertical-flow">Vertical Flow</SelectItem>
                          <SelectItem value="floating-cluster">Floating Cluster</SelectItem>
                          <SelectItem value="asymmetric-balance">Asymmetric Balance</SelectItem>
                          <SelectItem value="arc-flow">Arc Flow</SelectItem>
                          <SelectItem value="golden-spiral">Golden Spiral</SelectItem>
                          <SelectItem value="botanical-frame">Botanical Frame</SelectItem>
                          <SelectItem value="minimal-horizon">Minimal Horizon</SelectItem>
                          <SelectItem value="radiant-center-burst">Radiant Center Burst</SelectItem>
                          <SelectItem value="soft-anchor-left">Soft Anchor Left</SelectItem>
                          <SelectItem value="soft-anchor-right">Soft Anchor Right</SelectItem>
                          <SelectItem value="gentle-column">Gentle Column</SelectItem>
                          <SelectItem value="pebble-scatter">Pebble Scatter</SelectItem>
                          <SelectItem value="circle-harmony">Circle Harmony</SelectItem>
                          <SelectItem value="prayer-stack">Prayer Stack</SelectItem>
                          <SelectItem value="ribbon-drift">Ribbon Drift</SelectItem>
                          <SelectItem value="editorial-grid-luxe">Editorial Grid Luxe</SelectItem>
                          <SelectItem value="calm-waterfall">Calm Waterfall</SelectItem>
                          <SelectItem value="sacred-geometry">Sacred Geometry</SelectItem>
                          <SelectItem value="breath-space-minimal">Breath Space Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* User Keywords */}
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (adds objects to image)</Label>
                      <Textarea
                        id="keywords"
                        placeholder="e.g., mountains, ocean, stars, flowers..."
                        value={userKeywords}
                        onChange={(e) => setUserKeywords(e.target.value)}
                        rows={2}
                      />
                    </div>

                    {/* Color Customization */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="flex items-center gap-2">
                          <Palette className="h-4 w-4" />
                          Custom Colors
                        </Label>
                        {customPalette.length > 0 && (
                          <Button variant="ghost" size="sm" onClick={resetPalette}>
                            Reset
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(customPalette.length > 0 ? customPalette : generatedData.palette).map((color, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <Input
                              type="color"
                              value={color}
                              onChange={(e) => updatePaletteColor(i, e.target.value)}
                              className="h-12 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={color}
                              onChange={(e) => updatePaletteColor(i, e.target.value)}
                              className="h-8 text-xs text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => {
                        handleGenerate();
                        setActiveTab("preview");
                      }}
                      variant="outline"
                      className="h-11"
                      disabled={loading}
                    >
                      {loading && !generatedImageB64 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      AI Preview
                    </Button>
                    
                    <Button 
                      onClick={handleRandomize}
                      variant="secondary"
                      className="h-11"
                      disabled={loading}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Randomize
                    </Button>
                  </div>
                
                  <Button 
                    onClick={handleGenerateUnique}
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading && generatedImageB64 === null && previewImagesB64.length > 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Final Images
                  </Button>
                </div>
              </CardContent>
            </Card>
            </TabsContent>

            {/* Mobile Preview Tab */}
            <TabsContent value="preview">

              <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Generated affirmation design</CardDescription>
                </div>
                <div className="flex gap-2">
                  {!isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleFavorite}
                        className={isFavorite ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={startEditing}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
                            Share to X/Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
                            Share to Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('pinterest')}>
                            Pin to Pinterest
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('copy')}>
                            Copy Caption
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={saveEdits}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={cancelEdits}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedImageB64 ? (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border">
                      <img 
                        src={generatedImageB64} 
                        alt="Generated Affirmation" 
                        className="w-full h-auto"
                      />
                    </div>
                    
                    {/* Image Info */}
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Resolution</p>
                          <p className="text-foreground text-sm font-medium">1024 x 1024px</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Aspect Ratio</p>
                          <p className="text-foreground text-sm font-medium">1:1 (Square)</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Format</p>
                        <p className="text-foreground text-sm font-medium">High Quality PNG</p>
                      </div>
                    </div>

                    {/* Download & Shop Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'original', 'final')}>
                            Original Size
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'instagram-square', 'final')}>
                            Instagram Square (1080x1080)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'instagram-story', 'final')}>
                            Instagram Story (1080x1920)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'print-8x10', 'final')}>
                            Print 8x10
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'print-11x14', 'final')}>
                            Print 11x14
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          window.open('/shop', '_blank');
                          toast.success('Opening shop...');
                        }}
                      >
                        <span className="mr-2">🛒</span>
                        Shop Prints
                      </Button>
                    </div>
                  </div>
                ) : previewImagesB64.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {previewImagesB64.map((imageUrl, index) => (
                        <div 
                          key={index} 
                          className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-[#3a2817]"
                          onClick={() => setExpandedImage({ url: imageUrl, type: 'preview' })}
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-auto"
                          />
                          <div className="absolute top-1 right-1 bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs font-semibold">
                            Preview
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Preview quality. Click "Generate Final Images" for high-quality versions.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-background to-muted/20 p-6 rounded-lg border-2 border-muted min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                      {/* Decorative corner elements */}
                      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-muted-foreground/30"></div>
                      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-muted-foreground/30"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-muted-foreground/30"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-muted-foreground/30"></div>
                      
                      {/* Additional decorative elements */}
                      <div className="absolute top-1/4 left-8 w-8 h-8 rounded-full border border-muted-foreground/20"></div>
                      <div className="absolute bottom-1/4 right-8 w-6 h-6 rounded-full border border-muted-foreground/20"></div>
                      <div className="absolute top-1/3 right-12 w-1 h-16 bg-gradient-to-b from-muted-foreground/20 to-transparent"></div>
                      <div className="absolute bottom-1/3 left-12 w-1 h-16 bg-gradient-to-t from-muted-foreground/20 to-transparent"></div>
                      
                      {/* Top section */}
                      <div className="relative z-10">
                        <div className="flex justify-center mb-3">
                          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"></div>
                        </div>
                        {isEditing ? (
                          <Input
                            value={editedHeadline}
                            onChange={(e) => setEditedHeadline(e.target.value.toUpperCase())}
                            className="font-display text-2xl md:text-5xl text-center mb-2 tracking-wider uppercase bg-transparent border-2 border-dashed"
                            style={{ color: generatedData.palette[1] || '#c9a961' }}
                          />
                        ) : (
                          <h3 className="font-display text-2xl md:text-5xl text-center mb-2 tracking-wider uppercase" style={{ color: generatedData.palette[1] || '#c9a961' }}>
                            {generatedData.headline}
                          </h3>
                        )}
                        <div className="flex justify-center mb-4">
                          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"></div>
                        </div>
                      </div>
                      
                      {/* Middle section with supporting lines */}
                      <div className="relative z-10 space-y-3 mb-4">
                        {(isEditing ? editedLines : generatedData.supportingLines).slice(0, 4).map((line, i) => (
                          <div key={i} className="flex items-center justify-center gap-2">
                            {i % 2 === 0 && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: generatedData.palette[0] || '#8b8b8b' }}></div>}
                            {isEditing ? (
                              <Input
                                value={line}
                                onChange={(e) => {
                                  const newLines = [...editedLines];
                                  newLines[i] = e.target.value;
                                  setEditedLines(newLines);
                                }}
                                className="text-center leading-relaxed text-sm md:text-lg bg-transparent border border-dashed"
                                style={{ 
                                  color: generatedData.palette[i % generatedData.palette.length] || '#2c2c2c',
                                  fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                                  fontWeight: i % 2 === 0 ? '600' : '400'
                                }}
                              />
                            ) : (
                              <p 
                                className="text-center leading-relaxed text-sm md:text-lg"
                                style={{ 
                                  color: generatedData.palette[i % generatedData.palette.length] || '#2c2c2c',
                                  fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                                  fontWeight: i % 2 === 0 ? '600' : '400'
                                }}
                              >
                                {line}
                              </p>
                            )}
                            {i % 2 === 1 && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: generatedData.palette[1] || '#c9a961' }}></div>}
                          </div>
                        ))}
                      </div>
                      
                      {/* Bottom decorative line */}
                      <div className="relative z-10">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-muted-foreground/30"></div>
                          <div className="w-3 h-3 rotate-45 border border-muted-foreground/30"></div>
                          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-muted-foreground/30"></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div>
                            <p className="font-semibold mb-1 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Theme</p>
                            <p className="text-foreground text-xs font-medium capitalize">{theme}</p>
                          </div>
                          <div>
                            <p className="font-semibold mb-1 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Mood</p>
                            <p className="text-foreground text-xs font-medium capitalize">{mood}</p>
                          </div>
                          <div>
                            <p className="font-semibold mb-1 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Layout</p>
                            <p className="text-foreground text-xs font-medium capitalize">{layoutStyle || 'Auto'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="mb-2">
                          <p className="font-semibold mb-1.5 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Palette</p>
                          <div className="flex gap-1.5 flex-wrap">
                            {generatedData.palette.map((color, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded border border-muted" style={{ backgroundColor: color }}></div>
                                <span className="text-[10px] text-muted-foreground">{color}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold mb-1 text-xs uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Accents</p>
                          <p className="text-muted-foreground text-[10px] leading-relaxed">{generatedData.accentElements}</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleGenerateUnique}
                      className="w-full h-11 bg-primary hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Generate Unique Image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            </TabsContent>
          </Tabs>

          {/* Desktop: Two Column Layout (unchanged) */}
          <div className="hidden lg:grid grid-cols-2 gap-8">
            {/* Left Column: Input Form */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Your Inputs</CardTitle>
                <CardDescription>Choose your affirmation style</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Theme Selection */}
                <div className="space-y-2">
                  <Label htmlFor="theme-desktop">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme-desktop">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confidence">Confidence</SelectItem>
                      <SelectItem value="peace">Peace</SelectItem>
                      <SelectItem value="focus">Focus</SelectItem>
                      <SelectItem value="gratitude">Gratitude</SelectItem>
                      <SelectItem value="abundance">Abundance</SelectItem>
                      <SelectItem value="healing">Healing</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="joy">Joy</SelectItem>
                      <SelectItem value="balance">Balance</SelectItem>
                      <SelectItem value="courage">Courage</SelectItem>
                      <SelectItem value="clarity">Clarity</SelectItem>
                      <SelectItem value="renewal">Renewal</SelectItem>
                      <SelectItem value="freedom">Freedom</SelectItem>
                      <SelectItem value="passion">Passion</SelectItem>
                      <SelectItem value="wisdom">Wisdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mood Selection */}
                <div className="space-y-2">
                  <Label htmlFor="mood-desktop">Mood</Label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger id="mood-desktop">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="bohemian">Bohemian</SelectItem>
                      <SelectItem value="modern-serif">Modern Serif</SelectItem>
                      <SelectItem value="coastal">Coastal</SelectItem>
                      <SelectItem value="earthy">Earthy</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="sunset">Sunset</SelectItem>
                      <SelectItem value="forest">Forest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Advanced Options - Collapsible */}
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <span>Advanced Options</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-2">
                    {/* Layout Style Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="layout-desktop">Layout Style</Label>
                      <Select value={layoutStyle || "auto"} onValueChange={(val) => setLayoutStyle(val === "auto" ? "" : val)}>
                        <SelectTrigger id="layout-desktop">
                          <SelectValue placeholder="Auto" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] bg-background z-50">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="centered-serenity">Centered Serenity</SelectItem>
                          <SelectItem value="vertical-flow">Vertical Flow</SelectItem>
                          <SelectItem value="floating-cluster">Floating Cluster</SelectItem>
                          <SelectItem value="asymmetric-balance">Asymmetric Balance</SelectItem>
                          <SelectItem value="arc-flow">Arc Flow</SelectItem>
                          <SelectItem value="golden-spiral">Golden Spiral</SelectItem>
                          <SelectItem value="botanical-frame">Botanical Frame</SelectItem>
                          <SelectItem value="minimal-horizon">Minimal Horizon</SelectItem>
                          <SelectItem value="radiant-center-burst">Radiant Center Burst</SelectItem>
                          <SelectItem value="soft-anchor-left">Soft Anchor Left</SelectItem>
                          <SelectItem value="soft-anchor-right">Soft Anchor Right</SelectItem>
                          <SelectItem value="gentle-column">Gentle Column</SelectItem>
                          <SelectItem value="pebble-scatter">Pebble Scatter</SelectItem>
                          <SelectItem value="circle-harmony">Circle Harmony</SelectItem>
                          <SelectItem value="prayer-stack">Prayer Stack</SelectItem>
                          <SelectItem value="ribbon-drift">Ribbon Drift</SelectItem>
                          <SelectItem value="editorial-grid-luxe">Editorial Grid Luxe</SelectItem>
                          <SelectItem value="calm-waterfall">Calm Waterfall</SelectItem>
                          <SelectItem value="sacred-geometry">Sacred Geometry</SelectItem>
                          <SelectItem value="breath-space-minimal">Breath Space Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* User Keywords */}
                    <div className="space-y-2">
                      <Label htmlFor="keywords-desktop">Keywords (adds objects to image)</Label>
                      <Textarea
                        id="keywords-desktop"
                        placeholder="e.g., mountains, ocean, stars, flowers..."
                        value={userKeywords}
                        onChange={(e) => setUserKeywords(e.target.value)}
                        rows={2}
                      />
                    </div>

                    {/* Color Customization */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="flex items-center gap-2">
                          <Palette className="h-4 w-4" />
                          Custom Colors
                        </Label>
                        {customPalette.length > 0 && (
                          <Button variant="ghost" size="sm" onClick={resetPalette}>
                            Reset
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(customPalette.length > 0 ? customPalette : generatedData.palette).map((color, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <Input
                              type="color"
                              value={color}
                              onChange={(e) => updatePaletteColor(i, e.target.value)}
                              className="h-12 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={color}
                              onChange={(e) => updatePaletteColor(i, e.target.value)}
                              className="h-8 text-xs text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={handleGenerate}
                      variant="outline"
                      className="h-11"
                      disabled={loading}
                    >
                      {loading && !generatedImageB64 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      AI Preview
                    </Button>
                    
                    <Button 
                      onClick={handleRandomize}
                      variant="secondary"
                      className="h-11"
                      disabled={loading}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Randomize
                    </Button>
                  </div>
                
                  <Button 
                    onClick={handleGenerateUnique}
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading && finalImagesB64.length === 0 && previewImagesB64.length > 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Final Images
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Preview (Desktop) */}
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Generated affirmation design</CardDescription>
                </div>
                <div className="flex gap-2">
                  {!isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleFavorite}
                        className={isFavorite ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={startEditing}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
                            Share to X/Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
                            Share to Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('pinterest')}>
                            Pin to Pinterest
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('copy')}>
                            Copy Caption
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={saveEdits}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={cancelEdits}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* View Toggle Buttons - Show when both preview and final exist */}
                {previewImagesB64.length > 0 && finalImagesB64.length > 0 && (
                  <div className="flex gap-2 mb-6">
                    <Button
                      variant={viewMode === 'preview' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setViewMode('preview')}
                    >
                      Preview Images
                    </Button>
                    <Button
                      variant={viewMode === 'final' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setViewMode('final')}
                    >
                      Final Images
                    </Button>
                  </div>
                )}

                {/* Final Images Section - Only show when in final view mode */}
                {finalImagesB64.length > 0 && viewMode === 'final' && (
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Final Images (High Quality)</h3>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>1024x1024px</span>
                        <span>•</span>
                        <span>4:5 Ratio</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {finalImagesB64.map((imageUrl, index) => (
                        <div 
                          key={index} 
                          className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-[#3a2817] hover:border-[#5a3817] transition-all hover:scale-105"
                          onClick={() => setExpandedImage({ url: imageUrl, type: 'final' })}
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Final Affirmation ${index + 1}`} 
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">View Full Size</span>
                          </div>
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                            Final
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Shop Prints
                      </Button>
                    </div>
                  </div>
                )}

                {/* Preview Images Section - Only show when in preview view mode */}
                {previewImagesB64.length > 0 && viewMode === 'preview' && (
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Preview Images</h3>
                      <span className="text-xs text-muted-foreground">Medium Quality</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {previewImagesB64.map((imageUrl, index) => (
                        <div 
                          key={index} 
                          className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-[#3a2817] hover:border-[#5a3817] transition-all hover:scale-105"
                          onClick={() => setExpandedImage({ url: imageUrl, type: 'preview' })}
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Preview Affirmation ${index + 1}`} 
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">View Full Size</span>
                          </div>
                          <div className="absolute top-2 right-2 bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-semibold">
                            Preview
                          </div>
                        </div>
                      ))}
                    </div>
                    {finalImagesB64.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center">
                        Preview quality. Click "Generate Final Images" for high-quality versions.
                      </p>
                    )}
                  </div>
                )}

                {/* Static Preview when no images */}
                {previewImagesB64.length === 0 && finalImagesB64.length === 0 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-background to-muted/20 p-12 rounded-lg border-2 border-muted min-h-[600px] flex flex-col justify-between relative overflow-hidden">
                      {/* Decorative corner elements */}
                      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-muted-foreground/30"></div>
                      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-muted-foreground/30"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-muted-foreground/30"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-muted-foreground/30"></div>
                      
                      {/* Additional decorative elements */}
                      <div className="absolute top-1/4 left-8 w-8 h-8 rounded-full border border-muted-foreground/20"></div>
                      <div className="absolute bottom-1/4 right-8 w-6 h-6 rounded-full border border-muted-foreground/20"></div>
                      <div className="absolute top-1/3 right-12 w-1 h-16 bg-gradient-to-b from-muted-foreground/20 to-transparent"></div>
                      <div className="absolute bottom-1/3 left-12 w-1 h-16 bg-gradient-to-t from-muted-foreground/20 to-transparent"></div>
                      
                      {/* Top section */}
                      <div className="relative z-10">
                        <div className="flex justify-center mb-3">
                          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"></div>
                        </div>
                        {isEditing ? (
                          <Input
                            value={editedHeadline}
                            onChange={(e) => setEditedHeadline(e.target.value.toUpperCase())}
                            className="font-display text-4xl md:text-5xl text-center mb-3 tracking-wider uppercase bg-transparent border-2 border-dashed"
                            style={{ color: generatedData.palette[1] || '#c9a961' }}
                          />
                        ) : (
                          <h3 className="font-display text-4xl md:text-5xl text-center mb-3 tracking-wider uppercase" style={{ color: generatedData.palette[1] || '#c9a961' }}>
                            {generatedData.headline}
                          </h3>
                        )}
                        <div className="flex justify-center mb-8">
                          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"></div>
                        </div>
                      </div>
                      
                      {/* Middle section with supporting lines */}
                      <div className="relative z-10 space-y-5 mb-8">
                        {(isEditing ? editedLines : generatedData.supportingLines).slice(0, 6).map((line, i) => (
                          <div key={i} className="flex items-center justify-center gap-3">
                            {i % 2 === 0 && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: generatedData.palette[0] || '#8b8b8b' }}></div>}
                            {isEditing ? (
                              <Input
                                value={line}
                                onChange={(e) => {
                                  const newLines = [...editedLines];
                                  newLines[i] = e.target.value;
                                  setEditedLines(newLines);
                                }}
                                className="text-center leading-relaxed text-base md:text-lg bg-transparent border border-dashed"
                                style={{ 
                                  color: generatedData.palette[i % generatedData.palette.length] || '#2c2c2c',
                                  fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                                  fontWeight: i % 2 === 0 ? '600' : '400'
                                }}
                              />
                            ) : (
                              <p 
                                className="text-center leading-relaxed text-base md:text-lg"
                                style={{ 
                                  color: generatedData.palette[i % generatedData.palette.length] || '#2c2c2c',
                                  fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                                  fontWeight: i % 2 === 0 ? '600' : '400'
                                }}
                              >
                                {line}
                              </p>
                            )}
                            {i % 2 === 1 && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: generatedData.palette[1] || '#c9a961' }}></div>}
                          </div>
                        ))}
                      </div>
                      
                      {/* Bottom decorative line */}
                      <div className="relative z-10">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-muted-foreground/30"></div>
                          <div className="w-3 h-3 rotate-45 border border-muted-foreground/30"></div>
                          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-muted-foreground/30"></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                        <div>
                          <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Theme</p>
                          <p className="text-foreground text-sm font-medium capitalize">{theme}</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Mood</p>
                          <p className="text-foreground text-sm font-medium capitalize">{mood}</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Layout</p>
                          <p className="text-foreground text-sm font-medium capitalize">{layoutStyle || 'Auto'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                        <div>
                          <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Palette</p>
                          <div className="flex gap-2 flex-wrap">
                            {generatedData.palette.map((color, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded border border-muted" style={{ backgroundColor: color }}></div>
                                <span className="text-xs text-muted-foreground">{color}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold mb-2 text-sm uppercase tracking-wide" style={{ color: generatedData.palette[1] || '#c9a961' }}>Accents</p>
                          <p className="text-muted-foreground text-xs leading-relaxed">{generatedData.accentElements}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Affirmation Studio Section */}
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 border-t border-border/50 mt-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-clay mb-4">Why Affirmation Studio?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed to support your intentional living journey with personalized, premium-quality affirmation art
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-clay/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-clay/10 flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="h-7 w-7 text-clay" />
                </div>
                <CardTitle className="text-xl text-center">Personalized to Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Every affirmation is uniquely crafted to match your personal energy, style, and intentions. Choose from themes like confidence, peace, focus, and gratitude—never generic templates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-clay/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-clay/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-7 w-7 text-clay" />
                </div>
                <CardTitle className="text-xl text-center">Brand-Aligned Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Designed with the same luxury minimal aesthetic as LunaRituals—calm, intentional, and effortlessly beautiful. Every piece feels cohesive with your intentional lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-clay/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-clay/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-7 w-7 text-clay" />
                </div>
                <CardTitle className="text-xl text-center">AI-Powered Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Instant inspiration powered by advanced AI. Generate unlimited variations, customize colors, and download high-resolution files ready for printing or sharing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 border-t border-border/50">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-clay mb-4">What Our Community Says</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from people who've transformed their spaces and mindset with Affirmation Studio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border hover:border-clay/30 transition-colors">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <CardTitle className="text-lg font-semibold">Perfect for My Morning Routine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "I've printed three different affirmations and they're now framed in my bedroom. The quality is incredible and the designs are so calming. It's the first thing I see every morning."
                </p>
                <p className="text-sm font-medium text-foreground">— Sarah M.</p>
              </CardContent>
            </Card>

            <Card className="border hover:border-clay/30 transition-colors">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <CardTitle className="text-lg font-semibold">Better Than Etsy Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "I used to buy generic affirmation prints on Etsy, but this is on another level. The customization options let me create something that actually speaks to MY goals."
                </p>
                <p className="text-sm font-medium text-foreground">— Jessica T.</p>
              </CardContent>
            </Card>

            <Card className="border hover:border-clay/30 transition-colors">
              <CardHeader>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <CardTitle className="text-lg font-semibold">So Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "I'm not tech-savvy at all, but this was incredibly simple. Within minutes I had a beautiful affirmation designed and downloaded. Already shared it on Instagram!"
                </p>
                <p className="text-sm font-medium text-foreground">— Michael R.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Expansion Dialog */}
      <Dialog open={expandedImage !== null} onOpenChange={() => setExpandedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {expandedImage?.type === 'final' ? 'High Quality Final' : 'Preview'} Image
            </DialogTitle>
            <DialogDescription>
              {expandedImage?.type === 'final' 
                ? '1024x1024px • High Quality PNG • Perfect for printing'
                : 'Medium quality preview • Generate final for print-ready version'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={expandedImage?.url || ''} 
                alt="Expanded Affirmation" 
                className="w-full h-auto"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onClick={() => expandedImage && downloadImage(expandedImage.url, 'original', expandedImage.type)}>
                    Original Size
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => expandedImage && downloadImage(expandedImage.url, 'instagram-square', expandedImage.type)}>
                    Instagram Square (1080x1080)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => expandedImage && downloadImage(expandedImage.url, 'instagram-story', expandedImage.type)}>
                    Instagram Story (1080x1920)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => expandedImage && downloadImage(expandedImage.url, 'print-8x10', expandedImage.type)}>
                    Print 8x10
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => expandedImage && downloadImage(expandedImage.url, 'print-11x14', expandedImage.type)}>
                    Print 11x14
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {expandedImage?.type === 'final' && (
                <Button variant="outline" className="flex-1">
                  Shop Prints
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AffirmationBuilder;
