import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setPageMeta } from '../utils/seo';

const NotFoundPage = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Page Not Found (404) | Colour Tribe',
      description: 'The page you are looking for does not exist. Browse our uniform catalogue or contact Colour Tribe for B2B uniform enquiries.',
    });
  }, []);

  const quickLinks = [
    { label: 'All Uniforms', href: '/products', emoji: '👔' },
    { label: 'Chef Uniforms', href: '/products/chef-uniform', emoji: '👨‍🍳' },
    { label: 'Hotel Uniforms', href: '/products/housekeeping', emoji: '🏨' },
    { label: 'Corporate Wear', href: '/products/men-formal-suit', emoji: '💼' },
    { label: 'Get a Quote', href: '/get-quote', emoji: '📋' },
    { label: 'Contact Us', href: '/contact', emoji: '📞' },
  ];

  return (
    <div className="bg-cream min-h-screen pt-24 pb-20 font-body flex items-center">
      <div className="container mx-auto px-6 max-w-4xl text-center">

        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          className="relative mb-8 inline-block"
        >
          <span
            className="font-display font-bold text-[140px] md:text-[200px] leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #0f1b2d 0%, #c9a84c 60%, #0f1b2d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </span>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 md:-right-8 bg-gold text-navy text-2xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          >
            🧵
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="font-display text-3xl md:text-4xl text-navy font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
            The page you're looking for has been moved or doesn't exist. Let us help you find what you need.
          </p>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-xl mx-auto"
        >
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                to={link.href}
                className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gold/40 transition-all duration-300 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {link.emoji}
                </span>
                <span className="text-sm font-bold text-navy group-hover:text-gold transition-colors">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-navy text-white font-bold py-4 px-8 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 shadow-lg"
          >
            ← Back to Homepage
          </Link>
          <a
            href="https://wa.me/919717355779?text=Hi, I need help finding uniforms on your website."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-2 border-navy text-navy font-bold py-4 px-8 rounded-full hover:bg-navy/5 transition-all duration-300"
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>

        {/* NAP Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-sm text-gray-400"
        >
          Need help? Call us at{' '}
          <a href="tel:+919717355779" className="text-navy font-semibold hover:text-gold transition-colors">
            +91 97173 55779
          </a>{' '}
          · Mon–Sat, 9AM–7PM IST
        </motion.p>
      </div>
    </div>
  );
};

export default NotFoundPage;
