'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/shopify';

interface AddToCartButtonProps {
  product: Product;
  variantId: string;
  className?: string;
}

export default function AddToCartButton({ product, variantId, className = '' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const variant = product.variants.edges.find(edge => edge.node.id === variantId)?.node;

  if (!variant || !variant.availableForSale) {
    return (
      <button
        disabled
        className={`bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed font-sofia font-bold text-sm ${className}`}
      >
        Sold Out
      </button>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart({
        variantId: variant.id,
        productTitle: product.title,
        variantTitle: variant.title,
        quantity: 1,
        price: parseFloat(variant.priceV2.amount),
        currencyCode: variant.priceV2.currencyCode,
        image: product.featuredImage ? {
          url: product.featuredImage.url,
          altText: product.featuredImage.altText,
        } : undefined,
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`bg-coral text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 font-sofia font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-surenitea-700 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-up">
          <p className="font-sofia">Added to cart!</p>
        </div>
      )}
    </>
  );
}
