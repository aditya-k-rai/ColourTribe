import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuoteDrawer from '../quote/QuoteDrawer';
import { useQuoteStore } from '../../store/quoteStore';
import logo from '../../assets/logo.jpeg';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { getItemCount, toggleDrawer } = useQuoteStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Colour Tribe Logo" className="h-10 w-auto object-contain rounded-md" />
          <span className="text-white font-display text-xl font-bold tracking-widest uppercase hidden lg:block">Colour Tribe</span>
        </Link>
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/products" className="text-white hover:text-gold transition-colors text-sm uppercase tracking-wider">Products</Link>
          <Link to="/uniforms" className="text-white hover:text-gold transition-colors text-sm uppercase tracking-wider">Uniforms</Link>
          <Link to="/industries" className="text-white hover:text-gold transition-colors text-sm uppercase tracking-wider">Industries</Link>
          <Link to="/contact" className="text-white hover:text-gold transition-colors text-sm uppercase tracking-wider">Contact Us</Link>
          <Link to="/about" className="text-white hover:text-gold transition-colors text-sm uppercase tracking-wider">About</Link>
          <button onClick={toggleDrawer} className="relative p-2 text-white hover:text-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {getItemCount() > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-navy bg-gold rounded-full transform translate-x-1/4 -translate-y-1/4 select-none">
                {getItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>
      <QuoteDrawer />
    </nav>
  );
};

export default NavBar;
