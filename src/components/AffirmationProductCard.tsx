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
      
      <div className="card-body">
        <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{affirmation.category}</p>
        <h3 className="card-title group-hover:text-clay transition-colors">{affirmation.title}</h3>
        
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
        
        <p className="card-desc text-text-secondary">{affirmation.description}</p>
        
        {affirmation.certifications && affirmation.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {affirmation.certifications.slice(0, 3).map((cert, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-secondary/50 rounded-full text-xs text-text-muted">
                {cert}
              </span>
            ))}
          </div>
        )}
        
        <div className="card-footer">
          <div className="hidden sm:flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-base font-semibold text-text-primary">${affirmation.price.toFixed(2)}</span>
              <span className="text-[10px] text-text-muted">Digital Download</span>
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
          <div className="sm:hidden">
            <Button
              size="sm"
              variant="solid"
              className="btn-full-mobile bg-clay text-white hover:bg-clay-dark transition-all duration-200"
              onClick={onAddToCart}
            >
              View Options
            </Button>
          </div>
        </div>
      </div>
    </ProductCard>
  );
};
