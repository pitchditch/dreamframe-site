import React from 'react';
import {
  CalendarDays,
  Check,
  ChevronRight,
  House,
  MapPin,
  Phone,
  Ruler,
  ShieldCheck,
} from 'lucide-react';

const regions = [
  {
    name: 'Surrey & White Rock',
    neighbourhoods: 'South Surrey, Cloverdale, Fleetwood, Newton, East Beach and West Beach',
    image: '/lovable-uploads/baa94eb2-dd5a-4479-b809-801f52009eab.png',
  },
  {
    name: 'Langley',
    neighbourhoods: 'Walnut Grove, Willoughby and Murrayville',
    image: '/lovable-uploads/bb606d6a-bd92-4fa1-aceb-93bc03c8e231.png',
  },
  {
    name: 'Delta, Richmond & New Westminster',
    neighbourhoods: 'Tsawwassen, Ladner, North Delta, Steveston and New Westminster',
    image: '/lovable-uploads/baa94eb2-dd5a-4479-b809-801f52009eab.png',
  },
  {
    name: 'Burnaby & Vancouver',
    neighbourhoods: 'Burnaby Heights, Deer Lake, Kerrisdale, Dunbar and Kitsilano',
    image: '/lovable-uploads/bb606d6a-bd92-4fa1-aceb-93bc03c8e231.png',
  },
  {
    name: 'Tri-Cities',
    neighbourhoods: 'Coquitlam, Port Coquitlam, Port Moody, Burke Mountain and Westwood Plateau',
    image: '/lovable-uploads/baa94eb2-dd5a-4479-b809-801f52009eab.png',
  },
];

const trustItems = [
  { icon: CalendarDays, text: 'Same-week routes when available' },
  { icon: ShieldCheck, text: 'No travel fee inside service area' },
  { icon: House, text: '1-, 2- and 3-storey homes' },
  { icon: ShieldCheck, text: 'Owner-operated and insured' },
  { icon: Phone, text: 'Not sure about your city? Call us' },
];

const ServiceAreasMap = () => {
  return (
    <section className="bg-[#f7f9fc] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 text-center">
            <div className="mb-3 inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-emerald-700 shadow-sm">
              SERVICE AREAS &amp; INSTANT PRICING
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Gutter Cleaning Across <span className="text-bc-red">Metro Vancouver</span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
              Enter your address to check gutter-cleaning pricing and current route availability in your area.
            </p>
          </div>

          <div className="mb-5 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)] md:grid-cols-5">
            {trustItems.map(({ icon: Icon, text }, index) => (
              <div
                key={text}
                className={`flex min-h-[82px] items-center gap-3 px-5 py-4 ${index !== trustItems.length - 1 ? 'border-b border-slate-200 md:border-b-0 md:border-r' : ''}`}
              >
                <Icon className="h-6 w-6 shrink-0 text-bc-red" strokeWidth={1.8} />
                <span className="text-sm font-semibold leading-snug text-slate-800">{text}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-5 lg:grid-cols-[minmax(0,1.75fr)_minmax(330px,0.9fr)]">
            <div>
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-slate-400">Our service areas</span>
                  <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Local gutter-cleaning coverage</h3>
                </div>
                <div className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 md:block">5 regional routes</div>
              </div>

              <div className="grid gap-3 md:grid-cols-6">
                {regions.map((region, index) => (
                  <article
                    key={region.name}
                    className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${index < 3 ? 'md:col-span-2' : 'md:col-span-3'}`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={region.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                      <div className="absolute right-3 top-3 rounded-full border border-white/25 bg-emerald-700/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        Local routes
                      </div>
                    </div>
                    <div className="p-3.5">
                      <h4 className="text-base font-extrabold leading-tight text-slate-950">{region.name}</h4>
                      <p className="mt-1.5 min-h-[40px] text-xs leading-relaxed text-slate-600">{region.neighbourhoods}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button className="inline-flex flex-1 items-center justify-center rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-bc-red transition hover:border-bc-red hover:bg-red-50">
                          Check availability
                        </button>
                        <a href="/service-areas" className="inline-flex items-center gap-0.5 px-1 text-xs font-bold text-slate-600 hover:text-bc-red">
                          Local details <ChevronRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="flex h-full flex-col rounded-[20px] bg-[#07172b] p-5 text-white shadow-[0_18px_35px_rgba(2,10,23,0.24)] md:p-6">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-bc-red ring-1 ring-red-500/25">
                <Ruler className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">Check Gutter Cleaning Pricing</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Enter your address to estimate pricing based on your home height, roofline and gutter length.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-3 text-sm text-slate-500 shadow-inner">
                  <MapPin className="h-4 w-4 text-bc-red" />
                  <span>Enter your address...</span>
                </div>
                <button className="w-full rounded-xl bg-bc-red px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-red-950/20 transition hover:brightness-95">
                  Check My Address
                </button>
                <button className="w-full rounded-xl border border-white/60 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/5">
                  Check Live Availability
                </button>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-center">
                <p className="text-sm text-slate-300">Most homes: <span className="text-xl font-extrabold text-bc-red">$250–$440</span></p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Final pricing depends on gutter length, home height, debris buildup and roof access.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  'Satellite-measured pricing',
                  'No site visit needed for most homes',
                  'Owner-reviewed before booking',
                  'No payment required today',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[#07172b]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-700 ring-4 ring-white shadow">JF</div>
              <div>
                <p className="font-extrabold text-slate-950">Jayden — Owner &amp; Operator</p>
                <p className="text-sm text-slate-500">Every quote is reviewed before booking</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-slate-700">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-bc-red" />Fully insured</span>
              <a href="tel:7788087620" className="inline-flex items-center gap-2 text-slate-950 hover:text-bc-red"><Phone className="h-5 w-5 text-bc-red" />778-808-7620</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasMap;
