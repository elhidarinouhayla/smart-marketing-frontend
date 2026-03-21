'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Users,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Leads & Conversion', icon: Target, path: '/dashboard/campaigns' },
    { label: 'Campaign Analytics', icon: Target, path: '/dashboard/predictions' },
    { label: 'Customer Insights', icon: Lightbulb, path: '/dashboard/customers' },
    { label: 'AI Recommendations', icon: Lightbulb, path: '/dashboard/recommendations' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>S</div>
        {!isCollapsed && <span className={styles.logoText}>SmartMarketing</span>}
        <button className={styles.toggleBtn} onClick={onToggle}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className={styles.navSection}>
        <p className={styles.navLabel}>{isCollapsed ? '•••' : 'Navigation'}</p>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path === '/dashboard' && pathname === '/dashboard');
            return (
              <li key={item.label} className={styles.navItem}>
                <Link 
                  href={item.path} 
                  title={isCollapsed ? item.label : ''}
                  className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                >
                  <item.icon className={styles.navIcon} size={18} />
                  {!isCollapsed && item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footerSection}>
         <ul className={styles.navList}>
           <li className={styles.navItem}>
             <span className={styles.navLink} title={isCollapsed ? 'Settings' : ''}>
               <Settings size={18} /> 
               {!isCollapsed && ' Settings'}
             </span>
           </li>
           <li className={styles.navItem}>
             <span className={styles.navLink} title={isCollapsed ? 'Help Center' : ''}>
               <HelpCircle size={18} /> 
               {!isCollapsed && ' Help Center'}
             </span>
           </li>
           <li className={styles.navItem}>
             <Link href="/" className={styles.navLink} title={isCollapsed ? 'Logout' : ''}>
               <LogOut size={18} /> 
               {!isCollapsed && ' Logout'}
             </Link>
           </li>
         </ul>
      </div>
    </aside>
  );
}
