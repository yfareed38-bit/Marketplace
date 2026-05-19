import React from 'react';
import { getUserListings, deleteListing } from '@/actions/dashboard';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const statusStyles: Record<string, React.CSSProperties> = {
  ACTIVE: { background: '#d1fae5', color: '#065f46' },
  FEATURED: { background: '#dbeafe', color: '#1e40af' },
  PENDING: { background: '#fef3c7', color: '#92400e' },
  SOLD: { background: '#f1f5f9', color: '#475569' },
  EXPIRED: { background: '#fee2e2', color: '#991b1b' },
};

export default async function MyListingsPage() {
  const res = await getUserListings();
  const listings = res.success && res.data ? res.data : [];

  const activeCount = listings.filter((l: any) => l.status === 'ACTIVE').length;
  const pendingCount = listings.filter((l: any) => l.status === 'PENDING').length;
  const soldCount = listings.filter((l: any) => l.status === 'SOLD').length;

  async function handleDelete(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (id) {
      await deleteListing(id);
      revalidatePath('/dashboard/listings');
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Listings</h1>
        <Link href="/post-ad" className={styles.newAdBtn}>+ Post New Ad</Link>
      </header>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.tabActive}`}>All ({listings.length})</button>
        <button className={styles.tab}>Active ({activeCount})</button>
        <button className={styles.tab}>Pending ({pendingCount})</button>
        <button className={styles.tab}>Sold ({soldCount})</button>
      </div>

      <div className={styles.listingsTable}>
        {listings.length === 0 ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
            You haven't posted any ads yet.
          </p>
        ) : (
          listings.map((ad: any) => (
            <div key={ad.id} className={styles.row}>
              <div className={styles.adThumb}>
                {ad.category === 'Mobiles' ? '📱' : ad.category === 'Cars' ? '🚗' : '📦'}
              </div>

              <div className={styles.adInfo}>
                <Link href={`/product/${ad.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4>{ad.title}</h4>
                </Link>
                <span>{ad.category} · {new Date(ad.createdAt).toLocaleDateString()}</span>
              </div>

              <div className={styles.adPrice}>Rs {ad.price.toLocaleString()}</div>

              <div className={styles.adStats}>
                <span>👁 {Math.floor(Math.random() * 200)}</span>
                <span>💬 0</span>
              </div>

              <div>
                <span
                  className={styles.statusBadge}
                  style={statusStyles[ad.status] || statusStyles.ACTIVE}
                >
                  {ad.status.charAt(0).toUpperCase() + ad.status.slice(1).toLowerCase()}
                </span>
              </div>

              <div className={styles.adActions}>
                <button className={styles.editBtn}>Edit</button>
                {ad.status !== 'SOLD' && (
                  <button className={styles.soldBtn}>Mark Sold</button>
                )}
                <form action={handleDelete} style={{ display: 'inline' }}>
                  <input type="hidden" name="id" value={ad.id} />
                  <button type="submit" className={styles.deleteBtn}>Delete</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
