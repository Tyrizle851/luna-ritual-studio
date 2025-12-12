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
  // Enhanced fields for detailed product pages
  rating?: number;
  reviewCount?: number;
  socialProof?: string; // e.g., "360+ bought in past month"
  isPrime?: boolean;
  styleNotes?: string; // Editorial content about the style
  features?: string[]; // Quick bullet points
  certifications?: string[]; // Quality badges like "Amazon's Choice", "100% Cotton"
  productDetails?: {
    fabric?: string;
    care?: string;
    fit?: string;
    origin?: string;
  };
  stylingIdeas?: Array<{
    occasion: string;
    suggestion: string;
  }>;
}

export const fashionProducts: FashionProduct[] = [
  // **PAGE 1: BEST PICKS** - Highest rated, best sellers, most reviewed
  {
    id: "fsh-014",
    name: "DREAM PAIRS Over The Knee Thigh High Boots",
    brand: "DREAM PAIRS",
    category: "Shoes",
    description: "Sleek over-the-knee boots with chunky heel for all-day comfort. Stretchy design creates a flattering silhouette while the block heel provides stability. Perfect statement piece for fall and winter outfits.",
    price: 40.27,
    originalPrice: 69.99,
    badge: "#1 Best Seller",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Grey", "Brown"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-014/lifestyle-1764869961961.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/DREAM-PAIRS-Womens-Laurence-Chunky/dp/B071K971NT?crid=1XC8BGG3LBDI8&dib=eyJ2IjoiMSJ9._WcQbEU6v6HOUhUG_kIJ7ALyxbH9zchjElZTzt_5AUgzY6NtdIQaokzOAEz-bFz4-jCCckdIk4wQta7fz_pCEGhpO7Fk4GctdCnNOhTuJcgbswIggIsDyD9yruVON1ao9u1RRmfoSbpCCLAHvOE5q1iJUG79hCJlMS_tNaxJtUipyegRocVZd4Q3hIBE3s7GP1rcEZrZdD5Z-VNaXjrBl3FcwBvX9Ndbq5ZSu2a1QPQgDHnIyCEmuaChCJTnhKYbxCHJeCwZN1UjH9YWaMhFtP2NZfKxsvqqxE2JuZNmJ4E.Woi_1G3-bocty7p5xUui2whfXYB7wkfm6etB-rl550Q&dib_tag=se&keywords=womens%2Bfall%2Bboots&qid=1763584235&sprefix=womens%2Bfall%2Bboots%2Caps%2C157&sr=8-30&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=27629330f7f08d52e40627ffd9c20288&language=en_US&ref_=as_li_ss_tl&psc=1",
    rating: 4.5,
    reviewCount: 10379,
    isPrime: true,
    styleNotes: "These #1 bestselling over-the-knee boots are a wardrobe game-changer. The stretchy construction hugs your legs for a custom fit while the chunky block heel offers stability without sacrificing style. Perfect for making a statement while staying comfortable all day - whether you're conquering the city streets or heading to a special event.",
    features: [
      "Over-the-knee thigh-high design",
      "Chunky block heel for stability",
      "Stretchy fit hugs legs",
      "Pull-on construction",
      "Comfortable for all-day wear",
      "#1 Best Seller in category"
    ],
    certifications: ["#1 Best Seller", "Prime"],
    productDetails: {
      fabric: "Stretchy synthetic upper with block heel",
      care: "Wipe clean with soft cloth, store upright to maintain shape",
      fit: "Stretchy fit accommodates various leg sizes - true to size",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Night Out",
        suggestion: "Pair with a mini dress or skirt for show-stopping evening style"
      },
      {
        occasion: "Street Style",
        suggestion: "Wear with skinny jeans tucked in and an oversized sweater for edgy urban looks"
      },
      {
        occasion: "Fall Fashion",
        suggestion: "Style with leggings and a long cardigan for trendy autumn outfits"
      },
      {
        occasion: "Special Occasions",
        suggestion: "Match with a bodycon dress for confident, leg-lengthening style"
      }
    ]
  },
  {
    id: "fsh-002",
    name: "Cozy Cable Knit Cardigan",
    brand: "PRETTYGARDEN",
    category: "Knitwear",
    description: "Embrace effortless comfort with this chunky cable knit cardigan. Featuring oversized sleeves and classic button closure, it's the perfect layering piece for crisp autumn days. Pair with your favorite jeans for relaxed weekend style.",
    price: 26.98,
    originalPrice: 39.98,
    badge: "#1 Best Seller",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Apricot", "Army Green", "Black", "Brown", "Coffee", "Cream", "Grey"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-002/styled-1764870146743.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/PRETTYGARDEN-Sweater-Classic-Cardigan-Outwear/dp/B0B8D279W3?crid=9SQBFTZV30SO&dib=eyJ2IjoiMSJ9.mRR4D3go6QY88pPzkR6oi5ZGGbsus9B7iY71D4AR8OK_GvjK_7GCsjfAAXCTMtx4HmoKIbacCTaxNzI_4w8iZDMa0mlFmQL3w2S73Bxjls1BUOiAUQsl-r_huttnscab5X0DI7VxYhm2kXwiDVkJ3eB_2MXwDu-Q1975vlrTt0eYB65mQLU6CAiJoEw3eZXtHDVtVQT9ZidGxQuTNKmlX0jl0Wx3IKCBWJqC-ARlzYO953-Zfy0PJ-7sK6FE8Rw3rPpvGmtOS7060ii3J8J_6eTCr6_rmURrgNHEQ2gSUcI.bulsQUjV7Ps6yW2WzM_uErieV-3Es9mXSR6tPo6lPCM&dib_tag=se&keywords=womens%2Bcardigan&qid=1763479312&sprefix=womens%2Bcartigan%2Caps%2C143&sr=8-4&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=8da2b55e55dcb08c7bd054687628fdd3&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.4,
    reviewCount: 3323,
    socialProof: "1K+ bought in past month",
    isPrime: true,
    styleNotes: "This chunky cable knit cardigan is your cozy companion for autumn and winter. The textured cable knit adds visual interest while the open front and button details offer versatile styling options. Layer over a simple tee and jeans for weekend errands or pair with your favorite slip dress for a feminine contrast.",
    features: [
      "Chunky cable knit texture",
      "Open front with button closure",
      "Oversized relaxed fit",
      "Long sleeves with ribbed cuffs",
      "Available in 7+ versatile colors",
      "Perfect for layering"
    ],
    certifications: ["#1 Best Seller", "Prime"],
    productDetails: {
      fabric: "Soft knit blend (specific composition varies by color)",
      care: "Hand wash cold, lay flat to dry",
      fit: "Oversized, relaxed fit - size down for a closer fit",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Casual Weekend",
        suggestion: "Layer over a white tee with black jeans and ankle boots for effortless weekend style"
      },
      {
        occasion: "Coffee Date",
        suggestion: "Pair with a flowy midi dress and sneakers for a feminine yet comfortable look"
      },
      {
        occasion: "Cozy Night In",
        suggestion: "Style with matching loungewear set for the ultimate comfort at home"
      },
      {
        occasion: "Fall Layers",
        suggestion: "Wear over a turtleneck with wide-leg trousers and loafers for sophisticated layering"
      }
    ]
  },
  {
    id: "fsh-001",
    name: "Elegant Lace Sleeve Blouse",
    brand: "AUTOMET",
    category: "Tops",
    description: "Sophisticated pleated detail meets delicate lace sleeves in this versatile top. Perfect for elevating your everyday wardrobe with a touch of feminine elegance.",
    price: 9.99,
    originalPrice: 14.99,
    badge: "Sale",
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large"],
    colors: ["Khaki", "Black", "Leopard", "Navy", "Cream", "Camel", "White", "Wine Red", "Blue", "Floral", "Burgundy", "Brown", "Pink", "Mint Green", "Yellow"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-001/styled-1764870244533.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/AUTOMET-Business-Fashion-Outfits-Clothes/dp/B0D4ZDZL1P?crid=121K3C56SJU6H&dib=eyJ2IjoiMSJ9.ISVSYm4XBBBIQbD6H-LRPUk0jkQgc6xar8_761hOilhqoOKxWH4LN041XB4KL0jcDYS2ks-mfTx7-aW1ROv6PqO88tHTWIIbH4QSdwWGSynZah7GJ6H8-KXfLamh1AhqHo0Z6kSyjelL1Q5t_ZCNoxko8iLEj5RjHYLdQORC1dPJ566s8cel_JHop28cVlsFKRofWfRJ0WuFIpCjEpOi0GtXHHLb7qJJu5RgYIX-7pIMCl4IG6h3xP25YhZiNPgA3F4o_1-VBntEnOHEpgBodpLCanXHh_LuKrkEnmVSx-0.aAmqdn5Wbw5BRTHSHVMeTOhqIqXcHybDnrcHdtPD--w&dib_tag=se&keywords=womens%2Bfashion%2Bfall&qid=1763477433&sprefix=womens%2Bfashion%2Bfall%2Caps%2C130&sr=8-9&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=0d98f240e02cd39dbb52788c2db9d46d&language=en_US&ref_=as_li_ss_tl&psc=1",
    rating: 4.4,
    reviewCount: 4588,
    socialProof: "360+ bought in past month",
    isPrime: true,
    styleNotes: "This pleated lace blouse effortlessly transitions from office meetings to weekend brunches. The delicate lace sleeves add feminine detail while the pleated front creates a flattering silhouette. Pair with dark jeans for casual elegance or tuck into high-waisted trousers for polished sophistication.",
    features: [
      "Premium lace detail sleeves",
      "Pleated front for flattering fit",
      "Versatile for work or casual wear",
      "Available in 15+ colors",
      "Lightweight and breathable",
      "Easy care - machine washable"
    ],
    certifications: ["Prime", "360+ bought"],
    productDetails: {
      fabric: "60% Polyester, 35% Rayon, 5% Spandex",
      care: "Machine wash cold, tumble dry low",
      fit: "True to size, relaxed fit through body with feminine pleating",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Office Chic",
        suggestion: "Pair with tailored black pants and pointed flats for a polished professional look"
      },
      {
        occasion: "Weekend Brunch",
        suggestion: "Tuck into high-waist jeans with ankle boots and a crossbody bag"
      },
      {
        occasion: "Date Night",
        suggestion: "Style with a leather skirt, heels, and statement earrings for effortless elegance"
      },
      {
        occasion: "Casual Friday",
        suggestion: "Wear with dark denim and loafers, add a blazer for extra polish"
      }
    ]
  },
  {
    id: "fsh-003",
    name: "Quilted Shoulder Bag",
    brand: "KKXIU",
    category: "Accessories",
    description: "Timeless elegance meets everyday functionality in this retro-inspired quilted bag. The soft clutch underarm design with gold hardware accents makes it perfect for both casual outings and refined occasions. A versatile piece that elevates any outfit.",
    price: 22.99,
    colors: ["Beige", "Black", "Brown"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-003/styled-1764870323888.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/KKXIU-Shoulder-Handbags-Underarm-Removable/dp/B0FPC6W3G4?crid=1R95GH428BV72&dib=eyJ2IjoiMSJ9.VagrqrTvO8qHED0uKNmFdNDuN-pKo9LIKtQattDX9HkbTc4wlJvpdzLg6vwaXooGltJcmsXI8RPQaoodFWOqDCRu4OG5Lg9iMk7_M2csS3Y8hCeWKzDjaVB9ybVaLluPXGE28C0xVnwWqQJx-4YsmHDYw-oRVMaJuM1ueP5TU6oGuxBZnz5ihM6z5pl1yuIBm5BETVN8YkU6EP0rMJ2wGwejELz8reN2m_QyPrkquww9n3RLYk5sPtsqtDsMkLUpNk0IVwT4gomT74FdI6jttT_Jl7K7xHQlhQMY1Icq47A.aziBcO8_lO6-gnXPH7qrw3CMEqlU6x7d9Umpyg0rsZw&dib_tag=se&keywords=womens%2Bpurse&qid=1763479663&sprefix=womens%2Bpurse,aps,159&sr=8-1&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=4a75c50323de381d60a8bbb08e030aaf&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.4,
    reviewCount: 749,
    socialProof: "50+ bought in past month",
    isPrime: true,
    styleNotes: "This retro-inspired quilted shoulder bag brings Y2K charm to modern wardrobes. The soft hobo silhouette and underarm design create an effortlessly chic look that's both practical and stylish. The quilted texture adds visual interest while keeping the design sophisticated and timeless.",
    features: [
      "Retro quilted clutch design",
      "Soft hobo underarm style",
      "Comfortable shoulder carry",
      "Versatile neutral colors",
      "Compact yet spacious interior",
      "Lightweight and easy to carry"
    ],
    certifications: ["Vegan Leather", "Lightweight"],
    productDetails: {
      fabric: "High-quality vegan leather with quilted detailing",
      care: "Wipe clean with damp cloth",
      fit: "Compact size perfect for essentials - phone, wallet, keys, lipstick",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Brunch with Friends",
        suggestion: "Pair with a slip dress and ankle boots for a polished casual look"
      },
      {
        occasion: "Date Night",
        suggestion: "Carry with tailored trousers and a silk camisole for understated elegance"
      },
      {
        occasion: "Weekend Shopping",
        suggestion: "Style with high-waist jeans and an oversized blazer for effortless chic"
      },
      {
        occasion: "Evening Out",
        suggestion: "Match with a little black dress and heels for timeless sophistication"
      }
    ]
  },
  {
    id: "fsh-004",
    name: "Classic Satin Silk Pajama Set",
    brand: "Ekouaer",
    category: "Loungewear",
    description: "Indulge in luxurious comfort with this classic button-down silk pajama set. The smooth satin finish feels incredible against your skin while the timeless design with contrast piping adds sophisticated style to your evening routine. Perfect for unwinding by the fire or enjoying a peaceful night's rest.",
    price: 31.44,
    originalPrice: 36.99,
    badge: "Top Pick",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Champagne Gold", "Black", "Navy", "Leopard Print"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-004/styled-1764866641768.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/Ekouaer-Womens-2-Piece-Sleepwear-Loungewear/dp/B097GL24NJ?crid=1YX5CTOPT4Q7O&dib=eyJ2IjoiMSJ9.ndgDJZHyWeBr6KTIE90C54EBFDQ0AReqUP4UJBcuvQUKsr0DfECiC78VKM92bv1vafSHhk-alB8OtmWcvKzSZfv6V_Vr-1p4CG7zuTYyfImjEj7F-4e9Vwxi-9k7x50V1LFfkLy3kA-s4x2YD37Bq9XDnEff72ReNPhWer3fXmLLHLMdy6QeQ3Y_65nkC0y5xo9bbkmwnTgy70cXqu2cLIJJNEsyY6WBZ38JtY1yai4rSHfMP5LVeVKL6POctaCmJS3LllLtSmhzZsg1-eqWvp-AIQgauYgSCoaBP99Iowg.TPoekM7TRMTe9mpt2pGA6uSfLhJLtw-5GW_MnW8lP9g&dib_tag=se&keywords=womens%2Bsilk%2Bpajamas%2Bset&qid=1763480737&sprefix=womens%2Bsilk,aps,151&sr=8-8&th=1&psc=1&linkCode=sl1&tag=lunarituals10-20&linkId=d0004d1b857c6f4a0d375044662e01c3&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.4,
    reviewCount: 3300,
    isPrime: true,
    styleNotes: "Elevate your sleep routine with this luxurious satin pajama set. The silky-smooth fabric drapes beautifully and feels gentle on skin, while the classic button-down design adds timeless sophistication. Perfect for those who believe that bedtime should feel like a luxury experience.",
    features: [
      "Smooth satin silk finish",
      "Classic button-down top",
      "Adjustable drawstring pants",
      "Long sleeves with button cuffs",
      "ISCC PLUS sustainability certified",
      "Soft and breathable fabric"
    ],
    certifications: ["Silky Smooth", "Breathable"],
    productDetails: {
      fabric: "Premium satin polyester blend (softer than traditional silk)",
      care: "Machine washable - gentle cycle, hang or lay flat to dry",
      fit: "True to size with relaxed comfortable fit for sleep",
      origin: "Imported, ISCC PLUS certified for sustainability"
    },
    stylingIdeas: [
      {
        occasion: "Bedtime Luxury",
        suggestion: "Pair with fuzzy slippers and a silk sleep mask for ultimate relaxation"
      },
      {
        occasion: "Morning Coffee",
        suggestion: "Layer a cozy cardigan over the set for a chic loungewear look"
      },
      {
        occasion: "Self-Care Sunday",
        suggestion: "Wear during your skincare routine and journaling for a spa-like experience"
      },
      {
        occasion: "Lazy Weekend",
        suggestion: "Stay in the set all day - it's comfortable and polished enough for video calls"
      }
    ]
  },
  {
    id: "fsh-005",
    name: "Dainty Cross Necklace",
    brand: "PAVOI",
    category: "Jewelry",
    description: "Elevate your everyday style with this delicate gold plated cross necklace. Featuring sparkling cubic zirconia crystals on a dainty chain, it adds a touch of refined elegance to any outfit. Perfect for layering or wearing alone, this versatile piece transitions seamlessly from day to night.",
    price: 13.95,
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-005/lifestyle-1764870352138.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/PAVOI-Yellow-Necklace-Pendant-Necklaces/dp/B07QTJ1WWL?crid=3TII9MRA1XD3L&dib=eyJ2IjoiMSJ9.xfZVj4M-vgegbZDgsGiLsCqhgYnBg0DhBecyK6qQOSRrGqJp7tHc0Ta5SheU-Xv9TXWmk3QehPU7i-49NC1zdLdbfxYYndq5XwbWJFpi3Zs9w8TkJolrmYuukt2mOSDVZABuV5XyF-mHXdDXRr5bzVG-XjXaoAu1wFV_uJcFA5DSF8jw71t8oKUOyhiiZhqLyvmwkvMLeXpF8W-lmzTXr-yd2Zh8etOigxCZfc6gspBO97xDV8Wp9zb61AOrmQrwxfa08dfuL9EUa5yquboc9jVtg4Rd8LbZm3j6HdN0oVU.IqmgDfpFQ5_vGOCbEViIy1o92SSaCo-G5cm8LnbFWyo&dib_tag=se&keywords=womens%2Bnecklace&qid=1763481278&sprefix=womens%2Bnecklace%2Caps%2C172&sr=8-4&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=3f4a083c9fcaae1f1ffadec7d2691c12&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.4,
    reviewCount: 13355,
    socialProof: "5K+ bought in past month",
    isPrime: true,
    styleNotes: "This delicate cross necklace adds meaningful elegance to any outfit. The sparkling cubic zirconia stones catch the light beautifully, while the dainty chain creates a refined, feminine look. Wear it as a symbol of faith or simply as a timeless jewelry piece that elevates both casual and dressed-up looks.",
    features: [
      "14K gold plated finish",
      "Sparkling cubic zirconia crystals",
      "Delicate dainty chain",
      "Perfect for layering",
      "Adjustable length",
      "Hypoallergenic and nickel-free"
    ],
    certifications: ["Hypoallergenic", "Nickel-Free"],
    productDetails: {
      fabric: "14K gold plated brass with cubic zirconia stones",
      care: "Avoid water and chemicals, store in jewelry box when not wearing",
      fit: "Adjustable chain length for perfect placement",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Everyday Elegance",
        suggestion: "Wear alone with a simple tee and jeans for understated sophistication"
      },
      {
        occasion: "Layered Look",
        suggestion: "Stack with other delicate necklaces of varying lengths for trendy layering"
      },
      {
        occasion: "Special Occasions",
        suggestion: "Pair with a little black dress for timeless elegance"
      },
      {
        occasion: "Meaningful Gift",
        suggestion: "Perfect for confirmations, baptisms, or as a thoughtful faith-based gift"
      }
    ]
  },
  {
    id: "fsh-006",
    name: "Stretch Pull-On Skinny Jeans",
    brand: "Jvini",
    category: "Bottoms",
    description: "Effortlessly stylish distressed denim jeggings that combine comfort with edge. Features a stretchy pull-on waistband for all-day ease and trendy ripped details for that perfectly lived-in look. Available in regular and plus sizes to flatter every figure.",
    price: 17.58,
    originalPrice: 21.97,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Dark Denim", "Blue", "Black Denim"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-006/lifestyle-1764870441589.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/Womens-Stretch-Distressed-Jeggings-Pockets/dp/B079LVFJGD?crid=3NE6PB167JEZC&dib=eyJ2IjoiMSJ9.U8CzB686tvJ3fA0AA7uEZoZ-nDrdED_f8xsZtWAdRnNrj93o1_jX6eBxspEjVbm0H30RbD8ruICI-9bbf3FvrqU8lSeI5rHfe0mJS8wSsozt8Gq5XsXedF2MCYo1XIM9ypwQktJ8N5huniqGYp8RDdTTAJJcRcugV2rC3XKrJ24CI4J75wmIvqcuAlbNgIS42cu247bQgVffbjaUeEsEQvc94Dd-m28X9-fkA3U78xO0ypGO6e150ZuHifrA87ciIOnatVKNSc3rrw2pZIgfm8SQcWTNBB8DCGts-8bd9pg.SodubwEn5Dczd05Dn1UvIJWWCAonVe66EWK7NXQkg8I&dib_tag=se&keywords=womens%2Bdenim%2Bjeans%2Bripped&qid=1763485361&sprefix=womens%2Bdenim%2Bjeans%2Bripped,aps,129&sr=8-7&th=1&psc=1&linkCode=sl1&tag=lunarituals10-20&linkId=a52bbd990c868da58af5eece4b3404e5&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.2,
    reviewCount: 16645,
    socialProof: "100+ bought in past month",
    isPrime: true,
    styleNotes: "These distressed skinny jeggings combine the edgy look of ripped denim with the comfort of stretchy jeggings. The pull-on elastic waistband means no uncomfortable buttons or zippers, while the distressed details add trendy street style appeal. They offer the perfect balance of comfort and fashion-forward design.",
    features: [
      "Soft stretch denim fabric",
      "Easy pull-on elastic waistband",
      "Trendy distressed ripped details",
      "Functional front and back pockets",
      "Flattering skinny leg fit",
      "Available in regular and plus sizes"
    ],
    certifications: ["Stretchy Fit", "Soft Denim"],
    productDetails: {
      fabric: "76% Cotton, 22% Polyester, 2% Spandex",
      care: "Machine wash cold, tumble dry low",
      fit: "True to size, high-waisted with stretchy skinny leg fit",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Casual Cool",
        suggestion: "Pair with an oversized graphic tee and sneakers for effortless street style"
      },
      {
        occasion: "Date Night",
        suggestion: "Style with a fitted bodysuit and heeled booties for a trendy look"
      },
      {
        occasion: "Weekend Errands",
        suggestion: "Wear with a cozy sweater and slip-on sneakers for comfortable all-day wear"
      },
      {
        occasion: "Girls Night Out",
        suggestion: "Match with a crop top and statement jewelry for fun evening vibes"
      }
    ]
  },
  {
    id: "fsh-007",
    name: "Vansha High Waisted Linen Palazzo Pants",
    brand: "Vansha",
    category: "Bottoms",
    description: "Summer high waisted cotton linen palazzo pants. Wide leg lounge trousers with convenient pockets. Breathable fabric perfect for warm weather comfort and effortless boho style.",
    price: 19.99,
    originalPrice: 29.99,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["White", "Beige", "Camel", "Dark Gray", "Khaki", "Orange"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-007/styled-1764870602479.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B09YVFLNVP?tag=lunarituals10-20&th=1&psc=1",
    // Enhanced details
    rating: 3.7,
    reviewCount: 5358,
    isPrime: true,
    styleNotes: "These high-waisted linen palazzo pants embody effortless summer bohemian style. The wide leg silhouette creates a breezy, relaxed fit while the natural linen-cotton blend keeps you cool all day. Perfect for beach vacations, summer festivals, or simply lounging in style with their comfortable elastic waist and functional pockets.",
    features: [
      "High waisted design",
      "Wide leg palazzo style",
      "Cotton linen blend fabric",
      "Functional side pockets",
      "Elastic waistband for comfort",
      "Breathable and lightweight"
    ],
    certifications: ["Breathable Linen", "Lightweight"],
    productDetails: {
      fabric: "Cotton and linen blend",
      care: "Machine wash cold, tumble dry low or line dry",
      fit: "High waisted with wide leg, relaxed palazzo fit",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Beach Vacation",
        suggestion: "Pair with a cropped tank top and sandals for effortless beach-to-dinner style"
      },
      {
        occasion: "Summer Brunch",
        suggestion: "Style with a fitted tee and espadrilles for a chic casual look"
      },
      {
        occasion: "Yoga & Wellness",
        suggestion: "Wear with a sports bra or fitted top for comfortable yoga or meditation"
      },
      {
        occasion: "Relaxed Weekend",
        suggestion: "Match with an oversized linen shirt for maximum comfort and boho vibes"
      }
    ]
  },
  {
    id: "fsh-008",
    name: "PRETTYGARDEN Chunky Knit Cardigan",
    brand: "PRETTYGARDEN",
    category: "Knitwear",
    description: "Open front cardigan sweater with button down detail. Chunky cable knit design for cozy fall fashion. Oversized fit perfect for layering over your favorite outfits.",
    price: 32.29,
    originalPrice: 33.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Army Green", "Beige", "Blue", "Blue Grey", "Grey"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-008/lifestyle-1764870637432.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B08DTDPVBL?tag=lunarituals10-20",
    // Enhanced details
    rating: 4.4,
    reviewCount: 13079,
    socialProof: "200+ bought in past month",
    isPrime: true,
    styleNotes: "This OEKO-TEX certified chunky cardigan combines cozy comfort with conscious fashion. The cable knit texture adds visual interest while the open front with button details offers versatile styling. Perfect for creating effortless layered looks throughout fall and winter while knowing it's made with safer chemicals for you and the environment.",
    features: [
      "Chunky cable knit texture",
      "Open front with button details",
      "OEKO-TEX STANDARD 100 certified",
      "Oversized relaxed fit",
      "Long sleeves with ribbed cuffs",
      "Perfect for layering"
    ],
    certifications: ["Soft Knit", "OEKO-TEX Certified"],
    productDetails: {
      fabric: "Soft knit blend - OEKO-TEX certified safe",
      care: "Hand wash cold or gentle machine wash, lay flat to dry",
      fit: "Oversized, relaxed fit - consider sizing down for closer fit",
      origin: "Imported, Certification #25.HCN.16282"
    },
    stylingIdeas: [
      {
        occasion: "Cozy Fall Day",
        suggestion: "Layer over a turtleneck with jeans and ankle boots"
      },
      {
        occasion: "Weekend Errands",
        suggestion: "Wear open over a graphic tee with leggings and sneakers"
      },
      {
        occasion: "Work from Home",
        suggestion: "Style with a fitted tank and joggers for comfort meets polish"
      },
      {
        occasion: "Coffee Date",
        suggestion: "Button up and pair with high-waist trousers for a put-together look"
      }
    ]
  },
  {
    id: "fsh-009",
    name: "AFKOMST Saddle Crossbody Bag",
    brand: "AFKOMST",
    category: "Accessories",
    description: "Small saddle purse with boho charm. Made from high-quality vegan leather. Features a classic flap design and adjustable strap. Perfect for everyday essentials.",
    price: 18.99,
    originalPrice: 23.99,
    badge: "Best Seller",
    colors: ["Brown", "Beige", "Black"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-009/lifestyle-1764870754058.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B07BHC4Q2S?tag=lunarituals10-20",
    // Enhanced details
    rating: 4.4,
    reviewCount: 10337,
    socialProof: "900+ bought in past month",
    isPrime: true,
    styleNotes: "This classic saddle crossbody bag captures timeless western-boho charm in a compact, wearable design. The structured flap closure and adjustable strap make it both practical and stylish, while the vegan leather construction means you can feel good about your purchase. Perfect for carrying your essentials hands-free with vintage-inspired flair.",
    features: [
      "Classic saddle bag design",
      "High-quality vegan leather",
      "Adjustable crossbody strap",
      "Flap closure with magnetic snap",
      "Compact size for essentials",
      "Western-boho inspired style"
    ],
    certifications: ["Vegan Leather", "Adjustable Strap"],
    productDetails: {
      fabric: "Premium vegan leather (PU)",
      care: "Wipe clean with damp cloth, avoid harsh chemicals",
      fit: "Compact crossbody - holds phone, wallet, keys, small cosmetics",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Festival Season",
        suggestion: "Pair with denim shorts and a flowy top for perfect music festival style"
      },
      {
        occasion: "Casual Date",
        suggestion: "Wear with a sundress and sandals for effortless feminine charm"
      },
      {
        occasion: "Weekend Adventure",
        suggestion: "Style with jeans and a leather jacket for western-inspired edge"
      },
      {
        occasion: "Coffee Run",
        suggestion: "Match with athleisure or casual basics for hands-free convenience"
      }
    ]
  },
  {
    id: "fsh-010",
    name: "IVARYSS Satin Sleep Scrunchies (12 Pack)",
    brand: "IVARYSS",
    category: "Accessories",
    description: "Premium satin scrunchies softer than silk. Gentle on hair to prevent breakage and frizz. 12-pack of neutral colors perfect for any outfit or sleepwear.",
    price: 6.99,
    colors: ["Neutral", "Black", "Dark"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-010/styled-1764870908457.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0CHV6QSDQ?tag=lunarituals10-20",
    // Enhanced details
    rating: 4.7,
    reviewCount: 799,
    socialProof: "100+ bought in past month",
    isPrime: true,
    styleNotes: "These premium satin scrunchies are a hair care game-changer. The smooth satin surface is gentler on hair than traditional elastics, reducing breakage, creases, and frizz - especially important for overnight wear. The 12-pack value means you'll always have one handy, and the neutral colors complement any outfit or sleep set beautifully.",
    features: [
      "Premium satin - softer than silk",
      "12-pack value set",
      "Prevents hair breakage and frizz",
      "No creases or kinks in hair",
      "Perfect for sleep or style",
      "Neutral colors match everything"
    ],
    certifications: ["Silky Satin", "Hair-Safe"],
    productDetails: {
      fabric: "High-quality satin polyester",
      care: "Hand wash cold, air dry flat",
      fit: "Standard elastic size fits most hair types - thin, thick, curly",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Nighttime Routine",
        suggestion: "Use to protect hair while sleeping - wake up with smoother, healthier hair"
      },
      {
        occasion: "Workout Style",
        suggestion: "Secure hair during yoga or gym sessions without damaging strands"
      },
      {
        occasion: "Messy Bun Days",
        suggestion: "Create effortless buns and ponytails that won't crease your hair"
      },
      {
        occasion: "Gift Giving",
        suggestion: "Perfect stocking stuffer or addition to self-care gift baskets"
      }
    ]
  },
  {
    id: "fsh-011",
    name: "Gossifan Wide Brim Fedora Hat",
    brand: "Gossifan",
    category: "Accessories",
    description: "Classic wide brim felt panama hat with belt buckle accent. Gradient color design adds a modern touch to a timeless style. Adjustable fit for all-day comfort.",
    price: 24.79,
    originalPrice: 30.99,
    colors: ["Camel/Black", "Burgundy/Black", "Grey/Black"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-011/lifestyle-1764870939275.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B09QRWVFZ3?tag=lunarituals10-20",
    // Enhanced details
    rating: 4.3,
    reviewCount: 2847,
    socialProof: "50+ bought in past month",
    isPrime: true,
    styleNotes: "This wide brim fedora combines classic panama hat styling with modern gradient coloring for a fresh take on timeless headwear. The felt construction provides structure while the belt buckle detail adds visual interest. Perfect for adding sophisticated finishing touches to both casual and dressed-up looks while providing sun protection.",
    features: [
      "Wide brim for sun protection",
      "Gradient color design",
      "Belt buckle accent detail",
      "Adjustable inner band",
      "Structured felt construction",
      "Unisex styling"
    ],
    certifications: ["Wool Felt", "Adjustable Fit"],
    productDetails: {
      fabric: "Wool felt blend",
      care: "Spot clean only, reshape while damp if needed",
      fit: "Adjustable fit with inner sweatband - fits most head sizes",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Fall Fashion",
        suggestion: "Pair with an oversized blazer and jeans for polished autumn style"
      },
      {
        occasion: "Beach Day",
        suggestion: "Wear with a linen dress and sandals for chic sun protection"
      },
      {
        occasion: "Festival Look",
        suggestion: "Style with boho separates and ankle boots for music festival vibes"
      },
      {
        occasion: "City Exploring",
        suggestion: "Match with a trench coat and boots for sophisticated urban style"
      }
    ]
  },
  {
    id: "fsh-012",
    name: "SOJOS Retro Oval Polarized Sunglasses",
    brand: "SOJOS",
    category: "Accessories",
    description: "Chic 90s retro oval sunglasses with gold metal frame. Polarized lenses provide UV400 protection. Lightweight and durable for everyday style.",
    price: 8.99,
    originalPrice: 15.99,
    badge: "Hot Deal",
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-012/lifestyle-1764871026020.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/dp/B0FBWGSQMM?tag=lunarituals10-20",
    // Enhanced details
    rating: 3.8,
    reviewCount: 29,
    isPrime: true,
    styleNotes: "These retro oval sunglasses capture the iconic 90s aesthetic with modern UV protection technology. The small oval lens shape and metal frame create a vintage-inspired look that's both trendy and timeless. Polarized lenses reduce glare while the lightweight construction ensures all-day comfort - perfect for adding Y2K flair to any outfit.",
    features: [
      "90s retro oval design",
      "Polarized UV400 protection",
      "Metal frame construction",
      "Lightweight and comfortable",
      "Available in multiple colors",
      "Unisex styling"
    ],
    certifications: ["UV400 Protection", "Lightweight"],
    productDetails: {
      fabric: "Metal frame with polarized polycarbonate lenses",
      care: "Clean with microfiber cloth, store in protective case",
      fit: "Small to medium face size - compact oval lens shape",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "90s Throwback",
        suggestion: "Pair with baggy jeans and a crop top for authentic Y2K vibes"
      },
      {
        occasion: "Beach Day",
        suggestion: "Wear with a bikini and sarong for retro beach babe style"
      },
      {
        occasion: "Festival Fashion",
        suggestion: "Style with a slip dress and combat boots for edgy festival looks"
      },
      {
        occasion: "City Streets",
        suggestion: "Match with an oversized blazer and sneakers for urban cool"
      }
    ]
  },
  {
    id: "fsh-013",
    name: "DREAM PAIRS Women's Knee High Boots",
    brand: "DREAM PAIRS",
    category: "Shoes",
    description: "Classic knee-high pull-on boots perfect for fall and winter. Features a comfortable fit, versatile design, and quality construction. Ideal for pairing with jeans, dresses, or skirts for effortless seasonal style.",
    price: 44.99,
    originalPrice: 58.99,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Brown", "Taupe"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-013/lifestyle-1764871130621.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/DREAM-PAIRS-Womens-Black-Weather/dp/B01G990RDK?crid=1XC8BGG3LBDI8&dib=eyJ2IjoiMSJ9._WcQbEU6v6HOUhUG_kIJ7ALyxbH9zchjElZTzt_5AUgzY6NtdIQaokzOAEz-bFz4-jCCckdIk4wQta7fz_pCEGhpO7Fk4GctdCnNOhTuJcgbswIggIsDyD9yruVON1ao9u1RRmfoSbpCCLAHvOE5q1iJUG79hCJlMS_tNaxJtUipyegRocVZd4Q3hIBE3s7GP1rcEZrZdD5Z-VNaXjrBl3FcwBvX9Ndbq5ZSu2a1QPQgDHnIyCEmuaChCJTnhKYbxCHJeCwZN1UjH9YWaMhFtP2NZfKxsvqqxE2JuZNmJ4E.Woi_1G3-bocty7p5xUui2whfXYB7wkfm6etB-rl550Q&dib_tag=se&keywords=womens%2Bfall%2Bboots&qid=1763584235&sprefix=womens%2Bfall%2Bboots%2Caps%2C157&sr=8-10&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=c797c75d3ffa15f7e0a74fe9d4ee7c53&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.4,
    reviewCount: 10311,
    socialProof: "800+ bought in past month",
    isPrime: true,
    styleNotes: "These classic knee-high boots combine timeless silhouette with everyday wearability. The pull-on design offers easy on-off convenience while the mid-calf height creates a versatile look that pairs beautifully with everything from skinny jeans to flowy dresses. Quality construction ensures these boots will be your go-to fall and winter footwear season after season.",
    features: [
      "Classic knee-high silhouette",
      "Pull-on design for easy wear",
      "Comfortable fit for all-day wear",
      "Quality construction",
      "Versatile styling options",
      "Available in multiple colors"
    ],
    certifications: ["Comfortable Fit", "Pull-On Design"],
    productDetails: {
      fabric: "Synthetic upper with durable sole",
      care: "Wipe clean with damp cloth, avoid excessive moisture",
      fit: "True to size - pull-on style, regular calf width",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Office Chic",
        suggestion: "Pair with black skinny jeans and a blazer for polished workwear"
      },
      {
        occasion: "Weekend Casual",
        suggestion: "Style with a sweater dress and tights for cozy weekend vibes"
      },
      {
        occasion: "Date Night",
        suggestion: "Wear with a midi skirt and fitted top for elegant evening style"
      },
      {
        occasion: "Fall Layers",
        suggestion: "Match with leggings and an oversized cardigan for relaxed autumn looks"
      }
    ]
  },
  {
    id: "fsh-015",
    name: "XZQTIVE 3 Pack Women Belts for Jeans",
    brand: "XZQTIVE",
    category: "Accessories",
    description: "Versatile 3-pack leather waist belts with elegant gold buckles. Perfect for jeans, dresses, and pants. Classic design works for casual or professional settings. Essential wardrobe staple in three coordinating colors.",
    price: 24.89,
    originalPrice: 27.89,
    badge: "#1 Best Seller",
    colors: ["Black", "Brown", "Cream"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-015/lifestyle-1764871218819.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/XZQTIVE-Dresses-Ladies-Leather-Buckle/dp/B0CLJFZRH2?crid=2T8VDBI5GBCXE&dib=eyJ2IjoiMSJ9.Qw38qq-rL8zDFC-teFmzgcH9rbPy3wbdOniVrY0t-rggQYYRRRG9WPV8lWaUGxeR9b25iXIJudEBQ9obP5jTKXSEpnm9a2SbnilnfJKQoDlxh0s47mX00BFjS2rTQVnwHVAVq70Rk83MuIzFCTJfKSWbCF-uiAlD0QFjzoEQeiNgb2Vy5__jRheOs9EhZY3JQcWwFVFugj55qtE6HKrwUDvg2v-61D1_E58vfBhXhlLXgqy5DAOMh-V7TvhzyMAUm8qmEZ4H_MeDDn4vuvunNxVqG_b9hHu5cHn5obUCTnU.ltN8mmoaPw-O7wzbz8GK1fImNwtToxcSkT6iIznNZvk&dib_tag=se&keywords=womens%2Bbelts&qid=1763584771&sprefix=womens%2Bbelts%2Caps%2C741&sr=8-1&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=ec36209f92a9547b848183d477b6441c&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.6,
    reviewCount: 3866,
    socialProof: "6K+ bought in past month",
    isPrime: true,
    styleNotes: "This #1 bestselling 3-pack belt set is the ultimate wardrobe essential. Three versatile colors (black, brown, cream) ensure you always have the perfect match, while the gold buckle adds a touch of elegance to any outfit. From cinching dresses to elevating jeans, these quality belts work from casual weekends to professional settings - making them an incredible value.",
    features: [
      "3-pack in coordinating colors",
      "High-quality leather construction",
      "Elegant gold buckle detail",
      "Versatile for multiple occasions",
      "Adjustable fit",
      "#1 Best Seller in category"
    ],
    certifications: ["Premium Leather", "Adjustable"],
    productDetails: {
      fabric: "Premium PU leather with metal buckle",
      care: "Wipe clean with damp cloth, avoid prolonged moisture exposure",
      fit: "Adjustable - multiple hole settings for custom fit",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Work Professional",
        suggestion: "Wear with dress pants and a tucked blouse for polished office style"
      },
      {
        occasion: "Casual Weekend",
        suggestion: "Pair with high-waisted jeans and a tucked tee for effortless casual looks"
      },
      {
        occasion: "Dress Styling",
        suggestion: "Cinch over a flowy dress to define waist and add structure"
      },
      {
        occasion: "Layered Looks",
        suggestion: "Add over a cardigan or blazer to create visual interest"
      }
    ]
  },
  {
    id: "fsh-016",
    name: "High Waisted Ripped Skinny Jeans",
    brand: "LOVER BRAND FASHION",
    category: "Bottoms",
    description: "High-waisted stretch skinny jeans with trendy destroyed ripped distressed detailing. Features a comfortable stretch fit that hugs your curves while the high-rise design flatters and elongates. Perfect for creating edgy casual looks with a modern edge.",
    price: 24.99,
    originalPrice: 27.99,
    sizes: ["S", "M", "L", "XL", "1X", "2X", "3X"],
    colors: ["Black", "Olive", "Mustard"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-016/lifestyle-1764871325022.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/LOVER-BRAND-FASHION-Waisted-Rise-Distressed/dp/B07B6TT6F3?crid=3NE6PB167JEZC&dib=eyJ2IjoiMSJ9.U8CzB686tvJ3fA0AA7uEZoZ-nDrdED_f8xsZtWAdRnNrj93o1_jX6eBxspEjVbm0H30RbD8ruICI-9bbf3FvrqU8lSeI5rHfe0mJS8wSsozt8Gq5XsXedF2MCYo1XIM9ypwQktJ8N5huniqGYp8RDdTTAJJcRcugV2rC3XKrJ24CI4J75wmIvqcuAlbNgIS42cu247bQgVffbjaUeEsEQvc94Dd-m28X9-fkA3U78xO0ypGO6e150ZuHifrA87ciIOnatVKNSc3rrw2pZIgfm8SQcWTNBB8DCGts-8bd9pg.SodubwEn5Dczd05Dn1UvIJWWCAonVe66EWK7NXQkg8I&dib_tag=se&keywords=womens%2Bdenim%2Bjeans%2Bripped&qid=1763485361&sprefix=womens%2Bdenim%2Bjeans%2Bripped%2Caps%2C129&sr=8-1&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=a1a087e8f4b962b63a80d7f36b6b46b1&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.2,
    reviewCount: 11292,
    socialProof: "500+ bought in past month",
    isPrime: true,
    styleNotes: "These high-waisted ripped jeans bring edgy street style to your everyday wardrobe. The strategic distressing adds a lived-in, fashion-forward vibe while the stretch denim ensures comfort throughout the day. The high-rise cut creates a flattering silhouette that pairs perfectly with crop tops, bodysuits, or tucked-in tees for effortlessly cool looks.",
    features: [
      "High-waisted design",
      "Destroyed ripped detailing",
      "Stretch denim for comfort",
      "Skinny fit silhouette",
      "Button closure",
      "Multiple color options"
    ],
    certifications: ["Stretchy Denim", "High-Waisted"],
    productDetails: {
      fabric: "Stretch cotton denim blend",
      care: "Machine wash cold with like colors, tumble dry low",
      fit: "High-rise skinny fit - stretchy, true to size",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Edgy Casual",
        suggestion: "Pair with a graphic tee and sneakers for street-style vibes"
      },
      {
        occasion: "Night Out",
        suggestion: "Style with a bodysuit and heels for confident evening looks"
      },
      {
        occasion: "Festival Fashion",
        suggestion: "Wear with a crop top and combat boots for music festival style"
      },
      {
        occasion: "Layered Autumn",
        suggestion: "Match with an oversized flannel and ankle boots for fall fashion"
      }
    ]
  },
  {
    id: "fsh-017",
    name: "High Waist Stretchy Jeggings",
    brand: "IUGA",
    category: "Bottoms",
    description: "Ultra-comfortable stretchy jeggings with tummy control and a flattering high waist design. The perfect blend of leggings comfort and jeans styling with functional pockets. Ideal for casual wear that's both comfortable and polished.",
    price: 19.99,
    originalPrice: 41.99,
    sizes: ["S", "M", "L", "XL", "1X", "2X"],
    colors: ["Dark Blue", "Black", "Grey"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-017/lifestyle-1764871436184.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/IUGA-Jeggings-Waisted-Stretchy-Leggings/dp/B0CJBHLF3J?crid=SBN85EWB2WDK&dib=eyJ2IjoiMSJ9.pJK3xqDv-fSGyXNZ_WQqI2jpJlByB_5wpWLFoICM1IczSpfiy0KhpsZaTfaSt8GKTtiMifs4RVRxgmRJHHPyoYFJcWgX8Hrwt0pGd-7mA4JeuMTqJkNviFNQ0iv0mq17YwjR9WnFj09ip4NCT3krSgFZk0DBqDu2apefA8PuzVVpfyXTvALkO67A0bbqcaP6xpqnqW-iRWIbfTrjtYdQkAnnYFTWnSNTqcfw9mK1n-LANtGpSKvD0XUVpcRG4TfDhVodFLRynsCZrlfgagkiW8nz5P33JzpHGvKZ3zxndNs.ow19oZLpV0h12yLbvk-RlX-0ZdU5sWSxZjmbpnjObmM&dib_tag=se&keywords=womens%2Bdenim%2Bjeans&qid=1763486015&sprefix=womens%2Bdenim%2Bjeans%2B%2Caps%2C149&sr=8-5-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=3f7c76b5784c9f9c809fa697bbe61467&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.3,
    reviewCount: 1777,
    socialProof: "1K+ bought in past month",
    isPrime: true,
    styleNotes: "These IUGA jeggings are the perfect hybrid of leggings comfort and jeans style. The high-waisted design offers tummy control and a flattering silhouette, while the stretchy fabric moves with you throughout the day. Functional pockets add practicality without compromising the sleek look - making these your new go-to for everything from errands to casual outings.",
    features: [
      "High waist with tummy control",
      "Ultra-stretchy denim-look fabric",
      "Functional pockets",
      "Pull-on design",
      "Skinny fit silhouette",
      "All-day comfort"
    ],
    certifications: ["Ultra-Stretchy", "Tummy Control"],
    productDetails: {
      fabric: "Stretchy denim-look polyester blend",
      care: "Machine wash cold, tumble dry low",
      fit: "High-rise pull-on fit - very stretchy, true to size",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Everyday Comfort",
        suggestion: "Pair with a tunic top and flats for relaxed everyday style"
      },
      {
        occasion: "Work Casual",
        suggestion: "Style with a button-down and loafers for comfortable office wear"
      },
      {
        occasion: "Weekend Errands",
        suggestion: "Wear with a cozy sweater and sneakers for running errands in comfort"
      },
      {
        occasion: "Casual Night",
        suggestion: "Match with a nice top and ankle boots for easy dinner-out style"
      }
    ]
  },
  {
    id: "fsh-018",
    name: "High Waist Yoga Pants",
    brand: "OQQ",
    category: "Activewear",
    description: "Soft stretch casual straight leg yoga bottoms designed for all-day comfort. Features a high waist for support and flattering fit. Perfect for yoga, lounging, or casual outings with their versatile straight leg design.",
    price: 26.39,
    originalPrice: 45.00,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Dark Brown", "Grey"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-018/lifestyle-1764871627777.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/OQQ-Pants-Women-Straight-Darkbrown/dp/B0FDKW1SDT?crid=2VU4ZW93T9CGC&dib=eyJ2IjoiMSJ9.Ay3SUOu8xaSZf7Ftiodx3YZkT3bivfOYyiccqnWSjdM9nGSSBYuwISQ162RoxGfkNHrVlib6Io5OMhs2gzQW3kFpAyBdiSZJcty6S2blCO0EzUbm5Je1it1bDLWFeh0WICdTQVWk-ker7aXbpwZBEF9xj-i5614RtEuptGoQV9EegBegZncyGzbR5smtIRqnyruEVIOBHw-8e__LkE94kBP1OD6jMaFh3JB9Hn5ymoFh28kLGftbY66vsIx5aNQzmSNpFspIqBGQNnY_W61P-CJOolZ67vtFXM7igfmhw7I.T755V6EBN5UYdcIOEGXOT_N0Y4rBqYXedV2yw71kk50&dib_tag=se&keywords=womens%2Bfall%2Bsweatshirt&qid=1763486142&sprefix=womens%2Bfall%2Bsweatshirt,aps,144&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&psc=1&linkCode=sl1&tag=lunarituals10-20&linkId=a18073805ee1b89b10b8c07fd557be4b&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.1,
    reviewCount: 760,
    socialProof: "2K+ bought in past month",
    isPrime: true,
    styleNotes: "These OQQ yoga pants redefine versatile comfort. The straight leg design offers a more relaxed alternative to traditional leggings while the soft, stretchy fabric ensures freedom of movement for workouts or daily wear. The high waist provides both support and a flattering silhouette - making these perfect for yoga class, lounging at home, or casual weekend outings.",
    features: [
      "Straight leg design",
      "High waist for support",
      "Soft stretch fabric",
      "Breathable and lightweight",
      "Versatile styling",
      "Casual comfort fit"
    ],
    certifications: ["Soft Stretch", "Breathable"],
    productDetails: {
      fabric: "Soft stretch polyester blend",
      care: "Machine wash cold, tumble dry low",
      fit: "High-rise straight leg - relaxed fit, true to size",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Yoga & Wellness",
        suggestion: "Pair with a fitted tank or sports bra for yoga or Pilates classes"
      },
      {
        occasion: "Athleisure",
        suggestion: "Style with a cropped hoodie and sneakers for trendy casual looks"
      },
      {
        occasion: "Loungewear",
        suggestion: "Wear with an oversized tee for comfortable at-home style"
      },
      {
        occasion: "Coffee Run",
        suggestion: "Match with a sweatshirt and slip-on shoes for quick errand outfits"
      }
    ]
  },
  {
    id: "fsh-019",
    name: "Plaid Shacket Jacket",
    brand: "Beaully",
    category: "Outerwear",
    description: "Cozy 2025 fall fashion meets classic style with this plaid flannel shacket. Features a button-down front, long sleeves, and relaxed fit perfect for layering. The timeless brushed flannel fabric adds warmth and sophistication to any casual outfit.",
    price: 23.61,
    originalPrice: 45.89,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Camel Plaid", "Grey Plaid", "Red Plaid"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-019/lifestyle-1764871715325.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/Brushed-Flannel-Pocketed-Shackets-X-Large/dp/B09NRJ8F5R?crid=1BN326ZN8K6V8&dib=eyJ2IjoiMSJ9.Ay3SUOu8xaSZf7Ftiodx3UVmyT90nKOxYX3lhzwuIOoohmR52xw2Ht1wyew74DaE-wTeqDtmZ1cgAPCdQm1ErU0gbT6ec4OCtKETQZ9Ai4EEzUbm5Je1it1bDLWFeh0WICdTQVWk-ker7aXbpwZBEF9xj-i5614RtEuptGoQV9EegBegZncyGzbR5smtIRqnyruEVIOBHw-8e__LkE94kBP1OD6jMaFh3JB9Hn5ymoFh28kLGftbY66vsIx5aNQzmSNpFspIqBGQNnY_W61P-CJOolZ67vtFXM7igfmhw7I.0Cn5AWJDmppZRNdKjyGm6CLIYiBRbtADT-pEb3MiEFA&dib_tag=se&keywords=womens%2Bfall%2Bsweatshirt&qid=1763486284&sprefix=womens%2Bfall%2Bsweatshirt%2Caps%2C482&sr=8-5-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=5fe5999eeda8edae48c75f6c7c589edc&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.4,
    reviewCount: 3046,
    socialProof: "500+ bought in past month",
    isPrime: true,
    styleNotes: "This trendy 2025 fall shacket perfectly blends shirt and jacket functionality. The brushed flannel fabric provides cozy warmth without bulk, while the button-front design allows for versatile styling - wear it open as a layer or buttoned as a shirt. The classic plaid pattern adds timeless appeal that transitions seamlessly from outdoor adventures to casual coffee dates.",
    features: [
      "Button-down front",
      "Soft brushed flannel fabric",
      "Pocketed design",
      "Relaxed oversized fit",
      "Long sleeves with cuffs",
      "Perfect for layering"
    ],
    certifications: ["Soft Flannel", "Oversized Fit"],
    productDetails: {
      fabric: "Soft brushed flannel polyester blend",
      care: "Machine wash cold, tumble dry low",
      fit: "Relaxed oversized fit - great for layering",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Fall Layers",
        suggestion: "Layer over a tee with jeans and boots for classic autumn style"
      },
      {
        occasion: "Outdoor Adventure",
        suggestion: "Wear as an outer layer with leggings and hiking boots for trails"
      },
      {
        occasion: "Casual Weekend",
        suggestion: "Button up and pair with black jeans for effortless weekend looks"
      },
      {
        occasion: "Cozy Comfort",
        suggestion: "Layer over a hoodie for extra warmth on chilly days"
      }
    ]
  },
  {
    id: "fsh-020",
    name: "Oversized Batwing Sweater",
    brand: "LILLUSORY",
    category: "Knitwear",
    description: "Trendy oversized crewneck knit pullover with distinctive side slit design and batwing sleeves. This OEKO-TEX certified fashion-forward sweater offers cozy comfort with an elevated asymmetric hemline. Perfect for creating effortless 2025 fall outfits.",
    price: 26.59,
    originalPrice: 36.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Nutmeg", "Brown", "Black", "Grey"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-020/lifestyle-1764871816522.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/LILLUSORY-Sweaters-Crewneck-Oversized-Pullover/dp/B0BFL5MKKC?crid=3NE8IPYLW4A3E&dib=eyJ2IjoiMSJ9.3VXmLjSnGin3FTM1kP_n2y60TtrfVce4iiD-Fa56xijLCgTyyobffrA1XATDk6BWiKYSdWzehoKhYxrpFI4iqMjxYF0Qe7tRs6WmKxZk2JJk0c-iAqckQd88GReYZ2TgnYh8yua7855nJlplNHRXFtWu31uVHCbACM9dY4V-LsZXAUu9TDi3CvKZvYhin_2l8c1lu8Jz-L1HUeVHCLwW6Pa1ssCb2vmvX4oHdXC0MkOI-vqXgUGJIqwC3W_Pl7iHScfp7U-mZE_RqWdFHx0mbOBa3_1zEsmyEMhKCzgmG3M.IRh-qiE2li-Ropnk9OLqpMkwZ_mQKv-dWb3dPUUxwYc&dib_tag=se&keywords=womens%2Bfall%2Bsweatshirt&qid=1763486380&sprefix=womens%2Bfall%2Bsweatshirt%2Caps%2C225&sr=8-3&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=7ad1357daa5942de565280b38bdf203f&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.4,
    reviewCount: 6890,
    socialProof: "2K+ bought in past month",
    isPrime: true,
    styleNotes: "This OEKO-TEX certified oversized sweater defines modern cozy chic. The distinctive batwing sleeves and side slit details add fashion-forward flair to the classic crewneck silhouette. The oversized fit creates an effortlessly cool, lived-in look while the soft knit fabric ensures comfort. Plus, knowing it's made with safer chemicals gives you peace of mind with every wear.",
    features: [
      "Oversized batwing sleeves",
      "Side slit asymmetric hem",
      "OEKO-TEX STANDARD 100 certified",
      "Crewneck design",
      "Soft knit construction",
      "Fashion-forward 2025 style"
    ],
    certifications: ["Soft Knit", "OEKO-TEX Certified"],
    productDetails: {
      fabric: "Soft knit blend - OEKO-TEX certified safe",
      care: "Hand wash cold or gentle machine wash, lay flat to dry",
      fit: "Oversized relaxed fit - intentionally roomy",
      origin: "Imported, Certification #25.HCN.75532"
    },
    stylingIdeas: [
      {
        occasion: "Casual Chic",
        suggestion: "Pair with leggings and ankle boots for effortless style"
      },
      {
        occasion: "Layered Look",
        suggestion: "Wear over a collared shirt with jeans for preppy layering"
      },
      {
        occasion: "Cozy Weekend",
        suggestion: "Style with joggers and slippers for ultimate comfort"
      },
      {
        occasion: "Fall Fashion",
        suggestion: "Match with skinny jeans and booties for trendy autumn outfits"
      }
    ]
  },
  {
    id: "fsh-021",
    name: "Faux Fur Pom Beanie Hat",
    brand: "FURTALK",
    category: "Accessories",
    description: "Cozy winter warmth meets timeless style with this OEKO-TEX certified knitted beanie featuring a luxurious faux fur pom. The warm knit skull cap design with fleece lining provides comfortable coverage while the statement fur pom adds a playful touch. Perfect for cold weather fashion.",
    price: 12.34,
    originalPrice: 19.99,
    colors: ["Cream", "Black", "Grey", "Camel", "Burgundy"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-021/styled-1764871977376.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/Womens-Knitted-Winter-Beanie-bobble/dp/B074TFDM7K?crid=FVUEQBAIL6B9&dib=eyJ2IjoiMSJ9.VGQJmpwr9gVAIxS4F8ejqYMuZ3YFDmhKCQQyC2FBI30psWVxzctoBLHGfzZ5ptG5YSOKvYyHU_IgOwzECWegUNx__iwIRLwLmrfxIhsikbbA8H6jDC_AhLGmRqJeWGf3jDC3c5SYEL-_lWf5XDhWZrhWV6yleh_tjnldC9J5BZvg-WrS4VAQspWSs9qKoO1xV4vKm-3NPmgz5vicxL0NDybiLLJFLpZtphtJtQDFy5sAYxA-V597d0pu806WyBhfCXa-nWpdESyIAa5Uokqtf_I_YZe8kID74j1TbectYAI.xib3eAif2qbUdAjgYHa_bybxCdqFHDqy1ecHkIYFS1I&dib_tag=se&keywords=womens%2Bfall%2Bhat&qid=1763486538&sprefix=womens%2Bfall%2Bhat%2Caps%2C154&sr=8-15&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=544e3990644e3339f9b663850523ca72&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.7,
    reviewCount: 17505,
    isPrime: true,
    styleNotes: "This highly-rated OEKO-TEX certified beanie combines winter warmth with playful style. The soft knit construction with fleece lining keeps you cozy in cold weather, while the statement faux fur pom adds a touch of whimsy. With over 17,000 five-star reviews, this bestseller proves that quality, comfort, and style can coexist - all while being made with safer chemicals for you and the environment.",
    features: [
      "Faux fur pom detail",
      "Soft knit construction",
      "Fleece lined for warmth",
      "OEKO-TEX STANDARD 100 certified",
      "Stretchy comfortable fit",
      "Multiple color options"
    ],
    certifications: ["Fleece Lined", "Stretchy Fit"],
    productDetails: {
      fabric: "Knit acrylic with fleece lining - OEKO-TEX certified",
      care: "Hand wash cold, reshape and air dry flat",
      fit: "One size fits most - stretchy knit adapts to head size",
      origin: "Imported, Certification #23.HCN.22830"
    },
    stylingIdeas: [
      {
        occasion: "Winter Casual",
        suggestion: "Pair with a puffer coat and jeans for cozy cold-weather style"
      },
      {
        occasion: "Ski Trip",
        suggestion: "Wear with a ski jacket and snow pants for slope-ready fashion"
      },
      {
        occasion: "Coffee Date",
        suggestion: "Style with a cozy sweater and leggings for cute winter outfits"
      },
      {
        occasion: "Holiday Season",
        suggestion: "Match with a festive sweater for cheerful holiday gatherings"
      }
    ]
  },
  {
    id: "fsh-022",
    name: "Winter Accessories Gift Set",
    brand: "APEVAN",
    category: "Accessories",
    description: "Complete winter warmth essentials in one beautiful 4-in-1 set. Includes a fleece-lined beanie, long scarf, touchscreen gloves, and ear warmers. Coordinated design with premium fleece lining for extra warmth and comfort. Makes a perfect gift or treat yourself bundle.",
    price: 34.99,
    originalPrice: 49.99,
    colors: ["White", "Black", "Army Green", "Grey"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-022/lifestyle-1764872009562.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/Earmuffs-Touchscreen-Adjustable-Fashionable-Weather-01/dp/B0FHNVC3XF?crid=2PNJGZUJS86F&dib=eyJ2IjoiMSJ9.VGQJmpwr9gVAIxS4F8ejqYMuZ3YFDmhKCQQyC2FBI30psWVxzctoBLHGfzZ5ptG5YSOKvYyHU_IgOwzECWegUNx__iwIRLwLmrfxIhsikbbA8H6jDC_AhLGmRqJeWGf3jDC3c5SYEL-_lWf5XDhWZrhWV6yleh_tjnldC9J5BZvg-WrS4VAQspWSs9qKoO1xV4vKm-3NPmgz5vicxL0NDybiLLJFLpZtphtJtQDFy5sAYxA-V597d0pu806WyBhfCXa-nWpdESyIAa5Uokqtf_I_YZe8kID74j1TbectYAI.xib3eAif2qbUdAjgYHa_bybxCdqFHDqy1ecHkIYFS1I&dib_tag=se&keywords=womens%2Bfall%2Bhat&qid=1763487037&sprefix=womens%2Bfall%2Bhat%2Caps%2C454&sr=8-38&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=c7d3e35830659d977774ca44680ea0bd&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.9,
    reviewCount: 117,
    socialProof: "50+ bought in past month",
    isPrime: true,
    styleNotes: "This highly-rated 4-in-1 winter accessories set is the ultimate cold-weather solution. The coordinated pieces (fleece-lined beanie, long scarf, touchscreen gloves, ear warmers) work together or separately for maximum versatility. The touchscreen-compatible gloves mean you don't have to choose between warmth and connectivity. With a perfect 4.9 rating, this makes an ideal gift set or personal winter wardrobe essential.",
    features: [
      "4-piece coordinated set",
      "Fleece lined for warmth",
      "Touchscreen compatible gloves",
      "Adjustable ear warmers",
      "Long scarf for versatility",
      "Gift-ready presentation"
    ],
    certifications: ["Fleece Lined", "Touchscreen Compatible"],
    productDetails: {
      fabric: "Soft knit with fleece lining",
      care: "Hand wash cold, lay flat to dry",
      fit: "One size fits most - adjustable components",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Winter Commute",
        suggestion: "Wear the full set for maximum warmth during cold commutes"
      },
      {
        occasion: "Gift Giving",
        suggestion: "Perfect ready-to-give gift set for holidays or birthdays"
      },
      {
        occasion: "Outdoor Activities",
        suggestion: "Use ear warmers and gloves for running or hiking"
      },
      {
        occasion: "Mix & Match",
        suggestion: "Pair individual pieces with different outfits throughout winter"
      }
    ]
  },
  {
    id: "fsh-023",
    name: "Waterproof Puffer Coat",
    brand: "MOERDENG",
    category: "Outerwear",
    description: "Stay warm and dry all winter with this thickened fleece-lined waterproof puffer coat. Features a detachable faux fur hood, down jacket insulation, and multiple pockets. The waterproof parka design provides protection from elements without bulk.",
    price: 55.99,
    originalPrice: 69.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Dark Grey", "Denim Blue"],
    image: "https://tfximqohiizipawvzkms.supabase.co/storage/v1/object/public/product-images/fashion/fsh-023/styled-1764872189408.png",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/MOERDENG-Womens-Thicken-Waterproof-Detachable/dp/B0CDBSGTTH?dib=eyJ2IjoiMSJ9.kckKtKS-XbJV3vWd2j6OxXESA1RkM0NMA17uirHyLhILXrZfIFd001GH1eGJMgrhsU-3BzAg81JfgGt_cPO8vGUMQXEKoGXmqV56DA9NTtDpkUOWFi_y5O0gwahLtnFwK7-zEuq_iUbi77wU4JKxX5ijWGrOXgKxGtvPz0cALpMSF227m9ZSA5fRyYCS6GL1geOMtJdvBUI2NvaeVzgIZrbuoIRGGDINdr8gG5uzIhnLyulalSaH-NKgjt3DAMrDBPkV3WBJ25o6yIQr9FoEYnzoR65Lo6Hf4JzLxYmARKQ.ZbsZ8_3W_rq9mOg02EIrs5MVXWhCLjRQqLpsYzIwTPo&dib_tag=se&keywords=womens%2Bcoats&qid=1763487201&s=apparel&sr=1-6&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=98dd2972af8c1a20d220e304004b0d43&language=en_US&ref_=as_li_ss_tl&psc=1",
    // Enhanced details
    rating: 4.5,
    reviewCount: 1972,
    socialProof: "1K+ bought in past month",
    isPrime: true,
    styleNotes: "This bestselling waterproof puffer coat is your ultimate winter armor. The fleece-lined interior provides cozy warmth while the waterproof exterior shields you from rain and snow. The detachable faux fur hood adds versatility - remove it for a sleeker look or keep it on for extra warmth. With over 1,000 purchases last month, this coat proves that style and function can coexist beautifully.",
    features: [
      "Waterproof exterior",
      "Thickened fleece lining",
      "Detachable faux fur hood",
      "Multiple pockets",
      "Down jacket insulation",
      "Windproof design"
    ],
    certifications: ["Waterproof", "Fleece Lined"],
    productDetails: {
      fabric: "Waterproof polyester shell with fleece lining and down fill",
      care: "Machine wash cold gentle cycle, tumble dry low",
      fit: "True to size with room for layering",
      origin: "Imported"
    },
    stylingIdeas: [
      {
        occasion: "Winter Commute",
        suggestion: "Pair with jeans and boots for weather-proof daily wear"
      },
      {
        occasion: "Snow Day",
        suggestion: "Wear with snow pants and winter boots for outdoor activities"
      },
      {
        occasion: "Casual Weekend",
        suggestion: "Style with leggings and sneakers for errands in cold weather"
      },
      {
        occasion: "Travel",
        suggestion: "Perfect packable coat for winter vacations or ski trips"
      }
    ]
  },
  {
    id: "fsh-024",
    name: "Gold Hoop Earrings Set",
    brand: "LOLIAS",
    category: "Accessories",
    description: "Delicate 14K gold plated small chunky hoop earrings perfect for everyday wear. Hypoallergenic and nickel-free for sensitive ears with 95% recycled materials (RCS100 certified). Lightweight huggie hoops comfortable for all-day wear. Set of 3 pairs in varying sizes for versatile styling and multiple piercings.",
    price: 8.54,
    originalPrice: 12.99,
    image: "/src/assets/product-hoop-earrings.jpg",
    inStock: true,
    affiliateUrl: "https://www.amazon.com/LOLIAS-Hypoallergenic-Sensitive-Lightweight-3Pairs-14K/dp/B0DM7H9QWV?crid=BX9K9EQ58Z2Y&dib=eyJ2IjoiMSJ9._1gSn9VgwLkCZvchWKTpjhUq5Q_Us5hGg372EzlXdLrYA4iwVoQApRfV6CVmTdXa4bkwDj9LuJ_BlRtLkGM9GkAWCfOiupnmldPE23UGP6Qzsux6EVy4vrWqzJRAojs9maJBzHFA5uJyq4hHxv87MR_2fOIXBmiUBVZqmXg190xPFjXIWJqyNqgj6zLLxKJeCi2RwVwsj6gvfFeAwFPPLegwprTEnNEgDZGfA4OAaoKbzzcDfGfXvKRfExtdeObt0DELE5SWUVLi-hOA5KE59CId-p1L1uAF0FEGCQTp064.KJLGfGgNgoXflDC1__5qyKT57vxos7hlaXDisCbZNY0&dib_tag=se&keywords=womens%2Bgold%2Bearrings&qid=1763487334&sprefix=womens%2Bgold%2Bearings%2Caps%2C149&sr=8-7&th=1&linkCode=sl1&tag=lunarituals10-20&linkId=dde4f10d23f6d2ec3c913370707757e4&language=en_US&ref_=as_li_ss_tl",
    // Enhanced details
    rating: 4.4,
    reviewCount: 691,
    socialProof: "9K+ bought in past month",
    isPrime: true,
    styleNotes: "These RCS100 certified sustainable hoop earrings (95% recycled materials) prove that eco-friendly can be beautiful. The 14K gold plating offers a luxe look while the hypoallergenic construction means no irritation for sensitive ears. Three pairs in different sizes allow for creative ear stacking or simple daily wear. With 9,000+ purchases last month, these have become the go-to hoops for style-conscious, sustainability-minded shoppers.",
    features: [
      "3-pair set in varying sizes",
      "14K gold plated finish",
      "Hypoallergenic for sensitive ears",
      "95% recycled materials (RCS100)",
      "Lightweight huggie design",
      "Non-tarnish construction"
    ],
    certifications: ["Hypoallergenic", "95% Recycled"],
    productDetails: {
      fabric: "14K gold plated brass with 95% recycled content",
      care: "Remove before water exposure, store in provided pouch",
      fit: "Small chunky huggie hoops - comfortable for all-day wear",
      origin: "Imported, Certification #TE-00081220"
    },
    stylingIdeas: [
      {
        occasion: "Everyday Minimal",
        suggestion: "Wear one pair for simple, elegant daily style"
      },
      {
        occasion: "Ear Stacking",
        suggestion: "Use all three pairs to create trendy multiple piercing looks"
      },
      {
        occasion: "Work Professional",
        suggestion: "Pair with business attire for polished, understated elegance"
      },
      {
        occasion: "Gift Giving",
        suggestion: "Perfect sustainable gift for eco-conscious jewelry lovers"
      }
    ]
  },
];
