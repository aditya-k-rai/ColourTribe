import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/adminAuthStore';
import { Lock } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@colourtribe.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  
  const login = useAdminAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold to-brand-accent"></div>
        
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Colour Tribe Logo" className="h-20 w-auto object-contain rounded-md" />
        </div>

        <h2 className="font-display text-3xl font-bold text-navy text-center mb-2">Admin Portal</h2>
        <p className="text-gray-500 text-center text-sm mb-8">Sign in to manage your business.</p>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-gold transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-navy text-white hover:bg-gold hover:text-navy font-bold py-4 rounded-lg transition-colors mt-4"
          >
            Access Portal
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Mock Credentials: admin@colourtribe.in / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
