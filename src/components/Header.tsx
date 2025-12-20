import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X, Sparkles, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";
import logo from "@/assets/logo.png";

// Unique category images for mobile menu
import productSilkSleepSet from "@/assets/product-silk-sleep-set.jpg";
import productCandleChristmasSet from "@/assets/product-candle-christmas-set.jpg";
import { LOCAL_DIGITAL_IMAGES } from "@/lib/localDigitalImages";
import bookFourthWing from "@/assets/product-book-fourth-wing-1763580000.jpg";
import productSupplementMatcha from "@/assets/product-supplement-domatcha-organic-1763495293.jpg";
import productLinenRobe from "@/assets/product-linen-robe.jpg";
import heroHome from "@/assets/hero-home.jpg";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const { getItemCount, toggleCart } = useCartStore();
  const itemCount = getItemCount();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  const isActive = (path: string) => currentPath === path;
  const isShopActive = currentPath.includes('/shop') || currentPath.includes('/collections');

  // Mobile menu category data with UNIQUE images
  const mobileCategories = [
    { label: "Shop All", href: "/shop", image: heroHome, emoji: "✨" },
    { label: "Affirmations", href: "/shop?tab=affirmations", image: LOCAL_DIGITAL_IMAGES["aff-006"], emoji: "🌙" },
    { label: "Books", href: "/shop?tab=books", image: bookFourthWing, emoji: "📚" },
    { label: "Fashion", href: "/shop?tab=fashion", image: productLinenRobe, emoji: "👗" },
    { label: "Candles", href: "/shop?tab=candles", image: productCandleChristmasSet, emoji: "🕯️" },
    { label: "Wellness", href: "/shop?tab=supplements", image: productSupplementMatcha, emoji: "🍵" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border/50" 
          : "bg-background border-b border-border/30"
      }`}
    >
      <div className="container-custom">
        <div className="flex h-14 lg:h-16 items-center justify-between gap-4">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <img src={logo} alt="LunaRituals" className="h-8 w-8 lg:h-10 lg:w-10" />
            <span className="font-display text-lg lg:text-xl font-semibold text-text-primary tracking-tight">
              LunaRituals
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              to="/shop" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isShopActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Shop All
            </Link>
            <Link 
              to="/shop?filter=bestsellers" 
              className="px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] text-text-secondary hover:text-text-primary transition-colors"
            >
              Bestsellers
            </Link>
            <Link 
              to="/collections" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive('/collections') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Collections
            </Link>
            <Link 
              to="/shop?filter=new" 
              className="px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] text-text-secondary hover:text-text-primary transition-colors"
            >
              New
            </Link>
            <Link 
              to="/affirmation-builder" 
              className="px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] text-clay hover:text-clay-dark transition-colors"
            >
              Studio
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive('/about') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Our Story
            </Link>
            <Link 
              to="/journal" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive('/journal') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Journal
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive('/contact') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right: Search & Cart - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="h-9 w-9 text-text-secondary hover:text-text-primary hover:bg-transparent"
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative h-9 w-9 text-text-secondary hover:text-text-primary hover:bg-transparent"
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="h-9 w-9"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative h-9 w-9"
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[380px] p-0 overflow-y-auto bg-background">
                <nav className="flex flex-col">
                  {/* Welcome Header */}
                  <div className="bg-gradient-to-r from-clay/10 via-gold/10 to-clay/10 px-5 py-6 border-b border-border/30">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={logo} alt="LunaRituals" className="h-8 w-8" />
                      <span className="font-display text-lg font-semibold text-text-primary">LunaRituals</span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Curated finds for intentional living ✨
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Link
                        to="/shop?filter=new"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-1.5 text-xs font-medium text-clay hover:text-clay-dark transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        New Arrivals
                      </Link>
                      <Link
                        to="/collections"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Gift className="h-3.5 w-3.5" />
                        Gift Guide
                      </Link>
                    </div>
                  </div>

                  {/* Featured Image Grid */}
                  <div className="px-4 py-5">
                    <div className="grid grid-cols-2 gap-3">
                      {mobileCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <img 
                            src={cat.image} 
                            alt={cat.label}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <span className="text-lg mb-0.5 block">{cat.emoji}</span>
                            <span className="text-sm font-semibold text-white drop-shadow-sm">
                              {cat.label}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="px-4 pb-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mb-3 block">Quick Links</span>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to="/affirmation-builder"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 bg-background rounded-lg text-sm font-medium text-clay hover:bg-clay/5 transition-colors"
                        >
                          <span className="text-base">🎨</span>
                          Studio
                        </Link>
                        <Link
                          to="/collections"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 bg-background rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <span className="text-base">💫</span>
                          Collections
                        </Link>
                        <Link
                          to="/about"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 bg-background rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <span className="text-base">💭</span>
                          Our Story
                        </Link>
                        <Link
                          to="/journal"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 bg-background rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <span className="text-base">📖</span>
                          Journal
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto border-t border-border/50 px-5 py-4 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs text-text-muted hover:text-text-primary transition-colors"
                      >
                        Contact Us
                      </Link>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Heart className="h-3 w-3 text-clay fill-clay" />
                        Made with love
                      </div>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-border py-4">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search our articles..." 
            />
          </div>
        )}
      </div>
    </header>
  );
};
