import React from 'react';
import { MapPin, ShieldCheck, Zap, Droplets } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">About Skyline</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Elegance Built Over Decades</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Photo of Apartment & Google Map Location */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80" 
                alt="Skyline Tower Exterior" 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Google Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 text-xs font-semibold text-slate-400 border-b border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Skyline Enclave, Sector 5, Salt Lake, Kolkata, India
              </div>
              <iframe
                title="Skyline Map Location"
                src="https://maps.google.com/maps?q=Salt%20Lake%20Sector%205%20Kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-64 border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Side: Description & History */}
          <div className="space-y-6 text-slate-300">
            <h4 className="text-2xl font-bold text-white tracking-tight">
              A Legacy of Community, Comfort, and Convenience
            </h4>
            <p className="leading-relaxed text-sm sm:text-base">
              Founded in 2012, Skyline Residency stands tall as one of the premier gated housing societies. Comprising 4 majestic towers and over 350 modern families, it was designed with an eco-conscious philosophy including solar-powered common areas, rain-water harvesting systems, and expansive green zones.
            </p>
            <p className="leading-relaxed text-sm sm:text-base">
              Over the last 14 years, our community has consistently ranked amongst the cleanest and safest residential developments in the metropolitan district. We provide an uninterrupted lifestyle featuring 100% DG power backup, 3-tier RFID biometric security, and dedicated maintenance staff on standby 24 hours a day.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white">24/7</p>
                <p className="text-[11px] text-slate-400">Security Patrol</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white">100%</p>
                <p className="text-[11px] text-slate-400">Power Backup</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-white">Pure RO</p>
                <p className="text-[11px] text-slate-400">Water Plant</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};