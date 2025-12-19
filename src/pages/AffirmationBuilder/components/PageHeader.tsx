import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles, Zap, Award, Wand2, History } from 'lucide-react';
import { toast } from 'sonner';
import { WorkflowProgress } from './WorkflowProgress';
import { OnboardingDialog } from './OnboardingDialog';
import { ComparisonDialog } from './ComparisonDialog';
import { LoadingState } from './LoadingState';
import type { GeneratedData, HistoryItem } from '../types';

interface PageHeaderProps {
  previewImagesB64: string[];
  finalImagesB64: string[];
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
  selectedImages: number[];
  setSelectedImages: (indices: number[]) => void;
  setExpandedImage: (image: { url: string; type: 'preview' | 'final' } | null) => void;
  loading: boolean;
  loadingProgress: number;
  loadingMessage: string;
  showGallery: boolean;
  setShowGallery: (show: boolean) => void;
  history: HistoryItem[];
  setGeneratedImageB64: (imageB64: string | null) => void;
  setGeneratedData: (data: GeneratedData) => void;
}

/**
 * Page header component with title, badges, dialogs, and workflow progress
 * Displays main title, trust badges, and manages all top-level dialogs
 */
export function PageHeader({
  previewImagesB64,
  finalImagesB64,
  showOnboarding,
  setShowOnboarding,
  showComparison,
  setShowComparison,
  selectedImages,
  setSelectedImages,
  setExpandedImage,
  loading,
  loadingProgress,
  loadingMessage,
  showGallery,
  setShowGallery,
  history,
  setGeneratedImageB64,
  setGeneratedData,
}: PageHeaderProps) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Sparkles className="h-6 w-6 text-clay animate-pulse" />
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-clay">Affirmation Studio</h1>
        <Badge className="bg-clay text-white text-xs px-2 py-1">NEW</Badge>
        <Sparkles className="h-6 w-6 text-clay animate-pulse" />
      </div>

      <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
        Create meaningful affirmation art that reflects your unique journey
      </p>

      {/* Consolidated Trust Badges - Square Button Style */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
          <Zap className="h-6 w-6 text-clay group-hover:animate-pulse" />
          <span className="text-sm font-semibold text-foreground text-center">AI-Powered</span>
        </div>
        <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
          <Award className="h-6 w-6 text-clay group-hover:animate-pulse" />
          <span className="text-sm font-semibold text-foreground text-center">Print-Ready</span>
        </div>
        <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
          <Wand2 className="h-6 w-6 text-clay group-hover:animate-pulse" />
          <span className="text-sm font-semibold text-foreground text-center">Personalized</span>
        </div>
        <div className="group flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-white border border-clay/20 hover:border-clay/40 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]">
          <Sparkles className="h-6 w-6 text-clay group-hover:animate-pulse" />
          <span className="text-sm font-semibold text-foreground text-center">Instant</span>
        </div>
      </div>

      {/* Workflow Step Indicator */}
      <WorkflowProgress
        hasPreviewImages={previewImagesB64.length > 0}
        hasFinalImages={finalImagesB64.length > 0}
      />

      {/* Onboarding Dialog for First-Time Users */}
      <OnboardingDialog open={showOnboarding} onOpenChange={setShowOnboarding} />

      {/* Image Comparison Dialog */}
      <ComparisonDialog
        open={showComparison}
        onOpenChange={setShowComparison}
        selectedImageIndices={selectedImages}
        previewImages={previewImagesB64}
        onClearSelection={() => setSelectedImages([])}
        onViewFullSize={(url) => setExpandedImage({ url, type: 'preview' })}
      />

      {/* Loading Overlay with Progress */}
      <LoadingState
        isLoading={loading}
        progress={loadingProgress}
        message={loadingMessage}
      />

      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            View Gallery
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Gallery</DialogTitle>
            <DialogDescription>Previously generated affirmations</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {history.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground py-8">No history yet. Generate your first affirmation!</p>
            ) : (
              history.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
                  setGeneratedImageB64(item.imageB64);
                  setGeneratedData(item.generatedData);
                  setShowGallery(false);
                  toast.success('Loaded from gallery');
                }}>
                  <img src={item.imageB64} alt="History" className="w-full h-auto" />
                  <div className="p-2 bg-muted/50">
                    <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
