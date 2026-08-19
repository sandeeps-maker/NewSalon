'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Building2, Plus, Send, Trash2, Eye, DollarSign, ShieldCheck, CheckCircle2, AlertCircle, Calendar, Phone, Mail, Check, CreditCard, Sparkles } from 'lucide-react';
import { SalonTenant, SaaSInvoice } from '../../types';

export const SuperAdminFleet: React.FC = () => {
  const { salonsList, invoicesList, addSalonTenant, removeSalonTenant, sendSaaSInvoice, updateSalonTenantPlan, confirmPaymentAndDispatchCredentials } = useSalon();

  const [isAddSalonOpen, setIsAddSalonOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [inspectedSalon, setInspectedSalon] = useState<SalonTenant | null>(null);
  const [onboardingAlert, setOnboardingAlert] = useState<string | null>(null);

  // New Salon Form State
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'mens' | 'womens' | 'unisex'>('unisex');
  const [plan, setPlan] = useState<'Starter' | 'Professional' | 'Premium'>('Professional');

  // Invoice Form State
  const [selectedSalonId, setSelectedSalonId] = useState(salonsList[0]?.id || '');
  const [invoiceAmount, setInvoiceAmount] = useState(599);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const totalMRR = salonsList.reduce((sum, s) => sum + (s.paymentStatus === 'paid' ? s.monthlyFee : 0), 0);

  const handleAddSalonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ownerName) return;
    const fee = plan === 'Starter' ? 299 : plan === 'Professional' ? 599 : 999;
    const newTenant = addSalonTenant({
      name,
      ownerName,
      ownerEmail,
      phone,
      type,
      plan,
      monthlyFee: fee
    });

    setIsAddSalonOpen(false);
    setName('');
    setOwnerName('');
    setOwnerEmail('');

    // Trigger instant onboarding alert preview
    setOnboardingAlert(`🎉 Salon ${newTenant.name} Added Successfully!\n\nSending Payment Link & Credentials via WhatsApp to ${newTenant.phone} and Email to ${newTenant.ownerEmail}...`);
  };

  const handleConfirmPayment = (salonId: string) => {
    const res = confirmPaymentAndDispatchCredentials(salonId);
    if (res.success && res.credentialsAlert) {
      setOnboardingAlert(res.credentialsAlert);
      if (inspectedSalon && inspectedSalon.id === salonId) {
        setInspectedSalon(prev => prev ? { ...prev, paymentStatus: 'paid' } : null);
      }
    }
  };

  const handlePlanChange = (salonId: string, newPlan: 'Starter' | 'Professional' | 'Premium') => {
    const nextYear = new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0];
    updateSalonTenantPlan(salonId, newPlan, nextYear);
    if (inspectedSalon && inspectedSalon.id === salonId) {
      const fee = newPlan === 'Starter' ? 299 : newPlan === 'Professional' ? 599 : 999;
      setInspectedSalon(prev => prev ? { ...prev, plan: newPlan, monthlyFee: fee, planEndDate: nextYear } : null);
    }
  };

  const handleSendInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = salonsList.find(salon => salon.id === selectedSalonId);
    if (!s) return;
    sendSaaSInvoice({
      salonId: s.id,
      salonName: s.name,
      amount: invoiceAmount,
      billingPeriod,
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]
    });
    setIsInvoiceOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Super Admin SaaS Control Center</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Salon Fleet & Billing Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage salon tenants, send invoices, and inspect payment & plan subscription details
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold border border-white/20 transition-all flex items-center space-x-1.5"
          >
            <Send className="w-4 h-4 text-purple-400" />
            <span>Send Invoice</span>
          </button>
          <button
            onClick={() => setIsAddSalonOpen(true)}
            className="px-4 py-2.5 bg-[#635BFF] hover:bg-[#5249E6] text-white rounded-2xl text-xs font-bold shadow-lg shadow-purple-500/30 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Salon</span>
          </button>
        </div>
      </div>

      {/* Onboarding Credential Notification Alert Box */}
      {onboardingAlert && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
                Automated Onboarding Dispatch
              </h4>
              <p className="text-xs text-emerald-800 mt-1 whitespace-pre-wrap font-medium leading-relaxed">
                {onboardingAlert}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOnboardingAlert(null)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-950 p-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Super Admin Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Running Salons</span>
          <p className="text-3xl font-extrabold text-slate-900">{salonsList.length} Salons</p>
          <p className="text-[11px] text-emerald-600 font-bold">Immediately Active in SaaS Fleet</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Monthly Recurring Revenue (MRR)</span>
          <p className="text-3xl font-extrabold text-[#635BFF]">₹{totalMRR.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span></p>
          <p className="text-[11px] text-purple-600 font-bold">Collected Subscription Revenue</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Pending Payments</span>
          <p className="text-3xl font-extrabold text-amber-600">
            {salonsList.filter(s => s.paymentStatus === 'payment_pending').length} Salons
          </p>
          <p className="text-[11px] text-amber-700 font-bold">Awaiting Owner Payment</p>
        </div>
      </div>

      {/* Registered Salons Fleet Table */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Registered Salons Registry</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Salon Name</th>
                <th className="py-3 px-4">Owner & Contact</th>
                <th className="py-3 px-4">Active Plan</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Payment Inspection Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {salonsList.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    {s.name}
                    <span className="block text-[10px] text-slate-400 font-normal">Type: {s.type}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {s.ownerName}
                    <span className="block text-[10px] text-slate-400">{s.phone} • {s.ownerEmail}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-[#635BFF]">{s.plan}</span>
                    <span className="block text-[10px] text-slate-500">Expires: {s.planEndDate}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase ${
                      s.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {s.paymentStatus === 'paid' ? 'Paid ✓' : 'Payment Pending'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => setInspectedSalon(s)}
                      className="px-3 py-1.5 bg-[#635BFF] text-white font-bold rounded-xl text-[11px] shadow-xs flex items-center space-x-1 inline-flex"
                      title="Inspect Payment & Plan Details ONLY"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Inspect Payment & Plan</span>
                    </button>

                    <button
                      onClick={() => removeSalonTenant(s.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg inline-flex"
                      title="Remove Salon Tenant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment & Plan Inspector Modal (Super Admin Payment-Only Inspection Boundary) */}
      {inspectedSalon && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-purple-100 text-purple-700 rounded-2xl">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{inspectedSalon.name}</h3>
                  <p className="text-xs text-slate-500">Super Admin Payment & Plan Inspection Boundary</p>
                </div>
              </div>
              <button
                onClick={() => setInspectedSalon(null)}
                className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            {/* Privacy Scope Banner */}
            <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Super Admin Inspection Scope</span>
              </p>
              <p className="text-[11px]">
                You are inspecting <strong>Payment & Plan details ONLY</strong>. Private operational salon data (customers, services) remains confidential to the salon owner.
              </p>
            </div>

            {/* Plan & Payment Details */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Salon Owner</span>
                  <p className="font-extrabold text-slate-900 mt-0.5">{inspectedSalon.ownerName}</p>
                  <p className="text-[10px] text-slate-500">{inspectedSalon.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Payment Status</span>
                  <p className="mt-0.5">
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase ${
                      inspectedSalon.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inspectedSalon.paymentStatus === 'paid' ? 'Paid ✓' : 'Payment Pending'}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Active SaaS Plan (Super Admin Control)</label>
                <select
                  value={inspectedSalon.plan}
                  onChange={(e) => handlePlanChange(inspectedSalon.id, e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-purple-600"
                >
                  <option value="Starter">Starter Plan (₹299/mo)</option>
                  <option value="Professional">Professional Plan (₹599/mo)</option>
                  <option value="Premium">Premium Plan (₹999/mo)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Plan Start Date</span>
                  <p className="font-extrabold text-slate-900 mt-0.5">{inspectedSalon.planStartDate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Plan Expiry Date</span>
                  <p className="font-extrabold text-purple-700 mt-0.5">{inspectedSalon.planEndDate}</p>
                </div>
              </div>

              {/* Login Credentials Preview for Owner */}
              <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100 text-purple-900 space-y-1">
                <span className="text-[10px] font-bold uppercase">Owner Credentials (Sent to Owner)</span>
                <div className="flex justify-between font-mono text-[11px] pt-1">
                  <span>Username: <strong>{inspectedSalon.ownerUsername}</strong></span>
                  <span>Passkey PIN: <strong>{inspectedSalon.ownerPasskey}</strong></span>
                </div>
              </div>
            </div>

            {/* Inspector Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
              {inspectedSalon.paymentStatus !== 'paid' && (
                <button
                  onClick={() => handleConfirmPayment(inspectedSalon.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Simulate Owner Payment</span>
                </button>
              )}

              <button
                onClick={() => {
                  handleConfirmPayment(inspectedSalon.id);
                  setInspectedSalon(null);
                }}
                className="px-4 py-2 bg-[#635BFF] hover:bg-[#5249E6] text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Resend Credentials via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Salon Modal */}
      {isAddSalonOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span>Add New Salon Tenant</span>
            </h3>

            <form onSubmit={handleAddSalonSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Salon Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Crown Barbershop"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Owner Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Owner Full Name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Owner Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Owner Email</label>
                <input
                  type="email"
                  placeholder="owner@salon.com"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salon Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  >
                    <option value="mens">Men&apos;s Barber</option>
                    <option value="womens">Women&apos;s Parlour</option>
                    <option value="unisex">Unisex Salon</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">SaaS Plan</label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-purple-600"
                  >
                    <option value="Starter">Starter (₹299/mo)</option>
                    <option value="Professional">Professional (₹599/mo)</option>
                    <option value="Premium">Premium (₹999/mo)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddSalonOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#635BFF] text-white font-bold rounded-xl shadow-xs"
                >
                  Add Salon & Send Payment Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Invoice Modal */}
      {isInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Send className="w-5 h-5 text-purple-600" />
              <span>Send SaaS Subscription Invoice</span>
            </h3>

            <form onSubmit={handleSendInvoiceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Salon</label>
                <select
                  value={selectedSalonId}
                  onChange={(e) => setSelectedSalonId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                >
                  {salonsList.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.ownerName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Billing Period</label>
                  <select
                    value={billingPeriod}
                    onChange={(e) => setBillingPeriod(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Invoice Amount (₹)</label>
                  <input
                    type="number"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-purple-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsInvoiceOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Send Bill Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
