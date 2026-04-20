import React from 'react';
import { Users, ShoppingBag, FileText, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, increment, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6"
  >
    <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center text-navy shrink-0">
       <Icon size={24} />
    </div>
    <div>
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-display font-bold text-navy">{value}</span>
        <span className="text-xs font-bold text-green-500 mb-1">{increment}</span>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-navy">Dashboard</h1>
        <p className="text-gray-500">Welcome back. Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Active Quotes" value="24" increment="+12% this week" icon={FileText} delay={0.1} />
        <StatCard title="Total Products" value="86" increment="+3 new" icon={ShoppingBag} delay={0.2} />
        <StatCard title="Leads Captured" value="1,204" increment="+48 this month" icon={Users} delay={0.3} />
        <StatCard title="Est. Pipeline" value="â‚¹4.2M" increment="+8% vs last month" icon={DollarSign} delay={0.4} />
      </div>

      {/* Recent Activity Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-navy">Recent Quote Requests</h3>
            <button className="text-gold text-sm font-bold hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">ID</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Est. Value</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-4 py-4 font-mono text-gray-500">#CT-092</td>
                  <td className="px-4 py-4 font-bold text-navy">Hotel Royal Orchid</td>
                  <td className="px-4 py-4">â‚¹2,45,000</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold">Pending Review</span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">2 mins ago</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-4 py-4 font-mono text-gray-500">#CT-091</td>
                  <td className="px-4 py-4 font-bold text-navy">Spice Route Dining</td>
                  <td className="px-4 py-4">â‚¹45,500</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">Quote Sent</span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">1 hr ago</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-gray-500">#CT-090</td>
                  <td className="px-4 py-4 font-bold text-navy">Vistara Aviation</td>
                  <td className="px-4 py-4">â‚¹1,80,000</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">Sample Approved</span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">Yesterday</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-navy rounded-2xl shadow-sm text-white p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-gold/20 rounded-full blur-2xl"></div>
           
           <h3 className="font-bold text-gold mb-6 flex items-center gap-2">
             <TrendingUp size={18} /> Trend Analysis
           </h3>
           
           <div className="space-y-6">
             <div>
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-white/70">Housekeeping Tunic Sets</span>
                 <span className="font-bold">Trending High</span>
               </div>
               <div className="w-full bg-white/10 rounded-full h-2">
                 <div className="bg-gold h-2 rounded-full w-[85%]"></div>
               </div>
             </div>
             
             <div>
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-white/70">Executive Chef Coats</span>
                 <span className="font-bold">Steady</span>
               </div>
               <div className="w-full bg-white/10 rounded-full h-2">
                 <div className="bg-green-400 h-2 rounded-full w-[60%]"></div>
               </div>
             </div>
             
             <div>
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-white/70">Formal Shirts Waitstaff</span>
                 <span className="font-bold">Rising</span>
               </div>
               <div className="w-full bg-white/10 rounded-full h-2">
                 <div className="bg-blue-400 h-2 rounded-full w-[45%]"></div>
               </div>
             </div>
           </div>

           <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-xs text-white/50 leading-relaxed">
                Data generated from recent Quote Configurations and Catalogue specific Page Views.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
