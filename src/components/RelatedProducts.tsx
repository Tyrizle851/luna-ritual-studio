import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title?: string;
  name?: string;
  image: string;
  price: number;
}

interface RelatedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const RelatedProducts = ({ products, onAddToCart }: RelatedProductsProps) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="text-xl font-display mb-4">You May Also Love</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="group">
            <div className="mb-3 overflow-hidden rounded-lg aspect-square bg-secondary">
              <img
                src={product.image}
                alt={product.title || product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium mb-2 line-clamp-2">
              {product.title || product.name}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">${product.price}</span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 border-clay text-clay hover:bg-clay hover:text-white"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};