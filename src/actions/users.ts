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

export async function signUpUser(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (!email || !password || !name) {
      return { success: false, error: 'All fields are required' };
    }

    const { prisma } = await import('@/lib/prisma');
    const bcrypt = await import('bcryptjs');

    const existingUser = await (prisma as any).user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await (prisma as any).user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER'
      }
    });

    return { success: true, data: { id: newUser.id, name: newUser.name, email: newUser.email } };
  } catch (error: any) {
    console.error('Failed to sign up user:', error);
    return { success: false, error: error.message || 'Failed to sign up user' };
  }
}
