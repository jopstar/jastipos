'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  X, 
  Calculator, 
  ExternalLink, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  Info,
  CheckCircle2
} from 'lucide-react';

export default function CustomRequestModal() {
  const { 
    isCustomModalOpen, 
    setIsCustomModalOpen, 
    settings, 
    calculatePrice, 
    addToCart, 
    setIsCartOpen,
    formatIDR, 
    formatCNY 
  } = useStore();

  const [name, setName] = useState('');
  const [refLink, setRefLink] = useState('');
  const [category, setCategory] = useState<'Skincare' | 'Fashion' | 'Snack' | 'Elektronik & Merch' | 'Aksesoris'>('Elektronik & Merch');
  const [priceCNY, setPriceCNY] = useState<number | ''>(50);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isCustomModalOpen) return null;

  const numericPrice = typeof priceCNY === 'number' && priceCNY > 0 ? priceCNY : 0;
  const { rawIDR, feeIDR, finalPriceIDR } = calculatePrice(numericPrice);

  const totalRawIDR = rawIDR * qty;
  const totalFeeIDR = feeIDR * qty;
  const totalFinalPriceIDR = finalPriceIDR * qty;
  const estDP50 = Math.round(totalFinalPriceIDR / 2);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Silakan masukkan nama barang.');
      return;
    }
    if (numericPrice <= 0) {
      alert('Silakan masukkan estimasi harga CNY yang valid.');
      return;
    }

    addToCart({
      name: name.trim(),
      category,
      priceCNY: numericPrice,
      calculatedPriceIDR: finalPriceIDR,
      feeIDR,
      qty,
      notes: notes.trim(),
      refLink: refLink.trim(),
      isCustom: true,
    });

    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      setIsCustomModalOpen(false);
      setIsCartOpen(true);
      // Reset form
      setName('');
      setRefLink('');
      setNotes('');
      setPriceCNY(50);
      setQty(1);
    }, 900);
  };

  const handleConsultWA = () => {
    if (!name.trim()) {
      alert('Silakan masukkan nama barang terlebih dahulu.');
      return;
    }

    const message = `Halo Admin JastipOS! Mau tanya estimasi titip barang custom:
- Nama Barang: ${name}
- Link/Toko: ${refLink || 'Belum ada link / Titip offline di Yangzhou'}
- Estimasi Harga CNY: ¥${numericPrice}
- Jumlah: ${qty} pcs
- Varian/Catatan: ${notes || '-'}
- Estimasi Total: ${formatIDR(totalFinalPriceIDR)}

Apakah slot batch ini masih bisa? Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${settings.adminWhatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                Kalkulator & Request Titip Custom
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-300">
                Punya link Taobao, 1688, Poizon, atau titip barang mall di Yangzhou? Hitung estimasinya di sini!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {successNotice ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Berhasil Masuk Keranjang!</h3>
              <p className="text-sm text-slate-600">Membuka keranjang belanja Anda...</p>
            </div>
          ) : (
            <form onSubmit={handleAddToCart} className="space-y-5">
              {/* Info Kurs Banner */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Kurs Saat Ini:</span>
                  <span className="bg-amber-200/70 text-amber-950 font-bold px-2 py-0.5 rounded-md font-mono">
                    1 CNY = {formatIDR(settings.exchangeRateCNY)}
                  </span>
                </div>
                <div className="text-[11px] text-amber-800">
                  Fee: {settings.feePercentage}% (Min. {formatIDR(settings.minFeeIDR)})
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Barang <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pop Mart Hirono V8 / Sepatu Feiyue Hi-Top / Masker Winona"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Kategori Barang
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as 'Skincare' | 'Fashion' | 'Snack' | 'Elektronik & Merch' | 'Aksesoris')}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Elektronik & Merch">Elektronik & Merch</option>
                      <option value="Skincare">Skincare & Makeup</option>
                      <option value="Fashion">Fashion & Apparel</option>
                      <option value="Snack">Snack & Makanan Kering</option>
                      <option value="Aksesoris">Aksesoris & Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Link Referensi (Opsional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="Link Taobao / 1688 / Tmall / Poizon"
                        value={refLink}
                        onChange={(e) => setRefLink(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Price & Qty Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Harga Asli di China (CNY / Yuan ¥) <span className="text-red-500">*</span></span>
                      <span className="text-slate-500 text-[11px] font-normal">Mata uang CNY</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold">
                        ¥
                      </div>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        required
                        placeholder="Contoh: 89"
                        value={priceCNY}
                        onChange={(e) => setPriceCNY(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        className="w-full pl-9 pr-4 py-2.5 text-base font-semibold rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Jumlah (Qty)
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="p-2.5 text-slate-600 hover:bg-slate-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center bg-transparent text-sm font-bold focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setQty((q) => q + 1)}
                        className="p-2.5 text-slate-600 hover:bg-slate-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Varian & Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Catatan Spesifik / Varian (Warna, Size, Rasa, Opsi Packing)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Warna Navy size L, atau Varian Rasa Spicy Mala. Dus mohon jangan dilipat."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              {/* Rincian Live Calculation Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-2 border-b border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-indigo-400" />
                    Rincian Perhitungan Transparan
                  </span>
                  <span>1 CNY = {formatIDR(settings.exchangeRateCNY)}</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Harga Barang Asli:</span>
                    <span className="font-mono">
                      {formatCNY(numericPrice)} x {qty} = {formatIDR(totalRawIDR)}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1">
                      Fee Jastip:
                      <span className="text-[10px] text-slate-400">
                        ({settings.feePercentage}% atau min. {formatIDR(settings.minFeeIDR)})
                      </span>
                    </span>
                    <span className="font-mono text-amber-300 font-semibold">
                      + {formatIDR(totalFeeIDR)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/15 flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm sm:text-base">
                      Estimasi Total Akhir:
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-black text-amber-400">
                      {formatIDR(totalFinalPriceIDR)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-emerald-400 font-medium pt-1">
                    <span>Opsi DP 50% Saat Booking:</span>
                    <span className="font-mono font-bold">{formatIDR(estDP50)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Masukkan ke Keranjang Titipan</span>
                </button>

                <button
                  type="button"
                  onClick={handleConsultWA}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsul via WA</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
