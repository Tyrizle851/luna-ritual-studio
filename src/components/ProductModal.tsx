import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Affirmation, AFFIRMATION_FORMAT_PRICING, AffirmationFormat } from "@/data/affirmations";
import { useCartStore } from "@/store/cartStore";
import { generateAffirmationSchema } from "@/lib/seoUtils";
import { Star, Check, Package, Sparkles, FileText, Download, Image, Frame } from "lucide-react";
import { useProductImages } from "@/hooks/useProductImages";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Affirmation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Map variation types to format names and labels
const VARIATION_TO_FORMAT: Record<string, AffirmationFormat> = {
  "digital": "Digital Download",
  "canvas": "Canvas Print",
  "unframed": "Unframed Poster",
  "framed": "Framed Poster"
};

const FORMAT_TO_VARIATION: Record<AffirmationFormat, string> = {
  "Digital Download": "digital",
  "Canvas Print": "canvas",
  "Unframed Poster": "unframed",
  "Framed Poster": "framed"
};

const getImageLabel = (variationType: string): string => {
  switch (variationType) {
    case "digital": return "Digital";
    case "canvas": return "Canvas";
    case "unframed": return "Poster";
    case "framed": return "Framed";
    default: return variationType;
  }
};

const getImageIcon = (variationType: string) => {
  switch (variationType) {
    case "digital": return Download;
    case "canvas": return Image;
    case "unframed": return FileText;
    case "framed": return Frame;
    default: return Image;
  }
};

