'use client';

import { useState } from 'react';
import { Product, createCart, addLinesToCart } from '@/lib/shopify';

interface AddToCartButtonProps {
  product: Product;
  variantId: string;
  className?: string;
}

export default function AddToCartButton({ product, variantId, className = '' }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const variant = product.variants.edges.find(edge => edge.node.id === variantId)?.node;

  if (!variant || !variant.availableForSale) {
    return (
      <button
        disabled
        className={`bg-gray-300 text-gray-500 px-4 py-2 rounded-full cursor-not-allowed font-sofia font-bold ${className}`}
      >
        Sold Out
      </button>
    );
  }

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
      className={`relative w-full bg-coral text-white px-6 py-4 rounded-full font-sofia font-bold text-lg hover:bg-coral/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ backgroundColor: '#FF6B6B' }}
    >
      {isAdding ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Adding...
        </span>
      ) : showSuccess ? (
        <span className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to Cart!
        </span>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
}
