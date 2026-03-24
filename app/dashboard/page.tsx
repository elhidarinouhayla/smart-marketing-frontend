'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Dashboard/Header';

import StatCard from '@/components/Dashboard/StatCard';
import SectionLineChart from '@/components/Dashboard/SectionLineChart';
import SectionBarChart from '@/components/Dashboard/SectionBarChart';
import SectionDonutChart from '@/components/Dashboard/SectionDonutChart';
import SectionSegmentChart from '@/components/Dashboard/SectionSegmentChart';
import Recommendations from '@/components/Dashboard/Recommendations';
import api from '@/lib/axios';
import styles from './Dashboard.module.css';
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  Users 
} from 'lucide-react';

interface DashboardData {
  overview: {
    total_campaigns: number;
    active_campaigns: number;
    avg_predicted_rate: number;
    total_customers: number;
    total_segments: number;
  };
  predictions: Array<{ probability: number }>;
  campaigns: Array<{ status: string; channel: string }>;
  recommendations: Array<{ advice_text: string }>;
  segments: {
    segments: {
      [key: string]: number;
    };
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // We use Promise.allSettled to be more resilient if one API fails
        const results = await Promise.allSettled([
          api.get('dashboard/overview'),
          api.get('predictions/'),
          api.get('campaigns/'),
          api.get('recommendations/'),
          api.get('customers/segments'),
        ]);

        const successfulResults = results.map(r => r.status === 'fulfilled' ? r.value : null);
        const [overview, predictions, campaigns, recommendations, segments] = successfulResults;

        // If core data (overview) failed, we might want to show an error
        if (!overview) {
          console.error('Core dashboard data failed to load');
          // Still try to show what we have, but maybe show an error banner
        }

        setData({
          overview: overview?.data || {
            total_campaigns: 0,
            active_campaigns: 0,
            avg_predicted_rate: 0,
            total_customers: 0,
            total_segments: 0
          },
          predictions: predictions?.data || [],
          campaigns: campaigns?.data || [],
          recommendations: recommendations?.data || [],
          segments: segments?.data || { segments: {} },
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(200, 232, 41, 0.1)', borderTop: '4px solid #c8e829', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: 900, color: '#c8e829', letterSpacing: '0.2em', fontSize: '12px' }}>INITIALIZING SYSTEM</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const { overview, predictions, campaigns, recommendations, segments } = data || {
    overview: { total_campaigns: 0, active_campaigns: 0, avg_predicted_rate: 0, total_customers: 0, total_segments: 0 },
    predictions: [],
    campaigns: [],
    recommendations: [],
    segments: { segments: {} }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Header />

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '16px', borderRadius: '12px', marginBottom: '24px', color: '#dc2626', fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div className={styles.dashboardContent}>
        {/* Row 1: Stat Cards (4 cards as in the image) */}
        <div className={styles.statGrid}>
          <StatCard 
            label="Total Campaigns" 
            value={overview.total_campaigns} 
            icon={<BarChart3 size={20} />}
          />
          <StatCard 
            label="Active Now" 
            value={overview.active_campaigns} 
            icon={<Activity size={20} />}
          />
          <StatCard 
            label="Success Probability" 
            value={`${((overview.avg_predicted_rate || 0) * 100).toFixed(1)}%`} 
            icon={<TrendingUp size={20} />}
          />
          <StatCard 
            label="Total Customers" 
            value={overview.total_customers.toLocaleString()} 
            icon={<Users size={20} />}
          />
        </div>

        {/* Charts and Insights Grid (2x2 as in the image) */}
        <div className={styles.dashboardGrid}>
          {/* Top Left: Line Chart */}
          <div className={styles.gridItem}>
            <SectionLineChart data={predictions} />
          </div>

          {/* Top Right: Bar Chart */}
          <div className={styles.gridItem}>
            <SectionBarChart data={campaigns} />
          </div>

          {/* Mid Row: Donut Chart and Segment Chart */}
          <div className={styles.gridItem}>
            <SectionDonutChart data={campaigns} />
          </div>

          <div className={styles.gridItem}>
            <SectionSegmentChart data={segments} />
          </div>

          {/* Bottom Row (Full width recommendation or shared) */}
          <div className={`${styles.gridItem} ${styles.fullWidth}`}>
            <Recommendations 
              recommendations={recommendations.slice(-3).map((r: { advice_text: string }, idx: number) => ({ id: idx, text: r.advice_text }))} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
