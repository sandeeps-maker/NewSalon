'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Sparkles, Heart, Plus, Calendar, Users, Phone, Check, Crown } from 'lucide-react';
import { WeddingBooking } from '../../types';

export const WeddingBookings: React.FC = () => {
  const { weddingBookings, addWeddingBooking, employees } = useSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventType, setEventType] = useState<WeddingBooking['eventType']>('bride');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [packageTitle, setPackageTitle] = useState('Royal Bridal Deluxe Package');
  const [groupSize, setGroupSize] = useState(4);
  const [totalBudget, setTotalBudget] = useState(18000);
  const [advancePaid, setAdvancePaid] = useState(5000);
  const [assignedEmployeeId, setAssignedEmployeeId] = useState(employees[2]?.id || '');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    const emp = employees.find(e => e.id === assignedEmployeeId);
    addWeddingBooking({
      customerName,
      customerPhone,
      eventType,
      eventDate,
      packageTitle,
      servicesRequired: ['Bridal / HD Party Makeup', 'Gold Glow Facial', 'Hair Spa', 'Spa Pedicure'],
      groupSize,
      assignedEmployeeId: emp?.id,
      assignedEmployeeName: emp?.name,
      totalBudget,
      advancePaid,
      status: 'confirmed',
      notes
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
            <Sparkles className="w-6 h-6 text-pink-600" />
            <h1 className="text-xl font-extrabold text-slate-900">Special Treatment & Wedding Bookings</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dedicated Groom, Bride, Couple & Group event packages with trial date tracking & advance payments
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-md shadow-pink-600/30 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Book Wedding Package</span>
        </button>
      </div>

      {/* Preset Packages Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Groom Package Preset */}
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold bg-blue-500 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Men&apos;s Special
            </span>
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-lg font-extrabold">Royal Groom Styling Package</h3>
          <p className="text-xs text-slate-300">Haircut • Beard Architecture • Gold Facial • Hair Spa • Cleanup • Head Massage</p>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
            <span className="font-extrabold text-amber-400 text-sm">₹4,500 <span className="text-[10px] text-slate-400 font-normal">/ person</span></span>
            <span className="text-slate-400 font-medium">Includes 1 Trial Session</span>
          </div>
        </div>

        {/* Bride Package Preset */}
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 text-white rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold bg-pink-500 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Women&apos;s Special
            </span>
            <Sparkles className="w-5 h-5 text-pink-300" />
          </div>
          <h3 className="text-lg font-extrabold">Luxury Bridal Makeup & Spa Package</h3>
          <p className="text-xs text-slate-300">HD Bridal Makeup • Gold Facial • Advanced Hair Styling • Manicure & Pedicure • Threading</p>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
            <span className="font-extrabold text-pink-300 text-sm">₹12,500 <span className="text-[10px] text-slate-400 font-normal">/ person</span></span>
            <span className="text-slate-400 font-medium">Includes Free Makeup Trial</span>
          </div>
        </div>
      </div>

      {/* Active Wedding Bookings List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Confirmed Wedding & Event Bookings</h3>

        <div className="space-y-3">
          {weddingBookings.map(booking => (
            <div
              key={booking.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-extrabold text-slate-900 text-base">{booking.customerName}</h4>
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {booking.eventType}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-semibold">{booking.packageTitle}</p>
                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                  <span>Event Date: <strong>{booking.eventDate}</strong></span>
                  <span>•</span>
                  <span>Group Size: <strong>{booking.groupSize} People</strong></span>
                  <span>•</span>
                  <span>Stylist: <strong>{booking.assignedEmployeeName || 'Neha Sharma'}</strong></span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-extrabold text-slate-900">Total: ₹{booking.totalBudget.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 font-bold">Advance Paid: ₹{booking.advancePaid.toLocaleString()}</p>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase mt-1 inline-block">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Wedding Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-pink-600" />
              <span>Book Wedding / Event Package</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer / Group Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth & Meera Wedding"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    <option value="groom">Groom Party</option>
                    <option value="bride">Bride Party</option>
                    <option value="couple">Couple Package</option>
                    <option value="group">Family / Group</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Group Size</label>
                  <input
                    type="number"
                    value={groupSize}
                    onChange={(e) => setGroupSize(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Package Price (₹)</label>
                  <input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Advance Deposit (₹)</label>
                  <input
                    type="number"
                    value={advancePaid}
                    onChange={(e) => setAdvancePaid(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Lead Stylist</label>
                <select
                  value={assignedEmployeeId}
                  onChange={(e) => setAssignedEmployeeId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.position})</option>
                  ))}
                </select>
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
                  className="px-5 py-2 bg-pink-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Confirm Booking 🎉
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
