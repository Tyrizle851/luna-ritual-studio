import { useState, useRef } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { supabase } from '@/integrations/supabase/client';
import { buildDesignSpec } from '@/lib/designSpecBuilder';
import type { ThemeSlug, MoodSlug, LayoutArchetype } from '@/types/design-spec';

interface GeneratedData {
  headline: string;
  supportingLines: string[];
  palette: string[];
  paletteNames: string[];
  layoutStyle: string;
  accentElements: string[];
}

interface UseAffirmationGenerationProps {
  theme: string;
  mood: string;
  layoutStyle: string;
  userKeywords: string;
  seed: string;
  customPalette: string[];
  generatedData: GeneratedData | null;
  setGeneratedData: (data: GeneratedData) => void;
  generatePreviewData: () => GeneratedData;
}

interface UseAffirmationGenerationReturn {
  loading: boolean;
  loadingProgress: number;
  loadingMessage: string;
  previewImages: string[];
  finalImages: string[];
  generatePreviews: () => Promise<void>;
  generateFinal: () => Promise<void>;
  cancelGeneration: () => void;
}

export function useAffirmationGeneration({
  theme,
  mood,
  layoutStyle,
  userKeywords,
  seed,
  customPalette,
  generatedData,
  setGeneratedData,
  generatePreviewData,
}: UseAffirmationGenerationProps): UseAffirmationGenerationReturn {
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [finalImages, setFinalImages] = useState<string[]>([]);

  // AbortController for request cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
      setLoadingProgress(0);
      setLoadingMessage('');
      toast.info('Generation cancelled');
    }
  };

  const generatePreviews = async () => {
    // Cancel any existing generation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setPreviewImages([]);
    setLoadingProgress(0);
    setLoadingMessage('Preparing your design...');

    try {
      // Use existing preview data or generate new
      const preview = generatedData || generatePreviewData();
      if (!generatedData) {
        // Apply custom palette if set
        if (customPalette.length > 0) {
          preview.palette = customPalette;
          preview.paletteNames = customPalette;
        }
        setGeneratedData(preview);
      }

      setLoadingProgress(10);
      setLoadingMessage('Creating 4 unique watercolor variations...');

      toast.info('✨ Creating 4 preview variations for you... (~30 seconds)');

      // Simulate progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 5, 90));
      }, 1500);

      // Generate 4 preview images in parallel
      const requests = Array(4).fill(null).map(() =>
        supabase.functions.invoke('generate-preview-image', {
          body: {
            headline: preview.headline,
            supportingLines: preview.supportingLines,
            theme,
            mood,
            layout: preview.layoutStyle,
            palette: preview.palette,
            accentElements: preview.accentElements,
          },
        })
      );

      const results = await Promise.all(requests);

      // Check if cancelled
      if (abortControllerRef.current?.signal.aborted) {
        clearInterval(progressInterval);
        return;
      }

      clearInterval(progressInterval);

      setLoadingProgress(95);
      setLoadingMessage('Finalizing your previews...');

      const successfulImages = results
        .filter(result => !result.error && result.data?.imageB64)
        .map(result => `data:image/png;base64,${result.data.imageB64}`);

      if (successfulImages.length > 0) {
        setLoadingProgress(100);
        setPreviewImages(successfulImages);
        toast.success(
          `🎨 ${successfulImages.length} beautiful preview${
            successfulImages.length > 1 ? 's' : ''
          } ready! Pick your favorite to refine.`
        );

        // Celebrate with confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4B896', '#8B7355', '#F5F1E8'],
        });
      } else {
        toast.error(
          "We're having trouble creating your preview. This usually resolves quickly - try again?"
        );
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Silently handle cancellation
        return;
      }
      console.error('Preview error:', error);
      toast.error('Oops! Something went wrong. Please try again or adjust your settings.');
    } finally {
      setLoading(false);
      setLoadingProgress(0);
      setLoadingMessage('');
      abortControllerRef.current = null;
    }
  };

  const generateFinal = async () => {
    // Cancel any existing generation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setFinalImages([]);
    setLoadingProgress(0);
    setLoadingMessage('Preparing print-quality designs...');

    try {
      // Ensure we have preview data first
      if (!generatedData) {
        toast.error('Please generate previews first');
        return;
      }

      setLoadingProgress(10);
      setLoadingMessage('Building your high-resolution designs...');

      // Layout mapping
      const layoutMap: Record<string, LayoutArchetype> = {
        'vintage': 'arc-flow',
        'clean-serif': 'floating-cluster',
        'botanical': 'botanical-frame',
        'grid': 'editorial-grid-luxe',
        'halo': 'circle-harmony',
        'organic': 'arc-flow',
        'geometric': 'editorial-grid-luxe',
        'celestial': 'radiant-center-burst',
        'minimal-zen': 'floating-cluster',
        'grit': 'asymmetric-balance',
        'scattered-organic': 'pebble-scatter',
        'flowing-curves': 'arc-flow',
        'angular-grid': 'editorial-grid-luxe',
        'circular-orbit': 'circle-harmony',
        'diagonal-dynamic': 'asymmetric-balance',
        'layered-depth': 'floating-cluster',
        'vertical-cascade': 'vertical-flow',
        'horizontal-sweep': 'soft-anchor-left',
        'corner-radial': 'radiant-center-burst',
        'spiral-flow': 'golden-spiral',
        'stepped-rhythm': 'gentle-column',
        'arch-composition': 'arc-flow',
        'split-panel': 'soft-anchor-left',
        'wave-pattern': 'ribbon-drift',
        'botanical-branch': 'botanical-frame',
        'minimal-focus': 'minimal-horizon',
        'centered-stack': 'centered-serenity',
        'centered-serenity': 'centered-serenity',
        'vertical-flow': 'vertical-flow',
        'floating-cluster': 'floating-cluster',
        'asymmetric-balance': 'asymmetric-balance',
        'arc-flow': 'arc-flow',
        'golden-spiral': 'golden-spiral',
        'botanical-frame': 'botanical-frame',
        'minimal-horizon': 'minimal-horizon',
        'radiant-center-burst': 'radiant-center-burst',
        'soft-anchor-left': 'soft-anchor-left',
        'soft-anchor-right': 'soft-anchor-right',
        'gentle-column': 'gentle-column',
        'pebble-scatter': 'pebble-scatter',
        'circle-harmony': 'circle-harmony',
        'prayer-stack': 'prayer-stack',
        'ribbon-drift': 'ribbon-drift',
        'editorial-grid-luxe': 'editorial-grid-luxe',
        'calm-waterfall': 'calm-waterfall',
        'sacred-geometry': 'sacred-geometry',
        'breath-space-minimal': 'breath-space-minimal',
      };

      const layoutArchetype =
        layoutMap[layoutStyle?.toLowerCase()] || layoutMap[layoutStyle] || 'asymmetric-balance';

      // Get active palette
      const activePalette = customPalette.length > 0 ? customPalette : generatedData.palette;

      // Build design spec
      const designSpec = buildDesignSpec({
        theme: theme as ThemeSlug,
        mood: mood as MoodSlug,
        layoutOverride: layoutArchetype,
        keywords: userKeywords,
        seed: seed ? parseInt(seed) : undefined,
        customPaletteHex: activePalette,
        customHeadline: generatedData.headline,
        customSupportingPhrases: generatedData.supportingLines,
      });

      toast.info('✨ Creating your print-quality affirmations... (~60 seconds)');

      setLoadingProgress(20);
      setLoadingMessage('Rendering 4 print-quality variations (300 DPI)...');

      // Simulate progress (60 second estimate)
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 3, 90));
      }, 2000);

      // Generate 4 final images in parallel
      const requests = Array(4).fill(null).map(() =>
        supabase.functions.invoke('generate-affirmation-image', {
          body: { designSpec },
        })
      );

      const results = await Promise.all(requests);

      // Check if cancelled
      if (abortControllerRef.current?.signal.aborted) {
        clearInterval(progressInterval);
        return;
      }

      clearInterval(progressInterval);

      setLoadingProgress(95);
      setLoadingMessage('Finalizing your print-ready images...');

      // Check for errors
      const hasErrors = results.some(result => {
        if (result.error) {
          console.error('Edge function error:', result.error);
          const errorMessage = result.error.message || JSON.stringify(result.error);
          if (
            errorMessage.includes('402') ||
            errorMessage.includes('credits depleted') ||
            errorMessage.includes('payment')
          ) {
            toast.error('Generation limit reached. Please check your account to continue creating.');
            return true;
          } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
            toast.error('Rate limit exceeded. Please wait a moment and try again.');
            return true;
          }
          return true;
        }
        if (result.data?.error) {
          console.error('API error:', result.data.error);
          if (
            result.data.error.includes('credits depleted') ||
            result.data.error.includes('payment')
          ) {
            toast.error('Generation limit reached. Please check your account to continue creating.');
            return true;
          } else if (result.data.error.includes('rate limit')) {
            toast.error('Rate limit exceeded. Please wait a moment and try again.');
            return true;
          }
          return true;
        }
        return false;
      });

      if (hasErrors) {
        return;
      }

      const successfulImages = results
        .filter(result => result.data?.imageB64)
        .map(result => `data:image/png;base64,${result.data.imageB64}`);

      if (successfulImages.length > 0) {
        setLoadingProgress(100);
        setFinalImages(successfulImages);
        toast.success(
          `🎉 ${successfulImages.length} print-ready image${
            successfulImages.length > 1 ? 's' : ''
          } created! Download your favorite.`
        );

        // Big celebration for final images!
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
          colors: ['#D4B896', '#8B7355', '#F5F1E8', '#3a2817'],
        };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      } else {
        toast.error("We couldn't create your final images. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Silently handle cancellation
        return;
      }
      console.error('Final generation error:', error);
      toast.error('Oops! Something went wrong. Please try again or adjust your settings.');
    } finally {
      setLoading(false);
      setLoadingProgress(0);
      setLoadingMessage('');
      abortControllerRef.current = null;
    }
  };

  return {
    loading,
    loadingProgress,
    loadingMessage,
    previewImages,
    finalImages,
    generatePreviews,
    generateFinal,
    cancelGeneration,
  };
}
