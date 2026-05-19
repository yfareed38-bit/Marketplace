'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import styles from './Header.module.css';

const PAKISTAN_CITIES = [
  'Pakistan',
  'Karachi, Sindh',
  'Lahore, Punjab',
  'Islamabad, Capital',
  'Rawalpindi, Punjab',
  'Faisalabad, Punjab',
  'Multan, Punjab',
  'Peshawar, KPK',
  'Quetta, Balochistan',
  'Sialkot, Punjab',
  'Gujranwala, Punjab'
];

const CATEGORIES_LIST = [
  { href: '/browse?category=Mobiles', label: 'Mobile Phones' },
  { href: '/browse?category=Cars', label: 'Cars' },
  { href: '/browse?category=Bikes', label: 'Motorcycles' },
  { href: '/browse?category=Property', label: 'Houses' },
  { href: '/browse?category=Electronics', label: 'Video-Audios' },
  { href: '/browse?category=Electronics', label: 'Tablets' },
  { href: '/browse?category=Property', label: 'Land & Plots' },
];

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState('Pakistan');
  const [showLocations, setShowLocations] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);

  // Sync initial query values from URL if present
  useEffect(() => {
    const q = searchParams.get('query');
    const loc = searchParams.get('location');
    if (q) setSearchQuery(q);
    if (loc) setLocation(loc);
  }, [searchParams]);

  // Handle outside click to close location dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocations(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (location && location !== 'Pakistan') params.set('location', location);
    
    // Also keep category if present in url
    const currentCategory = searchParams.get('category');
    if (currentCategory) params.set('category', currentCategory);

    router.push(`/browse?${params.toString()}`);
  };

  const selectLocation = (city: string) => {
    setLocation(city);
    setShowLocations(false);
    
    // Auto trigger search filter if location changes
    const params = new URLSearchParams(searchParams.toString());
    if (city === 'Pakistan') {
      params.delete('location');
    } else {
      params.set('location', city);
    }
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <header className={styles.headerContainer}>
      {/* 1. Top Bar: Sub-brands and Login/Sell */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topLinks}>
            <Link href="/" className={styles.topLink} style={{ color: 'var(--primary)', fontWeight: 700, gap: '0.25rem' }}>
              <span>🛍️</span> MarketX
            </Link>
            <Link href="/browse?category=Cars" className={styles.topLink}>
              <span>🚗</span> Motors
            </Link>
            <Link href="/browse?category=Property" className={styles.topLink}>
              <span>🏢</span> Property
            </Link>
          </div>
          
          <div className={styles.topActions}>
            {session ? (
              <>
                <Link href="/dashboard" className={styles.topLink} style={{ fontWeight: 700 }}>
                  👤 Dashboard
                </Link>
                <span onClick={() => signOut()} className={styles.loginLink}>
                  Sign Out
                </span>
              </>
            ) : (
              <Link href="/login" className={styles.loginLink}>
                Login
              </Link>
            )}
            
            <Link href="/post-ad" className={styles.sellBtn}>
              <span style={{ fontSize: '1.1rem', marginRight: '2px' }}>+</span>
              <span>SELL</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Nav Row: Brand Logo, Location Box, Search Bar */}
      <div className={styles.mainNavRow}>
        {/* Custom Premium Brand Logo */}
        <Link href="/" className={styles.logoArea}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white', 
              fontWeight: '800', 
              fontSize: '1.25rem',
              boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
            }}>
              M
            </div>
            <span style={{ fontWeight: '800', fontSize: '1.45rem', color: 'var(--foreground)', letterSpacing: '-0.5px' }}>
              Market<span style={{ color: 'var(--primary)' }}>place</span>
            </span>
          </div>
        </Link>

        <form onSubmit={handleSearchSubmit} className={styles.searchSection}>
          {/* Location Dropdown Selection */}
          <div className={styles.locationWrapper} ref={locationRef}>
            <div 
              className={styles.locationInputBox} 
              onClick={() => setShowLocations(!showLocations)}
            >
              <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>📍</span>
              <input 
                type="text" 
                value={location} 
                readOnly 
                placeholder="Search location"
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>▼</span>
            </div>
            
            {showLocations && (
              <div className={styles.locationDropdown}>
                {PAKISTAN_CITIES.map((city) => (
                  <div 
                    key={city} 
                    className={styles.locationItem}
                    onClick={() => selectLocation(city)}
                  >
                    <span>📍</span> {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Search Input */}
          <div className={styles.searchBoxWrapper}>
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Find Cars, Mobile Phones and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Bottom Row: Category bar */}
      <div className={styles.categoryBarRow}>
        <div className={styles.categoryContainer}>
          <div 
            className={styles.allCategoriesMenu}
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            <span>ALL CATEGORIES</span>
            <span style={{ fontSize: '0.75rem' }}>▼</span>
          </div>

          <nav className={styles.navLinksList} aria-label="Quick category navigation">
            {CATEGORIES_LIST.map((cat, idx) => (
              <Link key={idx} href={cat.href} className={styles.navLinkItem}>
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
