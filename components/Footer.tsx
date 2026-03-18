'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-lavender pt-24 pb-12 overflow-hidden border-t border-lavender">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo + Tagline */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="SmartMD Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10 shadow-lg bg-white rounded-lg p-1"
              />
              <span className="text-3xl font-black text-primary font-heading tracking-tight">
                SmartMD
              </span>
            </Link>
            <p className="text-brand-gray font-medium text-lg leading-relaxed max-w-xs">
              Empowering marketing teams with artificial intelligence to optimize data, predict outcomes, and scale ROI effortlessly.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-lavender/50 hover:-translate-y-1 transition-transform">
                <Twitter size={20} fill="currentColor" />
              </Link>
              <Link href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-lavender/50 hover:-translate-y-1 transition-transform">
                <Linkedin size={20} fill="currentColor" />
              </Link>
              <Link href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-lavender/50 hover:-translate-y-1 transition-transform">
                <Facebook size={20} fill="currentColor" />
              </Link>
              <Link href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-lavender/50 hover:-translate-y-1 transition-transform">
                <Github size={20} fill="currentColor" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-8">
            <h4 className="text-xl font-black font-heading text-brand-dark uppercase tracking-widest text-xs border-b border-white pb-4 inline-block">Product</h4>
            <ul className="space-y-4 font-bold text-brand-gray">
              <li><Link href="#features" className="hover:text-primary transition-colors">AI Features</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-8">
            <h4 className="text-xl font-black font-heading text-brand-dark uppercase tracking-widest text-xs border-b border-white pb-4 inline-block">Company</h4>
            <ul className="space-y-4 font-bold text-brand-gray">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Newsroom</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-8">
            <h4 className="text-xl font-black font-heading text-brand-dark uppercase tracking-widest text-xs border-b border-white pb-4 inline-block">Stay Updated</h4>
            <div className="space-y-4">
              <p className="text-brand-gray font-bold text-sm">Join our newsletter to get the latest in AI marketing.</p>
              <div className="flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-lavender/40 border border-white">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-brand-dark px-4 py-2 w-full font-bold placeholder:text-lavender placeholder:font-black"
                />
                <button className="bg-primary text-white font-black px-6 py-2 rounded-xl hover:bg-accent transition-colors shadow-lg shadow-primary/20">
                  Join
                </button>
              </div>
            </div>
            <div className="pt-2 text-primary font-black text-sm">
              support@smartmd.ai
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/50 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-gray text-sm font-bold opacity-75 uppercase tracking-[0.15em]">
          <div>© 2026 SmartMD Intelligence Inc. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary underline">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary underline">Terms of Service</Link>
            <Link href="#" className="hover:text-primary underline">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
