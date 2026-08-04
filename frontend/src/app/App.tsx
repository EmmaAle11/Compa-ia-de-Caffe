import React, { useState, useEffect } from 'react';
import { HeaderWidget } from '../widgets/header/ui/HeaderWidget';
import { HomePage } from '../pages/home/ui/HomePage';
import { ShopPage } from '../pages/shop/ui/ShopPage';
import { ProductDetailPage } from '../pages/product-detail/ui/ProductDetailPage';
import { StoryProcessPage } from '../pages/story-process/ui/StoryProcessPage';
import { ContactPage } from '../pages/contact/ui/ContactPage';
import { CheckoutPage } from '../pages/checkout/ui/CheckoutPage';
import { BackofficePage } from '../pages/backoffice/ui/BackofficePage';
import { AiSommelierPage } from '../pages/ai-sommelier/ui/AiSommelierPage';
import { CartDrawerWidget } from '../widgets/cart-drawer/ui/CartDrawerWidget';
import { FooterWidget } from '../widgets/footer/ui/FooterWidget';
import { COFFEE_PRODUCTS } from '../entities/product/model/mockProducts';
import { CoffeeProduct, CartItem, ActiveTab, GrindOption } from '../shared/types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct>(COFFEE_PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cpm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('cpm_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: CoffeeProduct, grind: GrindOption = 'Whole Bean', quantity: number = 1) => {
    const unitPrice = product.price;
    const totalPrice = unitPrice * quantity;
    const cartId = `cart-${product.id}-${grind}-${Date.now()}`;

    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.grind === grind);
      if (existing) {
        return prev.map(i => i.cartId === existing.cartId ? {
          ...i,
          quantity: i.quantity + quantity,
          totalPrice: i.unitPrice * (i.quantity + quantity)
        } : i);
      }
      return [...prev, {
        cartId,
        product,
        quantity,
        grind,
        unitPrice,
        totalPrice
      }];
    });

    showToast(`¡${product.name} (${grind}) agregado a tu bolsa!`);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        return {
          ...item,
          quantity: newQty,
          totalPrice: item.unitPrice * newQty
        };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveItem = (cartId: string) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
    showToast('Producto eliminado de la bolsa');
  };

  const handleSelectProduct = (product: CoffeeProduct) => {
    setSelectedProduct(product);
    setActiveTab('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1F140E] font-sans antialiased flex flex-col justify-between selection:bg-[#B87D4B] selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F140E] text-[#FAF6F0] font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-[#D4A373] animate-bounce text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-[#D4A373]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <HeaderWidget
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            setActiveTab={setActiveTab}
            onAddToCart={(p) => handleAddToCart(p, 'Whole Bean', 1)}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 'Whole Bean', 1)}
          />
        )}

        {activeTab === 'product_detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'story_process' && (
          <StoryProcessPage
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'checkout' && (
          <CheckoutPage
            cart={cart}
            totalAmount={totalAmount}
            onClearCart={() => setCart([])}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'backoffice' && (
          <BackofficePage
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'ai_sommelier' && (
          <AiSommelierPage
            onSelectProduct={handleSelectProduct}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawerWidget
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        totalAmount={totalAmount}
        setActiveTab={setActiveTab}
      />

      {/* Footer */}
      <FooterWidget setActiveTab={setActiveTab} />

    </div>
  );
}
