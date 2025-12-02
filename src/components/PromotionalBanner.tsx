import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PromotionalBannerProps {
  onBannerClick?: () => void;
}

export const PromotionalBanner = ({ onBannerClick }: PromotionalBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-clay to-gold text-white py-2.5 px-4 relative">
      <div 
        className="container-custom flex items-center justify-center gap-4 text-center cursor-pointer"
        onClick={onBannerClick}
      >
        <p className="text-sm font-medium">
          ✨ Subscription Special: Unlock unlimited affirmation generations with Premium
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute right-4 h-6 w-6 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
