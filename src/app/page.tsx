'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CustomRequestModal from '@/components/CustomRequestModal';
import CartDrawer from '@/components/CartDrawer';
import TrustBadges from '@/components/TrustBadges';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { ProductCategory } from '@/types';
import { 
  Search, 
  Sparkles, 
  PlusCircle, 
  ArrowUpDown, 
  PackageSearch,
  Calculator
} from 'lucide-react';

const CATEGORIES: ProductCategory[] = [
  'Semua',
  'Skincare',
  'Fashion',
  'Snack',
  'Elektronik & Merch',
  'Aksesoris',
];

export default function HomePage() {
  const { products, settings, setIsCustomModalOpen, formatIDR } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
        const matchSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.originStore && p.originStore.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchCategory && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceCNY - b.priceCNY;
        if (sortBy === 'price-desc') return b.priceCNY - a.priceCNY;
        // popular first
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Open PO & Countdown */}
        <HeroSection />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Embedded Mini Calculator Banner */}
        <section id="kalkulator" className="py-10 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/15 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Calculator className="w-3.5 h-3.5" />
                  Kalkulator Jastip Mandiri
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Punya Link Barang Sendiri dari Taobao atau 1688?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  Cukup masukkan harga dalam mata uang asal (¥ CNY), sistem kami akan menghitung kurs hari ini (1 CNY = {formatIDR(settings.exchangeRateCNY)}) serta fee jastip {settings.feePercentage}% atau flat Rp25.000 secara transparan.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsCustomModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Buka Kalkulator & Request Titip</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="katalog" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Koleksi Pilihan Yangzhou
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {filteredProducts.length} Produk Tersedia
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Katalog Titipan Populer
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Barang original yang paling banyak dititip di batch ini. Bisa langsung dimasukkan ke keranjang belanja Anda.
              </p>
            </div>

            {/* Quick Request Button */}
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-indigo-500 text-slate-700 hover:text-indigo-600 text-xs font-bold transition-all shadow-2xs self-start md:self-auto cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Barang yang Anda cari tidak ada? Request di sini</span>
            </button>
          </div>

          {/* Filter & Search Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs mb-8 space-y-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Cari nama produk, brand (Pop Mart, Judydoll, Feiyue), atau store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0 font-medium">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Urutkan:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc')}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <PackageSearch className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Tidak ada produk yang cocok</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Coba kata kunci lain atau gunakan fitur Request Titip Custom untuk memesan produk apapun yang Anda inginkan dari China.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Bottom Custom Request Callout Banner */}
          <div className="mt-16 bg-gradient-to-r from-amber-50 via-indigo-50 to-amber-50 border-2 border-dashed border-indigo-200 rounded-3xl p-6 sm:p-8 text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Bisa Titip Apa Saja dari Seluruh China!
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Punya barang impian lain yang tidak ada di katalog?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Tim shopper kami di Yangzhou siap membelanjakan barang dari Taobao, 1688, Tmall, JD, Poizon, hingga offline store lokal Yangzhou.
            </p>
            <div>
              <button
                onClick={() => setIsCustomModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Input Request Titip Sekarang</span>
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <CustomRequestModal />
      <CartDrawer />
    </div>
  );
}
