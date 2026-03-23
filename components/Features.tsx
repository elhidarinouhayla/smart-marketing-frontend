'use client';

import { 
  BarChart3, 
  Database, 
  Sparkles 
} from 'lucide-react';

const features = [
  {
    title: 'Predictive Analytics',
    description: 'Forecast campaign results before launch with machine learning that analyzes historical data and market trends.',
    icon: BarChart3,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Unified Data Hub',
    description: 'Connect all your marketing channels in one place. Say goodbye to fragmented data and hello to a single source of truth.',
    icon: Database,
    color: 'bg-blue-500/10 text-blue-400',
  },
  {
    title: 'Smart Recommendations',
    description: 'AI-driven action suggestions to boost performance. Get real-time advice on budget allocation and creative optimization.',
    icon: Sparkles,
    color: 'bg-purple-500/10 text-purple-400',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white font-heading">
            Everything you need to <span className="text-primary italic">Scale ROI</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-10 rounded-[2.5rem] bg-[#111111] border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 relative z-10 shadow-lg`}>
                <feature.icon size={32} strokeWidth={2.5} />
              </div>
              <h4 className="text-2xl font-black text-white mb-4 relative z-10">{feature.title}</h4>
              <p className="text-[#9ca3af] leading-relaxed font-medium relative z-10">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
