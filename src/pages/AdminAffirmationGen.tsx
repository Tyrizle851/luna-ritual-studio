import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, X, Play, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { affirmations } from "@/data/affirmations";
import { toast } from "sonner";

interface GenerationStatus {
  id: string;
  title: string;
  status: "pending" | "generating" | "success" | "error";
  error?: string;
}

const AdminAffirmationGen = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [statuses, setStatuses] = useState<GenerationStatus[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateStatus = (id: string, status: GenerationStatus["status"], error?: string) => {
    setStatuses(prev => prev.map(s => s.id === id ? { ...s, status, error } : s));
  };

  const generateForAffirmation = async (affirmation: typeof affirmations[0], forceRegenerate = true) => {
    try {
      updateStatus(affirmation.id, "generating");
      
      const { data, error } = await supabase.functions.invoke("generate-affirmation-product-images", {
        body: {
          affirmationId: affirmation.id,
          affirmationText: affirmation.title,
          category: affirmation.category,
          tags: affirmation.tags || [],
          description: affirmation.description,
          forceRegenerate,
        },
      });

      if (error) throw error;
      
      updateStatus(affirmation.id, "success");
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      updateStatus(affirmation.id, "error", errorMsg);
      console.error(`Failed to generate for ${affirmation.id}:`, err);
      return false;
    }
  };

  const startBatchGeneration = async () => {
    setIsGenerating(true);
    setCurrentIndex(0);
    
    // Initialize all statuses as pending
    setStatuses(affirmations.map(a => ({
      id: a.id,
      title: a.title,
      status: "pending" as const,
    })));

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < affirmations.length; i++) {
      setCurrentIndex(i);
      const success = await generateForAffirmation(affirmations[i]);
      if (success) successCount++;
      else errorCount++;
      
      // Small delay between generations to avoid rate limiting
      if (i < affirmations.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    setIsGenerating(false);
    toast.success(`Generation complete: ${successCount} succeeded, ${errorCount} failed`);
  };

  const generateSingle = async (affirmation: typeof affirmations[0]) => {
    setStatuses(prev => {
      const existing = prev.find(s => s.id === affirmation.id);
      if (existing) {
        return prev.map(s => s.id === affirmation.id ? { ...s, status: "pending" as const } : s);
      }
      return [...prev, { id: affirmation.id, title: affirmation.title, status: "pending" as const }];
    });

    await generateForAffirmation(affirmation);
  };

  const progress = statuses.length > 0 
    ? (statuses.filter(s => s.status === "success" || s.status === "error").length / affirmations.length) * 100
    : 0;

  const getStatusIcon = (status: GenerationStatus["status"]) => {
    switch (status) {
      case "generating": return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "success": return <Check className="h-4 w-4 text-green-600" />;
      case "error": return <X className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Affirmation Image Generation</span>
              <Badge variant="outline">{affirmations.length} affirmations</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={startBatchGeneration} 
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating... ({currentIndex + 1}/{affirmations.length})
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Generate All Images
                  </>
                )}
              </Button>
            </div>

            {statuses.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Individual Affirmations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 max-h-[500px] overflow-y-auto">
              {affirmations.map(affirmation => {
                const status = statuses.find(s => s.id === affirmation.id);
                return (
                  <div 
                    key={affirmation.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {status && getStatusIcon(status.status)}
                      <div className="min-w-0">
                        <p className="font-medium truncate">{affirmation.title}</p>
                        <p className="text-xs text-muted-foreground">{affirmation.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {status?.error && (
                        <span className="text-xs text-red-600 max-w-[150px] truncate" title={status.error}>
                          {status.error}
                        </span>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateSingle(affirmation)}
                        disabled={isGenerating || status?.status === "generating"}
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAffirmationGen;
