'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import api from '@/lib/axios';
import styles from './SegmentDistribution.module.css';

const SEGMENT_COLORS: Record<string, string> = {
  low_engagement: "#64748b",
  high_income_senior: "#3b82f6",
  high_spender_female: "#a855f7",
  engaged_clicker: "#c8e829",
  new_customer: "#f97316",
  loyal_promoter: "#0d9488",
  non_segmente: "#94a3b8"
};

export default function SegmentDistribution() {
  const [segments, setSegments] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getSegmentColor = (name: string) => {
    const key = name.toLowerCase().replace(/ /g, '_');
    return SEGMENT_COLORS[key] || "#c8e829";
  };

  const fetchSegments = async () => {
    try {
      const response = await api.get('customers/segments');
      if (response.data && response.data.segments) {
        setSegments(response.data.segments);
      }
    } catch (err) {
      console.error('Error fetching segments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSegments();
    // Listen for clustering refresh
    const interval = setInterval(fetchSegments, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = Object.entries(segments).map(([name, value]) => ({ 
    name: name.replace(/_/g, ' '), 
    value 
  })).filter((d: any) => d.value > 0);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>
        Segment Distribution 
        <span className={styles.badge}>GET /segments/</span>
      </h2>
      
      <div className={styles.content}>
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={35}
                outerRadius={55}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={getSegmentColor(entry.name)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
           <ResponsiveContainer width="100%" height={140}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" hide />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                 {chartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={getSegmentColor(entry.name)} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.legend}>
           {chartData.map((item: any) => (
             <div key={item.name} className={styles.legendItem}>
               <div className={styles.bullet} style={{ backgroundColor: getSegmentColor(item.name) }} />
               <span className={styles.legendLabel}>{item.name}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
