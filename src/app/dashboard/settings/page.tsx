import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateProfile } from '@/actions/dashboard';
import { revalidatePath } from 'next/cache';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function DashboardSettings() {
  const session = await getServerSession(authOptions);
  
  async function handleUpdate(formData: FormData) {
    'use server';
    await updateProfile(formData);
    revalidatePath('/dashboard/settings');
  }

  const user = session?.user as any;
  const nameParts = user?.name ? user.name.split(' ') : ['User', ''];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Settings</h1>

      <div className={styles.sections}>
        {/* Avatar */}
        <section className={styles.card}>
          <h2>Profile Photo</h2>
          <div className={styles.avatarRow}>
            <div className={styles.avatar}>{user?.name ? user.name.charAt(0) : 'U'}</div>
            <div>
              <button className={styles.uploadBtn}>Upload New Photo</button>
              <p>JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
        </section>

        {/* Personal Info */}
        <section className={styles.card}>
          <h2>Personal Information</h2>
          <form action={handleUpdate}>
            <div className={styles.formGrid}>
              <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                <label>Full Name</label>
                <input type="text" name="name" defaultValue={user?.name || ''} required />
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <input type="email" defaultValue={user?.email || ''} readOnly style={{ opacity: 0.7 }} />
              </div>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input type="tel" defaultValue="+92 300 1234567" />
              </div>
              <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                <label>Location / City</label>
                <input type="text" defaultValue="Islamabad, Pakistan" />
              </div>
            </div>
            <button type="submit" className={styles.saveBtn}>Save Changes</button>
          </form>
        </section>

        {/* Security */}
        <section className={styles.card}>
          <h2>Security</h2>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className={styles.field}>
              <label>New Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
          </div>
          <button className={styles.saveBtn}>Update Password</button>
        </section>

        {/* Danger Zone */}
        <section className={`${styles.card} ${styles.danger}`}>
          <h2>Danger Zone</h2>
          <p>Permanently delete your account and all associated data.</p>
          <button className={styles.deleteBtn}>Delete Account</button>
        </section>
      </div>
    </div>
  );
}
