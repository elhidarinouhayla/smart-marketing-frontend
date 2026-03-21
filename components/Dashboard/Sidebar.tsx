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
    { label: 'Leads & Conversion', icon: Target, path: '/dashboard/campaigns' },
    { label: 'Campaign Analytics', icon: Target, path: '/dashboard/predictions' },
    { label: 'Customer Insights', icon: Lightbulb, path: '/dashboard/customers' },
    { label: 'AI Recommendations', icon: Lightbulb, path: '/dashboard/recommendations' },
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

      <div className={styles.footerSection}>
         <ul className={styles.navList}>
           <li className={styles.navItem}>
             <span className={styles.navLink}><LayoutDashboard size={18} /> Settings</span>
           </li>
           <li className={styles.navItem}>
             <span className={styles.navLink}><Lightbulb size={18} /> Help Center</span>
           </li>
           <li className={styles.navItem}>
             <Link href="/" className={styles.navLink}><Target size={18} /> Logout</Link>
           </li>
         </ul>
      </div>
    </aside>
  );
}
