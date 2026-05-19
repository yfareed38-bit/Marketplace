import React from 'react';
import { getAdminStats, getPendingListings, approveListing } from '@/actions/admin';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const statsRes = await getAdminStats();
  const pendingRes = await getPendingListings();
  
  const stats = statsRes.success && statsRes.data ? statsRes.data : {
    totalRevenue: 0,
    totalUsers: 0,
    newAdsToday: 0,
    reportsPending: 0
  };
  
  const pendingListings = pendingRes.success && pendingRes.data ? pendingRes.data : [];

  async function handleApprove(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (id) {
      await approveListing(id);
      revalidatePath('/admin');
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Admin Analytics</h1>
        <p>Real-time overview of your marketplace performance.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span>Total Revenue</span>
          <h3>${stats.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          <p className={styles.trendUp}>+12.5% vs last month</p>
        </div>
        <div className={styles.statCard}>
          <span>Active Users</span>
          <h3>{stats.totalUsers.toLocaleString()}</h3>
          <p className={styles.trendUp}>+5.2% vs last month</p>
        </div>
        <div className={styles.statCard}>
          <span>New Ads Today</span>
          <h3>{stats.newAdsToday}</h3>
          <p className={styles.trendDown}>-2.4% vs yesterday</p>
        </div>
        <div className={styles.statCard}>
          <span>Reports Pending</span>
          <h3>{stats.reportsPending}</h3>
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
              {pendingListings.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>
                    No pending listings in the queue.
                  </td>
                </tr>
              ) : (
                pendingListings.map((ad: any) => (
                  <tr key={ad.id}>
                    <td>
                      <Link href={`/product/${ad.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500' }}>
                        {ad.title}
                      </Link>
                    </td>
                    <td>{ad.seller?.name || 'Unknown'}</td>
                    <td>{ad.category}</td>
                    <td><span className={styles.statusPending}>Pending</span></td>
                    <td>
                      <form action={handleApprove}>
                        <input type="hidden" name="id" value={ad.id} />
                        <button type="submit" className={styles.approveBtn}>Approve</button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
