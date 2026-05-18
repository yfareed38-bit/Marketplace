import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog & Help Center | Marketplace',
  description: 'Tips, buying guides, and updates from our marketplace.',
};

export default function BlogPage() {
  const featuredPosts = [
    {
      id: '1',
      title: 'Top 10 Tips for Selling Your Used Car Faster',
      category: 'Selling Guide',
      date: 'May 12, 2026',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600&h=400',
      excerpt: 'Learn how to take the perfect photos, price your car competitively, and negotiate with buyers like a pro.',
    },
    {
      id: '2',
      title: 'How to Spot a Fake Smartphone Before Buying',
      category: 'Safety & Trust',
      date: 'May 08, 2026',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600&h=400',
      excerpt: 'With counterfeit electronics on the rise, here is a comprehensive checklist to verify authenticity before you hand over cash.',
    },
    {
      id: '3',
      title: 'Home Office Upgrades on a Budget',
      category: 'Buying Guide',
      date: 'May 02, 2026',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600&h=400',
      excerpt: 'Create the ultimate productivity setup using gently used furniture and electronics found right here on the marketplace.',
    }
  ];

  const recentArticles = [
    { id: '4', title: 'Understanding Our New Premium Memberships', category: 'Platform Update', date: 'April 28, 2026' },
    { id: '5', title: '5 Red Flags When Renting an Apartment', category: 'Property Guide', date: 'April 25, 2026' },
    { id: '6', title: 'The Ultimate Checklist for Buying Used Laptops', category: 'Electronics Guide', date: 'April 20, 2026' },
    { id: '7', title: 'How Our Moderation System Keeps You Safe', category: 'Safety & Trust', date: 'April 15, 2026' },
    { id: '8', title: 'Selling Handmade Goods: A Starter Guide', category: 'Seller Tips', date: 'April 10, 2026' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Blog & Help Center</h1>
          <p className={styles.subtitle}>Insights, guides, and tips for buying and selling safely.</p>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search articles, guides..." className={styles.searchInput} />
            <button className={styles.searchBtn}>Search</button>
          </div>
        </div>
      </header>

      <section className={styles.mainSection}>
        <div className={styles.contentArea}>
          <div className={styles.sectionHeader}>
            <h2>Featured Articles</h2>
          </div>
          
          <div className={styles.featuredGrid}>
            {featuredPosts.map((post) => (
              <article key={post.id} className={styles.featuredCard}>
                <Link href={`/blog/${post.id}`}>
                  <div className={styles.cardImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} />
                    <span className={styles.categoryBadge}>{post.category}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.postDate}>{post.date}</p>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <span className={styles.readMore}>Read Article →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.supportSection}>
            <h2>Need More Help?</h2>
            <div className={styles.supportGrid}>
              <div className={styles.supportCard}>
                <div className={styles.iconWrapper}>🛡️</div>
                <h3>Trust & Safety</h3>
                <p>Learn about our community guidelines and how to stay safe while trading.</p>
                <Link href="/safety" className={styles.supportLink}>Visit Safety Center</Link>
              </div>
              <div className={styles.supportCard}>
                <div className={styles.iconWrapper}>💬</div>
                <h3>Contact Support</h3>
                <p>Have an issue with an ad, payment, or user? Our team is here to help.</p>
                <Link href="/contact" className={styles.supportLink}>Contact Us</Link>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.widget}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              <li><Link href="#">Safety & Trust <span>(12)</span></Link></li>
              <li><Link href="#">Buying Guides <span>(24)</span></Link></li>
              <li><Link href="#">Selling Guides <span>(18)</span></Link></li>
              <li><Link href="#">Platform Updates <span>(8)</span></Link></li>
              <li><Link href="#">Market Trends <span>(15)</span></Link></li>
            </ul>
          </div>

          <div className={styles.widget}>
            <h3>Recent Articles</h3>
            <ul className={styles.recentList}>
              {recentArticles.map((article) => (
                <li key={article.id}>
                  <Link href={`/blog/${article.id}`}>
                    <span className={styles.recentTitle}>{article.title}</span>
                    <span className={styles.recentDate}>{article.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.subscribeWidget}>
            <h3>Subscribe to Newsletter</h3>
            <p>Get the latest tips and market trends delivered to your inbox.</p>
            <input type="email" placeholder="Your email address" className={styles.subscribeInput} />
            <button className={styles.subscribeBtn}>Subscribe</button>
          </div>
        </aside>
      </section>
    </div>
  );
}
