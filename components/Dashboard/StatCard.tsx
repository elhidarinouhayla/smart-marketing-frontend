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
    if (typeof icon === 'string') {
      return <img src={icon} alt={`${label} icon`} className={styles.iconImage} />;
    }
    return icon;
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
