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
- Image: `w-full h-full object-cover scale-[0.85] origin-center` (15% zoom out to show more of the image)
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
  - Image: `w-full h-full object-cover scale-[0.85] origin-center`
  - Label: `absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] px-0.5 py-0.5 text-center font-medium`

### Category-Specific Labels
Each product category uses contextual labels for image variations:

| Variation Type | Fashion     | Candles   | Books    | Supplements | Affirmations |
|---------------|-------------|-----------|----------|-------------|--------------|
| `original`    | Main        | Main      | Cover    | Package     | Artwork      |
| `lifestyle`   | On Model    | In Room   | Reading  | In Use      | In Space     |
| `detail`      | Texture     | Close-up  | Pages    | Formula     | Close-up     |
| `styled`      | Flat Lay    | Styled    | Display  | Styled      | Styled       |

### Image Source Logic
- For `original` variation: Always use `product.image` (the local asset)
- For other variations: Use the `image_url` from database (generated images)

## Single Image Fallback
When only 1 image exists:
- `h-[300px] md:h-[340px]`
- `overflow-hidden`
- Image: `w-full h-full object-cover scale-[0.85] origin-center`

## Key Principles
1. Images are zoomed out 15% (`scale-[0.85]`) to prevent cutoff
2. NO object-contain - always use object-cover
3. NO padding on image containers
4. Thumbnails collectively match main image height (flex-1 on each)
5. Always horizontal layout (no mobile vertical stacking)
6. Original/Main image always uses local product.image asset

## Files Using This Pattern
- `src/components/FashionProductModal.tsx` ✅
- `src/components/CandleModal.tsx` ✅
- `src/components/BookModal.tsx` ✅
- `src/components/SupplementModal.tsx` ✅
- `src/components/ProductModal.tsx` ✅ (Affirmations)