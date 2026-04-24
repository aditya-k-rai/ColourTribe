import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '+91 ' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Show after short delay if not captured
    const timer = setTimeout(() => {
      const captured = sessionStorage.getItem('ct_lead_captured');
      if (!captured) {
        setIsOpen(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for now
    setTimeout(() => {
      sessionStorage.setItem('ct_lead_captured', 'true');
      setIsSubmitting(false);
      setIsOpen(false);
    }, 800);
  };

  const handleSkip = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-navy/90 backdrop-blur-md"
          >
            {/* Particle dust could go here via canvas, omitted for brevity */}
          </motion.div>

          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.45 }}
            className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
          >
            {/* Top gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-gold via-brand-accent to-gold"></div>
            
            <div className="p-8">
              <motion.div 
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-6 bg-navy rounded-full flex items-center justify-center"
              >
                 <span className="text-white text-2xl font-display font-bold">C</span>
              </motion.div>

              <div className="text-center mb-8">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-display text-2xl text-navy font-bold mb-2"
                >
                  Get Bulk Pricing Today
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.48 }}
                  className="text-sm text-gray-500 font-light"
                >
                  Tell us who you are — we'll show you the right prices.
                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.56 }}
                >
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.64 }}
                >
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    required
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.72 }}
                  className="pt-4"
                >
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-navy text-gold hover:bg-gold hover:text-navy font-bold py-3 rounded-lg transition-colors flex justify-center shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin"></span> Processing...
                      </span>
                    ) : 'See Bulk Prices'}
                  </button>
                  
                  <div className="text-center mt-4">
                    <button 
                      type="button" 
                      onClick={handleSkip}
                      className="text-xs text-gray-400 hover:text-navy transition-colors group flex items-center justify-center gap-1 w-full"
                    >
                      Browse without registering <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </button>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
