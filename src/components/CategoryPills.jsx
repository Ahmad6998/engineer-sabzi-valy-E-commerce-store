import React, { useRef } from 'react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Sparkles, Carrot, Salad, Apple, Flame, Package, Nut, ChevronLeft, ChevronRight } from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  Carrot: Carrot,
  Salad: Salad,
  Apple: Apple,
  Flame: Flame,
  Package: Package,
  Nut: Nut,
};

export default function CategoryPills({ selectedCategory, onSelectCategory }) {
  const { products } = useStore();
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handlePillClick = (catId, e) => {
    onSelectCategory(catId);
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  return (
    <div className="sticky top-[112px] md:top-[70px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs py-2.5 sm:py-3 transition-all">
      <div className="w-full px-2 sm:px-4 lg:px-6 relative flex items-center">
        
        {/* Left Scroll Navigation Button */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="hidden md:flex absolute left-1 sm:left-2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-brand-600 shadow-md border border-gray-200/80 items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
          title="Scroll Left"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Edge Fade Masks for smooth gradient indicators */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Animated Pills Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 w-full scroll-smooth select-none px-1"
        >
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = ICON_MAP[cat.icon] || Sparkles;

            return (
              <button
                key={cat.id}
                onClick={(e) => handlePillClick(cat.id, e)}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 cursor-pointer transition-all duration-300 ease-out transform ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-600 via-emerald-600 to-brand-700 text-white shadow-lg shadow-brand-600/35 ring-2 ring-brand-400/50 scale-[1.03] -translate-y-0.5'
                    : 'bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/80 hover:border-brand-400/60 shadow-2xs hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95'
                }`}
                style={{
                  animationDelay: `${idx * 60}ms`
                }}
              >
                {/* Active Shimmer Glow Layer */}
                {isSelected && (
                  <span className="animate-pill-shimmer absolute inset-0 rounded-2xl pointer-events-none" />
                )}

                {/* Animated Beacon Dot for Active Category */}
                {isSelected ? (
                  <span className="relative flex h-2 w-2 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                ) : null}

                {/* Icon with Hover Tilt & Bounce Animation */}
                <Icon
                  className={`w-4 h-4 transition-transform duration-300 ease-out ${
                    isSelected
                      ? 'text-white scale-110 drop-shadow-sm'
                      : 'text-brand-600 group-hover:text-brand-700 group-hover:scale-125 group-hover:rotate-12'
                  }`}
                />

                {/* Category Name */}
                <span className="tracking-tight whitespace-nowrap">
                  {cat.name}
                </span>

                {/* Urdu Name Pill */}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-urdu font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'bg-white/20 text-white backdrop-blur-xs'
                      : 'bg-slate-200/70 group-hover:bg-brand-100 text-slate-600 group-hover:text-brand-800'
                  }`}
                >
                  {cat.urdu}
                </span>

                {/* Dynamic Produce Count */}
                {(() => {
                  const count = cat.id === 'all'
                    ? products.length
                    : products.filter(p => p.category === cat.id).length;
                  return count > 0 ? (
                    <span
                      className={`text-[10px] font-mono font-bold transition-opacity ${
                        isSelected ? 'text-brand-100 opacity-90' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    >
                      ({count})
                    </span>
                  ) : null;
                })()}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Navigation Button */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="hidden md:flex absolute right-1 sm:right-2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-brand-600 shadow-md border border-gray-200/80 items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
          title="Scroll Right"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
