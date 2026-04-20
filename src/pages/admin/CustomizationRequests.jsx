import React, { useState, useEffect } from 'react';
import { Search, Eye, MoreVertical, Layers, Image as ImageIcon } from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const CustomizationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(collection(db, 'customization_requests'), orderBy('createdAt', 'desc'), limit(50));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(data);
      } catch (err) {
        console.error("Error fetching customizations (using mock data fallback):", err);
        // Fallback mock data if Firebase keys are missing
        setRequests([
          { 
            id: 'mock-1', 
            customerName: 'Aisha Sharma', 
            customerPhone: '9876543210', 
            productSku: 'HO-01', 
            productName: 'Premium Corporate Suit Set', 
            color: 'Navy Blue', 
            details: 'Need company logo embroidered on the left pocket. Also add a golden trim on the lapel.',
            images: ['https://via.placeholder.com/150?text=LogoRef'],
            status: 'pending',
            createdAt: { toDate: () => new Date() }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(q => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = q.customerName?.toLowerCase().includes(term) || q.productSku?.toLowerCase().includes(term);
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold border border-yellow-200">Pending</span>;
      case 'reviewed': return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold border border-blue-200">Reviewed</span>;
      case 'approved': return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold border border-green-200">Approved</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold border border-gray-200">{status}</span>;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    // Handle Firestore timestamp or Mock JS Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-navy flex items-center gap-3">
            <Layers className="text-gold" /> Customization Requests
          </h1>
          <p className="text-gray-500 mt-2">Manage incoming product customization notes and image references.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex overflow-hidden bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text"
              placeholder="Search by customer name or product SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-sm rounded-lg py-2 px-3 outline-none focus:border-gold md:w-48"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-12 text-center text-gray-500 font-bold">Loading Customization Requests...</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product Requested</th>
                  <th className="px-6 py-4">Details & References</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                       <div className="font-bold text-navy">{req.customerName}</div>
                       <div className="text-xs text-gray-400 mt-1 font-mono">{req.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy">{req.productSku}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">{req.productName}</div>
                      <div className="text-xs text-gold mt-1">Color: {req.color}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2" title={req.details}>{req.details}</p>
                      {req.images && req.images.length > 0 && (
                        <div className="flex gap-2">
                          {req.images.map((imgUrl, i) => (
                            <a 
                              key={i} 
                              href={imgUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="w-10 h-10 rounded border border-gray-200 overflow-hidden inline-flex items-center justify-center bg-gray-100 hover:border-gold transition-colors"
                              title="View Reference Image"
                            >
                              <ImageIcon size={16} className="text-gray-400" />
                            </a>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                      {formatDate(req.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-navy bg-gold/10 hover:bg-gold hover:text-navy p-2 rounded transition-colors inline-flex items-center justify-center">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-navy p-2 transition-colors ml-2">
                         <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                     <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                       No customization requests found.
                     </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationRequests;
