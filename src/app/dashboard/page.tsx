import React from 'react';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Welcome back, John! Here's what's happening with your listings.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Active Listings</span>
            <h3>12</h3>
          </div>
          <div className={styles.statIcon}>📝</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Total Views</span>
            <h3>1,482</h3>
          </div>
          <div className={styles.statIcon}>👁️</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Messages</span>
            <h3>8</h3>
          </div>
          <div className={styles.statIcon}>💬</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span>Sold Items</span>
            <h3>5</h3>
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
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.activityItem}>
              <div className={styles.activityAvatar}>🛒</div>
              <div className={styles.activityContent}>
                <p><strong>New message</strong> from Sarah about "iPhone 15 Pro Max"</p>
                <span>20 minutes ago</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
