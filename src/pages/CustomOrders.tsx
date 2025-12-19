import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Palette, Gift, Users, MessageSquare, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    quantity: "",
    timeline: "",
    budget: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you for your custom order inquiry! We'll review your request and get back to you within 3-5 business days.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      quantity: "",
      timeline: "",
      budget: "",
      description: ""
    });
    setIsSubmitting(false);
  };

  const services = [
    {
      icon: Palette,
      title: "Custom Affirmation Designs",
      description: "Work with our team to create personalized affirmations and designs that align with your brand or message."
    },
    {
      icon: Gift,
      title: "Corporate Gifting",
      description: "Curated gift sets and custom packaging for employee appreciation, client gifts, or special events."
    },
    {
      icon: Users,
      title: "Event Collaborations",
      description: "Custom products for retreats, conferences, workshops, or special occasions."
    },
    {
      icon: MessageSquare,
      title: "Private Label",
      description: "White-label solutions for businesses looking to offer affirmation products under their own brand."
    }
  ];

  const projectTypes = [
    "Custom affirmation designs",
    "Corporate gift sets",
    "Event giveaways",
    "Private label products",
    "Personalized journals",
    "Custom packaging",
    "Retreat/workshop materials",
    "Other (please describe)"
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Custom Orders — LunaRituals | Personalized Affirmation Products</title>
        <meta name="description" content="Create custom affirmation products with LunaRituals. Perfect for corporate gifts, events, retreats, and personalized orders. Work with our team to bring your vision to life." />
        <link rel="canonical" href="https://lunarituals.com/custom-orders" />
        
        <meta property="og:title" content="Custom Orders — LunaRituals" />
        <meta property="og:description" content="Create personalized affirmation products for your brand, event, or special occasion." />
        <meta property="og:url" content="https://lunarituals.com/custom-orders" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-clay/20 mb-8">
              <Palette className="h-10 w-10 text-clay" />
            </div>
            <p className="text-clay text-sm uppercase tracking-[0.2em] mb-4">Custom Creations</p>
            <h1 className="text-text-primary mb-6 max-w-4xl mx-auto">
              Custom Orders & Collaborations
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto">
              Bring your vision to life with personalized affirmation products. 
              From corporate gifts to event collaborations, we're here to create something meaningful.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">What We Offer</p>
              <h2 className="text-text-primary">Custom Services</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center p-8 bg-card border border-border rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                    <service.icon className="h-8 w-8 text-clay" />
                  </div>
                  <h4 className="text-xl font-display text-text-primary mb-4">{service.title}</h4>
                  <p className="text-text-secondary">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">How It Works</p>
              <h2 className="text-text-primary">Our Custom Order Process</h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Share Your Vision",
                  description: "Fill out our inquiry form with details about your project, timeline, and goals."
                },
                {
                  step: "02",
                  title: "Consultation",
                  description: "We'll schedule a call to discuss your needs and provide initial concepts and pricing."
                },
                {
                  step: "03",
                  title: "Design & Approval",
                  description: "Our team creates custom designs for your review. We refine until it's perfect."
                },
                {
                  step: "04",
                  title: "Production & Delivery",
                  description: "Once approved, we produce your order with care and deliver on schedule."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-clay/20 flex items-center justify-center">
                    <span className="text-xl font-display text-clay">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-display text-text-primary mb-2">{item.title}</h4>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-2xl">
            <div className="text-center mb-12">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">Start Your Project</p>
              <h2 className="text-text-primary mb-4">Custom Order Inquiry</h2>
              <p className="text-text-secondary">
                Tell us about your project and we'll get back to you within 3-5 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Your Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-card"
                  />
                </div>
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
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Project Type *</label>
                  <select
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Estimated Quantity</label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g., 100-500"
                    className="bg-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Timeline</label>
                  <Input
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g., March 2025"
                    className="bg-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Budget Range</label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g., $1,000-$5,000"
                    className="bg-card"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Tell us about your project *</label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What are you looking to create? What's the occasion or purpose? Any specific ideas or inspiration?"
                  rows={6}
                  className="bg-card"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-clay hover:bg-clay-dark text-background py-6"
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
