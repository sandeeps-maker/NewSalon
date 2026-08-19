'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Crown, Sparkles, Lightbulb, TrendingUp, Users, ArrowRight } from 'lucide-react';

export const SalonInsights: React.FC = () => {
  const { insights, setActiveTab } = useSalon();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div className="flex items-center space-x-2">
          <Crown className="w-6 h-6 text-purple-600 animate-bounce" />
          <h1 className="text-xl font-extrabold text-slate-900">AI Salon Insights & Recommendations</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Data-driven operational highlights generated automatically from daily appointments, queue times & customer spending
        </p>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  item.impactLevel === 'high' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  item.impactLevel === 'medium' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  'bg-sky-100 text-sky-800 border border-sky-200'
                }`}>
                  {item.impactLevel} Impact
                </span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>

              <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{item.title}</span>
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                💡 {item.message}
              </p>
            </div>

            {item.actionTab && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setActiveTab(item.actionTab!)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center space-x-1"
                >
                  <span>{item.actionText || 'Take Action'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
