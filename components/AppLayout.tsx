'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Users, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (!token && !['/login', '/signup', '/'].includes(pathname)) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [pathname, router]);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Campaigns', icon: Target, path: '/campaigns' },
    { label: 'Predictions', icon: TrendingUp, path: '/predictions' },
    { label: 'Recommendations', icon: Lightbulb, path: '/recommendations' },
    { label: 'Customers', icon: Users, path: '/customers' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className={styles.root}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
          <p style={{ fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em' }}>CHARGEMENT...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>S</div>
          <span className={styles.logoText}>SmartMarketing</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path === '/dashboard' && pathname === '/dashboard');
            return (
              <Link 
                key={item.label} 
                href={item.path} 
                className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.btnLogout}>
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
