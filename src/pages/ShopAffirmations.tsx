import { useState } from "react";
import { Helmet } from "react-helmet";
import { affirmations } from "@/data/affirmations";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { generateAffirmationSchema } from "@/lib/seoUtils";
import { ProductModal } from "@/components/ProductModal";
import { Affirmation } from "@/data/affirmations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchBar } from "@/components/SearchBar";
import { SortFilter, SortOption } from "@/components/SortFilter";
import { WishlistButton } from "@/components/WishlistButton";
import { MobileFilterDrawer } from "@/components/MobileFilterDrawer";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { ProductCard } from "@/components/ProductCard";
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
      <Helmet>
        <title>Shop Affirmations — Digital Wallpaper Downloads & Prints | LunaRituals</title>
        <meta name="description" content="Downloadable affirmation art and prints for phone wallpaper, desktop backgrounds, and wall decor. Self-love, abundance, rest, and empowerment affirmations designed with intention." />
        <link rel="canonical" href="https://lunarituals.com/shop?tab=affirmations" />
        
        <meta property="og:title" content="Shop Affirmations — Digital Wallpapers & Prints" />
        <meta property="og:description" content="Beautiful affirmation designs to remind you of your worth, power, and magic." />
        <meta property="og:url" content="https://lunarituals.com/shop?tab=affirmations" />
        <meta property="og:type" content="website" />
        
        <meta name="keywords" content="affirmation phone wallpaper, self love wallpaper, affirmation printable, manifestation wallpaper, i am worthy wallpaper, digital affirmations, downloadable affirmations, phone wallpaper quotes" />
      </Helmet>
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
            {filteredAffirmations.map((affirmation) => (
              <ProductCard 
                key={affirmation.id}
                onClick={() => {
                  setSelectedProduct(affirmation);
                  setModalOpen(true);
                }}
              >
                <WishlistButton productId={affirmation.id} />
                {affirmation.badge && (
                  <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
                    {affirmation.badge}
                  </div>
                )}
                <div className="overflow-hidden aspect-[3/4] sm:aspect-[4/5] bg-secondary">
                  <img
                    src={affirmation.image}
                    alt={affirmation.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="card-body">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                    <span className="text-xs text-text-muted ml-1">
                      ({affirmation.rating || 4.9})
                      {affirmation.reviewCount && ` · ${(affirmation.reviewCount / 1000).toFixed(1)}K reviews`}
                    </span>
                  </div>
                  <h3 className="card-title">{affirmation.title}</h3>
                  <p className="card-desc text-text-secondary">{affirmation.description}</p>
                  
                  {affirmation.certifications && affirmation.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {affirmation.certifications.map((cert, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      {affirmation.originalPrice && (
                        <span className="text-sm text-text-muted line-through">${affirmation.originalPrice}</span>
                      )}
                      <span className="font-semibold">${affirmation.price}</span>
                      {affirmation.originalPrice && (
                        <span className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">
                          Save ${affirmation.originalPrice - affirmation.price}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-clay text-clay hover:bg-clay/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(affirmation);
                          setModalOpen(true);
                        }}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-clay hover:bg-clay-dark text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(affirmation);
                          setModalOpen(true);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </ProductCard>
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
