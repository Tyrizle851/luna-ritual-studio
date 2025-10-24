import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    console.log("Newsletter signup:", { email, firstName });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success("Welcome to The Ritual! Check your inbox.");
    setEmail("");
    setFirstName("");
    setIsSubmitting(false);
  };

  return (
    <section className="section-padding bg-card">
      <div className="container-custom max-w-2xl text-center">
        <h2 className="mb-4">Stay Connected</h2>
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
