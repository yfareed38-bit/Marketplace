import React from 'react';
import styles from './page.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Admin Analytics</h1>
        <p>Real-time overview of your marketplace performance.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span>Total Revenue</span>
          <h3>$45,280.00</h3>
          <p className={styles.trendUp}>+12.5% vs last month</p>
        </div>
        <div className={styles.statCard}>
          <span>Active Users</span>
          <h3>12,482</h3>
          <p className={styles.trendUp}>+5.2% vs last month</p>
        </div>
        <div className={styles.statCard}>
          <span>New Ads Today</span>
          <h3>156</h3>
          <p className={styles.trendDown}>-2.4% vs yesterday</p>
        </div>
        <div className={styles.statCard}>
          <span>Reports Pending</span>
          <h3>14</h3>
          <p style={{ color: '#ef4444' }}>High Priority</p>
        </div>
      </div>

      <div className={styles.tablesGrid}>
        <section className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>Recent Moderation Queue</h2>
            <button className={styles.actionBtn}>View All</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ad Title</th>
                <th>Seller</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>iPhone 15 Pro Max</td>
                <td>John Doe</td>
                <td>Mobiles</td>
                <td><span className={styles.statusPending}>Pending</span></td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                </td>
              </tr>
              <tr>
                <td>BMW M4 2023</td>
                <td>Sarah Smith</td>
                <td>Cars</td>
                <td><span className={styles.statusPending}>Pending</span></td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
