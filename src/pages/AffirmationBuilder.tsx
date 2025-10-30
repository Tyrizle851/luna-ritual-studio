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

    // Layout only influences structure/placement now - 17 unique layouts
    const layoutDescriptions: Record<string, string> = {
      "scattered-organic": "Organic scattered text placement like natural elements",
      "flowing-curves": "Curved text paths following natural flow",
      "angular-grid": "Clean structured grid with alignment",
      "circular-orbit": "Circular orbital arrangement",
      "diagonal-dynamic": "Dynamic angled composition with energy",
      "asymmetric-balance": "Off-center asymmetric visual balance",
      "layered-depth": "Overlapping text layers with depth",
      "vertical-cascade": "Cascading vertical text flow",
      "horizontal-sweep": "Horizontal sweeping movement",
      "corner-radial": "Radiating outward from corner",
      "spiral-flow": "Spiral arrangement from center point",
      "stepped-rhythm": "Stepped staggered text placement",
      "arch-composition": "Arched text forming curves",
      "split-panel": "Divided composition with distinct sections",
      "floating-cluster": "Clustered text with breathing space",
      "wave-pattern": "Undulating wave-like text arrangement",
      "botanical-branch": "Branching structure mimicking plant growth"
    };

    const selectedTheme = themeData[theme] || themeData.confidence;
    const selectedMoodAccents = moodAccents[mood] || moodAccents.minimalist;
    
    // Auto-select layout if not chosen - favor organic and dynamic layouts
    let finalLayout = layoutStyle;
    if (!finalLayout) {
      const layoutMap: Record<string, string> = {
        minimalist: "floating-cluster",
        bohemian: "flowing-curves",
        "modern-serif": "angular-grid",
        coastal: "wave-pattern",
        earthy: "botanical-branch",
        vibrant: "diagonal-dynamic",
        pastel: "scattered-organic",
        monochrome: "layered-depth",
        sunset: "arch-composition",
        forest: "botanical-branch"
      };
      finalLayout = layoutMap[mood] || "asymmetric-balance";
    }
    
    const layoutDescription = layoutDescriptions[finalLayout] || layoutDescriptions["centered-stack"];
    
    // Theme controls colors - use theme colors with slightly transparent backgrounds
    const themeColors = selectedTheme.colors;
    const finalPalette = themeColors;
    
    // Mood controls accents only
    const finalAccents = selectedMoodAccents;

    return {
      headline: selectedTheme.headline,
      supportingLines: selectedTheme.phrases.slice(0, 6),
      palette: finalPalette,
      paletteNames: finalPalette.map(c => c),
      layoutStyle: layoutDescription,
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
      
      // Map layout style to archetype (supports both old and new names)
      const layoutMap: Record<string, LayoutArchetype> = {
        // Old names for backward compatibility
        "vintage": "arch-composition",
        "clean-serif": "floating-cluster",
        "botanical": "flowing-curves",
        "grid": "angular-grid",
        "halo": "circular-orbit",
        "organic": "flowing-curves",
        "geometric": "angular-grid",
        "celestial": "circular-orbit",
        "minimal-zen": "floating-cluster",
        "grit": "diagonal-dynamic",
        // New archetype names (passthrough)
        "scattered-organic": "scattered-organic",
        "flowing-curves": "flowing-curves",
        "angular-grid": "angular-grid",
        "circular-orbit": "circular-orbit",
        "diagonal-dynamic": "diagonal-dynamic",
        "asymmetric-balance": "asymmetric-balance",
        "layered-depth": "layered-depth",
        "vertical-cascade": "vertical-cascade",
        "horizontal-sweep": "horizontal-sweep",
        "corner-radial": "corner-radial",
        "spiral-flow": "spiral-flow",
        "stepped-rhythm": "stepped-rhythm",
        "arch-composition": "arch-composition",
        "split-panel": "split-panel",
        "floating-cluster": "floating-cluster",
        "wave-pattern": "wave-pattern",
        "botanical-branch": "botanical-branch"
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
    // Favor dynamic layouts - exclude boring centered ones
    const dynamicLayouts = ["flowing-curves", "angular-grid", "circular-orbit", "diagonal-dynamic", "asymmetric-balance", "layered-depth"];
    
    setTheme(themes[Math.floor(Math.random() * themes.length)]);
    setMood(moods[Math.floor(Math.random() * moods.length)]);
    setLayoutStyle(dynamicLayouts[Math.floor(Math.random() * dynamicLayouts.length)]);
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
                          <SelectItem value="flowing-curves">Flowing Curves</SelectItem>
                          <SelectItem value="angular-grid">Angular Grid</SelectItem>
                          <SelectItem value="circular-orbit">Circular Orbit</SelectItem>
                          <SelectItem value="diagonal-dynamic">Diagonal Dynamic</SelectItem>
                          <SelectItem value="asymmetric-balance">Asymmetric Balance</SelectItem>
                          <SelectItem value="layered-depth">Layered Depth</SelectItem>
                          <SelectItem value="minimal-focus">Minimal Focus</SelectItem>
                          <SelectItem value="centered-stack">Centered Stack</SelectItem>
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
                          <SelectItem value="flowing-curves">Flowing Curves</SelectItem>
                          <SelectItem value="angular-grid">Angular Grid</SelectItem>
                          <SelectItem value="circular-orbit">Circular Orbit</SelectItem>
                          <SelectItem value="diagonal-dynamic">Diagonal Dynamic</SelectItem>
                          <SelectItem value="asymmetric-balance">Asymmetric Balance</SelectItem>
                          <SelectItem value="layered-depth">Layered Depth</SelectItem>
                          <SelectItem value="minimal-focus">Minimal Focus</SelectItem>
                          <SelectItem value="centered-stack">Centered Stack</SelectItem>
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
