import { useState } from "react";
import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Building2, Users, Package, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Wholesale = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefits = [
    { icon: DollarSign, title: "Competitive Pricing", description: "Exclusive wholesale rates with volume discounts" },
    { icon: Package, title: "Low Minimums", description: "Start with manageable order quantities" },
    { icon: Users, title: "Dedicated Support", description: "Personal account manager for your needs" },
    { icon: Building2, title: "Brand Partnership", description: "Marketing materials and display support" },
  ];

  const idealPartners = [
    "Wellness and yoga studios",
    "Gift shops and boutiques",
    "Spas and retreat centers",
    "Bookstores",
    "Therapist and counselor offices",
    "Corporate wellness programs",
    "Event planners",
    "Subscription box curators",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you! We'll be in touch within 2 business days.");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Wholesale | LunaRituals</title>
        <meta name="description" content="Partner with LunaRituals - wholesale pricing for retailers, studios, and wellness professionals." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-secondary to-background">
          <div className="container-custom max-w-4xl text-center">
            <Building2 className="h-12 w-12 text-clay mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground mb-6">
              Wholesale Partnership
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Bring LunaRituals to your customers with our wholesale program. Perfect for retailers, studios, and wellness professionals.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
              Why Partner With Us?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center p-6 rounded-xl bg-secondary">
                  <benefit.icon className="h-10 w-10 text-clay mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-text-secondary">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ideal Partners */}
        <section className="py-16 sm:py-20 bg-secondary">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-12">
              Ideal Partners
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {idealPartners.map((partner) => (
                <div key={partner} className="flex items-center gap-3 p-4 rounded-lg bg-background">
                  <CheckCircle className="h-5 w-5 text-clay shrink-0" />
                  <span className="text-foreground">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Info */}
        <section className="py-16 sm:py-20 bg-clay/10">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Flexible Terms
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              We offer tiered pricing based on volume, with discounts starting at 30% off retail. Minimum order quantities start at just 10 units per design. Net 30 payment terms available for established accounts.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#inquiry-form" className="inline-flex items-center gap-2 text-clay font-medium hover:text-clay-dark transition-colors">
                Apply Now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry-form" className="py-16 sm:py-20 bg-background">
          <div className="container-custom max-w-2xl">
            <h2 className="text-3xl font-display font-semibold text-foreground text-center mb-4">
              Wholesale Inquiry
            </h2>
            <p className="text-text-secondary text-center mb-8">
              Fill out the form below and we'll get back to you within 2 business days.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input id="businessName" name="businessName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input id="contactName" name="contactName" required />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" type="url" placeholder="https://" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType">Type of Business *</Label>
                <Input id="businessType" name="businessType" placeholder="e.g., Yoga Studio, Gift Shop, Spa" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Tell us about your business and what you're looking for *</Label>
                <Textarea id="message" name="message" rows={4} required />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-clay hover:bg-clay-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Wholesale;
