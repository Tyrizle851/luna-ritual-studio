import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Star, Package, Truck, RefreshCw } from "lucide-react";
import { FashionProduct } from "@/data/fashion";

interface FashionProductModalProps {
  product: FashionProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FashionProductModal = ({ product, open, onOpenChange }: FashionProductModalProps) => {
  if (!product) return null;

  const handleShopNow = () => {
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Hero Image Section */}
          <div className="relative aspect-[4/5] md:aspect-video bg-white overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.badge && (
              <Badge 
                className={`absolute top-4 left-4 ${
                  product.badge === 'Sale' ? 'bg-destructive' :
                  product.badge === 'Best Seller' ? 'bg-primary' :
                  'bg-accent'
                } text-white`}
              >
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl mb-2">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>

            {/* Rating & Social Proof */}
            {product.rating && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
                  )}
                </div>
                {product.socialProof && (
                  <span className="text-muted-foreground">{product.socialProof}</span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <Badge variant="destructive">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Prime Badge */}
            {product.isPrime && (
              <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded-md w-fit">
                <Truck className="h-4 w-4" />
                <span className="font-medium">Prime Eligible - Free Shipping</span>
              </div>
            )}

            {/* Description */}
            <p className="text-text-secondary leading-relaxed">{product.description}</p>

            {/* Style Notes */}
            {product.styleNotes && (
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide">Style Notes</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{product.styleNotes}</p>
              </div>
            )}

            {/* Quick Features */}
            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
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
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Product Details</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm">
                    {product.productDetails.fabric && (
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Fabric:</span>
                        <span className="font-medium">{product.productDetails.fabric}</span>
                      </div>
                    )}
                    {product.productDetails.care && (
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Care:</span>
                        <span className="font-medium">{product.productDetails.care}</span>
                      </div>
                    )}
                    {product.productDetails.fit && (
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Fit:</span>
                        <span className="font-medium">{product.productDetails.fit}</span>
                      </div>
                    )}
                    {product.productDetails.origin && (
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Origin:</span>
                        <span className="font-medium">{product.productDetails.origin}</span>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* How to Style It */}
              {product.stylingIdeas && product.stylingIdeas.length > 0 && (
                <AccordionItem value="styling">
                  <AccordionTrigger className="text-left">How to Style It</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 text-sm">
                      {product.stylingIdeas.map((idea, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="font-semibold text-primary min-w-fit">{idea.occasion}:</span>
                          <span className="text-text-secondary">{idea.suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Size & Fit */}
              {(product.sizes || product.colors) && (
                <AccordionItem value="size">
                  <AccordionTrigger className="text-left">Size & Fit</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm">
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
                      <p className="text-text-secondary mt-2">
                        <span className="font-semibold">Fit Notes:</span> {product.productDetails.fit}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Shipping & Returns */}
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Shipping & Returns</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm text-text-secondary">
                  {product.isPrime && (
                    <div>
                      <p className="font-semibold text-primary mb-1">Prime Eligible</p>
                      <p>Free 2-day shipping for Prime members. Orders over $35 ship free for all customers.</p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground mb-1">Easy Returns</p>
                    <p>Free returns within 30 days of purchase. Items must be unworn with tags attached.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Purchase Through Amazon</p>
                    <p>This product is fulfilled by Amazon. All transactions, customer service, and returns are handled directly through Amazon's secure platform.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Sticky CTA - Hidden on desktop, visible on mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                </div>
                <Button
                  onClick={handleShopNow}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Shop Now <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block pt-4 border-t border-border">
              <Button
                onClick={handleShopNow}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Shop Now on Amazon <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Redirects to Amazon • Secure checkout • Easy returns
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};