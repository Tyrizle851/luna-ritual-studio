# GrowthEngine Design Specifications - Trust Elements

**Version**: 1.0
**Date**: 2025-11-20
**Created by**: GrowthEngine (AI Strategy Agent)
**For**: TechStack Implementation
**Project**: LunaRituals Trust & Conversion Elements

---

## Design System Reference

**Brand Colors**:
- Clay: `#C8A992`
- Cream: `#FAF7F2`
- Taupe: `#9D9081`
- Deep Warm Black: `#2C2420`
- White: `#FFFFFF`

**Typography**:
- Headings: Playfair Display
- Body: Inter
- Font weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Design Principles**:
- Premium, calm, minimal, elegant
- Generous white space (minimum 24px between major elements)
- Subtle animations (200-300ms transitions)
- No aggressive urgency or pressure tactics

---

## 1. Trust Badges (4 Designs)

### Badge 1: "Secure Checkout"

**Dimensions**: 90px × 32px
**Background**: Transparent
**Border**: 1px solid `#C8A992` (clay)
**Border Radius**: 4px
**Padding**: 6px 12px

**Icon**:
- Type: Lock icon (outlined style, not filled)
- Color: `#C8A992`
- Size: 14px × 14px
- Position: Left aligned, 4px margin-right from text
- Style: Feather Icons or similar minimal icon set

**Text**:
- Font: Inter
- Weight: 500 (medium)
- Size: 11px
- Color: `#2C2420`
- Letter Spacing: 0.3px
- Text: "Secure Checkout"

**Placement**:
- Product pages: Below "Add to Cart" button, centered, 16px margin-top
- Checkout page: Below payment form, left-aligned

**Hover State**:
- Background: `#C8A992` (clay) at 8% opacity
- Border: `#C8A992` (no change)
- Transition: 200ms ease

---

### Badge 2: "Instant Download"

**Dimensions**: 100px × 32px
**Background**: Transparent
**Border**: 1px solid `#C8A992` (clay)
**Border Radius**: 4px
**Padding**: 6px 12px

**Icon**:
- Type: Download arrow icon (outlined, pointing down with horizontal line at bottom)
- Color: `#C8A992`
- Size: 14px × 14px
- Position: Left aligned, 4px margin-right from text

**Text**:
- Font: Inter
- Weight: 500 (medium)
- Size: 11px
- Color: `#2C2420`
- Letter Spacing: 0.3px
- Text: "Instant Download"

**Placement**:
- Product cards: Top right corner, absolute positioned, 12px from top and right edges
- Product page: Next to price, inline display

**Hover State**:
- Background: `#C8A992` at 8% opacity
- Transition: 200ms ease

---

### Badge 3: "14-Day Guarantee"

**Dimensions**: 110px × 32px
**Background**: Transparent
**Border**: 1px solid `#C8A992` (clay)
**Border Radius**: 4px
**Padding**: 6px 12px

**Icon**:
- Type: Checkmark in circle (outlined)
- Color: `#C8A992`
- Size: 14px × 14px
- Position: Left aligned, 4px margin-right from text

**Text**:
- Font: Inter
- Weight: 500 (medium)
- Size: 11px
- Color: `#2C2420`
- Letter Spacing: 0.3px
- Text: "14-Day Money-Back"

**Placement**:
- Cart sidebar: Above subtotal, centered, 24px margin-bottom
- Checkout page: Below order summary, centered

**Hover State**:
- Background: `#C8A992` at 8% opacity
- Transition: 200ms ease

---

### Badge 4: "Woman-Owned"

**Dimensions**: 130px × 32px
**Background**: Transparent
**Border**: 1px solid `#C8A992` (clay)
**Border Radius**: 4px
**Padding**: 6px 12px

**Icon**:
- Type: Heart icon (outlined, minimal)
- Alternative: Venus symbol (♀) if heart feels too romantic
- Color: `#C8A992`
- Size: 14px × 14px
- Position: Left aligned, 4px margin-right from text

**Text**:
- Font: Inter
- Weight: 500 (medium)
- Size: 11px
- Color: `#2C2420`
- Letter Spacing: 0.3px
- Text: "Woman-Owned Business"

**Placement**:
- Footer: In badge row with other trust indicators, centered
- About page: In hero section or values section

**Hover State**:
- Background: `#C8A992` at 8% opacity
- Transition: 200ms ease

