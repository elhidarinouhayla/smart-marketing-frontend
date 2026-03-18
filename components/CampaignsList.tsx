'use client';

import { useEffect, useState } from 'react';
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Tv2
} from 'lucide-react';
import api from '@/lib/axios';

interface Campaign {
  id: string;
  name: string;
  budget: number;
  channel: string;
  status: string;
}

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    budget: 0,
    channel: 'Social Media',
    status: 'active'
  });

  const fetchCampaigns = async () => {
    try {
      const response = await api.get('campaigns/');
      setCampaigns(response.data);
    } catch (err: any) {
      console.error('Error fetching campaigns:', err.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('campaigns/', newCampaign);
      setShowModal(false);
      setNewCampaign({ name: '', budget: 0, channel: 'Social Media', status: 'active' });
      fetchCampaigns();
    } catch (err) {
      console.error('Error creating campaign:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await api.delete(`campaigns/${id}`);
      fetchCampaigns();
    } catch (err: any) {
      console.error('Error fetching dashboard stats:', err.message || err);
    } finally { };
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'paused': return <Clock size={16} className="text-orange-500" />;
      default: return <XCircle size={16} className="text-red-500" />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black font-heading text-brand-dark mb-2 italic">Active Campaigns</h2>
          <p className="text-brand-gray font-bold">Manage and visualize your high-performing marketing channels.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white font-black px-8 py-4 rounded-2xl hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center gap-3 transform hover:-translate-y-1 active:scale-95"
        >
           <Plus size={20} />
           New Campaign
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-lavender/50 shadow-sm shadow-lavender/40 overflow-hidden">
        <div className="p-8 border-b border-lavender/50 flex flex-col md:flex-row items-center justify-between gap-6 bg-lavender/10">
           <div className="relative w-full md:w-96 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-lavender rounded-2xl focus:outline-none focus:ring-0 focus:border-primary/30 font-bold text-brand-dark placeholder:text-lavender placeholder:font-black"
              />
           </div>
           <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-lavender text-brand-gray rounded-2xl hover:text-brand-dark font-black text-xs uppercase tracking-widest transition-all">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-6 py-3.5 bg-white border border-lavender text-brand-gray rounded-2xl hover:text-brand-dark font-black text-xs uppercase tracking-widest transition-all">
                Export Data
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-lavender bg-white/50">
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60">Campaign Name</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60">Status</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60">Channel</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60">Budget</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-brand-gray opacity-60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender/30">
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6 h-20 bg-lavender/10"></td>
                  </tr>
                ))
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-brand-gray font-bold opacity-30">
                       <Target size={48} />
                       <p>No campaigns found. Start creating one!</p>
                    </div>
                  </td>
                </tr>
              ) : campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-lavender/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-lavender flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-lavender/50">
                          <Target size={20} />
                       </div>
                       <span className="font-black text-brand-dark group-hover:text-primary transition-colors">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black ${
                      campaign.status.toLowerCase() === 'active' ? 'bg-green-50 text-green-600 border border-green-100' : 
                      campaign.status.toLowerCase() === 'paused' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                      'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {getStatusIcon(campaign.status)}
                      <span className="uppercase tracking-widest">{campaign.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-brand-gray font-bold group-hover:text-brand-dark transition-colors capitalize">
                      {campaign.channel === 'Social Media' ? <TrendingUp size={16} className="text-primary/60" /> : <Tv2 size={16} className="text-indigo-400" />}
                      {campaign.channel}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-brand-dark font-black flex items-center gap-1 group-hover:text-primary transition-colors">
                       <DollarSign size={16} className="opacity-40" />
                       {campaign.budget.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <button className="p-2 text-brand-gray hover:text-primary hover:bg-white rounded-xl transition-all"><Edit2 size={18} /></button>
                    <button 
                      onClick={() => handleDelete(campaign.id)}
                      className="p-2 text-brand-gray hover:text-red-500 hover:bg-white rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 text-brand-gray hover:text-brand-dark hover:bg-white rounded-xl transition-all"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/20 backdrop-blur-md p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl border border-lavender p-10 relative animate-in zoom-in slide-in-from-bottom-10 duration-500">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-brand-gray hover:text-brand-dark hover:scale-110 transition-all border border-lavender p-2 rounded-xl"
              >
                 <Edit2 size={24} className="rotate-45" /> 
              </button>

              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 shadow-xl shadow-primary/10">
                   <Target size={36} />
                </div>
                <h3 className="text-3xl font-black font-heading text-brand-dark mb-2 tracking-tight">New Campaign</h3>
                <p className="text-brand-gray font-bold">Configure your marketing objective and budget.</p>
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-gray ml-1">Campaign Name</label>
                    <input 
                      type="text" 
                      required
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      placeholder="e.g. Summer Launch 2026"
                      className="w-full px-6 py-4 bg-lavender/20 border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-2xl focus:outline-none font-bold text-brand-dark placeholder:text-lavender transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-gray ml-1">Daily Budget ($)</label>
                      <input 
                        type="number" 
                        required
                        value={newCampaign.budget}
                        onChange={(e) => setNewCampaign({...newCampaign, budget: Number(e.target.value)})}
                        className="w-full px-6 py-4 bg-lavender/20 border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-2xl focus:outline-none font-bold text-brand-dark transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-gray ml-1">Channel</label>
                      <select 
                        value={newCampaign.channel}
                        onChange={(e) => setNewCampaign({...newCampaign, channel: e.target.value})}
                        className="w-full px-6 py-4 bg-lavender/20 border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-2xl focus:outline-none font-bold text-brand-dark transition-all appearance-none cursor-pointer"
                      >
                         <option value="Social Media">Social Media</option>
                         <option value="Email">Email Marketing</option>
                         <option value="SEO">Search Engines</option>
                         <option value="TV">Direct Mail / TV</option>
                      </select>
                    </div>
                 </div>

                 <button className="w-full mt-10 py-5 bg-primary text-white font-black text-lg rounded-full shadow-2xl shadow-primary/30 hover:bg-accent transition-all transform hover:-translate-y-1 active:scale-95">
                   Create Campaign Strategy
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
