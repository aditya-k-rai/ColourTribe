import React, { useState } from 'react';
import { Search, Eye, MoreVertical } from 'lucide-react';

const MOCK_QUOTES = [
  { id: 'CT-092', client: 'Hotel Royal Orchid', location: 'Bengaluru', value: 245000, items: 3, status: 'pending', date: '2023-10-24' },
  { id: 'CT-091', client: 'Spice Route Dining', location: 'Mumbai', value: 45500, items: 1, status: 'sent', date: '2023-10-23' },
  { id: 'CT-090', client: 'Vistara Aviation', location: 'Delhi', value: 180000, items: 2, status: 'approved', date: '2023-10-22' },
  { id: 'CT-089', client: 'Taj Palace', location: 'Delhi', value: 320000, items: 5, status: 'rejected', date: '2023-10-20' },
  { id: 'CT-088', client: 'Ritz Carlton', location: 'Pune', value: 155000, items: 2, status: 'sent', date: '2023-10-18' },
];

const QuotesManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotes = MOCK_QUOTES.filter(q => {
    const matchesSearch = q.client.toLowerCase().includes(searchTerm.toLowerCase()) || q.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold border border-yellow-200">Pending Review</span>;
      case 'sent': return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold border border-blue-200">Quote Sent</span>;
      case 'approved': return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold border border-green-200">Approved</span>;
      case 'rejected': return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-semibold border border-red-200">Rejected</span>;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-navy">Quotes & Leads</h1>
          <p className="text-gray-500">Manage incoming bulk order requests and sent quotes.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex overflow-hidden bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text"
              placeholder="Search by client or reference ID..."
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
            <option value="pending">Pending Review</option>
            <option value="sent">Quote Sent</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-4">Ref ID</th>
                <th className="px-6 py-4">Client Details</th>
                <th className="px-6 py-4">Value (Est)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500 tracking-wide">
                    {quote.id}
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-bold text-navy">{quote.client}</div>
                     <div className="text-xs text-gray-400 mt-1">{quote.location} &bull; {quote.items} Items</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-navy">
                    &#8377;{quote.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(quote.status)}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(quote.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-navy bg-gold/10 hover:bg-gold hover:text-navy px-3 py-1.5 rounded text-xs font-bold transition-colors inline-flex items-center gap-1">
                      <Eye size={14} /> View Details
                    </button>
                    <button className="text-gray-400 hover:text-navy p-2 transition-colors ml-2">
                       <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredQuotes.length === 0 && (
                <tr>
                   <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                     No quotes found matching your criteria.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuotesManager;
