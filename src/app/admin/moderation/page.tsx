import React from 'react';
import styles from '../page.module.css';

export const metadata = {
  title: 'Moderation | Admin Panel',
};

export default function ModerationPage() {
  const pendingAds = [
    { id: '1', title: 'Suspicious iPhone Ad', user: 'user_x', date: 'May 18, 2026', status: 'Pending Review' },
    { id: '2', title: 'Cheap Car Listing', user: 'user_y', date: 'May 17, 2026', status: 'Reported' },
  ];

  return (
    <div className={styles.container}>
      <h1>Ad Moderation & Reports</h1>
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad Title</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingAds.map(ad => (
              <tr key={ad.id}>
                <td>{ad.title}</td>
                <td>{ad.user}</td>
                <td>{ad.date}</td>
                <td><span className={styles.badge}>{ad.status}</span></td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                  <button className={styles.rejectBtn}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
