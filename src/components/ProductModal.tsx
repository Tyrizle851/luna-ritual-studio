import { useState } from "react";
import { Helmet } from "react-helmet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Affirmation } from "@/data/affirmations";
import { useCartStore } from "@/store/cartStore";
import { generateAffirmationSchema } from "@/lib/seoUtils";
import { Star, Check, Package, Sparkles, FileText } from "lucide-react";
import { useProductImages } from "@/hooks/useProductImages";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Affirmation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Category-specific labels for Affirmations
const getImageLabel = (variationType: string): string => {
  switch (variationType) {
    case "original": return "Artwork";
    case "lifestyle": return "In Space";
    case "detail": return "Close-up";
    case "styled": return "Styled";
    default: return variationType;
  }
};

export const ProductModal = ({ product, open, onOpenChange }: ProductModalProps) => {
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCartStore();
  const { images } = useProductImages(product?.id || null, "affirmations");

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedFormat) return;
    
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      format: selectedFormat,
      type: "affirmation"
    });
    
    onOpenChange(false);
    setSelectedFormat("");
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Build gallery images - use product.image for original, generated images for variations
  const galleryImages = images.length > 0 
    ? images.map(img => ({
        url: img.variation_type === "original" ? product.image : img.image_url,
        label: getImageLabel(img.variation_type)
      }))
    : [{ url: product.image, label: "Artwork" }];

  const currentImage = galleryImages[selectedImageIndex]?.url || product.image;

  return (
    <>
      {product && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(generateAffirmationSchema(product, `https://lunarituals.com/shop?tab=affirmations`))}
          </script>
        </Helmet>
      )}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {/* Accessibility Title (visually hidden) */}
          <DialogTitle className="sr-only">{product.title}</DialogTitle>
          
          {/* Image Section with Side-by-Side Gallery */}
          <div className="relative overflow-hidden">
            {galleryImages.length > 1 ? (
              /* Side-by-side layout: Main image left, thumbnails right */
              <div className="flex flex-row h-[300px] md:h-[340px]">
                {/* Main Image - Left Side */}
                <div className="relative flex-1 overflow-hidden">
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={currentImage}
                    alt={product.title}
                    className="w-full h-full object-cover scale-[0.85] origin-center"
                  />
                </div>
                
                {/* Thumbnails - Right Side (vertical stack) */}
                <div className="flex flex-col w-[85px] md:w-[95px] border-l border-border/40">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "relative flex-1 overflow-hidden transition-all border-b border-border/30 last:border-b-0",
                        selectedImageIndex === index 
                          ? "ring-2 ring-inset ring-primary" 
                          : "hover:opacity-80"
                      )}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover scale-[0.85] origin-center"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] px-0.5 py-0.5 text-center font-medium">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Single image layout */
              <div className="relative w-full h-[300px] md:h-[340px] overflow-hidden">
                {product.badge && (
                  <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
                    {product.badge}
                  </div>
                )}
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover scale-[0.85] origin-center"
                />
              </div>
            )}
          </div>

          {/* Content Section - Below */}
          <div className="p-4 md:p-6 space-y-4">
            {/* Header */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {product.category} Affirmation
              </span>
              <h2 className="font-display text-xl md:text-2xl mt-1 text-balance">{product.title}</h2>
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating || 4.9) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating || 4.9}</span>
              {product.reviewCount && (
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              )}
              {product.socialProof && (
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {product.socialProof}
                </span>
              )}
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.originalPrice && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 bg-foreground text-background text-xs font-semibold rounded">
                    -{discount}%
                  </span>
                </>
              )}
              <span className="text-xl md:text-2xl font-bold">${product.price}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed text-balance">
              {product.description}
            </p>

            {/* Certifications Pills */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.certifications.map((cert, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-secondary/50 rounded-full text-xs text-text-muted border border-border">
                    {cert}
                  </span>
                ))}
              </div>
            )}

            {/* Features Grid */}
            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Format Selector */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Select Format</h3>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a format or print size" />
                </SelectTrigger>
                <SelectContent>
                  {product.formats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="text-sm">
              <AccordionItem value="whats-included">
                <AccordionTrigger className="text-sm font-semibold hover:text-clay py-2">
                  <span className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>What's Included</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1.5 text-xs text-text-secondary">
                    {product.productDetails?.resolution && (
                      <p><span className="font-medium text-text-primary">Resolution:</span> {product.productDetails.resolution}</p>
                    )}
                    {product.productDetails?.fileFormats && (
                      <p><span className="font-medium text-text-primary">File Formats:</span> {product.productDetails.fileFormats}</p>
                    )}
                    {product.productDetails?.aspectRatios && (
                      <p><span className="font-medium text-text-primary">Aspect Ratios:</span> {product.productDetails.aspectRatios}</p>
                    )}
                    {product.productDetails?.delivery && (
                      <p><span className="font-medium text-text-primary">Delivery:</span> {product.productDetails.delivery}</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-to-use">
                <AccordionTrigger className="text-sm font-semibold hover:text-clay py-2">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>How to Use</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {product.usageIdeas && product.usageIdeas.length > 0 ? (
                    <ul className="space-y-1 text-xs text-text-secondary">
                      {product.usageIdeas.map((idea, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-clay mt-0.5">•</span>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-text-secondary">
                      Download the file, print at your preferred size, or use as a digital wallpaper. 
                      Perfect for framing, vision boards, or daily affirmation practice.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="digital-delivery">
                <AccordionTrigger className="text-sm font-semibold hover:text-clay py-2">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Digital Delivery & Licensing</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-xs text-text-secondary">
                    <p>
                      Instant download after purchase. You'll receive a download link via email.
                    </p>
                    <p className="font-medium text-text-primary">Personal Use License:</p>
                    <ul className="space-y-0.5 ml-3">
                      <li>• Print for personal home decor</li>
                      <li>• Use as phone or computer wallpapers</li>
                      <li>• Include in personal vision boards</li>
                      <li>• Share on personal social media (with credit)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA Button */}
            <Button
              className="w-full bg-clay hover:bg-clay-dark text-white h-11 text-sm font-semibold"
              onClick={handleAddToCart}
              disabled={!selectedFormat}
            >
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};