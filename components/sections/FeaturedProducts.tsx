'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/shopify';
import AddToCartButton from '@/components/AddToCartButton';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProducts({ 
  products, 
  title = "Natures FARMACY",
  subtitle = "Discover and Experience nature’s finest ingredients"
}: FeaturedProductsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="featured-products" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Background with gradient - using a subtle overlay approach */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(135deg, rgba(255, 203, 164, 0.15) 0%, rgba(255, 245, 240, 0.15) 50%, rgba(255, 181, 167, 0.15) 100%)'
      }} />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64">
        <div className="w-full h-full rounded-full" style={{ 
          background: 'radial-gradient(circle, rgba(255, 203, 164, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }} />
      </div>
      <div className="absolute bottom-0 left-0 w-96 h-96">
        <div className="w-full h-full rounded-full" style={{ 
          background: 'radial-gradient(circle, rgba(255, 181, 167, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 font-recoleta" style={{ color: 'var(--color-surenitea-700)' }}>{title}</h2>
          <p className="text-lg max-w-2xl mx-auto font-sofia" style={{ color: 'var(--color-surenitea-600)' }}>{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => {
            const price = parseFloat(product.priceRange.minVariantPrice.amount);
            const formattedPrice = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: product.priceRange.minVariantPrice.currencyCode,
            }).format(price);
            const firstVariant = product.variants.edges[0]?.node;

            return (
              <div
                key={product.id}
                className={`transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <Link href={`/shop/${product.handle}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {product.featuredImage && (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/shop/${product.handle}`}>
                      <h3 className="text-2xl font-bold mb-2 font-recoleta text-surenitea-700 hover:text-coral transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 font-sofia line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-surenitea-700">
                        {formattedPrice}
                      </span>
                      {product.availableForSale && firstVariant ? (
                        <AddToCartButton variantId={firstVariant.id} />
                      ) : (
                        <span className="text-gray-400 font-sofia">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-sofia font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-white"
            style={{ 
              backgroundColor: 'var(--color-surenitea-700)',
            }}
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
