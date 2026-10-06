import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, X, Zap } from 'lucide-react';
import { PAYMENTS_LIVE } from '../config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => void;
}

export const PricingModal: React.FC<Props> = ({ isOpen, onClose, onUpgradeSuccess }) => {
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(true);
      setTimeout(() => {
        onUpgradeSuccess();
        onClose();
        setSuccessMessage(false);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Fresher Special Deal
          </div>
          <h3 className="text-xl font-bold">Upgrade to FreshResume Pro</h3>
          <p className="text-blue-100 text-xs mt-1">
            Get 100% clean, watermark-free resumes ready for campus drives & interviews.
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            {PAYMENTS_LIVE ? (
              <>
                <span className="text-3xl font-extrabold">₹49</span>
                <span className="text-blue-200 line-through text-sm">₹299</span>
                <span className="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                  Save 84%
                </span>
                <span className="text-xs text-blue-200">• One-time payment</span>
              </>
            ) : (
              <>
                <span className="text-3xl font-extrabold">Free</span>
                <span className="text-blue-200 line-through text-sm">₹49</span>
                <span className="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                  Launch offer
                </span>
                <span className="text-xs text-blue-200">• Paid plan starts soon</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {successMessage ? (
            <div className="text-center py-6 space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-base font-bold text-slate-800">{PAYMENTS_LIVE ? 'Payment Successful!' : 'Pro Unlocked!'}</h4>
              <p className="text-xs text-slate-500">
                Watermark removed & all templates unlocked for your resume.
              </p>
            </div>
          ) : (
            <>
              {/* Features list */}
              <div className="space-y-2 text-xs text-slate-700 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Zero Watermark</strong> on all PDF downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>All 3 ATS-Friendly Templates</strong> unlocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>High-resolution vector PDF suitable for TCS, Infosys, Startups</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Unlimited edits & downloads anytime</span>
                </div>
              </div>

              {/* Payment selector */}
              <form onSubmit={handleSimulatePayment} className="space-y-3">
                {PAYMENTS_LIVE && (
                  <>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('upi')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      selectedPayment === 'upi'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>⚡ UPI / GPay / PhonePe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('card')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      selectedPayment === 'card'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>💳 Debit / Credit Card</span>
                  </button>
                </div>

                {selectedPayment === 'upi' ? (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Enter UPI ID (or click Pay to simulate instant test unlock)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Card Number (Simulated test mode)
                    </label>
                    <input
                      type="text"
                      placeholder="4111 •••• •••• 1111"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                  </>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {PAYMENTS_LIVE ? 'Processing ₹49...' : 'Unlocking...'}
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                      {PAYMENTS_LIVE ? 'Pay ₹49 & Unlock Pro Resume' : 'Unlock Pro Free (Launch Offer)'}
                    </>
                  )}
                </button>

                {PAYMENTS_LIVE && (
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Safe & Instant 256-bit Secure Checkout</span>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
