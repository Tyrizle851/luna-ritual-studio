import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart } from "lucide-react";
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
import { useCartStore } from "@/store/cartStore";
import { ProductModal } from "@/components/ProductModal";

const ITEMS_PER_PAGE = 6;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState("fashion");
  const [fashionPage, setFashionPage] = useState(1);
  
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["fashion", "candles", "supplements", "affirmations"].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [searchParams]);
  const [candlesPage, setCandlesPage] = useState(1);
  const [supplementsPage, setSupplementsPage] = useState(1);
  const [affirmationsPage, setAffirmationsPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addItem } = useCartStore();

  const getPaginatedItems = (items: any[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
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

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <h1 className="mb-3 sm:mb-4 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Shop Collection</h1>
        <p className="text-center text-text-secondary mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Curated essentials for intentional living
        </p>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 sm:mb-12 h-auto">
            <TabsTrigger value="fashion" className="text-xs sm:text-sm px-2 py-2 sm:py-2.5">Fashion</TabsTrigger>
            <TabsTrigger value="candles" className="text-xs sm:text-sm px-2 py-2 sm:py-2.5">Candles</TabsTrigger>
            <TabsTrigger value="supplements" className="text-xs sm:text-sm px-2 py-2 sm:py-2.5">Supplements</TabsTrigger>
            <TabsTrigger value="affirmations" className="text-xs sm:text-sm px-2 py-2 sm:py-2.5">Affirmations</TabsTrigger>
          </TabsList>

          {/* Fashion Tab */}
          <TabsContent value="fashion">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getPaginatedItems(fashionProducts, fashionPage).map((product) => (
                <div key={product.id} className="group">
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300"
                      onClick={() => handleAddToCart(product, "fashion")}
                    >
                      Add to Cart <ShoppingCart className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {renderPagination(fashionPage, getTotalPages(fashionProducts.length), setFashionPage)}
          </TabsContent>

          {/* Candles Tab */}
          <TabsContent value="candles">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getPaginatedItems(candles, candlesPage).map((candle) => (
                <div key={candle.id} className="group">
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
            {renderPagination(candlesPage, getTotalPages(candles.length), setCandlesPage)}
          </TabsContent>

          {/* Supplements Tab */}
          <TabsContent value="supplements">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getPaginatedItems(supplements, supplementsPage).map((supplement) => (
                <div key={supplement.id} className="group">
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
            {renderPagination(supplementsPage, getTotalPages(supplements.length), setSupplementsPage)}
          </TabsContent>

          {/* Affirmations Tab */}
          <TabsContent value="affirmations">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getPaginatedItems(affirmations, affirmationsPage).map((affirmation) => (
                <div key={affirmation.id} className="group cursor-pointer">
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
            {renderPagination(affirmationsPage, getTotalPages(affirmations.length), setAffirmationsPage)}
          </TabsContent>
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
  );
};

export default Shop;
