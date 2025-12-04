import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Star, Package, Truck, RefreshCw } from "lucide-react";
import { Candle } from "@/data/candles";
import { useProductImages } from "@/hooks/useProductImages";
import { cn } from "@/lib/utils";

interface CandleModalProps {
  product: Candle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CandleModal = ({ product, open, onOpenChange }: CandleModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { images } = useProductImages(product?.id || null, "candles");

  if (!product) return null;

  const handleShopNow = () => {
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Build gallery images - use generated images if available, otherwise just original
  const galleryImages = images.length > 0 
    ? images.map(img => ({
        url: img.image_url,
        label: img.variation_type === "original" ? "Product" : 
               img.variation_type === "lifestyle" ? "Lifestyle" :
               img.variation_type === "detail" ? "Detail" : "Styled"
      }))
    : [{ url: product.image, label: "Product" }];

  const currentImage = galleryImages[selectedImageIndex]?.url || product.image;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="relative">
          {/* Hero Image Section with Side-by-Side Gallery */}
          <div className="relative overflow-hidden">
            {galleryImages.length > 1 ? (
              /* Side-by-side layout: Main image left, thumbnails right */
              <div className="flex flex-row h-[300px] md:h-[340px]">
                {/* Main Image - Left Side */}
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <Badge 
                      className={`absolute top-2 left-2 text-[10px] ${
                        product.badge === 'Sale' ? 'bg-foreground text-background' :
                        product.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                        product.badge === 'Best Value' ? 'bg-accent text-accent-foreground' :
                        'bg-secondary text-foreground'
                      } font-semibold`}
                    >
                      {product.badge}
                    </Badge>
                  )}
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
                        className="w-full h-full object-cover"
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
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <Badge 
                    className={`absolute top-2 left-2 text-[10px] ${
                      product.badge === 'Sale' ? 'bg-foreground text-background' :
                      product.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                      product.badge === 'Best Value' ? 'bg-accent text-accent-foreground' :
                      'bg-secondary text-foreground'
                    } font-semibold`}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Header */}
            <div>
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl mb-1">{product.name}</h2>
              <p className="text-xs md:text-sm text-muted-foreground">{product.brand}</p>
            </div>

            {/* Rating & Social Proof */}
            {product.rating && (
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 md:h-4 md:w-4 fill-primary text-primary" />
                  <span className="font-semibold">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                  )}
                </div>
                {product.socialProof && (
                  <span className="text-muted-foreground text-xs">{product.socialProof}</span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 md:gap-3">
              {product.originalPrice && (
                <span className="text-base md:text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl md:text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <Badge className="text-xs bg-foreground text-background">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Prime Badge & Shop Now */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {product.isPrime && (
                <div className="flex items-center gap-2 text-xs md:text-sm bg-primary/10 text-primary px-3 py-2 rounded-md">
                  <Truck className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="font-medium">Prime - Free Shipping</span>
                </div>
              )}
              <Button
                onClick={handleShopNow}
                size="lg"
                className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background"
              >
                Shop Now <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">{product.description}</p>

            {/* Scent Profile */}
            {product.scentProfile && (
              <div className="bg-secondary/30 p-3 md:p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-xs md:text-sm uppercase tracking-wide">Scent Profile</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{product.scentProfile}</p>
              </div>
            )}

            {/* Quick Features */}
            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              {/* Product Details */}
              {product.productDetails && (
                <AccordionItem value="details">
                  <AccordionTrigger className="text-left py-3 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span>Product Details</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 text-xs md:text-sm">
                    {product.productDetails.waxType && (
                      <div className="flex justify-between py-1.5 border-b border-border/50 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Wax Type:</span>
                        <span className="font-medium text-right">{product.productDetails.waxType}</span>
                      </div>
                    )}
                    {product.productDetails.wickType && (
                      <div className="flex justify-between py-1.5 border-b border-border/50 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Wick Type:</span>
                        <span className="font-medium text-right">{product.productDetails.wickType}</span>
                      </div>
                    )}
                    {product.productDetails.jarType && (
                      <div className="flex justify-between py-1.5 border-b border-border/50 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Container:</span>
                        <span className="font-medium text-right">{product.productDetails.jarType}</span>
                      </div>
                    )}
                    {product.productDetails.madeIn && (
                      <div className="flex justify-between py-1.5 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Made In:</span>
                        <span className="font-medium text-right">{product.productDetails.madeIn}</span>
                      </div>
                    )}
                    {product.burnTime && (
                      <div className="flex justify-between py-1.5 border-t border-border/50 gap-4 mt-2">
                        <span className="text-muted-foreground flex-shrink-0">Burn Time:</span>
                        <span className="font-medium text-right">{product.burnTime}</span>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Usage Ideas */}
              {product.usageIdeas && product.usageIdeas.length > 0 && (
                <AccordionItem value="usage">
                  <AccordionTrigger className="text-left py-3 text-sm md:text-base">Usage Ideas</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2.5 text-xs md:text-sm">
                      {product.usageIdeas.map((idea, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="text-text-secondary">{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Shipping & Returns */}
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-left py-3 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span>Shipping & Returns</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2.5 text-xs md:text-sm text-text-secondary leading-relaxed">
                  {product.isPrime && (
                    <div>
                      <p className="font-semibold text-primary mb-1">Prime Eligible</p>
                      <p>Free 2-day shipping for Prime members. Free shipping on $35+ orders.</p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground mb-1">Easy Returns</p>
                    <p>Free returns within 30 days. Items must be unused and in original packaging.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Amazon Fulfillment</p>
                    <p>Fulfilled by Amazon. All transactions and customer service handled through Amazon.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};