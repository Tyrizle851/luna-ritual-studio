import productCandle1 from "@/assets/product-candle-1.jpg";
import productCandle2 from "@/assets/product-candle-2.jpg";
import productCandleBalsamCedar from "@/assets/product-candle-yankee-balsam-cedar-1763492326.jpg";
import productCandleVanillaBean from "@/assets/product-candle-vanilla-bean.jpg";
import productCandleVanillaPumpkin from "@/assets/product-candle-vanilla-pumpkin.jpg";
import productCandleChristmasSet from "@/assets/product-candle-christmas-set.jpg";
import productCandleSpicedPumpkin from "@/assets/product-candle-yankee-spiced-pumpkin-1763492171.jpg";
import productCandleChesapeakeBay from "@/assets/product-candle-chesapeake-bay.jpg";
import productCandleChristmasGiftSet from "@/assets/product-candle-christmas-gift-set.jpg";
import productCandleAoovooLavender from "@/assets/product-candle-aoovoo-lavender.jpg";
import productCandleSpark from "@/assets/product-candle-yankee-sparkling-cinnamon-1763493407.jpg";
import productCandleCiderhouse from "@/assets/product-candle-yankee-ciderhouse-1763493736.jpg";
import productCandleHarvest from "@/assets/product-candle-yankee-harvest-1763493609.jpg";
import productCandleApplePumpkin from "@/assets/product-candle-yankee-apple-pumpkin-1763493836.jpg";
import productCandleAutumnLeaves from "@/assets/product-candle-yankee-autumn-leaves-1763493819.jpg";
import productCandlePumpkinNutmeg from "@/assets/product-candle-woodwick-pumpkin-nutmeg-1763493885.jpg";
import productCandleOrangeCinnamon from "@/assets/product-candle-cheerful-orange-cinnamon-1763493936.jpg";
import productCandleVillageSpicedPumpkin from "@/assets/product-candle-village-spiced-pumpkin-1763493969.jpg";
import productCandleAutumnLodge from "@/assets/product-candle-yankee-autumn-lodge-1763494001.jpg";
import productCandleMulledCider from "@/assets/product-candle-village-mulled-cider-1763494031.jpg";
import productCandleHarvestClassic from "@/assets/product-candle-yankee-harvest-classic-1763494062.jpg";
import productCandleAutumnOrchards from "@/assets/product-candle-cheerful-autumn-orchards-1763494093.jpg";

export interface Candle {
  id: string;
  name: string;
  brand: string;
  scent: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  burnTime: string;
  image: string;
  inStock: boolean;
  affiliateUrl?: string;
  rating?: number;
  reviewCount?: number;
  socialProof?: string;
  isPrime?: boolean;
  scentProfile?: string;
  features?: string[];
  certifications?: string[]; // Quality badges like "Natural Soy", "Lead-Free Wick"
  productDetails?: {
    waxType: string;
    wickType: string;
    jarType: string;
    madeIn: string;
  };
  usageIdeas?: string[];
}

