'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Dashboard/Header';
import StatCard from '@/components/Dashboard/StatCard';
import SectionLineChart from '@/components/Dashboard/SectionLineChart';
import SectionBarChart from '@/components/Dashboard/SectionBarChart';
import SectionDonutChart from '@/components/Dashboard/SectionDonutChart';
import Recommendations from '@/components/Dashboard/Recommendations';
import api from '@/lib/axios';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [overview, predictions, campaigns, recommendations] = await Promise.all([
          api.get('dashboard/overview'),
          api.get('predictions/'),
          api.get('campaigns/'),
          api.get('recommendations/'),
        ]);

        setData({
          overview: overview.data,
          predictions: predictions.data,
          campaigns: campaigns.data,
          recommendations: recommendations.data,
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontWeight: 800, color: '#4f46e5', letterSpacing: '0.1em' }}>INITIALIZING...</p>
      </div>
    );
  }

  const { overview, predictions, campaigns, recommendations } = data || {};

  return (
    <div className={styles.dashboardGrid}>
      <Header />

      <div className={styles.dashboardGrid}>
        {/* Row 1: Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
          <StatCard 
            label="Campagnes" 
            value={overview?.total_campaigns || 0} 
            trend="+12.7%" 
            trendUp 
          />
          <StatCard 
            label="Actives" 
            value={overview?.active_campaigns || 0} 
            trend="+25.1%" 
            trendUp 
          />
          <StatCard 
            label="Conversion" 
            value={`${((overview?.avg_predicted_rate || 0) * 100).toFixed(0)}%`} 
            trend="+1.1x" 
            trendUp 
          />
          <StatCard 
            label="Clients" 
            value={overview?.total_customers || 0} 
            trend="+8.3%" 
            trendUp 
          />
          <StatCard 
            label="Segments" 
            value={overview?.total_segments || 0} 
          />
        </div>

        {/* Row 2: Charts (Line & Bar) */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <SectionLineChart data={predictions || []} />
          <SectionBarChart data={campaigns || []} />
        </div>

        {/* Row 3: Bottom Grid (Donut & Recommendations) */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <SectionDonutChart data={campaigns || []} />
          <Recommendations 
            recommendations={(recommendations || []).map((r: any, idx: number) => ({ id: idx, text: r.advice_text }))} 
          />
        </div>
      </div>
    </div>
  );
}
