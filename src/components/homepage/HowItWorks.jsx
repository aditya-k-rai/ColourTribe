import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const StepCard = ({ number, title, description, icon, index }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col items-center text-center relative z-10 flex-1"
    >
      <div className="relative mb-6">
        <div className="font-display font-bold text-[80px] leading-none text-gold/10 absolute -inset-y-4 inset-x-0 mx-auto select-none flex items-center justify-center z-0">
          0{number}
        </div>
        <div className="w-16 h-16 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-2xl z-10 relative">
          {icon}
        </div>
      </div>
      <h3 className="font-display text-xl text-navy font-bold mb-3">{title}</h3>
      <p className="text-gray-500 text-sm max-w-[260px]">{description}</p>
    </motion.div>
  );
};

const HowItWorks = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl mb-4 text-navy font-bold">How Bulk Ordering Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">A seamless process designed for B2B procurement</p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-4 max-w-5xl mx-auto mb-16">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px z-0">
            <svg width="100%" height="2" className="absolute top-0 overflow-visible">
              <motion.line 
                x1="0" y1="0" x2="100%" y2="0" 
                stroke="#c9a84c" 
                strokeWidth="2" 
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <StepCard 
            number={1} 
            title="Browse & Select" 
            description="Explore our extensive catalogue, select your required products, sizes, and quantities." 
            icon="🌱"
            index={0}
          />
          <StepCard 
            number={2} 
            title="Request a Quote" 
            description="Submit your quote list. Our team calculates the best bulk pricing based on your order size." 
            icon="📋"
            index={1}
          />
          <StepCard 
            number={3} 
            title="Confirm & Deliver" 
            description="Approve the sample, confirm production, and receive doorstep delivery across India." 
            icon="📦"
            index={2}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-navy text-white hover:bg-gold hover:text-navy font-bold border border-navy hover:border-gold py-4 px-10 rounded-full transition-all duration-300">
            Start Your Order &#8594;
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
