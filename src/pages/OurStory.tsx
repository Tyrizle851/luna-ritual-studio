import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Heart, Sparkles, Target, Users, Shield, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OurStory = () => {
  const values = [
    {
      icon: Heart,
      title: "Heart-Centered",
      description: "Every product is created with love and intention."
    },
    {
      icon: Sparkles,
      title: "Authentic",
      description: "We believe in genuine transformation, not quick fixes."
    },
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "Everything we do serves a meaningful purpose."
    },
    {
      icon: Users,
      title: "Community",
      description: "We're building a supportive space for growth."
    },
    {
      icon: Shield,
      title: "Quality",
      description: "We never compromise on the quality of our offerings."
    },
    {
      icon: Leaf,
      title: "Sustainable",
      description: "Mindful choices for people and planet."
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Our Story | LunaRituals</title>
        <meta name="description" content="Discover the story behind LunaRituals - our mission to help women build calm, beautiful lives through affirmations and intentional living." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-secondary to-background">
          <div className="container-custom max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              LunaRituals was born from a simple belief: that small, intentional moments can transform our lives.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                We exist to help you create a life you love—one affirmation, one beautiful object, one intentional choice at a time. We believe that the words we speak to ourselves shape our reality, and that surrounding ourselves with beauty elevates our everyday experience.
              </p>
            </div>
          </div>
        </section>

        {/* Story Sections */}
        <section className="py-16 sm:py-20 bg-secondary">
          <div className="container-custom max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  Where It All Began
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  What started as a personal practice of writing affirmations grew into something we felt called to share. We noticed how powerful it was to have beautiful reminders of our worth and potential, and we wanted to create that experience for others.
                </p>
              </div>
              <div className="bg-clay/10 rounded-2xl aspect-video flex items-center justify-center">
                <Heart className="h-16 w-16 text-clay/50" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-clay/10 rounded-2xl aspect-video flex items-center justify-center md:order-1 order-2">
                <Sparkles className="h-16 w-16 text-clay/50" />
              </div>
              <div className="md:order-2 order-1">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  What We Believe
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  We believe that self-care isn't selfish—it's essential. We believe that you deserve to feel calm, confident, and connected to your purpose. And we believe that the right words, at the right time, can change everything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center p-6 rounded-xl bg-secondary">
                  <value.icon className="h-10 w-10 text-clay mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="py-16 sm:py-20 bg-clay/10">
          <div className="container-custom max-w-3xl text-center">
            <Shield className="h-12 w-12 text-clay mx-auto mb-6" />
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Our Promise to You
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Every product we create is backed by our satisfaction guarantee. If you don't love it, we'll make it right.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Explore our collection of affirmations and curated goods.
            </p>
            <Button asChild size="lg" className="bg-clay hover:bg-clay-dark text-white">
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default OurStory;
