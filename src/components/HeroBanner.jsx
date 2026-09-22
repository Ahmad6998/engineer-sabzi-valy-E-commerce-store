import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Scale, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'Farm To Kitchen • Sourced at 4 AM',
    title: 'Pure, Fresh & Digital-Weighed Mandi Produce',
    urduTitle: 'منڈی سے سیدھا آپ کے کچن تک — خالص، صاف اور ڈیجیٹل تول',
    description: '',
    ctaText: 'Explore Today\'s Harvest',
    categoryTarget: 'vegetables',
    bgGradient: 'from-emerald-900 via-brand-900 to-green-950',
    accentColor: 'text-brand-300',
    badge: '⚡ Today Special Rates',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    tag: 'Big Family Savings',
    title: 'Weekly Family Bachat Baskets — Save 22%',
    urduTitle: 'ہفتہ وار فیملی بچت پیکجز — آلو، پیاز، ٹماٹر اور ہری سبزیاں',
    description: '',
    ctaText: 'View Bachat Bundles',
    categoryTarget: 'bundles',
    bgGradient: 'from-amber-950 via-brand-950 to-emerald-950',
    accentColor: 'text-amber-300',
    badge: '📦 Most Popular Choice',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    tag: 'The Engineer\'s Promise',
    title: 'Zero Dhoka: Certified Gram-by-Gram Digital Weighing',
    urduTitle: 'انجینئر کی ضمانت: کوئی مٹی کا وزن نہیں، ہر گرام ڈیجیٹل',
    description: '',
    ctaText: 'Order Fresh Today',
    categoryTarget: 'all',
    bgGradient: 'from-teal-950 via-brand-900 to-green-900',
    accentColor: 'text-teal-300',
    badge: '🛡️ 100% Replacement Guarantee',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=80'
  }
];

export default function HeroBanner({ onSelectCategory, onOpenMandiModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Smooth slide navigation
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);

  // Touch swipe support for mobile
  const minSwipeDistance = 40;
  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setIsPaused(true);
  };
  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Auto-play timer that pauses on user hover/touch and restarts fresh after manual navigation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  // Keyboard navigation support (Left/Right arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const active = SLIDES[currentSlide];

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 pt-2 sm:pt-3 pb-2">
      
      {/* Main Banner Frame */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ${active.bgGradient} text-white shadow-xl transition-all duration-700 min-h-[220px] sm:min-h-[300px] lg:min-h-[420px] xl:min-h-[460px] flex items-center group`}
      >
        
        {/* Ambient background decoration */}
        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none opacity-40"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Content */}
        <div 
          key={active.id}
          className="relative z-10 w-full flex items-center justify-between gap-3 sm:gap-6 px-7 sm:px-12 lg:px-16 py-4 sm:py-7 lg:py-10 animate-fadeIn"
        >
          
          {/* Left Text Content */}
          <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 max-w-2xl">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="bg-brand-500/30 text-brand-200 border border-brand-400/30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-accent-amber shrink-0" />
                <span className="truncate">{active.tag}</span>
              </span>
              <span className="hidden xs:inline-block bg-white/10 text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium backdrop-blur-sm truncate">
                {active.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white line-clamp-2 sm:line-clamp-none">
              {active.title}
            </h1>

            {/* Urdu Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-emerald-200/95 font-medium font-urdu leading-snug line-clamp-1 sm:line-clamp-none">
              {active.urduTitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => onSelectCategory(active.categoryTarget)}
                className="px-3.5 py-1.5 sm:px-5 sm:py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-xl shadow-md shadow-brand-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer text-xs sm:text-sm"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onOpenMandiModal}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer text-xs sm:text-sm"
              >
                <span>Mandi Rates</span>
              </button>
            </div>

            {/* Mini Trust Features (Desktop only to prevent mobile clutter) */}
            <div className="hidden sm:flex flex-wrap items-center gap-4 pt-1 text-xs text-brand-100">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                <span>Zero Wet Soil Weight</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                <span>Morning Mandi Rates</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                <span>Cash on Delivery</span>
              </span>
            </div>

          </div>

          {/* Right Visual Image - Prominently visible on BOTH Mobile & Desktop! */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="relative group">
              <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/25 ring-2 sm:ring-4 ring-brand-500/20 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent hidden sm:block"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white hidden sm:block">
                  <p className="text-[10px] sm:text-xs font-semibold text-brand-300 uppercase tracking-wider">
                    Engineer Verified
                  </p>
                  <p className="text-xs sm:text-sm font-bold truncate">
                    100% Mandi Fresh
                  </p>
                </div>
              </div>

              {/* Floating Scale Badge (Tablet & Desktop) */}
              <div className="hidden md:flex absolute -bottom-2.5 -left-3 bg-white text-gray-900 px-2.5 py-1.5 rounded-xl shadow-lg border border-gray-100 items-center gap-1.5 animate-bounce">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                  <Scale className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase leading-none">Digital Scale</p>
                  <p className="text-[11px] font-black text-brand-700 leading-none mt-0.5">100% Weighed</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Carousel Arrow Controls - Sized and positioned so they NEVER overlap text */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide"
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-white text-white hover:text-gray-900 border border-white/30 hover:border-white shadow-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-90 hover:scale-105 group/arrow"
          title="Previous Banner Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover/arrow:-translate-x-0.5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide"
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-white text-white hover:text-gray-900 border border-white/30 hover:border-white shadow-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-90 hover:scale-105 group/arrow"
          title="Next Banner Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover/arrow:translate-x-0.5" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-30">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-6 sm:w-8 bg-brand-400 shadow-sm shadow-brand-400/50' : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

