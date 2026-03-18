'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-white">
      {/* Hexagonal Background Pattern (subtle dotted) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-[radial-gradient(#6366F1_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        {/* Left Side: Text and Content */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender text-primary font-semibold text-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Marketing Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-brand-dark font-heading">
            Make Smarter <span className="text-primary italic relative">Marketing Decisions</span> With AI
          </h1>

          <p className="text-xl text-brand-gray leading-relaxed max-w-xl">
            Unify your data, predict campaign outcomes, and optimize ROI with our intelligent marketing platform designed for modern B2B teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-accent transition-all shadow-xl shadow-primary/30 flex items-center justify-center"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/demo" 
              className="w-full sm:w-auto px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-lavender transition-all flex items-center justify-center gap-2"
            >
              <Play size={18} fill="currentColor" />
              Watch Demo
            </Link>
          </div>

          {/* Stats Row */}
          <div className="pt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-lavender/60">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-brand-dark">12K+</div>
              <div className="text-sm text-brand-gray font-medium uppercase tracking-wider">Marketers</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-brand-dark">98%</div>
              <div className="text-sm text-brand-gray font-medium uppercase tracking-wider">Accuracy Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-brand-dark">3.4x</div>
              <div className="text-sm text-brand-gray font-medium uppercase tracking-wider">Average ROI</div>
            </div>
          </div>
        </div>

        {/* Right Side: Mockup Image */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-3xl blur-2xl z-0 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative z-10 bg-white p-2 rounded-[2rem] shadow-2xl card-rounded border border-lavender/50 transform transition-transform hover:scale-[1.02] duration-500">
            <Image 
              src="/hero-dashboard.png" 
              alt="Marketing Dashboard Mockup" 
              width={800} 
              height={600} 
              className="rounded-[1.5rem] w-full h-auto"
            />
            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 md:-right-10 bg-white p-5 rounded-2xl shadow-xl border border-lavender/50 animate-bounce-slow hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                </div>
                <div>
                  <div className="text-xs text-brand-gray font-bold uppercase">ROI Growth</div>
                  <div className="text-lg font-bold text-brand-dark">+24.5%</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-5 rounded-2xl shadow-xl border border-lavender/50 animate-bounce-slow-alt hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <div className="text-xs text-brand-gray font-bold uppercase">New Contacts</div>
                  <div className="text-lg font-bold text-brand-dark">1,482</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
