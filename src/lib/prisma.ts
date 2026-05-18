import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Global variable to keep a single instance across hot‑reloads
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    // Throw a clear error when DB URL is missing – caught by Next.js error overlay locally
    throw new Error('DATABASE_URL is not set. Configure it in .env or Vercel environment variables.');
  }
  // Prisma v7 requires the accelerate extension; datasourceUrl is read from env automatically
  // Explicitly pass the URL to avoid ambiguous env loading in Vercel
  return (new PrismaClient({ datasourceUrl: url }) as any).$extends(withAccelerate());
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
