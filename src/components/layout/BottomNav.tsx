'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { LayoutDashboard, Users2, UserCheck, CalendarCheck, MoreHorizontal } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, queue } = useSalon();
  const waitingCount = queue.filter(q => q.status === 'waiting').length;

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'queue', label: 'Queue', icon: Users2, badge: waitingCount || null },
    { id: 'crm', label: 'Customers', icon: UserCheck },
    { id: 'appointments', label: 'Calendar', icon: CalendarCheck },
    { id: 'employees', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
