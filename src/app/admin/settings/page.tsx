import React from 'react';
import styles from '../page.module.css';

export const metadata = {
  title: 'System Settings | Admin Panel',
};

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>System Settings</h1>
        <p>Configure global platform settings, SEO, and integrations.</p>
      </div>
      
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>General Configurations</h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Site Name</label>
            <input 
              type="text" 
              defaultValue="Marketplace Platform" 
              style={{ width: '100%', maxWidth: '400px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Support Email</label>
            <input 
              type="email" 
              defaultValue="support@marketplace.com" 
              style={{ width: '100%', maxWidth: '400px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Maintenance Mode</label>
            <select style={{ width: '100%', maxWidth: '400px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <option value="off">Disabled (Site Live)</option>
              <option value="on">Enabled</option>
            </select>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button className={styles.approveBtn}>Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
