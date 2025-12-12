import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductModal } from "@/components/ProductModal";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";
import { Affirmation } from "@/data/affirmations";
import { useAffirmationDigitalImage } from "@/hooks/useAffirmationDigitalImage";
import { Skeleton } from "@/components/ui/skeleton";

interface AffirmationCarouselProps {
  affirmations: Affirmation[];
}

// Individual carousel card with dynamic image loading
const CarouselCard = ({ 
  affirmation, 
  onCardClick 
}: { 
  affirmation: Affirmation; 
  onCardClick: () => void;
}) => {
  // Use generated digital image from storage, fallback to local asset
  const { imageUrl, isLoading } = useAffirmationDigitalImage(affirmation.id);
  const displayImage = imageUrl || affirmation.image;
  
  return (
    <ProductCard onClick={onCardClick}>
      <WishlistButton productId={affirmation.id} />
      
      {affirmation.badge && (
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-accent text-accent-foreground text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
          {affirmation.badge}
        </span>
      )}
      
      <div className="overflow-hidden aspect-[4/5] bg-secondary">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={displayImage}
            alt={affirmation.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      
      <div className="p-3 sm:p-4">
        {affirmation.category && (
          <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider">
            {affirmation.category}
          </p>
        )}
        
        <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base group-hover:text-clay transition-colors line-clamp-2">{affirmation.title}</h3>
        
        {affirmation.rating && (
          <div className="flex items-center gap-1 mb-2 sm:mb-3">
            <span className="text-primary text-[10px] sm:text-xs">★</span>
            <span className="text-[10px] sm:text-xs font-medium">{affirmation.rating}</span>
            <span className="text-[10px] sm:text-xs text-text-muted">({affirmation.reviewCount?.toLocaleString()})</span>
          </div>
        )}
        
        {affirmation.description && (
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{affirmation.description}</p>
        )}
        
        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
            {affirmation.certifications.slice(0, 2).map((cert, idx) => (
              <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {cert}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50">
          <span className="font-semibold text-sm sm:text-base text-foreground">${affirmation.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-clay text-clay hover:bg-clay/10 text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
            onClick={onCardClick}
          >
            View Options
          </Button>
        </div>
      </div>
    </ProductCard>
  );
};

export const AffirmationCarousel = ({ affirmations }: AffirmationCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Affirmation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
    
    const cardWidth = 300;
    const gap = 32;
    const scrollAmount = cardWidth + gap;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
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
        className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-16 md:px-20 snap-x snap-mandatory touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {affirmations.map((affirmation, index) => (
          <div 
            key={affirmation.id} 
            className="flex-none w-[260px] sm:w-[280px] md:w-[320px] animate-fade-up snap-center"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CarouselCard 
              affirmation={affirmation}
              onCardClick={() => {
                setSelectedProduct(affirmation);
                setModalOpen(true);
              }}
            />
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

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  );
};
