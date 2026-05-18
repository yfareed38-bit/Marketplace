'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/browse', label: 'Browse Ads' },
  { href: '/categories', label: 'Categories' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/safety', label: 'Safety' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className={`${styles.header} glass`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span>Market</span>place
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {session ? (
            <>
              <Link href="/dashboard" className={styles.dashLink}>Dashboard</Link>
              <button onClick={() => signOut()} className={styles.loginBtn}>Sign Out</button>
            </>
          ) : (
            <Link href="/login" className={styles.loginBtn}>Sign In</Link>
          )}
          <Link href="/post-ad" className={styles.postBtn}>+ Post Ad</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
