import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Palette, ChevronDown } from 'lucide-react';

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
}

interface IntentionSelectorProps {
  theme: string;
  setTheme: (value: string) => void;
  mood: string;
  setMood: (value: string) => void;
  layoutStyle: string;
  setLayoutStyle: (value: string) => void;
  userKeywords: string;
  setUserKeywords: (value: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
  customPalette: string[];
  generatedData: GeneratedData;
  updatePaletteColor: (index: number, color: string) => void;
  resetPalette: () => void;
  idSuffix?: string; // Optional suffix for form IDs (e.g., "-desktop" for desktop version)
}

/**
 * Intention selection form with theme, mood, layout, and advanced options
 * Reusable for both mobile and desktop layouts
 */
export function IntentionSelector({
  theme,
  setTheme,
  mood,
  setMood,
  layoutStyle,
  setLayoutStyle,
  userKeywords,
  setUserKeywords,
  showAdvanced,
  setShowAdvanced,
  customPalette,
  generatedData,
  updatePaletteColor,
  resetPalette,
  idSuffix = '',
}: IntentionSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Theme Selection */}
      <div className="space-y-2">
        <Label htmlFor={`theme${idSuffix}`}>Theme</Label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger id={`theme${idSuffix}`}>
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

      {/* Mood Selection - Updated with Luna Signature + Exploratory */}
      <div className="space-y-2">
        <Label htmlFor={`mood${idSuffix}`} className="flex items-center gap-2">
          Style
          <span className="text-xs text-muted-foreground">(Visual aesthetic)</span>
        </Label>
        <Select value={mood} onValueChange={setMood}>
          <SelectTrigger id={`mood${idSuffix}`}>
            <SelectValue placeholder="Choose your style" />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {/* Luna Signature Styles */}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              ✨ Luna Signature Styles
            </div>
            <SelectItem value="soft-watercolor">🌊 Soft Watercolor</SelectItem>
            <SelectItem value="flowing-waves">〰️ Flowing Waves</SelectItem>
            <SelectItem value="radiant-burst">☀️ Radiant Burst</SelectItem>
            <SelectItem value="layered-serenity">🏜️ Layered Serenity</SelectItem>
            <SelectItem value="botanical-whisper">🌿 Botanical Whisper</SelectItem>
            <SelectItem value="golden-glow">✨ Golden Glow</SelectItem>
            <SelectItem value="celestial-light">🌙 Celestial Light</SelectItem>

            {/* Divider */}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-2 pt-3">
              🎨 Exploratory Styles
            </div>
            <SelectItem value="zen-minimal">⚪ Zen Minimal</SelectItem>
            <SelectItem value="cool-serenity">💙 Cool Serenity</SelectItem>
            <SelectItem value="geometric-structure">▢ Geometric Structure</SelectItem>
            <SelectItem value="bold-modern">💪 Bold Modern</SelectItem>
            <SelectItem value="vibrant-energy">⚡ Vibrant Energy</SelectItem>
            <SelectItem value="mystical-deep">🌌 Mystical Deep</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Luna Signature styles match our gallery. Exploratory styles offer more variety.
        </p>
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
            <Label htmlFor={`layout${idSuffix}`}>Layout Style</Label>
            <Select value={layoutStyle || "auto"} onValueChange={(val) => setLayoutStyle(val === "auto" ? "" : val)}>
              <SelectTrigger id={`layout${idSuffix}`}>
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
            <Label htmlFor={`keywords${idSuffix}`}>Keywords (adds objects to image)</Label>
            <Textarea
              id={`keywords${idSuffix}`}
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
    </div>
  );
}
