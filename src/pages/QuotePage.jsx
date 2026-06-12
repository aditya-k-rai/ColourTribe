import React, { useState, useEffect } from 'react';
import { useQuoteStore } from '../store/quoteStore';
import { useLeadStore } from '../store/leadStore';
import { useNavigate } from 'react-router-dom';
import { setPageMeta } from '../utils/seo';

const QuotePage = () => {
  const { items, submitQuote } = useQuoteStore();
  const { name, phone, email, businessName, city, updateLead } = useLeadStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name, phone, email, businessName, city, message: '' });

  useEffect(() => {
    setPageMeta({
      title: 'Request Bulk Uniform Quote | Colour Tribe',
      description: 'Get a free, factory-direct bulk quote for custom hospitality, chef, corporate, housekeeping & industrial uniforms. Low MOQ of 10 pieces with pan-India delivery.',
      canonicalPath: '/get-quote',
    });
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Process submission via store
    setTimeout(() => {
      const result = submitQuote(formData);
      updateLead(formData);
      setSubmittedRef(result.id);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 flex justify-center items-center font-body">
        <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg text-center mx-4">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✔</div>
          <h2 className="font-display text-3xl text-navy font-bold mb-4">Quote Submitted!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you, {formData.name}. We have received your bulk order request. Our team will contact you at {formData.phone} within 24 hours with a finalized exact price.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-8 font-mono text-sm text-gray-500">
            Reference No: {submittedRef}
          </div>
          <button 
            onClick={() => navigate('/products')}
            className="w-full bg-navy text-white font-bold py-4 rounded-full transition-colors hover:bg-gold hover:text-navy"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 text-center font-body">
        <h2 className="font-display text-3xl text-navy mb-4">Your Quote List is Empty</h2>
        <button onClick={() => navigate('/products')} className="text-gold underline font-bold">Return to Products</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="font-display text-4xl text-navy font-bold mb-10 text-center md:text-left">Request a Quote</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Quote Summary */}
          <div className="w-full lg:w-5/12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-navy uppercase tracking-widest text-sm mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-50">
                   <div className="flex-1">
                     <h4 className="font-bold text-sm text-navy">{item.name}</h4>
                     <p className="text-xs text-gray-400 mt-1">Color: {item.color} | Qty: {item.qty}</p>
                   </div>
                 </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-7/12 bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-navy/5">
            <h3 className="font-bold text-navy text-2xl mb-2 font-display">Contact Details</h3>
            <p className="text-gray-500 text-sm mb-8">Please fill in your details below and we'll get back to you with an exact quote.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name *</label>
                  <input required type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number *</label>
                  <input required type="tel" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Business/Hotel Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">City/Location</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Special Requirements</label>
                <textarea rows="4" placeholder="Any logo embroidery details, specific sizing needs, etc." className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-navy text-white hover:bg-gold hover:text-navy font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg">
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
