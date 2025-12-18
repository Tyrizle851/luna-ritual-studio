import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IntentionSelector } from './IntentionSelector';
import { GenerationControls } from './GenerationControls';
import { PreviewCardHeader } from './PreviewCardHeader';
import { MobileSingleImageDisplay } from './MobileSingleImageDisplay';
import { MobilePreviewGrid } from './MobilePreviewGrid';
import { StaticPreviewDisplay } from './StaticPreviewDisplay';
import { ShimmerLoading } from './ShimmerLoading';
import { LOCAL_DIGITAL_IMAGES } from '@/lib/localDigitalImages';

// Initial placeholder image shown on first load
const miraclesPreviewImg = LOCAL_DIGITAL_IMAGES["aff-017"]; // "I am open to miracles"

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
}

interface MobileViewProps {
  theme: string;
  setTheme: (theme: string) => void;
  mood: string;
  setMood: (mood: string) => void;
  layoutStyle: string;
  setLayoutStyle: (layout: string) => void;
  userKeywords: string;
  setUserKeywords: (keywords: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  customPalette: string[];
  generatedData: GeneratedData;
  updatePaletteColor: (index: number, color: string) => void;
  resetPalette: () => void;
  loading: boolean;
  generatedImageB64: string | null;
  previewImagesB64: string[];
  finalImagesB64: string[];
  handleGenerate: () => void;
  handleRandomize: () => void;
  handleGenerateUnique: () => void;
  isEditing: boolean;
  isFavorite: boolean;
  toggleFavorite: () => void;
  startEditing: () => void;
  saveEdits: () => void;
  cancelEdits: () => void;
  shareToSocial: (platform: string) => void;
  selectedImages: number[];
  setSelectedImages: (indices: number[]) => void;
  setExpandedImage: (image: { url: string; type: 'preview' | 'final' } | null) => void;
  setShowComparison: (show: boolean) => void;
  editedHeadline: string;
  setEditedHeadline: (headline: string) => void;
  editedLines: string[];
  setEditedLines: (lines: string[]) => void;
}

/**
 * Mobile-specific view layout
 * Vertical single-scroll layout with create and preview sections
 */
export function MobileView({
  theme, setTheme, mood, setMood, layoutStyle, setLayoutStyle,
  userKeywords, setUserKeywords, showAdvanced, setShowAdvanced,
  customPalette, generatedData, updatePaletteColor, resetPalette,
  loading, generatedImageB64, previewImagesB64, finalImagesB64,
  handleGenerate, handleRandomize, handleGenerateUnique,
  isEditing, isFavorite, toggleFavorite, startEditing, saveEdits, cancelEdits, shareToSocial,
  selectedImages, setSelectedImages, setExpandedImage, setShowComparison,
  editedHeadline, setEditedHeadline, editedLines, setEditedLines,
}: MobileViewProps) {
  return (
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
            {loading ? (
              // ✅ Show premium shimmer loading state while generating
              <ShimmerLoading message="Creating your affirmation..." />
            ) : generatedImageB64 ? (
              <MobileSingleImageDisplay imageUrl={generatedImageB64} />
            ) : previewImagesB64.length === 1 && previewImagesB64[0] === miraclesPreviewImg ? (
              // ✅ FIX: Show initial placeholder as full-width hero image (not in grid)
              <div className="w-full aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src={previewImagesB64[0]}
                  alt="Example preview - I am open to miracles"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : previewImagesB64.length > 0 ? (
              <MobilePreviewGrid
                images={previewImagesB64}
                selectedImages={selectedImages}
                onImageClick={(url) => setExpandedImage({ url, type: 'preview' })}
                onToggleSelection={(index) => {
                  const newSelected = selectedImages.includes(index)
                    ? selectedImages.filter(i => i !== index)
                    : [...selectedImages, index];
                  setSelectedImages(newSelected);
                }}
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
  );
}
