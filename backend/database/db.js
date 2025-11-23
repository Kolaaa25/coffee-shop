import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { menuItems } from '../data/menu.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create database
const db = new Database(join(__dirname, 'coffee-shop.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
const createTables = () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_intent_id TEXT,
      shipping_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Order items table (optional, for better normalization)
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      product_price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )
  `);

  // Menu items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      popular INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Database tables created successfully');
};

// Seed menu items if table is empty
const seedMenuItems = () => {
  const count = db.prepare('SELECT COUNT(*) as count FROM menu_items').get();
  
  if (count.count === 0) {
    console.log('📦 Seeding menu items...');
    const stmt = db.prepare(`
      INSERT INTO menu_items (name, description, price, category, image, popular)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((items) => {
      for (const item of items) {
        stmt.run(
          item.name,
          item.description,
          item.price,
          item.category,
          item.image,
          item.popular ? 1 : 0
        );
      }
    });
    
    insertMany(menuItems);
    console.log(`✅ Seeded ${menuItems.length} menu items`);
  }
};

// Initialize database
createTables();
seedMenuItems();

// User operations
export const userDB = {
  create: (name, email, hashedPassword) => {
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    return stmt.run(name, email, hashedPassword);
  },

  findByEmail: (email) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?');
    return stmt.get(id);
  },

  getAll: () => {
    const stmt = db.prepare('SELECT id, name, email, created_at FROM users');
    return stmt.all();
  }
};

// Order operations
export const orderDB = {
  create: (userId, userName, userEmail, items, total, paymentIntentId = null, shippingAddress = null) => {
    const stmt = db.prepare(`
      INSERT INTO orders (user_id, user_name, user_email, items, total, payment_intent_id, shipping_address)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(userId, userName, userEmail, JSON.stringify(items), total, paymentIntentId, shippingAddress);
    
    // Also insert order items
    const itemStmt = db.prepare('INSERT INTO order_items (order_id, product_name, product_price, quantity) VALUES (?, ?, ?, ?)');
    const insertMany = db.transaction((orderId, orderItems) => {
      for (const item of orderItems) {
        itemStmt.run(orderId, item.name, item.price, item.quantity);
      }
    });
    insertMany(result.lastInsertRowid, items);
    
    return result;
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT * FROM orders WHERE id = ?');
    const order = stmt.get(id);
    if (order) {
      order.items = JSON.parse(order.items);
    }
    return order;
  },

  findByUserId: (userId) => {
    const stmt = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC');
    const orders = stmt.all(userId);
    return orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));
  },

  updateStatus: (id, status) => {
    const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    return stmt.run(status, id);
  },

  getAll: () => {
    const stmt = db.prepare('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = stmt.all();
    return orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));
  }
};

export default db;
