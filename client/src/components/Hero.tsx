import React, { useState, useEffect } from 'react';
import { NoticeBoard } from './NoticeBoard';
import type { Notice } from '../types';

interface HeroProps {
  notices: Notice[];
  onExplore: () => void;
}

const phrases = [
  'Welcome to Skyline Residency',
  'Luxury Living with Security & Smart Community',
  'Eco-Friendly Green Spaces & 24/7 Amenities',
  'Harmonious Living for Peaceful Families'
];

export const Hero: React.FC<HeroProps> = ({ notices, onExplore }) => {
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simulated Typed.js Effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIdx];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText.length < currentPhrase.length) {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      } else if (!isDeleting && typedText.length === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText.length > 0) {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Requirement: Low opacity background image of the apartment */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Typed Header and Pitch */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Premium Residential Haven
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight min-h-[140px] sm:min-h-[120px]">
            {typedText}
            <span className="animate-pulse text-cyan-400">|</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Experience smart residential convenience with transparent maintenance tracking, real-time administrative notices, world-class club amenities, and 3-tier security infrastructure.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={onExplore}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all"
            >
              Explore Society
            </button>
            <a 
              href="#about"
              className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-xl font-semibold transition-all"
            >
              Read History
            </a>
          </div>
        </div>

        {/* Right Side: Notice Section */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <NoticeBoard notices={notices} />
        </div>

      </div>
    </section>
  );
};