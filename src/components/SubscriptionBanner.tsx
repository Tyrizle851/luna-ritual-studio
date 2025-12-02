import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SubscriptionPopup } from "./SubscriptionPopup";

export const SubscriptionBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner before
    const dismissed = localStorage.getItem("subscription-banner-v2");
    if (!dismissed) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("subscription-banner-v2", "true");
  };

  if (!isVisible) return <SubscriptionPopup open={showPopup} onOpenChange={setShowPopup} />;

  return (
    <>
      <div className="fixed bottom-3 left-3 z-40 animate-fade-up sm:bottom-4 sm:left-4">
        <div 
          onClick={() => setShowPopup(true)}
          className="relative bg-clay/90 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-sm cursor-pointer hover:bg-clay hover:shadow-md transition-all text-xs sm:text-sm"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute -top-1.5 -right-1.5 bg-background/90 text-muted-foreground rounded-full p-0.5 shadow-sm hover:bg-background transition-colors"
          >
            <X className="h-2.5 w-2.5" />
          </button>
          
          <span className="font-medium">
            30% off first bundle
          </span>
        </div>
      </div>
      
      <SubscriptionPopup open={showPopup} onOpenChange={setShowPopup} />
    </>
  );
};
