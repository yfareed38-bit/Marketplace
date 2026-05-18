import React from 'react';
import styles from './page.module.css';

const TIPS = [
  {
    icon: '🔍',
    title: 'Verify Before You Buy',
    body: 'Always inspect items in person before making payment. Ask for original receipts, warranty cards, or documentation. For vehicles, request a CNIC-verified ownership transfer.',
  },
  {
    icon: '🏦',
    title: 'Use Safe Payment Methods',
    body: 'Never send cash by courier or pay via gift cards. Use bank transfer or meet in person. Our Escrow feature holds funds securely until the deal is confirmed.',
  },
  {
    icon: '📍',
    title: 'Meet in Safe Public Places',
    body: 'Arrange meetings in well-lit, busy public areas. Consider police stations, bank lobbies, or shopping malls. Never invite strangers to your home for first meetings.',
  },
  {
    icon: '🚩',
    title: 'Recognise Red Flags',
    body: 'Be wary of prices that seem too good to be true, sellers who refuse to meet in person, or buyers who insist on unusual payment methods. Trust your instincts.',
  },
  {
    icon: '📞',
    title: 'Keep Communication on Platform',
    body: 'Use our built-in chat to keep a record of all conversations. This protects you in the event of a dispute and helps our moderation team investigate reports.',
  },
  {
    icon: '🛡️',
    title: 'Report Suspicious Activity',
    body: 'Use the "Report Ad" button on any listing. Our moderation team reviews all reports within 24 hours. Repeat offenders are permanently banned from the platform.',
  },
];

export default function SafetyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <span className={styles.heroIcon}>🛡️</span>
        <h1>Safety Center</h1>
        <p>Your safety is our highest priority. Read these guidelines before every transaction.</p>
      </div>

      <div className={styles.tipsGrid}>
        {TIPS.map((tip) => (
          <div key={tip.title} className={styles.tipCard}>
            <span className={styles.icon}>{tip.icon}</span>
            <h3>{tip.title}</h3>
            <p>{tip.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.reportBox}>
        <h2>Encountered a Problem?</h2>
        <p>Our trust & safety team is available 24/7. Report abuse, scams, or suspicious listings immediately.</p>
        <a href="/contact" className={styles.reportBtn}>Contact Safety Team</a>
      </div>
    </div>
  );
}
