import { Helmet } from "react-helmet";
import aboutHero from "@/assets/about-hero.jpg";
import { Heart, Target, Award, Users, Sparkles } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>About LunaRituals — Our Story & Values | Affirmations for Intentional Living</title>
        <meta name="description" content="LunaRituals creates digital affirmation art and curates wellness products for women building lives of intention. Learn about our mission, values, and commitment to intentional living." />
        <link rel="canonical" href="https://lunarituals.com/about" />
        
        <meta property="og:title" content="About LunaRituals — Our Story & Values" />
        <meta property="og:description" content="Creating digital affirmations and curating lifestyle goods for women building calm, beautiful lives." />
        <meta property="og:url" content="https://lunarituals.com/about" />
        <meta property="og:type" content="website" />
        
        <meta name="keywords" content="about lunarituals, intentional living brand, affirmation art creator, wellness lifestyle, mindful living mission" />
      </Helmet>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={aboutHero}
          alt="About LunaRituals"
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-text-primary/60 via-text-primary/70 to-background/95" />
        <div className="relative z-10 text-center max-w-3xl px-4">
          <h1 className="text-background mb-4 drop-shadow-2xl">About LunaRituals</h1>
          <p className="text-xl md:text-2xl text-background font-light drop-shadow-xl">
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
              <div className="flex items-center justify-center gap-3 mb-12">
                <Sparkles className="h-6 w-6 text-clay" />
                <h2 className="text-text-primary text-center mb-0">Our Values</h2>
                <Sparkles className="h-6 w-6 text-clay" />
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-6 w-6 text-clay" />
                    <h3 className="font-display text-2xl text-clay mb-0">Intentionality</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    Every product, every word, chosen with care and purpose. We believe that what surrounds you shapes you.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-clay" />
                    <h3 className="font-display text-2xl text-clay mb-0">Quality</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    Beautiful designs and curated goods that last. We choose timeless over trendy, always.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-6 w-6 text-clay" />
                    <h3 className="font-display text-2xl text-clay mb-0">Authenticity</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    No toxic positivity. Real talk for real women. Affirmations that honor where you are right now.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-clay" />
                    <h3 className="font-display text-2xl text-clay mb-0">Community</h3>
                  </div>
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
    </PageTransition>
  );
};

export default About;
