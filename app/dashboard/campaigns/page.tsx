'use client';

import React, { useEffect, useState } from 'react';
import CampaignTable from '@/components/Campaigns/CampaignTable';
import CampaignForm from '@/components/Campaigns/CampaignForm';
import api from '@/lib/axios';
import styles from '../Dashboard.module.css';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const response = await api.get('campaigns/');
      setCampaigns(response.data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await api.post('campaigns/', data);
      await fetchCampaigns();
    } catch (err) {
      console.error('Error creating campaign:', err);
      alert('Erreur lors de la création de la campagne.');
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Voulez-vous vraiment supprimer cette campagne ?')) return;
    try {
      await api.delete(`campaigns/${id}`);
      await fetchCampaigns();
    } catch (err) {
      console.error('Error deleting campaign:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em' }}>CHARGEMENT DES CAMPAGNES...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>Gestion des Campagnes</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', marginTop: '8px' }}>Gérez vos objectifs marketing et suivez vos performances.</p>
      </header>

      <CampaignForm onSubmit={handleCreate} />
      <CampaignTable 
         campaigns={campaigns} 
         onDelete={handleDelete}
         onEdit={(id) => console.log('Edit', id)} 
      />
    </div>
  );
}
