import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AffirmationToGenerate {
  id: string;
  title: string;
}

// All 24 affirmations with unique titles
const ALL_AFFIRMATIONS: AffirmationToGenerate[] = [
  { id: "aff-001", title: "I am worthy of rest" },
  { id: "aff-002", title: "I am worthy of peace" },
  { id: "aff-003", title: "Growth is a journey, not a destination" },
  { id: "aff-004", title: "I trust my journey" },
  { id: "aff-005", title: "I am always enough" },
  { id: "aff-006", title: "My calm is my power" },
  { id: "aff-007", title: "I receive what I desire" },
  { id: "aff-008", title: "Today, I honor myself" },
  { id: "aff-009", title: "I release what no longer serves" },
  { id: "aff-010", title: "Joy is my natural state" },
  { id: "aff-011", title: "I am safe in my body" },
  { id: "aff-012", title: "My voice matters" },
  { id: "aff-013", title: "I am worthy of my dreams" },
  { id: "aff-014", title: "I choose peace over perfection" },
  { id: "aff-015", title: "I celebrate my progress" },
  { id: "aff-016", title: "My intuition guides me" },
  { id: "aff-017", title: "I am open to miracles" },
  { id: "aff-018", title: "I give myself permission to feel" },
  { id: "aff-019", title: "I am creating the life I desire" },
  { id: "aff-020", title: "Today is full of possibility" },
  { id: "aff-021", title: "I am allowed to change my mind" },
  { id: "aff-022", title: "My rest is productive" },
  { id: "aff-023", title: "I attract what I embody" },
  { id: "aff-024", title: "I am both the storm and the calm" },
];

export default function AdminAffirmationDigital() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [failedGenerations, setFailedGenerations] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generateImage = async (affirmation: AffirmationToGenerate): Promise<boolean> => {
    setGenerating(affirmation.id);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-affirmation-digital", {
        body: {
          affirmationId: affirmation.id,
          title: affirmation.title,
        }
      });

      if (error) throw error;
      
      if (data?.success && data?.imageUrl) {
        setGeneratedImages(prev => ({
          ...prev,
          [affirmation.id]: data.imageUrl
        }));
        setFailedGenerations(prev => {
          const next = new Set(prev);
          next.delete(affirmation.id);
          return next;
        });
        toast.success(`Generated: "${affirmation.title}"`);
        return true;
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        throw new Error("No image returned from generator");
      }
    } catch (err) {
      console.error("Error generating image:", err);
      const message = err instanceof Error ? err.message : "Failed to generate image";
      setError(message);
      setFailedGenerations(prev => new Set([...prev, affirmation.id]));
      toast.error(`Failed: "${affirmation.title}" - ${message}`);
      return false;
    } finally {
      setGenerating(null);
    }
  };

  const generateAll = async () => {
    setGeneratingAll(true);
    setProgress(0);
    setError(null);
    
    let completed = 0;
    
    for (const affirmation of ALL_AFFIRMATIONS) {
      // Skip if already generated
      if (generatedImages[affirmation.id]) {
        completed++;
        setProgress((completed / ALL_AFFIRMATIONS.length) * 100);
        continue;
      }
      
      await generateImage(affirmation);
      completed++;
      setProgress((completed / ALL_AFFIRMATIONS.length) * 100);
      
      // Delay between generations to avoid rate limiting
      if (completed < ALL_AFFIRMATIONS.length) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    setGeneratingAll(false);
    toast.success("Generation complete!");
  };

  const downloadImage = (id: string, title: string) => {
    const imageUrl = generatedImages[id];
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `affirmation-${id}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatedCount = Object.keys(generatedImages).length;
  const failedCount = failedGenerations.size;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Affirmation Image Generator</h1>
        <p className="text-muted-foreground mb-4">
          Generate 24 unique affirmation art prints using Gemini 3 Pro
        </p>

        {/* Stats */}
        <div className="flex gap-4 mb-6 text-sm">
          <span className="text-muted-foreground">
            Total: <strong>{ALL_AFFIRMATIONS.length}</strong>
          </span>
          <span className="text-green-600">
            Generated: <strong>{generatedCount}</strong>
          </span>
          {failedCount > 0 && (
            <span className="text-red-600">
              Failed: <strong>{failedCount}</strong>
            </span>
          )}
        </div>

        {/* Generate All Button */}
        <div className="mb-6 space-y-4">
          <Button 
            onClick={generateAll} 
            disabled={generating !== null || generatingAll}
            size="lg"
            className="w-full sm:w-auto"
          >
            {generatingAll ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating All ({Math.round(progress)}%)
              </>
            ) : (
              `Generate All ${ALL_AFFIRMATIONS.length} Affirmations`
            )}
          </Button>
          
          {generatingAll && (
            <Progress value={progress} className="w-full" />
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {/* Grid of all affirmations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ALL_AFFIRMATIONS.map((affirmation, index) => {
            const isGenerated = !!generatedImages[affirmation.id];
            const isFailed = failedGenerations.has(affirmation.id);
            const isGenerating = generating === affirmation.id;
            
            return (
              <Card key={affirmation.id} className="p-3 relative">
                {/* Status indicator */}
                <div className="absolute top-2 right-2 z-10">
                  {isGenerated && (
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  {isFailed && !isGenerated && (
                    <div className="bg-red-500 text-white rounded-full p-1">
                      <X className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <div className="text-xs text-muted-foreground mb-1">
                  #{index + 1} • {affirmation.id}
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2">
                  {affirmation.title}
                </h3>

                {isGenerated ? (
                  <div className="space-y-2">
                    <img 
                      src={generatedImages[affirmation.id]} 
                      alt={affirmation.title}
                      className="w-full aspect-[4/5] object-cover rounded-lg"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => downloadImage(affirmation.id, affirmation.title)}
                    >
                      Download
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-[4/5] bg-muted rounded-lg flex items-center justify-center">
                    {isGenerating ? (
                      <div className="text-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto mb-2" />
                        <span className="text-xs text-muted-foreground">Generating...</span>
                      </div>
                    ) : (
                      <Button 
                        variant="secondary"
                        size="sm"
                        onClick={() => generateImage(affirmation)}
                        disabled={generating !== null || generatingAll}
                      >
                        Generate
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
