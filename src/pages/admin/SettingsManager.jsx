import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Globe } from 'lucide-react';

const SettingsManager = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-navy">Settings</h1>
        <p className="text-gray-500">Configure your admin preferences and portal defaults.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy mb-6 flex items-center gap-2">
            <Bell size={18} className="text-gold" /> Notification Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium text-gray-700">Email on New Quote Request</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-navy border-gray-300 rounded focus:ring-gold" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium text-gray-700">SMS Alerts for Urgent Leads</span>
              <input type="checkbox" className="w-4 h-4 text-navy border-gray-300 rounded focus:ring-gold" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium text-gray-700">Weekly Performance Report</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-navy border-gray-300 rounded focus:ring-gold" />
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy mb-6 flex items-center gap-2">
            <Shield size={18} className="text-gold" /> Security & Access
          </h3>
          <div className="space-y-4">
             <button className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex justify-between items-center">
               Change Admin Password
               <span className="text-gray-400">&rsaquo;</span>
             </button>
             <button className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex justify-between items-center">
               Two-Factor Authentication
               <span className="text-xs bg-navy/5 text-navy px-2 py-0.5 rounded">Disabled</span>
             </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy mb-6 flex items-center gap-2">
            <Globe size={18} className="text-gold" /> Regional Defaults
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Currency Symbol</label>
              <select className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none text-sm">
                <option value="INR">₹ (INR)</option>
                <option value="USD">$ (USD)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Default Production Lead Time</label>
              <input type="text" defaultValue="7-10 Days" className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy mb-6 flex items-center gap-2">
            <Database size={18} className="text-gold" /> Data Management
          </h3>
          <div className="space-y-3">
             <button className="w-full bg-navy text-white font-bold py-2.5 rounded-lg hover:bg-gold hover:text-navy transition-all text-sm">
               Export All Products (CSV)
             </button>
             <button className="w-full border-2 border-gray-200 text-gray-600 font-bold py-2 rounded-lg hover:bg-gray-50 transition-all text-sm">
               Backup Database
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
