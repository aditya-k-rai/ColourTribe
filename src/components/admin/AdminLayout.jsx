import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, FileText } from 'lucide-react';
import { useAdminAuthStore } from '../../store/adminAuthStore';
import logo from '../../assets/logo.jpeg';

const AdminLayout = () => {
  const { logout, adminUser } = useAdminAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: FileText, label: 'Quotes & Leads', path: '/admin/quotes' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-body overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col shadow-xl shrink-0">
        <div className="p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Colour Tribe Logo" className="h-10 w-auto object-contain rounded-md" />
            <h1 className="font-display font-bold text-xl tracking-widest uppercase text-gold">
              Colour Tribe
            </h1>
          </div>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">Admin Portal</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gold text-navy font-bold shadow-lg shadow-gold/20' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-sm shrink-0">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-bold truncate">{adminUser?.name || 'Admin User'}</p>
               <p className="text-xs text-white/50 truncate">{adminUser?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-red-400 transition-colors rounded-lg"
          >
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Placeholder if needed */}
        <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
           <h2 className="font-bold text-navy">Overview</h2>
           <div className="flex gap-4 items-center">
             <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
             <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">System Online</span>
           </div>
        </header>

        {/* Scrollable Page Outlet */}
        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-6xl mx-auto">
             <Outlet />
           </div>
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
