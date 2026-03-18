'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Users 
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Campagnes', icon: Target, path: '/dashboard/campaigns' },
    { label: 'Prédictions', icon: TrendingUp, path: '/dashboard/predictions' },
    { label: 'Recommandations', icon: Lightbulb, path: '/dashboard/recommendations' },
    { label: 'Clients', icon: Users, path: '/dashboard/customers' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>S</div>
        <span className={styles.logoText}>SmartMarketing</span>
      </div>

      <nav className={styles.navSection}>
        <p className={styles.navLabel}>Navigation</p>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path === '/dashboard' && pathname === '/dashboard');
            return (
              <li key={item.label} className={styles.navItem}>
                <Link 
                  href={item.path} 
                  className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                >
                  <item.icon className={styles.navIcon} size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.userArea}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>U</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Utilisateur</span>
            <span className={styles.userRole}>Marketing Manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
