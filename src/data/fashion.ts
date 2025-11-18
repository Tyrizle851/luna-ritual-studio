import productLaceBlouse from "@/assets/product-lace-blouse.jpg";
import productLinenRobe from "@/assets/product-linen-robe.jpg";
import productChunkyCardigan from "@/assets/product-chunky-cardigan.jpg";
import productQuiltedShoulderBag from "@/assets/product-quilted-shoulder-bag.jpg";
import productSilkSleepSet from "@/assets/product-silk-sleep-set.jpg";
import productGoldNecklace from "@/assets/product-gold-necklace.jpg";
import productCottonTee from "@/assets/product-cotton-tee.jpg";
import productLinenPants from "@/assets/product-linen-pants.jpg";
import productCashmereCardigan from "@/assets/product-cashmere-cardigan.jpg";
import productLeatherBag from "@/assets/product-leather-bag.jpg";
import productScrunchies from "@/assets/product-scrunchies.jpg";
import productFedora from "@/assets/product-fedora.jpg";
import productSunglasses from "@/assets/product-sunglasses.jpg";
import productLinenShirt from "@/assets/product-linen-shirt.jpg";
import productBeanie from "@/assets/product-beanie.jpg";
import productSlipDress from "@/assets/product-slip-dress.jpg";

export interface FashionProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  sizes?: string[];
  colors?: string[];
  image: string;
  inStock: boolean;
  affiliateUrl?: string;
}

export const fashionProducts: FashionProduct[] = [
  {
    id: "fsh-001",
    name: "Elegant Lace Sleeve Blouse",
    brand: "LunaRituals",
    category: "Tops",
    description: "Sophisticated pleated detail meets delicate lace sleeves in this versatile top. Perfect for elevating your everyday wardrobe with a touch of feminine elegance. Pair with jeans for casual chic or dress pants for the office.",
    price: 14.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Taupe", "Cream", "Sage"],
    image: productLaceBlouse,
    inStock: true,
    affiliateUrl: "https://amzn.to/49Z30au",
  },
  {
    id: "fsh-002",
    name: "Cozy Cable Knit Cardigan",
    brand: "LunaRituals",
    category: "Knitwear",
    description: "Embrace effortless comfort with this chunky cable knit cardigan. Featuring oversized sleeves and classic button closure, it's the perfect layering piece for crisp autumn days. Pair with your favorite jeans for relaxed weekend style.",
    price: 32.98,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Camel", "Grey"],
    image: productChunkyCardigan,
    inStock: true,
    affiliateUrl: "https://amzn.to/4phC9ej",
  },
  {
    id: "fsh-003",
    name: "Quilted Shoulder Bag",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Timeless elegance meets everyday functionality in this retro-inspired quilted bag. The soft clutch underarm design with gold hardware accents makes it perfect for both casual outings and refined occasions. A versatile piece that elevates any outfit.",
    price: 22.99,
    colors: ["Cream", "Black", "Taupe"],
    image: productQuiltedShoulderBag,
    inStock: true,
    affiliateUrl: "https://amzn.to/4r7s5Gs",
  },
  {
    id: "fsh-004",
    name: "Classic Satin Silk Pajama Set",
    brand: "LunaRituals",
    category: "Loungewear",
    description: "Indulge in luxurious comfort with this classic button-down silk pajama set. The smooth satin finish feels incredible against your skin while the timeless design with contrast piping adds sophisticated style to your evening routine. Perfect for unwinding by the fire or enjoying a peaceful night's rest.",
    price: 31.44,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Caramel", "Black", "Champagne", "Navy"],
    image: productSilkSleepSet,
    inStock: true,
    affiliateUrl: "https://amzn.to/4i3els4",
  },
  {
    id: "fsh-005",
    name: "Minimalist Gold Necklace",
    brand: "LunaRituals",
    category: "Jewelry",
    description: "Delicate and timeless",
    price: 68,
    image: productGoldNecklace,
    inStock: true,
  },
  {
    id: "fsh-006",
    name: "Organic Cotton Crew Tee",
    brand: "LunaRituals",
    category: "Basics",
    description: "The perfect tee exists",
    price: 38,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Clay", "Sage"],
    image: productCottonTee,
    inStock: true,
  },
  {
    id: "fsh-007",
    name: "Wide-Leg Linen Pants",
    brand: "LunaRituals",
    category: "Bottoms",
    description: "Comfortable elegance",
    price: 148,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural", "Black", "Navy"],
    image: productLinenPants,
    inStock: true,
  },
  {
    id: "fsh-008",
    name: "Cashmere Wrap Cardigan",
    brand: "LunaRituals",
    category: "Knitwear",
    description: "Softness you can wrap yourself in",
    price: 198,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Camel", "Grey"],
    image: productCashmereCardigan,
    inStock: true,
  },
  {
    id: "fsh-009",
    name: "Leather Crossbody Bag",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Timeless and versatile",
    price: 185,
    colors: ["Tan", "Black", "Cognac"],
    image: productLeatherBag,
    inStock: true,
  },
  {
    id: "fsh-010",
    name: "Silk Hair Scrunchies Set",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Gentle on your hair, kind to your style",
    price: 32,
    colors: ["Mixed Neutrals", "Mixed Pastels"],
    image: productScrunchies,
    inStock: true,
  },
  {
    id: "fsh-011",
    name: "Wool Fedora Hat",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Effortless style for every season",
    price: 78,
    colors: ["Camel", "Black", "Olive"],
    image: productFedora,
    inStock: true,
  },
  {
    id: "fsh-012",
    name: "Bamboo Sunglasses",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Sustainable style meets sun protection",
    price: 95,
    image: productSunglasses,
    inStock: true,
  },
  {
    id: "fsh-013",
    name: "Linen Button-Down Shirt",
    brand: "LunaRituals",
    category: "Tops",
    description: "Breezy elegance for any occasion",
    price: 88,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Natural", "Chambray"],
    image: productLinenShirt,
    inStock: true,
  },
  {
    id: "fsh-014",
    name: "Cashmere Beanie",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Cozy luxury for chilly days",
    price: 58,
    colors: ["Charcoal", "Cream", "Navy"],
    image: productBeanie,
    inStock: true,
  },
  {
    id: "fsh-015",
    name: "Silk Slip Dress",
    brand: "LunaRituals",
    category: "Dresses",
    description: "Effortless elegance that flows",
    price: 178,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Champagne", "Sage"],
    image: productSlipDress,
    inStock: true,
  },
];
