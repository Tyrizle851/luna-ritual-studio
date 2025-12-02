import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SubscriptionPopup } from "./SubscriptionPopup";

interface SubscriptionBannerProps {
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

export const SubscriptionBanner = ({ externalOpen, onExternalOpenChange }: SubscriptionBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("subscription-banner-v2");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (externalOpen !== undefined) {
      setShowPopup(externalOpen);
    }
  }, [externalOpen]);

  const handlePopupChange = (open: boolean) => {
    setShowPopup(open);
    onExternalOpenChange?.(open);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("subscription-banner-v2", "true");
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-3 left-3 z-40 animate-fade-up">
          <div 
            onClick={() => handlePopupChange(true)}
            className="relative bg-background/95 backdrop-blur-sm border border-border/50 text-foreground px-3 py-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:border-clay/30 transition-all text-xs"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="absolute -top-1 -right-1 bg-muted text-muted-foreground rounded-full p-0.5 hover:bg-muted/80 transition-colors"
            >
              <X className="h-2.5 w-2.5" />
            </button>
            
            <span className="font-medium text-clay">
              30% off first bundle
            </span>
          </div>
        </div>
      )}
      
      <SubscriptionPopup open={showPopup} onOpenChange={handlePopupChange} />
    </>
  );
};
