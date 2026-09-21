import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import AdminMandiRates from './AdminMandiRates';
import AdminSettings from './AdminSettings';

export default function AdminPortal({ onExitAdmin, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-800">
      
      {/* Admin Top Navigation */}
      <AdminLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExitAdmin={onExitAdmin}
        onLogout={onLogout}
      />

      {/* Main Admin Tab Content */}
      <main className="flex-1 w-full px-2 sm:px-4 lg:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'mandi' && <AdminMandiRates />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Engineer Sabzi Valy Management Portal • Version 2.0 • 100% Calibrated Digital Sourcing
      </footer>

    </div>
  );
}

