import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? "bg-background/60 backdrop-blur-md" : "bg-background/95 backdrop-blur"
      }`}
    >
      <div className="container-custom flex h-16 items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="LunaRituals Logo" className="h-12 w-12 logo-3d" />
          <span className="font-display text-2xl font-semibold text-foreground">
            LunaRituals
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
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
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link 
                to="/shop?tab=fashion" 
                className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
              >
                Fashion
              </Link>
              <Link 
                to="/shop?tab=candles" 
                className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
              >
                Candles
              </Link>
              <Link 
                to="/shop?tab=supplements" 
                className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
              >
                Supplements
              </Link>
              <Link 
                to="/shop?tab=affirmations" 
                className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
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
            className={`text-sm transition-all duration-200 relative py-1 ${
              isActive('/affirmation-builder') 
                ? 'text-clay font-medium' 
                : 'text-foreground hover:text-clay'
            }`}
          >
            Builder
            {isActive('/affirmation-builder') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
            )}
          </Link>
        </nav>

        {/* Search & Cart & Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/shop')}
            className="text-foreground hover:text-clay"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-clay text-white text-xs flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-6 mt-8">
                <Link
                  to="/"
                  className={`text-lg transition-colors relative ${
                    isActive('/') 
                      ? 'text-clay font-medium' 
                      : 'text-foreground hover:text-clay'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                  {isActive('/') && (
                    <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-clay" />
                  )}
                </Link>
                <div className="flex flex-col gap-3">
                  <span className={`text-lg font-medium ${isShopActive ? 'text-clay' : ''}`}>
                    Shop
                    {isShopActive && (
                      <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-clay" />
                    )}
                  </span>
                  <Link
                    to="/shop?tab=fashion"
                    className="text-base hover:text-clay transition-colors pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Fashion
                  </Link>
                  <Link
                    to="/shop?tab=candles"
                    className="text-base hover:text-clay transition-colors pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Candles
                  </Link>
                  <Link
                    to="/shop?tab=supplements"
                    className="text-base hover:text-clay transition-colors pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Supplements
                  </Link>
                  <Link
                    to="/shop?tab=affirmations"
                    className="text-base hover:text-clay transition-colors pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Affirmations
                  </Link>
                </div>
                <Link
                  to="/journal"
                  className={`text-lg transition-colors relative ${
                    isActive('/journal') 
                      ? 'text-clay font-medium' 
                      : 'text-foreground hover:text-clay'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Journal
                  {isActive('/journal') && (
                    <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-clay" />
                  )}
                </Link>
                <Link
                  to="/about"
                  className={`text-lg transition-colors relative ${
                    isActive('/about') 
                      ? 'text-clay font-medium' 
                      : 'text-foreground hover:text-clay'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                  {isActive('/about') && (
                    <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-clay" />
                  )}
                </Link>
                <Link
                  to="/contact"
                  className={`text-lg transition-colors relative ${
                    isActive('/contact') 
                      ? 'text-clay font-medium' 
                      : 'text-foreground hover:text-clay'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                  {isActive('/contact') && (
                    <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-clay" />
                  )}
                </Link>
                <Link
                  to="/affirmation-builder"
                  className={`text-lg transition-colors relative ${
                    isActive('/affirmation-builder') 
                      ? 'text-clay font-medium' 
                      : 'text-foreground hover:text-clay'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Builder
                  {isActive('/affirmation-builder') && (
                    <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-clay" />
                  )}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
