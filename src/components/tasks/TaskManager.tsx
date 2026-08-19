'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { CheckSquare, Plus, Check, Clock, User, AlertCircle } from 'lucide-react';

export const TaskManager: React.FC = () => {
  const { tasks, addTask, toggleTaskStatus, employees } = useSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [assignedEmployeeId, setAssignedEmployeeId] = useState(employees[0]?.id || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const emp = employees.find(e => e.id === assignedEmployeeId);
    addTask({
      title,
      assignedEmployeeId: emp?.id,
      assignedEmployeeName: emp?.name,
      priority,
      dueDate: 'Today'
    });
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-6 h-6 text-sky-600" />
            <h1 className="text-xl font-extrabold text-slate-900">Today&apos;s Salon Tasks & Checklist</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Assign operational tasks to staff (cleaning, inventory checks, appointment confirmations)
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/30 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Task</span>
        </button>
      </div>

      {/* Daily Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span>Daily Tasks Progress</span>
          <span className="text-sky-700">{completedCount} / {tasks.length} Completed ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              task.status === 'completed' ? 'bg-emerald-50/40 border-emerald-200 text-slate-500' : 'bg-white border-slate-200 soft-shadow'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                  task.status === 'completed'
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-slate-300 hover:border-sky-600'
                }`}
              >
                {task.status === 'completed' && <Check className="w-4 h-4 stroke-[3]" />}
              </button>

              <div>
                <h4 className={`font-bold text-sm ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {task.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assigned to: <strong className="text-slate-700">{task.assignedEmployeeName || 'Unassigned'}</strong> • Due: {task.dueDate}
                </p>
              </div>
            </div>

            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              task.priority === 'high' ? 'bg-rose-100 text-rose-800' :
              task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
              'bg-slate-100 text-slate-700'
            }`}>
              {task.priority} Priority
            </span>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Create Salon Task</h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanitize workstation #2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign Stylist</label>
                <select
                  value={assignedEmployeeId}
                  onChange={(e) => setAssignedEmployeeId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
