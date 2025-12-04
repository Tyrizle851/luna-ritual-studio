import { supabase } from "@/integrations/supabase/client";

interface GenerateProductImagesParams {
  productId: string;
  productCategory: string;
  productName: string;
  productBrand: string;
  productDescription: string;
  imageSource: string; // The imported image asset
}

// Convert an image URL/import to base64
async function imageToBase64(imageSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve(dataUrl);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

export async function generateProductImages({
  productId,
  productCategory,
  productName,
  productBrand,
  productDescription,
  imageSource,
}: GenerateProductImagesParams) {
  console.log(`Converting image to base64 for ${productId}...`);
  
  // Convert the local image to base64
  const imageBase64 = await imageToBase64(imageSource);
  console.log(`Image converted, base64 length: ${imageBase64.length}`);

  // Call the edge function with the base64 image
  const { data, error } = await supabase.functions.invoke("generate-product-images", {
    body: {
      productId,
      productCategory,
      productName,
      productBrand,
      productDescription,
      originalImageUrl: imageSource, // Store original reference
      imageBase64, // Pass the actual image data
    },
  });

  if (error) {
    console.error("Error generating product images:", error);
    throw error;
  }

  return data;
}
