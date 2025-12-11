import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { hasLocalDigitalImage, getLocalDigitalImage } from "@/lib/localDigitalImages";

interface ProductImage {
  id: string;
  product_id: string;
  product_category: string;
  variation_type: string;
  image_url: string;
  created_at: string;
}

export function useProductImages(productId: string | null, productCategory: string) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setImages([]);
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      
      // For affirmations, use HYBRID approach:
      // - Digital: local curated image (instant)
      // - Canvas/Unframed/Framed: fetch from Supabase
      if (productCategory === "affirmations") {
        const imageResults: ProductImage[] = [];
        
        // 1. Add local digital image first (instant, no network)
        if (hasLocalDigitalImage(productId)) {
          const localUrl = getLocalDigitalImage(productId);
          if (localUrl) {
            imageResults.push({
              id: `local-${productId}-digital`,
              product_id: productId,
              product_category: "affirmations",
              variation_type: "digital",
              image_url: localUrl,
              created_at: new Date().toISOString()
            });
          }
        }
        
        // 2. Fetch mockup variations from Supabase (canvas, unframed, framed)
        try {
          const { data, error } = await supabase
            .from("product_images")
            .select("*")
            .eq("product_id", productId)
            .eq("product_category", "affirmations")
            .in("variation_type", ["canvas", "unframed", "framed"]);

          if (!error && data) {
            // Sort mockups in order: canvas, unframed, framed
            const mockupOrder = ["canvas", "unframed", "framed"];
            const sortedMockups = data.sort((a, b) => {
              const aIndex = mockupOrder.indexOf(a.variation_type);
              const bIndex = mockupOrder.indexOf(b.variation_type);
              return aIndex - bIndex;
            });
            imageResults.push(...sortedMockups);
          }
        } catch (err) {
          console.error("Error fetching affirmation mockups:", err);
        }
        
        setImages(imageResults);
        setIsLoading(false);
        return;
      }

      // For non-affirmation categories, use Supabase
      try {
        const { data, error } = await supabase
          .from("product_images")
          .select("*")
          .eq("product_id", productId)
          .eq("product_category", productCategory);

        if (error) {
          console.error("Error fetching product images:", error);
          setImages([]);
        } else {
          // Sort images by variation type for consistent ordering
          const sortOrder = ["original", "lifestyle", "detail", "styled"];
          
          const sorted = (data || []).sort((a, b) => {
            const aIndex = sortOrder.indexOf(a.variation_type);
            const bIndex = sortOrder.indexOf(b.variation_type);
            return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
          });
          
          setImages(sorted);
        }
      } catch (err) {
        console.error("Error fetching product images:", err);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [productId, productCategory]);

  return { images, isLoading };
}
