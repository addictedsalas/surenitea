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
                product={product}
                variantId={selectedVariant}
                className="w-full"
              />
              
              {/* Shop Pay Buy Now */}
              <button
                onClick={async () => {
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
                }}
                className="w-full py-4 px-6 text-lg font-sofia font-bold rounded-full bg-[#5A31F4] text-white hover:bg-[#4925d3] transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 341 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M227.297 0C220.448 0 214.896 5.47237 214.896 12.2229V138.778C214.896 145.528 220.448 151 227.297 151H328.599C335.448 151 341 145.528 341 138.778V12.2229C341 5.47237 335.448 0 328.599 0H227.297Z" fill="white"/>
                  <path d="M278.002 107.5L276.403 113H262.841L266.873 97.5H270.675L267.133 109.5H272.761L276.119 97.5H279.921L276.363 109.5H281.139L284.681 97.5H288.483L284.451 113H270.888L272.488 107.5H278.002Z" fill="#5A31F4"/>
                  <path d="M290.442 106.75C290.442 104.812 291.192 103.229 292.692 102C294.192 100.75 296.088 100.125 298.379 100.125C299.254 100.125 300.046 100.229 300.754 100.438C301.483 100.625 302.067 100.885 302.504 101.219L301.692 103.719C301.254 103.427 300.723 103.198 300.098 103.031C299.494 102.844 298.879 102.75 298.254 102.75C297.108 102.75 296.192 103.01 295.504 103.531C294.817 104.052 294.473 104.792 294.473 105.75C294.473 106.417 294.692 106.958 295.129 107.375C295.567 107.771 296.223 108.167 297.098 108.562C298.181 109.042 299.098 109.51 299.848 109.969C300.598 110.427 301.16 110.958 301.535 111.562C301.91 112.146 302.098 112.865 302.098 113.719C302.098 115.74 301.306 117.344 299.723 118.531C298.14 119.698 296.098 120.281 293.598 120.281C292.41 120.281 291.358 120.135 290.442 119.844C289.525 119.552 288.796 119.177 288.254 118.719L289.129 116.219C289.65 116.635 290.327 116.979 291.16 117.25C291.994 117.5 292.858 117.625 293.754 117.625C295.004 117.625 295.994 117.354 296.723 116.812C297.473 116.271 297.848 115.521 297.848 114.562C297.848 113.875 297.619 113.323 297.16 112.906C296.723 112.49 296.056 112.073 295.16 111.656C294.077 111.156 293.16 110.677 292.41 110.219C291.66 109.74 291.088 109.198 290.692 108.594C290.317 107.969 290.129 107.229 290.129 106.375C290.129 106.417 290.192 106.552 290.317 106.781C290.379 106.823 290.421 106.812 290.442 106.75Z" fill="#5A31F4"/>
                </svg>
                Buy with Shop Pay
              </button>
              
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
