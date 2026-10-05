import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CookieCard } from './components/CookieCard';
import { CookieDetailModal } from './components/CookieDetailModal';
import { BoxBuilderModal } from './components/BoxBuilderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WarmingGuide } from './components/WarmingGuide';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { OwnerAuthModal } from './components/OwnerAuthModal';
import { OwnerDashboard } from './components/OwnerDashboard';
import { COOKIE_PRODUCTS, TASTER_BOX_BUNDLE, INITIAL_RECENT_ORDERS, OWNER_CONFIG } from './data/cookies';
import { CookieProduct, CartItem, PlacedOrder } from './types/cookie';
import { Sparkles, ShoppingBag, Search, Gift, ArrowRight, Check, Shield, Lock } from 'lucide-react';
import { CookieVisual } from './components/CookieVisual';

export default function App() {
  const [products] = useState<CookieProduct[]>(COOKIE_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'bestseller' | 'new' | 'bundles'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mode: 'buyer' | 'owner'
  const [activeMode, setActiveMode] = useState<'buyer' | 'owner'>('buyer');
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('maw_owner_auth') === 'true';
  });
  const [isOwnerAuthModalOpen, setIsOwnerAuthModalOpen] = useState(false);

  // Orders State (synced with localStorage)
  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    const saved = localStorage.getItem('maw_cookies_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return INITIAL_RECENT_ORDERS;
  });

  // Save orders to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('maw_cookies_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Modals
  const [selectedDetailCookie, setSelectedDetailCookie] = useState<CookieProduct | null>(null);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Switch to Owner Portal Handler
  const handleOpenOwnerPortal = () => {
    if (isOwnerAuthenticated) {
      setActiveMode('owner');
    } else {
      setIsOwnerAuthModalOpen(true);
    }
  };

  const handleOwnerAuthSuccess = () => {
    setIsOwnerAuthenticated(true);
    sessionStorage.setItem('maw_owner_auth', 'true');
    setIsOwnerAuthModalOpen(false);
    setActiveMode('owner');
    showToast('✓ Berhasil masuk ke Portal Owner');
  };

  const handleOwnerLogout = () => {
    setIsOwnerAuthenticated(false);
    sessionStorage.removeItem('maw_owner_auth');
    setActiveMode('buyer');
    showToast('✓ Telah keluar dari Portal Owner');
  };

  // Update order status in Owner dashboard
  const handleUpdateOrderStatus = (orderId: string, newStatus: PlacedOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`✓ Status order #${orderId} diperbarui: ${newStatus}`);
  };

  // Add single cookie to cart
  const handleAddToCart = (product: CookieProduct, qty = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.type === 'single' && item.product?.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += qty;
        return copy;
      }
      return [
        ...prev,
        {
          id: `single-${product.id}-${Date.now()}`,
          type: 'single',
          product,
          quantity: qty,
          unitPrice: product.price,
        },
      ];
    });
    showToast(`✓ Ditambahkan: ${product.name}`);
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((it) => it.id !== itemId);
      }
      return prev.map((it) => (it.id === itemId ? { ...it, quantity: newQty } : it));
    });
  };

  // Update single product quantity directly from card stepper
  const handleUpdateProductQuantity = (productId: string, newQty: number) => {
    const existing = cartItems.find((it) => it.type === 'single' && it.product?.id === productId);
    if (!existing && newQty > 0) {
      const p = products.find((x) => x.id === productId);
      if (p) handleAddToCart(p, newQty);
      return;
    }
    if (existing) {
      handleUpdateQuantity(existing.id, newQty);
    }
  };

  // Remove item
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  // Add custom bundle or preset bundle to cart
  const handleAddBundleToCart = (
    bundleName: string,
    bundleItems: { cookie: CookieProduct; count: number }[],
    price: number,
    boxNote?: string
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `bundle-${Date.now()}`,
        type: 'bundle',
        bundleConfig: {
          name: bundleName,
          items: bundleItems,
          boxNote,
        },
        quantity: 1,
        unitPrice: price,
      },
    ]);
    showToast(`✓ Ditambahkan: ${bundleName}`);
  };

  // Add the 1-click All-Star Taster Box of 5
  const handleAddTasterBox = () => {
    const allItems = products.map((c) => ({ cookie: c, count: 1 }));
    handleAddBundleToCart(
      TASTER_BOX_BUNDLE.name,
      allItems,
      TASTER_BOX_BUNDLE.price,
      'Paket Komplit 5 Varian Maw Cookies'
    );
  };

  // Coupons logic
  const handleApplyCoupon = (code: string) => {
    if (code === 'MAWCHUNKY' || code === 'FIRSTMAW') {
      setDiscount(5000);
      setAppliedCoupon(code);
      showToast('🎉 Voucher Rp 5.000 berhasil digunakan!');
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (activeFilter === 'bestseller') return p.isBestSeller;
      if (activeFilter === 'new') return p.isNew;
      return true;
    });
  }, [products, searchQuery, activeFilter]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // IF OWNER MODE IS ACTIVE: Render dedicated Owner Dashboard
  if (activeMode === 'owner') {
    return (
      <>
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <OwnerDashboard
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onSwitchToBuyerMode={() => setActiveMode('buyer')}
          onLogout={handleOwnerLogout}
        />
      </>
    );
  }

  // BUYER MODE (Default Storefront Experience)
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Access Distinction Bar (Membedakan Akses Pembeli vs Akses Owner) */}
      <div className="bg-[#1F1C1A] text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Mode Pembeli (Belanja Cookies)
            </span>
            <span className="text-stone-400 hidden md:inline">
              Kitchen: {OWNER_CONFIG.kitchenAddress}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-stone-400">Khusus Pemilik Toko?</span>
            <button
              onClick={handleOpenOwnerPortal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 border border-amber-500/40 rounded-lg font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Masuk Portal Owner (PIN: MCookies 223)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        onOpenOwnerPortal={handleOpenOwnerPortal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          products={products}
          onSelectCookie={(c) => setSelectedDetailCookie(c)}
          onAddToCart={(c) => handleAddToCart(c, 1)}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        />

        {/* Product Catalog Section */}
        <section id="menu" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1.5">
                <span>The 5 Signatures</span>
                <span aria-hidden="true">·</span>
                <span>Fresh Oven Batch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">
                Pilih Varian Maw Cookies
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari rasa atau isian..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5282] shadow-2xs"
              />
            </div>
          </div>

          {/* Functional Filter Tabs */}
          <div className="flex items-center gap-2 pb-6 overflow-x-auto scrollbar-none">
            {[
              { id: 'all' as const, label: 'Semua 5 Varian' },
              { id: 'bestseller' as const, label: 'Best Seller' },
              { id: 'new' as const, label: 'Varian Baru (New)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#2C5282] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => setIsBoxBuilderOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap bg-amber-100/70 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <Gift className="w-3.5 h-3.5 text-amber-700" />
              <span>Paket Box & Hampers</span>
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const inCart = cartItems.find((it) => it.type === 'single' && it.product?.id === product.id);
              const quantityInCart = inCart ? inCart.quantity : 0;

              return (
                <CookieCard
                  key={product.id}
                  product={product}
                  quantityInCart={quantityInCart}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onUpdateQuantity={handleUpdateProductQuantity}
                  onOpenDetail={(p) => setSelectedDetailCookie(p)}
                />
              );
            })}
          </div>

          {/* Special Spotlight: Taster Box of 5 Banner */}
          <div className="mt-14 relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Special Combo Package</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700">Hemat Rp 3.000</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
                  {TASTER_BOX_BUNDLE.name}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {TASTER_BOX_BUNDLE.description}
                </p>

                {/* 5 cookies mini preview */}
                <div className="flex items-center gap-2 pt-2">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedDetailCookie(p)}
                      title={p.name}
                    >
                      <CookieVisual category={p.category} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:items-end justify-center">
                <div className="text-xs text-stone-400 line-through">
                  {formatRupiah(TASTER_BOX_BUNDLE.originalPrice)}
                </div>
                <div className="text-3xl font-black text-[#2C5282] tabular-nums">
                  {formatRupiah(TASTER_BOX_BUNDLE.price)}
                </div>
                <div className="text-[11px] text-stone-500 mb-3">
                  Box Cantik + Warming Card Sudah Termasuk
                </div>

                <button
                  onClick={handleAddTasterBox}
                  className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pesan Paket 5 Varian</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Warming Guide Section */}
        <WarmingGuide />

        {/* Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Checkout Bar (< 15% mobile viewport height per Section 1.I) */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && !placedOrder && (
        <aside
          aria-label="Ringkasan Keranjang"
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#2C5282] text-white px-4 py-2.5 shadow-2xl border-t border-blue-900/40 flex items-center justify-between max-h-[14vh]"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div>
              <div className="text-[11px] text-blue-200">Total Keranjang</div>
              <div className="text-sm font-extrabold tabular-nums">
                {formatRupiah(cartSubtotal - discount)}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Keranjang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Cookie Detail Modal */}
      {selectedDetailCookie && (
        <CookieDetailModal
          product={selectedDetailCookie}
          quantityInCart={
            cartItems.find((it) => it.type === 'single' && it.product?.id === selectedDetailCookie.id)?.quantity || 0
          }
          onClose={() => setSelectedDetailCookie(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Custom Box Builder Modal */}
      <BoxBuilderModal
        products={products}
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discount={discount}
        onApplyCoupon={handleApplyCoupon}
        appliedCoupon={appliedCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discount={discount}
        onOrderSuccess={(order) => {
          setIsCheckoutOpen(false);
          setPlacedOrder(order);
          // Prepend to orders list for Owner Dashboard
          setOrders((prev) => [order, ...prev]);
          setCartItems([]); // Clear cart
          setDiscount(0);
          setAppliedCoupon(null);
        }}
      />

      {/* Order Confirmation Modal with WhatsApp link to Owner */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* Owner Authentication Modal */}
      <OwnerAuthModal
        isOpen={isOwnerAuthModalOpen}
        onClose={() => setIsOwnerAuthModalOpen(false)}
        onSuccess={handleOwnerAuthSuccess}
      />
    </div>
  );
}
