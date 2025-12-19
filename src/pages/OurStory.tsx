import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Shield, Leaf } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

const OurStory = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Our Story — LunaRituals | Intentional Living for Women</title>
        <meta name="description" content="Discover the story behind LunaRituals. We create affirmations and curate wellness products to help women build lives of intention, one word at a time." />
        <link rel="canonical" href="https://lunarituals.com/our-story" />
        
        <meta property="og:title" content="Our Story — LunaRituals" />
        <meta property="og:description" content="Creating affirmations and curating lifestyle goods for women building calm, beautiful lives." />
        <meta property="og:url" content="https://lunarituals.com/our-story" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <img
            src={aboutHero}
            alt="LunaRituals story"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-text-primary/50 via-text-primary/60 to-background" />
          <div className="relative z-10 text-center max-w-4xl px-4">
            <p className="text-background/80 text-sm uppercase tracking-[0.2em] mb-4">Our Story</p>
            <h1 className="text-background mb-6 drop-shadow-2xl">
              Building lives of intention, one word at a time
            </h1>
            <p className="text-xl md:text-2xl text-background/90 font-light max-w-2xl mx-auto">
              We believe in the transformative power of words and the beauty of intentional living
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            <div className="text-center">
              <h2 className="text-text-primary mb-8">Our Mission</h2>
              <p className="text-2xl md:text-3xl leading-relaxed text-text-secondary font-light">
                LunaRituals exists to help women create lives that feel as good as they look. 
                Through thoughtfully crafted affirmations and carefully curated products, 
                we make intentional living simple, beautiful, and accessible.
              </p>
            </div>
          </div>
        </section>

        {/* Story Sections - Alternating */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            {/* Section 1 */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32">
              <div className="order-2 lg:order-1">
                <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">The Beginning</p>
                <h3 className="text-text-primary mb-6">A Love Letter to Intentional Women</h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  LunaRituals began as a love letter to women who are building lives of intention—who understand 
                  that rest is not earned, that joy is a practice, and that you are worthy exactly as you are.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  We saw a gap in the wellness space: too much toxic positivity, too little authenticity. 
                  We wanted to create something different—affirmations that honor where you are, 
                  products that serve your real life.
                </p>
              </div>
              <div className="order-1 lg:order-2 bg-card rounded-lg p-12 text-center">
                <blockquote className="text-2xl md:text-3xl font-display text-clay italic leading-relaxed">
                  "You are not building a perfect life. You are building a meaningful one."
                </blockquote>
              </div>
            </div>

            {/* Section 2 */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32">
              <div className="bg-card rounded-lg p-12 text-center">
                <blockquote className="text-2xl md:text-3xl font-display text-clay italic leading-relaxed">
                  "What surrounds you shapes you."
                </blockquote>
              </div>
              <div>
                <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">Our Approach</p>
                <h3 className="text-text-primary mb-6">Intentional in Every Detail</h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  Every affirmation we create is designed with care. Every product we curate is chosen with purpose. 
                  We believe that the objects and words that fill your space have the power to transform your mindset.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  This isn't about perfection—it's about presence. About choosing yourself, again and again. 
                  About building rituals that nourish your soul and support your growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">What We Stand For</p>
              <h2 className="text-text-primary">Our Values</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <Heart className="h-8 w-8 text-clay" />
                </div>
                <h4 className="text-xl font-display text-text-primary mb-4">Authenticity</h4>
                <p className="text-text-secondary">
                  No toxic positivity. Real talk for real women. Affirmations that honor where you are right now.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <Sparkles className="h-8 w-8 text-clay" />
                </div>
                <h4 className="text-xl font-display text-text-primary mb-4">Intentionality</h4>
                <p className="text-text-secondary">
                  Every product, every word, chosen with care and purpose. We believe in quality over quantity.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <Shield className="h-8 w-8 text-clay" />
                </div>
                <h4 className="text-xl font-display text-text-primary mb-4">Quality</h4>
                <p className="text-text-secondary">
                  Beautiful designs and curated goods that last. We choose timeless over trendy, always.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <Leaf className="h-8 w-8 text-clay" />
                </div>
                <h4 className="text-xl font-display text-text-primary mb-4">Sustainability</h4>
                <p className="text-text-secondary">
                  Conscious choices for a better world. We prioritize eco-friendly materials and ethical practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="section-padding bg-secondary/50">
          <div className="container-custom max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-clay/20 mb-8">
              <Shield className="h-10 w-10 text-clay" />
            </div>
            <h2 className="text-text-primary mb-6">Our Promise to You</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
              We stand behind everything we create and curate. If you're not completely satisfied 
              with your purchase, we'll make it right. Your journey toward intentional living 
              should be supported, not stressful.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-clay hover:text-clay-dark transition-colors font-medium"
            >
              Questions? We're here to help →
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-text-primary text-background">
          <div className="container-custom text-center">
            <h2 className="text-background mb-6">Ready to Begin Your Ritual?</h2>
            <p className="text-xl text-background/80 mb-10 max-w-2xl mx-auto">
              Explore our collection of affirmations and curated products designed to support your intentional living journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-background text-text-primary font-medium rounded hover:bg-background/90 transition-colors"
              >
                Shop Collection
              </Link>
              <Link
                to="/sustainability"
                className="inline-flex items-center justify-center px-8 py-4 border border-background/30 text-background font-medium rounded hover:bg-background/10 transition-colors"
              >
                Our Sustainability
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default OurStory;
