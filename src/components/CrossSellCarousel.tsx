import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { WishlistButton } from "@/components/WishlistButton";

interface CrossSellProduct {
  id: string;
  name?: string;
  title?: string;
  image: string;
  price: number;
  category?: string;
  rating?: number;
  onClick: () => void;
}

interface CrossSellCarouselProps {
  products: CrossSellProduct[];
}

export const CrossSellCarousel = ({ products }: CrossSellCarouselProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const newPosition = direction === "left"
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t border-border/40">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display mb-2">You May Also Like</h2>
        <p className="text-sm sm:text-base text-text-secondary">Complete your ritual with these curated picks</p>
      </div>

      <div className="relative">
        {/* Desktop Navigation Buttons */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white h-12 w-12 shadow-lg disabled:opacity-20 bg-background"
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white h-12 w-12 shadow-lg disabled:opacity-20 bg-background"
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[240px] sm:w-[280px] snap-center"
            >
              <ProductCard onClick={product.onClick}>
                <WishlistButton productId={product.id} />
                <div className="overflow-hidden aspect-[4/5] bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name || product.title || "Product"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  {product.category && (
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{product.category}</p>
                  )}
                  <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2">{product.name || product.title}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="font-semibold text-sm sm:text-base">${product.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay/10 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        product.onClick();
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </ProductCard>
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white h-10 w-10 disabled:opacity-20"
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white h-10 w-10 disabled:opacity-20"
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
