# Comprehensive Codebase Summary - Luna Ritual Studio

## Executive Overview

**Luna Ritual Studio** is a modern, full-stack e-commerce platform built with React, TypeScript, and Supabase. The platform specializes in selling affirmations, fashion items, candles, books, supplements, and lifestyle products with integrated AI-powered image generation, automated social media workflows, and a sophisticated design system.

---

## 1. Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **State Management**: Zustand (cart, wishlist)
- **Routing**: React Router v6
- **Icons**: Lucide React

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Edge Functions**: Supabase Edge Functions (TypeScript)
- **API Gateway**: Express.js server (`server/index.js`)
- **AI Services**:
  - OpenAI (DALL-E, GPT-4, GPT-4o, GPT-4o-mini, `gpt-image-1`)
  - Google Gemini 3 Pro (via Lovable Gateway)
- **Automation**: n8n workflows for social media posting

### Development Tools
- **Linting**: ESLint with TypeScript support
- **CSS Processing**: PostCSS with Autoprefixer
- **Type Safety**: TypeScript with strict configuration

---

## 2. Project Architecture

### Directory Structure
```
luna-ritual-studio/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn/ui components (50+ components)
│   │   └── [feature]/    # Feature-specific components
│   ├── pages/            # Route pages
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   ├── data/             # Static data files
│   ├── types/            # TypeScript type definitions
│   └── integrations/     # Third-party integrations
├── api/                   # API routes (Next.js-style)
├── supabase/
│   └── functions/        # Edge Functions
├── server/               # Express.js backend
├── automation/           # n8n workflows & scripts
└── n8n-automation/       # Additional n8n configs
```

---

## 3. Core Features & Functionality

### 3.1 E-Commerce Platform

#### Product Categories
- **Affirmations**: AI-generated customizable affirmation images
- **Fashion**: Clothing and accessories
- **Candles**: Scented candles
- **Books**: Self-help and wellness books
- **Supplements**: Health supplements
- **Lifestyle**: General lifestyle products
- **Affiliate Products**: External product links

#### Shopping Features
- **Cart Management**: Zustand store (`src/store/cartStore.ts`)
  - Add/remove items
  - Quantity updates
  - Persistent storage
- **Wishlist**: Zustand store (`src/store/wishlistStore.ts`)
  - Save for later
  - Quick add to cart
- **Product Modals**: Category-specific modals with image galleries
  - `ProductModal.tsx` (affirmations)
  - `FashionProductModal.tsx`
  - `CandleModal.tsx`
  - `BookModal.tsx`
  - `SupplementModal.tsx`

#### Product Display
- **Image Galleries**: Standardized layout per `PRODUCT_MODAL_GALLERY_SPEC.md`
  - Main image with zoom
  - Thumbnail navigation
  - Multiple views (front, back, detail)
- **Filtering & Sorting**: `SortFilter.tsx` component
  - Price range
  - Category filters
  - Sort by price, name, popularity
- **Search**: `SearchBar.tsx` with real-time filtering

### 3.2 AI-Powered Image Generation

#### Affirmation Builder (`src/pages/AffirmationBuilder.tsx`)
- **Interactive Builder**: Real-time customization
  - Theme selection (Serenity, Empowerment, Growth, etc.)
  - Mood selection (Calm, Energized, Focused, etc.)
  - Layout selection (Minimalist, Artistic, Typographic, etc.)
  - Custom text input
  - Preset configurations
- **AI Generation**:
  - Preview generation (`api/affirmation/preview.ts`)
  - Full image generation (`api/affirmation/generate.ts`)
  - Uses OpenAI `gpt-image-1` model
  - Design spec builder (`src/lib/designSpecBuilder.ts`)

#### Product Image Generation
- **Bulk Generation**: Admin page (`src/pages/AdminImageGen.tsx`)
  - Generate images for multiple products
  - Uses Supabase Edge Function: `generate-product-images`
  - Google Gemini 3 Pro via Lovable Gateway
