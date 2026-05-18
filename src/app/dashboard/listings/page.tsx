import React from 'react';
import styles from './page.module.css';

const LISTINGS = [
  { id: 1, title: 'iPhone 15 Pro Max - 256GB', price: '$1,199', category: 'Mobiles', views: 342, messages: 5, status: 'active', date: '3 days ago' },
  { id: 2, title: 'Gaming Chair - Herman Miller', price: '$890', category: 'Furniture', views: 128, messages: 2, status: 'active', date: '1 week ago' },
  { id: 3, title: 'Canon EOS R5 Camera', price: '$3,600', category: 'Electronics', views: 514, messages: 9, status: 'featured', date: '2 days ago' },
  { id: 4, title: 'Trek Mountain Bike', price: '$2,100', category: 'Bikes', views: 87, messages: 1, status: 'pending', date: '5 days ago' },
  { id: 5, title: 'Vintage Leather Sofa', price: '$750', category: 'Furniture', views: 203, messages: 3, status: 'sold', date: '2 weeks ago' },
];

const statusStyles: Record<string, React.CSSProperties> = {
  active: { background: '#d1fae5', color: '#065f46' },
  featured: { background: '#dbeafe', color: '#1e40af' },
  pending: { background: '#fef3c7', color: '#92400e' },
  sold: { background: '#f1f5f9', color: '#475569' },
};

export default function MyListingsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Listings</h1>
        <a href="/post-ad" className={styles.newAdBtn}>+ Post New Ad</a>
      </header>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.tabActive}`}>All (5)</button>
        <button className={styles.tab}>Active (3)</button>
        <button className={styles.tab}>Pending (1)</button>
        <button className={styles.tab}>Sold (1)</button>
      </div>

      <div className={styles.listingsTable}>
        {LISTINGS.map((ad) => (
          <div key={ad.id} className={styles.row}>
            <div className={styles.adThumb}></div>

            <div className={styles.adInfo}>
              <h4>{ad.title}</h4>
              <span>{ad.category} · {ad.date}</span>
            </div>

            <div className={styles.adPrice}>{ad.price}</div>

            <div className={styles.adStats}>
              <span>👁 {ad.views}</span>
              <span>💬 {ad.messages}</span>
            </div>

            <div>
              <span
                className={styles.statusBadge}
                style={statusStyles[ad.status]}
              >
                {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
              </span>
            </div>

            <div className={styles.adActions}>
              <button className={styles.editBtn}>Edit</button>
              {ad.status !== 'sold' && (
                <button className={styles.soldBtn}>Mark Sold</button>
              )}
              <button className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
