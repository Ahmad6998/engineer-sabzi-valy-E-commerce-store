import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { TODAY_MANDI_RATES as INITIAL_MANDI_RATES } from '../data/mandiRates';
import { STORE_SETTINGS as INITIAL_STORE_SETTINGS, DELIVERY_AREAS } from '../data/areas';
import { INITIAL_ADMIN_USERS } from '../data/adminUsers';

const StoreContext = createContext();

const ORDERS_KEY = 'engineer_sabzi_valy_orders_v2';
const PRODUCTS_KEY = 'engineer_sabzi_valy_products_v3';
const MANDI_RATES_KEY = 'engineer_sabzi_valy_mandi_rates_v2';
const SETTINGS_KEY = 'engineer_sabzi_valy_settings_v2';
const ADMIN_USERS_KEY = 'engineer_sabzi_valy_admin_users_v2';

const INITIAL_ORDERS = [
  {
    orderId: 'ESV-981240',
    date: 'Sep 21, 2026, 08:30 AM',
    status: 'Delivered',
    customer: {
      fullName: 'Begum Shaista Lodhi',
      phone: '0300 8451290',
      address: 'House 18, Street 4, Sector W, Phase 3',
      landmark: 'Near Y-Block Market',
      areaDetails: { city: 'Lahore', name: 'DHA (Phases 1 - 9)' },
      timeSlotDetails: { label: 'Morning Slot (08:00 AM – 11:30 AM)' },
      paymentMethod: 'cod',
      notes: 'Please ensure ladyfingers are tender and clean.'
    },
    items: [
      { name: 'Fresh Potatoes (Aloo)', weightLabel: '5 kg (Bachat Bag)', quantity: 1, unitPrice: 437 },
      { name: 'Desi Red Onions (Pyaz)', weightLabel: '2.5 kg', quantity: 1, unitPrice: 432 },
      { name: 'Ripe Red Tomatoes (Tamatar)', weightLabel: '2 kg', quantity: 1, unitPrice: 273 },
      { name: 'Tender Okra / Ladyfinger (Bhindi)', weightLabel: '1 kg', quantity: 1, unitPrice: 160 }
    ],
    subtotal: 1302,
    discountAmount: 0,
    deliveryFee: 150,
    grandTotal: 1452
  },
  {
    orderId: 'ESV-981241',
    date: 'Sep 21, 2026, 09:15 AM',
    status: 'Out for Delivery',
    customer: {
      fullName: 'Dr. Kamran Qureshi',
      phone: '0321 4455667',
      address: 'Apartment 402, Royal Residency, Main Boulevard',
      landmark: 'Opposite Pace Mall',
      areaDetails: { city: 'Lahore', name: 'Gulberg (I, II, III, V)' },
      timeSlotDetails: { label: 'Morning Slot (08:00 AM – 11:30 AM)' },
      paymentMethod: 'jazzcash',
      notes: 'Call on phone before arriving at security gate.'
    },
    items: [
      { name: 'Engineer Weekly Family Sabzi Box', weightLabel: '1 Family Box (12 kg items)', quantity: 1, unitPrice: 1490 },
      { name: 'Multani Special Chaunsa Mango', weightLabel: '2.5 kg', quantity: 1, unitPrice: 912 }
    ],
    subtotal: 2402,
    discountAmount: 240,
    deliveryFee: 0,
    grandTotal: 2162
  },
  {
    orderId: 'ESV-981242',
    date: 'Sep 21, 2026, 10:45 AM',
    status: 'Confirmed',
    customer: {
      fullName: 'Muhammad Usman Khan',
      phone: '0333 7891234',
      address: 'House 14-B, Street 3, Multan Road',
      landmark: 'Near Multan Chungi Chowk',
      areaDetails: { city: 'Lahore', name: 'Multan Chungi & Multan Road (Main Hub)' },
      timeSlotDetails: { label: 'Afternoon Slot (01:00 PM – 04:30 PM)' },
      paymentMethod: 'cod',
      notes: 'Wash greens and pack coriander separately.'
    },
    items: [
      { name: 'Daily Kitchen Essentials Tri-Pack', weightLabel: '1 Combo Pack', quantity: 1, unitPrice: 880 },
      { name: 'Farm Fresh Spinach (Desi Palak)', weightLabel: '1 kg', quantity: 2, unitPrice: 80 },
      { name: 'Desi White Garlic Bulbs (Lehsan)', weightLabel: '500 g', quantity: 1, unitPrice: 264 }
    ],
    subtotal: 1304,
    discountAmount: 0,
    deliveryFee: 150,
    grandTotal: 1454
  },
  {
    orderId: 'ESV-981243',
    date: 'Sep 21, 2026, 11:20 AM',
    status: 'Pending',
    customer: {
      fullName: 'Hafiz Bilal Ahmed',
      phone: '0315 9988776',
      address: 'House 112, Street 6, Sector C',
      landmark: 'Near Eiffel Tower Replica',
      areaDetails: { city: 'Lahore', name: 'Bahria Town & Lake City' },
      timeSlotDetails: { label: '⚡ Express Priority Delivery (Within 60-90 Mins)' },
      paymentMethod: 'easypaisa',
      notes: 'Please dispatch urgently.'
    },
    items: [
      { name: 'Crispy Swat Kala Kullu Apples', weightLabel: '2 kg', quantity: 1, unitPrice: 546 },
      { name: 'Sindh Sweet Bananas (Dozen)', weightLabel: '2 Dozen (24 pcs)', quantity: 1, unitPrice: 304 },
      { name: 'Kandhari Pomegranate (Anar)', weightLabel: '1 kg', quantity: 1, unitPrice: 420 }
    ],
    subtotal: 1270,
    discountAmount: 0,
    deliveryFee: 249,
    grandTotal: 1519
  }
];

