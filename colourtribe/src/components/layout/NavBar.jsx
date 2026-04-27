import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import QuoteDrawer from '../quote/QuoteDrawer';
import { useQuoteStore } from '../../store/quoteStore';
import logo from '../../assets/logo.jpeg';

const navLinks = [
  { to: '/products', label: 'Products' },
  { to: '/uniforms', label: 'Uniforms' },
  { to: '/industries', label: 'Industries' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/about', label: 'About' },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getItemCount, toggleDrawer } = useQuoteStore();
  const location = useLocation();

  // Hero pages have dark backgrounds — keep nav transparent until scrolled
  const isHeroPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navBg = scrolled
    ? 'glass-dark py-3'
    : isHeroPage
    ? 'bg-transparent py-5'
    : 'bg-navy py-5';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Colour Tribe Logo" className="h-10 w-auto object-contain rounded-md" />
            <span className="text-white font-display text-xl font-bold tracking-widest uppercase hidden sm:block">
              Colour Tribe
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm uppercase tracking-wider transition-colors py-1 ${
                  location.pathname === link.to
                    ? 'text-gold font-bold'
                    : 'text-white hover:text-gold'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Quote Bag Icon */}
            <button
              onClick={toggleDrawer}
              aria-label="Open quote list"
              className="relative p-2 text-white hover:text-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {getItemCount() > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-navy bg-gold rounded-full transform translate-x-1/4 -translate-y-1/4 select-none">
                  {getItemCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right: quote icon + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDrawer}
              aria-label="Open quote list"
              className="relative p-2 text-white hover:text-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {getItemCount() > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-navy bg-gold rounded-full transform translate-x-1/4 -translate-y-1/4 select-none"
                >
                  {getItemCount()}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-white hover:text-gold transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden bg-navy/98 backdrop-blur-md border-t border-white/10 lg:hidden"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className={`block py-3 px-4 rounded-lg text-sm uppercase tracking-wider font-semibold transition-colors ${
                        location.pathname === link.to
                          ? 'text-gold bg-white/5'
                          : 'text-white/80 hover:text-gold hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <a
                    href="tel:+919717355779"
                    className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-bold py-3 rounded-full hover:bg-gold/90 transition-colors"
                  >
                    Call Us: +91 97173 55779
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <QuoteDrawer />
    </>
  );
};

export default NavBar;
