import React from 'react';
import { getDashboardStats } from '@/actions/dashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  const statsRes = await getDashboardStats();
  const stats = statsRes.success && statsRes.data ? statsRes.data : {
    activeListings: 0,
    soldListings: 0,
    totalMessages: 0,
    totalViews: 0
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Welcome back, {session.user.name || 'User'}! Here's what's happening with your listings.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Active Listings</span>
            <h3>{stats.activeListings}</h3>
          </div>
          <div className={styles.statIcon}>📝</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Total Views</span>
            <h3>{stats.totalViews.toLocaleString()}</h3>
          </div>
          <div className={styles.statIcon}>👁️</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Messages</span>
            <h3>{stats.totalMessages}</h3>
          </div>
          <div className={styles.statIcon}>💬</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Sold Items</span>
            <h3>{stats.soldListings}</h3>
          </div>
          <div className={styles.statIcon}>✅</div>
        </div>
      </div>

      <section className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2>Recent Activity</h2>
          <button className={styles.viewBtn}>View All</button>
        </div>
        
        <div className={styles.activityList}>
          {stats.totalMessages > 0 ? (
            <div className={styles.activityItem}>
              <div className={styles.activityAvatar}>💬</div>
              <div className={styles.activityContent}>
                <p><strong>You have {stats.totalMessages} messages</strong> waiting in your inbox.</p>
                <span>Check your Messages tab</span>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--muted-foreground)', padding: '1rem' }}>No recent activity to show.</p>
          )}
        </div>
      </section>
    </div>
  );
}
