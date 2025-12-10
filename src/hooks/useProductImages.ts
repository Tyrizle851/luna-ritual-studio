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
      
      // For affirmations, ONLY use local images - no Supabase at all
      if (productCategory === "affirmations") {
        if (hasLocalDigitalImage(productId)) {
          const localUrl = getLocalDigitalImage(productId);
          if (localUrl) {
            setImages([{
              id: `local-${productId}-digital`,
              product_id: productId,
              product_category: "affirmations",
              variation_type: "digital",
              image_url: localUrl,
              created_at: new Date().toISOString()
            }]);
          } else {
            setImages([]);
          }
        } else {
          setImages([]);
        }
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
