import { constructWebhookEvent, getCheckoutSession } from './stripe.js';
import { sendOrderConfirmationEmail } from './email.js';
import path from 'path';
import { fileURLToPath } from 'url';

// For ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Handle Stripe webhook events
 * @param {string} rawBody - Raw request body
 * @param {string} signature - Stripe signature header
 * @returns {Promise<Object>} Result
 */
export async function handleStripeWebhook(rawBody, signature) {
  // Verify webhook signature
  const event = constructWebhookEvent(rawBody, signature);

  if (!event) {
    return {
      success: false,
      error: 'Invalid signature',
      status: 400,
    };
  }

  console.log('Webhook event received:', event.type);

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed':
      return await handleCheckoutCompleted(event.data.object);

    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data.object.id);
      return { success: true, message: 'Payment intent succeeded' };

    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      return { success: true, message: 'Payment intent failed logged' };

    default:
      console.log('Unhandled event type:', event.type);
      return { success: true, message: 'Event type not handled' };
  }
}

/**
 * Handle checkout.session.completed event
 * Sends order confirmation email with download links
 * @param {Object} session - Stripe session object
 * @returns {Promise<Object>} Result
 */
async function handleCheckoutCompleted(session) {
  try {
    console.log('Processing completed checkout:', session.id);

    // Only process paid sessions
    if (session.payment_status !== 'paid') {
      console.log('Session not paid yet:', session.id);
      return { success: true, message: 'Session not paid' };
    }

    // Get full session details with line items
    const sessionResult = await getCheckoutSession(session.id);
    if (!sessionResult.success) {
      throw new Error('Failed to retrieve session details');
    }

    const fullSession = sessionResult.session;
    const customerEmail = fullSession.customer_details?.email;

    if (!customerEmail) {
      throw new Error('No customer email found in session');
    }

    // Extract cart items from metadata
    let cartItems = [];
    try {
      cartItems = JSON.parse(fullSession.metadata?.cartItems || '[]');
    } catch (e) {
      console.error('Failed to parse cart items from metadata:', e);
    }

    // Build order details
    const orderDetails = {
      orderNumber: session.id.slice(-12).toUpperCase(),
      customerEmail,
      items: cartItems.map(item => ({
        title: item.title,
        quantity: item.quantity,
        downloadUrl: generateDownloadUrl(item.imageFile),
      })),
      total: fullSession.amount_total / 100, // Convert from cents
    };

    console.log('Sending order confirmation to:', customerEmail);

    // Send order confirmation email
    const emailResult = await sendOrderConfirmationEmail(orderDetails);

    if (!emailResult.success) {
      throw new Error(`Email send failed: ${emailResult.error}`);
    }

    console.log('Order confirmation sent successfully:', emailResult.messageId);

    return {
      success: true,
      message: 'Order processed and email sent',
      emailId: emailResult.messageId,
    };

  } catch (error) {
    console.error('Error handling checkout completion:', error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
}

/**
 * Generate download URL for an affirmation image
 * In production, this should point to a secure CDN or signed URL
 * For now, we'll use the static assets path
 * @param {string} imageFile - Image filename
 * @returns {string} Download URL
 */
function generateDownloadUrl(imageFile) {
  // TODO: In production, generate signed URLs with expiration
  // For development, point to the static assets
  const baseUrl = process.env.APP_URL || 'http://localhost:5173';
  return `${baseUrl}/src/assets/${imageFile}`;
}

/**
 * Express middleware for handling raw body for webhook verification
 */
export function webhookRawBodyMiddleware(req, res, next) {
  if (req.path === '/api/webhooks/stripe') {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      req.rawBody = data;
      next();
    });
  } else {
    next();
  }
}
