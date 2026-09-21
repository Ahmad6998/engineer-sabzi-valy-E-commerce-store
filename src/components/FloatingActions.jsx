import React from 'react';
import { MessageCircle, ShoppingBag, BarChart3, Home, MapPin } from 'lucide-react';
import { STORE_SETTINGS } from '../data/areas';
import { useCart } from '../context/CartContext';

export default function FloatingActions({ onOpenMandiModal, onScrollToTop }) {
  const { totalItemCount, subtotal, setIsCartOpen, setIsLocationModalOpen } = useCart();

  return (
    <>
      {/* Floating WhatsApp Action (Always visible on desktop and tablet) */}
      <aside aria-label="Quick WhatsApp assistance" className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        <a
          href={`https://wa.me/${STORE_SETTINGS.whatsappCleanNumber}?text=Assalam-o-Alaikum%20Engineer%20Sabzi%20Valy%2C%20I%20want%20to%20order%20vegetables.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="text-xs font-bold hidden sm:inline">Order on WhatsApp</span>
        </a>
      </aside>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <nav aria-label="Mobile Navigation" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 flex items-center justify-around shadow-lg">
        
        <button
          onClick={onScrollToTop}
          className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-brand-600"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-brand-700 hover:text-brand-800 font-bold"
        >
          <MapPin className="w-5 h-5 text-brand-600" />
          <span className="text-[10px]">Location</span>
        </button>

        <button
          onClick={onOpenMandiModal}
          className="flex flex-col items-center gap-0.5 text-brand-700 font-bold"
        >
          <BarChart3 className="w-5 h-5 text-brand-600" />
          <span className="text-[10px]">Rates</span>
        </button>

        <a
          href={`https://wa.me/${STORE_SETTINGS.whatsappCleanNumber}?text=Assalam-o-Alaikum%20Engineer%20Sabzi%20Valy`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-emerald-600 font-medium"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px]">WhatsApp</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-gray-700 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-brand-600" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent-amber text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-gray-900">
            {totalItemCount > 0 ? `Rs. ${subtotal}` : 'Basket'}
          </span>
        </button>

      </nav>
    </>
  );
}

