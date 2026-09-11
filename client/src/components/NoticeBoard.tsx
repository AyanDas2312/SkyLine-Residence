import React, { useState, useEffect } from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import type { Notice } from '../types';

interface NoticeBoardProps {
  notices: Notice[];
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Requirement: recent notices are infinitely scrolled sideward after 3 seconds, pauses on hover
  useEffect(() => {
    if (notices.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [notices.length, isPaused]);

  if (notices.length === 0) return null;

  const current = notices[currentIndex];

  return (
    <div 
      className="bg-slate-900/85 backdrop-blur-md border border-slate-700/70 rounded-2xl p-5 shadow-2xl w-full max-w-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <Bell className="w-4 h-4 animate-bounce" />
          <span>LIVE NOTICE BOARD</span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">
          {currentIndex + 1} of {notices.length}
        </span>
      </div>

      <div className="min-h-[120px] flex flex-col justify-between transition-all duration-500 ease-in-out">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              current.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
              current.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {current.priority} Priority
            </span>
            <span className="text-xs text-slate-400">{current.date}</span>
          </div>
          <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">{current.title}</h4>
          <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{current.description}</p>
        </div>

        <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-cyan-400" />
            Hover to pause scroll
          </span>
          <div className="flex gap-1">
            {notices.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-cyan-400 w-3' : 'bg-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};