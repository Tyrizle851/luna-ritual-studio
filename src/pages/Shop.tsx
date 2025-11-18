import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart } from "lucide-react";
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
import { fashionProducts } from "@/data/fashion";
import { candles } from "@/data/candles";
import { supplements } from "@/data/supplements";
import { affirmations } from "@/data/affirmations";
import { books } from "@/data/books";
import { useCartStore } from "@/store/cartStore";
import { ProductModal } from "@/components/ProductModal";

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
  }, [searchParams]);
  const [candlesPage, setCandlesPage] = useState(1);
  const [supplementsPage, setSupplementsPage] = useState(1);
  const [affirmationsPage, setAffirmationsPage] = useState(1);
  const [booksPage, setBooksPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    affirmations: "Affirmations"
  };

  return (
    <PageTransition>
      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <Breadcrumbs items={[
            { label: "Shop", href: "/shop" },
            { label: tabLabels[selectedTab] || "Collection" }
          ]} />
          
          <h1 className="mb-3 sm:mb-4 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Shop Collection</h1>
          <p className="text-center text-text-secondary mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Curated essentials for intentional living
          </p>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="w-full sm:w-auto flex gap-2">
              <div className="md:hidden">
                <MobileFilterDrawer
                  sortValue={sortOption}
                  onSortChange={setSortOption}
                  categories={[]}
                  selectedCategory=""
                  onCategoryChange={() => {}}
                />
              </div>
            </div>
            <SearchBar onSearch={setSearchQuery} placeholder="Search products..." />
            <div className="hidden md:block">
              <SortFilter value={sortOption} onChange={setSortOption} />
            </div>
          </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8 sm:mb-12 h-auto gap-1">
            <TabsTrigger value="fashion" className="text-[11px] sm:text-sm px-1.5 sm:px-3 py-2.5 tab-transition font-medium">Fashion</TabsTrigger>
            <TabsTrigger value="candles" className="text-[11px] sm:text-sm px-1.5 sm:px-3 py-2.5 tab-transition font-medium">Candles</TabsTrigger>
            <TabsTrigger value="supplements" className="text-[11px] sm:text-sm px-1 sm:px-3 py-2.5 tab-transition font-medium">Supplements</TabsTrigger>
            <TabsTrigger value="books" className="text-[11px] sm:text-sm px-1.5 sm:px-3 py-2.5 tab-transition font-medium">Books</TabsTrigger>
            <TabsTrigger value="affirmations" className="text-[11px] sm:text-sm px-1 sm:px-3 py-2.5 tab-transition font-medium">Affirmations</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {/* Fashion Tab */}
            <TabsContent value="fashion" key="fashion">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-sm text-text-muted mb-4">
                  Showing {getPaginatedItems(fashionProducts, fashionPage).length} of {getFilteredCount(fashionProducts)} items
                </p>
                
                {isLoading ? (
                  <ProductGridSkeleton />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getPaginatedItems(fashionProducts, fashionPage).map((product) => (
                      <div key={product.id} className="group relative">
                        <WishlistButton productId={product.id} />
                        <div className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-secondary transition-all duration-300 group-hover:shadow-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{product.brand}</p>
                  <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{product.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-text-primary">${product.price}</span>
                    <div className="flex items-center gap-2">
                      {product.affiliateUrl && (
                        <span className="text-[10px] text-text-muted/60 italic">via Amazon</span>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                        onClick={() => product.affiliateUrl ? window.open(product.affiliateUrl, '_blank') : handleAddToCart(product, "fashion")}
                      >
                        {product.affiliateUrl ? (
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
              <p className="text-sm text-text-muted mb-4">
                Showing {getPaginatedItems(candles, candlesPage).length} of {getFilteredCount(candles)} items
              </p>
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPaginatedItems(candles, candlesPage).map((candle) => (
                    <div key={candle.id} className="group relative">
                      <WishlistButton productId={candle.id} />
                      <div className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-secondary transition-all duration-300 group-hover:shadow-xl">
                    <img
                      src={candle.image}
                      alt={candle.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{candle.brand}</p>
                  <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{candle.name}</h3>
                  <p className="text-xs text-text-muted mb-2">{candle.scent} • {candle.burnTime}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{candle.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-text-primary">${candle.price}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                      onClick={() => handleAddToCart(candle, "candle")}
                    >
                      Add to Cart <ShoppingCart className="ml-1 h-3 w-3" />
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
              <p className="text-sm text-text-muted mb-4">
                Showing {getPaginatedItems(supplements, supplementsPage).length} of {getFilteredCount(supplements)} items
              </p>
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPaginatedItems(supplements, supplementsPage).map((supplement) => (
                    <div key={supplement.id} className="group relative">
                      <WishlistButton productId={supplement.id} />
                      <div className="mb-4 overflow-hidden rounded-lg aspect-[4/5] bg-secondary transition-all duration-300 group-hover:shadow-xl">
                    <img
                      src={supplement.image}
                      alt={supplement.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">{supplement.category}</p>
                  <h3 className="font-medium mb-2 text-base group-hover:text-clay transition-colors">{supplement.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-2">{supplement.description}</p>
                  <p className="text-xs text-text-muted mb-4">{supplement.servings}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-text-primary">${supplement.price}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                      onClick={() => handleAddToCart(supplement, "supplement")}
                    >
                      Add to Cart <ShoppingCart className="ml-1 h-3 w-3" />
                    </Button>
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
              <p className="text-sm text-text-muted mb-4">
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
              <p className="text-sm text-text-muted mb-4">
                Showing {getPaginatedItems(books, booksPage).length} of {getFilteredCount(books)} items
              </p>
              
              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPaginatedItems(books, booksPage).map((book) => (
                    <div key={book.id} className="group relative">
                      <WishlistButton productId={book.id} />
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
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">{book.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-text-primary">${book.price}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                        >
                          <a href={book.affiliateUrl} target="_blank" rel="noopener noreferrer">
                            View Book <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
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
