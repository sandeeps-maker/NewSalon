'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Scissors, KeyRound, AlertCircle, ArrowRight, ShieldCheck, Building2, User } from 'lucide-react';
import { Role } from '../../types';

export const PasskeyAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    loginWithPasskey,
    employees,
    salon
  } = useSalon();

  const [selectedRole, setSelectedRole] = useState<Role>('super_admin');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employees[0]?.id || '');
  const [passkey, setPasskey] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!passkey.trim()) {
      setErrorMsg('Please enter your passkey PIN.');
      return;
    }

    const result = loginWithPasskey(selectedRole, passkey, selectedRole === 'stylist' ? selectedEmployeeId : undefined);
    if (!result.success) {
      setErrorMsg(result.error || 'Invalid Passkey PIN!');
      setPasskey('');
    }
  };

  const submitButtonColor = selectedRole === 'super_admin' ? 'bg-slate-900 hover:bg-slate-800' :
    selectedRole === 'owner' ? 'bg-[#635BFF] hover:bg-[#5249E6]' :
    'bg-[#0D9488] hover:bg-[#0F766E]';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in duration-200">
        
        {/* Salon Logo & Welcome Header */}
        <div className="text-center space-y-2">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg transition-all ${
            selectedRole === 'super_admin' ? 'bg-slate-900 text-white shadow-slate-900/30' :
            selectedRole === 'owner' ? 'bg-[#635BFF] text-white shadow-purple-500/30' :
            'bg-[#0D9488] text-white shadow-teal-500/30'
          }`}>
            {selectedRole === 'super_admin' ? <ShieldCheck className="w-7 h-7" /> :
             selectedRole === 'owner' ? <Building2 className="w-7 h-7" /> :
             <Scissors className="w-7 h-7" />}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{salon.name}</h2>
          <p className="text-xs text-slate-500 font-medium">
            Select your role workspace & enter passkey PIN to unlock
          </p>
        </div>

        {/* 3 Role Selection Pills with Distinct Color Themes */}
        <div className="bg-slate-100 p-1.5 rounded-full border border-slate-200 flex items-center justify-between gap-1">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('super_admin');
              setErrorMsg('');
              setPasskey('');
            }}
            className={`flex-1 py-2 text-[11px] font-extrabold rounded-full transition-all text-center ${
              selectedRole === 'super_admin'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Super Admin
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('owner');
              setErrorMsg('');
              setPasskey('');
            }}
            className={`flex-1 py-2 text-[11px] font-extrabold rounded-full transition-all text-center ${
              selectedRole === 'owner'
                ? 'bg-[#635BFF] text-white shadow-md shadow-purple-500/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Owner
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('stylist');
              setErrorMsg('');
              setPasskey('');
            }}
            className={`flex-1 py-2 text-[11px] font-extrabold rounded-full transition-all text-center ${
              selectedRole === 'stylist'
                ? 'bg-[#0D9488] text-white shadow-md shadow-teal-500/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stylist
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* If Stylist selected: Select Individual Stylist Profile */}
          {selectedRole === 'stylist' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Stylist Identity
              </label>
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 focus:bg-white focus:border-teal-500"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.position})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Passkey Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>{selectedRole === 'super_admin' ? 'Super Admin Security PIN' : selectedRole === 'owner' ? 'Owner Passkey PIN' : 'Stylist Passkey PIN'}</span>
              <span className="text-[10px] text-slate-500 font-bold">Required</span>
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                maxLength={8}
                required
                placeholder="Enter Passkey PIN"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-base font-extrabold text-slate-900 tracking-widest focus:bg-white focus:border-slate-800 transition-all placeholder-slate-400 placeholder:normal-case placeholder:font-normal placeholder:text-xs"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Demo Passkey Helper Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center space-y-1">
            <p className="text-[11px] font-bold text-slate-700">🔑 Role Color Themes & Demo PINs</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
              <span className="text-slate-900">Super: <strong className="font-mono">9999</strong></span>
              <span className="text-slate-400">•</span>
              <span className="text-purple-700">Owner: <strong className="font-mono">1234</strong></span>
              <span className="text-slate-400">•</span>
              <span className="text-teal-700">Stylist: <strong className="font-mono">5678</strong></span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 ${submitButtonColor} text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition-all transform active:scale-98`}
          >
            <span>Unlock {selectedRole === 'super_admin' ? 'Super Admin Fleet' : selectedRole === 'owner' ? 'Owner Dashboard' : 'Stylist Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
