import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Clock, Layers, Plus, Minus } from 'lucide-react';
import { useQuoteStore } from '../store/quoteStore';
import { useProductStore } from '../store/productStore';
import { CATEGORIES } from '../data/categories.seed';
import { setPageMeta, setJsonLd, removeJsonLd, buildProductSchema, buildBreadcrumbSchema } from '../utils/seo';

const ProductPage = () => {
  const { sku } = useParams();
  const navigate = useNavigate();
  const addItem = useQuoteStore(state => state.addItem);
  const { products } = useProductStore();
  
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [qty, setQty] = useState(10);
  const [selectedColor, setSelectedColor] = useState('Navy Blue');
  const [activeTab, setActiveTab] = useState('description');

  const colors = ['Navy Blue', 'Black', 'Charcoal Grey', 'White'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find(p => p.sku === sku);
    if (foundProduct) {
      const foundCategory = CATEGORIES.find(c => c.id === foundProduct.categoryId);
      setProduct(foundProduct);
      setCategory(foundCategory);
      setQty(10);

      // SEO: dynamic title + meta per product
      setPageMeta({
        title: `${foundProduct.name} | Colour Tribe B2B Uniforms`,
        description: `Buy ${foundProduct.name} (SKU: ${foundProduct.sku}) from Colour Tribe. Premium quality ${foundCategory?.name || 'uniform'} — custom embroidery, bulk pricing, pan-India delivery. Min. 10 pcs.`,
      });

      // JSON-LD: Product schema
      setJsonLd('ld-product', buildProductSchema(foundProduct, foundCategory));

      // JSON-LD: Breadcrumb schema
      setJsonLd('ld-breadcrumb', buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: foundCategory?.name || 'Category', path: `/products/${foundCategory?.slug}` },
        { name: foundProduct.name, path: `/product/${foundProduct.sku}` },
      ]));
    }
    return () => {
      removeJsonLd('ld-product');
      removeJsonLd('ld-breadcrumb');
    };
  }, [sku]);


  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-cream">
       <div className="text-center">
         <h2 className="text-3xl font-display text-navy mb-4">Product Not Found</h2>
         <button onClick={() => navigate('/products')} className="text-gold hover:underline">Return to Products</button>
       </div>
    </div>
  );

  const handleAddToQuote = () => {
    addItem(product, {
      qty,
      color: selectedColor,
    });
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-navy/60 mb-8 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-navy transition-colors">Products</Link>
          <ChevronRight size={14} />
          <Link to={`/products/${category?.slug}`} className="hover:text-navy transition-colors">{category?.name}</Link>
          <ChevronRight size={14} />
          <span className="text-navy">{product.sku}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left - Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="w-full lg:w-1/2 flex flex-col gap-4"
          >
            <motion.div 
              layoutId={`product-image-${product.sku}`}
              className="bg-[#f0f4f8] w-full aspect-[4/5] rounded-2xl flex items-center justify-center text-9xl relative overflow-hidden group border border-gray-100 shadow-inner"
            >
               <motion.span
                 initial={{ scale: 0.8 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="group-hover:scale-110 transition-transform duration-500"
               >
                 {category?.icon || '👔'}
               </motion.span>
            </motion.div>
            
            {/* Thumbnails placeholder */}
            <div className="flex gap-4">
               {[1,2,3,4].map((thumb, idx) => (
                 <motion.div 
                   key={thumb} 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 + (idx * 0.1) }}
                   whileHover={{ scale: 1.05 }}
                   className="w-1/4 aspect-square bg-[#f0f4f8] rounded-xl border-2 border-transparent hover:border-gold cursor-pointer transition-colors flex items-center justify-center text-3xl shadow-sm hover:shadow-md"
                 >
                   {category?.icon || '👔'}
                 </motion.div>
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
            
            <h1 className="font-display text-3xl md:text-4xl text-navy font-bold leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-navy/60 mb-6 font-medium">Contact us for pricing — bulk rates available for all orders.</p>

            {/* Configurator */}
            <div className="space-y-6 mb-8">
              {/* Color */}
              <div>
                <label className="block text-sm font-bold text-navy mb-3">Color Preference: <span className="text-navy/50 font-normal">{selectedColor}</span></label>
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
                
                {/* Quick Select Options */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[10, 20, 30, 50, 100].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setQty(amount)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${qty === amount ? 'bg-navy text-white' : 'bg-navy/5 text-navy/60 hover:bg-navy/10'}`}
                    >
                      {amount}
                    </button>
                  ))}
                  <div className="text-navy/40 text-sm flex items-center px-2">or specify:</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white h-12 w-full max-w-[160px]">
                    <button 
                      onClick={() => setQty(Math.max(10, qty - 1))}
                      className="px-4 h-full hover:bg-gray-100 text-navy/60 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <input 
                      type="number" 
                      value={qty}
                      onChange={(e) => setQty(Math.max(10, parseInt(e.target.value) || 10))}
                      className="w-full h-full text-center font-bold text-lg border-x border-gray-300 outline-none text-navy"
                    />
                    <button 
                      onClick={() => setQty(qty + 1)}
                      className="px-4 h-full hover:bg-gray-100 text-navy/60 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
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
                 className="flex-1 border-2 border-navy text-navy hover:bg-navy/5 font-bold py-4 px-6 rounded-full transition-colors flex justify-center text-center">
                Chat on WhatsApp
              </a>
            </div>

            {/* Accordion Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-gold mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-navy text-sm">Quality Guaranteed</h4>
                  <p className="text-xs text-navy/70 mt-1 leading-relaxed">Premium 65/35 Polyviscose blend designed for everyday duty. Breathable and color-fast.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-gold mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-navy text-sm">Production Time</h4>
                  <p className="text-xs text-navy/70 mt-1 leading-relaxed">Standard 7-10 days for orders under 100 pcs. Custom embroidery adds 2 days.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Layers className="text-gold mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-navy text-sm">Sizes & Fits</h4>
                  <p className="text-xs text-navy/70 mt-1 leading-relaxed">Available in XS to 3XL. Custom measurements can be accommodated for large orders.</p>
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
