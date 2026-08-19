'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  X,
  UserCheck,
  Phone,
  Calendar,
  Crown,
  History,
  Star,
  Gift,
  MessageSquare
} from 'lucide-react';

export const CustomerDetailModal: React.FC = () => {
  const { selectedCustomerForDetail, setSelectedCustomerForDetail, setActiveTab } = useSalon();

  if (!selectedCustomerForDetail) return null;
  const customer = selectedCustomerForDetail;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-2xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-extrabold text-slate-900">{customer.name}</h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase">
                  {customer.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center mt-0.5">
                <Phone className="w-3.5 h-3.5 mr-1" /> {customer.phone} • Customer since {customer.customerSince}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCustomerForDetail(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Behavior Stats Bar */}
        <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Visits</span>
            <p className="font-extrabold text-slate-900">{customer.totalVisits}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Spent</span>
            <p className="font-extrabold text-sky-700">₹{customer.totalSpent.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Avg Bill</span>
            <p className="font-extrabold text-slate-900">₹{customer.avgBill}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Rating</span>
            <p className="font-extrabold text-amber-600 flex items-center justify-center">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
              {customer.lastRating || 5.0}
            </p>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-1.5 text-xs bg-sky-50/60 p-3 rounded-xl border border-sky-100">
          <p>Favorite Stylist: <strong className="text-slate-900">{customer.favoriteEmployeeName || 'Raj Kumar'}</strong></p>
          <p>Favorite Service: <strong className="text-slate-900">{customer.favoriteService || 'Classic Haircut'}</strong></p>
          {customer.notes && <p>Notes: <em className="text-slate-700">&ldquo;{customer.notes}&rdquo;</em></p>}
        </div>

        {/* Visit History Timeline */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
            <History className="w-4 h-4 text-sky-600" />
            <span>Visit History Timeline</span>
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {customer.visitHistory.length === 0 ? (
              <p className="text-xs text-slate-400 italic">First visit completed today.</p>
            ) : (
              customer.visitHistory.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{item.services.join(', ')}</span>
                    <span className="text-sky-700">₹{item.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Stylist: {item.employeeName}</span>
                    <span>Date: {item.date}</span>
                  </div>
                  {item.rating && (
                    <div className="text-[11px] text-amber-700 font-semibold flex items-center space-x-1">
                      <span>Rating given: {item.rating} ⭐</span>
                      {item.feedback && <span className="text-slate-600 font-normal italic">&ldquo;{item.feedback}&rdquo;</span>}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setSelectedCustomerForDetail(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedCustomerForDetail(null);
                setActiveTab('whatsapp');
              }}
              className="px-3.5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send WhatsApp</span>
            </button>
            <button
              onClick={() => {
                setSelectedCustomerForDetail(null);
                setActiveTab('offers');
              }}
              className="px-3.5 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Send Offer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
