import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { GraduationCap, Building2, Shield, Database, ArrowRight, Check } from 'lucide-react';
import { cn } from '../../utils';
import { motion } from 'motion/react';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PRESIDENT);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setError('');
    try {
      await login({ username, password, role: selectedRole });
      // Navigation is handled by the useEffect above, 
      // but we can also explicitly navigate here if preferred.
    } catch (err: any) {
      setError(err.message);
    }
  };

  const roles = [
    { id: UserRole.PRESIDENT, label: 'President', icon: GraduationCap },
    { id: UserRole.DEAN, label: 'Dean', icon: Building2 },
    { id: UserRole.HOD, label: 'HoD', icon: Shield },
    { id: UserRole.DBA, label: 'DBA', icon: Database },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">
      {/* Branding Panel */}
      <div className="w-full lg:w-2/5 bg-emerald-900 p-10 md:p-16 text-white flex flex-col items-center lg:items-start justify-center text-center lg:text-left relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full flex flex-col items-center lg:items-start"
        >
          {/* Logo Placeholder */}
          <div className="mb-8 flex justify-center lg:justify-start">
             <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
               {/* Simulating the seal logo from image */}
               <div className="w-14 h-14 border-2 border-white/40 rounded-full flex items-center justify-center font-black text-xs p-1 text-center">AL-ZAYTOONAH</div>
             </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] uppercase mb-6" style={{ color: '#E1FFEA' }}>
            AL-ZAYTOONAH <br className="hidden md:block" /> UNIVERSITY
          </h1>
          
          <div className="w-24 h-1 mb-8 rounded-full" style={{ backgroundColor: '#F0F8CC' }} />
          
          <p className="text-sm md:text-lg max-w-xs md:max-w-sm leading-relaxed font-medium mx-auto lg:mx-0" style={{ color: '#E1FFEA' }}>
            Access the verified administrative portal for institutional governance and departmental oversight.
          </p>
        </motion.div>
        
        {/* Decorative Background Element */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Login Form Panel */}
      <div className="flex-grow flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Secure Access</h2>
          <p className="text-gray-500 font-medium mb-12">Select your administrative role to continue to the ledger</p>

          <div className="space-y-6">
            {/* Role Selection Grid */}
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-4">Select Administrative Role</p>
              <div className="grid grid-cols-4 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200",
                      selectedRole === role.id 
                        ? "bg-gray-100 border-gray-200" 
                        : "bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200"
                    )}
                  >
                    <role.icon 
                      size={18} 
                      className={cn(
                        "transition-colors duration-200",
                        selectedRole === role.id ? "text-emerald-900" : "text-gray-400"
                      )} 
                    />
                    <span className={cn(
                      "text-[9px] font-bold tracking-tight", 
                      selectedRole === role.id ? "text-gray-900" : "text-gray-500"
                    )}>
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Section */}
            <div className="space-y-3">
              <div className="relative group">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="University ID e.g. 2022XXXXX"
                  className="w-full px-5 py-4 bg-[#E9EEF0] border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-sm font-semibold placeholder:text-gray-400"
                />
              </div>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  className="w-full px-5 py-4 bg-[#E9EEF0] border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-sm font-semibold placeholder:text-gray-400"
                />
              </div>
              {error && (
                <p className="text-[10px] font-bold text-red-500 mt-1 px-1 tracking-tight">{error}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-emerald-800 focus:ring-emerald-500 cursor-pointer" />
                  <span className="text-[11px] font-bold text-gray-400">Remember Me</span>
               </div>
               <button className="text-[11px] font-black text-emerald-900 uppercase tracking-tighter hover:underline">Forget Password?</button>
            </div>

            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-[#1B4332] text-white rounded-lg font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-[#133024] transition-all active:scale-[0.98]"
            >
              Enter Portal
            </button>
          </div>
          
          <p className="mt-12 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
            Al-Zaytoonah University Institutional Governance System
          </p>
        </motion.div>
      </div>
    </div>
  );
}
