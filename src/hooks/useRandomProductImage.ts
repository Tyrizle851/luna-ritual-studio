import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { hasLocalDigitalImage, getLocalDigitalImage } from "@/lib/localDigitalImages";

interface ProductImage {
  id: string;
  product_id: string;
  product_category: string;
  variation_type: string;
  image_url: string;
}

// Cache to store all product images per category
const imageCache: Record<string, ProductImage[]> = {};
const fetchPromises: Record<string, Promise<ProductImage[]>> = {};

// Fetch all images for a category (cached)
async function fetchCategoryImages(category: string): Promise<ProductImage[]> {
  if (imageCache[category]) {
    return imageCache[category];
  }

  if (fetchPromises[category]) {
    return fetchPromises[category];
  }

  const promise = (async () => {
    const { data, error } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_category", category);

    if (error) {
      console.error("Error fetching category images:", error);
      return [];
    }
    imageCache[category] = data || [];
    return imageCache[category];
  })();

  fetchPromises[category] = promise;
  return promise;
}

// Get a random image for a specific product
export function useRandomProductImage(
  productId: string | null,
  productCategory: string,
  fallbackImage: string
) {
  const [allImages, setAllImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId || !productCategory) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchCategoryImages(productCategory).then((images) => {
      const productImages = images.filter((img) => img.product_id === productId);
      setAllImages(productImages);
      setIsLoading(false);
    });
  }, [productId, productCategory]);

  // Pick a random image on mount (stable per component instance)
  const randomImage = useMemo(() => {
    // For affirmations, include local digital image in the pool
    if (productCategory === "affirmations" && productId && hasLocalDigitalImage(productId)) {
      const localImage = getLocalDigitalImage(productId);
      const allOptions = localImage 
        ? [localImage, ...allImages.map(img => img.image_url)]
        : allImages.map(img => img.image_url);
      
      if (allOptions.length === 0) return fallbackImage;
      return allOptions[Math.floor(Math.random() * allOptions.length)];
    }

    // For other categories
    if (allImages.length === 0) return fallbackImage;
    const randomIndex = Math.floor(Math.random() * allImages.length);
    return allImages[randomIndex].image_url;
  }, [allImages, fallbackImage, productId, productCategory]);

  return {
    imageUrl: isLoading ? fallbackImage : (randomImage || fallbackImage),
    isLoading,
    allImages
  };
}

// Hook to get a different random image on click
export function useRandomProductImageWithRefresh(
  productId: string | null,
  productCategory: string,
  fallbackImage: string
) {
  const [allImages, setAllImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!productId || !productCategory) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchCategoryImages(productCategory).then((images) => {
      const productImages = images.filter((img) => img.product_id === productId);
      setAllImages(productImages);
      // Set random initial index
      if (productImages.length > 0) {
        setCurrentIndex(Math.floor(Math.random() * productImages.length));
      }
      setIsLoading(false);
    });
  }, [productId, productCategory]);

  const getAllImageUrls = (): string[] => {
    // For affirmations, include local digital image
    if (productCategory === "affirmations" && productId && hasLocalDigitalImage(productId)) {
      const localImage = getLocalDigitalImage(productId);
      return localImage 
        ? [localImage, ...allImages.map(img => img.image_url)]
        : allImages.map(img => img.image_url);
    }
    return allImages.map(img => img.image_url);
  };

  const imageUrls = getAllImageUrls();
  const currentImage = imageUrls.length > 0 ? imageUrls[currentIndex % imageUrls.length] : fallbackImage;

  const refreshImage = () => {
    if (imageUrls.length > 1) {
      // Pick a different random index
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * imageUrls.length);
      } while (newIndex === currentIndex && imageUrls.length > 1);
      setCurrentIndex(newIndex);
    }
  };

  return {
    imageUrl: isLoading ? fallbackImage : currentImage,
    isLoading,
    refreshImage,
    hasMultipleImages: imageUrls.length > 1
  };
}