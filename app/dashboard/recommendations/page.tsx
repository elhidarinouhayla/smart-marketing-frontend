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
      console.error('Error fetching recommendation history:', err);
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
        <p style={{ fontWeight: 900, color: '#c8e829', letterSpacing: '0.2em', fontSize: '12px' }}>INTERROGATION DU CERVEAU IA...</p>
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
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>AI Recommendations</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#737373', marginTop: '8px' }}>Générez des plans d'action personnalisés grâce à l'IA générative Google Gemini.</p>
      </header>

      <RecommendationGenerator onSuccess={fetchHistory} />
      <RecommendationHistory recommendations={recommendations} />
    </div>
  );
}