---

### Badge Container (When displaying multiple badges)

**Layout**: Horizontal flex row
**Gap**: 12px between badges
**Alignment**: Center
**Margin**: 24px top and bottom from surrounding elements

---

## 2. Exit-Intent Popup (Gentle Design)

### Trigger Conditions

**JavaScript Logic**:
```
- Trigger: Mouse moves above Y-position 40px (moving toward close button)
- Minimum time on site: 30 seconds
- Frequency: Once per 7 days (set cookie: luna_exit_shown)
- Do not show if: User already subscribed, user has items in cart
- Mobile: Trigger on back button gesture (if detectable)
```

### Visual Design Specifications

**Popup Container**:
- Dimensions: 520px × 380px (desktop), 100% width × auto height (mobile)
- Background: Linear gradient from `#FAF7F2` (cream) at top to `#F5F0EA` at bottom
- Border: None
- Border Radius: 12px
- Box Shadow: `0 8px 32px rgba(44, 36, 32, 0.15)`
- Padding: 48px
- Mobile Padding: 32px 24px

**Overlay**:
- Background: `rgba(44, 36, 32, 0.5)` (50% opacity warm dark)
- Backdrop Filter: `blur(4px)` (for modern browsers)
- Z-index: 9999

**Close Button**:
- Position: Absolute, top-right corner
- Top: 16px, Right: 16px
- Size: 32px × 32px
- Icon: "×" symbol
- Font Size: 24px
- Color: `#9D9081` (taupe)
- Background: Transparent
- Hover Color: `#C8A992` (clay)
- Cursor: pointer
- Transition: color 200ms ease

### Content Structure

**Header**:
- Font: Playfair Display
- Weight: 600 (semibold)
- Size: 32px
- Line Height: 40px
- Color: `#2C2420`
- Margin Bottom: 12px
- Text: "Before you go..."
- Text Align: Center

**Subheading**:
- Font: Inter
- Weight: 500 (medium)
- Size: 16px
- Line Height: 24px
- Color: `#9D9081` (taupe)
- Margin Bottom: 20px
- Text: "Start your ritual with a gift from us."
- Text Align: Center

**Body Text**:
- Font: Inter
- Weight: 400 (regular)
- Size: 14px
- Line Height: 22px
- Color: `#2C2420`
- Margin Bottom: 24px
- Text: "Get 15% off your first affirmation + a free wallpaper when you join our community."
- Text Align: Center

**Email Input Field**:
- Width: 100% (max-width 360px, centered)
- Height: 48px
- Background: `#FFFFFF`
- Border: 1px solid `#C8A992`
- Border Radius: 6px
- Padding: 12px 16px
- Font: Inter, 14px, regular
- Color: `#2C2420`
- Placeholder: "Your email"
- Placeholder Color: `#9D9081` at 60% opacity
- Margin Bottom: 12px
- Focus State: Border 2px solid `#C8A992`, outline none, box-shadow `0 0 0 3px rgba(200, 169, 146, 0.1)`

**CTA Button**:
- Width: 100% (same max-width as input, 360px)
- Height: 48px
- Background: `#C8A992` (clay)
- Border: None
- Border Radius: 6px
- Font: Inter
- Weight: 500 (medium)
- Size: 14px
- Color: `#FFFFFF`
- Text: "Send me the gift"
- Cursor: pointer
- Margin Bottom: 16px
- Hover State: Background `#B89982` (darker clay), transition 200ms ease
- Active State: Transform `scale(0.98)`, transition 100ms ease

**Fine Print**:
- Font: Inter
- Weight: 400 (regular)
- Size: 11px
- Line Height: 16px
- Color: `#9D9081` (taupe)
- Text: "Unsubscribe anytime. We respect your inbox."
- Text Align: Center
- Margin Top: 16px

### Animation Specifications

**Entrance**:
```css
@keyframes fadeInPopup {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply to popup container */
animation: fadeInPopup 300ms ease-out;
```

**Exit** (on close):
```css
@keyframes fadeOutPopup {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

animation: fadeOutPopup 200ms ease-in;
```

**Overlay Animation**:
```css
@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

animation: fadeInOverlay 250ms ease-out;
```

### Mobile Responsive Adjustments

**Breakpoint**: < 640px

- Popup width: 90vw (max 400px)
- Popup height: Auto
- Padding: 32px 24px
- Header font size: 28px
- Email input width: 100%
- Button width: 100%
- Position: Center of screen (fixed)

