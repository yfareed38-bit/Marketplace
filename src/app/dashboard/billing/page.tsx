import React from 'react';
import styles from './page.module.css';

export const metadata = {
  title: 'Billing & Payments | Dashboard | Marketplace',
  description: 'Manage your payment methods, view transaction history, and billing settings.',
};

export default function BillingPage() {
  const transactions = [
    { id: 'TRX-9821', date: 'May 15, 2026', description: 'Premium Ad Feature (7 days)', amount: 'Rs 1,500', status: 'Completed' },
    { id: 'TRX-9745', date: 'May 02, 2026', description: 'Urgent Tag for iPhone Ad', amount: 'Rs 500', status: 'Completed' },
    { id: 'TRX-9630', date: 'April 18, 2026', description: 'Monthly Pro Membership', amount: 'Rs 4,999', status: 'Completed' },
    { id: 'TRX-9512', date: 'March 18, 2026', description: 'Monthly Pro Membership', amount: 'Rs 4,999', status: 'Completed' },
  ];

  const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
    { id: '2', type: 'Mastercard', last4: '8811', expiry: '08/27', isDefault: false },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Billing & Payments</h1>
        <p className={styles.subtitle}>Manage your payment methods and view billing history.</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.mainColumn}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Payment Methods</h2>
              <button className={styles.addBtn}>+ Add New</button>
            </div>
            
            <div className={styles.methodsList}>
              {paymentMethods.map(method => (
                <div key={method.id} className={`${styles.methodCard} ${method.isDefault ? styles.defaultMethod : ''}`}>
                  <div className={styles.methodIcon}>
                    {method.type === 'Visa' ? '💳' : '🏦'}
                  </div>
                  <div className={styles.methodInfo}>
                    <p className={styles.methodName}>{method.type} ending in {method.last4}</p>
                    <p className={styles.methodExpiry}>Expires {method.expiry}</p>
                  </div>
                  <div className={styles.methodActions}>
                    {method.isDefault ? (
                      <span className={styles.defaultBadge}>Default</span>
                    ) : (
                      <button className={styles.makeDefaultBtn}>Make Default</button>
                    )}
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Transaction History</h2>
              <button className={styles.downloadBtn}>Download Invoices</button>
            </div>
            
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(trx => (
                    <tr key={trx.id}>
                      <td className={styles.trxId}>{trx.id}</td>
                      <td>{trx.date}</td>
                      <td>{trx.description}</td>
                      <td className={styles.amount}>{trx.amount}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <h3>Current Plan</h3>
            <div className={styles.planDetails}>
              <div className={styles.planHeader}>
                <span className={styles.planName}>Pro Membership</span>
                <span className={styles.planPrice}>Rs 4,999<span>/mo</span></span>
              </div>
              <ul className={styles.planFeatures}>
                <li>✓ 50 Active Ads</li>
                <li>✓ 5 Free Feature Tags/mo</li>
                <li>✓ Priority Support</li>
                <li>✓ Advanced Analytics</li>
              </ul>
              <div className={styles.renewalInfo}>
                <p>Next billing date: <strong>June 18, 2026</strong></p>
              </div>
            </div>
            <div className={styles.planActions}>
              <button className={styles.primaryBtn}>Upgrade Plan</button>
              <button className={styles.secondaryBtn}>Cancel Subscription</button>
            </div>
          </div>

          <div className={styles.creditsCard}>
            <h3>Ad Credits</h3>
            <div className={styles.creditsBalance}>
              <span className={styles.creditsAmount}>1,200</span>
              <span className={styles.creditsLabel}>Credits Available</span>
            </div>
            <p className={styles.creditsText}>Use credits to boost your ads or purchase premium features.</p>
            <button className={styles.buyCreditsBtn}>Buy More Credits</button>
          </div>
        </div>
      </div>
    </div>
  );
}
