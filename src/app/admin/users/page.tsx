'use client';

import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '@/actions/admin';
import styles from '../page.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    const res = await getAllUsers();
    if (res.success && res.data) {
      setUsers(res.data);
    } else {
      setError(res.error || 'Failed to load users');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!confirm(`Are you sure you want to change user role to ${nextRole}?`)) return;

    setError('');
    setMessage('');
    const res = await updateUserRole(userId, nextRole);
    if (res.success) {
      setMessage('User role updated successfully');
      loadUsers();
    } else {
      setError(res.error || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete user "${name}" and all their listings?`)) return;

    setError('');
    setMessage('');
    const res = await deleteUser(userId);
    if (res.success) {
      setMessage('User deleted successfully');
      loadUsers();
    } else {
      setError(res.error || 'Failed to delete user');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <p>Manage platform users, roles, and account statuses.</p>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}
      {message && <div style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 'bold' }}>{message}</div>}
      
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>All Users</h2>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</div>
        ) : (
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.name || 'Unknown User'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        backgroundColor: user.role === 'ADMIN' ? '#dbeafe' : '#f1f5f9',
                        color: user.role === 'ADMIN' ? '#2563eb' : 'var(--foreground)'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user._count?.listings || 0}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleToggleRole(user.id, user.role)} 
                        className={styles.approveBtn}
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        Toggle Role
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id, user.name || user.email)} 
                        className={styles.rejectBtn}
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: '#ef4444' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
