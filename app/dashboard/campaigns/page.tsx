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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(200, 232, 41, 0.1)', borderTop: '4px solid #c8e829', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: 900, color: '#c8e829', letterSpacing: '0.2em', fontSize: '12px' }}>CHARGEMENT DES CAMPAGNES...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>Leads & Conversion</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#737373', marginTop: '8px' }}>Gérez vos objectifs marketing et suivez vos performances.</p>
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
