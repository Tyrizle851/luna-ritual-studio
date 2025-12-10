import affirmationRest from "@/assets/affirmation-rest.jpg";
import affirmationJoy from "@/assets/affirmation-joy.jpg";
import affirmationAbundance from "@/assets/affirmation-abundance.jpg";
import affirmationTrust from "@/assets/affirmation-trust.jpg";
import affirmationEnough from "@/assets/affirmation-enough.jpg";
import affirmationCalm from "@/assets/affirmation-calm.jpg";
import affirmationReceive from "@/assets/affirmation-receive.jpg";
import affirmationHonor from "@/assets/affirmation-honor.jpg";
import affirmationRelease from "@/assets/affirmation-release.jpg";
import affirmationNaturalJoy from "@/assets/affirmation-natural-joy.jpg";
import affirmationSafe from "@/assets/affirmation-safe.jpg";
import affirmationVoice from "@/assets/affirmation-voice.jpg";
import affirmationDreams from "@/assets/affirmation-dreams.jpg";
import affirmationPeace from "@/assets/affirmation-peace.jpg";
import affirmationProgress from "@/assets/affirmation-progress.jpg";
import affirmationIntuition from "@/assets/affirmation-intuition.jpg";
import affirmationMiracles from "@/assets/affirmation-miracles.jpg";
import affirmationFeel from "@/assets/affirmation-feel.jpg";
import affirmationCreating from "@/assets/affirmation-creating.jpg";
import affirmationPossibility from "@/assets/affirmation-possibility.jpg";
import affirmationChange from "@/assets/affirmation-change.jpg";
import affirmationProductiveRest from "@/assets/affirmation-productive-rest.jpg";
import affirmationAttract from "@/assets/affirmation-attract.jpg";
import affirmationDuality from "@/assets/affirmation-duality.jpg";

// Format pricing constants
export const AFFIRMATION_FORMAT_PRICING = {
  "Digital Download": 11.99,
  "Canvas Print": 89.99,
  "Unframed Poster": 39.99,
  "Framed Poster": 129.99,
} as const;

export type AffirmationFormat = keyof typeof AFFIRMATION_FORMAT_PRICING;
export type DisplayVariation = "canvas" | "unframed" | "framed";

export interface Affirmation {
  id: string;
  title: string;
  category: "Self-Love" | "Abundance" | "Rest" | "Joy" | "Strength";
  description: string;
  price: number; // Base price (Digital Download)
  formats: AffirmationFormat[];
  image: string;
  featured?: boolean;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  socialProof?: string;
  certifications?: string[];
  originalPrice?: number;
  badge?: string;
  features?: string[];
  usageIdeas?: string[];
  displayVariation?: DisplayVariation; // Random initial display (canvas/unframed/framed)
  productDetails?: {
    resolution?: string;
    fileFormats?: string;
    aspectRatios?: string;
    delivery?: string;
  };
}

// Standard formats for all affirmations
const STANDARD_FORMATS: AffirmationFormat[] = [
  "Digital Download",
  "Canvas Print", 
  "Unframed Poster",
  "Framed Poster"
];

// Helper to get random display variation
const getRandomDisplayVariation = (): DisplayVariation => {
  const variations: DisplayVariation[] = ["canvas", "unframed", "framed"];
  return variations[Math.floor(Math.random() * variations.length)];
};

