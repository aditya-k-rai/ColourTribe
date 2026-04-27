import React from 'react';

const MarqueeStrip = () => {
  return (
    <div className="bg-gradient-to-r from-[#b39543] via-gold to-[#b39543] h-12 flex items-center overflow-hidden border-y border-[#a38533] relative">
      {/* Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gold to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gold to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-default">
        {/* Repeat 4 times for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-navy font-mono text-xs font-bold uppercase tracking-[0.2em] px-4">
            HOTELS ✦ RESTAURANTS ✦ HOSPITALS ✦ CORPORATE ✦ SECURITY ✦ SCHOOLS ✦ FACTORIES ✦ AVIATION ✦ RETAIL ✦ SALONS ✦
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
