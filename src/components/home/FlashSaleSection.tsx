'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './FlashSaleSection.module.css';

const FLASH_PRODUCTS = [
  {
    id: 'flash_1',
    title: 'Wireless Bluetooth Earbuds Pro 5.3',
    originalPrice: 8500,
    price: 4999,
    discount: 41,
    imageIcon: '🎧',
    itemsLeft: 12,
    totalItems: 40,
  },
  {
    id: 'flash_2',
    title: 'Fast Charger 65W GaN Multi-Port',
    originalPrice: 4500,
    price: 2999,
    discount: 33,
    imageIcon: '🔌',
    itemsLeft: 5,
    totalItems: 25,
  },
  {
    id: 'flash_3',
    title: 'Ultra Smart Watch Series 9 GPS',
    originalPrice: 12000,
    price: 7999,
    discount: 33,
    imageIcon: '⌚',
    itemsLeft: 18,
    totalItems: 30,
  },
  {
    id: 'flash_4',
    title: 'Power Bank 20,000mAh PD Fast',
    originalPrice: 6500,
    price: 4499,
    discount: 30,
    imageIcon: '🔋',
    itemsLeft: 22,
    totalItems: 50,
  },
];

export default function FlashSaleSection() {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown loop for demo
          return { hours: 4, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <section className={styles.flashContainer}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.flashIcon}>⚡</span>
          <h2>FLASH SALE</h2>
          <div className={styles.timerBox}>
            <span className={styles.timerText}>On Sale Now</span>
            <div className={styles.countdown}>
              <span>{formatNum(timeLeft.hours)}</span>:
              <span>{formatNum(timeLeft.minutes)}</span>:
              <span>{formatNum(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
        <Link href="/browse" className={styles.viewMore}>SHOP ALL DEALS &gt;</Link>
      </div>

      <div className={styles.productsGrid}>
        {FLASH_PRODUCTS.map((prod) => {
          const percentSold = Math.round(((prod.totalItems - prod.itemsLeft) / prod.totalItems) * 100);
          return (
            <div key={prod.id} className={styles.productCard}>
              <span className={styles.discountBadge}>-{prod.discount}%</span>
              <div className={styles.productIconWrapper}>{prod.imageIcon}</div>
              
              <div className={styles.details}>
                <Link href={`/product/${prod.id}`} className={styles.title}>
                  {prod.title}
                </Link>
                <div className={styles.priceRow}>
                  <span className={styles.salePrice}>Rs {prod.price.toLocaleString()}</span>
                  <span className={styles.originalPrice}>Rs {prod.originalPrice.toLocaleString()}</span>
                </div>

                <div className={styles.stockStatus}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${percentSold}%` }}></div>
                  </div>
                  <div className={styles.stockTexts}>
                    <span>{prod.itemsLeft} items left</span>
                  </div>
                </div>

                <button 
                  className={styles.addCartBtn}
                  onClick={() => addToCart({ id: prod.id, title: prod.title, price: prod.price })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
