import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Mail, Instagram, Clock, ArrowRight } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    console.log("Contact form submission:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Thank you! We'll be in touch within 24-48 hours.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact Us — Get in Touch with LunaRituals</title>
        <meta name="description" content="Have questions about our affirmations, products, or collaborations? Reach out to LunaRituals. We typically respond within 24-48 hours." />
        <link rel="canonical" href="https://lunarituals.com/contact" />
      </Helmet>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container-custom">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-clay mb-4">Get in Touch</p>
            <h1 className="text-4xl lg:text-5xl font-display text-foreground mb-6">
              Let's connect
            </h1>
            <p className="text-lg text-text-secondary">
              Questions, collaborations, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-5 w-5 text-clay" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Email</h3>
                  </div>
                  <p className="text-text-secondary">hello@lunarituals.com</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-clay" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Response Time</h3>
                  </div>
                  <p className="text-text-secondary">We typically respond within 24-48 hours</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Instagram className="h-5 w-5 text-clay" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Follow Us</h3>
                  </div>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-clay hover:text-clay-dark transition-colors"
                  >
                    @lunarituals
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2">
                      Your Name
                    </label>
                    <Input
                      {...register("name")}
                      className={`h-12 rounded-none ${errors.name ? "border-destructive" : "border-border"}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      {...register("email")}
                      className={`h-12 rounded-none ${errors.email ? "border-destructive" : "border-border"}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2">
                    Subject
                  </label>
                  <Select onValueChange={(value) => setValue("subject", value)}>
                    <SelectTrigger className={`h-12 rounded-none ${errors.subject ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="press">Press</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2">
                    Message
                  </label>
                  <Textarea
                    rows={6}
                    {...register("message")}
                    className={`rounded-none resize-none ${errors.message ? "border-destructive" : ""}`}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
