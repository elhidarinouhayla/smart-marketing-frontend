'use client';

import React from 'react';
import styles from './PredictionHistory.module.css';

interface Prediction {
  id: number;
  campaign_id: number;
  probability: number;
  prediction: number;
  message: string;
}

interface PredictionHistoryProps {
  predictions: Prediction[];
}

export default function PredictionHistory({ predictions }: PredictionHistoryProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Historique des Prédictions</h2>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID Campagne</th>
            <th className={styles.th}>Probabilité</th>
            <th className={styles.th}>Résultat</th>
            <th className={styles.th}>Message</th>
          </tr>
        </thead>
        <tbody>
          {predictions.length > 0 ? (
            predictions.map((p, idx) => (
              <tr key={idx}>
                <td className={styles.td}>{p.campaign_id}</td>
                <td className={`${styles.td} ${styles.prob}`}>{(p.probability * 100).toFixed(1)}%</td>
                <td className={`${styles.td} ${p.prediction === 1 ? styles.success : styles.failure}`}>
                  {p.prediction === 1 ? 'SUCCÈS' : 'ÉCHEC'}
                </td>
                <td className={styles.td}>{p.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className={styles.td} style={{ textAlign: 'center', opacity: 0.5 }}>
                Aucun historique disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
