'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/axios';
import styles from './ClusteringAnalysis.module.css';

interface ClusteringAnalysisProps {
  onClusteringComplete: () => void;
}

export default function ClusteringAnalysis({ onClusteringComplete }: ClusteringAnalysisProps) {
  const [clustersCount, setClustersCount] = useState(4);
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
      // Backend expects n_clusters as a query parameter
      await api.post(`customers/clustering?n_clusters=${clustersCount}`);
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
      <h2 className={styles.title}>
        AI Segmentation Control
        <span className={styles.badge}>POST /clustering</span>
      </h2>
      
      <div className={styles.formGroup}>
        <p className={styles.subtitle}>Number of Clusters (k)</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '16px', alignItems: 'center' }}>
          <input 
            type="range" 
            min="2" 
            max="6" 
            step="1" 
            value={clustersCount} 
            onChange={(e) => setClustersCount(Number(e.target.value))}
            className={styles.rangeInput}
          />
          <div className={styles.kValue}>{clustersCount}</div>
        </div>
      </div>

      <button 
        className={styles.btnAction}
        onClick={handleRunClustering}
        disabled={loading}
      >
        {loading ? 'CALCUL EN COURS...' : 'Run KMeans Clustering'}
      </button>

      {message && (
        <div className={styles.msg}>
          <div className={styles.bullet} style={{ background: '#c8e829' }} />
          {message}
        </div>
      )}
    </div>
  );
}
