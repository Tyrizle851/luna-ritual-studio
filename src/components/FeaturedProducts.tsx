import { useState } from "react";
import { ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
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

  return (
    <section className="section-padding bg-gradient-to-b from-secondary via-secondary to-background/50">
      <div className="container-custom">
        {/* Premium Header */}
        <div className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-clay/40" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-clay font-medium">Thoughtfully Selected</span>
            <div className="h-px w-8 bg-clay/40" />
          </div>
          <div className="flex items-center justify-center gap-4 mb-5">
            <Sparkles className="h-5 w-5 text-clay/70" />
            <h2 className="mb-0 text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">
              The Ritual Edit
            </h2>
            <Sparkles className="h-5 w-5 text-clay/70" />
          </div>
          <p className="text-base sm:text-lg text-foreground/60 max-w-md mx-auto leading-relaxed">
            Curated essentials for intentional living—each piece chosen to elevate your daily rituals
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Fashion Product Card */}
          <ProductCard onClick={handleFashionClick} className="animate-fade-up">
            {featuredFashion.badge && (
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-accent text-accent-foreground text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                {featuredFashion.badge}
              </span>
            )}
            <WishlistButton productId={featuredFashion.id} />
            <div className="overflow-hidden aspect-[4/5] bg-secondary">
              <img
                src={featuredFashion.image}
                alt={featuredFashion.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-3 sm:p-4">
              <p className="product-brand mb-1 sm:mb-2">{featuredFashion.brand}</p>
              <h3 className="product-title mb-1 sm:mb-2 group-hover:text-clay transition-colors line-clamp-2">{featuredFashion.name}</h3>
              
              {featuredFashion.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-gold text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium text-text-primary">{featuredFashion.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredFashion.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="product-description mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredFashion.description}</p>
              
              {featuredFashion.certifications && featuredFashion.certifications.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredFashion.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  {featuredFashion.originalPrice && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-sm text-text-muted line-through">${featuredFashion.originalPrice.toFixed(2)}</span>
                      <span className="text-[8px] sm:text-xs bg-primary text-primary-foreground px-1 sm:px-1.5 py-0.5 rounded font-medium">
                        -{calculateDiscount(featuredFashion.originalPrice, featuredFashion.price)}%
                      </span>
                    </div>
                  )}
                  <span className="product-price">${featuredFashion.price.toFixed(2)}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="clay"
                  className="text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={featuredFashion.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <span className="hidden sm:inline">Shop Now</span>
                    <span className="sm:hidden">Shop</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </ProductCard>

          {/* Candle Product Card */}
          <ProductCard onClick={handleCandleClick} className="animate-fade-up">
            <WishlistButton productId={featuredCandle.id} />
            <div className="overflow-hidden aspect-[4/5] bg-secondary">
              <img
                src={featuredCandle.image}
                alt={featuredCandle.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-3 sm:p-4">
              <p className="product-brand mb-1 sm:mb-2">{featuredCandle.brand}</p>
              <h3 className="product-title mb-1 sm:mb-2 group-hover:text-clay transition-colors line-clamp-2">{featuredCandle.name}</h3>
              
              {featuredCandle.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-gold text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium text-text-primary">{featuredCandle.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredCandle.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="product-description mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredCandle.description}</p>
              
              {featuredCandle.certifications && featuredCandle.certifications.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredCandle.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border">
                <span className="product-price">${featuredCandle.price.toFixed(2)}</span>
                
                <Button
                  size="sm"
                  variant="clay"
                  className="text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={featuredCandle.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <span className="hidden sm:inline">Shop Now</span>
                    <span className="sm:hidden">Shop</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </ProductCard>

          {/* Book Product Card */}
          <ProductCard onClick={handleBookClick} className="animate-fade-up">
            {featuredBook.badge && (
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-primary text-primary-foreground text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                {featuredBook.badge}
              </span>
            )}
            <WishlistButton productId={featuredBook.id} />
            <div className="overflow-hidden aspect-[4/5] bg-secondary">
              <img
                src={featuredBook.image}
                alt={featuredBook.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-3 sm:p-4">
              <p className="product-brand mb-1 sm:mb-2">{featuredBook.author}</p>
              <h3 className="product-title mb-1 sm:mb-2 group-hover:text-clay transition-colors line-clamp-2">{featuredBook.title}</h3>
              
              {featuredBook.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-gold text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium text-text-primary">{featuredBook.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredBook.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="product-description mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredBook.description}</p>
              
              {featuredBook.awards && featuredBook.awards.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredBook.awards.slice(0, 2).map((award, idx) => (
                    <span key={idx} className="text-[10px] bg-clay/10 text-clay px-2 py-0.5 rounded-full">
                      {award}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  {featuredBook.originalPrice && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-sm text-text-muted line-through">${featuredBook.originalPrice.toFixed(2)}</span>
                      <span className="text-[8px] sm:text-xs bg-primary text-primary-foreground px-1 sm:px-1.5 py-0.5 rounded font-medium">
                        -{calculateDiscount(featuredBook.originalPrice, featuredBook.price)}%
                      </span>
                    </div>
                  )}
                  <span className="product-price">${featuredBook.price.toFixed(2)}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="clay"
                  className="text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={featuredBook.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <span className="hidden sm:inline">Shop Now</span>
                    <span className="sm:hidden">Shop</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </ProductCard>

          {/* Supplement Product Card */}
          <ProductCard onClick={handleSupplementClick} className="animate-fade-up">
            {featuredSupplement.badge && (
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-accent text-accent-foreground text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                {featuredSupplement.badge}
              </span>
            )}
            <WishlistButton productId={featuredSupplement.id} />
            <div className="overflow-hidden aspect-[4/5] bg-secondary">
              <img
                src={featuredSupplement.image}
                alt={featuredSupplement.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-3 sm:p-4">
              <p className="product-brand mb-1 sm:mb-2">{featuredSupplement.category}</p>
              <h3 className="product-title mb-1 sm:mb-2 group-hover:text-clay transition-colors line-clamp-2">{featuredSupplement.name}</h3>
              
              {featuredSupplement.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-gold text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium text-text-primary">{featuredSupplement.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredSupplement.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="product-description mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredSupplement.description}</p>
              
              {featuredSupplement.certifications && featuredSupplement.certifications.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredSupplement.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-[10px] bg-clay/10 text-clay px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  {featuredSupplement.originalPrice && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-sm text-text-muted line-through">${featuredSupplement.originalPrice.toFixed(2)}</span>
                      <span className="text-[8px] sm:text-xs bg-primary text-primary-foreground px-1 sm:px-1.5 py-0.5 rounded font-medium">
                        -{calculateDiscount(featuredSupplement.originalPrice, featuredSupplement.price)}%
                      </span>
                    </div>
                  )}
                  <span className="product-price">${featuredSupplement.price.toFixed(2)}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="clay"
                  className="text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={featuredSupplement.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <span className="hidden sm:inline">Shop Now</span>
                    <span className="sm:hidden">Shop</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </ProductCard>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 btn-premium">
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
