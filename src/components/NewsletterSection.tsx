import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('handle-newsletter-signup', {
        body: { email, firstName, source: 'newsletter' }
      });

      if (error) throw error;

      toast.success("Welcome to The Ritual! Check your inbox.");
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
    <section className="section-padding bg-card">
      <div className="container-custom max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="h-6 w-6 text-clay" />
          <h2 className="mb-0">Stay Connected</h2>
        </div>
        <p className="text-lg text-text-secondary mb-8">
          Weekly reflections, new affirmations, and curated finds delivered to your inbox
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="flex-1"
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button 
            type="submit"
            className="bg-clay hover:bg-clay-dark text-white sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining..." : "Join"}
          </Button>
        </form>
      </div>
    </section>
  );
};
