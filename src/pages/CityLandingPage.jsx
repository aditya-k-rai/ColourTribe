import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { setPageMeta, setJsonLd, removeJsonLd, buildCityLocalBusinessSchema } from '../utils/seo';
import { motion } from 'framer-motion';

const VALID_CITIES = ['delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune', 'ahmedabad', 'surat', 'jaipur'];

const CityLandingPage = () => {
  const { citySlug } = useParams();
  const city = citySlug ? citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace('-', ' ') : '';

  useEffect(() => {
    if (!VALID_CITIES.includes(citySlug?.toLowerCase())) return;

    setPageMeta({
      title: `Uniform Manufacturer in ${city} | Factory-Direct Supply | Colour Tribe`,
      description: `Looking for a bulk uniform supplier in ${city}? Colour Tribe manufactures premium chef uniforms, hotel staff wear & corporate workwear. Factory-direct pricing. Pan-India delivery.`,
      canonicalPath: `/uniform-manufacturer-in-${citySlug}`,
    });
    setJsonLd(`ld-city-${citySlug}`, buildCityLocalBusinessSchema(city));

    return () => removeJsonLd(`ld-city-${citySlug}`);
  }, [city, citySlug]);

  if (!VALID_CITIES.includes(citySlug?.toLowerCase())) {
    return <div className="py-32 text-center text-navy font-bold text-2xl min-h-screen flex items-center justify-center">City not found</div>;
  }

  return (
    <div className="py-24 bg-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl mt-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-white/40 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span className="text-navy uppercase tracking-widest text-[10px] font-bold">Serving {city} Region</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-navy font-bold mb-6 leading-tight">
            Premium Uniform Manufacturer in <span className="text-gold">{city}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Colour Tribe is your trusted partner for high-quality, factory-direct uniforms delivered straight to your business in {city}. We specialize in corporate workwear, hospitality attire, and industrial garments.
          </p>
        </motion.div>

        {/* Highlight Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
           <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-2xl text-center shadow-lg border border-white/50">
             <div className="text-5xl mb-6 drop-shadow-md">🚚</div>
             <h3 className="font-display text-xl font-bold text-navy mb-3">Fast Delivery to {city}</h3>
             <p className="text-sm text-gray-600 leading-relaxed">Secure, pan-India logistics ensuring your bulk orders arrive exactly on time at your location.</p>
           </motion.div>
           <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-2xl text-center shadow-lg border border-white/50">
             <div className="text-5xl mb-6 drop-shadow-md">🪡</div>
             <h3 className="font-display text-xl font-bold text-navy mb-3">Custom Embroidery</h3>
             <p className="text-sm text-gray-600 leading-relaxed">Add your brand logo directly stitched onto the fabric for a premium and professional corporate look.</p>
           </motion.div>
           <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-2xl text-center shadow-lg border border-white/50">
             <div className="text-5xl mb-6 drop-shadow-md">💰</div>
             <h3 className="font-display text-xl font-bold text-navy mb-3">Factory Pricing</h3>
             <p className="text-sm text-gray-600 leading-relaxed">Buy direct from our manufacturing unit and save significantly on intermediary sourcing costs.</p>
           </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          className="bg-navy rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
           
           <h2 className="font-display text-3xl font-bold mb-4 relative z-10">Ready to Outfit Your Team in {city}?</h2>
           <p className="text-white/80 mb-8 max-w-xl mx-auto relative z-10">Browse our extensive catalogue of uniform designs or contact our sales team for custom requirements.</p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
             <Link to="/products" className="bg-gold text-navy hover:bg-white hover:text-navy font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)]">
               Explore Full Catalogue
             </Link>
             <Link to="/contact" className="border border-white/30 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-full transition-all">
               Contact Sales
             </Link>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CityLandingPage;
