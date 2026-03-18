'use client';

import React from 'react';
import { 
  Trash2, 
  Settings, 
  ExternalLink 
} from 'lucide-react';
import styles from './CampaignTable.module.css';

interface Campaign {
  id: string | number;
  name: string;
  channel: string;
  budget: number;
  status: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
  onDelete: (id: string | number) => void;
  onEdit: (id: string | number) => void;
}

export default function CampaignTable({ campaigns, onDelete, onEdit }: CampaignTableProps) {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return styles.statusActive;
      case 'paused': return styles.statusPaused;
      default: return styles.statusInactive;
    }
  };

  return (
    <div className={styles.root}>
      <header className={styles.titleArea}>
        <h2 className={styles.title}>Gestion des Campagnes</h2>
      </header>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nom</th>
            <th className={styles.th}>Canal</th>
            <th className={styles.th}>Budget ($)</th>
            <th className={styles.th}>Statut</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length > 0 ? (
            campaigns.map((c) => (
              <tr key={c.id}>
                <td className={styles.td}>
                   <div className={styles.campaignName}>{c.name}</div>
                </td>
                <td className={styles.td}>{c.channel}</td>
                <td className={styles.td}>{c.budget.toLocaleString()}</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${getStatusClass(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button 
                      className={styles.btnAction} 
                      onClick={() => onEdit(c.id)}
                      title="Modifier"
                    >
                      <Settings size={18} />
                    </button>
                    <button 
                      className={`${styles.btnAction} ${styles.btnDelete}`} 
                      onClick={() => onDelete(c.id)}
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
               <td colSpan={5} className={styles.td} style={{ textAlign: 'center', padding: '48px 0', opacity: 0.5 }}>
                  Aucune campagne trouvée.
               </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
