'use client';

import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Package, AlertTriangle, Plus, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';
import { Product } from '../../types';

export const ProductInventory: React.FC = () => {
  const { products, updateProductStock, addProduct } = useSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Hair Care');
  const [currentStock, setCurrentStock] = useState(10);
  const [minStock, setMinStock] = useState(5);
  const [purchasePrice, setPurchasePrice] = useState(300);
  const [sellingPrice, setSellingPrice] = useState(550);
  const [supplier, setSupplier] = useState('Beauty Supplies Corp');
  const [unit, setUnit] = useState('bottles');

  const lowStockProducts = products.filter(p => p.status === 'low_stock' || p.status === 'out_of_stock');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addProduct({
      name,
      category,
      currentStock,
      minStock,
      purchasePrice,
      sellingPrice,
      supplier,
      unit,
      lastRestocked: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 soft-shadow">
        <div>
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-sky-600" />
            <h1 className="text-xl font-extrabold text-slate-900">Product Inventory & Low Stock Alerts</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simple daily inventory tracking for shampoos, hair colors, facials & disposable supplies
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/30 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Product</span>
        </button>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockProducts.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-rose-500 text-white rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-rose-900 uppercase tracking-wider">
                Low Stock Alert ({lowStockProducts.length} Items Require Reorder)
              </h3>
              <p className="text-xs text-rose-700 mt-0.5">
                {lowStockProducts.map(p => `${p.name} (${p.currentStock} ${p.unit} left)`).join(' • ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Product Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden soft-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Purchase / Selling</th>
                <th className="py-3.5 px-4 text-right">Quick Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    {p.name}
                    <span className="block text-[10px] text-slate-400 font-normal">Supplier: {p.supplier}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">{p.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-slate-900 text-sm">{p.currentStock}</span> {p.unit}
                    <span className="block text-[10px] text-slate-400">Min: {p.minStock}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      p.status === 'in_stock' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      p.status === 'low_stock' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {p.status === 'in_stock' ? '🟢 In Stock' : p.status === 'low_stock' ? '🟡 Low Stock' : '🔴 Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-500">₹{p.purchasePrice}</span> / <strong className="text-sky-700">₹{p.sellingPrice}</strong>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => updateProductStock(p.id, 5)}
                      className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-lg text-[11px] transition-all"
                    >
                      +5 Stock
                    </button>
                    <button
                      onClick={() => updateProductStock(p.id, 10)}
                      className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] transition-all"
                    >
                      +10 Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Package className="w-5 h-5 text-sky-600" />
              <span>Add New Salon Product</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. L’Oréal Charcoal Black Hair Color"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  >
                    <option value="Hair Care">Hair Care</option>
                    <option value="Hair Color">Hair Color</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Beard Care">Beard Care</option>
                    <option value="Salon Supplies">Salon Supplies</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    placeholder="bottles / tubes / packs"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Alert Stock</label>
                  <input
                    type="number"
                    value={minStock}
                    onChange={(e) => setMinStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Purchase Price (₹)</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-sky-700"
                  />
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
                  className="px-5 py-2 bg-sky-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
