import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { setPageMeta, setJsonLd, removeJsonLd, buildFaqSchema } from '../utils/seo';

const CONTACT_FAQS = [
  {
    q: 'How do I place a bulk uniform order with Colour Tribe?',
    a: 'You can place an order by calling +91 97173 55779, emailing adorabletradingk08@gmail.com, or using the quote builder on our website to add items and submit a quote request.',
  },
  {
    q: 'What are Colour Tribe\'s business hours?',
    a: 'Our team is available Monday to Saturday, 9 AM to 7 PM IST. Orders placed outside business hours will be addressed the next working day.',
  },
  {
    q: 'Can I request a sample uniform before placing a bulk order?',
    a: 'Yes. You can request a sample by contacting our team via phone or email. Sample costs are adjusted against your final bulk order invoice.',
  },
  {
    q: 'Does Colour Tribe take WhatsApp orders?',
    a: 'Yes. You can chat directly with us on WhatsApp at +91 97173 55779 to discuss your uniform requirements, share artwork for embroidery, or check order status.',
  },
];

const ContactPage = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Get a Bulk Uniform Quote | Contact Colour Tribe',
      description:
        'Get bulk uniform pricing from Colour Tribe. Call +91 97173 55779, WhatsApp, or visit our factory in Greater Noida. Chef, hotel, corporate & industrial uniforms. Pan-India delivery.',
      canonicalPath: '/contact',
    });
    setJsonLd('ld-contact-faq', buildFaqSchema(CONTACT_FAQS));
    return () => removeJsonLd('ld-contact-faq');
  }, []);
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
              {[
                { icon: MapPin, title: 'Manufacturing Hub', lines: ['KH 58, Tigri Gol Chakkar', 'Greater Noida, UP', 'India'] },
                { icon: Phone, title: 'Phone', lines: ['+91 97173 55779'], sub: 'Mon-Sat, 9AM to 7PM' },
                { icon: Mail, title: 'Email', lines: ['adorabletradingk08@gmail.com'] }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 cursor-default"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-lg">{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-gray-500 mt-1">{line}</p>
                    ))}
                    {item.sub && <p className="text-xs text-gray-400 mt-1">{item.sub}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-12 p-8 bg-gradient-to-br from-navy to-[#1a2c47] text-white rounded-3xl shadow-xl relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 delay-100"></div>
               <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 border-4 border-gold/20 rounded-full group-hover:rotate-90 transition-transform duration-700"></div>
               
               <div className="relative z-10">
                 <h3 className="font-display text-2xl font-bold mb-2 text-white">Need a Bulk Quote?</h3>
                 <p className="text-white/80 text-sm mb-6 max-w-sm leading-relaxed">Use our specialized quoting system to build your cart and request exact bulk pricing instantly.</p>
                 <Link to="/products" className="inline-block bg-gold text-navy font-bold px-8 py-3 rounded-full hover:bg-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                   Build Your Quote
                 </Link>
               </div>
            </motion.div>
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

      {/* Google Maps Embed — Local SEO Signal */}
      <section className="py-0 bg-cream" aria-label="Our Location on Google Maps">
        <div className="w-full h-80 md:h-96 overflow-hidden shadow-inner">
          <iframe
            title="Colour Tribe Manufacturing Hub — Greater Noida Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.0!2d77.5040!3d28.4744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI4JzI3LjgiTiA3N8KwMzAnMTQuNCJF!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="bg-navy text-white text-center py-4 px-6">
          <p className="text-sm font-medium">
            📍 <strong>Colour Tribe Manufacturing Hub</strong> — KH 58, Tigri Gol Chakkar, Greater Noida, Uttar Pradesh — 201306
          </p>
        </div>
      </section>

      {/* AEO FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-navy font-bold text-center mb-10">Common Questions</h2>
          <div className="space-y-4">
            {CONTACT_FAQS.map(({ q, a }) => (
              <details key={q} className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 group">
                <summary className="font-bold text-navy cursor-pointer list-none flex justify-between items-center">
                  {q}
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
