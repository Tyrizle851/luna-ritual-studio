import { toast } from 'sonner';
import { generateRandomPrompt, deriveColorsFromPrompt, extractHeadlineFromPrompt } from '../utils/promptGenerator';
import type { GeneratedData, FavoriteConfig } from '../types';

interface UseAffirmationActionsProps {
  prompt: string;
  setPrompt: (value: string) => void;
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
}

/**
 * Custom hook for affirmation actions (editing, favorites, sharing, randomization)
 * Encapsulates all user interaction logic separate from the main component
 */
export function useAffirmationActions({
  prompt,
  setPrompt,
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
}: UseAffirmationActionsProps) {

  const handleRandomize = () => {
    // Generate a new random prompt
    const { prompt: newPrompt, colors, headline } = generateRandomPrompt();
    
    setPrompt(newPrompt);
    setCustomPalette(colors);
    setPreviewImagesB64([]);
    setFinalImagesB64([]);
    setGeneratedImageB64(null);

    // Update generated data with new headline and colors
    setGeneratedData({
      ...generatedData,
      headline,
      palette: colors,
      paletteNames: colors,
    });

    toast.success('New prompt generated!');
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
      id: `prompt-${Date.now()}`,
      theme: 'custom',
      mood: 'custom',
      layoutStyle: '',
      userKeywords,
      seed,
      generatedData,
      timestamp: Date.now()
    };

    let updatedFavorites: FavoriteConfig[];
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(f => f.id !== currentConfig.id);
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
    const currentPalette = customPalette.length >= 3 
      ? customPalette 
      : ["#F5F1E8", "#D4B896", "#8B7355"];
    const newPalette = [...currentPalette];
    newPalette[index] = color;
    setCustomPalette(newPalette);
    setGeneratedData({
      ...generatedData,
      palette: newPalette,
      paletteNames: newPalette
    });
  };

  const resetPalette = () => {
    // Derive colors from current prompt
    const derivedColors = deriveColorsFromPrompt(prompt);
    setCustomPalette(derivedColors);
    setGeneratedData({
      ...generatedData,
      palette: derivedColors,
      paletteNames: derivedColors
    });
    toast.success('Colors derived from prompt');
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
