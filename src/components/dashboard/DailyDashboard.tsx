'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  Scissors,
  Users,
  Calendar,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Edit2,
  Trash2,
  Play,
  CheckCircle2,
  User,
  Star,
  KeyRound,
  X
} from 'lucide-react';
import { Employee } from '../../types';

export const DailyDashboard: React.FC = () => {
  const { queue, updateQueueStatus, setActiveTab, employees, customers, services, appointments, role } = useSalon();
  const [bookingFilter, setBookingFilter] = useState<'upcoming' | 'all' | 'canceled'>('upcoming');
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const filteredBookings = queue.filter(q => {
    if (bookingFilter === 'upcoming') return q.status === 'waiting' || q.status === 'in_service';
    if (bookingFilter === 'canceled') return q.status === 'cancelled';
    return true; // all
  });

  const totalServicesCount = queue.length > 0 ? queue.length : services.length;
  const totalClientsCount = customers.length;
  const totalEmployeesCount = employees.length;
  const totalAppointmentsCount = appointments.length;

  const topServices = [
    {
      id: 'ts-1',
      title: 'Hair & style',
      price: '$75',
      duration: '1 hour',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: 'ts-2',
      title: 'Bright tuning',
      price: '$90',
      duration: '1 hour',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: 'ts-3',
      title: 'Beard triming',
      price: '$75',
      duration: '1 hour',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: 'ts-4',
      title: 'White facial',
      price: '$75',
      duration: '1 hour',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      
      {/* 4 Interactive & Clickable Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Services (Clickable -> Services Queue) */}
        <button
          type="button"
          onClick={() => setActiveTab('queue')}
          className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between space-y-4 text-left transition-all hover:shadow-md hover:border-purple-200 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-purple-600 transition-colors">Total Services</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalServicesCount}</p>
            </div>

            {/* Circular Ring Top-Right */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle cx="16" cy="16" r="12" stroke="#EDE9FE" strokeWidth="3" fill="transparent" />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#635BFF"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 12}
                  strokeDashoffset={2 * Math.PI * 12 * (1 - 0.7)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-400">than last month</span>
              <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.2 rounded-md">↑ +2%</span>
            </div>

            {/* Horizontal Dual-Tone Purple Bar */}
            <div className="w-full h-2.5 bg-purple-100 rounded-full overflow-hidden flex">
              <div className="w-[60%] h-full bg-[#635BFF] rounded-full" />
            </div>
          </div>
        </button>

        {/* Card 2: Total Clients (Clickable -> Customer CRM) */}
        <button
          type="button"
          onClick={() => setActiveTab('crm')}
          className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between space-y-4 text-left transition-all hover:shadow-md hover:border-blue-200 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Total Clients</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalClientsCount}</p>
            </div>

            {/* Circular Ring Top-Right */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle cx="16" cy="16" r="12" stroke="#DBEAFE" strokeWidth="3" fill="transparent" />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#2563EB"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 12}
                  strokeDashoffset={2 * Math.PI * 12 * (1 - 0.55)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-400">than last month</span>
              <span className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded-md">↑ +1%</span>
            </div>

            {/* Horizontal Dual-Tone Blue Bar */}
            <div className="w-full h-2.5 bg-blue-100 rounded-full overflow-hidden flex">
              <div className="w-[45%] h-full bg-blue-600 rounded-full" />
            </div>
          </div>
        </button>

        {/* Card 3: Total Employee (Clickable -> Employee Breakdown Modal / Tab) */}
        <button
          type="button"
          onClick={() => {
            if (role === 'owner') setIsEmployeeModalOpen(true);
            else setActiveTab('employees');
          }}
          className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between space-y-4 text-left transition-all hover:shadow-md hover:border-emerald-200 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Total employee</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalEmployeesCount}</p>
            </div>

            {/* Circular Ring Top-Right */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle cx="16" cy="16" r="12" stroke="#D1FAE5" strokeWidth="3" fill="transparent" />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#10B981"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 12}
                  strokeDashoffset={2 * Math.PI * 12 * (1 - 0.8)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-400 font-medium">Click to view staff</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">↑ +2%</span>
            </div>

            {/* Horizontal Dual-Tone Green Bar */}
            <div className="w-full h-2.5 bg-emerald-100 rounded-full overflow-hidden flex">
              <div className="w-[70%] h-full bg-emerald-500 rounded-full" />
            </div>
          </div>
        </button>

        {/* Card 4: Appointment (Clickable -> Employee Schedule / Appointments) */}
        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between space-y-4 text-left transition-all hover:shadow-md hover:border-orange-200 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">Appointment</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalAppointmentsCount}</p>
            </div>

            {/* Circular Ring Top-Right */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle cx="16" cy="16" r="12" stroke="#FFEDD5" strokeWidth="3" fill="transparent" />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#F97316"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 12}
                  strokeDashoffset={2 * Math.PI * 12 * (1 - 0.3)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-400">than last month</span>
              <span className="font-bold text-orange-600 bg-orange-50 px-1.5 py-0.2 rounded-md">↑ 0%</span>
            </div>

            {/* Horizontal Dual-Tone Coral Bar */}
            <div className="w-full h-2.5 bg-orange-100 rounded-full overflow-hidden flex">
              <div className="w-[35%] h-full bg-gradient-to-r from-orange-400 to-rose-500 rounded-full" />
            </div>
          </div>
        </button>
      </div>

      {/* Middle Booking Queue Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tab Filter Pills */}
          <div className="flex bg-slate-100/70 p-1 rounded-full border border-slate-200/60 self-start">
            <button
              onClick={() => setBookingFilter('upcoming')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                bookingFilter === 'upcoming'
                  ? 'bg-[#635BFF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Up coming booking
            </button>
            <button
              onClick={() => setBookingFilter('all')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                bookingFilter === 'all'
                  ? 'bg-[#635BFF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All booking
            </button>
            <button
              onClick={() => setBookingFilter('canceled')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                bookingFilter === 'canceled'
                  ? 'bg-[#635BFF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Canceled booking
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <button className="px-3 py-1.5 bg-slate-100/70 hover:bg-slate-200/70 rounded-full font-semibold flex items-center space-x-1.5 text-slate-700 transition-all">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <div className="flex items-center space-x-1 text-slate-400 font-medium">
              <span>Page:</span>
              <button className="p-1 hover:text-slate-800"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-slate-800 font-semibold">1 / 2</span>
              <button className="p-1 hover:text-slate-800"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-400">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Start time</th>
                <th className="py-3 px-4">Booked services</th>
                <th className="py-3 px-4">End time expected</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                    No bookings found in this view filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      12/02/2024 {item.arrivalTime}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.serviceNames[0] || 'Hair cut'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      12/02/2024 10:45am
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {item.tokenNumber} ({item.customerName.split(' ')[0]})
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {item.assignedEmployeeName || item.preferredEmployeeName || 'Santino Tesoro'}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {item.status === 'waiting' && (
                        <button
                          onClick={() => updateQueueStatus(item.id, 'in_service')}
                          className="p-1 text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                          title="Start Service"
                        >
                          <Play className="w-3.5 h-3.5 fill-sky-600" />
                        </button>
                      )}
                      {item.status === 'in_service' && (
                        <button
                          onClick={() => updateQueueStatus(item.id, 'completed')}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Complete Service"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </button>
                      )}
                      <button className="p-1 text-slate-400 hover:text-slate-700">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateQueueStatus(item.id, 'cancelled')}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Cancel Booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: Top Service Visual Cards Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base">Top service</h3>
          <button
            onClick={() => setActiveTab('queue')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
          >
            <span>View all</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topServices.map(srv => (
            <div key={srv.id} className="space-y-2.5">
              
              {/* Photo Banner with Stylist Avatar Overlay */}
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-xs">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Stylist Avatar Overlay on Bottom-Right */}
                <div className="absolute bottom-2 right-2 ring-2 ring-purple-500 rounded-full">
                  <img
                    src={srv.avatar}
                    alt="Stylist"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{srv.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span>Price: <strong className="text-purple-600">{srv.price}</strong></span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {srv.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Statistics Quick View Modal for Salon Owners */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">Total Employees ({employees.length})</h3>
              </div>
              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {employees.map(emp => (
                <div key={emp.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={emp.photo} alt={emp.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{emp.name}</h4>
                      <p className="text-[11px] text-slate-500">{emp.position} • {emp.specialization}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="font-extrabold text-amber-600 flex items-center justify-end">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {emp.rating} ⭐
                    </span>
                    <span className="text-[10px] text-purple-700 font-bold block">
                      Commission: {emp.commissionPercentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsEmployeeModalOpen(false);
                  setActiveTab('employees');
                }}
                className="text-xs font-bold text-purple-600 hover:underline"
              >
                Open Full Team Management →
              </button>

              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
