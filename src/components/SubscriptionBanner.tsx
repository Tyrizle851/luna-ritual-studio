import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { SubscriptionPopup } from "./SubscriptionPopup";

export const SubscriptionBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner before
    const dismissed = localStorage.getItem("subscription-banner-dismissed");
    if (!dismissed) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("subscription-banner-dismissed", "true");
  };

  if (!isVisible) return <SubscriptionPopup open={showPopup} onOpenChange={setShowPopup} />;

  return (
    <>
      <div className="fixed bottom-4 left-4 z-40 animate-fade-up">
        <div 
          onClick={() => setShowPopup(true)}
          className="relative bg-gradient-to-r from-clay to-gold text-white px-5 py-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all hover:scale-105 group"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute -top-2 -right-2 bg-background text-foreground rounded-full p-1 shadow-md hover:bg-muted transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium whitespace-nowrap">
              30% off first bundle
            </span>
          </div>
        </div>
      </div>
      
      <SubscriptionPopup open={showPopup} onOpenChange={setShowPopup} />
    </>
  );
};
