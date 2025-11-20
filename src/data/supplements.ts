import productSupplement1 from "@/assets/product-supplement-1.jpg";
import productSupplement2 from "@/assets/product-supplement-2.jpg";
import productSupplementCollagen from "@/assets/product-supplement-vital-proteins-collagen-1763495213.jpg";
import productCoffeeLavazza from "@/assets/product-coffee-lavazza-super-crema.jpg";
import productSupplementMatcha from "@/assets/product-supplement-domatcha-organic-1763495293.jpg";
import productSupplementMatchaLatte from "@/assets/product-supplement-matcha-latte-jade-leaf-1763495350.jpg";
import productSupplementHibiscusTea from "@/assets/product-supplement-hibiscus-tea-fgo-1763495410.jpg";
import productSupplementSleepTea from "@/assets/product-supplement-sleep-tea-traditional-1763495470.jpg";
import productSupplementWomensMulti from "@/assets/product-supplement-megafood-womens-multi-1763495431.jpg";
import productSupplementStress from "@/assets/product-supplement-olly-stress-gummies-1763495510.jpg";
import productCoffeeNespressoVariety from "@/assets/product-coffee-nespresso-variety.jpg";
import productSupplementHairSkinNails from "@/assets/product-supplement-hair-skin-nails-1763495678.jpg";
import productSupplementProbiotic from "@/assets/product-supplement-garden-probiotic-1763495710.jpg";
import productSupplementVitaminD from "@/assets/product-supplement-vitamin-d3-1763495743.jpg";
import productSupplementBComplex from "@/assets/product-supplement-solgar-b-complex-1763495878.jpg";
import productSupplementPrenatal from "@/assets/product-supplement-nature-made-prenatal-1763495925.jpg";
import productCoffeeRyzeMushroom from "@/assets/product-coffee-ryze-mushroom.jpg";
import productSupplementElderberry from "@/assets/product-supplement-elderberry-gummies-1763496014.jpg";
import productSupplementBiotin from "@/assets/product-supplement-biotin-softgels-1763496073.jpg";
import productCoffeeNespressoBarista from "@/assets/product-coffee-nespresso-barista.jpg";

export interface Supplement {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  price: number;
  originalPrice?: number;
  badge?: string;
  servings: string;
  image: string;
  inStock: boolean;
  affiliateUrl?: string;
}

