'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import styles from './SectionSegmentChart.module.css';

interface SegmentData {
  segments: {
    [key: string]: number;
  };
}

interface SegmentChartProps {
  data: SegmentData;
}

const SEGMENT_COLORS: { [key: string]: string } = {
  "Non segmenté": "#c8e829",
  "High_Income_Senior": "#3b82f6",
  "Low_Engagement": "#64748b",
  "High_Spender_Female": "#a855f7",
  "Engaged_Clicker": "#f43f5e",
  "New_Customer": "#10b981",
  "Loyal_Promoter": "#f59e0b"
};

const DEFAULT_COLOR = "#737373";

export default function SectionSegmentChart({ data }: SegmentChartProps) {
  const chartData = Object.entries(data.segments || {}).map(([name, value]) => ({
    name: name.replace(/_/g, ' '),
    originalName: name,
    value
  }));

  if (chartData.length === 0) {
    return (
      <div className={styles.root}>
        <h2 className={styles.title}>Segment Distribution</h2>
        <p className={styles.subtitle}>No data available</p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>Segment Distribution</h2>
        <span className={styles.endpointBadge}>GET /segments/</span>
      </div>

      <div className={styles.chartsWrapper}>
        {/* Donut Chart */}
        <div className={styles.donutContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell 
                    key={`cell-${entry.originalName}`} 
                    fill={SEGMENT_COLORS[entry.originalName] || DEFAULT_COLOR} 
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className={styles.barContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 4, 4]} 
                barSize={32}
              >
                {chartData.map((entry) => (
                  <Cell 
                    key={`bar-${entry.originalName}`} 
                    fill={SEGMENT_COLORS[entry.originalName] || DEFAULT_COLOR} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        {chartData.map((entry) => (
          <div key={entry.originalName} className={styles.legendItem}>
            <div 
              className={styles.bullet} 
              style={{ backgroundColor: SEGMENT_COLORS[entry.originalName] || DEFAULT_COLOR }} 
            />
            <span className={styles.legendLabel}>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
