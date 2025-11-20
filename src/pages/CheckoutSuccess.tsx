import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle2, Download, Mail, Loader2 } from "lucide-react";

interface OrderItem {
  title: string;
  quantity: number;
}

interface SessionData {
  orderNumber: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
}

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('No session ID found');
      setIsLoading(false);
      return;
    }

    // Fetch session data from backend
    const fetchSession = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/checkout/session/${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to retrieve session');
        }

        const session = data.session;

        // Parse cart items from metadata
        let items: OrderItem[] = [];
        try {
          items = JSON.parse(session.metadata?.cartItems || '[]');
        } catch (e) {
          console.error('Failed to parse cart items:', e);
        }

        setSessionData({
          orderNumber: session.id.slice(-12).toUpperCase(),
          customerEmail: session.customer_details?.email || '',
          items,
          total: session.amount_total / 100,
        });

        // Clear the cart after successful purchase
        clearCart();
        setIsLoading(false);

      } catch (err) {
        console.error('Error fetching session:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order details');
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [searchParams, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-white">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-clay mx-auto mb-4" />
          <p className="text-text-muted">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-white px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="font-display text-3xl mb-4 text-text-primary">Something went wrong</h1>
          <p className="text-text-muted mb-8">{error || 'Unable to load order details'}</p>
          <Button onClick={() => navigate('/shop')} className="bg-clay hover:bg-clay-dark text-white">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Success Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl mb-4 text-text-primary">
            Your affirmations are ready
          </h1>
          <p className="text-lg text-text-secondary">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          {/* Order Details */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="font-display text-2xl mb-4 text-clay">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Order Number:</span>
                <span className="font-medium text-text-primary">#{sessionData.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Email:</span>
                <span className="font-medium text-text-primary">{sessionData.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Total:</span>
                <span className="font-semibold text-clay text-base">${sessionData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="font-display text-xl mb-4 text-clay">Your Affirmations</h3>
            <div className="space-y-3">
              {sessionData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{item.title}</p>
                    <p className="text-sm text-text-muted">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Notice */}
          <div className="bg-gradient-to-r from-clay/10 to-gold/10 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-clay mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-clay mb-1">Check your email</h4>
                <p className="text-sm text-text-secondary">
                  We've sent your affirmations to <strong>{sessionData.customerEmail}</strong>.
                  The email includes download links for all your high-resolution images.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-cream/50 rounded-lg p-6">
            <h4 className="font-display text-lg mb-3 text-clay">Start Your Ritual</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <Download className="h-4 w-4 mt-0.5 flex-shrink-0 text-clay" />
                <span>Download your high-resolution images from the email</span>
              </li>
              <li className="flex items-start gap-2">
                <Download className="h-4 w-4 mt-0.5 flex-shrink-0 text-clay" />
                <span>Print on high-quality paper or set as your phone wallpaper</span>
              </li>
              <li className="flex items-start gap-2">
                <Download className="h-4 w-4 mt-0.5 flex-shrink-0 text-clay" />
                <span>Place where you'll see them daily for gentle reminders</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate('/shop')}
            className="bg-clay hover:bg-clay-dark text-white px-8"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-clay text-clay hover:bg-clay/5"
          >
            Back to Home
          </Button>
        </motion.div>

        {/* Footer Note */}
        <p className="text-center text-sm text-text-muted mt-12">
          Questions about your order? Contact us at{" "}
          <a href="mailto:lunarituals10@gmail.com" className="text-clay hover:underline">
            lunarituals10@gmail.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
