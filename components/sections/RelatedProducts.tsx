'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#FFF5F0' }}>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-coral text-2xl">•</span>
            <span className="text-coral text-2xl">•</span>
            <span className="text-coral text-2xl">•</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-recoleta font-light text-surenitea-700 mb-4">
            YOU MAY ALSO
          </h2>
          <h3 className="text-4xl md:text-5xl font-recoleta font-bold text-surenitea-700">
            Love <span className="text-coral">These</span>
          </h3>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.handle}`}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  {product.featuredImage && (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-20' : 'opacity-0'
                  }`} />
                  
                  {/* Quick View Button */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <span className="bg-white text-surenitea-700 px-6 py-3 rounded-full font-sofia font-medium shadow-lg">
                      View Product
                    </span>
                  </div>

                  {/* Sale Badge */}
                  {!product.availableForSale && (
                    <div className="absolute top-4 left-4 bg-coral text-white px-3 py-1 rounded-full text-sm font-sofia font-medium">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-recoleta font-bold text-surenitea-700 mb-2 group-hover:text-coral transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm font-sofia text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-sofia font-bold text-coral">
                      ${product.priceRange.minVariantPrice.amount}
                    </span>
                    <svg className="w-6 h-6 text-surenitea-700 group-hover:text-coral transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
