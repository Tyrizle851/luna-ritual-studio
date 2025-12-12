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
import { FashionProduct } from "@/data/fashion";
import { Candle } from "@/data/candles";
import { Book } from "@/data/books";
import { Supplement } from "@/data/supplements";

import productSilkSleepSet from "@/assets/product-silk-sleep-set.jpg";
import productCandleWoodwickVanilla from "@/assets/product-candle-vanilla-bean.jpg";
import throneOfGlassImage from "@/assets/product-throne-of-glass.jpg";
import productSupplementCollagen from "@/assets/product-supplement-vital-proteins-collagen-1763495213.jpg";

// Complete product data matching shop exactly
const featuredFashion: FashionProduct = {
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
  image: productSilkSleepSet,
  inStock: true,
  affiliateUrl: "https://www.amazon.com/Ekouaer-Womens-2-Piece-Sleepwear-Loungewear/dp/B097GL24NJ?tag=lunarituals10-20",
  rating: 4.4,
  reviewCount: 3300,
  isPrime: true,
  styleNotes: "Elevate your sleep routine with this luxurious satin pajama set. The silky-smooth fabric drapes beautifully and feels gentle on skin, while the classic button-down design adds timeless sophistication. Perfect for those who believe that bedtime should feel like a luxury experience.",
  features: [
    "Smooth satin silk finish",
    "Classic button-down top",
    "Adjustable drawstring pants",
    "Long sleeves with button cuffs",
    "ISCC PLUS sustainability certified",
    "Soft and breathable fabric"
  ],
  certifications: ["Silky Smooth", "Breathable"],
  productDetails: {
    fabric: "Premium satin polyester blend (softer than traditional silk)",
    care: "Machine washable - gentle cycle, hang or lay flat to dry",
    fit: "True to size with relaxed comfortable fit for sleep",
    origin: "Imported, ISCC PLUS certified for sustainability"
  },
  stylingIdeas: [
    { occasion: "Bedtime Luxury", suggestion: "Pair with fuzzy slippers and a silk sleep mask for ultimate relaxation" },
    { occasion: "Morning Coffee", suggestion: "Layer a cozy cardigan over the set for a chic loungewear look" },
    { occasion: "Self-Care Sunday", suggestion: "Wear during your skincare routine and journaling for a spa-like experience" },
    { occasion: "Lazy Weekend", suggestion: "Stay in the set all day - it's comfortable and polished enough for video calls" }
  ]
};

const featuredCandle: Candle = {
  id: "cnd-002",
  name: "WoodWick Vanilla Bean Hourglass Candle",
  brand: "WoodWick",
  scent: "Sweet, Warm",
  description: "Holiday candle featuring a distinctive crackling wood wick that mimics a cozy fireplace. Rich, creamy vanilla bean fragrance fills your space. 9.7 oz medium hourglass jar with elegant design. Perfect gift for women and men. 60 hour burn time.",
  price: 17.99,
  burnTime: "60 hours",
  image: productCandleWoodwickVanilla,
  inStock: true,
  affiliateUrl: "https://amzn.to/43EdcRX",
  rating: 4.6,
  reviewCount: 9660,
  socialProof: "2K+ bought in past month",
  isPrime: true,
  scentProfile: "Decadent vanilla bean scent infused with notes of pure sugar cane. Creates an enchanting, warm aroma that fills your home with comfort and sweetness. The multi-sensory crackling wick adds auditory relaxation to the olfactory experience.",
  features: [
    "Distinctive Pluswick Innovation creates signature crackling sound",
    "Premium soy-paraffin blend ensures clean, consistent burn",
    "Iconic hourglass shape with wooden lid enhances home decor",
    "Made in USA for quality and authenticity",
    "60 hours of burn time",
    "Ideal gift for friends or yourself"
  ],
  productDetails: {
    waxType: "Premium soy-paraffin blend",
    wickType: "Wooden wick (Pluswick Innovation)",
    jarType: "Hourglass glass jar with wooden lid",
    madeIn: "Made in USA"
  },
  usageIdeas: [
    "Create a warm, inviting ambiance for cozy evenings at home",
    "Perfect for aromatherapy and stress relief during bath time",
    "Gift for holidays, birthdays, or special occasions",
    "Enhance meditation or yoga practice with calming scent and sound"
  ],
  certifications: ["Made in USA", "Wooden Wick"]
};

const featuredBook: Book = {
  id: "book-000",
  title: "Throne of Glass",
  author: "Sarah J. Maas",
  price: 16.88,
  originalPrice: 22.99,
  image: throneOfGlassImage,
  description: "A captivating fantasy epic about Celaena Sardothien, a legendary assassin who must compete for her freedom in a deadly tournament. Perfect for those who crave adventure, romance, and a fierce heroine who will stop at nothing to reclaim her destiny.",
  category: "Epic Fantasy",
  affiliateUrl: "https://amzn.to/4hTBnBz",
  rating: 4.9,
  reviewCount: 48612,
  socialProof: "60K+ bought in past month",
  isPrime: true,
  badge: "Best Seller",
  series: "Throne of Glass #1",
  awards: ["New York Times #1 Bestseller", "Goodreads Choice Finalist"],
  bookDetails: {
    publisher: "Bloomsbury YA",
    pages: 432,
    format: "Paperback",
    language: "English"
  },
  themes: ["Strong Female Lead", "Political Intrigue", "Slow Burn Romance", "Competitive Tournament"],
  features: [
    "New York Times #1 bestselling series",
    "Perfect for fans of ACOTAR and Fourth Wing",
    "Epic fantasy with romance and action",
    "First book in completed 8-book series"
  ],
  similarReads: ["A Court of Thorns and Roses", "Fourth Wing", "The Cruel Prince"]
};

