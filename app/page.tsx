'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{
      background: `
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='1000' height='1000' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E"),
        radial-gradient(circle at 10% 20%, rgba(200, 232, 41, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(200, 232, 41, 0.05) 0%, transparent 40%),
        radial-gradient(ellipse at top left, #2c2c2c 0%, transparent 60%),
        radial-gradient(ellipse at bottom right, #1f1f1f 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, #171717 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, #1a1a1a 0%, transparent 50%),
        #0a0a0a
      `,
      backgroundAttachment: 'fixed',
    }}>
      {/* Wavy lime line overlay - same as dashboard */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-100,200 C150,100 350,300 500,200 C650,100 850,300 1100,200' stroke='rgba(200, 232, 41, 0.1)' stroke-width='2' fill='none'/%3E%3Cpath d='M-100,400 C200,300 400,500 600,400 C800,300 1000,500 1200,400' stroke='rgba(200, 232, 41, 0.05)' stroke-width='1' fill='none'/%3E%3Cpath d='M-100,800 C100,700 300,900 500,800 C700,700 900,900 1100,800' stroke='rgba(200, 232, 41, 0.08)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover', opacity: 0.6, zIndex: 0, pointerEvents: 'none',
      }} />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustedBy />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
