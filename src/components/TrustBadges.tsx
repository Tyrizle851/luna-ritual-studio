import { Shield, Star, Truck, Award } from "lucide-react";

export const GuaranteeBadge = () => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
    <Shield className="h-4 w-4 text-white" />
    <span className="text-sm font-medium text-white">30-Day Love It Guarantee</span>
  </div>
);

export const ReviewStars = ({ rating = 4.8, count = 2347 }: { rating?: number; count?: number }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-white/40'}`}
        />
      ))}
    </div>
    <span className="text-sm font-medium text-white">{rating}/5</span>
    <span className="text-xs text-white/75">({count.toLocaleString()}+ reviews)</span>
  </div>
);

export const FreeShippingBanner = () => (
  <div className="w-full bg-clay text-white py-2.5 text-center">
    <div className="container-custom flex items-center justify-center gap-2">
      <Truck className="h-4 w-4" />
      <span className="text-sm font-medium">FREE shipping on orders $50+</span>
      <span className="hidden sm:inline text-xs opacity-90 ml-2">| Instant digital delivery</span>
    </div>
  </div>
);

export const MediaLogos = () => (
  <div className="flex flex-col items-center gap-3">
    <span className="text-xs uppercase tracking-wider text-white/60 font-medium">Featured In</span>
    <div className="flex items-center gap-6 opacity-75">
      {/* Placeholder for media logos - replace with actual logos */}
      <div className="text-white/90 font-serif italic text-sm">Vogue</div>
      <div className="text-white/90 font-serif italic text-sm">Elle</div>
      <div className="text-white/90 font-serif italic text-sm">Refinery29</div>
      <div className="text-white/90 font-serif italic text-sm">Goop</div>
    </div>
  </div>
);

export const SocialProofBadge = ({ count = 12000 }: { count?: number }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
    <Award className="h-4 w-4 text-white" />
    <span className="text-sm font-medium text-white">
      {count.toLocaleString()}+ women building intentional lives
    </span>
  </div>
);
