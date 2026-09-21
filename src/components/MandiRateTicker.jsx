import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowDownRight, ArrowUpRight, Minus, BarChart2, X, Check, Search, Sparkles, ShoppingCart, ExternalLink } from 'lucide-react';

// Produce icon helper for ticker pills
const getProduceIcon = (itemName) => {
  const lower = itemName.toLowerCase();
  if (lower.includes('potato') || lower.includes('aloo')) return '🥔';
  if (lower.includes('onion') || lower.includes('pyaz')) return '🧅';
  if (lower.includes('tomato') || lower.includes('tamatar')) return '🍅';
  if (lower.includes('okra') || lower.includes('bhindi')) return '🌱';
  if (lower.includes('ginger') || lower.includes('adrak')) return '🫚';
  if (lower.includes('garlic') || lower.includes('lehsan')) return '🧄';
  if (lower.includes('chilli') || lower.includes('mirch')) return '🌶️';
  if (lower.includes('cauliflower') || lower.includes('gobi')) return '🥦';
  if (lower.includes('cucumber') || lower.includes('kheera')) return '🥒';
  if (lower.includes('karela') || lower.includes('bitter')) return '🥒';
  if (lower.includes('eggplant') || lower.includes('baingan')) return '🍆';
  if (lower.includes('mango') || lower.includes('chaunsa')) return '🥭';
  if (lower.includes('apple') || lower.includes('saib')) return '🍎';
  if (lower.includes('kinnow') || lower.includes('orange')) return '🍊';
  return '🥬';
};

