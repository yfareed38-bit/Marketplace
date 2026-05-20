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
    
    // Read Cloudinary image URLs sent from form
    const images = formData.getAll('images') as string[];
    const imagesToSave = images.length > 0 ? images : ['/placeholder-image.jpg'];

    const { prisma } = await import('@/lib/prisma');
    const newListing = await (prisma as any).listing.create({
      data: {
        title, description, price, category,
        condition, location, images: imagesToSave,
        sellerId: (session.user as any).id,
      },
    });

    return { success: true, data: newListing };
  } catch (error) {
    console.error('Failed to create listing:', error);
    return { success: false, error: 'Failed to create listing' };
  }
}

export async function getListingById(id: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const listing = await (prisma as any).listing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            role: true,
            _count: { select: { listings: true } },
          }
        }
      }
    });
    
    if (!listing) return { success: false, error: 'Listing not found' };
    return { success: true, data: listing };
  } catch (error) {
    console.error('Failed to fetch listing:', error);
    return { success: false, error: 'Failed to fetch listing' };
  }
}

export async function getDynamicCategories() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const categories = await (prisma as any).category.findMany({
      orderBy: { name: 'asc' }
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return { success: false, error: 'Failed to fetch categories', data: [] };
  }
}

export async function createReview(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const rating = parseInt(formData.get('rating') as string);
    const comment = formData.get('comment') as string;
    const revieweeId = formData.get('revieweeId') as string;

    const { prisma } = await import('@/lib/prisma');
    const review = await (prisma as any).review.create({
      data: {
        rating,
        comment,
        reviewerId: (session.user as any).id,
        revieweeId
      }
    });

    return { success: true, data: review };
  } catch (error) {
    console.error('Failed to create review:', error);
    return { success: false, error: 'Failed to create review' };
  }
}

export async function getReviewsByUserId(userId: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const reviews = await (prisma as any).review.findMany({
      where: { revieweeId: userId },
      include: {
        reviewer: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: reviews };
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return { success: false, error: 'Failed to fetch reviews', data: [] };
  }
}
