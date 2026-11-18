'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  ShoppingBag, 
  PlusCircle, 
  Plane, 
  PackageCheck, 
  Menu, 
  X,
  Settings,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { settings, cartTotalCount, setIsCartOpen, setIsCustomModalOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full text-[11px] border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              PO AKTIF
            </span>
            <span className="text-slate-200 text-xs hidden sm:inline">
              🇨🇳 {settings.poTitle} — Kurs: <strong className="text-amber-400">1 CNY = Rp {settings.exchangeRateCNY.toLocaleString('id-ID')}</strong>
            </span>
            <span className="text-slate-300 text-xs sm:hidden">
              🇨🇳 {settings.poTitle}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <Plane className="w-3.5 h-3.5 text-indigo-400" />
              Est. Tiba: <strong className="text-white">{settings.estArrivalDate}</strong>
            </span>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              title="Mini Admin Dashboard"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Jastip<span className="text-indigo-600">OS</span>
                </span>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded-sm">
                  Yangzhou
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Jasa Titip China Terpercaya
              </p>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Beranda
            </Link>
            <a
              href="#katalog"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Katalog PO
            </a>
            <a
              href="#kalkulator"
              onClick={(e) => {
                e.preventDefault();
                setIsCustomModalOpen(true);
              }}
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Kalkulator Kurs
            </a>
            <Link
              href="/track"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              Lacak Pesanan
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Custom Request CTA */}
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Request Titip Custom</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              aria-label="Buka Keranjang"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="hidden sm:inline text-xs font-bold">Keranjang</span>
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:static sm:top-auto sm:right-auto bg-amber-500 text-slate-950 text-[11px] font-black w-5 h-5 sm:w-auto sm:h-auto sm:px-1.5 sm:py-0.5 rounded-full flex items-center justify-center animate-bounce">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
          >
            Beranda
          </Link>
          <a
            href="#katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
          >
            Katalog Produk PO
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCustomModalOpen(true);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-indigo-700 bg-indigo-50/70 flex items-center justify-between"
          >
            <span>+ Request Titip Custom (Taobao/1688)</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>
          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-emerald-700 bg-emerald-50/70"
          >
            🔍 Lacak Status Pesanan (Booking Code)
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-100"
          >
            ⚙️ Mini Admin View
          </Link>
        </div>
      )}
    </header>
  );
}
