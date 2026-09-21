import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, MessageCircle, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_SETTINGS } from '../data/areas';

export default function CartDrawer({ onOpenCheckout }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    amountNeededForFree,
    freeDeliveryProgress,
    isFreeDeliveryQualified,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  // Quick WhatsApp Cart Order Message Generator
  const generateWhatsAppOrderLink = () => {
    let text = `*New Order Inquiry - Engineer Sabzi Valy*\n`;
    text += `-----------------------------------------\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.weightLabel}) x ${item.quantity} = Rs. ${item.unitPrice * item.quantity}\n`;
    });
    text += `-----------------------------------------\n`;
    text += `Subtotal: Rs. ${subtotal}\n`;
    if (discountAmount > 0) {
      text += `Discount (${appliedCoupon?.code}): -Rs. ${discountAmount}\n`;
    }
    text += `Delivery Fee: Rs. ${deliveryFee === 0 ? 'FREE' : deliveryFee}\n`;
    text += `*Total Amount: Rs. ${grandTotal}*\n\n`;
    text += `Please confirm my order and share delivery timing. Thank you!`;

    return `https://wa.me/${STORE_SETTINGS.whatsappCleanNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h2 className="font-extrabold text-base sm:text-lg text-gray-900">
                Your Fresh Basket
              </h2>
              <span className="bg-brand-100 text-brand-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3 bg-brand-50/60 border-b border-brand-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-brand-950 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-brand-600" />
                {isFreeDeliveryQualified ? (
                  <span className="text-emerald-700 font-bold">🎉 Congratulations! You have FREE Delivery</span>
                ) : (
                  <span>Add <strong>Rs. {amountNeededForFree}</strong> more for FREE Delivery!</span>
                )}
              </span>
              <span className="text-[10px] font-bold text-brand-700">
                {freeDeliveryProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto text-brand-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-800">Your basket is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore today's fresh Mandi arrivals and load up on fresh vegetables and fruits!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-2xl border border-gray-200/60 hover:border-brand-300 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-200"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-semibold text-brand-700 bg-brand-100/60 px-1.5 py-0.2 rounded">
                        {item.weightLabel}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        @ Rs. {item.unitPrice}
                      </span>
                    </div>

                    {/* Quantity controls and row subtotal */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-xs text-gray-900">
                        Rs. {item.unitPrice * item.quantity}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area with Voucher, Totals and CTAs */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-white space-y-3.5">
              
              {/* Promo Coupon Section */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-brand-50 border border-brand-200 text-xs">
                    <div className="flex items-center gap-1.5 text-brand-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-brand-600" />
                      <span>{appliedCoupon.label}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 font-bold text-xs p-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon: ENGINEER10"
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">{couponError}</p>
                )}
              </div>

              {/* Subtotals breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">Rs. {subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Savings</span>
                    <span>- Rs. {discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-brand-700 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      <span className="font-bold text-gray-900">Rs. {deliveryFee}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 text-sm font-extrabold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-base text-brand-700">Rs. {grandTotal}</span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2 pt-1">
                
                {/* Standard Checkout */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onOpenCheckout();
                  }}
                  className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-brand-600/20 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Instant WhatsApp Order CTA */}
                <a
                  href={generateWhatsAppOrderLink()}
                  target="https://wa.me/message/H6UINGUZFCZJO1"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Order via WhatsApp (1-Click)</span>
                </a>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

