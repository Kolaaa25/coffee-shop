import express from 'express';
import db from '../database/db.js';

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // Use SQLite's local date to avoid timezone mismatches
    const todayOrders = db.prepare(`
      SELECT COUNT(*) as count, SUM(total) as total
      FROM orders
      WHERE DATE(created_at) = DATE('now','localtime')
    `).get();

    // Get total revenue (all time)
    const totalRevenue = db.prepare(`
      SELECT SUM(total) as total FROM orders
    `).get();

    // Get total customers
    const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM users').get();

    // Get total orders
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get();

    res.json({
      todaySales: Number(todayOrders.total) || 0,
      todayOrders: Number(todayOrders.count) || 0,
      totalRevenue: Number(totalRevenue.total) || 0,
      totalCustomers: Number(totalCustomers.count) || 0,
      totalOrders: Number(totalOrders.count) || 0,
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
