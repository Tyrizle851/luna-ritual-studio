import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Palette } from 'lucide-react';

interface GenerationControlsProps {
  loading: boolean;
  generatedImageB64: string | null;
  previewImagesB64: string[];
  finalImagesB64: string[];
  handleGenerate: () => void;
  handleRandomize: () => void;
  handleGenerateUnique: () => void;
  showHelpText?: boolean; // Whether to show explanatory text under buttons (mobile)
  prompt?: string; // For validation - disable generate if empty
}

/**
 * Generation control buttons with social proof
 * Includes See Previews, Randomize, and Create Print-Quality buttons
 */
export function GenerationControls({
  loading,
  generatedImageB64,
  previewImagesB64,
  finalImagesB64,
  handleGenerate,
  handleRandomize,
  handleGenerateUnique,
  showHelpText = false,
  prompt = '',
}: GenerationControlsProps) {
  const isPromptEmpty = !prompt.trim();

  return (
    <div className="space-y-3 pt-4">
      {/* Preview and Randomize Buttons */}
      <div className={showHelpText ? "space-y-2" : ""}>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleGenerate}
            variant="outline"
            className="h-11 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            disabled={loading || isPromptEmpty}
            title={isPromptEmpty ? "Enter a prompt or click Randomize first" : undefined}
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
        {showHelpText && (
          <p className="text-xs text-muted-foreground text-center">
            {isPromptEmpty ? "Click Randomize to get started!" : "Preview first to explore options (~30 seconds)"}
          </p>
        )}
      </div>

      {/* Create Print-Quality Button */}
      <div className={showHelpText ? "space-y-2" : ""}>
        <Button
          onClick={handleGenerateUnique}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
          disabled={loading || isPromptEmpty || (showHelpText && previewImagesB64.length === 0)}
          title={isPromptEmpty ? "Enter a prompt or click Randomize first" : undefined}
        >
          {loading && (showHelpText ? generatedImageB64 === null : finalImagesB64.length === 0) && previewImagesB64.length > 0 ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Create Print-Quality
        </Button>
        {showHelpText && (
          <p className="text-xs text-muted-foreground text-center">
            {previewImagesB64.length === 0
              ? "Generate previews first to unlock print-quality creation"
              : "Creates 4 high-resolution versions perfect for printing (~60 sec)"}
          </p>
        )}
      </div>

      {/* Social Proof */}
      <div className="pt-4 mt-4 border-t border-border/40 space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★★★★★</span>
            <span className="font-medium text-foreground">4.9/5</span>
          </div>
          <span>•</span>
          <span>{showHelpText ? "1,200+ affirmations created this week" : "1,200+ created this week"}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground italic">
          {showHelpText ? '"Finally, affirmations that match my vibe!" - Sarah M.' : '"Love the watercolor aesthetic!" - Emma K.'}
        </p>
      </div>
    </div>
  );
}
