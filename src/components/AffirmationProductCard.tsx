import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductCard } from "@/components/ProductCard";
import { Affirmation, AFFIRMATION_FORMAT_PRICING } from "@/data/affirmations";
import { useAffirmationDisplayImage } from "@/hooks/useAffirmationDisplayImage";
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
  const { imageUrl, isLoading, variationType } = useAffirmationDisplayImage(affirmation.id);
  
  // Use database image if available, otherwise fall back to static image
  const displayImage = imageUrl || affirmation.image;
  
  // Get price label based on displayed variation
  const getPriceLabel = () => {
    if (!variationType) return null;
    switch (variationType) {
      case "canvas": return "Canvas";
      case "unframed": return "Poster";
      case "framed": return "Framed";
      default: return null;
    }
  };

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

  const priceLabel = getPriceLabel();
  const displayPrice = getDisplayPrice();

  return (
    <ProductCard onClick={onCardClick}>
      <WishlistButton productId={affirmation.id} />
      {affirmation.badge && (
        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
          affirmation.badge === 'Sale' ? 'bg-foreground text-background' :
          affirmation.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
          affirmation.badge === 'Most Popular' ? 'bg-accent text-accent-foreground' :
          affirmation.badge === 'Staff Pick' ? 'bg-clay text-white' :
          'bg-secondary text-foreground'
        }`}>
          {affirmation.badge}
        </div>
      )}
      
      {/* Format indicator badge */}
      {priceLabel && (
        <div className="absolute top-3 right-10 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
          {priceLabel}
        </div>
      )}
      
      <div className="overflow-hidden aspect-[4/5] bg-secondary">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={displayImage}
            alt={affirmation.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        )}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{affirmation.category}</p>
        <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{affirmation.title}</h3>
        
        {affirmation.rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-xs font-medium text-text-primary">{affirmation.rating}</span>
            {affirmation.reviewCount && (
              <span className="text-xs text-text-muted">
                ({affirmation.reviewCount >= 1000 ? `${(affirmation.reviewCount / 1000).toFixed(1)}K` : affirmation.reviewCount})
              </span>
            )}
          </div>
        )}
        
        {affirmation.socialProof && (
          <p className="text-xs text-text-muted mb-2">{affirmation.socialProof}</p>
        )}
        
        <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">{affirmation.description}</p>
        
        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {affirmation.certifications.slice(0, 3).map((cert, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-secondary/50 rounded-full text-xs text-text-muted">
                {cert}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-text-primary">${displayPrice.toFixed(2)}</span>
            {priceLabel && (
              <span className="text-[10px] text-text-muted">
                From ${AFFIRMATION_FORMAT_PRICING["Digital Download"].toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
            onClick={onAddToCart}
          >
            View Options
          </Button>
        </div>
      </div>
    </ProductCard>
  );
};
