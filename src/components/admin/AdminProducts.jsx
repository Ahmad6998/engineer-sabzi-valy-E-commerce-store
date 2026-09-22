import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Plus, Trash2, Edit2, Check, X, Star, ArrowUpDown, Image, Tag, Camera, Upload, UploadCloud, Sparkles, Info } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// Image compression helper for clean, fast base64 storage
const compressImageFile = (file, maxWidth = 600, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch (err) {
          resolve(e.target.result);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// Upload image to server endpoint so it gets a public URL viewable by all devices
const uploadImageToServer = async (base64Data, produceName) => {
  if (!base64Data || !base64Data.startsWith('data:image/')) {
    return base64Data;
  }
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Data, name: produceName })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url) return data.url;
    }
  } catch (err) {
    console.warn('Server upload fallback:', err);
  }
  return base64Data;
};

export default function AdminProducts() {
  const { products, updateProduct, addProduct, deleteProduct, toggleProductStock } = useStore();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  // Full product edit modal state & save notifications
  const [editingProduct, setEditingProduct] = useState(null);
  const [saveToast, setSaveToast] = useState(null); // { message: string, type: string }
  const [showSaveInstructions, setShowSaveInstructions] = useState(true);

  // Picture upload modal state
  const [photoModalProduct, setPhotoModalProduct] = useState(null);
  const [tempPhotoPreview, setTempPhotoPreview] = useState('');
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState('');

  // Badge inline editing state
  const [editingBadgeId, setEditingBadgeId] = useState(null);
  const [badgeMode, setBadgeMode] = useState('percent'); // 'percent' | 'preset' | 'custom' | 'none'
  const [badgePercent, setBadgePercent] = useState('22');
  const [presetBadge, setPresetBadge] = useState('Mandi Direct');
  const [customBadgeText, setCustomBadgeText] = useState('');

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    urduName: '',
    category: 'vegetables',
    basePrice: '',
    originalPrice: '',
    baseUnit: '1 kg',
    mandiGrade: 'Grade A+ Farm Fresh',
    badge: 'Mandi Direct',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: '',
    nutrition: ''
  });

  const extractPercentFromBadge = (badge) => {
    if (!badge) return 22;
    const match = badge.match(/(\d+)\s*%/);
    return match ? parseInt(match[1], 10) : 22;
  };

  const handleStartEditBadge = (product) => {
    setEditingBadgeId(product.id);
    const currentBadge = product.badge || '';
    if (currentBadge.toLowerCase().includes('%') || currentBadge.toLowerCase().startsWith('save')) {
      setBadgeMode('percent');
      setBadgePercent(extractPercentFromBadge(currentBadge).toString());
      setCustomBadgeText('');
    } else if (['Mandi Direct', 'Today Special', 'Bestseller', 'King of Fruits', 'Essential', 'Fresh Harvest'].includes(currentBadge)) {
      setBadgeMode('preset');
      setPresetBadge(currentBadge);
      setBadgePercent('22');
      setCustomBadgeText('');
    } else if (currentBadge) {
      setBadgeMode('custom');
      setCustomBadgeText(currentBadge);
      setBadgePercent('22');
    } else {
      setBadgeMode('percent');
      setBadgePercent('22');
      setCustomBadgeText('');
    }
  };

  const handleSaveBadge = async (productId, basePrice) => {
    let finalBadge = null;
    let newOriginalPrice = undefined;

    if (badgeMode === 'percent') {
      const parsedPct = parseInt(badgePercent, 10);
      if (!isNaN(parsedPct) && parsedPct > 0) {
        finalBadge = `Save ${parsedPct}%`;
        newOriginalPrice = Math.round(basePrice / (1 - parsedPct / 100));
      }
    } else if (badgeMode === 'preset') {
      finalBadge = presetBadge;
    } else if (badgeMode === 'custom') {
      finalBadge = customBadgeText.trim() || null;
    } else if (badgeMode === 'none') {
      finalBadge = null;
    }

    const updates = { badge: finalBadge };
    if (newOriginalPrice !== undefined) {
      updates.originalPrice = newOriginalPrice;
    }

    await updateProduct(productId, updates);
    setEditingBadgeId(null);
    triggerSaveToast(`✓ Badge updated & saved to backend for this product.`);
  };

  const triggerSaveToast = (message, type = 'success') => {
    setSaveToast({ message, type });
    setTimeout(() => {
      setSaveToast(null);
    }, 4500);
  };

  // 1. Open photo upload modal for an existing product
  const handleOpenPhotoModal = (product) => {
    setPhotoModalProduct(product);
    setTempPhotoPreview(product.image);
    setPhotoError('');
  };

  // 2. Handle file selection & compression for existing product
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsPhotoUploading(true);
      setPhotoError('');
      const compressedData = await compressImageFile(file);
      const serverUrl = await uploadImageToServer(compressedData, photoModalProduct?.name || 'produce');
      setTempPhotoPreview(serverUrl);
      setIsPhotoUploading(false);
    } catch (err) {
      setPhotoError('Failed to process image. Please try another image file.');
      setIsPhotoUploading(false);
    }
  };

  // 3. Save new photo to product
  const handleSavePhoto = async () => {
    if (!photoModalProduct) return;
    const finalImage = tempPhotoPreview || photoModalProduct.image;
    await updateProduct(photoModalProduct.id, { image: finalImage });
    triggerSaveToast(`✓ Picture updated & saved to backend for "${photoModalProduct.name}".`);
    setPhotoModalProduct(null);
  };

  // 4. Handle file selection & compression for Add New Product modal
  const handleNewProductFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      const serverUrl = await uploadImageToServer(compressed, newProduct.name || 'produce');
      setNewProduct((prev) => ({ ...prev, image: serverUrl }));
    } catch (err) {
      alert('Could not process image file. Please try another image.');
    }
  };

  // 5. Full Product Edit Handlers
  const handleStartEditProduct = (product) => {
    setEditingProduct({
      ...product,
      originalPrice: product.originalPrice || '',
      description: product.description || '',
      nutrition: product.nutrition || '',
      badge: product.badge || 'Mandi Direct',
      baseUnit: product.baseUnit || '1 kg',
      mandiGrade: product.mandiGrade || 'Grade A+ Farm Fresh'
    });
  };

  const handleEditProductFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      const serverUrl = await uploadImageToServer(compressed, editingProduct?.name || 'produce');
      setEditingProduct(prev => ({ ...prev, image: serverUrl }));
    } catch (err) {
      alert('Could not process image file. Please try another image.');
    }
  };

  const handleSaveEditedProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const basePriceNum = parseInt(editingProduct.basePrice, 10) || 0;
    const originalPriceNum = editingProduct.originalPrice ? parseInt(editingProduct.originalPrice, 10) : null;
    const finalName = editingProduct.name.trim();

    const updatedData = {
      name: finalName,
      urduName: editingProduct.urduName?.trim() || '',
      category: editingProduct.category,
      basePrice: basePriceNum,
      originalPrice: originalPriceNum,
      baseUnit: editingProduct.baseUnit.trim() || '1 kg',
      mandiGrade: editingProduct.mandiGrade.trim() || 'Grade A+ Farm Fresh',
      badge: editingProduct.badge?.trim() || null,
      image: editingProduct.image,
      description: editingProduct.description?.trim() || '',
      nutrition: editingProduct.nutrition?.trim() || '',
      inStock: editingProduct.inStock ?? true,
      weightOptions: editingProduct.weightOptions?.length ? editingProduct.weightOptions : [
        { label: editingProduct.baseUnit || '1 kg', multiplier: 1, isDefault: true }
      ]
    };

    await updateProduct(editingProduct.id, updatedData);
    setEditingProduct(null);
    triggerSaveToast(`✓ "${finalName}" saved to backend! Changes live on customer devices.`);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.urduName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleStartEditPrice = (product) => {
    setEditingPriceId(product.id);
    setTempPrice(product.basePrice.toString());
  };

  const handleSavePrice = async (productId) => {
    const parsed = parseInt(tempPrice, 10);
    if (!isNaN(parsed) && parsed > 0) {
      await updateProduct(productId, { basePrice: parsed });
      triggerSaveToast(`✓ Price updated to Rs. ${parsed} and saved to backend.`);
    }
    setEditingPriceId(null);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.basePrice) return;

    const createdName = newProduct.name.trim();

    await addProduct({
      ...newProduct,
      name: createdName,
      basePrice: parseInt(newProduct.basePrice, 10),
      originalPrice: newProduct.originalPrice ? parseInt(newProduct.originalPrice, 10) : null,
      weightOptions: [
        { label: newProduct.baseUnit || '1 kg', multiplier: 1, isDefault: true },
        { label: '2 kg', multiplier: 1.9 }
      ]
    });

    setIsAddModalOpen(false);
    triggerSaveToast(`✓ "${createdName}" added to catalog and saved to backend.`);
    setNewProduct({
      name: '',
      urduName: '',
      category: 'vegetables',
      basePrice: '',
      originalPrice: '',
      baseUnit: '1 kg',
      mandiGrade: 'Grade A+ Farm Fresh',
      badge: 'Mandi Direct',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      description: '',
      nutrition: ''
    });

    triggerSaveToast(`✓ "${createdName}" published & saved! Now available to customers.`);
  };

  return (
    <div className="space-y-5 relative">

      {/* Floating Save Confirmation Toast */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500 text-xs font-bold">
            <Check className="w-4 h-4 text-emerald-300" />
            <span>{saveToast.message}</span>
          </div>
        </div>
      )}
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Produce & Inventory Manager
          </h1>
          <p className="text-xs text-gray-500">
            {products.length} total items in catalog • Edit all details, toggle stock, and publish new harvest
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Save Instructions & Guide Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-emerald-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-brand-800/80">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-accent-amber" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Product Add & Edit — Save Instructions (پروڈکٹس محفوظ کرنے کی ہدایات)</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  Auto-Save Active
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                All changes, prices, and additions are saved automatically in real-time and go live on the customer store instantly.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSaveInstructions(!showSaveInstructions)}
            className="text-xs text-brand-300 hover:text-white underline underline-offset-2 shrink-0 font-bold cursor-pointer"
          >
            {showSaveInstructions ? 'Hide Guide ▲' : 'View Instructions ▼'}
          </button>
        </div>

        {showSaveInstructions && (
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="font-bold text-brand-400 block mb-1">1. Add New Produce</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Click <strong>"+ Add New Item"</strong> at the top. Enter English & Urdu names, selling price, unit, upload a picture from your device, and click <strong>"Publish to Catalog"</strong>. It saves immediately!
              </p>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="font-bold text-brand-400 block mb-1">2. Edit Any Product</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Click the <strong>"✏️ Edit"</strong> button on any item to update its title, category, price, discount badge, or storage instructions. Click <strong>"Save Changes"</strong> to update instantly.
              </p>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="font-bold text-brand-400 block mb-1">3. Live Backend & Device Sync</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Every edit and picture upload is saved directly to the backend database server (`server/data/products.json`). All customer mobile phones and computers receive updates live without losing data.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search produce name or Urdu..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Produce</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Base Unit</th>
                <th className="py-3 px-4">Selling Price (PKR)</th>
                <th className="py-3 px-4">Badge</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-500">
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
                        <Plus className="w-7 h-7" />
                      </div>
                      <h4 className="font-black text-gray-800 text-sm">Produce Catalog is Empty</h4>
                      <p className="text-xs text-gray-400">
                        No produce items in catalog yet. Click "+ Add New Item" above to add your fresh produce!
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Produce Item</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                const isEditingPrice = editingPriceId === p.id;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* Produce image & names */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {/* Interactive Photo Thumbnail */}
                        <div
                          onClick={() => handleOpenPhotoModal(p)}
                          className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shrink-0 group/photo cursor-pointer shadow-xs bg-gray-100"
                          title="Click to upload or change picture"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Camera className="w-4 h-4 drop-shadow-md" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleStartEditProduct(p)}
                              className="font-bold text-gray-900 text-xs text-left hover:text-brand-600 hover:underline transition-colors cursor-pointer"
                              title="Click to edit all product details"
                            >
                              {p.name}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenPhotoModal(p)}
                              className="text-[10px] text-brand-700 hover:text-brand-900 hover:underline flex items-center gap-0.5 opacity-70 hover:opacity-100 cursor-pointer"
                              title="Upload/change picture"
                            >
                              <Camera className="w-2.5 h-2.5" />
                              <span className="hidden sm:inline">Photo</span>
                            </button>
                          </div>
                          <span className="text-[11px] font-bold text-brand-800 font-urdu block">
                            {p.urduName}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {p.mandiGrade}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-semibold uppercase">
                        {p.category}
                      </span>
                    </td>

                    {/* Base Unit */}
                    <td className="py-3 px-4 font-semibold text-gray-600">
                      {p.baseUnit}
                    </td>

                    {/* Price with Inline Edit */}
                    <td className="py-3 px-4">
                      {isEditingPrice ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            className="w-20 px-2 py-1 text-xs border border-brand-500 rounded-lg focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePrice(p.id)}
                            className="p-1 bg-brand-600 text-white rounded-md hover:bg-brand-700 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingPriceId(null)}
                            className="p-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEditPrice(p)}
                          className="flex items-center gap-1.5 font-bold text-sm text-brand-700 hover:text-brand-800 hover:bg-brand-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          title="Click to edit price"
                        >
                          <span>Rs. {p.basePrice}</span>
                          <Edit2 className="w-3 h-3 opacity-50" />
                        </button>
                      )}
                    </td>

                    {/* Badge Column (Clickable & Percentage Editable) */}
                    <td className="py-3 px-4">
                      {editingBadgeId === p.id ? (
                        <div className="flex flex-col gap-2 p-2.5 bg-slate-50 border border-brand-400 rounded-2xl shadow-lg min-w-[240px] max-w-[280px] animate-fadeIn z-20 relative">
                          <div className="flex items-center justify-between gap-1 border-b border-gray-200 pb-1.5">
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
                              <Tag className="w-3 h-3 text-brand-600" />
                              Edit Badge
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleSaveBadge(p.id, p.basePrice)}
                                className="px-2 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
                                title="Save badge and percentage"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Save</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingBadgeId(null)}
                                className="p-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs cursor-pointer"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Badge Type Selector */}
                          <div>
                            <select
                              value={badgeMode}
                              onChange={(e) => setBadgeMode(e.target.value)}
                              className="w-full text-[11px] font-bold px-2 py-1 rounded-xl border border-gray-300 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                              <option value="percent">🏷️ Discount % (Save X%)</option>
                              <option value="preset">⚡ Standard Preset Badge</option>
                              <option value="custom">✍️ Custom Text Badge</option>
                              <option value="none">🚫 No Badge (Remove)</option>
                            </select>
                          </div>

                          {/* 1. PERCENTAGE MODE - USER CAN EDIT THE EXACT PERCENTAGE NUMBER */}
                          {badgeMode === 'percent' && (
                            <div className="space-y-2 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold text-emerald-900">
                                  Discount:
                                </span>
                                <div className="flex items-center gap-1 bg-white border border-emerald-400 rounded-lg px-2 py-1 shadow-inner">
                                  <span className="text-gray-600 font-bold text-xs">Save</span>
                                  <input
                                    type="number"
                                    min="1"
                                    max="99"
                                    value={badgePercent}
                                    onChange={(e) => setBadgePercent(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSaveBadge(p.id, p.basePrice);
                                      if (e.key === 'Escape') setEditingBadgeId(null);
                                    }}
                                    className="w-12 text-center font-black text-brand-700 text-sm bg-transparent focus:outline-none"
                                    autoFocus
                                  />
                                  <span className="text-gray-600 font-bold text-xs">%</span>
                                </div>
                              </div>

                              {/* Quick Click Percentage Pills */}
                              <div className="flex items-center justify-between gap-1 pt-0.5">
                                {[10, 15, 20, 22, 25, 30].map((pct) => (
                                  <button
                                    key={pct}
                                    type="button"
                                    onClick={() => setBadgePercent(pct.toString())}
                                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                                      badgePercent === pct.toString()
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : 'bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    }`}
                                  >
                                    {pct}%
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 2. PRESET BADGE MODE */}
                          {badgeMode === 'preset' && (
                            <div>
                              <select
                                value={presetBadge}
                                onChange={(e) => setPresetBadge(e.target.value)}
                                className="w-full text-[11px] font-bold px-2 py-1.5 rounded-xl border border-gray-300 bg-white cursor-pointer"
                              >
                                <option value="Mandi Direct">Mandi Direct</option>
                                <option value="Today Special">Today Special</option>
                                <option value="Bestseller">Bestseller</option>
                                <option value="King of Fruits">King of Fruits</option>
                                <option value="Essential">Essential</option>
                                <option value="Fresh Harvest">Fresh Harvest</option>
                              </select>
                            </div>
                          )}

                          {/* 3. CUSTOM BADGE TEXT MODE */}
                          {badgeMode === 'custom' && (
                            <div>
                              <input
                                type="text"
                                value={customBadgeText}
                                onChange={(e) => setCustomBadgeText(e.target.value)}
                                placeholder="e.g. Weekend Mega Deal"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveBadge(p.id, p.basePrice);
                                  if (e.key === 'Escape') setEditingBadgeId(null);
                                }}
                                className="w-full px-2.5 py-1.5 text-xs border border-brand-500 rounded-xl focus:outline-none bg-white font-bold"
                                autoFocus
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Default Badge Display (Clickable to edit percentage/badge) */
                        <button
                          type="button"
                          onClick={() => handleStartEditBadge(p)}
                          className={`group/badge flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border ${
                            p.badge
                              ? p.badge.toLowerCase().includes('%') || p.badge.toLowerCase().startsWith('save')
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                                : p.badge === 'Mandi Direct'
                                ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
                                : p.badge === 'Today Special' || p.badge === 'Bestseller'
                                ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-500 border-dashed border-gray-300'
                          }`}
                          title="Click on badge to edit percentage or change badge"
                        >
                          {p.badge ? (
                            <>
                              <Tag className="w-3 h-3 shrink-0 opacity-70" />
                              <span>{p.badge}</span>
                              <Edit2 className="w-3 h-3 opacity-40 group-hover/badge:opacity-100 text-brand-700 ml-0.5 transition-opacity" />
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3 text-gray-400" />
                              <span className="text-[11px] font-medium text-gray-500">None</span>
                            </>
                          )}
                        </button>
                      )}
                    </td>

                    {/* Stock Status Toggle */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={async () => {
                          await toggleProductStock(p.id);
                          triggerSaveToast(`✓ "${p.name}" marked as ${!p.inStock ? 'In Stock' : 'Out of Stock'} on backend.`);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          p.inStock
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {p.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEditProduct(p)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 hover:text-brand-900 border border-brand-200 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
                          title={`Edit all details of ${p.name}`}
                        >
                          <Edit2 className="w-3 h-3 text-brand-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (window.confirm(`Delete ${p.name}? This will remove it from the store.`)) {
                              await deleteProduct(p.id);
                              triggerSaveToast(`🗑️ "${p.name}" deleted from store and backend.`);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-lg font-black text-white">Add New Produce Item</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Save Instruction Notice */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Save Instruction:</strong> Clicking <strong>"Publish to Catalog"</strong> will instantly save this produce item to your store database and make it live for customers immediately.
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Fresh Green Capsicum"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Urdu Name (نام اردو میں)
                  </label>
                  <input
                    type="text"
                    value={newProduct.urduName}
                    onChange={(e) => setNewProduct({ ...newProduct, urduName: e.target.value })}
                    placeholder="e.g. تازہ شملہ مرچ"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-right font-urdu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="vegetables">Fresh Vegetables</option>
                    <option value="greens">Leafy Greens & Herbs</option>
                    <option value="fruits">Seasonal Fruits</option>
                    <option value="aromatics">Aromatics & Masalay</option>
                    <option value="bundles">Bachat Bundles</option>
                    <option value="dryfruits">Dry Fruits & Honey</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Selling Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.basePrice}
                    onChange={(e) => setNewProduct({ ...newProduct, basePrice: e.target.value })}
                    placeholder="150"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Base Unit
                  </label>
                  <input
                    type="text"
                    value={newProduct.baseUnit}
                    onChange={(e) => setNewProduct({ ...newProduct, baseUnit: e.target.value })}
                    placeholder="1 kg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Produce Picture Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 block">
                    Produce Picture *
                  </label>
                  <span className="text-[10px] text-gray-400">
                    Upload from device
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  {/* Preview box */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 shadow-xs">
                    {newProduct.image ? (
                      <img
                        src={newProduct.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Upload button */}
                  <div className="flex-1">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95">
                      <UploadCloud className="w-4 h-4 text-brand-600" />
                      <span>Upload Picture from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewProductFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Description & Storage / Cooking Instructions
                </label>
                <textarea
                  rows="2"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Directly sourced at 4:30 AM from wholesale mandi, digitally weighed..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Publish to Catalog & Save
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-brand-950 to-emerald-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider">
                  Edit Produce Item
                </span>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>{editingProduct.name}</span>
                  {editingProduct.urduName && (
                    <span className="font-urdu text-brand-300 text-sm">({editingProduct.urduName})</span>
                  )}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEditedProduct} className="p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Save Instruction Notice */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Save Instruction:</strong> Any changes made here will save instantly upon clicking <strong>"Save Changes & Update Store"</strong> and go live immediately.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Urdu Name (نام اردو میں)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.urduName}
                    onChange={(e) => setEditingProduct({ ...editingProduct, urduName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-right font-urdu font-bold text-brand-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-gray-800"
                  >
                    <option value="vegetables">Fresh Vegetables</option>
                    <option value="greens">Leafy Greens & Herbs</option>
                    <option value="fruits">Seasonal Fruits</option>
                    <option value="aromatics">Aromatics & Masalay</option>
                    <option value="bundles">Bachat Bundles</option>
                    <option value="dryfruits">Dry Fruits & Honey</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Selling Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.basePrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-black text-brand-700 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Original Price (Cut Rate)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })}
                    placeholder="e.g. 190"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Base Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.baseUnit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, baseUnit: e.target.value })}
                    placeholder="e.g. 1 kg, 500 g, 1 dozen"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Mandi Grade
                  </label>
                  <input
                    type="text"
                    value={editingProduct.mandiGrade}
                    onChange={(e) => setEditingProduct({ ...editingProduct, mandiGrade: e.target.value })}
                    placeholder="e.g. Grade A+ Farm Fresh"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    placeholder="e.g. Save 20%, Mandi Direct"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                  />
                </div>
              </div>

              {/* Picture Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 block">
                    Produce Picture
                  </label>
                  <span className="text-[10px] text-gray-400">
                    Upload from device
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 shadow-xs">
                    {editingProduct.image ? (
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95">
                      <UploadCloud className="w-4 h-4 text-brand-600" />
                      <span>Upload New Picture from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditProductFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Description & Preparation / Storage Instructions */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Description & Storage / Cooking Instructions
                </label>
                <textarea
                  rows="2"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Special instructions, storage tips, or harvest details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Stock Status Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <span className="font-bold text-gray-800 block text-xs">Availability Status</span>
                  <span className="text-[11px] text-gray-500">Customers can order when in stock</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProduct({ ...editingProduct, inStock: !editingProduct.inStock })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    editingProduct.inStock
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-red-500 text-white shadow-xs'
                  }`}
                >
                  {editingProduct.inStock ? '✓ Available (In Stock)' : '✕ Out of Stock'}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-600/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes & Update Store</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Upload / Change Produce Picture Modal */}
      {photoModalProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-brand-950 to-emerald-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider">
                  Update Produce Photo
                </span>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>{photoModalProduct.name}</span>
                  <span className="font-urdu text-brand-300 text-sm">({photoModalProduct.urduName})</span>
                </h3>
              </div>
              <button
                onClick={() => setPhotoModalProduct(null)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              
              {photoError && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                  {photoError}
                </div>
              )}

              {/* Photo Preview Box */}
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center group shadow-inner">
                <img
                  src={tempPhotoPreview}
                  alt="Produce Preview"
                  className="w-full h-full object-cover"
                />
                {isPhotoUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                    Optimizing picture...
                  </div>
                )}
              </div>

              {/* Upload File Input */}
              <div>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-brand-300 hover:border-brand-500 rounded-2xl bg-brand-50/50 hover:bg-brand-50 transition-colors cursor-pointer text-center">
                  <UploadCloud className="w-8 h-8 text-brand-600 mb-1.5" />
                  <span className="text-xs font-bold text-gray-800">
                    Click to choose picture from computer / mobile
                  </span>
                  <span className="text-[10px] text-gray-500 mt-0.5">
                    Supports JPG, PNG, WebP (Automatically compressed & saved)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setPhotoModalProduct(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  disabled={isPhotoUploading}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Picture</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

