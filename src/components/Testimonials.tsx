import { Star, Heart } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jessica M.",
    location: "California",
    content: "I hang 'I am worthy of rest' above my desk. It's a daily reminder that taking breaks isn't lazy—it's necessary. The print quality exceeded my expectations.",
    rating: 4.4,
    product: "I am worthy of rest",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
  },
  {
    id: 2,
    name: "Amanda R.",
    location: "Texas",
    content: "Started using these as phone wallpapers and now I have three framed in my apartment. My friends always ask where I got them. The designs are so thoughtful.",
    rating: 4.4,
    product: "Digital Bundle",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
  },
  {
    id: 3,
    name: "Taylor K.",
    location: "New York",
    content: "Bought the canvas print for my sister's birthday. She teared up when she opened it. Something about seeing 'I attract what I believe' every morning really shifts your mindset.",
    rating: 4.4,
    product: "Canvas Print",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
  },
];

const stats = [
  { value: "50,000+", label: "Happy customers" },
  { value: "4.5", label: "Average rating" },
  { value: "200+", label: "5-star reviews" },
];

export const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-clay/40" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-clay font-medium">Real Stories</span>
            <div className="h-px w-8 bg-clay/40" />
          </div>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-display font-semibold text-foreground mb-4 tracking-tight">
            Loved by Our Community
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join thousands who have transformed their daily rituals with intentional reminders
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-12 lg:mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl lg:text-3xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-background border border-border/50 p-6 lg:p-8 rounded-sm hover:shadow-medium transition-all duration-300"
            >
              {/* Avatar & Name Header */}
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
                />
                <div>
                  <p className="font-medium text-sm text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              
              {/* Rating with number */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(testimonial.rating) ? 'fill-gold text-gold' : 'fill-gold/30 text-gold/30'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{testimonial.rating}</span>
              </div>
              
              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Product Tag */}
              <div className="inline-block px-2.5 py-1 bg-secondary text-foreground/70 text-[10px] font-medium uppercase tracking-wider rounded mb-4">
                {testimonial.product}
              </div>
              
              {/* Verified */}
              <div className="flex items-center justify-end pt-4 border-t border-border/50">
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-[10px] text-clay">
                    <Heart className="h-3 w-3 fill-clay" />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
