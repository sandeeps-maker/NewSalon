'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Layers, Scissors, Check, ArrowRight, Sparkles, Building2, Clock, Users, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OnboardingWizard: React.FC = () => {
  const { salon, updateSalon, setActiveTab, addOrUpdateEmployee } = useSalon();
  const [step, setStep] = useState(1);

  const [name, setName] = useState(salon.name);
  const [type, setType] = useState(salon.type);
  const [address, setAddress] = useState(salon.address);
  const [phone, setPhone] = useState(salon.phone);
  const [openingTime, setOpeningTime] = useState(salon.openingTime);
  const [closingTime, setClosingTime] = useState(salon.closingTime);

  // New Stylist Credentials during Setup
  const [stylistName, setStylistName] = useState('');
  const [stylistUsername, setStylistUsername] = useState('');
  const [stylistPasskey, setStylistPasskey] = useState('5678');

  const handleAddStylist = () => {
    if (stylistName) {
      addOrUpdateEmployee({
        name: stylistName,
        username: stylistUsername || stylistName.toLowerCase().replace(/\s+/g, '_'),
        passkey: stylistPasskey || '5678',
        position: 'Senior Barber',
        specialization: 'Haircut & Styling'
      });
      setStylistName('');
      setStylistUsername('');
      setStylistPasskey('5678');
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      updateSalon({
        name,
        type,
        address,
        phone,
        openingTime,
        closingTime
      });
      try {
        confetti({ particleCount: 150, spread: 80 });
      } catch {}
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      
      {/* Wizard Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 soft-shadow text-center space-y-2">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
          <Scissors className="w-6 h-6 animate-bounce" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900">Salon Setup & Stylist Credential Wizard</h1>
        <p className="text-xs text-slate-500">Configure your salon details, working hours & assign login passkeys to your stylists</p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-[#635BFF]' : s < step ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Contents */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 soft-shadow space-y-6">
        
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span>Step 1: Salon Name & Type</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salon Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { id: 'mens', title: "Men's Barber" },
                { id: 'womens', title: "Women's Parlour" },
                { id: 'unisex', title: "Unisex Salon" }
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setType(item.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    type === item.id
                      ? 'bg-[#635BFF] text-white border-[#635BFF] font-bold shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>Step 2: Location & Schedule</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salon Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Opening Time</label>
                <input
                  type="text"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Closing Time</label>
                <input
                  type="text"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Step 3: Add Stylists & Assign Login Credentials</span>
            </h3>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-3">
              <span className="font-extrabold text-purple-900 block text-xs">Add New Stylist Account</span>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Stylist Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Raj Kumar"
                  value={stylistName}
                  onChange={(e) => setStylistName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-purple-200 rounded-xl text-xs text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    placeholder="e.g. raj_cut"
                    value={stylistUsername}
                    onChange={(e) => setStylistUsername(e.target.value)}
                    className="w-full p-2 bg-white border border-purple-200 rounded-xl text-xs font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Passkey PIN</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="5678"
                    value={stylistPasskey}
                    onChange={(e) => setStylistPasskey(e.target.value)}
                    className="w-full p-2 bg-white border border-purple-200 rounded-xl text-xs font-mono font-bold text-purple-700"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddStylist}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                + Add Stylist Credential
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Your Salon Setup is Complete 🎉</h3>
            <p className="text-xs text-slate-500">
              Your salon details and individual stylist login passkeys are active.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#635BFF] hover:bg-[#5249E6] text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/30 flex items-center space-x-2 transition-all"
          >
            <span>{step === 4 ? 'Launch Owner Dashboard 🚀' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
