import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { AffirmationCarousel } from "@/components/AffirmationCarousel";
import { Testimonials } from "@/components/Testimonials";
import { BundleShowcase } from "@/components/BundleShowcase";
import {
  FreeShippingBanner,
  GuaranteeBadge,
  ReviewStars,
  MediaLogos,
  SocialProofBadge
} from "@/components/TrustBadges";
import { Sparkles, ShoppingBag, BookOpen, Heart, Sprout, Wand2, Moon, Users, TrendingUp, Zap } from "lucide-react";
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
        <title>LunaRituals — Join 12,000+ Women Building Intentional, Beautiful Lives</title>
        <meta name="description" content="Premium digital affirmations, creative studio tools, and curated lifestyle goods. Join thousands of women transforming their daily rituals with intentional living." />
        <link rel="canonical" href="https://lunarituals.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="LunaRituals — Affirmations for Intentional Living" />
        <meta property="og:description" content="Join 12,000+ women building calm, beautiful lives with premium affirmations and curated goods." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lunarituals.com/" />
        <meta property="og:image" content="https://lunarituals.com/hero-video.mp4" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LunaRituals — Join 12,000+ Women" />
        <meta name="twitter:description" content="Premium affirmations and tools for intentional living" />

        {/* Keywords */}
        <meta name="keywords" content="affirmations, digital affirmations, affirmation wallpaper, self-love, manifestation, intentional living, mindfulness, wellness" />
      </Helmet>

      <div className="min-h-screen">
        {/* Free Shipping Banner */}
        <FreeShippingBanner />

        {/* Hero Section - REDESIGNED */}
        <section className="relative h-[75vh] flex items-center justify-center text-center overflow-hidden py-16 bg-[#2a2520]">
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
            style={{ filter: 'brightness(0.55) blur(4px) saturate(0.85)' }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />

          <div className="relative z-10 container-custom max-w-5xl px-4">
            {/* Social Proof Badge */}
            <div className="flex justify-center mb-6">
              <SocialProofBadge count={12000} />
            </div>

            {/* Main Headline - with social proof integrated */}
            <h1 className="mb-6 text-balance text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] font-normal tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Join 12,000+ women building<br />calm, beautiful lives
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-8 text-balance text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] font-normal max-w-3xl mx-auto">
              Premium digital affirmations, creative studio tools, and curated lifestyle goods for intentional living
            </p>

            {/* Trust Signals Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <ReviewStars rating={4.8} count={2347} />
              <GuaranteeBadge />
            </div>

            {/* Primary CTA - Single Dominant Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 bg-[#A97E63] hover:bg-[#8B6950] text-white font-semibold text-lg rounded-md shadow-[0_4px_16px_rgba(169,126,99,0.4)] hover:shadow-[0_8px_24px_rgba(169,126,99,0.5)] hover:-translate-y-0.5 transition-all duration-300 ease-out"
              >
                <Link to="/shop?tab=affirmations" className="inline-flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Shop Premium Affirmations
                </Link>
              </Button>

              {/* Secondary CTA - Smaller, Less Prominent */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 border-2 border-white/80 bg-white/5 backdrop-blur-sm text-white font-medium rounded-md hover:bg-white/15 hover:border-white transition-all duration-300 ease-out"
              >
                <Link to="/affirmation-builder" className="inline-flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Try Studio Free
                </Link>
              </Button>
            </div>

            {/* Media Logos - Trust Building */}
            <MediaLogos />
          </div>
        </section>

        {/* Value Proposition Strip */}
        <section className="py-8 bg-white border-b border-[#EBDDD1]/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-clay/10 mb-3">
                  <Zap className="h-6 w-6 text-clay-dark" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Instant Download</h3>
                <p className="text-sm text-text-secondary">High-resolution digital delivery, ready to use immediately</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-clay/10 mb-3">
                  <Heart className="h-6 w-6 text-clay-dark" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">30-Day Guarantee</h3>
                <p className="text-sm text-text-secondary">Love it or your money back, no questions asked</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-clay/10 mb-3">
                  <TrendingUp className="h-6 w-6 text-clay-dark" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Proven Results</h3>
                <p className="text-sm text-text-secondary">Join 12,000+ women transforming their daily rituals</p>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Bundles - NEW SECTION */}
        <BundleShowcase />

        {/* Affirmation Studio Section - REPOSITIONED & REFINED */}
        <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 bg-gradient-to-b from-white to-[#FAF7F4]">
          <div className="container-custom max-w-3xl">
            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-clay/10">
                <Wand2 className="h-4 w-4 text-clay-dark" />
                <span className="text-sm font-medium text-clay-dark uppercase tracking-wide">Create Your Own</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display text-foreground font-semibold mb-3">
                Your Personal Affirmation Studio
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-2">
                Design custom affirmations with our intuitive studio tools
              </p>
              <p className="text-sm text-clay-dark font-medium">Try free, download for $12 or shop premium designs</p>
            </div>

            {/* Builder Card */}
            <Link to="/affirmation-builder" className="block">
              <div className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-lg bg-white border border-[#EBDDD1]/30 mx-auto hover:border-clay/40 transition-all duration-300 hover:shadow-[0_16px_32px_rgba(139,107,84,0.12)] hover:-translate-y-0.5 group" style={{
                boxShadow: '0 12px 26px rgba(0,0,0,0.07)',
                maxWidth: '560px'
              }}>
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-clay-dark/70 group-hover:text-clay-dark transition-colors" />
                  <span className="text-xs text-clay-dark/70 font-medium uppercase tracking-wide group-hover:text-clay-dark transition-colors">
                    13 Mood Styles • Custom Colors • Instant Preview
                  </span>
                  <Moon className="h-4 w-4 text-clay-dark/70 group-hover:text-clay-dark transition-colors" />
                </div>

                <span className="text-2xl sm:text-3xl font-display text-foreground font-semibold group-hover:text-clay-dark transition-colors text-center">
                  Custom Affirmation Studio
                </span>

                {/* Staff Pick Mini-Cards */}
                <div className="flex justify-center gap-4 my-3" onClick={(e) => e.preventDefault()}>
                  <Link
                    to="/affirmation-builder?preset=morning"
                    className="group/mini"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="w-24 bg-white rounded-md border border-[#EBDDD1]/50 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(139,107,84,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                      style={{ transform: 'rotate(-2deg)' }}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img src={morningRitualImg} alt="Morning Ritual" className="w-full h-full object-cover" />
                      </div>
                      <div className="py-2 px-1 text-center border-t border-[#EBDDD1]/30">
                        <span className="text-[10px] font-medium text-foreground/80 group-hover/mini:text-clay-dark transition-colors">Morning Ritual</span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/affirmation-builder?preset=power"
                    className="group/mini"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="w-24 bg-white rounded-md border border-[#EBDDD1]/50 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(139,107,84,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                      style={{ transform: 'rotate(2deg)' }}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img src={powerHourImg} alt="Power Hour" className="w-full h-full object-cover" />
                      </div>
                      <div className="py-2 px-1 text-center border-t border-[#EBDDD1]/30">
                        <span className="text-[10px] font-medium text-foreground/80 group-hover/mini:text-clay-dark transition-colors">Power Hour</span>
                      </div>
                    </div>
                  </Link>
                </div>

                <p className="text-base text-foreground/75 max-w-md font-normal text-center">
                  Craft personalized affirmations tailored to your intentions. Try free, then download or shop premium.
                </p>

                <Button size="lg" className="mt-2 bg-clay hover:bg-clay-dark" onClick={(e) => e.preventDefault()}>
                  Launch Studio →
                </Button>
              </div>
            </Link>

            {/* Social Proof */}
            <div className="flex justify-center mt-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#EBDDD1]/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <Users className="h-5 w-5 text-clay-dark/70" />
                <span className="text-sm text-text-secondary font-medium">
                  <strong className="text-clay-dark">5,247</strong> creations this month
                </span>
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
        <section className="pb-16 sm:pb-20 pt-6 sm:pt-8 bg-gradient-to-b from-[#FAF7F4] to-white">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-clay" />
                <h2 className="mb-0 text-3xl sm:text-4xl md:text-5xl font-display font-semibold">
                  Bestselling Affirmations
                </h2>
                <Sparkles className="h-6 w-6 text-clay" />
              </div>
              <p className="text-lg text-text-secondary">Curated by our designers, loved by thousands</p>
            </div>

            <AffirmationCarousel affirmations={featuredAffirmations} />

            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-clay hover:bg-clay-dark text-white">
                <Link to="/shop?tab=affirmations">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View All Premium Designs
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* The Ritual Edit */}
        <FeaturedProducts />

        {/* Testimonials - ENHANCED */}
        <Testimonials />

        {/* Featured Journal Articles */}
        <FeaturedArticles />

        {/* About Preview */}
        <section className="section-padding bg-secondary">
          <div className="container-custom max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="h-6 w-6 text-clay" />
              <h2 className="mb-0 text-3xl sm:text-4xl font-display font-semibold">Every word a reflection, every product an intention</h2>
            </div>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              LunaRituals exists to help you create a life you love—one affirmation,
              one beautiful object, one intentional choice at a time. Join 12,000+ women on this journey.
            </p>
            <Button asChild variant="outline" size="lg" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300 btn-premium">
              <Link to="/about">
                <BookOpen className="mr-2 h-4 w-4" />
                Our Story
              </Link>
            </Button>
          </div>
        </section>

        {/* Newsletter - ENHANCED */}
        <NewsletterSection />
      </div>
    </PageTransition>
  );
};

export default Index;
