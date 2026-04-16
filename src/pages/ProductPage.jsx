import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Clock, Layers, Plus, Minus, Info } from 'lucide-react';
import { useQuoteStore } from '../store/quoteStore';
import { PRODUCTS } from '../data/products.seed';
import { CATEGORIES } from '../data/categories.seed';

const ProductPage = () => {
  const { sku } = useParams();
  const navigate = useNavigate();
  const addItem = useQuoteStore(state => state.addItem);
  
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [qty, setQty] = useState(10);
  const [selectedColor, setSelectedColor] = useState('Navy Blue');
  const [activeTab, setActiveTab] = useState('description');

  const colors = ['Navy Blue', 'Black', 'Charcoal Grey', 'White'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = PRODUCTS.find(p => p.sku === sku);
    if (foundProduct) {
      setProduct(foundProduct);
      setCategory(CATEGORIES.find(c => c.id === foundProduct.categoryId));
      setQty(10); // reset minimum to 10
    }
  }, [sku]);

  // Bulk tier pricing logic
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    if (qty >= 100) return Math.floor(product.basePrice * 0.80);
    if (qty >= 50) return Math.floor(product.basePrice * 0.87);
    if (qty >= 10) return Math.floor(product.basePrice * 0.94);
    return product.basePrice;
  }, [product, qty]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-cream">
       <div className="text-center">
         <h2 className="text-3xl font-display text-navy mb-4">Product Not Found</h2>
         <button onClick={() => navigate('/catalogue')} className="text-gold hover:underline">Return to Catalogue</button>
       </div>
    </div>
  );

  const handleAddToQuote = () => {
    addItem(product, {
      qty,
      color: selectedColor,
      unitPrice: currentPrice,
      lineTotal: currentPrice * qty
    });
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-navy">Home</Link>
          <ChevronRight size={14} />
          <Link to="/catalogue" className="hover:text-navy">Catalogue</Link>
          <ChevronRight size={14} />
          <Link to={`/catalogue/${category?.slug}`} className="hover:text-navy">{category?.name}</Link>
          <ChevronRight size={14} />
          <span className="text-navy">{product.sku}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left - Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 flex flex-col gap-4"
          >
            <div className="bg-[#f0f4f8] w-full aspect-[4/5] rounded-2xl flex items-center justify-center text-9xl relative overflow-hidden group border border-gray-100">
               {category?.icon || '👔'}
            </div>
            {/* Thumbnails placeholder */}
            <div className="flex gap-4">
               {[1,2,3,4].map(thumb => (
                 <div key={thumb} className="w-1/4 aspect-square bg-[#f0f4f8] rounded-lg border-2 border-transparent hover:border-gold cursor-pointer transition-colors flex items-center justify-center text-3xl">
                   {category?.icon || '👔'}
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Right - Details & Config */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-block bg-gold py-1 px-3 text-navy text-xs font-bold font-mono rounded tracking-wider mb-4">
              SKU: {product.sku}
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl text-navy font-bold leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="mb-6">
              <div className="text-3xl font-display text-gold font-bold">₹{currentPrice.toLocaleString()} <span className="text-sm text-gray-500 font-body outline-none font-normal">/ piece</span></div>
              <p className="text-sm text-gray-400 mt-1">Bulk price applied based on quantity.</p>
            </div>

            {/* Bulk Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="bg-gray-50 flex text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex-1 p-3">Quantity</div>
                <div className="flex-1 p-3 border-l border-gray-200">Price / Pc</div>
              </div>
              <div className={`flex text-sm transition-colors ${qty >= 10 && qty < 50 ? 'bg-gold/10 font-bold text-navy' : 'text-gray-600'}`}>
                <div className="flex-1 p-3">10 - 49 pcs</div>
                <div className="flex-1 p-3 border-l border-gray-200">₹{Math.floor(product.basePrice * 0.94).toLocaleString()}</div>
              </div>
              <div className={`flex text-sm border-t border-gray-100 transition-colors ${qty >= 50 && qty < 100 ? 'bg-gold/10 font-bold text-navy' : 'text-gray-600'}`}>
                <div className="flex-1 p-3">50 - 99 pcs</div>
                <div className="flex-1 p-3 border-l border-gray-200">₹{Math.floor(product.basePrice * 0.87).toLocaleString()}</div>
              </div>
              <div className={`flex text-sm border-t border-gray-100 transition-colors ${qty >= 100 ? 'bg-gold/10 font-bold text-navy' : 'text-gray-600'}`}>
                <div className="flex-1 p-3">100+ pcs</div>
                <div className="flex-1 p-3 border-l border-gray-200">₹{Math.floor(product.basePrice * 0.80).toLocaleString()}</div>
              </div>
            </div>

            {/* Configurator */}
            <div className="space-y-6 mb-8">
              {/* Color */}
              <div>
                <label className="block text-sm font-bold text-navy mb-3">Color Preference: <span className="text-gray-500 font-normal">{selectedColor}</span></label>
                <div className="flex gap-3">
                  {colors.map(c => (
                    <button 
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`h-10 w-10 rounded-full border-2 focus:outline-none transition-all ${selectedColor === c ? 'border-navy scale-110' : 'border-transparent ring-1 ring-gray-300'}`}
                      style={{ backgroundColor: c.toLowerCase().replace(' ', '') === 'navyblue' ? '#0f1b2d' : c.toLowerCase().replace(' ', '') === 'charcoalgrey' ? '#374151' : c.toLowerCase() }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-navy mb-3">Total Quantity (Min: 10)</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
                    <button 
                      onClick={() => setQty(Math.max(10, qty - 1))}
                      className="px-4 h-full hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <input 
                      type="number" 
                      value={qty}
                      onChange={(e) => setQty(Math.max(10, parseInt(e.target.value) || 10))}
                      className="w-16 h-full text-center font-bold text-lg border-x border-gray-300 outline-none"
                    />
                    <button 
                      onClick={() => setQty(qty + 1)}
                      className="px-4 h-full hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Line Total</span>
                    <span className="text-xl font-bold text-navy font-display">₹{(currentPrice * qty).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToQuote}
                className="flex-1 bg-navy text-white hover:bg-gold hover:text-navy font-bold py-4 px-6 rounded-full transition-all duration-300 flex justify-center shadow-lg"
              >
                + Add to Quote List
              </button>
              <a href={`https://wa.me/919717355779?text=I am interested in ${qty} pcs of ${product.sku} - ${product.name}`} target="_blank" rel="noreferrer" 
                 className="flex-1 border-2 border-navy text-navy hover:bg-gray-50 font-bold py-4 px-6 rounded-full transition-colors flex justify-center text-center">
                Chat on WhatsApp
              </a>
            </div>

            {/* Accordion Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-gold mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-navy text-sm">Quality Guaranteed</h4>
                  <p className="text-xs text-gray-500 mt-1">Premium 65/35 Polyviscose blend designed for everyday duty. Breathable and color-fast.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-gold mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-navy text-sm">Production Time</h4>
                  <p className="text-xs text-gray-500 mt-1">Standard 7-10 days for orders under 100 pcs. Custom embroidery adds 2 days.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Layers className="text-gold mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-navy text-sm">Sizes & Fits</h4>
                  <p className="text-xs text-gray-500 mt-1">Available in XS to 3XL. Custom measurements can be accommodated for large orders.</p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
