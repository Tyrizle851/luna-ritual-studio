# LunaRituals Bundle Specifications
**Technical implementation guide for TechStack**
**Data structure for all bundle offerings**

---

## BUNDLE DATA STRUCTURE

### Bundle Type 1: Size-Based Bundles (Choose Your Own)

#### Starter Collection (3-Pack)
```json
{
  "id": "bundle-starter-3",
  "name": "Starter Collection",
  "subtitle": "Find Your Ritual",
  "type": "customizable",
  "quantity": 3,
  "price": 28,
  "regularPrice": 36,
  "savings": 8,
  "discountPercentage": 22,
  "description": "Start small, feel the shift. Choose three powerful affirmations to anchor your daily practice.",
  "formats": ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10"],
  "selectionMethod": "customer_choice",
  "restrictions": {
    "maxAbundance": 1,
    "note": "Maximum 1 Abundance affirmation (priced at $15) per bundle"
  },
  "badge": null
}
```

**Pricing Logic:**
- Standard affirmations: 3 × $12 = $36 → $28 (save $8)
- With 1 Abundance: 2 × $12 + 1 × $15 = $39 → $35 (save $4, but priced at $35 instead of $28)

**Implementation Note:** If customer selects 1+ Abundance affirmations, adjust bundle price:
- 0 Abundance: $28
- 1 Abundance: $35

---

#### Mindful Collection (5-Pack) ⭐ BEST SELLER
```json
{
  "id": "bundle-mindful-5",
  "name": "Mindful Collection",
  "subtitle": "Deepen Your Practice",
  "type": "customizable",
  "quantity": 5,
  "price": 45,
  "regularPrice": 60,
  "savings": 15,
  "discountPercentage": 25,
  "description": "Our most-loved collection. Choose five affirmations to rotate throughout your week—each one meeting you where you are.",
  "formats": ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
  "selectionMethod": "customer_choice",
  "restrictions": {
    "maxAbundance": 2,
    "note": "Maximum 2 Abundance affirmations per bundle"
  },
  "badge": "BEST VALUE",
  "badgeColor": "clay",
  "featured": true
}
```

**Pricing Logic:**
- All standard: 5 × $12 = $60 → $45 (save $15)
- With 1 Abundance: 4 × $12 + 1 × $15 = $63 → $47
- With 2 Abundance: 3 × $12 + 2 × $15 = $66 → $50

---

#### Complete Collection (24-Pack)
```json
{
  "id": "bundle-complete-24",
  "name": "Complete Collection",
  "subtitle": "The Full Library",
  "type": "fixed",
  "quantity": 24,
  "price": 199,
  "regularPrice": 289,
  "savings": 90,
  "discountPercentage": 31,
  "description": "The complete LunaRituals library—every affirmation, every category, every format. Build a year-long practice with new affirmations every week.",
  "formats": ["Phone Wallpaper", "Desktop Wallpaper", "Print 8x10", "Print 11x14"],
  "selectionMethod": "all_included",
  "includes": "all_affirmations",
  "bonus": "Early access to new affirmations for 6 months",
  "badge": "COMPLETE LIBRARY",
  "badgeColor": "clay"
}
```

**Pricing Calculation:**
- 19 standard affirmations: 19 × $12 = $228
- 5 Abundance affirmations: 5 × $15 = $75
- Total: $303 → $199 (save $104)
- **Note:** Advertised as "save $90" based on $289 regular price (rounded for marketing)

---

### Bundle Type 2: Category Bundles (Pre-Curated)

#### Self-Love Collection
```json
{
  "id": "bundle-category-self-love",
  "name": "Self-Love Collection",
  "category": "Self-Love",
  "type": "fixed",
  "quantity": 7,
  "price": 65,
  "regularPrice": 84,
  "savings": 19,
  "discountPercentage": 23,
  "description": "Seven affirmations to help you embrace radical self-acceptance, honor your boundaries, and love yourself unconditionally.",
  "affirmations": [
    "aff-001", // I am worthy of rest
    "aff-005", // I am enough, always
    "aff-008", // Today, I honor myself
    "aff-011", // I am safe in my body
    "aff-018", // I give myself permission to feel
    "aff-021", // I am allowed to change my mind
    "aff-024"  // I am both the storm and the calm
  ],
  "badge": null
}
```

---

