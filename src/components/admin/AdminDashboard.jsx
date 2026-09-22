import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Banknote, ShoppingBag, Clock, Carrot, ArrowUpRight, CheckCircle2, AlertCircle, Plus, ChevronRight, MessageCircle } from 'lucide-react';

export default function AdminDashboard({ onNavigateTab }) {
  const { orders, products, mandiRates, updateOrderStatus } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Out for Delivery');
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-500/20 px-2.5 py-0.5 rounded-full border border-brand-400/30">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2 text-white">
            Welcome back, Engineer Sabzi Valy!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {/* Real-time control over today's farm orders, live Mandi rates, and doorstep delivery dispatches across Lahore. */}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('products')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Produce Item</span>
          </button>
          <button
            onClick={() => onNavigateTab('mandi')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
          >
            <span>Update Mandi Rates</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900">
            Rs. {totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>From {orders.length} placed orders</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900">
            {orders.length} Orders
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            {deliveredOrders.length} fulfilled successfully
          </div>
        </div>

        {/* Active / Pending Deliveries */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Dispatches</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600">
            {pendingOrders.length} In Progress
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Action required on pending orders
          </div>
        </div>

        {/* Catalog Items */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Produce Catalog</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Carrot className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900">
            {products.length} Products
          </div>
          <div className="text-[11px] text-brand-700 font-semibold mt-1">
            {products.filter(p => p.inStock).length} in stock
          </div>
        </div>

      </div>

      {/* Main Grid: Recent Orders + Live Mandi Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Orders Section (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Recent Customer Orders
              </h2>
              <p className="text-xs text-gray-500">Live order queue with instant status controls</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({orders.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-2">Order ID</th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">Area / Sector</th>
                  <th className="py-2.5 px-2">Amount</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.orderId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 font-mono font-bold text-brand-800">
                      {ord.orderId}
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-bold text-gray-900">{ord.customer.fullName}</div>
                      <div className="text-[10px] text-gray-400">{ord.customer.phone}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div>{ord.customer.areaDetails?.name}</div>
                      <span className="text-[10px] text-gray-400">{ord.customer.timeSlotDetails?.label.split('(')[0]}</span>
                    </td>
                    <td className="py-3 px-2 font-black text-gray-900">
                      Rs. {ord.grandTotal}
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : ord.status === 'Out for Delivery'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : ord.status === 'Confirmed'
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <a
                        href={`https://wa.me/${ord.customer.phone.replace(/[\s-]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(ord.customer.fullName)}%2C%20regarding%20your%20Engineer%20Sabzi%20Valy%20order%20%23${ord.orderId}%3A%20`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Mandi Rates Quick Box (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-gray-900">
                Today's Mandi Rates
              </h2>
              <button
                onClick={() => onNavigateTab('mandi')}
                className="text-xs text-brand-700 font-bold hover:underline cursor-pointer"
              >
                Edit Sheet
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Wholesale vs Retail rates published on storefront.
            </p>

            <div className="space-y-2.5 divide-y divide-gray-100 text-xs">
              {mandiRates.rates.slice(0, 5).map((r, i) => (
                <div key={i} className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-800">{r.item.split('(')[0]}</span>
                    <div className="text-[10px] text-gray-400">Wholesale: {r.mandiWholesale}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-brand-700">{r.engineerRate}</span>
                    <div className="text-[10px] text-emerald-600 font-semibold">{r.difference}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('mandi')}
            className="w-full py-2.5 bg-gray-50 hover:bg-brand-50 border border-gray-200 text-brand-800 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
          >
            Manage All {mandiRates.rates.length} Mandi Rates →
          </button>
        </div>

      </div>

    </div>
  );
}

