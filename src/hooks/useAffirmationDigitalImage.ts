import { useState, useEffect } from "react";
import { hasLocalDigitalImage, getLocalDigitalImage, LOCAL_DIGITAL_IMAGES } from "@/lib/localDigitalImages";

interface DigitalImageResult {
  imageUrl: string | null;
  isLoading: boolean;
}

export function clearDigitalImageCache() {
  // No-op - all images are now local, no cache needed
}

export function useAffirmationDigitalImage(productId: string | null): DigitalImageResult {
  // Initialize synchronously with local image - prevents flash
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    if (productId && hasLocalDigitalImage(productId)) {
      return getLocalDigitalImage(productId);
    }
    return null;
  });

  useEffect(() => {
    if (!productId) {
      setImageUrl(null);
      return;
    }

    // All affirmations have local images - set immediately
    if (hasLocalDigitalImage(productId)) {
      setImageUrl(getLocalDigitalImage(productId));
    } else {
      setImageUrl(null);
    }
  }, [productId]);

  return { imageUrl, isLoading: false };
}

// Bulk fetch - returns all local images immediately (no async needed)
export async function fetchAllDigitalImages(): Promise<Map<string, string>> {
  const cache = new Map<string, string>();
  
  for (const [productId, imageUrl] of Object.entries(LOCAL_DIGITAL_IMAGES)) {
    cache.set(productId, imageUrl);
  }
  
  return cache;
}
