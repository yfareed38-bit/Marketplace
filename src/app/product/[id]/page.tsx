'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { getListingById, getReviewsByUserId, createReview } from '@/actions/listings';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

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

export default function ProductDetails({
  params,
}: {
  params: React.Usable<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { addToCart, setIsCartOpen } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showPhone, setShowPhone] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const prodRes = await getListingById(id);
      if (!prodRes.success || !prodRes.data) {
        notFound();
        return;
      }
      setProduct(prodRes.data);
      
      const revRes = await getReviewsByUserId(prodRes.data.sellerId);
      if (revRes.success && revRes.data) {
        setReviews(revRes.data);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  const handleBuyNow = () => {
    if (!product) return;
    addToCart({ id: product.id, title: product.title, price: product.price });
    setIsCartOpen(true);
  };

  const handleAddReview = async (formData: FormData) => {
    if (!product) return;
    formData.append('revieweeId', product.sellerId);
    
    const res = await createReview(formData);
    if (res.success && res.data) {
      setReviews([{
        id: res.data.id,
        rating: res.data.rating,
        comment: res.data.comment,
        createdAt: res.data.createdAt,
        reviewer: { name: 'You' } // Optimistic
      }, ...reviews]);
      setNewComment('');
      setNewRating(5);
    } else {
      alert('Failed to submit review. Make sure you are logged in.');
    }
  };

  if (loading) {
    return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (!product) return null;

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage} style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            {product.images && product.images.length > 0 && product.images[0] !== '/placeholder-image.jpg' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '5rem' }}>{getCategoryIcon(product.category)}</span>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>No images available for this listing</span>
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && product.images[0] !== '/placeholder-image.jpg' && (
            <div className={styles.thumbnails} style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {product.images.map((img: string, idx: number) => (
                <div 
                  key={idx} 
                  className={`${styles.thumb} ${activeImageIndex === idx ? styles.thumbActive : ''}`} 
                  onClick={() => setActiveImageIndex(idx)}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    cursor: 'pointer', 
                    border: activeImageIndex === idx ? '2px solid var(--primary)' : '1px solid var(--border)',
                    flexShrink: 0
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className={styles.productInfo} style={{ marginTop: '2rem' }}>
          <div className={styles.description}>
            <h3>Description</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{product.description}</p>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Details</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Condition</span>
                <span style={{ fontWeight: '600' }}>{product.condition}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Ad ID</span>
                <span style={{ fontWeight: '600' }}>#{product.id.substring(0, 8)}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* E-Commerce Ratings & Reviews Section (Daraz Style) */}
        <div className={styles.reviewsContainer} style={{ marginTop: '2rem' }}>
          <h3>Ratings & Reviews</h3>
          <div className={styles.ratingsSummaryRow}>
            <div className={styles.ratingBigNumber}>
              {reviews.length > 0 
                ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
                : '0.0'}
            </div>
            <div className={styles.ratingStarsArea}>
              <div style={{ color: '#f59e0b', fontSize: '1.25rem' }}>
                {'⭐'.repeat(Math.round(reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) : 0))}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className={styles.reviewsList}>
            {reviews.length === 0 ? (
              <p style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>No reviews yet for this seller.</p>
            ) : (
              reviews.map((rev: any) => (
                <div key={rev.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>{rev.reviewer?.name || 'Anonymous'}</span>
                    <span className={styles.reviewStars}>{'⭐'.repeat(rev.rating)}</span>
                  </div>
                  <p className={styles.reviewComment}>{rev.comment}</p>
                  <span className={styles.reviewDate}>{new Date(rev.createdAt).toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <form action={handleAddReview} className={styles.reviewForm}>
            <h4>Write a Customer Review</h4>
            <div className={styles.formRow}>
              <select name="rating" value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                <option value={5}>5 Stars (Excellent)</option>
                <option value={4}>4 Stars (Good)</option>
                <option value={3}>3 Stars (Average)</option>
                <option value={2}>2 Stars (Poor)</option>
                <option value={1}>1 Star (Terrible)</option>
              </select>
            </div>
            <textarea 
              name="comment"
              placeholder="Share your experience with this seller or product..." 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              rows={3} 
              required
            ></textarea>
            <button type="submit" className={styles.submitReviewBtn}>Submit Review</button>
          </form>
        </div>
      </div>

      <aside className={styles.details}>
        {/* Price & Header Block */}
        <div className={styles.productInfo}>
          <div className={styles.header}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.price}>Rs {product.price.toLocaleString()}</div>
          </div>
          <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <span>📍 {product.location}</span>
            <span>🕒 {new Date(product.createdAt).toLocaleDateString()}</span>
          </div>

          {/* E-Commerce Direct checkout actions (Daraz style) */}
          <div className={styles.cartActionButtons} style={{ marginTop: '2rem' }}>
            <button className={styles.buyNowBtn} onClick={handleBuyNow}>Buy Now</button>
            <button 
              className={styles.addCartBtn} 
              onClick={() => addToCart({ id: product.id, title: product.title, price: product.price })}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Classified Chat & WhatsApp options (OLX style) */}
        <div className={styles.sellerCard}>
          <div className={styles.sellerProfile}>
            <div className={styles.avatar}>{product.seller?.name?.charAt(0) || 'U'}</div>
            <div className={styles.sellerInfo}>
              <h4>{product.seller?.name || 'Unknown Seller'} {product.seller?.role === 'ADMIN' && '✅'}</h4>
              <p>Member since {new Date(product.seller?.createdAt).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})}</p>
              <p>⭐ {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 'New'} · {product.seller?._count?.listings || 0} ads</p>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.chatBtn} onClick={() => alert('Opening Seller Chat Box...')}>
              💬 Chat with Seller
            </button>
            <button className={styles.whatsappBtn} onClick={() => window.open('https://wa.me/923001234567', '_blank')}>
              📱 WhatsApp
            </button>
            <button 
              className={styles.showPhoneBtn}
              onClick={() => setShowPhone(!showPhone)}
            >
              {showPhone ? '📞 +92 300 1234567' : '📞 Show Phone Number'}
            </button>
          </div>
        </div>

        <div className={styles.locationMap}>
          <h4 style={{ marginBottom: '1.5rem' }}>Location</h4>
          <div className={styles.mapPlaceholder}>🗺️ {product.location}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button style={{ color: '#ef4444', fontWeight: '600', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>
            🚩 Report this ad
          </button>
        </div>
      </aside>
    </div>
  );
}
