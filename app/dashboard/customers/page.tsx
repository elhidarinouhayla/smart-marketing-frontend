'use client';

import React, { useEffect, useState } from 'react';
import CustomerTable from '@/components/Customers/CustomerTable';
import ClusteringAnalysis from '@/components/Customers/ClusteringAnalysis';
import api from '@/lib/axios';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('customers/');
      setCustomers(response.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em' }}>CHARGEMENT DES CLIENTS...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>Analyse Clientèle</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', marginTop: '8px' }}>Visualisez votre base de données et segmentez vos clients par intelligence artificielle.</p>
      </header>

      <ClusteringAnalysis onClusteringComplete={fetchCustomers} />
      <CustomerTable customers={customers} />
    </div>
  );
}
