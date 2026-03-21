'use client';

import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import styles from './SectionBarChart.module.css';

interface CampaignData {
  channel: string;
}

interface BarChartProps {
  data: CampaignData[];
}

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
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ebf0f9', borderRadius: '12px', color: '#111111', fontWeight: 700 }}
              itemStyle={{ color: '#c8e829' }}
              cursor={{ fill: 'rgba(200, 232, 41, 0.05)' }}
            />
            <XAxis dataKey="name" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
            />
            <Bar 
              dataKey="val" 
              fill="#c8e829" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
