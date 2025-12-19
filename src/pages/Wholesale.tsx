import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Building2, Users, Package, Award, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Wholesale = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you for your inquiry! We'll be in touch within 2-3 business days.");
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      businessType: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: Package,
      title: "Curated Selection",
      description: "Access to our full range of affirmation products, journals, and curated wellness items."
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account manager to help you select the perfect products for your customers."
    },
    {
      icon: Award,
      title: "Competitive Pricing",
      description: "Wholesale pricing designed to give you healthy margins while maintaining quality."
    },
    {
      icon: Building2,
      title: "Marketing Support",
      description: "Access to product imagery, copy, and marketing materials for your channels."
    }
  ];

  const idealPartners = [
    "Boutique retailers and gift shops",
    "Wellness centers and spas",
    "Yoga and meditation studios",
    "Corporate wellness programs",
    "Hotels and hospitality",
    "Subscription box companies",
    "Online retailers",
    "Event planners and conference organizers"
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Wholesale & Bulk Orders — LunaRituals | Business Partnerships</title>
        <meta name="description" content="Partner with LunaRituals for wholesale and bulk orders. Perfect for boutiques, wellness centers, corporate gifts, and more. Competitive pricing and dedicated support." />
        <link rel="canonical" href="https://lunarituals.com/wholesale" />
        
        <meta property="og:title" content="Wholesale & Bulk Orders — LunaRituals" />
        <meta property="og:description" content="Partner with us for wholesale pricing on affirmations, journals, and curated wellness products." />
        <meta property="og:url" content="https://lunarituals.com/wholesale" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-clay/20 mb-8">
              <Building2 className="h-10 w-10 text-clay" />
            </div>
            <p className="text-clay text-sm uppercase tracking-[0.2em] mb-4">Business Partnerships</p>
            <h1 className="text-text-primary mb-6 max-w-4xl mx-auto">
              Wholesale & Bulk Orders
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto">
              Bring intentional living to your customers with LunaRituals wholesale partnerships. 
              Perfect for boutiques, wellness brands, and corporate gifting.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">Why Partner With Us</p>
              <h2 className="text-text-primary">Partnership Benefits</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-8 bg-card border border-border rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                    <benefit.icon className="h-8 w-8 text-clay" />
                  </div>
                  <h4 className="text-xl font-display text-text-primary mb-4">{benefit.title}</h4>
                  <p className="text-text-secondary">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ideal Partners */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">Who We Work With</p>
                <h2 className="text-text-primary mb-6">Ideal Partners</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  We partner with businesses that share our values of intentionality, quality, and authentic wellness. 
                  If you're looking to offer your customers products that make a difference, we'd love to connect.
                </p>
                <ul className="space-y-4">
                  {idealPartners.map((partner, index) => (
                    <li key={index} className="flex items-center gap-3 text-text-secondary">
                      <CheckCircle className="h-5 w-5 text-clay flex-shrink-0" />
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-text-primary mb-2">Minimum Order</h3>
                <p className="text-3xl font-display text-clay mb-4">$500</p>
                <p className="text-text-secondary mb-6">
                  Our minimum wholesale order starts at $500. Larger orders unlock additional 
                  discounts and benefits.
                </p>
                <div className="border-t border-border pt-6 space-y-4">
                  <div>
                    <p className="text-sm text-text-muted">Standard Discount</p>
                    <p className="text-xl font-display text-text-primary">40-50% off retail</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Processing Time</p>
                    <p className="text-xl font-display text-text-primary">5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-2xl">
            <div className="text-center mb-12">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">Get Started</p>
              <h2 className="text-text-primary mb-4">Wholesale Inquiry</h2>
              <p className="text-text-secondary">
                Fill out the form below and we'll get back to you within 2-3 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Company Name *</label>
                  <Input
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="bg-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Contact Name *</label>
                  <Input
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="bg-card"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-card"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Website</label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                    className="bg-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Business Type *</label>
                  <Input
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    placeholder="e.g., Retail, Spa, Corporate"
                    className="bg-card"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Tell us about your business *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What products are you interested in? What are your estimated order quantities?"
                  rows={5}
                  className="bg-card"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-clay hover:bg-clay-dark text-background py-6"
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