#### Abundance Collection
```json
{
  "id": "bundle-category-abundance",
  "name": "Abundance Collection",
  "category": "Abundance",
  "type": "fixed",
  "quantity": 5,
  "price": 55,
  "regularPrice": 75,
  "savings": 20,
  "discountPercentage": 27,
  "description": "Five powerful affirmations to shift from scarcity to abundance, attract what you desire, and open yourself to miracles.",
  "affirmations": [
    "aff-003", // Abundance flows to me
    "aff-007", // I receive what I desire
    "aff-013", // I am worthy of my dreams
    "aff-017", // I am open to miracles
    "aff-023"  // I attract what I embody
  ],
  "note": "Premium category - all affirmations normally $15 each",
  "badge": null
}
```

---

#### Strength Collection
```json
{
  "id": "bundle-category-strength",
  "name": "Strength Collection",
  "category": "Strength",
  "type": "fixed",
  "quantity": 6,
  "price": 55,
  "regularPrice": 72,
  "savings": 17,
  "discountPercentage": 24,
  "description": "Six affirmations to help you trust your journey, claim your power, and create the life you desire with confidence.",
  "affirmations": [
    "aff-004", // I trust my journey
    "aff-006", // My calm is my power
    "aff-009", // I release what no longer serves
    "aff-012", // My voice matters
    "aff-016", // My intuition guides me
    "aff-019"  // I am creating the life I desire
  ],
  "badge": null
}
```

---

#### Rest Collection
```json
{
  "id": "bundle-category-rest",
  "name": "Rest Collection",
  "category": "Rest",
  "type": "fixed",
  "quantity": 2,
  "price": 20,
  "regularPrice": 24,
  "savings": 4,
  "discountPercentage": 17,
  "description": "Two essential affirmations to give yourself permission to rest without guilt and choose peace over perfection.",
  "affirmations": [
    "aff-014", // I choose peace over perfection
    "aff-022"  // My rest is productive
  ],
  "note": "Smaller collection - only 2 affirmations in Rest category",
  "badge": null
}
```

---

#### Joy Collection
```json
{
  "id": "bundle-category-joy",
  "name": "Joy Collection",
  "category": "Joy",
  "type": "fixed",
  "quantity": 4,
  "price": 36,
  "regularPrice": 48,
  "savings": 12,
  "discountPercentage": 25,
  "description": "Four affirmations to help you choose joy daily, celebrate your progress, and embrace life's infinite possibilities.",
  "affirmations": [
    "aff-002", // I choose joy today
    "aff-010", // Joy is my natural state
    "aff-015", // I celebrate my progress
    "aff-020"  // Today is full of possibility
  ],
  "badge": null
}
```

---

### Bundle Type 3: Themed 3-Packs (Pre-Curated)

#### Morning Rituals Bundle
```json
{
  "id": "bundle-theme-morning",
  "name": "Morning Rituals Collection",
  "theme": "Morning",
  "type": "fixed",
  "quantity": 3,
  "price": 28,
  "regularPrice": 36,
  "savings": 8,
  "discountPercentage": 22,
  "description": "Three affirmations to start your day with intention. Choose joy, celebrate progress, and embrace infinite possibility.",
  "affirmations": [
    "aff-002", // I choose joy today
    "aff-020", // Today is full of possibility
    "aff-015"  // I celebrate my progress
  ],
  "badge": null
}
```

---

#### Rest & Release Bundle
```json
{
  "id": "bundle-theme-rest-release",
  "name": "Rest & Release Collection",
  "theme": "Rest & Release",
  "type": "fixed",
  "quantity": 3,
  "price": 28,
  "regularPrice": 36,
  "savings": 8,
  "discountPercentage": 22,
  "description": "Three affirmations to help you let go, rest without guilt, and choose peace over perfection.",
  "affirmations": [
    "aff-001", // I am worthy of rest
    "aff-014", // I choose peace over perfection
    "aff-009"  // I release what no longer serves
  ],
  "badge": null
}
```

---

#### Self-Love Essentials Bundle
```json
{
  "id": "bundle-theme-self-love",
  "name": "Self-Love Essentials Collection",
  "theme": "Self-Love",
  "type": "fixed",
  "quantity": 3,
  "price": 28,
  "regularPrice": 36,
  "savings": 8,
  "discountPercentage": 22,
  "description": "Three foundational affirmations for radical self-acceptance. You are enough, you are safe, you are allowed to feel.",
  "affirmations": [
    "aff-005", // I am enough, always
    "aff-011", // I am safe in my body
    "aff-018"  // I give myself permission to feel
  ],
  "badge": null
}
```

