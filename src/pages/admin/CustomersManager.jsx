import React, { useState } from 'react';
import { Search, User, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Hotel Royal Orchid', contact: 'Mr. Sharma', email: 'procurement@royalorchid.com', phone: '+91 98765 43210', location: 'Bengaluru', totalQuotes: 3, status: 'Active' },
  { id: 'c2', name: 'Spice Route Dining', contact: 'Anjali Gupta', email: 'anjali@spiceroute.in', phone: '+91 91234 56789', location: 'Mumbai', totalQuotes: 1, status: 'Lead' },
  { id: 'c3', name: 'Vistara Aviation', contact: 'Capt. Vikram', email: 'uniforms@vistara.aero', phone: '+91 99887 76655', location: 'Delhi', totalQuotes: 2, status: 'Active' },
  { id: 'c4', name: 'Taj Palace', contact: 'Rajesh Khanna', email: 'r.khanna@tajhotels.com', phone: '+91 95555 44444', location: 'Delhi', totalQuotes: 5, status: 'Inactive' },
  { id: 'c5', name: 'Ritz Carlton', contact: 'Elena Gilbert', email: 'elena@ritz.pune.com', phone: '+91 90000 11111', location: 'Pune', totalQuotes: 2, status: 'Lead' },
];

const CustomersManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-navy">Customers</h1>
          <p className="text-gray-500">Manage your business clients and lead contacts.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex overflow-hidden bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 w-full max-w-md">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text"
              placeholder="Search by name, contact or email..."
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
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Quotes</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-navy">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail size={12} className="text-gray-400" />
                        <span className="text-xs">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone size={12} className="text-gray-400" />
                        <span className="text-xs">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin size={14} className="text-gold" />
                      <span>{customer.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-navy">{customer.totalQuotes}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold border ${
                      customer.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' :
                      customer.status === 'Lead' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-gray-50 text-gray-600 border-gray-100'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-navy hover:text-gold p-2 transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersManager;
