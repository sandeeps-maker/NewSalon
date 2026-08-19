'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Gift, Plus, Sparkles, Send, Tag, Users, Check, Calendar } from 'lucide-react';
import { Offer } from '../../types';

export const OfferManager: React.FC = () => {
  const { offers, addOffer, setActiveTab } = useSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<Offer['discountType']>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [validUntil, setValidUntil] = useState('2026-09-30');
  const [targetAudience, setTargetAudience] = useState<Offer['targetAudience']>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;
    addOffer({
      title,
      code,
      description,
      discountType,
      discountValue,
      validUntil,
      targetAudience,
      isActive: true
    });
    setIsModalOpen(false);
    setTitle('');
    setCode('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <Gift className="w-6 h-6 text-amber-500" />
            <h1 className="text-xl font-extrabold text-slate-900">Smart Customer Offer System</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create targeted promotional campaigns for VIPs, inactive clients, birthday events & festival specials
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/30 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Offer</span>
        </button>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map(offer => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
                    {offer.discountType.replace('_', ' ')}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1.5">{offer.title}</h3>
                </div>

                <div className="bg-slate-900 text-amber-400 font-mono font-bold text-xs px-3 py-1 rounded-xl shadow-xs">
                  {offer.code}
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{offer.description}</p>

              <div className="flex items-center space-x-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1" /> Target: <strong className="ml-1 text-slate-900 capitalize">{offer.targetAudience}</strong></span>
                <span>•</span>
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Valid till: <strong className="ml-1 text-slate-900">{offer.validUntil}</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-600 font-bold">
                {offer.claimedCount} Customers Claimed 🎉
              </span>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Offer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Tag className="w-5 h-5 text-amber-500" />
              <span>Create Smart Offer</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20% OFF on Hair Spa Weekend"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SPA20"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Valid on Friday & Saturday for repeat customers."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    <option value="percentage">Percentage Discount (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                    <option value="bogo">Buy 1 Get 1 (BOGO)</option>
                    <option value="free_service">Free Complimentary Service</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    <option value="all">All Customers</option>
                    <option value="vip">VIP Customers</option>
                    <option value="regular">Regular Customers</option>
                    <option value="inactive">Inactive / Lost Customers</option>
                    <option value="male">Male Customers</option>
                    <option value="female">Female Customers</option>
                  </select>
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
                  className="px-5 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
