import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'JastipOS - Jasa Titip Modern, Transparan & Terpercaya (China Yangzhou)',
  description: 'Aplikasi Jasa Titip (Jastip) resmi barang luar negeri. Hitung estimasi kurs transparan, titip custom link Taobao/1688, live tracking status dan checkout via WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col selection:bg-amber-100 selection:text-amber-900">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
