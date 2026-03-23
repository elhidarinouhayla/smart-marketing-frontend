'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url("/landing-bg.png")' }}>
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
