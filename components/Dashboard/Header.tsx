'use client';

import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [username, setUsername] = useState('Evelyn');

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.welcomeText}>Welcome, {username}!</h1>
        <p className={styles.subtitle}>Track your performance in real-time</p>
      </div>
      
      <div className={styles.actionsSection}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Search..." className={styles.searchInput} />

        </div>
        <div className={styles.profileInfo}>

          <div className={styles.avatar}>{getInitials(username)}</div>
        </div>
      </div>
    </header>
  );
}