export const affirmations: Affirmation[] = [
  // **PAGE 1: BEST PICKS** - Featured affirmations with premium positioning
  {
    id: "aff-001",
    title: "I am worthy of rest",
    category: "Self-Love",
    description: "A gentle reminder that rest is your birthright. This design gives you permission to pause and honor your need for restoration.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationRest,
    featured: true,
    tags: ["rest", "self-care", "boundaries"],
    rating: 4.9,
    reviewCount: 2847,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Premium Design"],
    badge: "Best Seller",
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Digital wallpaper for daily reminders",
      "Canvas art for your bedroom sanctuary",
      "Framed poster for meditation space",
      "Gift for someone who needs permission to rest"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-002",
    title: "I am worthy of peace",
    category: "Self-Love",
    description: "Peace is your birthright. This serene design reminds you that inner tranquility comes from within and is always available to you.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationJoy,
    featured: true,
    tags: ["peace", "tranquility", "calm"],
    rating: 4.8,
    reviewCount: 2914,
    socialProof: "1.5K+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Staff Pick"],
    badge: "Staff Pick",
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Morning phone wallpaper for peaceful starts",
      "Canvas for living room focal point",
      "Framed art for home office calm",
      "Gift for friends seeking serenity"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-003",
    title: "Growth is a journey, not a destination",
    category: "Strength",
    description: "Embrace the beauty of becoming. This affirmation celebrates progress over perfection and reminds you that every step forward matters.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationAbundance,
    featured: true,
    tags: ["growth", "journey", "patience", "progress"],
    rating: 4.9,
    reviewCount: 2127,
    socialProof: "2K+ sold",
    certifications: ["Instant Download", "Premium Design", "18x24 Print Size"],
    badge: "Most Popular",
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Vision board centerpiece",
      "Canvas for workspace inspiration",
      "Framed poster for goal-setting corner",
      "Gift for someone on a growth journey"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-004",
    title: "I trust my journey",
    category: "Strength",
    description: "Release the need for control and embrace faith in your path. Trust means believing you are equipped to handle whatever comes.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationTrust,
    tags: ["trust", "journey", "faith"],
    rating: 4.4,
    reviewCount: 1923,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "Minimal Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Phone wallpaper during life transitions",
      "Canvas for meditation space",
      "Framed poster for daily reassurance",
      "Comfort visual during challenging times"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-005",
    title: "I am always enough",
    category: "Self-Love",
    description: "Your worth is not tied to productivity or achievement. You are inherently valuable simply because you exist.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationEnough,
    featured: true,
    tags: ["self-love", "worthiness", "acceptance"],
    rating: 4.9,
    reviewCount: 2928,
    socialProof: "2.5K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "18x24 Print Size"],
    badge: "Best Seller",
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Daily phone wallpaper for self-acceptance",
      "Canvas for bedroom sanctuary",
      "Framed poster for bathroom mirror view",
      "Gift for loved ones struggling with self-worth"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-006",
    title: "My calmness is my power",
    category: "Strength",
    description: "In chaos, your calmness is your superpower. Peace is not passive—it is revolutionary. When you choose calmness, you reclaim your power.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationCalm,
    featured: true,
    tags: ["calm", "power", "peace"],
    rating: 4.8,
    reviewCount: 2631,
    socialProof: "1.2K+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Minimal Design"],
    badge: "Staff Pick",
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Phone wallpaper for nervous system regulation",
      "Canvas for high-stress work environments",
      "Framed poster for meditation or yoga space",
      "Visual anchor during anxious moments"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  // **PAGE 2: Additional Popular Affirmations**
  {
    id: "aff-007",
    title: "I receive what I desire",
    category: "Abundance",
    description: "Your desires are signposts to your purpose. Release resistance and allow blessings to flow into your life.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationReceive,
    tags: ["receiving", "desire", "manifestation"],
    rating: 4.6,
    reviewCount: 1456,
    socialProof: "700+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Premium Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Vision board centerpiece",
      "Canvas for manifestation rituals",
      "Framed poster for workspace"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-008",
    title: "Today, I honor myself",
    category: "Self-Love",
    description: "Small acts of self-honor create a life you do not need to escape from. Make choices that respect your needs.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationHonor,
    tags: ["honor", "self-care", "daily"],
    rating: 4.3,
    reviewCount: 982,
    socialProof: "500+ sold",
    certifications: ["Instant Download", "Premium Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Morning phone wallpaper",
      "Canvas for bathroom mirror view",
      "Daily affirmation anchor"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-009",
    title: "I release what no longer serves",
    category: "Strength",
    description: "Letting go makes room for what is truly meant for you. Release old patterns and beliefs that no longer align with your highest good.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationRelease,
    tags: ["release", "letting-go", "growth"],
    rating: 4.7,
    reviewCount: 2145,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Premium Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Phone wallpaper during major life changes",
      "Canvas for meditation space",
      "Visual reminder for release rituals"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-010",
    title: "Joy is my natural state",
    category: "Joy",
    description: "Happiness is not a destination—it is your birthright to claim. Stop chasing joy and start embodying it.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationNaturalJoy,
    tags: ["joy", "natural", "happiness"],
    rating: 4.5,
    reviewCount: 1672,
    socialProof: "800+ sold",
    certifications: ["Instant Download", "Premium Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Uplifting phone wallpaper",
      "Canvas for living room joy",
      "Framed poster for bright spaces"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-011",
    title: "I am safe in my body",
    category: "Self-Love",
    description: "Your body is your home, not your enemy. This grounding affirmation offers comfort for healing your relationship with your physical self.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationSafe,
    tags: ["body", "safety", "acceptance"],
    rating: 4.8,
    reviewCount: 1834,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Minimal Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Grounding phone wallpaper",
      "Canvas for bedroom safety",
      "Framed poster for healing spaces"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-012",
    title: "My voice matters",
    category: "Strength",
    description: "Speak your truth, even when your voice shakes. Your voice carries power, and the world needs what you have to say.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationVoice,
    tags: ["voice", "truth", "courage"],
    rating: 4.2,
    reviewCount: 1245,
    socialProof: "600+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Premium Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Courage-building phone wallpaper",
      "Canvas for workspace empowerment",
      "Framed poster for speaking spaces"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  // **PAGE 3: More Popular Affirmations**
  {
    id: "aff-013",
    title: "I am worthy of the life I desire",
    category: "Abundance",
    description: "The life you envision chose you for a reason—honor it. You are worthy of everything you desire simply because of who you are.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationDreams,
    tags: ["dreams", "worthiness", "purpose"],
    rating: 4.7,
    reviewCount: 2387,
    socialProof: "1.1K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Dream-inspiring phone wallpaper",
      "Canvas for vision board wall",
      "Framed poster for aspiration spaces"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-014",
    title: "I choose peace over perfection",
    category: "Rest",
    description: "Perfection is exhausting—peace is possible. Give yourself permission to be human and make mistakes.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationPeace,
    tags: ["peace", "perfection", "rest"],
    rating: 4.6,
    reviewCount: 1563,
    socialProof: "750+ sold",
    certifications: ["Instant Download", "Minimal Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Calming phone wallpaper",
      "Canvas for perfectionist recovery",
      "Framed poster for restful spaces"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-015",
    title: "I celebrate every small win",
    category: "Joy",
    description: "Every small win deserves recognition. Honor your journey and acknowledge how far you have come—each step forward matters.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationProgress,
    tags: ["progress", "celebration", "growth"],
    rating: 4.1,
    reviewCount: 1124,
    socialProof: "550+ sold",
    certifications: ["Instant Download", "Premium Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Progress-celebrating phone wallpaper",
      "Canvas for goal-tracking walls",
      "Framed poster for achievement displays"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-016",
    title: "My intuition guides me",
    category: "Strength",
    description: "That whisper inside knows the way. Your intuition is your soul's GPS, guiding you toward alignment.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationIntuition,
    tags: ["intuition", "guidance", "inner-wisdom"],
    rating: 4.7,
    reviewCount: 1987,
    socialProof: "950+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Premium Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Intuition-honoring phone wallpaper",
      "Canvas for spiritual spaces",
      "Framed poster for meditation corners"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-017",
    title: "I am open to miracles",
    category: "Abundance",
    description: "Magic happens when you believe it can. Release cynicism and open your heart to unexpected blessings.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationMiracles,
    tags: ["miracles", "magic", "possibility"],
    rating: 4.5,
    reviewCount: 1698,
    socialProof: "820+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Miracle-inviting phone wallpaper",
      "Canvas for magical spaces",
      "Framed poster for wonder walls"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-018",
    title: "I give myself permission to feel",
    category: "Self-Love",
    description: "All feelings are welcome here. Your emotions are not weaknesses—they are wisdom, telling you what you need.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationFeel,
    tags: ["feelings", "permission", "vulnerability"],
    rating: 4.8,
    reviewCount: 2214,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "Minimal Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Emotionally-supportive phone wallpaper",
      "Canvas for therapy spaces",
      "Framed poster for healing rooms"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  // **PAGE 4: Final Collection**
  {
    id: "aff-019",
    title: "I am creating the life I desire",
    category: "Strength",
    description: "Every choice is a brushstroke. You are not a passive recipient of life—you are an active creator.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationCreating,
    tags: ["creation", "life", "intention"],
    rating: 4.4,
    reviewCount: 1445,
    socialProof: "700+ sold",
    certifications: ["Instant Download", "Premium Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Creation-inspiring phone wallpaper",
      "Canvas for workspace motivation",
      "Framed poster for intentional living"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-020",
    title: "Today is full of possibility",
    category: "Joy",
    description: "Each sunrise brings infinite potential. Today is a blank canvas full of opportunities you have not yet imagined.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationPossibility,
    tags: ["possibility", "potential", "today"],
    rating: 3.9,
    reviewCount: 1089,
    socialProof: "530+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Premium Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Possibility-opening phone wallpaper",
      "Canvas for morning spaces",
      "Framed poster for optimistic corners"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-021",
    title: "I am allowed to change my mind",
    category: "Self-Love",
    description: "Growth requires evolution. Changing your mind is not failure—it is wisdom. You do not owe anyone consistency at the cost of authenticity.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationChange,
    tags: ["change", "growth", "permission"],
    rating: 4.6,
    reviewCount: 1523,
    socialProof: "730+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Minimal Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Growth-embracing phone wallpaper",
      "Canvas for transformation spaces",
      "Framed poster for evolution walls"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-022",
    title: "My rest is productive",
    category: "Rest",
    description: "Rest is not laziness—it is how you recharge your magic. Rest is the foundation of sustainable productivity.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationProductiveRest,
    tags: ["rest", "productivity", "recharge"],
    rating: 4.7,
    reviewCount: 1876,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "Premium Design", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Rest-validating phone wallpaper",
      "Canvas for bedroom sanctuary",
      "Framed poster for guilt-free rest"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-023",
    title: "I attract what I embody",
    category: "Abundance",
    description: "Become the energy you wish to attract. You do not attract what you want—you attract who you are.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationAttract,
    tags: ["attraction", "embodiment", "energy"],
    rating: 4.8,
    reviewCount: 2456,
    socialProof: "1.2K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "18x24 Print Size"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Manifestation phone wallpaper",
      "Canvas for energy-setting spaces",
      "Framed poster for attraction walls"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
  {
    id: "aff-024",
    title: "I am both the storm and the calm",
    category: "Strength",
    description: "You contain multitudes. You can be strong and soft, fierce and gentle. Embrace all aspects of yourself without apology.",
    price: AFFIRMATION_FORMAT_PRICING["Digital Download"],
    formats: STANDARD_FORMATS,
    image: affirmationDuality,
    tags: ["duality", "wholeness", "acceptance"],
    rating: 4.5,
    reviewCount: 1334,
    socialProof: "650+ sold",
    certifications: ["Instant Download", "18x24 Print Size", "Premium Design"],
    displayVariation: getRandomDisplayVariation(),
    features: [
      "Digital download for instant access",
      "Canvas print on premium stretched canvas",
      "Unframed poster on quality matte paper",
      "Framed poster with Red Oak wood frame"
    ],
    usageIdeas: [
      "Duality-embracing phone wallpaper",
      "Canvas for complexity-honoring spaces",
      "Framed poster for wholeness walls"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "High-resolution digital file",
      aspectRatios: "18x24 portrait (all prints)",
      delivery: "Digital: Instant download | Physical: 5-7 business days"
    }
  },
];
