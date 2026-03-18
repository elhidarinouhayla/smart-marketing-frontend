'use client';

import React from 'react';
import styles from './CustomerTable.module.css';

interface Customer {
  id: number;
  age: number;
  income: number;
  segment_label?: string;
}

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Base de Données Clients</h2>
      
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Âge</th>
              <th className={styles.th}>Revenu Annuel ($)</th>
              <th className={styles.th}>Segment IA</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c.id}>
                  <td className={styles.td}>{c.id}</td>
                  <td className={styles.td}>{c.age} ans</td>
                  <td className={styles.td}>{c.income.toLocaleString()}</td>
                  <td className={styles.td}>
                    {c.segment_label ? (
                      <span className={styles.segment}>{c.segment_label}</span>
                    ) : (
                      <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Non segmenté</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.td} style={{ textAlign: 'center', padding: '48px 0', opacity: 0.5 }}>
                  Aucun client dans la base de données.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