---

## 3. "Why LunaRituals Is Different" Section

### Layout Structure

**Container**:
- Width: 100% (max-width: 1200px, centered)
- Background: `#FAF7F2` (cream) at 40% opacity
- Padding: 80px 48px
- Margin: 80px auto
- Border Radius: 0 (full width section)

**Section Heading**:
- Font: Playfair Display
- Weight: 600 (semibold)
- Size: 40px
- Line Height: 52px
- Color: `#2C2420`
- Text Align: Center
- Margin Bottom: 48px
- Text: "Why LunaRituals is Different"

**Grid Layout**:
- Display: Grid
- Columns: 2 (desktop), 1 (mobile < 768px)
- Gap: 48px
- Alignment: Start

### Column Specifications

#### Left Column - "LunaRituals" (Premium)

**Column Header**:
- Font: Inter
- Weight: 600 (semibold)
- Size: 18px
- Letter Spacing: 0.5px
- Color: `#C8A992` (clay)
- Margin Bottom: 24px
- Text: "LUNARITUALS"
- Text Transform: Uppercase

**List Items** (6 items):
- Display: Flex
- Align Items: Start
- Gap: 12px
- Margin Bottom: 16px

**Checkmark Icon**:
- Type: Checkmark in circle (filled)
- Color: `#C8A992` (clay)
- Size: 20px × 20px
- Flex Shrink: 0

**Item Text**:
- Font: Inter
- Weight: 400 (regular)
- Size: 15px
- Line Height: 24px
- Color: `#2C2420`

**List Content**:
1. ✓ Professional design (top 10% quality)
2. ✓ Extended descriptions (300+ words)
3. ✓ Multiple formats (phone, desktop, print)
4. ✓ Research-backed psychology
5. ✓ Cohesive brand experience
6. ✓ 14-day money-back guarantee

---

#### Right Column - "Typical Competitors" (Generic)

**Column Header**:
- Font: Inter
- Weight: 600 (semibold)
- Size: 18px
- Letter Spacing: 0.5px
- Color: `#9D9081` (taupe) at 70% opacity
- Margin Bottom: 24px
- Text: "TYPICAL COMPETITORS"
- Text Transform: Uppercase

**List Items**:
- Display: Flex
- Align Items: Start
- Gap: 12px
- Margin Bottom: 16px

**X Mark Icon**:
- Type: X in circle (outlined)
- Color: `#9D9081` (taupe) at 50% opacity
- Size: 20px × 20px
- Flex Shrink: 0

**Item Text**:
- Font: Inter
- Weight: 400 (regular)
- Size: 15px
- Line Height: 24px
- Color: `#2C2420` at 60% opacity
- Text Decoration: None (no strikethrough - too harsh)

**List Content**:
1. ✗ Canva templates
2. ✗ Minimal descriptions (20 words)
3. ✗ Single format only
4. ✗ No educational content
5. ✗ Marketplace clutter
6. ✗ No guarantees

---

### Optional Divider (Between Columns)

**Desktop Only** (hidden on mobile):
- Width: 1px
- Height: 100%
- Background: Linear gradient `#C8A992` at 0% opacity (top) → `#C8A992` at 30% opacity (middle) → `#C8A992` at 0% opacity (bottom)
- Position: Absolute, centered between columns

---

### Mobile Responsive Adjustments

**Breakpoint**: < 768px

- Grid columns: 1
- Column order: LunaRituals first, Competitors second
- Padding: 48px 24px
- Section heading size: 32px
- Add 24px margin between columns
- Remove divider

---

## 4. Newsletter/Lead Magnet Banner

### Option A: Inline Section (Homepage/Shop Page)

**Container**:
- Width: 100%
- Background: Linear gradient 135deg from `#C8A992` (clay) to `#B89982` (darker clay)
- Padding: 80px 48px
- Margin: 80px 0
- Text Align: Center

**Heading**:
- Font: Playfair Display
- Weight: 600 (semibold)
- Size: 40px
- Line Height: 52px
- Color: `#FFFFFF`
- Margin Bottom: 12px
- Text: "Begin your ritual"

**Subheading**:
- Font: Inter
- Weight: 400 (regular)
- Size: 18px
- Line Height: 28px
- Color: `#FAF7F2` (cream) at 95% opacity
- Margin Bottom: 32px
- Text: "Get a free affirmation + 15% off when you join our community."

