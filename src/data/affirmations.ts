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
}

export const affirmations: Affirmation[] = [
  {
    id: "aff-001",
    title: "I am worthy of rest",
    category: "Self-Love",
    description: "A gentle reminder that rest is not earned—it is your right. Soft earth tones with delicate script.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationRest,
    featured: true,
    tags: ["rest", "self-care", "boundaries"],
  },
  {
    id: "aff-002",
    title: "I choose joy today",
    category: "Joy",
    description: "Every morning brings a choice. Choose joy, choose lightness, choose yourself.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationJoy,
    featured: true,
    tags: ["joy", "intention", "morning"],
  },
  {
    id: "aff-003",
    title: "Abundance flows to me",
    category: "Abundance",
    description: "Open your hands and heart. Abundance is your natural state.",
    price: 15,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationAbundance,
    featured: true,
    tags: ["abundance", "wealth", "receiving"],
  },
  {
    id: "aff-004",
    title: "I trust my journey",
    category: "Strength",
    description: "Every step is exactly where you need to be. Trust the unfolding.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationTrust,
    tags: ["trust", "journey", "faith"],
  },
  {
    id: "aff-005",
    title: "I am enough, always",
    category: "Self-Love",
    description: "Not when you achieve more, not when you do more. Right now, as you are.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
    image: affirmationEnough,
    featured: true,
    tags: ["self-love", "worthiness", "acceptance"],
  },
  {
    id: "aff-006",
    title: "My calm is my power",
    category: "Strength",
    description: "In a world of chaos, your peace is revolutionary.",
    price: 12,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
    image: affirmationCalm,
    featured: true,
    tags: ["calm", "power", "peace"],
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
  },
];
