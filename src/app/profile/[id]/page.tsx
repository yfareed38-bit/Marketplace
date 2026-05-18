import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Seller Profile | Marketplace',
  description: 'View seller profile, ratings, and active listings on the Marketplace.',
};

export default function UserProfilePage({ params }: { params: { id: string } }) {
  // Mock data for the profile
  const profile = {
    id: params.id,
    name: 'Ahmed Khan',
    memberSince: 'August 2023',
    rating: 4.8,
    reviewsCount: 124,
    verified: true,
    location: 'Karachi, Sindh',
    about: 'Professional seller dealing in electronics and home appliances. Always ensuring high-quality products and quick delivery. Feel free to message for inquiries.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

  const listings = [
    { id: '1', title: 'iPhone 13 Pro Max - 256GB', price: 'Rs 250,000', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400&h=300', condition: 'Used - Like New' },
    { id: '2', title: 'Dell XPS 15 Laptop', price: 'Rs 320,000', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400&h=300', condition: 'Refurbished' },
    { id: '3', title: 'Sony WH-1000XM4 Headphones', price: 'Rs 65,000', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=300', condition: 'New' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.coverPhoto}></div>
        <div className={styles.profileInfo}>
          <div className={styles.avatarWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
            {profile.verified && <span className={styles.verifiedBadge}>✓</span>}
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.memberSince}>Member since {profile.memberSince} • {profile.location}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.star}>★</span>
                <span className={styles.rating}>{profile.rating}</span>
                <span className={styles.reviews}>({profile.reviewsCount} reviews)</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.activeListings}>{listings.length} Active Listings</span>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Message Seller</button>
            <button className={styles.secondaryBtn}>Follow</button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainColumn}>
          <section className={styles.aboutSection}>
            <h2>About {profile.name}</h2>
            <p>{profile.about}</p>
          </section>

          <section className={styles.listingsSection}>
            <div className={styles.sectionHeader}>
              <h2>Active Listings</h2>
            </div>
            <div className={styles.grid}>
              {listings.map(listing => (
                <Link href={`/product/${listing.id}`} key={listing.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={listing.image} alt={listing.title} />
                    <span className={styles.conditionBadge}>{listing.condition}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{listing.title}</h3>
                    <p className={styles.cardPrice}>{listing.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.widget}>
            <h3>Safety Tips</h3>
            <ul className={styles.safetyList}>
              <li>Meet in a public space</li>
              <li>Don't pay in advance</li>
              <li>Check the item before buying</li>
            </ul>
            <Link href="/safety" className={styles.learnMoreLink}>Learn more about safety</Link>
          </div>
          
          <div className={styles.widget}>
            <h3>Report User</h3>
            <p className={styles.reportText}>If you find this user suspicious or abusive, please let us know.</p>
            <button className={styles.reportBtn}>Report {profile.name}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
