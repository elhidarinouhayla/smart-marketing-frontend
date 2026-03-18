'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-lavender/20 flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-primary font-black uppercase tracking-widest animate-pulse">Initializing Dashboard...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-lavender/20">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-lavender/50 text-center">
          <h1 className="text-4xl font-black font-heading text-brand-dark mb-4 italic">
            Hello Dashboard
          </h1>
          <p className="text-brand-gray font-bold text-lg">
            Welcome back to your Smart Marketing command center.
          </p>
          <div className="mt-12 p-24 border-4 border-dashed border-lavender rounded-[2rem] flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-colors">
            <div className="w-20 h-20 rounded-full bg-lavender flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            </div>
            <div className="text-lavender font-black text-2xl uppercase tracking-widest group-hover:text-primary/30 transition-colors">
              Empty Dashboard
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
