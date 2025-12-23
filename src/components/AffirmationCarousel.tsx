import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductModal } from "@/components/ProductModal";
import { ProductCard } from "@/components/ProductCard";
import { Affirmation } from "@/data/affirmations";
import { useAffirmationDigitalImage } from "@/hooks/useAffirmationDigitalImage";
import { Skeleton } from "@/components/ui/skeleton";

interface AffirmationCarouselProps {
  affirmations: Affirmation[];
}

// Individual carousel card matching shop product cards exactly
const CarouselCard = ({ 
  affirmation, 
  onCardClick 
}: { 
  affirmation: Affirmation; 
  onCardClick: () => void;
}) => {
  const { imageUrl, isLoading } = useAffirmationDigitalImage(affirmation.id);
  const displayImage = imageUrl || affirmation.image;
  
  return (
    <ProductCard onClick={onCardClick}>
      <WishlistButton productId={affirmation.id} />
      {affirmation.badge && (
        <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
          affirmation.badge === 'Sale' ? 'bg-foreground text-background' :
          affirmation.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
          affirmation.badge === 'Most Popular' ? 'bg-accent text-accent-foreground' :
          affirmation.badge === 'Staff Pick' ? 'bg-clay text-white' :
          'bg-secondary text-foreground'
        }`}>
          {affirmation.badge}
        </div>
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
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      
      <div className="p-2 sm:p-3 lg:p-4">
        <div className="flex gap-0.5 sm:gap-1 mb-1 sm:mb-2 flex-wrap items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-gold text-gold" />
          ))}
          <span className="text-[10px] sm:text-xs text-text-muted ml-0.5 sm:ml-1">
            ({affirmation.rating || 4.9})
          </span>
          <span className="px-1.5 py-0.5 bg-clay/15 text-foreground rounded text-[8px] sm:text-[10px] font-medium">
            {affirmation.category === 'Joy' ? 'Joyful' : 
             affirmation.category === 'Self-Love' ? 'Self-Love' : 
             affirmation.category === 'Rest' ? 'Restful' :
             affirmation.category === 'Abundance' ? 'Abundant' :
             affirmation.category === 'Strength' ? 'Empowering' : 'Digital'}
          </span>
          {affirmation.reviewCount && <span className="hidden sm:inline text-[10px] sm:text-xs text-text-muted"> · {(affirmation.reviewCount / 1000).toFixed(1)}K reviews</span>}
        </div>
        
        <h3 className="font-display text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2 line-clamp-2">{affirmation.title}</h3>
        <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{affirmation.description}</p>

        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="hidden lg:flex flex-wrap gap-1.5 mb-3">
            {affirmation.certifications.map((cert, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
              >
                {cert}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {affirmation.originalPrice ? (
              <>
                <span className="text-[10px] sm:text-xs lg:text-sm text-text-muted line-through">${affirmation.originalPrice}</span>
                <span className="text-[8px] sm:text-xs bg-primary/10 text-primary px-1 sm:px-1.5 py-0.5 rounded">
                  Save ${affirmation.originalPrice - affirmation.price}
                </span>
              </>
            ) : (
              <span className="text-[8px] sm:text-[10px] text-clay font-medium">
                Great Deal
              </span>
            )}
            <span className="text-sm sm:text-base font-semibold">${affirmation.price}</span>
          </div>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
            onClick={(e) => {
              e.stopPropagation();
              onCardClick();
            }}
          >
            <ShoppingBag className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">View Options</span>
            <span className="sm:hidden">View</span>
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
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
    
    // Calculate active index
    const cardWidth = 300;
    const gap = 24;
    const index = Math.round(container.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, affirmations.length - 1));
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
  }, [affirmations.length]);
  
  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    
    const cardWidth = 300;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };
  
  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = 300;
    const gap = 24;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="absolute -left-6 xl:-left-10 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="absolute -right-6 xl:-right-10 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {affirmations.map((affirmation, index) => (
          <div 
            key={affirmation.id} 
            className="flex-none w-[260px] sm:w-[280px] lg:w-[320px] snap-start first:ml-0 last:mr-0"
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

      {/* Mobile/Tablet Navigation & Indicators */}
      <div className="flex lg:hidden justify-center items-center gap-4 mt-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-all duration-300 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        {/* Active dot indicators */}
        <div className="flex gap-1.5">
          {affirmations.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "w-6 bg-primary" 
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to affirmation ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-all duration-300 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
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