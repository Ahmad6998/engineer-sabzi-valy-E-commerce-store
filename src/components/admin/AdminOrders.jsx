import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Filter, Eye, MessageCircle, Printer, CheckCircle, Clock, Truck, XCircle, AlertCircle, ChevronDown, MapPin, Phone, User, Calendar, X, Trash2 } from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useStore();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDeleteOrder = (orderId, customerName) => {
    if (window.confirm(`Are you sure you want to delete Order #${orderId} (${customerName})? This action cannot be undone.`)) {
      deleteOrder(orderId);
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    if (!matchesStatus) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      order.orderId.toLowerCase().includes(q) ||
      order.customer.fullName.toLowerCase().includes(q) ||
      order.customer.phone.includes(q) ||
      (order.customer.address && order.customer.address.toLowerCase().includes(q))
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Confirmed':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Customer Orders Management
          </h1>
          <p className="text-xs text-gray-500">
            {orders.length} total orders recorded • Real-time dispatch and status controls
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {['All', 'Pending', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === status
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {status}
              {status !== 'All' && (
                <span className="ml-1 text-[10px] opacity-75">
                  ({orders.filter(o => o.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Order ID, Customer Name, or Phone..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
          >
            Clear
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer & Contact</th>
                <th className="py-3 px-4">Delivery Location & Slot</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Items / Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400 text-xs">
                    No orders found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-brand-800 text-xs block">
                        {order.orderId}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {order.date}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900 text-xs">
                        {order.customer.fullName}
                      </div>
                      <a
                        href={`tel:${order.customer.phone}`}
                        className="text-[11px] text-brand-700 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{order.customer.phone}</span>
                      </a>
                    </td>

                    {/* Location & Slot */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-semibold text-gray-800 truncate">
                        {order.customer.areaDetails?.name || 'Standard Area'}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">
                        {order.customer.timeSlotDetails?.label || 'Morning Slot'}
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                        {order.customer.paymentMethod}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4">
                      <div className="font-black text-gray-900 text-sm">
                        Rs. {order.grandTotal}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {order.items.length} items
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none shadow-xs ${getStatusBadge(order.status)}`}
                      >
                        <option value="Pending">⏳ Pending</option>
                        <option value="Confirmed">✅ Confirmed</option>
                        <option value="Out for Delivery">🛵 Out for Delivery</option>
                        <option value="Delivered">🎉 Delivered</option>
                        <option value="Cancelled">❌ Cancelled</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* View Details */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                          title="View order details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* WhatsApp Customer */}
                        <a
                          href={`https://wa.me/${order.customer.phone.replace(/[\s-]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(order.customer.fullName)}%2C%20this%20is%20Engineer%20Sabzi%20Valy%20regarding%20your%20Order%20%23${order.orderId}.%20Your%20status%20is%20${encodeURIComponent(order.status)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="Message customer on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* Delete Order */}
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(order.orderId, order.customer.fullName)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                          title="Delete this order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                  Order Details
                </span>
                <h3 className="text-lg font-black text-white">
                  {selectedOrder.orderId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Customer Card */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">{selectedOrder.customer.fullName}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-gray-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>{selectedOrder.customer.phone}</span>
                </div>
                <div className="text-gray-600 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                  <span>
                    {selectedOrder.customer.address}, {selectedOrder.customer.landmark ? `(Near: ${selectedOrder.customer.landmark}), ` : ''} 
                    {selectedOrder.customer.areaDetails?.name} ({selectedOrder.customer.areaDetails?.city})
                  </span>
                </div>
                <div className="text-gray-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  <span>Slot: {selectedOrder.customer.timeSlotDetails?.label}</span>
                </div>
                {selectedOrder.customer.notes && (
                  <div className="mt-2 p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                    <strong>Customer Note: </strong> {selectedOrder.customer.notes}
                  </div>
                )}
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-gray-800 uppercase tracking-wider text-[11px] mb-2">
                  Ordered Items ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900 block">{it.name}</span>
                        <span className="text-[10px] text-gray-400">
                          {it.weightLabel} × {it.quantity} @ Rs. {it.unitPrice}
                        </span>
                      </div>
                      <span className="font-black text-gray-900">
                        Rs. {it.unitPrice * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-3 bg-gray-50 rounded-2xl space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>- Rs. {selectedOrder.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>Rs. {selectedOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 text-sm font-extrabold text-gray-900">
                  <span>Grand Total</span>
                  <span className="text-brand-700">Rs. {selectedOrder.grandTotal}</span>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteOrder(selectedOrder.orderId, selectedOrder.customer.fullName)}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Permanently delete this order"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Order</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
              </div>

              <a
                href={`https://wa.me/${selectedOrder.customer.phone.replace(/[\s-]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(selectedOrder.customer.fullName)}%2C%20regarding%20your%20Engineer%20Sabzi%20Valy%20order%20%23${selectedOrder.orderId}%3A%20your%20order%20is%20currently%20${encodeURIComponent(selectedOrder.status)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

