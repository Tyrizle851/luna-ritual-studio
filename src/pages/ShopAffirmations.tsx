import { useState } from "react";
import { affirmations } from "@/data/affirmations";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

const ShopAffirmations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addItem } = useCartStore();

  const categories = ["All", "Self-Love", "Abundance", "Rest", "Joy", "Strength"];
  
  const filteredAffirmations = selectedCategory === "All"
    ? affirmations
    : affirmations.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <h1 className="mb-4 text-center">Shop Affirmations</h1>
        <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
          Digital downloads to remind you of your worth, power, and magic
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "bg-clay hover:bg-clay-dark text-white" : "border-clay text-clay hover:bg-clay/10"}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAffirmations.map((affirmation) => (
            <div key={affirmation.id} className="group">
              <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-secondary">
                <img
                  src={affirmation.image}
                  alt={affirmation.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl mb-2">{affirmation.title}</h3>
              <p className="text-sm text-text-secondary mb-3">{affirmation.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold">${affirmation.price}</span>
                <Button
                  size="sm"
                  className="bg-clay hover:bg-clay-dark text-white"
                  onClick={() => addItem({
                    id: affirmation.id,
                    title: affirmation.title,
                    price: affirmation.price,
                    image: affirmation.image,
                    format: affirmation.formats[0],
                    type: "affirmation"
                  })}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopAffirmations;
