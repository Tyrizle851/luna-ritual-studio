import { Truck, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "FREE Shipping on US orders $35+, UK £55+, EU €55+. We ship worldwide*.",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Checkout",
    description: "Shop with confidence that your purchase is safe and secure throughout the checkout process.",
  },
  {
    icon: Heart,
    title: "Satisfaction Guarantee",
    description: "On our entire collection. Because we're confident you'll love your purchase.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const TrustStrip = () => {
  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F5] border-t border-border/30">
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {trustItems.map((item, index) => (
            <motion.div 
              key={item.title} 
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  <span className="text-clay">{item.title.split(' ')[0]}</span>{' '}
                  {item.title.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
