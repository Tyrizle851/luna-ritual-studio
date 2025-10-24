import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-home.jpg";

const Index = () => {
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
    </div>
  );
};

export default Index;
