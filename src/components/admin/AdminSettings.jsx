import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Settings, Save, Check, Truck, Phone, Mail, MapPin, Clock, 
  ShieldCheck, Lock, User, KeyRound, UserPlus, Trash2, Shield, Eye, EyeOff
} from 'lucide-react';

export default function AdminSettings() {
  const { 
    storeSettings, 
    updateSettings, 
    adminUsers = [], 
    registerAdmin, 
    updateAdminPassword, 
    deleteAdmin 
  } = useStore();

  const [formData, setFormData] = useState({ ...storeSettings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Change Password state
  const [selectedAdminUser, setSelectedAdminUser] = useState(adminUsers[0]?.username || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  // Register New Admin in Settings state
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [newAdminFullName, setNewAdminFullName] = useState('');
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Store Manager');
  const [addAdminError, setAddAdminError] = useState('');
  const [addAdminSuccess, setAddAdminSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (newPassword.length < 6) {
      setPwError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.');
      return;
    }

    updateAdminPassword(selectedAdminUser, newPassword);
    setPwSuccess(true);
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwSuccess(false), 3000);
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    setAddAdminError('');
    setAddAdminSuccess(false);

    const cleanUser = newAdminUsername.trim().toLowerCase();
    const cleanEmail = newAdminEmail.trim().toLowerCase();
    const cleanPass = newAdminPassword.trim();

    if (cleanUser.length < 3) {
      setAddAdminError('Username must be at least 3 characters.');
      return;
    }

    if (cleanPass.length < 6) {
      setAddAdminError('Password must be at least 6 characters.');
      return;
    }

    const exists = adminUsers.some(
      (u) => u.username.toLowerCase() === cleanUser || (u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (exists) {
      setAddAdminError('Admin username or email already exists.');
      return;
    }

    registerAdmin({
      fullName: newAdminFullName.trim() || cleanUser,
      username: cleanUser,
      email: cleanEmail,
      password: cleanPass,
      role: newAdminRole
    });

    setAddAdminSuccess(true);
    setNewAdminFullName('');
    setNewAdminUsername('');
    setNewAdminEmail('');
    setNewAdminPassword('');
    setTimeout(() => {
      setAddAdminSuccess(false);
      setIsAddingAdmin(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl space-y-8">
      
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-gray-900">
          Store & Admin Management
        </h1>
        <p className="text-xs text-gray-500">
          Update shipping thresholds, contact numbers, and manage registered admin credentials.
        </p>
      </div>

      {/* 1. STORE & DELIVERY CONFIGURATION FORM */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        
        {/* Delivery Rates */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-brand-600" />
            Delivery Fees & Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Free Delivery Threshold (PKR)
              </label>
              <input
                type="number"
                value={formData.freeDeliveryThreshold}
                onChange={(e) => setFormData({ ...formData, freeDeliveryThreshold: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <span className="text-[10px] text-gray-400">Cart value to qualify for Free shipping</span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Standard Delivery Fee (PKR)
              </label>
              <input
                type="number"
                value={formData.standardDeliveryFee}
                onChange={(e) => setFormData({ ...formData, standardDeliveryFee: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <span className="text-[10px] text-gray-400">Under-threshold delivery fee</span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Express Delivery Fee (PKR)
              </label>
              <input
                type="number"
                value={formData.expressDeliveryFee}
                onChange={(e) => setFormData({ ...formData, expressDeliveryFee: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <span className="text-[10px] text-gray-400">Priority 60-90 mins fee</span>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-brand-600" />
            WhatsApp & Helpline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                WhatsApp Clean Number (for wa.me links)
              </label>
              <input
                type="text"
                value={formData.whatsappCleanNumber}
                onChange={(e) => setFormData({ ...formData, whatsappCleanNumber: e.target.value })}
                placeholder="923181011811"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <span className="text-[10px] text-gray-400">Digits only with country code (e.g. 923181011811)</span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Display Phone / Helpline
              </label>
              <input
                type="text"
                value={formData.phoneDisplay}
                onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                placeholder="0318-1011811 / 0300-8451290"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Customer Support Email
              </label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Opening Hours
              </label>
              <input
                type="text"
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Central Address */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-600" />
            Central Mandi Hub Addresses
          </h3>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              Store & Hub Location
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-brand-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>

          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600" />
              Settings saved and updated across store!
            </span>
          )}
        </div>

      </form>

      {/* 2. ADMIN CREDENTIALS & SECURITY MANAGER CARD */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Admin Security & Registered Accounts
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Change admin passwords or register new staff and managers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingAdmin(!isAddingAdmin)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isAddingAdmin ? 'Close Form' : 'Register New Admin'}</span>
          </button>
        </div>

        {/* Modal / Inline Form: Register New Admin */}
        {isAddingAdmin && (
          <form onSubmit={handleCreateAdmin} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-fadeIn">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-brand-600" />
              Register New Admin Account
            </h3>

            {addAdminError && (
              <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                {addAdminError}
              </p>
            )}

            {addAdminSuccess && (
              <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                New Admin successfully registered!
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAdminFullName}
                  onChange={(e) => setNewAdminFullName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  placeholder="e.g. tariq"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="tariq@engineersabzivaly.pk"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Role</label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Order Dispatcher">Order Dispatcher</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingAdmin(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 shadow-sm cursor-pointer"
              >
                Save & Register Admin
              </button>
            </div>
          </form>
        )}

        {/* Registered Admins List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Active Registered Admins ({adminUsers.length})
          </h3>

          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {adminUsers.map((admin) => (
              <div key={admin.id || admin.username} className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                    {admin.fullName ? admin.fullName[0].toUpperCase() : 'A'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-gray-900">{admin.fullName || admin.username}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        admin.role === 'Super Admin'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {admin.role || 'Admin'}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 font-mono">
                      Username: <strong className="text-gray-700">{admin.username}</strong>
                      {admin.email && <span> • {admin.email}</span>}
                      {admin.createdAt && <span className="text-gray-400"> (Created: {admin.createdAt})</span>}
                    </div>
                  </div>
                </div>

                {adminUsers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove admin "${admin.username}"?`)) {
                        deleteAdmin(admin.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Admin"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Change Admin Password Form */}
        <form onSubmit={handleUpdatePassword} className="pt-4 border-t border-gray-100 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-brand-600" />
            Change Admin Password
          </h3>

          {pwError && (
            <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200">
              {pwError}
            </p>
          )}

          {pwSuccess && (
            <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Password updated successfully for {selectedAdminUser}!
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Select Admin</label>
              <select
                value={selectedAdminUser}
                onChange={(e) => setSelectedAdminUser(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                {adminUsers.map((u) => (
                  <option key={u.id || u.username} value={u.username}>
                    {u.username} ({u.role || 'Admin'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-brand-400" />
              <span>Update Password</span>
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}
