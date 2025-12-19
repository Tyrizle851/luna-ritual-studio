import { Helmet } from "react-helmet";
import { PageTransition } from "@/components/PageTransition";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Testimonials } from "@/components/Testimonials";
import {
  HeroSection,
  CollectionGrid,
  PhilosophySection,
  WhyLunaRituals,
  NewsletterCTA,
  TrustStrip,
} from "@/components/home";

const Index = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>LunaRituals — Digital Affirmations & Curated Lifestyle for Intentional Living</title>
        <meta name="description" content="Downloadable affirmation art, wellness finds, and inspiration for women building calm, beautiful lives." />
        <link rel="canonical" href="https://lunarituals.com/" />
        <meta property="og:title" content="LunaRituals — Affirmations for Intentional Living" />
        <meta property="og:description" content="Digital art and curated goods for women building calm, beautiful lives." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="affirmations, digital affirmations, intentional living, mindfulness, wellness, self-care" />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <TrustStrip />
        <CollectionGrid />
        <FeaturedProducts />
        <Testimonials />
        <PhilosophySection />
        <WhyLunaRituals />
        <NewsletterCTA />
      </div>
    </PageTransition>
  );
};

export default Index;
