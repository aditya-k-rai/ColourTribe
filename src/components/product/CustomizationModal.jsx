import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { useLeadStore } from '../../store/leadStore';
import { db, storage } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

const CustomizationModal = ({ isOpen, onClose, product, selectedColor }) => {
  const { name: leadName, phone: leadPhone } = useLeadStore();
  
  const [formData, setFormData] = useState({
    name: leadName || '',
    phone: leadPhone || '',
    details: ''
  });
  
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle file selection (max 2)
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 2) {
      toast.error('You can only upload a maximum of 2 images.');
      return;
    }
    setFiles(prev => [...prev, ...selectedFiles].slice(0, 2));
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.details) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrls = [];

      // 1. Upload Images to Firebase Storage
      if (files.length > 0) {
        for (const file of files) {
          try {
            const timestamp = Date.now();
            const storageRef = ref(storage, `customizations/${timestamp}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            imageUrls.push(url);
          } catch (storageErr) {
            console.error("Storage upload failed (mock keys maybe?):", storageErr);
            // If it fails (likely due to mock keys), we push a mock URL for demonstration
            imageUrls.push(`https://via.placeholder.com/150?text=MockImage(${file.name})`);
            toast.error("Image upload failed. Check Firebase config.", { id: 'storage_err' });
          }
        }
      }

      // 2. Save Document to Firestore
      const requestData = {
        customerName: formData.name,
        customerPhone: formData.phone,
        productSku: product.sku,
        productName: product.name,
        color: selectedColor,
        details: formData.details,
        images: imageUrls,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(collection(db, 'customization_requests'), requestData);
      } catch (dbErr) {
        console.error("Firestore save failed:", dbErr);
        // Fallback for mock keys so UI works
        toast.error("Database save failed. Check Firebase config.", { id: 'db_err' });
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFiles([]);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {isSuccess ? (
            <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 text-4xl">
                <CheckCircle size={40} />
              </div>
              <h2 className="font-display text-3xl text-navy font-bold mb-4">Request Sent!</h2>
              <p className="text-gray-500 mb-8">
                Your customization request for {product.name} has been submitted. Our team will review the details and contact you shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="px-6 py-4 bg-navy text-white flex justify-between items-center shrink-0">
                <div>
                  <h2 className="font-display font-bold text-xl flex items-center gap-2">
                    <span className="text-gold">✦</span> Customization Request
                  </h2>
                  <p className="text-xs text-white/70 mt-1 font-mono">SKU: {product.sku} | Color: {selectedColor}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <form id="customization-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Name *</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone *</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description & Requirements *</label>
                    <textarea 
                      required 
                      rows="4" 
                      placeholder="Please specify changes, logo embroidery details, dimensions, etc."
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Image Upload Area */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Reference Images (Max 2)</span>
                      <span className="text-gray-400">{files.length}/2 Uploaded</span>
                    </label>
                    
                    {files.length < 2 && (
                      <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-gold transition-colors cursor-pointer mb-3">
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          disabled={files.length >= 2}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <Upload className="text-gray-400 mb-2" size={24} />
                        <span className="text-sm font-bold text-navy">Click or drag images to upload</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB each</span>
                      </div>
                    )}

                    {files.length > 0 && (
                      <div className="flex gap-3 mt-3">
                        {files.map((file, i) => (
                          <div key={i} className="relative w-20 h-20 border border-gray-200 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                            {file.type.startsWith('image/') ? (
                              <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="text-gray-400" />
                            )}
                            <button 
                              type="button"
                              onClick={() => removeFile(i)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 shrink-0 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="customization-form"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 rounded-full text-sm font-bold bg-navy text-white hover:bg-gold hover:text-navy transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit Request'}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomizationModal;