**Form Container**:
- Display: Flex
- Flex Direction: Row (desktop), Column (mobile)
- Max Width: 480px
- Margin: 0 auto 24px
- Gap: 12px

**Email Input**:
- Flex: 1
- Height: 52px
- Background: `#FAF7F2` (cream)
- Border: 2px solid `#FAF7F2`
- Border Radius: 6px
- Padding: 12px 20px
- Font: Inter, 15px, regular
- Color: `#2C2420`
- Placeholder: "Your email"
- Placeholder Color: `#9D9081` at 60% opacity
- Focus State: Border `#FFFFFF`, outline none, box-shadow `0 0 0 3px rgba(255, 255, 255, 0.2)`

**Submit Button**:
- Height: 52px
- Padding: 0 32px
- Background: `#FFFFFF`
- Border: 2px solid `#FFFFFF`
- Border Radius: 6px
- Font: Inter
- Weight: 600 (semibold)
- Size: 15px
- Color: `#C8A992` (clay)
- Text: "Get my gift"
- Cursor: pointer
- White Space: nowrap
- Hover State: Background `#FAF7F2`, color `#2C2420`, transition 200ms ease
- Active State: Transform `scale(0.98)`

**Trust Line**:
- Font: Inter
- Weight: 400 (regular)
- Size: 12px
- Line Height: 18px
- Color: `#FFFFFF` at 80% opacity
- Text: "Join 500+ women building intentional lives. Unsubscribe anytime."
- Text Align: Center

---

### Option B: Sticky Bottom Banner (Mobile Only)

**Trigger Conditions**:
- Only display on mobile (< 768px)
- Appears after 10 seconds on site
- Cookie-based: Once per 3 days
- Dismissible with X button
- Does not show if user already subscribed

**Container**:
- Position: Fixed
- Bottom: 0
- Left: 0
- Width: 100%
- Background: `#C8A992` (clay)
- Padding: 16px 20px
- Box Shadow: `0 -4px 16px rgba(44, 36, 32, 0.15)`
- Z-index: 1000
- Safe Area Inset: `padding-bottom: env(safe-area-inset-bottom)` (for iOS)

**Close Button**:
- Position: Absolute
- Top: 12px
- Right: 12px
- Size: 24px × 24px
- Icon: "×"
- Font Size: 20px
- Color: `#FFFFFF`
- Background: Transparent
- Cursor: pointer

**Content Layout**:
- Display: Flex
- Flex Direction: Column
- Gap: 12px

**Heading**:
- Font: Inter
- Weight: 600 (semibold)
- Size: 14px
- Color: `#FFFFFF`
- Text: "Start your ritual with a gift"
- Margin Bottom: 4px

**Subtext**:
- Font: Inter
- Weight: 400 (regular)
- Size: 12px
- Color: `#FFFFFF` at 90% opacity
- Text: "Get 15% off + free affirmation"
- Margin Bottom: 8px

**Form**:
- Display: Flex
- Gap: 8px

**Email Input**:
- Flex: 1
- Height: 40px
- Background: `#FFFFFF`
- Border: None
- Border Radius: 4px
- Padding: 8px 12px
- Font: Inter, 13px
- Color: `#2C2420`
- Placeholder: "Your email"

**Button**:
- Height: 40px
- Padding: 0 20px
- Background: `#2C2420`
- Border: None
- Border Radius: 4px
- Font: Inter, 13px, semibold
- Color: `#FFFFFF`
- Text: "Get it"
- Cursor: pointer

**Animation** (Slide up):
```css
@keyframes slideUpBanner {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

animation: slideUpBanner 300ms ease-out;
```

---

## 5. Product Page Guarantee Section

### Container Specifications

**Section**:
- Width: 100%
- Background: `#C8A992` at 5% opacity (`rgba(200, 169, 146, 0.05)`)
- Border: 1px solid `#C8A992` at 30% opacity
- Border Radius: 8px
- Padding: 32px
- Margin: 48px 0
- Mobile Padding: 24px

### Content Structure

**Icon**:
- Type: Shield with checkmark OR Heart with checkmark
- Color: `#C8A992` (clay)
- Size: 32px × 32px
- Display: Block
- Margin: 0 auto 16px (centered)

