import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import heroImage from "@/assets/hero-home.jpg";
import affirmationRest from "@/assets/affirmation-rest.jpg";
import affirmationJoy from "@/assets/affirmation-joy.jpg";
import affirmationAbundance from "@/assets/affirmation-abundance.jpg";
import affirmationEnough from "@/assets/affirmation-enough.jpg";
import affirmationCalm from "@/assets/affirmation-calm.jpg";
import affirmationTrust from "@/assets/affirmation-trust.jpg";

const Index = () => {
  const featuredAffirmations = [
    { id: "aff-001", title: "I am worthy of rest", price: 12, image: affirmationRest },
    { id: "aff-002", title: "I choose joy today", price: 12, image: affirmationJoy },
    { id: "aff-003", title: "Abundance flows to me", price: 15, image: affirmationAbundance },
    { id: "aff-005", title: "I am enough, always", price: 12, image: affirmationEnough },
    { id: "aff-006", title: "My calm is my power", price: 12, image: affirmationCalm },
    { id: "aff-004", title: "I trust my journey", price: 12, image: affirmationTrust },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[85vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative z-10 container-custom max-w-4xl">
          <h1 className="mb-6 text-balance">
            Affirmations for women building calm, beautiful lives
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance text-text-secondary">
            Digital art and curated goods for intentional living
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-clay hover:bg-clay-dark text-white">
              <Link to="/shop/affirmations">Shop Affirmations</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-clay text-clay hover:bg-clay/10">
              <Link to="/shop/lifestyle">Explore The Edit</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Affirmations */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Affirmations</h2>
            <p className="text-lg text-text-secondary">Words to carry with you</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredAffirmations.slice(0, 6).map((affirmation) => (
              <div key={affirmation.id} className="group animate-fade-up">
                <div className="mb-4 overflow-hidden rounded aspect-[4/5] bg-secondary">
                  <img
                    src={affirmation.image}
                    alt={affirmation.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl mb-2">{affirmation.title}</h3>
                <span className="font-semibold">${affirmation.price}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-clay text-clay hover:bg-clay/10">
              <Link to="/shop/affirmations">View All Affirmations</Link>
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
          <h2 className="mb-6">Every word a reflection, every product an intention</h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            LunaRituals exists to help you create a life you love—one affirmation, 
            one beautiful object, one intentional choice at a time.
          </p>
          <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay/10">
            <Link to="/about">Our Story</Link>
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default Index;
