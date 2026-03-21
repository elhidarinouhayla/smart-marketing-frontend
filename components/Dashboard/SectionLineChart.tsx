'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './SectionLineChart.module.css';

interface LineChartProps {
  data: { probability: number }[];
}

export default function SectionLineChart({ data }: LineChartProps) {
  // Format data for Recharts
  const chartData = data.map((d, index) => ({ name: `Pt ${index}`, val: d.probability * 100 }));

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Traffic & Conversions Growth</h2>
      <p className={styles.subtitle}>Taux de conversion prédit (%) selon les données historiques.</p>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c8e829" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#c8e829" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ebf0f9', borderRadius: '12px', color: '#111111', fontWeight: 700 }}
              itemStyle={{ color: '#c8e829' }}
            />
            <Area 
               type="monotone" 
               dataKey="val" 
               stroke="#c8e829" 
               strokeWidth={4}
               fillOpacity={1} 
               fill="url(#colorVal)" 
               animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
