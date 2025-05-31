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
    <div className="bg-surenitea-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-coral">
      {product.featuredImage && (
        <div className="relative h-64 w-full">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-surenitea-700 mb-2 font-recoleta">
          {product.title}
        </h3>
        <p className="text-surenitea-700 mb-4 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-surenitea-700">
            {formattedPrice}
          </span>
          {product.availableForSale && firstVariant ? (
            <button
              onClick={() => onAddToCart(firstVariant.id)}
              className="bg-coral text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 font-sofia font-bold text-sm"
            >
              Add to Cart
            </button>
          ) : (
            <span className="text-surenitea-700 opacity-50 font-sofia">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
