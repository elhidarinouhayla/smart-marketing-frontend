'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Dashboard/Sidebar';
import styles from './Layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className={styles.root}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
          <p style={{ fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em' }}>AUTHENTICATING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
