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
    <div className={styles.root}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Lancer une prédiction</h2>
        
        <div className={styles.formGrid}>
          {/* All 18 fields */}
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
            <label className={styles.label}>Type de Campagne</label>
            <select 
              className={styles.input}
              value={formData.CampaignType}
              onChange={(e) => setFormData({...formData, CampaignType: e.target.value})}
            >
              <option value="Promotion">Promotion</option>
              <option value="Branding">Branding</option>
              <option value="Lead Generation">Lead Generation</option>
              <option value="Retention">Réception / Fidélisation</option>
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
            <label className={styles.label}>Plateforme Publicitaire</label>
            <select 
              className={styles.input}
              value={formData.AdvertisingPlatform}
              onChange={(e) => setFormData({...formData, AdvertisingPlatform: e.target.value})}
            >
              <option value="Google">Google</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Outil Publicitaire</label>
            <select 
              className={styles.input}
              value={formData.AdvertisingTool}
              onChange={(e) => setFormData({...formData, AdvertisingTool: e.target.value})}
            >
              <option value="AdsManager">AdsManager</option>
              <option value="GoogleAds">Google Ads</option>
              <option value="LinkedInAds">LinkedIn Ads</option>
              <option value="TikTokAds">TikTok Ads</option>
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

          <div className={styles.formGroup}>
            <label className={styles.label}>Dépenses Ad ($)</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.AdSpend}
              step="0.01"
              onChange={(e) => setFormData({...formData, AdSpend: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CTR (%)</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.ClickThroughRate}
              step="0.001"
              onChange={(e) => setFormData({...formData, ClickThroughRate: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Visites Site Web</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.WebsiteVisits}
              onChange={(e) => setFormData({...formData, WebsiteVisits: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Pages par Visite</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.PagesPerVisit}
              step="0.1"
              onChange={(e) => setFormData({...formData, PagesPerVisit: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Temps sur Site (min)</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.TimeOnSite}
              step="0.1"
              onChange={(e) => setFormData({...formData, TimeOnSite: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Partages Sociaux</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.SocialShares}
              onChange={(e) => setFormData({...formData, SocialShares: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ouvertures Email</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.EmailOpens}
              onChange={(e) => setFormData({...formData, EmailOpens: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Clics Email</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.EmailClicks}
              onChange={(e) => setFormData({...formData, EmailClicks: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Achats Précédents</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.PreviousPurchases}
              onChange={(e) => setFormData({...formData, PreviousPurchases: Number(e.target.value)})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Segment Client</label>
            <select 
              className={styles.input}
              value={formData.SegmentName}
              onChange={(e) => setFormData({...formData, SegmentName: e.target.value})}
            >
              <option value="Engaged_Clicker">Engaged Clicker</option>
              <option value="High_Value">High Value</option>
              <option value="Churn_Risk">Churn Risk</option>
              <option value="New_Customer">New Customer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Loyalty Points</label>
            <input 
              className={styles.input} 
              type="number" 
              value={formData.LoyaltyPoints}
              onChange={(e) => setFormData({...formData, LoyaltyPoints: Number(e.target.value)})}
            />
          </div>

          <button 
             type="submit" 
             className={styles.btnSubmit}
             disabled={loading || campaigns.length === 0}
          >
            {loading ? 'Calcul en cours...' : 'Lancer la prédiction'}
          </button>
        </div>
      </form>

      {result && (
        <div className={styles.resultSection}>
          <div className={styles.statusHeader}>
            <span className={`${styles.badge} ${result.success ? styles.statusSuccess : styles.statusFail}`}>
              {result.success ? 'Succès prédit' : 'Échec probable'}
            </span>
            <span className={styles.statusMessage}>{result.message}</span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Prédiction</span>
              <span className={`${styles.statValue} ${result.success ? styles.valSuccess : styles.valFail}`}>
                {result.prediction} — {result.success ? 'Succès' : 'Échec'}
              </span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Probabilité</span>
              <span className={styles.statValue}>
                {(result.probability * 100).toFixed(1)}%
              </span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Succès</span>
              <span className={`${styles.statValue} ${result.success ? styles.valSuccess : styles.valFail}`}>
                {result.success ? 'Oui' : 'Non'}
              </span>
            </div>
          </div>

          {/* Recommendation card ONLY when success === false */}
          {!result.success && result.recommendation && (
            <div className={styles.recommendationCard}>
              <div className={styles.recoHeader}>
                <h3 className={styles.recoTitle}>Plan de recommandation IA</h3>
                <span className={styles.recoBadge}>Généré par Gemini AI</span>
              </div>
              <p className={styles.recoSubtitle}>Votre campagne nécessite des améliorations. Voici les actions recommandées :</p>
              
              <div className={styles.recoList}>
                {Array.isArray(result.recommendation) && result.recommendation.slice(0, 6).map((item: string, idx: number) => (
                  <div key={idx} className={styles.recoItem}>
                    <div className={styles.recoNumber}>{idx + 1}</div>
                    <p className={styles.recoText}>{item.replace(/^- /, '')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
