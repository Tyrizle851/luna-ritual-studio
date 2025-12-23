import { useState } from "react";
import { ExternalLink, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FashionProductModal } from "@/components/FashionProductModal";
import { CandleModal } from "@/components/CandleModal";
import { BookModal } from "@/components/BookModal";
import { SupplementModal } from "@/components/SupplementModal";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductCard } from "@/components/ProductCard";
import { FashionProduct, fashionProducts } from "@/data/fashion";
import { Candle, candles } from "@/data/candles";
import { Book, books } from "@/data/books";
import { Supplement, supplements } from "@/data/supplements";

// Pull featured products from updated data files
const featuredFashion: FashionProduct = fashionProducts.find(p => p.id === "fsh-004") || {
  id: "fsh-004",
  name: "Classic Satin Silk Pajama Set",
  brand: "Ekouaer",
  category: "Loungewear",
  description: "Indulge in luxurious comfort with this classic button-down silk pajama set. The smooth satin finish feels incredible against your skin while the timeless design with contrast piping adds sophisticated style to your evening routine. Perfect for unwinding by the fire or enjoying a peaceful night's rest.",
  price: 31.44,
  originalPrice: 36.99,
  badge: "Top Pick",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Champagne Gold", "Black", "Navy", "Leopard Print"],
  image: "",
  inStock: true,
  affiliateUrl: ""
};

const featuredCandle: Candle = candles.find(c => c.id === "cnd-002") || {
  id: "cnd-002",
  name: "WoodWick Vanilla Bean Hourglass Candle",
  brand: "WoodWick",
  scent: "Sweet, Warm",
  description: "Holiday candle featuring a distinctive crackling wood wick that mimics a cozy fireplace. Rich, creamy vanilla bean fragrance fills your space. 9.7 oz medium hourglass jar with elegant design. Perfect gift for women and men. 60 hour burn time.",
  price: 17.99,
  burnTime: "60 hours",
  image: "",
  inStock: true,
  affiliateUrl: ""
};

const featuredBook: Book = books.find(b => b.id === "book-000") || {
  id: "book-000",
  title: "Throne of Glass",
  author: "Sarah J. Maas",
  price: 16.88,
  originalPrice: 22.99,
  image: "",
  description: "",
  category: "",
  affiliateUrl: ""
};

const featuredSupplement: Supplement = supplements.find(s => s.id === "sup-001") || {
  id: "sup-001",
  name: "Vital Proteins Collagen Peptides",
  category: "Beauty & Wellness",
  description: "Clinically shown to improve hair, skin, nails, and joints. This unflavored collagen powder dissolves easily in hot or cold liquids, making it perfect for your morning coffee or smoothie.",
  benefits: ["Supports healthy hair & nails", "Promotes skin elasticity", "Joint support"],
  price: 25.47,
  originalPrice: 29.99,
  badge: "Best Seller",
  servings: "28 servings",
  image: "",
  inStock: true,
  affiliateUrl: ""
};

