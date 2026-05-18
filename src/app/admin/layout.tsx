import React from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Admin Control</h3>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navItem}>
            <span>📉</span> Analytics
          </Link>
          <Link href="/admin/moderation" className={styles.navItem}>
            <span>🛡️</span> Moderation
          </Link>
          <Link href="/admin/users" className={styles.navItem}>
            <span>👥</span> Users
          </Link>
          <Link href="/admin/payments" className={styles.navItem}>
            <span>💰</span> Payments
          </Link>
          <Link href="/admin/settings" className={styles.navItem}>
            <span>⚙️</span> System
          </Link>
        </nav>
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
