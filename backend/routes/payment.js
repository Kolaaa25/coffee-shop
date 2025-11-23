import express from 'express';
import Stripe from 'stripe';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
router.post('/create-checkout-session', authenticateToken, async (req, res) => {
  try {
    const { items, deliveryDetails } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    // Transform cart items to Stripe line items
    const lineItems = items.map(item => {
      // Only include valid HTTP/HTTPS URLs for images
      const imageUrl = item.image && (item.image.startsWith('http://') || item.image.startsWith('https://')) 
        ? [item.image] 
        : [];

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: imageUrl,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      customer_email: deliveryDetails?.email,
      metadata: {
        userId: req.user.id,
        deliveryDetails: JSON.stringify(deliveryDetails)
      }
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating payment session',
      error: error.message 
    });
  }
});

// Verify payment session
router.get('/verify-session/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      success: true,
      session: {
        id: session.id,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total / 100,
      }
    });
  } catch (error) {
    console.error('Verify session error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying payment session' 
    });
  }
});

export default router;
