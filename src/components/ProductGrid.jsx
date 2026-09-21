import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal, ArrowDownUp, SearchX, CheckCircle } from 'lucide-react';

export default function ProductGrid({
  products,
  selectedCategory,
  searchQuery,
  onResetFilters,
  onQuickView
}) {
  const [sortBy, setSortBy] = useState('featured');

  const currentCatObj = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category check
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // Search check
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(q) ||
        item.urduName.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    });
  }, [products, selectedCategory, searchQuery]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredProducts, sortBy]);

  return (
    <section className="w-full px-2 sm:px-4 lg:px-6 py-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
        
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : currentCatObj.name}
            </h2>
            <span className="text-sm font-urdu text-brand-700 font-bold">
              ({currentCatObj.urdu})
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing {sortedProducts.length} items • 100% Mandi Fresh & Digital Weighed
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-xs text-xs font-medium text-gray-700">
            <ArrowDownUp className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Engineer's Choice</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-5 mt-6">
          {sortedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">No Vegetables or Items Found</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            We couldn't find anything matching your search criteria. Try looking for common items like Aloo, Pyaz, Tamatar, or reset filters.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            Show All Produce
          </button>
        </div>
      )}

    </section>
  );
}

