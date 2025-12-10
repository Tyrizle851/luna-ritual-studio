// Local digital affirmation images (user-provided, high-quality)
// These bypass Supabase storage and use local assets directly

import affirmationDigitalAff002 from "@/assets/affirmation-digital-aff-002.png";
import affirmationDigitalAff004 from "@/assets/affirmation-digital-aff-004.png";
import affirmationDigitalAff005 from "@/assets/affirmation-digital-aff-005.png";
import affirmationDigitalAff006 from "@/assets/affirmation-digital-aff-006.png";
import affirmationDigitalAff007 from "@/assets/affirmation-digital-aff-007.png";
import affirmationDigitalAff017 from "@/assets/affirmation-digital-aff-017.png";
import affirmationDigitalAff024 from "@/assets/affirmation-digital-aff-024.png";

// Map of affirmation IDs to their local digital image assets
// These are user-provided premium images that should not be regenerated
export const LOCAL_DIGITAL_IMAGES: Record<string, string> = {
  "aff-002": affirmationDigitalAff002, // I am worthy of peace
  "aff-004": affirmationDigitalAff004, // I am worthy of rest
  "aff-005": affirmationDigitalAff005, // I am always enough
  "aff-006": affirmationDigitalAff006, // My calmness is my power
  "aff-007": affirmationDigitalAff007, // I receive what I desire
  "aff-017": affirmationDigitalAff017, // I am open to miracles
  "aff-024": affirmationDigitalAff024, // I am both the storm and the calm
};

// IDs that have user-provided local images
export const USER_PROVIDED_IDS = [
  "aff-002", // I am worthy of peace
  "aff-004", // I am worthy of rest
  "aff-005", // I am always enough
  "aff-006", // My calmness is my power
  "aff-007", // I receive what I desire
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
