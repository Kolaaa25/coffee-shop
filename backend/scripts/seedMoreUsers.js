import db from '../database/db.js';
import bcrypt from 'bcryptjs';

const seedMoreUsers = () => {
  console.log('🌱 Seeding more users...');

  const users = [
    { name: 'Alex Rodriguez', email: 'alex.rodriguez@email.com', password: 'password123' },
    { name: 'Maria Gonzalez', email: 'maria.gonzalez@email.com', password: 'password123' },
    { name: 'Robert Chen', email: 'robert.chen@email.com', password: 'password123' },
    { name: 'Lisa Thompson', email: 'lisa.thompson@email.com', password: 'password123' },
    { name: 'Kevin Park', email: 'kevin.park@email.com', password: 'password123' },
    { name: 'Rachel Kim', email: 'rachel.kim@email.com', password: 'password123' },
    { name: 'Daniel Wright', email: 'daniel.wright@email.com', password: 'password123' },
    { name: 'Sophie Miller', email: 'sophie.miller@email.com', password: 'password123' },
    { name: 'James Lee', email: 'james.lee@email.com', password: 'password123' },
    { name: 'Emma Clark', email: 'emma.clark@email.com', password: 'password123' },
    { name: 'Ryan Murphy', email: 'ryan.murphy@email.com', password: 'password123' },
    { name: 'Isabella Lopez', email: 'isabella.lopez@email.com', password: 'password123' },
    { name: 'Tyler Johnson', email: 'tyler.johnson@email.com', password: 'password123' },
    { name: 'Zoe Williams', email: 'zoe.williams@email.com', password: 'password123' },
    { name: 'Brandon Davis', email: 'brandon.davis@email.com', password: 'password123' },
    { name: 'Chloe Anderson', email: 'chloe.anderson@email.com', password: 'password123' },
    { name: 'Lucas Garcia', email: 'lucas.garcia@email.com', password: 'password123' },
    { name: 'Olivia Brown', email: 'olivia.brown@email.com', password: 'password123' },
    { name: 'Nathan Wilson', email: 'nathan.wilson@email.com', password: 'password123' },
    { name: 'Grace Taylor', email: 'grace.taylor@email.com', password: 'password123' }
  ];

  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (name, email, password, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `);

  users.forEach(user => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    insertUser.run(user.name, user.email, hashedPassword);
    console.log(`✅ User created: ${user.name}`);
  });

  console.log(`🎉 Successfully seeded ${users.length} additional users!`);
};

seedMoreUsers();
