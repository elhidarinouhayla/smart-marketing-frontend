'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, User, Mail, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import api from '@/lib/axios';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      await api.post('/auth/register', formData);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      let errorMsg = 'An unexpected error occurred during registration. Please try again.';
      // Check if err.response.data exists and contains detail
      if (err.response && err.response.data && err.response.data.detail) {
        const detail = err.response.data.detail;
        errorMsg = typeof detail === 'string' 
          ? detail 
          : Array.isArray(detail) 
            ? detail[0]?.msg || JSON.stringify(detail)
            : JSON.stringify(detail);
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-lavender/30 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-lavender/50 text-center max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8 shadow-lg shadow-green-100/50">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-black font-heading text-brand-dark mb-4">Account Created!</h1>
          <p className="text-brand-gray font-bold text-lg mb-8">
            Welcome to the future of marketing intelligence. Redirecting to login...
          </p>
          <div className="w-full bg-lavender/30 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full animate-progress-bar"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lavender/30 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Dotted Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="w-full max-w-md relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-gray font-bold mb-8 hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-lavender/50 transition-all duration-300">
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
              Start Your AI Journey
            </h1>
            <p className="text-brand-gray font-bold">
              Join 12k+ top-tier marketers today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 text-sm font-bold">
                {error}
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-gray ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-gray group-focus-within:text-primary transition-colors text-lavender/80">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="marketing_pro"
                  className="block w-full pl-11 pr-4 py-4 bg-lavender/20 border-2 border-transparent rounded-[1.25rem] font-bold text-primary placeholder:text-brand-gray focus:outline-none focus:ring-0 focus:border-primary/30 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-gray ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-gray group-focus-within:text-primary transition-colors text-lavender/80">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@company.com"
                  className="block w-full pl-11 pr-4 py-4 bg-lavender/20 border-2 border-transparent rounded-[1.25rem] font-bold text-primary placeholder:text-brand-gray focus:outline-none focus:ring-0 focus:border-primary/30 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-gray ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-gray group-focus-within:text-primary transition-colors text-lavender/80">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-4 bg-lavender/20 border-2 border-transparent rounded-[1.25rem] font-bold text-primary placeholder:text-brand-gray focus:outline-none focus:ring-0 focus:border-primary/30 focus:bg-white transition-all shadow-sm"
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
              ) : 'Sign Up'}
            </button>
          </form>

          <p className="mt-10 text-center text-brand-gray font-bold">
            Already have an account? {' '}
            <Link href="/login" className="text-primary hover:underline font-black">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
