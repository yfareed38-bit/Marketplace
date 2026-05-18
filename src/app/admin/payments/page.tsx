import React from 'react';
import styles from '../page.module.css';

export const metadata = {
  title: 'Payment Management | Admin Panel',
};

export default function PaymentsPage() {
  const transactions = [
    { id: 'TRX-101', user: 'Jane Smith', amount: 'Rs 4,999', type: 'Pro Membership', date: 'May 18, 2026', status: 'Completed' },
    { id: 'TRX-102', user: 'John Doe', amount: 'Rs 500', type: 'Ad Boost', date: 'May 17, 2026', status: 'Completed' },
    { id: 'TRX-103', user: 'Ali Khan', amount: 'Rs 1,500', type: 'Premium Ad', date: 'May 16, 2026', status: 'Refunded' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Payment Management</h1>
        <p>Monitor platform revenue, subscriptions, and transactions.</p>
      </div>
      
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>Recent Transactions</h2>
          <button className={styles.actionBtn}>Export CSV</button>
        </div>
        
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(trx => (
              <tr key={trx.id}>
                <td>{trx.id}</td>
                <td>{trx.user}</td>
                <td>{trx.type}</td>
                <td>{trx.amount}</td>
                <td>{trx.date}</td>
                <td>
                  <span className={trx.status === 'Completed' ? styles.trendUp : styles.trendDown}>
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
