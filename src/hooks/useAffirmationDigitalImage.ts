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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
        // Immediately set local image - no async needed
        setImageUrl(localImage);
        setIsLoading(false);
        return;
      }
    }

    // PRIORITY 2: Check Supabase cache for non-local images
    const cacheKey = `${productId}-${cacheBuster}`;
    if (digitalImageCache.has(cacheKey)) {
      setImageUrl(digitalImageCache.get(cacheKey)!);
      return;
    }

    const fetchDigitalImage = async () => {
      setIsLoading(true);
      try {
        // List files in the digital folder matching this product ID
        const { data: files, error } = await supabase.storage
          .from("product-images")
          .list("affirmations/digital", {
            search: productId,
            sortBy: { column: "created_at", order: "desc" },
            limit: 1,
          });

        if (error || !files || files.length === 0) {
          setImageUrl(null);
          return;
        }

        // Get the public URL for the most recent file
        const fileName = files[0].name;
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(`affirmations/digital/${fileName}`);

        if (urlData?.publicUrl) {
          // Add cache buster to URL to prevent browser caching
          const urlWithBuster = `${urlData.publicUrl}?v=${cacheBuster}`;
          digitalImageCache.set(cacheKey, urlWithBuster);
          setImageUrl(urlWithBuster);
        }
      } catch (err) {
        console.error("Error fetching affirmation digital image:", err);
        setImageUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDigitalImage();
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
