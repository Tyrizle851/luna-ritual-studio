import { toast } from 'sonner';
import { generatePreviewData as generatePreviewDataUtil } from '../utils/affirmationDataGenerator';
import type { GeneratedData, FavoriteConfig } from '../types';

interface UseAffirmationActionsProps {
  theme: string;
  setTheme: (value: string) => void;
  mood: string;
  setMood: (value: string) => void;
  layoutStyle: string;
  setLayoutStyle: (value: string) => void;
  userKeywords: string;
  seed: string;
  generatedData: GeneratedData;
  setGeneratedData: (data: GeneratedData) => void;
  editedHeadline: string;
  setEditedHeadline: (value: string) => void;
  editedLines: string[];
  setEditedLines: (lines: string[]) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
  favorites: FavoriteConfig[];
  setFavorites: (favorites: FavoriteConfig[]) => void;
  customPalette: string[];
  setCustomPalette: (palette: string[]) => void;
  setPreviewImagesB64: (images: string[]) => void;
  setFinalImagesB64: (images: string[]) => void;
  setGeneratedImageB64: (image: string | null) => void;
  handleGenerate: () => void;
}

/**
 * Custom hook for affirmation actions (editing, favorites, sharing, randomization)
 * Encapsulates all user interaction logic separate from the main component
 */
export function useAffirmationActions({
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
  handleGenerate,
}: UseAffirmationActionsProps) {

  const handleRandomize = () => {
    const themes = ["confidence", "peace", "focus", "gratitude", "abundance", "healing", "strength", "joy", "balance", "courage", "clarity", "renewal", "freedom", "passion", "wisdom"];
    const moods = ["minimalist", "bohemian", "modern-serif", "coastal", "earthy", "vibrant", "pastel", "monochrome", "sunset", "forest"];
    const allLayouts = ["centered-serenity", "vertical-flow", "floating-cluster", "asymmetric-balance", "arc-flow", "golden-spiral", "botanical-frame", "minimal-horizon", "radiant-center-burst", "soft-anchor-left", "soft-anchor-right", "gentle-column", "pebble-scatter", "circle-harmony", "prayer-stack", "ribbon-drift", "editorial-grid-luxe", "calm-waterfall", "sacred-geometry", "breath-space-minimal"];

    const newTheme = themes[Math.floor(Math.random() * themes.length)];
    const newMood = moods[Math.floor(Math.random() * moods.length)];
    const newLayout = allLayouts[Math.floor(Math.random() * allLayouts.length)];

    setTheme(newTheme);
    setMood(newMood);
    setLayoutStyle(newLayout);
    setPreviewImagesB64([]);
    setFinalImagesB64([]);
    setGeneratedImageB64(null);

    // Generate new preview data immediately with the new selections
    const newData = generatePreviewDataUtil(newTheme, newMood, newLayout);
    setGeneratedData(newData);

    toast.success('Randomized! Preview updated.');
  };

  const startEditing = () => {
    setEditedHeadline(generatedData.headline);
    setEditedLines([...generatedData.supportingLines]);
    setIsEditing(true);
  };

  const saveEdits = () => {
    setGeneratedData({
      ...generatedData,
      headline: editedHeadline,
      supportingLines: editedLines
    });
    setIsEditing(false);
    toast.success('Changes saved!');
  };

  const cancelEdits = () => {
    setIsEditing(false);
    setEditedHeadline("");
    setEditedLines([]);
  };

  const toggleFavorite = () => {
    const currentConfig: FavoriteConfig = {
      id: `${theme}-${mood}-${Date.now()}`,
      theme,
      mood,
      layoutStyle,
      userKeywords,
      seed,
      generatedData,
      timestamp: Date.now()
    };

    let updatedFavorites: FavoriteConfig[];
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(f =>
        !(f.theme === theme && f.mood === mood && f.layoutStyle === layoutStyle)
      );
      setIsFavorite(false);
      toast.success('Removed from favorites');
    } else {
      // Add to favorites (max 10)
      updatedFavorites = [currentConfig, ...favorites].slice(0, 10);
      setIsFavorite(true);
      toast.success('Added to favorites!');
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('affirmation-favorites', JSON.stringify(updatedFavorites));
  };

  const updatePaletteColor = (index: number, color: string) => {
    const newPalette = [...(customPalette.length > 0 ? customPalette : generatedData.palette)];
    newPalette[index] = color;
    setCustomPalette(newPalette);
    setGeneratedData({
      ...generatedData,
      palette: newPalette,
      paletteNames: newPalette
    });
  };

  const resetPalette = () => {
    setCustomPalette([]);
    handleGenerate();
    toast.success('Palette reset to default');
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(`${generatedData.headline}\n\n${generatedData.supportingLines.slice(0, 3).join(' • ')}\n\nCreated with Minimaluxe Affirmation Builder`);
    const url = encodeURIComponent(window.location.href);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
      copy: ''
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${generatedData.headline}\n\n${generatedData.supportingLines.slice(0, 3).join('\n')}\n\nCreated with Minimaluxe Affirmation Builder - ${window.location.href}`);
      toast.success('Caption copied to clipboard!');
    } else {
      window.open(urls[platform], '_blank');
    }
  };

  return {
    handleRandomize,
    startEditing,
    saveEdits,
    cancelEdits,
    toggleFavorite,
    updatePaletteColor,
    resetPalette,
    shareToSocial,
  };
}
