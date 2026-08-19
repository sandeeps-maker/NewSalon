'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Settings, Building2, Phone, Clock, ShieldCheck, DollarSign, Bell } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { salon, updateSalon } = useSalon();
  const [name, setName] = useState(salon.name);
  const [tagline, setTagline] = useState(salon.tagline);
  const [phone, setPhone] = useState(salon.phone);
  const [type, setType] = useState(salon.type);
  const [address, setAddress] = useState(salon.address);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSalon({
      name,
      tagline,
      phone,
      type,
      address
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div className="flex items-center space-x-2">
          <Settings className="w-6 h-6 text-slate-700" />
          <h1 className="text-xl font-extrabold text-slate-900">Salon & Business Settings</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Manage profile details, operational salon type, currency & notification preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 soft-shadow space-y-5">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Salon Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Salon Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Salon Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 capitalize"
              >
                <option value="mens">Men&apos;s Salon / Barber Shop</option>
                <option value="womens">Women&apos;s Beauty Parlour</option>
                <option value="unisex">Unisex Salon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Address / Location</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
          {saved && <span className="text-xs font-bold text-emerald-600">Settings Saved Successfully!</span>}
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Save Business Settings
          </button>
        </div>
      </form>
    </div>
  );
};
