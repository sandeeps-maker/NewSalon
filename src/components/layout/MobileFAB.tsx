'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { UserPlus } from 'lucide-react';

export const MobileFAB: React.FC = () => {
  const { setIsAddCustomerOpen } = useSalon();

  return (
    <button
      onClick={() => setIsAddCustomerOpen(true)}
      className="md:hidden fixed bottom-16 right-4 z-40 bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-3.5 rounded-full shadow-xl shadow-sky-600/40 flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
      aria-label="Add Customer"
    >
      <UserPlus className="w-5 h-5" />
      <span className="text-xs font-bold pr-1">+ Customer</span>
    </button>
  );
};