- **Individual Generation**: 
  - `supabase/functions/generate-affirmation-image/index.ts`
  - `supabase/functions/generate-preview-image/index.ts`
  - `supabase/functions/generate-product-images/index.ts`

#### Design System Integration
- **Type System**: `src/types/design-spec.ts`
  - Theme slugs (12 themes)
  - Mood slugs (8 moods)
  - Layout archetypes (6 layouts)
  - Energy levels, accent types, typography styles
  - Color palettes and typography sets
- **Spec Builder**: `src/lib/designSpecBuilder.ts`
  - Maps themes/moods to design specifications
  - Generates prompt strings for AI
  - Handles text normalization

### 3.3 Content Management

#### Pages
- **Homepage** (`src/pages/Index.tsx`): Hero, featured products, articles
- **Shop** (`src/pages/Shop.tsx`): Main product listing with filters
- **Category Shops**:
  - `ShopAffirmations.tsx`
  - `ShopLifestyle.tsx`
- **Content Pages**:
  - `Journal.tsx`: Blog/journal entries
  - `ArticleDetail.tsx`: Individual article view
  - `About.tsx`, `Contact.tsx`
  - `Terms.tsx`, `PrivacyPolicy.tsx`, `AffiliateDisclosure.tsx`

#### Featured Components
- `FeaturedProducts.tsx`: Product carousel
- `FeaturedArticles.tsx`: Article grid
- `AffirmationCarousel.tsx`: Rotating affirmations
- `Testimonials.tsx`: Customer testimonials
- `NewsletterSection.tsx`: Email subscription
- `SubscriptionPopup.tsx` & `SubscriptionBanner.tsx`: Marketing popups

### 3.4 SEO & Schema

#### SEO Utilities (`src/lib/seoUtils.ts`)
- **Product Schema**: JSON-LD structured data
  - Product name, description, price
  - Availability, SKU, brand
  - Images, reviews, ratings
- **Breadcrumb Schema**: Navigation hierarchy
- **Organization Schema**: Company information

---

## 4. Backend Services

### 4.1 Supabase Edge Functions

#### `generate-affirmation-image/index.ts`
- Generates full affirmation images
- Uses OpenAI `gpt-image-1` model
- Accepts design specifications
- Returns image URLs

#### `generate-preview-image/index.ts`
- Generates preview thumbnails
- Faster generation for previews
- Uses OpenAI `gpt-image-1` model

#### `generate-product-images/index.ts`
- Bulk product image generation
- Uses Google Gemini 3 Pro via Lovable Gateway
- Endpoint: `google/gemini-3-pro-image-preview`
- Handles multiple products in batch

### 4.2 Express.js Server (`server/index.js`)

#### API Endpoints
- `/api/affirmation/generate`: Full image generation
- `/api/affirmation/preview`: Preview generation
- Uses OpenAI API with `gpt-image-1` model
- Error handling and response formatting

### 4.3 API Routes (`api/`)

#### `api/affirmation/generate.ts`
- Server-side affirmation generation
- OpenAI integration
- Design spec processing

#### `api/affirmation/preview.ts`
- Preview image generation
- Optimized for speed

#### `api/_shared.ts`
- Shared utilities for API routes
- Common error handling
- Response formatting

---

## 5. State Management

### Zustand Stores

#### Cart Store (`src/store/cartStore.ts`)
```typescript
- addItem(product, quantity)
- removeItem(productId)
- updateQuantity(productId, quantity)
- clearCart()
- getTotalPrice()
- getTotalItems()
```

#### Wishlist Store (`src/store/wishlistStore.ts`)
```typescript
- addToWishlist(product)
- removeFromWishlist(productId)
- isInWishlist(productId)
- toggleWishlist(product)
```

---

## 6. Custom Hooks

### `useProductImages.ts`
- Fetches product images from Supabase
- Handles loading states
- Error handling
- Type-safe with Supabase types

### `use-toast.ts`
- Toast notification system
- Queue management
- Auto-dismiss
- Multiple toast types (success, error, info, warning)

### `use-mobile.tsx`
- Responsive breakpoint detection
- Mobile/desktop state management

