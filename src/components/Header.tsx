import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, Search, Sparkles, X, Home, BookOpen, Mail, Info, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const isActive = (path: string) => currentPath === path;
  const isShopActive = currentPath.includes('/shop');

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-subtle border-border/50" 
          : "bg-background/95 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex h-18 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="LunaRituals Logo" className="h-12 w-12 logo-3d" />
            <span className="font-display text-2xl font-semibold text-foreground group-hover:text-clay transition-colors duration-300">
              LunaRituals
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            <Link 
              to="/" 
              className={cn(
                "text-sm transition-all duration-200 relative py-2 link-underline",
                isActive('/') 
                  ? 'text-clay font-medium' 
                  : 'text-foreground hover:text-clay'
              )}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay rounded-full" />
              )}
            </Link>
            
            <div className="relative group">
              <button 
                className={cn(
                  "flex items-center gap-1.5 text-sm transition-all duration-200 relative py-2",
                  isShopActive 
                    ? 'text-clay font-medium' 
                    : 'text-foreground hover:text-clay'
                )}
              >
                Shop 
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                {isShopActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay rounded-full" />
                )}
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <div className="p-2">
                  <Link 
                    to="/shop?tab=fashion" 
                    className="block px-4 py-2.5 text-sm rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Fashion
                  </Link>
                  <Link 
                    to="/shop?tab=candles" 
                    className="block px-4 py-2.5 text-sm rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Candles
                  </Link>
                  <Link 
                    to="/shop?tab=supplements" 
                    className="block px-4 py-2.5 text-sm rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Supplements
                  </Link>
                  <Link 
                    to="/shop?tab=books" 
                    className="block px-4 py-2.5 text-sm rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Books
                  </Link>
                  <Link 
                    to="/shop?tab=affirmations" 
                    className="block px-4 py-2.5 text-sm rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Affirmations
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/journal" 
              className={cn(
                "text-sm transition-all duration-200 relative py-2 link-underline",
                isActive('/journal') 
                  ? 'text-clay font-medium' 
                  : 'text-foreground hover:text-clay'
              )}
            >
              Journal
              {isActive('/journal') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay rounded-full" />
              )}
            </Link>

            <Link 
              to="/about" 
              className={cn(
                "text-sm transition-all duration-200 relative py-2 link-underline",
                isActive('/about') 
                  ? 'text-clay font-medium' 
                  : 'text-foreground hover:text-clay'
              )}
            >
              About
              {isActive('/about') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay rounded-full" />
              )}
            </Link>

            <Link 
              to="/contact" 
              className={cn(
                "text-sm transition-all duration-200 relative py-2 link-underline",
                isActive('/contact') 
                  ? 'text-clay font-medium' 
                  : 'text-foreground hover:text-clay'
              )}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay rounded-full" />
              )}
            </Link>

            <Link 
              to="/affirmation-builder" 
              className={cn(
                "flex items-center gap-1.5 text-sm transition-all duration-200 relative py-2 group/studio",
                isActive('/affirmation-builder') 
                  ? 'text-clay font-medium' 
                  : 'text-foreground hover:text-clay'
              )}
            >
              <Sparkles className="h-3.5 w-3.5 group-hover/studio:animate-pulse" />
              <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-clay to-gold text-white rounded-full shadow-sm">NEW</span>
              Studio
              <Sparkles className="h-3.5 w-3.5 group-hover/studio:animate-pulse" />
              {isActive('/affirmation-builder') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay rounded-full" />
              )}
            </Link>
          </nav>

          {/* Search & Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden lg:flex text-foreground hover:text-clay hover:bg-accent/10"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative hover:bg-accent/10"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-clay to-clay-dark text-white text-xs flex items-center justify-center font-semibold shadow-sm animate-scale-in">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] px-0 overflow-y-auto bg-card/95 backdrop-blur-xl">
                <nav className="flex flex-col mt-6">
                  {/* Search Bar in Mobile Menu */}
                  <div className="px-6 mb-4">
                    <SearchBar 
                      onSearch={handleSearch} 
                      placeholder="Search..." 
                    />
                  </div>

                  <Separator className="mb-2" />

                  <Link
                    to="/"
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 text-base transition-all duration-200",
                      isActive('/') 
                        ? 'text-clay font-medium bg-clay/5' 
                        : 'text-foreground hover:text-clay hover:bg-secondary/50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5 flex-shrink-0" />
                    <span>Home</span>
                  </Link>

                  <Separator className="my-2" />

                  <div className="flex flex-col">
                    <div className={cn(
                      "flex items-center gap-3 px-6 py-4 text-base font-medium",
                      isShopActive ? 'text-clay' : 'text-foreground'
                    )}>
                      <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                      <span>Shop</span>
                    </div>
                    <Link
                      to="/shop?tab=fashion"
                      className="flex items-center px-6 py-3 pl-14 text-sm hover:text-clay transition-colors hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Fashion
                    </Link>
                    <Link
                      to="/shop?tab=candles"
                      className="flex items-center px-6 py-3 pl-14 text-sm hover:text-clay transition-colors hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Candles
                    </Link>
                    <Link
                      to="/shop?tab=supplements"
                      className="flex items-center px-6 py-3 pl-14 text-sm hover:text-clay transition-colors hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Supplements
                    </Link>
                    <Link
                      to="/shop?tab=books"
                      className="flex items-center px-6 py-3 pl-14 text-sm hover:text-clay transition-colors hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Books
                    </Link>
                    <Link
                      to="/shop?tab=affirmations"
                      className="flex items-center px-6 py-3 pl-14 text-sm hover:text-clay transition-colors hover:bg-secondary/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Affirmations
                    </Link>
                  </div>

                  <Separator className="my-2" />

                  <Link
                    to="/journal"
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 text-base transition-all duration-200",
                      isActive('/journal') 
                        ? 'text-clay font-medium bg-clay/5' 
                        : 'text-foreground hover:text-clay hover:bg-secondary/50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className="h-5 w-5 flex-shrink-0" />
                    <span>Journal</span>
                  </Link>

                  <Separator className="my-2" />

                  <Link
                    to="/affirmation-builder"
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 text-base transition-all duration-200",
                      isActive('/affirmation-builder') 
                        ? 'text-clay font-medium bg-clay/5' 
                        : 'text-foreground hover:text-clay hover:bg-secondary/50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Sparkles className="h-5 w-5 flex-shrink-0" />
                    <span className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-clay to-gold text-white rounded-full">NEW</span>
                      Studio
                    </span>
                  </Link>

                  <Separator className="my-2" />

                  <Link
                    to="/about"
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 text-base transition-all duration-200",
                      isActive('/about') 
                        ? 'text-clay font-medium bg-clay/5' 
                        : 'text-foreground hover:text-clay hover:bg-secondary/50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Info className="h-5 w-5 flex-shrink-0" />
                    <span>About</span>
                  </Link>

                  <Separator className="my-2" />

                  <Link
                    to="/contact"
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 text-base transition-all duration-200",
                      isActive('/contact') 
                        ? 'text-clay font-medium bg-clay/5' 
                        : 'text-foreground hover:text-clay hover:bg-secondary/50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span>Contact</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar - Full Width Below Header */}
        {searchOpen && (
          <div className="border-t border-border/50 py-4 px-4 animate-slide-down">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search products..." 
            />
          </div>
        )}
      </div>
    </header>
  );
};