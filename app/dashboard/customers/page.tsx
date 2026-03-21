'use client';

import React, { useEffect, useState } from 'react';
import CustomerTable from '@/components/Customers/CustomerTable';
import ClusteringAnalysis from '@/components/Customers/ClusteringAnalysis';
import SegmentDistribution from '@/components/Customers/SegmentDistribution';
import CustomerForm from '@/components/Customers/CustomerForm';
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(200, 232, 41, 0.1)', borderTop: '4px solid #c8e829', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: 900, color: '#c8e829', letterSpacing: '0.2em', fontSize: '12px' }}>SYNCHRONISATION DE LA BASE CLIENTS...</p>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>Manage Customers</h1>
      </header>

      {/* Top Row: 3 column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'stretch' }}>
        <CustomerForm onSuccess={fetchCustomers} />
        <ClusteringAnalysis onClusteringComplete={fetchCustomers} />
        <SegmentDistribution />
      </div>

      <CustomerTable customers={customers} />
    </div>
  );
}
