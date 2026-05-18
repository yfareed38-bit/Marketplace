import React from 'react';
import styles from './page.module.css';

const NOTIFICATIONS = [
  { id: 1, icon: '💬', title: 'New message from Sarah', body: 'About your listing: iPhone 15 Pro Max', time: '5 minutes ago', read: false },
  { id: 2, icon: '❤️', title: 'Someone saved your ad', body: '"Gaming Chair - Herman Miller" was added to a wishlist', time: '2 hours ago', read: false },
  { id: 3, icon: '✅', title: 'Ad approved', body: 'Your listing "Canon EOS R5" is now live', time: '1 day ago', read: true },
  { id: 4, icon: '🏅', title: 'Featured plan activated', body: 'Your Pro membership is now active for 30 days', time: '3 days ago', read: true },
  { id: 5, icon: '⚠️', title: 'Price drop alert', body: 'A saved item "BMW M4" dropped in price by 5%', time: '1 week ago', read: true },
];

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Notifications</h1>
        <button className={styles.markAll}>Mark all as read</button>
      </div>

      <div className={styles.list}>
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className={`${styles.item} ${!n.read ? styles.unread : ''}`}>
            <div className={styles.iconBox}>{n.icon}</div>
            <div className={styles.content}>
              <h4>{n.title}</h4>
              <p>{n.body}</p>
              <span>{n.time}</span>
            </div>
            {!n.read && <div className={styles.dot}></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
