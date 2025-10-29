import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
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
    try {
      const resp = await apiFetch('/api/affirmation/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, mood, text: userKeywords, styleSeed: seed || undefined }),
      });
      if (resp.ok) {
        const data = await resp.json();
        const spec = data?.designSpec;
        if (spec) {
          setGeneratedData({
            mainAffirmation: spec.mainAffirmation,
            supportingPhrases: spec.supportingPhrases,
            palette: spec.palette,
            layoutStyle: spec.layoutStyle,
            accentStyle: spec.accentStyle,
          });
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      // fall through to local mapping
    }

    // Fallback local mapping if API not available
    const themeMap: Record<string, GeneratedData> = {
      "calm-morning": {
        mainAffirmation: "SOFT WITHIN",
        supportingPhrases: [
          "I rise with intention",
          "Morning light guides me",
          "Peace starts here",
          "Gentle beginnings matter",
          "I breathe in clarity",
          "Today I choose calm",
          "Stillness is my strength",
          "I trust this moment"
        ],
        palette: "Soft Peach / Warm Cream / Pale Gold",
        layoutStyle: "Cascading diagonal with sunrise-inspired flow",
        accentStyle: "Delicate sun rays and morning botanical sprigs"
      },
      "focus": {
        mainAffirmation: "CLEAR MIND",
        supportingPhrases: [
          "One thing at a time",
          "Distraction fades, clarity remains",
          "I am fully present",
          "My attention is powerful",
          "Focus creates momentum",
          "I choose depth over speed",
          "Intentional energy flows",
          "This task matters"
        ],
        palette: "Charcoal / Sage / Crisp White",
        layoutStyle: "Geometric grid with bold typography hierarchy",
        accentStyle: "Minimal lines and directional arrows"
      },
      "gratitude": {
        mainAffirmation: "I AM GRATEFUL",
        supportingPhrases: [
          "Small joys fill my heart",
          "Abundance surrounds me",
          "I notice beauty daily",
          "Thank you for this moment",
          "Appreciation flows freely",
          "I celebrate what is",
          "Grateful for growth",
          "Joy lives in the present"
        ],
        palette: "Warm Terracotta / Gold / Cream",
        layoutStyle: "Circular arrangement with heart-centered focal point",
        accentStyle: "Hand-drawn hearts and organic floral elements"
      },
      "confidence": {
        mainAffirmation: "I AM CAPABLE",
        supportingPhrases: [
          "My voice matters",
          "I trust my decisions",
          "Doubt does not define me",
          "I stand in my power",
          "Courage lives within",
          "I am enough, always",
          "My light shines bright",
          "I believe in myself"
        ],
        palette: "Deep Navy / Copper / Ivory",
        layoutStyle: "Bold vertical stack with powerful typography",
        accentStyle: "Geometric frames and confident underlines"
      },
      "peace": {
        mainAffirmation: "INNER CALM",
        supportingPhrases: [
          "I release what I cannot control",
          "Peace flows through me",
          "Stillness is my refuge",
          "I choose serenity",
          "My breath anchors me",
          "Gentle is powerful",
          "I am safe here",
          "Quiet heals"
        ],
        palette: "Soft Blue / Pale Sage / Warm Gray",
        layoutStyle: "Organic waves with gentle curved text flow",
        accentStyle: "Watercolor texture with flowing botanical lines"
      },
      "custom": {
        mainAffirmation: userKeywords.split(" ").slice(0, 3).join(" ").toUpperCase() || "YOUR INTENTION",
        supportingPhrases: [
          "I honor my unique path",
          "My vision is valid",
          "I create what I need",
          "This is my story",
          "I trust my direction",
          "My way is the right way",
          "I design my life",
          "Authenticity guides me"
        ],
        palette: "Custom palette based on mood",
        layoutStyle: "Personalized arrangement reflecting your energy",
        accentStyle: "Mixed elements tailored to your keywords"
      }
    };

    const newData = themeMap[theme] || themeMap["peace"];
    
    // Apply mood styling variations to palette
    const moodPalettes: Record<string, string> = {
      "minimalist": "Black / White / Single Accent Color",
      "bohemian": "Terracotta / Mustard / Sage / Warm Cream",
      "modern-serif": "Charcoal / Blush / Ivory / Gold",
      "coastal": "Soft Blue / Sandy Beige / Sea Foam / White",
      "earthy": "Forest Green / Clay / Cream / Rust"
    };

    setGeneratedData({
      ...newData,
      palette: moodPalettes[mood] || newData.palette
    });

    buildPrompt(theme, mood, userKeywords, seed); // For future use
    setLoading(false);
  };

  const handleGenerateUnique = async () => {
    setLoading(true);
    setGeneratedImageB64(null);
    try {
      const resp = await apiFetch('/api/affirmation/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, mood, text: userKeywords, styleSeed: seed || undefined }),
      });
      const data = await resp.json();
      
      if (!resp.ok) {
        console.error('Image generation API error:', resp.status, data);
        toast.error(data?.error || 'Failed to generate image. Please check your API configuration.');
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
      toast.error(e instanceof Error ? e.message : 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomize = () => {
    const themes = ["calm-morning", "focus", "gratitude", "confidence", "peace"];
    const moods = ["minimalist", "bohemian", "modern-serif", "coastal", "earthy"];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const randomSeed = Math.floor(Math.random() * 10000).toString();
    
    setTheme(randomTheme);
    setMood(randomMood);
    setSeed(randomSeed);
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

                {/* Model Image (optional) */}
                {generatedImageB64 && (
                  <div className="space-y-2">
                    <img src={generatedImageB64} alt="Generated" className="w-full rounded-md border" />
                    <p className="text-xs text-center text-text-secondary">Unique AI image preview (square). Final print will be cropped to 4:5.</p>
                  </div>
                )}

                {/* Disclaimer */}
                <p className="text-xs text-center text-text-secondary italic">
                  This is a preview. Final high-resolution print will include full styling and export at 300 DPI.
                </p>

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
