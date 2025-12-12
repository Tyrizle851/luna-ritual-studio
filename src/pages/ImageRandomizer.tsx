import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fashionProducts } from "@/data/fashion";
import { candles } from "@/data/candles";
import { supplements } from "@/data/supplements";
import { affirmations } from "@/data/affirmations";
import { books } from "@/data/books";

interface ProductImageMap {
  [productId: string]: {
    productId: string;
    category: string;
    images: Array<{
      variation_type: string;
      image_url: string;
    }>;
    randomSelected?: string;
  };
}

const ImageRandomizer = () => {
  const [imageMap, setImageMap] = useState<ProductImageMap>({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const fetchAllProductImages = async () => {
    setLoading(true);
    const map: ProductImageMap = {};

    try {
      // Fetch all product images from Supabase
      const { data, error } = await supabase
        .from("product_images")
        .select("*");

      if (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
        return;
      }

      // Group images by product_id
      data?.forEach((img) => {
        if (!map[img.product_id]) {
          map[img.product_id] = {
            productId: img.product_id,
            category: img.product_category,
            images: []
          };
        }
        map[img.product_id].images.push({
          variation_type: img.variation_type,
          image_url: img.image_url
        });
      });

      // Randomly select one image for each product
      Object.keys(map).forEach((productId) => {
        const product = map[productId];
        if (product.images.length > 0) {
          const randomIndex = Math.floor(Math.random() * product.images.length);
          product.randomSelected = product.images[randomIndex].image_url;
        }
      });

      setImageMap(map);
      generateOutput(map);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateOutput = (map: ProductImageMap) => {
    let outputText = "=== RANDOMIZED PRODUCT IMAGES ===\n\n";

    // Group by category
    const categories = {
      affirmations: [] as string[],
      fashion: [] as string[],
      candles: [] as string[],
      supplements: [] as string[],
      books: [] as string[]
    };

    Object.values(map).forEach((product) => {
      const line = `${product.productId}: ${product.randomSelected}`;
      if (product.category === "affirmations") categories.affirmations.push(line);
      else if (product.category === "fashion") categories.fashion.push(line);
      else if (product.category === "candles") categories.candles.push(line);
      else if (product.category === "supplements") categories.supplements.push(line);
      else if (product.category === "books") categories.books.push(line);
    });

    outputText += "=== AFFIRMATIONS ===\n";
    categories.affirmations.forEach(line => outputText += line + "\n");
    outputText += "\n=== FASHION ===\n";
    categories.fashion.forEach(line => outputText += line + "\n");
    outputText += "\n=== CANDLES ===\n";
    categories.candles.forEach(line => outputText += line + "\n");
    outputText += "\n=== SUPPLEMENTS ===\n";
    categories.supplements.forEach(line => outputText += line + "\n");
    outputText += "\n=== BOOKS ===\n";
    categories.books.forEach(line => outputText += line + "\n");

    setOutput(outputText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Product Image Randomizer</h1>

        <div className="mb-8">
          <Button onClick={fetchAllProductImages} disabled={loading}>
            {loading ? "Fetching..." : "Fetch & Randomize Product Images"}
          </Button>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
            </div>

            <div className="bg-slate-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-auto max-h-[600px]">
              <pre>{output}</pre>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {Object.entries(imageMap).slice(0, 20).map(([productId, product]) => (
                <div key={productId} className="border rounded p-4">
                  <p className="text-xs font-bold mb-2">{productId}</p>
                  <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                  <p className="text-xs text-blue-600 mb-2">
                    {product.images.length} images available
                  </p>
                  {product.randomSelected && (
                    <div>
                      <img
                        src={product.randomSelected}
                        alt={productId}
                        className="w-full aspect-square object-cover rounded mb-2"
                      />
                      <p className="text-xs text-green-600 font-semibold">✓ Selected</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRandomizer;
