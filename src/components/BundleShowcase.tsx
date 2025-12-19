import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Tag } from "lucide-react";

interface Bundle {
  id: string;
  name: string;
  description: string;
  image: string;
  regularPrice: number;
  salePrice: number;
  savings: number;
  badge?: "Bestseller" | "New" | "Limited Edition";
  items: string[];
}

const bundles: Bundle[] = [
  {
    id: "morning-ritual",
    name: "Morning Ritual Bundle",
    description: "Start every day with intention and power",
    image: "/lovable-uploads/aff-014.png",
    regularPrice: 54,
    salePrice: 45,
    savings: 9,
    badge: "Bestseller",
    items: ["3 Morning Affirmations", "Digital Wallpaper Set", "Morning Ritual Guide"]
  },
  {
    id: "complete-collection",
    name: "Complete Collection",
    description: "Everything you need for intentional living",
    image: "/lovable-uploads/aff-006.png",
    regularPrice: 129,
    salePrice: 95,
    savings: 34,
    badge: "New",
    items: ["8 Premium Affirmations", "All Mood Themes", "Exclusive Bonus Design"]
  },
  {
    id: "gift-set",
    name: "Mindful Gift Set",
    description: "Perfect for friends building their best lives",
    image: "/lovable-uploads/aff-009.png",
    regularPrice: 45,
    salePrice: 35,
    savings: 10,
    items: ["2 Gift-Ready Affirmations", "Beautiful Packaging", "Personal Note Card"]
  }
];

export const BundleShowcase = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F7F3EF] to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-clay/10">
            <Tag className="h-4 w-4 text-clay-dark" />
            <span className="text-sm font-medium text-clay-dark uppercase tracking-wide">Save More</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Curated Bundles
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Complete collections crafted for your wellness journey. Save up to 25% when you bundle.
          </p>
        </div>

        {/* Bundle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="group relative bg-white rounded-lg overflow-hidden border border-[#EBDDD1]/30 hover:border-clay/40 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(139,107,84,0.15)] hover:-translate-y-1"
            >
              {/* Badge */}
              {bundle.badge && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-clay text-white text-xs font-semibold uppercase tracking-wide">
                  {bundle.badge}
                </div>
              )}

              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden bg-[#FAF7F4]">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {bundle.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4">{bundle.description}</p>

                {/* What's Included */}
                <ul className="mb-4 space-y-1">
                  {bundle.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Sparkles className="h-3.5 w-3.5 text-clay-dark mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="flex items-end justify-between mb-4 pb-4 border-b border-[#EBDDD1]/30">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-display font-semibold text-foreground">
                        ${bundle.salePrice}
                      </span>
                      <span className="text-base text-text-secondary line-through">
                        ${bundle.regularPrice}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-clay-dark">Save ${bundle.savings}</span>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-clay/10">
                      <span className="text-xs font-semibold text-clay-dark">
                        {Math.round((bundle.savings / bundle.regularPrice) * 100)}% OFF
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button asChild className="w-full bg-clay hover:bg-clay-dark">
                  <Link to={`/shop?bundle=${bundle.id}`}>Add to Cart</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-clay text-clay hover:bg-clay hover:text-white">
            <Link to="/shop?tab=bundles">View All Bundles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
