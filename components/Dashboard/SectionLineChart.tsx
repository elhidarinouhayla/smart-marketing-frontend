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
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip />
            <Area 
               type="monotone" 
               dataKey="val" 
               stroke="#4f46e5" 
               strokeWidth={3}
               fillOpacity={1} 
               fill="url(#colorVal)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
