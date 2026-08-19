'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  Scissors,
  LayoutDashboard,
  Layers,
  ScissorsLineDashed,
  Package,
  Users,
  UserCheck,
  Calendar,
  Gift,
  Sparkles,
  FileCheck2,
  Settings,
  Crown,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, role, queue, salon } = useSalon();

  const waitingCount = queue.filter(q => q.status === 'waiting').length;

  // Role Scoped Menus
  const superAdminMenu = [
    { id: 'superadmin', label: 'Super Admin Fleet', icon: ShieldCheck },
  ];

  const ownerMenu = [
    {
      title: 'MENU',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'queue', label: 'Services & Queue', icon: ScissorsLineDashed, badge: waitingCount ? `${waitingCount}` : null },
        { id: 'offers', label: 'Samples & Offers', icon: Gift },
      ]
    },
    {
      title: 'CLIENTS & STAFF',
      items: [
        { id: 'crm', label: 'Clients (CRM)', icon: UserCheck },
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'appointments', label: 'Employee schedule', icon: Calendar },
        { id: 'wedding', label: 'Wedding Packages', icon: Sparkles },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'closing', label: 'Daily Closing', icon: FileCheck2 },
        { id: 'subscription', label: 'SaaS Plans', icon: Crown },
        { id: 'onboarding', label: 'Setup Wizard', icon: Layers },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const stylistMenu = [
    {
      title: 'STYLIST WORKSPACE',
      items: [
        { id: 'stylist_dashboard', label: 'My Dashboard', icon: LayoutDashboard },
        { id: 'queue', label: 'My Live Queue', icon: ScissorsLineDashed, badge: waitingCount ? `${waitingCount}` : null },
        { id: 'tasks', label: 'My Daily Tasks', icon: CheckSquare },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-5 min-h-[780px] rounded-l-[32px]">
      
      {/* Top Brand & Navigation */}
      <div className="space-y-6">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-2 px-2 py-1">
          <div className="p-2 bg-slate-900 text-white rounded-xl shadow-md flex items-center justify-center">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wider uppercase text-slate-900 leading-none">
              BARBERSHOP
            </h1>
            <p className="text-[10px] text-purple-600 font-bold tracking-tight mt-0.5 capitalize">
              {role.replace('_', ' ')} View
            </p>
          </div>
        </div>

        {/* Super Admin Navigation */}
        {role === 'super_admin' && (
          <div className="space-y-1">
            <h3 className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
              SUPER ADMIN FLEET
            </h3>
            {superAdminMenu.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-2xl transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Owner Navigation */}
        {role === 'owner' && ownerMenu.map((section, idx) => (
          <div key={idx} className="space-y-1 pt-1">
            <h3 className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
              {section.title}
            </h3>
            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-2xl transition-all ${
                    isActive
                      ? 'bg-[#635BFF] text-white shadow-md shadow-purple-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-white text-purple-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Stylist Navigation */}
        {role === 'stylist' && stylistMenu.map((section, idx) => (
          <div key={idx} className="space-y-1 pt-1">
            <h3 className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
              {section.title}
            </h3>
            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-2xl transition-all ${
                    isActive
                      ? 'bg-[#635BFF] text-white shadow-md shadow-purple-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-white text-purple-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Profile Setup Card Widget (Visible to Salon Owner ONLY) */}
      {role === 'owner' && (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Salon Setup</h4>
              <p className="text-[10px] text-slate-400 font-medium">Owner Setup Wizard</p>
            </div>

            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg className="w-9 h-9 transform -rotate-90">
                <circle cx="18" cy="18" r="14" stroke="#E2E8F0" strokeWidth="3.5" fill="transparent" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="#635BFF"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 14}
                  strokeDashoffset={2 * Math.PI * 14 * (1 - 0.6)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[9px] font-bold text-slate-800">60%</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('onboarding')}
            className="w-full py-2 bg-[#635BFF] hover:bg-[#5249E6] text-white text-xs font-bold rounded-xl shadow-xs transition-all text-center block"
          >
            Setup Wizard
          </button>
        </div>
      )}
    </aside>
  );
};
