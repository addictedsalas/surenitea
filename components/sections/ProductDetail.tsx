'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, createCart, addLinesToCart } from '@/lib/shopify';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node.id || '');

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

  const images = product.images.edges.map(edge => edge.node);
  const currentImage = images[selectedImage] || product.featuredImage;

  const handleShopPayCheckout = async () => {
    try {
      // Create a new cart with the item
      const cart = await createCart();
      await addLinesToCart(cart.id, [{
        merchandiseId: selectedVariant,
        quantity: 1
      }]);
      // Redirect to checkout
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-sofia text-gray-600 mb-6">
          <Link href="/" className="hover:text-coral transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-coral transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-surenitea-700">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-gray-100">
              {currentImage && (
                <Image
                  src={currentImage.url}
                  alt={currentImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-coral shadow-lg' 
                        : 'border-gray-200 hover:border-coral/50'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-recoleta font-bold text-surenitea-700 mb-4">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-sofia font-bold text-coral">
                  {formattedPrice}
                </span>
                {!product.availableForSale && (
                  <span className="text-sm font-sofia text-red-600 uppercase tracking-wide">
                    Sold Out
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none font-sofia text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            </div>

            {/* Variant Selector */}
            {product.variants.edges.length > 1 && (
              <div className="space-y-3">
                <label className="font-sofia font-bold text-surenitea-700">
                  Select Option
                </label>
                <select 
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-sofia focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral"
                >
                  {product.variants.edges.map((edge) => (
                    <option key={edge.node.id} value={edge.node.id}>
                      {edge.node.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <AddToCartButton
                variantId={selectedVariant}
                className="w-full"
              />
              
              {/* Shop Pay Buy Now Button */}
              <button
                onClick={handleShopPayCheckout}
                className="w-full py-4 rounded-full font-sofia font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
                style={{
                  backgroundColor: '#5A31F4',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4925c7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#5A31F4';
                }}
              >
                <span className="text-base">Buy with</span>
                <Image
                  src="/shop pay logo image.webp"
                  alt="Shop Pay"
                  width={60}
                  height={24}
                  className="h-6 w-auto"
                />
              </button>
              
              {/* More payment methods */}
              <p className="text-center text-sm font-sofia text-gray-600 -mt-2">
                More payment methods
              </p>

              {/* Additional Actions */}
              <div className="flex gap-4">
                <button
                  className="w-full py-4 px-6 text-lg font-sofia font-medium rounded-full border-2 border-gray-300 text-gray-700 hover:border-coral hover:text-coral transition-all"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-full hover:border-coral hover:text-coral transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.658C18.114 15.062 18 14.518 18 14c0-.482.114-.938.316-1.342m0 2.684a3 3 0 110-2.684M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-8 space-y-6">
              <div>
                <h3 className="font-recoleta font-bold text-xl text-surenitea-700 mb-4">
                  Product Details
                </h3>
                <ul className="space-y-3 font-sofia text-gray-700">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    100% Organic Ingredients
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ethically Sourced
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    No Artificial Additives
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Wellness Benefits
                  </li>
                </ul>
              </div>

              {/* Shipping Info */}
              <div>
                <h3 className="font-recoleta font-bold text-xl text-surenitea-700 mb-4">
                  Shipping & Returns
                </h3>
                <p className="font-sofia text-gray-700">
                  Free shipping on orders over $50. We offer a 30-day return policy for unopened products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
