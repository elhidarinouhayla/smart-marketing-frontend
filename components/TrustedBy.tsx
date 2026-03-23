'use client';

export default function TrustedBy() {
  const partners = ['Google', 'HubSpot', 'Shopify', 'Meta', 'Salesforce'];

  return (
    <section className="py-20 bg-transparent border-y border-white/5">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] font-black text-[#737373] uppercase tracking-[0.4em] mb-12">
          Propelling 800+ high-growth marketing teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-x-24 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {partners.map((partner) => (
            <div 
              key={partner} 
              className="text-xl md:text-2xl font-black text-white hover:text-primary transition-all cursor-default select-none transition-transform hover:scale-110 duration-500 tracking-tighter"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
