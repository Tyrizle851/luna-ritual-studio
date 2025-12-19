import { useState } from "react";
import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Palette, Gift, Building2, Heart, Wand2, MessageSquare, FileCheck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const CustomOrders = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderType, setOrderType] = useState("personal");

  const services = [
    { icon: Palette, title: "Custom Affirmations", description: "Create a unique affirmation with your own words and our beautiful design aesthetic." },
    { icon: Gift, title: "Personalized Gifts", description: "Perfect for weddings, birthdays, baby showers, or any special occasion." },
    { icon: Building2, title: "Corporate Orders", description: "Branded affirmations for team building, events, or employee wellness programs." },
    { icon: Heart, title: "Memorial Pieces", description: "Meaningful tributes with custom quotes or messages honoring loved ones." },
  ];

  const process = [
    { icon: MessageSquare, step: "1", title: "Share Your Vision", description: "Tell us about your custom order idea" },
    { icon: Wand2, step: "2", title: "Design Consultation", description: "We'll work with you on the perfect design" },
    { icon: FileCheck, step: "3", title: "Approve & Pay", description: "Review the proof and confirm your order" },
    { icon: Package, step: "4", title: "Receive Your Order", description: "Get your custom creation delivered" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you! We'll reach out within 1-2 business days to discuss your custom order.");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Custom Orders | LunaRituals</title>
        <meta name="description" content="Create custom affirmation art with LunaRituals. Perfect for gifts, corporate orders, and personalized pieces." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-secondary to-background">
          <div className="container-custom max-w-4xl text-center">
            <Wand2 className="h-12 w-12 text-clay mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground mb-6">
              Custom Orders
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Have something special in mind? We'd love to bring your vision to life with a custom affirmation piece.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
              What We Create
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div key={service.title} className="text-center p-6 rounded-xl bg-secondary">
                  <service.icon className="h-10 w-10 text-clay mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-text-secondary">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 sm:py-20 bg-secondary">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="relative inline-block mb-4">
                    <step.icon className="h-10 w-10 text-clay" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-clay text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Info */}
        <section className="py-16 sm:py-20 bg-clay/10">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Pricing
            </h2>
            <p className="text-lg text-text-secondary mb-4">
              Custom orders start at <span className="font-semibold text-clay">$49</span> for digital-only designs and <span className="font-semibold text-clay">$99</span> for physical prints.
            </p>
            <p className="text-text-secondary">
              Final pricing depends on complexity, quantity, and format. We'll provide a detailed quote after our initial consultation.
            </p>
          </div>
        </section>

        {/* Order Form */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom max-w-2xl">
            <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-4">
              Start Your Custom Order
            </h2>
            <p className="text-text-secondary text-center mb-8">
              Share your idea and we'll get back to you within 1-2 business days.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Order Type *</Label>
                <RadioGroup value={orderType} onValueChange={setOrderType} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="cursor-pointer">Personal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gift" id="gift" />
                    <Label htmlFor="gift" className="cursor-pointer">Gift</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corporate" id="corporate" />
                    <Label htmlFor="corporate" className="cursor-pointer">Corporate/Bulk</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="affirmation">Your Affirmation or Message *</Label>
                <Textarea 
                  id="affirmation" 
                  name="affirmation" 
                  placeholder="Enter the text you'd like on your custom piece..." 
                  rows={3} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="details">Additional Details</Label>
                <Textarea 
                  id="details" 
                  name="details" 
                  placeholder="Tell us about the occasion, color preferences, style inspiration, quantity needed, etc." 
                  rows={4} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="format">Preferred Format</Label>
                <Input 
                  id="format" 
                  name="format" 
                  placeholder="e.g., Digital only, Canvas print, Framed poster, Multiple formats" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline (if any)</Label>
                <Input id="deadline" name="deadline" type="date" />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-clay hover:bg-clay-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Custom Order Request"}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default CustomOrders;
