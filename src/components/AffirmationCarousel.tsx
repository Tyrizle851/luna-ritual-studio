import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductModal } from "@/components/ProductModal";
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
    <div 
      onClick={onCardClick}
      className="group cursor-pointer bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-border/30"
    >
      <WishlistButton productId={affirmation.id} />
      
      {affirmation.badge && (
        <span className="absolute top-3 left-3 z-10 bg-clay text-background text-[10px] px-3 py-1 font-medium uppercase tracking-wide">
          {affirmation.badge}
        </span>
      )}
      
      {/* Image Container with Elegant Hover */}
      <div className="overflow-hidden aspect-[3/4] bg-secondary relative">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={displayImage}
            alt={affirmation.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
        )}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-5">
        {affirmation.category && (
          <p className="text-[10px] text-clay mb-2 uppercase tracking-[0.15em] font-medium">
            {affirmation.category}
          </p>
        )}
        
        <h3 className="font-display font-semibold text-foreground mb-2 text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-clay transition-colors duration-300">
          {affirmation.title}
        </h3>
        
        {affirmation.rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-gold text-xs">★</span>
            <span className="text-xs font-medium text-foreground">{affirmation.rating}</span>
            <span className="text-xs text-foreground/50">({affirmation.reviewCount?.toLocaleString()})</span>
          </div>
        )}
        
        {affirmation.description && (
          <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-2 hidden sm:block">
            {affirmation.description}
          </p>
        )}
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className="flex flex-col">
            <span className="text-xs text-foreground/50 uppercase tracking-wide">From</span>
            <span className="font-semibold text-lg text-foreground">${affirmation.price.toFixed(2)}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-clay/30 text-clay hover:bg-clay hover:text-background hover:border-clay text-xs px-4 h-9 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onCardClick();
            }}
          >
            View Options
          </Button>
        </div>
      </div>
    </div>
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
      {/* Desktop Side Navigation Buttons - Elegant */}
      <div className="hidden lg:block">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute -left-4 xl:-left-8 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-foreground/70 hover:bg-clay hover:text-background hover:border-clay transition-all duration-300 shadow-md disabled:opacity-0 disabled:pointer-events-none"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute -right-4 xl:-right-8 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-foreground/70 hover:bg-clay hover:text-background hover:border-clay transition-all duration-300 shadow-md disabled:opacity-0 disabled:pointer-events-none"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-5 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {affirmations.map((affirmation, index) => (
          <div 
            key={affirmation.id} 
            className="flex-none w-[280px] sm:w-[300px] lg:w-[340px] animate-fade-up snap-start first:ml-4 last:mr-4 lg:first:ml-0 lg:last:mr-0"
            style={{ animationDelay: `${index * 80}ms` }}
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

      {/* Mobile/Tablet Navigation - Clean Minimal */}
      <div className="flex lg:hidden justify-center items-center gap-6 mt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("left")}
          className="h-10 w-10 rounded-full border border-foreground/20 text-foreground/60 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-20"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {/* Dot indicators */}
        <div className="flex gap-2">
          {affirmations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = containerRef.current;
                if (!container) return;
                const cardWidth = 300;
                const gap = 24;
                container.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
              }}
              className="w-2 h-2 rounded-full bg-foreground/20 hover:bg-clay transition-colors duration-300"
              aria-label={`Go to affirmation ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("right")}
          className="h-10 w-10 rounded-full border border-foreground/20 text-foreground/60 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-20"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
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
