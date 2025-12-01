import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { AffirmationCarousel } from "@/components/AffirmationCarousel";
import { Testimonials } from "@/components/Testimonials";
import { Sparkles, ShoppingBag, BookOpen, Heart, Sprout, Wand2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

import affirmationRest from "@/assets/affirmation-rest.jpg";
import affirmationIntuition from "@/assets/affirmation-intuition.jpg";
import affirmationDreams from "@/assets/affirmation-dreams.jpg";
import affirmationRelease from "@/assets/affirmation-release.jpg";

const Index = () => {
  const featuredAffirmations = [
    { id: "aff-001", title: "I honor my need for rest", price: 12, image: affirmationRest, description: "Permission to pause" },
    { id: "aff-002", title: "I trust my intuition and inner wisdom", price: 12, image: affirmationIntuition, description: "Listen within" },
    { id: "aff-003", title: "I am creating the life of my dreams", price: 15, image: affirmationDreams, description: "Manifest with intention" },
    { id: "aff-004", title: "I release what no longer serves me", price: 12, image: affirmationRelease, description: "Let go with grace" },
  ];

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
        {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover animate-fade-in opacity-0 [animation-fill-mode:forwards] brightness-[0.75] blur-[2px]"
          style={{ filter: 'brightness(0.75) blur(2px)' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,25%,92%)]/70 via-background/50 to-background/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        <div className="relative z-10 container-custom max-w-4xl px-4">
          <h1 className="mb-6 text-balance text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.7)] font-bold">
            Affirmations for women building calm, beautiful lives
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-balance text-white/95 drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
            Digital art and curated goods for intentional living
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <Button asChild size="lg" className="bg-[hsl(27,28%,40%)] hover:bg-[hsl(27,28%,35%)] text-white font-bold shadow-[0_6px_24px_rgba(0,0,0,0.4),0_3px_10px_rgba(139,107,84,0.5)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_14px_rgba(139,107,84,0.6)] hover:-translate-y-1 transition-all duration-300 border-2 border-clay-light/30">
              <Link to="/shop?tab=affirmations">Shop Affirmations</Link>
            </Button>
            
            {/* Secondary CTA */}
            <Button asChild size="lg" variant="outline" className="border-2 border-white/90 bg-transparent text-white font-semibold hover:bg-white hover:text-clay-dark shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
              <Link to="/affirmation-builder">Create Your Own</Link>
            </Button>
          </div>
          
          {/* Tertiary CTA - Text Link */}
          <div className="mt-6">
            <Link 
              to="/journal" 
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-base group transition-colors drop-shadow-md"
            >
              <span className="relative">
                Explore the Journal
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/50 transition-all duration-300 group-hover:bg-white"></span>
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Affirmation Builder Section - Moved Below Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-custom max-w-3xl text-center">
          <div className="inline-flex flex-col items-center gap-3 p-6 sm:p-8 rounded-lg bg-clay-dark border border-clay-light/40 shadow-[0_6px_28px_rgba(139,107,84,0.4),0_4px_16px_rgba(139,107,84,0.3)] hover:shadow-[0_10px_40px_rgba(139,107,84,0.5),0_6px_20px_rgba(139,107,84,0.4),0_0_0_1px_rgba(212,175,55,0.3)] hover:-translate-y-1 hover:scale-[1.015] transition-all duration-300">
            <div className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-white" />
              <span className="text-sm text-white font-semibold uppercase tracking-wider drop-shadow-sm">Create Your Own</span>
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <Link 
              to="/affirmation-builder" 
              className="text-xl sm:text-2xl font-display text-white font-semibold hover:text-white/90 transition-colors group drop-shadow-md"
            >
              <span className="relative">
                Custom Affirmation Builder
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <p className="text-sm sm:text-base text-white/90 max-w-md font-medium drop-shadow-sm">Design personalized affirmations tailored to your journey</p>
          </div>
        </div>
      </section>

      {/* Featured Affirmations */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-clay" />
              <h2 className="mb-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Featured Affirmations</h2>
              <Sparkles className="h-6 w-6 text-clay" />
            </div>
            <p className="text-base sm:text-lg text-text-secondary">Words to carry with you</p>
          </div>
          
          <AffirmationCarousel affirmations={featuredAffirmations} />

          <div className="text-center mt-6 sm:mt-8">
            <Button asChild size="lg" variant="outline" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 btn-premium">
              <Link to="/shop?tab=affirmations">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View All Affirmations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Ritual Edit */}
      <FeaturedProducts />

      {/* Featured Journal Articles */}
      <FeaturedArticles />

      {/* Testimonials */}
      <Testimonials />

      {/* About Preview */}
      <section className="section-padding bg-secondary">
        <div className="container-custom max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="h-6 w-6 text-clay" />
            <h2 className="mb-0">Every word a reflection, every product an intention</h2>
          </div>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            LunaRituals exists to help you create a life you love—one affirmation, 
            one beautiful object, one intentional choice at a time.
          </p>
          <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 btn-premium">
            <Link to="/about">
              <BookOpen className="mr-2 h-4 w-4" />
              Our Story
            </Link>
          </Button>
        </div>
      </section>

        {/* Newsletter */}
        <NewsletterSection />
      </div>
    </PageTransition>
  );
};

export default Index;
