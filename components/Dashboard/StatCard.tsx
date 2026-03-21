'use client';

import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon?: string | React.ReactNode;
}

export default function StatCard({ label, value, trend, trendUp, icon }: StatCardProps) {
  const renderIcon = () => {
    if (typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http') || icon.includes('.png') || icon.includes('.jpg'))) {
      return <img src={icon} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
    }
    return icon || '📊';
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>{renderIcon()}</div>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.label}>{label}</span>
        <div className={styles.valueRow}>
          <h3 className={styles.value}>{value}</h3>
          {trend && (
            <div className={`${styles.trend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
