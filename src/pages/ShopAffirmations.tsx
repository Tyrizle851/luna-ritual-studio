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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                  <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
                    affirmation.badge === 'Sale' ? 'bg-foreground text-background' :
                    affirmation.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                    affirmation.badge === 'Most Popular' ? 'bg-accent text-accent-foreground' :
                    affirmation.badge === 'Staff Pick' ? 'bg-clay text-white' :
                    'bg-secondary text-foreground'
                  }`}>
                    {affirmation.badge}
                  </div>
                )}
                <div className="overflow-hidden aspect-[4/5] bg-secondary">
                  <img
                    src={affirmation.image}
                    alt={affirmation.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-2 sm:p-3 lg:p-4">
                  <div className="flex gap-0.5 sm:gap-1 mb-1 sm:mb-2 flex-wrap items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-gold text-gold" />
                    ))}
                    <span className="text-[10px] sm:text-xs text-text-muted ml-0.5 sm:ml-1">
                      ({affirmation.rating || 4.9})
                    </span>
                    <span className="px-1 py-0.5 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] font-medium">
                      {(affirmation.rating || 4.9) >= 4.5 ? 'Top Rated' : (affirmation.rating || 4.9) >= 4.0 ? 'Popular' : 'Verified'}
                    </span>
                    <span className="px-1 py-0.5 bg-accent/15 text-accent-foreground rounded text-[8px] sm:text-[10px] font-medium">
                      {affirmation.badge === 'Most Popular' ? 'Trending' : affirmation.reviewCount && affirmation.reviewCount > 500 ? 'Inspiring' : 'Digital'}
                    </span>
                    {affirmation.reviewCount && <span className="hidden sm:inline text-[10px] sm:text-xs text-text-muted"> · {(affirmation.reviewCount / 1000).toFixed(1)}K reviews</span>}
                  </div>
                  <h3 className="font-display text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2 line-clamp-2">{affirmation.title}</h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{affirmation.description}</p>

                  {affirmation.certifications && affirmation.certifications.length > 0 && (
                    <div className="hidden lg:flex flex-wrap gap-1.5 mb-3">
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

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      {affirmation.originalPrice ? (
                        <>
                          <span className="text-[10px] sm:text-xs lg:text-sm text-text-muted line-through">${affirmation.originalPrice}</span>
                          <span className="text-[8px] sm:text-xs bg-destructive/10 text-destructive px-1 sm:px-1.5 py-0.5 rounded">
                            Save ${affirmation.originalPrice - affirmation.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded font-medium">
                          Great Deal
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-semibold">${affirmation.price}</span>
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-clay text-clay hover:bg-clay/10 text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(affirmation);
                          setModalOpen(true);
                        }}
                      >
                        <span className="hidden sm:inline">Preview</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-clay hover:bg-clay-dark text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(affirmation);
                          setModalOpen(true);
                        }}
                      >
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
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
