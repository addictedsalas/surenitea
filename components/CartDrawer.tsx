'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, removeFromCart, updateQuantity, checkout } = useCart();

  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const currencyCode = state.items[0]?.currencyCode || 'USD';
  
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(subtotal);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-surenitea-700 font-recoleta">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surenitea-50 rounded-md transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6 text-surenitea-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <p className="text-center text-surenitea-700 opacity-60 mt-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-surenitea-50 rounded-lg">
                    {item.image && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image.url}
                          alt={item.image.altText || item.productTitle}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-surenitea-700">{item.productTitle}</h3>
                      {item.variantTitle !== 'Default Title' && (
                        <p className="text-sm text-surenitea-700 opacity-75">{item.variantTitle}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-surenitea-700 rounded-md hover:bg-surenitea-50"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-surenitea-700 rounded-md hover:bg-surenitea-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-surenitea-700">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: item.currencyCode,
                        }).format(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-coral hover:underline mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-bold text-surenitea-700">Subtotal</span>
                <span className="text-lg font-bold text-surenitea-700">{formattedSubtotal}</span>
              </div>
              <button
                onClick={checkout}
                disabled={state.isLoading}
                className="w-full bg-coral text-white py-3 rounded-md hover:bg-opacity-90 transition-colors duration-200 font-sofia font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.isLoading ? 'Processing...' : 'Checkout'}
              </button>
              <p className="text-xs text-center text-surenitea-700 opacity-60 mt-2">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
