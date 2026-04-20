import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { setPageMeta, setJsonLd, removeJsonLd, buildFaqSchema } from '../utils/seo';

const ABOUT_FAQS = [
  {
    q: 'Where is Colour Tribe located?',
    a: 'Colour Tribe is headquartered at KH 58, Tigri Gol Chakkar, Greater Noida, Uttar Pradesh, India. We manufacture all garments in-house at this facility.',
  },
  {
    q: 'How many years of experience does Colour Tribe have?',
    a: 'Colour Tribe has over 15 years of experience in professional garment and uniform manufacturing for B2B clients across India.',
  },
  {
    q: 'Is Colour Tribe a manufacturer or a reseller?',
    a: 'Colour Tribe is a 100% in-house manufacturer. We handle everything from fabric sourcing and cutting to stitching, embroidery, and packaging — with no middlemen.',
  },
];

const AboutPage = () => {
  useEffect(() => {
    setPageMeta({
      title: 'About Colour Tribe | B2B Uniform Manufacturer in Greater Noida',
      description:
        'Learn about Colour Tribe — India\'s trusted in-house uniform manufacturer with 15+ years of experience supplying B2B uniforms to 500+ clients across the hospitality, corporate, and industrial sectors.',
    });
    setJsonLd('ld-about-faq', buildFaqSchema(ABOUT_FAQS));
    return () => removeJsonLd('ld-about-faq');
  }, []);
  return (
    <div className="bg-cream min-h-screen pt-24 font-body overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-navy text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           {/* Abstract grid lines */}
           <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#ffffff11 1px, transparent 1px), linear-gradient(90deg, #ffffff11 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block">Our Story</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Crafting Quality for<br/>India's Workforce.</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">We are Colour Tribe, a premier manufacturer of business, hospital, and hospitality uniforms dedicated strictly to uncompromising quality and perfect fits.</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="font-display text-3xl md:text-4xl text-navy font-bold">15 Years of Excellence in Garment Manufacturing</h2>
              <div className="w-20 h-1 bg-gold"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Operating out of Greater Noida, UP, Colour Tribe began with a simple mission: to provide the highest-grade professional wear at factory-direct pricing for B2B procurement over bloated retailer markups.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By maintaining a 100% in-house manufacturing processâ€”from fabric sourcing and grading to expert tailoring, logo embroidery, and packagingâ€”we retain total control over output quality. This drastically slashes turn-around times while ensuring that whether you order 20 pieces or 500, every seam is flawless.
              </p>
              <div className="pt-4 flex gap-8 border-t border-gray-200 mt-8">
                <div>
                  <div className="text-3xl font-display font-bold text-navy mb-1">500+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">B2B Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-navy mb-1">0%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">Middleman Fees</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full grid grid-cols-2 gap-4 relative"
            >
              <div className="space-y-4 pt-12">
                <div className="bg-white aspect-[4/5] rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div>
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">ðŸ§µ</div>
                    <h3 className="font-bold text-navy">Premium Blends</h3>
                    <p className="text-xs text-gray-500 mt-2">Durable polyviscose & breathable cottons.</p>
                  </div>
                </div>
                <div className="bg-navy aspect-square rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-6 text-center">
                  <div>
                    <div className="text-4xl mb-4">ðŸª¡</div>
                    <h3 className="font-bold text-white">Custom Logos</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gold aspect-square rounded-2xl shadow-lg border border-gold-dark flex items-center justify-center p-6 text-center">
                  <div>
                    <div className="text-4xl mb-4">âš¡</div>
                    <h3 className="font-bold text-navy">Fast Turnaround</h3>
                  </div>
                </div>
                <div className="bg-white aspect-[4/5] rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div>
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">ðŸšš</div>
                    <h3 className="font-bold text-navy">Pan-India Reach</h3>
                    <p className="text-xs text-gray-500 mt-2">Direct shipping to your doorstep.</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AEO: Inline FAQ Section */}
      <section className="bg-cream py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-navy font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {ABOUT_FAQS.map(({ q, a }) => (
              <details key={q} className="bg-white border border-gray-200 rounded-xl px-6 py-4 group">
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

      {/* CTA Bottom Segment */}
      <section className="bg-gradient-to-t from-navy to-navy/90 py-24 text-center text-white px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Ready to Outfit Your Team?</h2>
        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">Join hundreds of successful businesses across India who trust Colour Tribe for their daily operations.</p>
        <a href="/products" className="inline-block bg-gold text-navy hover:bg-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-gold/20">
          Browse Our Catalogue
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
