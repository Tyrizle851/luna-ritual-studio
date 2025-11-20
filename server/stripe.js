import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Product catalog - Maps affirmation IDs to their details
// Note: Price IDs should be created in Stripe Dashboard and updated here
export const AFFIRMATION_PRODUCTS = {
  'aff-rest': {
    id: 'aff-rest',
    name: 'I am worthy of rest',
    price: 12.00,
    stripePriceId: 'price_REST_ID_FROM_STRIPE', // Update after creating in Stripe Dashboard
    imageFile: 'affirmation-rest.jpg',
    description: 'A calming affirmation for self-care and rest'
  },
  'aff-abundance': {
    id: 'aff-abundance',
    name: 'Abundance flows to me',
    price: 12.00,
    stripePriceId: 'price_ABUNDANCE_ID_FROM_STRIPE',
    imageFile: 'affirmation-abundance.jpg',
    description: 'Embrace abundance and prosperity'
  },
  'aff-calm': {
    id: 'aff-calm',
    name: 'My calm is my power',
    price: 12.00,
    stripePriceId: 'price_CALM_ID_FROM_STRIPE',
    imageFile: 'affirmation-calm.jpg',
    description: 'Find power in your calm'
  },
  'aff-joy': {
    id: 'aff-joy',
    name: 'I choose joy today',
    price: 12.00,
    stripePriceId: 'price_JOY_ID_FROM_STRIPE',
    imageFile: 'affirmation-joy.jpg',
    description: 'Choose joy in every moment'
  },
  'aff-natural-joy': {
    id: 'aff-natural-joy',
    name: 'Joy is my natural state',
    price: 12.00,
    stripePriceId: 'price_NATURAL_JOY_ID_FROM_STRIPE',
    imageFile: 'affirmation-natural-joy.jpg',
    description: 'Joy as your natural way of being'
  },
};

/**
 * Create a Stripe checkout session
 * @param {Array} cartItems - Array of cart items {id, title, price, quantity, image}
 * @param {string} successUrl - URL to redirect on success
 * @param {string} cancelUrl - URL to redirect on cancel
 * @returns {Promise<Object>} Stripe session object
 */
export async function createCheckoutSession(cartItems, successUrl, cancelUrl) {
  try {
    // Transform cart items into Stripe line items
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: `Digital download: ${item.title}`,
          images: item.image ? [item.image] : [],
          metadata: {
            affirmationId: item.id,
            imageFile: AFFIRMATION_PRODUCTS[item.id]?.imageFile || '',
          }
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: undefined, // Customer will enter their email in Stripe checkout
      shipping_address_collection: undefined, // No shipping needed for digital products
      billing_address_collection: 'auto',
      metadata: {
        cartItems: JSON.stringify(cartItems.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          imageFile: AFFIRMATION_PRODUCTS[item.id]?.imageFile || ''
        }))),
      },
      allow_promotion_codes: true, // Allow discount codes
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // Session expires in 30 minutes
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Retrieve a checkout session
 * @param {string} sessionId - Stripe session ID
 * @returns {Promise<Object>} Session data
 */
export async function getCheckoutSession(sessionId) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer']
    });
    return {
      success: true,
      session,
    };
  } catch (error) {
    console.error('Failed to retrieve checkout session:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Verify webhook signature
 * @param {string} payload - Raw request body
 * @param {string} signature - Stripe signature header
 * @returns {Object|null} Event object or null if verification fails
 */
export function constructWebhookEvent(payload, signature) {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    return event;
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return null;
  }
}

export default stripe;
