import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle, XCircle, Play, RotateCcw, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { affirmations } from "@/data/affirmations";
import { toast } from "sonner";

// Import all local digital images
import aff001 from "@/assets/affirmation-digital-aff-001.png";
import aff002 from "@/assets/affirmation-digital-aff-002.png";
import aff003 from "@/assets/affirmation-digital-aff-003.png";
import aff004 from "@/assets/affirmation-digital-aff-004.png";
import aff005 from "@/assets/affirmation-digital-aff-005.png";
import aff006 from "@/assets/affirmation-digital-aff-006.png";
import aff007 from "@/assets/affirmation-digital-aff-007.png";
import aff008 from "@/assets/affirmation-digital-aff-008.png";
import aff009 from "@/assets/affirmation-digital-aff-009.png";
import aff010 from "@/assets/affirmation-digital-aff-010.png";
import aff011 from "@/assets/affirmation-digital-aff-011.png";
import aff012 from "@/assets/affirmation-digital-aff-012.png";
import aff013 from "@/assets/affirmation-digital-aff-013.png";
import aff014 from "@/assets/affirmation-digital-aff-014.png";
import aff015 from "@/assets/affirmation-digital-aff-015.png";
import aff016 from "@/assets/affirmation-digital-aff-016.png";
import aff017 from "@/assets/affirmation-digital-aff-017.png";
import aff018 from "@/assets/affirmation-digital-aff-018.png";
import aff019 from "@/assets/affirmation-digital-aff-019.png";
import aff020 from "@/assets/affirmation-digital-aff-020.png";
import aff021 from "@/assets/affirmation-digital-aff-021.png";
import aff022 from "@/assets/affirmation-digital-aff-022.png";
import aff023 from "@/assets/affirmation-digital-aff-023.png";
import aff024 from "@/assets/affirmation-digital-aff-024.png";

const LOCAL_IMAGES: Record<string, string> = {
  "aff-001": aff001, "aff-002": aff002, "aff-003": aff003, "aff-004": aff004,
  "aff-005": aff005, "aff-006": aff006, "aff-007": aff007, "aff-008": aff008,
  "aff-009": aff009, "aff-010": aff010, "aff-011": aff011, "aff-012": aff012,
  "aff-013": aff013, "aff-014": aff014, "aff-015": aff015, "aff-016": aff016,
  "aff-017": aff017, "aff-018": aff018, "aff-019": aff019, "aff-020": aff020,
  "aff-021": aff021, "aff-022": aff022, "aff-023": aff023, "aff-024": aff024,
};

interface GenerationStatus {
  id: string;
  title: string;
  status: "pending" | "generating" | "success" | "error" | "skipped";
  message?: string;
  images?: { variation: string; url: string }[];
}

async function imageUrlToBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function AdminAffirmationMockups() {
  const [statuses, setStatuses] = useState<GenerationStatus[]>(
    affirmations.map(a => ({ id: a.id, title: a.title, status: "pending" }))
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forceRegenerate, setForceRegenerate] = useState(false);

  const updateStatus = (id: string, update: Partial<GenerationStatus>) => {
    setStatuses(prev => prev.map(s => s.id === id ? { ...s, ...update } : s));
  };

  const generateForAffirmation = async (affirmation: typeof affirmations[0]) => {
    const localImageUrl = LOCAL_IMAGES[affirmation.id];
    if (!localImageUrl) {
      updateStatus(affirmation.id, { status: "error", message: "No local image found" });
      return;
    }

    updateStatus(affirmation.id, { status: "generating" });

    try {
      // Convert local image to base64
      const inputImageBase64 = await imageUrlToBase64(localImageUrl);

      const { data, error } = await supabase.functions.invoke("generate-affirmation-product-images", {
        body: {
          affirmationId: affirmation.id,
          affirmationText: affirmation.title,
          category: affirmation.category,
          description: affirmation.description,
          tags: affirmation.tags,
          forceRegenerate,
          inputImageBase64,
        },
      });

      if (error) throw error;

      if (data.success) {
        updateStatus(affirmation.id, { 
          status: data.message?.includes("already exist") ? "skipped" : "success",
          message: data.message,
          images: data.images
        });
      } else {
        throw new Error(data.error || "Generation failed");
      }
    } catch (err) {
      console.error(`Error generating for ${affirmation.id}:`, err);
      updateStatus(affirmation.id, { 
        status: "error", 
        message: err instanceof Error ? err.message : "Unknown error" 
      });
    }
  };

  const startBatchGeneration = async () => {
    setIsGenerating(true);
    setCurrentIndex(0);

    for (let i = 0; i < affirmations.length; i++) {
      setCurrentIndex(i);
      await generateForAffirmation(affirmations[i]);
      // Small delay between requests to avoid rate limiting
      if (i < affirmations.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    setIsGenerating(false);
    toast.success("Batch generation complete!");
  };

  const generateSingle = async (affirmation: typeof affirmations[0]) => {
    setIsGenerating(true);
    await generateForAffirmation(affirmation);
    setIsGenerating(false);
  };

  const successCount = statuses.filter(s => s.status === "success").length;
  const skippedCount = statuses.filter(s => s.status === "skipped").length;
  const errorCount = statuses.filter(s => s.status === "error").length;
  const progress = ((successCount + skippedCount + errorCount) / affirmations.length) * 100;

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Affirmation Mockup Generator</h1>
        <p className="text-muted-foreground mb-8">
          Generate canvas, unframed poster, and framed poster mockups for all 24 affirmations using the curated digital artwork.
        </p>

        <Card className="p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              onClick={startBatchGeneration} 
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {isGenerating ? `Generating ${currentIndex + 1}/${affirmations.length}...` : "Generate All Mockups"}
            </Button>
            
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={forceRegenerate}
                onChange={(e) => setForceRegenerate(e.target.checked)}
                className="rounded"
              />
              Force regenerate existing
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{successCount + skippedCount + errorCount}/{affirmations.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ {successCount} generated</span>
              <span className="text-yellow-600">⏭ {skippedCount} skipped</span>
              <span className="text-red-600">✗ {errorCount} errors</span>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {statuses.map((status, idx) => (
            <Card 
              key={status.id}
              className={`p-4 flex items-center gap-4 ${
                status.status === "generating" ? "border-primary" :
                status.status === "success" ? "border-green-500" :
                status.status === "error" ? "border-red-500" :
                status.status === "skipped" ? "border-yellow-500" : ""
              }`}
            >
              <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                {LOCAL_IMAGES[status.id] && (
                  <img 
                    src={LOCAL_IMAGES[status.id]} 
                    alt={status.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{status.title}</div>
                <div className="text-sm text-muted-foreground">{status.id}</div>
                {status.message && (
                  <div className="text-xs text-muted-foreground mt-1">{status.message}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {status.status === "pending" && (
                  <span className="text-muted-foreground text-sm">Pending</span>
                )}
                {status.status === "generating" && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {status.status === "success" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {status.status === "skipped" && (
                  <span className="text-yellow-600 text-sm">Skipped</span>
                )}
                {status.status === "error" && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => generateSingle(affirmations[idx])}
                  disabled={isGenerating}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
