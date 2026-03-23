'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create scroll-based movement for the background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background moves and scales slightly on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <main 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-black"
    >
      {/* Dynamic Background Wrapper */}
      <motion.div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ 
          backgroundImage: 'url("/landing-bg.png")',
          y: backgroundY,
          scale: backgroundScale,
          filter: 'brightness(0.8)' // Adding subtle dark overlay for text readability
        }}
      />

      <div className="relative z-10 w-full h-full">
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
