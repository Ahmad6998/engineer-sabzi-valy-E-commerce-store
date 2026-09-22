import React, { useState } from 'react';
import { ShoppingBag, Search, X, BarChart3, MessageCircle, Sparkles, ChevronDown, CheckCircle2, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_SETTINGS, DELIVERY_AREAS } from '../data/areas';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  onOpenMandiModal,
  onOpenAdmin,
  selectedCategory,
  onSelectCategory
}) {
  const { totalItemCount, subtotal, setIsCartOpen, selectedArea, setIsLocationModalOpen } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const currentArea = DELIVERY_AREAS.find(a => a.id === selectedArea) || DELIVERY_AREAS[0];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100 transition-all">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo & Deliver To Location */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              {/* Graphic Logo Badge */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0">
                <span className="text-2xl drop-shadow-sm">🥬</span>
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-gray-900 leading-none">
                    ENGINEER <span className="text-brand-600 font-black">SABZI VALY</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5 whitespace-nowrap">
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide">
                    {/* منڈی سے سیدھا آپ کے گھر تک */}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <span className="text-[10px] text-brand-700 font-semibold hidden sm:inline">
                    {/* 100% Digital Weighed */}
                  </span>
                </div>
              </div>
            </a>

            {/* Deliver To Quick Trigger */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-gray-200 bg-gray-50/80 hover:bg-brand-50 hover:border-brand-300 text-gray-700 transition-all cursor-pointer active:scale-95 text-left shrink-0 ml-1"
              title="Change Delivery Location"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Deliver To</span>
                <span className="text-xs font-bold text-gray-900 block truncate max-w-[130px] xl:max-w-[170px]">
                  {currentArea ? `${currentArea.city}: ${currentArea.name.split(' ')[0]}` : 'Select Area'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <div className="flex-1 max-w-2xl lg:max-w-3xl xl:max-w-4xl hidden md:block">
            <div className={`relative flex items-center rounded-xl transition-all ${
              isSearchFocused
                ? 'ring-2 ring-brand-500/30 border-brand-500 bg-white shadow-sm'
                : 'border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-gray-300'
            }`}>
              <Search className="w-4 h-4 ml-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search fresh vegetables, fruits, herbs (e.g., Aloo, Tamatar, Chaunsa)..."
                className="w-full py-2.5 pl-2.5 pr-9 text-sm text-gray-800 bg-transparent placeholder:text-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Daily Mandi Rate Button */}
            <button
              onClick={onOpenMandiModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
              title="View today's live Sabzi Mandi wholesale rates"
            >
              <BarChart3 className="w-4 h-4 text-brand-600" />
              <span className="hidden sm:inline">Mandi Rates</span>
              <span className="bg-brand-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Live
              </span>
            </button>

            {/* Direct WhatsApp Quick Order */}
            <a
              href={`https://wa.me/${STORE_SETTINGS.whatsappCleanNumber}?text=Assalam-o-Alaikum%20Engineer%20Sabzi%20Valy%2C%20I%20want%20to%20order%20vegetables.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Order</span>
            </a>

            {/* Admin Side Switcher */}
            <button
              onClick={onOpenAdmin}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all active:scale-95 cursor-pointer"
              title="Open Store Admin Dashboard"
            >
              <span>🔐 Admin Panel</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-xl font-medium shadow-md shadow-brand-600/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer relative"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-accent-amber text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left text-xs leading-tight">
                <span className="text-[10px] text-brand-200 uppercase font-semibold">My Cart</span>
                <span className="font-bold text-white">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
            </button>

          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="mt-2.5 md:hidden">
          <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50/90 shadow-inner">
            <Search className="w-4 h-4 ml-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vegetables, fruits, bundles..."
              className="w-full py-2 pl-2.5 pr-8 text-sm text-gray-800 bg-transparent placeholder:text-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}

