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
        <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
          affirmation.badge === 'Sale' ? 'bg-foreground text-background' :
          affirmation.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
          affirmation.badge === 'Most Popular' ? 'bg-accent text-accent-foreground' :
          affirmation.badge === 'Staff Pick' ? 'bg-clay text-white' :
          'bg-secondary text-foreground'
        }`}>
          {affirmation.badge}
        </div>
      )}
      
      <div className="overflow-hidden aspect-[3/4] sm:aspect-[4/5] bg-secondary">
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
      
      <div className="card-body">
        <p className="card-brand">{affirmation.category}</p>
        <h3 className="card-title group-hover:text-clay transition-colors">{affirmation.title}</h3>
        
        {affirmation.rating && (
          <div className="card-rating">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-medium text-text-primary">{affirmation.rating}</span>
            {affirmation.reviewCount && (
              <span className="text-text-muted hidden sm:inline">
                ({affirmation.reviewCount >= 1000 ? `${(affirmation.reviewCount / 1000).toFixed(1)}K` : affirmation.reviewCount})
              </span>
            )}
          </div>
        )}
        
        {affirmation.socialProof && (
          <p className="hidden sm:block text-xs text-text-muted mb-1">{affirmation.socialProof}</p>
        )}
        
        <p className="card-desc text-text-secondary">{affirmation.description}</p>
        
        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
            {affirmation.certifications.slice(0, 3).map((cert, idx) => (
              <span key={idx} className="card-cert">
                {cert}
              </span>
            ))}
          </div>
        )}
        
        <div className="card-footer flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex flex-col">
            <span className="card-price text-text-primary">${affirmation.price.toFixed(2)}</span>
            <span className="text-[8px] sm:text-[10px] text-text-muted">
              Digital Download
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="btn-card-mobile w-full sm:w-auto border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
            onClick={onAddToCart}
          >
            View Options
          </Button>
        </div>
      </div>
    </ProductCard>
  );
};
