import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, Heart, Edit2, Check, X, Download, Share2, Palette, History, ChevronDown, Wand2, Shield, Award, Zap } from "lucide-react";
import { LOCAL_DIGITAL_IMAGES } from "@/lib/localDigitalImages";

const morningRitualImg = LOCAL_DIGITAL_IMAGES["aff-014"];
const powerHourImg = LOCAL_DIGITAL_IMAGES["aff-015"];
const gratitudeGardenImg = LOCAL_DIGITAL_IMAGES["aff-002"];
const focusFlowImg = LOCAL_DIGITAL_IMAGES["aff-004"];
const miraclesPreviewImg = LOCAL_DIGITAL_IMAGES["aff-017"]; // "I am open to miracles" preview
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { buildDesignSpec } from "@/lib/designSpecBuilder";
import type { ThemeSlug, MoodSlug, LayoutArchetype } from "@/types/design-spec";
import { useAffirmationGeneration } from "./AffirmationBuilder/hooks/useAffirmationGeneration";

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

import reviewerSarah from "@/assets/reviewer-sarah.jpg";
import reviewerJessica from "@/assets/reviewer-jessica.jpg";
import reviewerMichael from "@/assets/reviewer-michael.jpg";

const AffirmationBuilder = () => {
  const [theme, setTheme] = useState("confidence");
  const [mood, setMood] = useState("minimalist");
  const [layoutStyle, setLayoutStyle] = useState("");
  const [userKeywords, setUserKeywords] = useState("");
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedData>({
    headline: "I am open to miracles",
    supportingLines: [
      "Magic flows through me",
      "I welcome the unexpected",
      "Wonder fills my day",
      "Possibility surrounds me"
    ],
    palette: ["#F5F1E8", "#D4B896", "#8B7355"],
    paletteNames: ["#F5F1E8", "#D4B896", "#8B7355"],
    layoutStyle: "Centered with flowing organic elements",
    accentElements: "watercolor washes, flowing lines, organic shapes"
  });
  const [generatedImageB64, setGeneratedImageB64] = useState<string | null>(null);
  const [previewImagesB64, setPreviewImagesB64] = useState<string[]>([miraclesPreviewImg]); // Show "I am open to miracles" by default
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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Custom hook for affirmation generation with AbortController support
  const {
    loading: generationLoading,
    loadingProgress: generationProgress,
    loadingMessage: generationMessage,
    previewImages,
    finalImages,
    generatePreviews,
    generateFinal,
    cancelGeneration,
  } = useAffirmationGeneration({
    theme,
    mood,
    layoutStyle,
    userKeywords,
    seed,
    customPalette,
    generatedData,
    setGeneratedData,
    generatePreviewData: () => generatePreviewData(),
  });

  // Sync hook state with component state
  useEffect(() => {
    setLoading(generationLoading);
    setLoadingProgress(generationProgress);
    setLoadingMessage(generationMessage);
  }, [generationLoading, generationProgress, generationMessage]);

  useEffect(() => {
    if (previewImages.length > 0) {
      setPreviewImagesB64(previewImages);
    }
  }, [previewImages]);

  useEffect(() => {
    if (finalImages.length > 0) {
      setFinalImagesB64(finalImages);
      setViewMode('final');

      // Save first final image to history
      const newHistoryItem: HistoryItem = {
        id: `history-${Date.now()}`,
        imageB64: finalImages[0],
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
    }
  }, [finalImages, generatedData, history]);

  // Check for first-time user
  useEffect(() => {
    const hasVisited = localStorage.getItem('affirmation-builder-visited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('affirmation-builder-visited', 'true');
    }
  }, []);

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
    await generatePreviews();
  };

  const handleGenerateUnique = async () => {
    await generateFinal();
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

            {/* Consolidated Trust Badges - Square Button Style */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
              <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
                <Zap className="h-6 w-6 text-clay group-hover:animate-pulse" />
                <span className="text-sm font-semibold text-foreground text-center">AI-Powered</span>
              </div>
              <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
                <Award className="h-6 w-6 text-clay group-hover:animate-pulse" />
                <span className="text-sm font-semibold text-foreground text-center">Print-Ready</span>
              </div>
              <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
                <Wand2 className="h-6 w-6 text-clay group-hover:animate-pulse" />
                <span className="text-sm font-semibold text-foreground text-center">Personalized</span>
              </div>
              <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
                <Sparkles className="h-6 w-6 text-clay group-hover:animate-pulse" />
                <span className="text-sm font-semibold text-foreground text-center">Instant</span>
              </div>
            </div>

            {/* Workflow Step Indicator */}
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  previewImagesB64.length === 0 ? 'bg-primary border-primary text-primary-foreground' : 'bg-primary/10 border-primary text-primary'
                }`}>
                  <span className="text-sm font-semibold">1</span>
                </div>
                <span className={`hidden sm:inline text-sm font-medium ${
                  previewImagesB64.length === 0 ? 'text-foreground' : 'text-muted-foreground'
                }`}>Choose</span>
              </div>

              <div className="flex-1 h-0.5 bg-muted max-w-[80px] md:max-w-[120px]">
                <div className={`h-full transition-all duration-500 ${
                  previewImagesB64.length > 0 ? 'bg-primary w-full' : 'bg-primary/30 w-0'
                }`} />
              </div>

              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  previewImagesB64.length > 0 && finalImagesB64.length === 0 ? 'bg-primary border-primary text-primary-foreground' :
                  previewImagesB64.length > 0 ? 'bg-primary/10 border-primary text-primary' :
                  'bg-muted border-muted-foreground/20 text-muted-foreground'
                }`}>
                  <span className="text-sm font-semibold">2</span>
                </div>
                <span className={`hidden sm:inline text-sm font-medium ${
                  previewImagesB64.length > 0 && finalImagesB64.length === 0 ? 'text-foreground' : 'text-muted-foreground'
                }`}>Preview</span>
              </div>

              <div className="flex-1 h-0.5 bg-muted max-w-[80px] md:max-w-[120px]">
                <div className={`h-full transition-all duration-500 ${
                  finalImagesB64.length > 0 ? 'bg-primary w-full' : 'bg-primary/30 w-0'
                }`} />
              </div>

              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  finalImagesB64.length > 0 ? 'bg-primary border-primary text-primary-foreground' :
                  'bg-muted border-muted-foreground/20 text-muted-foreground'
                }`}>
                  <span className="text-sm font-semibold">3</span>
                </div>
                <span className={`hidden sm:inline text-sm font-medium ${
                  finalImagesB64.length > 0 ? 'text-foreground' : 'text-muted-foreground'
                }`}>Create</span>
              </div>
            </div>

            {/* Onboarding Dialog for First-Time Users */}
            <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Welcome to Affirmation Studio!
                  </DialogTitle>
                  <DialogDescription className="text-base pt-2">
                    Create personalized watercolor affirmations in 3 easy steps
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Choose Your Theme</h3>
                      <p className="text-sm text-muted-foreground">
                        Select a theme that matches your intention (Confidence, Peace, Focus, etc.)
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Preview Options</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate 4 quick previews (~30 sec) to explore different styles
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Create Print-Quality</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate 4 high-resolution versions (300 DPI) perfect for printing
                      </p>
                    </div>
                  </div>

                  {/* Quick Tip */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">Quick Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          Try our Quick Start Templates below for instant inspiration!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowOnboarding(false)}
                    className="flex-1"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={() => {
                      setShowOnboarding(false);
                      // Scroll to templates
                      setTimeout(() => {
                        const templates = document.querySelector('[class*="Quick Start"]');
                        templates?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 100);
                    }}
                    className="flex-1"
                  >
                    Get Started
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Image Comparison Dialog */}
            <Dialog open={showComparison} onOpenChange={setShowComparison}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Compare Your Favorites</DialogTitle>
                  <DialogDescription>
                    View your selected previews side-by-side to pick the perfect one
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  {selectedImages.map((imageIndex) => (
                    <div key={imageIndex} className="space-y-2">
                      <div className="relative rounded-lg overflow-hidden border-2 border-primary" style={{ aspectRatio: '4/5' }}>
                        <img
                          src={previewImagesB64[imageIndex]}
                          alt={`Preview ${imageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded font-semibold text-sm">
                          Option {imageIndex + 1}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setExpandedImage({ url: previewImagesB64[imageIndex], type: 'preview' });
                          setShowComparison(false);
                        }}
                        className="w-full"
                      >
                        View Full Size
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedImages([]);
                      setShowComparison(false);
                    }}
                    className="flex-1"
                  >
                    Clear Selection
                  </Button>
                  <Button
                    onClick={() => setShowComparison(false)}
                    className="flex-1"
                  >
                    Done Comparing
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Loading Overlay with Progress */}
            {loading && loadingMessage && (
              <Card className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md shadow-2xl border-2 border-primary/20 animate-in fade-in-0 zoom-in-95">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Progress Circle */}
                    <div className="flex justify-center">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 36}`}
                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - loadingProgress / 100)}`}
                            className="text-primary transition-all duration-500 ease-out"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">{loadingProgress}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Loading Message */}
                    <div className="text-center space-y-2">
                      <p className="text-lg font-medium text-foreground">{loadingMessage}</p>
                      <p className="text-sm text-muted-foreground">This won't take long...</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-500 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>

                    {/* Animated Sparkles */}
                    <div className="flex justify-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '0ms' }} />
                      <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '200ms' }} />
                      <Sparkles className="h-5 w-5 text-primary animate-pulse" style={{ animationDelay: '400ms' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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

          {/* Quick Start Templates - Always Visible */}
          <Card className="bg-gradient-to-br from-card to-muted/20 mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>Quick Start Templates</CardTitle>
              </div>
              <CardDescription>Beautiful designs to inspire your creation</CardDescription>
            </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {staffPresets.map((preset) => (
                      <div
                        key={preset.name}
                        className="flex flex-col border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 group"
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
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
            </Card>

          {/* Mobile: Single Scroll Layout (No Tabs) */}
          <div className="lg:hidden space-y-6">
            {/* Mobile Create Section */}
            <div>
              <Card className="bg-card">
              <CardHeader>
                <CardTitle>Set Your Intention</CardTitle>
                <CardDescription>What do you want to invite into your life?</CardDescription>
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
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={handleGenerate}
                        variant="outline"
                        className="h-11 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        disabled={loading}
                      >
                        {loading && !generatedImageB64 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        See Previews
                      </Button>

                      <Button
                        onClick={handleRandomize}
                        variant="secondary"
                        className="h-11 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        disabled={loading}
                      >
                        <Palette className="mr-2 h-4 w-4" />
                        Randomize
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Preview first to explore options (~30 seconds)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleGenerateUnique}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      disabled={loading || previewImagesB64.length === 0}
                    >
                      {loading && generatedImageB64 === null && previewImagesB64.length > 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Create Print-Quality
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {previewImagesB64.length === 0
                        ? "Generate previews first to unlock print-quality creation"
                        : "Creates 4 high-resolution versions perfect for printing (~60 sec)"}
                    </p>
                  </div>

                  {/* Social Proof */}
                  <div className="pt-4 mt-4 border-t border-border/40 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★★★★★</span>
                        <span className="font-medium text-foreground">4.9/5</span>
                      </div>
                      <span>•</span>
                      <span>1,200+ affirmations created this week</span>
                    </div>
                    <p className="text-xs text-center text-muted-foreground italic">
                      "Finally, affirmations that match my vibe!" - Sarah M.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Mobile Preview Section */}
            <div>

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
                          className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                            selectedImages.includes(index) ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-[#3a2817]'
                          }`}
                          style={{ aspectRatio: '4/5' }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onClick={() => setExpandedImage({ url: imageUrl, type: 'preview' })}
                          />
                          <div className="absolute top-1 right-1 bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs font-semibold">
                            Preview
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImages(prev =>
                                prev.includes(index)
                                  ? prev.filter(i => i !== index)
                                  : [...prev, index]
                              );
                            }}
                            className="absolute top-1 left-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                          >
                            {selectedImages.includes(index) && <Check className="h-4 w-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                    {selectedImages.length >= 2 && (
                      <Button
                        onClick={() => setShowComparison(true)}
                        variant="outline"
                        className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        Compare Selected ({selectedImages.length})
                      </Button>
                    )}
                    <p className="text-sm text-muted-foreground text-center">
                      {selectedImages.length > 0
                        ? `Select 2 or more to compare • ${selectedImages.length} selected`
                        : "Click checkboxes to select favorites for comparison"}
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
            </div>
          </div>

          {/* Desktop: Two Column Layout (unchanged) */}
          <div className="hidden lg:grid grid-cols-2 gap-8">
            {/* Left Column: Input Form */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Set Your Intention</CardTitle>
                <CardDescription>What do you want to invite into your life?</CardDescription>
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
                      className="h-11 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      disabled={loading}
                    >
                      {loading && !generatedImageB64 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      See Previews
                    </Button>

                    <Button
                      onClick={handleRandomize}
                      variant="secondary"
                      className="h-11 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      disabled={loading}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Randomize
                    </Button>
                  </div>

                  <Button
                    onClick={handleGenerateUnique}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading && finalImagesB64.length === 0 && previewImagesB64.length > 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Create Print-Quality
                  </Button>

                  {/* Social Proof */}
                  <div className="pt-4 mt-4 border-t border-border/40 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★★★★★</span>
                        <span className="font-medium text-foreground">4.9/5</span>
                      </div>
                      <span>•</span>
                      <span>1,200+ created this week</span>
                    </div>
                    <p className="text-xs text-center text-muted-foreground italic">
                      "Love the watercolor aesthetic!" - Emma K.
                    </p>
                  </div>
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
                          className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-[#3a2817] hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1"
                          onClick={() => setExpandedImage({ url: imageUrl, type: 'final' })}
                          style={{ aspectRatio: '4/5' }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Final Affirmation ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                          style={{ aspectRatio: '4/5' }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Preview Affirmation ${index + 1}`}
                            className="w-full h-full object-cover"
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
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-border/50">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-clay mb-4">What Our Community Says</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from people transforming their spaces with Affirmation Studio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 - 4.8 Stars */}
            <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
              <div className="p-6">
                {/* Stars - 4.8/5 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5" viewBox="0 0 20 20">
                      <defs>
                        <linearGradient id="partial-fill">
                          <stop offset="80%" stopColor="hsl(var(--clay))" />
                          <stop offset="80%" stopColor="#e5e7eb" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#partial-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-foreground">4.8/5</span>
                </div>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={reviewerSarah} 
                    alt="Sarah M." 
                    className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Sarah M.</p>
                    <p className="text-xs text-muted-foreground">Verified User</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">Perfect for My Morning Routine</h3>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "I've printed three different affirmations and they're now framed in my bedroom. The quality is incredible and the designs are so calming. It's the first thing I see every morning."
                </p>
              </div>
            </div>

            {/* Review 2 - 5 Stars */}
            <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in [animation-delay:100ms]">
              <div className="p-6">
                {/* Stars - 5/5 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">5/5</span>
                </div>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={reviewerJessica} 
                    alt="Jessica T." 
                    className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Jessica T.</p>
                    <p className="text-xs text-muted-foreground">Verified User</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">Better Than Etsy Options</h3>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "I used to buy generic affirmation prints on Etsy, but this is on another level. The customization options let me create something that actually speaks to MY goals."
                </p>
              </div>
            </div>

            {/* Review 3 - 5 Stars */}
            <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in [animation-delay:200ms]">
              <div className="p-6">
                {/* Stars - 5/5 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">5/5</span>
                </div>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={reviewerMichael} 
                    alt="Michael R." 
                    className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Michael R.</p>
                    <p className="text-xs text-muted-foreground">Verified User</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">So Easy to Use</h3>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "I'm not tech-savvy at all, but this was incredibly simple. Within minutes I had a beautiful affirmation designed and downloaded. Already shared it on Instagram!"
                </p>
              </div>
            </div>
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
