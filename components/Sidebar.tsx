'use client';

import { 
  LayoutDashboard, 
  Target, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();
  
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'campaigns', name: 'Campaigns', icon: Target },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'predictions', name: 'Predictions', icon: BarChart3 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-lavender/50 z-40 hidden lg:flex flex-col p-8">
      <div className="mb-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <BarChart3 size={24} />
        </div>
        <span className="text-2xl font-black text-brand-dark tracking-tighter">SmartMD</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
              activeTab === item.id 
              ? 'bg-primary text-white shadow-xl shadow-primary/20' 
              : 'text-brand-gray hover:bg-lavender/50 hover:text-brand-dark'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-brand-gray group-hover:text-primary transition-colors'} />
              <span className="font-bold">{item.name}</span>
            </div>
            {activeTab === item.id && <ChevronRight size={18} />}
          </button>
        ))}
      </nav>

      <div className="mt-8 space-y-4">
        <div className="p-4 bg-lavender/30 rounded-2xl border border-lavender/50">
          <p className="text-xs font-black uppercase tracking-widest text-brand-gray mb-1">Current Plan</p>
          <p className="text-brand-dark font-black">Professional</p>
          <div className="mt-2 w-full bg-white h-1.5 rounded-full overflow-hidden">
             <div className="bg-primary h-full w-2/3"></div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
