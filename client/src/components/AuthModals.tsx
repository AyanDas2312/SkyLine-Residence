import React, { useState } from 'react';
import axios from 'axios';
import { X, Lock, Mail, User, Home, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalsProps {
  type: 'userLogin' | 'adminLogin' | 'register' | null;
  onClose: () => void;
  onSwitch: (newType: 'userLogin' | 'adminLogin' | 'register') => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({ type, onClose, onSwitch }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [residentId, setResidentId] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!type) return null;

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        identifier,
        password,
        role: 'user'
      });
      login(res.data.token, res.data.user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        identifier,
        password,
        role: 'admin'
      });
      login(res.data.token, res.data.user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Admin authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        residentId,
        email,
        password,
        name,
        flatNo
      });
      login(res.data.token, res.data.user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('A password reset link has been dispatched to your registered apartment email.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl text-white">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 text-red-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* 1. User Login */}
        {type === 'userLogin' && (
          <form onSubmit={handleUserLogin} className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">Resident Portal</h3>
              <p className="text-xs text-slate-400 mt-1">Sign in using your Flat ID or Email</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Resident ID or Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input 
                  type="text" 
                  required
                  placeholder="RES-101 or user@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-cyan-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20"
            >
              {loading ? 'Authenticating...' : 'Sign In as Resident'}
            </button>

            <p className="text-center text-xs text-slate-400 pt-2">
              Not an existing user?{' '}
              <button 
                type="button" 
                onClick={() => onSwitch('register')} 
                className="text-cyan-400 font-semibold hover:underline"
              >
                Register here
              </button>
            </p>
          </form>
        )}

        {/* 2. Admin Login */}
        {type === 'adminLogin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-block p-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Admin Portal</h3>
              <p className="text-xs text-slate-400 mt-1">Restricted executive committee access only</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Admin Email or ID</label>
              <input 
                type="text" 
                required
                placeholder="admin@skyline.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Secret Key / Password</label>
              <input 
                type="password" 
                required
                placeholder="Admin@12345"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-500/20"
            >
              {loading ? 'Verifying Admin...' : 'Enter Admin Dashboard'}
            </button>
          </form>
        )}

        {/* 3. Registration */}
        {type === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold">Resident Registration</h3>
              <p className="text-xs text-slate-400">Join the Skyline Residency Portal</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Resident ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="RES-402"
                  value={residentId}
                  onChange={(e) => setResidentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Flat No</label>
                <div className="relative">
                  <Home className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    required
                    placeholder="B-402"
                    value={flatNo}
                    onChange={(e) => setFlatNo(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
              <input 
                type="email" 
                required
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
              <input 
                type="password" 
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>

            <p className="text-center text-xs text-slate-400 pt-2">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => onSwitch('userLogin')} 
                className="text-cyan-400 font-semibold hover:underline"
              >
                Go to Login
              </button>
            </p>
          </form>
        )}

      </div>
    </div>
  );
};