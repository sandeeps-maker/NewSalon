'use client';

import React, { useState, useEffect } from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  X,
  UserPlus,
  Phone,
  User,
  Sparkles,
  Scissors,
  Check,
  Star,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Customer } from '../../types';

export const AddCustomerModal: React.FC = () => {
  const {
    isAddCustomerOpen,
    setIsAddCustomerOpen,
    services,
    employees,
    findCustomerByPhone,
    addCustomerAndQueue,
    salon
  } = useSalon();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [ageGroup, setAgeGroup] = useState<'kids' | 'adult' | 'senior'>('adult');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [preferredEmployeeId, setPreferredEmployeeId] = useState<string>('');
  const [visitType, setVisitType] = useState<'walk_in' | 'appointment'>('walk_in');
  const [notes, setNotes] = useState('');

  const [matchedCustomer, setMatchedCustomer] = useState<Customer | undefined>(undefined);

  // Auto-search phone number for existing customer profile
  useEffect(() => {
    if (phone.length >= 4) {
      const match = findCustomerByPhone(phone);
      if (match) {
        setMatchedCustomer(match);
        setName(match.name);
        setGender(match.gender);
        setAgeGroup(match.ageGroup);
        if (match.favoriteEmployeeId) {
          setPreferredEmployeeId(match.favoriteEmployeeId);
        }
      } else {
        setMatchedCustomer(undefined);
      }
    } else {
      setMatchedCustomer(undefined);
    }
  }, [phone, findCustomerByPhone]);

  if (!isAddCustomerOpen) return null;

  const toggleService = (id: string) => {
    setSelectedServiceIds(prev =>
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || selectedServiceIds.length === 0) {
      alert('Please fill customer name, mobile number, and select at least 1 service.');
      return;
    }

    addCustomerAndQueue({
      name,
      phone,
      gender,
      ageGroup,
      serviceIds: selectedServiceIds,
      preferredEmployeeId: preferredEmployeeId || undefined,
      visitType,
      notes
    });

    // Reset and close
    setName('');
    setPhone('');
    setSelectedServiceIds([]);
    setPreferredEmployeeId('');
    setNotes('');
    setMatchedCustomer(undefined);
    setIsAddCustomerOpen(false);
  };

  // Filter services by salon type default recommendation
  const filteredServices = services.filter(s => {
    if (salon.type === 'mens') return s.targetGender === 'mens' || s.targetGender === 'unisex';
    if (salon.type === 'womens') return s.targetGender === 'womens' || s.targetGender === 'unisex';
    return true; // unisex shows all
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Fast Customer Check-In</h2>
              <p className="text-xs text-slate-500">Enter customer details to add directly to today&apos;s live queue</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddCustomerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Customer Auto-Detected Banner */}
        {matchedCustomer && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-purple-900 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 text-purple-600 animate-spin-slow" />
                <span>Returning Customer Detected 🎉</span>
              </div>
              <span className="text-[10px] font-extrabold bg-purple-600 text-white px-2.5 py-0.5 rounded-full uppercase">
                {matchedCustomer.category}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-700 pt-1">
              <div>
                <span className="text-[10px] text-slate-500">Total Visits</span>
                <p className="font-extrabold text-slate-900">{matchedCustomer.totalVisits} visits</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Total Spent</span>
                <p className="font-extrabold text-purple-700">₹{matchedCustomer.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Last Service</span>
                <p className="font-semibold text-slate-900 truncate">{matchedCustomer.favoriteService || 'Styling'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Preferred Stylist</span>
                <p className="font-semibold text-slate-900">{matchedCustomer.favoriteEmployeeName || 'Raj'}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Mobile Phone & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Customer Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                />
              </div>
            </div>
          </div>

          {/* Gender & Age Group */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(['male', 'female', 'other'] as const).map(g => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${
                      gender === g ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Age Group</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
              >
                <option value="adult">Adult (18-50)</option>
                <option value="kids">Kid / Teen (&lt; 18)</option>
                <option value="senior">Senior Citizen (50+)</option>
              </select>
            </div>
          </div>

          {/* Services Selection Checklist */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Select Service(s) *</span>
              <span className="text-sky-600 text-[11px] font-normal">
                {selectedServiceIds.length} selected
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-2xl">
              {filteredServices.map(srv => {
                const isSelected = selectedServiceIds.includes(srv.id);
                return (
                  <button
                    type="button"
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs">{srv.name}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                        {srv.durationMins} min • {srv.category}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-extrabold text-xs ${isSelected ? 'text-white' : 'text-sky-700'}`}>
                        ₹{srv.price}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-white text-sky-700 border-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Employee & Visit Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Employee (Optional)
              </label>
              <select
                value={preferredEmployeeId}
                onChange={(e) => setPreferredEmployeeId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
              >
                <option value="">Any Available Stylist</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.position} • ⭐ {emp.rating})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Check-in Type
              </label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
              >
                <option value="walk_in">Walk-in Customer</option>
                <option value="appointment">Appointment Check-in</option>
              </select>
            </div>
          </div>

          {/* Customer Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Customer Preference / Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Low fade cut, sensitive skin, prefers green tea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddCustomerOpen(false)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/30 transition-all"
            >
              Add to Live Queue 🎉
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
