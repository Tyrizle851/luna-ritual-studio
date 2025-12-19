import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Leaf, Recycle, TreePine, Heart, Package, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Sustainability = () => {
  const values = [
    { icon: Leaf, label: "Digital-First Approach", description: "Our affirmations are designed as digital products first, reducing waste and environmental impact." },
    { icon: Recycle, label: "Recyclable Packaging", description: "When we do ship physical products, we use 100% recyclable and biodegradable materials." },
    { icon: TreePine, label: "Sustainable Materials", description: "Our prints are made with FSC-certified paper and eco-friendly inks." },
    { icon: Package, label: "Minimal Packaging", description: "We believe in less is more—just enough protection without the excess." },
    { icon: Globe, label: "Carbon Conscious", description: "We're actively working to reduce our carbon footprint across all operations." },
    { icon: Heart, label: "Mindful Production", description: "Every item is created with intention, ensuring nothing goes to waste." },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Sustainability | LunaRituals</title>
        <meta name="description" content="Learn about LunaRituals' commitment to sustainability and our eco-conscious practices." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#E8F5E9] to-background">
          <div className="container-custom max-w-4xl text-center">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground mb-6">
              Sustainability
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Intentional doesn't mean inaccessible. We create mindful products with purpose and sustainability at heart.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.label} className="p-6 rounded-xl bg-secondary border border-border/30">
                  <value.icon className="h-10 w-10 text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.label}</h3>
                  <p className="text-sm text-text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital First Section */}
        <section className="py-16 sm:py-20 bg-secondary">
          <div className="container-custom max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
                  Why Digital-First?
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  By prioritizing digital products, we eliminate the need for shipping, packaging, and physical production for a large portion of our offerings. This means instant access for you and a lighter footprint for our planet.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Our digital affirmations can be used as phone wallpapers, desktop backgrounds, or printed locally when you're ready—putting the choice in your hands.
                </p>
              </div>
              <div className="bg-green-100 rounded-2xl aspect-square flex items-center justify-center">
                <TreePine className="h-24 w-24 text-green-600/50" />
              </div>
            </div>
          </div>
        </section>

        {/* Physical Products Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-clay/10 rounded-2xl aspect-square flex items-center justify-center md:order-2">
                <Package className="h-24 w-24 text-clay/50" />
              </div>
              <div className="md:order-1">
                <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
                  When We Ship
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  For our physical products like canvas prints and framed posters, we partner with print-on-demand services that produce items only when ordered—eliminating overproduction and excess inventory.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  All our packaging materials are recyclable, and we're constantly exploring new ways to reduce our environmental impact without compromising on quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[#E8F5E9]">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Shop Sustainably
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Explore our digital affirmation collection—instant downloads with zero shipping impact.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link to="/shop?tab=affirmations">Browse Digital Affirmations</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Sustainability;
