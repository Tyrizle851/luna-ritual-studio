import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success("Welcome to The Ritual! Check your inbox.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-secondary/50 border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container-custom py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h3 className="text-2xl lg:text-3xl font-display font-semibold text-foreground mb-3">
                Intention in your inbox.
              </h3>
              <p className="text-foreground/70 max-w-md">
                Join 50,000+ people who receive LunaRituals Weekly—our curated newsletter of personal development tips on happiness, productivity, relationships, and more.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-0 max-w-md lg:ml-auto">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-r-none border-r-0 bg-background h-12 text-sm placeholder:text-foreground/40"
              />
              <Button 
                type="submit" 
                variant="ghost"
                className="rounded-l-none border border-l-0 border-input h-12 px-4 hover:bg-foreground hover:text-background transition-colors"
                disabled={isSubmitting}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* I. Shop */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground mb-6">
              I. Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=bestsellers" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=books" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Journals
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=affirmations" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Affirmations
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=candles" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Candles
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=supplements" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Wellness
                </Link>
              </li>
              <li>
                <Link to="/shop?tab=fashion" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* II. LunaRituals */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground mb-6">
              II. LunaRituals
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/our-story" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link to="/affirmation-builder" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Affirmation Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* III. Support */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground mb-6">
              III. Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/custom-orders" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* IV. Connect */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground mb-6">
              IV. Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a 
                  href="https://pinterest.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>
              LunaRituals is making intentional living simple, beautiful and accessible. We create products that help you realize your potential and live a happier, more fulfilling life.
            </p>
            <p className="whitespace-nowrap">© 2025 LunaRituals</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
