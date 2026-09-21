import React from 'react';
import { Truck, Phone, Clock, MapPin } from 'lucide-react';
import { STORE_SETTINGS, DELIVERY_AREAS } from '../data/areas';
import { useCart } from '../context/CartContext';

export default function TopAnnouncement({ onOpenMandiModal, onOpenAdmin }) {
  const { selectedArea, setIsLocationModalOpen } = useCart();
  const currentArea = DELIVERY_AREAS.find(a => a.id === selectedArea) || DELIVERY_AREAS[0];

  return (
    <div className="bg-brand-900 text-brand-50 text-xs py-2 px-2 sm:px-4 lg:px-6 transition-all border-b border-brand-800">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Left: Free delivery alert */}
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-brand-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide animate-pulse">
            Today Mandi Deal
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-brand-400" />
            <span>
              Free Delivery on orders above <strong className="text-white">Rs. {STORE_SETTINGS.freeDeliveryThreshold}</strong> across Lahore!
            </span>
          </span>
        </div>

        {/* Right: City Selector & Contact & Admin */}
        <div className="flex items-center gap-3 sm:gap-4 text-brand-200 text-[11px] sm:text-xs">
          
          {/* Quick Mandi Rates Button */}
          <button
            onClick={onOpenMandiModal}
            className="hidden sm:flex items-center gap-1 text-accent-amber hover:text-white font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            📊 Today's Mandi Rate List
          </button>

          {/* Location selector trigger */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 bg-brand-800/90 hover:bg-brand-750 text-white px-2.5 py-1 rounded-md border border-brand-700/80 transition-all cursor-pointer shadow-xs active:scale-95 group"
            title="Click to select or change delivery location"
          >
            <MapPin className="w-3 h-3 text-brand-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-semibold truncate max-w-[170px] sm:max-w-none">
              {currentArea ? `${currentArea.city}: ${currentArea.name}` : 'Select Location'}
            </span>
          </button>

          {/* Admin Side Shortcut */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 bg-brand-500/20 hover:bg-brand-500 text-brand-200 hover:text-slate-950 border border-brand-400/40 px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer"
            title="Open Store Admin Panel"
          >
            <span>🔐 Admin Side</span>
          </button>

          {/* WhatsApp Support Hotline */}
          <a
            href={`https://wa.me/${STORE_SETTINGS.whatsappCleanNumber}?text=Assalam-o-Alaikum%20Engineer%20Sabzi%20Valy%2C%20I%20have%20an%20inquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-white hover:text-brand-300 transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-brand-400" />
            <span>Helpline: {STORE_SETTINGS.whatsappNumber}</span>
          </a>

        </div>

      </div>
    </div>
  );
}

