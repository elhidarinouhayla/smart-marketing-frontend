'use client';

import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for small teams getting started with AI marketing.',
    features: ['Up to 5 campaigns', 'Unified Data Hub (limited)', 'Basic Predictive Analytics', 'Email Support'],
    cta: 'Start with Starter',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$149',
    description: 'Our most popular plan for high-performance marketing teams.',
    features: ['Unlimited campaigns', 'Full Unified Data Hub', 'Advanced Predictions', 'Smart Recommendations', 'Priority Support'],
    cta: 'Get Started with Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large-scale marketing organizations.',
    features: ['Custom AI Models', 'Full White-labeling', 'API Access', 'Dedicated Account Manager', 'SLA Guarantee'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-40 bg-lavender/40 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold font-heading tracking-tight leading-tight text-brand-dark">
            Simple, Transparent <span className="text-primary italic">Pricing</span>
          </h2>
          <p className="text-xl text-brand-gray font-medium">
            No hidden fees. No complicated tiers. Just pure marketing intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-10 rounded-[2.5rem] border transition-all duration-300 transform hover:scale-105 ${
                plan.highlighted 
                ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/40 scale-105 z-10' 
                : 'bg-white text-foreground border-lavender shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-foreground text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="mb-10">
                <h3 className="text-2xl font-bold font-heading mb-3 uppercase tracking-wider">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-black">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className={plan.highlighted ? 'text-lavender/80 font-bold' : 'text-brand-gray font-bold'}>/mo</span>}
                </div>
                <p className={`line-clamp-2 leading-relaxed font-medium ${plan.highlighted ? 'text-lavender/90' : 'text-brand-gray'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="flex-grow space-y-6 mb-12">
                <div className={`font-black uppercase text-xs tracking-widest pb-4 border-b ${plan.highlighted ? 'border-lavender/20' : 'border-lavender'}`}>
                  What&apos;s Included
                </div>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold tracking-tight">
                    <Check size={20} className={plan.highlighted ? 'text-yellow-400' : 'text-primary'} strokeWidth={3} />
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-full font-black text-lg transition-all shadow-lg ${
                plan.highlighted 
                ? 'bg-white text-primary hover:bg-lavender hover:scale-105' 
                : 'bg-primary text-white hover:bg-accent hover:scale-105 shadow-primary/30'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
