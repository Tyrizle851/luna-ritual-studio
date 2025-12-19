import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Heart,
    title: "Intentional Living",
    description: "Every product curated to support your journey toward a more mindful life.",
  },
  {
    icon: Leaf,
    title: "Sustainable Choices",
    description: "Eco-conscious selections that honor both you and the planet.",
  },
  {
    icon: Star,
    title: "Quality First",
    description: "Premium products that stand the test of time and daily use.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description: "Tools to help you start each day with purpose and positivity.",
  },
];

export const PhilosophySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-clay-dark mb-4 font-medium">Our Philosophy</p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display text-foreground mb-6 leading-tight">
              Every word a reflection, every product an intention
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              LunaRituals exists to help you create a life you love—one affirmation, 
              one beautiful object, one intentional choice at a time.
            </p>
            <Button asChild variant="outline" className="border-clay text-clay hover:bg-clay hover:text-white transition-all duration-300">
              <Link to="/about">
                Discover Our Story
              </Link>
            </Button>
          </motion.div>

          {/* Right - Quote Card */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-8 lg:p-12 rounded-lg shadow-xl border border-border/20">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-5xl text-clay/30 font-serif">"</span>
              </div>
              <blockquote className="text-xl lg:text-2xl font-display text-foreground mb-6 leading-relaxed">
                The ritual of morning affirmations changed everything for me. 
                It's not about perfection—it's about intention.
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-clay" />
                </div>
                <div>
                  <p className="font-medium text-foreground">LunaRituals Community</p>
                  <p className="text-sm text-text-secondary">50,000+ members</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {values.map((value, index) => (
            <div key={value.title} className="text-center p-6 bg-white rounded-lg border border-border/20 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-clay/10 mb-4">
                <value.icon className="h-6 w-6 text-clay" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
