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
      className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-hover hover:border-brand-300 transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer"
    >
      
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
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
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-brand-600 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Mandi Grade Ribbon */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
            {product.mandiGrade}
          </span>
          <span className="bg-white/90 backdrop-blur-xs text-amber-600 text-[10px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5 shadow-xs">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            {product.rating}
          </span>
        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Urdu Name */}
          <div className="text-right">
            <span className="text-xs text-brand-800 font-bold font-urdu leading-none">
              {product.urduName}
            </span>
          </div>

          {/* English Name */}
          <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-brand-700 transition-colors">
            {product.name}
          </h3>

          {/* Mini description */}
          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Weight Selector */}
        {product.weightOptions && product.weightOptions.length > 1 && (
          <div className="pt-1" onClick={(e) => e.stopPropagation()}>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Select Weight:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.weightOptions.map((opt, idx) => {
                const isOptActive = selectedWeight.label === opt.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedWeight(opt)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      isOptActive
                        ? 'bg-brand-100 text-brand-800 border border-brand-400 shadow-xs'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-brand-700">
                Rs. {currentPrice}
              </span>
              {currentOriginalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  Rs. {currentOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400">
              Per {selectedWeight.label}
            </span>
          </div>

          {/* Quantity Controls / Add Button */}
          <div onClick={(e) => e.stopPropagation()}>
            {currentQuantity === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-brand-50 border border-brand-300 rounded-xl p-0.5 shadow-xs">
                <button
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 rounded-lg bg-white text-brand-700 hover:bg-brand-100 flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer active:scale-90"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-xs font-black text-brand-900">
                  {currentQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="w-6 h-6 rounded-lg bg-brand-600 text-white hover:bg-brand-700 flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer active:scale-90"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

