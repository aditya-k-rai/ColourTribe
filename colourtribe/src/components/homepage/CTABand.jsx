import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTABand = () => {
  return (
    <section className="bg-gradient-to-br from-gold to-brand-accent py-16 relative overflow-hidden">
      {/* Abstract decorative elements */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full border-4 border-white opacity-10 pointer-events-none"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full border-4 border-white opacity-10 pointer-events-none"
      ></motion.div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
            Ready to Outfit Your Team?
          </h2>
          <p className="text-white/80 text-lg">
            Get a custom bulk quote in 24 hours. No commitment required.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="bg-white text-navy hover:bg-navy hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg whitespace-nowrap block">
              Request Quote Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="tel:+919717355779" className="border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full transition-colors whitespace-nowrap block">
              Call Us: 97173 55779
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
