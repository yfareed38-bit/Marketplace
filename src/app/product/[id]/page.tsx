import React from 'react';
import styles from './page.module.css';

const PRODUCT = {
  id: 1,
  title: 'iPhone 15 Pro Max - 256GB - Blue Titanium',
  price: 'Rs 345,000',
  category: 'Mobiles',
  location: 'DHA, Karachi',
  description: 'Selling my iPhone 15 Pro Max in Blue Titanium. It is in perfect condition, literally like new. 256GB storage, battery health at 100%. Comes with original box and cable. PTA approved.',
  condition: 'Like New',
  brand: 'Apple',
  seller: {
    name: 'Muhammad Yasir',
    memberSince: 'Oct 2021',
    verified: true,
    rating: 4.8,
    totalAds: 12,
  },
};

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}></div>
          <div className={styles.thumbnails}>
            <div className={`${styles.thumb} ${styles.thumbActive}`}></div>
            <div className={styles.thumb}></div>
            <div className={styles.thumb}></div>
            <div className={styles.thumb}></div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.productInfo} style={{ marginTop: '2rem' }}>
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{PRODUCT.description}</p>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Details</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Brand</span>
                <span style={{ fontWeight: '600' }}>{PRODUCT.brand}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Condition</span>
                <span style={{ fontWeight: '600' }}>{PRODUCT.condition}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Ad ID</span>
                <span style={{ fontWeight: '600' }}>#{id}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <aside className={styles.details}>
        <div className={styles.productInfo}>
          <div className={styles.header}>
            <span className={styles.category}>{PRODUCT.category}</span>
            <h1 className={styles.title}>{PRODUCT.title}</h1>
            <div className={styles.price}>{PRODUCT.price}</div>
          </div>
          <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <span>📍 {PRODUCT.location}</span>
            <span>🕒 2 hours ago</span>
          </div>
        </div>

        <div className={styles.sellerCard}>
          <div className={styles.sellerProfile}>
            <div className={styles.avatar}>{PRODUCT.seller.name.charAt(0)}</div>
            <div className={styles.sellerInfo}>
              <h4>{PRODUCT.seller.name} {PRODUCT.seller.verified && '✅'}</h4>
              <p>Member since {PRODUCT.seller.memberSince}</p>
              <p>⭐ {PRODUCT.seller.rating} · {PRODUCT.seller.totalAds} ads</p>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.chatBtn}>💬 Chat with Seller</button>
            <button className={styles.whatsappBtn}>📱 WhatsApp</button>
            <button style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '600', width: '100%' }}>
              📞 Show Phone Number
            </button>
          </div>
        </div>

        <div className={styles.locationMap}>
          <h4 style={{ marginBottom: '1.5rem' }}>Location</h4>
          <div className={styles.mapPlaceholder}>🗺️ {PRODUCT.location}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button style={{ color: '#ef4444', fontWeight: '600', fontSize: '0.9rem' }}>
            🚩 Report this ad
          </button>
        </div>
      </aside>
    </div>
  );
}
