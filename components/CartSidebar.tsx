'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCart, updateLineItem, removeLineItem } from '@/lib/shopify';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
      amount: string;
    };
    product: {
      title: string;
      featuredImage?: {
        url: string;
      };
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    subtotalAmount: {
      amount: string;
    };
    totalAmount: {
      amount: string;
    };
  };
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (isOpen) {
        loadCart();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [isOpen]);

  const loadCart = async () => {
    try {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        const cartData = await getCart(cartId);
        setCart(cartData);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    
    try {
      if (quantity === 0) {
        await removeLineItem(cart.id, lineId);
      } else {
        await updateLineItem(cart.id, lineId, quantity);
      }
      await loadCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart) return;
    
    try {
      await removeLineItem(cart.id, lineId);
      await loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const isEmpty = !cart || cart.lines.edges.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-recoleta font-bold text-surenitea-700">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="font-sofia text-gray-500">Loading...</p>
              </div>
            ) : isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg font-sofia text-gray-600 mb-6">
                  Your cart is empty
                </p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="bg-surenitea-700 text-white px-6 py-3 rounded-full font-sofia font-medium hover:bg-surenitea-600 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cart.lines.edges.map((item) => {
                  const line = item.node;
                  const product = line.merchandise.product;
                  const variant = line.merchandise;
                  
                  return (
                    <div key={line.id} className="flex gap-4 pb-4 border-b last:border-0">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        {product.featuredImage && (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-sofia font-medium text-surenitea-700 mb-1">
                          {product.title}
                        </h3>
                        {variant.title !== 'Default Title' && (
                          <p className="text-sm font-sofia text-gray-600 mb-1">
                            {variant.title}
                          </p>
                        )}
                        <p className="font-sofia text-coral font-bold">
                          ${variant.priceV2.amount}
                        </p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(line.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            className="w-7 h-7 rounded-full border transition-colors text-sm"
                            style={{
                              borderColor: '#E5E7EB',
                              color: '#6B7280'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#FF6B6B';
                              e.currentTarget.style.color = '#FF6B6B';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#E5E7EB';
                              e.currentTarget.style.color = '#6B7280';
                            }}
                          >
                            -
                          </button>
                          <span className="font-sofia text-sm w-8 text-center">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            className="w-7 h-7 rounded-full border transition-colors text-sm"
                            style={{
                              borderColor: '#E5E7EB',
                              color: '#6B7280'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#FF6B6B';
                              e.currentTarget.style.color = '#FF6B6B';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#E5E7EB';
                              e.currentTarget.style.color = '#6B7280';
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isEmpty && cart && (
            <div className="border-t p-6 space-y-4">
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between font-sofia">
                  <span>Subtotal</span>
                  <span className="font-bold">${cart.cost.subtotalAmount.amount}</span>
                </div>
              </div>

              <a
                href={cart.checkoutUrl}
                className="block w-full text-center py-4 rounded-full font-sofia font-medium transition-colors"
                style={{
                  backgroundColor: '#2D5F3F',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e4d2b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D5F3F'}
              >
                Checkout
              </a>

              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full text-center font-sofia transition-colors"
                style={{ color: '#2D5F3F' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B6B'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2D5F3F'}
              >
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
