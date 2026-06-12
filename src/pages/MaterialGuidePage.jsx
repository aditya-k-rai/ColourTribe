import React, { useEffect } from 'react';
import { setPageMeta, setJsonLd, removeJsonLd, buildArticleSchema, buildFaqSchema } from '../utils/seo';
import { motion } from 'framer-motion';

const FABRIC_FAQS = [
  { q: "What is the best cloth material for a hotel uniform?", a: "Poly-Viscose is widely considered the best material for hotel uniforms as it combines the breathability of viscose with the durability and wrinkle-resistance of polyester. It provides a premium, sharp look essential for front desk and management staff." },
  { q: "Which garment material is best for chef coats?", a: "100% Cotton or Terry Cotton (PC) blends are ideal for chef coats. Pure cotton is highly breathable and handles high heat well. Terry Cotton is easier to maintain and resists wrinkling while still absorbing sweat effectively in hot kitchen environments." },
  { q: "What is Terry Cotton (PC)?", a: "Terry Cotton, also known as Poly-Cotton (PC), is a blend of polyester and cotton. It is extremely durable, resists shrinking, and is easy to wash, making it perfect for daily-wear uniforms such as housekeeping and school uniforms." },
  { q: "How do I choose between 100% Cotton and Poly-Viscose for corporate wear?", a: "For corporate suits and trousers, Poly-Viscose is superior as it drapes well, resists wrinkling, and maintains its shape over time. 100% Cotton is better suited for premium corporate dress shirts where breathability against the skin is the top priority." }
];

const FABRICS = [
  { name: 'Poly-Viscose', icon: '👔', desc: 'A premium blend offering a wool-like feel. Wrinkle-resistant, highly durable, and retains color perfectly after multiple washes.', bestFor: 'Corporate Suits, Front Office Uniforms, Trousers.' },
  { name: '100% Cotton', icon: '☁️', desc: 'Pure natural fiber. Extremely breathable, hypoallergenic, and comfortable in hot climates, though requires ironing.', bestFor: 'Chef Coats, Premium Shirts, Healthcare Scrubs.' },
  { name: 'Terry Cotton (PC)', icon: '👕', desc: 'A poly-cotton blend that brings the best of both worlds: cotton comfort and polyester strength. Easy care and low maintenance.', bestFor: 'Housekeeping, Industrial Uniforms, School Uniforms.' },
  { name: 'Spun Polyester', icon: '🧵', desc: 'A synthetic fabric spun to feel like cotton. Highly resistant to stains, fading, and shrinking. Dries very quickly.', bestFor: 'Aprons, Waitstaff Uniforms, Budget Workwear.' },
  { name: 'Denim / Drill Cotton', icon: '👖', desc: 'Heavyweight, rugged cotton twill. Designed for maximum protection and longevity in harsh environments.', bestFor: 'Coveralls, Heavy Engineering, Workshop Uniforms.' },
];

const MaterialGuidePage = () => {
  useEffect(() => {
    const title = 'Uniform Fabric & Material Guide India | Colour Tribe';
    const description = 'Complete guide to uniform garment materials: Poly-Viscose, Terry Cotton, Spun Polyester & more. Understand which fabric is best for chef, hotel, corporate & industrial uniforms.';
    
    setPageMeta({ title, description, canonicalPath: '/fabric-guide' });
    
    setJsonLd('ld-fabric-article', buildArticleSchema({ title, description }));
    setJsonLd('ld-fabric-faq', buildFaqSchema(FABRIC_FAQS));

    return () => {
      removeJsonLd('ld-fabric-article');
      removeJsonLd('ld-fabric-faq');
    };
  }, []);

  return (
    <div className="py-24 bg-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl mt-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-gold text-navy text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Educational Reference Hub</div>
          <h1 className="font-display text-4xl md:text-6xl text-navy font-bold mb-6 leading-tight">Uniform Garment & Material Guide</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Understanding the right cloth type is critical for professional workwear. This guide details the properties of various garment materials to help you make informed B2B procurement decisions for your dress search.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {FABRICS.map((fabric, i) => (
            <motion.div 
              key={fabric.name} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              className="glass p-8 rounded-2xl shadow-md border border-white/60 hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-6 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm">{fabric.icon}</div>
              <h3 className="font-display text-2xl text-navy font-bold mb-4">{fabric.name}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{fabric.desc}</p>
              <div className="bg-navy/5 p-4 rounded-xl border border-navy/5">
                <span className="text-[10px] uppercase tracking-widest text-navy/50 font-bold block mb-1">Best Used For</span>
                <span className="font-semibold text-navy text-sm">{fabric.bestFor}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-navy text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-0"></div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center relative z-10">Frequently Asked Material Questions</h2>
          <div className="space-y-8 max-w-3xl mx-auto relative z-10">
            {FABRIC_FAQS.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-white/10 pb-8 last:border-0"
              >
                <h4 className="text-xl font-bold text-gold mb-3 flex items-start gap-3">
                  <span className="text-white/20">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-white/80 leading-relaxed pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialGuidePage;
