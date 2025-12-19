import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Star, Quote, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Reviews = () => {
  const stats = [
    { value: "4.9", label: "Average Rating" },
    { value: "10,000+", label: "Happy Customers" },
    { value: "50,000+", label: "Affirmations Delivered" },
  ];

  const reviews = [
    {
      name: "Sarah M.",
      location: "California, USA",
      rating: 5,
      text: "These affirmations have become such an important part of my morning routine. The quality of the digital downloads is incredible, and I love having them as my phone wallpaper.",
      product: "I am worthy of rest"
    },
    {
      name: "Emily R.",
      location: "London, UK",
      rating: 5,
      text: "I ordered a canvas print and it exceeded all my expectations. The colors are beautiful and it's the perfect addition to my meditation corner.",
      product: "Growth is a journey"
    },
    {
      name: "Jessica L.",
      location: "Toronto, Canada",
      rating: 5,
      text: "The Affirmation Builder is such a unique feature! I was able to create something truly personal that resonates with my specific intentions.",
      product: "Custom Affirmation"
    },
    {
      name: "Amanda K.",
      location: "Sydney, Australia",
      rating: 5,
      text: "I've purchased from many affirmation shops online, but LunaRituals is by far the best. The attention to detail and the beautiful aesthetics set them apart.",
      product: "I am always enough"
    },
    {
      name: "Michelle T.",
      location: "New York, USA",
      rating: 5,
      text: "Gave these as gifts to my entire team. Everyone absolutely loved them! The framed prints arrived perfectly packaged.",
      product: "My calmness is my power"
    },
    {
      name: "Rachel B.",
      location: "Melbourne, Australia",
      rating: 5,
      text: "I use the digital downloads as my desktop wallpaper at work. It's a gentle reminder throughout the day to stay centered and focused.",
      product: "I trust my journey"
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Customer Reviews | LunaRituals</title>
        <meta name="description" content="Read what our customers say about LunaRituals affirmations and products." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-secondary to-background">
          <div className="container-custom max-w-4xl text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground mb-6">
              Loved by Thousands
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              See what our community has to say about their LunaRituals experience.
            </p>
          </div>
        </section>

        {/* Stats Row */}
        <section className="py-12 bg-clay/10">
          <div className="container-custom">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-display font-semibold text-clay mb-1">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="p-6 rounded-xl bg-secondary border border-border/30">
                  <Quote className="h-8 w-8 text-clay/30 mb-4" />
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-4 leading-relaxed">{review.text}</p>
                  <div className="pt-4 border-t border-border/30">
                    <div className="font-semibold text-foreground">{review.name}</div>
                    <div className="text-sm text-text-secondary">{review.location}</div>
                    <div className="text-sm text-clay mt-1">Purchased: {review.product}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Banner */}
        <section className="py-16 sm:py-20 bg-clay text-white">
          <div className="container-custom max-w-3xl text-center">
            <Heart className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <blockquote className="text-2xl sm:text-3xl font-display mb-6 leading-relaxed">
              "LunaRituals has genuinely changed my relationship with self-talk. I'm so grateful for this brand."
            </blockquote>
            <cite className="text-white/80">— Featured Customer Review</cite>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Experience the transformation for yourself.
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

export default Reviews;
