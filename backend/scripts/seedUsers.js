import db from '../database/db.js';
import bcrypt from 'bcryptjs';

const seedUsers = () => {
  console.log('🌱 Seeding users...');

  const users = [
    {
      name: 'John Smith',
      email: 'john.smith@email.com',
      password: 'password123'
    },
    {
      name: 'Emily Johnson', 
      email: 'emily.j@email.com',
      password: 'password123'
    },
    {
      name: 'Michael Brown',
      email: 'michael.b@email.com', 
      password: 'password123'
    },
    {
      name: 'Sarah Davis',
      email: 'sarah.davis@email.com',
      password: 'password123'
    },
    {
      name: 'David Wilson',
      email: 'david.w@email.com',
      password: 'password123'
    },
    {
      name: 'Jessica Taylor',
      email: 'jessica.t@email.com',
      password: 'password123'
    },
    {
      name: 'Christopher Anderson',
      email: 'chris.a@email.com',
      password: 'password123'
    },
    {
      name: 'Amanda Garcia',
      email: 'amanda.g@email.com',
      password: 'password123'
    },
    {
      name: 'Matthew Thomas',
      email: 'matt.t@email.com',
      password: 'password123'
    },
    {
      name: 'Ashley Martinez',
      email: 'ashley.m@email.com',
      password: 'password123'
    }
  ];

  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (name, email, password, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `);

  users.forEach(user => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    insertUser.run(user.name, user.email, hashedPassword);
    console.log(`✅ User created: ${user.name} (${user.email})`);
  });

  console.log(`🎉 Successfully seeded ${users.length} users!`);
};

seedUsers();
