import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, Heart, Edit2, Check, X, Download, Share2, Palette, History, ChevronDown, Wand2, Shield, Award, Zap } from "lucide-react";
import { LOCAL_DIGITAL_IMAGES } from "@/lib/localDigitalImages";

const miraclesPreviewImg = LOCAL_DIGITAL_IMAGES["aff-017"]; // "I am open to miracles" preview
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { buildDesignSpec } from "@/lib/designSpecBuilder";
import type { ThemeSlug, MoodSlug, LayoutArchetype } from "@/types/design-spec";
import { downloadImage } from "./AffirmationBuilder/utils/imageProcessing";
import { useAffirmationGeneration } from "./AffirmationBuilder/hooks/useAffirmationGeneration";
import { generatePreviewData as generatePreviewDataUtil } from "./AffirmationBuilder/utils/affirmationDataGenerator";
import { useAffirmationActions } from "./AffirmationBuilder/hooks/useAffirmationActions";
import { WorkflowProgress } from "./AffirmationBuilder/components/WorkflowProgress";
import { LoadingState } from "./AffirmationBuilder/components/LoadingState";
import { OnboardingDialog } from "./AffirmationBuilder/components/OnboardingDialog";
import { ComparisonDialog } from "./AffirmationBuilder/components/ComparisonDialog";
import { StaffPresetGallery } from "./AffirmationBuilder/components/StaffPresetGallery";
import { IntentionSelector } from "./AffirmationBuilder/components/IntentionSelector";
import { GenerationControls } from "./AffirmationBuilder/components/GenerationControls";
import { ExpandedImageModal } from "./AffirmationBuilder/components/ExpandedImageModal";
import { ImageGalleryGrid } from "./AffirmationBuilder/components/ImageGalleryGrid";
import { StaticPreviewDisplay } from "./AffirmationBuilder/components/StaticPreviewDisplay";
import { MobileSingleImageDisplay } from "./AffirmationBuilder/components/MobileSingleImageDisplay";
import { MobilePreviewGrid } from "./AffirmationBuilder/components/MobilePreviewGrid";
import { PreviewCardHeader } from "./AffirmationBuilder/components/PreviewCardHeader";
import { ReviewsSection } from "./AffirmationBuilder/components/ReviewsSection";
import { WhyAffirmationStudio } from "./AffirmationBuilder/components/WhyAffirmationStudio";

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
}

interface FavoriteConfig {
  id: string;
  theme: string;
  mood: string;
  layoutStyle: string;
  userKeywords: string;
  seed: string;
  generatedData: GeneratedData;
  timestamp: number;
}

interface HistoryItem {
  id: string;
  imageB64: string;
  generatedData: GeneratedData;
  timestamp: number;
}

