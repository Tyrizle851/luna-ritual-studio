// Product ID to Image Filename Mapping
// Paste this into a Code node to map products to their real images

const imageMap = {
  // Affirmations - based on keywords in title
  "aff-001": "affirmation-rest.jpg",        // I am worthy of rest
  "aff-002": "affirmation-joy.jpg",         // I choose joy today
  "aff-003": "affirmation-abundance.jpg",   // Abundance flows to me
  "aff-004": "affirmation-trust.jpg",       // I trust my journey
  "aff-005": "affirmation-enough.jpg",      // I am enough, always
  "aff-006": "affirmation-calm.jpg",        // My calm is my power
  "aff-007": "affirmation-receive.jpg",     // I receive what I desire
  "aff-008": "affirmation-honor.jpg",       // Today, I honor myself
  "aff-009": "affirmation-release.jpg",     // I release what no longer serves
  "aff-010": "affirmation-natural-joy.jpg", // Joy is my natural state
  "aff-011": "affirmation-safe.jpg",        // I am safe in my body
  "aff-012": "affirmation-voice.jpg",       // My voice matters
  "aff-013": "affirmation-dreams.jpg",      // I am worthy of my dreams
  "aff-014": "affirmation-peace.jpg",       // I choose peace over perfection
  "aff-015": "affirmation-progress.jpg",    // I celebrate my progress
  "aff-016": "affirmation-intuition.jpg",   // My intuition guides me
  "aff-017": "affirmation-miracles.jpg",    // I am open to miracles
  "aff-018": "affirmation-feel.jpg",        // I give myself permission to feel
  "aff-019": "affirmation-creating.jpg",    // I am creating the life I desire
  "aff-020": "affirmation-possibility.jpg", // Today is full of possibility
  "aff-021": "affirmation-change.jpg",      // I am allowed to change my mind
  "aff-022": "affirmation-productive-rest.jpg", // My rest is productive
  "aff-023": "affirmation-attract.jpg",     // I attract what I embody
  "aff-024": "affirmation-duality.jpg",     // I am both the storm and the calm

  // Candles
  "cnd-001": "product-candle-1.jpg",
  "cnd-002": "product-candle-2.jpg",
  "cnd-003": "product-candle-1.jpg",  // Reuse (not enough unique images)
  "cnd-004": "product-candle-2.jpg",
  "cnd-005": "product-candle-1.jpg",
  "cnd-006": "product-candle-2.jpg",
  "cnd-007": "product-candle-1.jpg",
  "cnd-008": "product-candle-2.jpg",
  "cnd-009": "product-candle-1.jpg",
  "cnd-010": "product-candle-2.jpg",
  "cnd-011": "product-candle-1.jpg",
  "cnd-012": "product-candle-2.jpg",
  "cnd-013": "product-candle-1.jpg",
  "cnd-014": "product-candle-2.jpg",
  "cnd-015": "product-candle-1.jpg",

  // Fashion
  "fsh-001": "product-linen-robe.jpg",
  "fsh-002": "product-hoops.jpg",
  "fsh-003": "product-market-tote.jpg",
  "fsh-004": "product-silk-sleep-set.jpg",
  "fsh-005": "product-gold-necklace.jpg",
  "fsh-006": "product-cotton-tee.jpg",
  "fsh-007": "product-linen-pants.jpg",
  "fsh-008": "product-cashmere-cardigan.jpg",
  "fsh-009": "product-leather-bag.jpg",
  "fsh-010": "product-scrunchies.jpg",
  "fsh-011": "product-fedora.jpg",
  "fsh-012": "product-sunglasses.jpg",
  "fsh-013": "product-linen-shirt.jpg",
  "fsh-014": "product-beanie.jpg",
  "fsh-015": "product-slip-dress.jpg"
};

// Get selected product from previous node
const product = $input.item.json;

// Get image filename
const imageFilename = imageMap[product.id] || "product-candle-1.jpg"; // fallback

// Build GitHub raw URL
const imageUrl = `https://raw.githubusercontent.com/Tyrizle851/luna-ritual-studio/claude/analyze-ecommerce-repo-011CUmX7vgr4TvhMyFqheZMx/src/assets/${imageFilename}`;

return [{
  json: {
    ...product,
    original_image_url: imageUrl,
    original_image_filename: imageFilename
  }
}];
