'use client';

import React, { useState, useEffect } from 'react';
import { getPendingListings, approveListing, rejectListing } from '@/actions/admin';
import Link from 'next/link';
import styles from '../page.module.css';

export default function ModerationPage() {
  const [pendingAds, setPendingAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    const res = await getPendingListings();
    if (res.success && res.data) {
      setPendingAds(res.data);
    }
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to approve this listing?");
    if (!confirm) return;
    
    const res = await approveListing(id);
    if (res.success) {
      setPendingAds(pendingAds.filter((ad) => ad.id !== id));
      alert("Listing approved and is now live.");
    } else {
      alert("Failed to approve listing.");
    }
  };

  const handleReject = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to reject and delete this listing?");
    if (!confirm) return;
    
    const res = await rejectListing(id);
    if (res.success) {
      setPendingAds(pendingAds.filter((ad) => ad.id !== id));
      alert("Listing rejected and deleted.");
    } else {
      alert("Failed to reject listing.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Ad Moderation & Reports</h1>
      
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading moderation queue...</div>
      ) : pendingAds.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', marginTop: '2rem' }}>
          <h3>All caught up!</h3>
          <p style={{ color: 'var(--muted-foreground)' }}>There are no pending listings in the queue.</p>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ad Title</th>
                <th>Seller</th>
                <th>Date Posted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingAds.map(ad => (
                <tr key={ad.id}>
                  <td>
                    <Link href={`/product/${ad.id}`} style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: '500' }}>
                      {ad.title}
                    </Link>
                  </td>
                  <td>{ad.seller?.name || 'Unknown'}</td>
                  <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
                  <td><span className={styles.badge}>{ad.status}</span></td>
                  <td>
                    <button className={styles.approveBtn} onClick={() => handleApprove(ad.id)}>Approve</button>
                    <button className={styles.rejectBtn} onClick={() => handleReject(ad.id)} style={{ marginLeft: '0.5rem' }}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
