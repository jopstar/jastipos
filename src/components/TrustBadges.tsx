import React from 'react';
import { ShieldCheck, Receipt, Video, RotateCcw } from 'lucide-react';

export default function TrustBadges() {
  const perks = [
    {
      icon: ShieldCheck,
      title: '100% Original & Resmi',
      description: 'Barang dibeli langsung dari official flagship store di Yangzhou Wanda Plaza, Taobao Mall, atau Watsons China.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      icon: Receipt,
      title: 'Kurs Jujur & Transparan',
      description: 'Perhitungan kurs dan fee jastip dihitung terbuka sejak awal tanpa ada markup tersembunyi saat pelunasan.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Video,
      title: 'Live Shopping & Foto Struk',
      description: 'Update dokumentasi video saat tim belanja di Yangzhou dan foto struk fisik disertakan di dalam paket belanjaan.',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: RotateCcw,
      title: 'Garansi Refund 100%',
      description: 'Jika barang titipan Anda habis stok atau tidak dapat dibeli di China, uang DP dikembalikan penuh tanpa potongan.',
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${perk.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {perk.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
