'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  Search,
  MessageSquare,
  PlusCircle,
  RotateCcw,
  Lock,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    salon,
    role,
    logout,
    resetToDemoData,
    setIsAddCustomerOpen,
    activeTab,
    setIsAuthModalOpen,
    employees,
    activeStylistId
  } = useSalon();

  const todayStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const pageTitle = activeTab === 'superadmin' ? 'Super Admin Fleet Control' :
    activeTab === 'stylist_dashboard' ? 'My Stylist Dashboard' :
    activeTab === 'dashboard' ? 'Executive Dashboard' :
    activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  const currentStylist = employees.find(e => e.id === activeStylistId) || employees[0];

  return (
    <header className="px-6 py-4 border-b border-slate-100 bg-white rounded-tr-[32px] flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Left: Page Title & Date Subtitle */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{pageTitle}</h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{todayStr} • {salon.name}</p>
      </div>

      {/* Center & Right Actions: Search Bar, Notifications & Admin Avatar */}
      <div className="flex flex-wrap items-center space-x-3 sm:space-x-4">
        
        {/* Search Bar Input */}
        <div className="relative w-48 sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 bg-slate-100/70 border border-transparent rounded-full text-xs font-medium text-slate-900 focus:bg-white focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all placeholder-slate-400"
          />
        </div>

        {/* Demo Reset */}
        <button
          onClick={resetToDemoData}
          className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100/70 hover:bg-slate-200/70 rounded-full text-xs font-bold transition-all flex items-center space-x-1"
          title="Reset Demo Data & Relock"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Add Customer Button (Visible to Owner & Stylist) */}
        {role !== 'super_admin' && (
          <button
            onClick={() => setIsAddCustomerOpen(true)}
            className="px-3.5 py-1.5 bg-[#635BFF] hover:bg-[#5249E6] text-white rounded-full text-xs font-bold shadow-xs transition-all flex items-center space-x-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">+ Customer</span>
          </button>
        )}

        {/* Lock Session Button */}
        <button
          onClick={logout}
          className="p-2 text-slate-500 hover:text-rose-600 bg-slate-100/70 hover:bg-rose-50 rounded-full transition-all"
          title="Lock & Change Role Passkey"
        >
          <Lock className="w-4 h-4" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
          <img
            src={role === 'stylist' ? currentStylist.photo : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"}
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-100"
          />
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-900 leading-none">
              {role === 'super_admin' ? 'Super Admin' : role === 'owner' ? 'Owner / Admin' : currentStylist.name}
            </span>
            <span className="text-[10px] text-purple-600 font-bold capitalize mt-0.5 block">
              {role.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Role Switcher Pill (Super Admin | Owner | Stylist) */}
        <div className="relative inline-flex bg-slate-100 p-0.5 rounded-full border border-slate-200">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full transition-all ${
              role === 'super_admin' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Super
          </button>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full transition-all ${
              role === 'owner' ? 'bg-[#635BFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Owner
          </button>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full transition-all ${
              role === 'stylist' ? 'bg-[#635BFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stylist
          </button>
        </div>
      </div>
    </header>
  );
};
