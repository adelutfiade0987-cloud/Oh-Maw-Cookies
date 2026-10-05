import { CookieProduct, PlacedOrder } from '../types/cookie';

export const OWNER_CONFIG = {
  phoneRaw: '+6281295713068',
  phoneWa: '6281295713068',
  phoneDisplay: '+62 812-9571-3068',
  kitchenAddress: 'Jl Sungai Bambu 2B, Tanjung Priok, Jakarta Utara',
  city: 'Jakarta Utara',
  adminPin: '1234',
  openingHours: '10:00 - 20:00 WIB',
};

export const COOKIE_PRODUCTS: CookieProduct[] = [
  {
    id: 'clasic',
    name: 'Clasic Cookie',
    subtitle: 'Dough cookie with dark choco inside and chocochip topping',
    price: 7000,
    isBestSeller: true,
    category: 'clasic',
    doughColor: '#DF9B52',
    accentColor: '#38220F',
    insideFilling: 'Melted Belgian Dark Chocolate lava',
    topping: 'Crunchy Dark Chocochip buttons',
    description: 'Varian signature legendaris dengan adonan butter lembut wangi vanila bourbon, diisi lelehan dark chocolate pekat di bagian dalam dan taburan dark chocochips renyah di atasnya.',
    tasteProfile: {
      sweetness: 3,
      richness: 4,
      gooeyness: 5,
    },
    ingredients: ['Anchor Pure Butter', 'Tepung Terigu Protein Sedang', 'Gula Tebu & Brown Sugar', 'Telur Segar', 'Dark Chocolate Callebaut 54%', 'Chocochip Premium', 'Ekstrak Vanila Murni'],
    allergens: ['Gluten', 'Susu / Dairy', 'Telur'],
    weightGrams: 75,
  },
  {
    id: 'kukimonster',
    name: 'Kuki Monster',
    subtitle: 'Dough blue cookie with darkchoco, gorio crumb inside and gorio topping',
    price: 7000,
    isBestSeller: true,
    category: 'monster',
    doughColor: '#0284C7',
    accentColor: '#1E293B',
    insideFilling: 'Gorio biscuit crumbs & melted dark chocolate chunks',
    topping: 'Whole mini dark Gorio cookie on top',
    description: 'Kuki monster biru ikonik yang playful dan crunchy! Dough biru renyah di luar chewy di dalam, diisi remahan biskuit gorio gurih dan dark choco meleleh, bertabur mahkota gorio mini di atasnya.',
    tasteProfile: {
      sweetness: 4,
      richness: 4,
      gooeyness: 4,
    },
    ingredients: ['Anchor Butter', 'Biskuit Gorio Hitam', 'Dark Chocolate Chunks', 'Blue Food Grade Color', 'Tepung Terigu', 'Gula Halus', 'Telur'],
    allergens: ['Gluten', 'Susu / Dairy', 'Telur', 'Kedelai'],
    weightGrams: 80,
  },
  {
    id: 'redvelvet',
    name: 'Red Velvet',
    subtitle: 'Dough red cookie with chesecream inside',
    price: 8000,
    isBestSeller: false,
    category: 'velvet',
    doughColor: '#DC2626',
    accentColor: '#FEF9C3',
    insideFilling: 'Rich velvety New Zealand cream cheese core',
    topping: 'Soft crinkle red velvet crust',
    description: 'Perpaduan sempurna antara rasa cocoa lembut khas red velvet dan sensasi gurih lumer dari isian cream cheese premium di tengahnya. Rasanya balance, mewah, dan tidak bikin enek.',
    tasteProfile: {
      sweetness: 3,
      richness: 5,
      gooeyness: 5,
    },
    ingredients: ['Anchor Butter', 'Cream Cheese New Zealand', 'Dutch Cocoa Powder', 'Red Velvet Puree', 'Tepung Terigu', 'Gula Pasir & Brown Sugar'],
    allergens: ['Gluten', 'Susu / Cream Cheese', 'Telur'],
    weightGrams: 80,
  },
  {
    id: 'double-choco',
    name: 'Double Choco',
    subtitle: 'Dough choco cookie with dark choco inside',
    price: 8000,
    isNew: true,
    category: 'choco',
    doughColor: '#451A03',
    accentColor: '#1C0A00',
    insideFilling: 'Ooey-gooey molten dark chocolate core',
    topping: 'Rich dark cocoa crackled crust',
    description: 'Surga bagi pecinta cokelat sejati! Adonan fudgy double dark cocoa yang pekat, dipanggang renyah berpadu dengan inti dark chocolate meleleh yang lumer seketika saat dihangatkan.',
    tasteProfile: {
      sweetness: 3,
      richness: 5,
      gooeyness: 5,
    },
    ingredients: ['Pure Dark Cocoa Powder 100%', 'Dark Couverture Chocolate 65%', 'Anchor Butter', 'Tepung Terigu', 'Brown Sugar Karamel'],
    allergens: ['Gluten', 'Susu / Dairy', 'Telur'],
    weightGrams: 80,
  },
  {
    id: 'matcha',
    name: 'Matcha',
    subtitle: 'Dough matcha cookie with matcha chocolate chunks inside',
    price: 9000,
    isNew: true,
    category: 'matcha',
    doughColor: '#65A30D',
    accentColor: '#365314',
    insideFilling: 'Creamy green tea matcha chocolate chunks',
    topping: 'Artisan cracked rustic matcha crust',
    description: 'Menggunakan bubuk green tea matcha murni dengan aroma earthy dan hint kepahitan lembut yang khas, diperkaya potongan matcha chocolate chunks lembut di dalamnya. Sangat pas dinikmati dengan susu hangat!',
    tasteProfile: {
      sweetness: 2,
      richness: 4,
      gooeyness: 4,
    },
    ingredients: ['Ceremonial Grade Matcha Powder', 'Matcha Chocolate Chunks', 'Anchor Butter', 'Tepung Terigu Premium', 'Gula Halus Murni'],
    allergens: ['Gluten', 'Susu / Dairy', 'Telur'],
    weightGrams: 80,
  },
];

