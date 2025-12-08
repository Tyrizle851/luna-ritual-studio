import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductModal } from "@/components/ProductModal";
import { toast } from "sonner";
import { Affirmation, AFFIRMATION_FORMAT_PRICING } from "@/data/affirmations";
import { useAffirmationDisplayImage } from "@/hooks/useAffirmationDisplayImage";
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
  const { imageUrl, isLoading, variationType } = useAffirmationDisplayImage(affirmation.id);
  const displayImage = imageUrl || affirmation.image;
  
  // Get price based on displayed variation
  const getDisplayPrice = () => {
    if (!variationType) return affirmation.price;
    switch (variationType) {
      case "canvas": return AFFIRMATION_FORMAT_PRICING["Canvas Print"];
      case "unframed": return AFFIRMATION_FORMAT_PRICING["Unframed Poster"];
      case "framed": return AFFIRMATION_FORMAT_PRICING["Framed Poster"];
      default: return affirmation.price;
    }
  };

  const getPriceLabel = () => {
    if (!variationType) return null;
    switch (variationType) {
      case "canvas": return "Canvas";
      case "unframed": return "Poster";
      case "framed": return "Framed";
      default: return null;
    }
  };

  const priceLabel = getPriceLabel();
  const displayPrice = getDisplayPrice();

  return (
    <div className="relative h-full bg-[#FAF8F5] border border-[#EBDDD1]/50 shadow-[0_4px_16px_rgba(139,107,84,0.08)] overflow-hidden group hover:shadow-[0_8px_24px_rgba(139,107,84,0.14)] hover:-translate-y-1 transition-all duration-300">
      <WishlistButton productId={affirmation.id} />
      
      {affirmation.badge && (
        <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
          {affirmation.badge}
        </div>
      )}
      
      {priceLabel && (
        <div className="absolute top-2 right-10 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
          {priceLabel}
        </div>
      )}
      
      <div 
        className="overflow-hidden aspect-[4/5] bg-secondary cursor-pointer"
        onClick={onCardClick}
      >
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={displayImage}
            alt={affirmation.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      
      <div className="p-4">
        {affirmation.category && (
          <span className="text-xs text-text-muted uppercase tracking-wider mb-1 block">
            {affirmation.category}
          </span>
        )}
        
        <h3 className="font-display text-lg mb-2 line-clamp-1">{affirmation.title}</h3>
        
        {affirmation.rating && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-gold text-gold" />
            ))}
            <span className="text-xs text-text-muted ml-1">
              ({affirmation.rating}) · {(affirmation.reviewCount! / 1000).toFixed(1)}K
            </span>
          </div>
        )}
        
        {affirmation.description && (
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">{affirmation.description}</p>
        )}
        
        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {affirmation.certifications.slice(0, 2).map((cert, idx) => (
              <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                {cert}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">${displayPrice.toFixed(2)}</span>
            {priceLabel && (
              <span className="text-[9px] text-text-muted">
                From ${AFFIRMATION_FORMAT_PRICING["Digital Download"].toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-clay text-clay hover:bg-clay/10 text-xs px-2"
            onClick={onCardClick}
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