const AffirmationBuilder = () => {
  const [theme, setTheme] = useState("confidence");
  const [mood, setMood] = useState("minimalist");
  const [layoutStyle, setLayoutStyle] = useState("");
  const [userKeywords, setUserKeywords] = useState("");
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedData>({
    headline: "I am open to miracles",
    supportingLines: [
      "Magic flows through me",
      "I welcome the unexpected",
      "Wonder fills my day",
      "Possibility surrounds me"
    ],
    palette: ["#F5F1E8", "#D4B896", "#8B7355"],
    paletteNames: ["#F5F1E8", "#D4B896", "#8B7355"],
    layoutStyle: "Centered with flowing organic elements",
    accentElements: "watercolor washes, flowing lines, organic shapes"
  });
  const [generatedImageB64, setGeneratedImageB64] = useState<string | null>(null);
  const [previewImagesB64, setPreviewImagesB64] = useState<string[]>([miraclesPreviewImg]); // Show "I am open to miracles" by default
  const [finalImagesB64, setFinalImagesB64] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'preview' | 'final'>('preview');
  const [expandedImage, setExpandedImage] = useState<{ url: string; type: 'preview' | 'final' } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState("");
  const [editedLines, setEditedLines] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<FavoriteConfig[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [customPalette, setCustomPalette] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Custom hook for affirmation generation with AbortController support
  const {
    loading: generationLoading,
    loadingProgress: generationProgress,
    loadingMessage: generationMessage,
    previewImages,
    finalImages,
    generatePreviews,
    generateFinal,
    cancelGeneration,
  } = useAffirmationGeneration({
    theme,
    mood,
    layoutStyle,
    userKeywords,
    seed,
    customPalette,
    generatedData,
    setGeneratedData,
    generatePreviewData: () => generatePreviewData(),
  });

  // Custom hook for user actions (editing, favorites, sharing, randomization)
  const {
    handleRandomize,
    startEditing,
    saveEdits,
    cancelEdits,
    toggleFavorite,
    updatePaletteColor,
    resetPalette,
    shareToSocial,
  } = useAffirmationActions({
    theme,
    setTheme,
    mood,
    setMood,
    layoutStyle,
    setLayoutStyle,
    userKeywords,
    seed,
    generatedData,
    setGeneratedData,
    editedHeadline,
    setEditedHeadline,
    editedLines,
    setEditedLines,
    isEditing,
    setIsEditing,
    isFavorite,
    setIsFavorite,
    favorites,
    setFavorites,
    customPalette,
    setCustomPalette,
    setPreviewImagesB64,
    setFinalImagesB64,
    setGeneratedImageB64,
    handleGenerate: async () => await generatePreviews(),
  });

  // Sync hook state with component state
  useEffect(() => {
    setLoading(generationLoading);
    setLoadingProgress(generationProgress);
    setLoadingMessage(generationMessage);
  }, [generationLoading, generationProgress, generationMessage]);

  useEffect(() => {
    if (previewImages.length > 0) {
      setPreviewImagesB64(previewImages);
    }
  }, [previewImages]);

  useEffect(() => {
    if (finalImages.length > 0) {
      setFinalImagesB64(finalImages);
      setViewMode('final');

      // Save first final image to history
      const newHistoryItem: HistoryItem = {
        id: `history-${Date.now()}`,
        imageB64: finalImages[0],
        generatedData,
        timestamp: Date.now()
      };

      // Try to save with progressively smaller history sizes
      let savedSuccessfully = false;
      let maxHistorySize = 5;

      while (!savedSuccessfully && maxHistorySize > 0) {
        try {
          const updatedHistory = [newHistoryItem, ...history].slice(0, maxHistorySize);
          localStorage.setItem('affirmation-history', JSON.stringify(updatedHistory));
          setHistory(updatedHistory);
          savedSuccessfully = true;
        } catch (e) {
          if (e instanceof Error && e.name === 'QuotaExceededError') {
            console.warn(`LocalStorage quota exceeded with ${maxHistorySize} items, reducing...`);
            maxHistorySize--;
            if (maxHistorySize === 0) {
              console.warn('Unable to save to localStorage, keeping in memory only');
              setHistory([newHistoryItem]);
              toast('History saved in memory only (storage full)', { duration: 3000 });
            }
          } else {
            throw e;
          }
        }
      }
    }
  }, [finalImages, generatedData, history]);

  // Check for first-time user
  useEffect(() => {
    const hasVisited = localStorage.getItem('affirmation-builder-visited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('affirmation-builder-visited', 'true');
    }
  }, []);

  // Load favorites and history from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('affirmation-favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }

    const storedHistory = localStorage.getItem('affirmation-history');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  const generatePreviewData = (overrideTheme?: string, overrideMood?: string, overrideLayout?: string): GeneratedData => {
    return generatePreviewDataUtil(theme, mood, layoutStyle, overrideTheme, overrideMood, overrideLayout);
  };

  const handleGenerate = async () => {
    await generatePreviews();
  };

  const handleGenerateUnique = async () => {
    await generateFinal();
  };

  return (
    <>
      <Helmet>
        <title>Affirmation Studio | LunaRituals</title>
        <meta name="description" content="Create custom affirmation posters with AI-powered design. Professional-quality printable art designed to inspire your intentional living journey." />
      </Helmet>

      <div className="min-h-screen bg-background py-8 md:py-16">
        <div className="container-custom max-w-screen-xl mx-auto px-4">
          {/* Header */}
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

          {/* Quick Start Templates - Always Visible */}
          <StaffPresetGallery />

          {/* Mobile: Single Scroll Layout (No Tabs) */}
          <div className="lg:hidden space-y-6">
            {/* Mobile Create Section */}
            <div>
              <Card className="bg-card">
              <CardHeader>
                <CardTitle>Set Your Intention</CardTitle>
                <CardDescription>What do you want to invite into your life?</CardDescription>
              </CardHeader>
              <CardContent>
                <IntentionSelector
                  theme={theme}
                  setTheme={setTheme}
                  mood={mood}
                  setMood={setMood}
                  layoutStyle={layoutStyle}
                  setLayoutStyle={setLayoutStyle}
                  userKeywords={userKeywords}
                  setUserKeywords={setUserKeywords}
                  showAdvanced={showAdvanced}
                  setShowAdvanced={setShowAdvanced}
                  customPalette={customPalette}
                  generatedData={generatedData}
                  updatePaletteColor={updatePaletteColor}
                  resetPalette={resetPalette}
                />

                {/* Action Buttons */}
                <GenerationControls
                  loading={loading}
                  generatedImageB64={generatedImageB64}
                  previewImagesB64={previewImagesB64}
                  finalImagesB64={finalImagesB64}
                  handleGenerate={handleGenerate}
                  handleRandomize={handleRandomize}
                  handleGenerateUnique={handleGenerateUnique}
                  showHelpText={true}
                />
              </CardContent>
            </Card>
            </div>

            {/* Mobile Preview Section */}
            <div>

              <Card className="bg-card">
              <PreviewCardHeader
                isEditing={isEditing}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onStartEditing={startEditing}
                onSaveEdits={saveEdits}
                onCancelEdits={cancelEdits}
                onShareToSocial={shareToSocial}
              />
              <CardContent>
                {generatedImageB64 ? (
                  <MobileSingleImageDisplay imageUrl={generatedImageB64} />
                ) : previewImagesB64.length > 0 ? (
                  <MobilePreviewGrid
                    images={previewImagesB64}
                    selectedImages={selectedImages}
                    onImageClick={(url) => setExpandedImage({ url, type: 'preview' })}
                    onToggleSelection={(index) =>
                      setSelectedImages(prev =>
                        prev.includes(index)
                          ? prev.filter(i => i !== index)
                          : [...prev, index]
                      )
                    }
                    onCompare={() => setShowComparison(true)}
                  />
                ) : (
                  <StaticPreviewDisplay
                    generatedData={generatedData}
                    theme={theme}
                    mood={mood}
                    layoutStyle={layoutStyle}
                    isEditing={isEditing}
                    editedHeadline={editedHeadline}
                    editedLines={editedLines}
                    onHeadlineChange={setEditedHeadline}
                    onLineChange={(index, value) => {
                      const newLines = [...editedLines];
                      newLines[index] = value;
                      setEditedLines(newLines);
                    }}
                    loading={loading}
                    onGenerate={handleGenerateUnique}
                    isMobile={true}
                  />
                )}
              </CardContent>
            </Card>
            </div>
          </div>

          {/* Desktop: Two Column Layout (unchanged) */}
          <div className="hidden lg:grid grid-cols-2 gap-8">
            {/* Left Column: Input Form */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Set Your Intention</CardTitle>
                <CardDescription>What do you want to invite into your life?</CardDescription>
              </CardHeader>
              <CardContent>
                <IntentionSelector
                  theme={theme}
                  setTheme={setTheme}
                  mood={mood}
                  setMood={setMood}
                  layoutStyle={layoutStyle}
                  setLayoutStyle={setLayoutStyle}
                  userKeywords={userKeywords}
                  setUserKeywords={setUserKeywords}
                  showAdvanced={showAdvanced}
                  setShowAdvanced={setShowAdvanced}
                  customPalette={customPalette}
                  generatedData={generatedData}
                  updatePaletteColor={updatePaletteColor}
                  resetPalette={resetPalette}
                  idSuffix="-desktop"
                />

                {/* Action Buttons */}
                <GenerationControls
                  loading={loading}
                  generatedImageB64={generatedImageB64}
                  previewImagesB64={previewImagesB64}
                  finalImagesB64={finalImagesB64}
                  handleGenerate={handleGenerate}
                  handleRandomize={handleRandomize}
                  handleGenerateUnique={handleGenerateUnique}
                  showHelpText={false}
                />
              </CardContent>
            </Card>

            {/* Right Column: Preview (Desktop) */}
            <Card className="bg-card">
              <PreviewCardHeader
                isEditing={isEditing}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onStartEditing={startEditing}
                onSaveEdits={saveEdits}
                onCancelEdits={cancelEdits}
                onShareToSocial={shareToSocial}
              />
              <CardContent>
                {/* View Toggle Buttons - Show when both preview and final exist */}
                {previewImagesB64.length > 0 && finalImagesB64.length > 0 && (
                  <div className="flex gap-2 mb-6">
                    <Button
                      variant={viewMode === 'preview' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setViewMode('preview')}
                    >
                      Preview Images
                    </Button>
                    <Button
                      variant={viewMode === 'final' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setViewMode('final')}
                    >
                      Final Images
                    </Button>
                  </div>
                )}

                {/* Final Images Section - Only show when in final view mode */}
                {viewMode === 'final' && (
                  <ImageGalleryGrid
                    images={finalImagesB64}
                    type="final"
                    onImageClick={(url) => setExpandedImage({ url, type: 'final' })}
                    showShopButton={true}
                  />
                )}

                {/* Preview Images Section - Only show when in preview view mode */}
                {viewMode === 'preview' && (
                  <ImageGalleryGrid
                    images={previewImagesB64}
                    type="preview"
                    onImageClick={(url) => setExpandedImage({ url, type: 'preview' })}
                    showHelpText={finalImagesB64.length === 0}
                  />
                )}

                {/* Static Preview when no images */}
                {previewImagesB64.length === 0 && finalImagesB64.length === 0 && (
                  <StaticPreviewDisplay
                    generatedData={generatedData}
                    theme={theme}
                    mood={mood}
                    layoutStyle={layoutStyle}
                    isEditing={isEditing}
                    editedHeadline={editedHeadline}
                    editedLines={editedLines}
                    onHeadlineChange={setEditedHeadline}
                    onLineChange={(index, value) => {
                      const newLines = [...editedLines];
                      newLines[index] = value;
                      setEditedLines(newLines);
                    }}
                    loading={loading}
                    onGenerate={handleGenerateUnique}
                    isMobile={false}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Affirmation Studio Section */}
        <WhyAffirmationStudio />

        {/* Reviews Section */}
        <ReviewsSection />
      </div>

      {/* Image Expansion Dialog */}
      <ExpandedImageModal expandedImage={expandedImage} onClose={() => setExpandedImage(null)} />
    </>
  );
};

export default AffirmationBuilder;
