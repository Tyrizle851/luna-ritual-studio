import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cartStore";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";

export const Cart = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-text-muted mb-4">Your cart is calm and empty</p>
            <Button onClick={closeCart} variant="outline" className="border-clay text-clay">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.format || 'default'}`} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      {item.format && (
                        <p className="text-sm text-text-muted mb-2">{item.format}</p>
                      )}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(`${item.id}-${item.format || 'default'}`, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(`${item.id}-${item.format || 'default'}`, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium mb-2">${item.price}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeItem(`${item.id}-${item.format || 'default'}`)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              {/* Free Shipping Progress */}
              {getTotal() < 50 && (
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Free shipping at $50</span>
                    <span className="font-medium">${(50 - getTotal()).toFixed(2)} away</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-clay to-gold transition-all duration-300"
                      style={{ width: `${(getTotal() / 50) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {getTotal() >= 50 && (
                <div className="bg-gradient-to-r from-clay/10 to-gold/10 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-clay">🎉 You've qualified for free shipping!</p>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <CheckoutButton className="w-full bg-clay hover:bg-clay-dark text-white" />
              <Button variant="outline" className="w-full" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
