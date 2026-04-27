import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../../data/categories.seed';
import { useProductStore } from '../../store/productStore';

const ProductsManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product) => {
    setEditingProduct(product);
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      id: editingProduct ? editingProduct.id : `p${Date.now()}`,
      sku: formData.get('sku'),
      name: formData.get('name'),
      categoryId: formData.get('categoryId'),
      basePrice: Number(formData.get('basePrice')),
      isActive: formData.get('isActive') === 'on',
      image: previewImage || editingProduct?.image,
      // Maintain existing values if editing
      isFeatured: editingProduct?.isFeatured || false,
      viewCount: editingProduct?.viewCount || 0,
      tags: editingProduct?.tags || []
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, newProduct);
    } else {
      addProduct(newProduct);
    }
    setPreviewImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-navy">Products</h1>
          <p className="text-gray-500">Manage your catalogue inventory and pricing.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-navy text-white hover:bg-gold hover:text-navy px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 flex overflow-hidden bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Base Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const category = CATEGORIES.find(c => c.id === product.categoryId);
                return (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          category?.icon || <ImageIcon size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-navy">{product.name}</div>
                        <div className="text-xs font-mono text-gray-500 mt-1">{product.sku}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {category?.name || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4 font-bold text-navy">
                      ₹{product.basePrice}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-semibold ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {product.isActive ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-navy p-2 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h2 className="font-display font-bold text-2xl text-navy">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => { setIsModalOpen(false); setPreviewImage(null); }} className="text-gray-400 hover:text-navy text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="productForm" onSubmit={handleSave} className="space-y-6">
                
                <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors relative overflow-hidden">
                    {previewImage || editingProduct?.image ? (
                      <img src={previewImage || editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon size={24} className="mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Upload</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy">Product Image</h4>
                    <p className="text-xs text-gray-500 mt-1">Recommended size: 800x1200px. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">SKU Code</label>
                    <input required name="sku" defaultValue={editingProduct?.sku} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Base Price (₹)</label>
                    <input required type="number" name="basePrice" defaultValue={editingProduct?.basePrice} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                    <input required name="name" defaultValue={editingProduct?.name} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                    <select required name="categoryId" defaultValue={editingProduct?.categoryId || CATEGORIES[0].id} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold focus:bg-white transition-colors">
                      {CATEGORIES.map(c => (
                         <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="isActive" defaultChecked={editingProduct ? editingProduct.isActive : true} className="w-4 h-4 text-navy border-gray-300 rounded focus:ring-gold" />
                      <span className="text-sm font-bold text-navy">Publish immediately</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50">
              <button onClick={() => { setIsModalOpen(false); setPreviewImage(null); }} className="px-6 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
              <button form="productForm" type="submit" className="px-6 py-2 rounded-lg font-bold bg-navy text-white hover:bg-gold hover:text-navy transition-colors">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
