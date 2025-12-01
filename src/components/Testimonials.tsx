import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Wellness Coach",
    content: "These affirmations have become part of my daily ritual. The quality and design are absolutely stunning.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    role: "Creative Director",
    content: "I've purchased multiple affirmations and each one brings such calm energy to my space. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Maya Chen",
    role: "Entrepreneur",
    content: "The custom builder is brilliant! I created affirmations that perfectly align with my goals. Worth every penny.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
  },
];

export const Testimonials = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Loved by Our Community</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            See what our customers are saying about their LunaRituals experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 bg-background border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-text-secondary mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};