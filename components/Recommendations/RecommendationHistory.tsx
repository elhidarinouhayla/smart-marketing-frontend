'use client';

import React from 'react';
import styles from './RecommendationHistory.module.css';

interface Recommendation {
  id: number;
  campaign_id: number;
  advice_text: string;
}

interface RecommendationHistoryProps {
  recommendations: Recommendation[];
}

export default function RecommendationHistory({ recommendations }: RecommendationHistoryProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>
        Recommendation History
        <span className={styles.badge}>GET /recommendations/</span>
      </h2>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Campaign ID</th>
            <th className={styles.th}>Strategic Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.length > 0 ? (
            recommendations.map((r, idx) => (
              <tr key={idx}>
                <td className={styles.td}>{r.campaign_id}</td>
                <td className={styles.td}>
                   <div className={styles.advice}>{r.advice_text}</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className={styles.td} style={{ textAlign: 'center', opacity: 0.5 }}>
                Aucun historique de conseils.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
