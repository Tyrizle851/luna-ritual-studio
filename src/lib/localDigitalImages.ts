// Local digital affirmation images (user-provided, high-quality)
// These bypass Supabase storage and use local assets directly

import affirmationDigitalAff001 from "@/assets/affirmation-digital-aff-001.png";
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
import affirmationDigitalAff018 from "@/assets/affirmation-digital-aff-018.png";
import affirmationDigitalAff019 from "@/assets/affirmation-digital-aff-019.png";
import affirmationDigitalAff020 from "@/assets/affirmation-digital-aff-020.png";
import affirmationDigitalAff021 from "@/assets/affirmation-digital-aff-021.png";
import affirmationDigitalAff022 from "@/assets/affirmation-digital-aff-022.png";
import affirmationDigitalAff023 from "@/assets/affirmation-digital-aff-023.png";
import affirmationDigitalAff024 from "@/assets/affirmation-digital-aff-024.png";

// Map of affirmation IDs to their local digital image assets
// Page 1 (aff-001 to aff-006):
// aff-001: I am worthy of rest
// aff-002: I am worthy of peace
// aff-003: Growth is a journey, not a destination (PENDING)
// aff-004: I trust my journey
// aff-005: I am always enough
// aff-006: My calmness is my power

export const LOCAL_DIGITAL_IMAGES: Record<string, string> = {
  "aff-001": affirmationDigitalAff001, // I am worthy of rest
  "aff-002": affirmationDigitalAff002, // I am worthy of peace
  "aff-003": affirmationDigitalAff003, // Growth is a journey, not a destination
  "aff-004": affirmationDigitalAff004, // I trust my journey
  "aff-005": affirmationDigitalAff005, // I am always enough
  "aff-006": affirmationDigitalAff006, // My calmness is my power
  "aff-007": affirmationDigitalAff007, // I receive what I desire
  "aff-009": affirmationDigitalAff009, // I release what no longer serves
  "aff-010": affirmationDigitalAff010, // Joy is my natural state
  "aff-011": affirmationDigitalAff011, // I am safe in my body
  "aff-012": affirmationDigitalAff012, // My voice matters
  "aff-013": affirmationDigitalAff013, // I am worthy of the life I desire
  "aff-015": affirmationDigitalAff015, // I celebrate every small win
  "aff-016": affirmationDigitalAff016, // My intuition guides me
  "aff-017": affirmationDigitalAff017, // I am open to miracles
  "aff-018": affirmationDigitalAff018, // I give myself permission to feel
  "aff-019": affirmationDigitalAff019, // I am creating the life I desire
  "aff-020": affirmationDigitalAff020, // Today is full of possibility
  "aff-021": affirmationDigitalAff021, // I am allowed to change my mind
  "aff-022": affirmationDigitalAff022, // My rest is productive
  "aff-023": affirmationDigitalAff023, // I attract what I embody
  "aff-024": affirmationDigitalAff024, // I am both the storm and the calm
};

// IDs that have user-provided local images (21 total - missing aff-003, aff-008, aff-014)
export const USER_PROVIDED_IDS = [
  "aff-001", // I am worthy of rest
  "aff-002", // I am worthy of peace
  "aff-003", // Growth is a journey, not a destination
  "aff-004", // I trust my journey
  "aff-005", // I am always enough
  "aff-006", // My calmness is my power
  "aff-007", // I receive what I desire
  "aff-009", // I release what no longer serves
  "aff-010", // Joy is my natural state
  "aff-011", // I am safe in my body
  "aff-012", // My voice matters
  "aff-013", // I am worthy of the life I desire
  "aff-015", // I celebrate every small win
  "aff-016", // My intuition guides me
  "aff-017", // I am open to miracles
  "aff-018", // I give myself permission to feel
  "aff-019", // I am creating the life I desire
  "aff-020", // Today is full of possibility
  "aff-021", // I am allowed to change my mind
  "aff-022", // My rest is productive
  "aff-023", // I attract what I embody
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