**Heading**:
- Font: Playfair Display
- Weight: 600 (semibold)
- Size: 24px
- Line Height: 32px
- Color: `#2C2420`
- Text Align: Center
- Margin Bottom: 16px
- Text: "Your Satisfaction, Guaranteed"

**Body Text**:
- Font: Inter
- Weight: 400 (regular)
- Size: 15px
- Line Height: 26px
- Color: `#2C2420`
- Text Align: Center
- Max Width: 560px
- Margin: 0 auto 16px
- Text: "Try any affirmation risk-free for 14 days. If it doesn't resonate with you, we'll refund your purchase—no questions asked. We want you to love your ritual."

**Fine Print**:
- Font: Inter
- Weight: 400 (regular)
- Size: 11px
- Line Height: 18px
- Color: `#9D9081` (taupe)
- Text Align: Center
- Text: "Digital products are non-refundable after download, but we'll make exceptions if you're not satisfied."

### Placement

**Product Page**:
- Position: Below full product description
- Above "You may also like" section
- Above footer

**Mobile Responsive**:
- Padding: 24px 20px
- Heading size: 20px
- Body text size: 14px

---

## 6. Bundle Cards (For Week 2+ Launch)

### Card Container

**Dimensions**:
- Same as individual product cards (match existing grid)
- Aspect Ratio: 3:4 (if individual cards use this)
- Grid: Integrated into existing product grid

**Visual Differentiation**:
- Border: 2px solid `#C8A992` (clay) - thicker than individual cards
- Box Shadow: `0 4px 16px rgba(200, 169, 146, 0.12)` - slightly elevated
- Background: `#FFFFFF`

---

### "Best Value" Badge

**Position**: Absolute, top-right corner
**Offset**: -8px from top, -8px from right (overlaps card edge)

**Badge Design**:
- Background: `#C8A992` (clay)
- Color: `#FFFFFF`
- Font: Inter, 11px, semibold
- Text Transform: Uppercase
- Letter Spacing: 0.5px
- Padding: 6px 12px
- Border Radius: 12px (pill shape)
- Box Shadow: `0 2px 8px rgba(44, 36, 32, 0.2)`
- Text: "BEST VALUE" or "MOST POPULAR"

