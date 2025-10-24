import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount, toggleCart } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? "bg-background/60 backdrop-blur-md" : "bg-background/95 backdrop-blur"
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="LunaRituals Logo" className="h-12 w-12 logo-3d" />
          <span className="font-display text-2xl font-semibold text-foreground">
            LunaRituals
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm hover:text-clay transition-colors">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm hover:text-clay transition-colors outline-none">
              Shop <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-border z-50">
              <DropdownMenuItem asChild>
                <Link to="/shop?tab=fashion" className="cursor-pointer">Fashion</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop?tab=candles" className="cursor-pointer">Candles</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop?tab=supplements" className="cursor-pointer">Supplements</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop?tab=affirmations" className="cursor-pointer">Affirmations</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/journal" className="text-sm hover:text-clay transition-colors">
            Journal
          </Link>
          <Link to="/about" className="text-sm hover:text-clay transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm hover:text-clay transition-colors">
            Contact
          </Link>
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
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
                  className="text-lg hover:text-clay transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="flex flex-col gap-3">
                  <span className="text-lg font-medium">Shop</span>
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
                  className="text-lg hover:text-clay transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Journal
                </Link>
                <Link
                  to="/about"
                  className="text-lg hover:text-clay transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-lg hover:text-clay transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
