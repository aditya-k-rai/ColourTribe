import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const useCountUp = (end, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration, start]);

  return count;
};

const StatItem = ({ end, label, duration }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const count = useCountUp(end, duration, inView);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-display text-5xl md:text-6xl text-gold font-bold mb-2 flex items-center">
        {count.toLocaleString()}
        <span className={`transition-opacity duration-500 delay-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>+</span>
      </div>
      <div className="text-white/60 font-body text-sm md:text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
};

const StatsBar = () => {
  const stats = [
    { end: 500, label: "Businesses Served" },
    { end: 22, label: "Uniform Categories" },
    { end: 10000, label: "Pieces Delivered" },
    { end: 15, label: "Years Experience" }
  ];

  return (
    <section className="bg-navy py-16 w-full">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-12 md:gap-0">
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              <div className="flex-1 w-full flex justify-center">
                <StatItem end={stat.end} label={stat.label} duration={1800 + i * 200} />
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px bg-gold/30 h-16 self-center mx-4"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
