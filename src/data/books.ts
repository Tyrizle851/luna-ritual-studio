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
  image: string;
  description: string;
  category: string;
  affiliateUrl: string;
  rating: number;
}

export const books: Book[] = [
  {
    id: "book-000",
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    price: 16.88,
    image: throneOfGlassImage,
    description: "A captivating fantasy epic about Celaena Sardothien, a legendary assassin who must compete for her freedom in a deadly tournament. Perfect for those who crave adventure, romance, and a fierce heroine who will stop at nothing to reclaim her destiny.",
    category: "Fantasy",
    affiliateUrl: "https://amzn.to/4hTBnBz",
    rating: 4.9
  },
  {
    id: "book-001",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    price: 16.99,
    image: bookFourthWing,
    description: "Enter the brutal and elite world of a war college for dragon riders. Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1649377371?tag=lunarituals10-20",
    rating: 4.8
  },
  {
    id: "book-002",
    title: "Iron Flame",
    author: "Rebecca Yarros",
    price: 17.99,
    image: bookIronFlame,
    description: "Everyone expected Violet Sorrengail to die during her first year at Basgiath War College—Violet included. But Threshing was only the first impossible test meant to weed out the weak-willed, the unworthy, and the unlucky. Now the real training begins.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1649377576?tag=lunarituals10-20",
    rating: 4.7
  },
  {
    id: "book-003",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    price: 12.80,
    image: bookAcotar,
    description: "When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1635575567?tag=lunarituals10-20",
    rating: 4.6
  },
  {
    id: "book-004",
    title: "A Court of Mist and Fury",
    author: "Sarah J. Maas",
    price: 12.82,
    image: bookAcomaf,
    description: "Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1635575583?tag=lunarituals10-20",
    rating: 4.9
  },
  {
    id: "book-005",
    title: "Crown of Midnight",
    author: "Sarah J. Maas",
    price: 10.16,
    image: bookCrownMidnight,
    description: "Celaena Sardothien won a brutal contest to become the King's Champion. But she is far from loyal to the crown. Though she goes to great lengths to hide her secret, her deadly charade becomes more difficult when she realizes she is not the only one seeking justice.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1639730974?tag=lunarituals10-20",
    rating: 4.8
  },
  {
    id: "book-006",
    title: "The Cruel Prince",
    author: "Holly Black",
    price: 11.99,
    image: bookCruelPrince,
    description: "Jude was seven years old when her parents were murdered and she and her two sisters were stolen away to live in the treacherous High Court of Faerie. Ten years later, Jude wants nothing more than to belong there, despite her mortality. But many of the fey despise humans.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/031631031X?tag=lunarituals10-20",
    rating: 4.5
  },
  {
    id: "book-007",
    title: "From Blood and Ash",
    author: "Jennifer L. Armentrout",
    price: 17.59,
    image: bookBloodAsh,
    description: "Chosen from birth to usher in a new era, Poppy's life has never been her own. The life of the Maiden is solitary. Never to be touched. Never to be looked upon. Never to be spoken to. Never to experience pleasure.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1952457769?tag=lunarituals10-20",
    rating: 4.7
  },
  {
    id: "book-008",
    title: "The Serpent & the Wings of Night",
    author: "Carissa Broadbent",
    price: 16.19,
    image: bookSerpentWings,
    description: "The Hunger Games meets vampires in this heart-wrenching, epic fantasy romance of dark magic, and bloodthirsty intrigue. For humans and vampires, the rules of survival are the same: never trust, never yield, and always – always – guard your heart.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1250343186?tag=lunarituals10-20",
    rating: 4.6
  },
  {
    id: "book-009",
    title: "Divine Rivals",
    author: "Rebecca Ross",
    price: 10.99,
    image: bookDivineRivals,
    description: "When two young rival journalists find love through a magical connection, they must face the depths of hell, in a war among gods, to seal their fate forever. After centuries of sleep, the gods are warring again.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1250857430?tag=lunarituals10-20",
    rating: 4.8
  },
  {
    id: "book-010",
    title: "House of Earth and Blood",
    author: "Sarah J. Maas",
    price: 9.99,
    image: bookHouseEarth,
    description: "Bryce Quinlan had the perfect life-working hard all day and partying all night-until a demon murdered her closest friends, leaving her bereft, wounded, and alone. When the accused is behind bars but the crimes start up again, Bryce finds herself at the heart of the investigation.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1635577020?tag=lunarituals10-20",
    rating: 4.7
  },
  {
    id: "book-011",
    title: "Six of Crows",
    author: "Leigh Bardugo",
    price: 11.59,
    image: bookSixCrows,
    description: "Ketterdam: a bustling hub of international trade where anything can be had for the right price—and no one knows that better than criminal prodigy Kaz Brekker. Kaz is offered a chance at a deadly heist that could make him rich beyond his wildest dreams.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/125007696X?tag=lunarituals10-20",
    rating: 4.9
  },
  {
    id: "book-012",
    title: "Shadow and Bone",
    author: "Leigh Bardugo",
    price: 9.99,
    image: bookShadowBone,
    description: "Soldier. Summoner. Saint. Follow Alina Starkov through Shadow and Bone, Siege and Storm, and Ruin and Rising as she discovers her dormant powers and is swept up in a world of luxury and illusion.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/125019623X?tag=lunarituals10-20",
    rating: 4.6
  },
  {
    id: "book-013",
    title: "The Last Wish",
    author: "Andrzej Sapkowski",
    price: 9.99,
    image: bookWitcher,
    description: "Geralt the Witcher—revered and hated—holds the line against the monsters plaguing humanity in this collection of adventures, the first chapter in Andrzej Sapkowski’s groundbreaking epic fantasy series that inspired the hit Netflix show and the blockbuster video games.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0316452467?tag=lunarituals10-20",
    rating: 4.7
  },
  {
    id: "book-014",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    price: 10.99,
    image: bookNameWind,
    description: "This is the riveting first-person narrative of Kvothe, a young man who grows to be one of the most notorious magicians his world has ever seen. From his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a crime-riddled city.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0756405890?tag=lunarituals10-20",
    rating: 4.8
  },
  {
    id: "book-015",
    title: "Circe",
    author: "Madeline Miller",
    price: 8.49,
    image: bookCirce,
    description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child -- not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0316556327?tag=lunarituals10-20",
    rating: 4.7
  },
  {
    id: "book-016",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 10.99,
    image: bookSongAchilles,
    description: "A thrilling, profoundly moving, and utterly unique retelling of the legend of Achilles and the Trojan War from the bestselling author of Circe. A tale of gods, kings, immortal fame, and the human heart.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/0062060627?tag=lunarituals10-20",
    rating: 4.8
  },
  {
    id: "book-017",
    title: "Heir of Fire",
    author: "Sarah J. Maas",
    price: 9.97,
    image: bookHeirFire,
    description: "The heir of ash and fire bows to no one. A new threat rises in the third book in this complete, #1 bestselling Throne of Glass series. Celaena Sardothien has survived deadly contests and shattering heartbreak, but now she must travel to a new land to confront her darkest truth.",
    category: "Fantasy",
    affiliateUrl: "https://www.amazon.com/dp/1639730990?tag=lunarituals10-20",
    rating: 4.8
  }
];
