import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ArrowLeft, KeyRound, AlertCircle, UserPlus, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MASTER_SECURITY_KEY } from '../../data/adminUsers';

export default function AdminLogin({ onLoginSuccess, onClose }) {
  const { adminUsers, registerAdmin } = useStore();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register State
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regMasterKey, setRegMasterKey] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      // Check against dynamic registered admin users
      const matchedUser = adminUsers.find(
        (u) =>
          (u.username.toLowerCase() === cleanUser || (u.email && u.email.toLowerCase() === cleanUser)) &&
          u.password === cleanPass
      );

      // Fallback credentials
      const isFallback =
        (cleanUser === 'admin' || cleanUser === 'engineer') &&
        (cleanPass === 'engineer786' || cleanPass === 'admin123');

      if (matchedUser || isFallback) {
        setIsLoading(false);
        onLoginSuccess(rememberMe);
      } else {
        setIsLoading(false);
        setError('Invalid username or password. Please try again.');
      }
    }, 400);
  };

  // 2. Handle Admin Registration
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanUser = regUsername.trim().toLowerCase();
    const cleanEmail = regEmail.trim().toLowerCase();
    const cleanPass = regPassword.trim();
    const cleanPin = regMasterKey.trim();

    if (cleanUser.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (cleanPass.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (cleanPass !== regConfirmPassword.trim()) {
      setError('Passwords do not match.');
      return;
    }

    // Verify Master Key to prevent unauthorized visitors from registering
    if (cleanPin !== MASTER_SECURITY_KEY && cleanPin !== 'engineer786') {
      setError('Invalid Store Master Security PIN.');
      return;
    }
    // Store Master Security PIN
    //  engineer786


    // Check duplicate
    const exists = adminUsers.some(
      (u) => u.username.toLowerCase() === cleanUser || (u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (exists) {
      setError('An admin with this username or email already exists.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      registerAdmin({
        username: cleanUser,
        email: cleanEmail,
        password: cleanPass,
        fullName: regFullName.trim() || cleanUser,
        role: 'Store Admin'
      });

      setIsLoading(false);
      setSuccessMsg('Admin account registered successfully! Logging you in...');

      setTimeout(() => {
        onLoginSuccess(rememberMe);
      }, 1000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      
      {/* Card Container */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-emerald-950 text-white p-6 sm:p-7 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Return to Store"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30 mb-2.5 text-2xl">
            🥬
          </div>
          <span className="bg-brand-500/20 text-brand-300 border border-brand-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Restricted Portal
          </span>
          <h2 className="text-xl font-black mt-1.5 text-white">
            {mode === 'login' ? 'Admin Portal Login' : 'Register Admin Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Engineer Sabzi Valy Management System
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mt-4 border border-slate-700/60 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); setSuccessMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register New ID
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7">
          
          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700 text-xs font-semibold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. SIGN IN MODE */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username / Email */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Admin Username or Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username or email"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Remember login session</span>
                </label>

                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(''); }}
                  className="text-brand-700 hover:underline font-bold text-[11px] cursor-pointer"
                >
                  Register New ID?
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-brand-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span>Verifying credentials...</span>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Log In to Admin Panel</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTER NEW ADMIN MODE */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Full Name / Title
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Engineer Muhammad Ahmad"
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Admin Username
                  </label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="e.g. ahmad"
                    className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="ahmad@store.pk"
                    className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Master Security Key (Owner authorization) */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Store Master Security PIN
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={regMasterKey}
                    onChange={(e) => setRegMasterKey(e.target.value)}
                    placeholder="Enter store security PIN to authorize registration"
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-mono"
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Protects your store from unauthorized registrations.
                </p>
              </div>

              {/* Submit Registration */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-brand-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span>Registering new Admin ID...</span>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Create & Register Admin Account</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
