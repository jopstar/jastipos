export type ProductCategory = 'Semua' | 'Skincare' | 'Fashion' | 'Snack' | 'Elektronik & Merch' | 'Aksesoris';

export interface Product {
  id: string;
  name: string;
  category: 'Skincare' | 'Fashion' | 'Snack' | 'Elektronik & Merch' | 'Aksesoris';
  priceCNY: number;
  image: string;
  description: string;
  weightGram?: number;
  originStore?: string;
  isPopular?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  id: string;
  productId?: string;
  name: string;
  category: string;
  priceCNY: number;
  calculatedPriceIDR: number;
  feeIDR: number;
  qty: number;
  image?: string;
  notes?: string;
  refLink?: string;
  isCustom?: boolean;
  weightGram?: number;
}

export type OrderStatus =
  | 'MENUNGGU_KONFIRMASI'
  | 'BARANG_DIBELIKAN'
  | 'DALAM_PERJALANAN'
  | 'TIBA_DI_INDO'
  | 'DIKIRIM_KE_PEMBELI'
  | 'SELESAI'
  | 'DIBATALKAN';

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  title: string;
  description: string;
  location?: string;
}

export interface Order {
  bookingCode: string;
  customerName: string;
  whatsapp: string;
  address: string;
  city: string;
  postalCode?: string;
  courier: string;
  paymentType: 'DP_50' | 'LUNAS';
  items: CartItem[];
  subtotalItemsIDR: number;
  totalFeeIDR: number;
  grandTotalIDR: number;
  dpAmountIDR: number;
  remainingAmountIDR: number;
  status: OrderStatus;
  statusHistory: OrderStatusHistory[];
  trackingNumber?: string;
  createdAt: string;
  notes?: string;
}

export interface AppSettings {
  exchangeRateCNY: number; // e.g. 2300
  feePercentage: number;   // e.g. 10 (%)
  minFeeIDR: number;       // e.g. 25000
  poTitle: string;
  poSubtitle: string;
  poOrigin: string;        // e.g. Yangzhou, Jiangsu, China
  poCloseDate: string;     // ISO string
  estArrivalDate: string;  // e.g. "5 - 8 Desember 2026"
  estLocalShippingDate: string; // e.g. "9 - 11 Desember 2026"
  adminWhatsapp: string;   // e.g. "628980706665"
  totalLuggageQuotaKg: number;
  usedLuggageQuotaKg: number;
  notificationBanner?: string;
}
