import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { affirmations } from "@/data/affirmations";

// Get a featured affirmation image for display
const featuredAffirmation = affirmations.find(a => a.id === "aff-017") || affirmations[0];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-stretch overflow-hidden">
      {/* Split Hero Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Video with Overlay */}
        <div className="relative h-[55vh] lg:h-auto">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-poster.jpg"
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent lg:hidden" />
          
          {/* Stats badge on video */}
          <motion.div 
            className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-background/90 backdrop-blur-sm px-5 py-3 rounded-sm shadow-lg">
              <p className="text-2xl lg:text-3xl font-display text-foreground">50,000+</p>
              <p className="text-xs text-text-secondary uppercase tracking-widest">Daily Rituals Started</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Content */}
        <div className="relative bg-card flex flex-col justify-center px-8 py-12 lg:py-0 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.p 
              className="text-xs uppercase tracking-[0.25em] text-clay font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join 50,000+ intentional souls
            </motion.p>

            {/* Main Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display text-foreground mb-6 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your daily
              <br />
              <span className="italic">affirmation</span>
              <br />
              ritual
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-lg lg:text-xl text-text-secondary mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              New designs weekly. Printable art for intentional living.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                asChild 
                size="lg"
                className="h-14 px-10 bg-foreground hover:bg-foreground/90 text-background font-medium tracking-wide rounded-none"
              >
                <Link to="/shop?tab=affirmations" className="inline-flex items-center gap-3">
                  Shop Affirmations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="h-14 px-10 border-foreground/20 hover:bg-foreground/5 font-medium tracking-wide rounded-none"
              >
                <Link to="/affirmation-builder" className="inline-flex items-center gap-3">
                  <Play className="h-4 w-4" />
                  Create Your Own
                </Link>
              </Button>
            </motion.div>

            {/* Featured Product Preview */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link to="/shop?tab=affirmations" className="group block">
                <div className="flex items-end gap-6">
                  <div className="relative w-32 lg:w-40 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <img 
                      src={featuredAffirmation.image} 
                      alt={featuredAffirmation.title}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="pb-2">
                    <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Featured</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-clay transition-colors">
                      "{featuredAffirmation.title}"
                    </p>
                    <p className="text-xs text-clay mt-1 flex items-center gap-1">
                      Shop now <ArrowRight className="h-3 w-3" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
