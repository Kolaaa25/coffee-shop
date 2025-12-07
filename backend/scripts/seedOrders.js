import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, '../database/coffee-shop.db'));

// Fake customer names
const customers = [
  { name: 'John Smith', email: 'john.smith@email.com' },
  { name: 'Emily Johnson', email: 'emily.j@email.com' },
  { name: 'Michael Brown', email: 'michael.b@email.com' },
  { name: 'Sarah Davis', email: 'sarah.davis@email.com' },
  { name: 'David Wilson', email: 'david.w@email.com' },
  { name: 'Jessica Taylor', email: 'jessica.t@email.com' },
  { name: 'Christopher Anderson', email: 'chris.a@email.com' },
  { name: 'Ashley Martinez', email: 'ashley.m@email.com' },
  { name: 'Matthew Thomas', email: 'matt.t@email.com' },
  { name: 'Amanda Garcia', email: 'amanda.g@email.com' },
];

// Menu items for orders
const menuProducts = [
  { name: 'Espresso', price: 3.99 },
  { name: 'Cappuccino', price: 4.99 },
  { name: 'Latte', price: 4.99 },
  { name: 'Americano', price: 3.99 },
  { name: 'Mocha', price: 5.49 },
  { name: 'Cold Brew', price: 4.99 },
  { name: 'Flat White', price: 4.99 },
  { name: 'Macchiato', price: 4.49 },
  { name: 'Tiramisu', price: 6.99 },
  { name: 'Chocolate Brownie', price: 4.99 },
  { name: 'Cheesecake', price: 5.99 },
  { name: 'Croissant', price: 3.49 },
  { name: 'Cinnamon Roll', price: 4.49 },
  { name: 'Blueberry Muffin', price: 3.99 },
];

const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'completed'];

// Generate random order items
const generateOrderItems = () => {
  const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items
  const items = [];
  const usedProducts = new Set();

  for (let i = 0; i < numItems; i++) {
    let product;
    do {
      product = menuProducts[Math.floor(Math.random() * menuProducts.length)];
    } while (usedProducts.has(product.name));
    
    usedProducts.add(product.name);
    items.push({
      name: product.name,
      price: product.price,
      quantity: Math.floor(Math.random() * 3) + 1, // 1-3 quantity
    });
  }
  return items;
};

// Generate random date in the last 30 days
const generateRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);
  
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

// Addresses
const addresses = [
  { street: '123 Main Street', city: 'New York', state: 'NY', zip: '10001' },
  { street: '456 Oak Avenue', city: 'Los Angeles', state: 'CA', zip: '90001' },
  { street: '789 Maple Drive', city: 'Chicago', state: 'IL', zip: '60601' },
  { street: '321 Pine Road', city: 'Houston', state: 'TX', zip: '77001' },
  { street: '654 Elm Street', city: 'Phoenix', state: 'AZ', zip: '85001' },
  { street: '987 Cedar Lane', city: 'Philadelphia', state: 'PA', zip: '19101' },
  { street: '147 Birch Court', city: 'San Antonio', state: 'TX', zip: '78201' },
  { street: '258 Willow Way', city: 'San Diego', state: 'CA', zip: '92101' },
  { street: '369 Spruce Ave', city: 'Dallas', state: 'TX', zip: '75201' },
  { street: '741 Ash Boulevard', city: 'San Jose', state: 'CA', zip: '95101' },
];

// Seed orders
const seedOrders = () => {
  console.log('🌱 Seeding fake orders...');

  const stmt = db.prepare(`
    INSERT INTO orders (user_id, user_name, user_email, items, total, status, payment_intent_id, shipping_address, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const itemStmt = db.prepare('INSERT INTO order_items (order_id, product_name, product_price, quantity) VALUES (?, ?, ?, ?)');

  const insertOrder = db.transaction((customer, items, status, address, createdAt) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const paymentIntentId = `pi_demo_${Math.random().toString(36).substring(2, 15)}`;
    
    const result = stmt.run(
      null, // user_id (null for demo orders)
      customer.name,
      customer.email,
      JSON.stringify(items),
      total,
      status,
      paymentIntentId,
      JSON.stringify(address),
      createdAt
    );

    // Insert order items
    for (const item of items) {
      itemStmt.run(result.lastInsertRowid, item.name, item.price, item.quantity);
    }

    return result.lastInsertRowid;
  });

  // Generate 10 fake orders
  const orders = [];
  for (let i = 0; i < 10; i++) {
    const customer = customers[i % customers.length];
    const items = generateOrderItems();
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const address = addresses[i % addresses.length];
    const createdAt = generateRandomDate();

    const orderId = insertOrder(customer, items, status, address, createdAt);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orders.push({
      id: orderId,
      customer: customer.name,
      items: items.length,
      total: total.toFixed(2),
      status,
      date: createdAt
    });
  }

  console.log('✅ Created 10 fake orders:');
  console.table(orders);
};

// Run seeding
seedOrders();

console.log('\n🎉 Fake orders seeded successfully!');
process.exit(0);
