import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, XCircle } from "lucide-react";

const CheckoutCancel = () => {
  const navigate = useNavigate();
  const { openCart, getItemCount } = useCartStore();

  const handleReturnToCart = () => {
    openCart();
    navigate('/shop');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Cancel Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <XCircle className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl mb-4 text-text-primary">
            Checkout Cancelled
          </h1>
          <p className="text-lg text-text-secondary">
            No worries, your items are safe in your cart
          </p>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-8">
            <ShoppingCart className="h-12 w-12 text-clay mx-auto mb-4" />
            <h2 className="font-display text-2xl mb-2 text-clay">
              {getItemCount() > 0 ? `You have ${getItemCount()} item${getItemCount() !== 1 ? 's' : ''} waiting` : 'Your cart is ready'}
            </h2>
            <p className="text-text-muted">
              Your checkout was cancelled, but your selected affirmations are still in your cart whenever you're ready.
            </p>
          </div>

          {/* Reasons & Reassurance */}
          <div className="bg-cream/50 rounded-lg p-6 mb-6">
            <h3 className="font-display text-lg mb-3 text-clay">Take Your Time</h3>
            <p className="text-sm text-text-secondary mb-4">
              We understand that sometimes you need a moment to think. Here are a few things you can do:
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-clay mt-0.5">•</span>
                <span>Review your cart and make any adjustments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-clay mt-0.5">•</span>
                <span>Browse our collection for more affirmations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-clay mt-0.5">•</span>
                <span>Come back when you're ready - your cart will be here</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-clay mt-0.5">•</span>
                <span>Reach out if you have questions about your order</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="bg-gradient-to-r from-clay/10 to-gold/10 rounded-lg p-6">
            <h4 className="font-semibold text-clay mb-2">Need Help?</h4>
            <p className="text-sm text-text-secondary">
              If you experienced any issues during checkout or have questions about our products,
              we're here to help. Email us at{" "}
              <a href="mailto:lunarituals10@gmail.com" className="text-clay hover:underline font-medium">
                lunarituals10@gmail.com
              </a>
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {getItemCount() > 0 && (
            <Button
              onClick={handleReturnToCart}
              className="bg-clay hover:bg-clay-dark text-white px-8"
            >
              Return to Cart
            </Button>
          )}
          <Button
            onClick={handleContinueShopping}
            variant="outline"
            className="border-clay text-clay hover:bg-clay/5"
          >
            Continue Shopping
          </Button>
        </motion.div>

        {/* Reassurance Footer */}
        <p className="text-center text-sm text-text-muted mt-12">
          Your cart is saved and will be here when you return.
        </p>
      </motion.div>
    </div>
  );
};

export default CheckoutCancel;
