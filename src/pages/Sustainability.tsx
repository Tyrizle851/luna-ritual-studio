import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { Leaf, Recycle, Package, Droplets, TreePine, Heart } from "lucide-react";

const Sustainability = () => {
  const values = [
    {
      icon: Leaf,
      title: "Natural Materials",
      description: "We prioritize natural, plant-based, and organic materials in our products whenever possible."
    },
    {
      icon: Recycle,
      title: "Recyclable Packaging",
      description: "Our packaging is designed to be recycled or composted, minimizing waste."
    },
    {
      icon: Package,
      title: "Plastic-Free",
      description: "We're committed to eliminating single-use plastics from our operations."
    },
    {
      icon: Droplets,
      title: "Biodegradable",
      description: "Many of our products are made with biodegradable materials that return to the earth."
    }
  ];

  const practices = [
    {
      title: "Conscious Sourcing",
      description: "We carefully vet our suppliers and partners to ensure ethical and sustainable practices throughout our supply chain. From the inks we use to the paper we print on, every choice is intentional.",
      icon: TreePine
    },
    {
      title: "Minimal Footprint",
      description: "We continuously work to reduce our environmental impact—from carbon-neutral shipping options to energy-efficient operations. Small choices add up to meaningful change.",
      icon: Leaf
    },
    {
      title: "Quality Over Quantity",
      description: "We believe the most sustainable product is one that lasts. That's why we focus on creating and curating items that are timeless, durable, and designed to be cherished for years.",
      icon: Heart
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Sustainability — LunaRituals | Our Environmental Commitment</title>
        <meta name="description" content="Learn about LunaRituals' commitment to sustainability. We use natural materials, recyclable packaging, and ethical practices to minimize our environmental impact." />
        <link rel="canonical" href="https://lunarituals.com/sustainability" />
        
        <meta property="og:title" content="Sustainability — LunaRituals" />
        <meta property="og:description" content="Our commitment to sustainable and ethical practices in everything we create." />
        <meta property="og:url" content="https://lunarituals.com/sustainability" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-clay/20 mb-8">
              <Leaf className="h-10 w-10 text-clay" />
            </div>
            <p className="text-clay text-sm uppercase tracking-[0.2em] mb-4">Our Commitment</p>
            <h1 className="text-text-primary mb-6 max-w-4xl mx-auto">
              Sustainability at the Heart of Everything We Do
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto">
              We believe that living intentionally means caring for our planet. 
              That's why sustainability isn't an afterthought—it's woven into every decision we make.
            </p>
          </div>
        </section>

        {/* Values Icons Row */}
        <section className="py-16 bg-background border-y border-border">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                    <value.icon className="h-8 w-8 text-clay" />
                  </div>
                  <h4 className="text-lg font-display text-text-primary mb-2">{value.title}</h4>
                  <p className="text-sm text-text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practices Sections */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">How We Do It</p>
              <h2 className="text-text-primary">Our Sustainable Practices</h2>
            </div>

            <div className="space-y-16">
              {practices.map((practice, index) => (
                <div 
                  key={index} 
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
                        <practice.icon className="h-6 w-6 text-clay" />
                      </div>
                      <h3 className="text-text-primary mb-0">{practice.title}</h3>
                    </div>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {practice.description}
                    </p>
                  </div>
                  <div className={`bg-secondary/50 rounded-lg p-12 text-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <practice.icon className="h-24 w-24 text-clay/40 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Statement */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="text-text-primary mb-8">Our Ongoing Journey</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              Sustainability is a journey, not a destination. We're constantly learning, 
              evolving, and finding new ways to reduce our impact. We're not perfect, 
              but we're committed to progress—and we're transparent about where we are and where we're headed.
            </p>
            <p className="text-lg text-text-muted">
              Have questions about our sustainability practices? We'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-6 text-clay hover:text-clay-dark transition-colors font-medium"
            >
              Get in Touch →
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-text-primary text-background">
          <div className="container-custom text-center">
            <h2 className="text-background mb-6">Shop with Intention</h2>
            <p className="text-xl text-background/80 mb-10 max-w-2xl mx-auto">
              Every purchase supports our mission to create beautiful, sustainable products 
              that help you live more intentionally.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-text-primary font-medium rounded hover:bg-background/90 transition-colors"
            >
              Explore Our Collection
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Sustainability;
