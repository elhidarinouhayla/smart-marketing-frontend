'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Head of Growth at TechNova',
    quote: 'SmartMD has completely changed how we approach our marketing budget. The ROI predictions are scary accurate—it\'s like having a crystal ball for our performance teams.',
    avatar: '👩‍💼',
  },
  {
    name: 'James Rodriguez',
    role: 'CMO, Shopify Brands',
    quote: 'Finally, a platform that understands exactly what marketers need. The unified data hub saves us hours every single week on reporting and analysis.',
    avatar: '👨‍💼',
  },
  {
    name: 'Elena Vance',
    role: 'Founder, CloudScale',
    quote: 'The smart recommendations have boosted our conversion rates by 42% in just two months. It\'s the most intuitive tool we\'ve ever integrated into our stack.',
    avatar: '👨‍🎨',
  },
];

export default function Testimonials() {
  return (
    <section id="case-studies" className="py-24 bg-transparent overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] skew-x-[-12deg] -z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black font-heading text-center mb-20 tracking-tight text-white">
          Don&apos;t Take Our <span className="text-primary italic">Word For It</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="bg-[#111111] p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg italic text-[#d1d5db] mb-8 font-medium leading-relaxed relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8 relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl shadow-inner border border-primary/20">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-black text-lg font-heading text-white">{testimonial.name}</h4>
                  <p className="text-[#737373] text-xs font-black uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
