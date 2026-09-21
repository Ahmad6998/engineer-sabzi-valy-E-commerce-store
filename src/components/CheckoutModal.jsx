import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Phone, User, Clock, CreditCard, Banknote, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_AREAS, TIME_SLOTS, STORE_SETTINGS } from '../data/areas';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, onOrderPlaced }) {
  const {
    cartItems,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    appliedCoupon,
    clearCart,
    selectedArea,
    setSelectedArea,
    selectedTimeSlot,
    setSelectedTimeSlot
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    altPhone: '',
    address: '',
    landmark: '',
    notes: '',
    paymentMethod: 'cod' // 'cod', 'jazzcash', 'easypaisa', 'bank'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone number';
    } else if (!/^((\+92)|(0092)|(92)|0)?3[0-9]{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Enter a valid Pakistani mobile number (e.g., 0300 1234567)';
    }
    if (!formData.address.trim()) errs.address = 'Please specify your complete street address';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const orderId = `ESV-${Date.now().toString().slice(-6)}`;
    const matchedArea = DELIVERY_AREAS.find(a => a.id === selectedArea);
    const matchedSlot = TIME_SLOTS.find(s => s.id === selectedTimeSlot);

    const orderRecord = {
      orderId,
      date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customer: {
        ...formData,
        areaDetails: matchedArea,
        timeSlotDetails: matchedSlot
      },
      items: cartItems,
      subtotal,
      discountAmount,
      deliveryFee,
      grandTotal,
      coupon: appliedCoupon
    };

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      onClose();
      onOrderPlaced(orderRecord);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-brand-900 to-emerald-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Secure Checkout
              </span>
              <span className="text-xs text-brand-200">100% Digital Weighing Certified</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mt-1 text-white">
              Complete Your Vegetable Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Section 1: Customer Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-600" />
              1. Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Muhammad Ali"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-300 ring-red-200' : 'border-gray-200 focus:ring-brand-500'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  WhatsApp / Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0300 1234567"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-300 ring-red-200' : 'border-gray-200 focus:ring-brand-500'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Address */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              2. Delivery Address
            </h3>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Select City & Delivery Zone <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                {DELIVERY_AREAS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.city} — {area.name} ({area.estTime})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  House / Flat # & Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House 42, Street 8, Sector Y"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.address ? 'border-red-300 ring-red-200' : 'border-gray-200 focus:ring-brand-500'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Nearby Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="Near Commercial Market / Mosque"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Time Slot */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              3. Preferred Delivery Slot
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTimeSlot === slot.id;
                return (
                  <label
                    key={slot.id}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={isSelected}
                      onChange={() => setSelectedTimeSlot(slot.id)}
                      className="mt-0.5 text-brand-600 focus:ring-brand-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-gray-900">{slot.label}</div>
                      <span className="text-[10px] text-brand-700 font-semibold bg-brand-100/70 px-1.5 py-0.2 rounded">
                        {slot.badge}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-brand-600" />
              4. Payment Method
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="sr-only"
                />
                <Banknote className="w-5 h-5 text-brand-600" />
                <span className="text-xs font-bold">Cash on Delivery</span>
                <span className="text-[10px] text-gray-400">Pay at Door</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                  formData.paymentMethod === 'jazzcash'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="jazzcash"
                  checked={formData.paymentMethod === 'jazzcash'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash' })}
                  className="sr-only"
                />
                <span className="text-base font-black text-red-600">JazzCash</span>
                <span className="text-xs font-bold">Mobile Wallet</span>
                <span className="text-[10px] text-gray-400">Instant Transfer</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                  formData.paymentMethod === 'easypaisa'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="easypaisa"
                  checked={formData.paymentMethod === 'easypaisa'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'easypaisa' })}
                  className="sr-only"
                />
                <span className="text-base font-black text-emerald-600">EasyPaisa</span>
                <span className="text-xs font-bold">Mobile Account</span>
                <span className="text-[10px] text-gray-400">Instant Transfer</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                  formData.paymentMethod === 'bank'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                  className="sr-only"
                />
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-bold">Bank Transfer</span>
                <span className="text-[10px] text-gray-400">Meezan / HBL</span>
              </label>

            </div>
          </div>

          {/* Section 5: Cutting & Order Notes */}
          <div className="pt-2">
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Special Cutting or Packing Notes (Optional)
            </label>
            <textarea
              rows="2"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Please trim yellow leaves on spinach, small sized potatoes preferred, or call before ringing bell."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            ></textarea>
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Items Total ({cartItems.length} items)</span>
              <span className="font-bold text-gray-900">Rs. {subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Voucher Discount</span>
                <span>- Rs. {discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charges</span>
              <span>{deliveryFee === 0 ? <strong className="text-brand-700 uppercase">FREE</strong> : `Rs. ${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-black text-gray-900">
              <span>Grand Total Payable:</span>
              <span className="text-base text-brand-700">Rs. {grandTotal}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-600/25 active:scale-95 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <span>Placing Your Order...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Order (Rs. {grandTotal})</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

