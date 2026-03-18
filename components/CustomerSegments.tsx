'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  Layers, 
  Play, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import api from '@/lib/axios';

interface Customer {
  id: string;
  age: number;
  income: number;
  segment_label: string | null;
}

export default function CustomerSegments() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [segments, setSegments] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isClustering, setIsClustering] = useState(false);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      console.log('Fetching customers from:', api.defaults.baseURL + 'customers/');
      const [custRes, segRes] = await Promise.all([
        api.get('customers/'),
        api.get('customers/segments')
      ]);
      console.log('Fetch success');
      setCustomers(custRes.data);
      setSegments(segRes.data.segments);
    } catch (err: any) {
      console.error('Error details:', {
        message: err.message,
        detail: err.detail,
        error: err
      });
      console.error('Error fetching customers/segments:', err.message || err.detail || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runClustering = async () => {
    setIsClustering(true);
    setMessage('');
    try {
      const response = await api.post('customers/clustering');
      setMessage(response.data.message);
      await fetchData();
    } catch (err: any) {
      console.error('Clustering error:', err);
      let errorMsg = 'Clustering failed. Need at least 3 customers.';
      if (err.detail) {
        errorMsg = typeof err.detail === 'string' 
          ? err.detail 
          : Array.isArray(err.detail) 
            ? err.detail[0]?.msg || JSON.stringify(err.detail)
            : JSON.stringify(err.detail);
      }
      setMessage(errorMsg);
    } finally {
      setIsClustering(false);
    }
  };

  const getSegmentColor = (label: string) => {
    switch (label) {
      case 'High_Income_Senior': return 'bg-indigo-500';
      case 'High_Spender_Female': return 'bg-emerald-500';
      case 'Low_Engagement': return 'bg-orange-500';
      case 'Engaged_Clicker': return 'bg-primary';
      default: return 'bg-brand-gray';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black font-heading text-brand-dark mb-2">Customer Intelligence</h2>
          <p className="text-brand-gray font-bold">Use AI-driven KMeans clustering to segment your audience.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white border border-lavender text-brand-gray font-black px-6 py-4 rounded-2xl hover:text-brand-dark transition-all shadow-sm flex items-center gap-2 transform hover:-translate-y-1 active:scale-95">
             <UserPlus size={18} />
             Add Client
           </button>
           <button 
             onClick={runClustering}
             disabled={isClustering}
             className={`px-8 py-4 rounded-2xl font-black text-white shadow-xl flex items-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 ${
               isClustering ? 'bg-lavender cursor-not-allowed text-primary/40' : 'bg-primary hover:bg-accent shadow-primary/20'
             }`}
           >
             {isClustering ? (
               <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
             ) : <Play size={20} />}
             Run AI Clustering
           </button>
        </div>
      </div>

      {message && (
        <div className={`mb-10 p-4 rounded-2xl border flex items-center gap-3 font-bold animate-in zoom-in duration-300 ${
          message.includes('terminé') ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
        }`}>
          {message.includes('terminé') ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
         {/* Segments Summary */}
         <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-lavender/50 shadow-sm shadow-lavender/40 p-10">
            <h3 className="text-xl font-black font-heading text-brand-dark mb-10 flex items-center gap-3 italic">
               <Layers className="text-primary" />
               Segment Distribution
            </h3>
            <div className="space-y-8">
               {segments && !Array.isArray(segments) && Object.entries(segments).map(([label, count]: [string, any]) => (
                 <div key={label} className="space-y-3">
                    <div className="flex items-center justify-between font-bold">
                       <span className="text-brand-dark flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getSegmentColor(label)} shadow-lg`}></div>
                          {typeof label === 'string' ? label.replace(/_/g, ' ') : String(label)}
                       </span>
                       <span className="text-brand-gray">{typeof count === 'object' ? JSON.stringify(count) : count} users</span>
                    </div>
                    <div className="w-full bg-lavender h-2 rounded-full overflow-hidden flex items-center">
                       <div 
                         className={`${getSegmentColor(label)} h-full rounded-full transition-all duration-1000 shadow-lg`}
                         style={{ width: `${(count / customers.length) * 100}%` }}
                       ></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Customers List Table */}
         <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-lavender/50 shadow-sm shadow-lavender/40 p-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black font-heading text-brand-dark italic flex items-center gap-3">
                  <TrendingUp className="text-green-500" />
                  Real-time Data Stream
               </h3>
               <div className="bg-lavender/30 text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-lavender">
                  {customers.length} Total Records
               </div>
            </div>

            <div className="overflow-auto max-h-[400px] flex-1">
               <table className="w-full text-left">
                  <thead className="sticky top-0 bg-white z-10 border-b border-lavender/50">
                    <tr>
                       <th className="pb-4 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60">Age</th>
                       <th className="pb-4 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60">Income ($)</th>
                       <th className="pb-4 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60">AI Segment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lavender/30">
                    {loading ? (
                       [1, 2, 3].map(i => <tr key={i} className="animate-pulse h-16"><td colSpan={3} className="bg-lavender/20"></td></tr>)
                    ) : customers.length === 0 ? (
                       <tr><td colSpan={3} className="py-20 text-center font-bold text-lavender text-2xl uppercase tracking-widest underline decoration-wavy decoration-primary italic opacity-30">No Data Sources Connected</td></tr>
                    ) : customers.map(cust => (
                       <tr key={cust.id} className="hover:bg-lavender/10 transition-colors group">
                          <td className="py-2 font-black text-brand-dark group-hover:text-primary transition-colors">{cust.age}</td>
                          <td className="py-2 font-black text-brand-dark group-hover:text-primary transition-colors">{cust.income.toLocaleString()}</td>
                          <td className="py-2">
                             <div className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black text-white shadow-xl ${getSegmentColor(cust.segment_label || '')} transition-transform group-hover:scale-105 active:scale-95`}>
                               {cust.segment_label?.replace(/_/g, ' ') || 'UNSEGMENTED'}
                             </div>
                          </td>
                       </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
}
