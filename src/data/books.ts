import throneOfGlassImage from "@/assets/product-throne-of-glass.jpg";
import bookFourthWing from "@/assets/product-book-fourth-wing-1763580000.jpg";
import bookIronFlame from "@/assets/product-book-iron-flame-1763580000.jpg";
import bookAcotar from "@/assets/product-book-acotar-1763580000.jpg";
import bookAcomaf from "@/assets/product-book-acomaf-1763580000.jpg";
import bookCrownMidnight from "@/assets/product-book-crown-midnight-1763580000.jpg";
import bookCruelPrince from "@/assets/product-book-cruel-prince-1763580000.jpg";
import bookBloodAsh from "@/assets/product-book-blood-ash-1763580000.jpg";
import bookSerpentWings from "@/assets/product-book-serpent-wings-1763580000.jpg";
import bookDivineRivals from "@/assets/product-book-divine-rivals-1763580000.jpg";
import bookHouseEarth from "@/assets/product-book-house-earth-1763580000.jpg";
import bookSixCrows from "@/assets/product-book-six-crows-1763580000.jpg";
import bookShadowBone from "@/assets/product-book-shadow-bone-1763580000.jpg";
import bookWitcher from "@/assets/product-book-witcher-1763580000.jpg";
import bookNameWind from "@/assets/product-book-name-wind-1763580000.jpg";
import bookCirce from "@/assets/product-book-circe-1763580000.jpg";
import bookSongAchilles from "@/assets/product-book-song-achilles-1763580000.jpg";
import bookHeirFire from "@/assets/product-book-heir-fire-1763580000.jpg";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  affiliateUrl: string;
  rating?: number;
  reviewCount?: number;
  socialProof?: string;
  isPrime?: boolean;
  badge?: string;
  series?: string;
  awards?: string[];
  bookDetails?: {
    publisher?: string;
    pages?: number;
    format?: string;
    isbn?: string;
    language?: string;
  };
  themes?: string[];
  features?: string[];
  similarReads?: string[];
}

