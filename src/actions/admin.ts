'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Helper function to verify admin access
async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin access required');
  }
}

export async function getAdminStats() {
  try {
    await verifyAdmin();
    const { prisma } = await import('@/lib/prisma');
    
    const totalUsers = await (prisma as any).user.count();
    const newAdsToday = await (prisma as any).listing.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        }
      }
    });
    
    const reportsPending = await (prisma as any).listing.count({
      where: { status: 'PENDING' }
    });

    return { 
      success: true, 
      data: {
        totalRevenue: 45280.00, // Mocked for this phase as per discussion
        totalUsers,
        newAdsToday,
        reportsPending,
      } 
    };
  } catch (error: any) {
    console.error('Failed to fetch admin stats:', error);
    return { success: false, error: error.message || 'Failed to fetch admin stats' };
  }
}

export async function getPendingListings() {
  try {
    await verifyAdmin();
    const { prisma } = await import('@/lib/prisma');
    
    const listings = await (prisma as any).listing.findMany({
      where: { status: 'PENDING' },
      include: {
        seller: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return { success: true, data: listings };
  } catch (error: any) {
    console.error('Failed to fetch pending listings:', error);
    return { success: false, error: error.message || 'Failed to fetch pending listings' };
  }
}

export async function approveListing(id: string) {
  try {
    await verifyAdmin();
    const { prisma } = await import('@/lib/prisma');
    
    await (prisma as any).listing.update({
      where: { id },
      data: { status: 'ACTIVE' }
    });

    return { success: true };
  } catch (error: any) {
    console.error('Failed to approve listing:', error);
    return { success: false, error: error.message || 'Failed to approve listing' };
  }
}

export async function getAllUsers() {
  try {
    await verifyAdmin();
    const { prisma } = await import('@/lib/prisma');
    
    const users = await (prisma as any).user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { listings: true }
        }
      }
    });

    return { success: true, data: users };
  } catch (error: any) {
    console.error('Failed to fetch users:', error);
    return { success: false, error: error.message || 'Failed to fetch users' };
  }
}

export async function rejectListing(id: string) {
  try {
    await verifyAdmin();
    const { prisma } = await import('@/lib/prisma');
    
    // We can either delete it or set status to REJECTED.
    // Given the schema doesn't have REJECTED explicitly defined as standard, we will delete it.
    await (prisma as any).listing.delete({
      where: { id }
    });

    return { success: true };
  } catch (error: any) {
    console.error('Failed to reject listing:', error);
    return { success: false, error: error.message || 'Failed to reject listing' };
  }
}

export async function getSoldListings() {
  try {
    await verifyAdmin();
    const { prisma } = await import('@/lib/prisma');
    
    const listings = await (prisma as any).listing.findMany({
      where: { status: 'SOLD' },
      include: {
        seller: { select: { name: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return { success: true, data: listings };
  } catch (error: any) {
    console.error('Failed to fetch sold listings:', error);
    return { success: false, error: error.message || 'Failed to fetch sold listings' };
  }
}
