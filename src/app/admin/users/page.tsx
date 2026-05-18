import React from 'react';
import styles from '../page.module.css';

export const metadata = {
  title: 'Users Management | Admin Panel',
};

export default function UsersPage() {
  const usersList = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active' },
    { id: '3', name: 'Bad Actor', email: 'bad@example.com', role: 'User', status: 'Suspended' },
  ];

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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={user.status === 'Active' ? styles.statusPending : styles.trendDown}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
