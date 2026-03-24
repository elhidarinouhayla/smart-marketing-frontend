'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/axios';
import styles from './RecommendationGenerator.module.css';

interface RecommendationGeneratorProps {
  onSuccess: () => void;
}

export default function RecommendationGenerator({ onSuccess }: RecommendationGeneratorProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    campaign_id: '',
    probability: 0.75,
    prediction: 1,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('campaigns/');
        setCampaigns(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, campaign_id: response.data[0].id }));
        }
      } catch (err) {
        console.error('Error fetching campaigns for recommendation:', err);
      }
    };
    fetchCampaigns();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await api.post('recommendations/generate', formData);
      setResult(response.data);
      onSuccess();
    } catch (err) {
      console.error('Error generating recommendation:', err);
      alert('Erreur lors de la génération.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Génération d'Insights Gemini AI</h2>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Sélectionnez une campagne</label>
          <select 
            className={styles.input}
            value={formData.campaign_id}
            onChange={(e) => setFormData({...formData, campaign_id: e.target.value})}
            required
          >
            {campaigns.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Probabilité actuelle</label>
          <input 
            className={styles.input} 
            type="number" 
            step="0.01"
            value={formData.probability}
            onChange={(e) => setFormData({...formData, probability: Number(e.target.value)})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Prédiction (0/1)</label>
          <select 
            className={styles.input}
            value={formData.prediction}
            onChange={(e) => setFormData({...formData, prediction: Number(e.target.value)})}
          >
             <option value={1}>Succès</option>
             <option value={0}>Échec</option>
          </select>
        </div>

        <button 
           type="submit" 
           className={styles.btnSubmit}
           disabled={loading || campaigns.length === 0}
        >
          {loading ? 'GÉNÉRATION DES CONSEILS...' : 'OBTENIR DES RECOMMANDATIONS AI'}
        </button>

        {result && (
          <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>Conseil Stratégique</h3>
            <p className={styles.advice}>{result.advice_text}</p>
          </div>
        )}
      </div>
    </form>
  );
}
