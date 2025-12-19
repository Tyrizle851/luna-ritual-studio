import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const PhilosophySection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1000&fit=crop"
                alt="LunaRituals Philosophy"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-card p-6 shadow-xl max-w-[200px]">
              <p className="text-4xl font-display text-clay mb-1">50K+</p>
              <p className="text-xs text-text-secondary uppercase tracking-widest">Daily Rituals</p>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-clay mb-6">Our Philosophy</p>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display text-foreground mb-8 leading-[1.15]">
              Every word a reflection,
              <br />
              <span className="italic">every product an intention</span>
            </h2>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              LunaRituals exists to help you create a life you love—one affirmation, 
              one beautiful object, one intentional choice at a time.
            </p>
            
            <p className="text-text-secondary leading-relaxed mb-10">
              We believe that the words you speak to yourself matter. That the objects 
              you surround yourself with shape your energy. That small, daily rituals 
              can transform your entire life.
            </p>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              <Link to="/about" className="inline-flex items-center gap-3">
                Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
