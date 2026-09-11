import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { useIdleTimer } from '../hooks/useIdleTimer';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('skyline_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem('skyline_token');
  });

  const login = (jwtToken: string, userData: User) => {
    setToken(jwtToken);
    setUser(userData);
    sessionStorage.setItem('skyline_token', jwtToken);
    sessionStorage.setItem('skyline_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.clear();
  };

  // Requirement: Auto logout after 30 minutes of inactivity
  useIdleTimer(() => {
    if (user) {
      alert('You have been logged out due to 30 minutes of inactivity.');
      logout();
    }
  }, 30 * 60 * 1000);

  // Requirement: Auto logout when window/tab is closed
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.clear();
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};