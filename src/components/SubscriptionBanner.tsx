import { useState, useEffect } from "react";
import { X } from "lucide-react";
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
      <div 
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div 
          onClick={() => setShowPopup(true)}
          className="relative bg-background text-foreground px-8 py-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-0.5 border border-border/30"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute -top-2 -right-2 bg-foreground text-background rounded-full p-1.5 shadow-md hover:bg-foreground/80 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          
          <p className="text-base font-semibold text-center">
            Get 30% off<br />
            <span className="tracking-wide">SITEWIDE!</span>
          </p>
        </div>
      </div>
      
      <SubscriptionPopup open={showPopup} onOpenChange={setShowPopup} />
    </>
  );
};
