import { affirmations } from "@/data/affirmations";

export const generateAffirmationSchema = (affirmation: typeof affirmations[0], url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": affirmation.title,
    "description": affirmation.description,
    "image": affirmation.image,
    "brand": {
      "@type": "Brand",
      "name": "LunaRituals"
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "USD",
      "price": affirmation.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "LunaRituals"
      }
    },
    "category": affirmation.category,
    "sku": affirmation.id
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url?: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": item.url })
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LunaRituals",
    "url": "https://lunarituals.com",
    "logo": "https://lunarituals.com/logo.png",
    "description": "Digital affirmation art and curated lifestyle goods for women building calm, beautiful lives through intentional living.",
    "sameAs": [
      "https://instagram.com/lunarituals",
      "https://pinterest.com/lunarituals"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@lunarituals.com"
    }
  };
};