import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-cream min-h-screen pt-24 pb-20 font-body">
      {/* Header */}
      <div className="bg-navy py-16 mb-12">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">Get in Touch</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Looking for bulk order pricing? Need a custom logo embroidered on your uniforms? Reach out to our dedicated support team.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <h2 className="font-display text-3xl text-navy font-bold mb-6">Contact Information</h2>
              <p className="text-gray-500 mb-8">We supply uniforms to businesses and corporations across the entirety of India. Drop us a line or visit our manufacturing hub.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Manufacturing Hub</h4>
                  <p className="text-gray-500 mt-1">KH 58, Tigri Gol Chakkar<br/>Greater Noida, UP<br/>India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Phone</h4>
                  <p className="text-gray-500 mt-1">+91 97173 55779</p>
                  <p className="text-xs text-gray-400 mt-1">Mon-Sat, 9AM to 7PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Email</h4>
                  <p className="text-gray-500 mt-1">adorabletradingk08@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-navy text-white rounded-2xl shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 border-4 border-gold/20 rounded-full"></div>
               <h3 className="font-display text-xl font-bold mb-2">Need a Bulk Quote?</h3>
               <p className="text-white/70 text-sm mb-4">Use our specialized quoting system to build your cart and request exact bulk pricing instantly.</p>
               <a href="/catalogue" className="inline-block bg-gold text-navy font-bold px-6 py-2 rounded-full hover:bg-white transition-colors">
                 Build Your Quote
               </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-navy/5 border border-gray-100"
          >
            <h3 className="font-display text-2xl text-navy font-bold mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                  <input type="text" required className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" required className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nature of Inquiry</label>
                <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors">
                  <option>General Support</option>
                  <option>Sample Request</option>
                  <option>Fabric & Sizing Information</option>
                  <option>Partnership/B2B</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Your Message</label>
                <textarea rows="5" required className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors resize-none"></textarea>
              </div>

              <button type="button" className="w-full bg-navy text-white hover:bg-gold hover:text-navy font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-md">
                Submit Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
