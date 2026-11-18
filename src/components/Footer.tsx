import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Shield, MessageCircle, MapPin, Settings } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Jastip<span className="text-indigo-400">OS</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Platform Jasa Titip (Jastip) modern spesialis rute Yangzhou, China ke Indonesia. Amanah, transparan, dan terpercaya sejak 2022.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>Basecamp: Yangzhou, Jiangsu 🇨🇳 & Jakarta 🇮🇩</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Navigasi Cepat
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Beranda & Info PO
                </Link>
              </li>
              <li>
                <a href="#katalog" className="hover:text-amber-400 transition-colors">
                  Katalog Rekomendasi
                </a>
              </li>
              <li>
                <Link href="/track" className="hover:text-amber-400 transition-colors">
                  Lacak Kode Booking
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <Settings className="w-3 h-3" /> Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Kategori Titipan Populer
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>Blind Box & Vinyl Plush (Pop Mart / Chiikawa)</li>
              <li>C-Beauty Skincare & Makeup (Judydoll, Florasis)</li>
              <li>Streetwear & Sneakers (Feiyue, Urban Revivo)</li>
              <li>Snack Autentik & Bumbu Instan (Haidilao, Master Kong)</li>
            </ul>
          </div>

          {/* Security & Disclaimer */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Jaminan Keamanan
            </h5>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Semua titipan melalui pemeriksaan fisik barang dan lolos inspeksi bagasi resmi. Dana aman dengan sistem DP 50% dan garansi full refund jika barang kosong.
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-all text-[11px] font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Hubungi CS WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 JastipOS. Dibuat dengan cinta untuk para pecinta jastip luar negeri.</p>
          <div className="flex items-center gap-4">
            <Link href="/track" className="hover:underline">Lacak Status</Link>
            <Link href="/admin" className="hover:underline">Pengaturan Kurs / Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
