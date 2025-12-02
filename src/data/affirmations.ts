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

export interface Affirmation {
  id: string;
  title: string;
  category: "Self-Love" | "Abundance" | "Rest" | "Joy" | "Strength";
  description: string;
  price: number;
  formats: string[];
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
  productDetails?: {
    resolution?: string;
    fileFormats?: string;
    aspectRatios?: string;
    delivery?: string;
  };
}

export const affirmations: Affirmation[] = [
  // **PAGE 1: BEST PICKS** - Featured affirmations with premium positioning
  {
    id: "aff-001",
    title: "I am worthy of rest",
    category: "Self-Love",
    description: "A gentle reminder that rest is your birthright. This affirmation gives you permission to pause and honor your need for restoration. Soft earth tones with delicate typography bring calm to your daily rituals.",
    price: 11.99,
    originalPrice: 15.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationRest,
    featured: true,
    tags: ["rest", "self-care", "boundaries"],
    rating: 4.9,
    reviewCount: 2847,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "High Resolution", "Print Ready"],
    badge: "Best Seller",
    features: [
      "Premium minimal aesthetic design",
      "Works on all devices (phone, tablet, desktop)",
      "Multiple format options included",
      "Printable at professional quality (300 DPI)"
    ],
    usageIdeas: [
      "Set as your phone lock screen for daily reminders",
      "Use as desktop wallpaper during work hours",
      "Print and frame for your bedroom or meditation space",
      "Share with friends who need permission to rest"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-002",
    title: "I choose joy today",
    category: "Joy",
    description: "Joy is a conscious decision you make each morning. This uplifting design celebrates the power of intention, reminding you that happiness begins with choice. Warm colors and modern typography inspire daily gratitude.",
    price: 14.49,
    originalPrice: 18.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationJoy,
    featured: true,
    tags: ["joy", "intention", "morning"],
    rating: 4.8,
    reviewCount: 2914,
    socialProof: "1.5K+ sold",
    certifications: ["Instant Download", "300 DPI", "Desktop Ready"],
    badge: "Staff Pick",
    features: [
      "Uplifting design with warm colors",
      "Perfect for morning mindfulness rituals",
      "Multiple print sizes available",
      "High-resolution files for crisp display"
    ],
    usageIdeas: [
      "Morning phone wallpaper to start your day with intention",
      "Desktop background for work motivation",
      "Print for bathroom mirror or bedroom wall",
      "Gift to friends who need encouragement"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-003",
    title: "Abundance flows to me",
    category: "Abundance",
    description: "Shift your mindset from scarcity to possibility. This manifestation wallpaper reminds you that abundance isn't just money—it's love, opportunities, and joy flowing freely. Elegant design with luxurious tones evokes prosperity.",
    price: 17.99,
    originalPrice: 22.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationAbundance,
    featured: true,
    tags: ["abundance", "wealth", "receiving"],
    rating: 4.9,
    reviewCount: 2127,
    socialProof: "2K+ sold",
    certifications: ["Instant Download", "Premium Design", "High Resolution"],
    badge: "Most Popular",
    features: [
      "Luxurious design evoking prosperity",
      "Perfect for manifestation practices",
      "Ideal for vision boards and goal-setting",
      "Rich color palette for abundance mindset"
    ],
    usageIdeas: [
      "Daily phone wallpaper for manifestation practice",
      "Vision board centerpiece",
      "Print for your workspace or wealth corner",
      "Morning meditation visual anchor"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-004",
    title: "I trust my journey",
    category: "Strength",
    description: "Release the need for control and embrace faith in your path. Trust means believing you're equipped to handle whatever comes. Calming, grounded design brings peace during moments of uncertainty.",
    price: 9.99,
    originalPrice: 14.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationTrust,
    tags: ["trust", "journey", "faith"],
    rating: 4.4,
    reviewCount: 1923,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "Minimal Design", "Phone Wallpaper"],
    features: [
      "Grounded, calming design",
      "Perfect for transitions and uncertainty",
      "Elegant typography",
      "Ideal for meditation spaces"
    ],
    usageIdeas: [
      "Phone wallpaper during life transitions",
      "Desktop background for daily reassurance",
      "Print for meditation or journaling space",
      "Comfort visual during challenging times"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-005",
    title: "I am always enough",
    category: "Self-Love",
    description: "Your worth isn't tied to productivity or achievement. You are inherently valuable simply because you exist. Soft, compassionate colors and timeless typography feel like a warm embrace.",
    price: 13.95,
    originalPrice: 17.95,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationEnough,
    featured: true,
    tags: ["self-love", "worthiness", "acceptance"],
    rating: 4.9,
    reviewCount: 2928,
    socialProof: "2.5K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "Print Ready"],
    badge: "Best Seller",
    features: [
      "Compassionate, warm design",
      "Perfect for perfectionists and people-pleasers",
      "Timeless typography",
      "Multiple format options for all uses"
    ],
    usageIdeas: [
      "Daily phone wallpaper for self-acceptance reminders",
      "Print for bathroom mirror affirmations",
      "Desktop background during work stress",
      "Gift for loved ones struggling with self-worth"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-006",
    title: "My calm is my power",
    category: "Strength",
    description: "In chaos, your calm is your superpower. Peace is not passive—it's revolutionary. When you choose calm, you reclaim your power and anchor into your center. Serene colors with bold typography.",
    price: 10.89,
    originalPrice: 14.89,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationCalm,
    featured: true,
    tags: ["calm", "power", "peace"],
    rating: 4.8,
    reviewCount: 2631,
    socialProof: "1.2K+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
    badge: "Staff Pick",
    features: [
      "Serene, grounding design",
      "Perfect for stress management",
      "Bold yet peaceful typography",
      "Ideal for mindfulness practice"
    ],
    usageIdeas: [
      "Phone wallpaper for nervous system regulation",
      "Desktop background for high-stress work environments",
      "Print for meditation or yoga space",
      "Visual anchor during anxious moments"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  // **PAGE 2: Additional Popular Affirmations**
  {
    id: "aff-007",
    title: "I receive what I desire",
    category: "Abundance",
    description: "Your desires are signposts to your purpose. Release resistance and allow blessings to flow. This empowering design supports your manifestation journey with uplifting colors.",
    price: 16.49,
    originalPrice: 21.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationReceive,
    tags: ["receiving", "desire", "manifestation"],
    rating: 4.6,
    reviewCount: 1456,
    socialProof: "700+ sold",
    certifications: ["Instant Download", "Desktop Ready", "High Resolution"],
    features: [
      "Empowering manifestation design",
      "Perfect for receiving mode activation",
      "Large print format available"
    ],
    usageIdeas: [
      "Vision board centerpiece",
      "Phone wallpaper for manifestation rituals",
      "Print for workspace or bedroom"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-008",
    title: "Today, I honor myself",
    category: "Self-Love",
    description: "Small acts of self-honor create a life you don't need to escape from. Make choices that respect your needs and boundaries. Gentle design with soothing colors perfect for morning rituals.",
    price: 8.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationHonor,
    tags: ["honor", "self-care", "daily"],
    rating: 4.3,
    reviewCount: 982,
    socialProof: "500+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Wallpaper"],
    features: [
      "Daily self-honor reminder",
      "Gentle, compassionate design",
      "Perfect for morning rituals"
    ],
    usageIdeas: [
      "Morning phone wallpaper",
      "Bathroom mirror print",
      "Daily affirmation anchor"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-009",
    title: "I release what no longer serves",
    category: "Strength",
    description: "Letting go makes room for what is meant for you. Release old patterns and beliefs that no longer align with your highest good. Design captures the essence of freedom and renewal.",
    price: 11.49,
    originalPrice: 15.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationRelease,
    tags: ["release", "letting-go", "growth"],
    rating: 4.7,
    reviewCount: 2145,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "Print Ready", "High Resolution"],
    features: [
      "Transformational letting-go design",
      "Perfect for life transitions",
      "Multiple print formats available"
    ],
    usageIdeas: [
      "Phone wallpaper during major life changes",
      "Print for meditation space",
      "Visual reminder for release rituals"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-010",
    title: "Joy is my natural state",
    category: "Joy",
    description: "Happiness is not a destination—it's your birthright to claim. Stop chasing joy and start embodying it. Vibrant, warm colors and optimistic typography bring lightness to your day.",
    price: 13.49,
    originalPrice: 17.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationNaturalJoy,
    tags: ["joy", "natural", "happiness"],
    rating: 4.5,
    reviewCount: 1672,
    socialProof: "800+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Ready"],
  },
  {
    id: "aff-011",
    title: "I am safe in my body",
    category: "Self-Love",
    description: "Your body is your home, not your enemy. This grounding affirmation offers comfort for anyone healing their relationship with their physical self. Gentle colors communicate safety and belonging.",
    price: 9.49,
    originalPrice: 13.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationSafe,
    tags: ["body", "safety", "acceptance"],
    rating: 4.8,
    reviewCount: 1834,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
  },
  {
    id: "aff-012",
    title: "My voice matters",
    category: "Strength",
    description: "Speak your truth, even when your voice shakes. Your voice carries power, and the world needs what you have to say. Bold design with confident typography reflects courage.",
    price: 7.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationVoice,
    tags: ["voice", "truth", "courage"],
    rating: 4.2,
    reviewCount: 1245,
    socialProof: "600+ sold",
    certifications: ["Instant Download", "Print Ready", "Desktop Ready"],
  },
  // **PAGE 3: More Popular Affirmations**
  {
    id: "aff-013",
    title: "I am worthy of my dreams",
    category: "Abundance",
    description: "Your dreams chose you for a reason—honor them. You are worthy of everything you desire simply because of who you are. Inspiring design with aspirational colors ignites belief.",
    price: 18.99,
    originalPrice: 24.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationDreams,
    tags: ["dreams", "worthiness", "purpose"],
    rating: 4.7,
    reviewCount: 2387,
    socialProof: "1.1K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "High Resolution"],
  },
  {
    id: "aff-014",
    title: "I choose peace over perfection",
    category: "Rest",
    description: "Perfection is exhausting—peace is possible. Give yourself permission to be human and make mistakes. Calming design with gentle typography whispers permission to let go.",
    price: 10.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationPeace,
    tags: ["peace", "perfection", "rest"],
    rating: 4.6,
    reviewCount: 1563,
    socialProof: "750+ sold",
    certifications: ["Instant Download", "Minimal Design", "Phone Wallpaper"],
  },
  {
    id: "aff-015",
    title: "I celebrate my progress",
    category: "Joy",
    description: "Every step forward deserves recognition, no matter how small. Honor your journey and acknowledge how far you've come. Joyful colors create a feeling of accomplishment.",
    price: 8.49,
    originalPrice: 11.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationProgress,
    tags: ["progress", "celebration", "growth"],
    rating: 4.1,
    reviewCount: 1124,
    socialProof: "550+ sold",
    certifications: ["Instant Download", "Premium Design", "Print Ready"],
  },
  {
    id: "aff-016",
    title: "My intuition guides me",
    category: "Strength",
    description: "That whisper inside knows the way. Your intuition is your soul's GPS, guiding you toward alignment. Mystical design with ethereal colors evokes inner knowing and spiritual connection.",
    price: 14.95,
    originalPrice: 19.95,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationIntuition,
    tags: ["intuition", "guidance", "inner-wisdom"],
    rating: 4.7,
    reviewCount: 1987,
    socialProof: "950+ sold",
    certifications: ["Instant Download", "High Resolution", "Desktop Ready"],
  },
  {
    id: "aff-017",
    title: "I am open to miracles",
    category: "Abundance",
    description: "Magic happens when you believe it can. Release cynicism and open your heart to unexpected blessings. Enchanting design with whimsical elements inspires wonder and faith.",
    price: 15.99,
    originalPrice: 20.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationMiracles,
    tags: ["miracles", "magic", "possibility"],
    rating: 4.5,
    reviewCount: 1698,
    socialProof: "820+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "Print Ready"],
  },
  {
    id: "aff-018",
    title: "I give myself permission to feel",
    category: "Self-Love",
    description: "All feelings are welcome here. Your emotions are not weaknesses—they are wisdom, telling you what you need. Tender design with soft colors creates a safe space for expression.",
    price: 11.79,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationFeel,
    tags: ["feelings", "permission", "vulnerability"],
    rating: 4.8,
    reviewCount: 2214,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "Minimal Design", "High Resolution"],
  },
  // **PAGE 4: Final Collection**
  {
    id: "aff-019",
    title: "I am creating the life I desire",
    category: "Strength",
    description: "Every choice is a brushstroke. You are not a passive recipient of life—you are an active creator. Creative design with bold colors inspires agency and intentional living.",
    price: 9.89,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationCreating,
    tags: ["creation", "life", "intention"],
    rating: 4.4,
    reviewCount: 1445,
    socialProof: "700+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Ready"],
  },
  {
    id: "aff-020",
    title: "Today is full of possibility",
    category: "Joy",
    description: "Each sunrise brings infinite potential. Today is a blank canvas full of opportunities you haven't yet imagined. Bright, dawn-inspired colors evoke new beginnings.",
    price: 10.99,
    originalPrice: 14.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationPossibility,
    tags: ["possibility", "potential", "today"],
    rating: 3.9,
    reviewCount: 1089,
    socialProof: "530+ sold",
    certifications: ["Instant Download", "Desktop Ready", "Print Ready"],
  },
  {
    id: "aff-021",
    title: "I am allowed to change my mind",
    category: "Self-Love",
    description: "Growth means evolution. Changing your mind is not failure—it's wisdom. You don't owe anyone consistency at the cost of authenticity. Fluid design reflects transformation.",
    price: 13.29,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationChange,
    tags: ["change", "growth", "permission"],
    rating: 4.6,
    reviewCount: 1523,
    socialProof: "730+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
  },
  {
    id: "aff-022",
    title: "My rest is productive",
    category: "Rest",
    description: "Rest is not laziness—it's how you recharge your magic. Rest is the foundation of sustainable productivity, not its opposite. Calming design invites you to slow down guilt-free.",
    price: 9.79,
    originalPrice: 13.79,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationProductiveRest,
    tags: ["rest", "productivity", "recharge"],
    rating: 4.7,
    reviewCount: 1876,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Wallpaper"],
  },
  {
    id: "aff-023",
    title: "I attract what I embody",
    category: "Abundance",
    description: "Become the energy you wish to attract. You don't attract what you want—you attract who you are. Radiant design with magnetic colors reflects this powerful manifestation truth.",
    price: 16.99,
    originalPrice: 21.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationAttract,
    tags: ["attraction", "embodiment", "energy"],
    rating: 4.8,
    reviewCount: 2456,
    socialProof: "1.2K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "High Resolution"],
  },
  {
    id: "aff-024",
    title: "I am both the storm and the calm",
    category: "Strength",
    description: "You contain multitudes. You can be strong and soft, fierce and gentle. Embrace all aspects of yourself without apology. Dynamic design honors your beautiful complexity.",
    price: 11.29,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationDuality,
    tags: ["duality", "wholeness", "acceptance"],
    rating: 4.5,
    reviewCount: 1334,
    socialProof: "650+ sold",
    certifications: ["Instant Download", "Print Ready", "Desktop Ready"],
  },
];
