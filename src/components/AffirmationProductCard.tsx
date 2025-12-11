import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductCard } from "@/components/ProductCard";
import { Affirmation, AFFIRMATION_FORMAT_PRICING } from "@/data/affirmations";
import { useAffirmationDigitalImage } from "@/hooks/useAffirmationDigitalImage";
import { Skeleton } from "@/components/ui/skeleton";

interface AffirmationProductCardProps {
  affirmation: Affirmation;
  onCardClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

export const AffirmationProductCard = ({ 
  affirmation, 
  onCardClick, 
  onAddToCart 
}: AffirmationProductCardProps) => {
  // Use generated digital image from storage, fallback to static image
  const { imageUrl, isLoading } = useAffirmationDigitalImage(affirmation.id);
  const displayImage = imageUrl || affirmation.image;
  
  return (
    <ProductCard onClick={onCardClick}>
      <WishlistButton productId={affirmation.id} />
      {affirmation.badge && (
        <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
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
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        )}
      </div>
      
      <div className="p-2 sm:p-4">
        <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider">{affirmation.category}</p>
        <h3 className="font-medium mb-1 sm:mb-2 text-xs sm:text-base group-hover:text-clay transition-colors line-clamp-1">{affirmation.title}</h3>
        
        {affirmation.rating && (
          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-primary text-primary" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-text-primary">{affirmation.rating}</span>
            {affirmation.reviewCount && (
              <span className="text-[10px] sm:text-xs text-text-muted">
                ({affirmation.reviewCount >= 1000 ? `${(affirmation.reviewCount / 1000).toFixed(1)}K` : affirmation.reviewCount})
              </span>
            )}
          </div>
        )}
        
        <p className="hidden sm:block text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">{affirmation.description}</p>
        
        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
            {affirmation.certifications.slice(0, 3).map((cert, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-secondary/50 rounded-full text-xs text-text-muted">
                {cert}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-xs sm:text-base font-semibold text-text-primary">${affirmation.price.toFixed(2)}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs h-7 sm:h-9 px-2 sm:px-3"
            onClick={onAddToCart}
          >
            <span className="hidden sm:inline">View Options</span>
            <span className="sm:hidden">View</span>
          </Button>
        </div>
      </div>
    </ProductCard>
  );
};
