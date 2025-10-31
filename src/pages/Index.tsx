import { Link } from "react-router-dom";
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
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover animate-fade-in opacity-0 [animation-fill-mode:forwards]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background/70" />
        <div className="relative z-10 container-custom max-w-4xl">
          <h1 className="mb-6 text-balance">
            Affirmations for women building calm, beautiful lives
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance text-text-secondary">
            Digital art and curated goods for intentional living
          </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-clay hover:bg-clay-dark text-white">
              <Link to="/shop?tab=affirmations">Shop Affirmations</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-clay text-clay hover:bg-clay/10">
              <Link to="/journal">Explore The Journal</Link>
            </Button>
          </div>
          
          {/* Affirmation Builder Link */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-3 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-clay-light" />
                <span className="text-sm text-white/70 uppercase tracking-wider">Create Your Own</span>
                <Wand2 className="h-5 w-5 text-clay-light" />
              </div>
              <Link 
                to="/affirmation-builder" 
                className="text-lg font-display text-white hover:text-clay-light transition-colors group"
              >
                <span className="relative">
                  Custom Affirmation Builder
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-clay-light transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <p className="text-xs text-white/60 max-w-xs">Design personalized affirmations tailored to your journey</p>
            </div>
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
