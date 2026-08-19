'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  Award,
  Star,
  Zap,
  RotateCcw,
  Plus,
  Edit2,
  KeyRound,
  ShieldCheck,
  User,
  Sparkles
} from 'lucide-react';
import { Employee } from '../../types';

export const TeamPerformance: React.FC = () => {
  const { employees, role, addOrUpdateEmployee } = useSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Senior Barber');
  const [specialization, setSpecialization] = useState('Fades & Hair Styling');
  const [phone, setPhone] = useState('');
  const [commissionPercentage, setCommissionPercentage] = useState(15);
  const [username, setUsername] = useState('');
  const [passkey, setPasskey] = useState('5678');

  const openAddModal = () => {
    setEditingEmp(null);
    setName('');
    setPosition('Senior Stylist');
    setSpecialization('Haircut & Beard');
    setPhone('');
    setCommissionPercentage(15);
    setUsername('');
    setPasskey('5678');
    setIsModalOpen(true);
  };

  const openEditModal = (emp: Employee) => {
    setEditingEmp(emp);
    setName(emp.name);
    setPosition(emp.position);
    setSpecialization(emp.specialization);
    setPhone(emp.phone);
    setCommissionPercentage(emp.commissionPercentage);
    setUsername(emp.username || emp.name.toLowerCase().replace(/\s+/g, '_'));
    setPasskey(emp.passkey || '5678');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addOrUpdateEmployee({
      id: editingEmp?.id,
      name,
      position,
      specialization,
      phone,
      commissionPercentage,
      username: username || name.toLowerCase().replace(/\s+/g, '_'),
      passkey: passkey || '5678'
    });
    setIsModalOpen(false);
  };

  const topPerformer = [...employees].sort((a, b) => b.performanceScore - a.performanceScore)[0];
  const fastestEmployee = [...employees].sort((a, b) => a.avgServiceTimeMins - b.avgServiceTimeMins)[0];
  const highestRated = [...employees].sort((a, b) => b.rating - a.rating)[0];
  const mostRepeats = [...employees].sort((a, b) => b.repeatCustomersToday - a.repeatCustomersToday)[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-[#635BFF]" />
            <h1 className="text-xl font-extrabold text-slate-900">Employees & Stylist Credentials Manager</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your salon team, set commission rates, and assign individual Stylist login usernames & passkeys
          </p>
        </div>

        {role === 'owner' && (
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#635BFF] hover:bg-[#5249E6] text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/30 transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Stylist</span>
          </button>
        )}
      </div>

      {/* Leaderboard Award Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-4 shadow-lg shadow-amber-500/20 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-amber-100 font-extrabold text-xs uppercase tracking-wider">
            <span>Top Performer 🥇</span>
            <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <img src={topPerformer?.photo} alt={topPerformer?.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/50" />
            <div>
              <h3 className="font-extrabold text-base">{topPerformer?.name}</h3>
              <p className="text-xs text-amber-100 font-medium">Score: <strong>{topPerformer?.performanceScore}</strong>/100</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-4 shadow-lg shadow-blue-500/20 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-blue-100 font-extrabold text-xs uppercase tracking-wider">
            <span>Fastest Employee ⚡</span>
            <Zap className="w-4 h-4 text-blue-200" />
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <img src={fastestEmployee?.photo} alt={fastestEmployee?.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/50" />
            <div>
              <h3 className="font-extrabold text-base">{fastestEmployee?.name}</h3>
              <p className="text-xs text-blue-100 font-medium">Avg speed: <strong>{fastestEmployee?.avgServiceTimeMins} mins</strong></p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-4 shadow-lg shadow-purple-500/20 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-purple-100 font-extrabold text-xs uppercase tracking-wider">
            <span>Highest Rated ⭐</span>
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <img src={highestRated?.photo} alt={highestRated?.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/50" />
            <div>
              <h3 className="font-extrabold text-base">{highestRated?.name}</h3>
              <p className="text-xs text-purple-100 font-medium">Rating: <strong>{highestRated?.rating} ⭐</strong> ({highestRated?.ratingsCount} reviews)</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white rounded-2xl p-4 shadow-lg shadow-teal-500/20 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-teal-100 font-extrabold text-xs uppercase tracking-wider">
            <span>Most Repeat Clients 🔁</span>
            <RotateCcw className="w-4 h-4 text-teal-200" />
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <img src={mostRepeats?.photo} alt={mostRepeats?.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/50" />
            <div>
              <h3 className="font-extrabold text-base">{mostRepeats?.name}</h3>
              <p className="text-xs text-teal-100 font-medium"><strong>{mostRepeats?.repeatCustomersToday}</strong> repeat clients today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stylist Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map(emp => (
          <div
            key={emp.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3.5">
                <img src={emp.photo} alt={emp.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-200" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-slate-900 text-base">{emp.name}</h3>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      emp.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {emp.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{emp.position} • {emp.experienceYears} yrs exp</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{emp.specialization}</p>
                </div>
              </div>

              {role === 'owner' && (
                <button
                  onClick={() => openEditModal(emp)}
                  className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                  title="Edit Stylist & Login Passkey Credentials"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Served</span>
                <p className="font-extrabold text-slate-900 mt-0.5">{emp.customersServedToday}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Avg Speed</span>
                <p className="font-extrabold text-slate-900 mt-0.5">{emp.avgServiceTimeMins} min</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Rating</span>
                <p className="font-extrabold text-amber-600 mt-0.5 flex items-center justify-center">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                  {emp.rating}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Revenue</span>
                <p className="font-extrabold text-sky-700 mt-0.5">₹{emp.revenueGeneratedToday}</p>
              </div>
            </div>

            {/* Login Credentials Box for Stylist (Visible to Owner) */}
            {role === 'owner' && (
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <KeyRound className="w-4 h-4 text-purple-600" />
                  <span>Login Username: <strong className="text-slate-900">{emp.username || emp.name.toLowerCase().replace(/\s+/g, '_')}</strong></span>
                </div>
                <span>Passkey PIN: <strong className="text-purple-700 font-mono">{emp.passkey || '5678'}</strong></span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add / Edit Stylist Credentials Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-purple-600" />
              <span>{editingEmp ? `Edit ${editingEmp.name}` : 'Add New Stylist'}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stylist Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raj Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Commission %</label>
                  <input
                    type="number"
                    value={commissionPercentage}
                    onChange={(e) => setCommissionPercentage(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specialization</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              {/* Stylist Login Credentials Assignment */}
              <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-100 space-y-2">
                <span className="font-extrabold text-purple-900 block text-xs">Assign Login Credentials for Stylist</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-purple-800 mb-1">Username</label>
                    <input
                      type="text"
                      placeholder="e.g. raj_cut"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 bg-white border border-purple-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-purple-800 mb-1">Passkey PIN</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 5678"
                      value={passkey}
                      onChange={(e) => setPasskey(e.target.value)}
                      className="w-full p-2 bg-white border border-purple-200 rounded-xl font-mono font-bold text-purple-700"
                    />
                  </div>
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
                  className="px-5 py-2 bg-[#635BFF] text-white font-bold rounded-xl shadow-xs"
                >
                  Save Stylist Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
