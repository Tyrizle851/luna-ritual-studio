import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Palette, ChevronDown } from 'lucide-react';

interface IntentionSelectorProps {
  prompt: string;
  setPrompt: (value: string) => void;
  userKeywords: string;
  setUserKeywords: (value: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
  customPalette: string[];
  updatePaletteColor: (index: number, color: string) => void;
  resetPalette: () => void;
  idSuffix?: string;
}

/**
 * Intention selection form with visible prompt textarea and custom colors
 * The prompt is fully visible and editable by the user
 */
export function IntentionSelector({
  prompt,
  setPrompt,
  userKeywords,
  setUserKeywords,
  showAdvanced,
  setShowAdvanced,
  customPalette,
  updatePaletteColor,
  resetPalette,
  idSuffix = '',
}: IntentionSelectorProps) {
  // Ensure we always have 3 colors to display
  const displayPalette = customPalette.length >= 3 
    ? customPalette 
    : ["#F5F1E8", "#D4B896", "#8B7355"];

  return (
    <div className="space-y-4">
      {/* Main Prompt Textarea */}
      <div className="space-y-2">
        <Label htmlFor={`prompt${idSuffix}`}>Your Prompt</Label>
        <Textarea
          id={`prompt${idSuffix}`}
          placeholder='Click "Randomize" to generate a creative prompt, or write your own...'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={8}
          className="font-mono text-sm leading-relaxed"
        />
        <p className="text-xs text-muted-foreground">
          This is the exact prompt sent to the AI. Edit it directly or click Randomize to generate a new one.
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
          {/* User Keywords */}
          <div className="space-y-2">
            <Label htmlFor={`keywords${idSuffix}`}>Additional Keywords</Label>
            <Textarea
              id={`keywords${idSuffix}`}
              placeholder="e.g., mountains, ocean, stars, flowers..."
              value={userKeywords}
              onChange={(e) => setUserKeywords(e.target.value)}
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              These keywords will be appended to your prompt.
            </p>
          </div>

          {/* Color Customization */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Custom Colors
              </Label>
              <Button variant="ghost" size="sm" onClick={resetPalette}>
                Reset
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Colors are auto-derived from your prompt. Customize them here.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {displayPalette.map((color, i) => (
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
