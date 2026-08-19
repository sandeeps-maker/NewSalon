'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  UserCheck,
  Crown,
  Sparkles,
  Search,
  Phone,
  Calendar,
  Gift,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  History
} from 'lucide-react';
import { Customer, CustomerCategory } from '../../types';
import { CustomerDetailModal } from './CustomerDetailModal';

export const CustomerCRM: React.FC = () => {
  const { customers, setSelectedCustomerForDetail, setActiveTab } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = {
    all: customers.length,
    VIP: customers.filter(c => c.category === 'VIP').length,
    Regular: customers.filter(c => c.category === 'Regular').length,
    New: customers.filter(c => c.category === 'New').length,
    Lost: customers.filter(c => c.category === 'Lost').length,
    Potential: customers.filter(c => c.category === 'Potential').length,
  };

  const filteredCustomers = customers.filter(c => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-sky-600" />
            <h1 className="text-xl font-extrabold text-slate-900">Customer CRM & Retention</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated customer segmentation, spending behavior & repeat engagement
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-sky-600"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'VIP', 'Regular', 'New', 'Lost', 'Potential'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'VIP' && <Crown className="w-3.5 h-3.5 text-amber-400" />}
            {cat === 'New' && <Sparkles className="w-3.5 h-3.5 text-sky-400" />}
            <span className="capitalize">{cat === 'all' ? 'All Customers' : cat}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {categoryCounts[cat as keyof typeof categoryCounts]}
            </span>
          </button>
        ))}
      </div>

      {/* Customer Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(customer => (
          <div
            key={customer.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header: Name & Category Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{customer.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center mt-0.5">
                    <Phone className="w-3 h-3 mr-1 text-slate-400" /> {customer.phone}
                  </p>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 ${
                  customer.category === 'VIP' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  customer.category === 'Regular' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                  customer.category === 'New' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                  customer.category === 'Lost' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  'bg-teal-100 text-teal-800'
                }`}>
                  {customer.category === 'VIP' && <Crown className="w-3 h-3 mr-1 fill-amber-500" />}
                  <span>{customer.category}</span>
                </span>
              </div>

              {/* Behavior Metrics Box */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center text-xs mt-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Visits</span>
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
              </div>

              {/* Details List */}
              <div className="text-xs space-y-1 text-slate-600 mt-3">
                <p>Last Visit: <strong className="text-slate-900">{customer.lastVisitDate}</strong></p>
                {customer.favoriteEmployeeName && (
                  <p>Favorite Stylist: <strong className="text-slate-900">{customer.favoriteEmployeeName}</strong></p>
                )}
                {customer.favoriteService && (
                  <p>Favorite Service: <strong className="text-slate-900">{customer.favoriteService}</strong></p>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCustomerForDetail(customer)}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center space-x-1"
              >
                <History className="w-3.5 h-3.5" />
                <span>History</span>
              </button>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl transition-all"
                  title="Send WhatsApp Thank You / Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('offers')}
                  className="p-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl transition-all"
                  title="Send Special Offer"
                >
                  <Gift className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="p-2 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl transition-all"
                  title="Book Next Appointment"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Detail Drawer Modal */}
      <CustomerDetailModal />
    </div>
  );
};
