import React from 'react';
import Link from 'next/link';
import { getListings, getDynamicCategories } from '@/actions/listings';
import FlashSaleSection from '@/components/home/FlashSaleSection';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

function getCategoryIcon(cat: string) {
  const lowerCat = cat.toLowerCase();
  if (lowerCat.includes('mobile') || lowerCat.includes('phone')) return '📱';
  if (lowerCat.includes('car') || lowerCat.includes('vehicle')) return '🚗';
  if (lowerCat.includes('property') || lowerCat.includes('real estate')) return '🏠';
  if (lowerCat.includes('electronic')) return '📺';
  if (lowerCat.includes('bike') || lowerCat.includes('motorcycle')) return '🏍️';
  if (lowerCat.includes('service')) return '🛠️';
  if (lowerCat.includes('job')) return '💼';
  if (lowerCat.includes('furniture')) return '🛋️';
  return '📦';
}

export default async function Home() {
  const [adsRes, catsRes] = await Promise.all([
    getListings(),
    getDynamicCategories()
  ]);

  const liveAds = adsRes.success && adsRes.data ? adsRes.data : [];
  const dynamicCats = catsRes.success && catsRes.data ? catsRes.data : [];

  // Filter listings by category for rows
  const mobileAds = liveAds.filter((ad: any) => ad.category.toLowerCase().includes('mobile')).slice(0, 4);
  const carAds = liveAds.filter((ad: any) => ad.category.toLowerCase().includes('car') || ad.category.toLowerCase().includes('vehicle')).slice(0, 4);
  const generalRecommendations = liveAds.slice(0, 8);

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
          {dynamicCats.length === 0 ? (
            <p style={{ color: 'var(--muted-foreground)' }}>No categories found. Be the first to post an ad!</p>
          ) : (
            dynamicCats.map((cat: string, index: number) => (
              <Link key={index} href={`/browse?category=${encodeURIComponent(cat)}`} className={styles.categoryCard}>
                <div className={styles.categoryIconWrapper}>
                  {getCategoryIcon(cat)}
                </div>
                <span className={styles.categoryName}>{cat}</span>
              </Link>
            ))
          )}
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
                  <span>{getCategoryIcon(ad.category)}</span>
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
                  <span>{getCategoryIcon(ad.category)}</span>
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
        {generalRecommendations.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--card)', borderRadius: '1rem', border: '1px dashed var(--border)' }}>
            <h3>No Ads Yet</h3>
            <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>Be the first one to post an ad on our new marketplace!</p>
            <Link href="/post-ad" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'var(--primary)', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>Post Ad</Link>
          </div>
        ) : (
          <div className={styles.listingsGrid}>
            {generalRecommendations.map((ad: any) => (
              <Link key={ad.id} href={`/product/${ad.id}`} className={styles.adCard}>
                <div className={styles.adImageContainer}>
                  {ad.featured && <span className={styles.featuredBadge}>FEATURED</span>}
                  <button className={styles.favoriteBtn}>♡</button>
                  <span>{getCategoryIcon(ad.category)}</span>
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
        )}
      </section>
    </div>
  );
}
