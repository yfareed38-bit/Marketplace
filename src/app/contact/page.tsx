import React from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>Our team is here to help. Reach out through any channel below.</p>
      </div>

      <div className={styles.grid}>
        {/* Contact Info */}
        <div className={styles.info}>
          <h2>Get in Touch</h2>
          <p>We typically respond within 2–4 business hours.</p>

          <div className={styles.channels}>
            <div className={styles.channel}><span>📧</span><div><h4>Email</h4><p>support@marketplace.com</p></div></div>
            <div className={styles.channel}><span>💬</span><div><h4>Live Chat</h4><p>Available 9am – 9pm PKT</p></div></div>
            <div className={styles.channel}><span>📞</span><div><h4>Phone</h4><p>+92 300 1234567</p></div></div>
            <div className={styles.channel}><span>🏢</span><div><h4>Office</h4><p>Blue Area, Islamabad, Pakistan</p></div></div>
          </div>
        </div>

        {/* Contact Form */}
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="john@example.com" required />
          </div>
          <div className={styles.formGroup}>
            <label>Subject</label>
            <select>
              <option>General Inquiry</option>
              <option>Report a Scam</option>
              <option>Account Issue</option>
              <option>Billing</option>
              <option>Partnership</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea rows={6} placeholder="Describe your issue or question in detail…"></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