export const TASTER_BOX_BUNDLE = {
  id: 'taster-box-5',
  name: 'Box of 5 (All-Star Taster Pack)',
  subtitle: '1x Clasic + 1x Kuki Monster + 1x Red Velvet + 1x Double Choco + 1x Matcha',
  originalPrice: 39000,
  price: 36000,
  savings: 3000,
  description: 'Paket komplit mencicipi kelima varian rasa Maw Cookies sekaligus. Dikemas dalam box eksklusif Maw Cookies lengkap dengan kartu petunjuk pemanasan & pita cantik.',
};

export const WARMING_TIPS = [
  {
    method: 'Microwave',
    time: '15 - 20 Detik',
    icon: 'Zap',
    instruction: 'Panaskan dengan daya sedang (medium) untuk hasil tengah cokelat lumer & lembut seperti baru keluar oven.',
  },
  {
    method: 'Airfryer / Oven',
    time: '3 - 4 Menit (160°C)',
    icon: 'Flame',
    instruction: 'Untuk hasil luar yang renyah (crispy outside) dan isian lava tetap super gooey di dalam.',
  },
  {
    method: 'Teflon Pan',
    time: '2 - 3 Menit Api Kecil',
    icon: 'Coffee',
    instruction: 'Tutup wajan teflon dengan api kecil tanpa minyak/mentega sampai bagian bawah hangat renyah.',
  },
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Nadia S.',
    rating: 5,
    flavor: 'Red Velvet & Kukimonster',
    comment: 'Cream cheese di red velvetnya melimpah banget dan gak pelit! Kukimonster anakku suka banget karena warnanya lucu dan gorio toppingnya renyah.',
    date: '2 hari yang lalu',
  },
  {
    id: 'rev-2',
    author: 'Dimas R.',
    rating: 5,
    flavor: 'Double Choco',
    comment: 'Double choco-nya bener-bener cokelat pekat gak kemanisan, begitu dipanasin microwave 15 detik cokelatnya langsung lumer. 10/10!',
    date: '3 hari yang lalu',
  },
  {
    id: 'rev-3',
    author: 'Citra A.',
    rating: 5,
    flavor: 'All-Star Box of 5',
    comment: 'Beli yang box isi 5 buat hampers temen kantor, packaging rapi bgt dapet pita sama warming card. Paling juara matchanya, wangi pol!',
    date: 'Minggu lalu',
  },
];

export interface MonthlySalesData {
  monthKey: string;
  monthName: string;
  year: number;
  revenue: number;
  buyersCount: number;
  cookiesSold: number;
  topFlavor: string;
}

