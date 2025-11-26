import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart, Shirt, Flame, Pill, BookOpen, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchBar } from "@/components/SearchBar";
import { SortFilter, SortOption } from "@/components/SortFilter";
import { WishlistButton } from "@/components/WishlistButton";
import { MobileFilterDrawer } from "@/components/MobileFilterDrawer";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fashionProducts, FashionProduct } from "@/data/fashion";
import { candles } from "@/data/candles";
import { supplements } from "@/data/supplements";
import { affirmations } from "@/data/affirmations";
import { books } from "@/data/books";
import { useCartStore } from "@/store/cartStore";
import { ProductModal } from "@/components/ProductModal";
import { FashionProductModal } from "@/components/FashionProductModal";
import { CandleModal } from "@/components/CandleModal";
import { SupplementModal } from "@/components/SupplementModal";
import { BookModal } from "@/components/BookModal";
import { Candle } from "@/data/candles";
import { Supplement } from "@/data/supplements";
import { Book } from "@/data/books";

const ITEMS_PER_PAGE = 6;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState("fashion");
  const [fashionPage, setFashionPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["fashion", "candles", "supplements", "affirmations", "books"].includes(tab)) {
      setSelectedTab(tab);
    }
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);
  const [candlesPage, setCandlesPage] = useState(1);
  const [supplementsPage, setSupplementsPage] = useState(1);
  const [affirmationsPage, setAffirmationsPage] = useState(1);
  const [booksPage, setBooksPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFashionProduct, setSelectedFashionProduct] = useState<FashionProduct | null>(null);
  const [isFashionModalOpen, setIsFashionModalOpen] = useState(false);
  const [selectedCandle, setSelectedCandle] = useState<Candle | null>(null);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isCandleModalOpen, setIsCandleModalOpen] = useState(false);
  const [isSupplementModalOpen, setIsSupplementModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  
  const { addItem } = useCartStore();

  const filterAndSortItems = (items: any[]) => {
    let filtered = items;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        (item.name?.toLowerCase() || item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
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

  const getPaginatedItems = (items: any[], page: number) => {
    const filtered = filterAndSortItems(items);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  };
  
  const getFilteredCount = (items: any[]) => {
    return filterAndSortItems(items).length;
  };

  const getTotalPages = (itemsLength: number) => {
    return Math.ceil(itemsLength / ITEMS_PER_PAGE);
  };

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="mt-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const handleAddToCart = (product: any, type: string) => {
    let cartItem;
    if (type === "affirmation") {
      cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
        format: product.formats[0],
      };
    } else {
      cartItem = {
        id: product.id,
        title: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      };
    }
    addItem(cartItem);
  };

  const tabLabels: Record<string, string> = {
    fashion: "Fashion",
    candles: "Candles", 
    supplements: "Supplements",
    affirmations: "Affirmations",
    books: "Books"
  };

  const categorySubtitles: Record<string, string> = {
    fashion: "Timeless pieces for your wardrobe",
    candles: "Set the mood with artisan scents",
    supplements: "Nourish your wellness journey",
    affirmations: "Daily inspiration for intentional living",
    books: "Stories to inspire your journey"
  };

  const getCategoryCounts = () => ({
    fashion: fashionProducts.length,
    candles: candles.length,
    supplements: supplements.length,
    affirmations: affirmations.length,
    books: books.length
  });

  const getMetaData = () => {
    const metas: Record<string, { title: string; description: string; keywords: string }> = {
      fashion: {
        title: "Shop Fashion — Curated Clothing & Accessories | LunaRituals",
        description: "Discover our curated collection of intentional fashion pieces. From cozy cardigans to knee-high boots, find elevated basics and timeless styles for mindful living.",
        keywords: "fashion finds, intentional clothing, minimalist wardrobe, curated fashion, women's clothing, knee high boots, cardigans, sustainable fashion"
      },
      candles: {
        title: "Shop Candles — Premium Scented Candles for Home | LunaRituals",
        description: "Create a calming atmosphere with our hand-picked selection of premium candles. Featuring Yankee Candle, woodwick, and artisanal brands for cozy, intentional living.",
        keywords: "scented candles, home fragrance, yankee candle, autumn candles, cozy home, aromatherapy candles, premium candles"
      },
      supplements: {
        title: "Shop Wellness Supplements — Vitamins & Natural Health | LunaRituals",
        description: "Support your wellness journey with curated supplements and vitamins. From collagen to magnesium, ashwagandha to probiotics—quality products for intentional self-care.",
        keywords: "wellness supplements, vitamins, collagen supplements, magnesium, ashwagandha, probiotics, natural health, self-care supplements"
      },
      affirmations: {
        title: "Shop Affirmations — Digital Wallpapers & Affirmation Prints | LunaRituals",
        description: "Downloadable affirmation art for your phone, desktop, and walls. Beautiful designs with powerful messages for self-love, abundance, rest, and intentional living.",
        keywords: "affirmation wallpaper, digital affirmations, affirmation prints, phone wallpaper, self-love wallpaper, manifestation art, downloadable affirmations"
      },
      books: {
        title: "Shop Books — Fantasy & Fiction Book Recommendations | LunaRituals",
        description: "Curated book recommendations for cozy reading moments. Featuring beloved fantasy series, romantic fiction, and stories to transport and inspire you.",
        keywords: "book recommendations, fantasy books, fiction books, reading list, cozy reading, book lovers, fourth wing, acotar"
      }
    };
    return metas[selectedTab] || metas.fashion;
  };

  const currentMeta = getMetaData();

  return (
    <PageTransition>
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <link rel="canonical" href={`https://lunarituals.com/shop?tab=${selectedTab}`} />
        
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta property="og:url" content={`https://lunarituals.com/shop?tab=${selectedTab}`} />
        <meta property="og:type" content="website" />
        
        <meta name="keywords" content={currentMeta.keywords} />
      </Helmet>
      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <Breadcrumbs items={[
            { label: "Shop", href: "/shop" },
            { label: tabLabels[selectedTab] || "Collection" }
          ]} />
          
          {/* Hero Section */}
          <div className="text-center mb-6 mt-2">
            <motion.h1 
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-2 text-4xl sm:text-5xl md:text-6xl font-display tracking-tight flex items-center justify-center gap-3"
            >
              <span className="text-clay text-2xl sm:text-3xl">✦</span>
              Shop {tabLabels[selectedTab]}
            </motion.h1>
            <motion.p 
              key={`${selectedTab}-subtitle`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto"
            >
              {categorySubtitles[selectedTab]}
            </motion.p>
          </div>

          {/* Tab Navigation with Counts */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            {/* Mobile: Two-row layout */}
            <div className="sm:hidden mb-6 space-y-2">
              <div className="flex justify-center">
                <TabsList className="inline-flex h-auto items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                  <TabsTrigger 
                    value="affirmations" 
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-4 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Affirmations</span>
                    <span className="text-xs opacity-60">({getCategoryCounts().affirmations})</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex justify-center">
                <TabsList className="inline-flex h-auto items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                  <TabsTrigger 
                    value="fashion" 
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    <Shirt className="h-4 w-4" />
                    <span>Fashion</span>
                    <span className="text-xs opacity-60">({getCategoryCounts().fashion})</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="candles" 
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    <Flame className="h-4 w-4" />
                    <span>Candles</span>
                    <span className="text-xs opacity-60">({getCategoryCounts().candles})</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="supplements" 
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    <Pill className="h-4 w-4" />
                    <span className="text-xs">Supplements</span>
                    <span className="text-xs opacity-60">({getCategoryCounts().supplements})</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="books" 
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Books</span>
                    <span className="text-xs opacity-60">({getCategoryCounts().books})</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Desktop: Single row layout */}
            <div className="hidden sm:flex justify-center w-full mb-6">
              <TabsList className="inline-flex h-auto items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <TabsTrigger 
                  value="fashion" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-4 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <Shirt className="h-4 w-4" />
                  <span>Fashion</span>
                  <span className="text-xs opacity-60">({getCategoryCounts().fashion})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="candles" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-4 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <Flame className="h-4 w-4" />
                  <span>Candles</span>
                  <span className="text-xs opacity-60">({getCategoryCounts().candles})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="supplements" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-4 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <Pill className="h-4 w-4" />
                  <span>Supplements</span>
                  <span className="text-xs opacity-60">({getCategoryCounts().supplements})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="books" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-4 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Books</span>
                  <span className="text-xs opacity-60">({getCategoryCounts().books})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="affirmations" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-4 py-2.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Affirmations</span>
                  <span className="text-xs opacity-60">({getCategoryCounts().affirmations})</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Search and Sort Controls - Inline & Minimal */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6 mt-4">
              <div className="flex-1 max-w-xl">
                <SearchBar onSearch={setSearchQuery} placeholder="Search products..." />
              </div>
              <div className="flex items-center gap-3">
                <div className="md:hidden">
                  <MobileFilterDrawer
                    sortValue={sortOption}
                    onSortChange={setSortOption}
                    categories={[]}
                    selectedCategory=""
                    onCategoryChange={() => {}}
                  />
                </div>
                <div className="hidden md:block">
                  <SortFilter value={sortOption} onChange={setSortOption} />
                </div>
              </div>
            </div>

            {/* Decorative Separator */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-md"></div>
              <span className="mx-4 text-clay text-sm">✦</span>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-md"></div>
            </div>

          <AnimatePresence mode="wait">
            {/* Fashion Tab */}
            <TabsContent value="fashion" key="fashion">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay"></span>
                  Showing {getPaginatedItems(fashionProducts, fashionPage).length} of {getFilteredCount(fashionProducts)} items
                </p>
                
                {isLoading ? (
                  <ProductGridSkeleton />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getPaginatedItems(fashionProducts, fashionPage).map((product) => (
                      <div 
                        key={product.id} 
                        className="group relative cursor-pointer"
                        onClick={() => {
                          setSelectedFashionProduct(product);
                          setIsFashionModalOpen(true);
                        }}
                      >
                        <WishlistButton productId={product.id} />
                        {product.badge && (
                          <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                            product.badge === 'Sale' ? 'bg-foreground text-background' :
                            product.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                            product.badge === 'Top Pick' ? 'bg-accent text-accent-foreground' :
                            'bg-secondary text-foreground'
                          }`}>
                            {product.badge}
                          </div>
                        )}
                        <div className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-secondary transition-all duration-300 group-hover:shadow-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{product.brand}</p>
                  <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{product.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                  
                  {/* Rating if available */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3 text-xs">
                      <span className="text-primary">★</span>
                      <span className="font-semibold">{product.rating}</span>
                      {product.reviewCount && (
                        <span className="text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-text-muted line-through">${product.originalPrice}</span>
                      )}
                      <span className="text-base font-semibold text-text-primary">${product.price}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(product.affiliateUrl, '_blank');
                      }}
                    >
                      Shop Now
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {renderPagination(fashionPage, getTotalPages(getFilteredCount(fashionProducts)), setFashionPage)}
              </motion.div>
            </TabsContent>

          {/* Candles Tab */}
          <TabsContent value="candles" key="candles">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay"></span>
                Showing {getPaginatedItems(candles, candlesPage).length} of {getFilteredCount(candles)} items
              </p>
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPaginatedItems(candles, candlesPage).map((candle) => (
                    <div 
                      key={candle.id} 
                      className="group relative cursor-pointer"
                      onClick={() => {
                        setSelectedCandle(candle);
                        setIsCandleModalOpen(true);
                      }}
                    >
                      <WishlistButton productId={candle.id} />
                      {candle.badge && (
                        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                          candle.badge === 'Sale' ? 'bg-foreground text-background' :
                          candle.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                          candle.badge === 'Best Value' ? 'bg-accent text-accent-foreground' :
                          'bg-secondary text-foreground'
                        }`}>
                          {candle.badge}
                        </div>
                      )}
                      <div className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-secondary transition-all duration-300 group-hover:shadow-xl">
                    <img
                      src={candle.image}
                      alt={candle.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{candle.brand}</p>
                  <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{candle.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">{candle.description}</p>
                  
                  {/* Rating if available */}
                  {candle.rating && (
                    <div className="flex items-center gap-1 mb-3 text-xs">
                      <span className="text-primary">★</span>
                      <span className="font-semibold">{candle.rating}</span>
                      {candle.reviewCount && (
                        <span className="text-muted-foreground">({candle.reviewCount.toLocaleString()})</span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {candle.originalPrice && (
                        <span className="text-sm text-text-muted line-through">${candle.originalPrice}</span>
                      )}
                      <span className="text-base font-semibold text-text-primary">${candle.price}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(candle.affiliateUrl, '_blank');
                      }}
                    >
                      Shop Now
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {renderPagination(candlesPage, getTotalPages(getFilteredCount(candles)), setCandlesPage)}
            </motion.div>
          </TabsContent>

          {/* Supplements Tab */}
          <TabsContent value="supplements" key="supplements">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay"></span>
                Showing {getPaginatedItems(supplements, supplementsPage).length} of {getFilteredCount(supplements)} items
              </p>
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPaginatedItems(supplements, supplementsPage).map((supplement) => (
                    <div 
                      key={supplement.id} 
                      className="group relative cursor-pointer"
                      onClick={() => {
                        setSelectedSupplement(supplement);
                        setIsSupplementModalOpen(true);
                      }}
                    >
                      <WishlistButton productId={supplement.id} />
                      {supplement.badge && (
                        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                          supplement.badge === 'Sale' ? 'bg-foreground text-background' :
                          supplement.badge === 'Best Value' ? 'bg-primary text-primary-foreground' :
                          supplement.badge === 'Top Pick' ? 'bg-accent text-accent-foreground' :
                          'bg-secondary text-foreground'
                        }`}>
                          {supplement.badge}
                        </div>
                      )}
                      <div className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-white transition-all duration-300 group-hover:shadow-xl">
                    <img
                      src={supplement.image}
                      alt={supplement.name}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{supplement.category}</p>
                  <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{supplement.name}</h3>
                  
                  {/* Rating if available */}
                  {supplement.rating && (
                    <div className="flex items-center gap-1 mb-2 text-xs">
                      <span className="text-primary">★</span>
                      <span className="font-semibold">{supplement.rating}</span>
                      {supplement.reviewCount && (
                        <span className="text-muted-foreground">({supplement.reviewCount.toLocaleString()})</span>
                      )}
                    </div>
                  )}
                  
                  <p className="text-sm text-text-secondary leading-relaxed mb-2 line-clamp-2">{supplement.description}</p>
                  <p className="text-xs text-text-muted mb-4">{supplement.servings}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {supplement.originalPrice && (
                        <span className="text-sm text-text-muted line-through">${supplement.originalPrice}</span>
                      )}
                      <span className="text-base font-semibold text-text-primary">${supplement.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {supplement.affiliateUrl && (
                        <span className="text-[10px] text-text-muted/60 italic">via Amazon</span>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          supplement.affiliateUrl ? window.open(supplement.affiliateUrl, '_blank') : handleAddToCart(supplement, "supplement");
                        }}
                      >
                        {supplement.affiliateUrl ? (
                          <>Shop Now <ExternalLink className="ml-1 h-3 w-3" /></>
                        ) : (
                          <>Add to Cart <ShoppingCart className="ml-1 h-3 w-3" /></>
                        )}
                      </Button>
                    </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {renderPagination(supplementsPage, getTotalPages(getFilteredCount(supplements)), setSupplementsPage)}
            </motion.div>
          </TabsContent>

          {/* Affirmations Tab */}
          <TabsContent value="affirmations" key="affirmations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay"></span>
                Showing {getPaginatedItems(affirmations, affirmationsPage).length} of {getFilteredCount(affirmations)} items
              </p>
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPaginatedItems(affirmations, affirmationsPage).map((affirmation) => (
                    <div key={affirmation.id} className="group cursor-pointer relative">
                      <WishlistButton productId={affirmation.id} />
                      <div
                    className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-secondary transition-all duration-300 group-hover:shadow-xl"
                    onClick={() => {
                      setSelectedProduct(affirmation);
                      setIsModalOpen(true);
                    }}
                  >
                    <img
                      src={affirmation.image}
                      alt={affirmation.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{affirmation.category}</p>
                  <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{affirmation.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{affirmation.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-text-primary">${affirmation.price}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(affirmation, "affirmation");
                      }}
                    >
                      Add to Cart <ShoppingCart className="ml-1 h-3 w-3" />
                    </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {renderPagination(affirmationsPage, getTotalPages(getFilteredCount(affirmations)), setAffirmationsPage)}
            </motion.div>
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value="books" key="books">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-sm text-text-muted mb-6 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay"></span>
                Showing {getPaginatedItems(books, booksPage).length} of {getFilteredCount(books)} items
              </p>
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPaginatedItems(books, booksPage).map((book) => (
                    <div 
                      key={book.id} 
                      className="group relative cursor-pointer"
                      onClick={() => {
                        setSelectedBook(book);
                        setIsBookModalOpen(true);
                      }}
                    >
                      <WishlistButton productId={book.id} />
                      {book.badge && (
                        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                          book.badge === 'Sale' ? 'bg-foreground text-background' :
                          book.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                          book.badge === 'Top Pick' ? 'bg-accent text-accent-foreground' :
                          book.badge === 'Award Winner' ? 'bg-primary text-primary-foreground' :
                          book.badge === 'Netflix Series' ? 'bg-foreground text-background' :
                          'bg-secondary text-foreground'
                        }`}>
                          {book.badge}
                        </div>
                      )}
                      <div className="mb-4 overflow-hidden rounded-lg aspect-[3/4] bg-secondary transition-all duration-300 group-hover:shadow-xl">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{book.category}</p>
                      <h3 className="font-medium mb-1 text-base group-hover:text-clay transition-colors">{book.title}</h3>
                      <p className="text-xs text-text-muted mb-2">by {book.author}</p>
                      
                      {book.rating && (
                        <div className="flex items-center gap-1 mb-2 text-xs">
                          <span className="text-primary">★</span>
                          <span className="font-semibold">{book.rating}</span>
                          {book.reviewCount && (
                            <span className="text-muted-foreground">({book.reviewCount.toLocaleString()})</span>
                          )}
                        </div>
                      )}
                      
                      <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">{book.description}</p>
                      
                      {book.awards && book.awards.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {book.awards.slice(0, 2).map((award, index) => (
                            <span key={index} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                              {award}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {book.originalPrice && (
                            <>
                              <span className="text-sm text-text-muted line-through">${book.originalPrice.toFixed(2)}</span>
                              <span className="text-[10px] px-1.5 py-0.5 bg-foreground text-background rounded">
                                -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                              </span>
                            </>
                          )}
                          <span className="text-base font-semibold text-text-primary">${book.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-text-muted">via Amazon</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(book.affiliateUrl, '_blank');
                            }}
                          >
                            Shop Now
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {renderPagination(booksPage, getTotalPages(getFilteredCount(books)), setBooksPage)}
            </motion.div>
          </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Fashion Product Modal */}
      <FashionProductModal
        product={selectedFashionProduct}
        open={isFashionModalOpen}
        onOpenChange={(open) => {
          setIsFashionModalOpen(open);
          if (!open) setSelectedFashionProduct(null);
        }}
      />

      {/* Candle Product Modal */}
      <CandleModal
        product={selectedCandle}
        open={isCandleModalOpen}
        onOpenChange={(open) => {
          setIsCandleModalOpen(open);
          if (!open) setSelectedCandle(null);
        }}
      />

      {/* Supplement Product Modal */}
      <SupplementModal
        product={selectedSupplement}
        open={isSupplementModalOpen}
        onOpenChange={(open) => {
          setIsSupplementModalOpen(open);
          if (!open) setSelectedSupplement(null);
        }}
      />

      {/* Book Product Modal */}
      <BookModal
        product={selectedBook}
        open={isBookModalOpen}
        onOpenChange={(open) => {
          setIsBookModalOpen(open);
          if (!open) setSelectedBook(null);
        }}
      />

      {/* Affirmation Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedProduct(null);
        }}
      />
      </div>
    </PageTransition>
  );
};

export default Shop;
