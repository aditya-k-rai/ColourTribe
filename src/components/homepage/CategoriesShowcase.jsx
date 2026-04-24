import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CATEGORIES } from '../../data/categories.seed';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, index }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ duration: 0.55, delay: index * 0.08, type: "spring", stiffness: 100 }}
      className="group relative rounded-xl overflow-hidden h-80 cursor-pointer shadow-lg bg-navy"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
      
      {/* Fallback pattern if no image */}
      <div className="absolute inset-0 z-0 bg-[#152336] opacity-50 flex items-center justify-center text-8xl transition-transform duration-700 group-hover:scale-125">
        {category.icon}
      </div>

      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <div className="glass p-4 rounded-xl border border-white/10 backdrop-blur-md transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0 group-hover:bg-white/10 group-hover:border-white/20">
          <h3 className="text-white font-display text-xl mb-1">{category.name}</h3>
          <div className="overflow-hidden">
            <p className="text-gold text-sm transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 font-bold flex items-center gap-1">
              Browse Category <ArrowRight size={14} className="ml-1" />
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-20 glass bg-gold/90 text-navy border-none text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">Request Quote</div>
      
      <Link to={`/products/${category.slug}`} className="absolute inset-0 z-30" aria-label={`Browse ${category.name}`}></Link>
    </motion.div>
  );
};

const CategoriesShowcase = () => {
  // Show first 8 categories for homepage
  const showcaseCategories = CATEGORIES.slice(0, 8);

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-navy font-bold mb-4"
          >
            Our Uniform Categories
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-20 bg-gold mx-auto rounded-full origin-left"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseCategories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link to="/products" className="group inline-flex items-center gap-3 border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white hover:border-navy font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(15,27,45,0.2)]">
            <span>View Full Catalogue</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300 text-lg leading-none"><ArrowRight size={20} /></span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;
