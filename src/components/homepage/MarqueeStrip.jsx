import React from 'react';

const MarqueeStrip = () => {
  return (
    <div className="bg-gold h-12 flex items-center overflow-hidden border-y border-[#b39543]">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-default">
        {/* Repeat 3 times for seamless loop */}
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-navy font-mono text-xs font-bold uppercase tracking-[0.2em] px-4">
            HOTELS ✦ RESTAURANTS ✦ HOSPITALS ✦ CORPORATE ✦ SECURITY ✦ SCHOOLS ✦ FACTORIES ✦ AVIATION ✦ RETAIL ✦ SALONS ✦
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
