import { useState } from "react";
import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Check, ArrowRight, Sparkles, Package, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { affirmations } from "@/data/affirmations";
import { candles } from "@/data/candles";
import { books } from "@/data/books";
import { supplements } from "@/data/supplements";

// Get sample images for bundles
const affirmationImg = affirmations[0]?.image || "";
const candleImg = candles[0]?.image || "";
const bookImg = books[0]?.image || "";
const supplementImg = supplements[0]?.image || "";

interface Bundle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  originalPrice: number;
  price: number;
  savings: number;
  items: { name: string; price: number }[];
  image: string;
  badge?: string;
  bestseller?: boolean;
}

const bundles: Bundle[] = [
  {
    id: "bundle-001",
    name: "Morning Ritual Starter",
    tagline: "Begin your day with intention",
    description: "Everything you need to start a mindful morning routine. Includes our bestselling affirmations, a cozy candle for ambiance, and supplements to energize your day.",
    originalPrice: 89.97,
    price: 69.99,
    savings: 20,
    items: [
      { name: "3 Digital Affirmations (Your Choice)", price: 35.97 },
      { name: "Balsam & Cedar Candle", price: 24.99 },
      { name: "Vital Proteins Collagen", price: 29.01 },
    ],
    image: affirmationImg,
    badge: "Most Popular",
    bestseller: true,
  },
  {
    id: "bundle-002",
    name: "Cozy Reading Night",
    tagline: "Curl up with intention",
    description: "Create the perfect reading atmosphere. A hand-picked book from our collection paired with a soothing candle and affirmations to inspire reflection.",
    originalPrice: 64.86,
    price: 49.99,
    savings: 15,
    items: [
      { name: "Fantasy Novel (Your Choice)", price: 16.88 },
      { name: "Vanilla Bean Candle", price: 17.99 },
      { name: "2 Digital Affirmations", price: 23.98 },
      { name: "Herbal Sleep Tea", price: 6.01 },
    ],
    image: bookImg,
    badge: "Staff Pick",
  },
  {
    id: "bundle-003",
    name: "Self-Care Sunday",
    tagline: "A complete wellness reset",
    description: "Dedicate time to yourself with this complete self-care package. Nourish body, mind, and soul with carefully curated products.",
    originalPrice: 119.96,
    price: 89.99,
    savings: 30,
    items: [
      { name: "5 Digital Affirmations Bundle", price: 59.95 },
      { name: "Premium Scented Candle", price: 24.99 },
      { name: "Wellness Supplement", price: 20.52 },
      { name: "Herbal Tea Selection", price: 14.50 },
    ],
    image: supplementImg,
    badge: "Best Value",
  },
  {
    id: "bundle-004",
    name: "New Year Intention",
    tagline: "Start fresh, dream big",
    description: "Set powerful intentions for the year ahead. Perfect for manifestation, goal-setting, and creating positive change.",
    originalPrice: 95.95,
    price: 74.99,
    savings: 21,
    items: [
      { name: "4 Digital Affirmations (Abundance)", price: 47.96 },
      { name: "Sparkling Cinnamon Candle", price: 18.99 },
      { name: "Guided Meditation Journal", price: 14.99 },
      { name: "B-Complex Vitamins", price: 14.01 },
    ],
    image: candleImg,
  },
];

const Bundles = () => {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  return (
    <PageTransition>
      <Helmet>
        <title>Curated Bundles — LunaRituals | Save on Wellness Sets</title>
        <meta name="description" content="Shop our curated bundles and save up to 30%. Perfect combinations of affirmations, candles, books, and wellness products for intentional living." />
        <link rel="canonical" href="https://lunarituals.com/bundles" />
        
        <meta property="og:title" content="Curated Bundles — LunaRituals" />
        <meta property="og:description" content="Shop curated wellness bundles and save up to 30%." />
        <meta property="og:url" content="https://lunarituals.com/bundles" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/40 to-background">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-clay/40" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-clay font-medium">Save More, Live Better</span>
              <div className="h-px w-8 bg-clay/40" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-foreground mb-4 tracking-tight">
              Curated Bundles
            </h1>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed text-base sm:text-lg">
              Thoughtfully paired products at special prices. Each bundle is designed to enhance your daily rituals.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-clay" />
                <span>Curated with care</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-clay" />
                <span>Save up to 30%</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-clay" />
                <span>Perfect for gifting</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bundles Grid */}
        <section className="py-12 lg:py-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {bundles.map((bundle) => (
                <div 
                  key={bundle.id}
                  className={`group bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:shadow-medium ${
                    selectedBundle === bundle.id ? 'ring-2 ring-clay' : ''
                  }`}
                  onClick={() => setSelectedBundle(bundle.id)}
                >
                  {/* Bundle Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    {bundle.badge && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        bundle.badge === 'Most Popular' ? 'bg-primary text-primary-foreground' :
                        bundle.badge === 'Best Value' ? 'bg-clay text-cream-text' :
                        bundle.badge === 'Staff Pick' ? 'bg-gold text-foreground' :
                        'bg-secondary text-foreground'
                      }`}>
                        {bundle.badge}
                      </div>
                    )}
                    
                    {/* Savings Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-foreground text-background rounded-full text-xs font-bold">
                      Save ${bundle.savings}
                    </div>
                    
                    {/* Bundle name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 mb-1">{bundle.tagline}</p>
                      <h3 className="text-xl lg:text-2xl font-display font-semibold text-white">{bundle.name}</h3>
                    </div>
                  </div>
                  
                  {/* Bundle Content */}
                  <div className="p-4 lg:p-6">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {bundle.description}
                    </p>
                    
                    {/* What's included */}
                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">What's Included:</p>
                      <ul className="space-y-1.5">
                        {bundle.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-clay flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-muted-foreground line-through">${bundle.originalPrice.toFixed(2)}</span>
                        <span className="text-2xl font-bold text-foreground">${bundle.price.toFixed(2)}</span>
                      </div>
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          // For now, navigate to shop - can be expanded for bundle purchasing
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Shop Bundle
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Bundle CTA */}
        <section className="py-16 lg:py-24 bg-foreground text-background">
          <div className="container-custom text-center max-w-2xl">
            <Sparkles className="h-8 w-8 mx-auto mb-4 text-gold" />
            <h2 className="text-2xl lg:text-3xl font-display font-semibold text-background mb-4">
              Create Your Own Ritual
            </h2>
            <p className="text-background/80 mb-8 leading-relaxed">
              Can't find the perfect bundle? Mix and match products from our shop to create your personalized wellness routine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop">
                <Button 
                  variant="outline" 
                  className="border-background text-background hover:bg-background hover:text-foreground"
                >
                  Browse All Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/affirmation-builder">
                <Button className="bg-clay text-cream-text hover:bg-clay/90">
                  Design Custom Affirmations
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Bundles;