export const supplements: Supplement[] = [
  {
    id: "sup-001",
    name: "Vital Proteins Collagen Peptides",
    category: "Skin & Hair",
    description: "Supports hair, nail, skin, bone & joint health. Unflavored collagen protein powder.",
    benefits: ["Glowing skin", "Healthy hair", "Strong nails", "Joint support"],
    price: 20.52,
    originalPrice: 28.99,
    badge: "Best Seller",
    servings: "20 servings",
    image: productSupplementCollagen,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B09RQBHRCT?tag=lunarituals10-20",
  },
  {
    id: "sup-002",
    name: "Lavazza Super Crema Whole Bean Coffee",
    category: "Energy & Focus",
    description: "Medium espresso roast coffee, Arabica and Robusta blend. #1 Best Seller in Roasted Coffee Beans. 80K+ bought in past month.",
    benefits: ["Rich espresso flavor", "Premium Italian blend", "Perfect for morning rituals"],
    price: 21.41,
    servings: "2.2 lb bag",
    image: productCoffeeLavazza,
    inStock: true,
    affiliateUrl: "https://amzn.to/49NCDo7",
  },
  {
    id: "sup-003",
    name: "Naoki Matcha Superior Ceremonial Blend",
    category: "Energy & Focus",
    description: "Authentic Japanese First Harvest Ceremonial Grade Matcha Green Tea Powder from Uji, Kyoto. Amazon's Choice. 10K+ bought in past month.",
    benefits: ["Natural energy boost", "Mental clarity", "Antioxidant rich"],
    price: 24.99,
    originalPrice: 32.99,
    badge: "Top Pick",
    servings: "1.4 oz (40g)",
    image: productSupplementMatcha,
    inStock: true,
    affiliateUrl: "https://amzn.to/486p3JF",
  },
  {
    id: "sup-004",
    name: "MegaFood Women's One Daily Multivitamin",
    category: "Women's Health",
    description: "Multivitamin for women with Vitamin C, D, Iron & B vitamins. Bone and energy support.",
    benefits: ["Energy metabolism", "Immune support", "Bone health"],
    price: 20.99,
    servings: "30 tablets",
    image: productSupplementWomensMulti,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000E9ZEL2?tag=lunarituals10-20",
  },
  {
    id: "sup-005",
    name: "Jade Leaf Matcha Organic Premium Ceremonial Grade",
    category: "Energy & Focus",
    description: "Matcha Green Tea Powder - Japanese - Culinary, Ingredient, Ceremonial Barista Teahouse, Latte, Collagen. Amazon's Choice. 10K+ bought in past month. Black Friday Deal -20%.",
    benefits: ["Sustained energy", "Focus enhancement", "USDA Organic"],
    price: 7.99,
    originalPrice: 9.99,
    badge: "Sale",
    servings: "5.3 oz (150g)",
    image: productSupplementMatchaLatte,
    inStock: true,
    affiliateUrl: "https://amzn.to/4pp4SOh",
  },
  {
    id: "sup-006",
    name: "Nespresso Capsules Vertuo, Variety Pack",
    category: "Energy & Focus",
    description: "Medium and dark roast coffee pods for Vertuo machines. Amazon's Choice. 100K+ bought in past month.",
    benefits: ["Convenient coffee pods", "Variety of roasts", "Premium coffee experience"],
    price: 45.70,
    servings: "30 count",
    image: productCoffeeNespressoVariety,
    inStock: true,
    affiliateUrl: "https://amzn.to/4rbBeOe",
  },
  {
    id: "sup-007",
    name: "Nature's Bounty Hair, Skin & Nails",
    category: "Beauty",
    description: "Argan-infused vitamin supplement with biotin and hyaluronic acid.",
    benefits: ["Healthy hair", "Glowing skin", "Strong nails"],
    price: 11.66,
    servings: "150 softgels",
    image: productSupplementHairSkinNails,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0072F8D7S?tag=lunarituals10-20",
  },
  {
    id: "sup-008",
    name: "Garden of Life Primal Defense Ultra",
    category: "Digestive Health",
    description: "Probiotics for digestive health balance. 15 billion CFU and 13 strains.",
    benefits: ["Digestive balance", "Immune support", "Gut health"],
    price: 40.94,
    originalPrice: 49.99,
    badge: "Best Value",
    servings: "90 capsules",
    image: productSupplementProbiotic,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000GWG8FS?tag=lunarituals10-20",
  },
  {
    id: "sup-009",
    name: "NatureWise Vitamin D3",
    category: "Immunity",
    description: "5000iu Vitamin D3 for immune support and bone health. Non-GMO, in organic olive oil.",
    benefits: ["Immune support", "Bone health", "Muscle function"],
    price: 14.99,
    servings: "360 count",
    image: productSupplementVitaminD,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B00GB85JR4?tag=lunarituals10-20",
  },
  {
    id: "sup-010",
    name: "FGO Organic Hibiscus Tea",
    category: "Wellness",
    description: "100 Count, Eco-Conscious Tea Bags, Caffeine Free. Amazon's Choice. 7K+ bought in past month. Black Friday Deal -15%.",
    benefits: ["Heart health support", "Vitamin C rich", "Caffeine free"],
    price: 17.84,
    servings: "100 tea bags",
    image: productSupplementHibiscusTea,
    inStock: true,
    affiliateUrl: "https://amzn.to/4rsQB5d",
  },
  {
    id: "sup-011",
    name: "Nature Made Prenatal Multivitamin",
    category: "Prenatal",
    description: "Prenatal vitamin with folic acid and minerals for daily nutritional support during pregnancy.",
    benefits: ["Prenatal support", "Folic acid", "Essential minerals"],
    price: 26.99,
    servings: "250 tablets",
    image: productSupplementPrenatal,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B001F1G6SI?tag=lunarituals10-20",
  },
  {
    id: "sup-012",
    name: "RYZE Mushroom Coffee",
    category: "Mental Wellness",
    description: "#1 Mushroom Coffee with 6 adaptogenic mushrooms and MCT oil. USDA Organic instant coffee for better energy, focus, digestion and immunity with Lion's Mane & Turkey Tail. 60K+ bought in past month.",
    benefits: ["Mental clarity", "Sustained energy", "Digestive support", "Immunity boost"],
    price: 44.99,
    originalPrice: 54.99,
    badge: "Sale",
    servings: "30 servings",
    image: productCoffeeRyzeMushroom,
    inStock: true,
    affiliateUrl: "https://amzn.to/3XF2gjn",
  },
  {
    id: "sup-013",
    name: "Traditional Medicinals Organic Nighty Night Extra Tea",
    category: "Sleep Support",
    description: "Deeply Relaxing Sleep Support with Valerian Root for Relaxation. Amazon's Choice. 10K+ bought in past month.",
    benefits: ["Sleep support", "Relaxation", "Caffeine free"],
    price: 5.03,
    servings: "16 tea bags",
    image: productSupplementSleepTea,
    inStock: true,
    affiliateUrl: "https://amzn.to/3XrxhYh",
  },
  {
    id: "sup-014",
    name: "Nature's Bounty Biotin 10,000 mcg",
    category: "Beauty",
    description: "Biotin vitamins for healthy hair, skin and nails. Rapid release softgels.",
    benefits: ["Hair growth", "Skin health", "Nail strength"],
    price: 7.88,
    servings: "120 softgels",
    image: productSupplementBiotin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B009SZXM4E?tag=lunarituals10-20",
  },
  {
    id: "sup-015",
    name: "Nespresso Capsules Vertuo, Barista Flavored Pack",
    category: "Energy & Focus",
    description: "Medium roast coffee pods with barista flavors. Amazon's Choice. 60K+ bought in past month.",
    benefits: ["Flavored coffee varieties", "Barista-quality", "Easy brewing"],
    price: 42.00,
    servings: "30 count",
    image: productCoffeeNespressoBarista,
    inStock: true,
    affiliateUrl: "https://amzn.to/483mCYn",
  },
];
