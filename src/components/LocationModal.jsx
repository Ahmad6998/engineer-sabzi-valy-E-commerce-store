import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { DELIVERY_AREAS, STORE_SETTINGS } from '../data/areas';
import { LocateFixed, ChevronDown, X, Check, MapPin, Truck, Store, Scale, Sparkles } from 'lucide-react';

export default function LocationModal() {
  const {
    selectedArea,
    orderType,
    isLocationModalOpen,
    setIsLocationModalOpen,
    confirmLocation
  } = useCart();

  const [tempArea, setTempArea] = useState(selectedArea || 'lhr-multan-road');
  const [tempOrderType, setTempOrderType] = useState(orderType || 'delivery');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectStatus, setDetectStatus] = useState('');

  if (!isLocationModalOpen) return null;

  const currentAreaObj = DELIVERY_AREAS.find(a => a.id === tempArea) || DELIVERY_AREAS[0];

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setDetectStatus('Detecting your GPS location...');

    if (!navigator.geolocation) {
      setIsDetecting(false);
      setDetectStatus('GPS not supported, set to Multan Chungi Main Hub.');
      setTimeout(() => setDetectStatus(''), 2500);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetecting(false);
        setTempArea('lhr-multan-road');
        setDetectStatus('📍 Located in Lahore! Hub set to Multan Chungi Main Mandi.');
        setTimeout(() => setDetectStatus(''), 3000);
      },
      (error) => {
        setIsDetecting(false);
        setTempArea('lhr-multan-road');
        setDetectStatus('📍 Defaulted to Multan Chungi Mandi Main Hub, Lahore.');
        setTimeout(() => setDetectStatus(''), 2500);
      },
      { timeout: 6000, enableHighAccuracy: true }
    );
  };

  const handleSelect = () => {
    confirmLocation(tempArea, tempOrderType);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsLocationModalOpen(false);
      }}
    >
      
      {/* Modal Dialog Card */}
      <div 
        className="bg-white w-full max-w-[440px] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative animate-scaleIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-location-title"
      >

        {/* Top Header with Full-Size Brand Green Background */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-800 text-white pt-8 pb-7 px-6 relative flex flex-col items-center justify-center shadow-md">
          
          {/* Ambient background decoration circles & mesh */}
          <div className="absolute -right-10 -top-10 w-36 h-36 bg-brand-400/25 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(false)}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/25 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Full Size Logo Badge - Unclipped, prominent & centered */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white shadow-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center border-4 border-white ring-4 ring-black/15 transition-transform hover:scale-105">
            <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-brand-800 via-brand-700 to-brand-600 flex flex-col items-center justify-center text-white shadow-inner p-1.5">
              <span className="text-4xl sm:text-5xl drop-shadow-sm select-none leading-none mb-1">🥬</span>
              <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase leading-none">
                ENGINEER
              </span>
              <span className="text-[10px] sm:text-xs font-black text-accent-amber uppercase tracking-wider leading-none mt-1">
                SABZI VALY
              </span>
            </div>
          </div>

          {/* Store Micro-Badge & Motto */}
          <div className="mt-3.5 flex items-center gap-1.5 bg-black/25 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-100 backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
            <span className="font-urdu text-xs font-medium">منڈی سے سیدھا آپ کے گھر تک • لاہور</span>
          </div>

        </div>

        {/* Modal Content Body */}
        <div className="p-6 pt-5 text-center space-y-4">
          
          {/* Header Title */}
          <div>
            <h3 id="modal-location-title" className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
              Select Your Lahore Delivery Location
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Daily 4 AM harvest delivered fresh from Multan Chungi Mandi across Lahore
            </p>
          </div>

          {/* Order Type Toggle Pills (Brand Green & Gold) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100/90 rounded-2xl border border-gray-200/80">
            <button
              type="button"
              onClick={() => setTempOrderType('delivery')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                tempOrderType === 'delivery'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Doorstep Delivery</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTempOrderType('takeaway');
                setTempArea('lhr-multan-road');
              }}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                tempOrderType === 'takeaway'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Self Pickup</span>
            </button>
          </div>

          {tempOrderType === 'takeaway' && (
            <div className="p-2.5 bg-brand-50 border border-brand-200 rounded-xl text-left text-xs space-y-1 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-brand-800 font-bold">
                <Store className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Multan Chungi Central Hub, Lahore</span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                {STORE_SETTINGS.address} • Mon-Sun: 06:30 AM – 10:00 PM
              </p>
            </div>
          )}

          {/* Use Current Location Button (GPS) */}
          {tempOrderType === 'delivery' && (
            <div>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetecting}
                className="w-full py-2.5 px-4 rounded-xl border border-brand-500/80 bg-brand-50/60 hover:bg-brand-100/70 text-brand-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-98 shadow-2xs"
              >
                <LocateFixed className={`w-4 h-4 text-brand-600 ${isDetecting ? 'animate-spin' : ''}`} />
                <span>{isDetecting ? 'Detecting Location...' : 'Use Current Location (GPS Auto-Detect)'}</span>
              </button>

              {detectStatus && (
                <p className="text-[11px] font-semibold text-brand-800 bg-brand-100/80 py-1.5 px-2.5 rounded-lg mt-2 animate-fadeIn">
                  {detectStatus}
                </p>
              )}
            </div>
          )}

          {/* Dropdown Input for Location */}
          <div className="text-left space-y-1.5 pt-1">
            <label htmlFor="delivery-area-select" className="block text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>Select Delivery Area / Zone</span>
              <span className="text-[10px] text-brand-600 font-semibold">100% Full Weight Guarantee</span>
            </label>
            
            <div className="relative">
              <select
                id="delivery-area-select"
                value={tempArea}
                onChange={(e) => setTempArea(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-gray-800 pr-10 focus:outline-none transition-all cursor-pointer shadow-xs"
              >
                <optgroup label="📍 Lahore Delivery Zones (Multan Chungi Hub)">
                  {DELIVERY_AREAS.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name} ({area.estTime})
                    </option>
                  ))}
                </optgroup>
              </select>

              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Estimated Delivery Time Banner */}
            {currentAreaObj && (
              <div className="p-2 bg-emerald-50/80 border border-emerald-200/70 rounded-xl flex items-center justify-between text-[11px] text-emerald-900 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span><strong>{currentAreaObj.city}:</strong> {currentAreaObj.name.split('(')[0]}</span>
                </div>
                <span className="font-bold text-brand-700 bg-white px-2 py-0.5 rounded-md shadow-2xs border border-emerald-100">
                  {currentAreaObj.estTime}
                </span>
              </div>
            )}
          </div>

          {/* Big Confirm Button in Brand Green Gradient */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSelect}
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 hover:from-brand-500 hover:to-brand-400 active:from-brand-700 active:to-brand-600 text-white rounded-xl font-black text-sm tracking-wide shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Delivery Location • تصدیق کریں</span>
            </button>
          </div>

          {/* Subtext info */}
          <p className="text-[10px] text-gray-400 font-medium">
            Free Delivery on orders above Rs. {STORE_SETTINGS.freeDeliveryThreshold} • Digital Weighing Guaranteed
          </p>

        </div>

      </div>

    </div>
  );
}
