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
  originalPrice?: number;
  category?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  badge?: string;
  certifications?: string[];
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
                {product.badge && (
                  <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
                    product.badge === 'Sale' ? 'bg-foreground text-background' :
                    product.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                    product.badge === 'Most Popular' ? 'bg-accent text-accent-foreground' :
                    product.badge === 'Staff Pick' ? 'bg-clay text-white' :
                    product.badge === 'Top Pick' ? 'bg-accent text-accent-foreground' :
                    'bg-secondary text-foreground'
                  }`}>
                    {product.badge}
                  </div>
                )}
                <div className="overflow-hidden aspect-[4/5] bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name || product.title || "Product"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-2 sm:p-3 lg:p-4">
                  {(product.category || product.brand) && (
                    <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider truncate">
                      {product.brand || product.category}
                    </p>
                  )}
                  <h3 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base group-hover:text-clay transition-colors line-clamp-2">
                    {product.name || product.title}
                  </h3>

                  {product.rating && (
                    <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3 text-[10px] sm:text-xs flex-wrap">
                      <span className="text-primary">★</span>
                      <span className="font-semibold">{product.rating}</span>
                      <span className="px-1 py-0.5 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] font-medium">
                        {product.rating >= 4.5 ? 'Top Rated' : product.rating >= 4.0 ? 'Popular' : 'Verified'}
                      </span>
                      <span className="px-1 py-0.5 bg-accent/15 text-accent-foreground rounded text-[8px] sm:text-[10px] font-medium">
                        {product.badge === 'Best Seller' ? 'Trending' : product.badge === 'Most Popular' ? 'Trending' : product.reviewCount && product.reviewCount > 500 ? 'Fan Favorite' : 'Quality Pick'}
                      </span>
                      {product.reviewCount && (
                        <span className="text-muted-foreground hidden sm:inline">
                          ({product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}K` : product.reviewCount.toLocaleString()})
                        </span>
                      )}
                    </div>
                  )}

                  {product.description && (
                    <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                      {product.description}
                    </p>
                  )}

                  {product.certifications && product.certifications.length > 0 && (
                    <div className="hidden lg:flex flex-wrap gap-1.5 mb-4">
                      {product.certifications.slice(0, 2).map((cert, index) => (
                        <span key={index} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      {product.originalPrice ? (
                        <>
                          <span className="text-[10px] sm:text-xs lg:text-sm text-text-muted line-through">${product.originalPrice}</span>
                          <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-foreground text-background rounded">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </>
                      ) : (
                        <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded font-medium">
                          Great Deal
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-semibold text-text-primary">${product.price.toFixed(2)}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        product.onClick();
                      }}
                    >
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
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
