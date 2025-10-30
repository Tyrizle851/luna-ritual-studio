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
import { Loader2, Sparkles, Heart, Edit2, Check, X, Download, Share2, Palette, History, ChevronDown } from "lucide-react";
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
      layoutStyle: "halo",
      keywords: "light, fresh, calm",
      previewImage: morningRitualImg
    },
    {
      name: "Power Hour",
      description: "Bold confidence",
      theme: "confidence",
      mood: "monochrome",
      layoutStyle: "grit",
      keywords: "strong, fearless",
      previewImage: powerHourImg
    },
    {
      name: "Gratitude Garden",
      description: "Warm botanicals",
      theme: "gratitude",
      mood: "bohemian",
      layoutStyle: "botanical",
      keywords: "flowers, warmth, joy",
      previewImage: gratitudeGardenImg
    },
    {
      name: "Focus Flow",
      description: "Clear sharp vision",
      theme: "focus",
      mood: "minimalist",
      layoutStyle: "grid",
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

  // Object keyword detection system
  const detectObjectKeywords = (keywords: string): { objects: string[]; category: string } => {
    const lower = keywords.toLowerCase();

    // Tier 1: Exact object matches (50 common items)
    const exactMatches: Record<string, { graphic: string; category: string }> = {
      "wine glass": { graphic: "elegant wine glass illustration", category: "beverages" },
      "coffee cup": { graphic: "coffee mug illustration", category: "beverages" },
      "tea cup": { graphic: "delicate tea cup", category: "beverages" },
      "champagne": { graphic: "champagne flute", category: "beverages" },
      "rose": { graphic: "rose flower illustration", category: "nature" },
      "flower": { graphic: "botanical flower", category: "nature" },
      "tree": { graphic: "tree silhouette", category: "nature" },
      "mountain": { graphic: "mountain peaks", category: "nature" },
      "ocean": { graphic: "wave patterns", category: "nature" },
      "leaf": { graphic: "botanical leaf", category: "nature" },
      "star": { graphic: "star constellation", category: "cosmic" },
      "moon": { graphic: "crescent moon", category: "cosmic" },
      "sun": { graphic: "sun rays", category: "cosmic" },
      "cloud": { graphic: "soft cloud shapes", category: "nature" },
      "feather": { graphic: "delicate feather", category: "nature" },
      "crystal": { graphic: "geometric crystal", category: "geometric" },
      "diamond": { graphic: "diamond gem", category: "geometric" },
      "heart": { graphic: "heart shape", category: "geometric" },
      "circle": { graphic: "zen circle", category: "geometric" },
      "triangle": { graphic: "triangle shape", category: "geometric" },
      "book": { graphic: "open book", category: "vintage" },
      "typewriter": { graphic: "vintage typewriter", category: "vintage" },
      "camera": { graphic: "vintage camera", category: "vintage" },
      "compass": { graphic: "navigation compass", category: "vintage" },
      "bicycle": { graphic: "vintage bicycle", category: "vintage" },
      "candle": { graphic: "candle flame", category: "cozy" },
      "incense": { graphic: "incense smoke", category: "cozy" },
      "lantern": { graphic: "hanging lantern", category: "cozy" },
      "teapot": { graphic: "ceramic teapot", category: "beverages" }
    };

    // Tier 2: Category keywords (15 broad categories)
    const categories: Record<string, string[]> = {
      beverages: ["wine", "glass", "cup", "coffee", "tea", "drink", "champagne", "cocktail"],
      nature: ["flower", "tree", "leaf", "plant", "ocean", "mountain", "forest", "garden", "bloom"],
      cosmic: ["star", "moon", "sun", "planet", "constellation", "galaxy", "celestial"],
      vintage: ["typewriter", "camera", "record", "bicycle", "compass", "antique"],
      geometric: ["circle", "triangle", "square", "line", "dot", "hexagon", "diamond"],
      cozy: ["candle", "incense", "lantern", "warm", "fireplace"],
      food: ["fruit", "bread", "sushi", "pizza", "apple", "orange"],
      animals: ["bird", "butterfly", "deer", "wolf", "owl", "cat"]
    };

    const detected: string[] = [];
    let mainCategory = "";

    // Check exact matches first
    for (const [key, value] of Object.entries(exactMatches)) {
      if (lower.includes(key)) {
        detected.push(value.graphic);
        if (!mainCategory) mainCategory = value.category;
      }
    }

    // If no exact matches, check categories
    if (detected.length === 0) {
      for (const [category, keywords] of Object.entries(categories)) {
        for (const keyword of keywords) {
          if (lower.includes(keyword)) {
            mainCategory = category;
            detected.push(`${category} elements`);
            break;
          }
        }
        if (detected.length > 0) break;
      }
    }

    // Limit to top 3 objects to avoid clutter
    return {
      objects: detected.slice(0, 3),
      category: mainCategory
    };
  };

  const generatePreviewData = (): GeneratedData => {
    // Expanded theme definitions (15 themes)
    const themeData: Record<string, {
      headline: string;
      phrases: string[];
      colors: string[];
    }> = {
      confidence: { 
        headline: "FEARLESS FORWARD", 
        phrases: ["I trust my decisions", "I claim my power", "I rise boldly", "My voice matters", "I lead with courage", "Doubt has no place here"],
        colors: ["#1a1a1a", "#d4af37", "#ffffff"]
      },
      peace: { 
        headline: "QUIET WITHIN", 
        phrases: ["I breathe deeply", "Calm fills my soul", "I release tension", "Peace is my nature", "Stillness guides me", "I am enough"],
        colors: ["#e8d5c4", "#9ab8b8", "#f5f5f5"]
      },
      focus: { 
        headline: "CLEAR PATH", 
        phrases: ["One step forward", "My mind is sharp", "I see clearly", "Purpose drives me", "Distractions fade", "I stay present"],
        colors: ["#2c3e50", "#3498db", "#ecf0f1"]
      },
      gratitude: { 
        headline: "THANKFUL HEART", 
        phrases: ["I honor this moment", "Joy surrounds me", "Blessings flow", "I appreciate fully", "Grace is mine", "Life is generous"],
        colors: ["#f4e4d7", "#d4a574", "#8b6f47"]
      },
      abundance: { 
        headline: "OVERFLOW MINDSET", 
        phrases: ["Wealth finds me", "I receive fully", "Prosperity flows", "I am worthy", "Plenty surrounds me", "Success is natural"],
        colors: ["#2d5016", "#ffd700", "#f8f4e6"]
      },
      healing: { 
        headline: "GENTLE GROWTH", 
        phrases: ["I am mending", "Softness heals me", "I forgive myself", "Rest restores me", "I release pain", "Wholeness returns"],
        colors: ["#faf3e0", "#b5d3d1", "#e8b4a0"]
      },
      strength: { 
        headline: "UNBREAKABLE CORE", 
        phrases: ["I endure anything", "My roots run deep", "I stand tall", "Resilience is mine", "I overcome all", "Power lives in me"],
        colors: ["#4a4a4a", "#c9a961", "#1c1c1c"]
      },
      joy: { 
        headline: "RADIANT LIGHT", 
        phrases: ["Laughter fills me", "I choose happiness", "Delight is mine", "My spirit soars", "I celebrate today", "Joy is my truth"],
        colors: ["#fff5e1", "#ffb347", "#ff6b9d"]
      },
      balance: { 
        headline: "CENTERED BEING", 
        phrases: ["Harmony guides me", "I find equilibrium", "All is aligned", "I flow with ease", "Balance is natural", "I am grounded"],
        colors: ["#d5c4a1", "#8fbc8f", "#f0ead6"]
      },
      courage: { 
        headline: "BRAVE SOUL", 
        phrases: ["Fear bows to me", "I leap anyway", "My heart is bold", "I face everything", "Bravery is mine", "I am unstoppable"],
        colors: ["#8b0000", "#ffa500", "#2f4f4f"]
      },
      clarity: { 
        headline: "CRYSTAL VISION", 
        phrases: ["Truth reveals itself", "I see clearly now", "Wisdom is mine", "Insight flows", "My path is lit", "Understanding deepens"],
        colors: ["#e0f7fa", "#00acc1", "#006064"]
      },
      renewal: { 
        headline: "FRESH START", 
        phrases: ["I begin again", "New life blooms", "Change embraces me", "I shed the old", "Rebirth is here", "I am reborn"],
        colors: ["#a8d5a3", "#77c593", "#4a7c59"]
      },
      freedom: { 
        headline: "UNCHAINED SPIRIT", 
        phrases: ["I release all limits", "Boundless I fly", "Liberty is mine", "I am untethered", "Wings unfold", "I choose my way"],
        colors: ["#87ceeb", "#ffffff", "#4682b4"]
      },
      passion: { 
        headline: "FIRE WITHIN", 
        phrases: ["I burn brightly", "Desire fuels me", "My heart blazes", "Intensity is mine", "I am alive", "Flames guide me"],
        colors: ["#ff4500", "#dc143c", "#8b0000"]
      },
      wisdom: { 
        headline: "ANCIENT KNOWING", 
        phrases: ["I trust my knowing", "Deep truth guides me", "Age enriches me", "I honor my journey", "Experience speaks", "I am wise"],
        colors: ["#8b7355", "#daa520", "#f5deb3"]
      }
    };

    // Expanded mood definitions (10 moods)
    const moodPalettes: Record<string, string[]> = {
      minimalist: ["#ffffff", "#1a1a1a", "#f5f5f5"],
      bohemian: ["#d4a574", "#8b6f47", "#f4e4d7"],
      "modern-serif": ["#2c3e50", "#ecf0f1", "#95a5a6"],
      coastal: ["#9ab8b8", "#e8d5c4", "#5a7d7c"],
      earthy: ["#8b7355", "#a89078", "#d4c5b0"],
      vibrant: ["#ff6b6b", "#4ecdc4", "#ffe66d"],
      pastel: ["#ffc8dd", "#bde0fe", "#a2d2ff"],
      monochrome: ["#000000", "#808080", "#ffffff"],
      sunset: ["#ff6f61", "#ffb347", "#ffd700"],
      forest: ["#2d5016", "#4a7c59", "#8fbc8f"]
    };

    // Expanded layout definitions (10 layouts)
    const layoutArchetypes: Record<string, {
      description: string;
      palette: string[];
      accents: string[];
    }> = {
      "clean-serif": {
        description: "Centered headline with elegant underline bar, alternating bold and italic supporting lines in a structured vertical flow.",
        palette: ["#1a1a1a", "#f5f5f5", "#d4af37"],
        accents: ["thin horizontal bars", "subtle drop shadows", "serif typography"]
      },
      botanical: {
        description: "Warm creamy background with gentle curved phrases, adorned with delicate leaf sprigs and botanical line drawings.",
        palette: ["#faf3e0", "#d4a574", "#8b6f47"],
        accents: ["eucalyptus leaves", "vine tendrils", "watercolor washes", "floral corners"]
      },
      grit: {
        description: "Central bold headline with angled text fragments radiating outward, featuring directional arrows and compass elements for a raw, adventurous feel.",
        palette: ["#2f4f4f", "#ffa500", "#1c1c1c"],
        accents: ["compass points", "diagonal arrows", "textured overlays", "geometric fragments"]
      },
      halo: {
        description: "Headline centered with supporting phrases orbiting in a soft circular arrangement, gentle pastel accents creating a peaceful halo effect.",
        palette: ["#e8d5c4", "#9ab8b8", "#f5f5f5"],
        accents: ["orbital rings", "scattered stars", "soft glows", "circular frames"]
      },
      grid: {
        description: "Structured grid layout with phrases in aligned boxes, clean lines and organized spacing for a modern architectural feel.",
        palette: ["#ecf0f1", "#2c3e50", "#95a5a6"],
        accents: ["rectangular borders", "grid lines", "minimal dividers"]
      },
      organic: {
        description: "Flowing, hand-drawn style with irregular placement, natural curves and asymmetric balance mimicking nature's patterns.",
        palette: ["#a8d5a3", "#77c593", "#4a7c59"],
        accents: ["wavy lines", "organic shapes", "hand-drawn elements", "irregular borders"]
      },
      celestial: {
        description: "Deep cosmic background with phrases floating like constellations, featuring stars, moons, and ethereal light.",
        palette: ["#191970", "#ffd700", "#e0e0e0"],
        accents: ["stars", "crescent moons", "cosmic dust", "light rays"]
      },
      geometric: {
        description: "Bold geometric shapes framing text, featuring triangles, hexagons, and angular patterns for a modern abstract look.",
        palette: ["#ff6b6b", "#4ecdc4", "#1a1a1a"],
        accents: ["triangles", "hexagons", "angular lines", "intersecting shapes"]
      },
      vintage: {
        description: "Aged aesthetic with ornate borders, classic typography, and decorative flourishes reminiscent of old posters.",
        palette: ["#8b7355", "#daa520", "#f5deb3"],
        accents: ["ornate corners", "filigree", "vintage frames", "distressed texture"]
      },
      "minimal-zen": {
        description: "Maximum whitespace with single focal point, inspired by Japanese minimalism with subtle stone or water motifs.",
        palette: ["#ffffff", "#d3d3d3", "#808080"],
        accents: ["zen circles", "single brushstrokes", "negative space", "pebble shapes"]
      }
    };

    // Incorporate user keywords into color and design
    const keywordInfluence = (keywords: string) => {
      const lower = keywords.toLowerCase();
      const influences: { colors?: string[]; accents?: string[] } = {};
      
      if (lower.includes("cold") || lower.includes("ice") || lower.includes("winter")) {
        influences.colors = ["#e0f7fa", "#b3e5fc", "#4fc3f7"];
        influences.accents = ["snowflakes", "ice crystals", "frost patterns"];
      }
      if (lower.includes("fire") || lower.includes("heat") || lower.includes("flame")) {
        influences.colors = ["#ff4500", "#ff6347", "#ffa500"];
        influences.accents = ["flame shapes", "heat waves", "ember glows"];
      }
      if (lower.includes("earth") || lower.includes("soil") || lower.includes("ground")) {
        influences.colors = ["#8b7355", "#a0522d", "#d2b48c"];
        influences.accents = ["soil textures", "rocks", "terrain lines"];
      }
      if (lower.includes("rain") || lower.includes("water") || lower.includes("ocean")) {
        influences.colors = ["#4682b4", "#5f9ea0", "#add8e6"];
        influences.accents = ["water droplets", "wave patterns", "ripples"];
      }
      if (lower.includes("sun") || lower.includes("light") || lower.includes("bright")) {
        influences.colors = ["#ffd700", "#ffeb3b", "#fff59d"];
        influences.accents = ["sun rays", "light bursts", "radiant lines"];
      }
      if (lower.includes("forest") || lower.includes("tree") || lower.includes("leaf")) {
        influences.colors = ["#2d5016", "#4a7c59", "#8fbc8f"];
        influences.accents = ["tree branches", "leaves", "pine needles"];
      }
      if (lower.includes("night") || lower.includes("dark") || lower.includes("moon")) {
        influences.colors = ["#191970", "#2f4f4f", "#1c1c1c"];
        influences.accents = ["stars", "moon phases", "night sky"];
      }
      if (lower.includes("spring") || lower.includes("bloom") || lower.includes("flower")) {
        influences.colors = ["#ffb6d9", "#ffd9e8", "#ffeaa7"];
        influences.accents = ["blossoms", "flower petals", "spring vines"];
      }
      
      return influences;
    };

    const selectedTheme = themeData[theme] || themeData.confidence;
    const selectedMoodPalette = moodPalettes[mood] || moodPalettes.minimalist;

    // Helper function for seeded randomization
    const seededRandom = (seedValue: number) => {
      const x = Math.sin(seedValue++) * 10000;
      return x - Math.floor(x);
    };

    // Use seed for randomization if provided
    const seedNum = seed ? parseInt(seed) : Date.now();

    // Auto-select layout if not chosen, with seed-based variation
    let finalLayout = layoutStyle;
    if (!finalLayout) {
      const layoutOptions: Record<string, string[]> = {
        minimalist: ["clean-serif", "grid", "minimal-zen"],
        bohemian: ["botanical", "organic"],
        "modern-serif": ["grid", "clean-serif"],
        coastal: ["halo", "organic"],
        earthy: ["organic", "botanical"],
        vibrant: ["geometric", "grit"],
        pastel: ["celestial", "halo"],
        monochrome: ["minimal-zen", "clean-serif"],
        sunset: ["grit", "geometric"],
        forest: ["vintage", "organic"]
      };
      const options = layoutOptions[mood] || ["clean-serif"];
      const randomIndex = Math.floor(seededRandom(seedNum) * options.length);
      finalLayout = options[randomIndex];
    }

    const selectedLayout = layoutArchetypes[finalLayout] || layoutArchetypes["clean-serif"];

    // Get keyword influences (both color and object detection)
    const keywordEffects = keywordInfluence(userKeywords);
    const detectedObjects = detectObjectKeywords(userKeywords);

    // COLOR BLENDING SYSTEM: Blend all inputs instead of replacement
    // 40% theme + 30% mood + 20% layout + 10% keywords
    const blendColors = (
      themeColors: string[],
      moodColors: string[],
      layoutColors: string[],
      keywordColors?: string[]
    ): string[] => {
      const result: string[] = [];

      // Start with theme colors (40% weight - most important)
      result.push(themeColors[0] || "#1a1a1a");

      // Add mood color (30% weight)
      result.push(moodColors[0] || "#f5f5f5");

      // Add layout color (20% weight)
      if (layoutColors.length > 0) {
        result.push(layoutColors[layoutColors.length - 1] || "#d4af37");
      }

      // If keywords provide colors, blend them in (10% weight)
      if (keywordColors && keywordColors.length > 0) {
        // Replace or add keyword color influence
        result[2] = keywordColors[0];
      }

      return result.slice(0, 3); // Keep 3 colors max
    };

    const finalPalette = blendColors(
      selectedTheme.colors,
      selectedMoodPalette,
      selectedLayout.palette,
      keywordEffects.colors
    );

    // ACCENT ELEMENTS: Build with weighted priorities
    // 50% detected objects, 30% layout accents, 20% keyword accents
    let finalAccents: string[] = [];

    // Add detected objects first (highest priority - 50%)
    if (detectedObjects.objects.length > 0) {
      finalAccents.push(...detectedObjects.objects);
    }

    // Add layout accents (30%)
    const layoutAccentCount = Math.ceil(selectedLayout.accents.length * 0.3);
    finalAccents.push(...selectedLayout.accents.slice(0, layoutAccentCount));

    // Add keyword accents if any (20%)
    if (keywordEffects.accents) {
      finalAccents.push(...keywordEffects.accents.slice(0, 2));
    }

    // PHRASE RANDOMIZATION: Use seed to shuffle and select phrases
    let finalPhrases = [...selectedTheme.phrases];

    // Shuffle phrases based on seed
    if (seed) {
      const shuffled = [...finalPhrases];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seedNum + i) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      finalPhrases = shuffled;
    }

    return {
      headline: selectedTheme.headline,
      supportingLines: finalPhrases.slice(0, 10),
      palette: finalPalette,
      paletteNames: finalPalette.map(c => c),
      layoutStyle: selectedLayout.description,
      accentElements: finalAccents.join(", ")
    };
  };

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedImageB64(null);
    
    const preview = generatePreviewData();
    // Apply custom palette if set
    if (customPalette.length > 0) {
      preview.palette = customPalette;
      preview.paletteNames = customPalette;
    }
    setGeneratedData(preview);
    setLoading(false);
  };

  const handleGenerateUnique = async () => {
    setLoading(true);
    setGeneratedImageB64(null);
    try {
      // Ensure we have current preview data
      if (!generatedData) {
        await handleGenerate();
      }

      // Map layout style to archetype
      const layoutMap: Record<string, LayoutArchetype> = {
        "vintage": "clean-serif",
        "clean-serif": "clean-serif",
        "botanical": "botanical",
        "grid": "clean-serif",
        "halo": "halo-orbital",
        "organic": "botanical",
        "geometric": "grit-directional",
        "celestial": "halo-orbital",
        "minimal-zen": "clean-serif",
        "grit": "grit-directional"
      };

      const layoutArchetype = layoutMap[layoutStyle?.toLowerCase()] || "clean-serif";

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

      const { data, error } = await supabase.functions.invoke('generate-affirmation-image', {
        body: {
          designSpec
        }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        
        // Check for specific error types
        const errorMessage = error.message || JSON.stringify(error);
        if (errorMessage.includes('402') || errorMessage.includes('credits depleted') || errorMessage.includes('payment')) {
          toast.error('AI credits depleted. Please add credits to your Lovable workspace to continue.');
        } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
          toast.error('Rate limit exceeded. Please wait a moment and try again.');
        } else {
          toast.error('Failed to generate image. Please try again.');
        }
        return;
      }
      
      if (data?.error) {
        // Handle error returned in data object
        console.error('API error:', data.error);
        if (data.error.includes('credits depleted') || data.error.includes('payment')) {
          toast.error('AI credits depleted. Please add credits to your Lovable workspace to continue.');
        } else if (data.error.includes('rate limit')) {
          toast.error('Rate limit exceeded. Please wait a moment and try again.');
        } else {
          toast.error(data.error);
        }
        return;
      }
      
      if (data?.imageB64) {
        const imageData = `data:image/png;base64,${data.imageB64}`;
        setGeneratedImageB64(imageData);
        
        // Save to history
        const newHistoryItem: HistoryItem = {
          id: `history-${Date.now()}`,
          imageB64: imageData,
          generatedData,
          timestamp: Date.now()
        };
        const updatedHistory = [newHistoryItem, ...history].slice(0, 20); // Keep last 20
        setHistory(updatedHistory);
        localStorage.setItem('affirmation-history', JSON.stringify(updatedHistory));
        
        toast.success('Unique image generated successfully!');
      } else {
        console.error('No image data in response:', data);
        toast.error('No image was returned. Please try again.');
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
    const layouts = ["clean-serif", "botanical", "grit", "halo", "grid", "organic", "celestial", "geometric", "vintage", "minimal-zen"];
    
    setTheme(themes[Math.floor(Math.random() * themes.length)]);
    setMood(moods[Math.floor(Math.random() * moods.length)]);
    setLayoutStyle(layouts[Math.floor(Math.random() * layouts.length)]);
    setSeed(Math.floor(Math.random() * 10000).toString());
    toast.success('Randomized! Click Preview to see it.');
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

  const downloadImage = (format: string) => {
    if (!generatedImageB64) return;

    const link = document.createElement('a');
    link.href = generatedImageB64;
    
    const sizeMap: Record<string, string> = {
      'original': 'original',
      'instagram-square': '1080x1080',
      'instagram-story': '1080x1920',
      'print-8x10': '8x10',
      'print-11x14': '11x14'
    };

    link.download = `affirmation-${sizeMap[format]}-${Date.now()}.png`;
    link.click();
    toast.success(`Downloaded ${sizeMap[format]} format!`);
  };

  const applyPreset = (preset: StaffPreset) => {
    setTheme(preset.theme);
    setMood(preset.mood);
    setLayoutStyle(preset.layoutStyle);
    setUserKeywords(preset.keywords);
    toast.success(`Applied "${preset.name}" preset!`);
    // Auto-generate when preset is selected
    const preview = generatePreviewData();
    if (customPalette.length > 0) {
      preview.palette = customPalette;
      preview.paletteNames = customPalette;
    }
    setGeneratedData(preview);
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
        <title>Affirmation Builder | Minimaluxe</title>
        <meta name="description" content="Create custom affirmation posters. Describe your energy and we'll build the perfect print for your space." />
      </Helmet>

      <div className="min-h-screen bg-background py-8 md:py-16">
        <div className="container-custom max-w-screen-xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex justify-center items-center gap-4 mb-4">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-clay">Affirmation Builder</h1>
              <Dialog open={showGallery} onOpenChange={setShowGallery}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <History className="h-4 w-4" />
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
            <p className="text-lg md:text-xl text-text-secondary mb-2">Describe your energy. We'll build the print.</p>
            <p className="text-xs md:text-sm text-text-secondary italic px-4">
              This creates a high-resolution printable affirmation layout you can download later.
            </p>
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
                  <CardDescription>Curated preset combinations</CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {staffPresets.map((preset) => (
                      <div
                        key={preset.name}
                        className="flex flex-col border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary transition-all"
                        onClick={() => {
                          applyPreset(preset);
                          setActiveTab("preview");
                        }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img 
                            src={preset.previewImage} 
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
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
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="clean-serif">Clean Serif</SelectItem>
                          <SelectItem value="botanical">Botanical</SelectItem>
                          <SelectItem value="grit">Grit</SelectItem>
                          <SelectItem value="halo">Halo</SelectItem>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="organic">Organic</SelectItem>
                          <SelectItem value="celestial">Celestial</SelectItem>
                          <SelectItem value="geometric">Geometric</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="minimal-zen">Minimal Zen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* User Keywords */}
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Textarea
                        id="keywords"
                        placeholder="e.g., cold, fire, earth, rain..."
                        value={userKeywords}
                        onChange={(e) => setUserKeywords(e.target.value)}
                        rows={2}
                      />
                    </div>

                    {/* Style Seed */}
                    <div className="space-y-2">
                      <Label htmlFor="seed">Style Seed</Label>
                      <Input
                        id="seed"
                        placeholder="1234"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
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
                  <Button 
                    onClick={() => {
                      handleGenerate();
                      setActiveTab("preview");
                    }}
                    variant="outline"
                    className="w-full h-11"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Preview
                  </Button>
                  
                  <Button 
                    onClick={handleRandomize}
                    variant="secondary"
                    className="w-full h-11"
                    disabled={loading}
                  >
                    Randomize
                  </Button>
                
                  <Button 
                    onClick={handleGenerateUnique}
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Unique Image
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Image
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem onClick={() => downloadImage('original')}>
                          Original Size
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('instagram-square')}>
                          Instagram Square (1080x1080)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('instagram-story')}>
                          Instagram Story (1080x1920)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('print-8x10')}>
                          Print 8x10
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('print-11x14')}>
                          Print 11x14
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="clean-serif">Clean Serif</SelectItem>
                          <SelectItem value="botanical">Botanical</SelectItem>
                          <SelectItem value="grit">Grit</SelectItem>
                          <SelectItem value="halo">Halo</SelectItem>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="organic">Organic</SelectItem>
                          <SelectItem value="celestial">Celestial</SelectItem>
                          <SelectItem value="geometric">Geometric</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="minimal-zen">Minimal Zen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* User Keywords */}
                    <div className="space-y-2">
                      <Label htmlFor="keywords-desktop">Keywords</Label>
                      <Textarea
                        id="keywords-desktop"
                        placeholder="e.g., cold, fire, earth, rain..."
                        value={userKeywords}
                        onChange={(e) => setUserKeywords(e.target.value)}
                        rows={2}
                      />
                    </div>

                    {/* Style Seed */}
                    <div className="space-y-2">
                      <Label htmlFor="seed-desktop">Style Seed</Label>
                      <Input
                        id="seed-desktop"
                        placeholder="1234"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
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
                  <Button 
                    onClick={handleGenerate}
                    variant="outline"
                    className="w-full h-11"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Preview
                  </Button>
                  
                  <Button 
                    onClick={handleRandomize}
                    variant="secondary"
                    className="w-full h-11"
                    disabled={loading}
                  >
                    Randomize
                  </Button>
                
                  <Button 
                    onClick={handleGenerateUnique}
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Unique Image
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
                {generatedImageB64 ? (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border">
                      <img 
                        src={generatedImageB64} 
                        alt="Generated Affirmation" 
                        className="w-full h-auto"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Image
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem onClick={() => downloadImage('original')}>
                          Original Size
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('instagram-square')}>
                          Instagram Square (1080x1080)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('instagram-story')}>
                          Instagram Story (1080x1920)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('print-8x10')}>
                          Print 8x10
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadImage('print-11x14')}>
                          Print 11x14
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
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
      </div>
    </>
  );
};

export default AffirmationBuilder;
