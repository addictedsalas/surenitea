'use client';

import { useState } from 'react';
import { createCart, addLinesToCart } from '@/lib/shopify';

interface AddToCartButtonProps {
  variantId: string;
  className?: string;
}

export default function AddToCartButton({ variantId, className = '' }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      let cartId = localStorage.getItem('cartId');
      
      // Create a new cart if one doesn't exist
      if (!cartId) {
        const cart = await createCart();
        cartId = cart.id;
        localStorage.setItem('cartId', cart.id);
      }

      // Add the item to the cart
      await addLinesToCart(cartId!, [{
        merchandiseId: variantId,
        quantity: 1
      }]);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
      // Trigger a custom event to update cart UI
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`px-8 py-4 rounded-full font-sofia font-bold text-base transition-all duration-200 transform hover:scale-[1.02] shadow-lg ${className}`}
      style={{
        backgroundColor: showSuccess ? '#2D5F3F' : '#FF6B6B',
        color: '#FFFFFF'
      }}
      onMouseEnter={(e) => {
        if (!showSuccess) {
          e.currentTarget.style.backgroundColor = '#e55555';
        }
      }}
      onMouseLeave={(e) => {
        if (!showSuccess) {
          e.currentTarget.style.backgroundColor = '#FF6B6B';
        }
      }}
    >
      {isAdding ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Adding...
        </span>
      ) : showSuccess ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </span>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
}
