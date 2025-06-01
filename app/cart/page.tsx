'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCart, updateLineItem, removeLineItem } from '@/lib/shopify';

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
    totalTaxAmount?: {
      amount: string;
    };
    totalAmount: {
      amount: string;
    };
  };
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-surenitea-700 font-sofia">Loading cart...</div>
      </div>
    );
  }

  const isEmpty = !cart || cart.lines.edges.length === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/p-banner.png"
            alt="Cart banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surenitea-700/80 to-surenitea-700/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <div className="flex items-center justify-center gap-2 text-sm font-sofia mb-6">
            <Link href="/" className="hover:text-peach transition-colors">Home</Link>
            <span>/</span>
            <span>Shopping Cart</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-recoleta font-bold">
            Your Cart
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16 px-4" style={{ backgroundColor: '#FFF5F0' }}>
        <div className="container mx-auto max-w-6xl">
          {isEmpty ? (
            <div className="text-center py-12">
              <p className="text-xl font-sofia text-surenitea-700 mb-8">
                Your cart is empty
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-4 rounded-full font-sofia font-medium transition-colors"
                style={{
                  backgroundColor: '#2D5F3F',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e4d2b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D5F3F'}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.lines.edges.map((item) => {
                  const line = item.node;
                  const product = line.merchandise.product;
                  const variant = line.merchandise;
                  
                  return (
                    <div key={line.id} className="bg-white rounded-lg p-6 shadow-md">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
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
                          <h3 className="font-recoleta font-bold text-surenitea-700 mb-1">
                            {product.title}
                          </h3>
                          {variant.title !== 'Default Title' && (
                            <p className="text-sm font-sofia text-gray-600 mb-2">
                              {variant.title}
                            </p>
                          )}
                          <p className="font-sofia font-bold" style={{ color: '#FF6B6B' }}>
                            ${variant.priceV2.amount}
                          </p>
                        </div>

                        {/* Quantity and Remove */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeItem(line.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              className="w-8 h-8 rounded-full border transition-colors"
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
                            <span className="font-sofia w-8 text-center">{line.quantity}</span>
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              className="w-8 h-8 rounded-full border transition-colors"
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
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
                  <h2 className="font-recoleta font-bold text-2xl text-surenitea-700 mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between font-sofia">
                      <span>Subtotal</span>
                      <span>${cart.cost.subtotalAmount.amount}</span>
                    </div>
                    <div className="flex justify-between font-sofia">
                      <span>Taxes</span>
                      <span>${cart.cost.totalTaxAmount?.amount || '0.00'}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-sofia font-bold text-lg">
                      <span>Total</span>
                      <span style={{ color: '#FF6B6B' }}>${cart.cost.totalAmount.amount}</span>
                    </div>
                  </div>

                  <a
                    href={cart.checkoutUrl}
                    className="block w-full text-center py-4 rounded-full font-sofia font-medium transition-colors mb-4"
                    style={{
                      backgroundColor: '#2D5F3F',
                      color: '#FFFFFF'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e4d2b'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D5F3F'}
                  >
                    Proceed to Checkout
                  </a>
                  
                  <Link
                    href="/shop"
                    className="block w-full text-center font-sofia transition-colors"
                    style={{ color: '#2D5F3F' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B6B'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2D5F3F'}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
