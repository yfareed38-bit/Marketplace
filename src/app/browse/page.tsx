import React from 'react';
import Link from 'next/link';
import { getListings, getDynamicCategories } from '@/actions/listings';
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

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryParam = searchParams.category as string | undefined;
  
  const [adsRes, catsRes] = await Promise.all([
    getListings(categoryParam),
    getDynamicCategories()
  ]);

  const liveAds = adsRes.success && adsRes.data ? adsRes.data : [];
  const dynamicCats = catsRes.success && catsRes.data ? catsRes.data : [];

  return (
    <div className={styles.container}>
      {/* Sidebar Filters */}
      <aside className={styles.sidebar}>
        <div className={styles.filterBox}>
          <h3>Filters</h3>
          
          <div className={styles.filterGroup}>
            <h4>Category</h4>
            <div className={styles.checkboxList}>
              {dynamicCats.length === 0 ? (
                <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>No categories yet</span>
              ) : (
                dynamicCats.map((cat: any) => {
                  const catName = typeof cat === 'string' ? cat : cat.name;
                  return (
                    <label key={catName} className={styles.checkboxItem} style={{ cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={categoryParam === catName} 
                        readOnly 
                      /> 
                      <Link href={categoryParam === catName ? '/browse' : `/browse?category=${encodeURIComponent(catName)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block', width: '100%' }}>
                        {catName}
                      </Link>
                    </label>
                  );
                })
              )}
            </div>
            {categoryParam && (
              <div style={{ marginTop: '0.5rem' }}>
                <Link href="/browse" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Clear category filter</Link>
              </div>
            )}
          </div>

          <div className={styles.filterGroup}>
            <h4>Price Range</h4>
            <div className={styles.rangeInputs}>
              <input type="number" placeholder="Min" />
              <input type="number" placeholder="Max" />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h4>Condition</h4>
            <div className={styles.checkboxList}>
              <label className={styles.checkboxItem}><input type="checkbox" /> New</label>
              <label className={styles.checkboxItem}><input type="checkbox" /> Like New</label>
              <label className={styles.checkboxItem}><input type="checkbox" /> Used</label>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.toolbar}>
          <div className={styles.resultsCount}>Showing {liveAds.length} Results</div>
          <div className={styles.controls}>
            <select className={styles.select}>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <div className={styles.viewToggle}>
              <button className={`${styles.viewBtn} ${styles.viewBtnActive}`}>Grid</button>
              <button className={styles.viewBtn}>List</button>
            </div>
          </div>
        </div>

        <div className={styles.adsGrid}>
          {liveAds.map((ad: any) => (
            <Link key={ad.id} href={`/product/${ad.id}`} className={styles.adCard}>
              <div className={styles.adImage}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {getCategoryIcon(ad.category)}
                </div>
              </div>
              <div className={styles.adInfo}>
                <span className={styles.adCategory}>{ad.category}</span>
                <span className={styles.adTitle}>{ad.title}</span>
                <span className={styles.adPrice}>Rs {ad.price.toLocaleString()}</span>
                <div style={{ marginTop: '1rem', color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                  📍 {ad.location}
                </div>
              </div>
            </Link>
          ))}
          {liveAds.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
              <h3>No ads found</h3>
              <p style={{ color: 'var(--muted-foreground)' }}>{categoryParam ? `No ads found in "${categoryParam}". Try another category.` : 'Be the first to post an ad!'}</p>
              <Link href="/post-ad" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'var(--primary)', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>Post Ad</Link>
            </div>
          )}
        </div>

        {/* Pagination placeholder */}
        {liveAds.length > 0 && (
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {[1].map((p, i) => (
              <button key={i} style={{ 
                width: '40px', height: '40px', borderRadius: '10px', 
                background: p === 1 ? 'var(--primary)' : 'var(--card)',
                color: p === 1 ? 'white' : 'var(--foreground)',
                border: '1px solid var(--border)',
                fontWeight: '600'
              }}>
                {p}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
