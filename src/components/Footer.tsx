import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Send, Music, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    console.log("Newsletter signup:", email);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success("Welcome to The Ritual! Check your inbox.");
    setEmail("");
    setIsSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary/80 border-t border-border/50">
      {/* Newsletter Section - Elevated */}
      <div className="container-custom py-16">
        <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl p-8 md:p-12 shadow-medium border border-border/30 text-center max-w-2xl mx-auto">
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">Join The Ritual</h3>
          <p className="text-muted-foreground mb-6">
            Weekly reflections and curated finds for intentional living
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 rounded-xl bg-background border-border/50 focus:border-clay"
            />
            <Button 
              type="submit" 
              size="lg"
              className="bg-clay hover:bg-clay-dark text-white shrink-0 rounded-xl px-6"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Subscribe</span>
            </Button>
          </form>
        </div>
      </div>

      <div className="container-custom section-padding border-t border-border/30">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img src={logo} alt="LunaRituals" className="h-10 w-10" />
              <span className="font-display text-xl font-semibold text-clay group-hover:text-clay-dark transition-colors">
                LunaRituals
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Affirmations and curated goods for intentional living. Transform your daily rituals into moments of meaning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-foreground">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop?tab=fashion" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=candles" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  Candles
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=supplements" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  Supplements
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=affirmations" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  Affirmations
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=books" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  Books
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-5 text-foreground">Discover</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/journal" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  The Journal
                </Link>
              </li>
              <li>
                <Link to="/affirmation-builder" className="text-text-secondary hover:text-clay transition-colors link-underline flex items-center gap-2">
                  Affirmation Studio
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-clay text-white rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-clay transition-colors link-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-5 text-foreground">Connect</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-text-secondary hover:text-clay hover:border-clay hover:bg-clay/5 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-text-secondary hover:text-clay hover:border-clay hover:bg-clay/5 transition-all duration-300"
                aria-label="TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-text-secondary hover:text-clay hover:border-clay hover:bg-clay/5 transition-all duration-300"
                aria-label="Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 text-xs bg-background border border-border/50 rounded-lg text-muted-foreground">
                🔒 Secure Checkout
              </span>
              <span className="px-3 py-1.5 text-xs bg-background border border-border/50 rounded-lg text-muted-foreground">
                ✨ Quality Promise
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
            <span>© 2025 LunaRituals</span>
            <Link to="/privacy-policy" className="hover:text-clay transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-clay transition-colors">
              Terms
            </Link>
            <Link to="/affiliate-disclosure" className="hover:text-clay transition-colors">
              Affiliate Disclosure
            </Link>
          </div>

          {/* Back to Top */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="rounded-xl border-border/50 hover:border-clay hover:bg-clay/5"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};