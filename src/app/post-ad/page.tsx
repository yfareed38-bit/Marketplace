'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createListing, getDynamicCategories } from '@/actions/listings';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

export default function PostAdPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  
  // Image Upload States
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch dynamic categories
  useEffect(() => {
    async function loadCats() {
      const res = await getDynamicCategories();
      if (res.success && res.data) {
        setCategories(res.data);
      }
    }
    loadCats();
  }, []);

  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    
    // Limit to 5 images max
    if (images.length + selectedFiles.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      
      // Upload images to Cloudinary if selected
      if (images.length > 0) {
        setUploadingImages(true);
        const uploadData = new FormData();
        images.forEach((file) => uploadData.append('files', file));

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadRes.ok) {
          throw new Error('Image upload to Cloudinary failed. Please try again.');
        }

        const uploadResult = await uploadRes.json();
        if (uploadResult.success && uploadResult.urls) {
          uploadResult.urls.forEach((url: string) => {
            formData.append('images', url);
          });
        }
      }
      setUploadingImages(false);

      const result = await createListing(formData);
      
      if (result.success && result.data) {
        router.push(`/product/${result.data.id}`);
      } else {
        setError(result.error || 'Failed to post ad');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <header className={styles.header}>
          <h1>Post New Advertisement</h1>
          <p>Fill in the details below to reach thousands of buyers.</p>
        </header>

        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}

        <div className={styles.stepper}>
          <div className={`${styles.step} ${styles.stepActive}`}>
            <span className={styles.stepNum}>1</span>
            <span className={styles.stepLabel}>Details</span>
          </div>
          <div className={styles.stepLine}></div>
          <div className={`${styles.step} ${images.length > 0 ? styles.stepActive : ''}`}>
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
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon ? `${cat.icon} ` : ''}{cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Price (Rs)</label>
              <input name="price" type="number" step="1" placeholder="Enter price in PKR" required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" rows={6} placeholder="Describe what you are selling in detail..." required></textarea>
          </div>

          <div className={styles.formGroup}>
            <label>Upload Images (Max 5)</label>
            <div className={styles.imageUploadArea} style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#f8fafc',
              position: 'relative',
              transition: 'border-color 0.2s'
            }}>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📷</div>
              <h4 style={{ margin: '0.25rem 0' }}>Drag & Drop or Click to Upload</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Supports JPG, PNG, WEBP (Max 5 files)</p>
            </div>

            {previews.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {previews.map((src, index) => (
                  <div key={index} style={{ position: 'relative', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            <input name="location" type="text" placeholder="e.g. Lahore, Pakistan" required />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>Cancel</button>
            <button type="submit" className={styles.nextBtn} disabled={loading}>
              {loading ? (uploadingImages ? 'Uploading Images...' : 'Posting...') : 'Post Ad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
