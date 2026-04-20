import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';

const USPList = [
  { title: "In-House Manufacturing", desc: "End-to-end production ensuring quality control and faster turnarounds." },
  { title: "Custom Logo Embroidery", desc: "Your brand identity stitched directly onto the uniform fabric." },
  { title: "All Sizes XSâ€“3XL", desc: "Inclusive sizing to guarantee a perfect fit for all your staff." },
  { title: "7-Day Standard Delivery", desc: "Lightning fast processing for standard catalogue items." },
  { title: "500+ Happy Clients", desc: "Trusted by top businesses, hospitals, and corporate chains across India." },
  { title: "Quality Cloth Guarantee", desc: "Durable, breathable fabrics designed for demanding work environments." }
];

const WhyChooseUs = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-24 bg-cream overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Column - Text content */}
        <motion.div 
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gold text-sm">âœ¦</span>
            <span className="text-gold font-bold tracking-widest uppercase text-xs">Our Advantage</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-navy font-bold mb-10 leading-tight">
            Why Choose<br/>Colour Tribe
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
            {USPList.map((usp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + (i * 0.06) }}
                className="flex items-start gap-4"
              >
                <CheckCircle className="text-gold w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-navy mb-1 text-sm md:text-base">{usp.title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{usp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Image Collage */}
        <motion.div 
          initial={{ x: 60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative min-h-[500px]"
        >
          <div className="grid grid-cols-2 gap-4 h-full relative z-10 w-full max-w-[500px] mx-auto lg:ml-auto">
            <div className="flex flex-col gap-4 mt-8">
              <div className="bg-[#152336] h-64 rounded-xl border-2 border-gold shadow-lg flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform">ðŸ§µ</span>
                <div className="absolute top-3 left-3 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded shadow-md z-20">
                  Colour Tribe Certified
                </div>
              </div>
              <div className="bg-[#152336] h-48 rounded-xl shadow-md flex items-center justify-center hover:-translate-y-1 transition-transform">
                <span className="text-4xl">ðŸ‘”</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-[#152336] h-48 rounded-xl shadow-md flex items-center justify-center hover:-translate-y-1 transition-transform">
                <span className="text-4xl">ðŸª¡</span>
              </div>
              <div className="bg-[#152336] h-72 rounded-xl border border-gray-200 shadow-md flex items-center justify-center transform hover:rotate-1 transition-all origin-bottom-right">
                <span className="text-6xl text-white opacity-50">âœ¨</span>
                <p className="absolute bottom-4 left-4 text-white font-display text-lg">Perfect Fit.</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default WhyChooseUs;
