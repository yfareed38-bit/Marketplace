import { PrismaClient } from '@prisma/client';

// Support both uppercase (standard) and lowercase (Vercel UI quirk) env var names
const dbUrl =
  process.env.DATABASE_URL ||
  process.env.database_url;

// Global singleton – avoids exhausting DB connections during Next.js hot‑reloads
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
  if (!dbUrl) {
    throw new Error(
      'No database URL found. Set DATABASE_URL in your .env file or Vercel Environment Variables.'
    );
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
