'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, Target, DollarSign, Activity } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import Spinner from '@/components/Spinner';
import api from '@/lib/axios';
import styles from './page.module.css';

interface Campaign {
  id: string;
  name: string;
  budget: number;
  channel: string;
  status: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    budget: 1000,
    channel: 'Email',
    status: 'active'
  });

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get('campaigns/');
      setCampaigns(response.data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setToast({ message: 'Erreur lors du chargement des campagnes.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleOpenCreate = () => {
    setEditingCampaign(null);
    setFormData({ name: '', budget: 1000, channel: 'Email', status: 'active' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      budget: campaign.budget,
      channel: campaign.channel,
      status: campaign.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingCampaign) {
        await api.put(`campaigns/${editingCampaign.id}`, formData);
        setToast({ message: 'Campagne mise à jour avec succès.', type: 'success' });
      } else {
        await api.post('campaigns/', formData);
        setToast({ message: 'Campagne créée avec succès.', type: 'success' });
      }
      setIsModalOpen(false);
      fetchCampaigns();
    } catch (err) {
      console.error('Error saving campaign:', err);
      setToast({ message: 'Erreur lors de l\'enregistrement.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) return;
    try {
      setSubmitting(true);
      await api.delete(`campaigns/${id}`);
      setToast({ message: 'Campagne supprimée.', type: 'success' });
      fetchCampaigns();
    } catch (err) {
      console.error('Error deleting campaign:', err);
      setToast({ message: 'Erreur lors de la suppression.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return styles.active;
      case 'paused': return styles.paused;
      default: return styles.inactive;
    }
  };

  return (
    <AppLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
             <h1 className={styles.title}>Marketing Campaigns</h1>
             <p className={styles.subtitle}>Manage and track your active marketing initiatives.</p>
          </div>
          <button className={styles.btnCreate} onClick={handleOpenCreate}>
            <Plus size={20} />
            New Campaign
          </button>
        </header>

        <section className={styles.card}>
          {loading && <Spinner />}
          {submitting && <Spinner />}
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Budget</th>
                <th className={styles.th}>Channel</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length > 0 ? (
                campaigns.map((c) => (
                  <tr key={c.id}>
                    <td className={`${styles.td} ${styles.nameCol}`}>{c.name}</td>
                    <td className={styles.td}>${c.budget.toLocaleString()}</td>
                    <td className={styles.td}>{c.channel}</td>
                    <td className={styles.td}>
                      <span className={`${styles.badge} ${getStatusClass(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} onClick={() => handleOpenEdit(c)}>
                          <Edit3 size={18} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(c.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan={5} className={styles.td} style={{ textAlign: 'center', opacity: 0.5 }}>
                      Aucune campagne trouvée.
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>

        {/* Create/Edit Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title={editingCampaign ? 'Edit Campaign' : 'New Campaign'}
          subtitle={editingCampaign ? 'Update campaign details and settings.' : 'Fill in the information to launch a new objective.'}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Campaign Name</label>
              <input 
                className={styles.input} 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Summer Sales 2026"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Budget ($)</label>
              <input 
                className={styles.input} 
                type="number" 
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Channel</label>
              <select 
                className={styles.input}
                value={formData.channel}
                onChange={(e) => setFormData({...formData, channel: e.target.value})}
              >
                <option value="Email">Email</option>
                <option value="Social Media">Social Media</option>
                <option value="PPC">PPC</option>
                <option value="SEO">SEO</option>
                <option value="Referral">Referral</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Initial Status</label>
              <select 
                className={styles.input}
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button className={`${styles.submitBtn} ${styles.fullWidth}`} type="submit">
              {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
            </button>
          </form>
        </Modal>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </AppLayout>
  );
}
