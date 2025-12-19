import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IntentionSelector } from './IntentionSelector';
import { GenerationControls } from './GenerationControls';
import { PreviewCardHeader } from './PreviewCardHeader';
import { ImageGalleryGrid } from './ImageGalleryGrid';
import { StaticPreviewDisplay } from './StaticPreviewDisplay';

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string;
}

interface DesktopViewProps {
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
  viewMode: 'preview' | 'final';
  setViewMode: (mode: 'preview' | 'final') => void;
  setExpandedImage: (image: { url: string; type: 'preview' | 'final' } | null) => void;
  editedHeadline: string;
  setEditedHeadline: (headline: string) => void;
  editedLines: string[];
  setEditedLines: (lines: string[]) => void;
}

/**
 * Desktop-specific view layout
 * Two-column layout with input form on left and preview on right
 */
export function DesktopView({
  theme, setTheme, mood, setMood, layoutStyle, setLayoutStyle,
  userKeywords, setUserKeywords, showAdvanced, setShowAdvanced,
  customPalette, generatedData, updatePaletteColor, resetPalette,
  loading, generatedImageB64, previewImagesB64, finalImagesB64,
  handleGenerate, handleRandomize, handleGenerateUnique,
  isEditing, isFavorite, toggleFavorite, startEditing, saveEdits, cancelEdits, shareToSocial,
  viewMode, setViewMode, setExpandedImage,
  editedHeadline, setEditedHeadline, editedLines, setEditedLines,
}: DesktopViewProps) {
  return (
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
  );
}
