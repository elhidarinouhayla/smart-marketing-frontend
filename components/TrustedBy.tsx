'use client';

export default function TrustedBy() {
  const partners = ['Google', 'HubSpot', 'Shopify', 'Meta', 'Salesforce'];

  return (
    <section className="py-16 bg-white border-y border-lavender/50">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-bold text-brand-gray uppercase tracking-[0.2em] mb-10">
          Trusted by 800+ marketing teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-24">
          {partners.map((partner) => (
            <div 
              key={partner} 
              className="text-2xl md:text-3xl font-black text-brand-gray/30 hover:text-primary transition-all cursor-default select-none transition-transform hover:scale-110 duration-300"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
