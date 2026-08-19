'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  FileCheck2,
  TrendingUp,
  CreditCard,
  QrCode,
  Banknote,
  Users,
  Star,
  Package,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DailyClosingReport: React.FC = () => {
  const { closingSummary, employees, products, closeSalonDay } = useSalon();

  const handleCloseDayClick = () => {
    closeSalonDay();
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const lowStockCount = products.filter(p => p.status === 'low_stock' || p.status === 'out_of_stock').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">Daily Closing & Sales Report</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            End-of-day financial reconciliation, cash/UPI audit & staff productivity summary
          </p>
        </div>

        <button
          onClick={handleCloseDayClick}
          disabled={closingSummary.isClosed}
          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-center ${
            closingSummary.isClosed
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
          }`}
        >
          {closingSummary.isClosed ? <Lock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{closingSummary.isClosed ? 'Day Closed 🎉' : 'Close Day & Lock Summary'}</span>
        </button>
      </div>

      {/* Revenue Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-widest">
              Today&apos;s Total Gross Business
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              ₹{closingSummary.totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-md">
              <span className="text-slate-400 text-[10px] block">Services</span>
              <span className="font-extrabold text-sm text-emerald-400">₹{closingSummary.serviceRevenue.toLocaleString()}</span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-md">
              <span className="text-slate-400 text-[10px] block">Products</span>
              <span className="font-extrabold text-sm text-sky-400">₹{closingSummary.productRevenue.toLocaleString()}</span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-md">
              <span className="text-slate-400 text-[10px] block">Discounts</span>
              <span className="font-extrabold text-sm text-rose-400">-₹{closingSummary.discountsGiven}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 soft-shadow flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold">Cash Collection</span>
              <p className="text-lg font-extrabold text-slate-900 mt-0.5">₹{closingSummary.paymentCash.toLocaleString()}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {Math.round((closingSummary.paymentCash / (closingSummary.totalRevenue || 1)) * 100)}%
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 soft-shadow flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold">UPI / QR Code</span>
              <p className="text-lg font-extrabold text-slate-900 mt-0.5">₹{closingSummary.paymentUPI.toLocaleString()}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {Math.round((closingSummary.paymentUPI / (closingSummary.totalRevenue || 1)) * 100)}%
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 soft-shadow flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold">Card Payments</span>
              <p className="text-lg font-extrabold text-slate-900 mt-0.5">₹{closingSummary.paymentCard.toLocaleString()}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {Math.round((closingSummary.paymentCard / (closingSummary.totalRevenue || 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Breakdown Grid: Staff Summary & Inventory Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Employee Performance Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Stylist Daily Breakdown</h3>

          <div className="space-y-3">
            {employees.map(emp => (
              <div key={emp.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs border border-slate-100">
                <div className="flex items-center space-x-3">
                  <img src={emp.photo} alt={emp.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-extrabold text-slate-900">{emp.name}</p>
                    <p className="text-slate-500">{emp.customersServedToday} Customers served • {emp.avgServiceTimeMins} min speed</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-extrabold text-sky-700 text-sm">₹{emp.revenueGeneratedToday.toLocaleString()}</p>
                  <p className="text-amber-600 font-bold">{emp.rating} ⭐</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer & Inventory Checklist */}
        <div className="space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Customer & Service Metrics</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total Customers</span>
                <p className="text-lg font-extrabold text-slate-900">{closingSummary.totalCustomers}</p>
                <p className="text-[10px] text-slate-500">{closingSummary.newCustomers} New • {closingSummary.returningCustomers} Returning</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Average Bill Amount</span>
                <p className="text-lg font-extrabold text-slate-900">₹{closingSummary.avgBillAmount}</p>
                <p className="text-[10px] text-slate-500">Per customer visit</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Closing Inventory Warnings</h3>
            <p className="text-xs text-slate-600">
              {lowStockCount > 0 ? (
                <span className="text-rose-600 font-bold">⚠️ {lowStockCount} products are low in stock. Please place reorder before tomorrow morning.</span>
              ) : (
                <span className="text-emerald-600 font-bold">🟢 All products are sufficiently stocked.</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
