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

  // Smooth slide navigation
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);

  // Auto-play timer that pauses on user hover and restarts fresh after manual navigation
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
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ${active.bgGradient} text-white shadow-xl transition-all duration-700 min-h-[400px] sm:min-h-[460px] xl:min-h-[500px] flex items-center group`}
      >
        
        {/* Ambient background decoration */}
        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none opacity-40"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Content */}
        <div 
          key={active.id}
          className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-10 xl:p-14 items-center animate-fadeIn"
        >
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 xl:space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-brand-500/30 text-brand-200 border border-brand-400/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
                {active.tag}
              </span>
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                {active.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
              {active.title}
            </h1>

            {/* Urdu Subtitle */}
            <p className="text-sm sm:text-base text-brand-100/90 font-medium font-urdu leading-relaxed">
              {active.urduTitle}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-200/90 max-w-xl leading-relaxed">
              {active.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSelectCategory(active.categoryTarget)}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-brand-400/40 transition-all flex items-center gap-2 active:scale-95 cursor-pointer text-sm"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenMandiModal}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer text-sm flex items-center gap-2"
              >
                <span>Today's Mandi Rates</span>
              </button>
            </div>

            {/* Mini Trust Features */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] sm:text-xs text-brand-100">
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

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 hidden lg:flex justify-center">
            <div className="relative group">
              <div className="w-72 h-72 xl:w-96 xl:h-96 2xl:w-[420px] 2xl:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 ring-4 ring-brand-500/20 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-brand-300 uppercase tracking-wider">
                    Engineer Verified Harvest
                  </p>
                  <p className="text-sm font-bold truncate">
                    100% Grade-A Quality Tested
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-3 -left-4 bg-white text-gray-900 px-3.5 py-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-bounce">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Digital Scale</p>
                  <p className="text-xs font-black text-brand-700">100% Accurate Weight</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Carousel Arrow Controls - Active with Z-30 High Contrast */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 xl:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-white text-white hover:text-gray-900 border border-white/30 hover:border-white shadow-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-90 hover:scale-105 group/arrow"
          title="Previous Banner Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover/arrow:-translate-x-0.5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 xl:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-white text-white hover:text-gray-900 border border-white/30 hover:border-white shadow-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-90 hover:scale-105 group/arrow"
          title="Next Banner Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover/arrow:translate-x-0.5" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-brand-400 shadow-sm shadow-brand-400/50' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