---

## 7. Data Files

### Product Data
- `src/data/affirmations.ts`: Affirmation products with themes/moods
- `src/data/fashion.ts`: Fashion product catalog
- `src/data/candles.ts`: Candle products
- `src/data/books.ts`: Book listings
- `src/data/supplements.ts`: Supplement catalog
- `src/data/affiliateProducts.ts`: External product links
- `src/data/articles.ts`: Blog/article content

### Automation Data
- `automation/data/products.json`: Product data for n8n workflows
- `automation/data/post-stats.json`: Social media posting statistics

---

## 8. UI Component Library (Shadcn/ui)

### 50+ Components in `src/components/ui/`
- **Layout**: Card, Sheet, Dialog, Drawer, Sidebar, Resizable
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Form
- **Navigation**: Breadcrumb, Navigation Menu, Menubar, Tabs, Pagination
- **Feedback**: Toast, Alert, Alert Dialog, Progress, Skeleton
- **Overlays**: Popover, Hover Card, Tooltip, Context Menu, Dropdown Menu
- **Display**: Avatar, Badge, Separator, Scroll Area, Aspect Ratio
- **Interactive**: Button, Toggle, Toggle Group, Slider, Calendar
- **Advanced**: Command, Carousel, Chart, Table, Accordion, Collapsible

All components are built on Radix UI primitives with Tailwind CSS styling.

---

## 9. Design System

