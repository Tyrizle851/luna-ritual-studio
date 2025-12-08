import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
          // For affirmations: digital, canvas, unframed, framed
          // For other categories: original, lifestyle, detail, styled
          const sortOrder = productCategory === "affirmations"
            ? ["digital", "canvas", "unframed", "framed"]
            : ["original", "lifestyle", "detail", "styled"];
          
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
