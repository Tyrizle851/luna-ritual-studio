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
import productKneeHighBoots from "@/assets/product-fashion-boots-knee-high-lifestyle.jpg";
import productOverKneeBoots from "@/assets/product-fashion-boots-knee-high.jpg";
import productBelts3Pack from "@/assets/product-fashion-belts-3pack.jpg";
import productBlackJeans from "@/assets/product-black-jeans.jpg";
import productBlueJeggings from "@/assets/product-blue-jeggings.jpg";
import productYogaPants from "@/assets/product-yoga-pants.jpg";
import productPlaidShacket from "@/assets/product-plaid-shacket.jpg";
import productBrownSweater from "@/assets/product-brown-sweater.jpg";
import productPomBeanie from "@/assets/product-pom-beanie.jpg";
import productWinterSet from "@/assets/product-winter-set.jpg";
import productPufferCoat from "@/assets/product-puffer-coat.jpg";
import productHoopEarrings from "@/assets/product-hoop-earrings.jpg";

import productLinenPantsNew from "@/assets/product-fashion-linen-pants-1763573400.jpg";
import productCardiganNew from "@/assets/product-fashion-cardigan-1763573400.jpg";
import productSaddleBag from "@/assets/product-fashion-saddle-bag-1763573400.jpg";
import productScrunchiesNew from "@/assets/product-fashion-scrunchies-1763573400.jpg";
import productFedoraNew from "@/assets/product-fashion-fedora-1763573400.jpg";
import productSunglassesNew from "@/assets/product-fashion-sunglasses-1763573400.jpg";

