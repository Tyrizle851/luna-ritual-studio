import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";
import logo from "@/assets/logo.png";

// Category images for mobile menu
import productChunkyCardigan from "@/assets/product-chunky-cardigan.jpg";
import productCandleVanillaBean from "@/assets/product-candle-vanilla-bean.jpg";
import { LOCAL_DIGITAL_IMAGES } from "@/lib/localDigitalImages";
import throneOfGlassImage from "@/assets/product-throne-of-glass.jpg";
import productSupplementCollagen from "@/assets/product-supplement-vital-proteins-collagen-1763495213.jpg";

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

  // Mobile menu category data with images
  const mobileCategories = [
    { label: "Shop All", href: "/shop", image: productChunkyCardigan },
    { label: "Affirmations", href: "/shop?tab=affirmations", image: LOCAL_DIGITAL_IMAGES["aff-015"] },
    { label: "Journals", href: "/shop?tab=books", image: throneOfGlassImage },
    { label: "Fashion", href: "/shop?tab=fashion", image: productChunkyCardigan },
    { label: "Candles", href: "/shop?tab=candles", image: productCandleVanillaBean },
    { label: "Wellness", href: "/shop?tab=supplements", image: productSupplementCollagen },
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
              <SheetContent side="left" className="w-full sm:w-[350px] p-0 overflow-y-auto">
                <nav className="flex flex-col pt-16 pb-8">
                  {/* Image Grid Categories - Mobile Only */}
                  <div className="px-4 mb-6">
                    <div className="grid grid-cols-2 gap-3">
                      {mobileCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="group relative aspect-[4/3] rounded-lg overflow-hidden"
                        >
                          <img 
                            src={cat.image} 
                            alt={cat.label}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                          <span className="absolute bottom-3 left-3 text-sm font-medium text-white">
                            {cat.label} →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider with label */}
                  <div className="flex items-center justify-between px-4 py-2 border-t border-border">
                    <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Categories</span>
                    <Link 
                      to="/shop" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[11px] uppercase tracking-wider text-text-muted hover:text-text-primary"
                    >
                      View all
                    </Link>
                  </div>

                  {/* Category List with thumbnails */}
                  <div className="border-t border-border">
                    {mobileCategories.slice(1).map((cat) => (
                      <Link
                        key={cat.href}
                        to={cat.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50"
                      >
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                          <img 
                            src={cat.image} 
                            alt={cat.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">{cat.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Other Links */}
                  <div className="mt-4 border-t border-border pt-4">
                    <Link
                      to="/collections"
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Collections
                    </Link>
                    <Link
                      to="/affirmation-builder"
                      className="block px-4 py-3 text-sm font-medium text-clay hover:bg-muted/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Studio
                    </Link>
                    <Link
                      to="/about"
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                    <Link
                      to="/journal"
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Journal
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
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
