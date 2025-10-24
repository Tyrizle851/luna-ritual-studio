import { useState } from "react";
import { affiliateProducts } from "@/data/affiliateProducts";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ShopLifestyle = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fashion", "Home", "Wellness", "Beauty"];
  
  const filteredProducts = selectedCategory === "All"
    ? affiliateProducts
    : affiliateProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <h1 className="mb-4 text-center">The Ritual Edit</h1>
        <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
          Curated finds for intentional living
        </p>

        {/* Category Tabs */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-text-muted mb-1">{product.brand}</p>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <p className="text-sm text-text-secondary italic mb-3">{product.caption}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{product.priceRange}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-clay text-clay hover:bg-clay/10"
                  asChild
                >
                  <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                    View <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-text-muted mt-12">
          We may earn commission from curated links • Supports our work
        </p>
      </div>
    </div>
  );
};

export default ShopLifestyle;
