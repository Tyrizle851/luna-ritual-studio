import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Send, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

  return (
    <footer className="bg-secondary border-t">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* 1. Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop?tab=affirmations" className="text-text-secondary hover:text-clay transition-colors">
                  Affirmations
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=fashion" className="text-text-secondary hover:text-clay transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=candles" className="text-text-secondary hover:text-clay transition-colors">
                  Candles
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=supplements" className="text-text-secondary hover:text-clay transition-colors">
                  Supplements
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=books" className="text-text-secondary hover:text-clay transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/affirmation-builder" className="text-text-secondary hover:text-clay transition-colors">
                  Affirmation Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. LunaRituals */}
          <div>
            <h4 className="font-semibold mb-4">LunaRituals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/our-story" className="text-text-secondary hover:text-clay transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-text-secondary hover:text-clay transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-text-secondary hover:text-clay transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-text-secondary hover:text-clay transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-text-secondary hover:text-clay transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/custom-orders" className="text-text-secondary hover:text-clay transition-colors">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-clay transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text-secondary hover:text-clay transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-text-secondary hover:text-clay transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-text-secondary hover:text-clay transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure" className="text-text-secondary hover:text-clay transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <p className="text-sm text-text-secondary mb-4">
              Weekly reflections and curated finds
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-clay hover:bg-clay-dark text-white shrink-0"
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-clay transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-clay transition-colors"
                aria-label="TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-clay transition-colors"
                aria-label="Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <Link to="/" className="font-display text-xl font-semibold text-clay">
            LunaRituals
          </Link>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
            <span>© 2025 LunaRituals. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