const featuredSupplement: Supplement = {
  id: "sup-001",
  name: "Vital Proteins Collagen Peptides",
  category: "Beauty & Wellness",
  description: "Clinically shown to improve hair, skin, nails, and joints. This unflavored collagen powder dissolves easily in hot or cold liquids, making it perfect for your morning coffee or smoothie.",
  benefits: ["Supports healthy hair & nails", "Promotes skin elasticity", "Joint support"],
  price: 25.47,
  originalPrice: 29.99,
  badge: "Best Seller",
  servings: "28 servings",
  image: productSupplementCollagen,
  inStock: true,
  affiliateUrl: "https://amzn.to/4kRmZPE",
  rating: 4.6,
  reviewCount: 112500,
  socialProof: "100K+ bought in past month",
  isPrime: true,
  keyIngredients: ["Bovine Collagen Peptides", "Vitamin C", "Hyaluronic Acid"],
  dosageInfo: "2 scoops (20g) daily mixed into any beverage",
  features: [
    "Clinically proven results for hair, skin & nails",
    "Unflavored - dissolves in hot or cold liquids",
    "20g collagen per serving",
    "Grass-fed, pasture-raised bovine",
    "No added sugars or sweeteners"
  ],
  certifications: ["NSF Certified", "Grass-Fed"],
  usageIdeas: [
    "Blend into morning coffee or matcha",
    "Mix into smoothies or protein shakes",
    "Stir into oatmeal or yogurt"
  ]
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
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-clay" />
            <h2 className="mb-0 text-3xl sm:text-4xl md:text-5xl">The Ritual Edit</h2>
            <Sparkles className="h-6 w-6 text-clay" />
          </div>
          <p className="text-lg text-text-secondary">Curated finds for intentional living</p>
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
              <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider">{featuredFashion.brand}</p>
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base group-hover:text-clay transition-colors line-clamp-2">{featuredFashion.name}</h3>
              
              {featuredFashion.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-primary text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium">{featuredFashion.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredFashion.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredFashion.description}</p>
              
              {featuredFashion.certifications && featuredFashion.certifications.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredFashion.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  {featuredFashion.originalPrice && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-sm text-text-muted line-through">${featuredFashion.originalPrice.toFixed(2)}</span>
                      <span className="text-[8px] sm:text-xs bg-foreground text-background px-1 sm:px-1.5 py-0.5 rounded font-medium">
                        -{calculateDiscount(featuredFashion.originalPrice, featuredFashion.price)}%
                      </span>
                    </div>
                  )}
                  <span className="font-semibold text-sm sm:text-base text-foreground">${featuredFashion.price.toFixed(2)}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
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
              <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider">{featuredCandle.brand}</p>
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base group-hover:text-clay transition-colors line-clamp-2">{featuredCandle.name}</h3>
              
              {featuredCandle.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-primary text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium">{featuredCandle.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredCandle.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredCandle.description}</p>
              
              {featuredCandle.certifications && featuredCandle.certifications.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredCandle.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50">
                <span className="font-semibold text-sm sm:text-base text-foreground">${featuredCandle.price.toFixed(2)}</span>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
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
              <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider">{featuredBook.author}</p>
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base group-hover:text-clay transition-colors line-clamp-2">{featuredBook.title}</h3>
              
              {featuredBook.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-primary text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium">{featuredBook.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredBook.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredBook.description}</p>
              
              {featuredBook.awards && featuredBook.awards.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredBook.awards.slice(0, 2).map((award, idx) => (
                    <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {award}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  {featuredBook.originalPrice && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-sm text-text-muted line-through">${featuredBook.originalPrice.toFixed(2)}</span>
                      <span className="text-[8px] sm:text-xs bg-foreground text-background px-1 sm:px-1.5 py-0.5 rounded font-medium">
                        -{calculateDiscount(featuredBook.originalPrice, featuredBook.price)}%
                      </span>
                    </div>
                  )}
                  <span className="font-semibold text-sm sm:text-base text-foreground">${featuredBook.price.toFixed(2)}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
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
              <p className="text-[10px] sm:text-xs text-text-muted mb-1 sm:mb-2 uppercase tracking-wider">{featuredSupplement.category}</p>
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base group-hover:text-clay transition-colors line-clamp-2">{featuredSupplement.name}</h3>
              
              {featuredSupplement.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <span className="text-primary text-[10px] sm:text-xs">★</span>
                  <span className="text-[10px] sm:text-xs font-medium">{featuredSupplement.rating}</span>
                  <span className="text-[10px] sm:text-xs text-text-muted">({featuredSupplement.reviewCount?.toLocaleString()})</span>
                </div>
              )}
              
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{featuredSupplement.description}</p>
              
              {featuredSupplement.certifications && featuredSupplement.certifications.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                  {featuredSupplement.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  {featuredSupplement.originalPrice && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-sm text-text-muted line-through">${featuredSupplement.originalPrice.toFixed(2)}</span>
                      <span className="text-[8px] sm:text-xs bg-foreground text-background px-1 sm:px-1.5 py-0.5 rounded font-medium">
                        -{calculateDiscount(featuredSupplement.originalPrice, featuredSupplement.price)}%
                      </span>
                    </div>
                  )}
                  <span className="font-semibold text-sm sm:text-base text-foreground">${featuredSupplement.price.toFixed(2)}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8"
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
