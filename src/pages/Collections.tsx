import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { affirmations } from "@/data/affirmations";

// Get sample images
const sampleImg1 = affirmations.find(a => a.id === "aff-001")?.image || "";
const sampleImg2 = affirmations.find(a => a.id === "aff-003")?.image || "";
const sampleImg3 = affirmations.find(a => a.id === "aff-005")?.image || "";

const Collections = () => {
  const collections = [
    {
      title: "Digital Affirmations",
      description: "Downloadable wallpapers and prints for your daily practice",
      image: sampleImg1,
      href: "/shop?tab=affirmations"
    },
    {
      title: "Journals & Books",
      description: "Guided journals and inspiring reads for reflection",
      image: sampleImg2,
      href: "/shop?tab=books"
    },
    {
      title: "Candles & Rituals",
      description: "Set the mood for your intentional moments",
      image: sampleImg3,
      href: "/shop?tab=candles"
    },
    {
      title: "Wellness",
      description: "Nourish your body and mind",
      image: sampleImg1,
      href: "/shop?tab=supplements"
    },
    {
      title: "Lifestyle",
      description: "Curated pieces for intentional living",
      image: sampleImg2,
      href: "/shop?tab=fashion"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Collections — LunaRituals | Shop by Category</title>
        <meta name="description" content="Browse our curated collections of affirmations, journals, candles, wellness, and lifestyle products for intentional living." />
        <link rel="canonical" href="https://lunarituals.com/collections" />
        
        <meta property="og:title" content="Collections — LunaRituals" />
        <meta property="og:description" content="Browse our curated collections for intentional living." />
        <meta property="og:url" content="https://lunarituals.com/collections" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom text-center">
            <p className="text-clay text-sm uppercase tracking-[0.2em] mb-4">Browse</p>
            <h1 className="text-text-primary mb-6">Our Collections</h1>
            <p className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto">
              Curated categories of products designed to support your intentional living journey
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link
                  key={collection.title}
                  to={collection.href}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-4">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <h3 className="text-xl font-display text-text-primary mb-2 group-hover:text-clay transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-clay font-medium group-hover:gap-3 transition-all">
                    Shop Collection
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-text-primary text-background">
          <div className="container-custom text-center">
            <h2 className="text-background mb-6">Not Sure Where to Start?</h2>
            <p className="text-xl text-background/80 mb-10 max-w-2xl mx-auto">
              Explore all our products in one place and find exactly what you need.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-text-primary font-medium rounded hover:bg-background/90 transition-colors"
            >
              Shop All Products
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Collections;
