import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerSection}>
      {/* 1. App Promo Banner */}
      <div className={styles.appPromoBanner}>
        <div className={styles.promoContainer}>
          <div className={styles.promoLeft}>
            <div className={styles.phoneMockup}>📱</div>
            <div className={styles.promoText}>
              <h2>GET YOUR APP TODAY</h2>
              <p>Experience the fastest way to buy and sell on the go.</p>
            </div>
          </div>
          <div className={styles.promoRight}>
            <span className={styles.promoRightLabel}>FOLLOW US ON APP STORES</span>
            <div className={styles.appBadges}>
              <div className={styles.appBadge}>
                <span>Download on the</span>
                App Store
              </div>
              <div className={styles.appBadge}>
                <span>GET IT ON</span>
                Google Play
              </div>
              <div className={styles.appBadge}>
                <span>Explore it on</span>
                AppGallery
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Links Grid Section */}
      <div className={styles.linksGridSection}>
        <div className={styles.linksGridContainer}>
          {/* Popular Categories */}
          <div className={styles.linkColumn}>
            <h4>Popular Categories</h4>
            <div className={styles.linkColumnList}>
              <Link href="/browse?category=Cars">Cars</Link>
              <Link href="/browse?category=Property">Flats for rent</Link>
              <Link href="/browse?category=Mobiles">Mobile Phones</Link>
              <Link href="/browse?category=Bikes">Motorcycles</Link>
            </div>
          </div>

          {/* Trending Searches */}
          <div className={styles.linkColumn}>
            <h4>Trending Searches</h4>
            <div className={styles.linkColumnList}>
              <Link href="/browse?category=Bikes">Bikes</Link>
              <Link href="/browse?category=Electronics">Watches</Link>
              <Link href="/browse?category=Electronics">Books</Link>
              <Link href="/browse?category=Electronics">Generators</Link>
            </div>
          </div>

          {/* About Us */}
          <div className={styles.linkColumn}>
            <h4>About Us</h4>
            <div className={styles.linkColumnList}>
              <Link href="/about">About OLX Group</Link>
              <Link href="/blog">OLX Blog</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/pricing">OLX for Businesses</Link>
            </div>
          </div>

          {/* OLX */}
          <div className={styles.linkColumn}>
            <h4>OLX</h4>
            <div className={styles.linkColumnList}>
              <Link href="/safety">Help & Safety</Link>
              <Link href="/safety">Sitemap</Link>
              <Link href="/safety">Legal & Privacy info</Link>
              <Link href="/safety">Vulnerability Disclosure</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <div className={styles.bottomLeft}>
            <span>Free Classifieds in Pakistan</span> &copy; 2006-{currentYear} OLX
          </div>
          <div className={styles.bottomRight}>
            <Link href="/safety" className={styles.bottomLink}>Terms of Use</Link>
            <Link href="/safety" className={styles.bottomLink}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
