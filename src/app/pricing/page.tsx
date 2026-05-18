import React from 'react';
import styles from './page.module.css';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Great for casual sellers',
    features: ['5 active listings', 'Standard visibility', 'Basic analytics', 'Community support'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/ month',
    description: 'For active sellers',
    features: ['50 active listings', 'Featured badge', 'Priority placement', 'Advanced analytics', 'Email support', 'WhatsApp integration'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Business',
    price: '$29',
    period: '/ month',
    description: 'For power sellers & businesses',
    features: ['Unlimited listings', 'Top placement daily', 'Verified business badge', 'Dedicated account manager', '24/7 priority support', 'Custom storefront'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the plan that fits your selling goals. Upgrade or downgrade at any time.</p>
      </div>

      <div className={styles.plansGrid}>
        {PLANS.map((plan) => (
          <div key={plan.name} className={`${styles.planCard} ${plan.highlight ? styles.planHighlight : ''}`}>
            {plan.highlight && <span className={styles.popularBadge}>Most Popular</span>}
            <h2>{plan.name}</h2>
            <p className={styles.desc}>{plan.description}</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>{plan.price}</span>
              <span className={styles.period}>{plan.period}</span>
            </div>
            <ul className={styles.features}>
              {plan.features.map((f) => (
                <li key={f}><span>✓</span> {f}</li>
              ))}
            </ul>
            <button className={`${styles.cta} ${plan.highlight ? styles.ctaHighlight : ''}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