**Alternative Position** (if absolute doesn't work):
- Position: In card header, top-right
- Margin: 12px

---

### Image Display (Bundle Collage)

**Option 1: Collage Grid**
- Display: Grid
- Columns: 2
- Rows: 2 or 3 (depending on bundle size)
- Gap: 4px
- Padding: 4px
- Background: `#FAF7F2` (cream)
- Show 3-5 affirmation preview images in grid

**Option 2: Single Hero Image with Overlay**
- Display: Single featured image (best seller from bundle)
- Overlay: Semi-transparent layer at bottom
- Overlay Background: `linear-gradient(to top, rgba(44, 36, 32, 0.7), transparent)`
- Overlay Text: "3 Affirmations" or "5 Affirmations"
- Overlay Font: Inter, 14px, semibold, white
- Overlay Position: Bottom-left, padding 16px

**Recommendation**: Use Option 1 (collage) - more visually interesting

---

### Card Content Section

**Title**:
- Font: Playfair Display
- Weight: 600 (semibold)
- Size: 20px
- Line Height: 28px
- Color: `#2C2420`
- Margin: 16px 0 8px
- Text Examples:
  - "Starter Collection"
  - "Mindful Collection"
  - "Complete Collection"

**Description**:
- Font: Inter
- Weight: 400 (regular)
- Size: 13px
- Line Height: 20px
- Color: `#9D9081` (taupe)
- Margin Bottom: 16px
- Text Example: "3 carefully curated affirmations to begin your journey"

---

### Pricing Display

**Original Price** (Strikethrough):
- Font: Inter
- Weight: 400 (regular)
- Size: 14px
- Color: `#9D9081` at 60% opacity
- Text Decoration: Line-through
- Display: Inline
- Margin Right: 8px
- Text Example: "$36"

**Sale Price** (Featured):
- Font: Playfair Display
- Weight: 700 (bold)
- Size: 28px
- Color: `#C8A992` (clay)
- Display: Inline
- Text Example: "$28"

**Savings Badge**:
- Display: Inline-block
- Background: `#C8A992` (clay)
- Color: `#FFFFFF`
- Font: Inter, 11px, semibold
- Padding: 4px 8px
- Border Radius: 4px
- Margin Left: 8px
- Vertical Align: Middle
- Text Example: "Save 22%"

**Pricing Layout**:
```
Flex container:
- Align items: Baseline
- Justify: Start
- Gap: 8px
- Margin Bottom: 16px
```

---

### Add to Cart Button

**Same styling as individual product cards** (maintain consistency):
- Width: 100%
- Height: 44px
- Background: `#C8A992` (clay)
- Color: `#FFFFFF`
- Font: Inter, 14px, semibold
- Border: None
- Border Radius: 6px
- Cursor: pointer
- Text: "Add Bundle to Cart"
- Hover: Background `#B89982`, transition 200ms
- Active: Transform `scale(0.98)`

---

### Bundle Options & Soft Launch Schedule

#### Week 1: Individual Products Only
- No bundles displayed
- Focus on single affirmation sales
- Test checkout flow

#### Week 2: Add Starter Collection
**Starter Collection (3-Pack)**:
- Products: 3 best-selling or themed affirmations
- Original Price: $36 (3 × $12)
- Sale Price: $28
- Savings: $8 (22%)
- Badge: None (first bundle, no badge needed yet)

#### Week 3: Add Mindful Collection
**Mindful Collection (5-Pack)**:
- Products: 5 thematically related affirmations
- Original Price: $60 (5 × $12)
- Sale Price: $45
- Savings: $15 (25%)
- Badge: "BEST VALUE" (highest discount %)

#### Week 4: Add Complete Collection
**Complete Collection (24-Pack)**:
- Products: All available affirmations
- Original Price: $288 (24 × $12)
- Sale Price: $199
- Savings: $89 (31%)
- Badge: "COMPLETE SET" or "BEST VALUE"
- Additional Feature: Highlight "Save $89" prominently

---

### Mobile Responsive Adjustments

**Breakpoint**: < 640px

- Cards: Full width or 1 column
- Title size: 18px
- Sale price size: 24px
- Badge position: Top-left inside card (not overlapping edge)
- Collage grid: 2×2 max (even for 5-packs)

---

## 7. Brand Story Section (No Founder Photo)

### Section Container

**Placement**: About page OR dedicated "Our Story" page
**Width**: 100% (max-width 1000px, centered)
**Padding**: 80px 48px
**Background**: `#FFFFFF`

---

### Hero Image (Lifestyle, Not Founder)

**Image Specifications**:
- Width: 100%
- Max Width: 600px
- Height: Auto
- Aspect Ratio: 16:9 or 3:2
- Border Radius: 8px
- Margin Bottom: 48px
- Display: Block, centered

**Image Subject Ideas**:
- Desk scene with journal, candle, affirmation card
- Morning coffee with affirmation in background
- Minimalist workspace with products
- Flat lay of multiple affirmations
- **NOT**: Founder photo, team photos, personal images

**Image Style**:
- Natural light
- Warm tones matching brand palette
- Soft focus, dreamy aesthetic
- Premium, editorial quality

---

### Content Structure

**Heading**:
- Font: Playfair Display
- Weight: 600 (semibold)
- Size: 40px
- Line Height: 52px
- Color: `#2C2420`
- Text Align: Center
- Margin Bottom: 24px
- Text: "Built for women who choose intention over hustle"

**Subheading** (Optional):
- Font: Inter
- Weight: 500 (medium)
- Size: 18px
- Line Height: 28px
- Color: `#9D9081` (taupe)
- Text Align: Center
- Margin Bottom: 40px
- Text Example: "Premium affirmations for intentional living"

---

### Body Content (2-3 Paragraphs)

**Paragraph Styling**:
- Font: Inter
- Weight: 400 (regular)
- Size: 16px
- Line Height: 28px
- Color: `#2C2420`
- Max Width: 680px
- Margin: 0 auto 24px
- Text Align: Left or Center (test both)

**Content Themes** (use "we" language, not "I"):

**Paragraph 1: Why LunaRituals Exists**
```
Example: "We created LunaRituals because we believe self-love shouldn't feel like another task on your to-do list. In a world that glorifies hustle, we're building a space for women who choose rest, reflection, and intentional living."
```

**Paragraph 2: What We Believe**
```
Example: "Every affirmation we create is thoughtfully designed with research-backed psychology and premium aesthetics. We don't believe in generic Canva templates or marketplace clutter. Our affirmations are tools for transformation—beautiful, meaningful, and crafted with care."
```

**Paragraph 3: Our Commitment**
```
Example: "We're committed to quality over quantity. Each affirmation includes extended educational content, multiple formats for your devices, and a cohesive brand experience. This isn't just a product—it's a ritual."
```

**Tone Guidelines**:
- Use "we" (the brand), never "I" (the founder)
- Focus on values, mission, quality
- Warm but professional
- Aspirational but approachable
- No personal backstory or founder journey

---

### Values Callout Section (Optional)

**Container**:
- Display: Grid
- Columns: 3 (desktop), 1 (mobile)
- Gap: 32px
- Margin Top: 64px
- Padding: 48px
- Background: `#FAF7F2` at 40% opacity
- Border Radius: 8px

**Each Value Card**:

**Icon**:
- Size: 28px × 28px
- Color: `#C8A992`
- Margin Bottom: 12px
- Examples: Heart, Star, Leaf (minimal outlined icons)

**Value Title**:
- Font: Inter
- Weight: 600 (semibold)
- Size: 16px
- Color: `#2C2420`
- Margin Bottom: 8px
- Text Examples: "Intentional Design" / "Research-Backed" / "Woman-Owned"

**Value Description**:
- Font: Inter
- Weight: 400 (regular)
- Size: 13px
- Line Height: 20px
- Color: `#9D9081`
- Text: 1-2 sentences explaining the value

---

### Mobile Responsive Adjustments

**Breakpoint**: < 768px

- Padding: 48px 24px
- Heading size: 32px
- Body text size: 15px
- Values grid: 1 column
- Hero image: Max width 100%

---

## Design System Compliance Checklist

### Colors
- ✅ All colors use approved palette: Clay (#C8A992), Cream (#FAF7F2), Taupe (#9D9081), Deep Warm Black (#2C2420)
- ✅ No red, orange, or urgent colors used
- ✅ Opacity variations only from approved colors

### Typography
- ✅ Headings: Playfair Display only
- ✅ Body text: Inter only
- ✅ No other fonts introduced
- ✅ Font weights: 300-700 range

### Design Style
- ✅ Premium and calm aesthetic maintained
- ✅ Generous white space (24px+ between major elements)
- ✅ Subtle animations only (200-300ms)
- ✅ No aggressive or urgent elements

### Avoid List
- ✅ No red colors ❌
- ✅ No countdown timers ❌
- ✅ No flashing elements ❌
- ✅ No aggressive CTAs ("BUY NOW!!!") ❌
- ✅ No multiple popups ❌
- ✅ No intrusive overlays ❌

### Embrace List
- ✅ Soft clay/cream palette ✓
- ✅ Generous white space ✓
- ✅ Elegant typography ✓
- ✅ Subtle animations ✓
- ✅ Gentle CTAs ✓
- ✅ Premium, calm aesthetic ✓

---

## Implementation Priority

### Phase 1: Critical Trust Elements (Week 1)
1. **Trust Badges (all 4)** - Essential for first product sales
2. **Product Page Guarantee Section** - Build trust for digital product purchases
3. **Lead Magnet Inline Section** - Begin email list building immediately

### Phase 2: Conversion Optimization (Week 2)
4. **Exit-Intent Popup** - Capture abandoning visitors
5. **"Why LunaRituals Is Different" Section** - Add to About page or Shop page
6. **Sticky Mobile Banner** - Mobile-specific lead capture

### Phase 3: Bundle Launch (Week 2-4)
7. **Bundle Card Design** - Prepare for Starter Collection launch Week 2
8. **Bundle variations** - Mindful Collection (Week 3), Complete Collection (Week 4)

### Phase 4: Brand Building (Ongoing)
9. **Brand Story Section** - Add to About page when ready
10. **Values Callout Section** - Enhance brand perception

---

## Technical Implementation Notes for TechStack

### General Requirements

**Iconography**:
- Use Feather Icons (https://feathericons.com/) or similar minimal icon set
- All icons outlined style, not filled
- Maintain consistent stroke width (2px)

**Responsive Breakpoints**:
- Desktop: > 1024px
- Tablet: 768px - 1023px
- Mobile: < 767px
- Small mobile: < 480px

**Performance**:
- All animations use CSS transforms (GPU-accelerated)
- Lazy load images below the fold
- Minimize repaints and reflows

**Accessibility**:
- All interactive elements have min 44×44px touch target
- Color contrast ratio: Minimum 4.5:1 for body text, 3:1 for large text
- All form inputs have labels (can be visually hidden)
- Popup has proper ARIA attributes and focus trap
- Keyboard navigation support for popup close (ESC key)

**Cookie/Storage Management**:
- Exit-intent popup: Cookie `luna_exit_shown`, expires in 7 days
- Mobile banner: Cookie `luna_mobile_banner_shown`, expires in 3 days
- Email subscription status: Cookie `luna_subscribed`, expires in 1 year

**Form Integrations**:
- Email forms should integrate with existing email service provider
- Add hidden field for source tracking (e.g., "exit_popup", "mobile_banner", "inline_hero")
- Trigger welcome email with WELCOME15 code and free wallpaper (aff-001)

**Analytics Tracking**:
- Track popup impressions and conversions
- Track badge interactions (if hoverable)
- Track bundle card views vs individual card views
- Track email capture source (which form)

---

## Questions for Coordinator

### Design Decisions Needed:

1. **Exit-Intent Popup Free Gift**: Should we specify which wallpaper design (aff-001) is the free gift? Or let user choose?

2. **Bundle Naming**: Confirm bundle names:
   - "Starter Collection" vs "Essentials Bundle"
   - "Mindful Collection" vs "Self-Love Bundle"
   - "Complete Collection" vs "Ultimate Library"

3. **"Why Different" Section Placement**:
   - Add to About page?
   - Add to Shop page (above products)?
   - Create as standalone section?

4. **Founder Story Depth**: How much brand backstory to include? Keep very minimal (2-3 paragraphs) or expand with mission/values detail?

5. **Mobile Banner Timing**: Is 10 seconds too aggressive? Should we wait 20-30 seconds?

6. **Trust Badge Placement**: Should all 4 badges appear on every product page, or selectively based on page type?

7. **Email Provider Integration**: Which email service is currently used (Mailchimp, ConvertKit, etc.)? Need API details for form integration.

8. **Bundle Curation**: Which specific affirmations should be grouped into each bundle? Need product SKUs/IDs.

---

## Asset Requirements for TechStack

### Images Needed:

1. **Lifestyle photo for Brand Story** (1200×800px minimum)
   - Subject: Desk/workspace with products
   - Style: Natural light, warm tones, minimal
   - NO people in photo

2. **Bundle collage images** (600×800px each)
   - 3-5 affirmation previews per bundle
   - High resolution for retina displays

3. **Icons** (if custom set preferred):
   - Lock (Secure Checkout)
   - Download arrow (Instant Download)
   - Checkmark/circle (Guarantee)
   - Heart or Venus symbol (Woman-Owned)
   - Shield with checkmark (Guarantee section)
   - All SVG format, outlined style

### Copy Needed:

1. **Bundle descriptions** (50-100 words each):
   - Starter Collection
   - Mindful Collection
   - Complete Collection

2. **Email welcome sequence** content:
   - Subject line
   - Body copy
   - WELCOME15 code mention
   - Free wallpaper delivery method

3. **"Why LunaRituals" competitor column**: Finalize which competitors to imply (without naming)

---

## Version History

**v1.0 - 2025-11-20**:
- Initial design specifications created
- All 6 trust element designs specified
- Brand story section added (no founder photo)
- Implementation priority defined
- Technical requirements documented

---

**END OF DESIGN SPECIFICATIONS**

---

## Next Steps for TechStack:

1. ✅ Review all specifications for technical feasibility
2. ✅ Confirm email service provider integration requirements
3. ✅ Request any missing assets (images, icons, copy)
4. ✅ Answer "Questions for Coordinator" section above
5. ✅ Begin Phase 1 implementation (Trust Badges, Guarantee Section, Lead Magnet)
6. ✅ Schedule bundle content curation for Week 2 launch
7. ✅ Set up analytics tracking for all new elements

**Estimated Implementation Time**:
- Phase 1: 8-12 hours
- Phase 2: 6-8 hours
- Phase 3: 4-6 hours per bundle launch
- Phase 4: 4-6 hours

**Total**: ~30-40 hours development time

---

*This document provides complete design specifications for TechStack to implement all trust and conversion elements for LunaRituals. All designs maintain brand consistency with the approved aesthetic: premium, calm, minimal, elegant.*
