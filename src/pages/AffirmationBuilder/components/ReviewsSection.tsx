import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import reviewerSarah from "@/assets/reviewer-sarah.jpg";
import reviewerJessica from "@/assets/reviewer-jessica.jpg";
import reviewerMichael from "@/assets/reviewer-michael.jpg";

/**
 * Customer reviews section displaying user testimonials
 * Shows verified customer stories with ratings, avatars, and reviews
 */
export function ReviewsSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-border/50">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-clay mb-4">What Our Community Says</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real stories from people transforming their spaces with Affirmation Studio
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Review 1 - 4.8 Stars */}
        <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
          <div className="p-6">
            {/* Stars - 4.8/5 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5" viewBox="0 0 20 20">
                  <defs>
                    <linearGradient id="partial-fill">
                      <stop offset="80%" stopColor="hsl(var(--clay))" />
                      <stop offset="80%" stopColor="#e5e7eb" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#partial-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">4.8/5</span>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={reviewerSarah}
                alt="Sarah M."
                className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
              />
              <div>
                <p className="font-semibold text-foreground">Sarah M.</p>
                <p className="text-xs text-muted-foreground">Verified User</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">Perfect for My Morning Routine</h3>

            <p className="text-muted-foreground leading-relaxed italic">
              "I've printed three different affirmations and they're now framed in my bedroom. The quality is incredible and the designs are so calming. It's the first thing I see every morning."
            </p>
          </div>
        </div>

        {/* Review 2 - 5 Stars */}
        <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in [animation-delay:100ms]">
          <div className="p-6">
            {/* Stars - 5/5 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">5/5</span>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={reviewerJessica}
                alt="Jessica T."
                className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
              />
              <div>
                <p className="font-semibold text-foreground">Jessica T.</p>
                <p className="text-xs text-muted-foreground">Verified User</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">Better Than Etsy Options</h3>

            <p className="text-muted-foreground leading-relaxed italic">
              "I used to buy generic affirmation prints on Etsy, but this is on another level. The customization options let me create something that actually speaks to MY goals."
            </p>
          </div>
        </div>

        {/* Review 3 - 5 Stars */}
        <div className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in [animation-delay:200ms]">
          <div className="p-6">
            {/* Stars - 5/5 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 fill-clay" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">5/5</span>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={reviewerMichael}
                alt="Michael R."
                className="w-12 h-12 rounded-full object-cover border-2 border-clay/20"
              />
              <div>
                <p className="font-semibold text-foreground">Michael R.</p>
                <p className="text-xs text-muted-foreground">Verified User</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">So Easy to Use</h3>

            <p className="text-muted-foreground leading-relaxed italic">
              "I'm not tech-savvy at all, but this was incredibly simple. Within minutes I had a beautiful affirmation designed and downloaded. Already shared it on Instagram!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
