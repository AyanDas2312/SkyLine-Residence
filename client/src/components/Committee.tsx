import React from 'react';
import { Quote } from 'lucide-react';

const members = [
  {
    name: 'Dr. Arindam Sen',
    role: 'Society President',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    words: 'Our mission is to maintain a transparent, secure, and technologically advanced community environment for all families.'
  },
  {
    name: 'Mrs. Sharmila Mukherjee',
    role: 'General Secretary',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    words: 'Coordination and proactive maintenance are our priorities. We encourage every resident to share ideas freely.'
  },
  {
    name: 'Mr. Rajesh Agarwal',
    role: 'Head of Accounts & Treasury',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    words: 'Every rupee collected in maintenance is audited and strategically invested into society infrastructure.'
  }
];

export const Committee: React.FC = () => {
  return (
    <section id="committee" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">Leadership</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The Managing Committee</h3>
          <p className="text-slate-400 text-sm mt-3">Elected representatives committed to excellence and transparency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <div 
              key={i} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>

              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <p className="text-xs text-cyan-400 font-semibold">{member.role}</p>
              </div>

              <div className="relative pt-4 border-t border-slate-800">
                <Quote className="w-6 h-6 text-slate-700 absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-1" />
                <p className="text-xs text-slate-300 italic text-center leading-relaxed mt-2">
                  "{member.words}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};