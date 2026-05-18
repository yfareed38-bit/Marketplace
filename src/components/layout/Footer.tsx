import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <Link href="/" className={styles.logo}>
              <span>Market</span>place
            </Link>
            <p className={styles.description}>
              The world's most trusted marketplace platform for buying and selling anything locally.
            </p>
          </div>
          
          <div className={styles.links}>
            <h4>Platform</h4>
            <Link href="/browse">Browse Ads</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
          </div>

          <div className={styles.links}>
            <h4>Support</h4>
            <Link href="/help">Help Center</Link>
            <Link href="/safety">Safety Center</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/about">About Us</Link>
          </div>

          <div className={styles.links}>
            <h4>Legal</h4>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Marketplace Platform. All rights reserved.</p>
          <div className={styles.socials}>
            {/* Social icons would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
