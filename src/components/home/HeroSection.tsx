import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Moon } from "lucide-react";
import { motion } from "framer-motion";
import downloadsBadge from "@/assets/downloads-badge.png";
import { affirmations } from "@/data/affirmations";

// Get a featured affirmation image for the right side
const featuredAffirmationImg = affirmations.find(a => a.id === "aff-017")?.image || affirmations[0]?.image || "";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-stretch overflow-hidden">
      {/* Two-Part Hero Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Video */}
        <div className="relative h-[50vh] lg:h-auto bg-[#2a2520]">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-poster.jpg"
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onLoadedData={(e) => {
              e.currentTarget.play().catch(() => {
                console.log('Autoplay prevented by browser');
              });
            }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.75) saturate(0.9)' }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 lg:hidden" />
        </div>

        {/* Right Side - Copy + CTA + Affirmation Image */}
        <div className="relative bg-[#FAF7F4] flex flex-col justify-center items-center px-6 py-12 lg:py-16 lg:px-12 xl:px-20">
          {/* 50K+ Downloads Badge - Positioned top right */}
          <motion.div 
            className="absolute top-6 right-6 lg:top-8 lg:right-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <img 
              src={downloadsBadge} 
              alt="50K+ Downloads" 
              className="w-14 h-14 lg:w-16 lg:h-16 object-contain"
            />
          </motion.div>

          <div className="max-w-lg text-center lg:text-left">
            {/* Social Proof */}
            <motion.p 
              className="text-sm text-clay-dark/80 font-medium tracking-wide uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join 50,000+ people starting every day with intention
            </motion.p>

            {/* Main Headline */}
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display text-foreground mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your daily affirmation ritual
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-lg lg:text-xl text-text-secondary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              New designs weekly. Printable art for intentional living.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button asChild className="h-12 px-8 bg-clay hover:bg-clay-dark text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/shop?tab=affirmations" className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Shop Affirmations
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-12 px-8 border-foreground/30 hover:bg-foreground/5 font-medium rounded-md transition-all duration-300">
                <Link to="/affirmation-builder" className="inline-flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Create Your Own
                </Link>
              </Button>
            </motion.div>

            {/* Featured Affirmation Image Preview */}
            <motion.div 
              className="relative max-w-xs mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link to="/shop?tab=affirmations" className="block group">
                <div className="relative overflow-hidden rounded-lg shadow-2xl border border-border/30 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
                  <img 
                    src={featuredAffirmationImg} 
                    alt="Featured Affirmation" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="mt-3 text-sm text-text-secondary text-center lg:text-left">Featured: "I am open to miracles"</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
