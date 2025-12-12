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
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        )}
      </div>
      
      <div className="p-2 sm:p-3 lg:p-4">
        <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider truncate">{affirmation.category}</p>
        <h3 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base group-hover:text-clay transition-colors line-clamp-2">{affirmation.title}</h3>

        {affirmation.rating && (
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-text-primary">{affirmation.rating}</span>
            <span className="px-1 py-0.5 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] font-medium">
              {affirmation.rating >= 4.5 ? 'Top Rated' : affirmation.rating >= 4.0 ? 'Popular' : 'Verified'}
            </span>
            <span className="px-1 py-0.5 bg-accent/15 text-accent-foreground rounded text-[8px] sm:text-[10px] font-medium">
              {affirmation.badge === 'Most Popular' ? 'Trending' : affirmation.reviewCount && affirmation.reviewCount > 500 ? 'Inspiring' : 'Digital'}
            </span>
            {affirmation.reviewCount && (
              <span className="text-[10px] sm:text-xs text-text-muted hidden sm:inline">
                ({affirmation.reviewCount >= 1000 ? `${(affirmation.reviewCount / 1000).toFixed(1)}K` : affirmation.reviewCount})
              </span>
            )}
          </div>
        )}

        {affirmation.socialProof && (
          <p className="text-[10px] sm:text-xs text-text-muted mb-2 hidden sm:block">{affirmation.socialProof}</p>
        )}

        <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{affirmation.description}</p>

        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="hidden lg:flex flex-wrap gap-1.5 mb-3">
            {affirmation.certifications.slice(0, 3).map((cert, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-secondary/50 rounded-full text-xs text-text-muted">
                {cert}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-semibold text-text-primary">${affirmation.price.toFixed(2)}</span>
            <span className="text-[8px] sm:text-[10px] text-text-muted">
              Digital Download
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
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
