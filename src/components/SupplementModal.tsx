import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, ShoppingBag, Package, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Supplement } from "@/data/supplements";

interface SupplementModalProps {
  product: Supplement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SupplementModal = ({ product, open, onOpenChange }: SupplementModalProps) => {
  const handleShopNow = () => {
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {!product ? null : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              
              {product.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating!)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-sm text-muted-foreground">
                      ({product.reviewCount.toLocaleString()} reviews)
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap mb-4">
                {product.badge && (
                  <Badge variant="secondary">{product.badge}</Badge>
                )}
                {product.isPrime && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Prime
                  </Badge>
                )}
                {product.socialProof && (
                  <Badge variant="outline">{product.socialProof}</Badge>
                )}
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{product.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span><strong>Servings:</strong> {product.servings}</span>
                </div>
                {product.dosageInfo && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span><strong>Dosage:</strong> {product.dosageInfo}</span>
                  </div>
                )}
              </div>

              <Button onClick={handleShopNow} className="w-full" size="lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now on Amazon
              </Button>
            </div>

            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Key Benefits</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Accordion type="single" collapsible className="w-full">
              {product.keyIngredients && product.keyIngredients.length > 0 && (
                <AccordionItem value="ingredients">
                  <AccordionTrigger>Key Ingredients</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {product.keyIngredients.map((ingredient, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {product.features && product.features.length > 0 && (
                <AccordionItem value="features">
                  <AccordionTrigger>Product Features</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-sm">{feature}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {product.certifications && product.certifications.length > 0 && (
                <AccordionItem value="certifications">
                  <AccordionTrigger>Certifications</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">{cert}</Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {product.usageIdeas && product.usageIdeas.length > 0 && (
                <AccordionItem value="usage">
                  <AccordionTrigger>Usage Ideas</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {product.usageIdeas.map((idea, index) => (
                        <li key={index} className="text-sm">{idea}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Shipping:</strong>
                      <p className="text-muted-foreground mt-1">Free shipping on orders over $35. Prime members get free 2-day shipping.</p>
                    </div>
                    <div>
                      <strong>Returns:</strong>
                      <p className="text-muted-foreground mt-1">30-day return policy. Items must be unopened and in original condition.</p>
                    </div>
                    <p className="text-xs text-muted-foreground italic">Purchase through Amazon</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
