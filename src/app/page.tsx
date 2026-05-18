import React from 'react';
import Link from 'next/link';
import { getListings } from '@/actions/listings';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const CATEGORIES = [
  { id: 'cars', name: 'Cars', icon: '🚗' },
  { id: 'property', name: 'Property', icon: '🏠' },
  { id: 'mobiles', name: 'Mobiles', icon: '📱' },
  { id: 'bikes', name: 'Bikes', icon: '🏍️' },
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'jobs', name: 'Jobs', icon: '💼' },
  { id: 'services', name: 'Services', icon: '🛠️' },
  { id: 'furniture', name: 'Furniture', icon: '🪑' },
];

const MOCK_ADS = [
  {
    id: '1',
    title: 'Modern Luxury Apartment',
    price: 450000,
    category: 'Property',
    location: 'Downtown',
    images: ['/property-1.jpg'],
    featured: true,
  },
  {
    id: '2',
    title: 'Tesla Model S Plaid',
    price: 89000,
    category: 'Cars',
    location: 'West End',
    images: ['/car-1.jpg'],
    featured: true,
  },
];

export default async function Home() {
  const result = await getListings();
  let liveAds = result.success && result.data ? result.data : [];
  
  // Use mock ads if the DB is empty or fails (for demonstration)
  const adsToDisplay = liveAds.length > 0 ? liveAds.slice(0, 4) : MOCK_ADS;

  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className="animate-fade-in">The Premium Marketplace</h1>
          <p className="animate-fade-in">Discover extraordinary items from verified sellers in your community.</p>
          
          <div className={`${styles.searchBar} animate-fade-in`}>
            <input type="text" placeholder="What are you looking for?" />
            <button className={styles.searchBtn}>Search</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Browse Categories</h2>
          <Link href="/categories" className={styles.viewAll}>View All</Link>
        </div>
        
        <div className={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/browse?category=${cat.id}`} className={styles.categoryCard}>
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Ads Section */}
      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.sectionHeader}>
          <h2>Featured Listings</h2>
          <Link href="/browse" className={styles.viewAll}>Explore All</Link>
        </div>
        
        <div className={styles.adsGrid}>
          {adsToDisplay.map((ad: any) => (
            <Link key={ad.id} href={`/product/${ad.id}`} className={styles.adCard}>
              <div className={styles.adImage}>
                {ad.featured && <span className={styles.adBadge}>FEATURED</span>}
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)' }}></div>
              </div>
              <div className={styles.adInfo}>
                <span className={styles.adCategory}>{ad.category}</span>
                <span className={styles.adTitle}>{ad.title}</span>
                <span className={styles.adPrice}>${ad.price.toLocaleString()}</span>
                <div className={styles.adFooter}>
                  <span>📍 {ad.location}</span>
                  <span>{ad.createdAt ? new Date(ad.createdAt).toLocaleDateString() : 'Just now'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className={styles.section}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Why Trade on Marketplace?</h2>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '3rem' }}>
            We provide a secure and professional environment for all your buying and selling needs.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem' }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Verified Sellers</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Shop with confidence from identity-verified community members.</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Real-time Chat</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Connect instantly with sellers through our secure messaging system.</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Fast Posting</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>List your items in under a minute with our streamlined process.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
