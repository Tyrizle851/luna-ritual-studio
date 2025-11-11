import bookImage from "@/assets/product-book.jpg";
import candleImage1 from "@/assets/product-candle-1.jpg";
import candleImage2 from "@/assets/product-candle-2.jpg";
import supplementImage1 from "@/assets/product-supplement-1.jpg";
import supplementImage2 from "@/assets/product-supplement-2.jpg";
import leatherBagImage from "@/assets/product-leather-bag.jpg";
import linenRobeImage from "@/assets/product-linen-robe.jpg";
import slipDressImage from "@/assets/product-slip-dress.jpg";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  category: string;
  affiliateUrl: string;
  rating: number;
}

export const books: Book[] = [
  {
    id: "book-001",
    title: "The Art of Slow Living",
    author: "Sophia Bennett",
    price: 24,
    image: bookImage,
    description: "Discover the beauty of slowing down and living with intention",
    category: "Mindfulness",
    affiliateUrl: "https://amzn.to/slowliving",
    rating: 4.8
  },
  {
    id: "book-002",
    title: "Morning Rituals",
    author: "Emma Chen",
    price: 22,
    image: candleImage1,
    description: "Transform your mornings into sacred moments of self-care",
    category: "Self-Care",
    affiliateUrl: "https://amzn.to/morningrituals",
    rating: 4.9
  },
  {
    id: "book-003",
    title: "The Intentional Home",
    author: "Luna Martinez",
    price: 28,
    image: linenRobeImage,
    description: "Create a sanctuary that reflects your values and nourishes your soul",
    category: "Home & Living",
    affiliateUrl: "https://amzn.to/intentionalhome",
    rating: 4.7
  },
  {
    id: "book-004",
    title: "Quiet Confidence",
    author: "Aria Thompson",
    price: 21,
    image: supplementImage1,
    description: "Build inner strength through gentle practices and self-compassion",
    category: "Personal Growth",
    affiliateUrl: "https://amzn.to/quietconfidence",
    rating: 4.6
  },
  {
    id: "book-005",
    title: "Seasonal Living",
    author: "Ivy Rose",
    price: 26,
    image: slipDressImage,
    description: "Align your life with nature's rhythms for deeper fulfillment",
    category: "Wellness",
    affiliateUrl: "https://amzn.to/seasonalliving",
    rating: 4.8
  },
  {
    id: "book-006",
    title: "The Minimalist Mind",
    author: "Claire Adams",
    price: 23,
    image: candleImage2,
    description: "Declutter your thoughts and embrace mental clarity",
    category: "Mindfulness",
    affiliateUrl: "https://amzn.to/minimalistmind",
    rating: 4.9
  },
  {
    id: "book-007",
    title: "Nourish Your Soul",
    author: "Grace Williams",
    price: 25,
    image: supplementImage2,
    description: "A guide to holistic wellness and mindful eating",
    category: "Wellness",
    affiliateUrl: "https://amzn.to/nourishyoursoul",
    rating: 4.7
  },
  {
    id: "book-008",
    title: "Sacred Spaces",
    author: "Maya Brooks",
    price: 27,
    image: leatherBagImage,
    description: "Design rituals and spaces that honor your journey",
    category: "Home & Living",
    affiliateUrl: "https://amzn.to/sacredspaces",
    rating: 4.8
  },
  {
    id: "book-009",
    title: "The Power of Pause",
    author: "Stella Morgan",
    price: 20,
    image: bookImage,
    description: "Finding peace in life's transitions and in-between moments",
    category: "Mindfulness",
    affiliateUrl: "https://amzn.to/powerofpause",
    rating: 4.6
  },
  {
    id: "book-010",
    title: "Radiant Living",
    author: "Jasmine Lee",
    price: 29,
    image: candleImage1,
    description: "Cultivate energy, joy, and vibrance in everyday life",
    category: "Self-Care",
    affiliateUrl: "https://amzn.to/radiantliving",
    rating: 4.9
  },
  {
    id: "book-011",
    title: "The Gentle Path",
    author: "Olivia Hart",
    price: 24,
    image: linenRobeImage,
    description: "A compassionate approach to personal transformation",
    category: "Personal Growth",
    affiliateUrl: "https://amzn.to/gentlepath",
    rating: 4.7
  },
  {
    id: "book-012",
    title: "Mindful Moments",
    author: "Rachel Foster",
    price: 21,
    image: slipDressImage,
    description: "Daily practices for presence and inner peace",
    category: "Mindfulness",
    affiliateUrl: "https://amzn.to/mindfulmoments",
    rating: 4.8
  }
];