export const StoreProvider = ({ children }) => {
  // Orders State with localStorage persistence
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  });

  // Products State with localStorage persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return INITIAL_PRODUCTS || [];
    } catch (e) {
      return [];
    }
  });

  // Always-current products reference for immediate synchronous mutations
  const productsRef = useRef(products);
  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  // Mandi Rates State with localStorage persistence
  const [mandiRates, setMandiRates] = useState(() => {
    try {
      const saved = localStorage.getItem(MANDI_RATES_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MANDI_RATES;
    } catch (e) {
      return INITIAL_MANDI_RATES;
    }
  });

  // Store Settings with localStorage persistence
  const [storeSettings, setStoreSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch (e) {
      return INITIAL_STORE_SETTINGS;
    }
  });

  // Admin Users with localStorage persistence
  const [adminUsers, setAdminUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_USERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
    } catch (e) {
      return INITIAL_ADMIN_USERS;
    }
  });

  // Ref to prevent polling from reverting recent admin actions
  const lastAdminMutationRef = useRef(0);

  // Helper: Synchronize products to backend disk storage
  const syncProductsToServer = async (updatedList) => {
    if (!Array.isArray(updatedList)) return false;
    lastAdminMutationRef.current = Date.now();
    try {
      const res = await fetch(`/api/products?t=${Date.now()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(updatedList)
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.warn('Failed to sync products to server:', err);
    }
    return false;
  };

  // Helper: Synchronize mandi rates to backend disk storage
  const syncMandiRatesToServer = async (ratesData) => {
    try {
      await fetch(`/api/mandi-rates?t=${Date.now()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(ratesData)
      });
    } catch (err) {
      console.warn('Mandi rates sync error:', err);
    }
  };

  // Live Server Sync: fetch latest products, orders, mandi rates, and settings from backend
  useEffect(() => {
    let isMounted = true;

    const fetchLiveProducts = async () => {
      // Don't overwrite if admin made a local change in the last 6 seconds
      if (Date.now() - lastAdminMutationRef.current < 6000) return;

      try {
        const res = await fetch(`/api/products?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        if (res.ok) {
          const serverProducts = await res.json();
          if (isMounted && Array.isArray(serverProducts)) {
            if (Date.now() - lastAdminMutationRef.current < 6000) return;
            productsRef.current = serverProducts;
            setProducts(serverProducts);
            try {
              localStorage.setItem(PRODUCTS_KEY, JSON.stringify(serverProducts));
            } catch (e) {}
            return;
          }
        }
      } catch (err) {}

      // Fallback: fetch from /store_products.json if API is unavailable
      try {
        const staticRes = await fetch(`/store_products.json?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        if (staticRes.ok) {
          const data = await staticRes.json();
          if (isMounted && Array.isArray(data)) {
            if (Date.now() - lastAdminMutationRef.current < 6000) return;
            productsRef.current = data;
            setProducts(data);
            try {
              localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
            } catch (e) {}
          }
        }
      } catch (err) {}
    };

    const fetchLiveOrders = async () => {
      try {
        const res = await fetch(`/api/orders?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        if (res.ok) {
          const serverOrders = await res.json();
          if (isMounted && Array.isArray(serverOrders) && serverOrders.length > 0) {
            setOrders(serverOrders);
            try {
              localStorage.setItem(ORDERS_KEY, JSON.stringify(serverOrders));
            } catch (e) {}
          }
        }
      } catch (err) {}
    };

    const fetchLiveMandiRates = async () => {
      try {
        const res = await fetch(`/api/mandi-rates?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data && Array.isArray(data.rates) && data.rates.length > 0) {
            setMandiRates(data);
            try {
              localStorage.setItem(MANDI_RATES_KEY, JSON.stringify(data));
            } catch (e) {}
          }
        }
      } catch (err) {}
    };

    const fetchLiveSettings = async () => {
      try {
        const res = await fetch(`/api/settings?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data && data.storeName) {
            setStoreSettings(data);
            try {
              localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
            } catch (e) {}
          }
        }
      } catch (err) {}
    };

    const syncAllFromBackend = () => {
      fetchLiveProducts();
      fetchLiveOrders();
      fetchLiveMandiRates();
      fetchLiveSettings();
    };

    // Initial fetch on mount
    syncAllFromBackend();

    // Re-fetch when user switches back to browser tab or mobile app
    const handleFocus = () => syncAllFromBackend();
    window.addEventListener('focus', handleFocus);

    // Periodically poll backend so changes propagate automatically across devices
    const interval = setInterval(syncAllFromBackend, 4000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  // Save changes to localStorage only (Never auto-POST to prevent client overwrites)
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(MANDI_RATES_KEY, JSON.stringify(mandiRates));
    } catch (e) {}
  }, [mandiRates]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(storeSettings));
    } catch (e) {}
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(adminUsers));
    } catch (e) {}
  }, [adminUsers]);

  // Order Actions (Saved locally and immediately pushed to server backend)
  const addOrder = async (newOrder) => {
    setOrders(prev => {
      const updated = [newOrder, ...prev.filter(o => o.orderId !== newOrder.orderId)];
      try { localStorage.setItem(ORDERS_KEY, JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    try {
      await fetch(`/api/orders?t=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch (err) {
      console.warn('Failed to send order to server:', err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => {
      const updated = prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
      try { localStorage.setItem(ORDERS_KEY, JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    try {
      await fetch(`/api/orders/${orderId}?t=${Date.now()}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.warn('Failed to update order status on server:', err);
    }
  };

  const deleteOrder = async (orderId) => {
    setOrders(prev => {
      const updated = prev.filter(o => o.orderId !== orderId);
      try { localStorage.setItem(ORDERS_KEY, JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    try {
      await fetch(`/api/orders/${orderId}?t=${Date.now()}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Failed to delete order on server:', err);
    }
  };

  // Product Actions (Saved locally and pushed to server disk database)
  const updateProduct = async (productId, updatedFields) => {
    lastAdminMutationRef.current = Date.now();
    const current = (productsRef.current && productsRef.current.length > 0) ? productsRef.current : products;
    const nextList = current.map(p => p.id === productId ? { ...p, ...updatedFields } : p);
    productsRef.current = nextList;
    setProducts(nextList);
    try { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(nextList)); } catch (e) {}

    // 1. Sync full updated list to backend disk database
    await syncProductsToServer(nextList);

    // 2. Also send specific PATCH endpoint
    try {
      await fetch(`/api/products/${encodeURIComponent(productId)}?t=${Date.now()}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(updatedFields)
      });
    } catch (e) {}

    return nextList;
  };

  const addProduct = async (newProduct) => {
    lastAdminMutationRef.current = Date.now();
    const id = newProduct.id || `custom-${Date.now()}`;
    const item = {
      ...newProduct,
      id,
      inStock: true,
      rating: 5.0,
      reviewsCount: 1,
      weightOptions: newProduct.weightOptions || [{ label: newProduct.baseUnit || '1 kg', multiplier: 1, isDefault: true }]
    };
    const current = (productsRef.current && productsRef.current.length > 0) ? productsRef.current : products;
    const nextList = [item, ...current];
    productsRef.current = nextList;
    setProducts(nextList);
    try { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(nextList)); } catch (e) {}

    // 1. Sync full updated list to backend disk database
    await syncProductsToServer(nextList);

    return nextList;
  };

  const toggleProductStock = async (productId) => {
    lastAdminMutationRef.current = Date.now();
    const current = (productsRef.current && productsRef.current.length > 0) ? productsRef.current : products;
    let newInStock = true;
    const nextList = current.map(p => {
      if (p.id === productId) {
        newInStock = !p.inStock;
        return { ...p, inStock: newInStock };
      }
      return p;
    });
    productsRef.current = nextList;
    setProducts(nextList);
    try { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(nextList)); } catch (e) {}

    // 1. Sync full updated list to backend disk database
    await syncProductsToServer(nextList);

    // 2. Also send specific PATCH endpoint
    try {
      await fetch(`/api/products/${encodeURIComponent(productId)}?t=${Date.now()}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ inStock: newInStock })
      });
    } catch (e) {}

    return nextList;
  };

  const deleteProduct = async (productId) => {
    lastAdminMutationRef.current = Date.now();
    const current = (productsRef.current && productsRef.current.length > 0) ? productsRef.current : products;
    const nextList = current.filter(p => p.id !== productId);
    productsRef.current = nextList;
    setProducts(nextList);
    try { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(nextList)); } catch (e) {}

    // 1. Sync full updated list to backend disk database
    await syncProductsToServer(nextList);

    // 2. Also send specific DELETE endpoint
    try {
      await fetch(`/api/products/${encodeURIComponent(productId)}?t=${Date.now()}`, {
        method: 'DELETE',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
    } catch (e) {}

    return nextList;
  };

  const clearAllProducts = async () => {
    lastAdminMutationRef.current = Date.now();
    productsRef.current = [];
    setProducts([]);
    try { localStorage.setItem(PRODUCTS_KEY, JSON.stringify([])); } catch (e) {}
    await syncProductsToServer([]);
    return [];
  };

  const resetProductsToDefault = clearAllProducts;

  // Mandi Rate Actions (Saved locally and pushed to server disk database)
  const updateMandiRate = async (index, updatedRate) => {
    const updatedRates = [...mandiRates.rates];
    updatedRates[index] = { ...updatedRates[index], ...updatedRate };
    const updatedState = { ...mandiRates, rates: updatedRates };
    setMandiRates(updatedState);
    try { localStorage.setItem(MANDI_RATES_KEY, JSON.stringify(updatedState)); } catch (e) {}
    await syncMandiRatesToServer(updatedState);
    return updatedState;
  };

  const addMandiRate = async (newRate) => {
    const updatedState = {
      ...mandiRates,
      rates: [newRate, ...mandiRates.rates]
    };
    setMandiRates(updatedState);
    try { localStorage.setItem(MANDI_RATES_KEY, JSON.stringify(updatedState)); } catch (e) {}
    await syncMandiRatesToServer(updatedState);
    return updatedState;
  };

  const resetMandiRatesToDefault = async () => {
    setMandiRates(INITIAL_MANDI_RATES);
    try { localStorage.setItem(MANDI_RATES_KEY, JSON.stringify(INITIAL_MANDI_RATES)); } catch (e) {}
    await syncMandiRatesToServer(INITIAL_MANDI_RATES);
    return INITIAL_MANDI_RATES;
  };

  // Settings Actions (Saved locally and pushed to server disk database)
  const updateSettings = (newSettings) => {
    setStoreSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        }).catch(() => {});
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Admin User Actions
  const registerAdmin = (newUser) => {
    const id = `admin-${Date.now()}`;
    const user = {
      ...newUser,
      id,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setAdminUsers(prev => [...prev, user]);
    return user;
  };

  const updateAdminPassword = (usernameOrEmail, newPassword) => {
    setAdminUsers(prev =>
      prev.map(u => {
        const matchUser = u.username.toLowerCase() === usernameOrEmail.toLowerCase();
        const matchEmail = u.email && u.email.toLowerCase() === usernameOrEmail.toLowerCase();
        if (matchUser || matchEmail) {
          return { ...u, password: newPassword };
        }
        return u;
      })
    );
  };

  const deleteAdmin = (userId) => {
    setAdminUsers(prev => prev.filter(u => u.id !== userId));
  };

  return (
    <StoreContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        products,
        updateProduct,
        addProduct,
        toggleProductStock,
        deleteProduct,
        clearAllProducts,
        resetProductsToDefault,
        mandiRates,
        updateMandiRate,
        addMandiRate,
        resetMandiRatesToDefault,
        storeSettings,
        updateSettings,
        adminUsers,
        registerAdmin,
        updateAdminPassword,
        deleteAdmin
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    return {
      products: [],
      orders: [],
      mandiRates: [],
      addOrder: () => {},
      updateOrderStatus: () => {},
      deleteOrder: () => {},
      addProduct: () => {},
      updateProduct: () => {},
      deleteProduct: () => {},
      clearAllProducts: () => {},
      resetProductsToDefault: () => {},
      updateMandiRate: () => {},
      addMandiRate: () => {},
      resetMandiRatesToDefault: () => {},
      storeSettings: {},
      updateSettings: () => {},
      adminUsers: [],
      registerAdmin: () => {},
      updateAdminPassword: () => {},
      deleteAdmin: () => {}
    };
  }
  return context;
};

