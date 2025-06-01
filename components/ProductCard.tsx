'use client';

import Image from 'next/image';
import { Product } from '@/lib/shopify';

interface ProductCardProps {
  product: Product;
  onAddToCart: (variantId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

  const firstVariant = product.variants.edges[0]?.node;

  return (
    <div className="rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100" style={{ backgroundColor: 'var(--color-surenitea-50)' }}>
      {product.featuredImage && (
        <div className="relative aspect-square w-full bg-gray-100">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 font-recoleta" style={{ color: 'var(--color-surenitea-700)' }}>
          {product.title}
        </h3>
        <p className="mb-4 text-sm line-clamp-2 font-sofia" style={{ color: 'var(--color-surenitea-600)' }}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" style={{ color: 'var(--color-surenitea-700)' }}>
            {formattedPrice}
          </span>
          {product.availableForSale && firstVariant ? (
            <button
              onClick={() => onAddToCart(firstVariant.id)}
              className="px-6 py-3 rounded-md transition-all duration-200 font-sofia font-bold text-sm transform hover:scale-105 shadow-md"
              style={{ 
                backgroundColor: 'var(--color-coral)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surenitea-700)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-coral)';
              }}
            >
              Add to Cart
            </button>
          ) : (
            <span className="opacity-50 font-sofia" style={{ color: 'var(--color-surenitea-700)' }}>
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
