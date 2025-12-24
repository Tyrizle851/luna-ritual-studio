import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * First-time user onboarding dialog explaining the 3-step workflow
 * Only shows once per user (tracked in localStorage)
 */
export function OnboardingDialog({ open, onOpenChange }: OnboardingDialogProps) {
  const handleGetStarted = () => {
    onOpenChange(false);
    // Scroll to templates after a brief delay
    setTimeout(() => {
      const templates = document.querySelector('[class*="Quick Start"]');
      templates?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Welcome to Affirmation Studio!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Create personalized affirmation art in 3 easy steps
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">1</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Describe Your Vision</h3>
              <p className="text-sm text-muted-foreground">
                Type what you want or click "Randomize" for instant inspiration
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">2</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Generate Previews</h3>
              <p className="text-sm text-muted-foreground">
                Create 4 unique variations (~30 sec) and pick your favorite
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">3</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Download Print-Ready</h3>
              <p className="text-sm text-muted-foreground">
                Get 4 high-resolution versions (300 DPI) ready for framing
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
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Skip
          </Button>
          <Button onClick={handleGetStarted} className="flex-1">
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
