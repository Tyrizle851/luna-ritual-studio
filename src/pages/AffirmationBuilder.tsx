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

import reviewerSarah from "@/assets/reviewer-sarah.jpg";
import reviewerJessica from "@/assets/reviewer-jessica.jpg";
import reviewerMichael from "@/assets/reviewer-michael.jpg";

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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Generated affirmation design</CardDescription>
                </div>
                <div className="flex gap-2">
                  {!isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleFavorite}
                        className={isFavorite ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={startEditing}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
                            Share to X/Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
                            Share to Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('pinterest')}>
                            Pin to Pinterest
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('copy')}>
                            Copy Caption
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={saveEdits}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={cancelEdits}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedImageB64 ? (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border">
                      <img 
                        src={generatedImageB64} 
                        alt="Generated Affirmation" 
                        className="w-full h-auto"
                      />
                    </div>
                    
                    {/* Image Info */}
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Resolution</p>
                          <p className="text-foreground text-sm font-medium">1024 x 1024px</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Aspect Ratio</p>
                          <p className="text-foreground text-sm font-medium">1:1 (Square)</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">Format</p>
                        <p className="text-foreground text-sm font-medium">High Quality PNG</p>
                      </div>
                    </div>

                    {/* Download & Shop Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'original', 'final')}>
                            Original Size
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'instagram-square', 'final')}>
                            Instagram Square (1080x1080)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'instagram-story', 'final')}>
                            Instagram Story (1080x1920)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'print-8x10', 'final')}>
                            Print 8x10
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatedImageB64 && downloadImage(generatedImageB64, 'print-11x14', 'final')}>
                            Print 11x14
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          window.open('/shop', '_blank');
                          toast.success('Opening shop...');
                        }}
                      >
                        <span className="mr-2">🛒</span>
                        Shop Prints
                      </Button>
                    </div>
                  </div>
                ) : previewImagesB64.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {previewImagesB64.map((imageUrl, index) => (
                        <div
                          key={index}
                          className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                            selectedImages.includes(index) ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-[#3a2817]'
                          }`}
                          style={{ aspectRatio: '4/5' }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onClick={() => setExpandedImage({ url: imageUrl, type: 'preview' })}
                          />
                          <div className="absolute top-1 right-1 bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs font-semibold">
                            Preview
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImages(prev =>
                                prev.includes(index)
                                  ? prev.filter(i => i !== index)
                                  : [...prev, index]
                              );
                            }}
                            className="absolute top-1 left-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                          >
                            {selectedImages.includes(index) && <Check className="h-4 w-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                    {selectedImages.length >= 2 && (
                      <Button
                        onClick={() => setShowComparison(true)}
                        variant="outline"
                        className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        Compare Selected ({selectedImages.length})
                      </Button>
                    )}
                    <p className="text-sm text-muted-foreground text-center">
                      {selectedImages.length > 0
                        ? `Select 2 or more to compare • ${selectedImages.length} selected`
                        : "Click checkboxes to select favorites for comparison"}
                    </p>
                  </div>
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Generated affirmation design</CardDescription>
                </div>
                <div className="flex gap-2">
                  {!isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleFavorite}
                        className={isFavorite ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={startEditing}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
                            Share to X/Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
                            Share to Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('pinterest')}>
                            Pin to Pinterest
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('copy')}>
                            Copy Caption
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={saveEdits}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={cancelEdits}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
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

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-border/50">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-clay mb-4">What Our Community Says</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from people transforming their spaces with Affirmation Studio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 - 4.8 Stars */}
            <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
              <div className="p-6">
                {/* Stars - 4.8/5 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5" viewBox="0 0 20 20">
                      <defs>
                        <linearGradient id="partial-fill">
                          <stop offset="80%" stopColor="hsl(var(--clay))" />
                          <stop offset="80%" stopColor="#e5e7eb" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#partial-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-foreground">4.8/5</span>
                </div>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={reviewerSarah} 
                    alt="Sarah M." 
                    className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Sarah M.</p>
                    <p className="text-xs text-muted-foreground">Verified User</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">Perfect for My Morning Routine</h3>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "I've printed three different affirmations and they're now framed in my bedroom. The quality is incredible and the designs are so calming. It's the first thing I see every morning."
                </p>
              </div>
            </div>

            {/* Review 2 - 5 Stars */}
            <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in [animation-delay:100ms]">
              <div className="p-6">
                {/* Stars - 5/5 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">5/5</span>
                </div>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={reviewerJessica} 
                    alt="Jessica T." 
                    className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Jessica T.</p>
                    <p className="text-xs text-muted-foreground">Verified User</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">Better Than Etsy Options</h3>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "I used to buy generic affirmation prints on Etsy, but this is on another level. The customization options let me create something that actually speaks to MY goals."
                </p>
              </div>
            </div>

            {/* Review 3 - 5 Stars */}
            <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in [animation-delay:200ms]">
              <div className="p-6">
                {/* Stars - 5/5 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">5/5</span>
                </div>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={reviewerMichael} 
                    alt="Michael R." 
                    className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Michael R.</p>
                    <p className="text-xs text-muted-foreground">Verified User</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">So Easy to Use</h3>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "I'm not tech-savvy at all, but this was incredibly simple. Within minutes I had a beautiful affirmation designed and downloaded. Already shared it on Instagram!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Expansion Dialog */}
      <ExpandedImageModal expandedImage={expandedImage} onClose={() => setExpandedImage(null)} />
    </>
  );
};

export default AffirmationBuilder;
