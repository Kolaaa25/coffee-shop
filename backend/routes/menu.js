import express from 'express';
import { menuItems } from '../data/menu.js';
import db from '../database/db.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = 'SELECT * FROM menu_items';
    let params = [];
    
    // Filter by category if provided
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY id';
    
    const stmt = db.prepare(query);
    const items = stmt.all(...params);

    res.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching menu items' 
    });
  }
});

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('SELECT * FROM menu_items WHERE id = ?');
    const item = stmt.get(id);

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Menu item not found' 
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching menu item' 
    });
  }
});

// Get popular items
router.get('/featured/popular', async (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM menu_items WHERE popular = 1 ORDER BY id');
    const popularItems = stmt.all();

    res.json({
      success: true,
      data: popularItems,
      count: popularItems.length
    });
  } catch (error) {
    console.error('Get popular items error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching popular items' 
    });
  }
});

// Create new menu item (ADMIN)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    
    const stmt = db.prepare(
      'INSERT INTO menu_items (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(name, description, price, category, image || '/default-item.jpg');

    res.status(201).json({
      success: true,
      data: {
        id: result.lastInsertRowid,
        name,
        description,
        price,
        category,
        image: image || '/default-item.jpg'
      },
      message: 'Menu item created successfully'
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating menu item' 
    });
  }
});

// Update menu item (ADMIN)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image } = req.body;
    
    const stmt = db.prepare(
      'UPDATE menu_items SET name = ?, description = ?, price = ?, category = ?, image = ? WHERE id = ?'
    );
    stmt.run(name, description, price, category, image, id);

    res.json({
      success: true,
      data: {
        id: parseInt(id),
        name,
        description,
        price,
        category,
        image
      },
      message: 'Menu item updated successfully'
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating menu item' 
    });
  }
});

// Delete menu item (ADMIN)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('DELETE FROM menu_items WHERE id = ?');
    stmt.run(id);

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting menu item' 
    });
  }
});

export default router;
