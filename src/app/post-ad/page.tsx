'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createListing } from '@/actions/listings';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

export default function PostAdPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    const result = await createListing(formData);
    
    if (result.success && result.data) {
      router.push(`/product/${result.data.id}`);
    } else {
      setError(result.error || 'Failed to post ad');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <header className={styles.header}>
          <h1>Post New Advertisement</h1>
          <p>Fill in the details below to reach thousands of buyers.</p>
        </header>

        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <div className={styles.stepper}>
          <div className={`${styles.step} ${styles.stepActive}`}>
            <span className={styles.stepNum}>1</span>
            <span className={styles.stepLabel}>Details</span>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <span className={styles.stepLabel}>Photos</span>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <span className={styles.stepLabel}>Location</span>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.step}>
            <span className={styles.stepNum}>4</span>
            <span className={styles.stepLabel}>Preview</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Ad Title</label>
            <input name="title" type="text" placeholder="e.g. iPhone 15 Pro Max - Like New" required />
            <small>Give your ad a clear, descriptive title.</small>
          </div>

          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select name="category" required>
                <option value="">Select Category</option>
                <option value="Cars">Cars</option>
                <option value="Property">Property</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Price ($)</label>
              <input name="price" type="number" step="0.01" placeholder="Enter price" required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" rows={6} placeholder="Describe what you are selling in detail..." required></textarea>
          </div>

          <div className={styles.formGroup}>
            <label>Condition</label>
            <div className={styles.radioGroup}>
              <label><input type="radio" name="condition" value="New" required /> New</label>
              <label><input type="radio" name="condition" value="Used" required /> Used</label>
              <label><input type="radio" name="condition" value="Refurbished" required /> Refurbished</label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Location</label>
            <input name="location" type="text" placeholder="e.g. New York, NY" required />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>Cancel</button>
            <button type="submit" className={styles.nextBtn} disabled={loading}>
              {loading ? 'Posting...' : 'Post Ad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
