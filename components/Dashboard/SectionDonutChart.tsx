'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './SectionDonutChart.module.css';

interface CampaignData {
  status: string;
}

interface DonutChartProps {
  data: CampaignData[];
}

const STATUS_COLORS: { [key: string]: string } = {
  'Active': "#c8e829",
  'Paused': "#94a3b8",
  'Inactive': "#475569",
  'Draft': "#3b82f6"
};
const DEFAULT_STATUS_COLOR = "#78940e";

export default function SectionDonutChart({ data }: DonutChartProps) {
  const statuses = data.reduce((acc: any, curr) => {
    const s = curr.status.toLowerCase();
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { name: 'Active', value: statuses.active || 0 },
    { name: 'Draft', value: statuses.draft || 0 },
    { name: 'Inactive', value: statuses.inactive || 0 },
    { name: 'Paused', value: (statuses.paused || 0) + (statuses.en_pause || 0) }
  ].filter(d => d.value > 0);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Statut des Campagnes</h2>
      <p className={styles.subtitle}>Répartition de vos objectifs par état actuel.</p>
      
      <div className={styles.content}>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((item) => (
                  <Cell key={`cell-${item.name}`} fill={STATUS_COLORS[item.name] || DEFAULT_STATUS_COLOR} strokeWidth={0} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.legend}>
          {chartData.map((item) => (
            <div key={item.name} className={styles.legendItem}>
              <div className={styles.bullet} style={{ backgroundColor: STATUS_COLORS[item.name] || DEFAULT_STATUS_COLOR }} />
              <div className={styles.legendText}>
                {item.name} — <span className={styles.count}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
