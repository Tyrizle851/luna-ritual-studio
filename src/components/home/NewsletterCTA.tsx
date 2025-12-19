import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('handle-newsletter-signup', {
        body: { email, source: 'newsletter-cta' }
      });

      if (error) throw error;

      toast.success("Welcome to Luna Weekly!");
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-foreground">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_transparent_50%,_hsl(var(--background))_100%)]" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-6">
            Weekly Inspiration
          </p>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display text-background mb-6 leading-tight">
            Join 50,000+ intentional souls
          </h2>
          
          <p className="text-lg text-background/70 mb-10 max-w-lg mx-auto">
            Weekly reflections, new affirmations, and curated finds delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-14 bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-none focus:border-background/40"
            />
            <Button 
              type="submit"
              size="lg"
              className="h-14 px-8 bg-background text-foreground hover:bg-background/90 rounded-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Subscribe"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="text-xs text-background/40 mt-6">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
