import { Award, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Award,
    title: "Research-Driven",
    description: "Our affirmations are crafted using positive psychology principles backed by scientific research on mindset and self-improvement.",
  },
  {
    icon: ShieldCheck,
    title: "Money-Back Guarantee",
    description: "Not completely in love with your purchase? We offer hassle-free returns within 30 days for complete peace of mind.",
  },
  {
    icon: Heart,
    title: "Community Focused",
    description: "Join a supportive community of 50,000+ intentional living enthusiasts who inspire and uplift each other daily.",
  },
];

export const WhyLunaRituals = () => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-display text-foreground mb-4">Why LunaRituals</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            More than a shop—a destination for mindful living and daily inspiration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={pillar.title}
              className="text-center p-8 bg-secondary rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clay/10 mb-6">
                <pillar.icon className="h-8 w-8 text-clay" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-text-secondary leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
