import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Background blobs and lines to match the image exactly */}
      
      {/* Top Left Grey Blob */}
      <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] bg-[#2d2d2d] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] z-0 opacity-40 blur-2xl" />
      
      {/* Bottom Right Subtle Glow */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-tr from-[#1a1a1a] to-transparent z-0 opacity-30" />

      {/* Wavy Lime Lines via SVG */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20" preserveAspectRatio="none">
        <path 
          d="M -50 150 Q 100 50 250 150 Q 400 250 550 100" 
          stroke="#c8e829" 
          strokeWidth="1.5" 
          fill="none" 
          className="animate-pulse"
        />
        <path 
          d="M 800 600 Q 950 750 1100 600 Q 1250 450 1400 650" 
          stroke="#c8e829" 
          strokeWidth="1.5" 
          fill="none" 
          className="animate-pulse"
        />
      </svg>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustedBy />
        <Features />
        <Testimonials />
        <Footer />
      </div>

      <style jsx>{`
        main {
          background-color: #000000;
          background-image: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
        }
      `}</style>
    </main>
  );
}
