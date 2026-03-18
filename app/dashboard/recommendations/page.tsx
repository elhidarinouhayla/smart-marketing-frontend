'use client';

import React, { useEffect, useState } from 'react';
import RecommendationGenerator from '@/components/Recommendations/RecommendationGenerator';
import RecommendationHistory from '@/components/Recommendations/RecommendationHistory';
import api from '@/lib/axios';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await api.get('recommendations/');
      setRecommendations(response.data);
    } catch (err) {
      console.error('Error fetching recommendations history:', err);
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
        <p style={{ fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em' }}>GÉNÉRATION DES INSIGHTS...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>Recommandations Stratégiques</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', marginTop: '8px' }}>Optimisez vos campagnes grâce aux conseils de l'intelligence artificielle Gemini.</p>
      </header>

      <RecommendationGenerator onSuccess={fetchHistory} />
      <RecommendationHistory recommendations={recommendations} />
    </div>
  );
}
