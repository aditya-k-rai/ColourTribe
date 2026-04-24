import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown, Check, ArrowDownUp } from 'lucide-react';
import { CATEGORIES } from '../data/categories.seed';
import { useProductStore } from '../store/productStore';
import { setJsonLd, removeJsonLd, buildBreadcrumbSchema, setPageMeta } from '../utils/seo';

const CataloguePage = ({ hub = 'products' }) => {
  const { categorySlug } = useParams();
  const { products } = useProductStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    categorySlug ? CATEGORIES.find(c => c.slug === categorySlug)?.id : 'all'
  );
  const [sortBy, setSortBy] = useState('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category state with URL change
  useEffect(() => {
    if (categorySlug) {
      const match = CATEGORIES.find(c => c.slug === categorySlug);
      if (match) setSelectedCategory(match.id);
    } else {
      setSelectedCategory('all');
    }
  }, [categorySlug]);

  // Set SEO Metadata
  useEffect(() => {
    let title = 'Premium Uniforms & Workwear | Colour Tribe';
    if (hub === 'products') title = 'All Products | Colour Tribe';
    if (hub === 'uniforms') title = 'Professional Uniforms | Colour Tribe';
    if (hub === 'industries') title = 'Industry Solutions | Colour Tribe';
    
    // Override if a category is selected
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find(c => c.id === selectedCategory);
      if (cat) title = `${cat.name} | Colour Tribe`;
    }

    const hubLabel = hub === 'industries' ? 'Industry Solutions' : hub === 'uniforms' ? 'Professional Uniforms' : 'All Products';
    const description = selectedCategory !== 'all'
      ? `Shop ${CATEGORIES.find(c => c.id === selectedCategory)?.name || ''} uniforms at Colour Tribe. Factory-direct B2B pricing, custom embroidery, pan-India delivery.`
      : `Browse Colour Tribe's ${hubLabel} — premium B2B uniforms for hotels, restaurants, hospitals & corporates. Factory-direct pricing, min. 10 pcs.`;

    setPageMeta({ title, description });

    // Breadcrumb JSON-LD
    const crumbs = [{ name: 'Home', path: '/' }, { name: hubLabel, path: `/${hub}` }];
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find(c => c.id === selectedCategory);
      if (cat) crumbs.push({ name: cat.name, path: `/${hub}/${cat.slug}` });
    }
    setJsonLd('ld-catalogue-breadcrumb', buildBreadcrumbSchema(crumbs));
    return () => removeJsonLd('ld-catalogue-breadcrumb');
  }, [hub, selectedCategory]);

  const filteredProducts = useMemo(() => {
    // Only show active products to public
    let result = products.filter(p => p.isActive !== false);
    
    // Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.categoryId === selectedCategory);
    }
    
    // Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.sku.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    switch(sortBy) {
      case 'newest': result.sort((a,b) => b.id.localeCompare(a.id)); break;
      case 'popular': default: result.sort((a,b) => b.viewCount - a.viewCount); break;
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  const activeCategoryData = selectedCategory !== 'all' ? CATEGORIES.find(c => c.id === selectedCategory) : null;

  return (
    <div className="bg-cream min-h-screen pt-24 font-body">
      {/* Hero Section */}
      <div className="bg-[#0d1726] py-12 relative overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-gold/50 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 flex items-center gap-4">
          <span className="text-6xl">
            {activeCategoryData ? activeCategoryData.icon : (hub === 'industries' ? '🏭' : hub === 'uniforms' ? '👔' : '🛍️')}
          </span>
          <div>
            <h1 className="text-white font-display text-4xl mb-2">
              {activeCategoryData ? activeCategoryData.name : (
                hub === 'industries' ? 'Industry Solutions' : 
                hub === 'uniforms' ? 'Professional Uniforms' : 'All Products'
              )}
            </h1>
            <p className="text-white/80 text-sm">Explore our specialized collection crafted for premium fit and comfort.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-20">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 gap-4">
          <div className="flex w-full md:w-auto overflow-hidden bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text"
              placeholder="Search products, SKUs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full md:w-64"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="text-sm text-gray-500 font-semibold hidden md:block">
              Showing {filteredProducts.length} Results
            </div>
            
            <button 
              className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg text-sm"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter size={16} /> Filters
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider hidden sm:block">Sort By</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-sm rounded-lg py-2 px-3 outline-none focus:border-gold"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className={`w-full md:w-64 shrink-0 transition-all ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-5 rounded-xl border border-gray-200 sticky top-24 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-navy uppercase tracking-wider text-sm">Categories</h3>
                {selectedCategory !== 'all' && (
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-gold hover:text-gold-dark"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center transition-colors ${selectedCategory === 'all' ? 'bg-navy/5 text-navy font-bold' : 'text-navy/80 hover:bg-gray-50'}`}
                >
                  All Uniforms
                  {selectedCategory === 'all' && <Check size={14} className="text-gold" />}
                </button>
                
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center transition-colors ${selectedCategory === cat.id ? 'bg-navy/5 text-navy font-bold' : 'text-navy/80 hover:bg-gray-50'}`}
                  >
                    <span className="truncate mr-2">{cat.name}</span>
                    {selectedCategory === cat.id && <Check size={14} className="text-gold shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4">🤷</div>
                <h3 className="text-xl font-bold text-navy mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">We couldn't find anything matching your current filters.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                  className="bg-navy text-white px-6 py-2 rounded-full font-bold hover:bg-gold hover:text-navy transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, i) => {
                    const cat = CATEGORIES.find(c => c.id === product.categoryId);
                    return (
                      <motion.div 
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-xl transition-shadow"
                      >
                        <Link to={`/product/${product.sku}`} className="block">
                          <div className="h-60 bg-[#f0f4f8] relative flex items-center justify-center overflow-hidden">
                            <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{cat?.icon || '👔'}</span>
                            <div className="absolute top-3 left-3 bg-navy text-white text-xs px-2 py-1 rounded font-medium shadow">
                              {cat?.name?.split(' / ')[0]}
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="text-xs font-mono text-gray-500 mb-1">{product.sku}</div>
                            <h4 className="font-display text-lg font-bold text-navy mb-2 leading-tight min-h-[3.5rem]">
                              {product.name}
                            </h4>
                            <div className="flex justify-between items-end mt-4">
                              <div>
                                 <div className="text-gold text-xs font-bold uppercase tracking-wider mt-1">Customize</div>
                              </div>
                              <span className="text-sm font-bold text-navy group-hover:text-gold transition-colors flex items-center gap-1">
                                Details <ArrowDownUp className="w-3 h-3 rotate-90" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}
            {/* Load More Placeholder */}
            {filteredProducts.length > 0 && (
               <div className="mt-12 text-center">
                 <button className="border-2 border-navy text-navy font-bold py-3 px-10 rounded-full hover:bg-navy hover:text-white transition-colors">
                   Load More
                 </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CataloguePage;