export const HISTORICAL_MONTHLY_SALES: MonthlySalesData[] = [
  {
    monthKey: '2026-05',
    monthName: 'Mei',
    year: 2026,
    revenue: 2950000,
    buyersCount: 88,
    cookiesSold: 360,
    topFlavor: 'Clasic Cookie',
  },
  {
    monthKey: '2026-06',
    monthName: 'Juni',
    year: 2026,
    revenue: 3480000,
    buyersCount: 104,
    cookiesSold: 425,
    topFlavor: 'Kuki Monster',
  },
  {
    monthKey: '2026-07',
    monthName: 'Juli',
    year: 2026,
    revenue: 4120000,
    buyersCount: 122,
    cookiesSold: 498,
    topFlavor: 'Red Velvet',
  },
  {
    monthKey: '2026-08',
    monthName: 'Agustus',
    year: 2026,
    revenue: 4650000,
    buyersCount: 135,
    cookiesSold: 560,
    topFlavor: 'Clasic Cookie',
  },
  {
    monthKey: '2026-09',
    monthName: 'September',
    year: 2026,
    revenue: 4920000,
    buyersCount: 141,
    cookiesSold: 595,
    topFlavor: 'Double Choco',
  },
  {
    monthKey: '2026-10',
    monthName: 'Oktober (Bulan Ini)',
    year: 2026,
    revenue: 5380000,
    buyersCount: 152,
    cookiesSold: 645,
    topFlavor: 'Matcha',
  },
];

export const INITIAL_RECENT_ORDERS: PlacedOrder[] = [
  {
    orderId: 'MAW-83912',
    createdAt: '05/10/2026 13:45 WIB',
    items: [
      {
        id: 'item-1',
        type: 'bundle',
        bundleConfig: {
          name: 'Box of 5 (All-Star Taster Pack)',
          items: COOKIE_PRODUCTS.map((c) => ({ cookie: c, count: 1 })),
          boxNote: 'Buat cemilan kantor',
        },
        quantity: 1,
        unitPrice: 36000,
      },
    ],
    subtotal: 36000,
    discount: 0,
    deliveryFee: 12000,
    total: 48000,
    customer: {
      customerName: 'Anindya Putri',
      phoneNumber: '081289123456',
      deliveryMethod: 'instant',
      address: 'Gedung Altira Lt. 12, Jl. Yos Sudarso, Sunter, Jakarta Utara',
      deliveryDate: 'Hari Ini (Fresh Batch)',
      deliveryTimeSlot: 'Batch Siang (13:00 - 15:00)',
      giftCardMessage: '',
      paymentMethod: 'qris',
      notes: 'Tolong titip di resepsionis lantai 12',
    },
    status: 'baking',
  },
  {
    orderId: 'MAW-83908',
    createdAt: '05/10/2026 11:20 WIB',
    items: [
      {
        id: 'item-2',
        type: 'single',
        product: COOKIE_PRODUCTS[3], // Double choco
        quantity: 3,
        unitPrice: 8000,
      },
      {
        id: 'item-3',
        type: 'single',
        product: COOKIE_PRODUCTS[4], // Matcha
        quantity: 2,
        unitPrice: 9000,
      },
    ],
    subtotal: 42000,
    discount: 5000,
    deliveryFee: 0,
    total: 37000,
    customer: {
      customerName: 'Bima Satria',
      phoneNumber: '087799221100',
      deliveryMethod: 'pickup',
      address: 'Ambil di Kitchen Jl Sungai Bambu 2B',
      deliveryDate: 'Hari Ini (Fresh Batch)',
      deliveryTimeSlot: 'Batch Siang (13:00 - 15:00)',
      giftCardMessage: '',
      paymentMethod: 'bank_transfer',
      notes: 'Saya ambil jam 13.30 ya kak',
    },
    status: 'ready',
  },
  {
    orderId: 'MAW-83894',
    createdAt: '04/10/2026 16:30 WIB',
    items: [
      {
        id: 'item-4',
        type: 'single',
        product: COOKIE_PRODUCTS[1], // Kukimonster
        quantity: 4,
        unitPrice: 7000,
      },
      {
        id: 'item-5',
        type: 'single',
        product: COOKIE_PRODUCTS[2], // Red velvet
        quantity: 4,
        unitPrice: 8000,
      },
    ],
    subtotal: 60000,
    discount: 5000,
    deliveryFee: 5000,
    total: 60000,
    customer: {
      customerName: 'Siti Rahmawati',
      phoneNumber: '085811223344',
      deliveryMethod: 'instant',
      address: 'Jl. Swasembada Timur No. 18, Kebon Bawang, Tg Priok',
      deliveryDate: 'Hari Ini (Fresh Batch)',
      deliveryTimeSlot: 'Batch Sore (16:00 - 18:00)',
      giftCardMessage: 'Happy sweet treat buat adik!',
      paymentMethod: 'cod',
      notes: 'Rumah pagar hitam',
    },
    status: 'completed',
  },
];
