'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

const PRODUCT = {
  id: '1',
  title: 'iPhone 15 Pro Max - 256GB - Blue Titanium',
  price: 345000,
  category: 'Mobiles',
  location: 'DHA, Karachi',
  description: 'Selling my iPhone 15 Pro Max in Blue Titanium. It is in perfect condition, literally like new. 256GB storage, battery health at 100%. Comes with original box and cable. PTA approved.',
  condition: 'Like New',
  brand: 'Apple',
  seller: {
    name: 'Muhammad Yasir',
    memberSince: 'Oct 2021',
    verified: true,
    rating: 4.8,
    totalAds: 12,
  },
};

const INITIAL_REVIEWS = [
  { id: 1, author: 'Kamran Khan', rating: 5, comment: 'Product is exactly as described. Seller was very cooperative and quick to respond.', date: '3 days ago' },
  { id: 2, author: 'Sarah Ahmed', rating: 4, comment: 'Perfect condition, original accessories included. Highly recommended!', date: '1 week ago' },
];

export default function ProductDetails({
  params,
}: {
  params: React.Usable<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { addToCart, setIsCartOpen } = useCart();
  
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showPhone, setShowPhone] = useState(false);

  const handleBuyNow = () => {
    addToCart({ id: PRODUCT.id, title: PRODUCT.title, price: PRODUCT.price });
    setIsCartOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;
    
    const reviewObj = {
      id: Date.now(),
      author: newAuthor,
      rating: newRating,
      comment: newComment,
      date: 'Just now',
    };
    
    setReviews([reviewObj, ...reviews]);
    setNewAuthor('');
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <div className={styles.imageOverlayIcon}>📱</div>
          </div>
          <div className={styles.thumbnails}>
            <div className={`${styles.thumb} ${styles.thumbActive}`}>📱</div>
            <div className={styles.thumb}>🔌</div>
            <div className={styles.thumb}>📦</div>
            <div className={styles.thumb}>📄</div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.productInfo} style={{ marginTop: '2rem' }}>
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{PRODUCT.description}</p>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Details</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Brand</span>
                <span style={{ fontWeight: '600' }}>{PRODUCT.brand}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Condition</span>
                <span style={{ fontWeight: '600' }}>{PRODUCT.condition}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Ad ID</span>
                <span style={{ fontWeight: '600' }}>#{id}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* E-Commerce Ratings & Reviews Section (Daraz Style) */}
        <div className={styles.reviewsContainer} style={{ marginTop: '2rem' }}>
          <h3>Ratings & Reviews</h3>
          <div className={styles.ratingsSummaryRow}>
            <div className={styles.ratingBigNumber}>4.8</div>
            <div className={styles.ratingStarsArea}>
              <div style={{ color: '#f59e0b', fontSize: '1.25rem' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className={styles.reviewsList}>
            {reviews.map((rev) => (
              <div key={rev.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewAuthor}>{rev.author}</span>
                  <span className={styles.reviewStars}>{'⭐'.repeat(rev.rating)}</span>
                </div>
                <p className={styles.reviewComment}>{rev.comment}</p>
                <span className={styles.reviewDate}>{rev.date}</span>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className={styles.reviewForm}>
            <h4>Write a Customer Review</h4>
            <div className={styles.formRow}>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={newAuthor} 
                onChange={(e) => setNewAuthor(e.target.value)} 
                required 
              />
              <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                <option value={5}>5 Stars (Excellent)</option>
                <option value={4}>4 Stars (Good)</option>
                <option value={3}>3 Stars (Average)</option>
                <option value={2}>2 Stars (Poor)</option>
                <option value={1}>1 Star (Terrible)</option>
              </select>
            </div>
            <textarea 
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
            <span className={styles.category}>{PRODUCT.category}</span>
            <h1 className={styles.title}>{PRODUCT.title}</h1>
            <div className={styles.price}>Rs {PRODUCT.price.toLocaleString()}</div>
          </div>
          <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <span>📍 {PRODUCT.location}</span>
            <span>🕒 2 hours ago</span>
          </div>

          {/* E-Commerce Direct checkout actions (Daraz style) */}
          <div className={styles.cartActionButtons} style={{ marginTop: '2rem' }}>
            <button className={styles.buyNowBtn} onClick={handleBuyNow}>Buy Now</button>
            <button 
              className={styles.addCartBtn} 
              onClick={() => addToCart({ id: PRODUCT.id, title: PRODUCT.title, price: PRODUCT.price })}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Classified Chat & WhatsApp options (OLX style) */}
        <div className={styles.sellerCard}>
          <div className={styles.sellerProfile}>
            <div className={styles.avatar}>{PRODUCT.seller.name.charAt(0)}</div>
            <div className={styles.sellerInfo}>
              <h4>{PRODUCT.seller.name} {PRODUCT.seller.verified && '✅'}</h4>
              <p>Member since {PRODUCT.seller.memberSince}</p>
              <p>⭐ {PRODUCT.seller.rating} · {PRODUCT.seller.totalAds} ads</p>
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
          <div className={styles.mapPlaceholder}>🗺️ {PRODUCT.location}</div>
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
