'use client';

import React, { useState } from 'react';
import styles from './CampaignForm.module.css';

interface CampaignFormProps {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}

export default function CampaignForm({ onSubmit, initialData }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    channel: initialData?.channel || 'Email',
    budget: initialData?.budget || 100,
    status: initialData?.status || 'active',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
         name: '',
         channel: 'Email',
         budget: 100,
         status: 'active',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{initialData ? 'Modifier la Campagne' : 'Nouvelle Campagne'}</h2>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nom de la campagne</label>
          <input 
            className={styles.input} 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            placeholder="Ex: Summer Sale 2026"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Canal</label>
          <select 
            className={styles.input}
            value={formData.channel}
            onChange={(e) => setFormData({...formData, channel: e.target.value})}
          >
            <option value="Email">Email</option>
            <option value="Social Media">Social Media</option>
            <option value="PPC">PPC</option>
            <option value="SEO">SEO</option>
            <option value="Referral">Referral</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Budget ($)</label>
          <input 
            className={styles.input} 
            type="number" 
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
            required
            min={0}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Statutinitial</label>
          <select 
             className={styles.input}
             value={formData.status}
             onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button 
           type="submit" 
           className={styles.btnSubmit}
           disabled={loading}
        >
          {loading ? 'CHARGEMENT...' : initialData ? 'METTRE À JOUR' : 'CRÉER LA CAMPAGNE'}
        </button>
      </div>
    </form>
  );
}
