'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-transparent pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo + Tagline */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-black text-2xl">
                S
              </div>
              <span className="text-3xl font-black text-white font-heading tracking-tight">
                SmartMarketing
              </span>
            </Link>
            <p className="text-[#a3a3a3] font-medium text-lg leading-relaxed max-w-xs">
              Empowering marketing teams with artificial intelligence to optimize data, predict outcomes, and scale ROI effortlessly.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Facebook, Github].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all border border-white/5">
                  <Icon size={18} fill="currentColor" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-[#737373] uppercase tracking-[0.3em] border-b border-white/5 pb-4 inline-block">Product</h4>
            <ul className="space-y-4 font-bold text-white/60">
              <li><Link href="#features" className="hover:text-primary transition-colors">AI Features</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-[#737373] uppercase tracking-[0.3em] border-b border-white/5 pb-4 inline-block">Company</h4>
            <ul className="space-y-4 font-bold text-white/60">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Newsroom</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-[#737373] uppercase tracking-[0.3em] border-b border-white/5 pb-4 inline-block">Stay Updated</h4>
            <div className="space-y-4">
              <p className="text-[#a3a3a3] font-bold text-sm">Join our newsletter to get the latest in AI marketing.</p>
              <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/10">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-white px-4 py-2 w-full font-bold placeholder:text-[#404040]"
                />
                <button className="bg-primary text-black font-black px-6 py-2.5 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/10">
                  Join
                </button>
              </div>
            </div>
            <div className="pt-2 text-primary font-black text-sm tracking-wider">
              support@smartmarketing.ai
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[#737373] text-[10px] font-black uppercase tracking-[0.2em]">
          <div>© 2026 SmartMarketing Intelligence Inc. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
