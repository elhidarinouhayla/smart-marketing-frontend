'use client';

import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>Marketing Intelligence Overview</h1>
        <p className={styles.subtitle}>Suivez vos performances en temps réel</p>
      </div>
      <div className={styles.badge}>
        <span className={styles.dot} />
        Live Data
      </div>
    </header>
  );
}
