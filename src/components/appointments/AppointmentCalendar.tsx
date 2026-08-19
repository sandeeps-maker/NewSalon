'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Calendar, Plus, Clock, User, CheckCircle2, Phone, Play } from 'lucide-react';
import { Appointment } from '../../types';

export const AppointmentCalendar: React.FC = () => {
  const { appointments, addAppointment, checkInAppointment, services, employees } = useSalon();
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || '');
  const [date, setDate] = useState('2026-08-18');
  const [time, setTime] = useState('03:00 PM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    const srv = services.find(s => s.id === selectedServiceId);
    const emp = employees.find(e => e.id === employeeId);

    addAppointment({
      customerId: `cust-${Date.now()}`,
      customerName,
      customerPhone,
      serviceIds: [selectedServiceId],
      serviceNames: [srv?.name || 'Haircut'],
      employeeId: emp?.id || 'emp-1',
      employeeName: emp?.name || 'Raj Kumar',
      date,
      time,
      durationMins: srv?.durationMins || 30,
      status: 'confirmed',
      totalPrice: srv?.price || 300
    });
    setIsModalOpen(false);
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-extrabold text-slate-900">Appointment Calendar & Booking</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage advance customer appointments & 1-click check-in to live queue
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['day', 'week', 'month'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs font-bold capitalize rounded-lg transition-all ${
                  viewMode === mode ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Appointments List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map(apt => (
          <div
            key={apt.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{apt.customerName}</h3>
                  <p className="text-xs text-slate-500 flex items-center mt-0.5">
                    <Phone className="w-3 h-3 mr-1 text-slate-400" /> {apt.customerPhone}
                  </p>
                </div>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                  {apt.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-3 text-xs space-y-1">
                <p>Service: <strong className="text-slate-900">{apt.serviceNames.join(', ')}</strong> (₹{apt.totalPrice})</p>
                <p>Stylist: <strong className="text-slate-900">{apt.employeeName}</strong></p>
                <p className="flex items-center text-purple-700 font-bold mt-1">
                  <Clock className="w-3.5 h-3.5 mr-1" /> Slot: {apt.date} @ {apt.time} ({apt.durationMins} mins)
                </p>
              </div>

              {apt.notes && (
                <p className="text-xs text-slate-500 italic mt-2">&ldquo;{apt.notes}&rdquo;</p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Total: ₹{apt.totalPrice}</span>

              {apt.status === 'confirmed' && (
                <button
                  onClick={() => checkInAppointment(apt.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs flex items-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Check-In to Live Queue</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Book Customer Appointment</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Service</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.price})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Stylist</label>
                  <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    {employees.map(e => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 04:30 PM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
