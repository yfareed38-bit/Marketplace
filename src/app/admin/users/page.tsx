import React from 'react';
import { getAllUsers } from '@/actions/admin';
import styles from '../page.module.css';

export const metadata = {
  title: 'Users Management | Admin Panel',
};

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const usersRes = await getAllUsers();
  const usersList = usersRes.success && usersRes.data ? usersRes.data : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <p>Manage platform users, roles, and account statuses.</p>
      </div>
      
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>All Users</h2>
          <button className={styles.approveBtn}>+ Add Admin</button>
        </div>
        
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Ads Posted</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              usersList.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.name || 'Unknown User'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      backgroundColor: user.role === 'ADMIN' ? 'var(--primary-light)' : '#f1f5f9',
                      color: user.role === 'ADMIN' ? 'var(--primary)' : 'var(--foreground)'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user._count?.listings || 0}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className={styles.actionBtn}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