---

#### Abundance Mindset Bundle
```json
{
  "id": "bundle-theme-abundance",
  "name": "Abundance Mindset Collection",
  "theme": "Abundance",
  "type": "fixed",
  "quantity": 3,
  "price": 35,
  "regularPrice": 45,
  "savings": 10,
  "discountPercentage": 22,
  "description": "Three powerful affirmations to shift into abundance consciousness. Flow, receive, and manifest your dreams.",
  "affirmations": [
    "aff-003", // Abundance flows to me ($15)
    "aff-013", // I am worthy of my dreams ($15)
    "aff-017"  // I am open to miracles ($15)
  ],
  "note": "Premium bundle - all Abundance affirmations normally $15 each",
  "badge": null
}
```

---

## UI/UX SPECIFICATIONS

### Bundle Product Card Design

```html
<div class="bundle-card">
  <div class="bundle-image">
    <!-- Collage of included affirmation images -->
    <!-- Or: Custom bundle illustration -->
  </div>

  <div class="bundle-badge" *ngIf="bundle.badge">
    {{ bundle.badge }}
    <!-- Style: Clay background, cream text, elegant badge -->
  </div>

  <div class="bundle-content">
    <h3 class="bundle-name">{{ bundle.name }}</h3>
    <p class="bundle-subtitle">{{ bundle.subtitle }}</p>
    <p class="bundle-description">{{ bundle.description }}</p>

    <div class="bundle-includes">
      <p>Includes {{ bundle.quantity }} affirmations</p>
      <ul class="format-list">
        <li *ngFor="let format of bundle.formats">{{ format }}</li>
      </ul>
    </div>

    <div class="bundle-pricing">
      <span class="regular-price">${{ bundle.regularPrice }}</span>
      <span class="bundle-price">${{ bundle.price }}</span>
      <span class="savings">Save ${{ bundle.savings }} ({{ bundle.discountPercentage }}% off)</span>
    </div>

    <button class="btn-add-to-cart">
      {{ bundle.type === 'customizable' ? 'Choose Your Affirmations' : 'Add to Cart' }}
    </button>
  </div>
</div>
```

---

### Bundle Selection Flow (Customizable Bundles)

**Step 1: Choose Bundle Size**
- Display: Starter (3), Mindful (5), or Complete (24)
- Show pricing and savings

**Step 2: Select Affirmations** (if customizable)
- Grid view of all 24 affirmations
- Filter by category
- Selected count: "3 of 3 selected" or "5 of 5 selected"
- Visual indicator if Abundance selected (price adjustment)
- Disable "Add to Cart" until correct quantity selected

**Step 3: Review & Add to Cart**
- Show selected affirmations
- Confirm final price (adjusted for Abundance if applicable)
- Add to Cart

---

### Shopping Cart Display

**Bundle in cart:**
```
Mindful Collection (5 Affirmations)
- I am worthy of rest
- I choose joy today
- Abundance flows to me
- My calm is my power
- I trust my journey

$45 (was $60, save $15)
```

**Format selection:**
- Each affirmation: Phone, Desktop, Print 8x10, Print 11x14 available
- Download all at once (ZIP file)

---

## PRICING LOGIC REFERENCE

### Bundle Discount Tiers
| Bundle Size | Standard Price | Bundle Price | Discount % |
|-------------|---------------|--------------|-----------|
| 3-pack | $36 | $28 | 22% |
| 5-pack | $60 | $45 | 25% |
| 24-pack | $289 | $199 | 31% |

### Abundance Pricing Adjustment
| Bundle | Standard | +1 Abundance | +2 Abundance | All Abundance |
|--------|----------|-------------|-------------|--------------|
| 3-pack | $28 | $35 | - | $35 |
| 5-pack | $45 | $47 | $50 | - |

---

## BUNDLE NAVIGATION

### Shop Page
**Display bundles prominently:**
1. Hero section: "Shop Bundles" tab
2. Filter: "Individual Affirmations" vs "Bundles"
3. Sort: Featured (shows Mindful 5-pack first), Price, Savings

