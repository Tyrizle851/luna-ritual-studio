import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

interface Affirmation {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
}

interface AffirmationCarouselProps {
  affirmations: Affirmation[];
}

export const AffirmationCarousel = ({ affirmations }: AffirmationCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { addItem } = useCartStore();
  
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

  const handleAddToCart = (affirmation: Affirmation) => {
    addItem({
      id: affirmation.id,
      title: affirmation.title,
      price: affirmation.price,
      image: affirmation.image,
      type: 'affirmation',
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="relative px-4 sm:px-0">
      {/* Scroll Container */}
      <div
        id="affirmation-scroll"
        className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {affirmations.map((affirmation) => (
          <div key={affirmation.id} className="flex-none w-[280px] sm:w-[300px] group animate-fade-up">
            <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-secondary">
              <img
                src={affirmation.image}
                alt={affirmation.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-lg sm:text-xl mb-2">{affirmation.title}</h3>
            {affirmation.description && (
              <p className="text-sm text-text-secondary italic mb-3">{affirmation.description}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="font-semibold">${affirmation.price}</span>
              <Button
                size="sm"
                variant="outline"
                className="border-clay text-clay hover:bg-clay/10"
                onClick={() => handleAddToCart(affirmation)}
              >
                Add <ShoppingCart className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-3 sm:gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="rounded-full border-clay text-clay hover:bg-clay/10 h-10 w-10 sm:h-11 sm:w-11"
          disabled={scrollPosition === 0}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="rounded-full border-clay text-clay hover:bg-clay/10 h-10 w-10 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
};
