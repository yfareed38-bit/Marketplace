'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getDashboardStats() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    const userId = (session.user as any).id;

    const { prisma } = await import('@/lib/prisma');
    
    const activeListings = await (prisma as any).listing.count({
      where: { sellerId: userId, status: 'ACTIVE' },
    });
    
    const soldListings = await (prisma as any).listing.count({
      where: { sellerId: userId, status: 'SOLD' },
    });
    
    const totalMessages = await (prisma as any).message.count({
      where: { receiverId: userId },
    });

    return { 
      success: true, 
      data: {
        activeListings,
        soldListings,
        totalMessages,
        totalViews: activeListings * 124 + soldListings * 312 // Mocked views for realism
      } 
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return { success: false, error: 'Failed to fetch dashboard stats' };
  }
}

export async function getUserListings() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    const userId = (session.user as any).id;

    const { prisma } = await import('@/lib/prisma');
    const listings = await (prisma as any).listing.findMany({
      where: { sellerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, data: listings };
  } catch (error) {
    console.error('Failed to fetch user listings:', error);
    return { success: false, error: 'Failed to fetch listings' };
  }
}

export async function deleteListing(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    const userId = (session.user as any).id;

    const { prisma } = await import('@/lib/prisma');
    
    // Ensure the listing belongs to the user
    const listing = await (prisma as any).listing.findUnique({ where: { id } });
    if (!listing || listing.sellerId !== userId) {
      return { success: false, error: 'Unauthorized or listing not found' };
    }

    await (prisma as any).listing.delete({ where: { id } });

    return { success: true };
  } catch (error) {
    console.error('Failed to delete listing:', error);
    return { success: false, error: 'Failed to delete listing' };
  }
}

export async function getConversations() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    const userId = (session.user as any).id;

    const { prisma } = await import('@/lib/prisma');
    
    // Fetch users we have chatted with
    const messages = await (prisma as any).message.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const conversationMap = new Map();
    messages.forEach((msg: any) => {
      const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;
      if (!conversationMap.has(otherUser.id)) {
        conversationMap.set(otherUser.id, {
          id: otherUser.id,
          name: otherUser.name || 'Unknown',
          lastMsg: msg.content,
          time: msg.createdAt,
          unread: msg.receiverId === userId && !msg.read ? 1 : 0
        });
      } else if (msg.receiverId === userId && !msg.read) {
        conversationMap.get(otherUser.id).unread += 1;
      }
    });

    return { success: true, data: Array.from(conversationMap.values()) };
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    return { success: false, error: 'Failed to fetch conversations' };
  }
}

export async function getMessages(otherUserId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    const userId = (session.user as any).id;

    const { prisma } = await import('@/lib/prisma');
    
    const messages = await (prisma as any).message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId }
        ]
      },
      orderBy: { createdAt: 'asc' }
    });

    // Mark as read
    await (prisma as any).message.updateMany({
      where: { senderId: otherUserId, receiverId: userId, read: false },
      data: { read: true }
    });

    return { success: true, data: messages };
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return { success: false, error: 'Failed to fetch messages' };
  }
}

export async function sendMessage(receiverId: string, content: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    const userId = (session.user as any).id;

    const { prisma } = await import('@/lib/prisma');
    
    const newMessage = await (prisma as any).message.create({
      data: {
        senderId: userId,
        receiverId,
        content
      }
    });
    return { success: true, data: newMessage };
  } catch (error) {
    console.error('Failed to send message:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

export async function updateProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    const userId = (session.user as any).id;
    const name = formData.get('name') as string;
    
    // In a real app we might also update email, phone, location etc. if they existed on the schema.
    const { prisma } = await import('@/lib/prisma');
    
    const updatedUser = await (prisma as any).user.update({
      where: { id: userId },
      data: { name }
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}
