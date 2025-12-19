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
import { PageHeader } from "./AffirmationBuilder/components/PageHeader";
import { MobileView } from "./AffirmationBuilder/components/MobileView";
import { DesktopView } from "./AffirmationBuilder/components/DesktopView";

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
          <PageHeader
            previewImagesB64={previewImagesB64}
            finalImagesB64={finalImagesB64}
            showOnboarding={showOnboarding}
            setShowOnboarding={setShowOnboarding}
            showComparison={showComparison}
            setShowComparison={setShowComparison}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            setExpandedImage={setExpandedImage}
            loading={loading}
            loadingProgress={loadingProgress}
            loadingMessage={loadingMessage}
            showGallery={showGallery}
            setShowGallery={setShowGallery}
            history={history}
            setGeneratedImageB64={setGeneratedImageB64}
            setGeneratedData={setGeneratedData}
          />

          {/* Quick Start Templates - Always Visible */}
          <StaffPresetGallery />

          {/* Mobile: Single Scroll Layout (No Tabs) */}
          <MobileView
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
            loading={loading}
            generatedImageB64={generatedImageB64}
            previewImagesB64={previewImagesB64}
            finalImagesB64={finalImagesB64}
            handleGenerate={handleGenerate}
            handleRandomize={handleRandomize}
            handleGenerateUnique={handleGenerateUnique}
            isEditing={isEditing}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            startEditing={startEditing}
            saveEdits={saveEdits}
            cancelEdits={cancelEdits}
            shareToSocial={shareToSocial}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            setExpandedImage={setExpandedImage}
            setShowComparison={setShowComparison}
            editedHeadline={editedHeadline}
            setEditedHeadline={setEditedHeadline}
            editedLines={editedLines}
            setEditedLines={setEditedLines}
          />

          {/* Desktop: Two Column Layout (unchanged) */}
          <DesktopView
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
            loading={loading}
            generatedImageB64={generatedImageB64}
            previewImagesB64={previewImagesB64}
            finalImagesB64={finalImagesB64}
            handleGenerate={handleGenerate}
            handleRandomize={handleRandomize}
            handleGenerateUnique={handleGenerateUnique}
            isEditing={isEditing}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            startEditing={startEditing}
            saveEdits={saveEdits}
            cancelEdits={cancelEdits}
            shareToSocial={shareToSocial}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setExpandedImage={setExpandedImage}
            editedHeadline={editedHeadline}
            setEditedHeadline={setEditedHeadline}
            editedLines={editedLines}
            setEditedLines={setEditedLines}
          />
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
