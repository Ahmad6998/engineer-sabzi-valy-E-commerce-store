import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORE_SETTINGS } from '../data/areas';

const CartContext = createContext();

const STORAGE_KEY = 'engineer_sabzi_valy_cart_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  
  const [selectedArea, setSelectedArea] = useState(() => {
    try {
      return localStorage.getItem('esv_selected_area') || 'lhr-multan-road';
    } catch {
      return 'lhr-multan-road';
    }
  });

  const [orderType, setOrderType] = useState(() => {
    try {
      return localStorage.getItem('esv_order_type') || 'delivery';
    } catch {
      return 'delivery';
    }
  });

  // Location modal opens automatically when customer opens website
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(true);

  // Clear any legacy localStorage blocking key so modal always opens on fresh site visit
  useEffect(() => {
    try {
      localStorage.removeItem('esv_location_chosen');
    } catch (e) {
      // ignore
    }
  }, []);

  const confirmLocation = (areaId, type = 'delivery') => {
    setSelectedArea(areaId);
    setOrderType(type);
    try {
      localStorage.setItem('esv_selected_area', areaId);
      localStorage.setItem('esv_order_type', type);
    } catch (e) {
      console.error('Failed to save location choice', e);
    }
    setIsLocationModalOpen(false);
  };

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('slot-morning');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart storage', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedWeight, quantity = 1) => {
    const weight = selectedWeight || product.weightOptions?.[0] || { label: product.baseUnit, multiplier: 1 };
    const cartKey = `${product.id}__${weight.label}`;
    const unitPrice = Math.round(product.basePrice * (weight.multiplier || 1));

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartKey,
            productId: product.id,
            name: product.name,
            urduName: product.urduName,
            image: product.image,
            baseUnit: product.baseUnit,
            weightLabel: weight.label,
            unitPrice,
            quantity,
            mandiGrade: product.mandiGrade
          }
        ];
      }
    });
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartKey === cartKey ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ENGINEER10') {
      setAppliedCoupon({ code: 'ENGINEER10', percent: 10, label: '10% Engineer Welcome Bachat' });
      setCouponError('');
      return true;
    } else if (cleanCode === 'FREEDEL') {
      setAppliedCoupon({ code: 'FREEDEL', freeShipping: true, label: 'Free Express Shipping' });
      setCouponError('');
      return true;
    } else if (cleanCode === 'MANDI50') {
      setAppliedCoupon({ code: 'MANDI50', flatDiscount: 50, label: 'Rs. 50 Mandi Flat Discount' });
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try ENGINEER10');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon?.percent) {
    discountAmount = Math.round((subtotal * appliedCoupon.percent) / 100);
  } else if (appliedCoupon?.flatDiscount) {
    discountAmount = Math.min(subtotal, appliedCoupon.flatDiscount);
  }

  const isFreeDeliveryQualified = subtotal >= STORE_SETTINGS.freeDeliveryThreshold || appliedCoupon?.freeShipping;
  const isExpressSelected = selectedTimeSlot === 'slot-express';
  
  let deliveryFee = 0;
  if (subtotal > 0) {
    if (isExpressSelected) {
      deliveryFee = STORE_SETTINGS.expressDeliveryFee;
    } else {
      deliveryFee = isFreeDeliveryQualified ? 0 : STORE_SETTINGS.standardDeliveryFee;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const amountNeededForFree = Math.max(0, STORE_SETTINGS.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / STORE_SETTINGS.freeDeliveryThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        deliveryFee,
        grandTotal,
        totalItemCount,
        amountNeededForFree,
        freeDeliveryProgress,
        isFreeDeliveryQualified,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponError,
        selectedArea,
        setSelectedArea,
        orderType,
        setOrderType,
        isLocationModalOpen,
        setIsLocationModalOpen,
        confirmLocation,
        selectedTimeSlot,
        setSelectedTimeSlot
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: [],
      addToCart: () => {},
      updateQuantity: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      subtotal: 0,
      discountAmount: 0,
      deliveryFee: 0,
      grandTotal: 0,
      totalItemCount: 0,
      amountNeededForFree: 0,
      freeDeliveryProgress: 0,
      isFreeDeliveryQualified: false,
      appliedCoupon: null,
      applyCoupon: () => {},
      removeCoupon: () => {},
      couponError: '',
      isCartOpen: false,
      setIsCartOpen: () => {},
      selectedArea: 'lhr-multan-road',
      setSelectedArea: () => {},
      orderType: 'delivery',
      setOrderType: () => {},
      isLocationModalOpen: false,
      setIsLocationModalOpen: () => {},
      confirmLocation: () => {},
      selectedTimeSlot: 'slot-morning',
      setSelectedTimeSlot: () => {}
    };
  }
  return context;
};

