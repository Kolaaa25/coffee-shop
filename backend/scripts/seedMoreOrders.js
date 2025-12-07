import db from '../database/db.js';

const seedMoreOrders = () => {
  console.log('🌱 Seeding more orders...');

  const menuItems = [
    { name: 'Espresso', price: 3.99 },
    { name: 'Cappuccino', price: 4.99 },
    { name: 'Latte', price: 4.99 },
    { name: 'Americano', price: 3.49 },
    { name: 'Mocha', price: 5.49 },
    { name: 'Macchiato', price: 4.49 },
    { name: 'Flat White', price: 4.79 },
    { name: 'Cold Brew', price: 4.99 },
    { name: 'Croissant', price: 3.49 },
    { name: 'Blueberry Muffin', price: 3.99 },
    { name: 'Chocolate Brownie', price: 4.99 },
    { name: 'Cheesecake', price: 5.99 },
    { name: 'Tiramisu', price: 6.99 },
    { name: 'Cinnamon Roll', price: 4.49 }
  ];

  const customers = [
    { name: 'Alex Rodriguez', email: 'alex.rodriguez@email.com' },
    { name: 'Maria Gonzalez', email: 'maria.gonzalez@email.com' },
    { name: 'Robert Chen', email: 'robert.chen@email.com' },
    { name: 'Lisa Thompson', email: 'lisa.thompson@email.com' },
    { name: 'Kevin Park', email: 'kevin.park@email.com' },
    { name: 'Rachel Kim', email: 'rachel.kim@email.com' },
    { name: 'Daniel Wright', email: 'daniel.wright@email.com' },
    { name: 'Sophie Miller', email: 'sophie.miller@email.com' },
    { name: 'James Lee', email: 'james.lee@email.com' },
    { name: 'Emma Clark', email: 'emma.clark@email.com' },
    { name: 'Ryan Murphy', email: 'ryan.murphy@email.com' },
    { name: 'Isabella Lopez', email: 'isabella.lopez@email.com' },
    { name: 'Tyler Johnson', email: 'tyler.johnson@email.com' },
    { name: 'Zoe Williams', email: 'zoe.williams@email.com' },
    { name: 'Brandon Davis', email: 'brandon.davis@email.com' },
    { name: 'Chloe Anderson', email: 'chloe.anderson@email.com' },
    { name: 'Lucas Garcia', email: 'lucas.garcia@email.com' },
    { name: 'Olivia Brown', email: 'olivia.brown@email.com' },
    { name: 'Nathan Wilson', email: 'nathan.wilson@email.com' },
    { name: 'Grace Taylor', email: 'grace.taylor@email.com' }
  ];

  const addresses = [
    { street: '123 Coffee Street', city: 'Seattle', state: 'WA', zip: '98101' },
    { street: '456 Bean Avenue', city: 'Portland', state: 'OR', zip: '97201' },
    { street: '789 Brew Boulevard', city: 'San Francisco', state: 'CA', zip: '94101' },
    { street: '321 Espresso Lane', city: 'Denver', state: 'CO', zip: '80201' },
    { street: '654 Latte Road', city: 'Austin', state: 'TX', zip: '73301' },
    { street: '987 Mocha Drive', city: 'Miami', state: 'FL', zip: '33101' },
    { street: '147 Cappuccino Court', city: 'Boston', state: 'MA', zip: '02101' },
    { street: '258 Americano Ave', city: 'Nashville', state: 'TN', zip: '37201' },
    { street: '369 Macchiato Way', city: 'Atlanta', state: 'GA', zip: '30301' },
    { street: '741 FlatWhite Blvd', city: 'Phoenix', state: 'AZ', zip: '85001' }
  ];

  const statuses = ['pending', 'paid', 'processing', 'completed', 'cancelled', 'ready', 'preparing', 'delivered', 'confirmed'];

  const insertOrder = db.prepare(`
    INSERT INTO orders (user_id, user_name, user_email, items, total, status, payment_intent_id, shipping_address, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 0; i < 20; i++) {
    const customer = customers[i];
    const itemCount = Math.floor(Math.random() * 4) + 1; // 1-4 items per order
    const orderItems = [];
    let total = 0;

    // Generate random items for this order
    for (let j = 0; j < itemCount; j++) {
      const item = menuItems[Math.floor(Math.random() * menuItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
      orderItems.push({
        name: item.name,
        price: item.price,
        quantity: quantity
      });
      total += item.price * quantity;
    }

    const address = addresses[Math.floor(Math.random() * addresses.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentId = `pi_demo_${Math.random().toString(36).substring(7)}`;

    // Random date within last 60 days
    const daysAgo = Math.floor(Math.random() * 60);
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    createdAt.setHours(hours, minutes, 0);

    const orderData = {
      user_id: null,
      user_name: customer.name,
      user_email: customer.email,
      items: JSON.stringify(orderItems),
      total: total,
      status: status,
      payment_intent_id: paymentId,
      shipping_address: JSON.stringify(address),
      created_at: createdAt.toISOString().replace('T', ' ').substring(0, 19)
    };

    insertOrder.run(
      orderData.user_id,
      orderData.user_name,
      orderData.user_email,
      orderData.items,
      orderData.total,
      orderData.status,
      orderData.payment_intent_id,
      orderData.shipping_address,
      orderData.created_at
    );

    console.log(`✅ Order created: ${customer.name} - $${total.toFixed(2)} (${status})`);
  }

  console.log('🎉 Successfully seeded 20 additional orders!');
};

seedMoreOrders();
