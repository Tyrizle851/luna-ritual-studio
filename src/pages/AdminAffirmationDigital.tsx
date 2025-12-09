import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AffirmationToGenerate {
  id: string;
  title: string;
  category: string;
  supportingPhrases: string[];
}

const FEATURED_AFFIRMATIONS: AffirmationToGenerate[] = [
  {
    id: "aff-001",
    title: "I am worthy of rest",
    category: "rest",
    supportingPhrases: [
      "slow down", "breathe deeply", "embrace stillness", 
      "honor your needs", "peace is productive", "rest is sacred",
      "be gentle", "find calm", "recharge", "let go"
    ]
  },
  {
    id: "aff-002", 
    title: "I am worthy of peace",
    category: "peace",
    supportingPhrases: [
      "breathe in calm", "embrace tranquility", "savor stillness",
      "find balance", "quiet my mind", "be present", "let go",
      "choose joy", "inner harmony", "gentle thoughts"
    ]
  },
  {
    id: "aff-003",
    title: "Growth is a journey, not a destination",
    category: "growth",
    supportingPhrases: [
      "embrace the process", "trust the timing", "bloom where planted",
      "every step counts", "progress over perfection", "keep evolving",
      "celebrate small wins", "patience", "trust yourself"
    ]
  },
  {
    id: "aff-004",
    title: "I am always enough",
    category: "self-love",
    supportingPhrases: [
      "worthy as I am", "complete", "whole", "nothing to prove",
      "embrace myself", "self love", "I am deserving", 
      "perfectly imperfect", "trust yourself", "you matter"
    ]
  },
  {
    id: "aff-005",
    title: "My calm is my power",
    category: "calm",
    supportingPhrases: [
      "stillness is strength", "breathe", "centered", "grounded",
      "inner peace", "steady mind", "quiet confidence",
      "tranquil spirit", "serene strength", "at ease"
    ]
  }
];

export default function AdminAffirmationDigital() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (affirmation: AffirmationToGenerate) => {
    setGenerating(affirmation.id);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-affirmation-digital", {
        body: {
          affirmationId: affirmation.id,
          title: affirmation.title,
          category: affirmation.category,
          supportingPhrases: affirmation.supportingPhrases
        }
      });

      if (error) throw error;
      
      if (data?.success && data?.imageUrl) {
        setGeneratedImages(prev => ({
          ...prev,
          [affirmation.id]: data.imageUrl
        }));
        toast.success(`Generated image for "${affirmation.title}"`);
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        throw new Error("No image returned from generator");
      }
    } catch (err) {
      console.error("Error generating image:", err);
      const message = err instanceof Error ? err.message : "Failed to generate image";
      setError(message);
      toast.error(message);
    } finally {
      setGenerating(null);
    }
  };

  const generateAll = async () => {
    for (const affirmation of FEATURED_AFFIRMATIONS) {
      await generateImage(affirmation);
      // Small delay between generations to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  };

  const downloadImage = (id: string, title: string) => {
    const imageData = generatedImages[id];
    if (!imageData) return;
    
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `affirmation-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Affirmation Image Generator</h1>
        <p className="text-muted-foreground mb-8">
          Generate rich typography poster-style images using Gemini 3 Pro
        </p>

        <div className="mb-6">
          <Button onClick={generateAll} disabled={generating !== null}>
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate All Images"
            )}
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_AFFIRMATIONS.map((affirmation) => (
            <Card key={affirmation.id} className="p-4">
              <h3 className="font-semibold mb-2">{affirmation.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Category: {affirmation.category}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Phrases: {affirmation.supportingPhrases.slice(0, 3).join(", ")}...
              </p>

              {generatedImages[affirmation.id] ? (
                <div className="space-y-2">
                  <img 
                    src={generatedImages[affirmation.id]} 
                    alt={affirmation.title}
                    className="w-full aspect-[4/5] object-cover rounded-lg"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => downloadImage(affirmation.id, affirmation.title)}
                  >
                    Download
                  </Button>
                </div>
              ) : (
                <div className="aspect-[4/5] bg-muted rounded-lg flex items-center justify-center">
                  {generating === affirmation.id ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <Button 
                      variant="secondary"
                      onClick={() => generateImage(affirmation)}
                      disabled={generating !== null}
                    >
                      Generate
                    </Button>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
