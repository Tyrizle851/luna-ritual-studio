import { useState } from "react";
import { affirmations } from "@/data/affirmations";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ProductModal } from "@/components/ProductModal";
import { Affirmation } from "@/data/affirmations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchBar } from "@/components/SearchBar";
import { SortFilter, SortOption } from "@/components/SortFilter";
import { WishlistButton } from "@/components/WishlistButton";
import { MobileFilterDrawer } from "@/components/MobileFilterDrawer";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { Star } from "lucide-react";

const ShopAffirmations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Affirmation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartStore();

  const categories = ["All", "Self-Love", "Abundance", "Rest", "Joy", "Strength"];
  
  const getFilteredAffirmations = () => {
    let filtered = selectedCategory === "All"
      ? affirmations
      : affirmations.filter(a => a.category === selectedCategory);
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    switch (sortOption) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered = [...filtered].reverse();
        break;
      default:
        break;
    }
    
    return filtered;
  };
  
  const filteredAffirmations = getFilteredAffirmations();

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <Breadcrumbs items={[
          { label: "Shop", href: "/shop" },
          { label: "Affirmations" }
        ]} />
        
        <h1 className="mb-4 text-center">Shop Affirmations</h1>
        <p className="text-center text-text-secondary mb-8 max-w-2xl mx-auto">
          Digital downloads to remind you of your worth, power, and magic
        </p>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full sm:w-auto flex gap-2">
            <div className="md:hidden">
              <MobileFilterDrawer
                sortValue={sortOption}
                onSortChange={setSortOption}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
          <SearchBar onSearch={setSearchQuery} placeholder="Search affirmations..." />
          <div className="hidden md:block">
            <SortFilter value={sortOption} onChange={setSortOption} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="hidden md:flex flex-wrap justify-center gap-3 mb-8">
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

        <p className="text-sm text-text-muted mb-4 text-center">
          Showing {filteredAffirmations.length} item{filteredAffirmations.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAffirmations.map((affirmation) => (
              <div key={affirmation.id} className="group relative">
                <WishlistButton productId={affirmation.id} />
                <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-secondary">
                <img
                  src={affirmation.image}
                  alt={affirmation.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
                <span className="text-xs text-text-muted ml-1">(4.9)</span>
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
        )}

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
