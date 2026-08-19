'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  UserPlus,
  ArrowRightLeft,
  Sparkles,
  Phone,
  Scissors
} from 'lucide-react';
import { QueueStatus } from '../../types';

export const LiveQueue: React.FC = () => {
  const { queue, employees, updateQueueStatus, transferQueueEmployee, setIsAddCustomerOpen } = useSalon();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [transferModalQueueId, setTransferModalQueueId] = useState<string | null>(null);
  const [selectedNewEmployeeId, setSelectedNewEmployeeId] = useState<string>('');

  const filteredQueue = queue.filter(q => {
    if (filterStatus === 'all') return true;
    return q.status === filterStatus;
  });

  const waitingCount = queue.filter(q => q.status === 'waiting').length;
  const inServiceCount = queue.filter(q => q.status === 'in_service').length;
  const completedCount = queue.filter(q => q.status === 'completed').length;

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferModalQueueId && selectedNewEmployeeId) {
      transferQueueEmployee(transferModalQueueId, selectedNewEmployeeId);
      setTransferModalQueueId(null);
      setSelectedNewEmployeeId('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-sky-600" />
            <h1 className="text-xl font-extrabold text-slate-900">Live Daily Customer Queue</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time customer tokens, active waiting times & employee assignment
          </p>
        </div>

        <button
          onClick={() => setIsAddCustomerOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/30 transition-all self-start sm:self-center"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add Customer to Queue</span>
        </button>
      </div>

      {/* Queue Status Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Tokens ({queue.length})
        </button>
        <button
          onClick={() => setFilterStatus('waiting')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            filterStatus === 'waiting'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Waiting ({waitingCount})</span>
        </button>
        <button
          onClick={() => setFilterStatus('in_service')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            filterStatus === 'in_service'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-sky-800 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>In Service ({inServiceCount})</span>
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            filterStatus === 'completed'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed ({completedCount})</span>
        </button>
      </div>

      {/* Token List Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQueue.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold">No customer tokens found in this status view.</p>
          </div>
        ) : (
          filteredQueue.map(item => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 soft-shadow space-y-4 transition-all ${
                item.status === 'in_service' ? 'border-sky-300 ring-2 ring-sky-500/20 bg-sky-50/30' :
                item.status === 'waiting' ? 'border-amber-200 bg-white' :
                'border-slate-200 bg-slate-50/50'
              }`}
            >
              {/* Card Header: Token & Status */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-extrabold shadow-sm ${
                    item.status === 'in_service' ? 'bg-sky-600 text-white' :
                    item.status === 'waiting' ? 'bg-amber-500 text-white' :
                    'bg-emerald-600 text-white'
                  }`}>
                    <span className="text-[9px] uppercase tracking-tighter opacity-80">Token</span>
                    <span className="text-base leading-none">#{item.tokenNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-extrabold text-slate-900 text-base">{item.customerName}</h3>
                      {item.isReturning && (
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          Returning 🎉
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center space-x-2 mt-0.5">
                      <span className="flex items-center"><Phone className="w-3 h-3 mr-1" /> {item.customerPhone}</span>
                      <span>•</span>
                      <span className="capitalize">{item.visitType.replace('_', ' ')}</span>
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  item.status === 'in_service' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                  item.status === 'waiting' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  item.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>

              {/* Service & Employee Details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Service Requested</span>
                  <p className="font-bold text-slate-800 mt-0.5">{item.serviceNames.join(', ')}</p>
                  <p className="text-sky-700 font-extrabold text-sm mt-1">₹{item.totalAmount}</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Assigned Employee</span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {item.assignedEmployeeName || item.preferredEmployeeName || 'Not Assigned'}
                  </p>
                  <p className="text-slate-500 mt-1">
                    Arrival: <strong>{item.arrivalTime}</strong> ({item.waitingTimeMins} min wait)
                  </p>
                </div>
              </div>

              {item.notes && (
                <p className="text-xs text-slate-600 bg-amber-50/50 border border-amber-100 p-2.5 rounded-lg italic">
                  &ldquo;{item.notes}&rdquo;
                </p>
              )}

              {/* Action Buttons Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  {item.status === 'waiting' && (
                    <button
                      onClick={() => updateQueueStatus(item.id, 'in_service')}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-1 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Service</span>
                    </button>
                  )}

                  {item.status === 'in_service' && (
                    <button
                      onClick={() => updateQueueStatus(item.id, 'completed')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-1 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete & Rate</span>
                    </button>
                  )}

                  {item.status !== 'completed' && (
                    <button
                      onClick={() => {
                        setTransferModalQueueId(item.id);
                        setSelectedNewEmployeeId(item.assignedEmployeeId || employees[0].id);
                      }}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all"
                      title="Transfer to another stylist"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Transfer</span>
                    </button>
                  )}
                </div>

                {item.status !== 'completed' && item.status !== 'cancelled' && (
                  <button
                    onClick={() => updateQueueStatus(item.id, 'cancelled')}
                    className="px-2.5 py-1 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-all"
                  >
                    Cancel Token
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transfer Employee Modal */}
      {transferModalQueueId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <ArrowRightLeft className="w-5 h-5 text-sky-600" />
              <span>Transfer Customer Token</span>
            </h3>
            <p className="text-xs text-slate-500">
              Reassign customer to a different stylist for faster service.
            </p>

            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Stylist / Employee
                </label>
                <select
                  value={selectedNewEmployeeId}
                  onChange={(e) => setSelectedNewEmployeeId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.position} • {emp.avgServiceTimeMins} min speed)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTransferModalQueueId(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
