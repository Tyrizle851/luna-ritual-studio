import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, Search, X, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Shop", href: "/shop", hasDropdown: true },
  { label: "Collections", href: "/shop", hasDropdown: false },
  { label: "Studio", href: "/affirmation-builder", hasDropdown: false, isNew: true },
  { label: "Journal", href: "/journal", hasDropdown: false },
  { label: "About", href: "/about", hasDropdown: false },
];

const shopCategories = [
  { label: "All Products", href: "/shop" },
  { label: "Affirmations", href: "/shop?tab=affirmations" },
  { label: "Books", href: "/shop?tab=books" },
  { label: "Candles", href: "/shop?tab=candles" },
  { label: "Supplements", href: "/shop?tab=supplements" },
  { label: "Fashion", href: "/shop?tab=fashion" },
];

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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => currentPath === path;

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-foreground text-background text-center py-2.5 px-4">
        <p className="text-xs tracking-wide">
          FREE SHIPPING on US orders $35+ | New affirmations every week
        </p>
      </div>

      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-sm" 
            : "bg-background"
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="LunaRituals" className="h-10 w-10 lg:h-11 lg:w-11" />
              <span className="font-display text-xl lg:text-2xl font-semibold text-foreground tracking-tight">
                LunaRituals
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setShopDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setShopDropdownOpen(false)}
                >
                  <Link 
                    to={item.href}
                    className={`relative px-4 py-2 text-sm tracking-wide transition-colors duration-200 flex items-center gap-1 ${
                      isActive(item.href) 
                        ? 'text-clay' 
                        : 'text-foreground hover:text-clay'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="h-3 w-3" />}
                    {item.isNew && (
                      <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold bg-clay text-white rounded-sm">
                        NEW
                      </span>
                    )}
                  </Link>

                  {/* Shop Dropdown */}
                  {item.hasDropdown && shopDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-background border border-border shadow-lg min-w-[200px] py-2">
                        {shopCategories.map((cat) => (
                          <Link
                            key={cat.label}
                            to={cat.href}
                            className="block px-5 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-clay transition-colors"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="h-10 w-10 text-foreground hover:text-clay"
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCart}
                className="relative h-10 w-10"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-clay text-white text-[10px] flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] px-0 bg-background">
                  <nav className="flex flex-col mt-8">
                    {/* Mobile Search */}
                    <div className="px-6 mb-6">
                      <SearchBar onSearch={(q) => { handleSearch(q); setMobileMenuOpen(false); }} placeholder="Search..." />
                    </div>

                    <div className="border-t border-border" />

                    {/* Mobile Nav Items */}
                    {navItems.map((item) => (
                      <div key={item.label}>
                        <Link
                          to={item.href}
                          className={`flex items-center justify-between px-6 py-4 text-base transition-colors ${
                            isActive(item.href) ? 'text-clay bg-clay/5' : 'text-foreground hover:bg-secondary'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="flex items-center gap-2">
                            {item.label}
                            {item.isNew && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-clay text-white rounded-sm">
                                NEW
                              </span>
                            )}
                          </span>
                        </Link>
                        {item.hasDropdown && (
                          <div className="bg-secondary/30">
                            {shopCategories.map((cat) => (
                              <Link
                                key={cat.label}
                                to={cat.href}
                                className="block px-6 py-3 pl-10 text-sm text-text-secondary hover:text-clay"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {cat.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="border-t border-border mt-2" />

                    <Link
                      to="/contact"
                      className="px-6 py-4 text-base text-foreground hover:bg-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Search Bar Expanded */}
          {searchOpen && (
            <div className="border-t border-border py-4">
              <SearchBar onSearch={handleSearch} placeholder="Search affirmations, products..." />
            </div>
          )}
        </div>
      </header>
    </>
  );
};
