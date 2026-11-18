'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana alur dan sistem pemesanan Jastip Yangzhou?',
      a: 'Pilih barang dari katalog atau gunakan form "Request Titip Custom" untuk barang dari Taobao/1688. Masukkan ke keranjang, isi data diri, lalu kirim pesanan via WhatsApp. Admin akan memverifikasi DP 50% atau Pelunasan. Setelah itu, tim kami di Yangzhou akan membelanjakan barang dan Anda bisa memantau statusnya di halaman Lacak Status.',
    },
    {
      q: 'Apakah bisa bayar DP dulu atau harus langsung lunas?',
      a: 'Bisa banget! Anda bisa memilih opsi DP 50% saat checkout. Sisa pelunasan (50%) baru dibayarkan saat barang belanjaan Anda telah mendarat aman di Jakarta dan siap dikirim ke alamat rumah Anda.',
    },
    {
      q: 'Bagaimana jika barang yang saya titip kosong atau habis stok di China?',
      a: 'Kami memberikan jaminan garansi refund 100%! Jika barang yang Anda titip out of stock di seluruh offline store Yangzhou maupun official merchant online, dana DP akan langsung ditransfer kembali ke rekening Anda secara penuh tanpa potongan apapun.',
    },
    {
      q: 'Bagaimana cara menghitung estimasi harga jika saya punya link Taobao/1688 sendiri?',
      a: 'Cukup klik tombol "Request Titip Custom" di bagian atas atau hero banner. Masukkan harga dalam CNY (Yuan) dan link barangnya. Sistem kalkulator kami otomatis mengalikan dengan kurs hari ini dan menambahkan fee jastip transparan (10% atau flat Rp 25.000).',
    },
    {
      q: 'Berapa lama estimasi barang sampai di Indonesia?',
      a: 'Pengiriman dari Yangzhou menggunakan Air Cargo ekspres internasional. Estimasi tiba di Bandara Soekarno-Hatta berkisar 7-10 hari kerja setelah tanggal tutup PO. Setelah proses QC dan bea cukai bandara, paket langsung dikirimkan ke rumah Anda via JNE/SiCepat.',
    },
    {
      q: 'Apakah barang titipan aman dari risiko rusak atau penyok di perjalanan?',
      a: 'Semua barang belanjaan dipacking dengan standard proteksi tinggi menggunakan bubble wrap tebal dan box karton solid. Untuk barang rentan pecah atau box koleksi Pop Mart, tersedia opsi packing kayu dan hand-carry.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Semua hal yang perlu Anda ketahui tentang pemesanan, pembayaran, kurs, dan pengiriman jastip Yangzhou.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
