import { hasLocalDigitalImage, getLocalDigitalImage, LOCAL_DIGITAL_IMAGES } from "@/lib/localDigitalImages";

interface DigitalImageResult {
  imageUrl: string | null;
  isLoading: boolean;
}

export function clearDigitalImageCache() {
  // No-op - all images are now local, no cache needed
}

export function useAffirmationDigitalImage(productId: string | null): DigitalImageResult {
  // Synchronous lookup - no state or effects needed since all images are local
  const imageUrl = productId && hasLocalDigitalImage(productId) 
    ? getLocalDigitalImage(productId) 
    : null;

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
