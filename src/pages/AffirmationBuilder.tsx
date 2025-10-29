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
  mainAffirmation: string;
  supportingPhrases: string[];
  palette: string;
  layoutStyle: string;
  accentStyle: string;
}

const AffirmationBuilder = () => {
  const [theme, setTheme] = useState("calm-morning");
  const [mood, setMood] = useState("minimalist");
  const [energyLevel, setEnergyLevel] = useState("supportive");
  const [layoutStyle, setLayoutStyle] = useState("");
  const [userKeywords, setUserKeywords] = useState("");
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedData>({
    mainAffirmation: "PEACE WITHIN",
    supportingPhrases: [
      "I honor my journey",
      "Breathe before you begin",
      "Quiet creates clarity",
      "Stillness is strength",
      "I am grounded in this moment",
      "My calm is my power",
      "I trust the process",
      "Gentle progress, lasting change"
    ],
    palette: "Warm Cream / Sage / Terracotta",
    layoutStyle: "Organic flowing arrangement with curved phrases",
    accentStyle: "Botanical line art with soft circular accents"
  });
  const [generatedImageB64, setGeneratedImageB64] = useState<string | null>(null);

  // TODO: This will be replaced with actual AI call to backend
  const buildPrompt = (theme: string, mood: string, keywords: string, seed: string) => {
    /*
    PROMPT STRUCTURE FOR AI:
    
    Generate a printable affirmation poster with the following specifications:
    
    Theme: ${theme}
    Mood/Style: ${mood}
    Keywords: ${keywords}
    Style Seed: ${seed || 'random'}
    
    Color Palette Direction: 
    - If earthy: terracotta, sage, warm cream, clay
    - If floral: blush pink, lavender, soft peach
    - If coastal: soft blues, sandy beige, sea foam
    - If minimalist: black, white, gray, one accent
    - If botanical: deep green, cream, gold accents
    
    Layout Style Options:
    - Organic flow with scattered placement
    - Cascading diagonal arrangement
    - Circular focal point with radiating text
    - Constellation pattern with mixed sizes
    
    Accent Style:
    - Botanical line art (leaves, stems)
    - Geometric dots and lines
    - Watercolor texture blobs
    - Hand-drawn arrows and underlines
    
    Generate:
    1. One main affirmation (2-4 words, powerful, uppercase)
    2. 8-12 supporting short affirmations mixing:
       - Self-belief statements
       - Grounding reminders
       - Calm assertions
       - Forward motion phrases
    
    Style Requirements:
    - 300 DPI print-ready
    - Portrait orientation (4:5 ratio)
    - Handcrafted modern aesthetic
    - Minimalist + modern farmhouse blend
    - No neon colors
    - Professional typography hierarchy
    */
    return `Theme: ${theme}, Mood: ${mood}, Keywords: ${keywords}`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedImageB64(null);
    
    // Generate preview based on user inputs
    const generatePreviewData = (): GeneratedData => {
      const keywords = userKeywords.toLowerCase();
      
      // STRICT THEME-BASED CONTENT - Never mix vibes
      const themeData: Record<string, { main: string, soft: string[], supportive: string[], direct: string[], intense: string[] }> = {
        "calm-morning": {
          main: "SOFT MORNING",
          soft: ["Gentle light awakens me", "I rise without rushing", "Morning stillness is sacred", "Today begins with ease", "Quiet hours hold power", "I welcome this fresh day"],
          supportive: ["I greet this day ready", "Morning light guides my path", "Each sunrise brings renewal", "I start with clarity", "Today I choose presence", "This morning is mine"],
          direct: ["I own my morning", "First light, first wins", "Morning momentum starts now", "I rise with purpose", "Today I take the lead", "Morning energy fuels me"],
          intense: ["Morning warrior rises", "Dawn breaks, I conquer", "First light, full force", "I dominate this day", "Morning power unleashed", "Sunrise ignites my fire"]
        },
        "focus": {
          main: "CLEAR MIND",
          soft: ["Gentle attention flows", "I ease into clarity", "Focus comes naturally", "Calm concentration guides me", "I softly center myself", "My mind finds quiet"],
          supportive: ["I choose focus now", "Clarity is my strength", "One task at a time", "My attention is valuable", "I direct my energy well", "Focus creates results"],
          direct: ["I command my focus", "Distraction ends here", "My mind is sharp", "I execute with precision", "Focus is my weapon", "I lock in completely"],
          intense: ["Laser focus activated", "Zero distraction tolerated", "My concentration is unbreakable", "I dominate every task", "Focus mode: warrior", "Nothing breaks my attention"]
        },
        "gratitude": {
          main: "I AM GRATEFUL",
          soft: ["Thankful for small moments", "Appreciation lives in me", "I notice beauty gently", "Grateful for this breath", "Joy whispers around me", "I hold thanks softly"],
          supportive: ["I choose gratitude daily", "Abundance surrounds me", "Thank you for this gift", "I celebrate what I have", "Appreciation flows freely", "I see the good clearly"],
          direct: ["Gratitude drives my success", "I claim my blessings", "Thankful and taking action", "I own my abundance", "Gratitude fuels momentum", "I appreciate and advance"],
          intense: ["Grateful warrior mindset", "I seize every blessing", "Thankful and unstoppable", "Gratitude is my power", "I dominate with thanks", "Blessed and relentless"]
        },
        "confidence": {
          main: "I AM CAPABLE",
          soft: ["I trust myself gently", "My worth is inherent", "I believe in my path", "Confidence grows in me", "I am enough today", "Self-trust comes easy"],
          supportive: ["I trust my abilities", "My voice deserves space", "I stand in my power", "Confidence is my right", "I believe in myself", "I am worthy always"],
          direct: ["I own my capability", "Doubt has no place here", "I execute with confidence", "My power is undeniable", "I command respect", "I trust my strength fully"],
          intense: ["Unshakeable confidence", "I am a force of nature", "Doubt dies in my presence", "I dominate with certainty", "My power is absolute", "I am unstoppable"]
        },
        "peace": {
          main: "INNER CALM",
          soft: ["Peace flows through me", "I breathe in stillness", "Gentle quiet heals me", "Serenity is my home", "I rest in tranquility", "Soft peace surrounds me"],
          supportive: ["I choose peace today", "Calm is my foundation", "I release what I can't control", "Peace guides my choices", "Stillness strengthens me", "I anchor in serenity"],
          direct: ["I create my peace", "Calm is my power move", "I control my inner state", "Peace is my strategy", "I execute from stillness", "Serenity drives results"],
          intense: ["Peace warrior stands strong", "Unshakeable inner fortress", "Calm through any storm", "I dominate through peace", "Stillness is my weapon", "Tranquil and unstoppable"]
        },
        "custom": {
          main: userKeywords.split(/\s+/).slice(0, 3).join(" ").toUpperCase() || "MY INTENTION",
          soft: ["I honor my unique path", "My vision unfolds gently", "I trust my direction", "This journey is mine", "I create with ease", "My way feels right"],
          supportive: ["I design my life", "My vision matters", "I trust my choices", "This path is valid", "I create what I need", "My direction is clear"],
          direct: ["I own my vision", "My path, my rules", "I execute my plan", "This is my design", "I build my reality", "My vision drives action"],
          intense: ["My vision, my conquest", "I dominate my path", "Unstoppable in my direction", "My way or nothing", "I forge my destiny", "Vision becomes victory"]
        }
      };

      const baseData = themeData[theme] || themeData["peace"];
      
      // Select phrases based on energy level
      const energyPhrases: Record<string, string[]> = {
        "soft": baseData.soft,
        "supportive": baseData.supportive,
        "direct": baseData.direct,
        "intense": baseData.intense
      };
      
      let supportingPhrases = [...(energyPhrases[energyLevel] || baseData.supportive)];
      
      // Blend keywords intelligently without compromising quality
      if (userKeywords.trim()) {
        const words = userKeywords.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2);
        const extraPhrases: string[] = [];
        
        words.forEach(word => {
          if (energyLevel === "soft" || energyLevel === "supportive") {
            if (word.includes("heal")) extraPhrases.push("Healing flows through me");
            if (word.includes("trust")) extraPhrases.push("I trust the journey");
            if (word.includes("soft") || word.includes("gentle")) extraPhrases.push("Gentle strength guides me");
            if (word.includes("peace") || word.includes("calm")) extraPhrases.push("Peace anchors my day");
          } else if (energyLevel === "direct" || energyLevel === "intense") {
            if (word.includes("power")) extraPhrases.push("I own my power");
            if (word.includes("strong")) extraPhrases.push("Strength defines me");
            if (word.includes("bold")) extraPhrases.push("Boldness is my path");
            if (word.includes("win")) extraPhrases.push("I create wins daily");
          }
        });
        
        // Add up to 2 keyword phrases without duplicating existing ones
        extraPhrases.forEach(phrase => {
          if (supportingPhrases.length < 10 && !supportingPhrases.includes(phrase)) {
            supportingPhrases.push(phrase);
          }
        });
      }
      
      // Limit to 6-10 phrases
      supportingPhrases = supportingPhrases.slice(0, 10);
      
      // LAYOUT STYLE ARCHETYPES
      const layoutArchetypes: Record<string, { description: string, palette: string, accents: string }> = {
        "clean-serif": {
          description: "Centered headline with elegant underline bar, alternating bold and italic lines in structured vertical stack",
          palette: "Charcoal, Ivory, Soft Gold accents",
          accents: "Minimal serif underlines and refined geometric borders"
        },
        "botanical": {
          description: "Warm organic flow with gentle curved text placement, soft feminine energy throughout",
          palette: "Warm Cream, Terracotta, Sage Green, Blush Pink",
          accents: "Delicate leaf sprigs, botanical line drawings, soft circular flourishes"
        },
        "grit": {
          description: "Bold central headline with angled text fragments radiating outward, high contrast directional layout",
          palette: "Deep Charcoal, Rust, Cream, High Contrast Black",
          accents: "Arrows, compass points, angular lines, directional markers"
        },
        "halo": {
          description: "Central focal headline with supporting affirmations orbiting in a gentle ring pattern",
          palette: "Soft Pastels - Lavender, Peach, Mint, Cloud White",
          accents: "Circular guides, orbital dots, celestial soft lines"
        }
      };
      
      // Auto-select layout if not specified
      let selectedLayout = layoutStyle;
      if (!selectedLayout) {
        if (mood === "minimalist" || mood === "modern-serif") selectedLayout = "clean-serif";
        else if (mood === "bohemian" || mood === "earthy") selectedLayout = "botanical";
        else if (mood === "coastal") selectedLayout = "halo";
        else selectedLayout = "clean-serif";
      }
      
      const archetype = layoutArchetypes[selectedLayout] || layoutArchetypes["clean-serif"];
      
      return {
        mainAffirmation: baseData.main,
        supportingPhrases,
        palette: archetype.palette,
        layoutStyle: archetype.description,
        accentStyle: archetype.accents
      };
    };
    
    setGeneratedData(generatePreviewData());
    buildPrompt(theme, mood, userKeywords, seed);
    setLoading(false);
  };

  const handleGenerateUnique = async () => {
    setLoading(true);
    setGeneratedImageB64(null);
    try {
      const { data, error } = await supabase.functions.invoke('generate-affirmation-image', {
        body: { 
          theme, 
          mood, 
          text: userKeywords, 
          styleSeed: seed || undefined 
        },
      });
      
      if (error) {
        console.error('Edge function error:', error);
        toast.error('Failed to generate image. Please try again.');
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
    const themes = ["calm-morning", "focus", "gratitude", "confidence", "peace"];
    const moods = ["minimalist", "bohemian", "modern-serif", "coastal", "earthy"];
    const energies = ["soft", "supportive", "direct", "intense"];
    const layouts = ["clean-serif", "botanical", "grit", "halo"];
    
    setTheme(themes[Math.floor(Math.random() * themes.length)]);
    setMood(moods[Math.floor(Math.random() * moods.length)]);
    setEnergyLevel(energies[Math.floor(Math.random() * energies.length)]);
    setLayoutStyle(layouts[Math.floor(Math.random() * layouts.length)]);
    setSeed(Math.floor(Math.random() * 10000).toString());
  };

  return (
    <>
      <Helmet>
        <title>Affirmation Builder | Minimaluxe</title>
        <meta name="description" content="Create custom affirmation posters. Describe your energy and we'll build the perfect print for your space." />
      </Helmet>

      <div className="min-h-screen bg-neutral-100 py-8 md:py-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column: Input Form */}
            <Card className="bg-white shadow-sm border border-neutral-200 rounded-xl">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Your Inputs</CardTitle>
                <CardDescription>Define your affirmation poster style</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme / Intention</Label>
                  <p className="text-xs text-text-secondary mb-2">What are you centering on?</p>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calm-morning">Calm Morning</SelectItem>
                      <SelectItem value="focus">Focus</SelectItem>
                      <SelectItem value="gratitude">Gratitude</SelectItem>
                      <SelectItem value="confidence">Confidence</SelectItem>
                      <SelectItem value="peace">Peace</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mood Selection */}
                <div className="space-y-2">
                  <Label htmlFor="mood">Design Mood</Label>
                  <p className="text-xs text-text-secondary mb-2">Visual styling direction</p>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger id="mood">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="bohemian">Bohemian Organic</SelectItem>
                      <SelectItem value="modern-serif">Modern Serif</SelectItem>
                      <SelectItem value="coastal">Coastal / Soft Blues</SelectItem>
                      <SelectItem value="earthy">Earthy / Botanical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Energy Level Selection */}
                <div className="space-y-2">
                  <Label htmlFor="energy">Energy Level</Label>
                  <p className="text-xs text-text-secondary mb-2">Tone and intensity of affirmations</p>
                  <Select value={energyLevel} onValueChange={setEnergyLevel}>
                    <SelectTrigger id="energy">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soft">Soft / Healing</SelectItem>
                      <SelectItem value="supportive">Supportive / Reassuring</SelectItem>
                      <SelectItem value="direct">Direct / Motivational</SelectItem>
                      <SelectItem value="intense">Intense / Warrior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Layout Style Selection */}
                <div className="space-y-2">
                  <Label htmlFor="layout">Layout Style</Label>
                  <p className="text-xs text-text-secondary mb-2">Leave blank for auto-pick based on theme</p>
                  <Select value={layoutStyle || "auto"} onValueChange={(val) => setLayoutStyle(val === "auto" ? "" : val)}>
                    <SelectTrigger id="layout">
                      <SelectValue placeholder="Auto (based on theme)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto (based on theme)</SelectItem>
                      <SelectItem value="clean-serif">Clean Serif Poster</SelectItem>
                      <SelectItem value="botanical">Botanical / Feminine</SelectItem>
                      <SelectItem value="grit">Grit / Directional</SelectItem>
                      <SelectItem value="halo">Halo / Orbital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Keywords Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="keywords">Words, tone, or personal details to include</Label>
                  <Textarea
                    id="keywords"
                    placeholder="soft feminine energy, healing, gentle self-trust, sunrise warmth"
                    value={userKeywords}
                    onChange={(e) => setUserKeywords(e.target.value)}
                    className="min-h-[100px] resize-none"
                    maxLength={300}
                  />
                  <p className="text-xs text-text-secondary text-right">{userKeywords.length}/300</p>
                </div>

                {/* Optional Seed */}
                <div className="space-y-2">
                  <Label htmlFor="seed">Style Seed (optional)</Label>
                  <p className="text-xs text-text-secondary mb-2">Use the same seed to get a consistent style again</p>
                  <Input
                    id="seed"
                    type="number"
                    placeholder="e.g., 1234"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex-1 bg-clay hover:bg-clay-dark text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Preview
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleGenerateUnique}
                    disabled={loading}
                    variant="outline"
                    className="border-clay text-clay hover:bg-clay/10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Image...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Unique Image
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleRandomize}
                    variant="outline"
                    disabled={loading}
                    className="border-clay text-clay hover:bg-clay/10"
                  >
                    Randomize
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Poster Preview */}
            <Card className="bg-white shadow-sm border border-neutral-200 rounded-xl">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Poster Preview</CardTitle>
                <CardDescription>Your custom affirmation print concept</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Show either text preview OR generated image */}
                {generatedImageB64 ? (
                  /* Generated Unique Image */
                  <div className="space-y-4">
                    <img 
                      src={generatedImageB64} 
                      alt="Generated affirmation poster" 
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-xs text-center text-text-secondary">
                      Your AI-generated affirmation poster
                    </p>
                  </div>
                ) : (
                  /* Text-based Preview */
                  <>
                    {/* Mock Poster Container */}
                    <div className="relative bg-gradient-to-br from-stone-50 to-stone-100 rounded-lg shadow-lg border border-neutral-200 p-4 md:p-6 lg:p-8 aspect-[4/5]">
                      {/* Paper texture effect */}
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] rounded-lg" />
                      
                      <div className="relative h-full flex flex-col justify-between">
                        {/* Main Headline */}
                        <div className="text-center mb-4 md:mb-6">
                          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-clay mb-2 uppercase">
                            {generatedData.mainAffirmation}
                          </h2>
                          <div className="w-16 md:w-24 h-0.5 bg-clay/30 mx-auto" />
                        </div>

                        {/* Supporting Affirmations */}
                        <div className="flex-1 space-y-2 md:space-y-3">
                          {generatedData.supportingPhrases.map((phrase, idx) => (
                            <p
                              key={idx}
                              className={`text-xs md:text-sm lg:text-base ${
                                idx % 3 === 0
                                  ? "italic text-clay-dark font-light"
                                  : idx % 3 === 1
                                  ? "font-semibold text-text-primary tracking-wide"
                                  : "text-text-secondary font-medium"
                              }`}
                            >
                              {phrase}
                            </p>
                          ))}
                        </div>

                        {/* Style Metadata */}
                        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-neutral-300 space-y-1 md:space-y-2 text-[10px] md:text-xs text-text-secondary">
                          <p>
                            <span className="font-semibold text-clay">Palette:</span> {generatedData.palette}
                          </p>
                          <p>
                            <span className="font-semibold text-clay">Layout Style:</span> {generatedData.layoutStyle}
                          </p>
                          <p>
                            <span className="font-semibold text-clay">Accent Elements:</span> {generatedData.accentStyle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-center text-text-secondary italic">
                      This is a preview. Final high-resolution print will include full styling and export at 300 DPI.
                    </p>
                  </>
                )}

                {/* CTA Footer */}
                <div className="space-y-3 pt-4 border-t border-neutral-200">
                  <Button
                    disabled
                    className="w-full bg-clay/50 text-white cursor-not-allowed"
                  >
                    Download High-Res (Coming Soon)
                  </Button>
                  <p className="text-xs text-center text-text-secondary">
                    Need a change?{" "}
                    <button
                      onClick={() => document.getElementById("theme")?.focus()}
                      className="text-clay hover:underline"
                    >
                      Edit inputs on the left
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AffirmationBuilder;
