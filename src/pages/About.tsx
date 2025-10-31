import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={aboutHero}
          alt="About LunaRituals"
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80" />
        <div className="relative z-10 text-center max-w-3xl px-4">
          <h1 className="text-white mb-4 drop-shadow-lg">About LunaRituals</h1>
          <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-md">
            Building lives of intention, one word at a time
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-12">
            {/* Opening Statement */}
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl leading-relaxed text-text-primary font-light mb-8">
                We believe in the power of words to shape your reality. In the beauty of intentional objects. 
                In creating a life that feels as good as it looks.
              </p>
            </div>

            {/* Story Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-text-primary mb-6">Our Story</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  LunaRituals began as a love letter to women who are building lives of intention—who understand 
                  that rest is not earned, that joy is a practice, and that you are worthy exactly as you are.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Every affirmation is created with care. Every product curated with intention. This is not about 
                  perfection. It is about presence. About choosing yourself, again and again.
                </p>
              </div>
              <div className="bg-secondary rounded-lg p-12 text-center">
                <blockquote className="text-xl md:text-2xl font-display text-clay italic leading-relaxed">
                  "You are not building a perfect life. You are building a meaningful one."
                </blockquote>
              </div>
            </div>

            {/* Values Grid */}
            <div className="mt-16">
              <h2 className="text-text-primary text-center mb-12">Our Values</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="font-display text-2xl text-clay mb-4">Intentionality</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Every product, every word, chosen with care and purpose. We believe that what surrounds you shapes you.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="font-display text-2xl text-clay mb-4">Quality</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Beautiful designs and curated goods that last. We choose timeless over trendy, always.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="font-display text-2xl text-clay mb-4">Authenticity</h3>
                  <p className="text-text-secondary leading-relaxed">
                    No toxic positivity. Real talk for real women. Affirmations that honor where you are right now.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="font-display text-2xl text-clay mb-4">Community</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Building a space where women support and uplift each other in the practice of intentional living.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
