'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-lavender py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="SmartMD Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold text-primary font-heading tracking-tight">
            SmartMD
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-brand-gray font-medium">
          <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/#solutions" className="hover:text-primary transition-colors">Solutions</Link>
          {isAuthenticated && (
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                pathname === '/dashboard' ? 'bg-lavender text-primary' : 'hover:text-primary'
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link 
                href="/login" 
                className="text-brand-gray font-semibold hover:text-primary transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:bg-accent transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-brand-gray font-semibold hover:text-red-500 transition-colors px-4 py-2 group"
            >
              <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
