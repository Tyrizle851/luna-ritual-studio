import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import affirmationJoy from "@/assets/affirmation-joy.jpg";

interface SubscriptionPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionPopup = ({ open, onOpenChange }: SubscriptionPopupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to the ritual ✨",
      description: "Your 30% discount code has been sent to your inbox!",
    });
    
    setEmail("");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/60" />
      <DialogContent className="p-0 border-0 max-w-4xl overflow-hidden bg-transparent shadow-none sm:rounded-xl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-taupe/80 p-2 text-white hover:bg-taupe transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid md:grid-cols-2 bg-background rounded-xl overflow-hidden">
          {/* Left side - Image */}
          <div className="relative h-64 md:h-auto">
            <img
              src={affirmationJoy}
              alt="I am worthy of peace affirmation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Form */}
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <img
              src={logo}
              alt="Luna Rituals"
              className="h-16 mb-6"
            />
            
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
              30% off your first bundle!
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Join our ritual and receive exclusive affirmations
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 text-center border-clay/30 focus:border-clay"
                required
              />
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-clay hover:bg-clay-dark text-white font-medium tracking-wide"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isSubmitting ? "Joining..." : "JOIN THE RITUAL"}
              </Button>
              
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-full h-12 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors rounded-md font-medium"
              >
                No thanks, just browsing
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
