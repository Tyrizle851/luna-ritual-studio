import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { AffirmationCarousel } from "@/components/AffirmationCarousel";
import { Sparkles, ShoppingBag, BookOpen, Heart } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

import affirmationRest from "@/assets/affirmation-rest.jpg";
import affirmationJoy from "@/assets/affirmation-joy.jpg";
import affirmationAbundance from "@/assets/affirmation-abundance.jpg";
import affirmationEnough from "@/assets/affirmation-enough.jpg";
import affirmationCalm from "@/assets/affirmation-calm.jpg";
import affirmationTrust from "@/assets/affirmation-trust.jpg";

const Index = () => {
  const featuredAffirmations = [
    { id: "aff-001", title: "I am worthy of rest", price: 12, image: affirmationRest, description: "Permission to pause" },
    { id: "aff-002", title: "I choose joy today", price: 12, image: affirmationJoy, description: "Small moments, big magic" },
    { id: "aff-003", title: "Abundance flows to me", price: 15, image: affirmationAbundance, description: "Open to receive" },
    { id: "aff-005", title: "I am enough, always", price: 12, image: affirmationEnough, description: "You are complete" },
    { id: "aff-006", title: "My calm is my power", price: 12, image: affirmationCalm, description: "Peace over pressure" },
    { id: "aff-004", title: "I trust my journey", price: 12, image: affirmationTrust, description: "Every step is sacred" },
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
          <div className="mt-8 text-center">
            <Link 
              to="/affirmation-builder" 
              className="text-sm md:text-base text-white hover:text-clay-light transition-colors underline underline-offset-4"
            >
              View Affirmation Builder
            </Link>
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
