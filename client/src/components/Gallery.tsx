import React, { useState } from 'react';

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80', title: 'Main Elevation View' },
  { id: 2, url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80', title: 'Infinity Swimming Pool' },
  { id: 3, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80', title: 'Health Club & Gym' },
  { id: 4, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', title: 'Clubhouse Banquet Hall' },
  { id: 5, url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80', title: 'Lush Podium Gardens' }
];

export const Gallery: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Requirement: at most 3 images shown, sideways scroll, hovered is larger while others shrink
  const visibleImages = [
    galleryImages[startIndex % galleryImages.length],
    galleryImages[(startIndex + 1) % galleryImages.length],
    galleryImages[(startIndex + 2) % galleryImages.length],
  ];

  const handleNext = () => setStartIndex((prev) => (prev + 1) % galleryImages.length);
  const handlePrev = () => setStartIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section id="gallery" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">Society Gallery</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Spaces Built For Joy</h3>
          </div>

          <div className="flex gap-2 mt-4 sm:mt-0">
            <button 
              onClick={handlePrev} 
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-all"
            >
              <ChevronLeftIcon />
            </button>
            <button 
              onClick={handleNext} 
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-all"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* 3-Image Showcase with Dynamic Flex Expansion */}
        <div className="flex flex-col md:flex-row gap-4 h-[420px] transition-all duration-500 ease-in-out">
          {visibleImages.map((img, index) => {
            const isHovered = hoveredIdx === index;
            const hasHover = hoveredIdx !== null;

            return (
              <div
                key={img.id}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative rounded-2xl overflow-hidden border border-slate-700/80 cursor-pointer shadow-xl transition-all duration-500 ease-out ${
                  hasHover 
                    ? (isHovered ? 'md:flex-3' : 'md:flex-[0.8] opacity-60') 
                    : 'md:flex-1'
                } h-full`}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-lg font-bold text-white tracking-wide">{img.title}</h4>
                  <p className="text-xs text-cyan-400 font-semibold mt-1">Skyline Amenities</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};