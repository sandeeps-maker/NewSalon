'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Crown, Check, Sparkles, ShieldCheck } from 'lucide-react';

export const SubscriptionPlans: React.FC = () => {
  const { salon, role } = useSalon();

  const plans = [
    {
      id: 'Starter',
      name: 'Starter',
      price: '₹299',
      period: '/month',
      description: 'Essential daily queue & customer management for small local shops',
      features: [
        'Basic Customer CRM',
        'Live Daily Queue Token System',
        'Up to 3 Stylist Profiles',
        'Daily Revenue Summary',
        'Customer Rating Collection'
      ],
      current: salon.id === 'salon-103'
    },
    {
      id: 'Professional',
      name: 'Professional',
      price: '₹599',
      period: '/month',
      description: 'Complete operational suite for multi-employee busy salons',
      features: [
        'Everything in Starter',
        'Appointment Booking Calendar',
        'Smart Offer System & WhatsApp Center',
        'Product Inventory & Low Stock Alerts',
        'Employee Balanced Scorecard',
        'Wedding & Group Event Packages'
      ],
      current: salon.id === 'salon-101' || salon.id === 'salon-104'
    },
    {
      id: 'Premium',
      name: 'Premium',
      price: '₹999',
      period: '/month',
      description: 'Advanced AI insights & multi-branch management',
      features: [
        'Everything in Professional',
        'AI Salon Business Insights',
        'Wedding & Special Event Packages',
        'Advanced Customer Segmentation',
        'Multi-Branch Salon Management',
        'Priority Phone Support'
      ],
      current: salon.id === 'salon-102'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Crown className="w-6 h-6 text-purple-600" />
          <h1 className="text-xl font-extrabold text-slate-900">Salon SaaS Subscription Plans</h1>
        </div>
        <p className="text-xs text-slate-500">
          All 3 plans configured for salon owners. Super Admin manages active plans & billing renewals.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`rounded-3xl p-6 soft-shadow flex flex-col justify-between space-y-6 relative transition-all ${
              plan.current
                ? 'bg-slate-900 text-white ring-4 ring-purple-500/30 border border-slate-800'
                : 'bg-white text-slate-900 border border-slate-200/80'
            }`}
          >
            {plan.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Current Active Plan
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-lg">{plan.name}</h3>
                <p className={`text-xs mt-1 ${plan.current ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline">
                <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                <span className={`text-xs ml-1 ${plan.current ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-2.5 text-xs pt-2">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center space-x-2">
                    <Check className={`w-4 h-4 ${plan.current ? 'text-purple-400' : 'text-purple-600'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                plan.current
                  ? 'bg-[#635BFF] text-white shadow-purple-500/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {plan.current ? 'Active Subscription' : 'Request Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
