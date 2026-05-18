'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getListings(category?: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const whereClause = category ? { category } : {};
    const listings = await (prisma as any).listing.findMany({
      where: { ...whereClause, status: 'ACTIVE' },
      include: {
        seller: { select: { name: true, image: true, createdAt: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: listings };
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return { success: false, error: 'Failed to fetch listings', data: [] };
  }
}

export async function createListing(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const condition = formData.get('condition') as string;
    const location = formData.get('location') as string;
    const images = ['/placeholder-image.jpg'];

    const { prisma } = await import('@/lib/prisma');
    const newListing = await (prisma as any).listing.create({
      data: {
        title, description, price, category,
        condition, location, images,
        sellerId: (session.user as any).id,
      },
    });

    return { success: true, data: newListing };
  } catch (error) {
    console.error('Failed to create listing:', error);
    return { success: false, error: 'Failed to create listing' };
  }
}
