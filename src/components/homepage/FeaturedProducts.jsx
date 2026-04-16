import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../data/categories.seed';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock featured products
const FEATURED_PRODUCTS = [
  { id: '1', sku: 'HO-01', name: 'Premium Corporate Suit', categoryId: '1', price: 2999 },
  { id: '2', sku: 'FC-12', name: 'Executive Chef Coat', categoryId: '15', price: 1093 },
  { id: '3', sku: 'HK-04', name: 'Housekeeping Tunic Set', categoryId: '21', price: 834 },
  { id: '4', sku: 'ST-09', name: 'Steward Waistcoat', categoryId: '6', price: 776 },
  { id: '5', sku: 'SD-11', name: 'Security Safari Suit', categoryId: '14', price: 978 },
  { id: '6', sku: 'FO-02', name: 'Front Desk Saree Set', categoryId: '2', price: 3100 },
];

const ProductCard = ({ product }) => {
  const category = CATEGORIES.find(c => c.id === product.categoryId) || CATEGORIES[0];
  
  return (
    <motion.div 
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl overflow-hidden border border-gray-200 snap-start relative group"
    >
      <div className="h-64 bg-[#f0f4f8] relative flex items-center justify-center overflow-hidden">
        {/* Mock image placeholder */}
        <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{category.icon}</div>
        <div className="absolute top-3 left-3 bg-navy text-white text-xs px-2 py-1 rounded font-medium">
          {category.name.split(' / ')[0]}
        </div>
      </div>
      
      <div className="p-5">
        <div className="text-xs font-mono text-gray-500 mb-1">{product.sku}</div>
        <h4 className="font-display text-lg font-bold text-navy mb-2 truncate">{product.name}</h4>
        <div className="text-gold font-bold text-xl mb-4">from ₹{product.price}/pc</div>
        
        <div className="flex justify-between items-center relative h-10 overflow-hidden">
          <Link to={`/product/${product.sku}`} className="text-sm font-semibold text-navy flex items-center gap-1 hover:text-gold transition-colors block w-full absolute top-2">
            View Details →
          </Link>
          
          <AnimatePresence>
            <motion.button 
              initial={{ y: 30, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              className="absolute inset-0 bg-navy text-white text-sm font-bold rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-none"
              // In Framer Motion, if we use CSS hover for the parent, we can just style child with Tailwind group-hover
              // Because AnimatePresence needs React state, we'll rely on CSS for the simple hover interaction here instead to simplify
            >
              Add to Quote
            </motion.button>
          </AnimatePresence>
          {/* Overriding Framer with CSS for clean hover effect */}
          <button className="absolute inset-x-0 bottom-0 top-0 bg-navy text-white text-sm font-bold rounded flex items-center justify-center transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250 ease-out z-10 hover:bg-navy/90">
            + Add to Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-10 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gold text-sm">✦</span>
            <span className="text-gold font-bold tracking-widest uppercase text-xs">Top Picks</span>
          </div>
          <h2 className="font-display text-4xl text-navy font-bold">Bestselling Uniforms</h2>
        </div>
        
        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => scroll('left')} 
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${canScrollLeft ? 'border-navy text-navy hover:bg-navy hover:text-white' : 'border-gray-300 text-gray-300 cursor-not-allowed'}`}
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={() => scroll('right')} 
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${canScrollRight ? 'border-navy text-navy hover:bg-navy hover:text-white' : 'border-gray-300 text-gray-300 cursor-not-allowed'}`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="relative group/carousel">
        <motion.div 
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto px-6 lg:px-12 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={carouselRef}
        >
          {FEATURED_PRODUCTS.map(product => (
             <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        
        {/* Gradient fades on edges */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-cream to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-cream to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
