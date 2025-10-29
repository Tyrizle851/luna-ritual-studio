import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
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
    
    // Auto-select layout if not chosen
    let finalLayout = layoutStyle;
    if (!finalLayout) {
      const layoutMap: Record<string, string> = {
        minimalist: "clean-serif",
        bohemian: "botanical",
        "modern-serif": "grid",
        coastal: "halo",
        earthy: "organic",
        vibrant: "geometric",
        pastel: "celestial",
        monochrome: "minimal-zen",
        sunset: "grit",
        forest: "vintage"
      };
      finalLayout = layoutMap[mood] || "clean-serif";
    }
    
    const selectedLayout = layoutArchetypes[finalLayout] || layoutArchetypes["clean-serif"];
    
    // Blend user keyword influences
    const keywordEffects = keywordInfluence(userKeywords);
    const finalPalette = keywordEffects.colors || selectedLayout.palette || selectedMoodPalette;
    const finalAccents = keywordEffects.accents 
      ? [...selectedLayout.accents, ...keywordEffects.accents]
      : selectedLayout.accents;
    
    // Incorporate keywords into phrases if provided
    let finalPhrases = [...selectedTheme.phrases];
    if (userKeywords.trim()) {
      const keywordList = userKeywords.split(/[,\s]+/).filter(k => k.length > 2);
      finalPhrases = finalPhrases.map((phrase, i) => {
        if (keywordList[i]) {
          return `${phrase.replace(/\.$/, "")} ${keywordList[i]}`;
        }
        return phrase;
      });
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
    
    setGeneratedData(generatePreviewData());
    setLoading(false);
  };

  const handleGenerateUnique = async () => {
    setLoading(true);
    setGeneratedImageB64(null);
    try {
      const previewForAPI = generatePreviewData();
      
      const { data, error } = await supabase.functions.invoke('generate-affirmation-image', {
        body: {
          theme,
          mood,
          text: userKeywords,
          styleSeed: seed || Math.floor(Math.random() * 10000).toString(),
          preview: previewForAPI
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
        setGeneratedImageB64(`data:image/png;base64,${data.imageB64}`);
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
    handleGenerate();
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
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 text-clay">Affirmation Builder</h1>
            <p className="text-lg md:text-xl text-text-secondary mb-2">Describe your energy. We'll build the print.</p>
            <p className="text-xs md:text-sm text-text-secondary italic px-4">
              This creates a high-resolution printable affirmation layout you can download later.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Input Form */}
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
                  <Label htmlFor="keywords">Keywords (Optional)</Label>
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
                  <Label htmlFor="seed">Style Seed (Optional)</Label>
                  <Input
                    id="seed"
                    placeholder="1234"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button 
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Preview
                  </Button>
                  
                  <Button 
                    onClick={handleRandomize}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    Randomize
                  </Button>
                </div>
                
                <Button 
                  onClick={handleGenerateUnique}
                  variant="default"
                  className="w-full mt-2"
                  disabled={loading}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Unique Image
                </Button>
              </CardContent>
            </Card>

            {/* Right Column: Preview */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Generated affirmation design</CardDescription>
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
                    <Button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = generatedImageB64;
                        link.download = `affirmation-${Date.now()}.png`;
                        link.click();
                        toast.success('Image downloaded!');
                      }}
                      className="w-full"
                    >
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-background to-muted/20 p-10 rounded-lg border-2 border-muted min-h-[500px] flex flex-col justify-center relative overflow-hidden">
                      {/* Decorative corner elements */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-muted-foreground/20"></div>
                      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-muted-foreground/20"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-muted-foreground/20"></div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-muted-foreground/20"></div>
                      
                      {/* Decorative center line */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"></div>
                      
                      <div className="relative z-10">
                        <h3 className="font-display text-3xl md:text-4xl text-center mb-8 tracking-wide" style={{ color: '#c9a961' }}>
                          {generatedData.headline}
                        </h3>
                        
                        <div className="space-y-4 mb-8">
                          {generatedData.supportingLines.map((line, i) => (
                            <p 
                              key={i} 
                              className="text-center leading-relaxed text-base"
                              style={{ 
                                color: i % 3 === 0 ? '#2c2c2c' : i % 3 === 1 ? '#8b8b8b' : '#a89078',
                                fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                                fontWeight: i % 2 === 0 ? '600' : '400'
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                      <div>
                        <p className="font-semibold mb-2 text-sm" style={{ color: '#c9a961' }}>Palette:</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">{generatedData.paletteNames.join(' / ')}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2 text-sm" style={{ color: '#c9a961' }}>Layout Style:</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">{generatedData.layoutStyle}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2 text-sm" style={{ color: '#c9a961' }}>Accent Elements:</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">{generatedData.accentElements}</p>
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
