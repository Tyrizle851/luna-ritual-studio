import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";
import logo from "@/assets/logo.png";

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

  const shopLinks = [
    { label: "Shop All", href: "/shop" },
    { label: "Affirmations", href: "/shop?tab=affirmations" },
    { label: "Journals", href: "/shop?tab=books" },
    { label: "Fashion", href: "/shop?tab=fashion" },
    { label: "Candles", href: "/shop?tab=candles" },
    { label: "Wellness", href: "/shop?tab=supplements" },
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
            <span className="font-display text-lg lg:text-xl font-semibold text-foreground tracking-tight">
              LunaRituals
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              to="/shop" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isShopActive ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Shop All
            </Link>
            <Link 
              to="/shop?filter=bestsellers" 
              className="px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] text-foreground/80 hover:text-foreground transition-colors"
            >
              Bestsellers
            </Link>
            <Link 
              to="/collections" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive('/collections') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Collections
            </Link>
            <Link 
              to="/shop?filter=new" 
              className="px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] text-foreground/80 hover:text-foreground transition-colors"
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
                isActive('/about') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Our Story
            </Link>
            <Link 
              to="/journal" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive('/journal') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Journal
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 text-[11px] xl:text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive('/contact') ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
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
              className="h-9 w-9 text-foreground/80 hover:text-foreground hover:bg-transparent"
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative h-9 w-9 text-foreground/80 hover:text-foreground hover:bg-transparent"
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center font-medium">
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
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center font-medium">
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
              <SheetContent side="right" className="w-[300px] p-0">
                <nav className="flex flex-col pt-12">
                  {/* Shop Section */}
                  <div className="border-b border-border">
                    <button
                      onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                      className="flex items-center justify-between w-full px-6 py-4 text-sm font-medium uppercase tracking-wide"
                    >
                      Shop
                      <ChevronDown className={`h-4 w-4 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {shopDropdownOpen && (
                      <div className="pb-4">
                        {shopLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="block px-8 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to="/collections"
                    className="px-6 py-4 text-sm font-medium uppercase tracking-wide border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Collections
                  </Link>
                  
                  <Link
                    to="/affirmation-builder"
                    className="px-6 py-4 text-sm font-medium uppercase tracking-wide text-clay border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Studio
                  </Link>
                  
                  <Link
                    to="/about"
                    className="px-6 py-4 text-sm font-medium uppercase tracking-wide border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  
                  <Link
                    to="/journal"
                    className="px-6 py-4 text-sm font-medium uppercase tracking-wide border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Journal
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="px-6 py-4 text-sm font-medium uppercase tracking-wide border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
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