export function MandiRateTicker({ onOpenModal, onSelectItem, onQuickAddToCart }) {
  const { mandiRates } = useStore();

  const ratesList = mandiRates.rates || [];
  // Duplicate rates list for seamless infinite loop ticker animation
  const infiniteRates = [...ratesList, ...ratesList];

  return (
    <div className="bg-emerald-950 text-white border-y border-emerald-900/80 py-2 overflow-hidden select-none relative shadow-inner">
      <div className="w-full px-2 sm:px-4 lg:px-6 flex items-center gap-2 sm:gap-3">
        
        {/* Animated Ticker Title Badge with Live Beacon */}
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-500 via-emerald-400 to-brand-500 bg-[length:200%_auto] animate-gradient-wave text-slate-950 font-black px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs shrink-0 shadow-md shadow-brand-500/20 active:scale-95 transition-all cursor-pointer z-10"
          title="Click to view full Mandi Auction Rate Sheet"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-900 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
          </span>
          <BarChart2 className="w-3.5 h-3.5 shrink-0" />
          <span className="tracking-wide">MANDI RATES TODAY</span>
        </button>

        {/* Animated Marquee Ticker Track */}
        <div className="relative flex-1 overflow-hidden">
          {/* Subtle edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-emerald-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-emerald-950 to-transparent z-10 pointer-events-none" />

          {/* Scrolling conveyor belt */}
          <div className="animate-ticker flex items-center gap-3 py-0.5">
            {infiniteRates.map((rate, idx) => (
              <div
                key={`${rate.item}-${idx}`}
                onClick={() => onSelectItem && onSelectItem(rate)}
                className="group/item flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-xs font-semibold cursor-pointer transition-all hover:scale-105 border border-emerald-800/80 hover:border-brand-400 shrink-0 shadow-xs active:scale-95"
                title={`Click to open ${rate.item} in Add to Cart`}
              >
                <span className="text-sm shrink-0">{getProduceIcon(rate.item)}</span>
                <span className="text-emerald-200 font-bold">{rate.item.split(' ')[0]}:</span>
                <span className="text-white font-black">{rate.engineerRate}</span>

                {rate.trend === 'down' && (
                  <span className="flex items-center gap-0.5 text-emerald-300 text-[11px] font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded-md border border-emerald-800">
                    <ArrowDownRight className="w-3 h-3 text-emerald-400 animate-bounce" />
                    <span>{rate.difference}</span>
                  </span>
                )}
                {rate.trend === 'up' && (
                  <span className="flex items-center gap-0.5 text-amber-400 text-[11px] font-bold bg-amber-950/80 px-1.5 py-0.5 rounded-md border border-amber-800/60">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>Mandi Up</span>
                  </span>
                )}
                {rate.trend === 'stable' && (
                  <span className="flex items-center gap-0.5 text-slate-300 text-[11px] bg-slate-900/60 px-1.5 py-0.5 rounded-md">
                    <Minus className="w-3 h-3" />
                    <span>Stable</span>
                  </span>
                )}

                {/* 1-Click Add To Cart Pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onQuickAddToCart) {
                      onQuickAddToCart(rate);
                    } else if (onSelectItem) {
                      onSelectItem(rate);
                    }
                  }}
                  className="ml-1 px-2 py-0.5 bg-brand-500 hover:bg-brand-400 text-slate-950 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-xs active:scale-90 transition-all cursor-pointer"
                  title={`Add ${rate.item} directly to cart`}
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right shortcut to open full rate modal */}
        <button
          onClick={onOpenModal}
          className="hidden md:flex items-center gap-1 text-accent-amber hover:text-white text-xs font-bold hover:underline shrink-0 cursor-pointer ml-2"
        >
          <span>Full Sheet</span>
          <ExternalLink className="w-3 h-3" />
        </button>

      </div>
    </div>
  );
}

export function MandiRatesModal({ isOpen, onClose, onSelectProductByName }) {
  const { mandiRates } = useStore();
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filteredRates = mandiRates.rates.filter(r =>
    r.item.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-brand-900 to-green-950 text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Daily Auction Transparency
              </span>
              <span className="text-xs text-brand-200">
                {mandiRates.time || '04:30 AM'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              Official Sabzi Mandi Rate Card & Comparison
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
              {mandiRates.mandiLocation || 'Badami Bagh Wholesale Mandi'} • Date: {mandiRates.date || 'Today'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice & Search */}
        <div className="p-4 sm:p-5 bg-emerald-50/60 border-b border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-emerald-900 leading-relaxed">
            💡 <strong>The Engineer's Promise:</strong> Traditional market retailers add Rs. 40 - Rs. 90/kg margin plus soak vegetables in water for false weight. We supply 100% digital weighed, dirt-free produce at direct fair rates.
          </p>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search vegetable..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Table of Rates */}
        <div className="overflow-x-auto flex-1 p-4 sm:p-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/80">
                <th className="py-3 px-3">Item / سبزی</th>
                <th className="py-3 px-3">Wholesale Mandi Auction</th>
                <th className="py-3 px-3 text-red-600">Local Shopkeeper Rate</th>
                <th className="py-3 px-3 text-brand-700 bg-brand-50 font-bold">Engineer Delivered Rate</th>
                <th className="py-3 px-3 text-emerald-600">Your Savings</th>
                <th className="py-3 px-3 text-right">Add to Cart</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRates.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{getProduceIcon(row.item)}</span>
                      <span>{row.item}</span>
                    </div>
                    <span className="text-[11px] font-normal text-gray-500 ml-6 block">{row.notes}</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-600 font-medium">
                    {row.mandiWholesale}
                  </td>
                  <td className="py-3.5 px-3 text-red-600 font-medium line-through decoration-red-400">
                    {row.openMarketRate}
                  </td>
                  <td className="py-3.5 px-3 text-brand-800 font-bold bg-brand-50/50">
                    <span className="px-2 py-0.5 rounded bg-brand-100/70 text-brand-900">
                      {row.engineerRate}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      {row.difference}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => {
                        onSelectProductByName(row.item);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5 ml-auto active:scale-95"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Rates determined by Market Committee Badami Bagh & Fruit-Sabzi Mandi.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Rate Sheet
          </button>
        </div>

      </div>
    </div>
  );
}
