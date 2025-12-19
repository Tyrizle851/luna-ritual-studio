import { Leaf, Recycle, TreePine, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const SustainabilitySection = () => {
  const values = [
    { icon: Leaf, label: "100% Digital-First" },
    { icon: Recycle, label: "Eco-Conscious" },
    { icon: TreePine, label: "Sustainable Materials" },
    { icon: Heart, label: "Mindfully Made" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container-custom text-center">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-display font-light text-foreground mb-4 max-w-3xl mx-auto leading-relaxed" style={{ fontStyle: 'italic' }}>
          Intentional doesn't mean inaccessible. We create mindful products with purpose and sustainability at heart.
        </h2>
        
        <div className="flex flex-wrap justify-center gap-12 lg:gap-20 mt-12 mb-10">
          {values.map((value) => (
            <div key={value.label} className="flex flex-col items-center gap-3">
              <value.icon className="h-8 w-8 text-foreground/70" strokeWidth={1} />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/80">
                {value.label}
              </span>
            </div>
          ))}
        </div>

        <Link 
          to="/about"
          className="inline-flex items-center gap-2 px-6 py-3 border border-foreground text-foreground text-sm font-medium uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors"
        >
          Learn About Our Impact
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
