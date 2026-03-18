'use client';

import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight, 
  Mail,
  MoreVertical
} from 'lucide-react';
import api from '@/lib/axios';

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('dashboard/overview');
        setStats(response.data);
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err.message || err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-white rounded-3xl border border-lavender/50 shadow-sm shadow-lavender/40"></div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Campaigns',
      value: stats?.total_campaigns || 0,
      icon: Target,
      color: 'bg-indigo-50 text-indigo-500 shadow-indigo-100',
      change: '+12%',
      isUp: true
    },
    {
      title: 'Active Now',
      value: stats?.active_campaigns || 0,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-500 shadow-green-100',
      change: '+3.4%',
      isUp: true
    },
    {
      title: 'Avg. Conversion',
      value: `${(stats?.avg_predicted_rate * 100).toFixed(1)}%`,
      icon: ArrowUpRight,
      color: 'bg-blue-50 text-blue-500 shadow-blue-100',
      change: '+2.1%',
      isUp: true
    },
    {
      title: 'Total Customers',
      value: stats?.total_customers.toLocaleString() || 0,
      icon: Users,
      color: 'bg-orange-50 text-orange-500 shadow-orange-100',
      change: '-1.4%',
      isUp: false
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black font-heading text-brand-dark mb-2">Campaign Intelligence</h2>
          <p className="text-brand-gray font-bold">Monitor your marketing ROI and predictions in real-time.</p>
        </div>
        <button className="bg-primary text-white font-black px-6 py-3 rounded-2xl hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
           <Mail size={18} />
           Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className="bg-white p-6 rounded-[2.5rem] border border-lavender/50 shadow-sm shadow-lavender/40 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl ${card.color} shadow-lg`}>
                <card.icon size={24} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black ${
                card.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {card.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.change}
              </div>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-brand-gray mb-1 opacity-60">{card.title}</p>
            <h3 className="text-4xl font-black font-heading text-brand-dark tracking-tighter">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-lavender/50 shadow-sm shadow-lavender/40 p-10">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-xl font-black font-heading text-brand-dark flex items-center gap-3">
              <TrendingUp className="text-primary" />
              Growth Projection
            </h4>
            <div className="flex gap-4">
               {['Week', 'Month', 'Year'].map(period => (
                 <button key={period} className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all ${
                   period === 'Month' ? 'border-primary text-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-lavender text-brand-gray hover:text-brand-dark'
                 }`}>{period}</button>
               ))}
            </div>
          </div>
          
          <div className="space-y-4">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="flex flex-col gap-2">
                 <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-brand-gray mb-1 opacity-70">
                   <span>Campaign Phase {i}</span>
                   <span>{80 - i * 5}% Conversion</span>
                 </div>
                 <div className="w-full bg-lavender h-3 rounded-full overflow-hidden flex items-center">
                    <div 
                      className="bg-primary h-full rounded-full shadow-lg shadow-primary/30" 
                      style={{ width: `${80 - i * 5}%` }}
                    ></div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-lavender/50 shadow-sm shadow-lavender/40 p-10">
          <h4 className="text-xl font-black font-heading text-brand-dark mb-10 flex items-center gap-3">
            <Layers className="text-orange-500" />
            Top Segments
          </h4>
          <div className="space-y-6">
            {[
              { name: 'Engaged Clickers', val: 124, color: 'bg-primary' },
              { name: 'High Spend Female', val: 89, color: 'bg-emerald-400' },
              { name: 'High Income Senior', val: 56, color: 'bg-indigo-400' },
              { name: 'Low Engagement', val: 32, color: 'bg-orange-400' }
            ].map((segment, idx) => (
              <div key={idx} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${segment.color} shadow-lg shadow-${segment.color}/30`}></div>
                  <span className="font-bold text-brand-dark group-hover:text-primary transition-colors">{segment.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-brand-gray opacity-60">#{segment.val}</span>
                  <MoreVertical size={16} className="text-brand-gray opacity-30 hover:opacity-100 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-lavender/40 text-primary font-black uppercase tracking-widest text-xs rounded-2xl border border-lavender hover:bg-lavender transition-all">
            Manage All Segments
          </button>
        </div>
      </div>
    </div>
  );
}
