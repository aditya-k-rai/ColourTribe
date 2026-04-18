import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-16 text-sm">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-2xl text-gold mb-4 uppercase tracking-widest">Colour Tribe</h3>
          <p className="text-white/60 mb-4 font-body leading-relaxed">Manufacturer of all professional garments and uniforms. Quality cloth guarantee and precise fits for businesses, hospitals, schools, and corporates.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-gold">Quick Links</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/catalogue" className="hover:text-white transition-colors">Catalogue</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-gold">Categories</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/catalogue/men-formal-suit" className="hover:text-white transition-colors">Men Formal Suits</Link></li>
            <li><Link to="/catalogue/chef-uniform" className="hover:text-white transition-colors">Chef Uniforms</Link></li>
            <li><Link to="/catalogue/housekeeping" className="hover:text-white transition-colors">Housekeeping</Link></li>
            <li><Link to="/catalogue" className="hover:text-white transition-colors">View All...</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-gold">Contact Us</h4>
          <ul className="space-y-2 text-white/70">
            <li>Phone: 97173 55779</li>
            <li>Email: adorabletradingk08@gmail.com</li>
            <li>Address: KH 58, Tigri Gol Chakkar, Greater Noida</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center text-center text-white/40 font-mono text-xs gap-3">
        <div>
          &copy; {new Date().getFullYear()} Colour Tribe. All rights reserved. <br/>Made in Delhi, India 🇮🇳
        </div>
        <div className="bg-white/5 px-4 py-2 rounded-full text-white/50 text-[10px] sm:text-xs">
          Developed by <a href="https://aditya-k-rai.github.io/P-Website/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gold transition-colors font-bold tracking-widest pl-1">Aditya Rai</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
