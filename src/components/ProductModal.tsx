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

interface ProductModalProps {
  product: Affirmation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductModal = ({ product, open, onOpenChange }: ProductModalProps) => {
  const [selectedFormat, setSelectedFormat] = useState("");
  const { addItem } = useCartStore();

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
          
          {/* Image Section - Top */}
          <div className="relative aspect-[4/3] bg-secondary">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded shadow-lg">
                {product.badge}
              </div>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
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
