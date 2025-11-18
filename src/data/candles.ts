import productCandle1 from "@/assets/product-candle-1.jpg";
import productCandle2 from "@/assets/product-candle-2.jpg";
import productCandleBalsamCedar from "@/assets/product-candle-balsam-cedar.jpg";
import productCandleVanillaBean from "@/assets/product-candle-vanilla-bean.jpg";
import productCandleVanillaPumpkin from "@/assets/product-candle-vanilla-pumpkin.jpg";
import productCandleChristmasSet from "@/assets/product-candle-christmas-set.jpg";
import productCandleSpicedPumpkin from "@/assets/product-candle-yankee-spiced-pumpkin-1763492171.jpg";
import productCandleBalsamCedarNew from "@/assets/product-candle-yankee-balsam-cedar-1763492326.jpg";
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
    name: "Yankee Candle Balsam & Cedar",
    brand: "Yankee Candle",
    scent: "Fresh, Woody",
    description: "Fall scented candle, 22oz large jar with up to 150 hour burn time. Room-filling fragrance that brings the outdoors in with notes of balsam and cedar. #1 Best Seller in Jar Candles.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleBalsamCedar,
    inStock: true,
    affiliateUrl: "https://amzn.to/43yPmai",
  },
  {
    id: "cnd-002",
    name: "WoodWick Vanilla Bean Candle",
    brand: "WoodWick",
    scent: "Sweet, Warm",
    description: "Holiday candle gifts for women and men, 9.7 oz medium hourglass candle with crackling wick. Creates a soothing ambiance with its distinctive crackling sound and rich vanilla fragrance.",
    price: 17.99,
    burnTime: "60 hours",
    image: productCandleVanillaBean,
    inStock: true,
    affiliateUrl: "https://amzn.to/43EdcRX",
  },
  {
    id: "cnd-003",
    name: "Vanilla Pumpkin Fall Candle",
    brand: "Auelife",
    scent: "Sweet, Spiced",
    description: "Scented candles for autumn, fall aromatherapy gifts - 7 oz. Amazon's Choice with sweet vanilla and warming pumpkin spice notes perfect for creating a cozy fall atmosphere.",
    price: 16.99,
    burnTime: "50 hours",
    image: productCandleVanillaPumpkin,
    inStock: true,
    affiliateUrl: "https://amzn.to/3X6xpfs",
  },
  {
    id: "cnd-004",
    name: "Christmas Candles Gift Set",
    brand: "Yinuo Candle",
    scent: "Holiday, Varied",
    description: "4 pack scented soy candles with Cashmere Cedar, Fireside Glow, Cinnamon Apple & Vanilla Balsam. Long lasting holiday winter gifts for home. Amazon's Choice for festive seasonal fragrance collection.",
    price: 23.99,
    burnTime: "45 hours per candle",
    image: productCandleChristmasSet,
    inStock: true,
    affiliateUrl: "https://amzn.to/47NTMwr",
  },
  {
    id: "cnd-005",
    name: "Yankee Candle Spiced Pumpkin, Fall Scented Candle, 22oz Large Jar with up to 150 Hour Burn Time",
    brand: "Yankee Candle",
    scent: "Warm, Spiced",
    description: "Spiced Pumpkin is the essence of autumn. A smooth, comforting fragrance blends pumpkin with notes of cinnamon, nutmeg, and clove. A dash of mellow vanilla and baked aromas round out the base to create a warm, satisfying gourmand scent. 10K+ bought in past month.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleSpicedPumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DRTCB2?tag=lunarituals10-20",
  },
  {
    id: "cnd-006",
    name: "Yankee Candle, Balsam & Cedar Fall Scented Candle, 22oz Large Jar with up to 150 Hour Burn Time",
    brand: "Yankee Candle",
    scent: "Fresh, Woody",
    description: "Balsam & Cedar is a timeless classic for a reason. Pine balsam scents mingle with brisk cedarwood, evoking a stroll through the forest, while nuanced base notes of warm amber offer a sense of comfort and calm. #1 Best Seller in Jar Candles. 30K+ bought in past month.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleBalsamCedarNew,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DPXQP1?tag=lunarituals10-20",
  },
  {
    id: "cnd-007",
    name: "Yankee Candle Sparkling Cinnamon",
    brand: "Yankee Candle",
    scent: "Warm, Spiced",
    description: "Twinkling lights and warm conversation. Spicy cinnamon and clove create a cozy wintertime classic. 22oz large jar with up to 150 hour burn time.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleSpark,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DRYY1N?tag=lunarituals10-20",
  },
  {
    id: "cnd-008",
    name: "Yankee Candle Ciderhouse",
    brand: "Yankee Candle",
    scent: "Sweet, Warm",
    description: "Warm apple cider fragrance perfect for fall. 22oz large jar with up to 150 hour burn time.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleCiderhouse,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F8KNKM36?tag=lunarituals10-20",
  },
  {
    id: "cnd-009",
    name: "Yankee Candle Harvest",
    brand: "Yankee Candle",
    scent: "Fruity, Warm",
    description: "The essence of autumn harvest. 22oz large jar with up to 150 hour burn time.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleHarvest,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DPN1R4?tag=lunarituals10-20",
  },
  {
    id: "cnd-010",
    name: "Yankee Candle Apple Pumpkin",
    brand: "Yankee Candle",
    scent: "Sweet, Fruity",
    description: "Crisp apple and pumpkin blend for fall. 22oz large jar with up to 150 hour burn time.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleApplePumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DQHQ9K?tag=lunarituals10-20",
  },
  {
    id: "cnd-011",
    name: "Yankee Candle Autumn Leaves",
    brand: "Yankee Candle",
    scent: "Earthy, Crisp",
    description: "Crisp autumn leaves scent. 22oz large jar with up to 150 hour burn time.",
    price: 14.99,
    burnTime: "150 hours",
    image: productCandleAutumnLeaves,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0F3DQ4Z9J?tag=lunarituals10-20",
  },
  {
    id: "cnd-012",
    name: "WoodWick Pumpkin Nutmeg",
    brand: "WoodWick",
    scent: "Sweet, Spiced",
    description: "Pumpkin nutmeg with crackling wood wick. 10oz jar with wooden lid.",
    price: 15.99,
    burnTime: "50 hours",
    image: productCandlePumpkinNutmeg,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B08846RTGF?tag=lunarituals10-20",
  },
  {
    id: "cnd-013",
    name: "A Cheerful Giver Orange Cinnamon Clove",
    brand: "A Cheerful Giver",
    scent: "Warm, Spiced",
    description: "Orange, cinnamon and clove holiday scent. 34oz Papa jar with 155 hour burn time.",
    price: 28,
    burnTime: "155 hours",
    image: productCandleOrangeCinnamon,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B005S4LKNO?tag=lunarituals10-20",
  },
  {
    id: "cnd-014",
    name: "Village Candle Spiced Pumpkin",
    brand: "Village Candle",
    scent: "Sweet, Spiced",
    description: "Classic spiced pumpkin scent. Large 21.25oz apothecary jar.",
    price: 17.99,
    burnTime: "105 hours",
    image: productCandleVillageSpicedPumpkin,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B002YX0GAA?tag=lunarituals10-20",
  },
  {
    id: "cnd-015",
    name: "Yankee Candle Autumn Lodge",
    brand: "Yankee Candle",
    scent: "Woody, Cozy",
    description: "Warm lodge atmosphere with woody notes. Large jar candle.",
    price: 37.99,
    burnTime: "110 hours",
    image: productCandleAutumnLodge,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B007N454XY?tag=lunarituals10-20",
  },
  {
    id: "cnd-016",
    name: "Village Candle Mulled Cider",
    brand: "Village Candle",
    scent: "Spiced, Warm",
    description: "Warm mulled cider with holiday spices. Large 21.25oz apothecary jar.",
    price: 21.95,
    burnTime: "105 hours",
    image: productCandleMulledCider,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B001J6O6FE?tag=lunarituals10-20",
  },
  {
    id: "cnd-017",
    name: "Yankee Candle Harvest Classic",
    brand: "Yankee Candle",
    scent: "Fruity, Warm",
    description: "Classic harvest scent for autumn. 22oz jar with over 110 hour burn time.",
    price: 34.3,
    burnTime: "110 hours",
    image: productCandleHarvestClassic,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B000W3RVA2?tag=lunarituals10-20",
  },
  {
    id: "cnd-018",
    name: "A Cheerful Giver Autumn Orchards",
    brand: "A Cheerful Giver",
    scent: "Fruity, Sweet",
    description: "Autumn orchard fragrance. 34oz Papa jar with 155 hour burn time.",
    price: 27.99,
    burnTime: "155 hours",
    image: productCandleAutumnOrchards,
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B009D4ZW0M?tag=lunarituals10-20",
  },
];
