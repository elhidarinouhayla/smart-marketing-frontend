'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-[#0a0a0a]">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#c8e829_1px,transparent_1px)] [background-size:32px_32px]"></div>
      
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        {/* Left Side: Text and Content */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest animate-fade-in border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Marketing Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-white font-heading">
            Make Smarter <span className="text-primary italic">Marketing Decisions</span> With AI
          </h1>

          <p className="text-xl text-[#9ca3af] leading-relaxed max-w-xl font-medium">
            Unify your data, predict campaign outcomes, and optimize ROI with our intelligent marketing platform designed for modern B2B teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-10 py-4 bg-primary text-black font-black rounded-full hover:brightness-110 transition-all shadow-xl shadow-primary/10 flex items-center justify-center uppercase tracking-wider"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/demo" 
              className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Play size={18} fill="currentColor" />
              Watch Demo
            </Link>
          </div>

          {/* Stats Row */}
          <div className="pt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/5">
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">12K+</div>
              <div className="text-[10px] text-[#737373] font-black uppercase tracking-[0.2em]">Marketers</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">98%</div>
              <div className="text-[10px] text-[#737373] font-black uppercase tracking-[0.2em]">Accuracy Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">3.4x</div>
              <div className="text-[10px] text-[#737373] font-black uppercase tracking-[0.2em]">Average ROI</div>
            </div>
          </div>
        </div>

        {/* Right Side: Mockup Image */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl blur-3xl z-0 group-hover:opacity-100 transition-opacity opacity-50"></div>
          <div className="relative z-10 bg-[#111111] p-2 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 transform transition-transform hover:scale-[1.02] duration-700">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] pointer-events-none" />
            <Image 
              src="/hero-dashboard.png" 
              alt="Marketing Dashboard Mockup" 
              width={800} 
              height={600} 
              className="rounded-[2rem] w-full h-auto opacity-90 object-cover grayscale-[0.2]"
            />
            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 md:-right-10 bg-[#111111]/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/10 animate-bounce-slow hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                </div>
                <div>
                  <div className="text-[10px] text-[#737373] font-black uppercase tracking-wider">ROI Growth</div>
                  <div className="text-xl font-black text-white">+24.5%</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 md:-left-12 bg-[#111111]/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/10 animate-bounce-slow-alt hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <div className="text-[10px] text-[#737373] font-black uppercase tracking-wider">New Contacts</div>
                  <div className="text-xl font-black text-white">1,482</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
