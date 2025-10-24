export interface Article {
  id: string;
  slug: string;
  title: string;
  category: "Wellness" | "Home" | "Style" | "Mindset";
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: "art-001",
    slug: "morning-rituals-intentional-living",
    title: "Morning Rituals for Intentional Living",
    category: "Wellness",
    excerpt: "Your morning sets the tone for your entire day. Discover how to create a morning practice that nourishes rather than depletes.",
    author: "Luna",
    readTime: "6 min",
    date: "2025-01-15",
    image: "/placeholder.svg",
  },
  {
    id: "art-002",
    slug: "calm-capsule-wardrobe",
    title: "Creating a Calm Capsule Wardrobe",
    category: "Style",
    excerpt: "Less really is more when it comes to your closet. Learn how to build a wardrobe that feels like you.",
    author: "Luna",
    readTime: "8 min",
    date: "2025-01-10",
    image: "/placeholder.svg",
  },
  {
    id: "art-003",
    slug: "slow-sundays",
    title: "The Art of Slow Sundays",
    category: "Wellness",
    excerpt: "Sunday does not have to be for catching up or preparing for Monday. It can be a day of rest and reflection.",
    author: "Luna",
    readTime: "5 min",
    date: "2025-01-05",
    image: "/placeholder.svg",
  },
  {
    id: "art-004",
    slug: "affirmations-daily-practice",
    title: "Affirmations as Daily Practice",
    category: "Mindset",
    excerpt: "Affirmations are not just positive thinking—they are a tool for rewiring your brain and changing your life.",
    author: "Luna",
    readTime: "7 min",
    date: "2024-12-28",
    image: "/placeholder.svg",
  },
  {
    id: "art-005",
    slug: "minimalist-beauty-routine",
    title: "The Minimalist Beauty Routine",
    category: "Wellness",
    excerpt: "Your skincare does not need to be complicated. Five essential products and the power of consistency.",
    author: "Luna",
    readTime: "6 min",
    date: "2024-12-20",
    image: "/placeholder.svg",
  },
  {
    id: "art-006",
    slug: "space-for-creativity",
    title: "Creating Space for Creativity",
    category: "Wellness",
    excerpt: "Creativity is not a luxury—it is essential. Make space for creative expression to stay connected to yourself.",
    author: "Luna",
    readTime: "7 min",
    date: "2024-12-15",
    image: "/placeholder.svg",
  },
  {
    id: "art-007",
    slug: "nourishing-home",
    title: "Building a Nourishing Home",
    category: "Home",
    excerpt: "Your home should be your sanctuary. Here is how to create a space that nourishes your nervous system.",
    author: "Luna",
    readTime: "8 min",
    date: "2024-12-10",
    image: "/placeholder.svg",
  },
  {
    id: "art-008",
    slug: "practice-self-compassion",
    title: "The Practice of Self-Compassion",
    category: "Mindset",
    excerpt: "Self-compassion is not self-indulgence—it is the foundation of resilience and inner peace.",
    author: "Luna",
    readTime: "6 min",
    date: "2024-12-05",
    image: "/placeholder.svg",
  },
];
