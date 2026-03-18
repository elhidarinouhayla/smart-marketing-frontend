'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import api from '@/lib/axios';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('auth/login', formData);
      const { token } = response.data;
      localStorage.setItem('auth_token', token);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMsg = 'The username or password you entered is incorrect.';
      if (err.detail) {
        errorMsg = typeof err.detail === 'string' 
          ? err.detail 
          : Array.isArray(err.detail) 
            ? err.detail[0]?.msg || JSON.stringify(err.detail)
            : JSON.stringify(err.detail);
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-lavender/30 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Dotted Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Floating Sparkle/Brain Icons (Decorative) */}
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-gray font-bold mb-8 hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        {/* Auth Card */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-lavender/50 transform transition-all duration-300">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo.png" 
                alt="SmartMD Logo" 
                width={56} 
                height={56} 
                className="w-14 h-14 shadow-lg bg-white rounded-xl p-1.5"
              />
            </Link>
            <h1 className="text-3xl font-black font-heading text-brand-dark mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-brand-gray font-bold">
              Access your marketing command center.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 text-sm font-bold animate-shake">
                {error}
              </div>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-gray ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-gray group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="marketing_pro"
                   className="block w-full pl-11 pr-4 py-4 bg-lavender/20 border-2 border-transparent rounded-[1.25rem] font-bold text-primary placeholder:text-brand-gray focus:outline-none focus:ring-0 focus:border-primary/30 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-brand-gray">Password</label>
                <Link href="#" className="text-xs font-black text-primary hover:underline uppercase tracking-tight">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-gray group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-4 bg-lavender/20 border-2 border-transparent rounded-[1.25rem] font-bold text-primary placeholder:text-brand-gray focus:outline-none focus:ring-0 focus:border-primary/30 focus:bg-white transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-gray hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-5 rounded-full font-black text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 ${
                isLoading 
                ? 'bg-lavender text-primary/40 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-accent hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-primary/20 border-t-white rounded-full animate-spin"></div>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="mt-10 text-center text-brand-gray font-bold">
            Don't have an account? {' '}
            <Link href="/signup" className="text-primary hover:underline font-black">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
