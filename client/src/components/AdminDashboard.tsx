import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Users, DollarSign, BellRing, Trash2, PlusCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { PaymentRecord, Notice } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
  notices: Notice[];
  onRefreshNotices: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, notices, onRefreshNotices }) => {
  const { token } = useAuth();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/payments/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Failed to load admin ledgers', err);
      }
    };
    fetchPayments();
  }, [token]);

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/notices',
        {
          title: newTitle,
          description: newDesc,
          priority: newPriority,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTitle('');
      setNewDesc('');
      onRefreshNotices();
    } catch (err) {
      alert('Failed to post notice');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefreshNotices();
    } catch (err) {
      alert('Failed to delete notice');
    }
  };

  const totalCollected = payments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-6xl p-6 sm:p-8 relative shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-white">Executive Administrator Portal</h2>
          <p className="text-sm text-slate-400">Complete resident directory, financial tracking, and real-time notice management</p>
        </div>

        {/* Analytics KPIs and Simple Visual Chart */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Total Residents Tracked</p>
              <p className="text-2xl font-black text-white">{payments.length + 350}</p>
            </div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Collections (This Month)</p>
              <p className="text-2xl font-black text-emerald-400">₹{totalCollected}</p>
            </div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Payment Compliance</p>
              <p className="text-2xl font-black text-white">96.4%</p>
            </div>
          </div>
        </div>

        {/* Notice Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Add Notice Form */}
          <div className="lg:col-span-5 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-lg">Broadcast New Notice</h3>
            </div>
            <form onSubmit={handleAddNotice} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Notice Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Water Tank Cleaning"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
                <select 
                  value={newPriority} 
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Provide precise details, dates, and instructions..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
              >
                {loading ? 'Broadcasting...' : 'Publish to Live Ticker'}
              </button>
            </form>
          </div>

          {/* Active Notices List */}
          <div className="lg:col-span-7 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <BellRing className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-lg">Active Notices ({notices.length})</h3>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {notices.map((n) => (
                <div key={n._id} className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        n.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {n.priority}
                      </span>
                      <span className="text-[11px] text-slate-400">{n.date}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-white">{n.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{n.description}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteNotice(n._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    title="Delete Notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Resident Payment Records Table */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h3 className="font-bold text-lg mb-4">Resident Maintenance Fee Ledger</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-slate-700 uppercase tracking-wider">
                <tr>
                  <th className="pb-3">Resident ID</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Flat No</th>
                  <th className="pb-3">Month</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Txn Ref</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-4 text-center text-slate-500">
                      No payments processed in this session yet.
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-800/50">
                      <td className="py-3 font-mono text-cyan-400">{p.residentId}</td>
                      <td className="py-3 font-medium text-white">{p.name}</td>
                      <td className="py-3">{p.flatNo}</td>
                      <td className="py-3">{p.month}</td>
                      <td className="py-3 font-semibold text-white">₹{p.amount}</td>
                      <td className="py-3">{p.method}</td>
                      <td className="py-3 font-mono text-[10px] text-slate-400">{p.transactionId}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};