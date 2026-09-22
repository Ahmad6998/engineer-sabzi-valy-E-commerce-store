import React, { useState } from 'react';
import { Plus, Minus, Eye, Check, Sparkles, Scale, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  // Selected weight variation for this product card
  const [selectedWeight, setSelectedWeight] = useState(() => {
    return product.weightOptions?.find(w => w.isDefault) || product.weightOptions?.[0] || { label: product.baseUnit, multiplier: 1 };
  });

  const cartKey = `${product.id}__${selectedWeight.label}`;
  const cartItem = cartItems.find(item => item.cartKey === cartKey);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const currentPrice = Math.round(product.basePrice * (selectedWeight.multiplier || 1));
  const currentOriginalPrice = product.originalPrice ? Math.round(product.originalPrice * (selectedWeight.multiplier || 1)) : null;
  const discountPercent = currentOriginalPrice ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(cartKey, currentQuantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(cartKey, currentQuantity - 1);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden relative cursor-pointer"
    >
      
      {/* Top Image Container - 100% Fixed and Uniform across ALL products */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
        
        {/* Product Image - Perfectly covers and centers */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span className="bg-brand-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          aria-label="Quick View"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-brand-600 shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Mandi Grade Ribbon */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
          <span className="bg-black/60 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded font-medium truncate max-w-[95px]">
            {product.mandiGrade}
          </span>
          <span className="bg-white/90 backdrop-blur-xs text-amber-600 text-[9px] px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5 shadow-2xs shrink-0">
            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
            {product.rating}
          </span>
        </div>

      </div>

      {/* Card Body - Short, Clean & Compact with identical row heights */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-2">
        
        {/* Title & Urdu Name (Fixed height row for horizontal alignment) */}
        <div className="h-8 sm:h-9 flex items-start justify-between gap-1 overflow-hidden">
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 group-hover:text-brand-700 transition-colors leading-tight">
            {product.name}
          </h3>
          <span className="text-[11px] sm:text-xs text-brand-800 font-bold font-urdu shrink-0 leading-tight text-right whitespace-nowrap ml-1">
            {product.urduName}
          </span>
        </div>

        {/* Compact Weight Selector (Fixed height row) */}
        <div className="h-7 flex items-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {product.weightOptions && product.weightOptions.length > 1 ? (
            <div className="flex flex-wrap gap-1 items-center">
              {product.weightOptions.map((opt, idx) => {
                const isOptActive = selectedWeight.label === opt.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedWeight(opt)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                      isOptActive
                        ? 'bg-brand-100 text-brand-800 border border-brand-400 shadow-2xs font-bold'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <span className="text-[10px] text-gray-400 font-medium">
              Standard: {selectedWeight.label}
            </span>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1.5 mt-auto">
          
          {/* Price */}
          <div className="leading-tight">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-brand-700">
                Rs. {currentPrice}
              </span>
              {currentOriginalPrice && (
                <span className="text-[10px] text-gray-400 line-through">
                  Rs. {currentOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-gray-400 block">
              Per {selectedWeight.label}
            </span>
          </div>

          {/* Quantity Controls / Add Button */}
          <div onClick={(e) => e.stopPropagation()} className="shrink-0">
            {currentQuantity === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-xs shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-brand-50 border border-brand-300 rounded-lg p-0.5 shadow-2xs">
                <button
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white text-brand-700 hover:bg-brand-100 flex items-center justify-center font-bold text-xs shadow-2xs cursor-pointer active:scale-90"
                >
                  <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
                <span className="w-4 sm:w-5 text-center text-xs font-black text-brand-900">
                  {currentQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-brand-600 text-white hover:bg-brand-700 flex items-center justify-center font-bold text-xs shadow-2xs cursor-pointer active:scale-90"
                >
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

