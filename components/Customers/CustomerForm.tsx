'use client';

import React, { useState } from 'react';
import api from '@/lib/axios';
import styles from './CustomerForm.module.css';

interface CustomerFormProps {
  onSuccess: () => void;
}

export default function CustomerForm({ onSuccess }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    age: 30,
    income: 50000.0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('customers/', formData);
      setFormData({ age: 30, income: 50000.0 });
      onSuccess();
    } catch (err) {
      console.error('Error creating customer:', err);
      alert('Erreur lors de l\'ajout du client.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Nouveau Client</h2>
      
      <form className={styles.formGrid} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Âge</label>
          <input 
            className={styles.input} 
            type="number" 
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
            required
            min={18}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Revenu Annuel ($)</label>
          <input 
            className={styles.input} 
            type="number" 
            value={formData.income}
            onChange={(e) => setFormData({...formData, income: Number(e.target.value)})}
            required
            min={0}
          />
        </div>

        <button 
           type="submit" 
           className={styles.btnSubmit}
           disabled={loading}
        >
          {loading ? 'AJOUT...' : 'AJOUTER LE CLIENT'}
        </button>
      </form>
    </div>
  );
}
