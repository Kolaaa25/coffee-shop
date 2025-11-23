import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createOrder, getOrdersByUserId } from '../models/orders.js';
import { sendOrderConfirmation } from '../utils/email.js';
import db from '../database/db.js';

const router = express.Router();

// Create new order (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('🔍 CREATE ORDER REQUEST:');
    console.log('User:', req.user);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const { items, totalAmount, deliveryDetails, paymentIntentId } = req.body;

    // Validation
    if (!items || items.length === 0) {
      console.log('❌ Validation failed: No items');
      return res.status(400).json({ 
        success: false, 
        message: 'Order must contain at least one item' 
      });
    }

    if (!deliveryDetails || !deliveryDetails.fullName || !deliveryDetails.email) {
      console.log('❌ Validation failed: Missing delivery details');
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide delivery details' 
      });
    }

    // Create order with full details
    const order = createOrder({
      userId: req.user.id,
      userName: req.user.name || deliveryDetails.fullName,
      userEmail: req.user.email || deliveryDetails.email,
      items,
      total: totalAmount,
      shippingAddress: deliveryDetails,
      paymentIntentId,
      status: paymentIntentId ? 'paid' : 'pending'
    });

    console.log('✅ Order created in database:', {
      orderId: order.id,
      userId: req.user.id,
      email: deliveryDetails.email,
      total: totalAmount,
      itemsCount: items.length
    });

    // Send response immediately
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order
    });

    // Send order confirmation email asynchronously (don't wait for it)
    console.log('📧 Attempting to send email to:', deliveryDetails.email);
    sendOrderConfirmation({
      email: deliveryDetails.email,
      name: deliveryDetails.fullName,
      orderNumber: order.id,
      items: items,
      totalAmount: totalAmount,
      deliveryAddress: deliveryDetails.address
    }).then((result) => {
      console.log('✅ Order confirmation email sent:', result);
    }).catch((emailError) => {
      console.error('❌ Email send error:', emailError.message);
      console.error('Email error details:', emailError);
    });
  } catch (error) {
    console.error('❌ CREATE ORDER ERROR:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating order: ' + error.message 
    });
  }
});

// Get user's orders (protected)
router.get('/my-orders', authenticateToken, (req, res) => {
  try {
    const orders = getOrdersByUserId(req.user.id);

    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching orders' 
    });
  }
});

// Get all orders (for admin)
router.get('/', (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT 
        id, 
        user_id, 
        user_name, 
        user_email,
        items,
        total, 
        status,
        payment_intent_id,
        shipping_address,
        created_at 
      FROM orders 
      ORDER BY created_at DESC
    `).all();
    
    // Parse JSON fields
    const parsedOrders = orders.map(order => ({
      ...order,
      items: order.items ? JSON.parse(order.items) : [],
      shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null,
      customer_name: order.user_name
    }));
    
    res.json(parsedOrders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching orders' 
    });
  }
});

// Get single order details (for admin)
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const order = db.prepare(`
      SELECT * FROM orders WHERE id = ?
    `).get(id);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    // Parse JSON fields
    const parsedOrder = {
      ...order,
      items: order.items ? JSON.parse(order.items) : [],
      shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null
    };
    
    res.json(parsedOrder);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching order' 
    });
  }
});

// Update order status (for admin)
router.put('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'paid', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }
    
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    
    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating order status' 
    });
  }
});

export default router;
