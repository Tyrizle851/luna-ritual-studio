import bookImage from "@/assets/product-book.jpg";

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
    image: bookImage,
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
    image: bookImage,
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
    image: bookImage,
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
    image: bookImage,
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
    image: bookImage,
    description: "Declutter your thoughts and embrace mental clarity",
    category: "Mindfulness",
    affiliateUrl: "https://amzn.to/minimalistmind",
    rating: 4.9
  }
];
