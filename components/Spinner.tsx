'use client';

import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  fullPage?: boolean;
}

export default function Spinner({ fullPage = false }: SpinnerProps) {
  return (
    <div className={fullPage ? styles.fullPage : styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
}
