import React from 'react';
import Link from 'next/link';
import { getListings } from '@/actions/listings';
import FlashSaleSection from '@/components/home/FlashSaleSection';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const CATEGORIES = [
  { id: 'Mobiles', name: 'Mobiles', icon: '📱' },
  { id: 'Cars', name: 'Vehicles', icon: '🚗' },
  { id: 'Property', name: 'Property For Sale', icon: '🏠' },
  { id: 'Property', name: 'Property For Rent', icon: '🔑' },
  { id: 'Electronics', name: 'Electronics & Home...', icon: '📺' },
  { id: 'Bikes', name: 'Bikes', icon: '🏍️' },
  { id: 'Electronics', name: 'Business, Industrial', icon: '🚜' },
  { id: 'Services', name: 'Services', icon: '🛠️' },
  { id: 'Jobs', name: 'Jobs', icon: '💼' },
];

const MOCK_ADS = [
  // Mobiles
  {
    id: 'm1',
    title: 'iPhone 15 Pro Max - 256GB Dual Sim PTA Approved',
    price: 345000,
    category: 'Mobiles',
    location: 'DHA, Karachi',
    createdAt: '2 hours ago',
    featured: true,
    icon: '📱'
  },
  {
    id: 'm2',
    title: 'Samsung Galaxy S24 Ultra - 12GB RAM 512GB',
    price: 310000,
    category: 'Mobiles',
    location: 'Gulberg, Lahore',
    createdAt: '5 hours ago',
    featured: false,
    icon: '📱'
  },
  // Cars
  {
    id: 'c1',
    title: 'Honda Civic Oriel 2022 - First Owner Mint Condition',
    price: 6850000,
    category: 'Cars',
    location: 'G-11, Islamabad',
    createdAt: '1 day ago',
    featured: true,
    icon: '🚗'
  },
  {
    id: 'c2',
    title: 'Toyota Corolla Altis Grande 1.8 CVT 2021',
    price: 5900000,
    category: 'Cars',
    location: 'Clifton, Karachi',
    createdAt: '3 days ago',
    featured: false,
    icon: '🚗'
  },
  // Bikes
  {
    id: 'b1',
    title: 'Suzuki GS 150 Special Edition 2023 model',
    price: 385000,
    category: 'Bikes',
    location: 'Johar Town, Lahore',
    createdAt: '4 hours ago',
    featured: true,
    icon: '🏍️'
  },
  {
    id: 'b2',
    title: 'Honda CG 125 Self Start 2024 Brand New',
    price: 282000,
    category: 'Bikes',
    location: 'Saddar, Rawalpindi',
    createdAt: '12 hours ago',
    featured: false,
    icon: '🏍️'
  },
  // Property
  {
    id: 'p1',
    title: '5 Marla Luxury Brand New House For Sale',
    price: 18500000,
    category: 'Property',
    location: 'DHA Phase 6, Lahore',
    createdAt: '2 days ago',
    featured: true,
    icon: '🏠'
  },
  {
    id: 'p2',
    title: '2 Bed Apartment in Centaurus Residencia',
    price: 45000000,
    category: 'Property',
    location: 'F-8, Islamabad',
    createdAt: '1 week ago',
    featured: false,
    icon: '🏠'
  }
];