### Bundle Landing Page (Optional)
**URL:** `/shop/bundles`
**Sections:**
1. Hero: "Build your ritual with curated collections"
2. Size-based bundles (Starter, Mindful, Complete)
3. Category bundles (Self-Love, Abundance, Strength, Rest, Joy)
4. Themed bundles (Morning Rituals, Rest & Release, etc.)

---

## TECHNICAL IMPLEMENTATION NOTES

### Database Schema Additions

**New table: `bundles`**
```sql
CREATE TABLE bundles (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  subtitle VARCHAR,
  type VARCHAR CHECK (type IN ('customizable', 'fixed')),
  quantity INT,
  price DECIMAL,
  regular_price DECIMAL,
  savings DECIMAL,
  discount_percentage INT,
  description TEXT,
  badge VARCHAR,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);
```

**New table: `bundle_affirmations`**
```sql
CREATE TABLE bundle_affirmations (
  id SERIAL PRIMARY KEY,
  bundle_id VARCHAR REFERENCES bundles(id),
  affirmation_id VARCHAR REFERENCES affirmations(id),
  position INT
);
```

**New table: `cart_bundles`**
```sql
CREATE TABLE cart_bundles (
  id SERIAL PRIMARY KEY,
  cart_id VARCHAR,
  bundle_id VARCHAR REFERENCES bundles(id),
  selected_affirmations JSONB, -- For customizable bundles
  quantity INT DEFAULT 1,
  final_price DECIMAL -- After Abundance adjustments
);
```

---

### Cart Logic

**Add to cart validation:**
1. Check if bundle is customizable or fixed
2. If customizable: Validate correct number of affirmations selected
3. Calculate final price (check for Abundance affirmations)
4. Store selection in `cart_bundles` table

**Checkout logic:**
1. Generate download links for each affirmation in bundle
2. Create ZIP file with all formats
3. Send email with download link
4. Track bundle purchase in analytics

---

## ANALYTICS & TRACKING

### Events to Track
- `bundle_viewed`: User views bundle page
- `bundle_customization_started`: User begins selecting affirmations
- `bundle_added_to_cart`: Bundle added to cart (track bundle type)
- `bundle_purchased`: Bundle purchase completed (track bundle type, AOV)

### Key Metrics
- Bundle adoption rate (% of orders with bundles)
- Average bundle size (3, 5, or 24)
- Most popular pre-curated bundles
- Customizable vs fixed bundle preference
- AOV: Bundle orders vs single affirmation orders

---

## DISPLAY PRIORITY

### Homepage
1. Hero section: Feature Mindful Collection (5-pack) as "BEST VALUE"
2. Below featured affirmations: "Shop Bundles" section with 3 cards (Starter, Mindful, Complete)

### Shop Page
1. Tab navigation: "All" | "Affirmations" | "Bundles"
2. When "Bundles" selected: Show all 9+ bundles
3. Featured: Mindful Collection first

### Product Pages (Individual Affirmations)
1. Related products: "Bundle & Save" section
2. Show relevant bundles that include this affirmation
3. CTA: "Add to bundle" option

---

## TESTING CHECKLIST

Before launch:
- [ ] Bundle pricing calculates correctly (including Abundance adjustments)
- [ ] Customizable bundles enforce quantity limits
- [ ] Fixed bundles show correct affirmations
- [ ] Cart displays bundle contents clearly
- [ ] Checkout generates correct download links
- [ ] Email confirmation shows all bundle items
- [ ] ZIP file contains all formats
- [ ] Savings displayed correctly (strike-through, percentage)
- [ ] Badge displays on featured bundles
- [ ] Mobile-responsive bundle cards
- [ ] Bundle filtering and sorting works

---

**Implementation Timeline:**
- Week 1, Day 1-2: Database schema + backend logic
- Week 1, Day 3-4: Frontend bundle cards + selection UI
- Week 1, Day 5: Cart integration + checkout flow
- Week 1, Day 6: Testing + QA
- Week 1, Day 7: Launch + monitoring

---

**Questions for TechStack:**
1. Preferred method for bundle image generation (collage vs custom design)?
2. Should "Complete Collection" include future affirmations for 6 months? (requires ongoing fulfillment logic)
3. Prefer separate bundle product type or variant of affirmation product type?
4. Need staging environment testing before production launch?

---

**End of Bundle Specifications**
