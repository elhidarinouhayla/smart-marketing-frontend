'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/axios';
import styles from './PredictionForm.module.css';

interface PredictionFormProps {
  onSuccess: () => void;
}

export default function PredictionForm({ onSuccess }: PredictionFormProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    campaign_id: '',
    Age: 30,
    Income: 50000.0,
    WebsiteVisits: 5,
    SocialShares: 1,
    Gender: 'Male',
    CampaignChannel: 'Email',
    CampaignType: 'Promotion',
    AdvertisingPlatform: 'Google',
    AdvertisingTool: 'AdsManager',
    SegmentName: 'Engaged_Clicker',
    AdSpend: 100.0,
    ClickThroughRate: 0.05,
    PagesPerVisit: 4.0,
    TimeOnSite: 60.0,
    EmailOpens: 2,
    EmailClicks: 1,
    PreviousPurchases: 2,
    LoyaltyPoints: 100,
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
        console.error('Error fetching campaigns for prediction:', err);
      }
    };
    fetchCampaigns();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await api.post('predictions/', formData);
      setResult(response.data);
      onSuccess();
    } catch (err) {
      console.error('Error running prediction:', err);
      alert('Erreur lors de la prédiction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Lancer une Prédiction IA</h2>
      
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
          <label className={styles.label}>Canal de diffusion</label>
          <select 
            className={styles.input}
            value={formData.CampaignChannel}
            onChange={(e) => setFormData({...formData, CampaignChannel: e.target.value})}
          >
            <option value="Email">Email</option>
            <option value="Social Media">Social Media</option>
            <option value="PPC">PPC</option>
            <option value="SEO">SEO</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Âge cible</label>
          <input 
            className={styles.input} 
            type="number" 
            value={formData.Age}
            onChange={(e) => setFormData({...formData, Age: Number(e.target.value)})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Revenu annuel ($)</label>
          <input 
            className={styles.input} 
            type="number" 
            value={formData.Income}
            onChange={(e) => setFormData({...formData, Income: Number(e.target.value)})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Genre</label>
          <select 
            className={styles.input}
            value={formData.Gender}
            onChange={(e) => setFormData({...formData, Gender: e.target.value})}
          >
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
          </select>
        </div>

        <button 
           type="submit" 
           className={styles.btnSubmit}
           disabled={loading || campaigns.length === 0}
        >
          {loading ? 'CALCUL EN COURS...' : 'PRÉDIRE LE SUCCÈS'}
        </button>

        {result && (
          <div className={`${styles.resultCard} ${result.success ? styles.success : styles.failure}`}>
            <h3 className={styles.resultTitle}>
              Résultat: {(result.probability * 100).toFixed(1)}% de probabilité
            </h3>
            <p className={styles.resultMsg}>{result.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}
