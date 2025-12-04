# Product Modal Image Gallery Specification

## Layout Overview
Side-by-side layout with main image on LEFT, thumbnails stacked vertically on RIGHT.

## Exact Specifications

### Container
- `flex flex-row` (always horizontal, never stacks)
- Height: `h-[300px] md:h-[340px]`
- No background color, no padding

### Main Image (Left Side)
- `flex-1` (fills remaining space)
- `overflow-hidden`
- Image: `w-full h-full object-cover` (fills edge-to-edge, NO whitespace)
- NO padding, NO centering classes
- Badge positioned: `absolute top-2 left-2 text-[10px]`

### Thumbnails (Right Side)
- Width: `w-[85px] md:w-[95px]`
- `flex flex-col` (vertical stack)
- `border-l border-border/40` (left border separator)
- Each thumbnail:
  - `flex-1` (auto-fills height equally)
  - `border-b border-border/30 last:border-b-0` (horizontal separators)
  - `overflow-hidden`
  - Active state: `ring-2 ring-inset ring-primary`
  - Hover state: `hover:opacity-80`
  - Image: `w-full h-full object-cover`
  - Label: `absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] px-0.5 py-0.5 text-center font-medium`

### Label Names
- `original` → "Product"
- `lifestyle` → "Lifestyle"
- `detail` → "Detail"
- `styled` → "Styled"

## Single Image Fallback
When only 1 image exists:
- `h-[300px] md:h-[340px]`
- `overflow-hidden`
- Image: `w-full h-full object-cover`

## Key Principles
1. NO whitespace - images fill containers completely
2. NO object-contain - always use object-cover
3. NO padding on image containers
4. Thumbnails collectively match main image height (flex-1 on each)
5. Always horizontal layout (no mobile vertical stacking)

## Files Using This Pattern
- `src/components/FashionProductModal.tsx` ✅
- `src/components/CandleModal.tsx` ✅
- `src/components/BookModal.tsx` ✅
- `src/components/SupplementModal.tsx` ✅
- `src/components/ProductModal.tsx` ✅ (Affirmations)
