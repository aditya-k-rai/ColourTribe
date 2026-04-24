import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from '../../assets/logo.jpeg';

const Footer = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <footer className="bg-navy text-white py-16 text-sm overflow-hidden" ref={ref}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Colour Tribe Logo" className="h-12 w-auto object-contain rounded-md shadow-md" />
            <h3 className="font-display text-2xl text-gold uppercase tracking-widest">Colour Tribe</h3>
          </div>
          <p className="text-white/60 mb-4 font-body leading-relaxed">Manufacturer of all professional garments and uniforms. Quality cloth guarantee and precise fits for businesses, hospitals, schools, and corporates.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-gold">Quick Links</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/products" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Products</Link></li>
            <li><Link to="/uniforms" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Uniforms</Link></li>
            <li><Link to="/industries" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Industries</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Contact</Link></li>
            <li><Link to="/admin/login" className="hover:text-white/40 transition-colors flex items-center gap-2 group pt-2 italic text-xs"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Admin Portal</Link></li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-gold">Categories</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/products/men-formal-suit" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Men Formal Suits</Link></li>
            <li><Link to="/uniforms/chef-uniform" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Chef Uniforms</Link></li>
            <li><Link to="/uniforms/housekeeping" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>Housekeeping</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-2 transition-all">›</span>View All...</Link></li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-gold">Contact Us</h4>
          <ul className="space-y-3 text-white/70">
            <li className="flex flex-col"><span className="text-xs text-white/40 uppercase tracking-wider">Phone</span>97173 55779</li>
            <li className="flex flex-col"><span className="text-xs text-white/40 uppercase tracking-wider">Email</span>adorabletradingk08@gmail.com</li>
            <li className="flex flex-col"><span className="text-xs text-white/40 uppercase tracking-wider">Address</span>KH 58, Tigri Gol Chakkar, Greater Noida</li>
          </ul>
        </motion.div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center text-center text-white/40 font-mono text-xs gap-3"
      >
        <div>
          &copy; {new Date().getFullYear()} Colour Tribe. All rights reserved. <br/>Made in Delhi, India 🛡️🏳️
        </div>
        <div className="glass-dark px-5 py-2 rounded-full text-white/60 text-[10px] sm:text-xs shadow-lg hover:shadow-gold/10 transition-shadow">
          Developed by <a href="https://aditya-k-rai.github.io/P-Website/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors font-bold tracking-widest pl-1 text-gradient">Aditya Rai</a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
