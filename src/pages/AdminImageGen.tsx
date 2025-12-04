import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { generateProductImages } from "@/lib/generateProductImages";
import { supabase } from "@/integrations/supabase/client";
import { fashionProducts } from "@/data/fashion";
import { candles } from "@/data/candles";
import { supplements } from "@/data/supplements";
import { books } from "@/data/books";
import { affirmations } from "@/data/affirmations";
import { CheckCircle, XCircle, Loader2, Play, Pause } from "lucide-react";

interface ProductToGenerate {
  id: string;
  category: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  status: "pending" | "generating" | "complete" | "error" | "exists";
  error?: string;
}

export default function AdminImageGen() {
  const [products, setProducts] = useState<ProductToGenerate[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ complete: 0, error: 0, exists: 0 });
  const stopRef = useRef(false);

  const loadAllProducts = async () => {
    // Check which products already have images
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("product_id, product_category");

    const existingSet = new Set(
      existingImages?.map((img) => `${img.product_category}:${img.product_id}`) || []
    );

    const allProducts: ProductToGenerate[] = [];

    // Fashion products
    fashionProducts.forEach((p) => {
      const key = `fashion:${p.id}`;
      allProducts.push({
        id: p.id,
        category: "fashion",
        name: p.name,
        brand: p.brand,
        description: p.description,
        image: p.image,
        status: existingSet.has(key) ? "exists" : "pending",
      });
    });

    // Candles
    candles.forEach((p) => {
      const key = `candles:${p.id}`;
      allProducts.push({
        id: p.id,
        category: "candles",
        name: p.name,
        brand: p.brand,
        description: p.description,
        image: p.image,
        status: existingSet.has(key) ? "exists" : "pending",
      });
    });

    // Supplements
    supplements.forEach((p) => {
      const key = `supplements:${p.id}`;
      allProducts.push({
        id: p.id,
        category: "supplements",
        name: p.name,
        brand: p.category,
        description: p.description,
        image: p.image,
        status: existingSet.has(key) ? "exists" : "pending",
      });
    });

    // Books
    books.forEach((p) => {
      const key = `books:${p.id}`;
      allProducts.push({
        id: p.id,
        category: "books",
        name: p.title,
        brand: p.author,
        description: p.description,
        image: p.image,
        status: existingSet.has(key) ? "exists" : "pending",
      });
    });

    // Affirmations
    affirmations.forEach((p) => {
      const key = `affirmations:${p.id}`;
      allProducts.push({
        id: p.id,
        category: "affirmations",
        name: p.title,
        brand: "Lunar Rituals",
        description: p.description,
        image: p.image,
        status: existingSet.has(key) ? "exists" : "pending",
      });
    });

    setProducts(allProducts);
    
    const existsCount = allProducts.filter((p) => p.status === "exists").length;
    setStats({ complete: 0, error: 0, exists: existsCount });
  };

  const generateNext = async (index: number) => {
    if (stopRef.current || index >= products.length) {
      setIsRunning(false);
      return;
    }

    const product = products[index];
    
    // Skip if already exists or complete
    if (product.status === "exists" || product.status === "complete") {
      setCurrentIndex(index + 1);
      setTimeout(() => generateNext(index + 1), 100);
      return;
    }

    // Update status to generating
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, status: "generating" } : p))
    );

    try {
      await generateProductImages({
        productId: product.id,
        productCategory: product.category,
        productName: product.name,
        productBrand: product.brand,
        productDescription: product.description,
        imageSource: product.image,
      });

      setProducts((prev) =>
        prev.map((p, i) => (i === index ? { ...p, status: "complete" } : p))
      );
      setStats((prev) => ({ ...prev, complete: prev.complete + 1 }));
    } catch (error) {
      console.error(`Error generating images for ${product.id}:`, error);
      setProducts((prev) =>
        prev.map((p, i) =>
          i === index
            ? { ...p, status: "error", error: String(error) }
            : p
        )
      );
      setStats((prev) => ({ ...prev, error: prev.error + 1 }));
    }

    setCurrentIndex(index + 1);
    
    // Add delay between generations to avoid rate limiting
    setTimeout(() => generateNext(index + 1), 2000);
  };

  const startGeneration = () => {
    stopRef.current = false;
    setIsRunning(true);
    generateNext(currentIndex);
  };

  const stopGeneration = () => {
    stopRef.current = true;
    setIsRunning(false);
  };

  const pendingCount = products.filter((p) => p.status === "pending").length;
  const progress = products.length > 0 
    ? ((stats.complete + stats.error + stats.exists) / products.length) * 100 
    : 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Batch Product Image Generation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={loadAllProducts} disabled={isRunning}>
              Load All Products
            </Button>
            {!isRunning ? (
              <Button onClick={startGeneration} disabled={pendingCount === 0}>
                <Play className="w-4 h-4 mr-2" />
                Start Generation
              </Button>
            ) : (
              <Button onClick={stopGeneration} variant="destructive">
                <Pause className="w-4 h-4 mr-2" />
                Stop
              </Button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{products.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.complete}</div>
              <div className="text-sm text-muted-foreground">Generated</div>
            </div>
            <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.exists}</div>
              <div className="text-sm text-muted-foreground">Already Exist</div>
            </div>
            <div className="text-center p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.error}</div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>
          </div>

          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {pendingCount} products remaining
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-2">
        {products.map((product, index) => (
          <div
            key={`${product.category}-${product.id}`}
            className={`flex items-center gap-4 p-3 rounded-lg border ${
              product.status === "generating"
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                : product.status === "complete"
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : product.status === "exists"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : product.status === "error"
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : "border-border"
            }`}
          >
            <Badge variant="outline">{product.category}</Badge>
            <span className="flex-1 truncate">{product.name}</span>
            <span className="text-sm text-muted-foreground">{product.id}</span>
            {product.status === "generating" && (
              <Loader2 className="w-5 h-5 animate-spin text-yellow-600" />
            )}
            {product.status === "complete" && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {product.status === "exists" && (
              <Badge variant="secondary">Exists</Badge>
            )}
            {product.status === "error" && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
