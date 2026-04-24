import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CATEGORIES } from '../../data/categories.seed';
import { Link } from 'react-router-dom';

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
      <div className="absolute inset-0 z-0 bg-[#152336] opacity-50 flex items-center justify-center text-8xl transition-transform duration-500 group-hover:scale-110">
        {category.icon}
      </div>

      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <h3 className="text-white font-display text-xl mb-1">{category.name}</h3>
        <div className="overflow-hidden">
          <p className="text-gold text-sm transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 font-bold">
            Browse &hellip;
          </p>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-20 bg-gold text-navy text-xs font-bold px-2 py-1 rounded-full shadow-md">Request Quote</div>
      
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
          <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-4">Our Uniform Categories</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseCategories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/products" className="inline-block border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
            View Full Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;
