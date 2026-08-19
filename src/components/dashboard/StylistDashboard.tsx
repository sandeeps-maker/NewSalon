'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Scissors, Star, Play, CheckCircle2, Clock, DollarSign, CalendarCheck, TrendingUp, Sparkles, User, ShieldCheck, Users } from 'lucide-react';

export const StylistDashboard: React.FC = () => {
  const { employees, queue, updateQueueStatus, activeStylistId, ratings } = useSalon();
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('day');

  // Find active logged-in stylist
  const currentStylist = employees.find(e => e.id === activeStylistId) || employees[0];

  // Assigned active queue tokens for this stylist
  const myAssignedTokens = queue.filter(q =>
    (q.assignedEmployeeId === currentStylist.id || q.preferredEmployeeId === currentStylist.id) &&
    q.status !== 'cancelled'
  );

  const waitingCount = myAssignedTokens.filter(q => q.status === 'waiting').length;
  const inServiceCount = myAssignedTokens.filter(q => q.status === 'in_service').length;

  const commissionEarnedToday = Math.round(currentStylist.revenueGeneratedToday * (currentStylist.commissionPercentage / 100));
  const commissionEarnedMonth = Math.round((currentStylist.revenueGeneratedMonth || 32000) * (currentStylist.commissionPercentage / 100));

  // Reviews for this stylist
  const myReviews = ratings.filter(r => r.employeeId === currentStylist.id);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner (Stylist Emerald / Teal Green Palette) */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-800 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentStylist.photo}
            alt={currentStylist.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/30 shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2 text-teal-100 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span>Stylist Personal Workspace</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Welcome back, {currentStylist.name} ✂️</h1>
            <p className="text-xs text-teal-100 mt-0.5">
              {currentStylist.position} • {currentStylist.specialization}
            </p>
          </div>
        </div>

        {/* Time Period Filter Pills */}
        <div className="flex bg-white/10 p-1 rounded-full border border-white/20 self-start md:self-center">
          {(['day', 'week', 'month'] as const).map(p => (
            <button
              key={p}
              onClick={() => setTimePeriod(p)}
              className={`px-3.5 py-1.5 text-xs font-bold capitalize rounded-full transition-all ${
                timePeriod === p ? 'bg-white text-teal-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stylist Metric Cards Row (Day / Week / Month) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Services Count */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Work Done ({timePeriod})</span>
            <Scissors className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {timePeriod === 'day' ? currentStylist.customersServedToday : timePeriod === 'week' ? (currentStylist.customersServedWeek || 42) : (currentStylist.customersServedMonth || 185)}
            <span className="text-xs text-slate-400 font-normal ml-1">services</span>
          </p>
          <p className="text-[10px] text-teal-600 font-bold">Avg speed: {currentStylist.avgServiceTimeMins} mins</p>
        </div>

        {/* Commission Income Earned */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Commission Earned</span>
            <DollarSign className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-teal-700 mt-1">
            ₹{timePeriod === 'day' ? commissionEarnedToday : commissionEarnedMonth}
          </p>
          <p className="text-[10px] text-slate-400 font-medium">Rate: {currentStylist.commissionPercentage}% of sales</p>
        </div>

        {/* My Rating */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Client Rating</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {currentStylist.rating} ⭐
          </p>
          <p className="text-[10px] text-slate-400 font-medium">{currentStylist.ratingsCount} Total Customer Reviews</p>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Attendance</span>
            <CalendarCheck className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {currentStylist.attendanceDays}<span className="text-xs text-slate-400">/30 Days</span>
          </p>
          <p className="text-[10px] text-teal-700 font-bold">Present & Active</p>
        </div>
      </div>

      {/* My Live Customer Queue Cards (Stylist Green Theme) */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span>My Assigned Customer Queue ({myAssignedTokens.length})</span>
          </h3>

          <span className="text-xs font-bold bg-teal-100 text-teal-900 px-3 py-1 rounded-full border border-teal-200">
            {waitingCount} Waiting • {inServiceCount} In Chair
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myAssignedTokens.length === 0 ? (
            <div className="col-span-full p-8 text-center text-slate-400 text-xs italic">
              No active customer tokens assigned to you right now.
            </div>
          ) : (
            myAssignedTokens.map(token => (
              <div
                key={token.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                  token.status === 'in_service' ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-500/20' :
                  token.status === 'waiting' ? 'bg-amber-50/40 border-amber-200' :
                  'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-extrabold text-sm shadow-md shadow-teal-600/30">
                      #{token.tokenNumber}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{token.customerName}</h4>
                      <p className="text-xs text-teal-800 font-bold">{token.serviceNames.join(', ')}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                    token.status === 'in_service' ? 'bg-teal-700 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {token.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Arrival: {token.arrivalTime}</span>
                  <div className="space-x-2">
                    {token.status === 'waiting' && (
                      <button
                        onClick={() => updateQueueStatus(token.id, 'in_service', currentStylist.id)}
                        className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md shadow-teal-600/30 flex items-center space-x-1 inline-flex"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Chair</span>
                      </button>
                    )}
                    {token.status === 'in_service' && (
                      <button
                        onClick={() => updateQueueStatus(token.id, 'completed', currentStylist.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/30 flex items-center space-x-1 inline-flex"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Complete Service</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* My Client Ratings & Reviews */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
          <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Recent Customer Feedback for {currentStylist.name}</span>
        </h3>

        <div className="space-y-2">
          {myReviews.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No customer reviews collected yet.</p>
          ) : (
            myReviews.map(r => (
              <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{r.customerName} ({r.serviceName})</span>
                  <span className="text-amber-600">{r.stars} ⭐</span>
                </div>
                {r.comment && <p className="text-slate-600 italic text-[11px]">&ldquo;{r.comment}&rdquo;</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
