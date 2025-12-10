import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DisplayVariation } from "@/data/affirmations";
import { hasLocalDigitalImage, getLocalDigitalImage } from "@/lib/localDigitalImages";

interface DisplayImageResult {
  imageUrl: string | null;
  isLoading: boolean;
  variationType: DisplayVariation | null;
}

// Cache for display images to avoid refetching (only for Supabase images)
const displayImageCache = new Map<string, { url: string; variation: DisplayVariation }>();

// Random variation assignment per session (stable during page view)
const sessionVariations = new Map<string, DisplayVariation>();

// Cache buster to force refresh
let cacheBuster = Date.now();

export function clearDisplayImageCache() {
  displayImageCache.clear();
  sessionVariations.clear();
  cacheBuster = Date.now();
}

function getSessionVariation(productId: string): DisplayVariation {
  if (!sessionVariations.has(productId)) {
    const variations: DisplayVariation[] = ["canvas", "unframed", "framed"];
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    sessionVariations.set(productId, randomVariation);
  }
  return sessionVariations.get(productId)!;
}

export function useAffirmationDisplayImage(productId: string | null): DisplayImageResult {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [variationType, setVariationType] = useState<DisplayVariation | null>(null);

  // Get stable variation for this product
  const targetVariation = useMemo(() => {
    if (!productId) return null;
    return getSessionVariation(productId);
  }, [productId]);

  useEffect(() => {
    if (!productId || !targetVariation) {
      setImageUrl(null);
      setVariationType(null);
      return;
    }

    // PRIORITY 1: Check for local user-provided image FIRST
    // Local images always win - they're the "digital" variation for display
    if (hasLocalDigitalImage(productId)) {
      const localImage = getLocalDigitalImage(productId);
      if (localImage) {
        setImageUrl(localImage);
        setVariationType("canvas"); // Display as canvas variation for local images
        setIsLoading(false);
        return;
      }
    }

    // PRIORITY 2: Check Supabase cache
    const cacheKey = `${productId}-${targetVariation}-${cacheBuster}`;
    if (displayImageCache.has(cacheKey)) {
      const cached = displayImageCache.get(cacheKey)!;
      setImageUrl(cached.url);
      setVariationType(cached.variation);
      return;
    }

    const fetchDisplayImage = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("product_images")
          .select("image_url, variation_type")
          .eq("product_id", productId)
          .eq("product_category", "affirmations")
          .eq("variation_type", targetVariation)
          .single();

        if (error || !data) {
          // Fallback: try to get any non-digital variation
          const { data: fallbackData } = await supabase
            .from("product_images")
            .select("image_url, variation_type")
            .eq("product_id", productId)
            .eq("product_category", "affirmations")
            .in("variation_type", ["canvas", "unframed", "framed"])
            .limit(1)
            .single();

          if (fallbackData) {
            const variation = fallbackData.variation_type as DisplayVariation;
            const urlWithBuster = `${fallbackData.image_url}?v=${cacheBuster}`;
            displayImageCache.set(cacheKey, { url: urlWithBuster, variation });
            setImageUrl(urlWithBuster);
            setVariationType(variation);
          } else {
            setImageUrl(null);
            setVariationType(null);
          }
        } else {
          const variation = data.variation_type as DisplayVariation;
          const urlWithBuster = `${data.image_url}?v=${cacheBuster}`;
          displayImageCache.set(cacheKey, { url: urlWithBuster, variation });
          setImageUrl(urlWithBuster);
          setVariationType(variation);
        }
      } catch (err) {
        console.error("Error fetching affirmation display image:", err);
        setImageUrl(null);
        setVariationType(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisplayImage();
  }, [productId, targetVariation]);

  return { imageUrl, isLoading, variationType };
}
