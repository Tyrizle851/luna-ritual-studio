import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('handle-newsletter-signup', {
        body: { email, firstName, source: 'newsletter-cta' }
      });

      if (error) throw error;

      toast.success("Welcome to Luna Weekly! Check your inbox.");
      setEmail("");
      setFirstName("");
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-clay/10 via-clay/5 to-transparent" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNhOTdlNjMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-clay" />
            <span className="text-sm font-medium text-clay-dark">Weekly Inspiration</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display text-foreground mb-4">
            Sign up for Luna Weekly
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto">
            Weekly reflections, new affirmations, exclusive drops, and curated finds delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 h-12 bg-white border-border/50 focus:border-clay"
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-white border-border/50 focus:border-clay"
            />
            <Button 
              type="submit"
              className="h-12 px-8 bg-clay hover:bg-clay-dark text-white font-semibold"
              disabled={isSubmitting}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSubmitting ? "Joining..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs text-text-secondary mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
