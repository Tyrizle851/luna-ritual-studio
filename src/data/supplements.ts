import productSupplement1 from "@/assets/product-supplement-1.jpg";
import productSupplement2 from "@/assets/product-supplement-2.jpg";
import productSupplementCollagen from "@/assets/product-supplement-vital-proteins-collagen-1763495213.jpg";
import productSupplementMatcha from "@/assets/product-supplement-domatcha-organic-1763495293.jpg";
import productSupplementMagnesium from "@/assets/product-supplement-magnesium-glycinate-1763495348.jpg";
import productSupplementWomensMulti from "@/assets/product-supplement-megafood-womens-multi-1763495431.jpg";
import productSupplementStress from "@/assets/product-supplement-olly-stress-gummies-1763495510.jpg";
import productSupplementOmega3 from "@/assets/product-supplement-nature-made-omega3-1763495589.jpg";
import productSupplementHairSkinNails from "@/assets/product-supplement-hair-skin-nails-1763495678.jpg";
import productSupplementProbiotic from "@/assets/product-supplement-garden-probiotic-1763495710.jpg";
import productSupplementVitaminD from "@/assets/product-supplement-vitamin-d3-1763495743.jpg";
import productSupplementBComplex from "@/assets/product-supplement-solgar-b-complex-1763495878.jpg";
import productSupplementPrenatal from "@/assets/product-supplement-nature-made-prenatal-1763495925.jpg";
import productSupplementLionsMane from "@/assets/product-supplement-four-sigmatic-lions-mane-1763495976.jpg";
import productSupplementElderberry from "@/assets/product-supplement-elderberry-gummies-1763496014.jpg";
import productSupplementBiotin from "@/assets/product-supplement-biotin-softgels-1763496073.jpg";
import productSupplementTurmeric from "@/assets/product-supplement-turmeric-curcumin-1763496116.jpg";

export interface Supplement {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  price: number;
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
    servings: "20 servings",
    image: productSupplementCollagen,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B09RQBHRCT?tag=lunarituals10-20",
  },
  {
    id: "sup-002",
    name: "DoMatcha Organic Matcha Powder",
    category: "Energy & Focus",
    description: "Authentic Japanese green tea, latte grade. Organic summer harvest matcha powder.",
    benefits: ["Natural energy", "Mental clarity", "Antioxidants"],
    price: 49.95,
    servings: "2.82 oz",
    image: productSupplementMatcha,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B003O7T87C?tag=lunarituals10-20",
  },
  {
    id: "sup-003",
    name: "Doctor's Best Magnesium Glycinate",
    category: "Sleep Support",
    description: "High absorption magnesium for sleep and muscle relaxation. 100% chelated.",
    benefits: ["Better sleep", "Muscle relaxation", "Stress relief"],
    price: 19.79,
    servings: "240 tablets",
    image: productSupplementMagnesium,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000BD0RT0?tag=lunarituals10-20",
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
    name: "OLLY Goodbye Stress Gummy",
    category: "Mental Wellness",
    description: "Stress relief supplement with GABA, L-Theanine and lemon balm. Berry flavor.",
    benefits: ["Stress relief", "Calm mind", "Relaxation"],
    price: 11.47,
    servings: "42 count",
    image: productSupplementStress,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B01M1HYRNJ?tag=lunarituals10-20",
  },
  {
    id: "sup-006",
    name: "Nature Made Fish Oil Omega 3",
    category: "Heart Health",
    description: "1200mg Omega 3 fish oil softgels for healthy heart support.",
    benefits: ["Heart health", "Brain function", "Joint support"],
    price: 12.69,
    servings: "100 softgels",
    image: productSupplementOmega3,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0000DJAQU?tag=lunarituals10-20",
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
    name: "Solgar B-Complex 100",
    category: "Energy & Vitality",
    description: "B-Complex vitamins for nervous system support and energy metabolism. Vegan and kosher.",
    benefits: ["Energy boost", "Mental clarity", "Nervous system support"],
    price: 38.94,
    servings: "250 capsules",
    image: productSupplementBComplex,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B00014D33Q?tag=lunarituals10-20",
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
    name: "Four Sigmatic Lion's Mane Focus Elixir",
    category: "Mental Wellness",
    description: "Organic lion's mane mushroom powder with rhodiola. Immune and memory support.",
    benefits: ["Mental focus", "Memory support", "Immune health"],
    price: 30.39,
    servings: "20 packets",
    image: productSupplementLionsMane,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B00LA6MIIK?tag=lunarituals10-20",
  },
  {
    id: "sup-013",
    name: "Nature's Way Sambucus Elderberry Gummies",
    category: "Immunity",
    description: "Immune support gummies with black elderberry extract, Vitamin C, D3 and zinc.",
    benefits: ["Immune support", "Antioxidants", "Vitamin boost"],
    price: 12.38,
    servings: "60 gummies",
    image: productSupplementElderberry,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B00MJ7VL1O?tag=lunarituals10-20",
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
    name: "NatureWise Curcumin Turmeric 2250mg",
    category: "Wellness",
    description: "95% curcuminoids with BioPerine black pepper extract for advanced absorption. Joint and immune support.",
    benefits: ["Joint health", "Immune support", "Anti-inflammatory"],
    price: 14.99,
    servings: "90 capsules",
    image: productSupplementTurmeric,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B01BMDAVB6?tag=lunarituals10-20",
  },
];
