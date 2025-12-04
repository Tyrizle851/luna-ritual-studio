import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Star, Package, Truck, RefreshCw, Wand2 } from "lucide-react";
import { FashionProduct } from "@/data/fashion";
import { useProductImages } from "@/hooks/useProductImages";
import { cn } from "@/lib/utils";
import { generateProductImages } from "@/lib/generateProductImages";
import { toast } from "sonner";

interface FashionProductModalProps {
  product: FashionProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FashionProductModal = ({ product, open, onOpenChange }: FashionProductModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const { images, isLoading } = useProductImages(product?.id || null, "fashion");

  if (!product) return null;

  const handleShopNow = () => {
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGenerateImages = async () => {
    if (!product) return;
    setIsGenerating(true);
    toast.info("Generating AI image variations... This may take 1-2 minutes.");
    
    try {
      await generateProductImages({
        productId: product.id,
        productCategory: "fashion",
        productName: product.name,
        productBrand: product.brand,
        productDescription: product.description,
        imageSource: product.image,
      });
      toast.success("Images generated! Refresh to see them.");
    } catch (error) {
      console.error("Failed to generate images:", error);
      toast.error("Failed to generate images. Check console for details.");
    } finally {
      setIsGenerating(false);
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
          {/* Hero Image Section with Gallery */}
          <div className="relative bg-white overflow-hidden">
            {/* Main Image */}
            <div className="relative w-full flex items-center justify-center bg-white min-h-[300px] md:min-h-[450px]">
              <img
                src={currentImage}
                alt={product.name}
                className="max-w-full max-h-[400px] md:max-h-[500px] object-contain transition-opacity duration-300"
              />
              {product.badge && (
                <Badge 
                  className={`absolute top-3 left-3 ${
                    product.badge === 'Sale' ? 'bg-foreground text-background' :
                    product.badge === 'Best Seller' ? 'bg-primary text-primary-foreground' :
                    'bg-accent text-accent-foreground'
                  } font-semibold`}
                >
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Thumbnail Strip - only show if we have multiple images */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 p-3 bg-secondary/30 overflow-x-auto">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                      selectedImageIndex === index 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-transparent hover:border-muted-foreground/30"
                    )}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 text-center truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Generate Images Button - show when no generated images exist */}
            {images.length === 0 && (
              <div className="p-3 bg-secondary/30 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateImages}
                  disabled={isGenerating}
                  className="w-full"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating AI Variations..." : "Generate AI Image Variations"}
                </Button>
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

            {/* Style Notes */}
            {product.styleNotes && (
              <div className="bg-secondary/30 p-3 md:p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-xs md:text-sm uppercase tracking-wide">Style Notes</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{product.styleNotes}</p>
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
                    {product.productDetails.fabric && (
                      <div className="flex justify-between py-1.5 border-b border-border/50 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Fabric:</span>
                        <span className="font-medium text-right">{product.productDetails.fabric}</span>
                      </div>
                    )}
                    {product.productDetails.care && (
                      <div className="flex justify-between py-1.5 border-b border-border/50 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Care:</span>
                        <span className="font-medium text-right">{product.productDetails.care}</span>
                      </div>
                    )}
                    {product.productDetails.fit && (
                      <div className="flex justify-between py-1.5 border-b border-border/50 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Fit:</span>
                        <span className="font-medium text-right">{product.productDetails.fit}</span>
                      </div>
                    )}
                    {product.productDetails.origin && (
                      <div className="flex justify-between py-1.5 gap-4">
                        <span className="text-muted-foreground flex-shrink-0">Origin:</span>
                        <span className="font-medium text-right">{product.productDetails.origin}</span>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* How to Style It */}
              {product.stylingIdeas && product.stylingIdeas.length > 0 && (
                <AccordionItem value="styling">
                  <AccordionTrigger className="text-left py-3 text-sm md:text-base">How to Style It</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2.5 text-xs md:text-sm">
                      {product.stylingIdeas.map((idea, index) => (
                        <li key={index} className="flex flex-col gap-1">
                          <span className="font-semibold text-primary">{idea.occasion}:</span>
                          <span className="text-text-secondary pl-4">{idea.suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Size & Fit */}
              {(product.sizes || product.colors) && (
                <AccordionItem value="size">
                  <AccordionTrigger className="text-left py-3 text-sm md:text-base">Size & Fit</AccordionTrigger>
                  <AccordionContent className="space-y-2.5 text-xs md:text-sm">
                    {product.sizes && (
                      <div>
                        <span className="text-muted-foreground">Available Sizes: </span>
                        <span className="font-medium">{product.sizes.join(', ')}</span>
                      </div>
                    )}
                    {product.colors && (
                      <div>
                        <span className="text-muted-foreground">Available Colors: </span>
                        <span className="font-medium">{product.colors.join(', ')}</span>
                      </div>
                    )}
                    {product.productDetails?.fit && (
                      <p className="text-text-secondary mt-2 leading-relaxed">
                        <span className="font-semibold">Fit Notes:</span> {product.productDetails.fit}
                      </p>
                    )}
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
                    <p>Free returns within 30 days. Items must be unworn with tags attached.</p>
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
