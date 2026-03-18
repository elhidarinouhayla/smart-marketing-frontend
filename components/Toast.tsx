'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.toast} ${type === 'success' ? styles.success : styles.error}`}>
      {type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
      <p>{message}</p>
    </div>
  );
}
