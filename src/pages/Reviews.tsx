import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { Star, Quote } from "lucide-react";

const Reviews = () => {
  const featuredReviews = [
    {
      name: "Sarah M.",
      location: "California",
      rating: 5,
      title: "Life-changing affirmations",
      text: "I've tried so many affirmation products over the years, but LunaRituals is different. The affirmations feel authentic, not cheesy. I see them every day on my wall and they genuinely shift my mindset.",
      product: "Daily Affirmation Art Print"
    },
    {
      name: "Jessica L.",
      location: "New York",
      rating: 5,
      title: "Beautiful quality",
      text: "The quality of everything I've ordered has been exceptional. The prints are gorgeous, the journal feels luxurious, and the packaging is so thoughtful. This brand really gets it.",
      product: "Intention Setting Journal"
    },
    {
      name: "Amanda K.",
      location: "Texas",
      rating: 5,
      title: "Perfect gift for myself",
      text: "I bought the candle collection as a treat for myself and I'm obsessed. The scents are subtle but beautiful, and having them as part of my evening ritual has been transformative.",
      product: "Ritual Candle Set"
    },
    {
      name: "Michelle R.",
      location: "Colorado",
      rating: 5,
      title: "Exactly what I needed",
      text: "As someone who struggles with self-compassion, these affirmations meet me where I am. They don't feel pushy or unrealistic—just gentle reminders that I'm doing okay.",
      product: "Self-Compassion Card Deck"
    },
    {
      name: "Lauren H.",
      location: "Washington",
      rating: 5,
      title: "Gorgeous and meaningful",
      text: "Every piece feels intentional and thoughtfully designed. I love that I can display these products in my home and they actually look beautiful while also supporting my wellbeing.",
      product: "Morning Ritual Bundle"
    },
    {
      name: "Emily T.",
      location: "Oregon",
      rating: 5,
      title: "Finally, affirmations that work",
      text: "I was skeptical about affirmations until I found LunaRituals. The language they use is so different—it actually resonates instead of feeling forced. Highly recommend!",
      product: "Digital Affirmation Set"
    }
  ];

  const stats = [
    { value: "15,000+", label: "Happy Customers" },
    { value: "4.9", label: "Average Rating" },
    { value: "98%", label: "Recommend to Friends" },
    { value: "50+", label: "Countries Shipped" }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Reviews — LunaRituals | Customer Testimonials</title>
        <meta name="description" content="Read what our customers say about LunaRituals. Real reviews from real women who've transformed their lives with our affirmations and curated products." />
        <link rel="canonical" href="https://lunarituals.com/reviews" />
        
        <meta property="og:title" content="Reviews — LunaRituals" />
        <meta property="og:description" content="Real reviews from real women who've transformed their lives with LunaRituals." />
        <meta property="og:url" content="https://lunarituals.com/reviews" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom text-center">
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-clay text-clay" />
              ))}
            </div>
            <h1 className="text-text-primary mb-6">What Our Community Says</h1>
            <p className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto">
              Real stories from women who've made LunaRituals part of their intentional living practice
            </p>
          </div>
        </section>

        {/* Stats Row */}
        <section className="py-12 bg-background border-y border-border">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-4xl md:text-5xl font-display text-clay mb-2">{stat.value}</p>
                  <p className="text-sm text-text-muted uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Reviews */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-clay text-sm uppercase tracking-[0.15em] mb-4">Customer Stories</p>
              <h2 className="text-text-primary">Featured Reviews</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredReviews.map((review, index) => (
                <div 
                  key={index} 
                  className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <Quote className="h-8 w-8 text-clay/30 mb-4" />
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-clay text-clay" />
                    ))}
                  </div>

                  <h4 className="text-lg font-display text-text-primary mb-3">{review.title}</h4>
                  <p className="text-text-secondary mb-6 leading-relaxed">{review.text}</p>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium text-text-primary">{review.name}</p>
                    <p className="text-xs text-text-muted">{review.location}</p>
                    <p className="text-xs text-clay mt-2">Purchased: {review.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Banner */}
        <section className="py-20 bg-secondary/50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="h-12 w-12 text-clay/30 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-display text-text-primary leading-relaxed mb-8 italic">
                "LunaRituals isn't just about products—it's about a way of living. 
                Every piece I've purchased has become part of my daily practice. 
                I feel more grounded, more intentional, more myself."
              </blockquote>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-clay text-clay" />
                ))}
              </div>
              <p className="text-text-secondary">— Jennifer P., Oregon</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-text-primary text-background">
          <div className="container-custom text-center">
            <h2 className="text-background mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-background/80 mb-10 max-w-2xl mx-auto">
              Discover the products that thousands of women trust for their intentional living journey.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-text-primary font-medium rounded hover:bg-background/90 transition-colors"
            >
              Shop Our Collection
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Reviews;
