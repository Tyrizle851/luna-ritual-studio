const About = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="mb-12 text-center">About LunaRituals</h1>
        
        <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
          <p className="text-xl leading-relaxed">
            We believe in the power of words to shape your reality. In the beauty of intentional objects. 
            In creating a life that feels as good as it looks.
          </p>

          <p>
            LunaRituals began as a love letter to women who are building lives of intention—who understand 
            that rest is not earned, that joy is a practice, and that you are worthy exactly as you are.
          </p>

          <p>
            Every affirmation is created with care. Every product curated with intention. This is not about 
            perfection. It is about presence. About choosing yourself, again and again.
          </p>

          <h2 className="font-display text-3xl text-text-primary mt-12 mb-6">Our Values</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl text-text-primary mb-2">Intentionality</h3>
              <p>Every product, every word, chosen with care and purpose.</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-text-primary mb-2">Quality</h3>
              <p>Beautiful designs and curated goods that last.</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-text-primary mb-2">Authenticity</h3>
              <p>No toxic positivity. Real talk for real women.</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-text-primary mb-2">Community</h3>
              <p>Building a space where women support and uplift each other.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
