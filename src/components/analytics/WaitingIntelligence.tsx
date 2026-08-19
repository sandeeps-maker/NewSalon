'use client';

import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Clock, AlertTriangle, Users, Flame, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const WaitingIntelligence: React.FC = () => {
  const { queue, employees } = useSalon();

  const peakHoursData = [
    { time: '09 AM', avgWait: 5, customers: 4 },
    { time: '11 AM', avgWait: 8, customers: 8 },
    { time: '01 PM', avgWait: 10, customers: 6 },
    { time: '04 PM', avgWait: 14, customers: 10 },
    { time: '06 PM', avgWait: 22, customers: 16 }, // PEAK!
    { time: '08 PM', avgWait: 18, customers: 12 },
  ];

  const waitingReasons = [
    { reason: 'Preferred Employee Busy', percentage: 42, icon: Users, color: 'bg-blue-500' },
    { reason: 'Service Time Overrun', percentage: 28, icon: Clock, color: 'bg-amber-500' },
    { reason: 'Peak Hour Volume Surge', percentage: 18, icon: Flame, color: 'bg-rose-500' },
    { reason: 'Appointment Overlap', percentage: 12, icon: AlertTriangle, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div className="flex items-center space-x-2">
          <Clock className="w-6 h-6 text-amber-500" />
          <h1 className="text-xl font-extrabold text-slate-900">Customer Waiting Intelligence</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Deep diagnostic insights answering <strong>&ldquo;Why are customers waiting?&rdquo;</strong> to optimize salon staffing & slot scheduling.
        </p>
      </div>

      {/* Top Insights Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 soft-shadow space-y-2">
          <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-xs">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Peak Waiting Window</span>
          </div>
          <p className="text-sm font-extrabold text-slate-900">
            Customers wait an average of <span className="text-amber-700">18–22 minutes</span> for Raj between 06:00 PM and 08:00 PM.
          </p>
          <p className="text-xs text-slate-600">Recommendation: Add 1 floating barber on Saturday evenings.</p>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-5 soft-shadow space-y-2">
          <div className="flex items-center space-x-2 text-sky-900 font-extrabold text-xs">
            <TrendingUp className="w-4 h-4 text-sky-600" />
            <span>Highest Wait Service</span>
          </div>
          <p className="text-sm font-extrabold text-slate-900">
            <span className="text-sky-700">Classic Haircut + Beard Combo</span> has the highest queue waiting time (avg 19 mins).
          </p>
          <p className="text-xs text-slate-600">Consider splitting beard trimming to speed stylists during rush hour.</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 soft-shadow space-y-2">
          <div className="flex items-center space-x-2 text-purple-900 font-extrabold text-xs">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Busiest Period</span>
          </div>
          <p className="text-sm font-extrabold text-slate-900">
            <span className="text-purple-700">Saturday Evening (05 PM - 09 PM)</span> generates 32% of weekly salon customer traffic.
          </p>
          <p className="text-xs text-slate-600">Ensure zero staff leave approvals during weekend peak slots.</p>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Peak Hours Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Average Waiting Time by Hour (Minutes)</h3>
            <p className="text-xs text-slate-500">Hourly breakdown of customer queue delay</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="avgWait" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Avg Wait (Mins)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Why Are Customers Waiting? Pie/Progress breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Root Cause Analysis</h3>
            <p className="text-xs text-slate-500">Percentage distribution of waiting causes</p>
          </div>

          <div className="space-y-4 pt-2">
            {waitingReasons.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.reason} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span>{item.reason}</span>
                    </span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
