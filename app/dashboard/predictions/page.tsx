'use client';

import React, { useEffect, useState } from 'react';
import PredictionForm from '@/components/Predictions/PredictionForm';
import PredictionHistory from '@/components/Predictions/PredictionHistory';
import api from '@/lib/axios';

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await api.get('predictions/');
      setPredictions(response.data);
    } catch (err) {
      console.error('Error fetching prediction history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em' }}>CHARGEMENT DES RECOMMANDATIONS...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>Analyse Prédictive IA</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', marginTop: '8px' }}>Utilisez nos modèles de Machine Learning pour prédire l'impact de vos campagnes.</p>
      </header>

      <PredictionForm onSuccess={fetchHistory} />
      <PredictionHistory predictions={predictions} />
    </div>
  );
}