### Color Palette (`src/index.css`)
- **Brand Colors**: Warm, earthy, feminine palette
  - Primary: Clay (#C8A992), Taupe (#9D8B7F), Gold (#D4AF8E)
  - Backgrounds: Cream (#F5F1EA), Soft Stone (#EDE8E0)
  - Text: Deep warm black (#2C2420), Medium warm gray (#5A5047)
- **Semantic Tokens**: Primary, secondary, muted, accent, destructive
- **Custom Shadows**: Subtle and medium depth shadows

### Typography
- **Display Font**: Used for headings (h1-h6)
- **Body Font**: Used for paragraphs and body text
- **Responsive Sizing**: Fluid typography with breakpoints
- **Text Balance**: Automatic text wrapping for better readability

### Utilities (`src/index.css`)
- **3D Effects**: Perspective transforms on hover
- **Premium Buttons**: Gradient shimmer effects
- **Tab Transitions**: Smooth underline animations
- **Scrollbar Hiding**: Custom scrollbar styles
- **Container Utilities**: Consistent spacing and max-widths

### Tailwind Config (`tailwind.config.ts`)
- Custom color extensions (clay, taupe, gold, etc.)
- Custom font families
- Custom animations
- Extended spacing scale
- Custom border radius values

---

## 10. Automation & Workflows

### n8n Workflows (`automation/workflows/`)

#### Instagram Automation
- `instagram-auto-poster.json`: Automated posting
- `instagram-complete.json`: Full workflow with all features
- `instagram-simple.json`: Basic posting workflow
- `instagram-sora-no-watermark.json`: Sora integration without watermarks
- `instagram-with-sora-backup.json`: Sora with backup generation
- `instagram-cloud-compatible.json`: Cloud deployment ready

#### Product Sync
- `n8n-automation/workflows/1-product-sync-engine.json`: Product synchronization
- `n8n-automation/workflows/SIMPLE-instagram-image-poster.json`: Simple image posting

### Automation Scripts (`automation/scripts/`)

#### `watermark-removal-server.js`
- Removes watermarks from generated images
- Server-side processing
- Integration with image generation pipeline

#### `product-image-mapper.js`
- Maps product data to image requirements
- Generates image generation requests
- Handles batch processing

### Documentation
- `automation/REVISED_WORKFLOW_GUIDE.md`: Updated workflow documentation
- `automation/WORKFLOW_TEST_REPORT.md`: Testing results and status
- `automation/QUICK_START.md`: Quick setup guide
- `n8n-automation/README.md`: Overview of automation system
- `n8n-automation/SETUP_GUIDE.md`: Detailed setup instructions
- `n8n-automation/FULL_WORKFLOW_SPEC.md`: Complete workflow specification

---

## 11. Configuration Files

### Build Configuration
- **`vite.config.ts`**: Vite build configuration
  - React plugin
  - Path aliases (@/components, @/lib, etc.)
  - Proxy settings for API
- **`tsconfig.json`**: TypeScript compiler options
  - Strict mode enabled
  - Path aliases matching Vite
  - ES2020 target
- **`tsconfig.app.json`**: App-specific TypeScript config
- **`tsconfig.node.json`**: Node.js TypeScript config

### Styling Configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration
  - Custom colors, fonts, animations
  - Content paths for purging
  - Plugin configurations
- **`postcss.config.js`**: PostCSS with Tailwind and Autoprefixer
- **`components.json`**: Shadcn/ui configuration
  - Component paths
  - Style preferences
  - Alias mappings

### Linting
- **`eslint.config.js`**: ESLint configuration
  - TypeScript ESLint
  - React Hooks rules
  - Browser globals

### Package Management
- **`package.json`**: Dependencies and scripts
  - React, TypeScript, Vite
  - Supabase client
  - Zustand, React Router
  - Shadcn/ui dependencies
  - Development tools

---

## 12. Key Utilities & Helpers

### `src/lib/utils.ts`
- **`cn()`**: Tailwind class name merger (clsx + tailwind-merge)
- Used throughout for conditional styling

### `src/lib/api.ts`
- Generic API fetch utility
- Error handling
- Response parsing

### `src/lib/generateProductImages.ts`
- Client-side product image generation trigger
- Calls Supabase Edge Functions
- Handles batch requests

### `src/lib/seoUtils.ts`
- SEO schema generation functions
- Product, Breadcrumb, Organization schemas
- JSON-LD format

### `src/lib/designSpecBuilder.ts`
- Builds design specifications for AI generation
- Theme/mood to design mapping
- Prompt string generation
- Text normalization

---

## 13. Integration Points

### Supabase Integration
- **Client**: `src/integrations/supabase/client.ts`
  - Initialized Supabase client
  - Environment variable configuration
- **Types**: `src/integrations/supabase/types.ts`
  - Generated TypeScript types from database schema
  - `product_images` table schema
  - Type-safe database queries

### OpenAI Integration
- Used in:
  - `api/affirmation/generate.ts`
  - `api/affirmation/preview.ts`
  - `supabase/functions/generate-affirmation-image/index.ts`
  - `supabase/functions/generate-preview-image/index.ts`
  - `server/index.js`
- Models: `gpt-image-1`, GPT-4, GPT-4o, GPT-4o-mini

### Google Gemini Integration
- Used in: `supabase/functions/generate-product-images/index.ts`
- Model: Gemini 3 Pro via Lovable Gateway
- Endpoint: `google/gemini-3-pro-image-preview`

---

## 14. Routing Structure

### Main Routes (`src/App.tsx`)
- `/`: Homepage
- `/shop`: Main shop page
- `/shop/affirmations`: Affirmation shop
- `/shop/lifestyle`: Lifestyle shop
- `/affirmation-builder`: Interactive builder
- `/journal`: Blog/journal
- `/article/:id`: Article detail
- `/about`: About page
- `/contact`: Contact page
- `/terms`: Terms of service
- `/privacy`: Privacy policy
- `/affiliate-disclosure`: Affiliate disclosure
- `/admin/image-gen`: Admin image generation (protected)
- `*`: 404 Not Found

### Navigation Components
- **Header** (`src/components/Header.tsx`): Main navigation, cart icon
- **Footer** (`src/components/Footer.tsx`): Site footer with links
- **Breadcrumbs** (`src/components/Breadcrumbs.tsx`): Navigation breadcrumbs

---

## 15. Responsive Design

### Breakpoints
- Mobile: Default (< 640px)
- Tablet: `sm:` (640px+)
- Desktop: `md:` (768px+)
- Large: `lg:` (1024px+)
- XL: `xl:` (1280px+)

### Mobile-Specific Components
- `MobileFilterDrawer.tsx`: Mobile filter drawer
- `use-mobile.tsx`: Mobile detection hook
- Responsive grid layouts throughout

---

## 16. Performance Optimizations

### Code Splitting
- Route-based code splitting via React Router
- Lazy loading for heavy components

### Image Optimization
- Lazy loading for product images
- Thumbnail generation
- Responsive image sizes

### State Management
- Zustand for lightweight state
- Local storage persistence
- Minimal re-renders

---

## 17. Error Handling

### API Error Handling
- Try-catch blocks in all API calls
- User-friendly error messages
- Toast notifications for errors

### Type Safety
- TypeScript strict mode
- Supabase generated types
- Custom type definitions for design specs

---

## 18. Accessibility

### ARIA Labels
- Shadcn/ui components include ARIA attributes
- Keyboard navigation support
- Screen reader compatibility

### Semantic HTML
- Proper heading hierarchy
- Semantic elements (nav, main, article, etc.)
- Alt text for images

---

## 19. Recent Development Focus

Based on file analysis, recent work has focused on:

1. **AI Image Generation**:
   - Integration of multiple AI models (OpenAI, Gemini)
   - Bulk image generation admin interface
   - Design specification system

2. **Product Image Management**:
   - Standardized gallery layouts
   - Supabase image storage
   - Image generation workflows

3. **Automation**:
   - n8n workflow configurations
   - Instagram posting automation
   - Product sync engines

4. **UI/UX Improvements**:
   - Shadcn/ui component library integration
   - Custom design system
   - Responsive layouts

---

## 20. File Statistics

### Code Files Analyzed
- **TypeScript/TSX**: ~100+ files
- **JavaScript**: ~10 files
- **Configuration**: ~10 files
- **Data/JSON**: ~5 files
- **Documentation**: ~10 files

### Total Lines of Code (Estimated)
- Frontend Components: ~15,000+ lines
- Backend/API: ~2,000+ lines
- Utilities/Libs: ~1,500+ lines
- Configuration: ~500+ lines
- **Total**: ~19,000+ lines of code

---

## 21. Dependencies Summary

### Core Dependencies
- `react`, `react-dom`: UI framework
- `react-router-dom`: Routing
- `zustand`: State management
- `@supabase/supabase-js`: Database/backend
- `tailwindcss`: Styling
- `lucide-react`: Icons

### UI Dependencies
- `@radix-ui/*`: UI primitives (15+ packages)
- `class-variance-authority`: Component variants
- `clsx`, `tailwind-merge`: Class name utilities

### Development Dependencies
- `vite`: Build tool
- `typescript`: Type safety
- `@types/*`: Type definitions
- `eslint`: Linting
- `autoprefixer`, `postcss`: CSS processing

---

## 22. Security Considerations

### API Keys
- Environment variables for sensitive data
- Supabase RLS (Row Level Security) policies
- Secure API endpoints

### Data Validation
- TypeScript type checking
- Input validation in forms
- Sanitized user inputs

---

## 23. Deployment Considerations

### Build Output
- Vite production build
- Optimized assets
- Code splitting

### Environment Variables
- Supabase URL and keys
- OpenAI API keys
- Other service credentials

### Supabase Edge Functions
- Serverless deployment
- Automatic scaling
- Regional deployment options

---

## Conclusion

Luna Ritual Studio is a sophisticated, modern e-commerce platform with:
- **Full-stack architecture** using React, TypeScript, and Supabase
- **AI-powered features** for image generation and customization
- **Comprehensive UI component library** with Shadcn/ui
- **Automated workflows** for social media and content management
- **Type-safe codebase** with extensive TypeScript usage
- **Modern design system** with custom branding
- **Scalable architecture** ready for production deployment

The codebase demonstrates best practices in:
- Component composition
- State management
- API design
- Type safety
- Responsive design
- Performance optimization

---

*Summary generated from comprehensive codebase analysis*
*Last updated: Based on current repository state*

