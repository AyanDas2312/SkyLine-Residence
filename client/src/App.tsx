import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Committee } from './components/Committee';
import { AuthModals } from './components/AuthModals';
import { PaymentModal } from './components/PaymentModal';
import { AdminDashboard } from './components/AdminDashboard';
import { useAuth } from './context/AuthContext';
import type { Notice } from './types';

export const App: React.FC = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [authModal, setAuthModal] = useState<'userLogin' | 'adminLogin' | 'register' | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notices');
      setNotices(res.data);
    } catch (err) {
      console.error('Error fetching notices', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Requirement: if clicking on service charge navigation - if user is logged in redirect to payment page, if not logged in redirect to login page
  const handleNavigateServiceCharge = () => {
    if (user) {
      setShowPayment(true);
    } else {
      setAuthModal('userLogin');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Dynamic Fixed Navbar */}
      <Navbar 
        onOpenAuth={(type) => setAuthModal(type)}
        onNavigateServiceCharge={handleNavigateServiceCharge}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* Sections */}
      <Hero 
        notices={notices} 
        onExplore={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      <About />
      <Gallery />
      <Committee />

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 Skyline Residency Residential Society. All rights reserved.</p>
      </footer>

      {/* Modals & Overlays */}
      <AuthModals 
        type={authModal} 
        onClose={() => setAuthModal(null)} 
        onSwitch={(newType) => setAuthModal(newType)} 
      />

      {showPayment && (
        <PaymentModal onClose={() => setShowPayment(false)} />
      )}

      {showAdmin && (
        <AdminDashboard 
          notices={notices} 
          onClose={() => setShowAdmin(false)} 
          onRefreshNotices={fetchNotices} 
        />
      )}

    </div>
  );
};
export default App;
