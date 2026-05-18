import React from 'react';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>About Marketplace</h1>
        <p>We are building the most trusted and user-friendly classifieds platform for communities across Pakistan and beyond.</p>
      </section>

      <section className={styles.mission}>
        <div className={styles.missionText}>
          <h2>Our Mission</h2>
          <p>Marketplace was founded with a simple idea: everyone deserves a safe, professional, and easy-to-use platform to buy and sell anything locally. We bridge the gap between buyers and sellers with technology that makes every transaction transparent, secure, and fast.</p>
          <p>Since our founding, we have helped over 500,000 people find great deals on cars, phones, property, and much more — all from the comfort of their homes.</p>
        </div>
        <div className={styles.missionStats}>
          <div className={styles.statItem}><h3>500K+</h3><span>Happy Users</span></div>
          <div className={styles.statItem}><h3>2M+</h3><span>Listings Posted</span></div>
          <div className={styles.statItem}><h3>50+</h3><span>Cities Covered</span></div>
          <div className={styles.statItem}><h3>99%</h3><span>Satisfaction Rate</span></div>
        </div>
      </section>

      <section className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          {[
            { icon: '🤝', title: 'Trust', body: 'Every user is verified. Every transaction is protected.' },
            { icon: '⚡', title: 'Speed', body: 'Post in 60 seconds. Get messages in minutes.' },
            { icon: '🌍', title: 'Community', body: 'We grow when our communities grow.' },
            { icon: '🔒', title: 'Privacy', body: 'Your data is yours. We never sell it.' },
          ].map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <span>{v.icon}</span>
              <h4>{v.title}</h4>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
