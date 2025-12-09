import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { hasLocalDigitalImage, getLocalDigitalImage } from "@/lib/localDigitalImages";

interface DigitalImageResult {
  imageUrl: string | null;
  isLoading: boolean;
}

// Cache for digital images
const digitalImageCache = new Map<string, string>();

export function useAffirmationDigitalImage(productId: string | null): DigitalImageResult {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setImageUrl(null);
      return;
    }

    // Check for local user-provided image first (highest priority)
    if (hasLocalDigitalImage(productId)) {
      const localImage = getLocalDigitalImage(productId);
      if (localImage) {
        setImageUrl(localImage);
        return;
      }
    }

    // Check cache second
    if (digitalImageCache.has(productId)) {
      setImageUrl(digitalImageCache.get(productId)!);
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
          digitalImageCache.set(productId, urlData.publicUrl);
          setImageUrl(urlData.publicUrl);
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

// Bulk fetch for performance - get all digital images at once
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
        cache.set(productId, urlData.publicUrl);
        digitalImageCache.set(productId, urlData.publicUrl);
      }
    }
  } catch (err) {
    console.error("Error fetching all digital images:", err);
  }

  return cache;
}
