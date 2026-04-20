import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, Send } from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories.seed';

const QuoteDrawer = () => {
  const { items, isDrawerOpen, setDrawerOpen, updateQty, removeItem, clearAll } = useQuoteStore();
  const navigate = useNavigate();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate('/get-quote');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl z-10"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-navy text-white flex justify-between items-center shrink-0">
              <h2 className="font-display font-bold text-xl flex items-center gap-2">
                <span className="text-gold">âœ¦</span> My Quote List
              </h2>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close quote list"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                  <div className="text-6xl">ðŸ“</div>
                  <p className="font-bold">Your quote list is empty.</p>
                  <p className="text-sm">Browse our catalogue to add items.</p>
                  <button 
                    onClick={() => { setDrawerOpen(false); navigate('/products'); }}
                    className="mt-4 px-6 py-2 border border-navy rounded-full hover:bg-navy hover:text-white transition-colors"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                items.map((item, idx) => {
                  const cat = CATEGORIES.find(c => c.id === item.categoryId);
                  return (
                    <div key={`${item.productId}-${item.color}-${idx}`} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                      <div className="w-20 h-24 bg-gray-200 rounded-lg flex items-center justify-center shrink-0 text-3xl">
                        {cat?.icon || '👕'}
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-navy truncate pr-2">{item.name}</h4>
                          <button onClick={() => removeItem(item.productId, item.color)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-2 font-mono">
                          SKU: {item.sku} {item.color ? `| Color: ${item.color}` : ''}
                        </div>
                        
                        <div className="flex justify-between items-end mt-auto">
                          <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                            <button 
                              onClick={() => updateQty(item.productId, item.color, Math.max(10, item.qty - 1))}
                              className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1 text-sm font-bold min-w-[3ch] text-center border-x border-gray-300">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.productId, item.color, item.qty + 1)}
                              className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 bg-gray-50 border-t border-gray-200 shrink-0">
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-navy text-white hover:bg-gold hover:text-navy font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} /> Request Accurate Quote
                  </button>
                  <button 
                    onClick={clearAll}
                    className="w-full text-gray-500 hover:text-navy text-sm font-semibold transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteDrawer;
