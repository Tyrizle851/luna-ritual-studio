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
  rating?: number;
  reviewCount?: number;
  socialProof?: string;
  isPrime?: boolean;
  keyIngredients?: string[];
  dosageInfo?: string;
  features?: string[];
  certifications?: string[];
  usageIdeas?: string[];
}

export const supplements: Supplement[] = [
  {
    id: "sup-001",
    name: "Vital Proteins Collagen Peptides",
    category: "Skin & Hair",
    description: "Supports hair, nail, skin, bone & joint health. Unflavored collagen protein powder with 20g collagen per serving. Paleo-friendly, Whole30 approved. 100K+ bought in past month.",
    benefits: ["Glowing skin", "Healthy hair", "Strong nails", "Joint support"],
    price: 20.52,
    originalPrice: 28.99,
    badge: "Best Seller",
    servings: "20 servings",
    image: productSupplementCollagen,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B09RQBHRCT?tag=lunarituals10-20",
    rating: 4.4,
    reviewCount: 125000,
    socialProof: "100K+ bought in past month",
    isPrime: true,
    keyIngredients: ["Bovine Collagen Peptides", "20g per serving"],
    dosageInfo: "1-2 scoops daily, mix into hot or cold liquids",
    features: [
      "20g collagen peptides per serving",
      "Supports hair, skin, nails & joints",
      "Paleo-friendly, Whole30 approved",
      "Unflavored - easily mixes into beverages",
      "Grass-fed, pasture-raised bovine collagen",
      "Single ingredient, no additives"
    ],
    certifications: ["Paleo-friendly", "Whole30 Approved", "Gluten-free"],
    usageIdeas: [
      "Mix into morning coffee or smoothie",
      "Add to baked goods or oatmeal",
      "Blend into post-workout protein shake",
      "Stir into tea or juice for daily collagen boost"
    ]
  },
  {
    id: "sup-002",
    name: "Lavazza Super Crema Whole Bean Coffee",
    category: "Energy & Focus",
    description: "Medium espresso roast coffee, Arabica and Robusta blend. #1 Best Seller in Roasted Coffee Beans. 80K+ bought in past month. Classic Italian blend with rich, velvety crema.",
    benefits: ["Rich espresso flavor", "Premium Italian blend", "Perfect for morning rituals"],
    price: 21.41,
    servings: "2.2 lb bag",
    image: productCoffeeLavazza,
    inStock: true,
    affiliateUrl: "https://amzn.to/49NCDo7",
    rating: 4.6,
    reviewCount: 55000,
    socialProof: "80K+ bought in past month",
    isPrime: true,
    keyIngredients: ["60% Arabica beans", "40% Robusta beans"],
    dosageInfo: "Brew as espresso or drip coffee, adjust strength to preference",
    features: [
      "#1 Best Seller in roasted coffee beans",
      "Medium roast intensity",
      "Velvety, full-bodied crema",
      "Classic Italian blend",
      "Whole bean for maximum freshness",
      "Suitable for all brewing methods"
    ],
    certifications: ["Italian quality standards"],
    usageIdeas: [
      "Perfect for morning espresso shots",
      "Create rich lattes and cappuccinos",
      "Use in moka pot for traditional Italian coffee",
      "Grind fresh for pour-over brewing"
    ]
  },
  {
    id: "sup-003",
    name: "Naoki Matcha Superior Ceremonial Blend",
    category: "Energy & Focus",
    description: "Authentic Japanese First Harvest Ceremonial Grade Matcha Green Tea Powder from Uji, Kyoto. Amazon's Choice. 10K+ bought in past month. Premium stone-ground matcha for traditional tea ceremony or modern lattes.",
    benefits: ["Natural energy boost", "Mental clarity", "Antioxidant rich"],
    price: 24.99,
    originalPrice: 32.99,
    badge: "Top Pick",
    servings: "1.4 oz (40g)",
    image: productSupplementMatcha,
    inStock: true,
    affiliateUrl: "https://amzn.to/486p3JF",
    rating: 4.5,
    reviewCount: 8300,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    keyIngredients: ["100% pure ceremonial grade matcha", "From Uji, Kyoto, Japan"],
    dosageInfo: "1-2 teaspoons per serving, whisk with hot water",
    features: [
      "First Harvest ceremonial grade",
      "Authentic from Uji, Kyoto region",
      "Stone-ground for finest texture",
      "Rich in L-theanine for calm energy",
      "EGCG antioxidants for wellness",
      "Vibrant green color, smooth taste"
    ],
    certifications: ["Ceremonial Grade", "Japanese Origin"],
    usageIdeas: [
      "Traditional matcha tea ceremony",
      "Blend into smoothies and lattes",
      "Add to baking for matcha desserts",
      "Create matcha iced beverages"
    ]
  },
  {
    id: "sup-004",
    name: "MegaFood Women's One Daily Multivitamin",
    category: "Women's Health",
    description: "Multivitamin for women with Vitamin C, D, Iron & B vitamins. Bone and energy support. Made with real food, gentle on stomach, can be taken anytime.",
    benefits: ["Energy metabolism", "Immune support", "Bone health"],
    price: 20.99,
    servings: "30 tablets",
    image: productSupplementWomensMulti,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000E9ZEL2?tag=lunarituals10-20",
    rating: 4.5,
    reviewCount: 12000,
    isPrime: true,
    keyIngredients: ["B vitamins", "Vitamin D3", "Iron", "Vitamin C"],
    dosageInfo: "1 tablet daily, can be taken anytime even on empty stomach",
    features: [
      "Made with real food and added nutrients",
      "Gentle on stomach, no nausea",
      "Can be taken anytime, even on empty stomach",
      "Supports energy and immune function",
      "Non-GMO, vegetarian, gluten-free",
      "Tested for 125+ pesticides and herbicides"
    ],
    certifications: ["Non-GMO", "Gluten-free", "Vegetarian", "Tested for purity"],
    usageIdeas: [
      "Take with breakfast for daily nutrition",
      "Keep in purse for on-the-go wellness",
      "Add to morning routine with coffee",
      "Perfect for women with busy lifestyles"
    ]
  },
  {
    id: "sup-005",
    name: "Jade Leaf Matcha Organic Premium Ceremonial Grade",
    category: "Energy & Focus",
    description: "Matcha Green Tea Powder - Japanese - Culinary, Ingredient, Ceremonial Barista Teahouse, Latte, Collagen. Amazon's Choice. 10K+ bought in past month. Black Friday Deal -20%. USDA Organic certified.",
    benefits: ["Sustained energy", "Focus enhancement", "USDA Organic"],
    price: 7.99,
    originalPrice: 9.99,
    badge: "Sale",
    servings: "5.3 oz (150g)",
    image: productSupplementMatchaLatte,
    inStock: true,
    affiliateUrl: "https://amzn.to/4pp4SOh",
    rating: 4.5,
    reviewCount: 55000,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    keyIngredients: ["100% organic Japanese matcha", "Shade-grown green tea"],
    dosageInfo: "1-2 teaspoons per serving, versatile for drinks and recipes",
    features: [
      "USDA Organic certified",
      "Authentic Japanese matcha",
      "Shade-grown for rich flavor",
      "Stone-ground powder",
      "High in antioxidants and L-theanine",
      "Versatile for lattes, smoothies, baking"
    ],
    certifications: ["USDA Organic", "Amazon's Choice"],
    usageIdeas: [
      "Make creamy matcha lattes at home",
      "Blend into morning smoothies",
      "Bake into muffins, cookies, and cakes",
      "Mix with collagen for wellness boost"
    ]
  },
  {
    id: "sup-006",
    name: "Nespresso Capsules Vertuo, Variety Pack",
    category: "Energy & Focus",
    description: "Medium and dark roast coffee pods for Vertuo machines. Amazon's Choice. 100K+ bought in past month. Includes 30 capsules with variety of intensities and roast profiles.",
    benefits: ["Convenient coffee pods", "Variety of roasts", "Premium coffee experience"],
    price: 45.70,
    servings: "30 count",
    image: productCoffeeNespressoVariety,
    inStock: true,
    affiliateUrl: "https://amzn.to/4rbBeOe",
    rating: 4.6,
    reviewCount: 45000,
    socialProof: "100K+ bought in past month",
    isPrime: true,
    keyIngredients: ["Premium Arabica and Robusta coffee blends"],
    dosageInfo: "1 capsule per serving, compatible with Vertuo machines only",
    features: [
      "30 capsules variety pack",
      "Range of intensities and sizes",
      "Hermetically sealed for freshness",
      "Compatible with Vertuo line only",
      "Medium and dark roast options",
      "Convenient single-serve format"
    ],
    certifications: ["Nespresso quality standards"],
    usageIdeas: [
      "Quick morning coffee in seconds",
      "Try different roasts to find your favorite",
      "Perfect for home office coffee breaks",
      "Serve guests variety of coffee options"
    ]
  },
  {
    id: "sup-007",
    name: "Nature's Bounty Hair, Skin & Nails",
    category: "Beauty",
    description: "Argan-infused vitamin supplement with biotin and hyaluronic acid. Supports healthy hair, glowing skin, and strong nails. 150 rapid release softgels.",
    benefits: ["Healthy hair", "Glowing skin", "Strong nails"],
    price: 11.66,
    servings: "150 softgels",
    image: productSupplementHairSkinNails,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0072F8D7S?tag=lunarituals10-20",
    rating: 4.3,
    reviewCount: 42000,
    isPrime: true,
    keyIngredients: ["Biotin 3000 mcg", "Argan oil", "Hyaluronic acid", "Vitamins C & E"],
    dosageInfo: "2 softgels daily with food",
    features: [
      "3000 mcg biotin per serving",
      "Infused with argan oil for beauty",
      "Contains hyaluronic acid",
      "Vitamins C & E for antioxidant support",
      "Rapid release softgels",
      "150 count for 2.5 month supply"
    ],
    certifications: ["Quality tested", "No artificial flavors"],
    usageIdeas: [
      "Take daily for visible beauty results",
      "Combine with collagen for enhanced benefits",
      "Perfect for post-pregnancy hair recovery",
      "Support nail strength if prone to breakage"
    ]
  },
  {
    id: "sup-008",
    name: "Garden of Life Primal Defense Ultra",
    category: "Digestive Health",
    description: "Probiotics for digestive health balance. 15 billion CFU and 13 strains. Ultimate probiotic formula for digestive and immune system health.",
    benefits: ["Digestive balance", "Immune support", "Gut health"],
    price: 40.94,
    originalPrice: 49.99,
    badge: "Best Value",
    servings: "90 capsules",
    image: productSupplementProbiotic,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000GWG8FS?tag=lunarituals10-20",
    rating: 4.6,
    reviewCount: 14000,
    isPrime: true,
    keyIngredients: ["15 billion CFU", "13 probiotic strains", "Prebiotic fiber"],
    dosageInfo: "3 capsules daily, preferably with meals",
    features: [
      "15 billion live cultures per dose",
      "13 different probiotic strains",
      "UltraZorbe capsules for better delivery",
      "Supports digestive and immune health",
      "Includes prebiotic fiber blend",
      "90 capsules for 30-day supply"
    ],
    certifications: ["Third-party tested"],
    usageIdeas: [
      "Take with meals for optimal digestion",
      "Use during or after antibiotic treatment",
      "Support gut health during travel",
      "Maintain daily for immune system wellness"
    ]
  },
  {
    id: "sup-009",
    name: "NatureWise Vitamin D3",
    category: "Immunity",
    description: "5000iu Vitamin D3 for immune support and bone health. Non-GMO, in organic olive oil for better absorption. One-year supply with 360 mini softgels.",
    benefits: ["Immune support", "Bone health", "Muscle function"],
    price: 11.11,
    servings: "360 count",
    image: productSupplementVitaminD,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B00GB85JR4?tag=lunarituals10-20",
    rating: 4.6,
    reviewCount: 105000,
    isPrime: true,
    keyIngredients: ["Vitamin D3 (cholecalciferol) 5000 IU", "Organic olive oil"],
    dosageInfo: "1 softgel daily with food",
    features: [
      "5000 IU high potency vitamin D3",
      "In organic olive oil for superior absorption",
      "Mini softgels - easy to swallow",
      "One-year supply (360 count)",
      "Non-GMO, gluten-free",
      "Third-party tested for purity"
    ],
    certifications: ["Non-GMO", "Gluten-free", "Third-party tested"],
    usageIdeas: [
      "Take daily for year-round immune support",
      "Essential for those with limited sun exposure",
      "Support bone health as you age",
      "Combine with calcium for optimal bone support"
    ]
  },
  {
    id: "sup-010",
    name: "FGO Organic Hibiscus Tea",
    category: "Wellness",
    description: "100 Count, Eco-Conscious Tea Bags, Caffeine Free. Amazon's Choice. 7K+ bought in past month. Black Friday Deal -15%. USDA Organic certified with rich vitamin C content.",
    benefits: ["Heart health support", "Vitamin C rich", "Caffeine free"],
    price: 17.84,
    originalPrice: 21.00,
    servings: "100 tea bags",
    image: productSupplementHibiscusTea,
    inStock: true,
    affiliateUrl: "https://amzn.to/4rsQB5d",
    rating: 4.6,
    reviewCount: 18000,
    socialProof: "7K+ bought in past month",
    isPrime: true,
    keyIngredients: ["100% organic hibiscus flowers"],
    dosageInfo: "Steep 1 tea bag in hot water for 5-7 minutes",
    features: [
      "USDA Organic certified",
      "100 eco-conscious tea bags",
      "Caffeine-free herbal tea",
      "Rich in vitamin C and antioxidants",
      "Tart, cranberry-like flavor",
      "Individually wrapped for freshness"
    ],
    certifications: ["USDA Organic", "Amazon's Choice", "Eco-conscious packaging"],
    usageIdeas: [
      "Brew hot for warming winter tea",
      "Steep and chill for refreshing iced tea",
      "Add honey or sweetener to balance tartness",
      "Perfect evening tea - naturally caffeine-free"
    ]
  },
  {
    id: "sup-011",
    name: "Nature Made Prenatal Multivitamin",
    category: "Prenatal",
    description: "Prenatal vitamin with folic acid and minerals for daily nutritional support during pregnancy. 250 tablets for over 8 months of prenatal nutrition. #1 Pharmacist Recommended.",
    benefits: ["Prenatal support", "Folic acid", "Essential minerals"],
    price: 26.99,
    servings: "250 tablets",
    image: productSupplementPrenatal,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B001F1G6SI?tag=lunarituals10-20",
    rating: 4.7,
    reviewCount: 38000,
    isPrime: true,
    keyIngredients: ["Folic acid 800 mcg", "Iron", "DHA", "Vitamins & minerals"],
    dosageInfo: "1 tablet daily with food",
    features: [
      "#1 Pharmacist Recommended vitamin brand",
      "800 mcg folic acid for neural development",
      "Iron for healthy red blood cell production",
      "23 essential vitamins and minerals",
      "250 count - over 8 months supply",
      "Gluten-free, no synthetic dyes"
    ],
    certifications: ["USP Verified", "Gluten-free"],
    usageIdeas: [
      "Start before conception for optimal preparation",
      "Take throughout pregnancy for complete nutrition",
      "Continue during breastfeeding",
      "Pair with prenatal DHA supplement"
    ]
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
    rating: 4.3,
    reviewCount: 28000,
    socialProof: "60K+ bought in past month",
    isPrime: true,
    keyIngredients: ["6 adaptogenic mushrooms", "Lion's Mane", "Turkey Tail", "MCT oil", "Organic arabica coffee"],
    dosageInfo: "1 tablespoon mixed with hot water daily",
    features: [
      "6 functional mushrooms blend",
      "Half the caffeine of regular coffee",
      "USDA Organic certified",
      "Includes MCT oil for sustained energy",
      "Instant - no brewing required",
      "Smooth, less acidic than regular coffee"
    ],
    certifications: ["USDA Organic", "Vegan", "Non-GMO"],
    usageIdeas: [
      "Replace morning coffee for calm focus",
      "Mix into smoothies or lattes",
      "Pre-workout drink for sustained energy",
      "Afternoon pick-me-up without jitters"
    ]
  },
  {
    id: "sup-013",
    name: "Traditional Medicinals Organic Nighty Night Extra Tea",
    category: "Sleep Support",
    description: "Deeply Relaxing Sleep Support with Valerian Root for Relaxation. Amazon's Choice. 10K+ bought in past month. Caffeine-free herbal tea blend for restful sleep.",
    benefits: ["Sleep support", "Relaxation", "Caffeine free"],
    price: 5.03,
    servings: "16 tea bags",
    image: productSupplementSleepTea,
    inStock: true,
    affiliateUrl: "https://amzn.to/3XrxhYh",
    rating: 4.5,
    reviewCount: 15000,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    keyIngredients: ["Valerian root", "Passionflower", "Chamomile", "Lemon balm"],
    dosageInfo: "Steep 1 tea bag for 10-15 minutes before bedtime",
    features: [
      "Contains relaxing valerian root",
      "USDA Organic certified",
      "Caffeine-free herbal blend",
      "Non-GMO Project Verified",
      "Kosher certified",
      "Individually wrapped tea bags"
    ],
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Kosher", "Amazon's Choice"],
    usageIdeas: [
      "Drink 30 minutes before bedtime",
      "Part of relaxing evening wind-down routine",
      "Add honey for natural sweetness",
      "Combine with meditation or reading"
    ]
  },
  {
    id: "sup-014",
    name: "Nature's Bounty Biotin 10,000 mcg",
    category: "Beauty",
    description: "Biotin vitamins for healthy hair, skin and nails. Rapid release softgels. 120 count for 120-day supply. Supports energy metabolism and healthy hair growth.",
    benefits: ["Hair growth", "Skin health", "Nail strength"],
    price: 7.88,
    servings: "120 softgels",
    image: productSupplementBiotin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B009SZXM4E?tag=lunarituals10-20",
    rating: 4.5,
    reviewCount: 78000,
    isPrime: true,
    keyIngredients: ["Biotin (Vitamin B7) 10,000 mcg"],
    dosageInfo: "1 softgel daily, preferably with a meal",
    features: [
      "10,000 mcg high-potency biotin",
      "Rapid release softgels for quick absorption",
      "Supports hair, skin, and nail health",
      "Aids in energy metabolism",
      "120 count for 4-month supply",
      "No artificial flavors or sweeteners"
    ],
    certifications: ["Quality tested", "No artificial ingredients"],
    usageIdeas: [
      "Take daily for visible hair and nail results",
      "Support hair growth and thickness",
      "Strengthen brittle nails",
      "Combine with collagen for enhanced beauty benefits"
    ]
  },
  {
    id: "sup-015",
    name: "Nespresso Capsules Vertuo, Barista Flavored Pack",
    category: "Energy & Focus",
    description: "Medium roast coffee pods with barista flavors. Amazon's Choice. 60K+ bought in past month. Variety pack includes caramel, vanilla, and hazelnut flavored coffees.",
    benefits: ["Flavored coffee varieties", "Barista-quality", "Easy brewing"],
    price: 42.00,
    servings: "30 count",
    image: productCoffeeNespressoBarista,
    inStock: true,
    affiliateUrl: "https://amzn.to/483mCYn",
    rating: 4.6,
    reviewCount: 25000,
    socialProof: "60K+ bought in past month",
    isPrime: true,
    keyIngredients: ["Premium Arabica coffee", "Natural flavors"],
    dosageInfo: "1 capsule per serving, compatible with Vertuo machines only",
    features: [
      "30 flavored capsules variety pack",
      "Barista-inspired flavor profiles",
      "Medium roast for balanced taste",
      "Hermetically sealed aluminum capsules",
      "Compatible with Vertuo line only",
      "Sustainable and recyclable"
    ],
    certifications: ["Nespresso quality standards", "Recyclable aluminum"],
    usageIdeas: [
      "Enjoy flavored lattes without syrups",
      "Perfect for afternoon coffee treat",
      "Entertain guests with variety",
      "Satisfy sweet cravings with zero sugar flavored coffee"
    ]
  },
];
