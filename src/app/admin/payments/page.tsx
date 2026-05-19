import React from 'react';
import { getSoldListings } from '@/actions/admin';
import styles from '../page.module.css';

export const metadata = {
  title: 'Payment Management | Admin Panel',
};

export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
  const res = await getSoldListings();
  const soldAds = res.success && res.data ? res.data : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Completed Transactions</h1>
        <p>Monitor platform sales and completed listings (Sold Items).</p>
      </div>
      
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>Recent Sales</h2>
          <button className={styles.actionBtn}>Export CSV</button>
        </div>
        
        {soldAds.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--card)', borderRadius: '1rem', border: '1px dashed var(--border)', marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--muted-foreground)' }}>No transactions yet.</h3>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Seller</th>
                <th>Item Sold</th>
                <th>Amount</th>
                <th>Date Sold</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {soldAds.map((ad: any) => (
                <tr key={ad.id}>
                  <td>#{ad.id.substring(0, 8).toUpperCase()}</td>
                  <td>{ad.seller?.name || 'Unknown'}</td>
                  <td>{ad.title}</td>
                  <td>Rs {ad.price.toLocaleString()}</td>
                  <td>{new Date(ad.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <span className={styles.trendUp}>
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
