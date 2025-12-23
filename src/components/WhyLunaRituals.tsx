import { affirmations } from "@/data/affirmations";

// Get some sample images
const sampleImg1 = affirmations.find(a => a.id === "aff-001")?.image || "";
const sampleImg2 = affirmations.find(a => a.id === "aff-003")?.image || "";
export const WhyLunaRituals = () => {
  const values = [{
    title: "Research-Driven, Heart-Led",
    description: "We've helped over 50,000+ people around the world, just like you, transform their daily mindset."
  }, {
    title: "Positive Transformation, Guaranteed",
    description: "We stand behind our affirmations because we're confident you'll experience meaningful change."
  }, {
    title: "Personal Growth with Purpose",
    description: "We create digital-first products that are accessible, sustainable, and designed for modern life."
  }];
  return <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="border-2 border-foreground/80 rounded-sm overflow-hidden my-[16px]">
              <img src={sampleImg1} alt="Luna Rituals product" className="w-full aspect-[3/4] object-cover rounded-none" />
            </div>
            <div className="border-2 border-foreground/80 rounded-sm overflow-hidden mt-8">
              <img src={sampleImg2} alt="Luna Rituals lifestyle" className="w-full aspect-[3/4] object-cover" />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-semibold text-foreground mb-10">
              Why LunaRituals?
            </h2>
            
            <div className="space-y-8">
              {values.map(value => <div key={value.title}>
                  <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};