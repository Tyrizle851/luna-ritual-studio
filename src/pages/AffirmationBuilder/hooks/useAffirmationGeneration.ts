import { useState, useRef } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { supabase } from '@/integrations/supabase/client';
import type { GeneratedData } from '../types';

interface UseAffirmationGenerationProps {
  prompt: string;
  userKeywords: string;
  seed: string;
  customPalette: string[];
  generatedData: GeneratedData | null;
  setGeneratedData: (data: GeneratedData) => void;
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
  prompt,
  userKeywords,
  seed,
  customPalette,
  generatedData,
  setGeneratedData,
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
    // Validate prompt exists
    if (!prompt.trim()) {
      toast.error('Please enter a prompt or click Randomize to generate one');
      return;
    }

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
      // Build full prompt with keywords and colors
      let fullPrompt = prompt;
      
      // Append user keywords if provided
      if (userKeywords.trim()) {
        fullPrompt += `\n\nAdditional elements to include: ${userKeywords}`;
      }
      
      // Append custom colors if provided
      if (customPalette.length >= 3) {
        fullPrompt += `\n\nUse these specific colors: Primary: ${customPalette[0]}, Secondary: ${customPalette[1]}, Accent: ${customPalette[2]}`;
      }

      setLoadingProgress(10);
      setLoadingMessage('Creating 4 unique variations...');

      toast.info('✨ Creating 4 preview variations for you... (~30 seconds)');

      // Simulate progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 5, 90));
      }, 1500);

      // Generate 4 preview images in parallel - send the full prompt directly
      const requests = Array(4).fill(null).map(() =>
        supabase.functions.invoke('generate-preview-image', {
          body: {
            prompt: fullPrompt,
            headline: generatedData?.headline || 'AFFIRMATION',
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
    // Validate prompt exists
    if (!prompt.trim()) {
      toast.error('Please enter a prompt or click Randomize to generate one');
      return;
    }

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
      setLoadingProgress(10);
      setLoadingMessage('Building your high-resolution designs...');

      // Build full prompt with keywords and colors - enhanced for print quality
      let fullPrompt = prompt;
      
      // Append user keywords if provided
      if (userKeywords.trim()) {
        fullPrompt += `\n\nAdditional elements to include: ${userKeywords}`;
      }
      
      // Append custom colors if provided
      if (customPalette.length >= 3) {
        fullPrompt += `\n\nUse these specific colors: Primary: ${customPalette[0]}, Secondary: ${customPalette[1]}, Accent: ${customPalette[2]}`;
      }

      // Add print quality requirements
      fullPrompt += `\n\nPRINT QUALITY REQUIREMENTS:
• Resolution: 300 DPI, print-ready
• Dimensions: 2400×3000 pixels (8×10" format)
• Text must be RAZOR SHARP and perfectly readable
• Gallery-worthy, professional quality`;

      toast.info('✨ Creating your print-quality affirmations... (~60 seconds)');

      setLoadingProgress(20);
      setLoadingMessage('Rendering 4 print-quality variations (300 DPI)...');

      // Simulate progress (60 second estimate)
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 3, 90));
      }, 2000);

      // Generate 4 final images in parallel - send the full prompt directly
      const requests = Array(4).fill(null).map(() =>
        supabase.functions.invoke('generate-affirmation-image', {
          body: { 
            prompt: fullPrompt,
            headline: generatedData?.headline || 'AFFIRMATION',
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
