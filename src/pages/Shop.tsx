import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart, Shirt, Flame, Pill, BookOpen, Sparkles, Star, Search, Users, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
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
import { affirmations, Affirmation } from "@/data/affirmations";
import { books } from "@/data/books";
import { ProductCard } from "@/components/ProductCard";
import { AffirmationProductCard } from "@/components/AffirmationProductCard";
import { CrossSellCarousel } from "@/components/CrossSellCarousel";
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

  const scrollToProducts = () => {
    // Scroll to top of page to show sticky nav + hero
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (onPageChange: (page: number) => void) => (page: number) => {
    onPageChange(page);
    scrollToProducts();
  };

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void, position: "top" | "bottom" = "bottom") => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className={position === "top" ? "mb-8" : "mt-12"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) {
                  handlePageChange(onPageChange)(currentPage - 1);
                }
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => handlePageChange(onPageChange)(pageNum)}
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
              onClick={() => {
                if (currentPage < totalPages) {
                  handlePageChange(onPageChange)(currentPage + 1);
                }
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const getCrossSellProducts = (currentTab: string) => {
    const crossSellMap: { [key: string]: any[] } = {
      fashion: [
        ...affirmations.slice(0, 2).map(a => ({ ...a, name: a.title, onClick: () => { setSelectedProduct(a); setIsModalOpen(true); } })),
        ...candles.slice(0, 2).map(c => ({ ...c, onClick: () => { setSelectedCandle(c); setIsCandleModalOpen(true); } })),
        ...books.slice(0, 2).map(b => ({ ...b, name: b.title, onClick: () => { setSelectedBook(b); setIsBookModalOpen(true); } })),
      ],
      candles: [
        ...affirmations.slice(0, 2).map(a => ({ ...a, name: a.title, onClick: () => { setSelectedProduct(a); setIsModalOpen(true); } })),
        ...books.slice(0, 2).map(b => ({ ...b, name: b.title, onClick: () => { setSelectedBook(b); setIsBookModalOpen(true); } })),
        ...supplements.slice(0, 2).map(s => ({ ...s, onClick: () => { setSelectedSupplement(s); setIsSupplementModalOpen(true); } })),
      ],
      affirmations: [
        ...books.slice(0, 2).map(b => ({ ...b, name: b.title, onClick: () => { setSelectedBook(b); setIsBookModalOpen(true); } })),
        ...candles.slice(0, 2).map(c => ({ ...c, onClick: () => { setSelectedCandle(c); setIsCandleModalOpen(true); } })),
        ...fashionProducts.slice(0, 2).map(f => ({ ...f, onClick: () => { setSelectedFashionProduct(f); setIsFashionModalOpen(true); } })),
      ],
      supplements: [
        ...affirmations.slice(0, 2).map(a => ({ ...a, name: a.title, onClick: () => { setSelectedProduct(a); setIsModalOpen(true); } })),
        ...books.slice(0, 2).map(b => ({ ...b, name: b.title, onClick: () => { setSelectedBook(b); setIsBookModalOpen(true); } })),
        ...candles.slice(0, 2).map(c => ({ ...c, onClick: () => { setSelectedCandle(c); setIsCandleModalOpen(true); } })),
      ],
      books: [
        ...affirmations.slice(0, 2).map(a => ({ ...a, name: a.title, onClick: () => { setSelectedProduct(a); setIsModalOpen(true); } })),
        ...candles.slice(0, 2).map(c => ({ ...c, onClick: () => { setSelectedCandle(c); setIsCandleModalOpen(true); } })),
        ...fashionProducts.slice(0, 2).map(f => ({ ...f, onClick: () => { setSelectedFashionProduct(f); setIsFashionModalOpen(true); } })),
      ],
    };

    return crossSellMap[currentTab] || [];
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
      {/* Sticky Category Navigation - Below Main Header */}
      <div className="sticky top-16 z-40 bg-background border-b border-border/40">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 py-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedTab("fashion")}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wide font-medium transition-all ${
                selectedTab === "fashion" ? "text-clay" : "text-text-muted hover:text-clay"
              }`}
            >
              <Shirt className="h-3.5 w-3.5 text-clay" />
              <span>Fashion</span>
            </button>
            <button
              onClick={() => setSelectedTab("candles")}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wide font-medium transition-all ${
                selectedTab === "candles" ? "text-clay" : "text-text-muted hover:text-clay"
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-clay" />
              <span>Candles</span>
            </button>
            <button
              onClick={() => setSelectedTab("affirmations")}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold transition-all ${
                selectedTab === "affirmations" ? "text-clay" : "text-clay/70 hover:text-clay"
              }`}
            >
              <Moon className="h-4 w-4 text-clay" />
              <span className="sm:hidden">Affirm</span>
              <span className="hidden sm:inline">Affirmations</span>
            </button>
            <button
              onClick={() => setSelectedTab("supplements")}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wide font-medium transition-all ${
                selectedTab === "supplements" ? "text-clay" : "text-text-muted hover:text-clay"
              }`}
            >
              <Pill className="h-3.5 w-3.5 text-clay" />
              <span>Supps</span>
            </button>
            <button
              onClick={() => setSelectedTab("books")}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wide font-medium transition-all ${
                selectedTab === "books" ? "text-clay" : "text-text-muted hover:text-clay"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-clay" />
              <span>Books</span>
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-14 mt-6 sm:mt-8">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="mb-3 text-4xl sm:text-5xl md:text-6xl font-display tracking-tight">
                Shop {tabLabels[selectedTab]}
              </h1>
              <div className="flex items-center justify-center mb-4">
                <div className="h-[2px] w-24 sm:w-32 bg-gradient-to-r from-transparent via-clay to-transparent"></div>
              </div>
            </motion.div>
            <motion.p
              key={`${selectedTab}-subtitle`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
            >
              {categorySubtitles[selectedTab]}
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-text-muted font-medium"
            >
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-clay" />
                12K+ Shoppers
              </span>
              <span className="text-clay/30">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-clay fill-clay" />
                4.9 Rated
              </span>
              <span className="text-clay/30">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-clay" />
                Instant Delivery
              </span>
            </motion.div>
          </div>

          {/* Search & Filter Bar */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="mb-10">
              <div className="relative max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search Bar */}
                  <div className="flex items-center gap-2 bg-white border border-border/40 rounded-lg px-3 py-2.5 hover:border-clay/30 transition-all flex-1">
                    <Search className="h-4 w-4 text-clay flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted font-medium min-w-0"
                    />
                  </div>
                  {/* Filter Button */}
                  <div className="sm:w-auto">
                    <SortFilter value={sortOption} onChange={setSortOption} />
                  </div>
                </div>
              </div>
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
                {renderPagination(fashionPage, getTotalPages(getFilteredCount(fashionProducts)), setFashionPage, "top")}
                
                {isLoading ? (
                  <ProductGridSkeleton />
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {getPaginatedItems(fashionProducts, fashionPage).map((product) => (
                      <ProductCard 
                        key={product.id}
                        onClick={() => {
                          setSelectedFashionProduct(product);
                          setIsFashionModalOpen(true);
                        }}
                      >
                        <WishlistButton productId={product.id} />
                        {product.badge && (
                          <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
                            product.badge === 'Sale' ? 'bg-foreground text-background' :
                            product.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                            product.badge === 'Top Pick' ? 'bg-accent text-accent-foreground' :
                            'bg-secondary text-foreground'
                          }`}>
                            {product.badge}
                          </div>
                        )}
                        <div className="overflow-hidden aspect-[4/5] bg-secondary">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-2 sm:p-3 lg:p-4">
                          <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider truncate">{product.brand}</p>
                          <h3 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base group-hover:text-clay transition-colors line-clamp-2">{product.name}</h3>

                          {product.rating && (
                            <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3 text-[10px] sm:text-xs flex-wrap">
                              <span className="text-primary">★</span>
                              <span className="font-semibold">{product.rating}</span>
                              <span className="px-1 py-0.5 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] font-medium">
                                {product.rating >= 4.5 ? 'Top Rated' : product.rating >= 4.0 ? 'Popular' : 'Verified'}
                              </span>
                              <span className="px-1 py-0.5 bg-accent/15 text-accent-foreground rounded text-[8px] sm:text-[10px] font-medium">
                                {product.badge === 'Best Seller' ? 'Trending' : product.reviewCount && product.reviewCount > 500 ? 'Fan Favorite' : 'Quality Pick'}
                              </span>
                              {product.reviewCount && (
                                <span className="text-muted-foreground hidden sm:inline">({product.reviewCount.toLocaleString()})</span>
                              )}
                            </div>
                          )}

                          <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{product.description}</p>

                          {product.certifications && product.certifications.length > 0 && (
                            <div className="hidden lg:flex flex-wrap gap-1.5 mb-4">
                              {product.certifications.slice(0, 2).map((cert, index) => (
                                <span key={index} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                  {cert}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                              {product.originalPrice ? (
                                <>
                                  <span className="text-[10px] sm:text-xs lg:text-sm text-text-muted line-through">${product.originalPrice}</span>
                                  <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-foreground text-background rounded">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                  </span>
                                </>
                              ) : (
                                <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded font-medium">
                                  Great Deal
                                </span>
                              )}
                              <span className="text-sm sm:text-base font-semibold text-text-primary">${product.price}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(product.affiliateUrl, '_blank');
                              }}
                            >
                              <span className="hidden sm:inline">Shop Now</span>
                              <span className="sm:hidden">Shop</span>
                              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" />
                            </Button>
                          </div>
                        </div>
                      </ProductCard>
                    ))}
                  </div>
                )}
                {renderPagination(fashionPage, getTotalPages(getFilteredCount(fashionProducts)), setFashionPage)}
                <CrossSellCarousel products={getCrossSellProducts("fashion")} />
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
              {renderPagination(candlesPage, getTotalPages(getFilteredCount(candles)), setCandlesPage, "top")}
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {getPaginatedItems(candles, candlesPage).map((candle) => (
                    <ProductCard 
                      key={candle.id}
                      onClick={() => {
                        setSelectedCandle(candle);
                        setIsCandleModalOpen(true);
                      }}
                    >
                      <WishlistButton productId={candle.id} />
                      {candle.badge && (
                        <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
                          candle.badge === 'Sale' ? 'bg-foreground text-background' :
                          candle.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                          candle.badge === 'Best Value' ? 'bg-accent text-accent-foreground' :
                          'bg-secondary text-foreground'
                        }`}>
                          {candle.badge}
                        </div>
                      )}
                      <div className="overflow-hidden aspect-[4/5] bg-secondary">
                        <img
                          src={candle.image}
                          alt={candle.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-2 sm:p-3 lg:p-4">
                        <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider truncate">{candle.brand}</p>
                        <h3 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base group-hover:text-clay transition-colors line-clamp-2">{candle.name}</h3>

                        {candle.rating && (
                          <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3 text-[10px] sm:text-xs flex-wrap">
                            <span className="text-primary">★</span>
                            <span className="font-semibold">{candle.rating}</span>
                            <span className="px-1 py-0.5 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] font-medium">
                              {candle.rating >= 4.5 ? 'Top Rated' : candle.rating >= 4.0 ? 'Popular' : 'Verified'}
                            </span>
                            <span className="px-1 py-0.5 bg-accent/15 text-accent-foreground rounded text-[8px] sm:text-[10px] font-medium">
                              {candle.badge === 'Best Seller' ? 'Trending' : candle.reviewCount && candle.reviewCount > 500 ? 'Fan Favorite' : 'Artisan'}
                            </span>
                            {candle.reviewCount && (
                              <span className="text-muted-foreground hidden sm:inline">({candle.reviewCount.toLocaleString()})</span>
                            )}
                          </div>
                        )}

                        <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{candle.description}</p>

                        {candle.certifications && candle.certifications.length > 0 && (
                          <div className="hidden lg:flex flex-wrap gap-1.5 mb-4">
                            {candle.certifications.slice(0, 2).map((cert, index) => (
                              <span key={index} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                {cert}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            {candle.originalPrice ? (
                              <>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-text-muted line-through">${candle.originalPrice}</span>
                                <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-foreground text-background rounded">
                                  -{Math.round(((candle.originalPrice - candle.price) / candle.originalPrice) * 100)}%
                                </span>
                              </>
                            ) : (
                              <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded font-medium">
                                Great Deal
                              </span>
                            )}
                            <span className="text-sm sm:text-base font-semibold text-text-primary">${candle.price}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(candle.affiliateUrl, '_blank');
                            }}
                          >
                            <span className="hidden sm:inline">Shop Now</span>
                            <span className="sm:hidden">Shop</span>
                            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" />
                          </Button>
                        </div>
                      </div>
                    </ProductCard>
                  ))}
                </div>
              )}
              {renderPagination(candlesPage, getTotalPages(getFilteredCount(candles)), setCandlesPage)}
              <CrossSellCarousel products={getCrossSellProducts("candles")} />
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
              {renderPagination(supplementsPage, getTotalPages(getFilteredCount(supplements)), setSupplementsPage, "top")}
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {getPaginatedItems(supplements, supplementsPage).map((supplement) => (
                    <ProductCard 
                      key={supplement.id}
                      onClick={() => {
                        setSelectedSupplement(supplement);
                        setIsSupplementModalOpen(true);
                      }}
                    >
                      <WishlistButton productId={supplement.id} />
                      {supplement.badge && (
                        <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
                          supplement.badge === 'Sale' ? 'bg-foreground text-background' :
                          supplement.badge === 'Best Value' ? 'bg-primary text-primary-foreground' :
                          supplement.badge === 'Top Pick' ? 'bg-accent text-accent-foreground' :
                          'bg-secondary text-foreground'
                        }`}>
                          {supplement.badge}
                        </div>
                      )}
                      <div className="overflow-hidden aspect-[4/5] bg-white">
                        <img
                          src={supplement.image}
                          alt={supplement.name}
                          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2 sm:p-3 lg:p-4">
                        <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider truncate">{supplement.category}</p>
                        <h3 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base group-hover:text-clay transition-colors line-clamp-2">{supplement.name}</h3>

                        {supplement.rating && (
                          <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3 text-[10px] sm:text-xs flex-wrap">
                            <span className="text-primary">★</span>
                            <span className="font-semibold">{supplement.rating}</span>
                            <span className="px-1 py-0.5 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] font-medium">
                              {supplement.rating >= 4.5 ? 'Top Rated' : supplement.rating >= 4.0 ? 'Popular' : 'Verified'}
                            </span>
                            <span className="px-1 py-0.5 bg-accent/15 text-accent-foreground rounded text-[8px] sm:text-[10px] font-medium">
                              {supplement.badge === 'Best Value' ? 'Premium' : supplement.reviewCount && supplement.reviewCount > 500 ? 'Trusted' : 'Wellness'}
                            </span>
                            {supplement.reviewCount && (
                              <span className="text-muted-foreground hidden sm:inline">({supplement.reviewCount.toLocaleString()})</span>
                            )}
                          </div>
                        )}

                        <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary leading-relaxed mb-1 sm:mb-2 line-clamp-2 hidden sm:block">{supplement.description}</p>
                        <p className="text-[10px] sm:text-xs text-text-muted mb-2 sm:mb-3 hidden sm:block">{supplement.servings}</p>

                        {supplement.certifications && supplement.certifications.length > 0 && (
                          <div className="hidden lg:flex flex-wrap gap-1.5 mb-4">
                            {supplement.certifications.slice(0, 2).map((cert, index) => (
                              <span key={index} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                {cert}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            {supplement.originalPrice ? (
                              <>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-text-muted line-through">${supplement.originalPrice}</span>
                                <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-foreground text-background rounded">
                                  -{Math.round(((supplement.originalPrice - supplement.price) / supplement.originalPrice) * 100)}%
                                </span>
                              </>
                            ) : (
                              <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded font-medium">
                                Great Deal
                              </span>
                            )}
                            <span className="text-sm sm:text-base font-semibold text-text-primary">${supplement.price}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              supplement.affiliateUrl ? window.open(supplement.affiliateUrl, '_blank') : handleAddToCart(supplement, "supplement");
                            }}
                          >
                            {supplement.affiliateUrl ? (
                              <><span className="hidden sm:inline">Shop Now</span><span className="sm:hidden">Shop</span> <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" /></>
                            ) : (
                              <><span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span> <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" /></>
                            )}
                          </Button>
                        </div>
                      </div>
                    </ProductCard>
                  ))}
                </div>
              )}
              {renderPagination(supplementsPage, getTotalPages(getFilteredCount(supplements)), setSupplementsPage)}
              <CrossSellCarousel products={getCrossSellProducts("supplements")} />
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
              {renderPagination(affirmationsPage, getTotalPages(getFilteredCount(affirmations)), setAffirmationsPage, "top")}
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {getPaginatedItems(affirmations, affirmationsPage).map((affirmation: Affirmation) => (
                    <AffirmationProductCard
                      key={affirmation.id}
                      affirmation={affirmation}
                      onCardClick={() => {
                        setSelectedProduct(affirmation);
                        setIsModalOpen(true);
                      }}
                      onAddToCart={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(affirmation);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
              {renderPagination(affirmationsPage, getTotalPages(getFilteredCount(affirmations)), setAffirmationsPage)}
              <CrossSellCarousel products={getCrossSellProducts("affirmations")} />
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
              {renderPagination(booksPage, getTotalPages(getFilteredCount(books)), setBooksPage, "top")}
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {getPaginatedItems(books, booksPage).map((book) => (
                    <ProductCard 
                      key={book.id}
                      onClick={() => {
                        setSelectedBook(book);
                        setIsBookModalOpen(true);
                      }}
                    >
                      <WishlistButton productId={book.id} />
                      {book.badge && (
                        <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
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
                      <div className="overflow-hidden aspect-[3/4] bg-secondary">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-2 sm:p-3 lg:p-4">
                        <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider truncate">{book.category}</p>
                        <h3 className="font-medium mb-1 text-xs sm:text-sm lg:text-base group-hover:text-clay transition-colors line-clamp-2">{book.title}</h3>
                        <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 truncate">by {book.author}</p>

                        {book.rating && (
                          <div className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2 text-[10px] sm:text-xs flex-wrap">
                            <span className="text-primary">★</span>
                            <span className="font-semibold">{book.rating}</span>
                            <span className="px-1 py-0.5 bg-primary/10 text-primary rounded text-[8px] sm:text-[10px] font-medium">
                              {book.rating >= 4.5 ? 'Top Rated' : book.rating >= 4.0 ? 'Popular' : 'Verified'}
                            </span>
                            <span className="px-1 py-0.5 bg-accent/15 text-accent-foreground rounded text-[8px] sm:text-[10px] font-medium">
                              {book.badge === 'Best Seller' ? 'Bestseller' : book.reviewCount && book.reviewCount > 500 ? 'Must Read' : 'Curated'}
                            </span>
                            {book.reviewCount && (
                              <span className="text-muted-foreground hidden sm:inline">({book.reviewCount.toLocaleString()})</span>
                            )}
                          </div>
                        )}

                        <p className="text-[10px] sm:text-xs lg:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{book.description}</p>

                        {book.awards && book.awards.length > 0 && (
                          <div className="hidden lg:flex flex-wrap gap-1.5 mb-3">
                            {book.awards.slice(0, 2).map((award, index) => (
                              <span key={index} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                {award}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            {book.originalPrice ? (
                              <>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-text-muted line-through">${book.originalPrice.toFixed(2)}</span>
                                <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-foreground text-background rounded">
                                  -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                                </span>
                              </>
                            ) : (
                              <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded font-medium">
                                Great Deal
                              </span>
                            )}
                            <span className="text-sm sm:text-base font-semibold text-text-primary">${book.price.toFixed(2)}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(book.affiliateUrl, '_blank');
                            }}
                          >
                            <span className="hidden sm:inline">Shop Now</span>
                            <span className="sm:hidden">Shop</span>
                            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" />
                          </Button>
                        </div>
                      </div>
                    </ProductCard>
                  ))}
                </div>
              )}
              {renderPagination(booksPage, getTotalPages(getFilteredCount(books)), setBooksPage)}
              <CrossSellCarousel products={getCrossSellProducts("books")} />
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
