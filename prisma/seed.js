require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const dbUrl = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const defaultCategories = [
  { name: 'Cars', icon: '🚗' },
  { name: 'Property', icon: '🏠' },
  { name: 'Mobiles', icon: '📱' },
  { name: 'Electronics', icon: '📺' },
  { name: 'Bikes', icon: '🏍️' },
  { name: 'Services', icon: '🛠️' },
  { name: 'Jobs', icon: '💼' },
  { name: 'Furniture', icon: '🛋️' },
  { name: 'Fashion', icon: '👕' }
];

async function main() {
  console.log('Seeding database...');

  // 1. Seed Categories
  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: { icon: cat.icon },
      create: { name: cat.name, icon: cat.icon }
    });
  }
  console.log('Categories seeded.');

  // 2. Seed Super Admin
  const email = 'admin@marketplace.com';
  const hashedPassword = await bcrypt.hash('SuperAdmin2026!', 10);

  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Super Admin',
      role: 'ADMIN',
      password: hashedPassword
    },
    create: {
      email,
      name: 'Super Admin',
      role: 'ADMIN',
      password: hashedPassword
    }
  });

  console.log('Super Admin user seeded:', adminUser.email);
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