export const FeaturedProducts = () => {
  const [selectedFashion, setSelectedFashion] = useState<FashionProduct | null>(null);
  const [selectedCandle, setSelectedCandle] = useState<Candle | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [isFashionModalOpen, setIsFashionModalOpen] = useState(false);
  const [isCandleModalOpen, setIsCandleModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSupplementModalOpen, setIsSupplementModalOpen] = useState(false);

  const handleFashionClick = () => {
    setSelectedFashion(featuredFashion);
    setIsFashionModalOpen(true);
  };

  const handleCandleClick = () => {
    setSelectedCandle(featuredCandle);
    setIsCandleModalOpen(true);
  };

  const handleBookClick = () => {
    setSelectedBook(featuredBook);
    setIsBookModalOpen(true);
  };

  const handleSupplementClick = () => {
    setSelectedSupplement(featuredSupplement);
    setIsSupplementModalOpen(true);
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const products = [
    {
      type: 'fashion',
      item: featuredFashion,
      onClick: handleFashionClick,
      name: featuredFashion.name,
      brand: featuredFashion.brand,
      image: featuredFashion.image,
      description: featuredFashion.description,
      price: featuredFashion.price,
      originalPrice: featuredFashion.originalPrice,
      rating: featuredFashion.rating,
      reviewCount: featuredFashion.reviewCount,
      badge: featuredFashion.badge,
      certifications: featuredFashion.certifications,
      affiliateUrl: featuredFashion.affiliateUrl,
    },
    {
      type: 'candle',
      item: featuredCandle,
      onClick: handleCandleClick,
      name: featuredCandle.name,
      brand: featuredCandle.brand,
      image: featuredCandle.image,
      description: featuredCandle.description,
      price: featuredCandle.price,
      originalPrice: undefined,
      rating: featuredCandle.rating,
      reviewCount: featuredCandle.reviewCount,
      badge: undefined,
      certifications: featuredCandle.certifications,
      affiliateUrl: featuredCandle.affiliateUrl,
    },
    {
      type: 'book',
      item: featuredBook,
      onClick: handleBookClick,
      name: featuredBook.title,
      brand: featuredBook.author,
      image: featuredBook.image,
      description: featuredBook.description,
      price: featuredBook.price,
      originalPrice: featuredBook.originalPrice,
      rating: featuredBook.rating,
      reviewCount: featuredBook.reviewCount,
      badge: featuredBook.badge,
      certifications: undefined,
      affiliateUrl: featuredBook.affiliateUrl,
    },
    {
      type: 'supplement',
      item: featuredSupplement,
      onClick: handleSupplementClick,
      name: featuredSupplement.name,
      brand: featuredSupplement.category,
      image: featuredSupplement.image,
      description: featuredSupplement.description,
      price: featuredSupplement.price,
      originalPrice: featuredSupplement.originalPrice,
      rating: featuredSupplement.rating,
      reviewCount: featuredSupplement.reviewCount,
      badge: featuredSupplement.badge,
      certifications: featuredSupplement.certifications,
      affiliateUrl: featuredSupplement.affiliateUrl,
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Unique background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      
      <div className="container-custom relative">
        {/* Unique Header Design */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block relative mb-6">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-transparent to-clay/60" />
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-l from-transparent to-clay/60" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-clay font-medium px-4 py-2 border border-clay/20 bg-background/80 backdrop-blur-sm">
              Curated Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-4">
            The Ritual Edit
          </h2>
          <p className="text-base text-foreground/60 max-w-lg mx-auto leading-relaxed">
            Handpicked essentials for intentional living—each piece chosen to elevate your daily rituals
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ProductCard key={product.type} onClick={product.onClick} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
              {product.badge && (
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-primary text-primary-foreground text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                  {product.badge}
                </span>
              )}
              <WishlistButton productId={product.type} />
              
              <div className="overflow-hidden aspect-[4/5] bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-2 sm:p-3 lg:p-4">
                <p className="product-brand mb-1 sm:mb-2">{product.brand}</p>
                <h3 className="product-title mb-1 sm:mb-2 group-hover:text-clay transition-colors line-clamp-2">{product.name}</h3>
                
                {product.rating && (
                  <div className="flex gap-0.5 sm:gap-1 mb-1 sm:mb-2 flex-wrap items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-gold text-gold" />
                    ))}
                    <span className="text-[10px] sm:text-xs text-text-muted ml-0.5 sm:ml-1">
                      ({product.rating})
                    </span>
                    {product.reviewCount && <span className="hidden sm:inline text-[10px] sm:text-xs text-text-muted"> · {(product.reviewCount / 1000).toFixed(1)}K reviews</span>}
                  </div>
                )}
                
                <p className="product-description mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{product.description}</p>
                
                {product.certifications && product.certifications.length > 0 && (
                  <div className="hidden lg:flex flex-wrap gap-1.5 mb-3">
                    {product.certifications.slice(0, 2).map((cert, idx) => (
                      <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50 gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                    {product.originalPrice && (
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] sm:text-sm text-text-muted line-through">${product.originalPrice.toFixed(2)}</span>
                        <span className="text-[8px] sm:text-xs bg-destructive/10 text-destructive px-1 sm:px-1.5 py-0.5 rounded font-medium">
                          -{calculateDiscount(product.originalPrice, product.price)}%
                        </span>
                      </div>
                    )}
                    <span className="product-price">${product.price.toFixed(2)}</span>
                  </div>
                  
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Shop Now</span>
                      <span className="sm:hidden">Shop</span>
                    </a>
                  </Button>
                </div>
              </div>
            </ProductCard>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 lg:mt-14">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 h-auto">
            <Link to="/shop">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View All Products
            </Link>
          </Button>
        </div>
      </div>

      {/* Modals */}
      <FashionProductModal
        product={selectedFashion}
        open={isFashionModalOpen}
        onOpenChange={setIsFashionModalOpen}
      />
      <CandleModal
        product={selectedCandle}
        open={isCandleModalOpen}
        onOpenChange={setIsCandleModalOpen}
      />
      <BookModal
        product={selectedBook}
        open={isBookModalOpen}
        onOpenChange={setIsBookModalOpen}
      />
      <SupplementModal
        product={selectedSupplement}
        open={isSupplementModalOpen}
        onOpenChange={setIsSupplementModalOpen}
      />
    </section>
  );
};

export default FeaturedProducts;