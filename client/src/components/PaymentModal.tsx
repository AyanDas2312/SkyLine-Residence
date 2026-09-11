import React, { useState } from 'react';
import axios from 'axios';
import { X, CreditCard, QrCode, Building, Banknote, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PaymentModalProps {
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const { user, token } = useAuth();
  const [method, setMethod] = useState<'Card' | 'UPI' | 'Net Banking' | 'Cash'>('Card');
  const [amount] = useState(3500); // Standard Monthly Maintenance Fee
  const [month] = useState('October 2026');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/payments',
        {
          residentId: user?.residentId,
          name: user?.name,
          flatNo: user?.flatNo,
          amount,
          month,
          method,
          status: 'Paid'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTxnId(res.data.transactionId);
      setSuccess(true);
    } catch (err) {
      alert('Payment could not be processed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl text-white">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold">Payment Confirmed!</h3>
            <p className="text-sm text-slate-300">
              {method === 'Cash' 
                ? 'Your Cash Payment Token has been generated. Please submit payment at the Management Office.' 
                : 'Your online monthly maintenance charge was successfully received.'}
            </p>
            <div className="p-4 bg-slate-800 rounded-xl text-xs space-y-1 text-slate-300 border border-slate-700">
              <p><span className="text-slate-500">Transaction ID:</span> <span className="font-mono text-cyan-400 font-bold">{txnId}</span></p>
              <p><span className="text-slate-500">Resident:</span> {user?.name} ({user?.flatNo})</p>
              <p><span className="text-slate-500">Amount Paid:</span> ₹{amount}</p>
              <p><span className="text-slate-500">Billing Period:</span> {month}</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-cyan-400"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold">Society Service Charge</h3>
              <p className="text-xs text-slate-400">Due for current cycle: {month}</p>
            </div>

            {/* Price Summary */}
            <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl mb-6 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400">Total Monthly Assessment</p>
                <p className="text-xs text-slate-500">Includes 24/7 security, backup, lift, and pool care</p>
              </div>
              <p className="text-2xl font-extrabold text-cyan-400">₹{amount}</p>
            </div>

            {/* Payment Method Selector */}
            <label className="text-xs font-semibold text-slate-300 block mb-2">Select Payment Gateway</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { id: 'Card', icon: CreditCard, label: 'Debit/Credit' },
                { id: 'UPI', icon: QrCode, label: 'UPI / QR' },
                { id: 'Net Banking', icon: Building, label: 'NetBanking' },
                { id: 'Cash', icon: Banknote, label: 'Cash Desk' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id as any)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      isSelected 
                        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' 
                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[11px] font-semibold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method Specific Form Simulated View */}
            <form onSubmit={handlePay} className="space-y-4">
              {method === 'Card' && (
                <div className="space-y-2">
                  <input type="text" placeholder="Card Number (4444 0000 1111 2222)" required className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM/YY" required className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400" />
                    <input type="password" placeholder="CVV" required className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400" />
                  </div>
                </div>
              )}

              {method === 'UPI' && (
                <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700">
                  <QrCode className="w-24 h-24 mx-auto text-white mb-2" />
                  <p className="text-xs text-slate-300">Scan using Google Pay, PhonePe, or Paytm</p>
                  <p className="text-xs text-cyan-400 font-mono mt-1">UPI ID: skyline.society@icici</p>
                </div>
              )}

              {method === 'Net Banking' && (
                <select className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400 text-slate-300">
                  <option>HDFC Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              )}

              {method === 'Cash' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                  <strong>Cash at Counter:</strong> Clicking confirm generates an acknowledgment slip to be submitted with physical cash at the treasurer's counter.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25"
              >
                {loading ? 'Processing Payment...' : `Pay ₹${amount} Now`}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};