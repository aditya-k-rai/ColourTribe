import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/categories.seed';
import { useProductStore } from '../../store/productStore';
import { useQuoteStore } from '../../store/quoteStore';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const category = CATEGORIES.find(c => c.id === product.categoryId) || CATEGORIES[0];
  const addItem = useQuoteStore(state => state.addItem);
  
  const handleAddToQuote = (e) => {
    e.preventDefault();
    addItem(product, { qty: 10, color: 'Navy Blue' });
  };
  
  return (
    <motion.div 
      whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(15,27,45,0.15)" }}
      className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden border border-gray-100 snap-start relative group transition-all duration-500"
    >
      <div className="h-64 bg-[#f0f4f8] relative flex items-center justify-center overflow-hidden">
        {/* Mock image placeholder */}
        <motion.div 
          whileHover={{ scale: 1.2, rotate: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-7xl group-hover:drop-shadow-2xl transition-all duration-500"
        >
          {category.icon}
        </motion.div>
        
        <div className="absolute top-4 left-4 bg-navy text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg z-20">
          {category.name.split(' / ')[0]}
        </div>
        
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6">
        <div className="text-[10px] font-mono text-navy/40 mb-2 tracking-widest uppercase">{product.sku}</div>
        <h4 className="font-display text-xl font-bold text-navy mb-3 truncate group-hover:text-gold transition-colors duration-300">{product.name}</h4>
        <div className="text-gold text-[10px] font-bold uppercase tracking-widest mt-1 mb-6 border-b border-gold/20 pb-2 inline-block">Bespoke Design</div>
        
        <div className="flex justify-between items-center relative h-12 overflow-hidden">
          <Link to={`/product/${product.sku}`} className="text-sm font-bold text-navy flex items-center gap-2 hover:text-gold transition-all duration-300 block w-full absolute top-3">
            Explore Details <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <button 
            onClick={handleAddToQuote}
            className="absolute inset-x-0 bottom-0 top-0 bg-navy text-white text-sm font-bold rounded-xl flex items-center justify-center transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10 hover:bg-gold hover:text-navy shadow-xl"
          >
            + Quick Add to Quote
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
  const { products } = useProductStore();
  
  // Use first 6 active products as featured
  const featuredProducts = products.filter(p => p.isActive !== false).slice(0, 6);

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
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${canScrollLeft ? 'border-navy text-navy hover:bg-navy hover:text-white' : 'border-navy/20 text-navy/20 cursor-not-allowed'}`}
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={() => scroll('right')} 
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${canScrollRight ? 'border-navy text-navy hover:bg-navy hover:text-white' : 'border-navy/20 text-navy/20 cursor-not-allowed'}`}
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
          {featuredProducts.map(product => (
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
