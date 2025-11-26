import { useState } from "react";
import { Helmet } from "react-helmet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Affirmation } from "@/data/affirmations";
import { useCartStore } from "@/store/cartStore";
import { generateAffirmationSchema } from "@/lib/seoUtils";
import { Star, Check } from "lucide-react";

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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-[4/5] bg-secondary">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-sm font-semibold px-3 py-1.5 rounded shadow-lg">
                  {product.badge}
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-6 md:p-8">
              {/* Header */}
              <div className="mb-4">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {product.category} Affirmation
                </span>
                <h2 className="font-display text-3xl mt-2 mb-3">{product.title}</h2>
              </div>

              {/* Rating Section */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating || 4.9}</span>
                {product.reviewCount && (
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                )}
                {product.socialProof && (
                  <span className="text-sm text-muted-foreground ml-auto">
                    {product.socialProof}
                  </span>
                )}
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-3 mb-6">
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-3xl font-semibold">${product.price}</span>
                {discount > 0 && (
                  <span className="text-sm bg-destructive/10 text-destructive px-2 py-1 rounded font-medium">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Benefits Box */}
              {product.features && product.features.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Why This Affirmation</h3>
                  <div className="grid gap-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Format Selector */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Select Format</h3>
                <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat}>
                  {product.formats.map((format) => (
                    <div key={format} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={format} id={format} />
                      <Label htmlFor={format} className="cursor-pointer">
                        {format}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Certifications Pills */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.certifications.map((cert, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}

              {/* Accordion Sections */}
              <Accordion type="single" collapsible className="mb-6">
                {product.productDetails && (
                  <AccordionItem value="whats-included">
                    <AccordionTrigger className="text-sm font-semibold">
                      What's Included
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm text-text-secondary">
                        {product.productDetails.resolution && (
                          <p><strong>Resolution:</strong> {product.productDetails.resolution}</p>
                        )}
                        {product.productDetails.fileFormats && (
                          <p><strong>File Formats:</strong> {product.productDetails.fileFormats}</p>
                        )}
                        {product.productDetails.aspectRatios && (
                          <p><strong>Aspect Ratios:</strong> {product.productDetails.aspectRatios}</p>
                        )}
                        {product.productDetails.delivery && (
                          <p><strong>Delivery:</strong> {product.productDetails.delivery}</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.usageIdeas && product.usageIdeas.length > 0 && (
                  <AccordionItem value="how-to-use">
                    <AccordionTrigger className="text-sm font-semibold">
                      How to Use
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-text-secondary">
                        {product.usageIdeas.map((idea, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                <AccordionItem value="digital-delivery">
                  <AccordionTrigger className="text-sm font-semibold">
                    Digital Delivery & Licensing
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p>After purchase, you'll receive instant access to download your affirmation files.</p>
                      <p><strong>License:</strong> Personal use only. You may print for personal use but may not resell or redistribute.</p>
                      <p><strong>No refunds:</strong> Due to the digital nature of this product, all sales are final.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* CTA Button */}
              <Button
                className="w-full bg-clay hover:bg-clay-dark text-white h-12 text-base font-semibold"
                onClick={handleAddToCart}
                disabled={!selectedFormat}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
