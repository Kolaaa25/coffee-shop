import db from '../database/db.js';
import bcrypt from 'bcryptjs';

const initializeProductionData = () => {
  console.log('🚀 Initializing production data...');

  // Check if data already exists
  const existingUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
  const existingOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get();

  if (existingUsers.count > 0 || existingOrders.count > 0) {
    console.log(`📊 Data already exists: ${existingUsers.count} users, ${existingOrders.count} orders`);
    return;
  }

  console.log('🌱 Seeding initial data...');

  // Create admin user
  const adminPassword = bcrypt.hashSync('admin123', 10);
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (name, email, password, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `);

  insertUser.run('Admin User', 'admin@coffeehouse.com', adminPassword);

  // Create sample customers
  const customers = [
    { name: 'John Smith', email: 'john.smith@email.com', password: 'password123' },
    { name: 'Emily Johnson', email: 'emily.j@email.com', password: 'password123' },
    { name: 'Michael Brown', email: 'michael.b@email.com', password: 'password123' },
    { name: 'Sarah Davis', email: 'sarah.davis@email.com', password: 'password123' },
    { name: 'David Wilson', email: 'david.w@email.com', password: 'password123' }
  ];

  customers.forEach(customer => {
    const hashedPassword = bcrypt.hashSync(customer.password, 10);
    insertUser.run(customer.name, customer.email, hashedPassword);
  });

  // Create sample orders
  const menuItems = [
    { name: 'Espresso', price: 3.99 },
    { name: 'Cappuccino', price: 4.99 },
    { name: 'Latte', price: 4.99 },
    { name: 'Americano', price: 3.49 },
    { name: 'Mocha', price: 5.49 },
    { name: 'Croissant', price: 3.49 },
    { name: 'Blueberry Muffin', price: 3.99 },
    { name: 'Chocolate Brownie', price: 4.99 }
  ];

  const statuses = ['completed', 'delivered', 'ready', 'processing', 'confirmed'];

  const insertOrder = db.prepare(`
    INSERT INTO orders (user_id, user_name, user_email, items, total, status, payment_intent_id, shipping_address, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Create 10 sample orders
  for (let i = 0; i < 10; i++) {
    const customer = customers[i % customers.length];
    const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
    const orderItems = [];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const item = menuItems[Math.floor(Math.random() * menuItems.length)];
      const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity
      orderItems.push({
        name: item.name,
        price: item.price,
        quantity: quantity
      });
      total += item.price * quantity;
    }

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentId = `pi_demo_${Math.random().toString(36).substring(7)}`;

    // Random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    createdAt.setHours(hours, minutes, 0);

    const address = {
      street: '123 Coffee Street',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    };

    insertOrder.run(
      null,
      customer.name,
      customer.email,
      JSON.stringify(orderItems),
      total,
      status,
      paymentId,
      JSON.stringify(address),
      createdAt.toISOString().replace('T', ' ').substring(0, 19)
    );
  }

  console.log('✅ Production data initialized successfully!');
  console.log(`👥 Created ${customers.length + 1} users (including admin)`);
  console.log('📦 Created 10 sample orders');
};

// Only run if this script is executed directly
if (process.argv[1].includes('initProduction.js')) {
  initializeProductionData();
}

export default initializeProductionData;
