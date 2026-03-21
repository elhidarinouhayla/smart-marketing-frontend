'use client';

import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';
import styles from './SectionBarChart.module.css';

interface CampaignData {
  channel: string;
}

interface BarChartProps {
  data: CampaignData[];
}

const CHANNEL_COLORS: { [key: string]: string } = {
  'Social Media': '#3b82f6',
  'Email': '#c8e829',
  'SEO': '#10b981',
  'PPC': '#f59e0b',
  'Direct': '#a855f7'
};
const DEFAULT_CHANNEL_COLOR = '#94a3b8';

export default function SectionBarChart({ data }: BarChartProps) {
  // Aggregate data by channel
  const channels = data.reduce((acc: any, curr) => {
    acc[curr.channel] = (acc[curr.channel] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(channels)
    .sort((a: any, b: any) => b[1] - a[1])
    .map(([name, val]) => ({ name, val }));

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Campagnes par Canal</h2>
      <p className={styles.subtitle}>Distribution des canaux utilisés sur vos dernières campagnes.</p>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Tooltip 
              contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '12px', color: '#ffffff', fontWeight: 700 }}
              itemStyle={{ color: '#ffffff' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <XAxis dataKey="name" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
            />
            <Bar 
              dataKey="val" 
              radius={[6, 6, 0, 0]} 
              barSize={40}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[entry.name] || DEFAULT_CHANNEL_COLOR} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
