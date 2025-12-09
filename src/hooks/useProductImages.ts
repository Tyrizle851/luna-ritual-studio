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

// Cache for digital images from storage
const digitalImageCache = new Map<string, string>();

async function fetchDigitalImageFromStorage(productId: string): Promise<string | null> {
  // Check cache first
  if (digitalImageCache.has(productId)) {
    return digitalImageCache.get(productId)!;
  }

  try {
    const { data: files, error } = await supabase.storage
      .from("product-images")
      .list("affirmations/digital", {
        search: productId,
        sortBy: { column: "created_at", order: "desc" },
        limit: 1,
      });

    if (error || !files || files.length === 0) {
      return null;
    }

    const fileName = files[0].name;
    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(`affirmations/digital/${fileName}`);

    if (urlData?.publicUrl) {
      digitalImageCache.set(productId, urlData.publicUrl);
      return urlData.publicUrl;
    }
  } catch (err) {
    console.error("Error fetching digital image from storage:", err);
  }
  return null;
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

        let allImages = data || [];

        // For affirmations, also fetch digital image from storage if not in database
        if (productCategory === "affirmations") {
          const hasDigital = allImages.some(img => img.variation_type === "digital");
          
          if (!hasDigital) {
            const digitalUrl = await fetchDigitalImageFromStorage(productId);
            if (digitalUrl) {
              // Add synthetic digital image entry
              allImages = [{
                id: `storage-${productId}-digital`,
                product_id: productId,
                product_category: "affirmations",
                variation_type: "digital",
                image_url: digitalUrl,
                created_at: new Date().toISOString()
              }, ...allImages];
            }
          }
        }

        if (error) {
          console.error("Error fetching product images:", error);
          
          // For affirmations, still try to get digital image from storage even if DB fails
          if (productCategory === "affirmations") {
            const digitalUrl = await fetchDigitalImageFromStorage(productId);
            if (digitalUrl) {
              setImages([{
                id: `storage-${productId}-digital`,
                product_id: productId,
                product_category: "affirmations",
                variation_type: "digital",
                image_url: digitalUrl,
                created_at: new Date().toISOString()
              }]);
            } else {
              setImages([]);
            }
          } else {
            setImages([]);
          }
        } else {
          // Sort images by variation type for consistent ordering
          const sortOrder = productCategory === "affirmations"
            ? ["digital", "canvas", "unframed", "framed"]
            : ["original", "lifestyle", "detail", "styled"];
          
          const sorted = allImages.sort((a, b) => {
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
