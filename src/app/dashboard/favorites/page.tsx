import React from 'react';
import styles from './page.module.css';

const FAVORITES = [
  { id: 1, title: 'Tesla Model S Plaid', price: '$89,000', category: 'Cars', location: 'West End', saved: '2 days ago' },
  { id: 2, title: 'Modern Luxury Apartment', price: '$450,000', category: 'Property', location: 'Downtown', saved: '4 days ago' },
  { id: 3, title: 'MacBook Pro M3 Max', price: '$3,499', category: 'Electronics', location: 'Tech Hub', saved: '1 week ago' },
];

export default function FavoritesPage() {
  return (
    <div className={styles.container}>
      <h1>Saved Listings</h1>
      <p className={styles.sub}>{FAVORITES.length} items in your wishlist</p>

      <div className={styles.grid}>
        {FAVORITES.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.image}></div>
            <div className={styles.info}>
              <span className={styles.category}>{item.category}</span>
              <h3>{item.title}</h3>
              <div className={styles.price}>{item.price}</div>
              <div className={styles.meta}>
                <span>📍 {item.location}</span>
                <span>Saved {item.saved}</span>
              </div>
              <div className={styles.actions}>
                <a href={`/product/${item.id}`} className={styles.viewBtn}>View Ad</a>
                <button className={styles.removeBtn}>♡ Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
