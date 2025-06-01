'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Categories for filtering
  const categories = ['All', 'Tea', 'Kava', 'Coffee', 'Wellness'];
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter products based on category (for now, show all products)
  const filteredProducts = products;

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
            EXPLORE OUR
          </h2>
          <h3 className="text-4xl md:text-5xl font-recoleta font-bold text-surenitea-700">
            Premium <span className="text-coral">Collection</span>
          </h3>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-6 py-3 rounded-full font-sofia font-medium transition-all"
              style={{
                backgroundColor: activeCategory === category ? '#FF6B6B' : '#FFFFFF',
                color: activeCategory === category ? '#FFFFFF' : '#2D5F3F',
                border: activeCategory === category ? '1px solid #FF6B6B' : '1px solid #E5E7EB',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#FF6B6B';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#FF6B6B';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#2D5F3F';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-fit">
            {filteredProducts.map((product) => (
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
                        Quick View
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
                      <button className="bg-surenitea-700 text-white px-4 py-2 rounded-full font-sofia text-sm hover:bg-surenitea-600 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surenitea-700 opacity-60 font-sofia">
              No products available in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
