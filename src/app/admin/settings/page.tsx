'use client';

import React, { useState, useEffect } from 'react';
import { getDynamicCategories } from '@/actions/listings';
import { createCategory, updateCategory, deleteCategory } from '@/actions/admin';
import styles from '../page.module.css';

export default function SettingsPage() {
  // General Site Settings (Simulated)
  const [siteName, setSiteName] = useState('Marketplace Platform');
  const [supportEmail, setSupportEmail] = useState('support@marketplace.com');
  const [maintenance, setMaintenance] = useState('off');

  // Dynamic Category CRUD States
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  
  // Category Editing States
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatName, setEditingCatName] = useState('');
  const [editingCatIcon, setEditingCatIcon] = useState('');
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadCategories = async () => {
    setLoadingCats(true);
    const res = await getDynamicCategories();
    if (res.success && res.data) {
      setCategories(res.data);
    }
    setLoadingCats(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('General Settings successfully saved.');
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    
    setError('');
    setMessage('');
    const res = await createCategory(newCatName, newCatIcon || undefined);
    if (res.success) {
      setMessage(`Category "${newCatName}" created successfully.`);
      setNewCatName('');
      setNewCatIcon('');
      loadCategories();
    } else {
      setError(res.error || 'Failed to create category.');
    }
  };

  const handleStartEdit = (cat: any) => {
    setEditingCatId(cat.id);
    setEditingCatName(cat.name);
    setEditingCatIcon(cat.icon || '');
  };

  const handleCancelEdit = () => {
    setEditingCatId(null);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCatId || !editingCatName) return;

    setError('');
    setMessage('');
    const res = await updateCategory(editingCatId, editingCatName, editingCatIcon || undefined);
    if (res.success) {
      setMessage('Category updated successfully.');
      setEditingCatId(null);
      loadCategories();
    } else {
      setError(res.error || 'Failed to update category.');
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

    setError('');
    setMessage('');
    const res = await deleteCategory(id);
    if (res.success) {
      setMessage(`Category "${name}" deleted successfully.`);
      loadCategories();
    } else {
      setError(res.error || 'Failed to delete category.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>System Settings</h1>
        <p>Configure global platform settings, SEO, and integrations.</p>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '1.5rem', fontWeight: 'bold' }}>{error}</div>}
      {message && <div style={{ color: '#10b981', marginBottom: '1.5rem', fontWeight: 'bold' }}>{message}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: General Configuration */}
        <div className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>General Configurations</h2>
          </div>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Site Name</label>
              <input 
                type="text" 
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'var(--background)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Support Email</label>
              <input 
                type="email" 
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'var(--background)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Maintenance Mode</label>
              <select 
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'var(--background)' }}
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

        {/* Right Column: Dynamic Category CRUD */}
        <div className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>Manage Categories</h2>
          </div>

          <div style={{ padding: '1rem' }}>
            {/* Add/Edit Category Form */}
            {!editingCatId ? (
              <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Category Name (e.g. Books)" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  style={{ flex: 2, minWidth: '150px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'var(--background)' }}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Emoji Icon (e.g. 📚)" 
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  style={{ flex: 1, minWidth: '100px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'var(--background)' }}
                />
                <button type="submit" className={styles.approveBtn} style={{ height: '38px', whiteSpace: 'nowrap' }}>+ Add</button>
              </form>
            ) : (
              <form onSubmit={handleUpdateCategory} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '100%', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem', color: '#475569' }}>Editing Category</div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={editingCatName}
                  onChange={(e) => setEditingCatName(e.target.value)}
                  style={{ flex: 2, minWidth: '120px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'var(--background)' }}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Icon" 
                  value={editingCatIcon}
                  onChange={(e) => setEditingCatIcon(e.target.value)}
                  style={{ flex: 1, minWidth: '80px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'var(--background)' }}
                />
                <div style={{ display: 'flex', gap: '0.25rem', width: '100%', marginTop: '0.5rem' }}>
                  <button type="submit" className={styles.approveBtn} style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Save</button>
                  <button type="button" onClick={handleCancelEdit} style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: '#94a3b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            )}

            {/* Categories List */}
            {loadingCats ? (
              <div>Loading categories...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {categories.length === 0 ? (
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>No categories created yet.</div>
                ) : (
                  categories.map((cat: any) => (
                    <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontWeight: 500, color: 'var(--foreground)' }}>
                        <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>{cat.icon || '📁'}</span>
                        {cat.name}
                      </span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button 
                          onClick={() => handleStartEdit(cat)} 
                          style={{ border: 'none', background: '#e2e8f0', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id, cat.name)} 
                          style={{ border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