export const candles: Candle[] = [
  // **PAGE 1: BEST PICKS** - Highest rated, most popular, best sellers
  {
    id: "cnd-001",
    name: "Yankee Candle Balsam & Cedar Large Jar",
    brand: "Yankee Candle",
    scent: "Fresh, Woody",
    description: "Timeless classic fall scented candle. Pine balsam mingles with brisk cedarwood, evoking a forest stroll. Warm amber base notes offer comfort and calm. 22oz large jar with 150 hour burn time. #1 Best Seller in Jar Candles. 30K+ bought in past month.",
    price: 14.99,
    originalPrice: 24.99,
    badge: "Best Seller",
    burnTime: "150 hours",
    image: productCandleBalsamCedar,
    inStock: true,
    affiliateUrl: "https://amzn.to/43yPmai",
    rating: 4.6,
    reviewCount: 36611,
    socialProof: "40K+ bought in past month",
    isPrime: true,
    scentProfile: "Crisp pine balsam and brisk cedarwood create an invigorating forest walk experience. Warm amber base notes add comfort and depth, creating a feeling of groundedness and connection to nature. Perfect for creating a cozy cabin atmosphere during fall and winter months.",
    features: [
      "Premium plant wax blend for consistent fragrance",
      "Natural-fiber wick for optimal fragrance performance",
      "110-150 hours of room-filling fragrance",
      "Classic glass jar with metal lid",
      "More fragrance in every burn",
      "Made in USA with globally sourced materials"
    ],
    productDetails: {
      waxType: "Premium plant wax blend",
      wickType: "Natural fiber wick",
      jarType: "Classic glass jar with lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Create a cozy cabin atmosphere in living rooms and bedrooms",
      "Set the mood for fall gatherings and holiday entertaining",
      "Gift for housewarming, holidays, or candle enthusiasts",
      "Layer with other woody scents for enhanced forest ambiance"
    ],
    certifications: ["Made in USA", "Natural Wax"]
  },
  {
    id: "cnd-002",
    name: "WoodWick Vanilla Bean Hourglass Candle",
    brand: "WoodWick",
    scent: "Sweet, Warm",
    description: "Holiday candle featuring a distinctive crackling wood wick that mimics a cozy fireplace. Rich, creamy vanilla bean fragrance fills your space. 9.7 oz medium hourglass jar with elegant design. Perfect gift for women and men. 60 hour burn time.",
    price: 17.99,
    burnTime: "60 hours",
    image: productCandleVanillaBean,
    inStock: true,
    affiliateUrl: "https://amzn.to/43EdcRX",
    rating: 4.6,
    reviewCount: 9660,
    socialProof: "2K+ bought in past month",
    isPrime: true,
    scentProfile: "Decadent vanilla bean scent infused with notes of pure sugar cane. Creates an enchanting, warm aroma that fills your home with comfort and sweetness. The multi-sensory crackling wick adds auditory relaxation to the olfactory experience.",
    features: [
      "Distinctive Pluswick Innovation creates signature crackling sound",
      "Premium soy-paraffin blend ensures clean, consistent burn",
      "Iconic hourglass shape with wooden lid enhances home decor",
      "Made in USA for quality and authenticity",
      "60 hours of burn time",
      "Ideal gift for friends or yourself"
    ],
    productDetails: {
      waxType: "Premium soy-paraffin blend",
      wickType: "Wooden wick (Pluswick Innovation)",
      jarType: "Hourglass glass jar with wooden lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Create a warm, inviting ambiance for cozy evenings at home",
      "Perfect for aromatherapy and stress relief during bath time",
      "Gift for holidays, birthdays, or special occasions",
      "Enhance meditation or yoga practice with calming scent and sound"
    ],
    certifications: ["Made in USA", "Wooden Wick"]
  },
  {
    id: "cnd-003",
    name: "Vanilla Pumpkin Fall Aromatherapy Candle",
    brand: "Auelife",
    scent: "Sweet, Spiced",
    description: "Autumn-inspired aromatherapy candle blending sweet vanilla with warming pumpkin spice. Creates an inviting, cozy atmosphere perfect for fall relaxation. 7 oz candle with 50 hour burn time. Amazon's Choice for seasonal home fragrance.",
    price: 13.59,
    originalPrice: 16.99,
    burnTime: "50 hours",
    image: productCandleVanillaPumpkin,
    inStock: true,
    affiliateUrl: "https://amzn.to/3X6xpfs",
    rating: 4.0,
    reviewCount: 5407,
    socialProof: "2K+ bought in past month",
    isPrime: true,
    scentProfile: "Embrace the essence of autumn with a harmonious blend of vanilla and comforting pumpkin notes. Reminiscent of freshly baked pumpkin pie straight from the oven, this fragrance effortlessly evokes the unique charm of fall and welcomes the season into your home.",
    features: [
      "100% natural soy wax for clean burn and long-lasting fragrance",
      "7 oz jar candle burns for approximately 50 hours",
      "Aromatherapy-grade essential oils for authentic fall scent",
      "Handcrafted pour using premium ingredients",
      "Suitable for multiple home styles from farmhouse to modern",
      "Perfect autumn home accessories and seasonal decor"
    ],
    productDetails: {
      waxType: "100% natural soy wax",
      wickType: "Cotton wick",
      jarType: "Glass jar with black lid",
      madeIn: "USA"
    },
    usageIdeas: [
      "Use during crisp autumn days to celebrate the fall season",
      "Perfect for Thanksgiving gatherings and holiday celebrations",
      "Create cozy ambiance around crackling fires with loved ones",
      "Gift for women, men, mom, friends, or coworkers for autumn occasions"
    ],
    certifications: ["Natural Soy Wax", "Cotton Wick"]
  },
  {
    id: "cnd-004",
    name: "Christmas Candles Gift Set - 10 Pack Soy Candles",
    brand: "YINUO LIGHT",
    scent: "Holiday, Varied",
    description: "Long lasting scented soy candles for home relaxation. 10 pack aromatherapy candle collection perfect for holiday and Christmas gifts. Features lavender, vanilla, lemongrass, eucalyptus, and seasonal scents. Amber glass jars with botanical labels. 500+ bought in past month.",
    price: 28.07,
    originalPrice: 40.99,
    badge: "Best Value",
    burnTime: "60 hours per candle",
    image: productCandleChristmasGiftSet,
    inStock: true,
    affiliateUrl: "https://amzn.to/3LQZULF",
    rating: 4.6,
    reviewCount: 6722,
    socialProof: "600+ bought in past month",
    isPrime: true,
    scentProfile: "A collection of 10 premium relaxing scents designed for complete home aromatherapy. Includes cozy fragrances like Lavender, Vanilla, Lemongrass, and Cinnamon Apple, blended with other natural scents that fill your home with warmth and comfort all winter long.",
    features: [
      "10 premium soy candles with 100% natural soy wax and cotton wicks",
      "Clean, even burn for lasting fragrance experience",
      "Aromatherapy-grade scents for mood refreshment and stress relief",
      "Reusable amber glass jars add elegant home decor",
      "Beautifully packaged in holiday gift box",
      "Perfect for meditation, yoga, bath time, or relaxation"
    ],
    productDetails: {
      waxType: "100% natural soy wax",
      wickType: "Cotton wick",
      jarType: "Reusable amber glass jars",
      madeIn: "Handcrafted"
    },
    usageIdeas: [
      "Create cozy holiday home atmosphere in living room, bedroom, or bathroom",
      "Perfect for Christmas gifting to moms, sisters, teachers, coworkers, or friends",
      "Use during festive family gatherings or quiet evenings by the fire",
      "Ideal for relaxation, meditation, and finding balance through the holidays"
    ]
  },
  {
    id: "cnd-005",
    name: "Yankee Candle Spiced Pumpkin Large Jar",
    brand: "Yankee Candle",
    scent: "Warm, Spiced",
    description: "The essence of autumn in a candle. Smooth pumpkin fragrance enhanced with cinnamon, nutmeg, and clove spices. Mellow vanilla and baked aromas create a warm, comforting gourmand scent. 22oz large jar with 150 hour burn time. 10K+ bought in past month.",
    price: 14.99,
    originalPrice: 24.99,
    burnTime: "150 hours",
    image: productCandleSpicedPumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DRTCB2?tag=lunarituals10-20",
    rating: 4.4,
    reviewCount: 11110,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    scentProfile: "The essence of autumn captured in a warm, satisfying gourmand scent. A smooth, comforting fragrance blends pumpkin with notes of cinnamon, nutmeg, and clove. A dash of mellow vanilla and baked aromas round out the base to create the perfect Thanksgiving atmosphere.",
    features: [
      "Premium plant wax blend for optimal fragrance performance",
      "Natural-fiber wick for clean, consistent burn",
      "110-150 hours of room-filling fragrance",
      "More fragrance in every burn",
      "Classic glass jar with metal lid",
      "Made in USA with globally sourced materials"
    ],
    productDetails: {
      waxType: "Premium plant wax blend",
      wickType: "Natural fiber wick",
      jarType: "Classic glass jar with lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Perfect for Thanksgiving dinner preparations and celebrations",
      "Create warm autumn ambiance for fall gatherings",
      "Gift for pumpkin spice lovers and autumn enthusiasts",
      "Layer with other fall scents for enhanced seasonal atmosphere"
    ]
  },
  {
    id: "cnd-006",
    name: "Chesapeake Bay Candle Mind & Body - Relax + Restore",
    brand: "Chesapeake Bay Candle",
    scent: "Sage, Peppermint",
    description: "Medium jar soy wax blend candle with natural essential oils. Sheer Jasmine scent for home décor and relaxation. Features elegant frosted glass and premium wooden lid. Contains pure essential oils poured in USA. 8.8 oz / 250g. 400+ bought in past month.",
    price: 12.99,
    originalPrice: 14.99,
    burnTime: "50 hours",
    image: productCandleChesapeakeBay,
    inStock: true,
    affiliateUrl: "https://amzn.to/3XEZiLK",
    rating: 4.5,
    reviewCount: 45656,
    socialProof: "400+ bought in past month",
    isPrime: true,
    scentProfile: "Quiet your mind with notes of clearing cardamom, herbal sage, and sweet mandarin. The relaxing medley of fresh peppermint, lavender buds, and cedar leaf helps restore tired senses and creates a peaceful sanctuary atmosphere.",
    features: [
      "Natural soy wax blend with essential oils",
      "Self-trimming wicks for easy maintenance",
      "Soft colored frosted jar allows flame light to shine through",
      "Skillfully enhanced with all-natural essential oils",
      "Part of Mind & Body wellness collection",
      "Designed and poured in USA"
    ],
    productDetails: {
      waxType: "Natural soy wax blend",
      wickType: "Self-trimming cotton wick",
      jarType: "Soft frosted glass jar",
      madeIn: "Designed and poured in USA"
    },
    usageIdeas: [
      "Create a peaceful meditation or yoga space",
      "Use during bath time for ultimate relaxation",
      "Perfect for bedrooms to promote restful sleep",
      "Gift for wellness enthusiasts and self-care lovers"
    ]
  },
  {
    id: "cnd-007",
    name: "Yankee Candle Sparkling Cinnamon Large Jar",
    brand: "Yankee Candle",
    scent: "Warm, Spiced",
    description: "Cozy wintertime classic combining spicy cinnamon with warm clove notes. Evokes twinkling lights and intimate gatherings. Perfect for creating an inviting holiday atmosphere. 22oz large jar with 150 hour burn time.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleSpark,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DRYY1N?tag=lunarituals10-20",
    rating: 4.4,
    reviewCount: 11000,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    scentProfile: "A cozy wintertime classic that evokes memories of twinkling lights and intimate gatherings. Spicy cinnamon is combined with warm clove notes to create an inviting holiday atmosphere that welcomes guests into your home.",
    features: [
      "Premium plant wax blend for optimal fragrance performance",
      "Natural-fiber wick for clean, consistent burn",
      "110-150 hours of room-filling fragrance",
      "Classic glass jar with metal lid",
      "Made in USA with globally sourced materials",
      "Perfect for holiday entertaining and gifting"
    ],
    productDetails: {
      waxType: "Premium plant wax blend",
      wickType: "Natural fiber wick",
      jarType: "Classic glass jar with lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Create warm holiday ambiance for Christmas gatherings",
      "Perfect centerpiece for winter dinner parties",
      "Gift for cinnamon and spice fragrance lovers",
      "Layer with other holiday scents for festive atmosphere"
    ]
  },
  {
    id: "cnd-008",
    name: "AOOVOO Lavender Scented Candle with Crystals",
    brand: "AOOVOO",
    scent: "Lavender, Floral",
    description: "Aromatherapy candle for women featuring natural crystals inside. Pure 10 oz soy wax with 10% natural essential oils. 60 hour burn time with elegant white ceramic jar and bamboo lid. Perfect for home relaxation, birthday, or Christmas gifts. Amazon's Choice. 2K+ bought in past month.",
    price: 16.99,
    originalPrice: 21.99,
    burnTime: "60 hours",
    image: productCandleAoovooLavender,
    inStock: true,
    affiliateUrl: "https://amzn.to/3X1rR61",
    rating: 4.5,
    reviewCount: 1127,
    socialProof: "2K+ bought in past month",
    isPrime: true,
    scentProfile: "Pure lavender essential oil creates a calming and relaxing aromatherapy experience. This natural floral scent helps reduce stress, promote better sleep, and create a peaceful sanctuary in your home. Features natural crystals for added wellness benefits.",
    features: [
      "Pure soy wax with 10% natural essential oils",
      "Natural crystals embedded inside candle",
      "Elegant white ceramic jar with bamboo lid",
      "Made with sustainable, renewable materials",
      "ClimeCo Certified carbon neutral product",
      "Amazon's Choice for lavender candles"
    ],
    productDetails: {
      waxType: "100% natural soy wax",
      wickType: "Cotton wick",
      jarType: "White ceramic jar with bamboo lid",
      madeIn: "Designed in USA"
    },
    usageIdeas: [
      "Perfect for meditation, yoga, and relaxation",
      "Use during evening bath time for spa-like experience",
      "Ideal for bedroom to promote restful sleep",
      "Thoughtful gift for birthdays, Christmas, or self-care lovers"
    ]
  },
  {
    id: "cnd-009",
    name: "Yankee Candle Harvest Large Jar",
    brand: "Yankee Candle",
    scent: "Fruity, Warm",
    description: "Captures the essence of autumn harvest with warm, fruity notes. Perfect seasonal fragrance for creating cozy fall ambiance. 22oz large jar delivers 150 hours of room-filling scent. 10K+ bought in past month.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleHarvest,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DPN1R4?tag=lunarituals10-20",
    rating: 4.4,
    reviewCount: 11110,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    scentProfile: "This fall classic charms you with a blend of cinnamon, cloves, and musk, with hints of sweet apples and pumpkin. Captures the essence of autumn harvest with warm, comforting notes that fill your home with seasonal coziness.",
    features: [
      "Premium plant wax blend for optimal fragrance performance",
      "Natural-fiber wick for clean, consistent burn",
      "110-150 hours of room-filling fragrance",
      "More fragrance in every burn",
      "Classic glass jar with metal lid",
      "Made in USA with globally sourced materials"
    ],
    productDetails: {
      waxType: "Premium plant wax blend",
      wickType: "Natural fiber wick",
      jarType: "Classic glass jar with lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Perfect for Thanksgiving dinner preparations and celebrations",
      "Create warm autumn ambiance for fall gatherings",
      "Gift for seasonal fragrance lovers and autumn enthusiasts",
      "Layer with other fall scents for enhanced seasonal atmosphere"
    ]
  },
  {
    id: "cnd-010",
    name: "Yankee Candle Apple Pumpkin Large Jar",
    brand: "Yankee Candle",
    scent: "Sweet, Fruity",
    description: "Delightful fall blend of crisp, fresh apple with warm pumpkin. Sweet and fruity fragrance perfect for autumn gatherings. 22oz large jar provides 150 hours of seasonal comfort. 10K+ bought in past month.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleApplePumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DQHQ9K?tag=lunarituals10-20",
    rating: 4.4,
    reviewCount: 11110,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    scentProfile: "A delightful autumn blend that combines the crispness of fresh picked apples with the warmth of pumpkin and seasonal spices. This sweet, fruity fragrance creates a welcoming atmosphere perfect for fall gatherings and cozy evenings at home.",
    features: [
      "Premium plant wax blend for optimal fragrance performance",
      "Natural-fiber wick for clean, consistent burn",
      "110-150 hours of room-filling fragrance",
      "More fragrance in every burn",
      "Classic glass jar with metal lid",
      "Made in USA with globally sourced materials"
    ],
    productDetails: {
      waxType: "Premium plant wax blend",
      wickType: "Natural fiber wick",
      jarType: "Classic glass jar with lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Perfect for fall entertaining and dinner parties",
      "Create welcoming autumn ambiance in living spaces",
      "Gift for apple and pumpkin scent enthusiasts",
      "Layer with other harvest scents for full seasonal experience"
    ]
  },
  {
    id: "cnd-011",
    name: "Yankee Candle Autumn Leaves Large Jar",
    brand: "Yankee Candle",
    scent: "Earthy, Crisp",
    description: "Captures the earthy essence of crisp autumn leaves underfoot. Fresh, outdoor-inspired scent brings nature indoors. 22oz large jar offers 150 hours of fall atmosphere. 10K+ bought in past month.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleAutumnLeaves,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DQ4Z9J?tag=lunarituals10-20",
    rating: 4.4,
    reviewCount: 11110,
    socialProof: "10K+ bought in past month",
    isPrime: true,
    scentProfile: "Experience the essence of a crisp autumn walk through falling leaves. This earthy, fresh fragrance captures the outdoor beauty of fall foliage with woody notes and hints of dried herbs, bringing the natural wonder of autumn indoors.",
    features: [
      "Premium plant wax blend for optimal fragrance performance",
      "Natural-fiber wick for clean, consistent burn",
      "110-150 hours of room-filling fragrance",
      "More fragrance in every burn",
      "Classic glass jar with metal lid",
      "Made in USA with globally sourced materials"
    ],
    productDetails: {
      waxType: "Premium plant wax blend",
      wickType: "Natural fiber wick",
      jarType: "Classic glass jar with lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Perfect for creating outdoor-inspired ambiance indoors",
      "Ideal for nature lovers and autumn enthusiasts",
      "Use in entryways to welcome guests with seasonal scent",
      "Layer with other earthy scents for full fall experience"
    ]
  },
  {
    id: "cnd-012",
    name: "WoodWick Pumpkin Nutmeg Crackling Candle",
    brand: "WoodWick",
    scent: "Sweet, Spiced",
    description: "Fall-inspired pumpkin nutmeg fragrance enhanced by signature crackling wood wick. Creates cozy fireplace ambiance. 10oz jar with elegant wooden lid. 50 hour burn time.",
    price: 15.99,
    burnTime: "50 hours",
    image: productCandlePumpkinNutmeg,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B08846RTGF?tag=lunarituals10-20",
    rating: 4.5,
    reviewCount: 8500,
    isPrime: true,
    scentProfile: "A cozy blend of sweet pumpkin and warm nutmeg spice creates the perfect autumn atmosphere. Enhanced by WoodWick's signature wooden wick that crackles as it burns, mimicking the sound of a crackling fireplace for ultimate relaxation.",
    features: [
      "Signature wooden wick creates soothing crackling sound",
      "Premium soy-paraffin wax blend",
      "10oz medium jar with elegant wooden lid",
      "Unique hourglass shape for enhanced fragrance",
      "50 hours of burn time",
      "Perfect for creating cozy ambiance"
    ],
    productDetails: {
      waxType: "Premium soy-paraffin wax blend",
      wickType: "Signature crackling wooden wick",
      jarType: "Hourglass glass jar with wooden lid",
      madeIn: "Quality crafted"
    },
    usageIdeas: [
      "Perfect for creating fireplace ambiance without a fireplace",
      "Ideal for cozy autumn and winter evenings",
      "Great gift for pumpkin spice lovers",
      "Use during reading time or relaxation for soothing crackle sounds"
    ]
  },
  {
    id: "cnd-013",
    name: "A Cheerful Giver Orange Cinnamon Clove Papa Jar",
    brand: "A Cheerful Giver",
    scent: "Warm, Spiced",
    description: "Festive holiday blend of zesty orange, warm cinnamon, and aromatic clove. Extra-large 34oz Papa jar delivers exceptional value with 155 hour burn time. Perfect for extended seasonal enjoyment.",
    price: 28,
    burnTime: "155 hours",
    image: productCandleOrangeCinnamon,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B005S4LKNO?tag=lunarituals10-20",
    rating: 4.6,
    reviewCount: 3200,
    isPrime: true,
    scentProfile: "A festive and inviting blend of zesty orange peel, warm cinnamon sticks, and aromatic clove creates the perfect holiday atmosphere. This classic seasonal combination fills your home with comforting warmth and joyful memories of holiday gatherings.",
    features: [
      "Extra-large 34oz Papa jar for extended burn time",
      "Premium wax blend for consistent fragrance throw",
      "155 hours of burn time - exceptional value",
      "Part of Keepers of the Light collection",
      "Made with high-quality fragrance oils",
      "Perfect for large rooms and open spaces"
    ],
    productDetails: {
      waxType: "Premium paraffin wax blend",
      wickType: "Cotton wick",
      jarType: "Large glass Papa jar with lid",
      madeIn: "Made in USA"
    },
    usageIdeas: [
      "Perfect centerpiece for holiday entertaining",
      "Ideal for large living rooms and open floor plans",
      "Creates festive atmosphere for Christmas gatherings",
      "Long-lasting gift for the holiday season"
    ]
  },
  {
    id: "cnd-014",
    name: "Village Candle Spiced Pumpkin Apothecary Jar",
    brand: "Village Candle",
    scent: "Sweet, Spiced",
    description: "Classic spiced pumpkin fragrance in elegant apothecary-style jar. High-quality wax blend for consistent scent throw. Large 21.25oz size provides 105 hours of autumn ambiance.",
    price: 17.99,
    burnTime: "105 hours",
    image: productCandleVillageSpicedPumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B002YX0GAA?tag=lunarituals10-20",
  },
  {
    id: "cnd-015",
    name: "Yankee Candle Autumn Lodge Large Jar",
    brand: "Yankee Candle",
    scent: "Woody, Cozy",
    description: "Evokes the warmth of a rustic mountain lodge with rich woody notes and cozy undertones. Perfect for creating cabin-inspired ambiance. Large jar delivers 110 hours of comforting fragrance. Only 6 left in stock.",
    price: 37.99,
    burnTime: "110 hours",
    image: productCandleAutumnLodge,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B007N454XY?tag=lunarituals10-20",
    rating: 4.5,
    reviewCount: 850,
    socialProof: "Limited stock - only 6 left",
    scentProfile: "Experience the cozy warmth of a rustic mountain lodge retreat. Rich woody notes are balanced with warm, inviting undertones that evoke crackling fires and comfortable leather chairs. This USA exclusive scent creates an intimate cabin atmosphere in any room.",
    features: [
      "Paraffin-grade wax for clear, consistent burn",
      "110-150 hours of burn time",
      "Classic large jar design (22 oz)",
      "USA Exclusive fragrance",
      "Measures 4\"W x 7\"H",
      "Long-burning for extended enjoyment"
    ],
    productDetails: {
      waxType: "Paraffin-grade wax",
      wickType: "Cotton wick",
      jarType: "Classic glass jar",
      madeIn: "Quality crafted"
    },
    usageIdeas: [
      "Perfect for creating cabin or lodge ambiance",
      "Ideal for cozy autumn and winter evenings",
      "Great for man caves and rustic-themed spaces",
      "Pair with plaid blankets and flannel for ultimate coziness"
    ]
  },
  {
    id: "cnd-016",
    name: "Village Candle Mulled Cider Apothecary Jar",
    brand: "Village Candle",
    scent: "Spiced, Warm",
    description: "Warm mulled cider fragrance infused with festive holiday spices. Reminiscent of simmering apple cider with cinnamon sticks. Large 21.25oz apothecary jar offers 105 hours of seasonal warmth. 3K+ reviews.",
    price: 21.95,
    burnTime: "105 hours",
    image: productCandleMulledCider,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B001J6O6FE?tag=lunarituals10-20",
    rating: 4.6,
    reviewCount: 3231,
    isPrime: true,
    scentProfile: "Experience the comforting aroma of warm mulled apple cider simmering on the stove. This festive blend combines sweet apples with cinnamon sticks, cloves, and aromatic spices, creating the perfect holiday atmosphere that fills your home with seasonal warmth.",
    features: [
      "Clean-burning premium wax blend",
      "Large 21.25 oz apothecary jar",
      "105 hours of burn time",
      "Part of Village Candle's premium collection",
      "Elegant apothecary-style glass jar",
      "Made with high-quality fragrance oils"
    ],
    productDetails: {
      waxType: "Premium paraffin wax blend",
      wickType: "Cotton wick",
      jarType: "Large apothecary glass jar",
      madeIn: "Quality crafted in USA"
    },
    usageIdeas: [
      "Perfect for holiday entertaining and gatherings",
      "Creates festive autumn and winter atmosphere",
      "Ideal for Thanksgiving and Christmas celebrations",
      "Great gift for apple cider and spice lovers"
    ]
  },
  {
    id: "cnd-017",
    name: "Yankee Candle Harvest Classic Large Jar",
    brand: "Yankee Candle",
    scent: "Fruity, Warm",
    description: "Timeless autumn harvest fragrance featuring warm, fruity notes. Classic seasonal scent perfect for fall traditions. 22oz jar provides over 110 hours of nostalgic harvest atmosphere.",
    price: 34.30,
    burnTime: "110 hours",
    image: productCandleHarvestClassic,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000W3RVA2?tag=lunarituals10-20",
    rating: 4.5,
    reviewCount: 2800,
    isPrime: true,
    scentProfile: "A timeless fall classic that blends cinnamon, cloves, and musk with hints of sweet apples and pumpkin. This nostalgic harvest fragrance captures the essence of autumn traditions and family gatherings, filling your home with warm, comforting memories.",
    features: [
      "Paraffin-grade wax for clear, consistent burn",
      "110-150 hours of burn time",
      "Classic large jar design (22 oz)",
      "100% recyclable in partnership with TerraCycle",
      "Measures 6.6\"H x 4\"D",
      "Long-lasting seasonal fragrance"
    ],
    productDetails: {
      waxType: "Paraffin-grade wax",
      wickType: "Cotton wick",
      jarType: "Classic glass jar",
      madeIn: "Quality crafted"
    },
    usageIdeas: [
      "Perfect for Thanksgiving and fall celebrations",
      "Creates nostalgic atmosphere for family gatherings",
      "Ideal for those who love traditional harvest scents",
      "Layer with other autumn fragrances for full seasonal experience"
    ]
  },
  {
    id: "cnd-018",
    name: "A Cheerful Giver Autumn Orchards Papa Jar",
    brand: "A Cheerful Giver",
    scent: "Fruity, Sweet",
    description: "Sweet autumn orchard fragrance with notes of ripe apples and fall harvest. Extra-large 34oz Papa jar delivers exceptional 155 hour burn time. Perfect for those who love fruity seasonal scents.",
    price: 27.99,
    burnTime: "155 hours",
    image: productCandleAutumnOrchards,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B009D4ZW0M?tag=lunarituals10-20",
  },
];
