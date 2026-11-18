'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import { 
  ShoppingBag, 
  Check, 
  Info, 
  MapPin, 
  Flame, 
  Plus, 
  Minus 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { calculatePrice, addToCart, formatIDR, formatCNY } = useStore();
  const [qty, setQty] = useState(1);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { rawIDR, feeIDR, finalPriceIDR } = calculatePrice(product.priceCNY);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      priceCNY: product.priceCNY,
      calculatedPriceIDR: finalPriceIDR,
      feeIDR,
      qty,
      image: product.image,
      weightGram: product.weightGram,
      isCustom: false,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 shadow-xs">
          {product.category}
        </span>
        {product.isPopular && (
          <span className="bg-amber-500 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            POPULER
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {product.originStore && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <MapPin className="w-3 h-3 text-indigo-500 shrink-0" />
              <span className="truncate">{product.originStore}</span>
            </div>
          )}

          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          {/* Dual Currency Display */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                Harga Final di RI
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {formatIDR(finalPriceIDR)}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Asli di China</span>
              <span className="text-xs sm:text-sm font-bold text-amber-600 font-mono bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {formatCNY(product.priceCNY)}
              </span>
            </div>
          </div>

          {/* Transparent Fee Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
            >
              <Info className="w-3 h-3" />
              <span>{showBreakdown ? 'Tutup Rincian Kurs & Fee' : 'Lihat Rincian Kurs & Fee'}</span>
            </button>

            {showBreakdown && (
              <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1 animate-fadeIn">
                <div className="flex justify-between">
                  <span>Harga Asli:</span>
                  <span className="font-mono">{formatCNY(product.priceCNY)} ({formatIDR(rawIDR)})</span>
                </div>
                <div className="flex justify-between text-indigo-700">
                  <span>Jastip Fee:</span>
                  <span className="font-mono font-medium">+ {formatIDR(feeIDR)}</span>
                </div>
                <div className="pt-1 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                  <span>Total Unit:</span>
                  <span className="font-mono">{formatIDR(finalPriceIDR)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Qty and Add to Cart Action */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 shrink-0">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Kurangi"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-slate-800 font-mono">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Tambah"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-indigo-600 text-white hover:shadow-md'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Dimasukkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>+ Keranjang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
