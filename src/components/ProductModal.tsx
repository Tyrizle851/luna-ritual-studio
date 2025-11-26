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
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
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
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-foreground text-background text-sm font-semibold rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
                <span className="text-2xl md:text-3xl font-bold">${product.price}</span>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Benefits Box */}
              <div className="bg-secondary/30 rounded-lg p-4 mb-6 border border-border">
                <h3 className="font-semibold text-text-primary mb-2 uppercase tracking-wide text-sm">Why This Affirmation?</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  This carefully crafted affirmation combines powerful language with beautiful design to help you 
                  manifest your intentions. Perfect for daily practice, meditation spaces, or as inspiring wall art.
                </p>
              </div>

              {/* Features Grid */}
              {product.features && product.features.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Pills */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.certifications.map((cert, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary/50 rounded-full text-xs text-text-muted border border-border">
                      {cert}
                    </span>
                  ))}
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

              {/* Accordion Sections */}
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="whats-included">
                  <AccordionTrigger className="text-sm font-semibold hover:text-clay">
                    <span className="flex items-center gap-2">
                      <span>📦</span>
                      <span>What's Included</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm text-text-secondary">
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
                  <AccordionTrigger className="text-sm font-semibold hover:text-clay">
                    <span className="flex items-center gap-2">
                      <span>✨</span>
                      <span>How to Use</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {product.usageIdeas && product.usageIdeas.length > 0 ? (
                      <ul className="space-y-2 text-sm text-text-secondary">
                        {product.usageIdeas.map((idea, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-clay mt-0.5">•</span>
                            <span>{idea}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-text-secondary">
                        Download the file, print at your preferred size, or use as a digital wallpaper. 
                        Perfect for framing, vision boards, or daily affirmation practice.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="digital-delivery">
                  <AccordionTrigger className="text-sm font-semibold hover:text-clay">
                    <span className="flex items-center gap-2">
                      <span>📄</span>
                      <span>Digital Delivery & Licensing</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm text-text-secondary">
                      <p>
                        Your digital files will be available for instant download after purchase. 
                        You'll receive a download link via email and can access your files anytime from your account.
                      </p>
                      <p className="font-medium text-text-primary">Personal Use License:</p>
                      <ul className="space-y-1 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-clay">•</span>
                          <span>Print for personal home decor</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-clay">•</span>
                          <span>Use as phone or computer wallpapers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-clay">•</span>
                          <span>Include in personal vision boards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-clay">•</span>
                          <span>Share on personal social media (with credit)</span>
                        </li>
                      </ul>
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
