'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState("Marketplace Platform");
  const [supportEmail, setSupportEmail] = useState("support@marketplace.com");
  const [maintenance, setMaintenance] = useState("off");
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Since there is no Global Settings DB table, we just simulate saving it.
    alert("System Settings successfully saved.");
  };

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
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Site Name</label>
            <input 
              type="text" 
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Support Email</label>
            <input 
              type="email" 
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Maintenance Mode</label>
            <select 
              value={maintenance}
              onChange={(e) => setMaintenance(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <option value="off">Disabled (Site Live)</option>
              <option value="on">Enabled</option>
            </select>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className={styles.approveBtn}>Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
}
