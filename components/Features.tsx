'use client';

import Image from 'next/image';

const features = [
  {
    title: 'Predictive Analytics',
    description: 'Forecast campaign results before launch with machine learning that analyzes historical data and market trends.',
    image: '/predictive.png',
  },
  {
    title: 'Unified Data Hub',
    description: 'Connect all your marketing channels in one place. Say goodbye to fragmented data and hello to a single source of truth.',
    image: '/unified-data.png',
  },
  {
    title: 'Smart Recommendations',
    description: 'AI-driven action suggestions to boost performance. Get real-time advice on budget allocation and creative optimization.',
    image: '/recommendations.png',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-lavender/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-center mb-20 tracking-tight text-brand-dark">
          Don&apos;t Take Our <span className="text-primary italic">Word For It</span>
        </h2>
          <p className="text-xl text-brand-gray leading-relaxed font-medium">
            Stop guessing and start knowing. Our AI-powered suite gives you the edge in a competitive market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white p-10 rounded-[2rem] border border-lavender/50 shadow-xl shadow-lavender/40 hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-lavender/50 flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  width={64} 
                  height={64} 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-brand-dark">
                {feature.title}
              </h3>
              <p className="text-brand-gray leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