export const books: Book[] = [
  // **PAGE 1: BEST PICKS** - Highest rated, most reviewed, bestsellers
  {
    id: "book-000",
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    price: 16.88,
    originalPrice: 22.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-000/lifestyle-1764868892980.png",
    description: "A captivating fantasy epic about Celaena Sardothien, a legendary assassin who must compete for her freedom in a deadly tournament. Perfect for those who crave adventure, romance, and a fierce heroine who will stop at nothing to reclaim her destiny.",
    category: "Epic Fantasy",
    affiliateUrl: "https://amzn.to/4hTBnBz",
    rating: 4.9,
    reviewCount: 48612,
    socialProof: "60K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "Throne of Glass #1",
    awards: ["New York Times #1 Bestseller", "Goodreads Choice Finalist"],
    bookDetails: {
      publisher: "Bloomsbury YA",
      pages: 432,
      format: "Paperback",
      language: "English"
    },
    themes: ["Strong Female Lead", "Political Intrigue", "Slow Burn Romance", "Competitive Tournament"],
    features: [
      "New York Times #1 bestselling series",
      "Perfect for fans of ACOTAR and Fourth Wing",
      "Epic fantasy with romance and action",
      "First book in completed 8-book series"
    ],
    similarReads: ["A Court of Thorns and Roses", "Fourth Wing", "The Cruel Prince"]
  },
  {
    id: "book-001",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    price: 16.99,
    originalPrice: 23.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-001/detail-1764876121422.png",
    description: "Enter the brutal and elite world of a war college for dragon riders. Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.",
    category: "Romantasy",
    affiliateUrl: "https://www.amazon.com/dp/1649377371?tag=lunarituals10-20",
    rating: 4.6,
    reviewCount: 152847,
    socialProof: "100K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "The Empyrean #1",
    awards: ["#1 New York Times Bestseller", "Goodreads Choice Award Winner 2023"],
    bookDetails: {
      publisher: "Entangled: Red Tower Books",
      pages: 498,
      format: "Hardcover",
      language: "English"
    },
    themes: ["Dragon Riders", "Enemies to Lovers", "War College", "High Stakes Action"],
    features: [
      "#1 New York Times bestseller",
      "Over 1 million copies sold",
      "TikTok sensation - BookTok favorite",
      "Spicy romance with epic fantasy"
    ],
    similarReads: ["Iron Flame", "Throne of Glass", "The Cruel Prince"]
  },
  {
    id: "book-002",
    title: "Iron Flame",
    author: "Rebecca Yarros",
    price: 17.99,
    originalPrice: 24.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-002/styled-1764876244412.png",
    description: "Everyone expected Violet Sorrengail to die during her first year at Basgiath War College—Violet included. But Threshing was only the first impossible test meant to weed out the weak-willed, the unworthy, and the unlucky. Now the real training begins.",
    category: "Romantasy",
    affiliateUrl: "https://www.amazon.com/dp/1649377576?tag=lunarituals10-20",
    rating: 4.5,
    reviewCount: 89421,
    socialProof: "50K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "The Empyrean #2",
    awards: ["#1 New York Times Bestseller", "Amazon Best Book of 2023"],
    bookDetails: {
      publisher: "Entangled: Red Tower Books",
      pages: 640,
      format: "Paperback",
      language: "English"
    },
    themes: ["Dragon Riders", "War Strategy", "Forbidden Love", "Epic Battles"],
    features: [
      "Instant #1 New York Times bestseller",
      "Sequel to Fourth Wing phenomenon",
      "Even more action-packed than book 1",
      "600+ pages of dragon-filled adventure"
    ],
    similarReads: ["Fourth Wing", "A Court of Mist and Fury", "From Blood and Ash"]
  },
  {
    id: "book-003",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    price: 12.80,
    originalPrice: 18.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-003/styled-1764876338840.png",
    description: "When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world.",
    category: "Romantasy",
    affiliateUrl: "https://www.amazon.com/dp/1635575567?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 117352,
    socialProof: "80K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "A Court of Thorns and Roses #1",
    awards: ["#1 New York Times Bestseller", "Goodreads Choice Award Nominee"],
    bookDetails: {
      publisher: "Bloomsbury YA",
      pages: 432,
      format: "Paperback",
      language: "English"
    },
    themes: ["Beauty and the Beast Retelling", "Fae Romance", "Found Family", "Self-Discovery"],
    features: [
      "#1 New York Times bestselling series",
      "Beauty and the Beast meets high fantasy",
      "Perfect gateway to adult fantasy romance",
      "First book in beloved 5-book series"
    ],
    similarReads: ["Throne of Glass", "From Blood and Ash", "The Cruel Prince"]
  },
  {
    id: "book-004",
    title: "A Court of Mist and Fury",
    author: "Sarah J. Maas",
    price: 12.82,
    originalPrice: 19.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-004/lifestyle-1764876371953.png",
    description: "Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.",
    category: "Romantasy",
    affiliateUrl: "https://www.amazon.com/dp/1635575583?tag=lunarituals10-20",
    rating: 4.9,
    reviewCount: 94218,
    socialProof: "60K+ bought in past month",
    isPrime: true,
    badge: "Top Pick",
    series: "A Court of Thorns and Roses #2",
    awards: ["#1 New York Times Bestseller", "Goodreads Choice Award Winner 2016"],
    bookDetails: {
      publisher: "Bloomsbury YA",
      pages: 640,
      format: "Paperback",
      language: "English"
    },
    themes: ["Healing from Trauma", "Second Chance Romance", "Inner Circle Found Family", "Political Intrigue"],
    features: [
      "Fan-favorite book of the ACOTAR series",
      "Expanded world-building and new characters",
      "Deeper exploration of Feyre's powers",
      "Epic 600+ page fantasy romance"
    ],
    similarReads: ["A Court of Thorns and Roses", "Iron Flame", "Divine Rivals"]
  },
  {
    id: "book-005",
    title: "Crown of Midnight",
    author: "Sarah J. Maas",
    price: 10.16,
    originalPrice: 17.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-005/detail-1764876498062.png",
    description: "Celaena Sardothien won a brutal contest to become the King's Champion. But she is far from loyal to the crown. Though she goes to great lengths to hide her secret, her deadly charade becomes more difficult when she realizes she is not the only one seeking justice.",
    category: "Epic Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1639730974?tag=lunarituals10-20",
    rating: 4.8,
    reviewCount: 32461,
    socialProof: "30K+ bought in past month",
    isPrime: true,
    badge: "Sale",
    series: "Throne of Glass #2",
    awards: ["New York Times Bestseller"],
    bookDetails: {
      publisher: "Bloomsbury YA",
      pages: 432,
      format: "Paperback",
      language: "English"
    },
    themes: ["Secret Identity", "Court Intrigue", "Forbidden Love", "Dark Secrets"],
    features: [
      "Sequel to Throne of Glass",
      "Plot twists and shocking revelations",
      "Deepens Celaena's character development",
      "Sets up epic scope of series"
    ],
    similarReads: ["Throne of Glass", "The Cruel Prince", "Six of Crows"]
  },
  {
    id: "book-006",
    title: "The Cruel Prince",
    author: "Holly Black",
    price: 11.99,
    originalPrice: 18.99,
    image: "/assets/product-book-cruel-prince-1763580000-BgcYhDZR.jpg",
    description: "Jude was seven years old when her parents were murdered and she and her two sisters were stolen away to live in the treacherous High Court of Faerie. Ten years later, Jude wants nothing more than to belong there, despite her mortality. But many of the fey despise humans.",
    category: "Dark Fae Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/031631031X?tag=lunarituals10-20",
    rating: 4.6,
    reviewCount: 67834,
    socialProof: "50K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "The Folk of the Air #1",
    awards: ["#1 New York Times Bestseller", "ALA Top Ten Best Fiction for Young Adults"],
    bookDetails: {
      publisher: "Little, Brown Books for Young Readers",
      pages: 384,
      format: "Paperback",
      language: "English"
    },
    themes: ["Mortal in Fae World", "Political Scheming", "Enemies to Lovers", "Court Intrigue"],
    features: [
      "#1 New York Times bestseller",
      "Holly Black's masterpiece fae series",
      "Cunning mortal vs. cruel faerie prince",
      "Perfect blend of romance and intrigue"
    ],
    similarReads: ["A Court of Thorns and Roses", "The Serpent & the Wings of Night", "Throne of Glass"]
  },
  {
    id: "book-007",
    title: "From Blood and Ash",
    author: "Jennifer L. Armentrout",
    price: 17.59,
    originalPrice: 24.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-007/detail-1764876679754.png",
    description: "Chosen from birth to usher in a new era, Poppy's life has never been her own. The life of the Maiden is solitary. Never to be touched. Never to be looked upon. Never to be spoken to. Never to experience pleasure.",
    category: "Dark Fantasy Romance",
    affiliateUrl: "https://www.amazon.com/dp/1952457769?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 85219,
    socialProof: "40K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "Blood and Ash #1",
    awards: ["Goodreads Choice Award Finalist", "Amazon Charts Bestseller"],
    bookDetails: {
      publisher: "Blue Box Press",
      pages: 618,
      format: "Hardcover",
      language: "English"
    },
    themes: ["Forbidden Romance", "Chosen One", "Vampires", "Dark Fantasy"],
    features: [
      "Instant bestseller phenomenon",
      "Spicy vampire fantasy romance",
      "Epic world-building and plot twists",
      "600+ pages of addictive reading"
    ],
    similarReads: ["A Court of Thorns and Roses", "Fourth Wing", "The Serpent & the Wings of Night"]
  },
  {
    id: "book-008",
    title: "The Serpent & the Wings of Night",
    author: "Carissa Broadbent",
    price: 16.19,
    originalPrice: 21.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-008/styled-1764876797430.png",
    description: "The Hunger Games meets vampires in this heart-wrenching, epic fantasy romance of dark magic, and bloodthirsty intrigue. For humans and vampires, the rules of survival are the same: never trust, never yield, and always – always – guard your heart.",
    category: "Vampire Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1250343186?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 52614,
    socialProof: "30K+ bought in past month",
    isPrime: true,
    badge: "Top Pick",
    series: "The Crowns of Nyaxia #1",
    awards: ["BookTok Viral Sensation", "Indies Today Bestseller"],
    bookDetails: {
      publisher: "Bramble",
      pages: 496,
      format: "Paperback",
      language: "English"
    },
    themes: ["Human Among Vampires", "Tournament to the Death", "Enemies to Lovers", "Dark Romance"],
    features: [
      "Indie bestseller turned traditional",
      "Hunger Games meets vampire romance",
      "Human girl competing against vampires",
      "Dark, addictive, and romantic"
    ],
    similarReads: ["From Blood and Ash", "Fourth Wing", "The Cruel Prince"]
  },
  {
    id: "book-009",
    title: "Divine Rivals",
    author: "Rebecca Ross",
    price: 10.99,
    originalPrice: 19.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-009/detail-1764876853749.png",
    description: "When two young rival journalists find love through a magical connection, they must face the depths of hell, in a war among gods, to seal their fate forever. After centuries of sleep, the gods are warring again.",
    category: "Historical Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1250857430?tag=lunarituals10-20",
    rating: 4.8,
    reviewCount: 38427,
    socialProof: "25K+ bought in past month",
    isPrime: true,
    badge: "Sale",
    series: "Letters of Enchantment #1",
    awards: ["BookTok Award Winner 2023", "Indie Next Pick"],
    bookDetails: {
      publisher: "Wednesday Books",
      pages: 384,
      format: "Paperback",
      language: "English"
    },
    themes: ["Epistolary Romance", "War Correspondents", "Gods at War", "Love Letters"],
    features: [
      "Instant bestseller and BookTok favorite",
      "Romantic fantasy with historical feel",
      "Unique magical letter correspondence",
      "Perfect for fans of slower-burn romance"
    ],
    similarReads: ["A Court of Mist and Fury", "The Song of Achilles", "House of Earth and Blood"]
  },
  {
    id: "book-010",
    title: "House of Earth and Blood",
    author: "Sarah J. Maas",
    price: 9.99,
    originalPrice: 20.00,
    image: "/assets/product-book-house-earth-1763580000-DSyQwIgf.jpg",
    description: "Bryce Quinlan had the perfect life-working hard all day and partying all night-until a demon murdered her closest friends, leaving her bereft, wounded, and alone. When the accused is behind bars but the crimes start up again, Bryce finds herself at the heart of the investigation.",
    category: "Urban Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1635577020?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 71538,
    socialProof: "40K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "Crescent City #1",
    awards: ["#1 New York Times Bestseller", "Goodreads Choice Award Nominee"],
    bookDetails: {
      publisher: "Bloomsbury Publishing",
      pages: 816,
      format: "Paperback",
      language: "English"
    },
    themes: ["Urban Fantasy", "Murder Mystery", "Grief and Healing", "Fated Mates"],
    features: [
      "#1 New York Times bestseller",
      "Modern urban fantasy world",
      "800+ page epic adventure",
      "Combines mystery with fantasy romance"
    ],
    similarReads: ["A Court of Thorns and Roses", "Six of Crows", "Divine Rivals"]
  },
  {
    id: "book-011",
    title: "Six of Crows",
    author: "Leigh Bardugo",
    price: 11.59,
    originalPrice: 18.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-011/lifestyle-1764877004822.png",
    description: "Ketterdam: a bustling hub of international trade where anything can be had for the right price—and no one knows that better than criminal prodigy Kaz Brekker. Kaz is offered a chance at a deadly heist that could make him rich beyond his wildest dreams.",
    category: "Heist Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/125007696X?tag=lunarituals10-20",
    rating: 4.9,
    reviewCount: 94326,
    socialProof: "50K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    series: "Six of Crows #1",
    awards: ["#1 New York Times Bestseller", "ALA Best Fiction for Young Adults"],
    bookDetails: {
      publisher: "Henry Holt and Co.",
      pages: 465,
      format: "Paperback",
      language: "English"
    },
    themes: ["Heist Fantasy", "Found Family", "Multiple POV", "Criminal Underworld"],
    features: [
      "#1 New York Times bestseller",
      "Ocean's Eleven meets fantasy",
      "Six diverse unforgettable characters",
      "Perfect for fans of complex plots"
    ],
    similarReads: ["The Cruel Prince", "Shadow and Bone", "House of Earth and Blood"]
  },
  {
    id: "book-012",
    title: "Shadow and Bone",
    author: "Leigh Bardugo",
    price: 9.99,
    originalPrice: 17.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-012/lifestyle-1764877103129.png",
    description: "Soldier. Summoner. Saint. Follow Alina Starkov through Shadow and Bone, Siege and Storm, and Ruin and Rising as she discovers her dormant powers and is swept up in a world of luxury and illusion.",
    category: "Russian-Inspired Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/125019623X?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 56829,
    socialProof: "30K+ bought in past month",
    isPrime: true,
    badge: "Netflix Series",
    series: "The Shadow and Bone Trilogy",
    awards: ["Netflix Adaptation", "ALA Best Fiction for Young Adults"],
    bookDetails: {
      publisher: "Henry Holt and Co.",
      pages: 912,
      format: "Paperback",
      language: "English"
    },
    themes: ["Chosen One", "Light vs Dark", "Russian-Inspired Fantasy", "Power Corruption"],
    features: [
      "Now a Netflix original series",
      "Complete trilogy in one volume",
      "900+ pages of Grishaverse magic",
      "Perfect introduction to Leigh Bardugo"
    ],
    similarReads: ["Six of Crows", "Throne of Glass", "The Name of the Wind"]
  },
  {
    id: "book-013",
    title: "The Last Wish",
    author: "Andrzej Sapkowski",
    price: 9.99,
    originalPrice: 16.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-013/detail-1764877226868.png",
    description: "Geralt the Witcher—revered and hated—holds the line against the monsters plaguing humanity in this collection of adventures, the first chapter in Andrzej Sapkowski's groundbreaking epic fantasy series that inspired the hit Netflix show and the blockbuster video games.",
    category: "Dark Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0316452467?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 42817,
    socialProof: "20K+ bought in past month",
    isPrime: true,
    badge: "Netflix Series",
    series: "The Witcher #1",
    awards: ["Netflix Adaptation", "International Bestseller"],
    bookDetails: {
      publisher: "Orbit",
      pages: 384,
      format: "Paperback",
      language: "English"
    },
    themes: ["Monster Hunter", "Dark Fantasy", "Moral Ambiguity", "Slavic Folklore"],
    features: [
      "Inspired Netflix series & video games",
      "Classic dark fantasy series",
      "Complex moral dilemmas",
      "Interconnected short stories"
    ],
    similarReads: ["The Name of the Wind", "From Blood and Ash", "The Serpent & the Wings of Night"]
  },
  {
    id: "book-014",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    price: 10.99,
    originalPrice: 18.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-014/lifestyle-1764877293053.png",
    description: "This is the riveting first-person narrative of Kvothe, a young man who grows to be one of the most notorious magicians his world has ever seen. From his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a crime-ridden city.",
    category: "Epic Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0756405890?tag=lunarituals10-20",
    rating: 4.8,
    reviewCount: 68524,
    socialProof: "35K+ bought in past month",
    isPrime: true,
    badge: "Top Pick",
    series: "The Kingkiller Chronicle #1",
    awards: ["Quill Award Winner", "Publishers Weekly Best Book"],
    bookDetails: {
      publisher: "DAW",
      pages: 662,
      format: "Paperback",
      language: "English"
    },
    themes: ["Magical University", "Unreliable Narrator", "Music and Magic", "Coming of Age"],
    features: [
      "Modern fantasy masterpiece",
      "Beautifully written prose",
      "Complex magic system",
      "Frame narrative storytelling"
    ],
    similarReads: ["The Last Wish", "Shadow and Bone", "Six of Crows"]
  },
  {
    id: "book-015",
    title: "Circe",
    author: "Madeline Miller",
    price: 8.49,
    originalPrice: 18.00,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-015/styled-1764877444363.png",
    description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child -- not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power.",
    category: "Mythological Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0316556327?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 128456,
    socialProof: "60K+ bought in past month",
    isPrime: true,
    badge: "Best Seller",
    awards: ["#1 New York Times Bestseller", "Goodreads Choice Award Winner"],
    bookDetails: {
      publisher: "Back Bay Books",
      pages: 400,
      format: "Paperback",
      language: "English"
    },
    themes: ["Greek Mythology", "Feminist Retelling", "Isolation & Independence", "Witch Magic"],
    features: [
      "#1 New York Times bestseller",
      "Gorgeous feminist retelling",
      "Beautifully lyrical prose",
      "Perfect for mythology lovers"
    ],
    similarReads: ["The Song of Achilles", "Divine Rivals", "A Court of Thorns and Roses"]
  },
  {
    id: "book-016",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 10.99,
    originalPrice: 17.00,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-016/lifestyle-1764877473510.png",
    description: "A thrilling, profoundly moving, and utterly unique retelling of the legend of Achilles and the Trojan War from the bestselling author of Circe. A tale of gods, kings, immortal fame, and the human heart.",
    category: "Mythological Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0062060627?tag=lunarituals10-20",
    rating: 4.8,
    reviewCount: 142638,
    socialProof: "70K+ bought in past month",
    isPrime: true,
    badge: "Award Winner",
    awards: ["Orange Prize Winner", "#1 New York Times Bestseller"],
    bookDetails: {
      publisher: "Ecco",
      pages: 416,
      format: "Paperback",
      language: "English"
    },
    themes: ["Greek Mythology", "Epic Love Story", "Trojan War", "Friendship & Devotion"],
    features: [
      "Winner of the Orange Prize",
      "Heart-wrenching romance",
      "Achilles & Patroclus love story",
      "Beautiful literary fantasy"
    ],
    similarReads: ["Circe", "Divine Rivals", "House of Earth and Blood"]
  },
  {
    id: "book-017",
    title: "Heir of Fire",
    author: "Sarah J. Maas",
    price: 9.97,
    originalPrice: 17.99,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/books/book-017/detail-1764877589253.png",
    description: "The heir of ash and fire bows to no one. A new threat rises in the third book in this complete, #1 bestselling Throne of Glass series. Celaena Sardothien has survived deadly contests and shattering heartbreak, but now she must travel to a new land to confront her darkest truth.",
    category: "Epic Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1639730990?tag=lunarituals10-20",
    rating: 4.8,
    reviewCount: 29543,
    socialProof: "25K+ bought in past month",
    isPrime: true,
    badge: "Sale",
    series: "Throne of Glass #3",
    awards: ["New York Times Bestseller"],
    bookDetails: {
      publisher: "Bloomsbury YA",
      pages: 576,
      format: "Paperback",
      language: "English"
    },
    themes: ["Identity Discovery", "Training Montage", "Fire Magic", "Self-Acceptance"],
    features: [
      "Third book in Throne of Glass series",
      "Major character revelations",
      "Expands the series world-building",
      "Fan-favorite entry in series"
    ],
    similarReads: ["Throne of Glass", "Crown of Midnight", "A Court of Mist and Fury"]
  }
];