export interface FashionProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
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
    originalPrice: 42.99,
    badge: "Best Seller",
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
    originalPrice: 39.99,
    badge: "Top Pick",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Caramel", "Black", "Champagne", "Navy"],
    image: productSilkSleepSet,
    inStock: true,
    affiliateUrl: "https://amzn.to/4i3els4",
  },
  {
    id: "fsh-005",
    name: "Dainty Silver Cross Necklace",
    brand: "LunaRituals",
    category: "Jewelry",
    description: "Elevate your everyday style with this delicate silver cross necklace. Featuring sparkling crystals on a dainty chain, it adds a touch of refined elegance to any outfit. Perfect for layering or wearing alone, this versatile piece transitions seamlessly from day to night.",
    price: 16.99,
    image: productGoldNecklace,
    inStock: true,
    affiliateUrl: "https://amzn.to/4o2CksP",
  },
  {
    id: "fsh-006",
    name: "Stretch Pull-On Skinny Jeans",
    brand: "LunaRituals",
    category: "Bottoms",
    description: "Effortlessly stylish distressed denim jeggings that combine comfort with edge. Features a stretchy pull-on waistband for all-day ease and trendy ripped details for that perfectly lived-in look. Available in regular and plus sizes to flatter every figure.",
    price: 21.97,
    sizes: ["S", "M", "L", "XL", "1X", "2X", "3X"],
    colors: ["Dark Wash"],
    image: productCottonTee,
    inStock: true,
    affiliateUrl: "https://amzn.to/4oODvxj",
  },
  {
    id: "fsh-007",
    name: "Vansha High Waisted Linen Palazzo Pants",
    brand: "Vansha",
    category: "Bottoms",
    description: "Summer high waisted cotton linen palazzo pants. Wide leg lounge trousers with convenient pockets. Breathable fabric perfect for warm weather comfort and effortless boho style.",
    price: 19.99,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Beige", "White", "Black"],
    image: productLinenPantsNew,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B09YVFLNVP?tag=lunarituals10-20",
  },
  {
    id: "fsh-008",
    name: "PRETTYGARDEN Chunky Knit Cardigan",
    brand: "PRETTYGARDEN",
    category: "Knitwear",
    description: "Open front cardigan sweater with button down detail. Chunky cable knit design for cozy fall fashion. Oversized fit perfect for layering over your favorite outfits.",
    price: 36.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Apricot", "Black", "Grey"],
    image: productCardiganNew,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B08DTDPVBL?tag=lunarituals10-20",
  },
  {
    id: "fsh-009",
    name: "AFKOMST Saddle Crossbody Bag",
    brand: "AFKOMST",
    category: "Accessories",
    description: "Small saddle purse with boho charm. Made from high-quality vegan leather. Features a classic flap design and adjustable strap. Perfect for everyday essentials.",
    price: 23.99,
    colors: ["Brown", "Black", "Coffee"],
    image: productSaddleBag,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B07BHC4Q2S?tag=lunarituals10-20",
  },
  {
    id: "fsh-010",
    name: "IVARYSS Satin Sleep Scrunchies (12 Pack)",
    brand: "IVARYSS",
    category: "Accessories",
    description: "Premium satin scrunchies softer than silk. Gentle on hair to prevent breakage and frizz. 12-pack of neutral colors perfect for any outfit or sleepwear.",
    price: 6.99,
    colors: ["Neutrals", "Multicolor"],
    image: productScrunchiesNew,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0CHV6QSDQ?tag=lunarituals10-20",
  },
  {
    id: "fsh-011",
    name: "Gossifan Wide Brim Fedora Hat",
    brand: "Gossifan",
    category: "Accessories",
    description: "Classic wide brim felt panama hat with belt buckle accent. Gradient color design adds a modern touch to a timeless style. Adjustable fit for all-day comfort.",
    price: 30.99,
    colors: ["Camel", "Black", "Gradient"],
    image: productFedoraNew,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B09QRWVFZ3?tag=lunarituals10-20",
  },
  {
    id: "fsh-012",
    name: "SOJOS Retro Oval Polarized Sunglasses",
    brand: "SOJOS",
    category: "Accessories",
    description: "Chic 90s retro oval sunglasses with gold metal frame. Polarized lenses provide UV400 protection. Lightweight and durable for everyday style.",
    price: 14.99,
    image: productSunglassesNew,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0FBWGSQMM?tag=lunarituals10-20",
  },
  {
    id: "fsh-013",
    name: "DREAM PAIRS Women's Knee High Boots",
    brand: "DREAM PAIRS",
    category: "Shoes",
    description: "Classic knee-high pull-on boots perfect for fall and winter. Features a comfortable fit, versatile design, and quality construction. Ideal for pairing with jeans, dresses, or skirts for effortless seasonal style.",
    price: 48.99,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Brown", "Taupe"],
    image: productKneeHighBoots,
    inStock: true,
    affiliateUrl: "https://amzn.to/4i9RQ4U",
  },
  {
    id: "fsh-014",
    name: "DREAM PAIRS Over The Knee Thigh High Boots",
    brand: "DREAM PAIRS",
    category: "Shoes",
    description: "Sleek over-the-knee boots with chunky heel for all-day comfort. Stretchy design creates a flattering silhouette while the block heel provides stability. Perfect statement piece for fall and winter outfits.",
    price: 42.99,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Grey", "Brown"],
    image: productOverKneeBoots,
    inStock: true,
    affiliateUrl: "https://amzn.to/4r6M8Vq",
  },
  {
    id: "fsh-015",
    name: "XZQTIVE 3 Pack Women Belts for Jeans",
    brand: "XZQTIVE",
    category: "Accessories",
    description: "Versatile 3-pack leather waist belts with elegant gold buckles. Perfect for jeans, dresses, and pants. Classic design works for casual or professional settings. Essential wardrobe staple in three coordinating colors.",
    price: 24.89,
    colors: ["Black", "Brown", "Cream"],
    image: productBelts3Pack,
    inStock: true,
    affiliateUrl: "https://amzn.to/4r3cqb3",
  },
  {
    id: "fsh-016",
    name: "High Waisted Skinny Jeans",
    brand: "LunaRituals",
    category: "Bottoms",
    description: "Classic black high-waisted skinny jeans with stretch comfort. Perfect for everyday wear with a flattering fit that hugs your curves. Features a button closure and timeless design that pairs with everything in your wardrobe.",
    price: 24.99,
    sizes: ["S", "M", "L", "XL", "1X", "2X", "3X"],
    colors: ["Black"],
    image: productBlackJeans,
    inStock: true,
    affiliateUrl: "https://amzn.to/4nY2ZXH",
  },
  {
    id: "fsh-017",
    name: "High Waist Stretchy Jeggings",
    brand: "LunaRituals",
    category: "Bottoms",
    description: "Ultra-comfortable stretchy jeggings with tummy control and a flattering high waist design. The perfect blend of style and comfort with functional pockets. Casual yet polished enough for any occasion.",
    price: 24.99,
    sizes: ["S", "M", "L", "XL", "1X", "2X"],
    colors: ["Dark Denim"],
    image: productBlueJeggings,
    inStock: true,
    affiliateUrl: "https://amzn.to/4p5ZYGp",
  },
  {
    id: "fsh-018",
    name: "High Waist Yoga Pants",
    brand: "LunaRituals",
    category: "Activewear",
    description: "Soft stretch casual straight leg bottoms designed for all-day comfort. Features a high waist for support and flattering fit. Perfect for yoga, lounging, or casual outings with their versatile straight leg design.",
    price: 32.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    image: productYogaPants,
    inStock: true,
    affiliateUrl: "https://amzn.to/3X6sOKe",
  },
  {
    id: "fsh-019",
    name: "Plaid Shacket Jacket",
    brand: "LunaRituals",
    category: "Outerwear",
    description: "Cozy fall fashion meets classic style with this plaid flannel shacket. Features a button-down front and relaxed fit perfect for layering. The timeless camel and cream plaid pattern adds sophistication to any casual outfit.",
    price: 29.89,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Camel Plaid", "Grey Plaid"],
    image: productPlaidShacket,
    inStock: true,
    affiliateUrl: "https://amzn.to/4oRYm2I",
  },
  {
    id: "fsh-020",
    name: "Oversized Batwing Sweater",
    brand: "LunaRituals",
    category: "Knitwear",
    description: "Trendy oversized crewneck knit pullover with distinctive side slit design and batwing sleeves. This fashion-forward sweater offers cozy comfort with an elevated asymmetric hemline. Perfect for creating effortless 2025 fall outfits.",
    price: 36.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Black", "Grey"],
    image: productBrownSweater,
    inStock: true,
    affiliateUrl: "https://amzn.to/4r7zl52",
  },
  {
    id: "fsh-021",
    name: "Faux Fur Pom Beanie Hat",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Cozy winter warmth meets timeless style with this knitted beanie featuring a luxurious faux fur pom. The warm knit skull cap design provides comfortable coverage while the statement fur pom adds a playful touch. Perfect for cold weather fashion.",
    price: 12.99,
    colors: ["Cream", "Black", "Grey", "Camel"],
    image: productPomBeanie,
    inStock: true,
    affiliateUrl: "https://amzn.to/48j4qeG",
  },
  {
    id: "fsh-022",
    name: "Winter Accessories Gift Set",
    brand: "LunaRituals",
    category: "Accessories",
    description: "Complete winter essentials in one beautiful set: fleece-lined beanie, cozy long scarf, touchscreen-compatible gloves, and plush earmuffs. All crafted in soft knit fabric with warm fleece lining. The perfect 4-in-1 gift set for staying warm and stylish all winter.",
    price: 29.99,
    colors: ["Cream", "Black", "Grey"],
    image: productWinterSet,
    inStock: true,
    affiliateUrl: "https://amzn.to/3X5G3Ld",
  },
  {
    id: "fsh-023",
    name: "Hooded Puffer Parka Coat",
    brand: "LunaRituals",
    category: "Outerwear",
    description: "Stay warm and chic with this thickened fleece-lined down jacket featuring a detachable faux fur hood. The waterproof parka design offers premium winter protection with a flattering silhouette. Practical pockets and adjustable drawstrings complete this essential cold-weather coat.",
    price: 69.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Army Green"],
    image: productPufferCoat,
    inStock: true,
    affiliateUrl: "https://amzn.to/4r5zRk9",
  },
  {
    id: "fsh-024",
    name: "14K Gold Plated Chunky Hoops",
    brand: "LunaRituals",
    category: "Jewelry",
    description: "Elevate your everyday look with these hypoallergenic 14K gold plated chunky hoop earrings. Lightweight design perfect for sensitive ears, these non-tarnish huggie hoops are versatile enough for stacking or wearing alone. The set includes 3 pairs for endless styling options.",
    price: 8.99,
    image: productHoopEarrings,
    inStock: true,
    affiliateUrl: "https://amzn.to/43DMw3I",
  },
];
