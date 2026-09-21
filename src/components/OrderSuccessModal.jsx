import React from 'react';
import { CheckCircle2, MessageCircle, Printer, ShoppingBag, ArrowRight, ShieldCheck, Clock, MapPin, Phone } from 'lucide-react';
import { STORE_SETTINGS } from '../data/areas';

export default function OrderSuccessModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const { orderId, date, customer, items, subtotal, discountAmount, deliveryFee, grandTotal } = order;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppMessageUrl = () => {
    let text = `*Order Confirmation - Engineer Sabzi Valy*\n`;
    text += `Order ID: *${orderId}*\n`;
    text += `Customer: *${customer.fullName}*\n`;
    text += `Phone: ${customer.phone}\n`;
    text += `Address: ${customer.address}, ${customer.areaDetails?.city} (${customer.areaDetails?.name})\n`;
    text += `Delivery Slot: ${customer.timeSlotDetails?.label}\n`;
    text += `Payment: ${customer.paymentMethod.toUpperCase()}\n`;
    text += `-----------------------------------------\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.weightLabel}) x ${item.quantity} = Rs. ${item.unitPrice * item.quantity}\n`;
    });
    text += `-----------------------------------------\n`;
    text += `Subtotal: Rs. ${subtotal}\n`;
    if (discountAmount > 0) text += `Discount: -Rs. ${discountAmount}\n`;
    text += `Delivery: Rs. ${deliveryFee === 0 ? 'FREE' : deliveryFee}\n`;
    text += `*Grand Total: Rs. ${grandTotal}*\n`;
    if (customer.notes) text += `Notes: ${customer.notes}\n`;
    text += `\nPlease confirm and dispatch at the selected slot. JazakAllah!`;

    return `https://wa.me/${STORE_SETTINGS.whatsappCleanNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-800 to-brand-700 text-white p-6 text-center relative">
          <div className="w-14 h-14 bg-white text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-lg mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Order Confirmed
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-2 text-white">
            Thank You, {customer.fullName}!
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Order Ref: <strong className="text-white font-mono">{orderId}</strong> • Placed on {date}
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Dispatch Info Card */}
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>{customer.timeSlotDetails?.label}</span>
            </div>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>
                {customer.address}, {customer.landmark ? `(Near: ${customer.landmark}), ` : ''} 
                <strong>{customer.areaDetails?.name}, {customer.areaDetails?.city}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4 text-brand-600" />
              <span>{customer.phone}</span>
            </div>
          </div>

          {/* Ordered Produce List */}
          <div>
            <h4 className="font-bold text-gray-700 uppercase tracking-wider text-[11px] mb-2">
              Item Summary ({items.length} items)
            </h4>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {items.map((it, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-2.5">
                    <img src={it.image} alt={it.name} className="w-9 h-9 rounded-lg object-cover border" />
                    <div>
                      <span className="font-bold text-gray-900 block truncate max-w-[200px]">
                        {it.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {it.weightLabel} × {it.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">
                    Rs. {it.unitPrice * it.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Calculation */}
          <div className="p-3 bg-brand-50/50 rounded-2xl border border-brand-100 space-y-1.5">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Voucher Discount</span>
                <span>- Rs. {discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-brand-200 text-sm font-extrabold text-gray-900">
              <span>Total Amount</span>
              <span className="text-brand-800">Rs. {grandTotal}</span>
            </div>
          </div>

          {/* Sourcing Guarantee Note */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2 text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>The Engineer's Promise:</strong> Your vegetables will be handpicked fresh at tomorrow dawn's auction, washed, digitally weighed, and delivered in food-grade packaging.
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2.5">
          
          <a
            href={getWhatsAppMessageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Receipt to WhatsApp</span>
          </a>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto py-2.5 px-4 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
}

