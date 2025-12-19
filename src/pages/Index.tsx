import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { AffirmationCarousel } from "@/components/AffirmationCarousel";
import { Testimonials } from "@/components/Testimonials";
import { Sparkles, ShoppingBag } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { affirmations } from "@/data/affirmations";

// Import new homepage components
import {
  HeroSection,
  CollectionGrid,
  TrustStrip,
  PhilosophySection,
  WhyLunaRituals,
  NewsletterCTA,
} from "@/components/home";

// Get featured affirmations from the data source (first 4 featured items)
const featuredAffirmations = affirmations
  .filter(aff => aff.featured)
  .slice(0, 4);

const Index = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>LunaRituals — Digital Affirmations & Curated Lifestyle for Intentional Living</title>
        <meta name="description" content="Downloadable affirmation art, wellness finds, and inspiration for women building calm, beautiful lives. Digital wallpapers, prints, and curated goods for intentional living." />
        <link rel="canonical" href="https://lunarituals.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="LunaRituals — Affirmations for Intentional Living" />
        <meta property="og:description" content="Digital art and curated goods for women building calm, beautiful lives." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lunarituals.com/" />
        <meta property="og:image" content="https://lunarituals.com/hero-video.mp4" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LunaRituals — Affirmations for Intentional Living" />
        <meta name="twitter:description" content="Digital art and curated goods for women building calm, beautiful lives." />
        
        {/* Keywords */}
        <meta name="keywords" content="affirmations, digital affirmations, affirmation wallpaper, self-love affirmations, manifestation wallpaper, intentional living, mindfulness, wellness, self-care" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section - Two-Part Design */}
        <HeroSection />

        {/* Collection Grid - Category Navigation */}
        <CollectionGrid />

        {/* Featured Affirmations */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-clay" />
                <h2 className="mb-0 text-3xl sm:text-4xl md:text-5xl">Featured Affirmations</h2>
                <Sparkles className="h-6 w-6 text-clay" />
              </div>
              <p className="text-base sm:text-lg text-text-secondary">Words to carry with you</p>
            </div>
            
            <AffirmationCarousel affirmations={featuredAffirmations} />

            <div className="text-center mt-6 sm:mt-8">
              <Button asChild size="lg" variant="outline" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300">
                <Link to="/shop?tab=affirmations">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View All Affirmations
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* The Ritual Edit - Featured Products */}
        <FeaturedProducts />

        {/* Featured Journal Articles */}
        <FeaturedArticles />

        {/* Testimonials */}
        <Testimonials />

        {/* Philosophy/Mission Section */}
        <PhilosophySection />

        {/* Why LunaRituals - Trust Pillars */}
        <WhyLunaRituals />

        {/* Newsletter CTA */}
        <NewsletterCTA />

        {/* Trust Footer Strip */}
        <TrustStrip />
      </div>
    </PageTransition>
  );
};

export default Index;
