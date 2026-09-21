import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { StoreProvider, useStore } from './context/StoreContext';
import TopAnnouncement from './components/TopAnnouncement';
import Navbar from './components/Navbar';
import { MandiRateTicker, MandiRatesModal } from './components/MandiRateTicker';
import HeroBanner from './components/HeroBanner';
import CategoryPills from './components/CategoryPills';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import TrustPillars from './components/TrustPillars';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import AdminPortal from './components/admin/AdminPortal';
import AdminLogin from './components/admin/AdminLogin';
import LocationModal from './components/LocationModal';

// Helper to map Mandi Rate item names to catalog products
const findProductForMandiItem = (mandiItemName, allProducts) => {
  if (!mandiItemName || !allProducts || allProducts.length === 0) return null;
  const cleanName = mandiItemName.toLowerCase();

  // 1. Direct includes
  const direct = allProducts.find(p =>
    cleanName.includes(p.name.toLowerCase()) ||
    p.name.toLowerCase().includes(cleanName.split(' ')[0]) ||
    (p.urduName && cleanName.includes(p.urduName))
  );
  if (direct) return direct;

  // 2. Keyword rules
  const rules = [
    { words: ['potato', 'aloo'], idMatch: 'potato' },
    { words: ['onion', 'pyaz'], idMatch: 'onion' },
    { words: ['tomato', 'tamatar'], idMatch: 'tomato' },
    { words: ['okra', 'bhindi', 'ladyfinger'], idMatch: 'okra' },
    { words: ['cauliflower', 'phool gobi', 'gobi'], idMatch: 'cauliflower' },
    { words: ['ginger', 'adrak'], idMatch: 'ginger' },
    { words: ['garlic', 'lehsan'], idMatch: 'garlic' },
    { words: ['chilli', 'mirch'], idMatch: 'chilli' },
    { words: ['cucumber', 'kheera'], idMatch: 'cucumber' },
    { words: ['karela', 'bitter gourd'], idMatch: 'bitter' },
    { words: ['eggplant', 'baingan'], idMatch: 'baingan' },
    { words: ['spinach', 'palak'], idMatch: 'spinach' },
    { words: ['methi', 'fenugreek'], idMatch: 'methi' },
    { words: ['mango', 'chaunsa'], idMatch: 'mango' },
    { words: ['kinnow', 'orange'], idMatch: 'kinnow' },
    { words: ['apple', 'saib'], idMatch: 'apple' },
    { words: ['capsicum', 'shimla'], idMatch: 'capsicum' },
    { words: ['cabbage', 'band gobi'], idMatch: 'cabbage' },
  ];

  for (const r of rules) {
    if (r.words.some(w => cleanName.includes(w))) {
      const match = allProducts.find(p => p.id.toLowerCase().includes(r.idMatch) || p.name.toLowerCase().includes(r.idMatch));
      if (match) return match;
    }
  }

  // Fallback: search by first word
  const firstWord = cleanName.split(/[\s(/)]+/)[0];
  const byFirstWord = allProducts.find(p => p.name.toLowerCase().includes(firstWord));
  if (byFirstWord) return byFirstWord;

  return allProducts[0];
};

function StoreApp() {
  const { products, addOrder } = useStore();
  const { addToCart, setIsCartOpen } = useCart();

  const [viewMode, setViewMode] = useState('store'); // 'store' | 'admin'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('esv_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMandiModalOpen, setIsMandiModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  const handleAdminLoginSuccess = (rememberMe) => {
    setIsAdminAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('esv_admin_auth', 'true');
    } else {
      localStorage.removeItem('esv_admin_auth');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('esv_admin_auth');
    setViewMode('store');
  };

  // Open item in ProductModal (Add to Cart window) from Mandi Rate
  const handleOpenProductFromMandi = (mandiItem) => {
    const itemName = typeof mandiItem === 'string' ? mandiItem : mandiItem?.item;
    const matched = findProductForMandiItem(itemName, products);
    if (matched) {
      setQuickViewProduct(matched);
    }
  };

  // Quick 1-click add to cart from Mandi Rate ticker
  const handleQuickAddFromMandi = (mandiItem) => {
    const itemName = typeof mandiItem === 'string' ? mandiItem : mandiItem?.item;
    const matched = findProductForMandiItem(itemName, products);
    if (matched) {
      const defaultWeight = matched.weightOptions?.find(w => w.isDefault) || matched.weightOptions?.[0] || { label: matched.baseUnit || '1 kg', multiplier: 1 };
      addToCart(matched, defaultWeight, 1);
      setIsCartOpen(true);
    }
  };

  const handleSelectProductByName = (itemName) => {
    const clean = itemName.split(' ')[0].toLowerCase();
    setSearchQuery(clean);
    setSelectedCategory('all');
    window.scrollTo({ top: 580, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderPlaced = (order) => {
    addOrder(order);
    setLastPlacedOrder(order);
  };

  // If Admin View is active and user is authenticated, render full Admin Portal
  if (viewMode === 'admin' && isAdminAuthenticated) {
    return <AdminPortal onExitAdmin={() => setViewMode('store')} onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-14 sm:pb-0">
      
      {/* 1. Top Announcement Bar with Admin shortcut */}
      <TopAnnouncement
        onOpenMandiModal={() => setIsMandiModalOpen(true)}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* 2. Main Navigation Bar with Admin shortcut */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenMandiModal={() => setIsMandiModalOpen(true)}
        onOpenAdmin={() => setViewMode('admin')}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Live Mandi Wholesale Rate Ticker (Animated with click to Add to Cart) */}
      <MandiRateTicker
        onOpenModal={() => setIsMandiModalOpen(true)}
        onSelectItem={handleOpenProductFromMandi}
        onQuickAddToCart={handleQuickAddFromMandi}
      />

      {/* 4. Hero Carousel Banner with value propositions */}
      <HeroBanner
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 560, behavior: 'smooth' });
        }}
        onOpenMandiModal={() => setIsMandiModalOpen(true)}
      />

      {/* 5. Sticky Category Navigation Bar */}
      <CategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 6. Filtered Produce & Grocery Catalog (Live synced with Admin changes) */}
      <main className="flex-1">
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onResetFilters={handleResetFilters}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />
      </main>

      {/* 7. Trust Pillars (100% Digital Weighing, 4 AM Procurement, Dirt-free Wash) */}
      <TrustPillars />

      {/* 8. Verified Reviews & FAQs */}
      <CustomerReviews />

      {/* 9. Rich Footer with Admin shortcut */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 560, behavior: 'smooth' });
        }}
        onOpenMandiModal={() => setIsMandiModalOpen(true)}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Modals and Slide-out Drawers */}
      <ProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <MandiRatesModal
        isOpen={isMandiModalOpen}
        onClose={() => setIsMandiModalOpen(false)}
        onSelectProductByName={handleOpenProductFromMandi}
      />

      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderSuccessModal
        isOpen={!!lastPlacedOrder}
        order={lastPlacedOrder}
        onClose={() => setLastPlacedOrder(null)}
      />

      {/* Customer Location Selector Modal (Auto-pops on open or manual trigger) */}
      <LocationModal />

      {/* 10. Sticky Floating Actions (WhatsApp & Mobile Bar) */}
      <FloatingActions
        onOpenMandiModal={() => setIsMandiModalOpen(true)}
        onScrollToTop={handleScrollToTop}
      />

      {/* 11. Admin Login Gate Modal */}
      {viewMode === 'admin' && !isAdminAuthenticated && (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onClose={() => setViewMode('store')}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <StoreApp />
      </CartProvider>
    </StoreProvider>
  );
}
