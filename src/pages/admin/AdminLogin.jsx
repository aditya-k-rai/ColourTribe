import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/adminAuthStore';
import { Mail, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../assets/logo.jpeg';

// Allowed administrators
const ALLOWED_EMAILS = ['lotwaala@gmail.com', 'adtyamighty@gmail.com'];

const AdminLogin = () => {
  const [step, setStep] = useState('email'); // 'email' or 'code'
  const [email, setEmail] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAdminAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleRequestCode = (e) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();

    if (!ALLOWED_EMAILS.includes(cleanEmail)) {
      toast.error('Unauthorized email address.');
      return;
    }

    setIsLoading(true);

    // Generate a 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    // Simulate sending email (In reality, use EmailJS / Firebase Functions here)
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
      toast.success('Verification code sent to your email!');
      // For testing / without backend, we show the code in the console or a toast so the user can literally test it today.
      toast(`System Email Code: ${code}`, { icon: '📧', duration: 10000 });
      console.log(`[Email Mock] Sent to ${cleanEmail}: Your login code is ${code}`);
    }, 1500);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    
    if (inputCode === generatedCode) {
      toast.success('Access Granted!');
      if (login(email.toLowerCase().trim())) {
        setTimeout(() => navigate('/admin/dashboard'), 500);
      }
    } else {
      toast.error('Invalid verification code.');
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold to-brand-accent"></div>
        
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Colour Tribe Logo" className="h-20 w-auto object-contain rounded-md" />
        </div>

        <h2 className="font-display text-3xl font-bold text-navy text-center mb-2">Admin Portal</h2>
        
        {step === 'email' ? (
          <>
             <p className="text-gray-500 text-center text-sm mb-8">Enter your authorized email to receive a login code.</p>
             <form onSubmit={handleRequestCode} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg outline-none focus:border-gold transition-colors text-center font-medium"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading || !email}
                className="w-full bg-navy text-white hover:bg-gold hover:text-navy font-bold py-4 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-navy disabled:hover:text-white"
              >
                {isLoading ? 'Sending...' : 'Get Login Code'} <ArrowRight size={18} />
              </button>
            </form>
          </>
        ) : (
          <>
             <p className="text-gray-500 text-center text-sm mb-8">We've sent a 6-digit code to <span className="font-bold text-navy">{email}</span>.</p>
             <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <KeyRound size={14} /> Verification Code
                </label>
                <input 
                  type="text" 
                  required
                  maxLength="6"
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg outline-none focus:border-gold transition-colors text-center text-2xl font-mono tracking-[0.5em]"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>

              <button 
                type="submit" 
                disabled={inputCode.length !== 6}
                className="w-full bg-navy text-white hover:bg-gold hover:text-navy font-bold py-4 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-navy disabled:hover:text-white"
              >
                <ShieldCheck size={18} /> Verify & Access
              </button>

              <button 
                type="button" 
                onClick={() => setStep('email')}
                className="w-full text-center text-xs text-gray-400 hover:text-navy font-bold py-2 mt-2"
              >
                Use a different email
              </button>
            </form>
          </>
        )}

        <div className="mt-8 text-center text-[10px] text-gray-400 border-t border-gray-100 pt-4">
          <p>Restricted Access - Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
