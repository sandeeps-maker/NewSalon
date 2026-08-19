'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Star, X, Check, Heart, Sparkles } from 'lucide-react';

export const RatingModal: React.FC = () => {
  const { ratingModalQueueItem, setRatingModalQueueItem, submitRating } = useSalon();
  const [stars, setStars] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Good service', 'Friendly']);
  const [comment, setComment] = useState('');

  if (!ratingModalQueueItem) return null;
  const item = ratingModalQueueItem;

  const availableTags = [
    'Good service',
    'Fast service',
    'Friendly',
    'Professional',
    'Clean salon',
    'Good value'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRating(item, stars, selectedTags, comment);
    setRatingModalQueueItem(null);
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Service Completed 🎉</h2>
              <p className="text-xs text-slate-500">Collect instant customer feedback & rating</p>
            </div>
          </div>
          <button
            onClick={() => setRatingModalQueueItem(null)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer & Stylist Highlight */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200/80 text-center space-y-1">
          <p className="text-xs text-amber-800 font-semibold">How was {item.customerName}&apos;s experience with</p>
          <h3 className="text-lg font-extrabold text-slate-900">
            {item.assignedEmployeeName || item.preferredEmployeeName || 'Stylist'}?
          </h3>
          <p className="text-xs text-slate-600 font-medium">{item.serviceNames.join(' + ')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Star Selection */}
          <div className="flex items-center justify-center space-x-2 py-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setStars(s)}
                className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    s <= stars
                      ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Praise Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 text-center">
              What did the customer like most?
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {availableTags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Comment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Customer Feedback Comment (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Loved the haircut fade and tea service"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setRatingModalQueueItem(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Skip
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/30 transition-all"
            >
              Submit Rating ⭐
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
