export interface CookieProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  category: 'clasic' | 'monster' | 'velvet' | 'choco' | 'matcha';
  doughColor: string;
  accentColor: string;
  insideFilling: string;
  topping: string;
  description: string;
  tasteProfile: {
    sweetness: number; // 1-5
    richness: number;  // 1-5
    gooeyness: number; // 1-5
  };
  ingredients: string[];
  allergens: string[];
  weightGrams: number;
}

export interface CartItem {
  id: string;
  type: 'single' | 'bundle';
  product?: CookieProduct;
  bundleConfig?: {
    name: string;
    items: { cookie: CookieProduct; count: number }[];
    boxNote?: string;
  };
  quantity: number;
  unitPrice: number;
}

export type DeliveryMethod = 'pickup' | 'instant' | 'sameday';

export interface OrderForm {
  customerName: string;
  phoneNumber: string;
  deliveryMethod: DeliveryMethod;
  address: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  giftCardMessage: string;
  paymentMethod: 'qris' | 'bank_transfer' | 'cod';
  notes: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customer: OrderForm;
  status: 'received' | 'baking' | 'ready' | 'delivering' | 'completed';
}
