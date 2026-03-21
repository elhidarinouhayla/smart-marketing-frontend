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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(200, 232, 41, 0.1)', borderTop: '4px solid #c8e829', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: 900, color: '#c8e829', letterSpacing: '0.2em', fontSize: '12px' }}>INITIALISATION DES MODÈLES IA...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>Campaign Analytics</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#737373', marginTop: '8px' }}>Utilisez nos modèles de Machine Learning pour prédire l'impact de vos campagnes.</p>
      </header>

      <PredictionForm onSuccess={fetchHistory} />
      <PredictionHistory predictions={predictions} />
    </div>
  );
}
