import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #000000 100%)' }}>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
