import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { TrendingUp, Plus, Check, X, ArrowDownRight, ArrowUpRight, Minus, RotateCcw, AlertCircle } from 'lucide-react';

export default function AdminMandiRates() {
  const { mandiRates, updateMandiRate, addMandiRate, resetMandiRatesToDefault } = useStore();

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRate, setEditedRate] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newRate, setNewRate] = useState({
    item: '',
    mandiWholesale: 'Rs. 90 - 100 / kg',
    openMarketRate: 'Rs. 140 - 160 / kg',
    engineerRate: 'Rs. 120 / kg',
    trend: 'down',
    difference: 'Save Rs. 30/kg',
    notes: 'Farm fresh morning arrivals'
  });

  const handleStartEdit = (index, rate) => {
    setEditingIndex(index);
    setEditedRate({ ...rate });
  };

  const handleSave = (index) => {
    updateMandiRate(index, editedRate);
    setEditingIndex(null);
  };

  const handleAddNewRate = (e) => {
    e.preventDefault();
    if (!newRate.item) return;

    addMandiRate(newRate);
    setIsAddModalOpen(false);
    setNewRate({
      item: '',
      mandiWholesale: 'Rs. 90 - 100 / kg',
      openMarketRate: 'Rs. 140 - 160 / kg',
      engineerRate: 'Rs. 120 / kg',
      trend: 'down',
      difference: 'Save Rs. 30/kg',
      notes: 'Farm fresh morning arrivals'
    });
  };

  return (
    <div className="space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              Daily Mandi Wholesale Rates Manager
            </h1>
            <span className="bg-brand-100 text-brand-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Live Ticker Sync
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Publish daily 05:30 AM Badami Bagh & Central Mandi wholesale auction rates directly to the public ticker.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rate Item</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all Mandi rates to default?')) {
                resetMandiRatesToDefault();
              }
            }}
            className="p-2 bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 rounded-xl transition-colors cursor-pointer"
            title="Reset Mandi Rates"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transparency Info Box */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
        <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Engineer Transparency Protocol: </span>
          <span>
            Rates updated here are immediately reflected in the customer-facing ticker bar and the full Mandi Rate Sheet modal. Ensure Engineer rates reflect fair margin over the wholesale auction price.
          </span>
        </div>
      </div>

      {/* Rates Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Item & Notes</th>
                <th className="py-3 px-4">Wholesale Mandi Auction</th>
                <th className="py-3 px-4 text-red-600">Open Market Shopkeeper</th>
                <th className="py-3 px-4 text-brand-700 font-bold">Engineer Delivered Rate</th>
                <th className="py-3 px-4">Market Trend</th>
                <th className="py-3 px-4">Customer Savings</th>
                <th className="py-3 px-4 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {mandiRates.rates.map((rate, idx) => {
                const isEditing = editingIndex === idx;

                return (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* Item */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={editedRate.item}
                            onChange={(e) => setEditedRate({ ...editedRate, item: e.target.value })}
                            className="px-2 py-1 border rounded text-xs w-full"
                          />
                          <input
                            type="text"
                            value={editedRate.notes}
                            onChange={(e) => setEditedRate({ ...editedRate, notes: e.target.value })}
                            className="px-2 py-0.5 border rounded text-[10px] w-full text-gray-500"
                            placeholder="Market notes..."
                          />
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-gray-900 block">{rate.item}</span>
                          <span className="text-[10px] text-gray-400">{rate.notes}</span>
                        </div>
                      )}
                    </td>

                    {/* Wholesale */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedRate.mandiWholesale}
                          onChange={(e) => setEditedRate({ ...editedRate, mandiWholesale: e.target.value })}
                          className="px-2 py-1 border rounded text-xs w-28"
                        />
                      ) : (
                        <span className="text-gray-600">{rate.mandiWholesale}</span>
                      )}
                    </td>

                    {/* Open Market */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedRate.openMarketRate}
                          onChange={(e) => setEditedRate({ ...editedRate, openMarketRate: e.target.value })}
                          className="px-2 py-1 border rounded text-xs w-28 text-red-600 font-bold"
                        />
                      ) : (
                        <span className="text-red-500 font-medium line-through">{rate.openMarketRate}</span>
                      )}
                    </td>

                    {/* Engineer Rate */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedRate.engineerRate}
                          onChange={(e) => setEditedRate({ ...editedRate, engineerRate: e.target.value })}
                          className="px-2 py-1 border rounded text-xs w-28 text-brand-700 font-black"
                        />
                      ) : (
                        <span className="text-brand-800 font-black bg-brand-50 px-2 py-0.5 rounded">
                          {rate.engineerRate}
                        </span>
                      )}
                    </td>

                    {/* Trend */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <select
                          value={editedRate.trend}
                          onChange={(e) => setEditedRate({ ...editedRate, trend: e.target.value })}
                          className="px-2 py-1 border rounded text-xs"
                        >
                          <option value="down">Down (Cheaper)</option>
                          <option value="up">Up (Higher)</option>
                          <option value="stable">Stable</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-1 font-bold">
                          {rate.trend === 'down' && (
                            <span className="text-emerald-700 flex items-center gap-0.5">
                              <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                              Down
                            </span>
                          )}
                          {rate.trend === 'up' && (
                            <span className="text-amber-700 flex items-center gap-0.5">
                              <ArrowUpRight className="w-4 h-4 text-amber-600" />
                              Up
                            </span>
                          )}
                          {rate.trend === 'stable' && (
                            <span className="text-gray-500 flex items-center gap-0.5">
                              <Minus className="w-4 h-4" />
                              Stable
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Difference */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedRate.difference}
                          onChange={(e) => setEditedRate({ ...editedRate, difference: e.target.value })}
                          className="px-2 py-1 border rounded text-xs w-28 text-emerald-700 font-bold"
                        />
                      ) : (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                          {rate.difference}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleSave(idx)}
                            className="p-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 cursor-pointer"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="p-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(idx, rate)}
                          className="text-xs font-bold text-brand-700 hover:text-brand-800 hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Mandi Rate Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-lg font-black text-white">Add Today's Mandi Rate</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewRate} className="p-5 space-y-4 text-xs">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Vegetable / Produce Name & Urdu *
                </label>
                <input
                  type="text"
                  required
                  value={newRate.item}
                  onChange={(e) => setNewRate({ ...newRate, item: e.target.value })}
                  placeholder="e.g. Green Capsicum (Shimla Mirch / شملہ مرچ)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Wholesale Mandi Auction
                  </label>
                  <input
                    type="text"
                    value={newRate.mandiWholesale}
                    onChange={(e) => setNewRate({ ...newRate, mandiWholesale: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Open Market Retail Rate
                  </label>
                  <input
                    type="text"
                    value={newRate.openMarketRate}
                    onChange={(e) => setNewRate({ ...newRate, openMarketRate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Engineer Delivered Rate
                  </label>
                  <input
                    type="text"
                    value={newRate.engineerRate}
                    onChange={(e) => setNewRate({ ...newRate, engineerRate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold text-brand-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Trend
                  </label>
                  <select
                    value={newRate.trend}
                    onChange={(e) => setNewRate({ ...newRate, trend: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                  >
                    <option value="down">Down (Cheaper)</option>
                    <option value="up">Up (Higher)</option>
                    <option value="stable">Stable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Customer Savings Tag
                </label>
                <input
                  type="text"
                  value={newRate.difference}
                  onChange={(e) => setNewRate({ ...newRate, difference: e.target.value })}
                  placeholder="Save Rs. 35/kg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Market Notes / Harvest Origin
                </label>
                <input
                  type="text"
                  value={newRate.notes}
                  onChange={(e) => setNewRate({ ...newRate, notes: e.target.value })}
                  placeholder="Fresh arrivals from Sahiwal..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Publish Mandi Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

