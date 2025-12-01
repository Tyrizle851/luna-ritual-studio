import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { WishlistButton } from "@/components/WishlistButton";
import { toast } from "sonner";

interface Affirmation {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  badge?: string;
  certifications?: string[];
}

interface AffirmationCarouselProps {
  affirmations: Affirmation[];
}

export const AffirmationCarousel = ({ affirmations }: AffirmationCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  
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
    
    const cardWidth = 300;
    const gap = 32;
    const scrollAmount = cardWidth + gap;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const handleAddToCart = (affirmation: Affirmation) => {
    addItem({
      id: affirmation.id,
      title: affirmation.title,
      price: affirmation.price,
      image: affirmation.image,
      type: 'affirmation',
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="relative">
      {/* Desktop Navigation Buttons */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute -left-6 top-[40%] -translate-y-1/2 z-10 rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 h-14 w-14 shadow-xl disabled:opacity-20 disabled:cursor-not-allowed bg-background"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute -right-6 top-[40%] -translate-y-1/2 z-10 rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 h-14 w-14 shadow-xl disabled:opacity-20 disabled:cursor-not-allowed bg-background"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-16 md:px-20 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {affirmations.map((affirmation, index) => (
          <div 
            key={affirmation.id} 
            className="flex-none w-[260px] sm:w-[280px] md:w-[320px] group animate-fade-up snap-center"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <WishlistButton productId={affirmation.id} />
              
              {affirmation.badge && (
                <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
                  {affirmation.badge}
                </div>
              )}
              
              <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-secondary cursor-pointer">
                <img
                  src={affirmation.image}
                  alt={affirmation.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {affirmation.rating && (
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                  <span className="text-xs text-text-muted ml-1">
                    ({affirmation.rating}) · {(affirmation.reviewCount! / 1000).toFixed(1)}K reviews
                  </span>
                </div>
              )}
              
              <h3 className="font-display text-xl mb-2">{affirmation.title}</h3>
              
              {affirmation.description && (
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{affirmation.description}</p>
              )}
              
              {affirmation.certifications && affirmation.certifications.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {affirmation.certifications.map((cert, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-muted text-text-secondary">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {affirmation.originalPrice && (
                    <span className="text-sm text-text-muted line-through">${affirmation.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="font-semibold">${affirmation.price.toFixed(2)}</span>
                  {affirmation.originalPrice && (
                    <span className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">
                      -{Math.round(((affirmation.originalPrice - affirmation.price) / affirmation.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-clay text-clay hover:bg-clay/10"
                >
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-clay hover:bg-clay-dark text-white"
                  onClick={() => handleAddToCart(affirmation)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Navigation: Dots with Arrows */}
      <div className="flex md:hidden justify-center items-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 h-10 w-10 disabled:opacity-20 disabled:cursor-not-allowed"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2.5">
          {affirmations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = containerRef.current;
                if (!container) return;
                const cardWidth = 280;
                const gap = 24;
                container.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
              }}
              className="w-2.5 h-2.5 rounded-full bg-clay/30 hover:bg-clay active:bg-clay transition-colors duration-300"
              aria-label={`Go to affirmation ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="rounded-full border-2 border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 h-10 w-10 disabled:opacity-20 disabled:cursor-not-allowed"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop Navigation Buttons (Bottom) */}
      <div className="hidden md:flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="rounded-full border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 h-11 w-11 disabled:opacity-30"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="rounded-full border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 h-11 w-11 disabled:opacity-30"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
