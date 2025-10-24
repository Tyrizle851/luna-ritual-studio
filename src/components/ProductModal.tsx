import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Affirmation } from "@/data/affirmations";
import { useCartStore } from "@/store/cartStore";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-[4/5] bg-secondary rounded overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-text-secondary mb-6">{product.description}</p>
            
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

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold">${product.price}</span>
              </div>
              
              <Button
                className="w-full bg-clay hover:bg-clay-dark text-white"
                onClick={handleAddToCart}
                disabled={!selectedFormat}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
