import React from 'react';
import Link from 'next/link';
import { getListings } from '@/actions/listings';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const MOCK_ADS = [
  { id: '1', title: 'iPhone 15 Pro Max - 256GB', price: 1199, category: 'Mobiles', location: 'New York', images: ['/phone-1.jpg'] },
  { id: '2', title: 'Gaming Laptop - RTX 4080', price: 2450, category: 'Electronics', location: 'Chicago', images: ['/laptop-1.jpg'] },
  { id: '3', title: 'BMW M4 Competition 2023', price: 78500, category: 'Cars', location: 'Los Angeles', images: ['/car-1.jpg'] },
  { id: '4', title: 'Cozy Studio Apartment', price: 1800, category: 'Property', location: 'Miami', images: ['/property-1.jpg'] },
  { id: '5', title: 'Mountain Bike - Trek Fuel', price: 3200, category: 'Bikes', location: 'Denver', images: ['/bike-1.jpg'] },
  { id: '6', title: 'Designer Sofa Set', price: 950, category: 'Furniture', location: 'Austin', images: ['/furniture-1.jpg'] },
];

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryParam = searchParams.category as string | undefined;
  
  const result = await getListings(categoryParam);
  let liveAds = result.success && result.data ? result.data : [];
  
  // Use mock ads if DB is empty for demonstration purposes
  let adsToDisplay = liveAds.length > 0 ? liveAds : MOCK_ADS;
  
  // Apply category filter to mock ads if using mock data
  if (liveAds.length === 0 && categoryParam) {
    adsToDisplay = MOCK_ADS.filter(ad => ad.category.toLowerCase() === categoryParam.toLowerCase());
  }

  return (
    <div className={styles.container}>
      {/* Sidebar Filters */}
      <aside className={styles.sidebar}>
        <div className={styles.filterBox}>
          <h3>Filters</h3>
          
          <div className={styles.filterGroup}>
            <h4>Category</h4>
            <div className={styles.checkboxList}>
              <label className={styles.checkboxItem}><input type="checkbox" checked={categoryParam === 'Cars'} readOnly /> Cars</label>
              <label className={styles.checkboxItem}><input type="checkbox" checked={categoryParam === 'Property'} readOnly /> Property</label>
              <label className={styles.checkboxItem}><input type="checkbox" checked={categoryParam === 'Mobiles'} readOnly /> Mobiles</label>
              <label className={styles.checkboxItem}><input type="checkbox" checked={categoryParam === 'Electronics'} readOnly /> Electronics</label>
              <label className={styles.checkboxItem}><input type="checkbox" checked={categoryParam === 'Bikes'} readOnly /> Bikes</label>
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
          <div className={styles.resultsCount}>Showing {adsToDisplay.length} Results</div>
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
          {adsToDisplay.map((ad: any) => (
            <Link key={ad.id} href={`/product/${ad.id}`} className={styles.adCard}>
              <div className={styles.adImage}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)' }}></div>
              </div>
              <div className={styles.adInfo}>
                <span className={styles.adCategory}>{ad.category}</span>
                <span className={styles.adTitle}>{ad.title}</span>
                <span className={styles.adPrice}>${ad.price.toLocaleString()}</span>
                <div style={{ marginTop: '1rem', color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                  📍 {ad.location}
                </div>
              </div>
            </Link>
          ))}
          {adsToDisplay.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
              <h3>No ads found</h3>
              <p style={{ color: 'var(--muted-foreground)' }}>Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Pagination placeholder */}
        {adsToDisplay.length > 0 && (
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {[1, 2, 3, '...', 12].map((p, i) => (
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
