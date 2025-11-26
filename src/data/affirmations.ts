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
  // **PAGE 1: BEST PICKS** - Featured affirmations with longest descriptions
  {
    id: "aff-001",
    title: "I am worthy of rest",
    category: "Self-Love",
    description: "A gentle reminder that rest is not earned—it is your birthright. In a world that glorifies productivity and hustle culture, this affirmation gives you permission to pause, breathe, and honor your need for restoration. Featuring soft earth tones with delicate script typography, this design brings calm to your daily rituals. Perfect for setting as your phone wallpaper or displaying in your sacred space, it serves as a compassionate nudge to prioritize self-care without guilt. You don't have to earn rest through exhaustion. You are worthy of peace, stillness, and deep rejuvenation exactly as you are. This affirmation wallpaper combines premium minimal aesthetic with profound meaning, making it ideal for women building lives of intention who understand that rest is productive, necessary, and revolutionary.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 (print)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-002",
    title: "I choose joy today",
    category: "Joy",
    description: "Every morning is an invitation to choose yourself. Joy is not something you wait for—it is a conscious decision you make again and again. This affirmation wallpaper celebrates the power of intention and reminds you that happiness begins with choice. Designed with warm, uplifting colors and modern typography, this piece transforms your phone screen or desktop into a daily source of inspiration. Whether you're navigating challenging seasons or simply want to anchor into gratitude, this affirmation helps you recenter on what matters most: your peace, your presence, your joy. The clean, editorial aesthetic fits seamlessly into any digital space while delivering a powerful message. Choosing joy doesn't mean ignoring pain—it means finding light even in the darkness. Perfect for mindful women who understand that joy is a practice, not a destination.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationJoy,
    featured: true,
    tags: ["joy", "intention", "morning"],
    rating: 5.0,
    reviewCount: 3214,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 & 8.5:11 (prints)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-003",
    title: "Abundance flows to me",
    category: "Abundance",
    description: "Open your hands, open your heart—abundance is already yours. This manifestation wallpaper shifts your mindset from scarcity to possibility, reminding you that the universe is infinitely generous. Abundance isn't just about money; it's about love, opportunities, health, creativity, and joy flowing freely into your life. The elegant design features rich, luxurious tones that evoke feelings of prosperity and ease. Set this as your phone wallpaper or print it for your vision board to keep this powerful affirmation in constant view. When you believe abundance flows to you, you become magnetic to blessings. This affirmation art combines spiritual principles with premium design, making it perfect for manifestation practices, morning rituals, and intentional living. Ideal for women who are ready to release limiting beliefs about worthiness and step into their full receiving mode.",
    price: 15,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationAbundance,
    featured: true,
    tags: ["abundance", "wealth", "receiving"],
    rating: 4.9,
    reviewCount: 4127,
    socialProof: "2K+ sold",
    certifications: ["Instant Download", "Premium Design", "High Resolution"],
    originalPrice: 20,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 & 8.5:11 (prints)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-004",
    title: "I trust my journey",
    category: "Strength",
    description: "Every step of your journey is sacred and exactly where you need to be. This affirmation wallpaper helps you release the need for control and embrace faith in the unfolding of your life. Trust doesn't mean knowing how things will turn out—it means believing you're equipped to handle whatever comes. With calming, grounded design elements and elegant typography, this piece brings peace to moments of uncertainty. Perfect for daily meditation, journaling rituals, or simply as a comforting reminder on your phone screen. When you trust your journey, you free yourself from anxiety about the future and regret about the past. This design embodies quiet strength and spiritual resilience, making it ideal for women navigating transitions, building new chapters, or learning to surrender control. Let this affirmation be your anchor when life feels overwhelming.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationTrust,
    tags: ["trust", "journey", "faith"],
    rating: 4.8,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 (print)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-005",
    title: "I am enough, always",
    category: "Self-Love",
    description: "Not when you achieve more, not when you do more—right now, exactly as you are, you are enough. This self-love affirmation wallpaper challenges the lie that your worth is tied to productivity or achievement. You are inherently valuable simply because you exist. The design features soft, compassionate colors and timeless typography that feels like a warm embrace. Use this as your daily reminder to practice radical self-acceptance and release the pressure to constantly prove yourself. Perfect for perfectionists, recovering people-pleasers, and anyone learning to love themselves unconditionally. This affirmation art speaks to the core wound so many women carry—the belief that we must earn our place. You don't. You already belong. You are already worthy. Let this wallpaper be your daily permission slip to stop striving and start being.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationEnough,
    featured: true,
    tags: ["self-love", "worthiness", "acceptance"],
    rating: 5.0,
    reviewCount: 5128,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 & 8.5:11 (prints)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-006",
    title: "My calm is my power",
    category: "Strength",
    description: "In a chaotic world that demands constant reaction, your calm is your superpower. This strength affirmation wallpaper reminds you that peace is not passive—it's revolutionary. When you choose calm, you reclaim your power from external circumstances and anchor into your center. The design features serene, grounding colors with bold, confident typography that reflects inner strength. Perfect for high-stress careers, busy moms, anxious hearts, or anyone learning to regulate their nervous system. Your calm creates space for clarity, wisdom, and intentional action. This affirmation art helps you remember that you don't have to match the energy of chaos around you. You can be the eye of the storm—steady, centered, and powerful. Use this wallpaper as a tool for mindfulness practice and emotional regulation.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationCalm,
    featured: true,
    tags: ["calm", "power", "peace"],
    rating: 4.9,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 (print)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-007",
    title: "I receive what I desire",
    category: "Abundance",
    description: "Your desires are not selfish—they are signposts to your purpose.",
    price: 15,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 11x14"],
    image: affirmationReceive,
    tags: ["receiving", "desire", "manifestation"],
    rating: 4.8,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 8.5:11 (print)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-008",
    title: "Today, I honor myself",
    category: "Self-Love",
    description: "Small acts of self-honor create a life you do not need to escape from.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationHonor,
    tags: ["honor", "self-care", "daily"],
    rating: 4.7,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 (print)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-009",
    title: "I release what no longer serves",
    category: "Strength",
    description: "Letting go is not giving up. It is making room for what is meant for you.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationRelease,
    tags: ["release", "letting-go", "growth"],
    rating: 4.9,
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
      aspectRatios: "9:16 (phone), 16:9 (desktop), 4:5 & 8.5:11 (prints)",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-010",
    title: "Joy is my natural state",
    category: "Joy",
    description: "You do not have to earn joy. It is already yours.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationNaturalJoy,
    tags: ["joy", "natural", "happiness"],
    rating: 4.8,
    reviewCount: 1672,
    socialProof: "800+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Ready"],
  },
  {
    id: "aff-011",
    title: "I am safe in my body",
    category: "Self-Love",
    description: "Your body is not your enemy. It is your home.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationSafe,
    tags: ["body", "safety", "acceptance"],
    rating: 4.9,
    reviewCount: 1834,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
  },
  {
    id: "aff-012",
    title: "My voice matters",
    category: "Strength",
    description: "Speak your truth, even when your voice shakes.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationVoice,
    tags: ["voice", "truth", "courage"],
    rating: 4.7,
    reviewCount: 1245,
    socialProof: "600+ sold",
    certifications: ["Instant Download", "Print Ready", "Desktop Ready"],
  },
  {
    id: "aff-013",
    title: "I am worthy of my dreams",
    category: "Abundance",
    description: "Your dreams chose you for a reason. Honor them.",
    price: 15,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 11x14"],
    image: affirmationDreams,
    tags: ["dreams", "worthiness", "purpose"],
    rating: 4.9,
    reviewCount: 2387,
    socialProof: "1.1K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "High Resolution"],
  },
  {
    id: "aff-014",
    title: "I choose peace over perfection",
    category: "Rest",
    description: "Perfection is exhausting. Peace is possible.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationPeace,
    tags: ["peace", "perfection", "rest"],
    rating: 4.8,
    reviewCount: 1563,
    socialProof: "750+ sold",
    certifications: ["Instant Download", "Minimal Design", "Phone Wallpaper"],
  },
  {
    id: "aff-015",
    title: "I celebrate my progress",
    category: "Joy",
    description: "Every step forward deserves recognition, no matter how small.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationProgress,
    tags: ["progress", "celebration", "growth"],
    rating: 4.7,
    reviewCount: 1124,
    socialProof: "550+ sold",
    certifications: ["Instant Download", "Premium Design", "Print Ready"],
  },
  {
    id: "aff-016",
    title: "My intuition guides me",
    category: "Strength",
    description: "That whisper inside? It knows the way.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationIntuition,
    tags: ["intuition", "guidance", "inner-wisdom"],
    rating: 4.9,
    reviewCount: 1987,
    socialProof: "950+ sold",
    certifications: ["Instant Download", "High Resolution", "Desktop Ready"],
  },
  {
    id: "aff-017",
    title: "I am open to miracles",
    category: "Abundance",
    description: "Magic happens when you believe it can.",
    price: 15,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 11x14"],
    image: affirmationMiracles,
    tags: ["miracles", "magic", "possibility"],
    rating: 4.8,
    reviewCount: 1698,
    socialProof: "820+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "Print Ready"],
  },
  {
    id: "aff-018",
    title: "I give myself permission to feel",
    category: "Self-Love",
    description: "All feelings are welcome here. You do not have to be strong all the time.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationFeel,
    tags: ["feelings", "permission", "vulnerability"],
    rating: 4.9,
    reviewCount: 2214,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "Minimal Design", "High Resolution"],
  },
  {
    id: "aff-019",
    title: "I am creating the life I desire",
    category: "Strength",
    description: "Every choice is a brushstroke. You are the artist.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationCreating,
    tags: ["creation", "life", "intention"],
    rating: 4.8,
    reviewCount: 1445,
    socialProof: "700+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Ready"],
  },
  {
    id: "aff-020",
    title: "Today is full of possibility",
    category: "Joy",
    description: "Each sunrise brings infinite potential. What will you choose?",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationPossibility,
    tags: ["possibility", "potential", "today"],
    rating: 4.7,
    reviewCount: 1089,
    socialProof: "530+ sold",
    certifications: ["Instant Download", "Desktop Ready", "Print Ready"],
  },
  {
    id: "aff-021",
    title: "I am allowed to change my mind",
    category: "Self-Love",
    description: "Growth means evolution. You are not stuck with old decisions.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationChange,
    tags: ["change", "growth", "permission"],
    rating: 4.8,
    reviewCount: 1523,
    socialProof: "730+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
  },
  {
    id: "aff-022",
    title: "My rest is productive",
    category: "Rest",
    description: "Rest is not laziness. It is how you recharge your magic.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationProductiveRest,
    tags: ["rest", "productivity", "recharge"],
    rating: 4.9,
    reviewCount: 1876,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Wallpaper"],
  },
  {
    id: "aff-023",
    title: "I attract what I embody",
    category: "Abundance",
    description: "Become the energy you wish to attract.",
    price: 15,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 11x14"],
    image: affirmationAttract,
    tags: ["attraction", "embodiment", "energy"],
    rating: 4.9,
    reviewCount: 2456,
    socialProof: "1.2K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "High Resolution"],
  },
  {
    id: "aff-024",
    title: "I am both the storm and the calm",
    category: "Strength",
    description: "You contain multitudes. All of you is welcome.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationDuality,
    tags: ["duality", "wholeness", "acceptance"],
    rating: 4.8,
    reviewCount: 1334,
    socialProof: "650+ sold",
    certifications: ["Instant Download", "Print Ready", "Desktop Ready"],
  },
];
