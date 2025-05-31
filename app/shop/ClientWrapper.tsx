'use client';

import { Product } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';

export default function ClientWrapper({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = async (variantId: string) => {
    const variant = product.variants.edges.find(edge => edge.node.id === variantId)?.node;
    if (!variant) return;

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
  };

  return <ProductCard product={product} onAddToCart={handleAddToCart} />;
}