export default async function Home() {
  const result = await getListings();
  let liveAds = result.success && result.data ? result.data : [];
  
  // Format listings to display. If live DB is empty, use mock ads.
  const adsToDisplay = liveAds.length > 0 ? liveAds : MOCK_ADS;

  // Filter listings by category for rows
  const mobileAds = adsToDisplay.filter((ad: any) => ad.category.toLowerCase() === 'mobiles').slice(0, 4);
  const carAds = adsToDisplay.filter((ad: any) => ad.category.toLowerCase() === 'cars').slice(0, 4);
  const generalRecommendations = adsToDisplay.slice(0, 8);

  return (
    <div className={styles.main}>
      {/* 1. Hero Promo Banner */}
      <section className={styles.heroPromo}>
        <div className={styles.promoContent}>
          <h1>Buy & Sell Classifieds</h1>
          <p>The premium online classifieds platform in Pakistan</p>
          <Link href="/browse" className={styles.promoBtn}>
            Explore Ads
          </Link>
        </div>
        <div className={styles.promoImage}>📢</div>
      </section>

      {/* 2. Flash Sale Deals Section */}
      <FlashSaleSection />

      {/* 3. Categories Section */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>All Categories</span>
        </div>
        <div className={styles.categoriesGrid}>
          {CATEGORIES.map((cat, index) => (
            <Link key={index} href={`/browse?category=${cat.id}`} className={styles.categoryCard}>
              <div className={styles.categoryIconWrapper}>
                {cat.icon}
              </div>
              <span className={styles.categoryName}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Mobile Phones Section */}
      {mobileAds.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <span>Mobile Phones</span>
            <Link href="/browse?category=Mobiles" className={styles.viewAllLink}>
              View more
            </Link>
          </div>
          <div className={styles.listingsGrid}>
            {mobileAds.map((ad: any) => (
              <Link key={ad.id} href={`/product/${ad.id}`} className={styles.adCard}>
                <div className={styles.adImageContainer}>
                  {ad.featured && <span className={styles.featuredBadge}>FEATURED</span>}
                  <button className={styles.favoriteBtn}>♡</button>
                  <span>{ad.icon || '📱'}</span>
                </div>
                <div className={styles.adDetails}>
                  <div className={styles.adPrice}>Rs {ad.price.toLocaleString()}</div>
                  <div className={styles.adTitle}>{ad.title}</div>
                  <div className={styles.adFooter}>
                    <span>{ad.location}</span>
                    <span>{ad.createdAt ? (typeof ad.createdAt === 'string' ? ad.createdAt : new Date(ad.createdAt).toLocaleDateString()) : 'Just now'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. Cars Section */}
      {carAds.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <span>Cars & Vehicles</span>
            <Link href="/browse?category=Cars" className={styles.viewAllLink}>
              View more
            </Link>
          </div>
          <div className={styles.listingsGrid}>
            {carAds.map((ad: any) => (
              <Link key={ad.id} href={`/product/${ad.id}`} className={styles.adCard}>
                <div className={styles.adImageContainer}>
                  {ad.featured && <span className={styles.featuredBadge}>FEATURED</span>}
                  <button className={styles.favoriteBtn}>♡</button>
                  <span>{ad.icon || '🚗'}</span>
                </div>
                <div className={styles.adDetails}>
                  <div className={styles.adPrice}>Rs {ad.price.toLocaleString()}</div>
                  <div className={styles.adTitle}>{ad.title}</div>
                  <div className={styles.adFooter}>
                    <span>{ad.location}</span>
                    <span>{ad.createdAt ? (typeof ad.createdAt === 'string' ? ad.createdAt : new Date(ad.createdAt).toLocaleDateString()) : 'Just now'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 6. Fresh Recommendations Section */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>Fresh Recommendations</span>
        </div>
        <div className={styles.listingsGrid}>
          {generalRecommendations.map((ad: any) => (
            <Link key={ad.id} href={`/product/${ad.id}`} className={styles.adCard}>
              <div className={styles.adImageContainer}>
                {ad.featured && <span className={styles.featuredBadge}>FEATURED</span>}
                <button className={styles.favoriteBtn}>♡</button>
                <span>{ad.icon || (ad.category === 'Mobiles' ? '📱' : ad.category === 'Cars' ? '🚗' : ad.category === 'Bikes' ? '🏍️' : '🏠')}</span>
              </div>
              <div className={styles.adDetails}>
                <div className={styles.adPrice}>Rs {ad.price.toLocaleString()}</div>
                <div className={styles.adTitle}>{ad.title}</div>
                <div className={styles.adFooter}>
                  <span>{ad.location}</span>
                  <span>{ad.createdAt ? (typeof ad.createdAt === 'string' ? ad.createdAt : new Date(ad.createdAt).toLocaleDateString()) : 'Just now'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
