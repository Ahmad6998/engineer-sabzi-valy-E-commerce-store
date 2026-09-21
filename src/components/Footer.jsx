import React from 'react';
import { STORE_SETTINGS } from '../data/areas';
import { Phone, Mail, MapPin, Clock, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenMandiModal, onOpenAdmin }) {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 pt-12 pb-8">
      <div className="w-full px-2 sm:px-4 lg:px-6 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                🥬
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight">
                  ENGINEER <span className="text-brand-400">SABZI VALY</span>
                </span>
                <p className="text-xs text-gray-400">منڈی سے سیدھا آپ کے کچن تک</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Engineer Sabzi Valy provides farm-fresh vegetables, seasonal fruits, and kitchen essentials sourced directly from the dawn Mandi auction. 100% digital weighing accuracy, dirt-washed guarantee, and doorstep delivery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STORE_SETTINGS.whatsappCleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-300 flex items-center justify-center transition-colors"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <div className="text-xs text-emerald-400 font-semibold">
                Daily WhatsApp Hotline: {STORE_SETTINGS.whatsappNumber}
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Produce Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onSelectCategory('vegetables')}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Fresh Vegetables (سبزیاں)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('greens')}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Leafy Greens (پالک، میتھی، دھنیا)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('fruits')}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Seasonal Fruits (پھل)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bundles')}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Bachat Family Boxes (بچت پیکجز)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dryfruits')}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Dry Fruits & Sidr Honey (میوہ جات)
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Rates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Transparency & Admin
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={onOpenMandiModal}
                  className="hover:text-brand-400 transition-colors cursor-pointer text-amber-400 font-medium"
                >
                  📊 Daily Mandi Rate Sheet
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-brand-400 text-brand-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>🔐 Store Admin Portal</span>
                </button>
              </li>
              <li>
                <span className="hover:text-gray-300">Certified Digital Scales</span>
              </li>
              <li>
                <span className="hover:text-gray-300">Zero Wet-Soil Guarantee</span>
              </li>
              <li>
                <span className="hover:text-gray-300">Hassle-Free Doorstep Replacement</span>
              </li>
              <li>
                <span className="hover:text-gray-300">Overseas Pakistani Orders</span>
              </li>
            </ul>
          </div>

          {/* Store Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Hubs
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>Headquarters & Central Mandi Hub:<br />Multan Chungi Mandi, Multan Road, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>{STORE_SETTINGS.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>06:30 AM – 10:00 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>{STORE_SETTINGS.supportEmail}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Payment Partners & Badges */}
        <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-gray-400">Accepted Payments:</span>
            <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-semibold text-[10px]">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-0.5 rounded bg-red-950/70 border border-red-800/60 text-red-300 font-bold text-[10px]">
              JazzCash
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 font-bold text-[10px]">
              EasyPaisa
            </span>
            <span className="px-2 py-0.5 rounded bg-indigo-950/70 border border-indigo-800/60 text-indigo-300 font-bold text-[10px]">
              Online Bank Transfer
            </span>
          </div>

          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} Engineer Sabzi Valy (Pvt) Ltd. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

