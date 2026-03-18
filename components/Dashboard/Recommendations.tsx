'use client';

import React from 'react';
import styles from './Recommendations.module.css';

interface Recommendation {
  id: number;
  text: string;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Recommandations IA</h2>
      <p className={styles.subtitle}>Derniers conseils générés par votre assistant marketing.</p>
      
      <div className={styles.list}>
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <div key={rec.id} className={styles.item}>
              <div className={styles.index}>{index + 1}</div>
              <p className={styles.text}>{rec.text}</p>
            </div>
          ))
        ) : (
          <p className={styles.subtitle}>Aucune recommandation disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
}
