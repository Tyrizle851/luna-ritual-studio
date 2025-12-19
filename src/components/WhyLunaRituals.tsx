import { affirmations } from "@/data/affirmations";

// Get some sample images
const sampleImg1 = affirmations.find(a => a.id === "aff-001")?.image || "";
const sampleImg2 = affirmations.find(a => a.id === "aff-003")?.image || "";

export const WhyLunaRituals = () => {
  const values = [
    {
      title: "Research-Driven, Heart-Led",
      description: "We've helped over 50,000+ people around the world, just like you, transform their daily mindset."
    },
    {
      title: "Positive Transformation, Guaranteed",
      description: "We stand behind our affirmations because we're confident you'll experience meaningful change."
    },
    {
      title: "Personal Growth with Purpose",
      description: "We create digital-first products that are accessible, sustainable, and designed for modern life."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={sampleImg1} 
              alt="Affirmation example" 
              className="rounded-lg shadow-lg w-full aspect-[3/4] object-cover" 
            />
            <img 
              src={sampleImg2} 
              alt="Affirmation example" 
              className="rounded-lg shadow-lg w-full aspect-[3/4] object-cover mt-8" 
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-8">
              Why LunaRituals?
            </h2>
            
            <div className="space-y-6">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
