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
  burnTime: string;
  image: string;
  inStock: boolean;
  affiliateUrl?: string;
}

export const candles: Candle[] = [
  {
    id: "cnd-001",
    name: "Yankee Candle Balsam & Cedar Large Jar",
    brand: "Yankee Candle",
    scent: "Fresh, Woody",
    description: "Timeless classic fall scented candle. Pine balsam mingles with brisk cedarwood, evoking a forest stroll. Warm amber base notes offer comfort and calm. 22oz large jar with 150 hour burn time. #1 Best Seller in Jar Candles. 30K+ bought in past month.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleBalsamCedar,
    inStock: true,
    affiliateUrl: "https://amzn.to/43yPmai",
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
  },
  {
    id: "cnd-003",
    name: "Vanilla Pumpkin Fall Aromatherapy Candle",
    brand: "Auelife",
    scent: "Sweet, Spiced",
    description: "Autumn-inspired aromatherapy candle blending sweet vanilla with warming pumpkin spice. Creates an inviting, cozy atmosphere perfect for fall relaxation. 7 oz candle with 50 hour burn time. Amazon's Choice for seasonal home fragrance.",
    price: 16.99,
    burnTime: "50 hours",
    image: productCandleVanillaPumpkin,
    inStock: true,
    affiliateUrl: "https://amzn.to/3X6xpfs",
  },
  {
    id: "cnd-004",
    name: "Christmas Candles Gift Set - 10 Pack Soy Candles",
    brand: "YINUO LIGHT",
    scent: "Holiday, Varied",
    description: "Long lasting scented soy candles for home relaxation. 10 pack aromatherapy candle collection perfect for holiday and Christmas gifts. Features lavender, vanilla, lemongrass, eucalyptus, and seasonal scents. Amber glass jars with botanical labels. 500+ bought in past month.",
    price: 35.99,
    burnTime: "60 hours per candle",
    image: productCandleChristmasGiftSet,
    inStock: true,
    affiliateUrl: "https://amzn.to/3LQZULF",
  },
  {
    id: "cnd-005",
    name: "Yankee Candle Spiced Pumpkin Large Jar",
    brand: "Yankee Candle",
    scent: "Warm, Spiced",
    description: "The essence of autumn in a candle. Smooth pumpkin fragrance enhanced with cinnamon, nutmeg, and clove spices. Mellow vanilla and baked aromas create a warm, comforting gourmand scent. 22oz large jar with 150 hour burn time. 10K+ bought in past month.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleSpicedPumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DRTCB2?tag=lunarituals10-20",
  },
  {
    id: "cnd-006",
    name: "Chesapeake Bay Candle Mind & Body - Relax + Restore",
    brand: "Chesapeake Bay Candle",
    scent: "Sage, Peppermint",
    description: "Medium jar soy wax blend candle with natural essential oils. Sheer Jasmine scent for home décor and relaxation. Features elegant frosted glass and premium wooden lid. Contains pure essential oils poured in USA. 8.8 oz / 250g. 400+ bought in past month.",
    price: 12.99,
    burnTime: "50 hours",
    image: productCandleChesapeakeBay,
    inStock: true,
    affiliateUrl: "https://amzn.to/3XEZiLK",
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
  },
  {
    id: "cnd-008",
    name: "AOOVOO Lavender Scented Candle with Crystals",
    brand: "AOOVOO",
    scent: "Lavender, Floral",
    description: "Aromatherapy candle for women featuring natural crystals inside. Pure 10 oz soy wax with 10% natural essential oils. 60 hour burn time with elegant white ceramic jar and bamboo lid. Perfect for home relaxation, birthday, or Christmas gifts. Amazon's Choice. 2K+ bought in past month.",
    price: 16.99,
    burnTime: "60 hours",
    image: productCandleAoovooLavender,
    inStock: true,
    affiliateUrl: "https://amzn.to/3X1rR61",
  },
  {
    id: "cnd-009",
    name: "Yankee Candle Harvest Large Jar",
    brand: "Yankee Candle",
    scent: "Fruity, Warm",
    description: "Captures the essence of autumn harvest with warm, fruity notes. Perfect seasonal fragrance for creating cozy fall ambiance. 22oz large jar delivers 150 hours of room-filling scent.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleHarvest,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DPN1R4?tag=lunarituals10-20",
  },
  {
    id: "cnd-010",
    name: "Yankee Candle Apple Pumpkin Large Jar",
    brand: "Yankee Candle",
    scent: "Sweet, Fruity",
    description: "Delightful fall blend of crisp, fresh apple with warm pumpkin. Sweet and fruity fragrance perfect for autumn gatherings. 22oz large jar provides 150 hours of seasonal comfort.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleApplePumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DQHQ9K?tag=lunarituals10-20",
  },
  {
    id: "cnd-011",
    name: "Yankee Candle Autumn Leaves Large Jar",
    brand: "Yankee Candle",
    scent: "Earthy, Crisp",
    description: "Captures the earthy essence of crisp autumn leaves underfoot. Fresh, outdoor-inspired scent brings nature indoors. 22oz large jar offers 150 hours of fall atmosphere.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleAutumnLeaves,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DQ4Z9J?tag=lunarituals10-20",
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
    description: "Evokes the warmth of a rustic mountain lodge with rich woody notes and cozy undertones. Perfect for creating cabin-inspired ambiance. Large jar delivers 110 hours of comforting fragrance.",
    price: 37.99,
    burnTime: "110 hours",
    image: productCandleAutumnLodge,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B007N454XY?tag=lunarituals10-20",
  },
  {
    id: "cnd-016",
    name: "Village Candle Mulled Cider Apothecary Jar",
    brand: "Village Candle",
    scent: "Spiced, Warm",
    description: "Warm mulled cider fragrance infused with festive holiday spices. Reminiscent of simmering apple cider with cinnamon sticks. Large 21.25oz apothecary jar offers 105 hours of seasonal warmth.",
    price: 21.95,
    burnTime: "105 hours",
    image: productCandleMulledCider,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B001J6O6FE?tag=lunarituals10-20",
  },
  {
    id: "cnd-017",
    name: "Yankee Candle Harvest Classic Large Jar",
    brand: "Yankee Candle",
    scent: "Fruity, Warm",
    description: "Timeless autumn harvest fragrance featuring warm, fruity notes. Classic seasonal scent perfect for fall traditions. 22oz jar provides over 110 hours of nostalgic harvest atmosphere.",
    price: 34.3,
    burnTime: "110 hours",
    image: productCandleHarvestClassic,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000W3RVA2?tag=lunarituals10-20",
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
