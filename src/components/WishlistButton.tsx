import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export const WishlistButton = ({ productId, className }: WishlistButtonProps) => {
  const { items, addItem, removeItem } = useWishlistStore();
  const isInWishlist = items.includes(productId);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeItem(productId);
    } else {
      addItem(productId);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWishlist}
      className={cn(
        "absolute top-2 right-2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300",
        className
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isInWishlist ? "fill-clay text-clay" : "text-text-muted"
        )}
      />
    </Button>
  );
};