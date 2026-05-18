'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getUserProfile(userId: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        listings: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
        },
        reviews: true,
      },
    });

    if (!user) return { success: false, error: 'User not found' };
    return { success: true, data: user };
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return { success: false, error: 'Failed to fetch user profile' };
  }
}

export async function updateUserProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const name = formData.get('name') as string;
    const { prisma } = await import('@/lib/prisma');
    const updatedUser = await (prisma as any).user.update({
      where: { id: (session.user as any).id },
      data: { name },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}
