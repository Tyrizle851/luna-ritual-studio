const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-text-secondary">
          <p className="text-sm text-text-muted">Last updated: January 2025</p>
          
          <h2 className="font-display text-2xl text-text-primary mt-8 mb-4">
            Our Commitment to Privacy
          </h2>
          <p>
            At LunaRituals, we respect your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>

          <h2 className="font-display text-2xl text-text-primary mt-8 mb-4">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, such as when you create an account,
            make a purchase, or sign up for our newsletter. This may include your name, email address,
            and payment information.
          </p>

          <h2 className="font-display text-2xl text-text-primary mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p>
            We use the information we collect to process your orders, send you updates about your
            purchases, and provide you with relevant content and offers. We do not sell your
            personal information to third parties.
          </p>

          <h2 className="font-display text-2xl text-text-primary mt-8 mb-4">
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at privacy@lunarituals.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
