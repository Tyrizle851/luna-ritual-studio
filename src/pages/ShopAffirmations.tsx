import { useState } from "react";
import { affirmations } from "@/data/affirmations";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ProductModal } from "@/components/ProductModal";
import { Affirmation } from "@/data/affirmations";

const ShopAffirmations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Affirmation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-clay text-clay hover:bg-clay/10"
                    onClick={() => {
                      setSelectedProduct(affirmation);
                      setModalOpen(true);
                    }}
                  >
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="bg-clay hover:bg-clay-dark text-white"
                    onClick={() => {
                      setSelectedProduct(affirmation);
                      setModalOpen(true);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProductModal
          product={selectedProduct}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </div>
  );
};

export default ShopAffirmations;
