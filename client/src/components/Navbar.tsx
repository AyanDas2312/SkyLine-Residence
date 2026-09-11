import React, { useState } from 'react';
import { Building2, ChevronDown, UserCheck, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: (type: 'userLogin' | 'adminLogin' | 'register') => void;
  onNavigateServiceCharge: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onNavigateServiceCharge, onOpenAdmin }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md text-white z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Leftmost Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight block">SKYLINE</span>
            <span className="text-[10px] text-cyan-400 font-semibold tracking-widest uppercase">Residency</span>
          </div>
        </a>

        {/* Middle Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <a href="#home" className="text-slate-300 hover:text-cyan-400 transition-colors">HOME</a>
          <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">ABOUT</a>
          <a href="#gallery" className="text-slate-300 hover:text-cyan-400 transition-colors">GALLERY</a>
          <a href="#committee" className="text-slate-300 hover:text-cyan-400 transition-colors">COMMITTEE</a>
          <button 
            onClick={onNavigateServiceCharge} 
            className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            SERVICE CHARGE
          </button>
        </div>

        {/* Right Dropdown Menu */}
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold hover:bg-red-500/30"
                >
                  Admin Portal
                </button>
              )}
              <div className="text-right">
                <p className="text-xs font-bold text-slate-200">{user.name}</p>
                <p className="text-[10px] text-slate-400">{user.flatNo} ({user.role})</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
              >
                <span>Portal Login</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                  onClick={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => onOpenAuth('userLogin')}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    Resident Login
                  </button>
                  <button
                    onClick={() => onOpenAuth('adminLogin')}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Admin Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};