import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Sparkles, Zap } from 'lucide-react';

/**
 * "Why Affirmation Studio?" feature section
 * Displays three key value propositions with icons and descriptions
 */
export function WhyAffirmationStudio() {
  return (
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
  );
}
