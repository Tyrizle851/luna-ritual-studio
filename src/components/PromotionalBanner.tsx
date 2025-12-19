import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface PromotionalBannerProps {
  onBannerClick?: () => void;
}

const announcements = [
  { text: "Unlock FREE downloads the more you spend!", link: "/shop" },
  { text: "New: Affirmation Studio — Create your own custom art", link: "/affirmation-builder", linkText: "Try Now" },
  { text: "The more you buy, the more you save.", link: "/collections", linkText: "Shop Now" },
];

export const PromotionalBanner = ({ onBannerClick }: PromotionalBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <div className="bg-secondary text-foreground py-2.5 px-4 relative">
      <div className="container-custom flex items-center justify-center gap-4">
        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
          className="absolute left-4 h-6 w-6 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Announcement text */}
        <p className="text-xs font-medium text-center font-body">
          {current.linkText ? (
            <>
              {current.text.replace(current.linkText, '')} <Link to={current.link} className="underline hover:no-underline font-semibold">{current.linkText}</Link> →
            </>
          ) : (
            current.text
          )}
        </p>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
          className="absolute right-12 h-6 w-6 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute right-4 h-6 w-6 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
