import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Affirmation {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface AffirmationCarouselProps {
  affirmations: Affirmation[];
}

export const AffirmationCarousel = ({ affirmations }: AffirmationCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("affirmation-scroll");
    if (!container) return;
    
    const scrollAmount = 400;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <div className="relative">
      {/* Scroll Container */}
      <div
        id="affirmation-scroll"
        className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {affirmations.map((affirmation) => (
          <div key={affirmation.id} className="flex-none w-[300px] group animate-fade-up">
            <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-secondary">
              <img
                src={affirmation.image}
                alt={affirmation.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-xl mb-2">{affirmation.title}</h3>
            <span className="font-semibold">${affirmation.price}</span>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="rounded-full border-clay text-clay hover:bg-clay/10"
          disabled={scrollPosition === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="rounded-full border-clay text-clay hover:bg-clay/10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
