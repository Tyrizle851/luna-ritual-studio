import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { AffirmationCarousel } from "@/components/AffirmationCarousel";
import { Testimonials } from "@/components/Testimonials";
import { TrustBadges } from "@/components/TrustBadges";
import { SustainabilitySection } from "@/components/SustainabilitySection";
import { WhyLunaRituals } from "@/components/WhyLunaRituals";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { affirmations } from "@/data/affirmations";

// Get featured affirmations from the data source (first 4 featured items)
const featuredAffirmations = affirmations
  .filter(aff => aff.featured)
  .slice(0, 4);

// Get images from updated affirmations data
const morningRitualImg = affirmations.find(a => a.id === "aff-014")?.image || "";
const powerHourImg = affirmations.find(a => a.id === "aff-015")?.image || "";

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
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LunaRituals — Affirmations for Intentional Living" />
        <meta name="twitter:description" content="Digital art and curated goods for women building calm, beautiful lives." />
        
        {/* Keywords */}
        <meta name="keywords" content="affirmations, digital affirmations, affirmation wallpaper, self-love affirmations, manifestation wallpaper, intentional living, mindfulness, wellness, self-care" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section - Horizontal Scroll on Mobile, Grid on Desktop */}
        <section className="lg:grid lg:grid-cols-2 lg:min-h-[75vh]">
          {/* Mobile: Horizontal Scroll Container */}
          <div className="flex lg:contents overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {/* Left Hero - Video/Image with Overlay */}
            <div className="relative min-w-full lg:min-w-0 h-[85vh] lg:h-auto overflow-hidden bg-[#2a2520] snap-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/hero-poster.jpg"
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover scale-[1.33]"
                style={{ filter: 'brightness(0.7)' }}
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
              
              {/* Left Hero Content */}
              <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                <div className="max-w-lg">
                  <p className="text-background/90 text-3xl lg:text-4xl xl:text-5xl font-display font-light leading-tight mb-4" style={{ fontStyle: 'italic' }}>
                    Join 50,000+ people starting every day with intention.
                  </p>
                  <p className="text-background/80 text-base lg:text-lg mb-8">
                    Your daily affirmation ritual. New designs weekly.
                  </p>
                  <Link 
                    to="/shop?tab=affirmations"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium uppercase tracking-wide hover:bg-foreground/90 transition-colors"
                  >
                    Shop Affirmations
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                
                {/* Badge */}
                <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
                  <div className="bg-gold text-foreground rounded-full w-20 h-20 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-semibold">50K+</span>
                    <span className="text-[8px] uppercase tracking-wider">Downloads</span>
                  </div>
                </div>
                
                {/* Mobile Scroll Indicator */}
                <div className="absolute bottom-8 right-8 lg:hidden flex items-center gap-2 text-background/70 text-xs">
                  <span>Swipe</span>
                  <ArrowRight className="h-3 w-3 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right Hero - Product Showcase */}
            <div className="relative min-w-full lg:min-w-0 h-[85vh] lg:h-auto overflow-hidden snap-center">
              {/* Background Image */}
              <img 
                src={powerHourImg} 
                alt="I celebrate every small win affirmation" 
                className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" />
              
              {/* Content Overlay */}
              <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-12">
                <div className="text-center max-w-md">
                  <p className="text-background text-3xl lg:text-4xl xl:text-5xl font-display font-light leading-tight mb-4 drop-shadow-md" style={{ fontStyle: 'italic' }}>
                    Step into 2025 with clarity and confidence.
                  </p>
                  <p className="text-background/90 text-base lg:text-lg mb-8 drop-shadow-sm">
                    Mindful tools for connection, gratitude, and growth.
                  </p>
                  <Link 
                    to="/collections"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium uppercase tracking-wide hover:bg-background transition-colors"
                  >
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid - Like IC */}
        <section className="py-12 lg:py-20 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {[
                { title: "Affirmations", subtitle: "Your Inner Voice Matters", href: "/shop?tab=affirmations" },
                { title: "Journals", subtitle: "Stories to Inspire", href: "/shop?tab=books" },
                { title: "Candles", subtitle: "Set the Mood", href: "/shop?tab=candles" },
                { title: "Wellness", subtitle: "Nourish Your Journey", href: "/shop?tab=supplements" },
                { title: "Lifestyle", subtitle: "Timeless Pieces", href: "/shop?tab=fashion" },
                { title: "Studio", subtitle: "Create Your Own", href: "/affirmation-builder" },
              ].map((item) => (
                <Link 
                  key={item.title}
                  to={item.href}
                  className="group text-center py-8 lg:py-12 border-r border-border last:border-r-0 hover:bg-secondary/30 transition-colors"
                >
                  <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground mb-2 group-hover:text-clay transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-foreground/60">{item.subtitle} →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Affirmations */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 via-secondary/20 to-background">
          <div className="container-custom">
            {/* Premium Section Header */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-clay/40" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-clay font-medium">Words to Live By</span>
                <div className="h-px w-8 bg-clay/40" />
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-semibold text-foreground mb-4 tracking-tight">
                Featured Affirmations
              </h2>
              <p className="text-foreground/60 max-w-md mx-auto leading-relaxed">
                Daily reminders to nurture your mindset and elevate your spirit
              </p>
            </div>
            
            <AffirmationCarousel affirmations={featuredAffirmations} />

            <div className="text-center mt-12 lg:mt-16">
              <Link
                to="/shop?tab=affirmations"
                className="inline-flex items-center gap-3 px-8 py-4 border border-foreground/20 text-foreground text-sm font-medium uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300 group"
              >
                View All Affirmations
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* The Ritual Edit */}
        <FeaturedProducts />

        {/* Why Luna Rituals */}
        <WhyLunaRituals />

        {/* Sustainability Values */}
        <SustainabilitySection />

        {/* Featured Journal Articles */}
        <FeaturedArticles />

        {/* Testimonials */}
        <Testimonials />

        {/* About Preview - Simplified */}
        <section className="py-16 lg:py-24 bg-foreground text-background">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-display font-semibold mb-6">
              Every word a reflection, every product an intention
            </h2>
            <p className="text-lg text-background/80 mb-10 leading-relaxed">
              LunaRituals exists to help you create a life you love—one affirmation, 
              one beautiful object, one intentional choice at a time.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-background text-background text-sm font-medium uppercase tracking-wide hover:bg-background hover:text-foreground transition-colors"
            >
              Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSection />
      </div>
    </PageTransition>
  );
};

export default Index;
