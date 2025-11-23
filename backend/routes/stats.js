import express from 'express';
import db from '../database/db.js';

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's orders
    const todayOrders = db.prepare(`
      SELECT COUNT(*) as count, SUM(total) as total 
      FROM orders 
      WHERE DATE(created_at) = ?
    `).get(today);
    
    // Get total revenue (all time)
    const totalRevenue = db.prepare(`
      SELECT SUM(total) as total FROM orders
    `).get();
    
    // Get total customers
    const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM users').get();
    
    // Get total orders
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get();
    
    res.json({
      todaySales: todayOrders.total || 0,
      todayOrders: todayOrders.count || 0,
      totalRevenue: totalRevenue.total || 0,
      totalCustomers: totalCustomers.count || 0,
      totalOrders: totalOrders.count || 0,
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
