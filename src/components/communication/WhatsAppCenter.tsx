'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { MessageSquare, Send, Copy, Sparkles, Check, Phone, Users } from 'lucide-react';
import { WhatsAppTemplate } from '../../types';

export const WhatsAppCenter: React.FC = () => {
  const { templates, customers, salon } = useSalon();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0].id);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0].id);
  const [copied, setCopied] = useState(false);

  const currentTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  // Interpolate message text
  const formattedText = currentTemplate.templateText
    .replace(/{{customer_name}}/g, currentCustomer.name)
    .replace(/{{salon_name}}/g, salon.name)
    .replace(/{{employee_name}}/g, currentCustomer.favoriteEmployeeName || 'Stylist Raj')
    .replace(/{{salon_phone}}/g, salon.phone)
    .replace(/{{rating_link}}/g, 'salonflow.in/rate')
    .replace(/{{offer_title}}/g, '20% OFF Weekend Spa')
    .replace(/{{offer_code}}/g, 'SPA20')
    .replace(/{{valid_until}}/g, '31st August')
    .replace(/{{appointment_date}}/g, 'Tomorrow')
    .replace(/{{appointment_time}}/g, '04:30 PM');

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppSend = () => {
    const cleanPhone = currentCustomer.phone.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(formattedText);
    const url = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-emerald-600" />
          <h1 className="text-xl font-extrabold text-slate-900">WhatsApp & SMS Customer Communication</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Flexible template messaging engine with provider API architecture ready for WhatsApp / SMS integrations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Template Selection & Target Audience */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Select Message Template</h3>

          <div className="space-y-2">
            {templates.map(tpl => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplateId(tpl.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all ${
                  selectedTemplateId === tpl.id
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="block font-extrabold text-slate-900">{tpl.name}</span>
                <span className="text-[10px] text-slate-400 font-medium capitalize mt-0.5 block">
                  Category: {tpl.category.replace('_', ' ')}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Customer</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.phone} • {c.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center & Right Column: Message Preview & Action */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 soft-shadow space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Live WhatsApp Message Preview</span>
              </h3>

              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                WhatsApp Ready
              </span>
            </div>

            {/* Chat Bubble Box */}
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed space-y-3 relative shadow-inner">
              <p className="whitespace-pre-wrap">{formattedText}</p>

              <div className="text-[10px] text-slate-400 text-right pt-2 border-t border-slate-800">
                Variables interpolated automatically for <strong>{currentCustomer.name}</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleWhatsAppSend}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>Send via WhatsApp Direct 🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