export const ProductModal = ({ product, open, onOpenChange }: ProductModalProps) => {
  const [selectedFormat, setSelectedFormat] = useState<AffirmationFormat>("Digital Download");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPrice, setCurrentPrice] = useState<number>(AFFIRMATION_FORMAT_PRICING["Digital Download"]);
  const { addItem } = useCartStore();
  const { images } = useProductImages(product?.id || null, "affirmations");

  // Reset state when modal opens with new product
  useEffect(() => {
    if (open && product) {
      setSelectedFormat("Digital Download");
      setSelectedImageIndex(0);
      setCurrentPrice(AFFIRMATION_FORMAT_PRICING["Digital Download"]);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: currentPrice,
      image: product.image,
      format: selectedFormat,
      type: "affirmation"
    });
    
    onOpenChange(false);
  };

  // Handle format selection change
  const handleFormatChange = (format: AffirmationFormat) => {
    setSelectedFormat(format);
    setCurrentPrice(AFFIRMATION_FORMAT_PRICING[format]);
    
    // Sync thumbnail selection with format
    const variationType = FORMAT_TO_VARIATION[format];
    const imageIndex = galleryImages.findIndex(img => img.variationType === variationType);
    if (imageIndex >= 0) {
      setSelectedImageIndex(imageIndex);
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index: number, variationType: string) => {
    setSelectedImageIndex(index);
    
    // Sync format selector with thumbnail
    const format = VARIATION_TO_FORMAT[variationType];
    if (format) {
      setSelectedFormat(format);
      setCurrentPrice(AFFIRMATION_FORMAT_PRICING[format]);
    }
  };

  // Build gallery images - order: digital, canvas, unframed, framed
  const variationOrder = ["digital", "canvas", "unframed", "framed"];
  
  const galleryImages = images.length > 0 
    ? variationOrder
        .map(variation => {
          const img = images.find(i => i.variation_type === variation);
          if (img) {
            return {
              url: img.image_url,
              label: getImageLabel(variation),
              variationType: variation
            };
          }
          return null;
        })
        .filter((img): img is { url: string; label: string; variationType: string } => img !== null)
    : [{ url: product.image, label: "Artwork", variationType: "digital" }];

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
              <div className="flex flex-row h-[300px] md:h-[380px]">
                {/* Main Image - Left Side */}
                <div className="relative flex-1 overflow-hidden bg-secondary/30">
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={currentImage}
                    alt={`${product.title} - ${galleryImages[selectedImageIndex]?.label}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                
                {/* Thumbnails - Right Side (vertical stack) */}
                <div className="flex flex-col w-[85px] md:w-[95px] border-l border-border/40">
                  {galleryImages.map((img, index) => {
                    const IconComponent = getImageIcon(img.variationType);
                    return (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index, img.variationType)}
                        className={cn(
                          "relative flex-1 overflow-hidden transition-all border-b border-border/30 last:border-b-0",
                          selectedImageIndex === index 
                            ? "ring-2 ring-inset ring-primary bg-primary/5" 
                            : "hover:opacity-80 hover:bg-secondary/50"
                        )}
                      >
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] px-0.5 py-0.5 text-center font-medium flex items-center justify-center gap-0.5">
                          <IconComponent className="h-2.5 w-2.5" />
                          {img.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Single image layout */
              <div className="relative w-full h-[300px] md:h-[380px] overflow-hidden bg-secondary/30">
                {product.badge && (
                  <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
                    {product.badge}
                  </div>
                )}
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-contain p-2"
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

            {/* Dynamic Price Section */}
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <span className="text-2xl md:text-3xl font-bold">${currentPrice.toFixed(2)}</span>
              <div className="text-xs text-muted-foreground">
                {selectedFormat === "Digital Download" && "Instant download"}
                {selectedFormat === "Canvas Print" && "18×24 stretched canvas"}
                {selectedFormat === "Unframed Poster" && "18×24 matte poster"}
                {selectedFormat === "Framed Poster" && "18×24 with Red Oak frame"}
              </div>
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

            {/* Format Selector with Pricing */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Select Format</h3>
              <Select value={selectedFormat} onValueChange={(value) => handleFormatChange(value as AffirmationFormat)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a format" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(AFFIRMATION_FORMAT_PRICING) as AffirmationFormat[]).map((format) => (
                    <SelectItem key={format} value={format}>
                      <div className="flex items-center justify-between w-full gap-4">
                        <span>{format}</span>
                        <span className="text-muted-foreground">${AFFIRMATION_FORMAT_PRICING[format].toFixed(2)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Format details */}
              <div className="mt-2 text-xs text-muted-foreground">
                {selectedFormat === "Digital Download" && (
                  <p>High-resolution digital file for printing at home or at a print shop. Instant download after purchase.</p>
                )}
                {selectedFormat === "Canvas Print" && (
                  <p>18×24 inch gallery-quality stretched canvas with 1.5" depth. Ready to hang. Ships in 5-7 business days.</p>
                )}
                {selectedFormat === "Unframed Poster" && (
                  <p>18×24 inch museum-quality matte paper poster. Ships rolled in a protective tube. 5-7 business days.</p>
                )}
                {selectedFormat === "Framed Poster" && (
                  <p>18×24 inch poster in a beautiful Red Oak wood frame. Ready to hang. Ships in 5-7 business days.</p>
                )}
              </div>
            </div>

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
                  <div className="space-y-2 text-xs text-text-secondary">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-secondary/30 rounded">
                        <p className="font-medium text-text-primary">Digital Download</p>
                        <p>High-res file, instant access</p>
                      </div>
                      <div className="p-2 bg-secondary/30 rounded">
                        <p className="font-medium text-text-primary">Canvas Print</p>
                        <p>18×24 stretched canvas</p>
                      </div>
                      <div className="p-2 bg-secondary/30 rounded">
                        <p className="font-medium text-text-primary">Unframed Poster</p>
                        <p>18×24 matte paper</p>
                      </div>
                      <div className="p-2 bg-secondary/30 rounded">
                        <p className="font-medium text-text-primary">Framed Poster</p>
                        <p>18×24 Red Oak frame</p>
                      </div>
                    </div>
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
                      Download the digital file for instant use, or order a physical print to display in your space.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-semibold hover:text-clay py-2">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Shipping & Delivery</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-xs text-text-secondary">
                    <p><span className="font-medium text-text-primary">Digital Download:</span> Instant access via email</p>
                    <p><span className="font-medium text-text-primary">Physical Products:</span> Ships within 5-7 business days</p>
                    <p><span className="font-medium text-text-primary">Shipping:</span> Free shipping on orders over $75</p>
                    <p className="text-muted-foreground italic">All prints are made-to-order by our print partner.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA Button */}
            <Button
              className="w-full bg-clay hover:bg-clay-dark text-white h-11 text-sm font-semibold"
              onClick={handleAddToCart}
            >
              Add to Cart — ${currentPrice.toFixed(2)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
