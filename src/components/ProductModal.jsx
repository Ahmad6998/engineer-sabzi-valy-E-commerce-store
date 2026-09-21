import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Star, ShieldCheck, Scale, Sparkles, HeartPulse, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, isOpen, onClose }) {
  const { cartItems, addToCart } = useCart();

  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      const defWeight = product.weightOptions?.find(w => w.isDefault) || product.weightOptions?.[0] || { label: product.baseUnit, multiplier: 1 };
      setSelectedWeight(defWeight);
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [product]);

  if (!isOpen || !product || !selectedWeight) return null;

  const currentPrice = Math.round(product.basePrice * (selectedWeight.multiplier || 1));
  const currentOriginalPrice = product.originalPrice ? Math.round(product.originalPrice * (selectedWeight.multiplier || 1)) : null;

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          
          {/* Image Section */}
          <div className="relative bg-gray-100 aspect-square sm:aspect-auto sm:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-lg font-semibold">
              {product.mandiGrade}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-5 sm:p-7 flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              
              {/* Urdu Name */}
              <div className="text-right">
                <span className="text-base text-brand-800 font-bold font-urdu">
                  {product.urduName}
                </span>
              </div>

              {/* Title & Rating */}
              <h2 className="text-xl font-black text-gray-900 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-brand-700">
                  Rs. {currentPrice}
                </span>
                {currentOriginalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    Rs. {currentOriginalPrice}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-medium">
                  / {selectedWeight.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Nutrition & Health Feature */}
              {product.nutrition && (
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2 text-xs text-emerald-900">
                  <HeartPulse className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Nutrition: </span>
                    <span>{product.nutrition}</span>
                  </div>
                </div>
              )}

              {/* Weight Options */}
              {product.weightOptions && product.weightOptions.length > 1 && (
                <div className="pt-2">
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Select Pack Weight:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.weightOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedWeight(opt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedWeight.label === opt.label
                            ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-500/30'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Quantity and Add to Cart Button */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-7 h-7 rounded-lg bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold text-sm shadow-xs cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-7 h-7 rounded-lg bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold text-sm shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Basket (Rs. {currentPrice * quantity})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Extra reassurance */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <Scale className="w-3 h-3 text-brand-600" />
                  Certified Digital Scale
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-brand-600" />
                  Same-day Express Delivery
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

