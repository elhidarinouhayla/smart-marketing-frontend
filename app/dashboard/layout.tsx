'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Dashboard/Sidebar';
import styles from './Layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', gap: '20px' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid rgba(200, 232, 41, 0.1)', borderTop: '4px solid #c8e829', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p style={{ fontWeight: 900, color: '#c8e829', letterSpacing: '0.2em', fontSize: '12px' }}>AUTHENTICATING...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main className={`${styles.mainContent} ${isCollapsed ? styles.expanded : ''}`}>
        {children}
      </main>
    </div>
  );
}
