import { Leaf, Recycle, TreePine, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const SustainabilitySection = () => {
  const values = [
    { icon: Leaf, label: "100% Digital-First" },
    { icon: Recycle, label: "Eco-Conscious" },
    { icon: TreePine, label: "Sustainable Materials" },
    { icon: Heart, label: "Mindfully Made" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F7F3EF]">
      <div className="container-custom max-w-3xl text-center">
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          Intentional doesn't mean inaccessible. We create mindful products with purpose and sustainability at heart.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {values.map((value) => (
            <div key={value.label} className="flex items-center gap-2 text-foreground/80">
              <value.icon className="h-5 w-5 text-clay" />
              <span className="text-sm font-medium">
                {value.label}
              </span>
            </div>
          ))}
        </div>

        <Link 
          to="/sustainability" 
          className="inline-flex items-center gap-2 text-clay hover:text-clay-dark font-medium transition-colors group"
        >
          Learn About Our Impact
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};
