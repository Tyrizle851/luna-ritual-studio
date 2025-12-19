import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, Search, Sparkles, X, Home, BookOpen, Mail, Info, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? "bg-background/60 backdrop-blur-md" : "bg-background/95 backdrop-blur"
      }`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="LunaRituals Logo" className="h-12 w-12 logo-3d" />
          <span className="font-display text-2xl font-semibold text-foreground">
            LunaRituals
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto">
          <Link 
            to="/" 
            className={`text-sm transition-all duration-200 relative py-1 ${
              isActive('/') 
                ? 'text-clay font-medium' 
                : 'text-foreground hover:text-clay'
            }`}
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
            )}
          </Link>
          
          <div className="relative group">
            <button 
              className={`flex items-center gap-1 text-sm transition-all duration-200 relative py-1 ${
                isShopActive 
                  ? 'text-clay font-medium' 
                  : 'text-foreground hover:text-clay'
              }`}
            >
              Shop <ChevronDown className="h-3 w-3" />
              {isShopActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
              )}
            </button>
            <div className="absolute top-full left-0 mt-2 w-44 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link 
                to="/shop?tab=fashion" 
                className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                Fashion
              </Link>
              <Link 
                to="/shop?tab=candles" 
                className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                Candles
              </Link>
              <Link 
                to="/shop?tab=supplements" 
                className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                Supplements
              </Link>
              <Link 
                to="/shop?tab=books" 
                className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                Books
              </Link>
              <Link 
                to="/shop?tab=affirmations" 
                className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
              >
                Affirmations
              </Link>
            </div>
          </div>

          <Link 
            to="/journal" 
            className={`text-sm transition-all duration-200 relative py-1 ${
              isActive('/journal') 
                ? 'text-clay font-medium' 
                : 'text-foreground hover:text-clay'
            }`}
          >
            Journal
            {isActive('/journal') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
            )}
          </Link>

          <Link 
            to="/about" 
            className={`text-sm transition-all duration-200 relative py-1 ${
              isActive('/about') 
                ? 'text-clay font-medium' 
                : 'text-foreground hover:text-clay'
            }`}
          >
            About
            {isActive('/about') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
            )}
          </Link>

          <Link 
            to="/contact" 
            className={`text-sm transition-all duration-200 relative py-1 ${
              isActive('/contact') 
                ? 'text-clay font-medium' 
                : 'text-foreground hover:text-clay'
            }`}
          >
            Contact
            {isActive('/contact') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
            )}
          </Link>

          <Link 
            to="/affirmation-builder" 
            className={`flex items-center gap-1.5 text-sm transition-all duration-200 relative py-1 ${
              isActive('/affirmation-builder') 
                ? 'text-clay font-medium' 
                : 'text-foreground hover:text-clay'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-clay text-white rounded-full">NEW</span>
            Studio
            <Sparkles className="h-3 w-3" />
            {isActive('/affirmation-builder') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
            )}
          </Link>
        </nav>

        {/* Search & Cart & Mobile Menu */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden lg:flex text-foreground hover:text-clay"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            className="relative"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-clay text-white text-xs flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] px-0 overflow-y-auto">
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
                  className={`flex items-center gap-3 px-6 py-3.5 text-base transition-colors ${
                    isActive('/') 
                      ? 'text-clay font-medium bg-clay/5' 
                      : 'text-foreground hover:text-clay hover:bg-secondary/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5 flex-shrink-0" />
                  <span>Home</span>
                </Link>

                <Separator className="my-2" />

                <div className="flex flex-col">
                  <div className={`flex items-center gap-3 px-6 py-3.5 text-base font-medium ${isShopActive ? 'text-clay' : 'text-foreground'}`}>
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
                  className={`flex items-center gap-3 px-6 py-3.5 text-base transition-colors ${
                    isActive('/journal') 
                      ? 'text-clay font-medium bg-clay/5' 
                      : 'text-foreground hover:text-clay hover:bg-secondary/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5 flex-shrink-0" />
                  <span>Journal</span>
                </Link>

                <Separator className="my-2" />

                <Link
                  to="/affirmation-builder"
                  className={`flex items-center gap-3 px-6 py-3.5 text-base transition-colors ${
                    isActive('/affirmation-builder') 
                      ? 'text-clay font-medium bg-clay/5' 
                      : 'text-foreground hover:text-clay hover:bg-secondary/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="h-5 w-5 flex-shrink-0" />
                  <span className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-clay text-white rounded-full">NEW</span>
                    Studio
                  </span>
                </Link>

                <Separator className="my-2" />

                <Link
                  to="/about"
                  className={`flex items-center gap-3 px-6 py-3.5 text-base transition-colors ${
                    isActive('/about') 
                      ? 'text-clay font-medium bg-clay/5' 
                      : 'text-foreground hover:text-clay hover:bg-secondary/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Info className="h-5 w-5 flex-shrink-0" />
                  <span>About</span>
                </Link>

                <Separator className="my-2" />

                <Link
                  to="/contact"
                  className={`flex items-center gap-3 px-6 py-3.5 text-base transition-colors ${
                    isActive('/contact') 
                      ? 'text-clay font-medium bg-clay/5' 
                      : 'text-foreground hover:text-clay hover:bg-secondary/50'
                  }`}
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
          <div className="border-t border-border py-3 px-4">
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
