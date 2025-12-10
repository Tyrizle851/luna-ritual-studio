// Local digital affirmation images (user-provided, high-quality)
// These bypass Supabase storage and use local assets directly

import affirmationDigitalAff002 from "@/assets/affirmation-digital-aff-002.png";
import affirmationDigitalAff003 from "@/assets/affirmation-digital-aff-003.png";
import affirmationDigitalAff004 from "@/assets/affirmation-digital-aff-004.png";
import affirmationDigitalAff005 from "@/assets/affirmation-digital-aff-005.png";
import affirmationDigitalAff006 from "@/assets/affirmation-digital-aff-006.png";
import affirmationDigitalAff007 from "@/assets/affirmation-digital-aff-007.png";
import affirmationDigitalAff009 from "@/assets/affirmation-digital-aff-009.png";
import affirmationDigitalAff010 from "@/assets/affirmation-digital-aff-010.png";
import affirmationDigitalAff011 from "@/assets/affirmation-digital-aff-011.png";
import affirmationDigitalAff012 from "@/assets/affirmation-digital-aff-012.png";
import affirmationDigitalAff013 from "@/assets/affirmation-digital-aff-013.png";
import affirmationDigitalAff015 from "@/assets/affirmation-digital-aff-015.png";
import affirmationDigitalAff016 from "@/assets/affirmation-digital-aff-016.png";
import affirmationDigitalAff017 from "@/assets/affirmation-digital-aff-017.png";
import affirmationDigitalAff024 from "@/assets/affirmation-digital-aff-024.png";

// Map of affirmation IDs to their local digital image assets
// These are user-provided premium images that should not be regenerated
export const LOCAL_DIGITAL_IMAGES: Record<string, string> = {
  "aff-002": affirmationDigitalAff002, // I am worthy of peace
  "aff-003": affirmationDigitalAff003, // I trust my journey
  "aff-004": affirmationDigitalAff004, // I am worthy of rest
  "aff-005": affirmationDigitalAff005, // I am always enough
  "aff-006": affirmationDigitalAff006, // My calmness is my power
  "aff-007": affirmationDigitalAff007, // I receive what I desire
  "aff-009": affirmationDigitalAff009, // I release what no longer serves me
  "aff-010": affirmationDigitalAff010, // I am safe in my body
  "aff-011": affirmationDigitalAff011, // Joy is my natural state
  "aff-012": affirmationDigitalAff012, // Today I honor myself
  "aff-013": affirmationDigitalAff013, // I am worthy of the life I desire
  "aff-015": affirmationDigitalAff015, // I celebrate every small win
  "aff-016": affirmationDigitalAff016, // I choose peace over perfection
  "aff-017": affirmationDigitalAff017, // I am open to miracles
  "aff-024": affirmationDigitalAff024, // I am both the storm and the calm
};

// IDs that have user-provided local images
export const USER_PROVIDED_IDS = [
  "aff-002", // I am worthy of peace
  "aff-003", // I trust my journey
  "aff-004", // I am worthy of rest
  "aff-005", // I am always enough
  "aff-006", // My calmness is my power
  "aff-007", // I receive what I desire
  "aff-009", // I release what no longer serves me
  "aff-010", // I am safe in my body
  "aff-011", // Joy is my natural state
  "aff-012", // Today I honor myself
  "aff-013", // I am worthy of the life I desire
  "aff-015", // I celebrate every small win
  "aff-016", // I choose peace over perfection
  "aff-017", // I am open to miracles
  "aff-024", // I am both the storm and the calm
];

// Check if an affirmation has a local digital image
export function hasLocalDigitalImage(productId: string): boolean {
  return productId in LOCAL_DIGITAL_IMAGES;
}

// Get the local digital image URL for an affirmation
export function getLocalDigitalImage(productId: string): string | null {
  return LOCAL_DIGITAL_IMAGES[productId] || null;
}
