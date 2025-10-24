import journalMorning from "@/assets/journal-morning.jpg";
import journalWardrobe from "@/assets/journal-wardrobe.jpg";
import journalSunday from "@/assets/journal-sunday.jpg";
import journalHome from "@/assets/journal-home.jpg";
import journalMindfulness from "@/assets/journal-mindfulness.jpg";
import journalBeauty from "@/assets/journal-beauty.jpg";
import journalCreativity from "@/assets/journal-creativity.jpg";
import journalCompassion from "@/assets/journal-compassion.jpg";

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
    excerpt: "Your morning sets the tone for your entire day. Discover how to create a morning practice that nourishes rather than depletes, and learn why the first hour after waking is the most powerful time to connect with yourself.",
    author: "Luna",
    readTime: "6 min",
    date: "2025-01-15",
    image: journalMorning,
  },
  {
    id: "art-002",
    slug: "calm-capsule-wardrobe",
    title: "Creating a Calm Capsule Wardrobe",
    category: "Style",
    excerpt: "Less really is more when it comes to your closet. Learn how to build a wardrobe that feels like you—full of pieces you love, free of decision fatigue, and completely sustainable.",
    author: "Luna",
    readTime: "8 min",
    date: "2025-01-10",
    image: journalWardrobe,
  },
  {
    id: "art-003",
    slug: "slow-sundays",
    title: "The Art of Slow Sundays",
    category: "Wellness",
    excerpt: "Sunday does not have to be for catching up or preparing for Monday. It can be a day of rest, reflection, and gentle nourishment. Here is how to reclaim your Sundays.",
    author: "Luna",
    readTime: "5 min",
    date: "2025-01-05",
    image: journalSunday,
  },
  {
    id: "art-004",
    slug: "affirmations-daily-practice",
    title: "Affirmations as Daily Practice",
    category: "Mindset",
    excerpt: "Affirmations are not just positive thinking—they are a tool for rewiring your brain. Learn how to use them effectively and make them part of your daily ritual.",
    author: "Luna",
    readTime: "7 min",
    date: "2024-12-28",
    image: journalMindfulness,
  },
  {
    id: "art-005",
    slug: "minimalist-beauty-routine",
    title: "The Minimalist Beauty Routine",
    category: "Wellness",
    excerpt: "Your skincare does not need to be complicated. Five essential products, two simple rituals, and the most important ingredient of all: consistency.",
    author: "Luna",
    readTime: "6 min",
    date: "2024-12-20",
    image: journalBeauty,
  },
  {
    id: "art-006",
    slug: "space-for-creativity",
    title: "Creating Space for Creativity",
    category: "Wellness",
    excerpt: "Creativity is not a luxury—it is essential. Whether you consider yourself creative or not, making space for creative expression is how you stay connected to yourself.",
    author: "Luna",
    readTime: "7 min",
    date: "2024-12-15",
    image: journalCreativity,
  },
  {
    id: "art-007",
    slug: "nourishing-home",
    title: "Building a Nourishing Home",
    category: "Home",
    excerpt: "Your home should be your sanctuary. Here is how to create a space that nourishes your nervous system, reflects who you are, and feels like rest.",
    author: "Luna",
    readTime: "8 min",
    date: "2024-12-10",
    image: journalHome,
  },
  {
    id: "art-008",
    slug: "practice-self-compassion",
    title: "The Practice of Self-Compassion",
    category: "Mindset",
    excerpt: "Self-compassion is not self-indulgence—it is the foundation of resilience. Learn how to speak to yourself with the same kindness you would offer your best friend.",
    author: "Luna",
    readTime: "6 min",
    date: "2024-12-05",
    image: journalCompassion,
  },
];
