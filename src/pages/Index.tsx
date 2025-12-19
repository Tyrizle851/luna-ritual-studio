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
import { Sparkles, ShoppingBag, BookOpen, Heart, Sprout, Wand2, Moon, Users } from "lucide-react";
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
        <meta property="og:image" content="https://lunarituals.com/hero-video.mp4" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LunaRituals — Affirmations for Intentional Living" />
        <meta name="twitter:description" content="Digital art and curated goods for women building calm, beautiful lives." />
        
        {/* Keywords */}
        <meta name="keywords" content="affirmations, digital affirmations, affirmation wallpaper, self-love affirmations, manifestation wallpaper, intentional living, mindfulness, wellness, self-care" />
      </Helmet>
      <div className="min-h-screen">
      {/* Hero Section - reduced height by 15% */}
      <section className="relative h-[72vh] flex items-center justify-center text-center overflow-hidden py-16 bg-[#2a2520]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={(e) => {
            e.currentTarget.play().catch(() => {
              console.log('Autoplay prevented by browser');
            });
          }}
          className="absolute inset-0 w-full h-full object-cover object-center scale-125"
          style={{ filter: 'brightness(0.6) blur(4px) saturate(0.85)' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Soft vignette overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
        <div className="relative z-10 container-custom max-w-4xl px-4">
          <h1 className="mb-10 text-balance text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] font-normal tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Affirmations for women building calm, beautiful lives
          </h1>
          <p className="text-xl md:text-2xl mb-14 text-balance text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] font-normal" style={{ fontWeight: 400 }}>
            Digital art and curated goods for intentional living
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            {/* Primary CTA */}
            <Button asChild className="h-[37px] px-8 bg-[#A97E63] hover:bg-[#8B6950] text-white font-semibold rounded-md shadow-[0_3px_12px_rgba(169,126,99,0.35)] hover:shadow-[0_6px_20px_rgba(169,126,99,0.45)] hover:-translate-y-0.5 transition-all duration-300 ease-out">
              <Link to="/shop?tab=affirmations" className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Shop Affirmations
              </Link>
            </Button>
            
            {/* Secondary CTA */}
            <Button asChild variant="outline" className="h-[37px] px-8 border border-white/80 bg-white/5 backdrop-blur-sm text-white font-medium rounded-md hover:bg-white/15 hover:border-white transition-all duration-300 ease-out">
              <Link to="/affirmation-builder" className="inline-flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Create Your Own
              </Link>
            </Button>
          </div>
          
          {/* Tertiary CTA - Text Link */}
          <div className="mt-10">
            <Link 
              to="/journal" 
              className="inline-flex items-center gap-2 text-white/85 hover:text-white text-base group transition-colors drop-shadow-sm"
              style={{ fontWeight: 400 }}
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

      {/* Affirmation Studio Section */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 bg-gradient-to-b from-[#FAF7F4] to-[#F7F3EF]">
        <div className="container-custom max-w-3xl">
          {/* Section Header Above */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-display text-foreground font-semibold mb-2">Your Personal Affirmation Studio</h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto">Design custom affirmations with our intuitive studio tools</p>
          </div>

          {/* Builder Card */}
          <Link to="/affirmation-builder" className="block">
            <div className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-lg bg-white border border-[#EBDDD1]/30 mx-auto hover:border-clay/40 transition-all duration-300 hover:shadow-[0_16px_32px_rgba(139,107,84,0.12)] hover:-translate-y-0.5 group" style={{ 
              boxShadow: '0 12px 26px rgba(0,0,0,0.07)',
              maxWidth: '520px'
            }}>
              <div className="flex items-center gap-2">
                <Sprout className="h-3.5 w-3.5 text-clay-dark/70 group-hover:text-clay-dark transition-colors" />
                <span className="text-[10px] text-clay-dark/70 font-medium uppercase tracking-wide group-hover:text-clay-dark transition-colors">Create Your Own</span>
                <Wand2 className="h-3.5 w-3.5 text-clay-dark/70 group-hover:text-clay-dark transition-colors" />
              </div>
              <span className="text-lg sm:text-xl font-display text-foreground font-semibold group-hover:text-clay-dark transition-colors text-center">
                Custom Affirmation Studio
              </span>
              
              {/* Staff Pick Mini-Cards Inside */}
              <div className="flex justify-center gap-3 my-2" onClick={(e) => e.preventDefault()}>
                {/* Morning Ritual Mini */}
                <Link 
                  to="/affirmation-builder?preset=morning" 
                  className="group/mini"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div 
                    className="w-[80px] sm:w-[90px] bg-white rounded-md border border-[#EBDDD1]/50 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(139,107,84,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                    style={{ transform: 'rotate(-2deg)' }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img src={morningRitualImg} alt="Morning Ritual" className="w-full h-full object-cover" />
                    </div>
                    <div className="py-1.5 px-1 text-center border-t border-[#EBDDD1]/30">
                      <span className="text-[9px] font-medium text-foreground/80 group-hover/mini:text-clay-dark transition-colors">Morning Ritual</span>
                    </div>
                  </div>
                </Link>

                {/* Power Hour Mini */}
                <Link 
                  to="/affirmation-builder?preset=power" 
                  className="group/mini"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div 
                    className="w-[80px] sm:w-[90px] bg-white rounded-md border border-[#EBDDD1]/50 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(139,107,84,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                    style={{ transform: 'rotate(2deg)' }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img src={powerHourImg} alt="Power Hour" className="w-full h-full object-cover" />
                    </div>
                    <div className="py-1.5 px-1 text-center border-t border-[#EBDDD1]/30">
                      <span className="text-[9px] font-medium text-foreground/80 group-hover/mini:text-clay-dark transition-colors">Power Hour</span>
                    </div>
                  </div>
                </Link>
              </div>
              
              <p className="text-sm text-foreground/75 max-w-md font-normal text-center">Craft personalized affirmations tailored to your intentions</p>
            </div>
          </Link>

          {/* Social Proof Card */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-[#EBDDD1]/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <Users className="h-4 w-4 text-clay-dark/70" />
              <span className="text-sm text-text-secondary font-medium">5,000+ creators using the studio</span>
            </div>
          </div>
        </div>
      </section>

      {/* Diamond Separator */}
      <div className="flex items-center justify-center gap-4 my-8">
        <div className="h-px bg-gradient-to-r from-transparent via-clay-dark to-clay-dark flex-1 max-w-[120px]"></div>
        <div className="w-3 h-3 rotate-45 border border-clay-dark bg-background"></div>
        <div className="h-px bg-gradient-to-l from-transparent via-clay-dark to-clay-dark flex-1 max-w-[120px]"></div>
      </div>

      {/* Featured Affirmations */}
      <section className="pb-16 sm:pb-20 pt-6 sm:pt-8">
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

      {/* Trust Badges */}
      <TrustBadges />

      {/* The Ritual Edit */}
      <FeaturedProducts />

      {/* Why LunaRituals */}
      <WhyLunaRituals />

      {/* Sustainability Section */}
      <SustainabilitySection />

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
