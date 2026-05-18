import React from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>User Portal</h3>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>
            <span>📊</span> Overview
          </Link>
          <Link href="/dashboard/listings" className={styles.navItem}>
            <span>📝</span> My Listings
          </Link>
          <Link href="/dashboard/messages" className={styles.navItem}>
            <span>💬</span> Messages
          </Link>
          <Link href="/dashboard/favorites" className={styles.navItem}>
            <span>❤️</span> Favorites
          </Link>
          <Link href="/dashboard/notifications" className={styles.navItem}>
            <span>🔔</span> Notifications
          </Link>
          <Link href="/dashboard/settings" className={styles.navItem}>
            <span>⚙️</span> Settings
          </Link>
          <Link href="/dashboard/billing" className={styles.navItem}>
            <span>💳</span> Billing
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
