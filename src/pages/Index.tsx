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
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden py-20 sm:py-[120px_0_140px_0]" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
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
        {/* Sophisticated gradient overlay for improved legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(45,35,30,0.65)] to-[rgba(25,20,18,0.75)]" />
        {/* Vignette effect */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.4)' }} />
        
        <div className="relative z-10 container-custom px-4" style={{ maxWidth: '600px' }}>
          <h1 
            className="mb-8 text-balance text-white font-normal animate-fade-in opacity-0 [animation-fill-mode:forwards]"
            style={{ 
              letterSpacing: '-0.02em', 
              lineHeight: '1.15', 
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              animationDelay: '0s'
            }}
          >
            Affirmations for women building calm, beautiful lives
          </h1>
          <p 
            className="text-xl md:text-2xl mb-12 text-balance text-white font-normal animate-fade-in opacity-0 [animation-fill-mode:forwards]" 
            style={{ 
              fontWeight: 400,
              opacity: 0.9,
              letterSpacing: '0.01em',
              lineHeight: '1.6',
              animationDelay: '0.15s'
            }}
          >
            Digital art and curated goods for intentional living
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.3s' }}>
            {/* Primary CTA */}
            <Button asChild className="h-[52px] px-10 bg-[#C4956A] hover:bg-[#B5875E] text-white font-medium uppercase text-sm rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(196,149,106,0.35)] hover:-translate-y-[2px] transition-all duration-300" style={{ letterSpacing: '0.05em', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <Link to="/shop?tab=affirmations">Shop Affirmations</Link>
            </Button>
            
            {/* Secondary CTA */}
            <Button asChild variant="outline" className="h-[52px] px-10 border border-white/60 bg-transparent text-white font-medium uppercase text-sm rounded-[4px] hover:bg-white/10 hover:border-white transition-all duration-300" style={{ letterSpacing: '0.05em', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <Link to="/affirmation-builder">Create Your Own</Link>
            </Button>
          </div>
          
          {/* Tertiary CTA - Text Link */}
          <div className="mt-10 animate-fade-in opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.45s' }}>
            <Link 
              to="/journal" 
              className="inline-flex items-center gap-2 text-white/85 hover:text-white text-base group transition-colors"
              style={{ fontWeight: 400, letterSpacing: '0.03em' }}
            >
              <span className="relative">
                Explore the Journal
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Affirmation Builder Section - Moved Below Hero */}
      <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 bg-gradient-to-b from-[#FAF7F4] to-[#F7F3EF]">
        <div className="container-custom max-w-3xl">
          <div className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-lg bg-white border border-[#EBDDD1]/30 mx-auto" style={{ 
            boxShadow: '0 12px 26px rgba(0,0,0,0.07)',
            maxWidth: '520px'
          }}>
            <div className="flex items-center gap-2">
              <Sprout className="h-3.5 w-3.5 text-[#A97E63]/70" />
              <span className="text-[10px] text-[#A97E63]/70 font-medium uppercase tracking-wide">Create Your Own</span>
              <Wand2 className="h-3.5 w-3.5 text-[#A97E63]/70" />
            </div>
            <Link 
              to="/affirmation-builder" 
              className="text-lg sm:text-xl font-display text-[#8B6B54] font-semibold hover:text-[#A97E63] transition-colors group text-center"
            >
              <span className="relative">
                Custom Affirmation Builder
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A97E63] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <p className="text-sm text-[#8B6B54]/75 max-w-md font-normal text-center">Design personalized affirmations tailored to your journey</p>
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
