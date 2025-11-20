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
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you! We'll be in touch soon.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact Us — Get in Touch with LunaRituals</title>
        <meta name="description" content="Have questions about our affirmations, products, or collaborations? Reach out to LunaRituals. We typically respond within 24-48 hours." />
        <link rel="canonical" href="https://lunarituals.com/contact" />
        
        <meta property="og:title" content="Contact LunaRituals" />
        <meta property="og:description" content="Get in touch with us about affirmations, collaborations, or inquiries." />
        <meta property="og:url" content="https://lunarituals.com/contact" />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom max-w-3xl text-center">
          <h1 className="mb-6">Let's Connect</h1>
          <p className="text-xl text-text-secondary mb-4">
            Have a question or want to collaborate? We'd love to hear from you.
          </p>
          <p className="text-text-muted">
            We typically respond within 24-48 hours
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-lg shadow-subtle">
          <div>
            <Input
              placeholder="Your Name"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => setValue("subject", value)}>
              <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
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
            <Textarea
              placeholder="Your Message"
              rows={6}
              {...register("message")}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-clay hover:bg-clay-dark text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {/* Additional Contact Info */}
        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-text-secondary">
            <span className="text-sm">Follow our journey</span>
          </div>
          <div className="flex justify-center gap-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-clay hover:text-clay-dark transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-clay hover:text-clay-dark transition-colors"
            >
              Pinterest
            </a>
          </div>
        </div>
      </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
