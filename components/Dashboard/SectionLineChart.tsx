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
              contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '12px', color: '#ffffff', fontWeight: 700 }}
              itemStyle={{ color: '#ffffff' }}
              formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Taux']}
            />
            <YAxis 
               domain={[0, 100]} 
               tickFormatter={(val) => `${val}%`}
               axisLine={false}
               tickLine={false}
               tick={{ fill: '#737373', fontSize: 10, fontWeight: 700 }}
               width={40}
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
