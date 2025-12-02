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
          .eq("product_category", productCategory)
          .order("variation_type", { ascending: true });

        if (error) {
          console.error("Error fetching product images:", error);
          setImages([]);
        } else {
          setImages(data || []);
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
