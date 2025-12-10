import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { hasLocalDigitalImage, getLocalDigitalImage } from "@/lib/localDigitalImages";

interface DigitalImageResult {
  imageUrl: string | null;
  isLoading: boolean;
}

// Cache for digital images from Supabase ONLY (not local images)
const digitalImageCache = new Map<string, string>();

// Cache buster to force refresh
let cacheBuster = Date.now();

export function clearDigitalImageCache() {
  digitalImageCache.clear();
  cacheBuster = Date.now();
}

export function useAffirmationDigitalImage(productId: string | null): DigitalImageResult {
  // Initialize synchronously with local image if available - prevents flash
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    if (productId && hasLocalDigitalImage(productId)) {
      return getLocalDigitalImage(productId);
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setImageUrl(null);
      return;
    }

    // PRIORITY 1: Check for local user-provided image FIRST (always wins)
    if (hasLocalDigitalImage(productId)) {
      const localImage = getLocalDigitalImage(productId);
      if (localImage) {
        // Set local image immediately
        setImageUrl(localImage);
        setIsLoading(false);
        return;
      }
    }

    // PRIORITY 2: No Supabase fetch needed for affirmations - all have local images
    // If we reach here, there's no image available
    setImageUrl(null);

  }, [productId]);

  return { imageUrl, isLoading };
}

// Bulk fetch for performance - get all digital images at once (only for non-local images)
export async function fetchAllDigitalImages(): Promise<Map<string, string>> {
  const cache = new Map<string, string>();
  
  try {
    const { data: files, error } = await supabase.storage
      .from("product-images")
      .list("affirmations/digital", {
        sortBy: { column: "created_at", order: "desc" },
        limit: 100,
      });

    if (error || !files) return cache;

    // Group by product ID, keeping only the latest
    const latestByProduct = new Map<string, string>();
    for (const file of files) {
      // Extract product ID from filename (e.g., aff-001-1765304160056.png -> aff-001)
      const match = file.name.match(/^(aff-\d{3})-/);
      if (match) {
        const productId = match[1];
        // Skip if we have a local image for this product
        if (hasLocalDigitalImage(productId)) continue;
        
        if (!latestByProduct.has(productId)) {
          latestByProduct.set(productId, file.name);
        }
      }
    }

    // Get public URLs for each
    for (const [productId, fileName] of latestByProduct) {
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(`affirmations/digital/${fileName}`);

      if (urlData?.publicUrl) {
        const urlWithBuster = `${urlData.publicUrl}?v=${cacheBuster}`;
        cache.set(productId, urlWithBuster);
        digitalImageCache.set(`${productId}-${cacheBuster}`, urlWithBuster);
      }
    }
  } catch (err) {
    console.error("Error fetching all digital images:", err);
  }

  return cache;
}
