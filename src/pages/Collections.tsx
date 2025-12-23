import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Moon, Flame, BookOpen, Leaf, Shirt } from "lucide-react";

// Collection images from Supabase storage for consistency
const collectionImages = {
  affirmations: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/affirmations/aff-001/canvas-1765464231190.png",
  books: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-000/lifestyle-1764868892980.png",
  candles: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/candles/cnd-001/lifestyle-1764872243677.png",
  supplements: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/supplements/sup-001/styled-1764874771422.png",
  fashion: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop",
  bundles: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=1000&fit=crop",
};

const Collections = () => {
  const collections = [
    {
      title: "Digital Affirmations",
      subtitle: "Your Inner Voice Matters",
      description: "Beautiful wallpapers and prints for your daily practice. Transform your space with words that uplift and inspire.",
      image: collectionImages.affirmations,
      href: "/shop?tab=affirmations",
      icon: Moon,
      productCount: "24+ designs",
    },
    {
      title: "Journals & Books",
      subtitle: "Stories to Inspire",
      description: "Fantasy reads and guided journals for reflection. Escape into magical worlds or document your growth journey.",
      image: collectionImages.books,
      href: "/shop?tab=books",
      icon: BookOpen,
      productCount: "18+ titles",
    },
    {
      title: "Candles & Rituals",
      subtitle: "Set the Mood",
      description: "Premium scented candles for intentional moments. Create ambiance that invites calm and connection.",
      image: collectionImages.candles,
      href: "/shop?tab=candles",
      icon: Flame,
      productCount: "22+ scents",
    },
    {
      title: "Wellness",
      subtitle: "Nourish Your Journey",
      description: "Quality supplements and teas for body and mind. Support your wellbeing from the inside out.",
      image: collectionImages.supplements,
      href: "/shop?tab=supplements",
      icon: Leaf,
      productCount: "20+ products",
    },
    {
      title: "Lifestyle",
      subtitle: "Timeless Pieces",
      description: "Curated fashion and accessories for intentional living. Elevated basics you'll reach for every day.",
      image: collectionImages.fashion,
      href: "/shop?tab=fashion",
      icon: Shirt,
      productCount: "25+ items",
    },
    {
      title: "Curated Bundles",
      subtitle: "Save More, Live Better",
      description: "Thoughtfully paired products at special prices. Perfect combinations for gifting or self-care.",
      image: collectionImages.bundles,
      href: "/bundles",
      icon: Sparkles,
      productCount: "4 bundles",
      featured: true,
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Collections — LunaRituals | Shop by Category</title>
        <meta name="description" content="Browse our curated collections of affirmations, journals, candles, wellness, and lifestyle products for intentional living." />
        <link rel="canonical" href="https://lunarituals.com/collections" />
        
        <meta property="og:title" content="Collections — LunaRituals" />
        <meta property="og:description" content="Browse our curated collections for intentional living." />
        <meta property="og:url" content="https://lunarituals.com/collections" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-secondary/40 to-background">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-clay/40" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-clay font-medium">Explore</span>
              <div className="h-px w-8 bg-clay/40" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-foreground mb-4 tracking-tight">
              Our Collections
            </h1>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Curated categories of products designed to support your intentional living journey
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-12 lg:py-20 bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {collections.map((collection) => {
                const IconComponent = collection.icon;
                return (
                  <Link
                    key={collection.title}
                    to={collection.href}
                    className={`group block bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1 ${
                      collection.featured ? 'ring-2 ring-clay/30' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 left-4 p-2 bg-background/90 backdrop-blur-sm rounded-full">
                        <IconComponent className="h-5 w-5 text-clay" />
                      </div>
                      
                      {/* Featured badge */}
                      {collection.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-clay text-cream-text rounded-full text-xs font-medium flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3" />
                          New
                        </div>
                      )}
                      
                      {/* Product count */}
                      <div className="absolute bottom-4 right-4 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-[10px] font-medium text-foreground">
                        {collection.productCount}
                      </div>
                      
                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 mb-1">{collection.subtitle}</p>
                        <h3 className="text-xl lg:text-2xl font-display font-semibold text-white">
                          {collection.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 lg:p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {collection.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm text-clay font-medium group-hover:gap-3 transition-all">
                        Shop Collection
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-foreground text-background">
          <div className="container-custom text-center max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-display font-semibold text-background mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-background/80 mb-8 leading-relaxed">
              Explore all our products in one place and find exactly what you need for your intentional living journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
              >
                Shop All Products
              </Link>
              <Link
                to="/bundles"
                className="inline-flex items-center justify-center px-8 py-4 border border-background text-background font-medium hover:bg-background/10 transition-colors gap-2"
              >
                <Sparkles className="h-4 w-4" />
                View Bundles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Collections;
