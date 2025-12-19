import { Award, ShieldCheck, Heart, Leaf, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Research-Backed",
    description: "Affirmations crafted using positive psychology principles"
  },
  {
    icon: Heart,
    title: "50K+ Community",
    description: "Join intentional souls who start each day with purpose"
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-conscious prints and packaging"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On US orders $35+ and international $55+"
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Shop with complete peace of mind"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy"
  },
];

export const WhyLunaRituals = () => {
  return (
    <section className="py-16 lg:py-20 bg-secondary/30 border-y border-border/30">
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-clay/10 mb-4">
                <feature.icon className="h-5 w-5 text-clay" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
