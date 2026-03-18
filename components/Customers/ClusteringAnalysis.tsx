'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/axios';
import styles from './ClusteringAnalysis.module.css';

interface ClusteringAnalysisProps {
  onClusteringComplete: () => void;
}

export default function ClusteringAnalysis({ onClusteringComplete }: ClusteringAnalysisProps) {
  const [clustersCount, setClustersCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [segments, setSegments] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const fetchSegments = async () => {
    try {
      const response = await api.get('customers/segments');
      if (response.data && response.data.segments) {
        setSegments(response.data.segments);
      }
    } catch (err) {
      console.error('Error fetching segments:', err);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  const handleRunClustering = async () => {
    setLoading(true);
    setMessage('');
    try {
      await api.post('customers/clustering', { n_clusters: clustersCount });
      setMessage('Segmentation IA réussie !');
      await fetchSegments();
      onClusteringComplete();
    } catch (err) {
      console.error('Error running clustering:', err);
      alert('Erreur lors de la segmentation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Analyse de Segmentation (K-Means)</h2>
      
      <div className={styles.controls}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre de segments (K)</label>
          <input 
            className={styles.input} 
            type="number" 
            value={clustersCount}
            onChange={(e) => setClustersCount(Number(e.target.value))}
            min={2}
            max={10}
          />
        </div>
        <button 
          className={styles.btnAction}
          onClick={handleRunClustering}
          disabled={loading}
        >
          {loading ? 'CALCUL EN COURS...' : 'LANCER LA SEGMENTATION IA'}
        </button>
      </div>

      {message && (
        <div className={`${styles.msg} ${styles.success}`}>
          {message}
        </div>
      )}

      {segments.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <p className={styles.label} style={{ marginBottom: '16px' }}>Dashboard des Segments :</p>
          <div className={styles.statsGrid}>
            {segments.map((seg, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statLabel}>{seg.label}</div>
                <div className={styles.statValue}>{seg.count} Clients</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
